const { RichEmbed } = require('discord.js');

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

// Compares two strings and return their similarity percentage (0-1)
function similarity(str1, str2) {
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

module.exports = {

    // until instance varible can be used and not to break mhgu branch ill leave two similarity function in this file (hopefully can remove when fixed) - Yofou
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

    // save the message author for later so we can use to listen for there reaction input
    const author = message.author.id

    // sort array from highest to lowest similarity value
    similarArray.sort( function(a,b){
      return b[1] - a[1]
    } )

    // start to did you mean create embed
    msg = new RichEmbed()
    .setColor( '#8fde5d' )
    .setAuthor( "Did you mean?" )


    // counts the amount of entitys in embed for later use
    var counter = 0
    for (item of similarArray){

      if (counter >= 8) { break }

      msg.addField(`${counter + 1} : ${item[0]}`, "\n\u200B")
      counter++

    }

    message.channel.send( msg ).then( async (message) => {


      // limit the reaction emojis to the number of entitys on embed
      emojis = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣'].slice(0,counter)

      for (emoji of emojis){

        await message.react(emoji)

      }

      // create a filter so it only listen to number emojis and message author
      const filter = (reaction, user) => {
        return emojis.includes(reaction.emoji.name) && user.id === author;
      };


      // create reaction collection listener
      message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(async (collected) => {

          const reaction = collected.first();

          // if reacted grab selected entity and convert it to key format
          name = similarArray[ emojis.indexOf( reaction.emoji.name )][0].split(' ').join('').toLowerCase()

          // then pass through the Embed Template and clear all reaction
          const embed = embedTemplate( name )
          await message.clearReactions()
          message.edit(embed)

      })
      .catch(async (collected) => {
          // grabs all unknown errors also occures when user doesnt react with anything for over set time
          await message.clearReactions()
          await message.react('❌')
      });

    } );

  },

    getSimlarArray(collection,options){

      let simlarArray;

      if ('similarArray' in options) {simlarArray = options['similarArray']}
      else {simlarArray = new Array()};

      for (let [key, value] of collection.entries()) {
        sim = similarity(key, options['input'])
        if (sim >= options['threshold']) {
          if (options['pushSim']) {
            if (options['key']){
              simlarArray.push([value[options['key']],sim])
            } else{
              simlarArray.push([value[key],sim])
            }

          } else {
            if (options['key']){
              simlarArray.push(value[options['key']])
            } else{
              simlarArray.push(value[key])
            }
          };
        }
      }


      return simlarArray
    }

};
