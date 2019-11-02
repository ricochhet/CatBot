const Discord = require('discord.js');

module.exports = {
  name: 'status',
  args: false,
  secret: true,
  run(client, message, args) {
    if (message.author.id == process.env.OWNER) {
      let totalSeconds = (client.uptime / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor(totalSeconds / 3600);

      totalSeconds %= 3600;

      const minutes = Math.floor(totalSeconds / 60);
      const secondsRounded = totalSeconds.toString().split('.')[0];
      const uptime = `${days}:${hours}:${minutes}:${secondsRounded}`;

      const pingTime = client.ping;
      const pingRounded = Math.round(pingTime);

      const messagePing = new Date().getTime() - message.createdTimestamp;
      const messagePingRounded = Math.round(messagePing);

      const nodejsVersion = process.version;
      const discordjsVersion = Discord.version;

      const userCount = client.guilds.map(g => g.memberCount).reduce((a, b) => a + b);

      const statusEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .addField('Servers: ', client.guilds.size, true)
        .addField('Members: ', userCount, true)
        .addField('Bot Version: ', 'v1.6.18', true)
        .addField('Message Latency', messagePingRounded + 'ms', true)
        .addField('API Latency: ', pingRounded + 'ms', true)
        .addField('Uptime: ', uptime, true)
        .addField('NodeJS Version', nodejsVersion, true)
        .addField('DiscordJS Version', discordjsVersion, true)
        .setTimestamp()
        .setFooter('Status Menu', client.user.avatarURL);

      message.channel.send(statusEmbed);
      const guildNames = client.guilds.map(g => g.name + ' | ' + g.id).join('\n');

      console.log(guildNames);
    }
  },
};
