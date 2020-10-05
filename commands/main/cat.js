const Command = require('../../bot/command.js');

class Cat extends Command {
  constructor() {
    super(
      'cat',
      'cat [command] [command arguments]',
      'CAT - Where we show our love for cats',
      {
        category: true
      }
    );
  }
}

module.exports = Cat;
