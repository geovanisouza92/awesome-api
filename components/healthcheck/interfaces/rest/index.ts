import { asClass, AwilixContainer } from 'awilix';
import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import { HealthcheckService } from '../../services/healthcheck';
import { CheckLivenessUseCase } from '../../use-cases/check-liveness';
import { CheckReadinessUseCase } from '../../use-cases/check-readiness';
import { HealthcheckController } from './controllers/healthcheck';

export function mountHealthcheckModule(container: AwilixContainer, app: Router): void {
  container.register({
    healthcheckService: asClass(HealthcheckService),
    checkLivenessUseCase: asClass(CheckLivenessUseCase),
    checkReadinessUseCase: asClass(CheckReadinessUseCase),
  });

  const callMethod = makeInvoker(HealthcheckController);

  app.use('/healthcheck/liveness', callMethod('liveness'));
  app.use('/healthcheck/readiness', callMethod('readiness'));
}
