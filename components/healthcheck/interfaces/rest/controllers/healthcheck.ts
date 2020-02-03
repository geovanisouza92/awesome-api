import { Request, Response } from 'express';
import { Inject, Injectable } from '../../../../../helpers/container';
import { CheckLivenessUseCase } from '../../../use-cases/check-liveness';
import { CheckReadinessUseCase } from '../../../use-cases/check-readiness';

@Injectable
export class HealthcheckController {
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
