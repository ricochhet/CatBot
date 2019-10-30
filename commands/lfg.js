const Discord = require('discord.js');

module.exports = {
  name: 'lfg',
  args: false,
  usage : '+lfg <post/find/cancel>\n<args for post/find/cancel>',
  description : 'Is the parent command for all looking for group commands',
  caseSensitiveArgs : true,
  error(message) {
    const data = [];
    data.push('\n**post Args:**\nplatform: choose between PC, PS4, XBOX\nsessionID: the session id you want to post\ndescription: what you are planning to do in this session\n');
    data.push('**find Args:**\n No arguments\n');
    data.push('**cancel Args:**\n No arguments\n');
    data.push('**subscribe Args:**\n channel name: where CatBot should be posting lfg ads. Optional (default is the channel where the command is run).\n--');
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', `${this.usage}\n--`)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  run(client, message, args) {

    // Get sub command
    let subcmd = args[1];
    if (subcmd != undefined) subcmd = subcmd.toLowerCase();

    const cmdFound = client.lfg.find(cmd => cmd.name === subcmd && cmd.secret === false);

    if (!cmdFound) return this.error(message);

    // Strip first 2 args (lfg subcmd)
    args = args.slice(2, args.length);

    cmdFound.run(client, message, args);
  },
};
