const Command = require('../../utils/command.js');
const DisableCmdHandler = require('../../utils/disableCmdHandler.js');
const logger = require('../../utils/log.js');

class Toggle extends Command {
  constructor(prefix) {
    super(
      'toggle',
      'toggle [command | category | list]',
      'Disable (category) commands **per guild**',
      {
        prefix: prefix,
        admin: true,
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
    data.push('**list:** show all the disabled commands');
    data.push('**category:** toggle a whole category on/off, e.g `lfg`');
    data.push(
      '**command:** toggle one command on/off, e.g. `lfg subscribe`, `catfact`'
    );

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
    const handler = new DisableCmdHandler(client.apiClient);

    await handler.initDb().catch(err => {
      logger.error(err);
      return message.channel.send(this.serverErrorEmbed());
    });

    const guildId = message.guild.id;

    if (args[0] == 'list') {
      if (!handler.isGuildInDB(guildId))
        return message.channel.send('⚠️ Meowster, no commands are disabled!');

      let reply = handler.getDisabledList(guildId);

      reply = `Disabled Commands\n\`\`\`${reply}\`\`\``;

      return message.channel.send(reply);
    }

    const command = client.commands.find(
      cmd => cmd.name == args[0] || cmd.alias.includes(args[0])
    );

    if (!command) return message.channel.send('⚠️ Invalid command/category');

    if (command.category && args.length == 1) {
      // user wants to toggle a whole category
      const category = command.subTree;

      if (handler.isCategoryDisabled(guildId, category)) {
        handler.enableCategory(guildId, category);
        return message.channel.send(
          `✅ Enabled all **${category.toUpperCase()}** commands!`
        );
      } else {
        const subCmds = client[category].map(cmd => cmd.name);

        handler.disableCategory(guildId, category, subCmds);
        return message.channel.send(
          `❌ Disabled all **${category.toUpperCase()}** commands!`
        );
      }
    }

    // user wants to toggle a specific command
    let category, name;
    if (command.category) {
      category = command.name;

      // find subcommand (by name or alias)
      const childCommand = client[category].find(
        cmd => cmd.name == args[1] || cmd.alias.includes(args[1])
      );

      if (!childCommand) return message.channel.send('⚠️ Invalid sub command');

      name = childCommand.name;
    } else {
      category = 'main';
      name = command.name;
    }

    if (this.isBlacklisted(name)) {
      return message.channel.send(
        "⚠️ Sorry meowster, but that command can't be disabled!"
      );
    }

    if (handler.isCommandDisabled(guildId, category, name)) {
      handler.enableCommand(guildId, category, name);
      category = category == 'main' ? '' : category + ' ';

      return message.channel.send(
        `✅ Enabled the command **${category}${name}**!`
      );
    } else {
      handler.disableCommand(guildId, category, name);
      category = category == 'main' ? '' : category + ' ';

      return message.channel.send(
        `❌ Disabled the command **${category}${name}**!`
      );
    }
  }
}

module.exports = Toggle;
