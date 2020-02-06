import { asValue, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import { Environment } from '../config/environment';
import { defineRequestId } from '../modules/request-id';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAppAndContainer(environment: Environment) {
  const container = createContainer().register({
    environment: asValue(environment),
  });

  const app = express()
    .set('port', environment.http.port)
    .use(defineRequestId)
    .use(morgan(environment.http.logLevel))
    .use(cors())
    .use(helmet())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(scopePerRequest(container));

  return { app, container };
}
