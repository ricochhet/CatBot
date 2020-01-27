const Discord = require('discord.js');
const auth = require('../auth.json');

module.exports = {
  name: 'sinfo',
  args: false,
  secret: true,
  run(client, message, args) {
    if(message.author.id == auth.OWNER) {
      let input = args[0];

      const guildName = client.guilds.get(input);

      let verificationLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

      const region = {
        'brazil': ':flag_br: Brazil',
        'eu-central': ':flag_eu: Central Europe',
        'singapore': ':flag_sg: Singapore',
        'us-central': ':flag_us: U.S. Central',
        'sydney': ':flag_au: Sydney',
        'us-east': ':flag_us: U.S. East',
        'us-south': ':flag_us: U.S. South',
        'us-west': ':flag_us: U.S. West',
        'eu-west': ':flag_eu: Western Europe',
        'vip-us-east': ':flag_us: VIP U.S. East',
        'london': ':flag_gb: London',
        'amsterdam': ':flag_nl: Amsterdam',
        'hongkong': ':flag_hk: Hong Kong',
        'russia': ':flag_ru: Russia',
        'southafrica': ':flag_za:  South Africa',
      };

      if (guildName == null || guildName == false) return;
      //||#${g.owner.user.discriminator}||

      if (guildName) {
        const listEmbed = new Discord.RichEmbed()
          .setColor('#8fde5d')
          .setAuthor(guildName.name, guildName.iconURL)
          .addField('Name', guildName.name, true)
          .addField("ID", "||" + guildName.id + "||", true)
          /*.addField("Owner",  `${g.owner.user.username}#${g.owner.user.discriminator}`, true)*/
          .setThumbnail(guildName.iconURL)
          .addField('Region', region[guildName.region], true)
          .addField('Members', `${guildName.memberCount}`)
          .addField('Verification Level', verificationLevels[guildName.verificationLevel], true)
          .addField('Channels', guildName.channels.size, true)
          .addField('Roles', guildName.roles.size, true)
          .addField('Creation Date', `${guildName.createdAt.toUTCString().substr(0, 16)} (${checkDays(guildName.createdAt)})`, true)
          .addField('Note: ', 'Do not use the visible information to your advantage in anyway, incl. but not limited to server raiding, etc.')
          .setTimestamp()
          .setFooter('Sinfo Menu');

        message.channel.send(listEmbed);
      }
    }
  },
};

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};