import { AwilixContainer } from 'awilix';
import { registerRepository } from '../../../../../lib/container';
import { User } from '../../domain/user';
import { UserRepositoryImpl } from './user-repository';

export function useUserRepository(container: AwilixContainer): void {
  container.register({
    userRepository: registerRepository<User>(UserRepositoryImpl),
  });
}
