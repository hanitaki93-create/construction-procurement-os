import { loadRuntimeConfig } from '@cpos/config';
import { createTechnicalLogger, startTechnicalTelemetry } from '@cpos/observability';

import { buildApi } from './app.js';

const config = loadRuntimeConfig('api');
const logger = createTechnicalLogger({
  service: config.serviceName,
  minimumLevel: config.logLevel,
});
const telemetry = await startTechnicalTelemetry({
  serviceName: config.serviceName,
  environment: config.build.environment,
  ...(config.otelEndpoint === undefined ? {} : { endpoint: config.otelEndpoint }),
});
const app = buildApi({ config, logger });
let closing = false;

async function shutdown(signal: string): Promise<void> {
  if (closing) return;
  closing = true;
  logger.info('api_shutdown_started', { signal });
  await app.close();
  telemetry.addCounter('api.shutdown', 1, { state: 'completed' });
  await telemetry.shutdown();
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
  await telemetry.runSpan('api.startup', async () => {
    await app.listen({ host: config.host, port: config.port });
  });
  telemetry.addCounter('api.startup', 1, { state: 'ready' });
  logger.info('api_started', {
    host: config.host,
    port: config.port,
    buildId: config.build.buildId,
    telemetryEnabled: telemetry.enabled,
  });
} catch (error: unknown) {
  logger.error('api_start_failed', { error });
  process.exitCode = 1;
  await app.close();
  await telemetry.shutdown();
}
