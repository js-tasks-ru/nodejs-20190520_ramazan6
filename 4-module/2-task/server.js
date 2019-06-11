const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const LimitedStream = require('./LimitSizeStream');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);
  if (fs.existsSync(filepath)) {
      	res.statusCode = 409;
      	res.end("File already exists");
      	return;
      }
  switch (req.method) {
    case 'POST':
 
      const stream = req.pipe(new LimitedStream({limit: 1000000}))
      					.on('error', (err) => {
      						res.statusCode = 413;
      						fs.unlink(filepath, () => {});
      						res.end();
      					});
      stream.pipe(fs.createWriteStream(filepath))
      		.on('error', (err) => {
      			res.end('error');
      		})
      		.on('close', () => {
              res.statusCode = 201;
              res.end();
            });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
  req.on('close', () => {
      if (!res.finished) {
      	fs.unlink(filepath, () => {});
      }
    });
});

module.exports = server;
