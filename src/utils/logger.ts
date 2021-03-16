import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  silent: process.env.GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING === 'true',
  transports: [
    new winston.transports.Console({
      format: winston.format.prettyPrint(),
    }),
    // Uncomment if you want to log to files, see: https://github.com/winstonjs/winston#usage
    // new winston.transports.File({
    //   filename: 'combined.log',
    //   format: winston.format.simple(),
    // }),
  ],
});

export default logger;
