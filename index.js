const server = require('./src/server');

// Todo: add worker that will delete all expired tokens
const app = {};

app.init = () => {
  server.init();
};

app.init();
