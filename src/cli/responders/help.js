const { horizontalLine, centered } = require('../utils');
const logger = require('../../utils/logger');

const data = [
  {
    command: 'help',
    description: 'Show this help page',
  },
  {
    command: 'exit',
    description: 'Kill the CLI (and the rest of the application)',
  },
  {
    command: 'menu list',
    description: 'Show table of menu items',
  },
];

const help = () => {
  horizontalLine();
  centered('Help');
  logger.table(data);
  horizontalLine();
};

module.exports = help;
