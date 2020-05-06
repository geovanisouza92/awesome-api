import http from 'http';
import { AddressInfo } from 'net';
import { getConfig } from '../../config';
import { useRest } from '../../src/app/rest';
import { createAppContainer, createAppRouter } from '../../src/app/setup';
import { Logger } from '../../src/infrastructure/logging';

const config = getConfig();
const container = createAppContainer(config);
const app = createAppRouter(config, container);
useRest(container, app);

const logger = container.resolve<Logger>('logger');
const server = http.createServer(app);

server.listen(app.get('port'), () => {
  const { address, port } = server.address() as AddressInfo;
  logger.info(`Running on ${address}:${port}`);
});

process.on('SIGINT', () => {
  server.close(async () => {
    await container.dispose();
    logger.info('Server stopped gracefully');
  });
});
