module.exports = {
  name: 'mhwreload',
  args: false,
  secret: true,
  run(client, message, args) {
    let silent = true;
    if (message.author.id == process.env.OWNER) {
      silent = false;
    }

    if (!silent && (!args || args.length < 1)) return message.reply('Must provide a command name to reload.');

    const commandName = args[0];

    if (!client.math.has(commandName)) {
      if (!silent) message.reply('That command does not exist');
    }
    else {
      delete require.cache[require.resolve(`../mhw/${commandName}.js`)];

      client.math.delete(commandName);

      const props = require(`../mhw/${commandName}.js`);

      client.math.set(commandName, props);

      if (!silent) message.reply(`The command ${commandName} has been reloaded`);

    }
  },
};
