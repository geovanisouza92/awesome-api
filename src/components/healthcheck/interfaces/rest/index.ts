import { Router } from 'express';
import { createController } from '../../../../../lib/http';
import { HealthcheckController } from './controllers/healthcheck';

export function useHealthcheckApi(app: Router): void {
  const useAction = createController(HealthcheckController);

  app.use('/healthcheck/liveness', useAction('liveness'));
  app.use('/healthcheck/readiness', useAction('readiness'));
}
