const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Ignore extends Command {
  constructor() {
    super(
      'ignore',
      'ignore [channel_(id/mention/name) | all | clear | list]',
      'Allows the bot to ignore a channel\n*(run again to remove channel from list)*',
      {
        args: true,
        admin: true
      }
    );
  }

  Chunk(arr, len) {
    let chunks = [],
      i = 0,
      n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
  }

  usageEmbed(prefix, error = '') {
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
    const prefix = await client.prefix(message);

    client.apiClient
      .getIgnoredChannels()
      .then(ignored => {
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
                .map(channel => `<#${channel.id}>`);

              // if not all channels are viewable add in some extra details
              if (!channels.every(channel => channel.viewable))
                mentions.push('and all private channels');

              channels = channels.map(channel => channel.id);
              ignored.channels = [
                ...new Set(ignored.channels.concat(channels))
              ]; // filter unique ids

              mentions = this.Chunk(mentions, 8).map(chunk => {
                let embed = this.MessageEmbed()
                  .setTitle('Channels being Ignored')
                  .setColor('#8fde5d')
                  .setDescription(`${chunk.join('\n')}`);

                return embed;
              });

              const reactions = {
                first: '⏪',
                back: '◀',
                next: '▶',
                last: '⏩',
                stop: '⏹'
              };
              const displayPageNumbers = true;

              this.menu(
                message,
                mentions,
                120000,
                reactions,
                displayPageNumbers
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

              let mentions = channelsIgnored.map(channel => `<#${channel.id}>`);

              // if not all channels are viewable add in some extra details
              if (
                !message.guild.channels.cache
                  .filter(channel => ignored.channels.includes(channel.id))
                  .every(channel => channel.viewable)
              )
                mentions.push('and all private channels');

              mentions = this.Chunk(mentions, 8).map(chunk => {
                let embed = this.MessageEmbed()
                  .setTitle('Channels being Ignored')
                  .setColor('#8fde5d')
                  .setDescription(`${chunk.join('\n')}`);

                return embed;
              });

              const reactions = {
                first: '⏪',
                back: '◀',
                next: '▶',
                last: '⏩',
                stop: '⏹'
              };
              const displayPageNumbers = true;

              this.menu(
                message,
                mentions,
                120000,
                reactions,
                displayPageNumbers
              );
            }
            break;

          default:
            {
              let channel = this.getChannelFromMention(
                message.guild.channels.cache,
                channelID
              );
              if (!channel)
                return message.channel.send(
                  this.usageEmbed(
                    prefix,
                    `Can't find the channel by \`${channelID}\``
                  )
                );
              channelID = channel.id;

              // remove or add to list
              if (ignored.channels.includes(channelID)) {
                ignored.channels = ignored.channels.filter(
                  channel => channel != channelID
                );

                message.channel.send(
                  `Removed <#${channelID}> from ignore list!`
                );
              } else {
                ignored.channels.push(channelID);
                message.channel.send(`Will now ignore <#${channelID}>`);
              }
            }
            break;
        }

        client.apiClient.updateIgnoredChannels(ignored);
      })
      .catch(err => {
        logger.error(err);
        message.channel.send(this.serverErrorEmbed());
      });
  }
}

module.exports = Ignore;
