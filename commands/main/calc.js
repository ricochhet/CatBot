const Command = require('../../utils/baseCommand.js');

class Calc extends Command {
  constructor(prefix) {
    super(
      'calc',
      'calc [category] [additional arguments]',
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
