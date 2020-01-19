module.exports = {
  // adapted from https://github.com/saanuregh/discord.js-pagination/blob/master/index.js 
  paginationEmbed: async function(msg, pages, emojiList = ['⏪', '⏩'], timeout = 120000) {
    if (!msg && !msg.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');
    if (emojiList.length !== 2) throw new Error('Need two emojis.');
    let page = 0;
    const curPage = await msg.channel.send(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
    for (const emoji of emojiList) await curPage.react(emoji);
    const reactionCollector = curPage.createReactionCollector(
      (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
      { time: timeout }
    );
    reactionCollector.on('collect', reaction => {      
      switch (reaction.emoji.name) {
        case emojiList[0]:
          page = page > 0 ? --page : pages.length - 1;
          break;
        case emojiList[1]:
          page = page + 1 < pages.length ? ++page : 0;
          break;
        default:
          break;
      }
      curPage.edit(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`, msg.client.user.avatarURL));
    });
    reactionCollector.on('end', () => curPage.reactions.clear());
    return curPage;
  },

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
};

// Computes Levenshtein distance between two strings
function editDistance(str1, str2) {
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