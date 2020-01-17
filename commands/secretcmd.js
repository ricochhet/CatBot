const Discord = require('discord.js');
const menu = require('../lib/pages');

module.exports = {
  name: 'secretcmd',
  args: false,
  description: 'List all commands and their information',
  secret: true,
  run(client, message, args) {
    const helpEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');

    let data = [];
    data = [];
    client.commands.filter(cmd => cmd.calc != true).forEach(cmd => {
      if(cmd.category) {
        if (!cmd.secret) data.push(`+${cmd.name} - ${cmd.description}`);
      }
    });
    helpEmbed.addField('Main / General', data.join('\n'));

    /*
    // Calc Commands
    data = [];
    client.math.forEach(cmd => {
      if (!cmd.secret) data.push(`+calc ${cmd.usage} - ${cmd.description}`);
    });
    helpEmbed.addField('Monster Hunter Math', data.join('\n'));*/

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
    data.push('Using a command w/o parameters gets extended help')
    data.push('[parameter] - Mandatory parameter');
    data.push('(parameter) - Optional paramater')
    helpEmbed.addField('Formatting', data.join('\n'));

    // Additional
    helpEmbed.addBlankField()
      .addField('Experiencing Issues? ', '```Contact Ricochet#7498 | Do +support```')
      .addField('Links', '[Vote](https://top.gg/bot/573958899582107653/vote) [Support](https://discord.gg/srNyk8G) [Invite](https://discordapp.com/oauth2/authorize?client_id=573958899582107653&permissions=339008&scope=bot)')
      .setTimestamp()
      .setFooter('Help | Issues: Contact Ricochet#7498 | Do +support', client.user.avatarURL);
    
    /*
    const mhwData = [];
    mhwData.push('`+mhw armor [armor name]` - Get info for a specific armor set\n');
    mhwData.push('`+mhw item [item name]` - Get info for a specific item\n');
    mhwData.push('`+mhw monster [monster name]` - Get info for a specific monster\n');
    mhwData.push('`+mhw weapon [weapon name]` - Get info for a specific weapon\n');
    mhwData.push('`+mhw rollhunt` - Get a random roll of what monster you should hunt with which gear\n')

    const mhwEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', '+mhw [command] [command arguments]')
      .addField('Parameters Help', mhwData.join('\n'))
      .setTimestamp()
      .setFooter('MHW Help');
    
    const mhguData = [];
    mhguData.push('`+mhgu monster [monster name]` - Get info for a specific monster\n');
    mhguData.push('`+mhgu weapon [weapon name]` - Get info for a specific weapon\n');

    const mhguEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', '+mhgu [command] [command arguments]')
      .addField('Parameters Help', mhguData.join('\n'))
      .setTimestamp()
      .setFooter('MHGU Help');
      
    const calcData = [];
    calcData.push('`+calc dmgtaken [defense]` - Calculate for damage taken\n');
    calcData.push('`+calc elemental [damage] [sharpness: none, red, orange, yellow, green, blue, white, purple] [monster part multiplier value]` - Calculate for elemental\n');
    calcData.push('`+calc eraw [damage] [bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns]` - Calculate for effective raw\n');
    calcData.push('`+calc raw [damage] [bow, cb, db, gs, gl, hammer, hbg, hh, ig, lance, lbg, ls, sa, sns] [sharpness: none, red, orange, yellow, green, blue, white, purple] [monster part multiplier value]` - Calculate for raw\n');
    calcData.push('`+calc affinity [affinity] [damage]` - Calculate for affinity\n');

    const calcEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', '+calc [category] [additional arguments]')
      .addField('Parameters Help', calcData.join('\n'))
      .setTimestamp()
      .setFooter('Calc Help');
      
    const lfgData = [];
    lfgData.push('`+lfg post [PC, XBOX, PS4] [session] [description]` - Posts an active session to CatBots LFG command\n');
    lfgData.push('`+lfg subscribe (channel name)` - All user posted sessions will be sent to the subscribed Discord channel\n');
    lfgData.push('`+lfg find` - Show a menu listing all of the current active user sessions\n');
    lfgData.push('`+lfg cancel` - Cancel your current active session\n');
    
    const lfgEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', '+lfg [command] [command arguments]')
      .setTimestamp()
      .setFooter('LFG Help');
      
    const embeds = [];
    embeds.push(helpEmbed);
    embeds.push(mhwEmbed);
    embeds.push(mhguEmbed);
    embeds.push(calcEmbed);
    embeds.push(lfgEmbed);*/
    
    let embeds = [helpEmbed];
    
    client.commands.filter(cmd => cmd.calc != true).forEach(cmd => {
      if(cmd.category) {
        if (!cmd.secret) embeds.push(cmd.error(message));
      }
    });
    
    let reactions = {};
    new menu(message.channel, message.author.id, embeds, 120000, reactions = { first: '⏪', back: '◀', next: '▶', last: '⏩', stop: '⏹'} );

    //message.channel.send(helpEmbed);
  },
};