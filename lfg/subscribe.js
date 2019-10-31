const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'subscribe',
  args: false,
  usage : 'subscribe [channel name]',
  description : 'Subscribe command will make CatBot automatically post lfg sessions in the given channel',
  secret : false,
  error(message) {
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {
    const sub = require('../databases/sub.json');
    let channel = message.channel;

    if(args[0]) {
        channel = message.guild.channels.find(chan => chan.name == args[0]);

        if (!channel) return message.reply(`Sorry meowster but ${args[0]} doesn't exist`);

        if (!channel.memberPermissions(message.guild.client.user).has('SEND_MESSAGES', true)) {
          return message.reply(`Sorry meowster but I can't send messages in ${channel.name}`);
        }
    }

    if (sub['subscribe'].includes(channel.id)) {
      // Remove from array
      sub['subscribe'] = sub['subscribe'].filter(function(element) {
        return element !== channel.id;
      });
      message.reply(`Meowster the channel ${channel.name} will no longer be a session board! [OFF]`);
    }
    else {
      // Add to array
      sub['subscribe'].push(channel.id)
      message.reply(`Meowster the channel ${channel.name} will now be a session board! [ON]`);
    }

    const jsonObj = JSON.stringify(sub, null, 4);
    fs.writeFile(`${__dirname.replace('lfg', 'databases')}/sub.json`, jsonObj, 'utf8', function(err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.');
            return console.log(err);
        }
    });
  },
};
