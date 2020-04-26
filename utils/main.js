const Bot = require('./bot.js');
const fs = require('fs');
const logger = require('./log.js');
const pjson = require('../package.json');

const db = require('./libraries/utils/client');
const dbOptions = {
  url: 'http://localhost:8080/api/',
  key: '5e97fa61-c93d-46dd-9f71-826a5caf0984'
};

db.config(dbOptions);

client = new Bot('+');
client.version = pjson.version;

// load commands
client.buildCommands(__dirname.replace('utils', 'commands'), {
  main: 'commands'
});

function requestDatabase() {
  db.get(`${dbOptions.url}catfacts?key=${dbOptions.key}`).then(function(data) {
    client.catfacts = data;
  });

  db.get(db.query('mhw', 'weapons')).then(function(data) {
    const output = db.parsers.mhw.parse_as_weapons(data);
    client.weapons = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.weapons.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'skills')).then(function(data) {
    const output = db.parsers.mhw.parse_as_skills(data);
    client.skills = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.skills.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'items')).then(function(data) {
    const map = db.to_map(data, {
      raw: true
    }).map;

    client.items = client.buildCollection();

    for (const [k, v] of map) {
      client.items.set(k, v);
    }
  });

  db.get(db.query('mhw', 'decorations')).then(function(data) {
    const output = db.parsers.mhw.parse_as_decorations(data);
    client.decorations = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.decorations.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'armors')).then(function(data) {
    const output = db.parsers.mhw.parse_as_armors(data);
    client.armors = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.armors.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'monsters')).then(function(data) {
    const map = db.to_map(data, {
      raw: true
    }).map;

    client.monsters = client.buildCollection();

    for (const [k, v] of map) {
      client.monsters.set(v.name, v.details);
    }
  });

  db.get(db.query('mhgu', 'monsters')).then(function(data) {
    const map = db.to_map(data, {
      raw: true
    }).map;

    client.mhguMonsters = client.buildCollection();

    for (const [k, v] of map) {
      client.mhguMonsters.set(k, v);
    }
  });

  db.get(db.query('mhgu', 'weapons')).then(function(data) {
    const map = db.to_map(data, {
      raw: true
    }).map;

    client.mhguWeapons = client.buildCollection();

    for (const [k, v] of map) {
      client.mhguWeapons.set(k, v);
    }
  });
}

// load Bot databases
client.buildDBs({
  config: './config.json'
});

// Check every minute and delete lfg sessions older than 2 hours
client.setInterval(() => {
  db.get(
    'http:localhost:8080/api/database/573958899582107653/lfg/posts?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
  ).then(function(data) {
    const lfg = JSON.parse(data);
    // const lfg = require('./databases/lfg/lfg.json');
    let rewrite = false;

    for (const sessionID in lfg) {
      const duration = Date.now() - lfg[sessionID]['time'];

      if (duration >= 7200000) {
        delete lfg[sessionID];
        rewrite = true;
      }
    }

    if (rewrite) {
      db.request(
        { message: lfg },
        {
          hostname: 'localhost',
          port: 8080,
          path:
            '/api/database/573958899582107653/lfg/posts?key=5e97fa61-c93d-46dd-9f71-826a5caf0984',
          method: 'POST'
        }
      );

      /*const jsonObj = JSON.stringify(lfg, null, 4);
      fs.writeFile(`utils/databases/lfg/lfg.json`, jsonObj, 'utf8', function(
        err
      ) {
        if (err) {
          logger.error(
            'An error occured while writing JSON Object to File.',
            err
          );
        }
      });*/
    }
  });
}, 60000);

requestDatabase();

client.login(client.config.get('TOKEN'));

setInterval(function() {
  requestDatabase();
}, 600000);
