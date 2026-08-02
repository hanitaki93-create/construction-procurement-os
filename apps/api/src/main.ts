import { loadRuntimeConfig } from '@cpos/config';
import { createTechnicalLogger } from '@cpos/observability';

import { buildApi } from './app.js';

const config = loadRuntimeConfig('api');
const logger = createTechnicalLogger({ service: config.serviceName, minimumLevel: config.logLevel });
const app = buildApi({ config, logger });
let closing = false;

async function shutdown(signal: string): Promise<void> {
  if (closing) return;
  closing = true;
  logger.info('api_shutdown_started', { signal });
  await app.close();
  logger.info('api_shutdown_completed', { signal });
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void shutdown(signal).catch((error: unknown) => {
      logger.error('api_shutdown_failed', { signal, error });
      process.exitCode = 1;
    });
  });
}

try {
  await app.listen({ host: config.host, port: config.port });
  logger.info('api_started', { host: config.host, port: config.port, buildId: config.build.buildId });
} catch (error: unknown) {
  logger.error('api_start_failed', { error });
  process.exitCode = 1;
  await app.close();
}
