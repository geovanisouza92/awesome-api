import { Connection, createConnection, Logger } from 'typeorm';
import { Config } from '../../../config';
import { Inject, Injectable } from '../../../lib/container';
import { getConnectionOptions } from './connection-options';

@Injectable
export class Database {
  @Inject
  private config!: Config;

  @Inject
  private databaseLogger!: Logger;

  private connection?: Connection;

  async getConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await createConnection({
        ...getConnectionOptions(this.config.database.url),
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
