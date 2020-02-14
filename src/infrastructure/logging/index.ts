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

function createLogger({ environment }: { environment: Environment }): Logger {
  const formats = [addRequestId(), format.timestamp()];

  if (environment.logger.format === 'json') {
    formats.push(format.json());
  } else {
    formats.push(
      format.colorize(),
      format.printf((entry: LogEntry) => {
        const { timestamp, level, message, ...rawMeta } = entry;
        const meta = JSON.stringify(rawMeta, null, 2);
        return `${timestamp} [${level}]: ${message.trim()} ${meta}`;
      }),
    );
  }

  return winstonCreateLogger({
    level: environment.logger.level,
    format: format.combine(...formats),
    transports: [new transports.Console()],
  });
}

export function mountLoggingModule(container: AwilixContainer): void {
  container.register({
    logger: asFunction(createLogger).scoped(),
  });
}
