const Discord = require('discord.js');

module.exports = {
  name: 'affinity',
  args: true,
  calc: true,
  usage: 'affinity <affinity> <damage>',
  description: 'Affinity calculator',
  error(message) {
    const data = [];
    data.push('affinity: base affinity value');
    data.push('damage: base damage value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let calculate = ((0.25 * (args[0] / 100)) + 1) * args[1];
    let rounded = Math.round(calculate);

    if (Number.isNaN(rounded) || !args[0] || !args[1]) {
      this.error(message);
    } 
    else {
      message.channel.send("Your damage + affinity is " + "**" + rounded + "**" + " meowster!");
    }
  },
};
