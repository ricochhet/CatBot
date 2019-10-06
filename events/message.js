const Discord = require('discord.js');

module.exports = (client, message) => {
  let prefix = "+";
  
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/g);
  const cmdName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const command = client.commands.get(cmdName);

  // If that command doesn't exist, silently exit and do nothing
  if (!command) return;

  // If the command requires arguments, check early
  if (command.args && !args.length) {
    // Print command usage if it's defined 
    if (command.usage) {
      const usageEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .addField('Usage: ', command.usage, true)
        .setTimestamp();
      
      message.channel.send(usageEmbed);
    }      
    return;  
  }

  // Run the command
  command.run(client, message, args);
};