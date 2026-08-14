import path from 'node:path';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-v2-session02-sourcing');
const trackingSchema = uniqueSchema('v2_session02_sourcing_tracking');

const tenant = '019e1200-0000-7000-8000-000000000001';
const principal = '019e1200-0000-7000-8000-000000000002';
const legal = '019e1200-0000-7000-8000-000000000003';
const authority = '019e1200-0000-7000-8000-000000000004';
const projectA = '019e1200-0000-7000-8000-000000000005';
const projectB = '019e1200-0000-7000-8000-000000000006';
const membership = '019e1200-0000-7000-8000-000000000007';
const ownerRole = '019e1200-0000-7000-8000-000000000008';
const subscription = '019e1200-0000-7000-8000-000000000009';
const mrA = '019e1200-0000-7000-8000-000000000010';
const mrB = '019e1200-0000-7000-8000-000000000011';
const mrDirect = '019e1200-0000-7000-8000-000000000012';
const mrPackageTwo = '019e1200-0000-7000-8000-000000000013';
const lineA = '019e1200-0000-7000-8000-000000000014';
const lineB = '019e1200-0000-7000-8000-000000000015';
const lineDirect = '019e1200-0000-7000-8000-000000000016';
const linePackageTwo = '019e1200-0000-7000-8000-000000000017';
const routeA = '019e1200-0000-7000-8000-000000000018';
const routeB = '019e1200-0000-7000-8000-000000000019';
const routeDirect = '019e1200-0000-7000-8000-000000000020';
const routePackageTwo = '019e1200-0000-7000-8000-000000000021';
const packageA = '019e1200-0000-7000-8000-000000000022';
const packageTwo = '019e1200-0000-7000-8000-000000000023';
const scopeA = '019e1200-0000-7000-8000-000000000024';
const scopeTwo = '019e1200-0000-7000-8000-000000000025';
const rfqDirect = '019e1200-0000-7000-8000-000000000026';
const rfqPackage = '019e1200-0000-7000-8000-000000000027';

async function seedProjectVersion(projectId: string, projectCode: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `SELECT set_config('cpos.tenant_id', $1, true), set_config('cpos.principal_id', $2, true)`,
      [tenant, principal],
    );
    await client.query(
      `INSERT INTO platform.project_version (
         project_id, tenant_id, version, project_code, display_name, lifecycle_state, effective_period
       ) VALUES ($1, $2, 1, $3, $4, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
      [projectId, tenant, projectCode, `Project ${projectCode}`],
    );
    await client.query('COMMIT');
  } catch (error: unknown) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function activateTenant(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `INSERT INTO platform.tenant_subscription (tenant_subscription_id, tenant_id, commercial_channel)
       VALUES ($1, $2, 'SELF_SERVICE')`,
      [subscription, tenant],
    );
    await client.query(
      `INSERT INTO platform.subscription_lifecycle_occurrence (
         tenant_id, tenant_subscription_id, sequence, occurrence_kind, effective_at, actor_kind
       ) VALUES ($1, $2, 1, 'ACTIVATED', '2026-01-01', 'SYSTEM')`,
      [tenant, subscription],
    );
    await client.query(
      `UPDATE platform.tenant_entitlement_authority_guard
       SET guard_version = guard_version + 1
       WHERE tenant_id = $1`,
      [tenant],
    );
    await client.query('COMMIT');
  } catch (error: unknown) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function seedMr(input: {
  readonly mrId: string;
  readonly mrNumber: string;
  readonly projectId: string;
  readonly lineId: string;
  readonly quantity: string;
  readonly routeId: string;
  readonly route: 'PACKAGE_SOURCING' | 'COMPETITIVE_RFQ';
}): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.material_requisition (
       mr_id, tenant_id, project_id, mr_number, numbering_scope_key, requester_id,
       request_date, required_on_site_date, priority, subject, status, submitted_at, created_by
     ) VALUES (
       $1, $2, $3, $4, 'TEST', $5, DATE '2026-08-01', DATE '2026-09-15',
       'NORMAL', $4, 'APPROVED', '2026-08-02T00:00:00Z', $5
     )`,
    [input.mrId, tenant, input.projectId, input.mrNumber, principal],
  );
  await pool.query(
    `INSERT INTO procurement.material_requisition_line (
       mr_line_id, tenant_id, mr_id, line_no, entry_mode, line_type, description,
       requested_quantity, approved_quantity, uom_code, line_state
     ) VALUES ($1, $2, $3, 10, 'FREE_FORM', 'MATERIAL', $4, $5, $5, 'EA', 'APPROVED')`,
    [input.lineId, tenant, input.mrId, `${input.mrNumber} line`, input.quantity],
  );
  await pool.query(
    `INSERT INTO procurement.procurement_route_decision (
       route_decision_id, tenant_id, mr_line_id, policy_key, policy_version, route,
       justification, decided_by, is_current
     ) VALUES ($1, $2, $3, 'UAE_CONTRACTOR_STARTER', 1, $4, $5, $6, true)`,
    [
      input.routeId,
      tenant,
      input.lineId,
      input.route,
      input.route === 'PACKAGE_SOURCING' ? null : 'Competitive quotation required',
      principal,
    ],
  );
}

