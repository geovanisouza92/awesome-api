import { createLogger, format, Logger, transports } from 'winston';
import { Environment } from "../environment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customFormat = format.printf(({ level, message, timestamp }: any): string => {
  return `${timestamp} ${level}: ${message}`;
});

export function mountLoggingModule({ environment }: { environment: typeof Environment }): Logger {
  const logger = createLogger({
    level: environment.logger.level,
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      customFormat,
    ),
    transports: [
      new transports.Console(),
    ],
  });

  return logger;
}
