const rateLimit = require('express-rate-limit');
const { errorMessages } = require('../utils/constants');

// RateLimiter middleware
const rateLimiter = rateLimit({
  max: 100, // maximum 100 requests
  windowMs: 15 * 60 * 1000, // per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: errorMessages.tooManyRequests,
});

module.exports = {
  rateLimiter,
};
