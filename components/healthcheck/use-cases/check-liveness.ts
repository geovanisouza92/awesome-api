import { UseCase } from '../../use-case';
import { StatusReport } from '../domain/status-report';

export class CheckLivenessUseCase implements UseCase<void, StatusReport> {
  async execute(): Promise<StatusReport> {
    return { status: 'ok' };
  }
}
