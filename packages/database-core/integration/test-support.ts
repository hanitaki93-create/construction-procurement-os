import { randomUUID } from 'node:crypto';

import type { Pool } from 'pg';

import { createPrivatePool } from '../src/internal/pool.js';

export function requiredDatabaseUrl(): string {
  const value = process.env['DATABASE_URL'];
  if (!value) throw new Error('DATABASE_URL is required for PostgreSQL integration tests');
  return value;
}

export function createIntegrationPool(applicationName: string): Pool {
  return createPrivatePool({
    connectionString: requiredDatabaseUrl(),
    maximumConnections: 12,
    idleTimeoutMs: 1_000,
    connectionTimeoutMs: 5_000,
    statementTimeoutMs: 20_000,
    applicationName,
  });
}

export function uniqueSchema(prefix: string): string {
  const suffix = randomUUID().replaceAll('-', '').slice(0, 16);
  return `${prefix}_${suffix}`.toLowerCase();
}

export async function dropSchema(pool: Pool, schema: string): Promise<void> {
  if (!/^[a-z][a-z0-9_]{0,62}$/u.test(schema)) throw new Error('unsafe test schema');
  await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
}

export interface AsyncBarrier {
  arriveAndWait(): Promise<void>;
}

export function createBarrier(participants: number): AsyncBarrier {
  if (!Number.isSafeInteger(participants) || participants < 1) {
    throw new Error('participants must be positive');
  }
  let arrived = 0;
  let release: (() => void) | undefined;
  const promise = new Promise<void>((resolve) => {
    release = resolve;
  });
  return {
    arriveAndWait: async () => {
      arrived += 1;
      if (arrived === participants) release?.();
      await promise;
    },
  };
}

export function databaseErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined;
  const code = Reflect.get(error, 'code');
  return typeof code === 'string' ? code : undefined;
}
