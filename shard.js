const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const logger = require('./bot/log');

const manager = new ShardingManager('./bot/main.js', {
  token: config['bot']['token']
});

manager.spawn();
manager.on('shardCreate', shard =>
  logger.info(
    `[SHARD] Launched shard #${shard.id} (total ${manager.totalShards})`
  )
);
