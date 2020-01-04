const users = require('./users');
const login = require('./auth/login');
const logout = require('./auth/logout');

const index = {
  ...users,

  login,
  logout,

  notFound: (data, callback) => {
    callback(404);
  },
};

module.exports = index;
