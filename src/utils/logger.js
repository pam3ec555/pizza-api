const logger = {};

/**
 * @param {*} message
 */
logger.error = (message) => {
  console.error('\x1b[31m%s\x1b[0m', message);
};

module.exports = logger;
