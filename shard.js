const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
  token: 'NjM1OTg4MDUyMDQ0Njc3MTYw.XpUWBQ.gU08aCEiCf0CBZx_jmGH5mtqpJI'
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
