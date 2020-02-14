import { asClass, asValue, AwilixContainer } from 'awilix';
import { Database } from './database';
import { DatabaseLogger } from './database-logger';
import { mountUserRepository } from './repositories/user-repository';
export { openTransaction } from './middlewares/open-transaction';

export function mountDatabaseModule(container: AwilixContainer): void {
  container.register({
    databaseLogger: asValue(new DatabaseLogger(container)),
    database: asClass(Database)
      .singleton()
      .disposer((database) => database.close()),
  });

  mountUserRepository(container);
}
