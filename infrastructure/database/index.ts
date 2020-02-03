import { asClass, asFunction, AwilixContainer } from 'awilix';
import { EntityManager } from 'typeorm';
import { User } from '../../components/authentication/domain/user';
import { Database } from './database';
import { UserRepositoryImpl } from './repositories/user-repository';

export { openTransaction } from './middlewares/open-transaction';

export function mountDatabaseModule(container: AwilixContainer): void {
  container.register({
    database: asClass(Database)
      .singleton()
      .disposer((database) => database.close()),
    userRepository: asFunction(({ entityManager }: { entityManager: EntityManager }) =>
      entityManager.getCustomRepository<User>(UserRepositoryImpl),
    ).scoped(),
  });
}
