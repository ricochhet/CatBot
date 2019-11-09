const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'post',
  args: true,
  usage : 'post <platform> <sessionid> [description]',
  description : 'Posts a session that others can find, they close at 2 hours of time',
  secret: false,
  error (message) {
    const data = [];
    data.push('platform: platform args are multiple choice of PC/XBOX/PS4\n');
    data.push('sessionid: session id must be between 11 and 13 characters in length for PC; session id for console need to be between 14 and 16 characters long\n');
    data.push('description: description is optional but is used for describing what you will be doing in the session and has a limit of 256 characters\n');
    const usageEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return message.channel.send(usageEmbed);
  },
  remove(lfg, message) {
    // Checks if the user has already posted or not
    let sessionID;
    let userID = message.author.id;
    for (let group in lfg) {
      if (lfg[group]['userID'] == userID) {
        sessionID = group;
        break;
      }
    }

    delete lfg[sessionID];

    const jsonObj = JSON.stringify(lfg, null, 4)
    fs.writeFile(`${__dirname.replace('lfg', 'databases')}/lfg/lfg.json`, jsonObj, 'utf8', function(err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
    });

    message.channel.send(`Meowster, the session \`${sessionID}\` was replaced`);
  },
  sendSub(client, sessionID, content) {
    const sub = require('../databases/lfg/subscribe.json');

    let desc;
    if (content['description'] == null || content['description'].length == 0) {
      desc = 'No description provided.';
    } else {
      desc = content['description'];
    }

    let tEmbed = new Discord.RichEmbed();

    tEmbed
      .setTitle('Session List')
      .setDescription('Find other players to hunt with!')
      .setColor('#8fde5d')

      tEmbed.addField(
        '\u200B',
        '```\n'
        + `🔖 Session ID: ${sessionID}\n`
        + `🕹️ Platform: ${content['platform']}\n`
        + `📝 Description: ${desc}\n`
        + '```',
      );


    const post = tEmbed._apiTransform();

    for (const channelID of sub['subscribe']) {
        client.rest.makeRequest('post', Discord.Constants.Endpoints.Channel(channelID).messages, true, {
          content: '',
          embed: post,
      });
    }
  },
  async run(client, message, args) {

  if (args.length == 0) return this.error(message);
  // load in the current json
  const lfg = require("../databases/lfg/lfg.json");

  // Checks if the user has already posted or not
  let repost = false;
  for (let group in lfg) {
    if (repost) break;
    if (lfg[group]['userID'] == message.author.id) {
      repost = true;
      break;
    }
  }

  const response = new Discord.RichEmbed();

  // Breaks up args into differenct sections
  const sessionObj = {};
  const platform = args[0].toLowerCase();
  let sessionID;
   if (["ps4", "xbox"].includes(platform)) {
      sessionID = args.slice(1, 4).join(" ");

      if (sessionID.length == 0) return this.error(message);
      if (sessionID.length < 14 || sessionID.length > 16) return this.error(message);
      
    } 
    else if (platform == 'pc') {
      sessionID = args[1];

      if (sessionID == undefined) return this.error(message);
      if (sessionID.length < 11 || sessionID.length > 13) return this.error(message);
      
    } 
    else {
      return this.error(message);
    }

    // Checks if the sessionID has already been posted
    if (Object.keys(lfg).includes(sessionID) && lfg[sessionID]['userID'] != message.author.id) {
      return message.channel.send("Sorry meowster but someone else has posted that session already!");
    }
    if (repost) {
      this.remove(lfg, message);
    }

    // force push the remaining args into the obj
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
      sessionObj['description'] = 'No description provided.';
    }
    
    sessionObj['userID'] = message.author.id;
    sessionObj['platform'] = platform;
    sessionObj['time'] = Date.now();

    // Create embed for SUCCESSFUL requests
    response
      .setColor('#8fde5d')
      .setTitle(`${platform.toUpperCase()} REQUEST SUCCESSFUL`)
      .setFooter(`Requested by ${message.author.username}#${message.author.discriminator} in ${message.guild.name}`);

    if (args.length > 2 & sessionObj['platform'] == 'pc') {
      response.addField(`**${sessionID}**`, `\`\`\`${sessionObj["description"]}\`\`\``);
    } 
    else if (sessionObj['description'].length != null & ['ps4', 'xbox'].includes(platform)) {
      response.addField(`**${sessionID}**`, `\`\`\`${sessionObj["description"]}\`\
    }\``);
    } 
    else {
      response.addField(`**${sessionID}**`, `\`\`\`No description provided.\`\`\``);
    }

    // Finishes up object and pushes it back into the lfg db
    lfg[`${sessionID}`] = sessionObj;
    const jsonObj = JSON.stringify(lfg, null, 4)
    fs.writeFile(`${__dirname.replace('lfg', 'databases')}/lfg/lfg.json`, jsonObj, 'utf8', function(err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
    });

    message.channel.send(response);

    // Sends to all channel that are set to sub board
    this.sendSub(client, sessionID, sessionObj);
  },
};