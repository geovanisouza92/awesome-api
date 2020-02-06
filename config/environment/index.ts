import { apply, Out } from '../../helpers/environment';
import { Environment as DevEnvironment } from './environment';
import { Environment as ProdEnvironment } from './environment.prod';
import { Environment as TestEnvironment } from './environment.test';

export type Environment = Out<typeof DevEnvironment>;

export function getEnvironment(source = process.env): Environment {
  let environment: typeof DevEnvironment = DevEnvironment;
  if (source.NODE_ENV === 'production') {
    environment = ProdEnvironment;
  } else if (source.NODE_ENV === 'test') {
    environment = TestEnvironment;
  }
  return apply(environment, source);
}
