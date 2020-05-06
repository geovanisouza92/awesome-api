import { asClass, AwilixContainer } from 'awilix';
import { AuthenticationService } from './services/authentication';
import { VerifyTokenUseCase } from './use-cases/verify-token';

export function useAuthenticationModule(container: AwilixContainer): void {
  container.register({
    authenticationService: asClass(AuthenticationService),
    verifyTokenUseCase: asClass(VerifyTokenUseCase),
  });
}
