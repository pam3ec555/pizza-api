const { userIsLoggedIn } = require('../auth');
const store = require('../store');
const { MENU_DIR, PIZZA_LIST_FILE } = require('../utils/constants');

/**
 * @type {Set<string>}
 */
const acceptableMethods = new Set(['get']);

const routes = {};

/**
 * @param {Object} data
 * @param {function} callback
 */
routes.menu = (data, callback) => {
  if (acceptableMethods.has(data.method)) {
    routes._menu[data.method](data, callback);
  } else {
    callback(405);
  }
};

routes._menu = {};

/**
 * @param {Object} data
 * @param {function} callback
 */
routes._menu.get = (data, callback) => {
  if (typeof data === 'object') {
    userIsLoggedIn({
      token: data.headers.token,
      callback: (err) => {
        if (!err) {
          store.read({
            dir: MENU_DIR,
            file: PIZZA_LIST_FILE,
            callback: (err, pizzaList) => {
              if (!err && pizzaList) {
                callback(200, pizzaList);
              } else {
                callback(500, { error: err });
              }
            },
          });
        } else {
          callback(401, { error: err });
        }
      },
    });
  } else {
    callback(500, { error: '"data" must be an object.' });
  }
};

module.exports = routes;
