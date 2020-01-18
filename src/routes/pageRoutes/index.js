const menu = require('./menu');

const pageRoutes = {
  'sign-up': 'any',
  'sign-in': 'any',
  'logout': 'any',
  'index': menu,
  'cart': 'any',
  'order': 'any',
};

module.exports = pageRoutes;
