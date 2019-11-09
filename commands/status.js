const Discord = require('discord.js');

module.exports = {
  name: 'status',
  args: false,
  secret: true,
  run(client, message, args) {
    if (message.author.id == process.env.OWNER) {
      let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      let secondsRounded = totalSeconds.toString().split(".")[0];
      let uptime = `${days}:${hours}:${minutes}:${secondsRounded}`;

      let pingTime = client.ping;
      let pingRounded = Math.round(pingTime);

      let messagePing = new Date().getTime() - message.createdTimestamp;
      let messagePingRounded = Math.round(messagePing);

      let nodejsVersion = process.version;
      let discordjsVersion = Discord.version;

      let userCount = client.guilds.map(g => g.memberCount).reduce((a, b) => a + b);

      const statusEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .addField('Servers: ', client.guilds.size, true)
        .addField('Members: ', userCount, true)
        .addField('Bot Version: ', 'v1.6.22', true)
        .addField('Message Latency', messagePingRounded + 'ms', true)
        .addField('API Latency: ', pingRounded + 'ms', true)
        .addField('Uptime: ', uptime, true)
        .addField('NodeJS Version', nodejsVersion, true)
        .addField('DiscordJS Version', discordjsVersion, true)
        .setTimestamp()
        .setFooter('Status Menu', client.user.avatarURL);

      message.channel.send(statusEmbed);
      const guildNames = client.guilds.map(g => g.name + " | " + g.id).join('\n');

      console.log(guildNames);
    }
  },
};