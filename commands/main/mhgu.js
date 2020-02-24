const Command = require('../../utils/baseCommand.js');

class Mhgu extends Command {
  constructor(prefix) {
    super(
      'mhgu',
      'mhgu [command] [command arguments]',
      'MHGU - Monster Hunter Generations Ultimate',
      {
        category: true,
        prefix: prefix
      }
    );
  }
}

module.exports = Mhgu;
