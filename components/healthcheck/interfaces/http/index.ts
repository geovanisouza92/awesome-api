import { makeInvoker } from 'awilix-express';
import { Request, Response, Router } from 'express';
import { LivenessUseCase, ReadinessUseCase } from '../../use-cases';

export function mountHealthcheckApi(app: Router): void {
  const callMethod = makeInvoker(({
    livenessUseCase,
    readinessUseCase,
  }: {
    livenessUseCase: LivenessUseCase;
    readinessUseCase: ReadinessUseCase;
  }) => {
    return {
      async liveness(_req: Request, res: Response): Promise<void> {
        const result = await livenessUseCase.execute();
        res.json(result);
      },
      async readiness(_req: Request, res: Response): Promise<void> {
        const result = await readinessUseCase.execute();
        res.json(result);
      }
    };
  });

  app.use('/healthcheck/liveness', callMethod('liveness'));
  app.use('/healthcheck/readiness', callMethod('readiness'));
}
