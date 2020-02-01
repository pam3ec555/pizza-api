const menuItems = require('./menuItems');
const help = require('./help');
const exit = require('./exit');

const responders = {
  menuItems,
  help,
  exit,
};

module.exports = responders;
