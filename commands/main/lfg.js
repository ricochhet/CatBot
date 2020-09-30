const Command = require('../../bot/command.js');

class Lfg extends Command {
  constructor() {
    super(
      'lfg',
      'lfg [command] [command arguments]',
      'LFG - Looking For Group',
      {
        category: true
      }
    );

    this.caseSensitiveArgs = true;
  }
}

module.exports = Lfg;
