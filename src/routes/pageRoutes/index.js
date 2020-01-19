const menu = require('./menu');
const publicFolder = require('./public');

const pageRoutes = {
  'sign-up': 'any',
  'sign-in': 'any',
  'logout': 'any',
  'index': menu,
  'cart': 'any',
  'order': 'any',
  'public': publicFolder,
};

module.exports = pageRoutes;
