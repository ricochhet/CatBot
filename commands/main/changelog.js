const Command = require('../../utils/baseCommand.js');

class About extends Command {
  constructor(prefix) {
    super('changelog', 'changelog', 'Shows latest update log', {
      args: false,
      prefix: prefix
    });
  }

  run(client, message, args) {
    const changelogEmbed = this.RichEmbed()
      .setColor('#8fde5d')
      .addField(
        `Changelog: v${client.config.get('VERSION')}`,
        `
        🤖 Now uses ES6; features can be pushed out faster!
        🔍 Similarity algorithm improved, now you can find what you want much quicker!
        🎲 \`+mhw rollhunt\` is now much cleaner and easier to understand, also shows weapon type along with name!
        📄 \`+mhw monster\` now includes status & hitzone values!
        ⛔ The bot will notify you of what permissions it needs instead of not working properly!
        🧠 You can now search for decorations by the skill name!
        🆘 Sub-help menus are easier on the eyes, and easier to read!
        🆘 Mentioning the bot now tells you how to get started!
        ➗ Calculations are now more descriptive and useful towards hunts!
        🆕 Use \`+mhw list\` to get a list of monsters!
        🆕 Use \`+mhw events\` to get a list of events!
        🆕 Use \`+changelog\` to check out all of the new features!
        `
      )
      .setTimestamp()
      .setFooter('Changelog Menu', client.user.avatarURL);

    message.channel.send(changelogEmbed);
  }
}

module.exports = About;
