import { asClass, AwilixContainer } from 'awilix';
import { HealthcheckService } from './services/healthcheck';
import { CheckLivenessUseCase } from './use-cases/check-liveness';
import { CheckReadinessUseCase } from './use-cases/check-readiness';

export function mountHealthcheckModule(container: AwilixContainer): void {
  container.register({
    healthcheckService: asClass(HealthcheckService),
    checkLivenessUseCase: asClass(CheckLivenessUseCase),
    checkReadinessUseCase: asClass(CheckReadinessUseCase),
  });
}
