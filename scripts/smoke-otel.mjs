import { setTimeout as delay } from 'node:timers/promises';

import { startTechnicalTelemetry } from '../packages/observability/dist/index.js';

const endpoint = process.env['OTEL_EXPORTER_OTLP_ENDPOINT'];
if (!endpoint) throw new Error('OTEL_EXPORTER_OTLP_ENDPOINT is required');

const telemetry = await startTechnicalTelemetry({
  serviceName: 'cpos-b01-otel-smoke',
  environment: 'integration',
  endpoint,
  exportIntervalMs: 1_000,
});

await telemetry.runSpan('f4.collector', async () => {
  telemetry.addCounter('f4.collector', 1, { state: 'ready' });
  await delay(100);
});
await delay(1_200);
await telemetry.shutdown();
process.stdout.write('CPOS_OTEL_COLLECTOR_SMOKE_SENT\n');
