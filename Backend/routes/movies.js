const router = require('express').Router();

const {
  movieIdValidation,
  movieCreateValidation,
} = require('../utils/validationRules');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// Route to get movies that belong to current user
router.get('/', getMovies);

// Route to create new movie
router.post('/', movieCreateValidation, createMovie);

// Route to delete movie by id
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
