import http from 'http';
import { AddressInfo } from 'net';
import { Logger } from 'winston';
import { mountModulesForRest } from '../../app/rest';
import { createAppAndContainer } from '../../app/setup';
import { getEnvironment } from '../../config/environment';

const environment = getEnvironment();
const { app, container } = createAppAndContainer(environment);
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
