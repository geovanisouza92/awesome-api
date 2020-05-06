import { UserSchema } from '@awesome/authentication/src/infrastructure/schemas/user';
import { registerSchema } from '@awesome/db-common';

export function useSchemas(): void {
  registerSchema(UserSchema);
}
