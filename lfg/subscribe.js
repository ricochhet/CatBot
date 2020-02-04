const Command = require('../utils/baseCommand.js');
const fs = require('fs');

class Subscribe extends Command {
  constructor(prefix) {
    super(
      'subscribe',
      'subscribe [channel name]',
      'All user posted sessions will be sent to the subscribed Discord channel'
    );
  }

  run(client, message, args) {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
      let sub = require('../utils/databases/lfg/subscribe.json');
      let channel;

      if (args[0] == undefined) {
        channel = message.channel;
      } else {
        channel = message.guild.channels.find(
          channel => channel.name == args[0]
        );
        if (channel == null)
          return message.reply(`Sorry meowster but ${args[0]} doesn't exist`);

        if (
          !channel
            .memberPermissions(message.guild.client.user)
            .has('SEND_MESSAGES', true)
        ) {
          return message.reply(
            `Sorry meowster but I can't send messages in ${channel.name}`
          );
        }

        if (
          !channel
            .memberPermissions(message.guild.client.user)
            .has('MANAGE_MESSAGES', true)
        ) {
          return message.reply(
            `Sorry meowster but I don't have the **Manage Messages** permission in ${channel.name}`
          );
        }
      }

      if (sub['subscribe'].includes(channel.id)) {
        // Remove from array
        sub['subscribe'] = sub['subscribe'].filter(function(element) {
          return element !== channel.id;
        });
        message.reply(
          `Meowster the channel ${channel.name} will no longer be a session board for sessions!`
        );
      } else {
        // Add to array
        sub['subscribe'].push(channel.id);
        message.reply(
          `Meowster the channel ${channel.name} will now be a session board for sessions!`
        );
      }

      const jsonObj = JSON.stringify(sub, null, 4);
      fs.writeFile(
        `./utils/databases/lfg/subscribe.json`,
        jsonObj,
        'utf8',
        function(err) {
          if (err) {
            console.log('An error occured while writing JSON Object to File.');
            return console.log(err);
          }
        }
      );
    } else {
      message.reply(
        `Sorry meowster but you don't have the **Manage Channels** permission!`
      );
    }
  }
}

module.exports = Subscribe;
