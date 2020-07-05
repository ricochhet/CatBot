const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Subscribe extends Command {
  constructor() {
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
      client.apiClient
        .getLfgSubs()
        .then(subs => {
          let channel;

          if (args[0] == undefined) {
            channel = message.channel;
          } else {
            channel = this.getChannelFromMention(
              message.guild.channels.cache,
              args[0]
            );
            if (!channel)
              return message.reply(
                `Sorry meowster but ${args[0]} doesn't exist`
              );

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

          if (subs['subscribe'].includes(channel.id)) {
            // Remove from array
            subs['subscribe'] = subs['subscribe'].filter(function(element) {
              return element !== channel.id;
            });
            message.reply(
              `Meowster the channel ${channel.name} will no longer act as a session board!`
            );
          } else {
            // Add to array
            subs['subscribe'].push(channel.id);
            message.reply(
              `Meowster the channel ${channel.name} will now act as a session board!`
            );
          }

          client.apiClient.updateLfgSubs(subs);
        })
        .catch(error => {
          logger.error('Failed retrieving lfg subs', error);
          message.channel.send(this.serverErrorEmbed());
        });
    } else {
      message.reply(
        `Sorry meowster but you don't have the **Manage Channels** permission!`
      );
    }
  }
}

module.exports = Subscribe;
