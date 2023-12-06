// Main app

// External modules import
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();

// Internal modules import
const { databaseURL, allowedCors } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { rateLimiter } = require('./middlewares/rateLimiter');

// Routes import
const indexRoutes = require('./routes/index');

// Create express app
const app = express();

// Connect to database
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to MongoDB'));

// Security middlware setup
app.use(helmet());

// Parsers setup
app.use(express.json());
app.use(cookieParser());

// Request logger setup
app.use(requestLogger);

// CORS middlware setup
app.use(cors({
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
}));

// Rate limiter setup
app.use(rateLimiter);

// Routes setup
app.use(indexRoutes);

// Error logger setup
app.use(errorLogger);

// Celebrate error handler setup
app.use(errors());

// Centalized error handler setup
app.use((error, req, res, next) => {
  errorHandler(error, req, res, next);
});

module.exports = app;
