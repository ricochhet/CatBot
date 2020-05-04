const Bot = require('./bot.js');
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
    if (!data) {
      client.catfacts = null;

      return console.log(
        `Failed to request data @ ${client.server_conf.server_url}catfacts?key=${client.server_conf.server_key}`
      );
    }

    client.catfacts = data;
  });

  db.get(db.query('mhw', 'weapons')).then(function(data) {
    if (!data) {
      client.mhwWeapons = null;

      return console.log(
        `Failed to request data @ ${db.query('mhw', 'weapons')}`
      );
    }

    const output = db.parsers.mhw.parse_as_weapons(data);
    client.mhwWeapons = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.mhwWeapons.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'skills')).then(function(data) {
    if (!data) {
      client.mhwSkills = null;

      return console.log(
        `Failed to request data @ ${db.query('mhw', 'skills')}`
      );
    }

    const output = db.parsers.mhw.parse_as_skills(data);
    client.mhwSkills = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.mhwSkills.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'items')).then(function(data) {
    if (!data) {
      client.mhwItems = null;

      return console.log(
        `Failed to request data @ ${db.query('mhw', 'items')}`
      );
    }

    const map = db.to_map(data, {
      raw: true
    }).map;

    client.mhwItems = client.buildCollection();

    for (const [k, v] of map) {
      client.mhwItems.set(k, v);
    }
  });

  db.get(db.query('mhw', 'decorations')).then(function(data) {
    if (!data) {
      client.mhwDecorations = null;

      return console.log(
        `Failed to request data @ ${db.query('mhw', 'decorations')}`
      );
    }

    const output = db.parsers.mhw.parse_as_decorations(data);
    client.mhwDecorations = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.mhwDecorations.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'armors')).then(function(data) {
    if (!data) {
      client.mhwArmors = null;

      return console.log(
        `Failed to request data @ ${db.query('mhw', 'armors')}`
      );
    }

    const output = db.parsers.mhw.parse_as_armors(data);
    client.mhwArmors = client.buildCollection();

    for (const i of Object.keys(output)) {
      client.mhwArmors.set(i, output[i]);
    }
  });

  db.get(db.query('mhw', 'monsters')).then(function(data) {
    if (!data) {
      client.mhwMonsters = null;

      return console.log(
        `Failed to request data @ ${db.query('mhw', 'monsters')}`
      );
    }

    const map = db.to_map(data, {
      raw: true
    }).map;

    client.mhwMonsters = client.buildCollection();

    for (const [k, v] of map) {
      client.mhwMonsters.set(v.name, v.details);
    }
  });

  db.get(db.query('mhgu', 'monsters')).then(function(data) {
    if (!data) {
      client.mhguMonsters = null;

      return console.log(
        `Failed to request data @ ${db.query('mhgu', 'monsters')}`
      );
    }

    const map = db.to_map(data, {
      raw: true
    }).map;

    client.mhguMonsters = client.buildCollection();

    for (const [k, v] of map) {
      client.mhguMonsters.set(k, v);
    }
  });

  db.get(db.query('mhgu', 'weapons')).then(function(data) {
    if (!data) {
      client.mhguWeapons = null;

      return console.log(
        `Failed to request data @ ${db.query('mhgu', 'weapons')}`
      );
    }

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
