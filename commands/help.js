const Discord = require('discord.js');
const menu = require('../util');

module.exports = {
  name: 'help',
  args: false,
  description: 'List all commands and their information',
  run(client, message, args) {
    const helpEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');

    let content = [];
    content = [];
    
    // Main commands
    client.commands.filter(cmd => cmd.calc != true).forEach(cmd => {
      if(cmd.category) {
        if (!cmd.secret) content.push(`+${cmd.name} - ${cmd.description}`);
      }
    });
    helpEmbed.addField('Main / General', content.join('\n'));

    // All Commands w/o Args
    content = [];
    client.commands.filter(cmd => cmd.args != true).forEach(cmd => {
      if(!cmd.category) {
        if (!cmd.secret) content.push(`+${cmd.name} - ${cmd.description}`);
      }
    });
    helpEmbed.addField('General', content.join('\n'));

    // Notes about syntax
    content = [];
    content.push(':bulb: *Using a command w/o parameters will display extended help*')
    content.push('[parameter] - Mandatory parameter');
    content.push('(parameter) - Optional paramater')
    helpEmbed.addField('Syntax', content.join('\n'));

    // Support information
    helpEmbed.addBlankField()
      .addField('Experiencing Issues? ', '```Contact Ricochet#0069 | Do +support```')
      .addField('Links', '[Vote](https://top.gg/bot/573958899582107653/vote) [Support](https://discord.gg/srNyk8G) [Invite](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)')
      .setTimestamp()
      .setFooter('Help | Issues: Contact Ricochet#0069 | Do +support', client.user.avatarURL);
    
    let embeds = [helpEmbed];
    
    embeds.push(client.commands.get('mhw').error());
    embeds.push(client.commands.get('lfg').error());
    embeds.push(client.commands.get('calc').error());
    embeds.push(client.commands.get('mhgu').error());
    
    let reactions = {};
    new menu.Pages(message.channel, message.author.id, embeds, 120000, reactions = { first: '⏪', back: '◀', next: '▶', last: '⏩', stop: '⏹'} );
  },
};