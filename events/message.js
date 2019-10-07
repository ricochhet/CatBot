const Discord = require('discord.js');

module.exports = (client, message) => {
  // Prefix
  let prefix = "+";
  
  // Ignore Bots
  if (message.author.bot) return;
  
  // Ignore message if not prefix
  if (message.content.indexOf(prefix) !== 0) return;
  
  // Standard argument and command definitions
  const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  
  
  const command = client.commands.get(cmdName);
  
  if (!command) return;
  
  if(command.args && !args.length) {
    if(command.usage) {
      const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage: ', command.usage, true)
      .setTimestamp();
      
      message.channel.send(usageEmbed);
    }
    return;
  }
  
  command.run(client, message, args);
};