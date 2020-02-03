import { asClass, AwilixContainer } from 'awilix';
import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import { AuthenticationService } from '../../services/authentication';
import { VerifyTokenUseCase } from '../../use-cases/verify-token';
import { AuthenticationController } from './controllers/authentication';

export { checkAuthentication } from './middlewares/check-authentication';

export function mountAuthenticationModule(container: AwilixContainer, app: Router): void {
  container.register({
    authenticationService: asClass(AuthenticationService),
    verifyTokenUseCase: asClass(VerifyTokenUseCase),
  });

  const callMethod = makeInvoker(AuthenticationController);

  app.use('/auth/authenticate', callMethod('authenticate'));
}
