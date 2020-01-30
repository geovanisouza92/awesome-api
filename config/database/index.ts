import { Connection, createConnection } from 'typeorm';
import { Inject, Injectable } from '../../helpers/container';
import { getConnectionOptions } from '../../helpers/database';
import { Environment } from '../environment';

@Injectable
export class Database {
  @Inject
  private environment!: typeof Environment;

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
    if (this.connection) {
      return this.connection.close();
    }
  }
}
