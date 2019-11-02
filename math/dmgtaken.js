const Discord = require('discord.js');

module.exports = {
  name: 'dmgtaken',
  args: false,
  calc : true,
  usage: 'dmgtaken <defense>',
  description: 'Damage taken calculator',
  error(message) {
    const data = [];
    data.push('defense: base defense value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let calculate = (80 / (Number(args[0]) + 80)) * 100;
    let rounded = Math.round(calculate);

    if(Number.isNaN(calculate) || !args[0]) {
      this.error(message);
    } 
    else {
      message.channel.send("Your damage taken is " + "**" + rounded + "%**" + " meowster!");
    }
  },
};
