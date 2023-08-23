// App config

// Get JWT secret key from .env or use placeholder
const jwtKey = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

// Get port and database URL info from .env or use placeholders
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

// Setup database name
const databaseURL = MONGO_URL;

// Get allowed CORS adresses from .env or use placeholder
const allowedCors = process.env.NODE_ENV === 'production' ? process.env.ALLOWED_CORS.split(',') : ['http://localhost:3000', 'http://localhost:3006'];

module.exports = {
  allowedCors,
  databaseURL,
  PORT,
  jwtKey,
};
