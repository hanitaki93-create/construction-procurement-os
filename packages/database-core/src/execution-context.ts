export type ExecutionIsolation = 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';

export interface DatabaseExecutionContext {
  readonly tenantId: string;
  readonly principalId: string;
  readonly representedPrincipalId?: string;
  readonly projectId?: string;
  readonly authorityContextId?: string;
  readonly operationKey: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface DatabaseExecutionTransactionOptions {
  readonly isolation: ExecutionIsolation;
  readonly logicalIdentity: string;
  readonly preEffectSafeRetryMaximum?: number;
  readonly retryJitterMs?: number;
}

function requireBoundedContextValue(value: string, field: string): void {
  if (!value.trim()) throw new Error(`${field} is required`);
  if (value.length > 512) throw new Error(`${field} exceeds the 512-character execution-context bound`);
  if (value.includes('\u0000')) throw new Error(`${field} contains a NUL character`);
}

export function validateDatabaseExecutionContext(context: DatabaseExecutionContext): void {
  requireBoundedContextValue(context.tenantId, 'tenantId');
  requireBoundedContextValue(context.principalId, 'principalId');
  requireBoundedContextValue(context.operationKey, 'operationKey');
  requireBoundedContextValue(context.invocationId, 'invocationId');
  requireBoundedContextValue(context.serviceIdentity, 'serviceIdentity');

  if (context.representedPrincipalId !== undefined) {
    requireBoundedContextValue(context.representedPrincipalId, 'representedPrincipalId');
  }
  if (context.projectId !== undefined) {
    requireBoundedContextValue(context.projectId, 'projectId');
  }
  if (context.authorityContextId !== undefined) {
    requireBoundedContextValue(context.authorityContextId, 'authorityContextId');
  }
}
