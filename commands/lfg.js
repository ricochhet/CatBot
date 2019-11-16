const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'lfg',
  args: false,
  usage : '+lfg <category> <additional arguments>',
  description : 'Gets help for all `+lfg` sub-commands',
  caseSensitiveArgs: true,
  error(message) {
    const data = [];
    data.push('+lfg post <PC, XBOX, PS4> <session id> [description] - Posts a session that others can find, they close at 2 hours of time\n');
    data.push('+lfg subscribe [channel name] - All user posted sessions will show up in a specified channel\n');
    data.push('+lfg find - Shows all the current sessions posted via CatBot\n');
    data.push('+lfg cancel - Cancels your current session advertisement\n');
    data.push('Notes: Anything inside [] is optional');
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let subCommand = args[1];
    const commandFound = client.lfg.find(cmd => cmd.name === subCommand && cmd.secret === false);
    if (subCommand != undefined) subCommand = subCommand.toLowerCase();
    
    if(!commandFound) return this.error(message);
    args = args.slice(2, args.length);
    commandFound.run(client, message, args);
  },
};