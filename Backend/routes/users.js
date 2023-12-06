const router = require('express').Router();

const {
  updateUserValidation,
} = require('../utils/validationRules');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// Route to get information about current user
router.get('/me', getCurrentUser);

// Route to update current user information
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
