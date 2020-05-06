const Command = require('../../utils/command.js');
const db = require('../../utils/libraries/client');
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
    db.get(
      `${client.server_conf.server_url}database/${client.server_conf.server_clientid}/lfg/subscribe?key=${client.server_conf.server_key}`
    ).then(async data => {
      if (!data) {
        console.log(
          `Failed to request data @ ${client.server_conf.server_url}database/${client.server_conf.server_clientid}/lfg/subscribe?key=${client.server_conf.server_key}`
        );
        return message.channel.send(this.serverErrorEmbed());
      }

      let sub = JSON.parse(data);

      let desc;
      if (!content['description']) {
        desc = 'No description provided.';
      } else {
        desc = content['description'];
      }

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
          `📝 Description: ${desc}\n` +
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
          .catch(err => logger.error(err, { where: 'feedback.js 77' }));
      }

      // You need to assign sub['subscribe] to a variable otherwise it doesn't work
      sub['subscribe'] = sub['subscribe'].filter(function(e) {
        return !removableChannels.includes(e);
      });

      db.request(
        { message: sub },
        {
          hostname: client.server_conf.server_hostname,
          port: client.server_conf.server_port,
          path: `${client.server_conf.server_apipath}database/${client.server_conf.server_clientid}/lfg/susbcribe?key=${client.server_conf.server_key}`,
          method: 'POST'
        }
      );
    });
  }

  updatePostsDb(json) {
    db.request(
      { message: json },
      {
        hostname: client.server_conf.server_hostname,
        port: client.server_conf.server_port,
        path: `${client.server_conf.server_apipath}database/${client.server_conf.server_clientid}/lfg/posts?key=${client.server_conf.server_key}`,
        method: 'POST'
      }
    );
  }

  async run(client, message, args) {
    // Validate the arguments
    if (args.length < 2)
      return message.channel.send(this.usageEmbed('Session ID is required'));

    let sessionID, description;
    const platform = args[0].toLowerCase();

    if (!['pc', 'ps4', 'xbox'].includes(platform)) {
      return message.channel.send(
        this.usageEmbed(`${platform} is not valid platform.`)
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
            `PC session ids must be between 11 and 13 characters long \`${sessionID}\` is ${sessionID.length} characters long.`
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
            //`XBOX/PS4 session ids need to be between 14 and 16 characters long \`${sessionID}\` is ${sessionID.length} characters long.`
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

    db.get(
      'http:localhost:8080/api/database/573958899582107653/lfg/posts?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
    ).then(async data => {
      // load in the current posts from the json db
      const posts = JSON.parse(data);
      //const posts = require('../../utils/databases/lfg/lfg.json');
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

        this.updatePostsDb(posts);

        message.channel.send(
          `Meowster, the session \`${repost}\` was replaced!`
        );
      }

      newPost['userID'] = message.author.id;
      newPost['platform'] = platform;
      newPost['time'] = Date.now();

      if (newPost['description'].length == 0)
        newPost['description'] = 'No description provided.';

      // Create embed for SUCCESSFUL requests
      response
        .setColor('#8fde5d')
        .setTitle(`${platform.toUpperCase()} REQUEST SUCCESSFUL`)
        .addField(`**${sessionID}**`, `*${newPost['description']}*`);

      // Finishes up object and pushes it back into the lfg db
      posts[sessionID] = newPost;

      this.updatePostsDb(posts);
      message.channel.send(response);

      // Sends to all channel that are set to sub board
      await this.sendSub(client, sessionID, newPost);
    });
  }
}

module.exports = Post
