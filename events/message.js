const Discord = require('discord.js');

module.exports = (client, message) => {
  // Prefix
  const prefix = '+';

  // Ignore message if not prefix
  if (message.content.indexOf(prefix) !== 0) return;

    // Ignore Bots
  if (message.author.bot) return;

  // Ignores message if bot cannot send messages
  if (!message.guild) return;
  if (!message.member.guild.me.hasPermission('SEND_MESSAGES')) return;
  if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

  // Standard argument and command definitions
  const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/g);
  const rawArgs = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();

  const command = client.commands.get(cmdName);

  if (!command) return;

  // Ignores Secret Commands if Not Owner
  if (command.secret && message.author.id != process.env.OWNER) return;

  if (command.args && !args.length) {
    if (command.usage) {
      const usageEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .addField('Usage: ', command.usage, true)
        .setTimestamp();

      message.channel.send(usageEmbed);
    }
    return;
  }

  if (command.caseSensitiveArgs) {
    rawArgs.shift();
    return command.run(client, message, rawArgs);
  }

  command.run(client, message, args);
};