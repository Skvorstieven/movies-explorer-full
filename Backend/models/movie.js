const mongoose = require('mongoose');
const validator = require('validator');

const { modelErrorMessages } = require('../utils/constants');

const movieErrorMessages = modelErrorMessages.movie;

// Movie schema
const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, movieErrorMessages.countryRequired],
    },
    director: {
      type: String,
      required: [true, movieErrorMessages.directorRequired],
    },
    duration: {
      type: Number,
      required: [true, movieErrorMessages.durationRequired],
    },
    year: {
      type: String,
      required: [true, movieErrorMessages.yearRequired],
    },
    description: {
      type: String,
      required: [true, movieErrorMessages.descriptionRequired],
    },
    image: {
      type: String,
      required: [true, movieErrorMessages.imageRequired],
      validate: {
        validator: (v) => validator.isURL(v),
        message: movieErrorMessages.invalidURL,
      },
    },
    trailerLink: {
      type: String,
      required: [true, movieErrorMessages.trailerLinkRequired],
      validate: {
        validator: (v) => validator.isURL(v),
        message: movieErrorMessages.invalidURL,
      },
    },
    thumbnail: {
      type: String,
      required: [true, movieErrorMessages.thumbnailRequired],
      validate: {
        validator: (v) => validator.isURL(v),
        message: movieErrorMessages.invalidURL,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, movieErrorMessages.ownerRequired],
    },
    movieId: {
      type: Number,
      required: [true, movieErrorMessages.movieIdRequired],
    },
    nameRU: {
      type: String,
      required: [true, movieErrorMessages.nameRURequired],
    },
    nameEN: {
      type: String,
      required: [true, movieErrorMessages.nameENRequired],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
