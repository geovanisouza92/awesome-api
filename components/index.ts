import { asClass, asFunction, asValue, AwilixContainer, createContainer } from 'awilix';
import { ConnectionProvider } from '../config/database';
import { getEnvironment } from '../config/environment';
import { mountLoggingModule } from '../config/logging';
import { mountHealthcheckComponent } from './healthcheck';

export function mountApplication(): AwilixContainer {
  const environment = getEnvironment();

  const container = createContainer()
    .register({
      environment: asValue(environment),
      database: asClass(ConnectionProvider)
        .singleton()
        .disposer(provider => provider.close()),
      logger: asFunction(mountLoggingModule).singleton(),
    });

  mountHealthcheckComponent(container);

  return container;
}
