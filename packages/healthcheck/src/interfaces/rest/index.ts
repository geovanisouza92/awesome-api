import { useController } from '@awesome/http-common';
import { Router } from 'express';
import { HealthcheckController } from './controllers/healthcheck';

export function useHealthcheckApi(app: Router): void {
  const useAction = useController(HealthcheckController);

  app.use('/healthcheck/liveness', useAction('liveness'));
  app.use('/healthcheck/readiness', useAction('readiness'));
}
