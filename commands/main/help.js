const Command = require('../../utils/command.js');

class Help extends Command {
  constructor() {
    super('help', 'help', 'List all commands and their information', {
      args: false
    });
  }

  async run(client, message, args) {
    const rico = client.users.cache.get(client.config['user_ids']['rico_id']);
    const helpEmbed = this.MessageEmbed().setColor('#8fde5d');
    const prefix = await client.prefix(message);

    let data = [];
    data = [];
    client.commands
      .filter(cmd => cmd.calc != true)
      .forEach(cmd => {
        if (cmd.category && !cmd.secret) {
          data.push(`**${prefix}${cmd.name}** - ${cmd.description}`);
        }
      });
    helpEmbed.addField('Main', data.join('\n'));

    // Other Commands w/o Args
    data = [];
    client.commands.forEach(cmd => {
      if (!cmd.category && !cmd.secret) {
        if (
          !cmd.admin ||
          (cmd.admin && message.member.hasPermission('ADMINISTRATOR'))
        )
          data.push(`**${prefix}${cmd.name}** - ${cmd.description}`);
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
      .addField('\u200b', '\u200b')
      .addField(
        'Experiencing Issues? ',
        `\`\`\`Contact ${rico.tag} | Do ${prefix}support\`\`\``
      )
      .addField(
        'Links',
        '[Vote](https://top.gg/bot/573958899582107653/vote) [Support](https://discord.gg/srNyk8G) [Invite](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)'
      )
      .setTimestamp()
      .setFooter(
        `Help | Issues: Contact ${rico.tag} | Do ${prefix}support`,
        client.user.avatarURL()
      );

    let embeds = [helpEmbed];

    client.commands
      .filter(cmd => cmd.calc != true)
      .forEach(cmd => {
        if (cmd.category) {
          if (!cmd.secret) embeds.push(cmd.usageEmbed(prefix));
        }
      });

    let reactions = {};
    this.menu(
      message,
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
