const { RichEmbed,TextChannel,version } = require('discord.js')

class Command {
  constructor(name,usage,description,options = {args : true,secret : false,category: false}) {
    this.name = name
    this.usage = usage
    this.description = description
    this.args = options['args']
    this.secret = options['secret']
    this.category = options['category']
    this.version = version

    // Weapons multiplier

    this.weaponsRatio = new Map([
        ['hammer', 5.2], ['gs', 4.8], ['hh', 4.2], ['cb', 3.6],
        ['sa', 3.5], ['ls', 3.3], ['ig', 3.1], ['lance', 2.3],
        ['gl', 2.3], ['hbg', 1.5], ['sns', 1.4], ['db', 1.4],
        ['lbg', 1.3], ['bow', 1.2]
    ]);

    this.rawSharpRatio = new Map([
        ['red', 0.5], ['orange', 0.75], ['yellow', 1.00], ['green', 1.05],
        ['blue', 1.20], ['white', 1.32], ['purple', 1.39], ['none', 1.00]
    ]);

    this.elemSharpRatio = new Map([
        ['red', 0.5], ['orange', 0.75], ['yellow', 1.00], ['green', 1.05],
        ['blue', 1.20], ['white', 1.32], ['purple', 1.39], ['none', 1.00]
    ]);
  }

  RichEmbed(){
    return new RichEmbed()
  }

  menu(channel = new TextChannel(), uid, pages = [], time = 120000, reactions = {first: '⏪', back: '◀', next: '▶', last: '⏩', stop: '⏹'}){

    return new Pages(channel,uid,pages,time,reactions)

  }

  usageEmbed(){

    const embed = this.RichEmbed()
    .setColor('#8fde5d')
    .addField('Usage: ', this.usage, true)
    .addField('Descrption: ', this.description, true)
    .setTimestamp();

    return embed
  }

  similarity(str1, str2) {
    let longer = str1;
    let shorter = str2;
    if (str1.length < str2.length) {
        longer = str2;
        shorter = str1;
    }
    const longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  getSimilarArray(collection, options) {
    let similarArray;

    if ('similarArray' in options) {
        similarArray = options['similarArray'];
    } else {
        similarArray = new Array()
    };

    for (let [key, value] of collection.entries()) {
        let sim = this.similarity(key, options['input']);
        if (sim >= options['threshold']) {
            if (options['pushSim']) {
                if (options['key']) {
                    similarArray.push([value[options['key']], sim]);
                } else {
                    similarArray.push([value[key], sim]);
                }

            } else {
                if (options['key']) {
                    similarArray.push(value[options['key']]);
                } else {
                    similarArray.push(value[key]);
                }
            };
        }
    }

    return similarArray;
}

  reactions(message, similarArray, embedTemplate) {
      const author = message.author.id;

      similarArray.sort(function (a, b) {
          return b[1] - a[1];
      });

      let msg = this.RichEmbed()
          .setColor('#8fde5d')
          .setAuthor("Did you mean?");

      let counter = 0;
      for (let item of similarArray) {
          if (counter >= 8) {
              break;
          }

          msg.addField(`${counter + 1} : ${item[0]}`, "\n\u200B");
          counter++;
      }

      message.channel.send(msg).then(async (message) => {
          let emojis = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣'].slice(0, counter)
          for (let emoji of emojis) {
              await message.react(emoji);
          }

          const filter = (reaction, user) => {
              return emojis.includes(reaction.emoji.name) && user.id === author;
          };

          message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
              .then(async (collected) => {
                  const reaction = collected.first();
                  let name = similarArray[emojis.indexOf(reaction.emoji.name)][0].split(' ').join('').toLowerCase();
                  const embed = embedTemplate(message.client,name,this.RichEmbed());
                  await message.clearReactions();
                  message.edit(embed);
              })
              .catch(async (collected) => {
                  console.log(collected);
                  await message.clearReactions();
                  await message.react('❌');
              });
      });
  }

}

class Pages {
  constructor(channel = new TextChannel(), uid, pages = [], time = 120000, reactions = {first: '⏪', back: '◀', next: '▶', last: '⏩', stop: '⏹'}) {
    this.channel = channel;
    this.pages = pages;
    this.time = time;
    this.reactions = reactions;
    this.page = 1;
    channel.send(pages[0]).then(msg => {
        this.msg = msg;
        this.addReactions();
        this.createCollector(uid);
    });
  }
  select(pg = 1) {
    this.page = pg;
    this.msg.edit(this.pages[pg-1]);
  }
  createCollector(uid) {
    const collector = this.msg.createReactionCollector((r, u) => u.id == uid, {time: this.time});
    this.collector = collector;
    collector.on('collect', r => {
      if(r.emoji.name == this.reactions.first) {
        if(this.page != 1) this.select(1);
      } else if(r.emoji.name == this.reactions.back) {
        if(this.page != 1) this.select(this.page - 1);
      } else if(r.emoji.name == this.reactions.next) {
        if(this.page != this.pages.length) this.select(this.page + 1);
      } else if(r.emoji.name == this.reactions.last) {
        if(this.page != this.pages.length) this.select(this.pages.length);
      } else if(r.emoji.name == this.reactions.stop) {
        collector.stop();
      }
      r.remove(uid);
    });
    collector.on('end', () => {
        this.msg.clearReactions();
    });
  }
  async addReactions() {
    if(this.reactions.first) await this.msg.react(this.reactions.first);
    if(this.reactions.back)  await this.msg.react(this.reactions.back);
    if(this.reactions.next)  await this.msg.react(this.reactions.next);
    if(this.reactions.last)  await this.msg.react(this.reactions.last);
    if(this.reactions.stop)  await this.msg.react(this.reactions.stop);
  }
}

// Computes Levenshtein distance between two strings
function editDistance(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  const costs = new Array();
  for (let i = 0; i <= str1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= str2.length; j++) {
      if (i == 0) {
        costs[j] = j;
      }
      else if (j > 0) {
        let newValue = costs[j - 1];
        if (str1.charAt(i - 1) != str2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue),
          costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[str2.length] = lastValue;
    }
  }
  return costs[str2.length];
}

module.exports = Command
