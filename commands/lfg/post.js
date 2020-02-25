const Command = require('../../utils/baseCommand.js');

class Post extends Command {
  constructor(prefix) {
    super(
      'post',
      'post [platform] [session id] (description)',
      'Posts an active session to CatBots LFG command'
    );
  }

  usageEmbed() {
    const data = [];
    data.push('platform: PC, PS4, or XBOX\n');
    data.push(
      'session id: Must be between 11 and 13 characters long for PC; and between 14 and 16 characters long for console\n'
    );
    data.push('description: Describe what you plan to do in the session\n');
    const embed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .setTimestamp();

    return embed;
  }

  sendSub(client, sessionID, content) {
    const sub = require('../../utils/databases/lfg/subscribe.json');

    let desc;
    if (!content['description']) {
      desc = 'No description provided.';
    } else {
      desc = content['description'];
    }

    let tEmbed = this.RichEmbed();

    tEmbed
      .setTitle('Session List')
      .setDescription('Find other players to hunt with!')
      .setColor('#8fde5d');

    tEmbed.addField(
      '\u200B',
      '```\n' +
        `🔖 Session ID: ${sessionID}\n` +
        `🕹️ Platform: ${content['platform']}\n` +
        `📝 Description: ${desc}\n` +
        '```'
    );

    //const post = tEmbed._apiTransform();

    let removableChannels = [];
    for (const channelID of sub['subscribe']) {
      let channel = client.channels.get(channelID);

      if (channel != null) {
        channel.send(tEmbed).catch(e => console.log(`ERROR: ${e}`));
      } else {
        removableChannels.push(channelID);
      }
      /*client.rest.makeRequest(
        'post',
        client.Constants.Endpoints.Channel(channelID).messages,
        true,
        {
          content: '',
          embed: post
        }
      );*/
    }

    // You need to assign sub['subscribe] to a variable otherwise it doesn't work
    const updatedSubscriptions = sub['subscribe'].filter(function(e) {
      return !removableChannels.includes(e);
    });

    sub['subscribe'] = updatedSubscriptions;

    const jsonObj = JSON.stringify(sub, null, 4);
    this.saveJsonFile(`./utils/databases/lfg/subscribe.json`, jsonObj);
  }

  updatePostsDb(json) {
    this.saveJsonFile(`./utils/databases/lfg/lfg.json`, json);
  }

  async run(client, message, args) {
    if (args.length == 0) return message.channel.send(this.usageEmbed());

    // load in the current posts from the json db
    const posts = require('../../utils/databases/lfg/lfg.json');

    const response = this.RichEmbed();

    // Validate the arguments
    let sessionID;
    const platform = args[0].toLowerCase();

    if (['ps4', 'xbox'].includes(platform)) {
      // for console the format is 'xxxx xxxx xxxx'(need to join args)
      sessionID = args.slice(1, 4).join(' ');
      if (
        sessionID.length == 0 ||
        sessionID.length < 14 ||
        sessionID.length > 16
      ) {
        return message.channel.send(this.usageEmbed());
      }
    } else if (platform == 'pc') {
      sessionID = args[1];

      if (
        sessionID == undefined ||
        sessionID.length < 11 ||
        sessionID.length > 13
      ) {
        return message.channel.send(this.usageEmbed());
      }
    } else {
      return message.channel.send(this.usageEmbed());
    }

    // Checks if the sessionID has already been posted
    if (
      Object.keys(posts).includes(sessionID) &&
      posts[sessionID]['userID'] != message.author.id
    ) {
      return message.channel.send(
        'Sorry meowster but someone else has posted that session already!'
      );
    }

    // Checks if the user has already posted or not
    let repost = false;
    for (let post in posts) {
      if (posts[post]['userID'] == message.author.id) {
        repost = post;
        break;
      }
    }

    if (repost) {
      delete posts[repost];

      const jsonObj = JSON.stringify(posts, null, 4);
      this.updatePostsDb(jsonObj);

      message.channel.send(`Meowster, the session \`${repost}\` was replaced!`);
    }

    // Create the new post
    const newPost = {};

    if (args.length > 2) {
      if (['ps4', 'xbox'].includes(platform)) {
        newPost['description'] = args.slice(4, args.length).join(' ');
      } else {
        newPost['description'] = args.slice(2, args.length).join(' ');
      }

      if (newPost['description'].length > 256)
        return message.channel.send(this.usageEmbed());
    } else {
      newPost['description'] = 'No description provided.';
    }

    newPost['userID'] = message.author.id;
    newPost['platform'] = platform;
    newPost['time'] = Date.now();

    // Create embed for SUCCESSFUL requests
    response
      .setColor('#8fde5d')
      .setTitle(`${platform.toUpperCase()} REQUEST SUCCESSFUL`)
      .addField(`**${sessionID}**`, `*${newPost['description']}*`);

    // Finishes up object and pushes it back into the lfg db
    posts[sessionID] = newPost;
    const jsonObj = JSON.stringify(posts, null, 4);

    this.updatePostsDb(jsonObj);
    message.channel.send(response);

    // Sends to all channel that are set to sub board
    this.sendSub(client, sessionID, newPost);
  }
}

module.exports = Post
