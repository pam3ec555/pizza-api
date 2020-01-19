const menu = require('./menu');
const publicFolder = require('./public');

const pageRoutes = {
  'sign-up': 'any',
  'sign-in': 'any',
  'index': menu,
  'my-cart': 'any',
  'payment': 'any',
  'public': publicFolder,
};

module.exports = pageRoutes;
