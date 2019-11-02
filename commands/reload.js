module.exports = {
  name: 'reload',
  args: false,
  secret: true,
  run(client, message, args) {

    let silent = true;

    if (message.author.id == process.env.OWNER) {
      silent = false;
    }

    if (!silent && (!args || args.length < 1)) return message.reply('Must provide a command name to reload.');

    const commandName = args[0];

    if (!client.commands.has(commandName)) {
      if (!silent) message.reply('That command does not exist');      
    }
    else {
      delete require.cache[require.resolve(`./${commandName}.js`)];

      client.commands.delete(commandName);

      const props = require(`./${commandName}.js`);

      client.commands.set(commandName, props);

      if (!silent) message.reply(`The command ${commandName} has been reloaded`);
    }
  },
};