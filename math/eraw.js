const Discord = require('discord.js');
const { weaponsRatio } = require('../util.js');

module.exports = {
  name: 'eraw',
  args: true,
  calc: true,
  usage: 'eraw <weapontype> <damage>',
  description: 'Effective raw calculator',
  run (client, message, args) {
    const data = [];
    data.push('damage: base damage value');
    data.push('weapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();
                
    if (!args[0] || !args[1]) {
      return message.channel.send(usageEmbed);   
    }

    if (!weaponsRatio.has(args[0])) {
      return message.channel.send(usageEmbed);  
      //return message.channel.send("Sorry meowster, I can't calculate that!");
    }

    const rawBase = weaponsRatio.get(args[0]);
    console.log(rawBase)
      
      let calculate = args[1] / rawBase;
      let rounded = Math.round(calculate);
    
    console.log(rawBase);
    console.log(calculate);
  
      if(Number.isNaN(rounded)) {
        //message.channel.send(`Sorry meowster, I can't calculate that! Usage: \`${this.usage}\``);
        message.channel.send(usageEmbed);
      } else {
        message.channel.send("Your effective raw is " + "**" + rounded + "**" + " meowster!");
      }
  }
}