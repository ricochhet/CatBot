const Discord = require('discord.js');
//const rp = require('request-promise');
//const $ = require('cheerio');
const { fetchItem, fetchItems, similarity } = require('../util.js');

const itemList = new Discord.Collection();

module.exports = {
    name: 'mhwitem',
    args: true,
    usage: 'mhwitem <itemname>',
    description: 'Get item info',
    run (client, message, args) {
        const input = args.join(' ').toLowerCase();

        if (!itemList.has(input)) {
            let msg = 'That item doesn\'t seem to exist!';

            const similarItems = new Array();
            
            for (const key of itemList.keys()) {
                if (similarity(key, input) >= 0.5){
                    similarItems.push(key);
                }
            }

            if (similarItems.length) {
                msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
            }
            return message.channel.send(msg);
        }
        else {
            const item = itemList.get(input);

            fetchItem(item, function(embed) {
                message.channel.send(embed);
            });
        }
    }
}

Promise.all([fetchItems(itemList)])
    .then(function() {
        console.log('Successfully fetched items!');
}).catch(function(err) {
    console.error('Error fetching items, ', err);
});