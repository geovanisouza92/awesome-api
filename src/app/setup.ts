import { asValue, AwilixContainer, createContainer } from 'awilix';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import { Config } from '../../config';
import { useScopedContainerPerRequest } from '../../lib/http';
import { currentRequestId, defineRequestId } from '../../lib/request-id';
import { Logger } from '../infrastructure/logging';

export function createAppContainer(config: Config): AwilixContainer {
  const container = createContainer().register({
    config: asValue(config),
  });

  return container;
}

export function createAppRouter(config: Config, container: AwilixContainer): express.Express {
  const app = express()
    .set('port', config.http.port)
    .use(defineRequestId)
    .use(
      morgan(config.http.logFormat, {
        stream: {
          write(str: string): void {
            const logger = container.resolve<Logger>('logger');
            logger.info(str, { 'request-id': currentRequestId() });
          },
        },
      }),
    )
    .use(cors())
    .use(helmet())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(useScopedContainerPerRequest(container));

  return app;
}
