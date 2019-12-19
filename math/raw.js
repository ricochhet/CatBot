const Discord = require('discord.js');
const { weaponsRatio, rawSharpRatio } = require('../util.js');

module.exports = {
  name: 'raw',
  calc: true,
  args: true,
  usage: 'raw <damage> <weapontype> <sharpness> <monsterpartmultiplier>',
  description: 'Raw calculator',
  error(message) {
    const data = [];
    data.push('damage: base damage value');
    data.push('weapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns');
    data.push('sharpness (raw): none, red, orange, yellow, green, blue, white, purple');
    data.push('monsterpartmultiplier: multiplier value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    const rawBase = weaponsRatio.get(args[1]);
    const sharpMult = rawSharpRatio.get(args[2]);

    let calculate = (args[0] / rawBase) * sharpMult * args[3];
    let rounded = Math.round(calculate);

    if(Number.isNaN(rounded) || !args[0] || !args[1] || !args[2] || !args[3]) {
      this.error(message);
    } else {
      message.channel.send("Your raw damage is " + "**" + rounded + "**" + " meowster!");
    }
  },
};