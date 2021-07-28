const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.Console({
      level: "info"
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/errors.log"
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss"
    }),
    winston.format.printf((log) => ` ${[log.timestamp]}: ${log.message}`)
  )
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
