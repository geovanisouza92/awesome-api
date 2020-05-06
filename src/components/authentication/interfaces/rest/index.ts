import { Router } from 'express';
import { createController } from '../../../../../lib/http';
import { AuthenticationController } from './controllers/authentication';
import { checkAuthentication } from './middlewares/check-authentication';

export function useAuthenticationApi(app: Router): void {
  app.use(checkAuthentication);

  const useAction = createController(AuthenticationController);

  app.use('/auth/authenticate', useAction('authenticate'));
}
