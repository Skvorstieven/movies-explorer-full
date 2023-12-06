const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessages } = require('../utils/constants');
const { jwtKey } = require('../config');

// Authorization middleware
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) { // Check if there is a tocken inside cookies
    // Throw 401 error if token doesn't exist
    next(new UnauthorizedError(errorMessages.userUnauthorized));
    return;
  }

  let payload;

  try {
    // Verify token
    payload = jwt.verify(token, jwtKey);
  } catch (err) {
    // Throw 401 error if token isn't valid
    next(new UnauthorizedError(errorMessages.userUnauthorized));
    return;
  }

  req.user = payload; // Set user

  next();
};
