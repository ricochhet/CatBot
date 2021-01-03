const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const logger = require('./bot/log');

const manager = new ShardingManager('./bot/main.js', {
  token: config['bot']['token']
});

manager.spawn().catch(err => {
  const errorMSG = {
    401: "401, bad token. check you're token in they config.json",
    404: '404, Something terrible happend, discord could not identify the error',
    502: "502, looks like discord server's are slow or down try again later"
  };

  if (errorMSG[err.status]) {
    logger.error(`Client can't login. ${errorMSG[err.status]}`);
  } else {
    logger.error(
      `Client can't login. unhandled status code (${err.status}) please lookup here https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${err.status}`
    );
  }
});

manager.on('shardCreate', shard =>
  logger.info(
    `[SHARD] Launched shard #${shard.id} (total ${manager.totalShards})`
  )
);
