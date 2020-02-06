import { asValue } from 'awilix';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Environment } from '../../../../../config/environment';
import { ContainedRequest } from '../../../../../modules/http';
import { VerifyTokenUseCase } from '../../../use-cases/verify-token';

export async function checkAuthentication(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { container } = req as ContainedRequest;
  const environment = container.resolve('environment') as Environment;

  const cookieValue = req.cookies[environment.auth.cookieName];
  if (!cookieValue) {
    res.redirect(environment.auth.loginUrl);
    return;
  }

  const verifyTokenUseCase = container.resolve('verifyTokenUseCase') as VerifyTokenUseCase;
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
