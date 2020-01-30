import { SignOptions } from "jsonwebtoken";

export const Environment = {
  http: {
    port: 3000,
    logLevel: 'dev',
  },
  database: {
    url: 'postgres://postgres:postgres@localhost:5432/awesome_api',
  },
  logger: {
    level: 'debug',
  },
  auth: {
    loginUrl: '/login',
    cookieName: 'awesome-api-token',
    publicKey: '',
    privateKey: '',
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '1 day',
      issuer: 'awesome-api',
    } as SignOptions
  },
};
