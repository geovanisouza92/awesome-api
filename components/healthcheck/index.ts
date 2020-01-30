import { asClass, asFunction, AwilixContainer } from 'awilix';
import { HealthcheckService } from './services';
import { LivenessUseCase, ReadinessUseCase } from './use-cases';

export function mountHealthcheckComponent(container: AwilixContainer): void {
  const scope = container.createScope()
    .register({
      healthcheckService: asClass(HealthcheckService),
      livenessUseCase: asClass(LivenessUseCase),
      readinessUseCase: asClass(ReadinessUseCase),
    });

  container.register({
    livenessUseCase: asFunction(() => scope.resolve('livenessUseCase')),
    readinessUseCase: asFunction(() => scope.resolve('readinessUseCase')),
  });
}
