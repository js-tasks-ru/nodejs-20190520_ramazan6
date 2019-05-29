const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.chunkBit = '';
  }

  _transform(chunk, encoding, callback) {
  	if (chunk.indexOf(os.EOL) > 0) {
  		let lines = chunk.toString().split(os.EOL);
  		lines[0] = this.chunkBit + lines[0];
  		this.chunkBit = '';
  		lines.forEach(line => {
  			this.push(line);
  		});
  	} else {
  		this.chunkBit += chunk.toString();
  	}
  	callback();
  }

  _flush(callback) {
  	callback();
  }
}

module.exports = LineSplitStream;
