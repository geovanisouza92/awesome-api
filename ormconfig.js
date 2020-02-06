/* eslint-disable @typescript-eslint/no-var-requires */

const { getEnvironment } = require('./config/environment');
const { getConnectionOptions } = require('./helpers/database');

const environment = getEnvironment();

module.exports = {
  ...getConnectionOptions(environment.database.url),
  // "logging": false,
  cli: {
    migrationsDir: 'src/migration',
  },
};
