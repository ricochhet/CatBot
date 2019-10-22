const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'calc',
  args: false,
  usage : 'calc <dmgtaken/elementalcalc/eraw/rawcalc>\n<args for dmgtaken/elementalcalc/eraw/rawcalc>',
  error (message) {
    const data = [];
    data.push('\n**dmgtaken Args:**\n\n Defense (Number)\n');
    data.push('**elementalcalc Args:**\n\ndamage: base damage value\nsharpness (elemental): none, red, orange, yellow, green, blue, white, purple\nmonsterpartmultiplier: multiplier value\n');
    data.push('**eraw Args:**\n\ndamage: base damage value\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns\n');
    data.push('**rawcalc Args:**\n\ndamage: base damage value\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns\nsharpness (raw): none, red, orange, yellow, green, blue, white, purple\nmonsterpartmultiplier: multiplier value\n');
    data.push('**affinitycalc**\n\naffinity: base affinity value\ndamage: base damage value')

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed)
  },
  run (client, message, args) {

    // Gets sub command
    let subArg = args[0]
    // Strips first arg from args
    args = args.slice(1,args.length)

    // Gets all Math commands from math folder
    fs.readdir("./math", (err, files) => {
      if (err) return console.error(err);
      let responce = false
      files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let command = require(`../math/${file}`);

        // if subArg is command run it
        if (subArg == command.name){
          responce = true
          command.run(client, message, args)
        }
      });

      // Checks if there were no arguments
      if (!responce) {
        this.error(message)
      }
    });

  }
}
