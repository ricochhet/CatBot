const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if(message.author.id == process.env.OWNER) {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let secondsRounded = totalSeconds.toString().split(".")[0];
    let uptime = `${days}:${hours}:${minutes}:${secondsRounded}`;

    let pingTime = client.ping;
    let pingRounded = pingTime.toString().split(".")[0];

    let userCount = client.guilds.map(g => g.memberCount).reduce((a, b) => a + b);

    const statusEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .addField('Servers: ', client.guilds.size, true)
    .addField('Members: ', userCount, true)
    .addField('Bot Version: ', "v1.5.2", true)
    .addField('Heartbeat: ', pingRounded + "ms", true)
    .addField('Uptime: ', uptime, true)
    .setTimestamp()
    .setFooter('Status Menu', client.user.avatarURL);

    message.channel.send(statusEmbed);
    const guildNames = client.guilds.map(g => g.name + " | " + g.id).join("\n");

    console.log(guildNames);
  }
};