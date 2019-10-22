const Discord = require('discord.js');

module.exports = {
  name: 'help',
  args: false,
  description: 'List all commands and their information',
  run (client, message, args) {
    const helpEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');

    let data = [];

    // non calc commands first, that have arguments
    client.commands.filter(cmd => cmd.calc != true && cmd.args === true).forEach(cmd => {
      if(!cmd.secret) data.push(`+${cmd.usage} - ${cmd.description}`);
    });
    helpEmbed.addField('Monster Hunter World', data.join('\n'));
    
    // calc commands now
    data = [];
    client.math.forEach(cmd => {
      if (!cmd.secret) data.push(`+calc ${cmd.usage} - ${cmd.description}`);
    });
    helpEmbed.addField('Monster Hunter Math', data.join('\n'));

    // Other, non-variable (no args) commands
    data = [];
    client.commands.filter(cmd => cmd.args != true).forEach(cmd => {
      if (!cmd.secret){data.push(`+${cmd.name} - ${cmd.description}`)}
    });
    helpEmbed.addField('Other', data.join('\n'));

    helpEmbed.addBlankField()
      .addField('Experiencing Issues? ', "```Contact Ricochet#7498 | Do +support```")
      .setTimestamp()
      .setFooter('Help Menu', client.user.avatarURL);

    message.channel.send(helpEmbed);
  }
}