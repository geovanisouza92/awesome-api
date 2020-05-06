import { createAppRouter } from '@awesome/app-router';
import { createAppContainer, getConfig } from '@awesome/config';
import { Logger } from '@awesome/logging';
import http from 'http';
import { AddressInfo } from 'net';
import { useRest } from './rest';

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
