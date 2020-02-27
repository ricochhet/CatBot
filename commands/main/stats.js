const Command = require('../../utils/baseCommand.js');

// const logger = require('../../utils/log.js');

// Can use this to query logs and find how many times commands are used (as long as its logged somewhere else)
// Could do other fancy reporting things like how many errors in the last week/month, most searched item/monster/deco,
// whatever comes to mind. This is just model (from winston docs), not yet adapted
// const options = {
//     from: new Date() - (24 * 60 * 60 * 1000),
//     until: new Date(),
//     limit: 10,
//     start: 0,
//     order: 'desc',
//     fields: ['message']
//   };

//   //
//   // Find items logged between today and yesterday.
//   //
//   logger.query(options, function (err, results) {
//     if (err) {
//       /* TODO: handle me */
//       throw err;
//     }

//     console.log(results);
//   });

class Stats extends Command {
  constructor(prefix) {
    super('stats', 'stats', 'Usage stats', {
      args: false,
      prefix: prefix,
      secret: true
    });
  }

  async run(client, message, args) {
    return;
    // const statsEmed = this.RichEmbed()
    //   .setColor('#8fde5d')
    //   .setTitle('Usage stats')
    //   .setDescription('[Discord](https://discord.gg/srNyk8G)')
    //   .addField('About: ', 'Support Server for CatBot')
    //   .setTimestamp()
    //   .setFooter('Support Link Request', client.user.avatarURL);

    // message.channel.send(inviteEmbed);
  }
}

module.exports = Stats;
