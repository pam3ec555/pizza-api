const users = require('./users');
const menu = require('./menu');
const login = require('./auth/login');
const logout = require('./auth/logout');

const index = {
  ...users,
  ...menu,

  login,
  logout,

  notFound: (data, callback) => {
    callback(404);
  },
};

module.exports = index;
