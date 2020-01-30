import { Database } from "../../../config/database";
import { Inject, Injectable } from "../../../helpers/container";
import { StatusReport } from "../domain/status-report";

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
