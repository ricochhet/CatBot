const Command = require('../../utils/command.js');

class Cat extends Command {
  constructor(prefix) {
    super('cat', 'cat [command] [command arguments]', 'cat - cause why not', {
      category: true,
      prefix: prefix
    });
  }
}

module.exports = Cat;
