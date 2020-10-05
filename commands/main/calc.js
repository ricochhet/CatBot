const Command = require('../../bot/command.js');

class Calc extends Command {
  constructor() {
    super(
      'calc',
      'calc [command] [command arguments]',
      'Math/Calculation (MHWI)',
      {
        category: true,
        subTree: 'math'
      }
    );
  }
}

module.exports = Calc;
