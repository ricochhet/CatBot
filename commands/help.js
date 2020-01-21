const Discord = require('discord.js');
const { paginationEmbed } = require('../util.js');
// const menu = require('../lib/pages');

module.exports = {
  name: 'help',
  args: false,
  description: 'List all commands and their information',
  run(client, message, args) {

    const mainHelp = new Discord.RichEmbed()
      .setColor('#8fde5d');

    let content = [];

    content = [];
    client.commands.filter(cmd => cmd.calc != true).forEach(cmd => {
      if(cmd.category) {
        if (!cmd.secret) content.push(`+${cmd.name} - ${cmd.description}`);
      }
    });
    mainHelp.addField('Main commands (see other pages for more info)', content.join('\n'));

    // All Commands w/o Args
    content = [];
    client.commands.filter(cmd => cmd.args != true).forEach(cmd => {
      if(!cmd.category) {
        if (!cmd.secret) content.push(`+${cmd.name} - ${cmd.description}`);
      }
    });
    mainHelp.addField('Other', content.join('\n'));

    // Notes about syntax
    content = [];
    content.push(':bulb: *Using a command w/o parameters will display extended help*');
    content.push('[parameter] - mandatory parameter');
    content.push('(parameter) - optional paramater');
    mainHelp.addField('Syntax for help', content.join('\n'));

    // Support info
    mainHelp.addBlankField()
      .addField('Experiencing Issues? ', '```Contact Ricochet#7498 | Do +support```')
      .addField('Links', '[Vote](https://top.gg/bot/573958899582107653/vote) [Support](https://discord.gg/srNyk8G) [Invite](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)')
      .setTimestamp();

    const pages = [mainHelp];

    /* this is more practical (gets all category cmds) if we dont care about the order of pages
    client.commands.filter(cmd => cmd.calc != true).forEach(cmd => {
      if(!cmd.secret && cmd.category) {
        // Use command error/usage for other pages' content
        pages.push(cmd.error());
      }
    });
    */

    // Arbitrary ordering of the help pages
    pages.push(client.commands.get('mhw').error());
    pages.push(client.commands.get('lfg').error());
    pages.push(client.commands.get('calc').error());
    pages.push(client.commands.get('mhgu').error());

    paginationEmbed(message, pages);

    // new menu(message.channel, message.author.id, embeds, 120000, reactions = { first: '⏪', back: '◀', next: '▶', last: '⏩', stop: '⏹'} );

    // message.channel.send(helpEmbed);
  },
};