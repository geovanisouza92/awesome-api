import { Connection, createConnection } from 'typeorm';
import { Environment } from '../../config/environment';
import { Inject, Injectable } from '../../helpers/container';
import { getConnectionOptions } from '../../helpers/database';

@Injectable
export class Database {
  @Inject
  private environment!: Environment;

  private connection?: Connection;

  async getConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await createConnection({
        ...getConnectionOptions(this.environment),
      });
    }

    return this.connection;
  }

  async close(): Promise<void> {
    return this.connection?.close();
  }
}
