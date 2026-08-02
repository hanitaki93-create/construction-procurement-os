import { loadRuntimeConfig } from '@cpos/config';
import { createTechnicalLogger } from '@cpos/observability';

import { createWorkerRuntime } from './runtime.js';

const config = loadRuntimeConfig('worker');
const logger = createTechnicalLogger({
  service: config.serviceName,
  minimumLevel: config.logLevel,
});
const runtime = createWorkerRuntime({ logger });
const ready = runtime.start();

if (process.argv.includes('--check')) {
  logger.info('worker_check_pass', ready);
  runtime.stop();
} else {
  const keepAlive = setInterval(() => {}, 60_000);
  let stopping = false;

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => {
      if (stopping) return;
      stopping = true;
      clearInterval(keepAlive);
      logger.info('worker_shutdown_signal', { signal });
      runtime.stop();
    });
  }
}
