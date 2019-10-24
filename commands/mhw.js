const Discord = require('discord.js');
const { similarity } = require('../util.js');

module.exports = {
  name: 'mhw',
  args: false,
  usage: 'mhw <category> <args for category>',
  description: 'Get Monster Hunter World info',
  error (message) {
    const data = [];
    data.push('\n**armor Args:**\n\narmorname: armor name\n');
    data.push('**item Args:**\n\nitemname: item name\n');
    data.push('**list Args**\n\ncategory: monsters, ibmonsters, endemic, assigned, optional, special, arena, ibassigned, iboptional, lowrank, hralpha1, hralpha2, hrbeta1, hrbeta2, mralpha1, mrbalpha2, mrbeta1, mrbeta2');
    data.push('**monster Args**\n\nmonstername: monster name');
    data.push('**weapons Args**\n\nweaponname: weapon name');
    data.push('**weapontree Args**\n\ncategory: iron, bone, misc\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns, culldrone, mauldrone');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run (client, message, args) {
    // Gets category command
    let category = args[0];
    // Strips first arg from args
    args = args.slice(1, args.length)
    let response = false;

    client.mhw.forEach(cmd => {
      // if category is command run it
      if (category == cmd.name & !cmd.secret) {
        // set responce to true so we know not to send the help command
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
