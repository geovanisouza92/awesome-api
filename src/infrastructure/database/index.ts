import { asClass, AwilixContainer } from 'awilix';
import { useUserRepository } from '../../components/authentication/infrastructure/repositories';
import { Database } from './database';
import { DatabaseLogger } from './database-logger';

export { useTransaction } from './middlewares/open-transaction';

export function useDatabaseModule(container: AwilixContainer): void {
  container.register({
    databaseLogger: asClass(DatabaseLogger),
    database: asClass(Database)
      .singleton()
      .disposer((database) => database.close()),
  });

  useUserRepository(container);
}
