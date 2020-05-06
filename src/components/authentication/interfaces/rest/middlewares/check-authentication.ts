import { asValue } from 'awilix';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Config } from '../../../../../../config';
import { ContainedRequest } from '../../../../../../lib/http';
import { VerifyTokenUseCase } from '../../../use-cases/verify-token';

export async function checkAuthentication(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { container } = req as ContainedRequest;
  const config = container.resolve<Config>('config');

  const cookieValue = req.cookies[config.auth.cookieName];
  if (!cookieValue) {
    res.redirect(config.auth.loginUrl);
    return;
  }

  const verifyTokenUseCase = container.resolve<VerifyTokenUseCase>('verifyTokenUseCase');
  const currentUser = await verifyTokenUseCase.execute(cookieValue);
  if (!currentUser) {
    res.status(httpStatus.UNAUTHORIZED).send();
    return;
  }

  container.register({
    currentUser: asValue(currentUser),
  });

  next();
}
