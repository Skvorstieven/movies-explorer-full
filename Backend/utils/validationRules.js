const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const { errorMessages } = require('./constants');

// Rules for request validation
const textRequiredFixedSizeValidation = Joi.string().required().min(2).max(30);
const textRequiredValidation = Joi.string().required();
const numberRequiredValidation = Joi.number().required();
const urlRequiredValidation = Joi.string().required().uri();
const emailValidation = Joi.string().required().email();
const passwordValidation = Joi.string().required();

// Validate registration
const signupValidation = celebrate({
  body: Joi.object().keys({
    name: textRequiredFixedSizeValidation,
    email: emailValidation,
    password: passwordValidation,
  }),
});

// Validate Authorization
const signinValidation = celebrate({
  body: Joi.object().keys({
    email: emailValidation,
    password: passwordValidation,
  }),
});

// Validate data for user update
const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: textRequiredFixedSizeValidation,
    email: emailValidation,
  }),
});

// Validate movie id
const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message(errorMessages.movieWrongId);
    }),
  }),
});

// Validate data for new movie creation
const movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: textRequiredValidation,
    director: textRequiredValidation,
    duration: numberRequiredValidation,
    year: textRequiredValidation,
    description: textRequiredValidation,
    image: urlRequiredValidation,
    trailerLink: urlRequiredValidation,
    thumbnail: urlRequiredValidation,
    movieId: numberRequiredValidation,
    nameRU: textRequiredValidation,
    nameEN: textRequiredValidation,
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  updateUserValidation,
  movieIdValidation,
  movieCreateValidation,

};
