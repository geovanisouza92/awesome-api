import { asValue, AwilixContainer, createContainer } from 'awilix';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import { Environment } from '../../config/environment';
import { scopePerRequest } from '../../lib/http';
import { currentRequestId, defineRequestId } from '../../lib/request-id';
import { Logger } from '../infrastructure/logging';

export function createAppContainer(environment: Environment): AwilixContainer {
  const container = createContainer().register({
    environment: asValue(environment),
  });

  return container;
}

export function createAppRouter(environment: Environment, container: AwilixContainer): express.Express {
  const app = express()
    .set('port', environment.http.port)
    .use(defineRequestId)
    .use(
      morgan(environment.http.logFormat, {
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
    .use(scopePerRequest(container));

  return app;
}
