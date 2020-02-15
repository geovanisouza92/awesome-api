import { Router } from 'express';
import { createController } from '../../../../../lib/http';
import { AuthenticationController } from './controllers/authentication';
import { checkAuthentication } from './middlewares/check-authentication';

export function mountAuthenticationApi(app: Router): void {
  app.use(checkAuthentication);

  const handleWith = createController(AuthenticationController);

  app.use('/auth/authenticate', handleWith('authenticate'));
}
