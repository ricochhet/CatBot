const Command = require('../../utils/command.js');

class List extends Command {
  constructor() {
    super('list', 'list', 'List all monsters in MHW & Iceborne', {
      args: false
    });
  }

  async run(client, message, args) {
    if (client.mhwMonsters == null) {
      return message.channel.send(this.serverErrorEmbed());
    }

    const monsterNames = client.mhwMonsters.map(monster => monster.title);
    monsterNames.sort();

    let monsterPerPage = 20;
    const total = monsterNames.length;
    let embeds = [];

    const makePage = names => {
      if (!names.length) return;
      let page = this.MessageEmbed()
        .setColor('#8fde5d')
        .addField('Monsters list', names.join('\n'))
        .setTimestamp();

      embeds.push(page);
    };

    let data = [];

    for (let i = 0; i < total; i++) {
      if (i % monsterPerPage === 0) {
        // add new page and reset data (go next)
        makePage(data);
        data = [];
      }

      data.push(monsterNames[i]);
    }

    // fill up last page if needed (loop ended before hitting multiple of monsterPerPage)
    if (data.length) {
      makePage(data);
    }

    const reactions = {
      first: '⏪',
      back: '◀',
      next: '▶',
      last: '⏩',
      stop: '⏹'
    };
    const displayPageNumbers = true;

    this.menu(message, embeds, 120000, reactions, displayPageNumbers);
  }
}

module.exports = List;
