import { Connection, createConnection } from 'typeorm';
import { Environment } from '../../config/environment';
import { getConnectionOptions } from '../../lib/database';

export class Database {
  private url: string;
  private connection?: Connection;

  constructor({ environment }: { environment: Environment }) {
    this.url = environment.database.url;
  }

  async getConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await createConnection({
        ...getConnectionOptions(this.url),
      });
    }

    return this.connection;
  }

  async close(): Promise<void> {
    return this.connection?.close();
  }
}
