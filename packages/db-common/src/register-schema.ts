/* eslint-disable @typescript-eslint/no-explicit-any */

import { EntitySchema } from 'typeorm';

const entities: Set<EntitySchema<any>> = new Set<EntitySchema<any>>();

export function registerSchema<T>(schema: EntitySchema<T>): void {
  if (!entities.has(schema)) {
    entities.add(schema);
  }
}

export function getSchemas(): EntitySchema<any>[] {
  return Array.from(entities);
}
