import { registerRepository, registerSchema } from '@awesome/db-common';
import { AwilixContainer } from 'awilix';
import { User } from '../../domain/user';
import { UserSchema } from '../schemas/user';
import { UserRepositoryImpl } from './user-repository';

export function useUserRepository(container: AwilixContainer): void {
  registerSchema(UserSchema);

  container.register({
    userRepository: registerRepository<User>(UserRepositoryImpl),
  });
}
