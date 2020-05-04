const Command = require('../../utils/command.js');

class Reload extends Command {
  constructor(prefix) {
    super('reload', 'reload', 'Reload any command', {
      prefix: prefix,
      secret: true
    });
  }

  async run(client, message, args) {
    if (!args || args.length < 1)
      return message.reply('Must provide a command name to reload.');
    let commandName = args[0];
    let secondary = args[1];
    if (commandName === 'rmhw') {
      if (!client.mhw.has(secondary)) {
        return message.reply('That command does not exist');
      }

      delete require.cache[require.resolve(`../mhw/${secondary}.js`)];
      client.mhw.delete(secondary);
      const props = require(`../mhw/${secondary}.js`);
      client.mhw.set(secondary, new props(this.prefix));
      message.reply(
        `The command **${secondary}** from **${commandName}** has been reloaded`
      );
    } else if (commandName === 'rmhgu') {
      if (!client.mhgu.has(secondary)) {
        return message.reply('That command does not exist');
      }

      delete require.cache[require.resolve(`../mhgu/${secondary}.js`)];
      client.mhgu.delete(secondary);
      const props = require(`../mhgu/${secondary}.js`);
      client.mhgu.set(secondary, new props(this.prefix));
      message.reply(
        `The command **${secondary}** from **${commandName}** has been reloaded`
      );
    } else if (commandName === 'rcalc') {
      if (!client.math.has(secondary)) {
        return message.reply('That command does not exist');
      }

      delete require.cache[require.resolve(`../math/${secondary}.js`)];
      client.math.delete(secondary);
      const props = require(`../math/${secondary}.js`);
      client.math.set(secondary, new props(this.prefix));
      message.reply(
        `The command **${secondary}** from **${commandName}** has been reloaded`
      );
    } else if (commandName === 'rlfg') {
      if (!client.lfg.has(secondary)) {
        return message.reply('That command does not exist');
      }

      delete require.cache[require.resolve(`../lfg/${secondary}.js`)];
      client.lfg.delete(secondary);
      const props = require(`../lfg/${secondary}.js`);
      client.lfg.set(secondary, new props(this.prefix));
      message.reply(
        `The command **${secondary}** from **${commandName}** has been reloaded`
      );
    } else {
      if (!client.commands.has(commandName)) {
        return message.reply('That command does not exist');
      }

      delete require.cache[require.resolve(`./${commandName}.js`)];
      client.commands.delete(commandName);
      const props = require(`./${commandName}.js`);
      client.commands.set(commandName, new props(this.prefix));
      message.reply(`The command **${commandName}** has been reloaded`);
    }
  }
}

module.exports = Reload;
