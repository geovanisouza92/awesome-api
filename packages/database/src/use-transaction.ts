import { ContainedRequest } from '@awesome/http-common';
import { asValue } from 'awilix';
import { NextFunction, Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { Database } from './database';

export async function useTransaction(req: Request, _: Response, next: NextFunction): Promise<void> {
  const { container } = req as ContainedRequest;
  const database = container.resolve<Database>('database');
  const connection = await database.getConnection();
  await connection.transaction(async (entityManager: EntityManager) => {
    container.register({
      entityManager: asValue(entityManager),
    });
    next();
  });
}
