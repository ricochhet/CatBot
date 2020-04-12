const fs = require('fs');
const logger = require('./log.js');

class DisabledHandler {
  // Commands are stored per guild. Each guild has an entry in the db (key = guild id)
  // Within that each category has an entry (including 'main')
  // key = category name, value = list of disabled sub commands
  constructor() {
    this.db = require('./databases/server/disabledCommands.json');
  }

  isGuildInDB(guildId) {
    if (this.db[guildId]) return true;
    return false;
  }

  isCategoryDisabled(guildId, category) {
    if (this.db[guildId] && this.db[guildId][category]) return true;
    return false;
  }

  isCommandDisabled(guildId, category, name) {
    try {
      return this.db[guildId][category].includes(name);
    } catch (error) {
      return false;
    }
  }

  getDisabledList(guildId) {
    if (!this.db[guildId]) return null;

    let guildEntry = this.db[guildId];
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

    return output;
  }

  disableCategory(guildId, category, commands) {
    if (!this.db[guildId]) this.db[guildId] = {};

    // Sets category entry with the given command names
    this.db[guildId][category] = commands;
    this.saveDb();
  }

  enableCategory(guildId, category) {
    // return early if nothing to delete
    if (!this.db[guildId] || !this.db[guildId][category]) return;

    // delete category entry
    delete this.db[guildId][category];

    // delete guild from db if that was the only category
    if (Object.keys(this.db[guildId]).length == 0) delete this.db[guildId];

    this.saveDb();
  }

  disableCommand(guildId, category, name) {
    if (!this.db[guildId]) this.db[guildId] = {};

    let categoryEntry = this.db[guildId][category];
    if (!categoryEntry) categoryEntry = [];
    categoryEntry.push(name);

    this.db[guildId][category] = categoryEntry;
    this.saveDb();
  }

  enableCommand(guildId, category, name) {
    if (!this.isCommandDisabled(guildId, category, name)) return;

    // remove command from disabled list
    let categoryEntry = this.db[guildId][category];
    categoryEntry = categoryEntry.filter(cmdName => cmdName != name);

    if (categoryEntry.length) {
      this.db[guildId][category] = categoryEntry;
    } else {
      delete this.db[guildId][category];
      // delete guild from db if that was the only category
      if (Object.keys(this.db[guildId]).length == 0) delete this.db[guildId];
    }

    this.saveDb();
  }

  saveDb() {
    fs.writeFile(
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
    );
  }
}

module.exports = DisabledHandler;
