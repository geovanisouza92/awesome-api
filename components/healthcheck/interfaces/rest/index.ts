import { makeInvoker } from 'awilix-express';
import { Request, Response, Router } from 'express';
import { Inject, Injectable } from '../../../../helpers/container';
import { CheckLivenessUseCase, CheckReadinessUseCase } from '../../use-cases';

@Injectable
class Controller {
  @Inject
  private checkLivenessUseCase!: CheckLivenessUseCase;

  @Inject
  private checkReadinessUseCase!: CheckReadinessUseCase;

  async liveness(_: Request, res: Response): Promise<void> {
    const result = await this.checkLivenessUseCase.execute();
    res.json(result);
  }

  async readiness(_: Request, res: Response): Promise<void> {
    const result = await this.checkReadinessUseCase.execute();
    res.json(result);
  }
}

export function mountHealthcheckApi(app: Router): void {
  const callMethod = makeInvoker(Controller);

  app.use('/healthcheck/liveness', callMethod('liveness'));
  app.use('/healthcheck/readiness', callMethod('readiness'));
}
