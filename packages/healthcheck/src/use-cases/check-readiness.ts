import { UseCase } from '@awesome/ddd-common';
import { Inject, Injectable } from '@awesome/inject';
import { StatusReport } from '../domain/status-report';
import { HealthcheckService } from '../services/healthcheck';

@Injectable
export class CheckReadinessUseCase implements UseCase<void, StatusReport> {
  @Inject
  private healthcheckService!: HealthcheckService;

  async execute(): Promise<StatusReport> {
    return this.healthcheckService.readiness();
  }
}
