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
      this.createCollector(message.author.id);
    });
  }

  displayPageNumbers() {
    const total = this.pages.length;
    let current;
    for (let i = 0; i < total; i++) {
      current = this.pages[i];
      current.setFooter(
        `Page ${i + 1} / ${total}`,
        this.message.channel.client.user.avatarURL
      );
    }
  }

  select(pg = 1) {
    this.page = pg;
    this.msg.edit(this.pages[pg - 1]);
  }

  createCollector(uid) {
    const collector = this.msg.createReactionCollector(
      (r, u) => u.id == this.message.author.id,
      {
        time: this.time
      }
    );
    this.collector = collector;
    collector.on('collect', r => {
      if (r.emoji.name == this.reactions.first) {
        if (this.page != 1) this.select(1);
      } else if (r.emoji.name == this.reactions.back) {
        if (this.page != 1) this.select(this.page - 1);
      } else if (r.emoji.name == this.reactions.next) {
        if (this.page != this.pages.length) this.select(this.page + 1);
      } else if (r.emoji.name == this.reactions.last) {
        if (this.page != this.pages.length) this.select(this.pages.length);
      } else if (r.emoji.name == this.reactions.stop) {
        collector.stop();
      }
      r.remove(this.message.author.id);
    });
    collector.on('end', () => {
      this.msg.clearReactions();
    });
  }

  async addReactions() {
    if (this.reactions.first) await this.msg.react(this.reactions.first);
    if (this.reactions.back) await this.msg.react(this.reactions.back);
    if (this.reactions.next) await this.msg.react(this.reactions.next);
    if (this.reactions.last) await this.msg.react(this.reactions.last);
    if (this.reactions.stop) await this.msg.react(this.reactions.stop);
  }
}

module.exports = Pages;
