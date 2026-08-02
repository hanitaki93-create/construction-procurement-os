import { loadRuntimeConfig } from '@cpos/config';
import { createTechnicalLogger, startTechnicalTelemetry } from '@cpos/observability';

import { createWorkerRuntime } from './runtime.js';

const config = loadRuntimeConfig('worker');
const logger = createTechnicalLogger({
  service: config.serviceName,
  minimumLevel: config.logLevel,
});
const telemetry = await startTechnicalTelemetry({
  serviceName: config.serviceName,
  environment: config.build.environment,
  ...(config.otelEndpoint === undefined ? {} : { endpoint: config.otelEndpoint }),
});
const runtime = createWorkerRuntime({ logger });
const ready = await telemetry.runSpan('worker.startup', async () => runtime.start());
telemetry.addCounter('worker.startup', 1, { state: ready.state });

async function stop(signal: string): Promise<void> {
  logger.info('worker_shutdown_signal', { signal });
  runtime.stop();
  telemetry.addCounter('worker.shutdown', 1, { state: 'completed' });
  await telemetry.shutdown();
}

if (process.argv.includes('--check')) {
  logger.info('worker_check_pass', ready);
  await stop('check');
} else {
  const keepAlive = setInterval(() => {}, 60_000);
  let stopping = false;

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => {
      if (stopping) return;
      stopping = true;
      clearInterval(keepAlive);
      void stop(signal).catch((error: unknown) => {
        logger.error('worker_shutdown_failed', { signal, error });
        process.exitCode = 1;
      });
    });
  }
}
