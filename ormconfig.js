/* eslint-disable @typescript-eslint/no-var-requires */

const { getConfig } = require('./packages/config/src');
const { getConnectionOptions } = require('./packages/db-common/src');
const { useSchemas } = require('./packages/app/src/entities');

useSchemas();
const config = getConfig();

module.exports = getConnectionOptions(config.database.url);
