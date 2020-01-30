import { ConnectionOptions } from 'typeorm';
import { parse } from 'url';
import { Environment } from '../config/environment';

export function getConnectionOptions({ database: { url } }: typeof Environment): ConnectionOptions {
  const { protocol } = parse(url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const type = protocol?.replace(':', '') as any;
  return { type, url };
}
