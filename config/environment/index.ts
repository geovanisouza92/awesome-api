import { Environment } from './environment';
import { Environment as ProdEnvironment } from './environment.prod';
import { Environment as TestEnvironment } from './environment.test';

export { Environment };

export function getEnvironment(source = process.env): typeof Environment {
  let environment: typeof Environment = Environment;
  if (source.NODE_ENV === 'production') {
    environment = ProdEnvironment;
  } else if (source.NODE_ENV === 'test') {
    environment = TestEnvironment;
  }
  return environment;
}
