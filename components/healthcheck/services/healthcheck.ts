import { ConnectionProvider } from "../../../config/database";

export class HealthcheckService {
  private database: ConnectionProvider;

  constructor({ database }: { database: ConnectionProvider }) {
    this.database = database;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async readiness() {
    const connection = await this.database.getConnection();
    return {
      database: connection.isConnected ? 'ok' : 'error',
    };
  }
}
