const Discord = require('discord.js');
const { similarity } = require('../util.js');

module.exports = {
  name: 'mhw',
  args: false,
  usage: '+mhw <category> <additional arguments>',
  description: 'Gets help for all `+mhw` sub-commands',
  category: 'header',
  error(message){
    const data = [];
    data.push('+mhw armor <armor name> - Get armor info\n');
    data.push('+mhw item <item name> - Get item info\n');
    data.push('+mhw monster <monster name> - Get monster and endemic life info\n');
    data.push('+mhw weapon <weapon name> - Get weapon info\n');
    data.push('+mhw rollhunt - Hunt a random monster using random equipment\n')

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let subCommand = args[0];
    const commandFound = client.mhw.find(cmd => cmd.name === subCommand && !cmd.secret);
    
    if(!commandFound) return this.error(message);
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};