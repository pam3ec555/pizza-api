const users = require('./users');
const menu = require('./menu');
const cart = require('./cart');
const login = require('./auth/login');
const logout = require('./auth/logout');

const index = {
  ...users,
  ...menu,
  ...cart,

  login,
  logout,

  notFound: (data, callback) => {
    callback(404);
  },
};

module.exports = index;
