import { apply, Out } from '../lib/config';
import { Config as DevConfig } from './config';
import { Config as ProdConfig } from './config.prod';
import { Config as TestConfig } from './config.test';

export type Config = Out<typeof DevConfig>;

export function getConfig(source = process.env): Config {
  let config: typeof DevConfig = DevConfig;
  if (source.NODE_ENV === 'production') {
    config = ProdConfig;
  } else if (source.NODE_ENV === 'test') {
    config = TestConfig;
  }
  return apply(config, source);
}
