const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { errorMessages } = require('../utils/constants');
const { modelErrorMessages } = require('../utils/constants');

const userErrorMessages = modelErrorMessages.user;

const UnauthorizedError = require('../errors/UnauthorizedError');

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, userErrorMessages.nameRequired],
      minlength: [2, userErrorMessages.nameMinLength],
      maxlength: [30, userErrorMessages.nameMaxLength],
    },
    email: {
      type: String,
      unique: true,
      required: [true, userErrorMessages.emailRequired],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: userErrorMessages.emailInvalid,
      },
    },
    password: {
      type: String,
      required: [true, userErrorMessages.passwordRequired],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

// Find user by email and password
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // Throw 401 error if user doesn't exist
        throw new UnauthorizedError(errorMessages.userWrongCredentials);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // Throw 401 error if password doesn't match
            throw new UnauthorizedError(errorMessages.userWrongCredentials);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
