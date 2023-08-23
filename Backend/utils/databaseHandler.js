const User = require('../models/user');
const Movie = require('../models/movie');

// Database handler utility

// Find user by id
function findUserById(userId) {
  return User.findById(userId);
}

// Find user by id and update
function findUserByIdAndUpdate(userId, reqBody) {
  return User.findByIdAndUpdate(userId, reqBody, {
    new: true,
    runValidators: true,
  });
}

// Create new user
function createUser(reqBody) {
  return User.create(reqBody);
}

// Find user by credentials
function findUserByCredentials(email, password) {
  return User.findUserByCredentials(email, password);
}

// Find movie by id
function findMovieById(movieId) {
  return Movie.findById(movieId);
}

// Delete movie by id
function deleteMovie(movieId) {
  return Movie.deleteOne(movieId);
}

// Create new movie
function createMovie(reqBody) {
  return Movie.create(reqBody);
}

// Find all movies that belong to current user
function findAllMovies(owner) {
  return Movie.find({ owner });
}

module.exports = {
  findUserById,
  findUserByIdAndUpdate,
  createUser,
  findUserByCredentials,
  findMovieById,
  deleteMovie,
  createMovie,
  findAllMovies,
};
