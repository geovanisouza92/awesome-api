import { Inject, Injectable } from '../../../helpers/container';
import { UseCase } from '../../use-case';
import { StatusReport } from '../domain/status-report';
import { HealthcheckService } from '../services';

@Injectable
export class CheckReadinessUseCase implements UseCase<void, StatusReport> {
  @Inject
  private healthcheckService!: HealthcheckService;

  async execute(): Promise<StatusReport> {
    return this.healthcheckService.readiness();
  }
}
