import { Connection, createConnection, Logger } from 'typeorm';
import { Environment } from '../../../config/environment';
import { Inject, Injectable } from '../../../lib/container';
import { getConnectionOptions } from './connection-options';

@Injectable
export class Database {
  @Inject
  private environment!: Environment;

  @Inject
  private databaseLogger!: Logger;

  private connection?: Connection;

  async getConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await createConnection({
        ...getConnectionOptions(this.environment.database.url),
        logging: true,
        logger: this.databaseLogger,
      });
    }

    return this.connection;
  }

  get isConnected(): boolean {
    return Boolean(this.connection?.isConnected);
  }

  async close(): Promise<void> {
    return this.connection?.close();
  }
}
