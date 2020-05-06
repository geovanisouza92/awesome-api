import { Connection } from 'typeorm';
import { getEnvironment } from '../../../../../config/environment';
import { createAppContainer } from '../../../../app/setup';
import { useDatabaseModule } from '../../../../infrastructure/database';
import { Database } from '../../../../infrastructure/database/database';
import { UserRepository } from '../user-repository';

describe('UserRepositoryImpl', () => {
  let connection: Connection;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const container = createAppContainer(getEnvironment());
    useDatabaseModule(container);

    const database = container.resolve<Database>('database');
    connection = await database.getConnection();
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
