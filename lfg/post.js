const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'post',
  args: true,
  usage: 'post <platform> <session id> [description]',
  description: 'Advertise your game session through CatBot for 2 hours',
  secret : false,
  error(message) {
    const data = [];
    data.push('**platform Args:**\n Choose between PC, PS4, XBOX\n');
    data.push('**sessionID Args:**\n Must be between 11-13 characters for PC, between 14-16 characters for PS4/XBOX\n');
    data.push('**description Args:**\n What you will be doing in the session. Optional. 256 characters max.');
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },

  remove(lfg, message) {

    // Find the sessionId
    let sessionID;
    const userID = message.author.id;
    for (const group in lfg) {
      if (lfg[group]['userID'] == userID) {
        sessionID = group;
        break;
      }
    }

    delete lfg[sessionID];

    const jsonObj = JSON.stringify(lfg, null, 4);
    fs.writeFile(`${__dirname.replace('lfg', 'databases')}/lfg.json`, jsonObj, 'utf8', function(err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
    });

    message.reply(`Meowster, the session \`${sessionID}\` was replaced`);
  },

  sendSub(client, sessionID, content) {

    const sub = require('../databases/sub.json');

    let desc;
    if (content['description'] == null || content['description'].length == 0) {
      desc = 'No description provided.';
    }
    else {
      desc = content['description'];
    }

    const tEmbed = new Discord.RichEmbed();

    tEmbed
      .setTitle('Session list')
      .setDescription('Join up with one of the groups below to find some new friends!')
      .setColor('#8fde5d');

    tEmbed.addField(
      '\u200B',
      '```\n'
      + `🔖 SessionID: ${sessionID}\n`
      + `🕹️ Platform: ${content['platform']}\n`
      + `📝 Description: ${desc}\n`
      + '```',
    );


    const post = tEmbed._apiTransform();

    // TODO - Add delay here to pace out requests
    for (const channelID of sub['subscribe']) {
      client.rest.makeRequest('post', Discord.Constants.Endpoints.Channel(channelID).messages, true, {
        content: '',
        embed: post,
      });
    }
  },

  async run(client, message, args) {

    if (!args.length) return this.error(message);

    // load in the current json
    const lfg = require('../databases/lfg.json');

    // Checks if the user has already posted or not
    let repost = false;
    for (const group in lfg) {
      if (lfg[group]['userID'] == message.author.id) {
        repost = true;
        break;
      }
    }

    const responce = new Discord.RichEmbed();

    // Breaks up args into differenct sections
    const sessionObj = {};
    const platform = args[0].toLowerCase();
    let sessionID;
    if (['ps4', 'xbox'].includes(platform)) {
      sessionID = args.slice(1, 4).join(' ');

      if (!sessionID.length) return this.error(message);
      if (sessionID.length < 14 || sessionID.length > 16) return this.error(message);

    }
    else if (platform == 'pc') {
      sessionID = args[1];

      if (!sessionID) return this.error(message);
      if (sessionID.length < 11 || sessionID.length > 13) return this.error(message);
    }
    else {
      return this.error(message);
    }

    // Checks if the sessionID has already been posted
    if (Object.keys(lfg).includes(sessionID) && lfg[sessionID]['userID'] != message.author.id) {
      return message.channel.send('Sorry meowster but someone else has posted that session already!');
    }

    if (repost) {
      this.remove(lfg, message);
    }

    // force push the remaining args into the obj
    console.log(args.length)
    if (args.length > 2) {
      if (['ps4', 'xbox'].includes(platform)) {
        sessionObj['description'] = args.slice(4, args.length).join(' ');
      }
      else {
        sessionObj['description'] = args.slice(2, args.length).join(' ');
      }

      if (sessionObj['description'].length > 256) return this.error(message);
    }
    else {
      sessionObj['description'] = null;
    }

    sessionObj['userID'] = message.author.id;
    sessionObj['platform'] = platform;
    sessionObj['time'] = Date.now();

    // Create embed for SUCCESSFUL requests
    responce
      .setColor('#8fde5d')
      .setTitle(`${platform.toUpperCase()} REQUEST SUCCESSFUL`)
      .setFooter(`Requested by ${message.author.username}#${message.author.discriminator} in ${message.guild.name}`);

    if (args.length > 2 & sessionObj['platform'] == 'pc') {
      responce.addField(`**${sessionID}**`, `\`\`\`${sessionObj['description']}\`\`\``);
    }
    else if (sessionObj['description'] != null & ['ps4', 'xbox'].includes(platform)) {
      responce.addField(`**${sessionID}**`, `\`\`\`${sessionObj['description']}\`\`\``);
    }
    else {
      responce.addField(`**${sessionID}**`, '```No description provided.```');
    }

    // Finishes up object and pushes it back into the lfg db
    lfg[`${sessionID}`] = sessionObj;
    const jsonObj = JSON.stringify(lfg, null, 4);
    fs.writeFile(`${__dirname.replace('lfg', 'databases')}/lfg.json`, jsonObj, 'utf8', function(err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
    });

    message.channel.send(responce);

    // Sends to all channel that are set to sub board
    this.sendSub(client, sessionID, sessionObj);

  },
};
