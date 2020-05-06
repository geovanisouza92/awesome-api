import { asFunction, AwilixContainer } from 'awilix';
import {
  createLogger as winstonCreateLogger,
  format,
  LeveledLogMethod,
  LogEntry,
  LogMethod,
  transports,
} from 'winston';
import { Environment } from '../../../config/environment';
import { currentRequestId } from '../../../lib/request-id';

export interface Logger {
  log: LogMethod;
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
  debug: LeveledLogMethod;
}

const addRequestId = format((info) => {
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

export function createLogger({ environment }: { environment: Environment }): Logger {
  return winstonCreateLogger({
    level: environment.logger.level,
    format: format.combine(addRequestId(), format.timestamp(), ...formats[environment.logger.format]),
    transports: [new transports.Console()],
  });
}

export function useLoggingModule(container: AwilixContainer): void {
  container.register({
    logger: asFunction(createLogger).scoped(),
  });
}
