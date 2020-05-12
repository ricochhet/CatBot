const Command = require('../../utils/command.js');

class Calc extends Command {
  constructor(prefix) {
    super(
      'calc',
      'calc [command] [command arguments]',
      'Math/Calculation (MHWI)',
      {
        category: true,
        subTree: 'math',
        prefix: prefix
      }
    );
  }
}

module.exports = Calc;
