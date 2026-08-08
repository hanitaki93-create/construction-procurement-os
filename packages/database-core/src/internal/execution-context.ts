import type { Pool } from 'pg';

import type {
  DatabaseExecutionContext,
  DatabaseExecutionTransactionOptions,
} from '../execution-context.js';
import { validateDatabaseExecutionContext } from '../execution-context.js';
import type { PersistenceAdapterToken } from '../persistence.js';
import {
  createTransactionSqlExecutor,
  deactivateTransactionSqlExecutor,
  resolvePersistenceAdapter,
} from './persistence-registry.js';
import { withPrivateTransaction } from './transaction.js';

const contextSettings = [
  ['cpos.tenant_id', 'tenantId'],
  ['cpos.principal_id', 'principalId'],
  ['cpos.represented_principal_id', 'representedPrincipalId'],
  ['cpos.project_id', 'projectId'],
  ['cpos.authority_context_id', 'authorityContextId'],
  ['cpos.operation_key', 'operationKey'],
  ['cpos.invocation_id', 'invocationId'],
  ['cpos.service_identity', 'serviceIdentity'],
] as const;

type ContextSettingKey = (typeof contextSettings)[number][1];

function contextValue(context: DatabaseExecutionContext, key: ContextSettingKey): string {
  const value = context[key];
  return value === undefined ? '' : value;
}

function quoteLiteral(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function quoteIdentifier(value: string): string {
  if (!/^[a-z][a-z0-9_]{0,62}$/u.test(value)) {
    throw new Error('database role is not a safe PostgreSQL identifier');
  }
  return `"${value}"`;
}

export async function withExecutionContextTransaction<Handle, Result>(
  pool: Pool,
  context: DatabaseExecutionContext,
  transactionOptions: DatabaseExecutionTransactionOptions,
  adapterToken: PersistenceAdapterToken<Handle>,
  callback: (handle: Handle) => Promise<Result>,
): Promise<Result> {
  validateDatabaseExecutionContext(context);
  const adapter = resolvePersistenceAdapter<Handle>(adapterToken);
  if (
    adapter.moduleKey !== adapterToken.moduleKey ||
    adapter.databaseRole !== adapterToken.databaseRole
  ) {
    throw new Error('persistence adapter token metadata mismatch');
  }

  return withPrivateTransaction(pool, transactionOptions, async (transaction) => {
    for (const [setting, key] of contextSettings) {
      await transaction.query(
        `SET LOCAL ${setting} TO ${quoteLiteral(contextValue(context, key))}`,
      );
    }
    await transaction.query(`SET LOCAL cpos.module_key TO ${quoteLiteral(adapter.moduleKey)}`);

    const result = await transaction.query<{
      tenant_id: string;
      principal_id: string;
      represented_principal_id: string;
      project_id: string;
      authority_context_id: string;
      operation_key: string;
      invocation_id: string;
      service_identity: string;
      module_key: string;
    }>(`
      SELECT
        current_setting('cpos.tenant_id', true) AS tenant_id,
        current_setting('cpos.principal_id', true) AS principal_id,
        current_setting('cpos.represented_principal_id', true) AS represented_principal_id,
        current_setting('cpos.project_id', true) AS project_id,
        current_setting('cpos.authority_context_id', true) AS authority_context_id,
        current_setting('cpos.operation_key', true) AS operation_key,
        current_setting('cpos.invocation_id', true) AS invocation_id,
        current_setting('cpos.service_identity', true) AS service_identity,
        current_setting('cpos.module_key', true) AS module_key
    `);

    const observed = result.rows[0];
    if (observed === undefined) throw new Error('execution context read-back returned no row');

    const expected = {
      tenant_id: context.tenantId,
      principal_id: context.principalId,
      represented_principal_id: context.representedPrincipalId ?? '',
      project_id: context.projectId ?? '',
      authority_context_id: context.authorityContextId ?? '',
      operation_key: context.operationKey,
      invocation_id: context.invocationId,
      service_identity: context.serviceIdentity,
      module_key: adapter.moduleKey,
    };

    for (const [key, expectedValue] of Object.entries(expected)) {
      const actual = observed[key as keyof typeof observed];
      if (actual !== expectedValue) {
        throw new Error(`execution context read-back mismatch for ${key}`);
      }
    }

    await transaction.query(`SET LOCAL ROLE ${quoteIdentifier(adapter.databaseRole)}`);
    const roleResult = await transaction.query<{ current_user: string }>(
      'SELECT current_user AS current_user',
    );
    if (roleResult.rows[0]?.current_user !== adapter.databaseRole) {
      throw new Error('database module role establishment failed');
    }

    const executor = createTransactionSqlExecutor(transaction);
    try {
      const handle = adapter.buildHandle(executor);
      return await callback(handle);
    } finally {
      deactivateTransactionSqlExecutor(executor);
    }
  });
}
