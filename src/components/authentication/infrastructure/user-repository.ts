import { User } from '../domain/user';

export interface UserRepository {
  findUserById(id: string): Promise<User>;
  count(): Promise<number>;
}
