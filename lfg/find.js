const Discord = require('discord.js');
const fs = require('fs');
const {Embeds} = require('discord-paginationembed');

module.exports = {
  name: 'find',
  args: false,
  usage : 'find',
  description : 'Shows all of the adverts on our bot currently right now',
  error (message) {
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  Chunk(arr, len) {
    let chunks = [], i = 0, n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
  },
  async run (client, message, args) {
    let lfg = require("../databases/lfg.json")


    if (Object.keys(lfg).length == 0) return message.reply("Sorry meowster but there are no current advertisements right now!")

    advertisements = []

    for (sessionID in lfg){
      foo = {}
      foo[sessionID] = lfg[sessionID]
      advertisements.push(foo)
    }

    let tChunks = this.Chunk(advertisements, 5);
    let embeds = [], tEmbed;

    for (let outer of tChunks) {
        tEmbed = new Discord.RichEmbed();

        tEmbed
            .setTitle("Session list")
            .setDescription("Join up with one of the groups below to find some new friends!")

        for (let inner of outer) {
            sessionID = Object.keys(inner)[0]
            let desc;
            if (inner[sessionID]['description'] == null || inner[sessionID]['description'].length == 0){
              desc = 'No description provided.'
            } else {
              desc = inner[sessionID]['description']
            }
            tEmbed.addField(
                `\u200B`,
                `\`\`\`\n`
                + `🔖 SessionID: ${sessionID}\n`
                + `🕹️ Platform: ${inner[sessionID]['platform']}\n`
                + `📝 Description: ${desc}\n`
                + `\`\`\``,
            );
        }

        embeds.push(tEmbed);
    }


    new Embeds()
        .setArray(embeds)
        .setTimeout(30 * 1000)
        .setNavigationEmojis({
        back: '◀',
        jump: '↗',
        forward: '▶',
        delete: '🗑'
        })
        .setPageIndicator(true)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setColor('#8fde5d')
        .build();
      }

  }
