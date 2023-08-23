const http2 = require('http2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  findUserById,
  findUserByIdAndUpdate,
  createUser,
  findUserByCredentials,
} = require('../utils/databaseHandler');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { errorMessages } = require('../utils/constants');
const { jwtKey } = require('../config');

const http2Constants = http2.constants;
// Users controller

// Get current user data
module.exports.getCurrentUser = (req, res, next) => {
  findUserById(req.user._id)
    .orFail(new NotFoundError(errorMessages.userNotFound)) // Throw 404 error if user doesn't exist
    .then((user) => res.send(user))
    .catch(next);
};

// Update current user information
module.exports.updateUser = (req, res, next) => {
  findUserByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        // Throw 409 error if user already exists
        next(new ConflictError(errorMessages.userAlreadyExists));
      } else if (err.name === 'ValidationError') {
        // Throw 400 error if validation of sent data fails
        next(new BadRequestError(errorMessages.userBadRequest));
      } else {
        next(err);
      }
    });
};

// Register new user
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10) // Hash recieved password before saving
    .then((hash) => createUser({
      name,
      email,
      password: hash,
    }))
    .then((user) => res
      .status(http2Constants.HTTP_STATUS_CREATED)
      .send({
        name: user.name,
        email: user.email,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        // Throw 409 error if user already exists
        next(new ConflictError(errorMessages.userAlreadyExists));
      } else if (err.name === 'ValidationError') {
        // Throw 400 error if validation of sent data fails
        next(new BadRequestError(errorMessages.userBadRequest));
      } else {
        next(err);
      }
    });
};

// Authorize user
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  findUserByCredentials(email, password)
    .then((user) => {
      // Create JWT
      const token = jwt.sign({ _id: user._id }, jwtKey);
      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie max age is 7 days
          httpOnly: true,
          sameSite: true,
        })
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
    })
    .catch(next);
};

// Logout user
module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt') // Clear cookies
    .status(http2Constants.HTTP_STATUS_OK)
    .send();
};
