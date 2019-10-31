const Discord = require('discord.js');

module.exports = {
  name: 'mhw',
  args: false,
  usage: 'mhw <category> <args for category>',
  description: 'Get Monster Hunter World info',
  error(message) {
    const data = [];
    data.push('\n**armor Args:**\n\narmorname: armor name\n');
    data.push('**item Args:**\n\nitemname: item name\n');
    data.push('**list Args**\n\ncategory: monsters, ibmonsters, endemic, assigned, optional, special, arena, ibassigned, iboptional, lowrank, hralpha1, hralpha2, hrbeta1, hrbeta2, mralpha1, mrbalpha2, mrbeta1, mrbeta2');
    data.push('**monster Args**\n\nmonstername: monster name');
    data.push('**weapons Args**\n\nweaponname: weapon name');
    data.push('**weapontree Args**\n\ncategory: iron, bone, misc\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns, culldrone, mauldrone\n--');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', `${this.usage}\n--`)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {

    const subcmd = args[0];

    const cmdFound = client.mhw.find(cmd => cmd.name === subcmd && cmd.secret === false);

    if (!cmdFound) return this.error(message);

    // Strip first arg (mhw)
    args = args.slice(1, args.length);

    cmdFound.run(client, message, args);
  },
};
