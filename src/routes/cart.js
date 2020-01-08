const fieldValidation = require('../utils/fieldValidation');
const { objectSize } = require('../utils');
const store = require('../store');
const { userDataByToken } = require('../auth');
const { CARTS_DIR, MENU_DIR, PIZZA_LIST_FILE } = require('../utils/constants');

/**
 * @type {Set<string>}
 */
const acceptableMethods = new Set(['post', 'get', 'put', 'delete']);

const routes = {};

/**
 * @param {Object} data
 * @param {function} callback
 */
routes.cart = (data, callback) => {
  if (acceptableMethods.has(data.method)) {
    routes._cart[data.method](data, callback);
  } else {
    callback(405);
  }
};

routes._cart = {};

/**
 * @param {Object} data
 * @param {function} callback
 */
routes._cart.post = (data, callback) => {
  if (typeof data === 'object' && typeof data.payload === 'object') {
    const { itemId, count = 1 } = data.payload;
    const errors = {
      itemId: fieldValidation(itemId, { requiredField: true, type: 'number' }),
      count: fieldValidation(count, { requiredField: true, type: 'number' }),
    };
    if (objectSize(errors) === 0) {
      userDataByToken(data.headers.token, (err, userData) => {
        if (!err && userData) {
          store.read({
            dir: CARTS_DIR,
            file: userData.email,
            callback: (err, cartData) => {
              if (!err && Array.isArray(cartData)) {
                const item = cartData.find((item) => item.itemId === itemId);
                if (typeof item === 'undefined') {
                  store.read({
                    dir: MENU_DIR,
                    file: PIZZA_LIST_FILE,
                    callback: (err, pizzaList) => {
                      if (!err && Array.isArray(pizzaList)) {
                        const pizza = pizzaList.find(({ id }) => id === itemId);
                        if (typeof pizza === 'object') {
                          store.update({
                            dir: CARTS_DIR,
                            file: userData.email,
                            data: [...cartData, { itemId, count }],
                            callback: (err) => {
                              if (!err) {
                                callback(204);
                              } else {
                                callback(500, { error: err });
                              }
                            },
                          });
                        } else {
                          callback(400, { error: 'Pizza that you want to add to the cart does not exist!' });
                        }
                      } else {
                        callback(500, { error: err });
                      }
                    },
                  });
                } else {
                  callback(400, { error: 'This item is already in the cart.' });
                }
              } else {
                store.create({
                  dir: CARTS_DIR,
                  file: userData.email,
                  data: [{ itemId, count }],
                  callback: (err) => {
                    if (!err) {
                      callback(204);
                    } else {
                      callback(500, { error: err });
                    }
                  },
                });
              }
            },
          });
        } else {
          callback(401, { error: err });
        }
      });
    } else {
      callback(400, { error: errors });
    }
  } else {
    callback(400, { error: 'Payload must be an object' });
  }
};

/**
 * @param {Object} data
 * @param {function} callback
 */
routes._cart.get = (data, callback) => {
  userDataByToken(data.headers.token, (err, userData) => {
    if (!err && userData) {
      store.read({
        dir: CARTS_DIR,
        file: userData.email,
        callback: (err, cartData) => {
          if (!err) {
            callback(200, cartData);
          } else if (err.code === 'ENOENT') {
            callback(200, []);
          } else {
            callback(500, { error: err });
          }
        },
      });
    } else {
      callback(401, { error: err });
    }
  });
};

/**
 * @param {Object} data
 * @param {function} callback
 */
routes._cart.put = (data, callback) => {
  if (
    typeof data === 'object' &&
    typeof data.payload === 'object' &&
    typeof data.query === 'object' &&
    typeof data.query.itemId === 'string'
  ) {
    const { count } = data.payload;
    const countError = fieldValidation(count, { requiredField: true, type: 'number' });
    if (typeof countError === 'undefined') {
      userDataByToken(data.headers.token, (err, userData) => {
        if (!err && typeof userData === 'object') {
          store.read({
            dir: CARTS_DIR,
            file: userData.email,
            callback: (err, cartData) => {
              if (!err && Array.isArray(cartData)) {
                let { itemId } = data.query;
                itemId = +itemId;
                const item = cartData.find((item) => item.itemId === itemId);
                if (typeof item === 'object') {
                  if (item.count !== count) {
                    store.update({
                      dir: CARTS_DIR,
                      file: userData.email,
                      data: cartData.map((item) => item.itemId === itemId ? ({ ...item, count }) : item),
                      callback: (err) => {
                        if (!err) {
                          callback(204);
                        } else {
                          callback(500, { error: err });
                        }
                      },
                    })
                  } else {
                    callback(400, { error: 'There is nothing to change.' });
                  }
                } else {
                  callback(404, { error: 'Specified cart item is not defined.' });
                }
              } else if (err.code === 'ENOENT') {
                callback(400, { error: 'Cart is empty!' });
              } else {
                callback(500, { error: err });
              }
            },
          });
        } else {
          callback(401, { error: err });
        }
      });
    } else {
      callback(400, { error: { count: countError } });
    }
  } else {
    callback(400, { error: 'Payload must be an object and itemId should be in query params' });
  }
};

/**
 * @param {Object} data
 * @param {function} callback
 */
routes._cart.delete = (data, callback) => {
  if (typeof data.query === 'object' && typeof data.query.itemId === 'string') {
    userDataByToken(data.headers.token, (err, userData) => {
      if (!err && typeof userData === 'object') {
        store.read({
          dir: CARTS_DIR,
          file: userData.email,
          callback: (err, cartData) => {
            if (!err && Array.isArray(cartData)) {
              let { itemId } = data.query;
              itemId = +itemId;
              const item = cartData.find((item) => item.itemId === itemId);
              if (typeof item === 'object') {
                store.update({
                  dir: CARTS_DIR,
                  file: userData.email,
                  data: cartData.filter((item) => item.itemId !== itemId),
                  callback: (err) => {
                    if (!err) {
                      callback(204);
                    } else {
                      callback(500, { error: err });
                    }
                  },
                })
              } else {
                callback(400, { error: 'Specified cart item is not defined. There is nothing to delete.' });
              }
            } else if (err.code === 'ENOENT') {
              callback(400, { error: 'Cart is empty! There is nothing to delete.' });
            } else {
              callback(500, { error: err });
            }
          },
        });
      } else {
        callback(401, { error: err });
      }
    });
  } else {
    callback(400, { error: 'itemId should be in query params' });
  }
};

module.exports = routes;
