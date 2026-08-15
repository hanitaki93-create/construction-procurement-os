import { loadRuntimeConfig } from '@cpos/config';
import { createDatabaseRuntime, type DatabaseRuntime } from '@cpos/database-core';
import { createTechnicalLogger, startTechnicalTelemetry } from '@cpos/observability';
import {
  createGovernedPlatformWorkspaceService,
  createGovernedProcurementService,
  type GovernedPlatformWorkspaceService,
  type GovernedProcurementService,
} from '@cpos/platform-application';
import {
  createGovernedProcurementSourcingService,
  type GovernedProcurementSourcingService,
} from '@cpos/platform-application/procurement-sourcing';
import {
  createGovernedProcurementResponseService,
  type GovernedProcurementResponseService,
} from '@cpos/platform-application/procurement-responses';
import {
  createGovernedProcurementComparisonService,
  type GovernedProcurementComparisonService,
} from '@cpos/platform-application/procurement-comparison';
import {
  createGovernedProcurementDecisionService,
  type GovernedProcurementDecisionService,
} from '@cpos/platform-application/procurement-decision';
import {
  createGovernedProcurementDecisionDraftService,
  type GovernedProcurementDecisionDraftService,
} from '@cpos/platform-application/procurement-decision-draft';

import { buildApi } from './app.js';
import { createDevelopmentPlatformWorkspaceService } from './development-platform.js';
import { registerProcurementComparisonRoutes } from './procurement-comparison-routes.js';
import { registerProcurementDecisionDraftRoutes } from './procurement-decision-draft-routes.js';
import { registerProcurementDecisionRoutes } from './procurement-decision-routes.js';
import { registerProcurementResponseRoutes } from './procurement-response-routes.js';
import { registerProcurementSourcingRoutes } from './procurement-sourcing-routes.js';

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
let platformWorkspaceService: GovernedPlatformWorkspaceService | undefined;
let procurementService: GovernedProcurementService | undefined;
let procurementSourcingService: GovernedProcurementSourcingService | undefined;
let procurementResponseService: GovernedProcurementResponseService | undefined;
let procurementComparisonService: GovernedProcurementComparisonService | undefined;
let procurementDecisionService: GovernedProcurementDecisionService | undefined;
let procurementDecisionDraftService: GovernedProcurementDecisionDraftService | undefined;

if (productDemoEnabled) {
  platformWorkspaceService = createDevelopmentPlatformWorkspaceService();
} else if (databaseUrl) {
  databaseRuntime = createDatabaseRuntime({
    connectionString: databaseUrl,
    maximumConnections: 12,
    idleTimeoutMs: 10_000,
    connectionTimeoutMs: 5_000,
    statementTimeoutMs: 20_000,
    applicationName: 'cpos-api-v2',
  });
  platformWorkspaceService = createGovernedPlatformWorkspaceService(databaseRuntime);
  procurementService = createGovernedProcurementService(databaseRuntime);
  procurementSourcingService = createGovernedProcurementSourcingService(databaseRuntime);
  procurementResponseService = createGovernedProcurementResponseService(databaseRuntime);
  procurementComparisonService = createGovernedProcurementComparisonService(databaseRuntime);
  procurementDecisionService = createGovernedProcurementDecisionService(databaseRuntime);
  procurementDecisionDraftService = createGovernedProcurementDecisionDraftService(
    databaseRuntime,
    procurementDecisionService,
  );
}

const app = buildApi({
  config,
  logger,
  ...(platformWorkspaceService === undefined ? {} : { platformWorkspaceService }),
  ...(procurementService === undefined ? {} : { procurementService }),
});
if (procurementSourcingService !== undefined) {
  registerProcurementSourcingRoutes(app, {
    environment: config.build.environment,
    service: procurementSourcingService,
  });
}
if (procurementResponseService !== undefined) {
  registerProcurementResponseRoutes(app, {
    environment: config.build.environment,
    service: procurementResponseService,
  });
}
if (procurementComparisonService !== undefined) {
  registerProcurementComparisonRoutes(app, {
    environment: config.build.environment,
    service: procurementComparisonService,
  });
}
if (procurementDecisionService !== undefined) {
  registerProcurementDecisionRoutes(app, {
    environment: config.build.environment,
    service: procurementDecisionService,
  });
}
if (procurementDecisionDraftService !== undefined) {
  registerProcurementDecisionDraftRoutes(app, {
    environment: config.build.environment,
    service: procurementDecisionDraftService,
  });
}
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
    governedWorkspaceEnabled: platformWorkspaceService !== undefined,
    governedProcurementEnabled: procurementService !== undefined,
    governedSourcingEnabled: procurementSourcingService !== undefined,
    governedSupplierResponsesEnabled: procurementResponseService !== undefined,
    governedBidComparisonEnabled: procurementComparisonService !== undefined,
    governedProcurementDecisionEnabled: procurementDecisionService !== undefined,
    governedProcurementDecisionDraftEditingEnabled: procurementDecisionDraftService !== undefined,
  });
} catch (error: unknown) {
  logger.error('api_start_failed', { error });
  process.exitCode = 1;
  await app.close();
  if (databaseRuntime !== undefined) await databaseRuntime.close();
  await telemetry.shutdown();
}
