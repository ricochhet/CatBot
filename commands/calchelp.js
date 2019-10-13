const Discord = require('discord.js');

module.exports = {
  name: 'calchelp',
  args: false,  
  description: 'Get help for attack calculations',
  run (client, message, args) {
    const helpEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d');
    
    // Add field for each calc command (has 'calc: true')
    const calcCommands = client.commands.filter(cmd => cmd.calc === true);
    calcCommands.forEach( cmd => {
      helpEmbed.addField(`${cmd.description}: `, cmd.usage);
    });

    // Additional info
    helpEmbed
      .addField('Sharpness: ', "red, orange, yellow, green, blue, white, purple, none (use if ranged weapon)")
      .addField('Info: ', "**Use lowercase letters only**\nThese calculators simply go based off of *your* input, if something you put in doesn't make sense, the answer won't make sense.")
      .addBlankField()
      .addField('Calculations Off? ', "```Contact Ricochet#7498 | Do +support```")
      .setTimestamp()
      .setFooter('Help Menu', client.user.avatarURL);
    
    message.channel.send(helpEmbed);

  }
}