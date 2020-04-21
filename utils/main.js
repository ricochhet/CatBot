const Bot = require('./bot.js');
const monsterDatabase = require('./databases/mhw/monsters.json');
const fs = require('fs');
const logger = require('./log.js');
var pjson = require('../package.json');

client = new Bot('+');
client.version = pjson.version;

// load commands
client.buildCommands(__dirname.replace('utils', 'commands'), {
  main: 'commands'
});

// client.buildCommands([
//   ['commands', './commands/main/'],
//   './commands/lfg/',
//   './commands/math/',
//   './commands/mhgu/',
//   './commands/mhw/'
// ]);

// load Bot databases
client.buildDBs({
  weapons: './databases/mhw/weapons.json',
  skills: './databases/mhw/skills.json',
  items: './databases/mhw/items.json',
  decorations: './databases/mhw/decorations.json',
  armors: './databases/mhw/armors.json',
  mhguMonsters: './databases/mhgu/monsters.json',
  mhguWeapons: './databases/mhgu/weapons.json',
  config: './config.json'
});

// mhw monster collection has a custom collection algorithm
client.monsters = client.buildCollection();
for (const i of Object.keys(monsterDatabase)) {
  client.monsters.set(monsterDatabase[i].name, monsterDatabase[i].details);
}

// Check every minute and delete lfg sessions older than 2 hours
client.setInterval(() => {
  const lfg = require('./databases/lfg/lfg.json');
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
        logger.error(
          'An error occured while writing JSON Object to File.',
          err
        );
      }
    });
  }
}, 60000);

client.login(client.config.get('TOKEN'));
