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

/*const Discord = require('discord.js');

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

    let h = 5.2;
    let gs = 4.8;
    let hh = 4.2;
    let cb = 3.6;
    let sa = 3.5;
    let ls = 3.3;
    let ig = 3.1;
    let l = 2.3;
    let gl = 2.3;
    let hbg = 1.5;
    let sns = 1.4;
    let db = 1.4;
    let lbg = 1.3;
    let bow = 1.2;

    if(!args[0] == null || !args[0] == "" && !args[1] == null || !args[1] == "" ) {
      let rawBase = 0;

      if (args[0] == "hammer") {
        rawBase = h;
      } else if (args[0] == "gs") {
        rawBase = gs;
      } else if (args[0] == "hh") {
        rawBase = hh;
      } else if (args[0] == "cb") {
        rawBase = cb;
      } else if (args[0] == "sa") {
        rawBase = sa;
      } else if (args[0] == "ls") {
        rawBase = ls;
      } else if (args[0] == "ig") {
        rawBase = ig;
      } else if (args[0] == "lance") {
        rawBase = l;
      } else if (args[0] == "gl") {
        rawBase = gl;
      } else if (args[0] == "hbg") {
        rawBase = hbg;
      } else if (args[0] == "sns") {
        rawBase = sns;
      } else if (args[0] == "db") {
        rawBase = db;
      } else if (args[0] == "lbg") {
        rawBase = lbg;
      } else if (args[0] == "bow") {
        rawBase = bow;
      } else {
        return message.channel.send("Sorry meowster, I can't calculate that!");
      }

      let calculate = args[1] / rawBase;
      let rounded = Math.round(calculate);

      if(Number.isNaN(rounded)) {
        //message.channel.send(`Sorry meowster, I can't calculate that! Usage: \`${this.usage}\``);
        message.channel.send(usageEmbed);
      } else {
        message.channel.send("Your effective raw is " + "**" + rounded + "**" + " meowster!");
      }
    } else {
      message.channel.send(usageEmbed);
    }
  }
} */
