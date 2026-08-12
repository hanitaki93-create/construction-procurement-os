import { loadRuntimeConfig } from '@cpos/config';
import { createDatabaseRuntime, type DatabaseRuntime } from '@cpos/database-core';
import { createTechnicalLogger, startTechnicalTelemetry } from '@cpos/observability';
import { createGovernedPlatformWorkspaceService } from '@cpos/platform-application';

import { buildApi } from './app.js';
import { createDevelopmentPlatformWorkspaceService } from './development-platform.js';

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

const productDemoEnabled =
  config.build.environment !== 'production' &&
  process.env['CPOS_DEMO_MODE']?.trim().toLowerCase() === 'true';
const databaseUrl = process.env['DATABASE_URL']?.trim();
let databaseRuntime: DatabaseRuntime | undefined;

const platformWorkspaceService = productDemoEnabled
  ? createDevelopmentPlatformWorkspaceService()
  : databaseUrl
    ? (() => {
        databaseRuntime = createDatabaseRuntime({
          connectionString: databaseUrl,
          maximumConnections: 12,
          idleTimeoutMs: 10_000,
          connectionTimeoutMs: 5_000,
          statementTimeoutMs: 20_000,
          applicationName: 'cpos-api-platform',
        });
        return createGovernedPlatformWorkspaceService(databaseRuntime);
      })()
    : undefined;

const app = buildApi({
  config,
  logger,
  ...(platformWorkspaceService === undefined ? {} : { platformWorkspaceService }),
});
let closing = false;

async function shutdown(signal: string): Promise<void> {
  if (closing) return;
  closing = true;
  logger.info('api_shutdown_started', { signal });
  await app.close();
  if (databaseRuntime !== undefined) await databaseRuntime.close();
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
    productDemoEnabled,
    governedWorkspaceEnabled: !productDemoEnabled && databaseRuntime !== undefined,
  });
} catch (error: unknown) {
  logger.error('api_start_failed', { error });
  process.exitCode = 1;
  await app.close();
  if (databaseRuntime !== undefined) await databaseRuntime.close();
  await telemetry.shutdown();
}
