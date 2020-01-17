const Discord = require('discord.js');
const { weaponsRatio } = require('../util.js');

module.exports = {
  name: 'eraw',
  args: true,
  calc: true,
  usage: 'eraw [weapon type] [damage]',
  description: 'Calculate for effective raw',
  error(message) {
    const data = [];
    data.push('weapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns');
    data.push('damage: base damage value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    const rawBase = weaponsRatio.get(args[0]);

    let calculate = args[1] / rawBase;
    let rounded = Math.round(calculate);

    if(Number.isNaN(rounded) || !args[0] || !args[1] || !weaponsRatio.has(args[0])) {
      this.error(message);
    } else {
      message.channel.send("Your effective raw is " + "**" + rounded + "**" + " meowster!");
    }
  },
};