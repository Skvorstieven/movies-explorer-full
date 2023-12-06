// 401 error

const http2 = require('http2');

const http2Constants = http2.constants;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = http2Constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
