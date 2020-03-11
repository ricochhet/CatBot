const Command = require('../../utils/baseCommand.js');
const fs = require('fs');

class Ignore extends Command {
  constructor(prefix) {
    super(
      'ignore',
      'ignore [channel id / all]',
      'Allows the bot to ignore a channel based on its ID\n*(run again to remove channel from list)*',
      {
        args: true,
        prefix: prefix
      }
    );
  }

  async run(client, message, args) {
    // some perm checking
    if (!message.member.hasPermission('MANAGE_CHANNELS'))
      return message.reply(
        `Sorry meowster but you don't have the **Manage Channels** permission!`
      );
    let ignored = require('../../utils/databases/server/ignoredChannels.json');
    let channelID = args[0];

    // makes sure Channels.channels exists
    if (!ignored.channels) ignored.channels = [];

    // adds all channels in the guild to the list
    if (channelID == 'all') {
      let allChannels = message.guild.channels.cache.filter(
        channel => channel.id != message.channel.id && channel.type == 'text'
      );

      // create mentionable channels for user responce
      let mentions = allChannels
        .filter(channel => channel.viewable)
        .map(channel => `<#${channel.id}>`)
        .join(', ');

      // if not all channels are viewable add in some extra details
      if (!allChannels.every(channel => channel.viewable))
        mentions += ' and all invisible channels';

      allChannels = allChannels.map(channel => channel.id);
      ignored.channels = [...new Set(ignored.channels.concat(allChannels))]; // this makes sure that they're only uniqe id's in this list

      message.channel.send(`Ignored ${mentions}`);
    } else if (channelID == 'clear') {
      // get all channel id in guild
      let allChannels = message.guild.channels.cache.map(channel => channel.id);

      // filter out any of the channel in the ignored list
      ignored.channels = ignored.channels.filter(
        channel => !allChannels.includes(channel)
      );

      message.channel.send('Now listening to all channels!');
    } else {
      // Data validtion
      if (isNaN(channelID))
        return message.channel.send('A channel ID does not include letters!');
      if (channelID.length != 18)
        return message.channel.send('This ID is not 18 characters long!');

      // remove or add to list
      if (ignored.channels.includes(channelID)) {
        ignored.channels = ignored.channels.filter(
          channel => channel != channelID
        );
        message.channel.send('Removed channel ID from ignore list!');
      } else {
        ignored.channels.push(channelID);
        message.channel.send('Added channel ID to ignore list!');
      }
    }

    // write the data to the file
    this.saveJsonFile(
      './utils/databases/server/ignoredChannels.json',
      JSON.stringify(ignored, null, 4)
    );
  }
}

module.exports = Ignore;
