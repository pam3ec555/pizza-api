const pageRoute = require('./pageRoute');

const menu = pageRoute({
  file: 'sign-in',
  templateData: {
    'head.title': 'Login',
  },
});

module.exports = menu;
