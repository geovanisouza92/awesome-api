import { Config } from '@awesome/config';
import { getConnectionOptions } from '@awesome/db-common';
import { Inject, Injectable } from '@awesome/inject';
import { Connection, createConnection, Logger } from 'typeorm';

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
