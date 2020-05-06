import { AwilixContainer } from 'awilix';
import express from 'express';
import { useAuthenticationModule } from '../components/authentication';
import { useAuthenticationApi } from '../components/authentication/interfaces/rest';
import { useHealthcheckModule } from '../components/healthcheck';
import { useHealthcheckApi } from '../components/healthcheck/interfaces/rest';
import { useDatabaseModule, useTransaction } from '../infrastructure/database';
import { useLoggingModule } from '../infrastructure/logging';

export function useRest(container: AwilixContainer, app: express.Router): void {
  useLoggingModule(container);
  useDatabaseModule(container);
  useHealthcheckModule(container);
  useAuthenticationModule(container);

  app.use(useTransaction);
  useAuthenticationApi(app);
  useHealthcheckApi(app);
}
