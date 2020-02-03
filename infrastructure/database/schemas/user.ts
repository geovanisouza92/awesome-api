import { EntitySchema } from 'typeorm';
import { User } from '../../../components/authentication/domain/user';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
  },
});
