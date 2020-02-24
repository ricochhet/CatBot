const Command = require('../../utils/baseCommand.js');

class Mhw extends Command {
  constructor(prefix) {
    super(
      'mhw',
      'mhw [command] [command arguments]',
      'MHW - Monster Hunter World: Iceborne',
      {
        category: true,
        prefix: prefix
      }
    );
  }
}

module.exports = Mhw;
