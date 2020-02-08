const Command = require('../../utils/baseCommand.js');

class Mhw extends Command {
  constructor(prefix) {
    super('mhw', 'mhw', 'MHW - Monster Hunter World: Iceborne', {
      category: true,
      prefix: prefix
    });
  }
}

module.exports = Mhw;
