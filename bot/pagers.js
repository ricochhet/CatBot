const logger = require('./log.js');

class Pages {
  constructor(
    message,
    pages = [],
    time = 120000,
    reactions = { first: '⏪', back: '◀', next: '▶', last: '⏩', stop: '⏹' },
    pageFooter = false
  ) {
    this.message = message;
    this.pages = pages;
    this.time = time;
    this.reactions = reactions;
    this.page = 1;

    if (pages.length && pageFooter) {
      this.displayPageNumbers();
    }

    let missingPermissions = false;
    if (
      !message.member.guild.me.hasPermission('MANAGE_MESSAGES') ||
      !message.member.guild.me.hasPermission('ADD_REACTIONS')
    ) {
      let checkPermissions = `💡 *The bot doesn't have* **MANAGE_MESSAGES** *or* **ADD_REACTIONS** *permission!*`;
      missingPermissions = true;
      pages[0].setDescription(checkPermissions);
    }

    message.channel.send(pages[0]).then(msg => {
      this.msg = msg;

      if (missingPermissions) return;
      this.addReactions();
      this.createCollector();
    });
  }

  displayPageNumbers() {
    const total = this.pages.length;
    let current;
    for (let i = 0; i < total; i++) {
      current = this.pages[i];
      current.setFooter(
        `Page ${i + 1} / ${total}`,
        this.message.channel.client.user.avatarURL()
      );
    }
  }

  select(pg = 1) {
    this.page = pg;
    this.msg.edit(this.pages[pg - 1]);
  }

  createCollector() {
    const collector = this.msg.createReactionCollector(
      (reaction, user) => user.id == this.message.author.id,
      {
        time: this.time
      }
    );

    collector.on('collect', reaction => {
      switch (reaction.emoji.name) {
        case this.reactions.first:
          if (this.page != 1) this.select(1);
          break;
        case this.reactions.back:
          if (this.page != 1) this.select(this.page - 1);
          break;
        case this.reactions.next:
          if (this.page != this.pages.length) this.select(this.page + 1);
          break;
        case this.reactions.last:
          if (this.page != this.pages.length) this.select(this.pages.length);
          break;
        case this.reactions.stop:
          collector.stop();
          break;
        default:
          break;
      }

      reaction.users.remove(this.message.author.id);
    });

    collector.on('end', () => {
      this.msg.reactions
        .removeAll()
        .catch(err => logger.error('Failed to remove reactions %s', err));
    });
  }

  async addReactions() {
    if (this.reactions.first) this.msg.react(this.reactions.first);
    if (this.reactions.back) this.msg.react(this.reactions.back);
    if (this.reactions.next) this.msg.react(this.reactions.next);
    if (this.reactions.last) this.msg.react(this.reactions.last);
    if (this.reactions.stop) this.msg.react(this.reactions.stop);
  }
}

module.exports = Pages;
