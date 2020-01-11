const users = require('./users');
const menu = require('./menu');
const cart = require('./cart');
const orders = require('./orders');
const login = require('./auth/login');
const logout = require('./auth/logout');

const index = {
  ...users,
  ...menu,
  ...cart,
  ...orders,

  login,
  logout,

  notFound: (data, callback) => {
    callback(404);
  },
};

module.exports = index;
