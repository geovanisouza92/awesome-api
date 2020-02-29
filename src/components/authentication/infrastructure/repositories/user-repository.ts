import { EntityRepository, Repository } from 'typeorm';
import { NotFoundError } from '../../../../../lib/errors';
import { User } from '../../domain/user';
import { UserSchema } from '../schemas/user';
import { UserRepository } from '../user-repository';

@EntityRepository(UserSchema)
export class UserRepositoryImpl extends Repository<User> implements UserRepository {
  async findUserById(id: string): Promise<User> {
    const foundUser = await this.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundError('User', id);
    }
    return new User(foundUser);
  }

  async count(): Promise<number> {
    return this.createQueryBuilder('user').getCount();
  }
}
