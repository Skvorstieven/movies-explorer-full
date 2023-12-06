// 409 error

const http2 = require('http2');

const http2Constants = http2.constants;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = http2Constants.HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictError;
