const Command = require('../../utils/command.js');

class Lfg extends Command {
  constructor(prefix) {
    super(
      'lfg',
      'lfg [command] [command arguments]',
      'LFG - Looking For Group',
      {
        category: true,
        prefix: prefix
      }
    );

    this.caseSensitiveArgs = true;
  }
}

module.exports = Lfg;
