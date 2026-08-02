import type { TechnicalLogger } from '@cpos/observability';

export const workerLanes = [
  'interactive-nearline',
  'routine-domain',
  'evidence',
  'connector-email',
  'reconciliation',
  'report-export',
  'search',
] as const;

export type WorkerLane = (typeof workerLanes)[number];
export type WorkerState = 'created' | 'starting' | 'ready' | 'stopping' | 'stopped';

export interface WorkerSnapshot {
  readonly state: WorkerState;
  readonly checkedAt: string;
  readonly lanes: readonly WorkerLane[];
  readonly registeredJobs: 0;
}

export interface WorkerRuntime {
  start(): WorkerSnapshot;
  stop(): WorkerSnapshot;
  snapshot(): WorkerSnapshot;
}

export function createWorkerRuntime(options: {
  readonly logger: TechnicalLogger;
  readonly now?: () => Date;
}): WorkerRuntime {
  const now = options.now ?? (() => new Date());
  let state: WorkerState = 'created';

  const snapshot = (): WorkerSnapshot => ({
    state,
    checkedAt: now().toISOString(),
    lanes: workerLanes,
    registeredJobs: 0,
  });

  return {
    start: () => {
      if (state !== 'created' && state !== 'stopped') {
        throw new Error(`worker cannot start from ${state}`);
      }
      state = 'starting';
      options.logger.info('worker_starting', { lanes: workerLanes });
      state = 'ready';
      options.logger.info('worker_ready', { registeredJobs: 0 });
      return snapshot();
    },
    stop: () => {
      if (state === 'stopped') return snapshot();
      state = 'stopping';
      options.logger.info('worker_stopping');
      state = 'stopped';
      options.logger.info('worker_stopped');
      return snapshot();
    },
    snapshot,
  };
}
