const Discord = require('discord.js');

module.exports = {
  name: 'help',
  args: false,
  description: 'List all commands and their information',
  run(client, message, args) {
    const helpEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');

    let data = [];
    data = [];
    client.commands.filter(cmd => cmd.calc != true).forEach(cmd => {
      if(cmd.category === 'header') {
        if (!cmd.secret) data.push(`+${cmd.name} - ${cmd.description}`);
      }
    });
    helpEmbed.addField('Monster Hunter Info', data.join('\n'));

    // Calc Commands
    data = [];
    client.math.forEach(cmd => {
      if (!cmd.secret) data.push(`+calc ${cmd.usage} - ${cmd.description}`);
    });
    helpEmbed.addField('Monster Hunter Math', data.join('\n'));

    // Other Commands w/o Args
    data = [];
    client.commands.filter(cmd => cmd.args != true).forEach(cmd => {
      if(!cmd.category) {
        if (!cmd.secret) data.push(`+${cmd.name} - ${cmd.description}`);
      }
    });
    helpEmbed.addField('General', data.join('\n'));

    // Notes
    data = [];
    data.push('Using a command w/o args gets extended help');
    data.push('<arg> - mandatory parameter');
    data.push('[arg] - optional paramater')
    helpEmbed.addField('Formatting', data.join('\n'));

    // Additional
    helpEmbed.addBlankField()
      .addField('Experiencing Issues? ', '```Contact Ricochet#7498 | Do +support```')
      .addField('Links', '[Vote](https://top.gg/bot/573958899582107653/vote), [Support](https://discord.gg/srNyk8G), [Invite](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)')
      .setTimestamp()
      .setFooter('Help Menu', client.user.avatarURL);

    message.channel.send(helpEmbed);
  },
};