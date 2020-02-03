import { Inject, Injectable } from '../../../helpers/container';
import { StatusReport } from '../domain/status-report';

interface Database {
  getConnection(): Promise<Connection>;
}

type Connection = {
  isConnected: boolean;
};

@Injectable
export class HealthcheckService {
  @Inject
  private database!: Database;

  async readiness(): Promise<StatusReport> {
    const connection = await this.database.getConnection();
    return {
      database: connection.isConnected ? 'ok' : 'error',
    };
  }
}
