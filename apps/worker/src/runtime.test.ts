import { describe, expect, it } from 'vitest';

import { createTechnicalLogger } from '@cpos/observability';

import { createWorkerRuntime, workerLanes } from './runtime.js';

describe('B01 worker runtime', () => {
  it('registers the exact empty lane set and transitions cleanly', () => {
    const runtime = createWorkerRuntime({
      logger: createTechnicalLogger({ service: 'worker-test', minimumLevel: 'error', sink: () => {} }),
      now: () => new Date('2026-08-02T00:00:00.000Z'),
    });

    expect(new Set(workerLanes).size).toBe(workerLanes.length);
    expect(runtime.snapshot().state).toBe('created');
    expect(runtime.start()).toMatchObject({ state: 'ready', registeredJobs: 0 });
    expect(runtime.stop().state).toBe('stopped');
  });

  it('rejects duplicate starts while ready', () => {
    const runtime = createWorkerRuntime({
      logger: createTechnicalLogger({ service: 'worker-test', minimumLevel: 'error', sink: () => {} }),
    });
    runtime.start();
    expect(() => runtime.start()).toThrow(/cannot start/u);
  });
});
