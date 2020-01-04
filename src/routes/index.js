const users = require('./users');

const index = {
  ...users,

  notFound: (data, callback) => {
    callback(404);
  },
};

module.exports = index;
