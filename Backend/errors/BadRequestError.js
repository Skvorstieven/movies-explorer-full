// 400 error

const http2 = require('http2');

const http2Constants = http2.constants;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = http2Constants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
