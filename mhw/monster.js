const Discord = require('discord.js');
const monsterDatabase = require('../databases/monsterinfo.json');
const endemicDatabase = require('../databases/endemicinfo.json');
const { similarity } = require('../util.js');

const monsters = new Discord.Collection();
const endemics = new Discord.Collection();

for (const i of Object.keys(monsterDatabase)) {
  monsters.set(monsterDatabase[i].name, monsterDatabase[i].details);
}

for (const i of Object.keys(endemicDatabase)) {
  endemics.set(i, endemicDatabase[i]);
}

module.exports = {
  name: 'monster',
  args: true,
  usage: 'monster <monstername>',
  description: 'Get monster and endemic life info',
  run(client, message, args) {
    let input = args.join('').toLowerCase();

    if (client.useMongoDB) {
      const MongoClient = require('mongodb').MongoClient;
      // Try for only 1 second (user is waiting)
      mongoClient = new MongoClient('mongodb://localhost:27017/catbot_test', { connectTimeoutMS: 1000 });
      mongoClient.connect(function (err) {
        if (!err) {
          const db = mongoClient.db();

          findMonster(db, input, monster => {
            if (!monster) {
              message.channel.send('That monster doesn\'t seem to exist!');
            } else {
              const monsterEmbed = new Discord.RichEmbed()
                .setColor('#8fde5d')
                .setTitle(monster.title)
                .setURL(monster.url)
                .setDescription(monster.description)
                .setThumbnail(monster.thumbnail)
                .addField('Elements', monster.elements, true)
                .addField('Ailments', monster.ailments, true)
                .addField('Blights', monster.blights, true)
                .addField('Locations', monster.locations, true)
                .setTimestamp()
                .setFooter('Info Menu');

              message.channel.send(monsterEmbed);
              console.log(`Fetched ${monster._id} from MongoDB.`);
            }
          });

          mongoClient.close();
        } else {
          // Errored out, try with backup
          // Use backup if connection/retrieval through MongoDB fails
          findMonsterBackup(input, result => message.channel.send(result));
        }
      })
    } else {
      // Use backup if connection/retrieval through MongoDB fails
      findMonsterBackup(input, result => message.channel.send(result));
    }

  }
}

const findMonster = function (db, input, callback) {
  // Get the documents collection
  const collection = db.collection('monsters');

  collection.findOne({ $or: [{ '_id': input }, { aliases: input }] }, function (err, result) {
    if (!err) {
      callback(result);
    } else {
      console.log(`Error fetching item ${input} from MongoDB server`);
    }
  })
}

function findMonsterBackup(input, callback) {
  // If input matches the alias of a monster, change input to that monster name
  for (let [name, monster] of monsters.entries()) {
    if (monster.aliases && monster.aliases.includes(input) && input.length > 0) {
      input = name;
      break;
    }
  }

  if (!monsters.has(input) && !endemics.has(input)) {
    let msg = 'That monster/endemic life doesn\'t seem to exist!';

    const similarItems = new Array();

    for (const key of monsters.keys()) {
      if (similarity(key, input) >= 0.5) {
        similarItems.push(key);
      }
    }

    for (const key of endemics.keys()) {
      if (similarity(key, input) >= 0.5) {
        similarItems.push(key);
      }
    }

    if (similarItems.length) {
      msg += `\nDid you mean: \`${similarItems.join(', ')}\`?`;
    }

    // message.channel.send(msg);
    callback(msg);
  } else if (monsters.has(input)) {
    const monster = monsters.get(input);

    const monsterEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle(monster.title)
      .setURL(monster.url)
      .setDescription(monster.description)
      .setThumbnail(monster.thumbnail)
      .addField('Elements', monster.elements, true)
      .addField('Ailments', monster.ailments, true)
      .addField('Blights', monster.blights, true)
      .addField('Locations', monster.locations, true)
      .setTimestamp()
      .setFooter('Info Menu');

    // message.channel.send(monsterEmbed);
    callback(monsterEmbed);
  } else if (endemics.has(input)) {
    const endemic = endemics.get(input);

    const endemicEmbed = new Discord.RichEmbed()
      .setColor('#8fde5d')
      .setTitle(endemic.title)
      .setURL(endemic.url)
      .setDescription(endemic.description)
      .addField('Description', endemic.quote, true)
      .addField('Locations', endemic.locations)
      .setTimestamp()
      .setFooter('Info Menu');

    //message.channel.send(endemicEmbed);
    callback(endemicEmbed);
  }
}
