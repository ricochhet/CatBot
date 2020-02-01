const { RichEmbed,TextChannel,version } = require('discord.js')

class Command {
  constructor(name,usage,description,options = {args : true,secret : false,category: false,subTree : null}) {
    this.name = name
    this.usage = usage
    this.description = description
    this.args = options['args']
    this.secret = options['secret']
    this.category = options['category']
    this.subTree = options['subTree']
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

    if (!this.category && this.subTree != null){
      console.log(`Warning Non-Catagory Command (${this.name}) has set a subTree`)
    } else if (this.category && this.subTree == null){
      this.subTree = this.name
    }
  }

  run(client, message, args){

    const subCommand = args[0];
    const commandFound = client[this.subTree].find(cmd => cmd.name === subCommand && !cmd.secret);
    if(!commandFound) return message.channel.send(this.usageEmbed());
    args = args.slice(1, args.length);
    commandFound.run(client, message, args);
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

  similarity(string1,string2){

    let biStr1 = bigrams(string1);
    let biStr2 = bigrams(string2);

    let counter = 0;
    let index = 0;
    while ( index < (biStr1.length - 1) || index < (biStr2.length - 1) ) {

      if (biStr1[index] == biStr2[index]) counter++
      index++

    }

    return ( ( 2 * counter ) / ( biStr1.length + biStr2.length ) )
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

function bigrams(string){
  return string.match(/.{1,2}/g)
}

module.exports = Command