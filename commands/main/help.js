const Command = require('../../utils/command.js');

const color = '#8fde5d';

class Help extends Command {
  constructor() {
    super('help', 'help', 'List all commands and their information', {
      args: false
    });
  }

  async run(client, message, args) {
    const prefix = await client.prefix(message);
  }
}

module.exports = Help;
