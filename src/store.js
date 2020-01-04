const path = require('path');
const fs = require('fs');
const { appDir, jsonParse } = require('./utils');

const store = {};

/**
 * @type {string}
 */
store._baseDir = path.join(appDir, '/.data/');

/**
 * @param {string} dir
 * @param {string} file
 * @return {string}
 */
store._getFilePath = (dir, file) => `${store._baseDir}${dir}/${file}.json`;

/**
 * @param {string} dir
 * @param {string} file
 * @param {Object} data
 * @param {function(err: string|boolean)} callback
 */
store.create = ({
  dir,
  file,
  data,
  callback,
}) => {
  fs.open(store._getFilePath(dir, file), 'wx', (err, fd) => {
    if (!err && fd) {
      fs.writeFile(fd, JSON.stringify(data), (err) => {
        if (!err) {
          fs.close(fd, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback(`Could not close the file (${file}.json) after writing. ${err}`);
            }
          })
        } else {
          callback(`Could not write to the file (${file}.json). ${err}`);
        }
      });
    } else {
      callback(`Could not open the file (${file}.json) for writing. It may already exist. ${err}`);
    }
  });
};

/**
 * @param {string} dir
 * @param {string} file
 * @param {function(err: string|null|boolean, data?: Object)} callback
 */
store.read = ({
  dir,
  file,
  callback,
}) => {
  fs.readFile(store._getFilePath(dir, file), 'utf8', (err, data) => {
    if (!err && typeof data === 'string') {
      callback(false, jsonParse(data));
    } else {
      callback(err, data);
    }
  });
};

/**
 * @param {string} dir
 * @param {string} file
 * @param {Object} data
 * @param {function(err: string|boolean)} callback
 */
store.update = ({
  dir,
  file,
  data,
  callback,
}) => {
  fs.open(store._getFilePath(dir, file), 'r+', (err, fd) => {
    if (!err && fd) {
      fs.ftruncate(fd, (err) => {
        if (!err) {
          fs.writeFile(fd, JSON.stringify(data), (err) => {
            if (!err) {
              fs.close(fd, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback(`Could not close the file (${file}.json) while updating.`);
                }
              });
            } else {
              callback(`Could not write data to file (${file}.json) while updating.`);
            }
          });
        } else {
          callback(`Could not truncate the file (${file}.json)`);
        }
      });
    } else {
      callback(`Could not open the file (${file}.json) for updating. It may not exist yet`);
    }
  });
};

/**
 * @param {string} dir
 * @param {string} file
 * @param {function(err: string|boolean)} callback
 */
store.delete = ({
  dir,
  file,
  callback,
}) => {
  fs.unlink(store._getFilePath(dir, file), (err) => {
    callback(err);
  });
};

module.exports = store;
