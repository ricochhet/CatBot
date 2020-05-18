const Command = require('../../utils/command.js');

class SetPrefix extends Command {
  constructor() {
    super(
      'prefix',
      'prefix [someSymbol]',
      'Will set the bots prefix for this server only',
      {
        admin: true,
        alias: ['setprefix']
      }
    );
    this.caseSensitiveArgs = true;
  }

  async run(client, message, args) {
    let prefixes = require('../../utils/prefixs.json');
    const requestedPrefix = args[0];

    if (
      requestedPrefix == client.config['bot']['defaultPrefix'] &&
      prefixes[message.guild.id]
    ) {
      delete prefixes[message.guild.id];
      message.channel.send(
        `Prefix has been set to the default \`${client.config['bot']['defaultPrefix']}\``
      );
    } else {
      if (
        prefixes[message.guild.id] == requestedPrefix ||
        (!prefixes[message.guild.id] &&
          requestedPrefix == client.config['bot']['defaultPrefix'])
      )
        return message.channel.send(`Please only set **different** prefixes`);

      message.channel.send(`Prefix has been set to \`${requestedPrefix}\``);
      prefixes[message.guild.id] = requestedPrefix;
    }

    this.saveJsonFile(
      './utils/prefixs.json',
      JSON.stringify(prefixes, null, 4)
    );
  }
}

module.exports = SetPrefix;
