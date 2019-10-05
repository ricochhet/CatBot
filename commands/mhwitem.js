const Discord = require('discord.js');
const rp = require('request-promise');
const $ = require('cheerio');

const itemList = new Map();


exports.run = (client, message, args) => {
const usageEmbed = new Discord.RichEmbed()
.setColor('#8fde5d')
.addField('Usage: ', "```+mhwiteminfo itemname```", true)
.setTimestamp()
.setFooter('List Menu');

if(!args.length) return message.channel.send(usageEmbed);
  const input = args.join(' ').toLowerCase();

  if (!itemList.has(input)) {

    let msg = 'That item doesn\'t seem to exist!';

    const similar = new Array();
    for (const key of itemList.keys()) {
        if (similarity(key, input) >= 0.5) {
            similar.push(key);
        }
    }

    if (similar.length) {
        msg += `\nDid you mean: \`${similar.join(', ')}\`?`;
    }
    return message.channel.send(msg);
  }
  else {
    const item = itemList.get(input);

    rp(item.url)
      .then(function(html) {
        const imgUrl = $('img.img-fluid', html).attr('src');
        const description = $('div.col-sm-6', html).first().text();

        let rarity = 'n/a', max = 'n/a', buy = 'n/a', sell = 'n/a';
        $('div.balance-table', html).find('td').each(function() {
          const label = $(this).find('div').text().trim();

          if (label === 'Rarity') {
              rarity = $(this).find('strong').text();
          } else if (label === 'Max') {
              max = $(this).find('strong').text();
          } else if (label === 'Buy') {
              buy = $(this).find('strong').text();
          } else if (label === 'Sell') {
              sell = $(this).find('strong').text();
          }
        });

        const itemEmbed = new Discord.RichEmbed()
        .setColor('#8fde5d')
        .setTitle(item.name)
        .setThumbnail(imgUrl)
        .setURL(item.url)
        .setDescription(description)
        .addField('Rarity', rarity, true)
        .addField('Max', max, true)
        .addField('Buy', buy, true)
        .addField('Sell', sell, true)
        .setTimestamp()
        .setFooter('Items');

        message.channel.send(itemEmbed);
    }).catch(function(err) {
        console.error('An error has occured: ', err);
    });
  }
};

async function fetchItems() {
  const url = 'https://mhworld.kiranico.com/items';
  itemList.clear();
  
  const promise = await rp(url)
    .then(function(html) {
    $('span.d-none.d-xl-inline-block > a', html).each(function() {
        const itemName = $(this).text();
        const itemUrl = $(this).attr('href');

        itemList.set(itemName.toLowerCase(), { 'name': itemName, 'url': itemUrl });
      });
    })
    .catch(function(err) {
      console.error('An error has occured: ', err);
    });
}

function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) {
                costs[j] = j;
            }
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue),
                    costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) {
            costs[s2.length] = lastValue;
        }

    }
    return costs[s2.length];
}

Promise.all([fetchItems()])
    .then(function() {
        console.log('Successfully fetched items!');
}).catch(function(err) {
    console.error('Error fetching items, ', err);
});