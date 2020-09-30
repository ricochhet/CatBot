const Command = require('../../bot/command.js');

class Mhgu extends Command {
  constructor() {
    super(
      'mhgu',
      'mhgu [command] [command arguments]',
      'MHGU - Monster Hunter Generations Ultimate',
      {
        category: true
      }
    );
  }
}

module.exports = Mhgu;
