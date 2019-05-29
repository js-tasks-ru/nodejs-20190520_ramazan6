const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.memUsed = 0;
  }
  _transform(chunk, encoding, callback) {
  	this.memUsed += chunk.length;
    if (this.memUsed > this.limit) {
    	callback(new LimitExceededError);
    }
    callback(null,chunk);
  }
}
module.exports = LimitSizeStream;
