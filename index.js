const { ShardingManager } = require('discord.js');
const { TOKEN } = require('./utils/config.json');
const logger = require('./utils/log.js');

const manager = new ShardingManager('./utils/main.js', { token: TOKEN });

manager.spawn();
manager.on('shardCreate', shard => logger.info(`Launched shard ${shard.id}`));
