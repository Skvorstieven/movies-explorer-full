const router = require('express').Router();

const usersRoute = require('./users');
const moviesRoute = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  signupValidation,
  signinValidation,
} = require('../utils/validationRules');
const { errorMessages } = require('../utils/constants');

// Registration route
router.post('/signup', signupValidation, createUser);

// Authorization route
router.post('/signin', signinValidation, login);

// Setup authorization middleware
router.use(auth);

// Logout route
router.post('/signout', logout);

// Users routes
router.use('/users', usersRoute);

// Movies routes
router.use('/movies', moviesRoute);

// Catch nonexisting routes
router.use('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.pageNotFound));
});

module.exports = router;
