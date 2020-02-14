import { asFunction, AwilixContainer } from 'awilix';
import { createLogger as winstonCreateLogger, format, Logger, transports } from 'winston';
import { Environment } from '../../../config/environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customFormat = format.printf(({ level, message, timestamp }: any): string => {
  return `${timestamp} ${level}: ${message}`;
});

function createLogger({ environment }: { environment: Environment }): Logger {
  const logger = winstonCreateLogger({
    level: environment.logger.level,
    format: format.combine(format.timestamp(), format.colorize(), customFormat),
    transports: [new transports.Console()],
  });

  return logger;
}

export function mountLoggingModule(container: AwilixContainer): void {
  container.register({
    logger: asFunction(createLogger).singleton(),
  });
}