// 404 error

const http2 = require('http2');

const http2Constants = http2.constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = http2Constants.HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
