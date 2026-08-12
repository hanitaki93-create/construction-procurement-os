import type { Pool } from 'pg';

import {
  validateBootstrapExecutionContext,
  type BootstrapExecutionContext,
} from '../bootstrap-context.js';
import type { DatabaseExecutionTransactionOptions } from '../execution-context.js';
import type { PersistenceAdapterToken } from '../persistence.js';
import {
  createTransactionSqlExecutor,
  deactivateTransactionSqlExecutor,
  resolvePersistenceAdapter,
} from './persistence-registry.js';
import { withPrivateTransaction } from './transaction.js';

function quoteLiteral(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function quoteIdentifier(value: string): string {
  if (!/^[a-z][a-z0-9_]{0,62}$/u.test(value)) {
    throw new Error('database role is not a safe PostgreSQL identifier');
  }
  return `"${value}"`;
}

export async function withBootstrapContextTransaction<Handle, Result>(
  pool: Pool,
  context: BootstrapExecutionContext,
  transactionOptions: DatabaseExecutionTransactionOptions,
  adapterToken: PersistenceAdapterToken<Handle>,
  callback: (handle: Handle) => Promise<Result>,
): Promise<Result> {
  validateBootstrapExecutionContext(context);
  const adapter = resolvePersistenceAdapter<Handle>(adapterToken);
  if (
    adapter.moduleKey !== adapterToken.moduleKey ||
    adapter.databaseRole !== adapterToken.databaseRole ||
    adapter.executionScope !== adapterToken.executionScope
  ) {
    throw new Error('persistence adapter token metadata mismatch');
  }
  if (adapter.executionScope !== 'BOOTSTRAP') {
    throw new Error('bootstrap execution context requires a BOOTSTRAP persistence adapter');
  }

  return withPrivateTransaction(pool, transactionOptions, async (transaction) => {
    const clearedTenantSettings = [
      'cpos.tenant_id',
      'cpos.principal_id',
      'cpos.represented_principal_id',
      'cpos.project_id',
      'cpos.authority_context_id',
    ] as const;
    for (const setting of clearedTenantSettings) {
      await transaction.query(`SET LOCAL ${setting} TO ''`);
    }

    await transaction.query(
      `SET LOCAL cpos.authentication_identity_id TO ${quoteLiteral(context.authenticationIdentityId)}`,
    );
    await transaction.query(
      `SET LOCAL cpos.proposed_tenant_id TO ${quoteLiteral(context.proposedTenantId)}`,
    );
    await transaction.query(
      `SET LOCAL cpos.operation_key TO ${quoteLiteral(context.operationKey)}`,
    );
    await transaction.query(
      `SET LOCAL cpos.invocation_id TO ${quoteLiteral(context.invocationId)}`,
    );
    await transaction.query(
      `SET LOCAL cpos.service_identity TO ${quoteLiteral(context.serviceIdentity)}`,
    );
    await transaction.query(`SET LOCAL cpos.module_key TO ${quoteLiteral(adapter.moduleKey)}`);

    const result = await transaction.query<{
      tenant_id: string;
      principal_id: string;
      represented_principal_id: string;
      project_id: string;
      authority_context_id: string;
      authentication_identity_id: string;
      proposed_tenant_id: string;
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
        current_setting('cpos.authentication_identity_id', true) AS authentication_identity_id,
        current_setting('cpos.proposed_tenant_id', true) AS proposed_tenant_id,
        current_setting('cpos.operation_key', true) AS operation_key,
        current_setting('cpos.invocation_id', true) AS invocation_id,
        current_setting('cpos.service_identity', true) AS service_identity,
        current_setting('cpos.module_key', true) AS module_key
    `);

    const observed = result.rows[0];
    if (observed === undefined) throw new Error('bootstrap context read-back returned no row');

    const expected = {
      tenant_id: '',
      principal_id: '',
      represented_principal_id: '',
      project_id: '',
      authority_context_id: '',
      authentication_identity_id: context.authenticationIdentityId,
      proposed_tenant_id: context.proposedTenantId,
      operation_key: context.operationKey,
      invocation_id: context.invocationId,
      service_identity: context.serviceIdentity,
      module_key: adapter.moduleKey,
    };

    for (const [key, expectedValue] of Object.entries(expected)) {
      const actual = observed[key as keyof typeof observed];
      if (actual !== expectedValue) {
        throw new Error(`bootstrap context read-back mismatch for ${key}`);
      }
    }

    await transaction.query(`SET LOCAL ROLE ${quoteIdentifier(adapter.databaseRole)}`);
    const roleResult = await transaction.query<{ current_user: string }>(
      'SELECT current_user AS current_user',
    );
    if (roleResult.rows[0]?.current_user !== adapter.databaseRole) {
      throw new Error('database bootstrap role establishment failed');
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
