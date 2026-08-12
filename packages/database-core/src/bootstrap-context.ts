export interface BootstrapExecutionContext {
  readonly authenticationIdentityId: string;
  readonly proposedTenantId: string;
  readonly operationKey: 'platform.tenant.bootstrap.v1';
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

function requireBoundedValue(value: string, field: string): void {
  if (!value.trim()) throw new Error(`${field} is required`);
  if (value.length > 512)
    throw new Error(`${field} exceeds the 512-character bootstrap-context bound`);
  if (value.includes('\u0000')) throw new Error(`${field} contains a NUL character`);
}

function requireUuidV7(value: string, field: string): void {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value)) {
    throw new Error(`${field} must be a UUIDv7`);
  }
}

export function validateBootstrapExecutionContext(context: BootstrapExecutionContext): void {
  requireBoundedValue(context.authenticationIdentityId, 'authenticationIdentityId');
  requireUuidV7(context.proposedTenantId, 'proposedTenantId');
  if (context.operationKey !== 'platform.tenant.bootstrap.v1') {
    throw new Error('bootstrap operationKey must be platform.tenant.bootstrap.v1');
  }
  requireBoundedValue(context.invocationId, 'invocationId');
  requireBoundedValue(context.serviceIdentity, 'serviceIdentity');
}
