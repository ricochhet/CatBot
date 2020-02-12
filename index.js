const Bot = require('./bot.js');
const monsterDatabase = require('./utils/databases/mhw/monsters.json');
const fs = require('fs');

client = new Bot('+');

// load commands
client.buildCommands([
  ['commands', './commands/main/'],
  './commands/lfg/',
  './commands/math/',
  './commands/mhgu/',
  './commands/mhw/'
]);

// load Bot databases
client.buildDBs({
  weapons: './utils/databases/mhw/weapons.json',
  skills: './utils/databases/mhw/skills.json',
  items: './utils/databases/mhw/items.json',
  decorations: './utils/databases/mhw/decorations.json',
  armors: './utils/databases/mhw/armors.json',
  mhguMonsters: './utils/databases/mhgu/monsters.json',
  mhguWeapons: './utils/databases/mhgu/weapons.json',
  config: './utils/config.json'
});

const dbl = client.dblSetup(client.config.get('DBLTOKEN'));

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
    fs.writeFile(`utils/databases/lfg/lfg.json`, jsonObj, 'utf8', function(
      err
    ) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
      }
    });
  }
}, 60000);

client.setInterval(() => {
  dbl.postStats(client.guilds.size);
}, 1800000);

client.login(client.config.get('TOKEN'));
