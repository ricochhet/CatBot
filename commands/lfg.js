const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'lfg',
  args: false,
  usage : '+lfg <category> <additional arguments>',
  description : 'Is the parent command for all looking for group commands',
  caseSensitiveArgs: true,
  error(message) {
    const data = [];
    data.push('+lfg post <PC, XBOX, PS4> <session id> <description>\n');
    data.push('+lfg subscribe (<channel name>)\n');
    data.push('+lfg find\n');
    data.push('+lfg cancel\n');
    data.push('Notes: Anything around () is optional');
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let subCommand = args[1];
    const commandFound = client.lfg.find(cmd => cmd.name == subCommand && !cmd.secret);
    if (subCommand != undefined) subCommand = subCommand.toLowerCase();
    
    if(!commandFound) return this.error(message);
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};