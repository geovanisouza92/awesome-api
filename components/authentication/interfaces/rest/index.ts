import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import { AuthenticationController } from './controllers/authentication';
import { checkAuthentication } from './middlewares/check-authentication';

export function mountAuthenticationApi(app: Router): void {
  app.use(checkAuthentication);

  const callMethod = makeInvoker(AuthenticationController);

  app.use('/auth/authenticate', callMethod('authenticate'));
}
