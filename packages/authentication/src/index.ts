import { asClass, AwilixContainer } from 'awilix';
import { useUserRepository } from './infrastructure/repositories';
import { AuthenticationService } from './services/authentication';
import { VerifyTokenUseCase } from './use-cases/verify-token';

export { useAuthenticationApi } from './interfaces/rest';

export function useAuthenticationModule(container: AwilixContainer): void {
  useUserRepository(container);

  container.register({
    authenticationService: asClass(AuthenticationService),
    verifyTokenUseCase: asClass(VerifyTokenUseCase),
  });
}
