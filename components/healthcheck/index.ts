import { asClass, AwilixContainer } from 'awilix';
import { HealthcheckService } from './services';
import { CheckLivenessUseCase, CheckReadinessUseCase } from './use-cases';

export function mountHealthcheckComponent(container: AwilixContainer): void {
  container.register({
    healthcheckService: asClass(HealthcheckService),
    checkLivenessUseCase: asClass(CheckLivenessUseCase),
    checkReadinessUseCase: asClass(CheckReadinessUseCase),
  });
}
