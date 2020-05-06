import { NotFoundError } from '@awesome/errors';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../domain/user';
import { UserSchema } from '../schemas/user';
import { UserRepository } from '../user-repository';

const encryptNewPassword = 'crypt(:passwordSalt || :newPassword, :passwordSalt)';
const checkEncryptedPassword = 'crypt(user.password_salt || :currentPassword, user.password_salt)';

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

  // TODO: WIP
  async createUser(name: string, email: string, password: string): Promise<string> {
    const passwordSalt = await this.generatePasswordSalt();

    const result = await this.createQueryBuilder('user')
      .insert()
      .into(UserSchema, ['name', 'email', 'password', 'password_salt'])
      .values({
        name,
        email,
        password: encryptNewPassword,
        passwordSalt: ':passwordSalt',
      })
      .setParameters({
        newPassword: password,
        passwordSalt,
      })
      .returning('id')
      .execute();

    return result.identifiers[0].id;
  }

  // TODO: WIP
  async doesMatchPassword(email: string, password: string): Promise<boolean> {
    const found = await this.createQueryBuilder('user')
      .where({
        email,
        password: checkEncryptedPassword,
      })
      .setParameters({ currentPassword: password })
      .getCount();

    return found === 1;
  }

  // TODO: WIP
  async changePassword(email: string, currentPassword: string, newPassword: string): Promise<void> {
    const passwordSalt = await this.generatePasswordSalt();

    await this.createQueryBuilder()
      .update()
      .set({
        password: encryptNewPassword,
        passwordSalt: ':passwordSalt',
      })
      .where({
        email,
        password: checkEncryptedPassword,
      })
      .setParameters({ currentPassword, newPassword, passwordSalt });

    throw new Error('Method not implemented.');
  }

  private async generatePasswordSalt(): Promise<string> {
    return this.query(`select gen_salt('bf', 8);`);
  }
}
