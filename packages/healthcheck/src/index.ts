import { asClass, AwilixContainer } from 'awilix';
import { HealthcheckService } from './services/healthcheck';
import { CheckLivenessUseCase } from './use-cases/check-liveness';
import { CheckReadinessUseCase } from './use-cases/check-readiness';

export { useHealthcheckApi } from './interfaces/rest';

export function useHealthcheckModule(container: AwilixContainer): void {
  container.register({
    healthcheckService: asClass(HealthcheckService),
    checkLivenessUseCase: asClass(CheckLivenessUseCase),
    checkReadinessUseCase: asClass(CheckReadinessUseCase),
  });
}
