const menu = require('./menu');

const pageRoutes = {
  'sign-up': 'any',
  'sign-in': 'any',
  'sign-out': 'any',
  'index': menu,
  'cart': 'any',
  'order': 'any',
};

module.exports = pageRoutes;
