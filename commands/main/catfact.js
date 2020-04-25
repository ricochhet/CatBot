const Command = require('../../utils/baseCommand.js');

class Catfacts extends Command {
  constructor(prefix) {
    super('catfact', 'catfact', 'Shows a random cat fact', {
      args: false,
      prefix: prefix
    });
  }

  async run(client, message, args) {
    const catFactKeys = Object.values(JSON.parse(client.catfacts));

    message.channel.send(
      catFactKeys[Math.floor(Math.random() * catFactKeys.length)]
    );
  }
}

module.exports = Catfacts;
