const { RichEmbed } = require('discord.js');

module.exports = {
    // Compares two strings and return their similarity percentage (0-1)
    similarity: function(str1, str2) {
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
    },

    // Weapons multiplier
    weaponsRatio: new Map([
      ['hammer', 5.2], ['gs', 4.8], ['hh', 4.2], ['cb', 3.6],
      ['sa', 3.5], ['ls', 3.3], ['ig', 3.1], ['lance', 2.3],
      ['gl', 2.3], ['hbg', 1.5], ['sns', 1.4], ['db', 1.4],
      ['lbg', 1.3], ['bow', 1.2]
    ]),

    rawSharpRatio: new Map([
      ['red', 0.5], ['orange', 0.75], ['yellow', 1.00], ['green', 1.05],
      ['blue', 1.20], ['white', 1.32], ['purple', 1.39], ['none', 1.00]
    ]),

    elemSharpRatio: new Map([
      ['red', 0.5], ['orange', 0.75], ['yellow', 1.00], ['green', 1.05],
      ['blue', 1.20], ['white', 1.32], ['purple', 1.39], ['none', 1.00]
    ]),

  reactions(message,similarArray,embedTemplate){

    const author = message.author.id

    similarArray.sort( function(a,b){
      return b[1] - a[1]
    } )

    msg = new RichEmbed()
    .setColor( '#8fde5d' )
    .setAuthor( "Did you mean?" )


    var counter = 0
    for (item of similarArray){

      if (counter >= 8) { break }

      msg.addField(`${counter + 1} : ${item[0]}`, "\n\u200B")

      counter++

    }

    message.channel.send( msg ).then( async (message) => {

      emojis = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣'].slice(0,counter)

      for (emoji of emojis){

        await message.react(emoji)

      }

      const filter = (reaction, user) => {
        return emojis.includes(reaction.emoji.name) && user.id === author;
      };

      message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(async (collected) => {
          const reaction = collected.first();

          name = similarArray[ emojis.indexOf( reaction.emoji.name )][0].split(' ').join('').toLowerCase()

          const embed = embedTemplate( name )
          await message.clearReactions()
          message.edit(embed)

      })
      .catch(async (collected) => {
          console.log(collected);
          await message.clearReactions()
          await message.react('❌')
      });

    } );

  }
};

// Computes Levenshtein distance between two strings
function editDistance (str1, str2) {
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
