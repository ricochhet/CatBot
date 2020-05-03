const Bot = require('./bot.js');
const fs = require('fs');
const pjson = require('../package.json');
const db = require('./libraries/client');
const config = require('../config.json');

client = new Bot(config['base']['bot_prefix']);
client.version = pjson.version;
client.config = config;

client.server_conf = {
  server_clientid: config['server']['client_id'],
  server_url: config['server']['url_base'],
  server_key: config['api_keys']['catbotserver_key'],
  server_port: config['server']['port'],
  server_hostname: config['server']['hostname'],
  server_apipath: config['server']['api_path']
};

const dbOptions = {
  url: client.server_conf.server_url,
  key: client.server_conf.server_key
};

db.config(dbOptions);

// load commands
client.buildCommands(__dirname.replace('utils', 'commands'), {
  main: 'commands'
});

function requestDatabase() {
  db.get(
    `${client.server_conf.server_url}catfacts?key=${client.server_conf.server_key}`
  ).then(function(data) {
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

// Check every minute and delete lfg sessions older than 2 hours
client.setInterval(() => {
  db.get(
    `${client.server_conf.server_url}database/${client.server_conf.server_clientid}/lfg/posts?key=${client.server_conf.server_key}`
  ).then(function(data) {
    const lfg = JSON.parse(data);
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
          hostname: client.server_conf.server_hostname,
          port: client.server_conf.server_port,
          path: `${client.server_conf.server_apipath}database/${client.server_conf.server_clientid}/lfg/posts?key=${client.server_conf.server_key}`,
          method: 'POST'
        }
      );
    }
  });
}, 60000);

requestDatabase();

if (client.config['base']['dev_mode'] == true) {
  client.login(client.config['base']['token_dev']);
} else {
  client.login(client.config['base']['token_main']);
}

setInterval(function() {
  requestDatabase();
}, 600000);
