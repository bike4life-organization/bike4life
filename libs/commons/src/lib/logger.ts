import { createLogger, format, transports } from 'winston'

// Define log format
const logFormat = format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.colorize()),
    }),
  ],
})

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')))
  },
}

export { logger, stream }