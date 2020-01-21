const menu = require('./menu');
const signIn = require('./signIn');
const publicFolder = require('./public');

const pageRoutes = {
  'sign-up': 'any',
  'sign-in': signIn,
  index: menu,
  'my-cart': 'any',
  'payment': 'any',
  'public': publicFolder,
};

module.exports = pageRoutes;
