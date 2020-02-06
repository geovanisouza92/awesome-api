import fs from 'fs';
import path from 'path';
import { fromKey } from '../../modules/environment';

const readFile = (name: string): string => fs.readFileSync(path.resolve(__dirname, name), 'utf8');
const publicKey = readFile('../keys/dev-only-public-key.pem');
const privateKey = readFile('../keys/dev-only-private-key.pem');

export const Environment = {
  http: {
    port: fromKey('PORT')
      .asNumber()
      .defaultTo(3000),
    logLevel: 'tiny',
  },
  database: {
    url: fromKey('DATABASE_URL').defaultTo('postgres://postgres:postgres@localhost:5432/awesome_api_test'),
  },
  logger: {
    level: 'warn',
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
