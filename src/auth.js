const store = require('./store');
const { TOKENS_DIR } = require('./utils/constants');

const auth = {};

/**
 * @param {string} token
 * @param {string} email
 * @param {function(string|Error|boolean)} callback
 */
auth.verifyToken = ({
  token,
  email,
  callback,
}) => {
  if (typeof token === 'string') {
    store.read({
      dir: TOKENS_DIR,
      file: token,
      callback: (err, data) => {
        if (!err && typeof data === 'object') {
          if (data.email !== email) {
            callback('Access denied!');
          } else if (data.expires > new Date()) {
            callback('Token is expired!');
          } else {
            callback(false);
          }
        } else {
          callback('Invalid token!');
        }
      }
    });
  } else {
    callback('Token is not defined.');
  }
};

module.exports = auth;
