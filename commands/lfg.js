const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'lfg',
  args: false,
  usage : '+lfg [command] [command arguments]',
  description : 'Looking for Group',
  caseSensitiveArgs: true,
  category: true,
  error(message) {
    const data = [];
    data.push('`+lfg post [PC, XBOX, PS4] [session] [description]` - Posts an active session to CatBots LFG command\n');
    data.push('`+lfg subscribe (channel name)` - All user posted sessions will be sent to the subscribed Discord channel\n');
    data.push('`+lfg find` - Show a menu listing all of the current active user sessions\n');
    data.push('`+lfg cancel` - Cancel your current active session\n');
    
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField(this.description, this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('LFG Help');
    
    return usageEmbed;
  },
  run(client, message, args) {
    const subCommand = args[0];
    const commandFound = client.lfg.find(cmd => cmd.name === subCommand && !cmd.secret);
    
    if(!commandFound) return message.channel.send(this.error(message));
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};