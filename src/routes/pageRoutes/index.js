const menu = require('./menu');
const signIn = require('./signIn');
const signUp = require('./signUp');
const cart = require('./cart');
const publicFolder = require('./public');

const pageRoutes = {
  'sign-up': signUp,
  'sign-in': signIn,
  index: menu,
  'my-cart': cart,
  'payment': 'any',
  'public': publicFolder,
};

module.exports = pageRoutes;
