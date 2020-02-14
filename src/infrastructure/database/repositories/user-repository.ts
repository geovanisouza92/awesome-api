import { asFunction, AwilixContainer } from 'awilix';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { NotFoundError } from '../../../../lib/errors';
import { User } from '../../../components/authentication/domain/user';
import { UserRepository } from '../../../components/authentication/infrastructure/user-repository';
import { UserSchema } from '../schemas/user';

@EntityRepository(UserSchema)
class UserRepositoryImpl extends Repository<User> implements UserRepository {
  async findUserById(id: string): Promise<User> {
    const foundUser = await this.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundError('User', id);
    }
    return new User(foundUser);
  }
}

export function mountUserRepository(container: AwilixContainer): void {
  container.register({
    userRepository: asFunction(({ entityManager }: { entityManager: EntityManager }) =>
      entityManager.getCustomRepository<User>(UserRepositoryImpl),
    ).scoped(),
  });
}
