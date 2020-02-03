import { scopePerRequest } from 'awilix-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import { Logger } from 'winston';
import { mountApplication } from '../../components';
import { checkAuthentication, mountAuthenticationApi } from '../../components/authentication/interfaces/rest';
import { mountHealthcheckApi } from '../../components/healthcheck/interfaces/rest';
import { Environment } from '../../config/environment';
import { openTransaction } from '../../infrastructure/database';

async function main(): Promise<void> {
  const container = await mountApplication();
  const environment = container.resolve('environment') as typeof Environment;
  const logger = container.resolve('logger') as Logger;

  const app = express()
    .use(morgan(environment.http.logLevel))
    .use(cors())
    .use(helmet())
    .use(compression())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(scopePerRequest(container))
    .use(openTransaction)
    .use(checkAuthentication);

  mountHealthcheckApi(app);
  mountAuthenticationApi(app);

  const server = app.listen(environment.http.port, () => {
    logger.info('Foi');
  });

  process.on('SIGINT', () => {
    server.close(async () => {
      await container.dispose();
      logger.info('Morreu');
    });
  });
}

main();
