const Command = require('../../utils/baseCommand.js');
const fs = require('fs');

class Ignore extends Command {
  constructor(prefix) {
    super(
      'ignore',
      'ignore [channel id]',
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
      if (isNaN(channelID))
        return message.channel.send('A channel ID does not include letters!');
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

        if (Channels.channels.includes(channelID)) {
          if (index !== -1) obj.splice(index, 1);
          message.channel.send('Removed channel ID from ignore list!');
        } else {
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
