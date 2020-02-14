import { EntitySchema } from 'typeorm';
import { UserSchema } from './user';

export const entities: EntitySchema[] = [UserSchema];
