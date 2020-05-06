const Command = require('../../utils/command.js');
const db = require('../../utils/libraries/client');
const fs = require('fs');

class Subscribe extends Command {
  constructor(prefix) {
    super(
      'subscribe',
      'subscribe (channel name/id/mention)',
      'All user posted sessions will be sent to the subscribed Discord channel',
      {
        args: false,
        alias: ['sub']
      }
    );
  }

  async run(client, message, args) {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
      const self = this;

      db.get(
        `${client.server_conf.server_url}database/${client.server_conf.server_clientid}/lfg/subscribe?key=${client.server_conf.server_key}`
      ).then(function(data) {
        if (!data) {
          console.log(
            `Failed to request data @ ${client.server_conf.server_url}database/${client.server_conf.server_clientid}/lfg/subscribe?key=${client.server_conf.server_key}`
          );
          return message.channel.send(self.serverErrorEmbed());
        }

        let sub = JSON.parse(data);
        let channel;

        if (args[0] == undefined) {
          channel = message.channel;
        } else {
          channel = self.getChannelFromMention(
            message.guild.channels.cache,
            args[0]
          );
          if (!channel)
            return message.reply(`Sorry meowster but ${args[0]} doesn't exist`);

          if (
            !channel
              .permissionsFor(message.guild.client.user)
              .has('SEND_MESSAGES', true)
          ) {
            return message.reply(
              `Sorry meowster but I can't send messages in ${channel.name}`
            );
          }

          if (
            !channel
              .permissionsFor(message.guild.client.user)
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
            `Meowster the channel ${channel.name} will no longer act as a session board!`
          );
        } else {
          // Add to array
          sub['subscribe'].push(channel.id);
          message.reply(
            `Meowster the channel ${channel.name} will now act as a session board!`
          );
        }

        db.request(
          { message: sub },
          {
            hostname: client.server_conf.server_hostname,
            port: client.server_conf.server_port,
            path: `${client.server_conf.server_apipath}database/${client.server_conf.server_clientid}/lfg/subscribe?key=${client.server_conf.server_key}`,
            method: 'POST'
          }
        );
      });
    } else {
      message.reply(
        `Sorry meowster but you don't have the **Manage Channels** permission!`
      );
    }
  }
}

module.exports = Subscribe;
