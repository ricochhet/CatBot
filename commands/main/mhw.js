const Command = require('../../bot/command.js');

class Mhw extends Command {
  constructor() {
    super(
      'mhw',
      'mhw [command] [command arguments]',
      'MHW - Monster Hunter World: Iceborne',
      {
        category: true
      }
    );
  }
}

module.exports = Mhw;
