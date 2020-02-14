/* eslint-disable @typescript-eslint/no-explicit-any */

import { AwilixContainer } from 'awilix';
import { Logger as typeormLogger } from 'typeorm';
import { Logger } from '../logging';

export class DatabaseLogger implements typeormLogger {
  constructor(private container: AwilixContainer) {}

  logQuery(query: string, parameters?: any[]): void {
    const logger = this.container.resolve<Logger>('logger');
    logger.info(`QUERY: ${query}`, { parameters });
  }

  logQueryError(error: string, query: string, parameters?: any[]): void {
    const logger = this.container.resolve<Logger>('logger');
    logger.error(`SQL ERROR FOR QUERY: "${query}"`, { parameters, error });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    const logger = this.container.resolve<Logger>('logger');
    logger.warn(`SLOW QUERY TOOK [${time}]: "${query}"`, { parameters });
  }

  logSchemaBuild(message: string): void {
    const logger = this.container.resolve<Logger>('logger');
    logger.debug(message);
  }

  logMigration(message: string): void {
    const logger = this.container.resolve<Logger>('logger');
    logger.debug(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any): void {
    const logger = this.container.resolve<Logger>('logger');
    logger.log(level, message);
  }
}
