const Command = require('../../utils/command.js');

class Catfacts extends Command {
  constructor(prefix) {
    super('catfact', 'catfact', 'Shows a random cat fact', {
      args: false,
      prefix: prefix
    });
  }

  async run(client, message, args) {
    if (!client.catfacts) return message.channel.send(this.serverErrorEmbed());

    const randomIndex = Math.floor(Math.random() * client.catfacts.length);
    message.channel.send(client.catfacts[randomIndex]);
  }
}

module.exports = Catfacts;
