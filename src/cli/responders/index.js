const menuItems = require('./menuItems');
const help = require('./help');
const exit = require('./exit');
const orders = require('./orders');
const order = require('./order');

const responders = {
  menuItems,
  help,
  exit,
  orders,
  order,
};

module.exports = responders;
