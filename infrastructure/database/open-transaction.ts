import { Request, Response, NextFunction } from "express";
import { asValue } from "awilix";
import { ContainedRequest } from "../../../helpers/http";
import { Database } from "./database";

export async function openTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { container } = req as ContainedRequest;
  const database = container.resolve("database") as Database;
  const conn = await database.getConnection();
  await conn.transaction(entityManager => {
    container.register({
      entityManager: asValue(entityManager),
    });
    next();
  });
}
