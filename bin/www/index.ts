import { asValue, createContainer } from 'awilix';
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
import { mountHealthcheckModule } from '../../components/healthcheck/interfaces/rest';
import { getEnvironment } from '../../config/environment';
import { mountDatabaseModule, openTransaction } from '../../infrastructure/database';
import { mountLoggingModule } from '../../infrastructure/logging';

async function main(): Promise<void> {
  const environment = getEnvironment();
  const container = await createContainer().register({
    environment: asValue(environment),
  });

  mountLoggingModule(container);
  mountDatabaseModule(container);

  const app = express()
    .use(morgan(environment.http.logLevel))
    .use(cors())
    .use(helmet())
    .use(compression())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(scopePerRequest(container))
    .use(openTransaction);
  // .use(checkAuthentication);

  mountHealthcheckModule(container, app);
  // mountAuthenticationModule(container, app);

  const logger = container.resolve('logger') as Logger;

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
