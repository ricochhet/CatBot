const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'calc',
  args: false,
  usage : '+calc [category] [additional arguments]',
  description : 'Gets help for all `+calc` sub-commands',
  category: true,
  error(message) {
    const data = [];
    data.push('`+calc dmgtaken [defense]` - Calculate for damage taken\n');
    data.push('`+calc elemental [damage] [sharpness: none, red, orange, yellow, green, blue, white, purple] [monster part multiplier value]` - Calculate for elemental\n');
    data.push('`+calc eraw [damage] [bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns]` - Calculate for effective raw\n');
    data.push('`+calc raw [damage] [bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns] [sharpness: none, red, orange, yellow, green, blue, white, purple] [monster part multiplier value]` - Calculate for raw\n');
    data.push('`+calc affinity [affinity] [damage]` - Calculate for affinity\n');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp()
      .setFooter('Calc Help');
    
    //return message.channel.send(usageEmbed);
    return usageEmbed;
  },
  run(client, message, args) {
    let subCommand = args[0];
    const commandFound = client.math.find(cmd => cmd.name === subCommand && !cmd.secret);
    
    //if(!commandFound) return this.error(message);
    if(!commandFound) return message.channel.send(this.error(message));
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};