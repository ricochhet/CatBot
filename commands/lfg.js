const Discord = require('discord.js');

module.exports = {
  name: 'lfg',
  args: false,
  usage : '+lfg <post/find/cancel>\n<args for post/find/cancel>',
  description : 'Is the parent command for all looking for group commands',
  caseSensitiveArgs : true,
  error(message) {
    const data = [];
    data.push('\n**post Args:**\n platform: choose between PC, PS4, XBOX\nsessionID: the session id you want to post\ndescription: what you are planning to do in this session\n');
    data.push('**find Args:**\n No arguments\n');
    data.push('**cancel Args:**\n No arguments\n');
    data.push('**subscribe Args:**\n channel name: where CatBot should be posting lfg ads. Optional (default is the channel where the command is run).');
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {

    // Get sub command
    let subcmd = args[1];
    if (subcmd != undefined) subcmd = subcmd.toLowerCase();

    // Strip first 2 args (lfg subcmd)
    args = args.slice(2, args.length);

    let postHelp = true;

    client.lfg.forEach(cmd => {
      // run sub-command if found
      if (subcmd == cmd.name & !cmd.secret) {        
        postHelp = false;
        cmd.run(client, message, args);
      }
    });

    if (postHelp) {
      this.error(message);
    }
  },
};
