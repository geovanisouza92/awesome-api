import { SignOptions } from "jsonwebtoken";

export const Environment = {
  http: {
    port: 3000,
    logLevel: 'tiny',
  },
  database: {
    url: 'postgres://postgres:postgres@localhost:5432/awesome_api_test',
  },
  logger: {
    level: 'warn',
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
