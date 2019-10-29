const Discord = require('discord.js');
const fetch = require("node-fetch");
const {Embeds} = require('discord-paginationembed');

module.exports = {
  name: 'events',
  args: false,
  usage: 'events',
  description: 'Get all current events info',
  Chunk(arr, len) {
   let chunks = [], i = 0, n = arr.length;

   while (i < n) {
       chunks.push(arr.slice(i, i += len));
   }

   return chunks;
  },
  async run (client, message, args) {

    // This makes sure that discord-paginationembed can work
    if (!channel.memberPermissions(message.guild.client.user).has("MANAGE_MESSAGES", true)) return message.reply(`Sorry meowster but I can't send messages in ${channel.name}`);``

    let events = []

    // Get all of the info from mhw api and casts it too a json format
    fetch('https://mhw-db.com/events')
    .then(response => response.json())
    .then(ailments => {
        ailments.forEach((event) => {

          events.push(event)

        })

        // Chuncks create a 2D array that lets us control how many events we want on one embed
        let tChunks = this.Chunk(events, 1);
        let embeds = [], tEmbed;

        // Start to use nested arrays to iterate through the 2D chunck array we created
        for (let outer of tChunks) {
            // Start to init the embed we gonna use
            tEmbed = new Discord.RichEmbed();

            tEmbed
                .setTitle("Monster Hunter World Events")
                .setDescription("Shows all the current active mhw events")

            // Setup the rest of the embed here
            for (let inner of outer) {

                // Makes sure that requirements doesnt display as null
                let requirements = 'No hunter rank needed'
                if (inner['requirements'] != null) requirements = inner['requirements']

                tEmbed.addField(
                  inner['name'],
                  `\`\`\`\n`
                  + `🌎 Location: ${inner['location']['name']}\n`
                  + `❓ Type: ${inner['type']}\n`
                  + `📗 Requirements: ${requirements}\n`
                  + `🕹️ Platform: ${inner['platform']}\n`
                  + `📘 Success Condition: ${inner['successConditions']}\n`
                  + `📕 Description: ${inner['description']}\n`
                  + `\`\`\``
                );
            }
          // Adds to a 1D normal array of embeds for discord-paginationembed to iterate though
          embeds.push(tEmbed)
    }

    // Setup multpage embed with discord-paginationembed
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
  });
  }
}
