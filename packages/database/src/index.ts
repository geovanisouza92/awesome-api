import { asClass, AwilixContainer } from 'awilix';
import { Database } from './database';
import { DatabaseLogger } from './database-logger';

export { useTransaction } from './use-transaction';
export { Database };

export function useDatabaseModule(container: AwilixContainer): void {
  container.register({
    databaseLogger: asClass(DatabaseLogger),
    database: asClass(Database)
      .singleton()
      .disposer((database) => database.close()),
  });
}
