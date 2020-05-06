/* eslint-disable @typescript-eslint/no-var-requires */

const { getConfig } = require('./config');
const { getConnectionOptions } = require('./src/infrastructure/database/connection-options');

const config = getConfig();

module.exports = getConnectionOptions(config.database.url);
