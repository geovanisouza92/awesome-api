import { AwilixContainer } from 'awilix';
import { EntityRepository, Repository } from 'typeorm';
import { registerRepository } from '../../../../lib/container';
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
    userRepository: registerRepository<User>(UserRepositoryImpl),
  });
}
