const server = require('./src/server');
const workers = require('./src/workers');

// Todo: add worker that will delete all expired tokens
const app = {};

app.init = () => {
  server.init();

  workers.init();
};

app.init();
