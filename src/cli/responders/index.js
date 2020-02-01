const menuItems = require('./menuItems');
const help = require('./help');
const exit = require('./exit');
const orders = require('./orders');

const responders = {
  menuItems,
  help,
  exit,
  orders,
};

module.exports = responders;
