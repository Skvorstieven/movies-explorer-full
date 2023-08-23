const winston = require('winston');
const expressWinston = require('express-winston');

// Logger middleware
const requestLogger = expressWinston.logger({
  format: winston.format.json(),
  expressFormat: true,
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
});

const errorLogger = expressWinston.errorLogger({
  format: winston.format.json(),
  expressFormat: true,
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
