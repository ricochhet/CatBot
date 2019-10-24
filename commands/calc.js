const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'calc',
  args: false,
  usage : 'calc <dmgtaken/elementalcalc/eraw/rawcalc/affinitycalc>\n<args for dmgtaken/elementalcalc/eraw/rawcalc/affinitycalc>',
  description : 'Get Monster Hunter Math calculations',
  error (message) {
    const data = [];
    data.push('\n**dmgtaken Args:**\n\n defense: current defense value\n');
    data.push('**elemental Args:**\n\ndamage: base damage value\nsharpness (elemental): none, red, orange, yellow, green, blue, white, purple\nmonsterpartmultiplier: multiplier value\n');
    data.push('**eraw Args:**\n\ndamage: base damage value\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns\n');
    data.push('**raw Args:**\n\ndamage: base damage value\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns\nsharpness (raw): none, red, orange, yellow, green, blue, white, purple\nmonsterpartmultiplier: multiplier value\n');
    data.push('**affinity Args**\n\naffinity: base affinity value\ndamage: base damage value');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run (client, message, args) {
    // Gets category command
    let category = args[0];
    // Strips first arg from args
    args = args.slice(1, args.length);
    let response = false;

    client.math.forEach(cmd => {
      // if category is command run it
      if (category == cmd.name & !cmd.secret) {
        // set response to true so we know not to send the help command
        response = true;
        cmd.run(client, message, args);
      }
    });

    // Checks if there were no arguments
    if (!response) {
      this.error(message);
    }
  }
}
