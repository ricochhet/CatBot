const Command = require('../../utils/command.js');

class Pic extends Command {
  constructor(prefix) {
    super('pics', 'pics', 'Shows a random cat pictures', {
      args: false
    });
  }

  async run(client, message, args) {
    message.reply('Pong');
  }
}

module.exports = Pic;
