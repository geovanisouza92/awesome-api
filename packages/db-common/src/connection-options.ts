import { ConnectionOptions } from 'typeorm';
import { parse } from 'url';
import { getSchemas } from './register-schema';

export function getConnectionOptions(url: string): ConnectionOptions {
  const { protocol } = parse(url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const type = protocol?.replace(':', '') as any;
  return {
    type,
    url,
    entities: getSchemas(),
  };
}
