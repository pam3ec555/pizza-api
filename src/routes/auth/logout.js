const store = require('../../store');
const { TOKENS_DIR } = require('../../utils/constants');

/**
 * @param {Object} data
 * @param {function} callback
 */
const logout = (data, callback) => {
  if (data.method === 'post') {
    if (typeof data.query === 'object') {
      const { token } = data.query;
      if (typeof token === 'string') {
        store.delete({
          dir: TOKENS_DIR,
          file: token,
          callback: (err) => {
            if (!err) {
              callback(204);
            } else {
              callback(400, { error: err });
            }
          },
        });
      } else {
        callback(400, { error: '"token" is required' });
      }
    } else {
      callback(400, { error: 'Query params are empty' });
    }
  } else {
    callback(404, { error: 'method must be POST' });
  }
};

module.exports = logout;
