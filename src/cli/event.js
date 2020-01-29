const EventEmitter = require('events');
const responders = require('./responders');

class PizzaEventEmitter extends EventEmitter {

}

/**
 * @type {PizzaEventEmitter}
 */
const event = new PizzaEventEmitter();

event.on('menu list', () => {
  responders.menuItems();
});

module.exports = event;
