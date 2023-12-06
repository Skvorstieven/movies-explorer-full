const http2 = require('http2');

const {
  findAllMovies,
  createMovie,
  findMovieById,
  deleteMovie,
} = require('../utils/databaseHandler');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { errorMessages } = require('../utils/constants');

const http2Constants = http2.constants;
// Movies controller

// Get all movies that belong to current user
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  findAllMovies(owner)
    .then((movies) => res.send(movies))
    .catch(next);
};

// Create new movie
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  createMovie({
    director,
    country,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(http2Constants.HTTP_STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // Throw 400 error if validation of sent data fails
        next(new BadRequestError(errorMessages.movieBadRequest));
      } else {
        next(err);
      }
    });
};

// Delete movie by id
module.exports.deleteMovie = (req, res, next) => {
  findMovieById(req.params.movieId) // Find movie by id
    .orFail(new NotFoundError(errorMessages.movieNotFound))
    .then((movie) => {
      if (movie.owner.valueOf() === req.user._id) { // Check if movie belongs to user
        deleteMovie(movie) // Delete movie
          .then((deletedMovie) => res
            .status(http2Constants.HTTP_STATUS_NO_CONTENT)
            .send(deletedMovie))
          .catch((err) => {
            if (err.name === 'CastError') {
              // Throw 400 error if id isn't valid
              next(new BadRequestError(errorMessages.movieWrongId));
            } else {
              next(err);
            }
          });
      } else {
        // Throw 403 error if movie doesn't belong to user
        next(new ForbiddenError(errorMessages.movieDeleteForbidden));
      }
    })
    .catch(next);
};
