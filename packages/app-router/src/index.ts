import { Config } from '@awesome/config';
import { currentRequestId, defineRequestId, useScopedContainerPerRequest } from '@awesome/http-common';
import { Logger } from '@awesome/logging';
import { AwilixContainer } from 'awilix';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

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
