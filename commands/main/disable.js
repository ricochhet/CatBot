const Command = require('../../utils/baseCommand.js');

class Disable extends Command {
  constructor(prefix) {
    super(
      'disable',
      'disable (cmd)',
      'Disable (category) commands **per guild**',
      {
        prefix: prefix
      }
    );
  }

  async run(client, message, args) {
    let disableCommands = require('../../utils/databases/server/disabledCommands.json');

    if (['disable', 'help'].includes(args[0]))
      return message.channel.send(
        'Sorry meowster, but this commands are blacklisted from being disabled!'
      );

    if (args[0] == 'list') {
      if (!disableCommands[message.guild.id])
        return message.channel.send('Meowster, no commands are disabled!');

      let responce = '';

      for (let key in disableCommands[message.guild.id]) {
        responce += `\n  ${key.toUpperCase()}`;

        for (let cmdName of disableCommands[message.guild.id][key]) {
          responce += `\n    ${cmdName}`;
        }

        if (
          Object.keys(disableCommands[message.guild.id]).indexOf(key) !=
          Object.keys(disableCommands[message.guild.id]).length - 1
        )
          responce += '\n';
      }

      responce = `Disabled Commands\n\`\`\`${responce}\`\`\``;

      return message.channel.send(responce);
    } else {
      let command = client.commands.find(
        cmd => cmd.name == args[0] || cmd.alias.includes(args[0])
      );
      if (!command) return message.channel.send('Invalid command/category');

      if (command.category) {
        if (args.length == 1) {
          if (!disableCommands[message.guild.id])
            disableCommands[message.guild.id] = {};

          if (!disableCommands[message.guild.id][command.name]) {
            disableCommands[message.guild.id][command.name] = client[
              command.name
            ].map(cmd => cmd.name);
            this.saveJsonFile(
              `./utils/databases/server/disabledCommands.json`,
              JSON.stringify(disableCommands, null, 4)
            );
            return message.channel.send(
              `Disabled All **${command.name.toUpperCase()}** Category Commands!`
            );
          } else {
            delete disableCommands[message.guild.id][command.name];
            if (Object.keys(disableCommands[message.guild.id]).length == 0)
              delete disableCommands[message.guild.id];
            this.saveJsonFile(
              `./utils/databases/server/disabledCommands.json`,
              JSON.stringify(disableCommands, null, 4)
            );
            return message.channel.send(
              `Enabled All **${command.name.toUpperCase()}** Category Commands!`
            );
          }
        }

        let childCommand = client[args[0]].find(
          cmd => cmd.name == args[1] || cmd.alias.includes(args[1])
        );
        if (!childCommand)
          return message.channel.send('Invalid category command');

        if (!disableCommands[message.guild.id])
          disableCommands[message.guild.id] = {};

        if (!disableCommands[message.guild.id][command.name]) {
          disableCommands[message.guild.id][command.name] = [childCommand.name];
          this.saveJsonFile(
            `./utils/databases/server/disabledCommands.json`,
            JSON.stringify(disableCommands, null, 4)
          );
          return message.channel.send(
            `Disabled **${command.name.toUpperCase()} ${childCommand.name.toUpperCase()}** Category Command!`
          );
        } else {
          if (
            disableCommands[message.guild.id][command.name].includes(
              childCommand.name
            )
          ) {
            disableCommands[message.guild.id][command.name] = disableCommands[
              message.guild.id
            ][command.name].filter(cmdName => cmdName != childCommand.name);
            if (disableCommands[message.guild.id][command.name].length == 0)
              delete disableCommands[message.guild.id][command.name];
            if (Object.keys(disableCommands[message.guild.id]).length == 0)
              delete disableCommands[message.guild.id];
            this.saveJsonFile(
              `./utils/databases/server/disabledCommands.json`,
              JSON.stringify(disableCommands, null, 4)
            );
            return message.channel.send(
              `Enabled **${command.name.toUpperCase()} ${childCommand.name.toUpperCase()}** Category Command!`
            );
          } else {
            disableCommands[message.guild.id][command.name].push(
              childCommand.name
            );
            this.saveJsonFile(
              `./utils/databases/server/disabledCommands.json`,
              JSON.stringify(disableCommands, null, 4)
            );
            return message.channel.send(
              `Disabled **${command.name.toUpperCase()} ${childCommand.name.toUpperCase()}** Category Command!`
            );
          }
        }
      } else {
        if (!disableCommands[message.guild.id])
          disableCommands[message.guild.id] = {};
        if (!disableCommands[message.guild.id]['main'])
          disableCommands[message.guild.id]['main'] = [];

        if (disableCommands[message.guild.id]['main'].includes(command.name)) {
          disableCommands[message.guild.id]['main'] = disableCommands[
            message.guild.id
          ]['main'].filter(cmdName => cmdName != command.name);
          if (disableCommands[message.guild.id]['main'].length == 0)
            delete disableCommands[message.guild.id]['main'];
          if (Object.keys(disableCommands[message.guild.id]).length == 0)
            delete disableCommands[message.guild.id];

          this.saveJsonFile(
            `./utils/databases/server/disabledCommands.json`,
            JSON.stringify(disableCommands, null, 4)
          );
          return message.channel.send(
            `Enabled **${command.name.toUpperCase()}** Command!`
          );
        } else {
          disableCommands[message.guild.id]['main'].push(command.name);
          this.saveJsonFile(
            `./utils/databases/server/disabledCommands.json`,
            JSON.stringify(disableCommands, null, 4)
          );
          return message.channel.send(
            `Disabled **${command.name.toUpperCase()}** Command!`
          );
        }
      }
    }
  }
}

module.exports = Disable;
