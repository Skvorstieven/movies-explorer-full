// Module that creates server (required for autotests to work)

// Main app import
const app = require('./app');

// Port setup
const { PORT } = require('./config');

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
