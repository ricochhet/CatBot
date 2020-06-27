const Command = require('../../utils/command.js');

class Catfacts extends Command {
  constructor() {
    super('catfact', 'catfact', 'Shows a random cat fact', {
      args: false
    });
  }

  async run(client, message, args) {
    const prefix = await client.prefix(message);
    message.reply(
      `CatFacts has been moved to ${prefix}cat facts, Also feel free to check out our new command ${prefix}cat pics`
    );
  }
}

module.exports = Catfacts;
