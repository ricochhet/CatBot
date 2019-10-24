const Discord = require('discord.js');

module.exports = {
  name: 'mhwreload',
  args: false,
  secret: true,
  run (client, message, args) {
    if(message.author.id == process.env.OWNER) {
      if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
      const commandName = args[0];
        
      if(!client.math.has(commandName)) {
        return message.reply("That command does not exist");
      }

      delete require.cache[require.resolve(`../mhw/${commandName}.js`)];

      client.math.delete(commandName);

      const props = require(`../mhw/${commandName}.js`);

      client.math.set(commandName, props);

      message.reply(`The command ${commandName} has been reloaded`);
    }
  }
}
