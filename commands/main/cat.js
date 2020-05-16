const Command = require('../../utils/command.js');

class Cat extends Command {
  constructor(prefix) {
    super(
      'cat',
      'cat [command] [command arguments]',
      'CAT - Where we show our love for cats',
      {
        category: true,
        prefix: prefix
      }
    );
  }
}

module.exports = Cat;
