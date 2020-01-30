import { Connection, createConnection } from 'typeorm';
import { getConnectionOptions } from '../../helpers/database';
import { Environment } from '../environment';

export class ConnectionProvider {
  private environment: typeof Environment;
  private connection?: Connection;

  constructor({ environment }: { environment: typeof Environment }) {
    this.environment = environment;
  }

  async getConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await createConnection({
        ...getConnectionOptions(this.environment),
      });
    }

    return this.connection;
  }

  async close(): Promise<void> {
    if (this.connection) {
      return this.connection.close();
    }
  }
}
