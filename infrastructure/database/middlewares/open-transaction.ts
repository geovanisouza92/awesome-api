import { asValue } from 'awilix';
import { NextFunction, Request, Response } from 'express';
import { ContainedRequest } from '../../../modules/http';
import { Database } from '../database';

export async function openTransaction(req: Request, _: Response, next: NextFunction): Promise<void> {
  const { container } = req as ContainedRequest;
  const database = container.resolve<Database>('database');
  const connection = await database.getConnection();
  await connection.transaction(async (entityManager) => {
    container.register({
      entityManager: asValue(entityManager),
    });
    next();
  });
}
