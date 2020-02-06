import http from 'http';
import { Logger } from 'winston';
import { mountModulesForRest } from '../../app/rest';
import { createAppAndContainer } from '../../app/setup';
import { getEnvironment } from '../../config/environment';

const environment = getEnvironment();
const { app, container } = createAppAndContainer(environment);
mountModulesForRest(container, app);

const logger = container.resolve('logger') as Logger;
const server = http.createServer(app);

server.listen(() => {
  logger.info('Running on port', app.get('port'));
});

process.on('SIGINT', () => {
  server.close(async () => {
    await container.dispose();
    logger.info('Server stopped gracefully');
  });
});
