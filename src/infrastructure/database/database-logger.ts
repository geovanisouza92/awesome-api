/* eslint-disable @typescript-eslint/no-explicit-any */

import { Logger as typeormLogger } from 'typeorm';
import { Inject, Injectable } from '../../../lib/container';
import { Logger } from '../logging';

@Injectable
export class DatabaseLogger implements typeormLogger {
  @Inject
  private logger!: Logger;

  logQuery(query: string, parameters?: any[]): void {
    this.logger.info(`QUERY: ${query}`, { parameters });
  }

  logQueryError(error: string, query: string, parameters?: any[]): void {
    this.logger.error(`SQL ERROR FOR QUERY: "${query}"`, {
      parameters,
      error: ((error as any) as Error).stack,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    this.logger.warn(`SLOW QUERY TOOK [${time}]: "${query}"`, { parameters });
  }

  logSchemaBuild(message: string): void {
    this.logger.debug(message);
  }

  logMigration(message: string): void {
    this.logger.debug(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any): void {
    this.logger.log(level, message);
  }
}
