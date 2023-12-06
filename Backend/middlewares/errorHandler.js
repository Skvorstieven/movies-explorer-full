const { errorMessages } = require('../utils/constants');

// Error handeling middleware
function errorHandler(err, req, res, next) {
  // If status code doesn't exist, use 500
  const statusCode = err.statusCode || 500;

  // If message doesn't exist, use internal server error
  const message = statusCode === 500 ? errorMessages.internalServerError : err.message;

  // Send response with resulting error
  res.status(statusCode).send({ message });

  next();
}

module.exports.errorHandler = errorHandler;
