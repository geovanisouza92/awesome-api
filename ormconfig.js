/* eslint-disable @typescript-eslint/no-var-requires */

const { getEnvironment } = require('./config/environment');
const { getConnectionOptions } = require('./helpers/database');

module.exports = {
  ...getConnectionOptions(getEnvironment()),
  // "logging": false,
  "cli": {
    "migrationsDir": "src/migration"
  }
};
