const Discord = require('discord.js');

module.exports = {
  name: 'sinfo',
  args: false,
  secret: true,
  run (client, message, args) {
    if(message.author.id == process.env.OWNER) {
      var input = args[0];
  
      var guildList = client.guilds.array();
      var g = client.guilds.get(input);
  
      function checkDays(date) {
          let now = new Date();
          let diff = now.getTime() - date.getTime();
          let days = Math.floor(diff / 86400000);
          return days + (days == 1 ? " day" : " days") + " ago";
      };
  
      let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
  
      let region = {
          "brazil": ":flag_br: Brazil",
          "eu-central": ":flag_eu: Central Europe",
          "singapore": ":flag_sg: Singapore",
          "us-central": ":flag_us: U.S. Central",
          "sydney": ":flag_au: Sydney",
          "us-east": ":flag_us: U.S. East",
          "us-south": ":flag_us: U.S. South",
          "us-west": ":flag_us: U.S. West",
          "eu-west": ":flag_eu: Western Europe",
          "vip-us-east": ":flag_us: VIP U.S. East",
          "london": ":flag_gb: London",
          "amsterdam": ":flag_nl: Amsterdam",
          "hongkong": ":flag_hk: Hong Kong",
          "russia": ":flag_ru: Russia",
          "southafrica": ":flag_za:  South Africa"
      };
  
      if(g == null || g == false) return;
      //||#${g.owner.user.discriminator}||
  
      if(g) {
      const listEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setAuthor(g.name, g.iconURL)
      .addField("Name", g.name, true)
      .addField("ID", "||" + g.id + "||", true)
      /*.addField("Owner",  `${g.owner.user.username}#${g.owner.user.discriminator}`, true)*/
      .setThumbnail(g.iconURL)
      .addField("Region", region[g.region], true)
      .addField('Members', `${g.memberCount}`)
      .addField("Verification Level", verifLevels[g.verificationLevel], true)
      .addField("Channels", g.channels.size, true)
      .addField("Roles", g.roles.size, true)
      .addField("Creation Date", `${g.createdAt.toUTCString().substr(0, 16)} (${checkDays(g.createdAt)})`, true)
      .addField("Note: ", "Do not use the visible information to your advantage in anyway, incl. but not limited to server raiding, etc.")
      .setTimestamp()
      .setFooter('Sinfo Menu');
  
      message.channel.send(listEmbed);
      }
    }
  }
}

/*
exports.run = (client, message, args) => {
  if(message.author.id == process.env.OWNER) {
    var input = args[0];

    var guildList = client.guilds.array();
    var g = client.guilds.get(input);

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

    if(g == null || g == false) return;
    //||#${g.owner.user.discriminator}||

    if(g) {
    const listEmbed = new Discord.RichEmbed()
    .setColor('#8fde5d')
    .setAuthor(g.name, g.iconURL)
    .addField("Name", g.name, true)
    .addField("ID", "||" + g.id + "||", true)
    .addField("Owner",  `${g.owner.user.username}#${g.owner.user.discriminator}`, true)
    .setThumbnail(g.iconURL)
    .addField("Region", region[g.region], true)
    .addField('Members', `${g.memberCount}`)
    .addField("Verification Level", verifLevels[g.verificationLevel], true)
    .addField("Channels", g.channels.size, true)
    .addField("Roles", g.roles.size, true)
    .addField("Creation Date", `${g.createdAt.toUTCString().substr(0, 16)} (${checkDays(g.createdAt)})`, true)
    .addField("Note: ", "Do not use the visible information to your advantage in anyway, incl. but not limited to server raiding, etc.")
    .setTimestamp()
    .setFooter('Sinfo Menu');

    message.channel.send(listEmbed);
    }
  }
};*/