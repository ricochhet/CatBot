const Command = require('../../utils/command.js');

class Catfacts extends Command {
  constructor() {
    super('catfact', 'catfact', 'Shows a random cat fact', {
      args: false
    });
  }

  async run(client, message, args) {
    message.reply(
      `CatFacts has been moved to ${client.prefix(
        message
      )}cat facts, Also feel free to check out our new command ${client.prefix(
        message
      )}cat pics`
    );
  }
}

module.exports = Catfacts;
