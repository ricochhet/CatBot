const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Sinfo extends Command {
  constructor(prefix) {
    super('sinfo', 'sinfo', 'Get info of a server', {
      prefix: prefix,
      secret: true
    });
  }

  async run(client, message, args) {
    let input = args.join(' ');

    const guild = await client.shard
      .fetchClientValues('guilds.cache')
      .then(results => {
        let xGuild = null;
        results.forEach(shard => {
          shard.forEach(obj => {
            if (obj.id == input || obj.name.toLowerCase() == input)
              xGuild = obj;
          });
        });

        return xGuild;
      })
      .catch(err =>
        logger.error(err, {
          where: 'sinfo.js 28 (client.shard.fetchClientValues)'
        })
      );

    if (!guild) return;

    // let verificationLevels = [
    //   'None',
    //   'Low',
    //   'Medium',
    //   '(╯°□°）╯︵  ┻━┻',
    //   '┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻'
    // ];

    const region = {
      brazil: ':flag_br: Brazil',
      'eu-central': ':flag_eu: Central Europe',
      singapore: ':flag_sg: Singapore',
      'us-central': ':flag_us: U.S. Central',
      sydney: ':flag_au: Sydney',
      'us-east': ':flag_us: U.S. East',
      'us-south': ':flag_us: U.S. South',
      'us-west': ':flag_us: U.S. West',
      'eu-west': ':flag_eu: Western Europe',
      'vip-us-east': ':flag_us: VIP U.S. East',
      london: ':flag_gb: London',
      amsterdam: ':flag_nl: Amsterdam',
      hongkong: ':flag_hk: Hong Kong',
      russia: ':flag_ru: Russia',
      southafrica: ':flag_za:  South Africa'
    };

    const listEmbed = this.MessageEmbed()
      .setColor('#8fde5d')
      .setAuthor(guild.name, guild.iconURL)
      .addField('Name', guild.name, true)
      .addField('ID', '||' + guild.id + '||', true)
      /*.addField("Owner",  `${g.owner.user.username}#${g.owner.user.discriminator}`, true)*/
      .setThumbnail(guild.iconURL)
      .addField('Region', region[guild.region], true)
      .addField('Members', `${guild.memberCount}`)
      .addField('Verification Level', guild.verificationLevel, true)
      .addField('Channels', guild.channels.length, true)
      .addField('Roles', guild.roles.length, true)
      .addField(
        'Creation Date',
        `${new Date(guild.createdTimestamp)
          .toUTCString()
          .substr(0, 16)} (${checkDays(guild.createdTimestamp)})`,
        true
      )
      .addField(
        'Note: ',
        'Do not use the visible information to your advantage in anyway, incl. but not limited to server raiding, etc.'
      )
      .setTimestamp()
      .setFooter('Sinfo Menu');

    message.channel.send(listEmbed);
  }
}

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date;
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? ' day' : ' days') + ' ago';
}

module.exports = Sinfo;
