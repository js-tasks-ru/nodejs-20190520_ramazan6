const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  if (pathname.split('/').length > 1) {
      		res.statusCode = 400;
      		res.end('Nesting is prohibited')
      	}
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      fs.createReadStream(filepath)
        .on('error', (err) => {
	      	if (err.code === 'ENOENT') {
	      		res.statusCode = 404;
	      		res.end('File not found');
	      	}
	    }).pipe(res);
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
