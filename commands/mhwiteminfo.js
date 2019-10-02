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

  //console.log(`Someone is looking for item: ${input}`);

  if (!itemList.has(input)) {
    return message.channel.send("That item doesn't seem to exist!");
  }
  else {
    const item = itemList.get(input);

    //console.log(`Fetching item from ${item.url}...`);
    rp(item.url)
      .then(function(html) {
        const imgUrl = $('img.img-fluid', html).attr('src');
        const description = $('div.col-sm-6', html).first().text();

        let rarity = 'n/a', max = 'n/a', buy = 'n/a', sell = 'n/a';
        $('div.balance-table', html).find('td').each(function() {
          const label = $(this).find('div').text().trim();

          if (label === 'Rarity') {
              rarity = $(this).find('strong').text();
          }
          else if (label === 'Max') {
              max = $(this).find('strong').text();
          }
          else if (label === 'Buy') {
              buy = $(this).find('strong').text();
          }
          else if (label === 'Sell') {
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
    })
    .catch(function(err) {
        console.error('An error has occured: ', err);
    });
  }
};

async function fetchItems() {
  const url = 'https://mhworld.kiranico.com/items';
  itemList.clear();
  //console.log(`Fetching items from ${url}...`);

  // eslint-disable-next-line no-unused-vars
  const promise = await rp(url)
    .then(function(html) {
    $('span.d-none.d-xl-inline-block > a', html).each(function() {
        const itemName = $(this).text();
        const itemUrl = $(this).attr('href');

        // Store scraped item in map,
        // using lowercase name as key and item (formatted name + url) as value
        itemList.set(itemName.toLowerCase(), { 'name': itemName, 'url': itemUrl });
      });
    })
    .catch(function(err) {
      console.error('An error has occured: ', err);
    });
  //console.log(`Done fetching items. Count: ${itemList.size}`);
}

// Fetch all items before starting the bot (login)
Promise.all([fetchItems()])
    .then(function() {
        console.log('Logging in...');
}).catch(function(err) {
    console.error('Error fetching the items from the wiki. Items will be unavailable. Starting anyway. ', err);
});