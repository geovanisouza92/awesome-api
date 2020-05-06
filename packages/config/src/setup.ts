import { asValue, AwilixContainer, createContainer } from 'awilix';
import 'reflect-metadata';
import { Config } from './config';

export function createAppContainer(config: Config): AwilixContainer {
  const container = createContainer().register({
    config: asValue(config),
  });

  return container;
}
