const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'calc',
  args: false,
  usage : 'calc <category> <additional arguments>',
  description : 'Get Monster Hunter Math calculations',
  error(message) {
    const data = [];
    data.push('+calc dmgtaken <defense value>\n');
    data.push('+calc elemental <damage value> <sharpness: none, red, orange, yellow, green, blue, white, purple> <monster part multiplier value>\n');
    data.push('+calc eraw <damage value> <bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns>\n');
    data.push('+calc raw <damage value> <bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns> <sharpness: none, red, orange, yellow, green, blue, white, purple> <monster part multiplier value>\n');
    data.push('+calc affinity <affinity value> <damage value>\n');

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