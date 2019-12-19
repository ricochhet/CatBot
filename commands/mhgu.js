const Discord = require('discord.js');
const { similarity } = require('../util.js');

module.exports = {
  name: 'mhgu',
  args: false,
  usage: '+mhgu <category> <additional arguments>',
  description: 'Gets help for all `+mhgu` sub-commands',
  category: 'header',
  error(message){
    const data = [];
    data.push('+mhgu monster <monster name> - Get monster info\n');
    data.push('+mhgu weapon <weapon name> - Get weapon info\n');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let subCommand = args[0];
    const commandFound = client.mhgu.find(cmd => cmd.name === subCommand && !cmd.secret);

    if(!commandFound) return this.error(message);
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};