import { Kysely, PostgresDialect, sql } from 'kysely';
import type { Pool } from 'pg';

import { scanDatabaseCatalog, type CatalogFinding } from './internal/catalog-scan.js';
import {
  migrationStatus,
  runMigrations,
  type MigrationResult,
  type MigrationStatus,
} from './internal/migrations.js';
import { createPrivatePool, type PrivatePoolOptions } from './internal/pool.js';

interface EmptyTechnicalDatabase {}

export interface DatabaseRuntimeOptions extends PrivatePoolOptions {}

export interface DatabaseHealth {
  readonly state: 'ok' | 'unavailable';
  readonly serverVersion?: string;
  readonly checkedAt: string;
  readonly detail?: string;
}

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
        return {
          state: 'ok',
          serverVersion: result.rows[0]?.server_version,
          checkedAt,
        };
      } catch (error: unknown) {
        return { state: 'unavailable', checkedAt, detail: normalizeError(error) };
      }
    },
    migrationStatus: (migrationOptions) => migrationStatus(pool, migrationOptions),
    migrate: (migrationOptions) => runMigrations(pool, migrationOptions),
    scanCatalog: () => scanDatabaseCatalog(pool),
    close: async () => database.destroy(),
  };
}

export type { CatalogFinding, CatalogFindingKind } from './internal/catalog-scan.js';
export type {
  AppliedMigration,
  MigrationFile,
  MigrationResult,
  MigrationStatus,
} from './internal/migrations.js';
