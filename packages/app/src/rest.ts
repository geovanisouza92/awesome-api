import { useAuthenticationApi, useAuthenticationModule } from '@awesome/authentication';
import { useDatabaseModule, useTransaction } from '@awesome/database';
import { useHealthcheckApi, useHealthcheckModule } from '@awesome/healthcheck';
import { useLoggingModule } from '@awesome/logging';
import { AwilixContainer } from 'awilix';
import express from 'express';
import { useSchemas } from './entities';

export function useRest(container: AwilixContainer, app: express.Router): void {
  useLoggingModule(container);
  useDatabaseModule(container);
  useSchemas();
  useHealthcheckModule(container);
  useAuthenticationModule(container);

  app.use(useTransaction);
  useAuthenticationApi(app);
  useHealthcheckApi(app);
}
