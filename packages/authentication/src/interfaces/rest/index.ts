import { createController } from '@awesome/http-common';
import { Router } from 'express';
import { AuthenticationController } from './controllers/authentication';
import { checkAuthentication } from './middlewares/check-authentication';

export function useAuthenticationApi(app: Router): void {
  app.use(checkAuthentication);

  const useAction = createController(AuthenticationController);

  app.use('/auth/authenticate', useAction('authenticate'));
}
