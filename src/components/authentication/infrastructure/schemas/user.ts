import { EntitySchema } from 'typeorm';
import { User } from '../../domain/user';

export const UserSchema = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
      length: 100,
      nullable: false,
      default: '',
    },
    email: {
      type: String,
      length: 100,
      nullable: false,
      unique: true,
    },
    password: {
      type: String,
      length: 64,
      nullable: false,
      select: false,
    },
    passwordSalt: {
      type: String,
      length: 30,
      nullable: false,
      select: false,
    },
  },
});
