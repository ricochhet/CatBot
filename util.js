// Grouping here utility functions that may be used by multiple commands

const rp = require('request-promise');
const request = require('request');
const $ = require('cheerio');
const { RichEmbed } = require('discord.js');

module.exports = {
    // Scrapes kiranico, retrieves the item list (name + URLs), stores it in the given collection
    fetchItems: async function(itemList) {
        const url = 'https://mhworld.kiranico.com/items';

        itemList.clear();
        console.log(`Fetching items from ${url}...`);

        // eslint-disable-next-line no-unused-vars
        const promise = await rp(url)
            .then(function(html) {
                $('span.d-none.d-xl-inline-block > a', html).each(function() {
                    const itemName = $(this).text();
                    const itemUrl = $(this).attr('href');

                    // Store scraped item in collection,
                    // using lowercase name as key and item:(formatted name + url) as value
                    itemList.set(itemName.toLowerCase(), { 'name': itemName, 'url': itemUrl });
                });
            })
            .catch(function(err) {
                console.error('Error fetching the item list. ', err);
            });
        console.log(`Done fetching items. Count: ${itemList.size}`);
    },

    // Scrapes given item URL, retrieves item and returns callback(embed)
    fetchItem: function(item, callback) {
        console.log(`Fetching item from ${item.url}...`);

        request(item.url, function(err, res, html) {
            if (err || res.statusCode != 200) {
                console.error('Error retrieving item. ', err);            
                return; 
            }

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

            const itemEmbed = new RichEmbed()
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

            return callback(itemEmbed);

        });
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
        ['h', 5.2], ['gs', 4.8], ['hh', 4.2], ['cb', 3.6],
        ['sa', 3.5], ['ls', 3.3], ['ig', 3.1], ['l', 2.3],
        ['gl', 2.3], ['hbg', 1.5], ['sns', 1.4], ['db', 1.4],
        ['lbg', 1.3], ['bow', 1.2]
      ]),
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