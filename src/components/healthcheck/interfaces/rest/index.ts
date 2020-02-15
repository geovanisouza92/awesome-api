import { Router } from 'express';
import { createController } from '../../../../../lib/http';
import { HealthcheckController } from './controllers/healthcheck';

export function mountHealthcheckApi(app: Router): void {
  const handleWith = createController(HealthcheckController);

  app.use('/healthcheck/liveness', handleWith('liveness'));
  app.use('/healthcheck/readiness', handleWith('readiness'));
}
