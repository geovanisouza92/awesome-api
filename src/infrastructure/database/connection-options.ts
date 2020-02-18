import { ConnectionOptions } from 'typeorm';
import { parse } from 'url';
import { entities } from './entities';

export function getConnectionOptions(url: string): ConnectionOptions {
  const { protocol } = parse(url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const type = protocol?.replace(':', '') as any;
  return {
    type,
    url,
    entities,
  };
}
