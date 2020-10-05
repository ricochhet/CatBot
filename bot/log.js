const { createLogger, format, transports } = require('winston');

// See https://github.com/winstonjs/winston/blob/master/examples/quick-start.js for reference
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // console logger (info, warn, error)
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple())
    }),
    // write all errors to separate log
    new transports.File({ filename: 'logs/error.log', level: 'error' }),

    // persist all (from debug to error) in main log file
    new transports.File({ filename: 'logs/main.log' })
  ],
  exitOnError: false // do not exit on handled exceptions
});

module.exports = logger;
