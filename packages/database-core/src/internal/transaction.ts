import type { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

export type TransactionIsolation = 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';

export interface PrivateTransaction {
  readonly isolation: TransactionIsolation;
  query<Row extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: readonly unknown[],
  ): Promise<QueryResult<Row>>;
}

export interface TransactionOptions {
  readonly isolation: TransactionIsolation;
  readonly logicalIdentity: string;
  readonly preEffectSafeRetryMaximum?: number;
  readonly retryJitterMs?: number;
}

export class TransactionConflictError extends Error {
  public constructor(
    public readonly code: 'SERIALIZATION_FAILURE' | 'DEADLOCK_DETECTED' | 'RETRY_EXHAUSTED',
    message: string,
    public readonly attempts: number,
  ) {
    super(message);
    this.name = 'TransactionConflictError';
  }
}

const isolationSql: Readonly<Record<TransactionIsolation, string>> = {
  'READ COMMITTED': 'SET TRANSACTION ISOLATION LEVEL READ COMMITTED',
  'REPEATABLE READ': 'SET TRANSACTION ISOLATION LEVEL REPEATABLE READ',
  SERIALIZABLE: 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE',
};

function databaseErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined;
  const code = Reflect.get(error, 'code');
  return typeof code === 'string' ? code : undefined;
}

function retryCode(
  code: string | undefined,
): 'SERIALIZATION_FAILURE' | 'DEADLOCK_DETECTED' | undefined {
  if (code === '40001') return 'SERIALIZATION_FAILURE';
  if (code === '40P01') return 'DEADLOCK_DETECTED';
  return undefined;
}

async function rollbackQuietly(client: PoolClient): Promise<void> {
  try {
    await client.query('ROLLBACK');
  } catch {
    // The original transaction error remains authoritative.
  }
}

export async function withPrivateTransaction<Result>(
  pool: Pool,
  options: TransactionOptions,
  callback: (transaction: PrivateTransaction) => Promise<Result>,
): Promise<Result> {
  if (!options.logicalIdentity.trim()) throw new Error('logicalIdentity is required');
  const retryMaximum = options.preEffectSafeRetryMaximum ?? 0;
  if (!Number.isSafeInteger(retryMaximum) || retryMaximum < 0 || retryMaximum > 3) {
    throw new Error('preEffectSafeRetryMaximum must be an integer from 0 to 3');
  }
  const jitter = options.retryJitterMs ?? 10;

  for (let attempt = 1; attempt <= retryMaximum + 1; attempt += 1) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(isolationSql[options.isolation]);
      const isolationResult = await client.query<{ transaction_isolation: string }>(
        "SELECT current_setting('transaction_isolation') AS transaction_isolation",
      );
      const observed = isolationResult.rows[0]?.transaction_isolation.toUpperCase();
      if (observed !== options.isolation) {
        throw new Error(
          `transaction isolation mismatch: requested ${options.isolation}, observed ${String(observed)}`,
        );
      }

      const transaction: PrivateTransaction = {
        isolation: options.isolation,
        query: (text, values = []) => client.query(text, [...values]),
      };
      const result = await callback(transaction);
      await client.query('COMMIT');
      return result;
    } catch (error: unknown) {
      await rollbackQuietly(client);
      const conflict = retryCode(databaseErrorCode(error));
      if (conflict === undefined) throw error;
      if (attempt > retryMaximum) {
        throw new TransactionConflictError(
          retryMaximum === 0 ? conflict : 'RETRY_EXHAUSTED',
          `transaction ${options.logicalIdentity} exhausted after ${attempt} attempt(s)`,
          attempt,
        );
      }
      await new Promise((resolve) => setTimeout(resolve, Math.min(jitter * attempt, 100)));
    } finally {
      client.release();
    }
  }

  throw new TransactionConflictError(
    'RETRY_EXHAUSTED',
    'unreachable retry state',
    retryMaximum + 1,
  );
}
