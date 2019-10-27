const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'lfg',
  args: false,
  usage : '+lfg <post/find/cancel>\n<args for post/find/cancel>',
  description : 'Is the parent command for all looking for group commands',
  capSen : true,
  error (message) {
    const data = [];
    data.push('\n**post Args:**\n platform: Platform args are multiple choice of PC/XBOX/PS4\nseasionID : the session id that you plan to advertise\ndescription: what are you planing to in this session\n');
    data.push('**find Args:**\n No Arguments for find\n');
    data.push('**cancel Args:**\n No Arguments for cancel\n');
    data.push('**subscribe Args:**\n Optional parameter of the channel name can be put into the subscribe method however if no parameter was given it will select sub board to the channel you put the command in')
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run (client, message, args) {

    // Gets category command
    let category = args[1]

    if (category != undefined) category = category.toLowerCase()
    // Strips first arg from args
    args = args.slice(2, args.length);

    let response = false;

    client.lfg.forEach(cmd => {
      // if category is command run it
      if (category == cmd.name & !cmd.secret) {
        // set response to true so we know not to send the help command
        response = true;
        cmd.run(client, message, args);
      }
    });

    // Checks if there were no arguments
    if (!response) {
      this.error(message);
    }
  }
}
