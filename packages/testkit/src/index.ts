export interface Deferred<T> {
  readonly promise: Promise<T>;
  readonly resolve: (value: T | PromiseLike<T>) => void;
  readonly reject: (reason?: unknown) => void;
}

export function createDeferred<T>(): Deferred<T> {
  let resolve!: Deferred<T>['resolve'];
  let reject!: Deferred<T>['reject'];
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

export async function withBoundedTimeout<T>(
  operation: Promise<T>,
  timeoutMilliseconds: number,
  label: string,
): Promise<T> {
  if (!Number.isSafeInteger(timeoutMilliseconds) || timeoutMilliseconds <= 0) {
    throw new Error('timeoutMilliseconds must be a positive safe integer');
  }
  if (!label.trim()) throw new Error('timeout label must not be empty');

  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`${label} exceeded ${timeoutMilliseconds}ms`));
    }, timeoutMilliseconds);
  });

  try {
    return await Promise.race([operation, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export interface ParticipantBarrier {
  readonly wait: () => Promise<void>;
}

export function createParticipantBarrier(
  participantCount: number,
): ParticipantBarrier {
  if (!Number.isSafeInteger(participantCount) || participantCount < 1) {
    throw new Error('participantCount must be a positive safe integer');
  }

  const release = createDeferred<void>();
  let arrived = 0;

  return {
    async wait(): Promise<void> {
      arrived += 1;
      if (arrived > participantCount) {
        throw new Error('barrier participant count exceeded');
      }
      if (arrived === participantCount) release.resolve();
      await release.promise;
    },
  };
}

export function canonicalTestSchemaName(
  prefix: string,
  uniqueToken: string,
): string {
  const normalizedPrefix = prefix
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_]/gu, '_');
  const normalizedToken = uniqueToken
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9_]/gu, '_');

  if (!normalizedPrefix || !normalizedToken) {
    throw new Error('test schema prefix and token must not be empty');
  }

  const schema = `testkit_${normalizedPrefix}_${normalizedToken}`;
  if (schema.length > 63) {
    throw new Error('test schema name exceeds PostgreSQL identifier limit');
  }
  return schema;
}
