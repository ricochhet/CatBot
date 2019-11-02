const Discord = require('discord.js');
const { similarity } = require('../util.js');

module.exports = {
  name: 'mhw',
  args: false,
  usage: 'mhw <category> <additional arguments>',
  description: 'Get Monster Hunter World info',
  error(message){
    const data = [];
    data.push('+mhw armor <armor name>\n');
    data.push('+mhw item <item name>\n');
    data.push('+mhw list <monsters, ibmonsters, endemic, assigned, optional, special, arena, ibassigned, iboptional, lowrank, hralpha1, hralpha2, hrbeta1, hrbeta2, mralpha1, mrbalpha2, mrbeta1, mrbeta2>\n');
    data.push('+mhw monster <monster name>\n');
    data.push('+mhw weapons <weapon name>\n');
    data.push('+mhw weapontree <iron, bone, misc> <bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns, culldrone, mauldrone>\n');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();
    
    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    let subCommand = args[0];
    const commandFound = client.mhw.find(cmd => cmd.name === subCommand && !cmd.secret);
    
    if(!commandFound) return this.error(message);
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
  },
};