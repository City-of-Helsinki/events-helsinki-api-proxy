import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports: [
    process.env.NODE_ENV !== 'production'
      ? new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        })
      : new winston.transports.Console({
          format: winston.format.simple(),
        }),
    // Uncomment if you want to log to files, see: https://github.com/winstonjs/winston#usage
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