beforeAll(async () => {
  await runMigrations(pool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'v2-session02-sourcing-integration',
  });
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');

  await pool.query(`INSERT INTO platform.tenant (tenant_id, display_name) VALUES ($1, 'Sourcing Tenant')`, [tenant]);
  await pool.query(`INSERT INTO platform.legal_entity (legal_entity_id, tenant_id) VALUES ($1, $2)`, [legal, tenant]);
  await pool.query(
    `INSERT INTO platform.contracting_authority_context (authority_context_id, tenant_id, context_kind)
     VALUES ($1, $2, 'SINGLE_LEGAL_ENTITY')`,
    [authority, tenant],
  );
  await pool.query(
    `INSERT INTO platform.principal (principal_id, tenant_id, principal_kind, display_name, lifecycle_state)
     VALUES ($1, $2, 'HUMAN', 'Procurement Owner', 'ACTIVE')`,
    [principal, tenant],
  );
  await pool.query(
    `INSERT INTO platform.tenant_membership (membership_id, tenant_id, principal_id) VALUES ($1, $2, $3)`,
    [membership, tenant, principal],
  );
  await pool.query(
    `INSERT INTO platform.tenant_membership_version (membership_id, tenant_id, version, membership_state, effective_period)
     VALUES ($1, $2, 1, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [membership, tenant],
  );
  await pool.query(
    `INSERT INTO platform.role_assignment (role_assignment_id, tenant_id, membership_id, role_key)
     VALUES ($1, $2, $3, 'OWNER')`,
    [ownerRole, tenant, membership],
  );
  await pool.query(
    `INSERT INTO platform.role_assignment_version (role_assignment_id, tenant_id, version, assignment_state, effective_period)
     VALUES ($1, $2, 1, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [ownerRole, tenant],
  );
  await pool.query(
    `INSERT INTO platform.project (project_id, tenant_id, authority_context_id)
     VALUES ($1, $2, $3), ($4, $2, $3)`,
    [projectA, tenant, authority, projectB],
  );
  await seedProjectVersion(projectA, 'A-001');
  await seedProjectVersion(projectB, 'B-001');

  await activateTenant();

  await seedMr({ mrId: mrA, mrNumber: 'MR-A', projectId: projectA, lineId: lineA, quantity: '10', routeId: routeA, route: 'PACKAGE_SOURCING' });
  await seedMr({ mrId: mrB, mrNumber: 'MR-B', projectId: projectB, lineId: lineB, quantity: '10', routeId: routeB, route: 'PACKAGE_SOURCING' });
  await seedMr({ mrId: mrDirect, mrNumber: 'MR-DIRECT', projectId: projectA, lineId: lineDirect, quantity: '5', routeId: routeDirect, route: 'COMPETITIVE_RFQ' });
  await seedMr({ mrId: mrPackageTwo, mrNumber: 'MR-PKG2', projectId: projectA, lineId: linePackageTwo, quantity: '8', routeId: routePackageTwo, route: 'PACKAGE_SOURCING' });

  await pool.query(
    `INSERT INTO procurement.procurement_package (
       package_id, tenant_id, project_id, package_number, numbering_scope_key, title, package_type,
       owner_id, route_policy_key, route_policy_version, status, created_by
     ) VALUES
       ($1, $2, $3, 'PKG-A', 'TEST', 'Package A', 'MATERIAL_PACKAGE', $4, 'UAE_CONTRACTOR_STARTER', 1, 'READY_FOR_SOURCING', $4),
       ($5, $2, $3, 'PKG-TWO', 'TEST', 'Package Two', 'MATERIAL_PACKAGE', $4, 'UAE_CONTRACTOR_STARTER', 1, 'READY_FOR_SOURCING', $4)`,
    [packageA, tenant, projectA, principal, packageTwo],
  );
  await pool.query(
    `INSERT INTO procurement.procurement_package_scope (
       package_scope_id, tenant_id, package_id, mr_line_id, allocated_quantity, source_uom_code
     ) VALUES ($1, $2, $3, $4, 6, 'EA'), ($5, $2, $6, $7, 4, 'EA')`,
    [scopeA, tenant, packageA, lineA, scopeTwo, packageTwo, linePackageTwo],
  );

  await pool.query(
    `INSERT INTO procurement.rfq_tender (
       rfq_id, tenant_id, project_id, rfq_number, numbering_scope_key, title, event_type, buyer_id,
       package_id, route_policy_key, route_policy_version, response_due_at, status, created_by
     ) VALUES
       ($1, $2, $3, 'RFQ-DIRECT', 'TEST', 'Direct RFQ', 'RFQ', $4, NULL, 'UAE_CONTRACTOR_STARTER', 1, '2026-10-01T12:00:00Z', 'DRAFT', $4),
       ($5, $2, $3, 'RFQ-PACKAGE', 'TEST', 'Package RFQ', 'RFQ', $4, $6, 'UAE_CONTRACTOR_STARTER', 1, '2026-10-01T12:00:00Z', 'DRAFT', $4)`,
    [rfqDirect, tenant, projectA, principal, rfqPackage, packageA],
  );
});

