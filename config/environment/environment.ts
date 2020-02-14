import fs from 'fs';
import path from 'path';
import { fromKey } from '../../lib/environment';

const readFile = (name: string): string => fs.readFileSync(path.resolve(__dirname, name), 'utf8');
const publicKey = readFile('../keys/dev-only-public-key.pem');
const privateKey = readFile('../keys/dev-only-private-key.pem');

export const Environment = {
  http: {
    port: fromKey('PORT')
      .asNumber()
      .defaultTo(3000),
    logFormat: 'dev',
  },
  database: {
    url: fromKey('DATABASE_URL').defaultTo('postgres://postgres:postgres@localhost:5432/awesome_api'),
  },
  logger: {
    level: 'debug',
    format: 'pretty',
  },
  auth: {
    loginUrl: '/login',
    cookieName: 'awesome-api-token',
    publicKey: fromKey('JWT_PUBLIC_KEY').defaultTo(publicKey),
    privateKey: fromKey('JWT_PRIVATE_KEY').defaultTo(privateKey),
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '1 day',
      issuer: 'awesome-api',
    },
  },
};
