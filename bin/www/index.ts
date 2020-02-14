import http from 'http';
import { AddressInfo } from 'net';
import { getEnvironment } from '../../config/environment';
import { mountModulesForRest } from '../../src/app/rest';
import { createAppContainer, createAppRouter } from '../../src/app/setup';
import { Logger } from '../../src/infrastructure/logging';

const environment = getEnvironment();
const container = createAppContainer(environment);
const app = createAppRouter(environment, container);
mountModulesForRest(container, app);

const logger = container.resolve<Logger>('logger');
const server = http.createServer(app);

server.listen(app.get('port'), () => {
  const { address, port } = server.address() as AddressInfo;
  logger.info(`Running on (${address}) port ${port}`);
});

process.on('SIGINT', () => {
  server.close(async () => {
    await container.dispose();
    logger.info('Server stopped gracefully');
  });
});
