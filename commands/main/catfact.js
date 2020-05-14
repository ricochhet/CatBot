const Command = require('../../utils/command.js');

class Catfacts extends Command {
  constructor(prefix) {
    super('catfact', 'catfact', 'Shows a random cat fact', {
      args: false,
      prefix: prefix
    });
  }

  async run(client, message, args) {
    message.reply(
      `CatFacts has been moved to ${this.prefix}cat facts, Also feel free to check out our new command ${this.prefix}cat pics`
    );
  }
}

module.exports = Catfacts;