afterAll(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await dropSchema(pool, trackingSchema);
  await pool.end();
});

describe('Architecture V2 Session 02 Package/RFQ source lineage', () => {
  it('rejects package allocation above approved MR authority', async () => {
    await expect(pool.query(
      `INSERT INTO procurement.procurement_package_scope (
         tenant_id, package_id, mr_line_id, allocated_quantity, source_uom_code
       ) VALUES ($1, $2, $3, 5, 'EA')`,
      [tenant, packageTwo, lineA],
    )).rejects.toMatchObject({ code: '23514' });
  });

  it('rejects cross-project MR scope in a Package', async () => {
    await expect(pool.query(
      `INSERT INTO procurement.procurement_package_scope (
         tenant_id, package_id, mr_line_id, allocated_quantity, source_uom_code
       ) VALUES ($1, $2, $3, 1, 'EA')`,
      [tenant, packageA, lineB],
    )).rejects.toMatchObject({ code: '23514' });
  });

  it('allows direct RFQ only from COMPETITIVE_RFQ approved demand', async () => {
    await pool.query(
      `INSERT INTO procurement.rfq_tender_line (
         tenant_id, rfq_id, line_no, mr_line_id, description, quantity, uom_code
       ) VALUES ($1, $2, 10, $3, 'Direct line', 5, 'EA')`,
      [tenant, rfqDirect, lineDirect],
    );

    await expect(pool.query(
      `INSERT INTO procurement.rfq_tender_line (
         tenant_id, rfq_id, line_no, mr_line_id, description, quantity, uom_code
       ) VALUES ($1, $2, 20, $3, 'Wrong route', 1, 'EA')`,
      [tenant, rfqDirect, lineA],
    )).rejects.toMatchObject({ code: '23514' });
  });

  it('rejects Package RFQ line wired to another Package scope', async () => {
    await expect(pool.query(
      `INSERT INTO procurement.rfq_tender_line (
         tenant_id, rfq_id, line_no, mr_line_id, package_scope_id, description, quantity, uom_code
       ) VALUES ($1, $2, 10, $3, $4, 'Mismatched Package scope', 1, 'EA')`,
      [tenant, rfqPackage, linePackageTwo, scopeTwo],
    )).rejects.toMatchObject({ code: '23514' });
  });

  it('accepts Package RFQ line only on its exact governed scope and quantity', async () => {
    await pool.query(
      `INSERT INTO procurement.rfq_tender_line (
         tenant_id, rfq_id, line_no, mr_line_id, package_scope_id, description, quantity, uom_code
       ) VALUES ($1, $2, 10, $3, $4, 'Package source', 6, 'EA')`,
      [tenant, rfqPackage, lineA, scopeA],
    );

    await expect(pool.query(
      `INSERT INTO procurement.rfq_tender_line (
         tenant_id, rfq_id, line_no, mr_line_id, package_scope_id, description, quantity, uom_code
       ) VALUES ($1, $2, 20, $3, $4, 'Over authority', 6.000001, 'EA')`,
      [tenant, rfqPackage, lineA, scopeA],
    )).rejects.toMatchObject({ code: '23514' });
  });
});