const Command = require('../../utils/baseCommand.js');

class Help extends Command {
  constructor(prefix) {
    super('help', 'help', 'List all commands and their information', {
      args: false,
      prefix: prefix
    });
  }

  run(client, message, args) {
    const rico = client.users.find(user => user.id == '381239423645515776');
    const helpEmbed = this.RichEmbed().setColor('#8fde5d');

    let data = [];
    data = [];
    client.commands
      .filter(cmd => cmd.calc != true)
      .forEach(cmd => {
        if (cmd.category) {
          if (!cmd.secret)
            data.push(`${this.prefix}${cmd.name} - ${cmd.description}`);
        }
      });
    helpEmbed.addField('Main / General', data.join('\n'));

    // Other Commands w/o Args
    data = [];
    client.commands
      .filter(cmd => cmd.args != true)
      .forEach(cmd => {
        if (!cmd.category) {
          if (!cmd.secret)
            data.push(`${this.prefix}${cmd.name} - ${cmd.description}`);
        }
      });
    helpEmbed.addField('General', data.join('\n'));

    // Notes
    data = [];
    data.push('_:bulb: Using a command w/o parameters gets extended help_');
    data.push('[parameter] - Mandatory parameter');
    data.push('(parameter) - Optional paramater');
    helpEmbed.addField('Syntax', data.join('\n'));

    // Additional
    helpEmbed
      .addBlankField()
      .addField(
        'Experiencing Issues? ',
        `\`\`\`Contact ${rico.tag} | Do ${this.prefix}support\`\`\``
      )
      .addField(
        'Links',
        '[Vote](https://top.gg/bot/573958899582107653/vote) [Support](https://discord.gg/srNyk8G) [Invite](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)'
      )
      .setTimestamp()
      .setFooter(
        `Help | Issues: Contact ${rico.tag} | Do ${this.prefix}support`,
        client.user.avatarURL
      );

    let embeds = [helpEmbed];

    client.commands
      .filter(cmd => cmd.calc != true)
      .forEach(cmd => {
        if (cmd.category) {
          if (!cmd.secret) embeds.push(cmd.usageEmbed(message));
        }
      });

    let missingPermissions = false;
    if (
      !message.member.guild.me.hasPermission('MANAGE_MESSAGES') ||
      !message.member.guild.me.hasPermission('ADD_REACTIONS')
    ) {
      let checkPermissions = `💡 *The bot doesn't have* **MANAGE_MESSAGES** *or* **ADD_REACTIONS** *permission!*`;
      missingPermissions = true;
      helpEmbed.setDescription(checkPermissions);
    }

    let reactions = {};
    this.menu(
      message.channel,
      message.author.id,
      embeds,
      120000,
      (reactions = {
        first: '⏪',
        back: '◀',
        next: '▶',
        last: '⏩',
        stop: '⏹'
      }),
      true // override embed footers (with page number)
    );
  }
}

module.exports = Help;
