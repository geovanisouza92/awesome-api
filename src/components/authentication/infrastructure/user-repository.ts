import { User } from '../domain/user';

export interface UserRepository {
  findUserById(id: string): Promise<User>;
  count(): Promise<number>;
  createUser(name: string, email: string, password: string): Promise<string>;
  doesMatchPassword(email: string, password: string): Promise<boolean>;
  changePassword(email: string, currentPassword: string, newPassword: string): Promise<void>;
}
