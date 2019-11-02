const Discord = require('discord.js');

module.exports = {
  name: 'calc',
  args: false,
  usage : 'calc <dmgtaken/elementalcalc/eraw/rawcalc/affinitycalc>\n<args for dmgtaken/elementalcalc/eraw/rawcalc/affinitycalc>\n',
  description : 'Get Monster Hunter Math calculations',
  error(message) {
    const data = [];
    data.push('\n**dmgtaken Args:**\n defense: current defense value\n');
    data.push('**elemental Args:**\ndamage: base damage value\nsharpness (elemental): none, red, orange, yellow, green, blue, white, purple\nmonsterpartmultiplier: multiplier value\n');
    data.push('**eraw Args:**\ndamage: base damage value\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns\n');
    data.push('**raw Args:**\ndamage: base damage value\nweapontype: bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns\nsharpness (raw): none, red, orange, yellow, green, blue, white, purple\nmonsterpartmultiplier: multiplier value\n');
    data.push('**affinity Args**\naffinity: base affinity value\ndamage: base damage value\n--');

    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', `${this.usage}\n--`)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {

    // Get sub command
    const subcmd = args[0];

    const cmdFound = client.math.find(cmd => cmd.name === subcmd && cmd.secret === false);

    if (!cmdFound) return this.error(message);

    // Strip out first arg (calc)
    args = args.slice(1, args.length);
    cmdFound.run(client, message, args);

  },
};
