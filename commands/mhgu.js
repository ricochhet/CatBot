const Discord = require('discord.js');

module.exports = {
  name: 'mhgu',
  args: false,
  usage: '+mhgu [command] [command arguments]',
  description: 'MHGU - Monster Hunter Generations Ultimate',
  category: true,
  error() {
    const data = [];
    data.push('`+mhgu monster [monster name]` - Get info for a specific monster\n');
    data.push('`+mhgu weapon [weapon name]` - Get info for a specific weapon\n');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField(this.description, this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('MHGU Help');

    return usageEmbed;
  },
  run(client, message, args) {
    const subCommand = args[0];
    const commandFound = client.mhgu.find(cmd => cmd.name === subCommand && !cmd.secret);

    if(!commandFound) return message.channel.send(this.error());
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};