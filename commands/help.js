const Discord = require('discord.js');

module.exports = {
  name: 'help',
  args: false,
  description: 'List all commands and their information',
  run(client, message, args) {
    const helpEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');

    let data = [];

    // Non-Calc Commands w/ Args
    client.mhw.filter(cmd => cmd.calc != true && cmd.args === true).forEach(cmd => {
      if(!cmd.secret) data.push(`+mhw ${cmd.usage} - ${cmd.description}`);
    });
    helpEmbed.addField('Monster Hunter World', data.join('\n'));

    // Calc Commands
    data = [];
    client.math.forEach(cmd => {
      if (!cmd.secret) data.push(`+calc ${cmd.usage} - ${cmd.description}`);
    });
    helpEmbed.addField('Monster Hunter Math', data.join('\n'));

    // LFG Commands
    data = [];
    client.lfg.forEach(cmd => {
      if (!cmd.secret) data.push(`+lfg ${cmd.usage} - ${cmd.description}`);
    });
    helpEmbed.addField('Looking for group commands', data.join('\n'));

    // Other Commands w/o Args
    data = [];
    client.commands.filter(cmd => cmd.args != true).forEach(cmd => {
      if (!cmd.secret) data.push(`+${cmd.name} - ${cmd.description}`);
    });
    helpEmbed.addField('Other', data.join('\n'));

    // Notes
    data = [];
    data.push('Using a command w/o args gets extended help');
    data.push('<arg> - mandatory parameter');
    data.push('[arg] - optional parameter');
    helpEmbed.addField('Notes', data.join('\n'));

    // Experiencing Issues Text
    helpEmbed.addBlankField()
      .addField('Experiencing Issues? ', '```Contact Ricochet#7498 | Do +support```')
      .setTimestamp()
      .setFooter('Help Menu', client.user.avatarURL);

    message.channel.send(helpEmbed);
  },
};
