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

  usageEmbed(prefix) {
    let embed = this.MessageEmbed()
      .setColor('#8fde5d')
      .setDescription(`Current Prefix: **${prefix}**`)
      .addField('Usage: ', this.usage, false)
      .addField('Description: ', this.description, false)
      .setTimestamp();

    return embed;
  }

  async run(client, message, args) {
    // API version, probably something like this
    // let prefixes = await client.apiClient.getCustomPrefixes();

    let prefixes = require('../../data/prefixes.json');
    const requestedPrefix = args[0];

    if (requestedPrefix.length > 6)
      return message.channel.send(
        'New prefix is too long,You can only set a prefix of length from **1 to 6**'
      );

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
        return message.channel.send(`Please use a **different** prefix`);

      message.channel.send(`Prefix has been set to \`${requestedPrefix}\``);
      prefixes[message.guild.id] = requestedPrefix;
    }

    // API version, probably something like this
    // client.apiClient.updateCustomPrefixes(prefixes);

    this.saveJsonFile(
      './data/prefixes.json',
      JSON.stringify(prefixes, null, 4)
    );
  }
}

module.exports = SetPrefix;
