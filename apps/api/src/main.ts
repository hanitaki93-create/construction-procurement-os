import { loadRuntimeConfig } from '@cpos/config';
import { createDatabaseRuntime, type DatabaseRuntime } from '@cpos/database-core';
import { createTechnicalLogger, startTechnicalTelemetry } from '@cpos/observability';
import { createGovernedPlatformWorkspaceService } from '@cpos/platform-application';
import { createGovernedProcurementService } from '@cpos/procurement-application';
import { createClamdScanner, createS3VersionedObjectStore, type VersionedObjectStore } from '@cpos/object-store';

import { buildApi } from './app.js';
import { createDevelopmentPlatformWorkspaceService } from './development-platform.js';
import { createDevelopmentProcurementWorkspaceService } from './development-procurement.js';

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

const databaseOptions = databaseUrl
  ? {
      connectionString: databaseUrl,
      maximumConnections: 12,
      idleTimeoutMs: 10_000,
      connectionTimeoutMs: 5_000,
      statementTimeoutMs: 20_000,
      applicationName: 'cpos-api-product',
    }
  : undefined;
if (databaseOptions) databaseRuntime = createDatabaseRuntime(databaseOptions);

const platformWorkspaceService = productDemoEnabled
  ? createDevelopmentPlatformWorkspaceService()
  : databaseRuntime
    ? createGovernedPlatformWorkspaceService(databaseRuntime)
    : undefined;

let objectStore: VersionedObjectStore | undefined;
const objectStoreEndpoint=process.env['OBJECT_STORE_ENDPOINT']?.trim();
const objectStoreRegion=process.env['OBJECT_STORE_REGION']?.trim();
const objectStoreAccessKeyId=process.env['OBJECT_STORE_ACCESS_KEY_ID']?.trim();
const objectStoreSecretAccessKey=process.env['OBJECT_STORE_SECRET_ACCESS_KEY']?.trim();
const objectStoreBucket=process.env['OBJECT_STORE_BUCKET']?.trim();
const clamdHost=process.env['CLAMD_HOST']?.trim();
const clamdPort=Number(process.env['CLAMD_PORT'] ?? '3310');
const procurementInfrastructure = !productDemoEnabled && objectStoreEndpoint && objectStoreRegion && objectStoreAccessKeyId && objectStoreSecretAccessKey && objectStoreBucket && clamdHost
  ? (() => {
      objectStore=createS3VersionedObjectStore({endpoint:objectStoreEndpoint,region:objectStoreRegion,accessKeyId:objectStoreAccessKeyId,secretAccessKey:objectStoreSecretAccessKey,bucket:objectStoreBucket,forcePathStyle:(process.env['OBJECT_STORE_FORCE_PATH_STYLE'] ?? 'true').toLowerCase()==='true'});
      return {objectStore,malwareScanner:createClamdScanner({host:clamdHost,port:clamdPort,timeoutMs:Number(process.env['CLAMD_TIMEOUT_MS'] ?? '10000'),maximumBytes:Number(process.env['CLAMD_MAX_BYTES'] ?? String(25*1024*1024))})};
    })()
  : undefined;

const procurementWorkspaceService = productDemoEnabled
  ? createDevelopmentProcurementWorkspaceService()
  : databaseRuntime
    ? createGovernedProcurementService(databaseRuntime, procurementInfrastructure)
    : undefined;

const app = buildApi({
  config,
  logger,
  ...(platformWorkspaceService === undefined ? {} : { platformWorkspaceService }),
  ...(procurementWorkspaceService === undefined ? {} : { procurementWorkspaceService }),
});
let closing = false;

async function shutdown(signal: string): Promise<void> {
  if (closing) return;
  closing = true;
  logger.info('api_shutdown_started', { signal });
  await app.close();
  if (databaseRuntime !== undefined) await databaseRuntime.close();
  objectStore?.close();
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
    procurementWorkspaceEnabled: procurementWorkspaceService !== undefined,
    procurementArtifactInfrastructureEnabled: procurementInfrastructure !== undefined,
  });
} catch (error: unknown) {
  logger.error('api_start_failed', { error });
  process.exitCode = 1;
  await app.close();
  if (databaseRuntime !== undefined) await databaseRuntime.close();
  objectStore?.close();
  await telemetry.shutdown();
}
