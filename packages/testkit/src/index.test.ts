import { describe, expect, it } from 'vitest';

import {
  canonicalTestSchemaName,
  createDeferred,
  createParticipantBarrier,
  withBoundedTimeout,
} from './index.js';

describe('testkit technical primitives', () => {
  it('resolves a deferred value', async () => {
    const deferred = createDeferred<string>();
    deferred.resolve('ready');
    await expect(deferred.promise).resolves.toBe('ready');
  });

  it('releases all participants only when the barrier is complete', async () => {
    const barrier = createParticipantBarrier(2);
    const first = barrier.wait();
    let firstReleased = false;
    void first.then(() => {
      firstReleased = true;
    });
    await Promise.resolve();
    expect(firstReleased).toBe(false);

    const second = barrier.wait();
    await expect(Promise.all([first, second])).resolves.toEqual([undefined, undefined]);
  });

  it('rejects operations that exceed their bounded timeout', async () => {
    const never = new Promise<never>(() => undefined);
    await expect(withBoundedTimeout(never, 5, 'hostile fixture')).rejects.toThrow(
      'hostile fixture exceeded 5ms',
    );
  });

  it('creates a PostgreSQL-safe isolated test schema name', () => {
    expect(canonicalTestSchemaName('Concurrency Guard', 'Run-01')).toBe(
      'testkit_concurrency_guard_run_01',
    );
  });

  it('rejects barrier over-subscription', async () => {
    const barrier = createParticipantBarrier(1);
    await barrier.wait();
    await expect(barrier.wait()).rejects.toThrow('barrier participant count exceeded');
  });
});
