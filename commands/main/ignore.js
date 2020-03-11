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
    let Channels = require('../../utils/databases/server/ignoredChannels.json');
    let channelID = args[0];

    // makes sure Channels.channels exists
    if (!Channels.channels) Channels.channels = [];

    // adds all channels in the guild to the list
    if (channelID == 'all') {
      let allChannels = message.guild.channels.cache
        .map(channel => channel.id)
        .filter(channel => channel != message.channel.id);

      Channels.channels = [...new Set(Channels.channels.concat(allChannels))]; // this makes sure that they're only uniqe id's in this list

      message.channel.send(
        'Added all channel IDs to ignore list (except the current channel)!'
      );
    } else {
      // Data validtion
      if (isNaN(channelID))
        return message.channel.send('A channel ID does not include letters!');
      if (channelID.length != 18)
        return message.channel.send('This ID is not 18 characters long!');

      // remove or add to list
      if (Channels.channels.includes(channelID)) {
        Channels.channels = Channels.channels.filter(
          channel => channel != channelID
        );
        message.channel.send('Removed channel ID from ignore list!');
      } else {
        Channels.channels.push(channelID);
        message.channel.send('Added channel ID to ignore list!');
      }
    }

    // write the data to the file
    this.saveJsonFile(
      './utils/databases/server/ignoredChannels.json',
      JSON.stringify(Channels, null, 4)
    );
  }
}

module.exports = Ignore;
