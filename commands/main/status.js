const Command = require('../../utils/baseCommand.js');

class Status extends Command {
  constructor(prefix) {
    super('status', 'status', 'Gives the CatBot status', {
      args: false,
      secret: true,
      prefix: prefix
    });
  }

  run(client, message, args) {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let secondsRounded = totalSeconds.toString().split('.')[0];
    let uptime = `${days}:${hours}:${minutes}:${secondsRounded}`;

    let pingTime = client.ping;
    let pingRounded = Math.round(pingTime);

    let messagePing = new Date().getTime() - message.createdTimestamp;
    let messagePingRounded = Math.round(messagePing);

    let nodejsVersion = process.version;
    let discordjsVersion = this.version;

    let userCount = client.guilds
      .map(g => g.memberCount)
      .reduce((a, b) => a + b);

    let memory = process.memoryUsage().heapUsed / 1024 / 1024;

    const statusEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Servers: ', client.guilds.size, true)
      .addField('Members: ', userCount, true)
      .addField('Version: ', `v${client.config.get('VERSION')}`, true)
      .addField('Message Latency', messagePingRounded + 'ms', true)
      .addField('API Latency: ', pingRounded + 'ms', true)
      .addField('Uptime: ', uptime, true)
      .addField('NodeJS Version', nodejsVersion, true)
      .addField('DiscordJS Version', discordjsVersion, true)
      .addField('Memory Usage', `${memory.toFixed(2)} MB`, true)
      .setTimestamp()
      .setFooter('Status Menu', client.user.avatarURL);

    message.channel.send(statusEmbed);
    const guildNames = client.guilds.map(g => g.name + ' | ' + g.id).join('\n');

    console.log(guildNames);
  }
}

module.exports = Status;
