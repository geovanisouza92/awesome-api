import { AwilixContainer } from 'awilix';
import express from 'express';
import { mountAuthenticationModule } from '../components/authentication';
import { mountAuthenticationApi } from '../components/authentication/interfaces/rest';
import { mountHealthcheckModule } from '../components/healthcheck';
import { mountHealthcheckApi } from '../components/healthcheck/interfaces/rest';
import { mountDatabaseModule, openTransaction } from '../infrastructure/database';
import { mountLoggingModule } from '../infrastructure/logging';

export function mountModulesForRest(container: AwilixContainer, app: express.Router): void {
  mountLoggingModule(container);
  mountDatabaseModule(container);
  app.use(openTransaction);
  mountHealthcheckModule(container);
  mountHealthcheckApi(app);
  mountAuthenticationModule(container);
  mountAuthenticationApi(app);
}
