import { Kysely, PostgresDialect, sql } from 'kysely';
import type { Pool } from 'pg';

import type {
  DatabaseExecutionContext,
  DatabaseExecutionTransactionOptions,
} from './execution-context.js';
import { withExecutionContextTransaction } from './internal/execution-context.js';
import { scanDatabaseCatalog, type CatalogFinding } from './internal/catalog-scan.js';
import {
  migrationStatus,
  runMigrations,
  type MigrationResult,
  type MigrationStatus,
} from './internal/migrations.js';
import { createPrivatePool, type PrivatePoolOptions } from './internal/pool.js';
import type { PersistenceAdapterToken } from './persistence.js';

type EmptyTechnicalDatabase = Record<string, never>;

export type DatabaseRuntimeOptions = PrivatePoolOptions;

export type DatabaseHealth =
  | Readonly<{
      state: 'ok';
      serverVersion: string;
      checkedAt: string;
    }>
  | Readonly<{
      state: 'unavailable';
      checkedAt: string;
      detail: string;
    }>;

export interface DatabaseRuntime {
  health(): Promise<DatabaseHealth>;
  migrationStatus(options: {
    readonly directory: string;
    readonly schema?: string;
  }): Promise<MigrationStatus>;
  migrate(options: {
    readonly directory: string;
    readonly buildId: string;
    readonly schema?: string;
  }): Promise<MigrationResult>;
  scanCatalog(): Promise<readonly CatalogFinding[]>;
  withExecutionContext<Handle, Result>(
    context: DatabaseExecutionContext,
    transactionOptions: DatabaseExecutionTransactionOptions,
    adapter: PersistenceAdapterToken<Handle>,
    callback: (handle: Handle) => Promise<Result>,
  ): Promise<Result>;
  close(): Promise<void>;
}

function normalizeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function createDatabaseRuntime(options: DatabaseRuntimeOptions): DatabaseRuntime {
  const pool: Pool = createPrivatePool(options);
  const database = new Kysely<EmptyTechnicalDatabase>({ dialect: new PostgresDialect({ pool }) });

  return {
    health: async () => {
      const checkedAt = new Date().toISOString();
      try {
        const result = await sql<{ server_version: string }>`
          SELECT current_setting('server_version') AS server_version
        `.execute(database);
        const serverVersion = result.rows[0]?.server_version;
        if (serverVersion === undefined) {
          throw new Error('PostgreSQL did not return server_version');
        }
        return { state: 'ok', serverVersion, checkedAt };
      } catch (error: unknown) {
        return { state: 'unavailable', checkedAt, detail: normalizeError(error) };
      }
    },
    migrationStatus: (migrationOptions) => migrationStatus(pool, migrationOptions),
    migrate: (migrationOptions) => runMigrations(pool, migrationOptions),
    scanCatalog: () => scanDatabaseCatalog(pool),
    withExecutionContext: (context, transactionOptions, adapter, callback) =>
      withExecutionContextTransaction(pool, context, transactionOptions, adapter, callback),
    close: async () => database.destroy(),
  };
}

export type {
  DatabaseExecutionContext,
  DatabaseExecutionTransactionOptions,
  ExecutionIsolation,
} from './execution-context.js';
export type { PersistenceAdapterToken } from './persistence.js';
export type { CatalogFinding, CatalogFindingKind } from './internal/catalog-scan.js';
export type {
  AppliedMigration,
  MigrationFile,
  MigrationResult,
  MigrationStatus,
} from './internal/migrations.js';
