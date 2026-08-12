import type { Pool } from 'pg';

export const tenantA = '019d8100-0000-7000-8000-000000000001';
export const tenantB = '019d8100-0000-7000-8000-000000000002';
export const legalA = '019d8100-0000-7000-8000-000000000003';
export const legalB = '019d8100-0000-7000-8000-000000000004';
export const authorityA = '019d8100-0000-7000-8000-000000000005';
export const authorityB = '019d8100-0000-7000-8000-000000000006';
export const ownerPrincipal = '019d8100-0000-7000-8000-000000000007';
export const procurementPrincipal = '019d8100-0000-7000-8000-000000000008';
export const reviewerPrincipal = '019d8100-0000-7000-8000-000000000009';
export const ownerMembership = '019d8100-0000-7000-8000-000000000010';
export const procurementMembership = '019d8100-0000-7000-8000-000000000011';
export const reviewerMembership = '019d8100-0000-7000-8000-000000000012';
export const ownerRole = '019d8100-0000-7000-8000-000000000013';
export const procurementRole = '019d8100-0000-7000-8000-000000000014';
export const reviewerRole = '019d8100-0000-7000-8000-000000000015';
export const subscriptionA = '019d8100-0000-7000-8000-000000000016';
export const projectA = '019d8100-0000-7000-8000-000000000017';
export const projectB = '019d8100-0000-7000-8000-000000000018';

export function procurementExecutionContext(
  tenantId: string,
  principalId: string,
  operationKey: string,
  invocationId: string,
  projectId = projectA,
  authorityContextId = authorityA,
) {
  return {
    tenantId,
    principalId,
    projectId,
    authorityContextId,
    operationKey,
    invocationId,
    serviceIdentity: 'api',
  };
}

