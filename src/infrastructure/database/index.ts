import { asClass, AwilixContainer } from 'awilix';
import { mountUserRepository } from '../../components/authentication/infrastructure/repositories';
import { Database } from './database';
import { DatabaseLogger } from './database-logger';

export { openTransaction } from './middlewares/open-transaction';

export function mountDatabaseModule(container: AwilixContainer): void {
  container.register({
    databaseLogger: asClass(DatabaseLogger),
    database: asClass(Database)
      .singleton()
      .disposer((database) => database.close()),
  });

  mountUserRepository(container);
}
