import { asClass, asFunction, asValue, AwilixContainer, createContainer } from 'awilix';
import { getEnvironment } from '../config/environment';
import { Database } from '../infrastructure/database';
import { createLogger } from '../infrastructure/logging';
import { mountHealthcheckComponent } from './healthcheck';

export function mountApplication(): AwilixContainer {
  const environment = getEnvironment();

  const container = createContainer().register({
    environment: asValue(environment),
    database: asClass(Database)
      .singleton()
      .disposer((provider) => provider.close()),
    logger: asFunction(createLogger).singleton(),
  });

  mountHealthcheckComponent(container);

  return container;
}
