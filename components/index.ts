import { asClass, asFunction, asValue, AwilixContainer, createContainer } from 'awilix';
import { Database } from '../config/database';
import { getEnvironment } from '../config/environment';
import { createLogger } from '../config/logging';
import { mountHealthcheckComponent } from './healthcheck';

export function mountApplication(): AwilixContainer {
  const environment = getEnvironment();

  const container = createContainer()
    .register({
      environment: asValue(environment),
      database: asClass(Database)
        .singleton()
        .disposer(provider => provider.close()),
      logger: asFunction(createLogger).singleton(),
    });

  mountHealthcheckComponent(container);

  return container;
}
