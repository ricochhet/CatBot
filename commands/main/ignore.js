const Command = require('../../utils/baseCommand.js');
const db = require('../../utils/libraries/client');
const fs = require('fs');

class Ignore extends Command {
  constructor(prefix) {
    super(
      'ignore',
      'ignore [channel_(id/mention/name) | all | clear | list]',
      'Allows the bot to ignore a channel\n*(run again to remove channel from list)*',
      {
        args: true,
        prefix: prefix,
        admin: true
      }
    );
  }

  usageEmbed(error = '') {
    const data = [];
    data.push('**channel_id:** 18 digits (turn on developer mode to see them)');
    data.push('**channel_mention:** example -> #general');
    data.push('**channel_name:** example -> general');
    data.push('**all:** ignore all channels, except current one');
    data.push('**clear:** clear ignore list');
    data.push('**list:** show current ignore list');

    const embed = this.MessageEmbed().setColor('#8fde5d');

    if (error) {
      embed.addField('An error has occurred!', error);
    }

    embed
      .addField('Usage', this.usage)
      .addField('Options', data.join('\n'))
      .setTimestamp();

    return embed;
  }

  async run(client, message, args) {
    const self = this;

    db.get(
      `${client.server_conf.server_url}database/${client.server_conf.server_clientid}/server/ignoredChannels?key=${client.server_conf.server_key}`
    ).then(function(data) {
      let ignored = JSON.parse(data);
      let channelID = args[0];

      // initialize list if needed (never set before)
      if (!ignored.channels) ignored.channels = [];

      switch (channelID) {
        case 'all':
          {
            // grab all text channels, except current one
            let channels = message.guild.channels.cache.filter(
              channel =>
                channel.id != message.channel.id && channel.type == 'text'
            );

            // create mentionable channels for user response
            let mentions = channels
              .filter(channel => channel.viewable)
              .map(channel => `<#${channel.id}>`)
              .join(', ');

            // if not all channels are viewable add in some extra details
            if (!channels.every(channel => channel.viewable))
              mentions += ' and all private channels';

            channels = channels.map(channel => channel.id);
            ignored.channels = [...new Set(ignored.channels.concat(channels))]; // filter unique ids

            message.channel.send(
              `Will now ignore ${mentions} (except for this channel)`
            );
          }
          break;
        case 'clear':
          {
            let allChannels = message.guild.channels.cache.map(
              channel => channel.id
            );

            // remove all the channels from the ignored list
            ignored.channels = ignored.channels.filter(
              channelID => !allChannels.includes(channelID)
            );

            message.channel.send('Now listening to all channels!');
          }
          break;
        case 'list':
          {
            let channelsIgnored = message.guild.channels.cache.filter(
              channel =>
                ignored.channels.includes(channel.id) && channel.viewable
            );

            if (channelsIgnored.size == 0) {
              return message.channel.send('Not ignoring any channel');
            }

            let mentions = channelsIgnored
              .map(channel => `<#${channel.id}>`)
              .join(', ');

            // if not all channels are viewable add in some extra details
            if (
              !message.guild.channels.cache
                .filter(channel => ignored.channels.includes(channel.id))
                .every(channel => channel.viewable)
            )
              mentions += ' and all private channels';

            message.channel.send(`Channels ignored: ${mentions}`);
          }
          break;

        default:
          {
            // // Data validation
            // if (channelID.length != 18)
            //   return message.channel.send(this.usageEmbed('Invalid channel ID - should be 18 digits'));

            let channel = self.getChannelFromMention(
              message.guild.channels.cache,
              channelID
            );
            if (!channel)
              return message.channel.send(
                self.usageEmbed(`Can't find the channel by \`${channelID}\``)
              );
            channelID = channel.id;

            // remove or add to list
            if (ignored.channels.includes(channelID)) {
              ignored.channels = ignored.channels.filter(
                channel => channel != channelID
              );

              message.channel.send(`Removed <#${channelID}> from ignore list!`);
            } else {
              ignored.channels.push(channelID);
              message.channel.send(`Will now ignore <#${channelID}>`);
            }
          }
          break;
      }

      db.request(
        { message: ignored },
        {
          hostname: client.server_conf.server_hostname,
          port: client.server_conf.server_port,
          path: `${client.server_conf.server_apipath}database/${client.server_conf.server_clientid}/server/ignoredChannels?key=${client.server_conf.server_key}`,
          method: 'POST'
        }
      );
    });
  }
}

module.exports = Ignore;
