const Command = require('../../utils/baseCommand.js');
const fs = require('fs');

class Ignore extends Command {
  constructor(prefix) {
    super(
      'ignore',
      'ignore [channel id / all]',
      'Allows the bot to ignore a channel based on its ID\n*(run again to remove channel from list)*',
      {
        args: false,
        prefix: prefix
      }
    );
  }

  async run(client, message, args) {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
      let Channels = require('../../utils/databases/server/ignoredChannels.json');

      let channelID = args[0];
      if (isNaN(channelID) && channelID != 'all')
        return message.channel.send('A channel ID does not include letters!');
      if (channelID.length != 18 && channelID != 'all')
        return message.channel.send('This ID is not 18 characters long!');
      if (Channels.channels == null) {
        let obj = {
          channels: []
        };

        const jsonObj = JSON.stringify(obj, null, 4);

        fs.writeFile(
          './utils/databases/server/ignoredChannels.json',
          jsonObj,
          'utf8',
          err => {
            if (err)
              return logger.error(
                'An error occured while writing JSON Object to file.',
                err
              );
          }
        );
      }

      if (Channels.channels != null) {
        const index = Channels.channels.indexOf(channelID);
        let obj = Channels.channels;

        if (channelID == 'all') {
          let array = [];
          message.guild.channels.cache.forEach(channel =>
            array.push(channel.id)
          );

          let currentChannel = array.indexOf(message.channel.id);
          if (currentChannel !== -1) {
            array.splice(currentChannel, 1);
          }

          for (const i in array) {
            if (obj.indexOf(array[i]) === -1) obj.push(array[i]);
          }

          message.channel.send(
            'Added all channel IDs to ignore list (except the current channel)!'
          );
        }

        if (Channels.channels.includes(channelID) && channelID != 'all') {
          if (index !== -1) obj.splice(index, 1);
          message.channel.send('Removed channel ID from ignore list!');
        } else if (
          !Channels.channels.includes(channelID) &&
          channelID != 'all'
        ) {
          obj.push(channelID);
          message.channel.send('Added channel ID to ignore list!');
        }

        Channels.channels = obj;

        fs.writeFile(
          './utils/databases/server/ignoredChannels.json',
          JSON.stringify(Channels, null, 4),
          'utf8',
          err => {
            if (err)
              return logger.error(
                'An error occured while writing JSON Object to file.',
                err
              );
          }
        );
      }
    } else {
      message.reply(
        `Sorry meowster but you don't have the **Manage Channels** permission!`
      );
    }
  }
}

module.exports = Ignore;
