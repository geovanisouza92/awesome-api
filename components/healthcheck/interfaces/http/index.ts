import { makeInvoker } from 'awilix-express';
import { Request, Response, Router } from 'express';
import { CheckLivenessUseCase, CheckReadinessUseCase } from '../../use-cases';

export function mountHealthcheckApi(app: Router): void {
  const callMethod = makeInvoker(({
    checkLivenessUseCase,
    checkReadinessUseCase,
  }: {
    checkLivenessUseCase: CheckLivenessUseCase;
    checkReadinessUseCase: CheckReadinessUseCase;
  }) => {
    return {
      async liveness(_req: Request, res: Response): Promise<void> {
        const result = await checkLivenessUseCase.execute();
        res.json(result);
      },
      async readiness(_req: Request, res: Response): Promise<void> {
        const result = await checkReadinessUseCase.execute();
        res.json(result);
      }
    };
  });

  app.use('/healthcheck/liveness', callMethod('liveness'));
  app.use('/healthcheck/readiness', callMethod('readiness'));
}
