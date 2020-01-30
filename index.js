const Bot = require( './bot.js' );
const weaponDatabase = require('./utils/databases/mhw/weapons.json');
const skillDatabase = require('./utils/databases/mhw/skills.json');
const itemDatabase = require('./utils/databases/mhw/items.json');
const decorationDatabase = require('./utils/databases/mhw/decorations.json');
const armorDatabase = require('./utils/databases/mhw/armors.json');
const monsterDatabase = require('./utils/databases/mhw/monsters.json');
const monsterGUDatabase = require('./utils/databases/mhgu/monsters.json');
const weaponGuDatabase = require('./utils/databases/mhgu/weapons.json');

client = new Bot('+')

client.commands = client.buildCollection();
client.mhw = client.buildCollection();
client.mhgu = client.buildCollection();
client.math = client.buildCollection();
client.lfg = client.buildCollection();

// load commands
client.buildCommands()

// load MHW DB's
client.weapons = client.buildCollection();
client.buildDB(client.weapons,weaponDatabase)
client.skills = client.buildCollection();
client.buildDB(client.skills,skillDatabase)
client.items = client.buildCollection();
client.buildDB(client.items,itemDatabase)
client.decorations = client.buildCollection();
client.buildDB(client.decorations,decorationDatabase)
client.armors = client.buildCollection();
client.buildDB(client.armors,armorDatabase)

// load MHGU DB's
client.mhguMonsters = client.buildCollection();
client.buildDB(client.mhguMonsters,monsterGUDatabase)
client.mhguWeapons = client.buildCollection();
client.buildDB(client.mhguWeapons,weaponGuDatabase)


// mhw monster collection has a custom collection algorithm
client.monsters = client.buildCollection();

for (const i of Object.keys(monsterDatabase)) {
  client.monsters.set(monsterDatabase[i].name, monsterDatabase[i].details);
}

// Check every minute and delete lfg sessions older than 2 hours
client.setInterval(() => {
  const lfg = require('./utils/databases/lfg/lfg.json');
  let rewrite = false;

  for (const sessionID in lfg) {
    const duration = Date.now() - lfg[sessionID]['time'];

    if (duration >= 7200000) {
      delete lfg[sessionID];
      rewrite = true;
    }
  }

  if (rewrite) {
    const jsonObj = JSON.stringify(lfg, null, 4);
    fs.writeFile(`utils/databases/lfg/lfg.json`, jsonObj, 'utf8', function(err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
    });
  }
}, 60000);


client.login( "NjM1OTg4MDUyMDQ0Njc3MTYw.XiY-sQ.oakUDyVWfYStI6zzE9ScnYShA9E" )
