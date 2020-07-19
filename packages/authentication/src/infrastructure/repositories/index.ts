import { registerRepository } from '@awesome/db-common';
import { AwilixContainer } from 'awilix';
import { User } from '../../domain/user';
import { UserRepositoryImpl } from './user-repository';

export function useUserRepository(container: AwilixContainer): void {
  container.register({
    userRepository: registerRepository<User>(UserRepositoryImpl),
  });
}
