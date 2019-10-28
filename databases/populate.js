// Populates the MongoDB with data from the different json files

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const monsterDatabase = require('../databases/monsterinfo.json');
const endemicDatabase = require('../databases/endemicinfo.json');
const itemDatabase = require('../databases/iteminfo.json');

/* Connection URL (default localhost). If mongo server wasn't  running locally, would be better to add 
 the connection string to config.json (with bot token and other stuff) and read from that here
*/
const url = 'mongodb://localhost:27017/catbot_test';

const client = new MongoClient(url, {useUnifiedTopology: true});

client.connect(async function (err) {
    assert.strictEqual(null, err, `Failed connecting to mongo server. Make sure it\'s running at ${url}`);

    console.log("Connected successfully to server.");

    const db = client.db();

    // Reset database (Delete all items from the collections and recreate them)
    await db.collection('monsters').deleteMany({});
    await db.collection('endemic').deleteMany({});
    await db.collection('items').deleteMany({});
    await db.createCollection('monsters');
    await db.createCollection('endemic');
    await db.createCollection('items');

    // Populate monsters
    let count = 0;
    let collectionName = 'monsters';    
    let collection = db.collection(collectionName);
    for (const i of Object.keys(monsterDatabase)) {
        const entry = monsterDatabase[i];
        
        collection.insertOne(
            {
                _id: entry.name,
                aliases: entry.details.aliases,
                title: entry.details.title,
                url: entry.details.url,
                description: entry.details.description,
                thumbnail: entry.details.thumbnail,
                elements: entry.details.elements,
                ailments: entry.details.ailments,
                blights: entry.details.blights,
                locations: entry.details.locations
            }, function (err, result) {
                assert.strictEqual(err, null, `Failed inserting monster ${entry.name}: ${err}`);                
            });
        count = count + 1;
    }
    console.log(`Added/Updated ${count} items to the ${collectionName} collection.`);    

    // Populate endemic
    count = 0;
    collectionName = 'endemic';
    collection = db.collection(collectionName);
    for (const i of Object.keys(endemicDatabase)) {
        const entry = endemicDatabase[i];
        
        collection.insertOne(
            {
                _id: entry,                
                title: entry.title,
                url: entry.url,
                description: entry.description,
                quote: entry.quote,
                locations: entry.locations
            }, function (err, result) {
                assert.strictEqual(err, null, `Failed inserting endemic ${entry}`);        
            });
        count = count + 1;
    }
    console.log(`Added/Updated ${count} items to the ${collectionName} collection.`);

    // Populate items
    count = 0;
    collectionName = 'items';
    collection = db.collection(collectionName)
    for (const i of Object.keys(itemDatabase)) {
        const entry = itemDatabase[i];

        collection.insertOne(            
            {
                _id: entry,
                title: entry.title,
                url: entry.url,
                description: entry.description,
                thumbnail: entry.thumbnail,
                rarity: entry.rarity,
                max: entry.max,
                buy: entry.buy,
                sell: entry.sell
            }, function (err, result) {
                assert.strictEqual(err, null, `Failed inserting item ${entry}`);                
            });
        count = count + 1;
    }
    console.log(`Added/Updated ${count} items to the ${collectionName} collection.`);

    client.close();
})