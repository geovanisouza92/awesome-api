/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { asFunction } from 'awilix';
import { EntityManager, ObjectType } from 'typeorm';

export const registerRepository = <T>(impl: ObjectType<T>) =>
  asFunction(({ entityManager }: { entityManager: EntityManager }) =>
    entityManager.getCustomRepository<T>(impl),
  ).scoped();
