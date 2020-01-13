const server = require('./src/server');
const mailgun = require('./src/api/mailgun');

// Todo: add worker that will delete all expired tokens
const app = {};

app.init = () => {
  server.init();
};

app.init();
