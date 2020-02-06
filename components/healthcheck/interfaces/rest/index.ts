import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import { HealthcheckController } from './controllers/healthcheck';

export function mountHealthcheckApi(app: Router): void {
  const callMethod = makeInvoker(HealthcheckController);

  app.use('/healthcheck/liveness', callMethod('liveness'));
  app.use('/healthcheck/readiness', callMethod('readiness'));
}
