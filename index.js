const { ShardingManager } = require('discord.js');
const config = require('./config.json');

if (config['base']['dev_mode'] == true) {
  const manager = new ShardingManager('./utils/main.js', {
    token: config['base']['token_dev']
  });

  manager.spawn();
  manager.on('shardCreate', shard =>
    console.log(`[SHARD] Launched shard ${shard.id}`)
  );
} else {
  const manager = new ShardingManager('./utils/main.js', {
    token: config['base']['token_main']
  });

  manager.spawn();
  manager.on('shardCreate', shard =>
    console.log(`[SHARD] Launched shard ${shard.id}`)
  );
}
