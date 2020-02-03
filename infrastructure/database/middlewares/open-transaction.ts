import { asValue } from 'awilix';
import { NextFunction, Request, Response } from 'express';
import { ContainedRequest } from '../../../modules/http';
import { Database } from '../database';

export async function openTransaction(req: Request, _: Response, next: NextFunction): Promise<void> {
  const { container } = req as ContainedRequest;
  const database = container.resolve('database') as Database;
  const conn = await database.getConnection();
  await conn.transaction(async (entityManager) => {
    container.register({
      entityManager: asValue(entityManager),
    });
    next();
  });
}
