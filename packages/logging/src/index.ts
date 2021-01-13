import { Config } from '@awesome/config';
import { asFunction, AwilixContainer } from 'awilix';
import {
  createLogger as winstonCreateLogger,
  format,
  LeveledLogMethod,
  LogEntry,
  LogMethod,
  transports,
} from 'winston';

export interface Logger {
  log: LogMethod;
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
  debug: LeveledLogMethod;
}

const addRequestId = (currentRequestId: () => string): import('logform').FormatWrap =>
  format((info) => {
    const requestId = currentRequestId();
    if (requestId) {
      info['request-id'] = requestId;
    }
    return info;
  });

const formats: { [_: string]: import('logform').Format[] } = {
  json: [format.json()],
  pretty: [
    format.colorize(),
    format.printf((entry: LogEntry) => {
      const { timestamp, level, message, ...rawMeta } = entry;
      const meta = JSON.stringify(rawMeta, null, 2);
      return `${timestamp} [${level}]: ${message.trim()} ${meta}`;
    }),
  ],
};

export function createLogger({ config, currentRequestId }: { config: Config; currentRequestId: () => string }): Logger {
  return winstonCreateLogger({
    level: config.logger.level,
    format: format.combine(addRequestId(currentRequestId)(), format.timestamp(), ...formats[config.logger.format]),
    transports: [new transports.Console()],
  });
}

export function useLoggingModule(container: AwilixContainer): void {
  container.register({
    logger: asFunction(createLogger).scoped(),
  });
}
