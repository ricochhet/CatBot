const Discord = require('discord.js');
const { similarity } = require('../util.js');

module.exports = {
  name: 'mhgu',
  args: false,
  usage: '+mhgu [command] [command arguments]',
  description: 'Gets help for all `+mhgu` sub-commands',
  category: true,
  error(message){
    const data = [];
    data.push('`+mhgu monster [monster name]` - Get info for a specific monster\n');
    data.push('`+mhgu weapon [weapon name]` - Get info for a specific weapon\n');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('MHGU Help');
    
    //return message.channel.send(usageEmbed);
    return usageEmbed;
  },
  run(client, message, args) {
    let subCommand = args[0];
    const commandFound = client.mhgu.find(cmd => cmd.name === subCommand && !cmd.secret);

    //if(!commandFound) return this.error(message);
    if(!commandFound) return message.channel.send(this.error(message));
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};