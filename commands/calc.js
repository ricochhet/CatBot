const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'calc',
  args: false,
  usage : '+calc <category> <additional arguments>',
  description : 'Gets help for all `+calc` sub-commands',
  error(message) {
    const data = [];
    data.push('+calc dmgtaken <defense value> - Damage taken calculator\n');
    data.push('+calc elemental <damage value> <sharpness: none, red, orange, yellow, green, blue, white, purple> <monster part multiplier value> - Elemental calculator\n');
    data.push('+calc eraw <damage value> <bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns> - Effective raw calculator\n');
    data.push('+calc raw <damage value> <bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns> <sharpness: none, red, orange, yellow, green, blue, white, purple> <monster part multiplier value> - Raw calculator\n');
    data.push('+calc affinity <affinity value> <damage value> - Affinity calculator\n');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let subCommand = args[0];
    const commandFound = client.math.find(cmd => cmd.name === subCommand && !cmd.secret);
    
    if(!commandFound) return this.error(message);
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};