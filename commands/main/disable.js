const Command = require('../../utils/baseCommand.js');

class Disable extends Command {
  constructor(prefix) {
    super(
      'toggle',
      'toggle (cmd)',
      'Disable (category) commands **per guild**',
      {
        prefix: prefix,
        admin: false,
        alias: ['enable', 'disable']
      }
    );

    this.blacklist = ['help', 'toggle'];
  }

  isBlacklisted(name) {
    return this.blacklist.includes(name);
  }

  usageEmbed(error = '') {
    const data = [];
    data.push('**channel_id:** 18 digits (turn on developer mode to see them)');
    data.push('**channel_mention:** example - #general');
    data.push('**channel_name:** example - general');
    data.push('**all:** ignore all channels, except current one');
    data.push('**clear:** clear ignore list');
    data.push('**list:** show current ignore list');

    const embed = this.MessageEmbed().setColor('#8fde5d');

    if (error) {
      embed.addField('An error has occurred!', error);
    }

    embed
      .addField('Usage', this.usage)
      .addField('Options', data.join('\n'))
      .setTimestamp();

    return embed;
  }

  async run(client, message, args) {
    let disabled = require('../../utils/databases/server/disabledCommands.json');

    if (args[0] == 'list') {
      if (!disabled[message.guild.id])
        return message.channel.send('Meowster, no commands are disabled!');

      let guildDisabled = disabled[message.guild.id];
      let reply = '';

      for (let key in guildDisabled) {
        reply += `\n  ${key.toUpperCase()}`;

        for (let cmdName of guildDisabled[key]) {
          reply += `\n    ${cmdName}`;
        }

        if (
          Object.keys(guildDisabled).indexOf(key) !=
          Object.keys(guildDisabled).length - 1
        )
          reply += '\n';
      }

      reply = `Disabled Commands\n\`\`\`${reply}\`\`\``;

      return message.channel.send(reply);
    }

    let command = client.commands.find(
      cmd => cmd.name == args[0] || cmd.alias.includes(args[0])
    );

    if (!command) return message.channel.send('Invalid command/category');

    if (command.category) {
      if (args.length == 1) {
        if (!disabled[message.guild.id]) disabled[message.guild.id] = {};

        if (!disabled[message.guild.id][command.name]) {
          disabled[message.guild.id][command.name] = client[command.name].map(
            cmd => cmd.name
          );
          this.saveJsonFile(
            `./utils/databases/server/disabledCommands.json`,
            JSON.stringify(disabled, null, 4)
          );
          return message.channel.send(
            `Disabled All **${command.name.toUpperCase()}** Category Commands!`
          );
        } else {
          delete disabled[message.guild.id][command.name];
          if (Object.keys(disabled[message.guild.id]).length == 0)
            delete disabled[message.guild.id];
          this.saveJsonFile(
            `./utils/databases/server/disabledCommands.json`,
            JSON.stringify(disabled, null, 4)
          );
          return message.channel.send(
            `Enabled All **${command.name.toUpperCase()}** Category Commands!`
          );
        }
      }

      let childCommand = client[args[0]].find(
        cmd => cmd.name == args[1] || cmd.alias.includes(args[1])
      );
      if (!childCommand)
        return message.channel.send('Invalid category command');

      if (this.isBlacklisted(childCommand.name))
        return message.channel.send(
          "Sorry meowster, but these commands can't be disabled!"
        );

      if (!disabled[message.guild.id]) disabled[message.guild.id] = {};

      if (!disabled[message.guild.id][command.name]) {
        disabled[message.guild.id][command.name] = [childCommand.name];
        this.saveJsonFile(
          `./utils/databases/server/disabledCommands.json`,
          JSON.stringify(disabled, null, 4)
        );
        return message.channel.send(
          `Disabled **${command.name.toUpperCase()} ${childCommand.name.toUpperCase()}** Category Command!`
        );
      } else {
        if (
          disabled[message.guild.id][command.name].includes(childCommand.name)
        ) {
          disabled[message.guild.id][command.name] = disabled[message.guild.id][
            command.name
          ].filter(cmdName => cmdName != childCommand.name);
          if (disabled[message.guild.id][command.name].length == 0)
            delete disabled[message.guild.id][command.name];
          if (Object.keys(disabled[message.guild.id]).length == 0)
            delete disabled[message.guild.id];
          this.saveJsonFile(
            `./utils/databases/server/disabledCommands.json`,
            JSON.stringify(disabled, null, 4)
          );
          return message.channel.send(
            `Enabled **${command.name.toUpperCase()} ${childCommand.name.toUpperCase()}** Category Command!`
          );
        } else {
          disabled[message.guild.id][command.name].push(childCommand.name);
          this.saveJsonFile(
            `./utils/databases/server/disabledCommands.json`,
            JSON.stringify(disabled, null, 4)
          );
          return message.channel.send(
            `Disabled **${command.name.toUpperCase()} ${childCommand.name.toUpperCase()}** Category Command!`
          );
        }
      }
    } else {
      if (this.isBlacklisted(command.name))
        return message.channel.send(
          "Sorry meowster, but these commands can't be disabled!"
        );

      if (!disabled[message.guild.id]) disabled[message.guild.id] = {};
      if (!disabled[message.guild.id]['main'])
        disabled[message.guild.id]['main'] = [];

      if (disabled[message.guild.id]['main'].includes(command.name)) {
        disabled[message.guild.id]['main'] = disabled[message.guild.id][
          'main'
        ].filter(cmdName => cmdName != command.name);
        if (disabled[message.guild.id]['main'].length == 0)
          delete disabled[message.guild.id]['main'];
        if (Object.keys(disabled[message.guild.id]).length == 0)
          delete disabled[message.guild.id];

        this.saveJsonFile(
          `./utils/databases/server/disabledCommands.json`,
          JSON.stringify(disabled, null, 4)
        );
        return message.channel.send(
          `Enabled **${command.name.toUpperCase()}** Command!`
        );
      } else {
        disabled[message.guild.id]['main'].push(command.name);
        this.saveJsonFile(
          `./utils/databases/server/disabledCommands.json`,
          JSON.stringify(disabled, null, 4)
        );
        return message.channel.send(
          `Disabled **${command.name.toUpperCase()}** Command!`
        );
      }
    }
  }
}

module.exports = Disable;
