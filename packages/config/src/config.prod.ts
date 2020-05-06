import { fromKey } from '@awesome/config-parser';

export const Config = {
  http: {
    port: fromKey('PORT')
      .asNumber()
      .defaultTo(3000),
    logFormat: 'common',
  },
  database: {
    url: fromKey('DATABASE_URL').isRequired(),
  },
  logger: {
    level: 'error',
    format: 'json',
  },
  auth: {
    loginUrl: '/login',
    cookieName: 'awesome-api-token',
    publicKey: fromKey('JWT_PUBLIC_KEY').isRequired(),
    privateKey: fromKey('JWT_PRIVATE_KEY').isRequired(),
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '1 day',
      issuer: 'awesome-api',
    },
  },
};
