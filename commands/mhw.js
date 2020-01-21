const Discord = require('discord.js');

module.exports = {
  name: 'mhw',
  args: false,
  usage: '+mhw [command] [command arguments]',
  description: 'Monster Hunter World & Iceborne',
  category: true,
  error() {
    const data = [];
    data.push('`+mhw armor [armor name]` - Get info for a specific armor set\n');
    data.push('`+mhw deco [deco name]` - Get info for a specific decoration\n');
    data.push('`+mhw item [item name]` - Get info for a specific item\n');
    data.push('`+mhw monster [monster name]` - Get info for a specific monster\n');
    data.push('`+mhw weapon [weapon name]` - Get info for a specific weapon\n');
    data.push('`+mhw skill [skill name]` - Get info for a specific skill\n');
    data.push('`+mhw rollhunt` - Get a random roll of what monster you should hunt with which gear\n');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField(this.description, this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('MHW Help');

    return usageEmbed;
  },
  run(client, message, args) {
    const subCommand = args[0];
    const commandFound = client.mhw.find(cmd => cmd.name === subCommand && !cmd.secret);

    if(!commandFound) return message.channel.send(this.error());
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};