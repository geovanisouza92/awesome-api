import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../components/authentication/domain/user';
import { UserRepository } from '../../../components/authentication/infrastructure/user-repository';
import { NotFoundError } from '../../../modules/errors';
import { UserSchema } from '../schemas/user';

@EntityRepository(UserSchema)
export class UserRepositoryImpl extends Repository<User> implements UserRepository {
  async findUserById(id: string): Promise<User> {
    const raw = await this.findOne({ where: { id } });
    if (!raw) {
      throw new NotFoundError('User', id);
    }
    return new User(raw.id, raw.email, raw.name);
  }
}
