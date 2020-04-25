const Command = require('../../utils/baseCommand.js');
const logger = require('../../utils/log.js');

class Post extends Command {
  constructor(prefix) {
    super(
      'post',
      'post [platform] [session id] (description)',
      'Posts an active session to CatBots LFG command. Sessions expire after 2 hours.'
    );
  }

  usageEmbed(error = '') {
    const data = [];
    data.push('platform: PC, PS4, or XBOX\n');
    data.push(
      'session id:\n - Must be between 11 and 13 characters long for PC\n - `xxxx-xxxx-xxxx` or `xxxx xxxx xxxx` for PS4/XBOX\n'
    );
    data.push('description: Describe what you plan to do in the session\n');
    const embed = this.MessageEmbed().setColor('#8fde5d');

    if (error) {
      embed.addField('An error has occurred!', error);
    }

    embed
      .addField('Usage', this.usage)
      .addField('Parameters Help', data.join('\n'))
      .addField(
        'Examples',
        `${this.prefix}lfg post pc u7Mpp4F8Z$Wh This is a test description\n${this.prefix}lfg post xbox 4ZjN zKwZ TCdX This is a test description`
      )
      .setTimestamp();

    return embed;
  }

  async sendSub(client, sessionID, content) {
    const sub = require('../../utils/databases/lfg/subscribe.json');

    let tEmbed = this.MessageEmbed();

    tEmbed
      .setTitle('Session List')
      .setDescription('Find other players to hunt with!')
      .setColor('#8fde5d');

    tEmbed.addField(
      '\u200B',
      '```\n' +
        `🔖 Session ID: ${sessionID}\n` +
        `🕹️ Platform: ${content['platform']}\n` +
        `📝 Description: ${content['description']}\n` +
        '```'
    );

    let removableChannels = [];
    for (const channelID of sub['subscribe']) {
      // you need to await as client.shard.broadcastEval is automaticly async function?
      await client.shard
        .broadcastEval(
          `
        let channel = this.channels.cache.get('${channelID}');

        if (channel != null) {
          channel.send( {embed : ${JSON.stringify(tEmbed.toJSON())}} )
          true
        } else {
          false
        }
      `
        )
        .then(results => {
          // if all the shards counldnt find the channel add it too the removableChannels list
          if (results.every(result => result == false))
            removableChannels.push(channelID);
        })
        .catch(err =>
          logger.error(err, {
            where: 'post.js 78 (client.shard.broadcastEval)'
          })
        );
    }

    // filter out removable channels
    sub['subscribe'] = sub['subscribe'].filter(function(e) {
      return !removableChannels.includes(e);
    });

    const jsonObj = JSON.stringify(sub, null, 4);
    this.saveJsonFile(`./utils/databases/lfg/subscribe.json`, jsonObj);
  }

  updatePostsDb(json) {
    this.saveJsonFile(`./utils/databases/lfg/lfg.json`, json);
  }

  async run(client, message, args) {
    // Validate the arguments
    if (args.length < 2)
      return message.channel.send(this.usageEmbed('Session ID is required'));

    let sessionID, description;
    const platform = args[0].toLowerCase();

    if (!['pc', 'ps4', 'xbox'].includes(platform)) {
      return message.channel.send(
        this.usageEmbed(`${platform} is not a valid platform.`)
      );
    }

    if (platform === 'pc') {
      sessionID = args[1];

      if (
        sessionID == undefined ||
        sessionID.length < 11 ||
        sessionID.length > 13
      ) {
        return message.channel.send(
          this.usageEmbed(
            `PC session ids must be between 11 and 13 characters long.\n\`${sessionID}\` is ${sessionID.length} characters long.`
          )
        );
      }

      // if args.length <= 2, desc will just be empty
      description = args.slice(2, args.length).join(' ');
    }

    if (['ps4', 'xbox'].includes(platform)) {
      if (args[1].includes('-')) {
        // has dashes, can assume its the whole sessionID
        sessionID = args[1];
        description = args.slice(2, args.length).join(' ');
      } else {
        // no dashes, assume its spaces, grab next 3 (we check for length later)
        sessionID = args.slice(1, 4).join(' ');
        description = args.slice(4, args.length).join(' ');
      }

      if (!sessionID || sessionID.length !== 14) {
        return message.channel.send(
          this.usageEmbed(
            `XBOX/PS4 session ids must be in the format of \`xxxx xxxx xxxx\` or \`xxxx-xxxx-xxxx\`.`
          )
        );
      }
    }

    if (!description) {
      description = 'No description provided.';
    }

    if (description.length > 256) {
      return message.channel.send(
        this.usageEmbed('Description is larger than 256 characters.')
      );
    }

    // load in the current posts from the json db
    const posts = require('../../utils/databases/lfg/lfg.json');

    const response = this.MessageEmbed();

    // Checks if the sessionID has already been posted
    if (
      Object.keys(posts).includes(sessionID) &&
      posts[sessionID]['userID'] != message.author.id
    ) {
      return message.channel.send(
        'Sorry meowster but someone else has posted that session already!'
      );
    }

    // Create the new post
    const newPost = {
      description: description
    };

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

    // Sends to all channels that are subscribed to lfg posts
    await this.sendSub(client, sessionID, newPost);
  }
}

module.exports = Post