export async function seedProcurementWaveFixture(pool: Pool): Promise<void> {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');

  await pool.query(
    `INSERT INTO platform.tenant (tenant_id, display_name)
     VALUES ($1, 'Tenant A'), ($2, 'Tenant B')`,
    [tenantA, tenantB],
  );
  await pool.query(
    `INSERT INTO platform.legal_entity (legal_entity_id, tenant_id)
     VALUES ($1, $2), ($3, $4)`,
    [legalA, tenantA, legalB, tenantB],
  );
  await pool.query(
    `INSERT INTO platform.legal_entity_version (
       legal_entity_id, tenant_id, version, legal_name, lifecycle_state, effective_period
     ) VALUES
       ($1, $2, 1, 'Tenant A Contracting LLC', 'ACTIVE', tstzrange('2026-01-01', NULL, '[)')),
       ($3, $4, 1, 'Tenant B Contracting LLC', 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [legalA, tenantA, legalB, tenantB],
  );
  await pool.query(
    `INSERT INTO platform.contracting_authority_context (authority_context_id, tenant_id, context_kind)
     VALUES ($1, $2, 'SINGLE_LEGAL_ENTITY'), ($3, $4, 'SINGLE_LEGAL_ENTITY')`,
    [authorityA, tenantA, authorityB, tenantB],
  );
  await pool.query(
    `INSERT INTO platform.contracting_authority_context_version (
       authority_context_id, tenant_id, version, primary_legal_entity_id, effective_period
     ) VALUES
       ($1, $2, 1, $3, tstzrange('2026-01-01', NULL, '[)')),
       ($4, $5, 1, $6, tstzrange('2026-01-01', NULL, '[)'))`,
    [authorityA, tenantA, legalA, authorityB, tenantB, legalB],
  );
  await pool.query(
    `INSERT INTO platform.principal (principal_id, tenant_id, principal_kind, display_name, lifecycle_state)
     VALUES
       ($1, $2, 'HUMAN', 'Workspace Owner', 'ACTIVE'),
       ($3, $2, 'HUMAN', 'Procurement Manager', 'ACTIVE'),
       ($4, $2, 'HUMAN', 'Commercial Reviewer', 'ACTIVE')`,
    [ownerPrincipal, tenantA, procurementPrincipal, reviewerPrincipal],
  );
  await pool.query(
    `INSERT INTO platform.tenant_membership (membership_id, tenant_id, principal_id)
     VALUES ($1,$2,$3),($4,$2,$5),($6,$2,$7)`,
    [
      ownerMembership,
      tenantA,
      ownerPrincipal,
      procurementMembership,
      procurementPrincipal,
      reviewerMembership,
      reviewerPrincipal,
    ],
  );
  await pool.query(
    `INSERT INTO platform.tenant_membership_version (membership_id, tenant_id, version, membership_state, effective_period)
     VALUES
       ($1,$2,1,'ACTIVE',tstzrange('2026-01-01',NULL,'[)')),
       ($3,$2,1,'ACTIVE',tstzrange('2026-01-01',NULL,'[)')),
       ($4,$2,1,'ACTIVE',tstzrange('2026-01-01',NULL,'[)'))`,
    [ownerMembership, tenantA, procurementMembership, reviewerMembership],
  );
  await pool.query(
    `INSERT INTO platform.role_assignment (role_assignment_id,tenant_id,membership_id,role_key)
     VALUES ($1,$2,$3,'OWNER'),($4,$2,$5,'PROCUREMENT_MANAGER'),($6,$2,$7,'COMMERCIAL_REVIEWER')`,
    [ownerRole, tenantA, ownerMembership, procurementRole, procurementMembership, reviewerRole, reviewerMembership],
  );
  await pool.query(
    `INSERT INTO platform.role_assignment_version (role_assignment_id,tenant_id,version,assignment_state,effective_period)
     VALUES
       ($1,$2,1,'ACTIVE',tstzrange('2026-01-01',NULL,'[)')),
       ($3,$2,1,'ACTIVE',tstzrange('2026-01-01',NULL,'[)')),
       ($4,$2,1,'ACTIVE',tstzrange('2026-01-01',NULL,'[)'))`,
    [ownerRole, tenantA, procurementRole, reviewerRole],
  );
  await pool.query(
    `INSERT INTO platform.project (project_id,tenant_id,authority_context_id)
     VALUES ($1,$2,$3),($4,$5,$6)`,
    [projectA, tenantA, authorityA, projectB, tenantB, authorityB],
  );
  await pool.query('BEGIN');
  try {
    await pool.query("SELECT set_config('cpos.tenant_id', $1, true)", [tenantA]);
    await pool.query("SELECT set_config('cpos.principal_id', $1, true)", [ownerPrincipal]);
    await pool.query(
      `INSERT INTO platform.project_version (
         project_id,tenant_id,version,project_code,display_name,lifecycle_state,effective_period
       ) VALUES ($1,$2,1,'UAQ-001','UAQ Villa','ACTIVE',tstzrange('2026-01-01',NULL,'[)'))`,
      [projectA, tenantA],
    );
    await pool.query('COMMIT');
  } catch (error: unknown) {
    await pool.query('ROLLBACK');
    throw error;
  }

  await pool.query('BEGIN');
  try {
    await pool.query(
      `INSERT INTO platform.tenant_subscription (tenant_subscription_id,tenant_id,commercial_channel)
       VALUES ($1,$2,'SELF_SERVICE')`,
      [subscriptionA, tenantA],
    );
    await pool.query(
      `INSERT INTO platform.subscription_lifecycle_occurrence (
         tenant_id,tenant_subscription_id,sequence,occurrence_kind,effective_at,actor_kind
       ) VALUES ($1,$2,1,'ACTIVATED','2026-01-01','SYSTEM')`,
      [tenantA, subscriptionA],
    );
    await pool.query(
      `UPDATE platform.tenant_entitlement_authority_guard
       SET guard_version=guard_version+1 WHERE tenant_id=$1`,
      [tenantA],
    );
    await pool.query('COMMIT');
  } catch (error: unknown) {
    await pool.query('ROLLBACK');
    throw error;
  }
}
