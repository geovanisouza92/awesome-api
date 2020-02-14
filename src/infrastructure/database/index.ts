import { asClass, AwilixContainer } from 'awilix';
import { Database } from './database';
import { mountUserRepository } from './repositories/user-repository';
export { openTransaction } from './middlewares/open-transaction';

export function mountDatabaseModule(container: AwilixContainer): void {
  container.register({
    database: asClass(Database)
      .singleton()
      .disposer((database) => database.close()),
  });

  mountUserRepository(container);
}
