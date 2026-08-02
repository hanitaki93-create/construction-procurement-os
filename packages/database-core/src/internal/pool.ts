import { Pool, type PoolConfig } from 'pg';

import { assertExactPostgresTypeParsers } from './exact-types.js';

export interface PrivatePoolOptions {
  readonly connectionString: string;
  readonly maximumConnections: number;
  readonly idleTimeoutMs: number;
  readonly connectionTimeoutMs: number;
  readonly statementTimeoutMs: number;
  readonly applicationName: string;
}

export function createPrivatePool(options: PrivatePoolOptions): Pool {
  assertExactPostgresTypeParsers();
  const config: PoolConfig = {
    connectionString: options.connectionString,
    max: options.maximumConnections,
    idleTimeoutMillis: options.idleTimeoutMs,
    connectionTimeoutMillis: options.connectionTimeoutMs,
    statement_timeout: options.statementTimeoutMs,
    application_name: options.applicationName,
    allowExitOnIdle: true,
  };
  return new Pool(config);
}
