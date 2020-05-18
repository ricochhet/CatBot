const Command = require('../../utils/command.js');
const logger = require('../../utils/log.js');

class Post extends Command {
  constructor() {
    super(
      'post',
      'post [platform] [session id] (description)',
      'Posts an active session to CatBots LFG command. Sessions expire after 2 hours.'
    );
  }

  usageEmbed(prefix, error = '') {
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
        `${prefix}lfg post pc u7Mpp4F8Z$Wh This is a test description\n${prefix}lfg post xbox 4ZjN zKwZ TCdX This is a test description`
      )
      .setTimestamp();

    return embed;
  }

  async sendSub(client, sessionID, content) {
    client.apiClient
      .getLfgSubs()
      .then(sub => {
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
          client.shard
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

        client.apiClient.updateLfgSubs(sub);
      })
      .catch(err => {
        logger.error(err);
        message.channel.send(this.serverErrorEmbed());
      });
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

    client.apiClient
      .getLfgPosts()
      .then(posts => {
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

          client.apiClient.updateLfgPosts(posts);

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

        client.apiClient.updateLfgPosts(posts);
        message.channel.send(response);

        // Sends to all channel that are set to sub board
        this.sendSub(client, sessionID, newPost);
      })
      .catch(err => {
        logger.error(err);
        message.channel.send(this.serverErrorEmbed());
      });
  }
}

module.exports = Post
