const Discord = require('discord.js');

module.exports = {
  name: 'raw',
  calc: true,
  args: true,
  usage: 'raw <damage> <weapontype> <sharpness> <monsterpartmultiplier>',
  description: 'Raw calculator',
  run(client, message, args) {

    const data = [];
    data.push('damage: base damage value');
    data.push('weapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns');
    data.push('sharpness (raw): none, red, orange, yellow, green, blue, white, purple');
    data.push('monsterpartmultiplier: multiplier value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    if (!args[0] == null || !args[0] == "" && !args[1] == null || !args[1] == "" && !args[2] == null || !args[2] == "" && !args[3] == null || !args[3] == "") {
      var sharpMult = 0;
      var rawBase = 0;

      var rawSharpRed = 0.5;
      var rawSharpOrange = 0.75;
      var rawSharpYellow = 1.00;
      var rawSharpGreen = 1.05;
      var rawSharpBlue = 1.20;
      var rawSharpWhite = 1.32;
      var rawSharpPurple = 1.39;
      var rawRangedSharpness = 1;

      var h = 5.2;
      var gs = 4.8;
      var hh = 4.2;
      var cb = 3.6;
      var sa = 3.5;
      var ls = 3.3;
      var ig = 3.1;
      var l = 2.3;
      var gl = 2.3;
      var hbg = 1.5;
      var sns = 1.4;
      var db = 1.4;
      var lbg = 1.3;
      var bow = 1.2;

      if (args[2] == "red") {
        sharpMult = rawSharpRed;
      } else if (args[2] == "orange") {
        sharpMult = rawSharpOrange;
      } else if (args[2] == "yellow") {
        sharpMult = rawSharpYellow;
      } else if (args[2] == "green") {
        sharpMult = rawSharpGreen;
      } else if (args[2] == "blue") {
        sharpMult = rawSharpBlue;
      } else if (args[2] == "white") {
        sharpMult = rawSharpWhite;
      } else if (args[2] == "purple") {
        sharpMult = rawSharpPurple;
      } else if (args[2] == "none") {
        sharpMult = rawRangedSharpness;
      } else {
        return message.channel.send(usageEmbed);
      }

      if (args[1] == "hammer") {
        rawBase = h;
      } else if (args[1] == "gs") {
        rawBase = gs;
      } else if (args[1] == "hh") {
        rawBase = hh;
      } else if (args[1] == "cb") {
        rawBase = cb;
      } else if (args[1] == "sa") {
        rawBase = sa;
      } else if (args[1] == "ls") {
        rawBase = ls;
      } else if (args[1] == "ig") {
        rawBase = ig;
      } else if (args[1] == "lance") {
        rawBase = l;
      } else if (args[1] == "gl") {
        rawBase = gl;
      } else if (args[1] == "hbg") {
        rawBase = hbg;
      } else if (args[1] == "sns") {
        rawBase = sns;
      } else if (args[1] == "db") {
        rawBase = db;
      } else if (args[1] == "lbg") {
        rawBase = lbg;
      } else if (args[1] == "bow") {
        rawBase = bow;
      } else {
        return message.channel.send(usageEmbed);
      }

      var calculate = (args[0] / rawBase) * sharpMult * args[3];
      let rounded = Math.round(calculate);

      if (Number.isNaN(rounded)) {
        // message.channel.send("Sorry meowster, I can't calculate that!");
        message.channel.send(usageEmbed);
      } else {
        message.channel.send("Your raw damage is " + "**" + rounded + "**" + " meowster!");
      }
    } else {
      message.channel.send(usageEmbed);
    }
  }
}
