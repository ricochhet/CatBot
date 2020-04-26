const fs = require('fs');
const logger = require('./log.js');
const db = require('./libraries/utils/client');

class DisabledHandler {
  // Commands are stored per guild. Each guild has an entry in the db (key = guild id)
  // Within that each category has an entry (including 'main')
  // key = category name, value = list of disabled sub commands
  isGuildInDB(guildId) {
    return new Promise(function(resolve, reject) {
      db.get(
        'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
      ).then(async function(data) {
        let db = JSON.parse(data);

        if (db[guildId]) {
          resolve(true);
        } else {
          resolve(false);
        }

        //if (db[guildId]) return true;
        //return false;
      });
    });
  }

  isCategoryDisabled(guildId, category) {
    return new Promise(function(resolve, reject) {
      db.get(
        'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
      ).then(async function(data) {
        let db = JSON.parse(data);

        if (db[guildId] && db[guildId][category]) {
          resolve(true);
        } else {
          resolve(false);
        }

        //if (db[guildId] && db[guildId][category]) return true;
        //return false;
      });
    });
  }

  isCommandDisabled(guildId, category, name) {
    return new Promise(function(resolve, reject) {
      db.get(
        'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
      ).then(async function(data) {
        const db = JSON.parse(data);

        try {
          resolve(db[guildId][category].includes(name));
        } catch (error) {
          resolve(false);
        }
      });
    });
  }

  getDisabledList(guildId) {
    return new Promise(function(resolve, reject) {
      db.get(
        'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
      ).then(async function(data) {
        const db = JSON.parse(data);

        if (!db[guildId]) {
          resolve(null);
        }

        let guildEntry = db[guildId];
        let output = '';

        for (let category in guildEntry) {
          output += `\n  ${category.toUpperCase()}`;

          for (let command of guildEntry[category]) {
            output += `\n    ${command}`;
          }

          if (
            Object.keys(guildEntry).indexOf(category) !=
            Object.keys(guildEntry).length - 1
          )
            output += '\n';
        }

        resolve(output);
      });
    });
  }

  disableCategory(guildId, category, commands) {
    const self = this;

    db.get(
      'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
    ).then(async function(data) {
      const db = JSON.parse(data);

      if (!db[guildId]) db[guildId] = {};

      // Sets category entry with the given command names
      db[guildId][category] = commands;
      self.saveDb(db);
    });
  }

  enableCategory(guildId, category) {
    const self = this;

    db.get(
      'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
    ).then(async function(data) {
      const db = JSON.parse(data);

      // return early if nothing to delete
      if (!db[guildId] || !db[guildId][category]) return;

      // delete category entry
      delete db[guildId][category];

      // delete guild from db if that was the only category
      if (Object.keys(db[guildId]).length == 0) delete db[guildId];

      self.saveDb(db);
    });
  }

  disableCommand(guildId, category, name) {
    const self = this;

    db.get(
      'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
    ).then(async function(data) {
      const db = JSON.parse(data);

      if (!db[guildId]) db[guildId] = {};

      let categoryEntry = db[guildId][category];
      if (!categoryEntry) categoryEntry = [];
      categoryEntry.push(name);

      db[guildId][category] = categoryEntry;
      self.saveDb(db);
    });
  }

  enableCommand(guildId, category, name) {
    const self = this;

    db.get(
      'http:localhost:8080/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984'
    ).then(async function(data) {
      const db = JSON.parse(data);

      if (!self.isCommandDisabled(guildId, category, name)) return;

      // remove command from disabled list
      let categoryEntry = db[guildId][category];
      categoryEntry = categoryEntry.filter(cmdName => cmdName != name);

      if (categoryEntry.length) {
        db[guildId][category] = categoryEntry;
      } else {
        delete db[guildId][category];
        // delete guild from db if that was the only category
        if (Object.keys(db[guildId]).length == 0) delete db[guildId];
      }

      self.saveDb(db);
    });
  }

  saveDb(json) {
    db.request(
      { message: json },
      {
        hostname: 'localhost',
        port: 8080,
        path:
          '/api/database/573958899582107653/server/disabledCommands?key=5e97fa61-c93d-46dd-9f71-826a5caf0984',
        method: 'POST'
      }
    );

    /*fs.writeFile(
      'utils/databases/server/disabledCommands.json',
      JSON.stringify(this.db, null, 4),
      'utf8',
      err => {
        if (err)
          return logger.error(
            'An error occured while saving disabled commands.',
            err
          );
      }
    );*/
  }
}

module.exports = DisabledHandler;
