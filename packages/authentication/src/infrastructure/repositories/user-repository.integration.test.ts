import { createAppContainer, getConfig } from '@awesome/config';
import { Database, useDatabaseModule } from '@awesome/database';
import { Connection } from 'typeorm';
import { useUserRepository } from '.';
import { UserRepository } from '../user-repository';

describe('UserRepositoryImpl', () => {
  let connection: Connection;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const container = createAppContainer(getConfig());
    useDatabaseModule(container);
    useUserRepository(container);

    const database = container.resolve<Database>('database');
    connection = await database.getConnection(); //
    // TODO Deve dar pau pq não tem entityManager registrado no container
    userRepository = container.resolve<UserRepository>('userRepository');
  });

  it('should create a user', async () => {
    const name = 'John Doe';
    const email = 'john@doe.com';
    const rawPassword = 'Password123!';

    const id = await userRepository.createUser(name, email, rawPassword);

    const actualUserRawData = await connection.createQueryRunner().query('select * from users where id = $1', [id]);

    expect(actualUserRawData).toMatchObject({
      id,
      name,
      email,
      password: expect.any(String),
      // eslint-disable-next-line @typescript-eslint/camelcase
      password_salt: expect.any(String),
    });
  });
});
