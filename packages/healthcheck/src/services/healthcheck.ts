import { Inject, Injectable } from '@awesome/inject';
import { StatusReport } from '../domain/status-report';

interface Database {
  isConnected: boolean;
}

@Injectable
export class HealthcheckService {
  @Inject
  private database!: Database;

  async readiness(): Promise<StatusReport> {
    return {
      database: this.database.isConnected ? 'ok' : 'error',
    };
  }
}
