import path from 'node:path';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-v2-session03-supplier-responses');
const trackingSchema = uniqueSchema('v2_session03_supplier_responses_tracking');

const tenant = '019e1300-0000-7000-8000-000000000001';
const principal = '019e1300-0000-7000-8000-000000000002';
const legal = '019e1300-0000-7000-8000-000000000003';
const authority = '019e1300-0000-7000-8000-000000000004';
const project = '019e1300-0000-7000-8000-000000000005';
const membership = '019e1300-0000-7000-8000-000000000006';
const ownerRole = '019e1300-0000-7000-8000-000000000007';
const subscription = '019e1300-0000-7000-8000-000000000008';
const supplierOne = '019e1300-0000-7000-8000-000000000009';
const supplierTwo = '019e1300-0000-7000-8000-000000000010';
const mrOne = '019e1300-0000-7000-8000-000000000011';
const mrTwo = '019e1300-0000-7000-8000-000000000012';
const mrLineOne = '019e1300-0000-7000-8000-000000000013';
const mrLineTwo = '019e1300-0000-7000-8000-000000000014';
const routeOne = '019e1300-0000-7000-8000-000000000015';
const routeTwo = '019e1300-0000-7000-8000-000000000016';
const rfqOne = '019e1300-0000-7000-8000-000000000017';
const rfqTwo = '019e1300-0000-7000-8000-000000000018';
const rfqLineOne = '019e1300-0000-7000-8000-000000000019';
const rfqLineTwo = '019e1300-0000-7000-8000-000000000020';
const rfqBidderOne = '019e1300-0000-7000-8000-000000000021';
const rfqBidderTwo = '019e1300-0000-7000-8000-000000000022';
const issueOne = '019e1300-0000-7000-8000-000000000023';
const issueTwo = '019e1300-0000-7000-8000-000000000024';
const issueLineOne = '019e1300-0000-7000-8000-000000000025';
const issueLineTwo = '019e1300-0000-7000-8000-000000000026';
const issueBidderOne = '019e1300-0000-7000-8000-000000000027';
const issueBidderTwo = '019e1300-0000-7000-8000-000000000028';
const quoteR0 = '019e1300-0000-7000-8000-000000000029';
const quoteR1 = '019e1300-0000-7000-8000-000000000030';
const quoteR2 = '019e1300-0000-7000-8000-000000000031';

async function seedProjectVersion(): Promise<void> {
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
       ) VALUES ($1, $2, 1, 'S03-001', 'Session 03 Project', 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
      [project, tenant],
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

async function seedMr(
  mrId: string,
  mrNumber: string,
  mrLineId: string,
  routeDecisionId: string,
): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.material_requisition (
       mr_id, tenant_id, project_id, mr_number, numbering_scope_key, requester_id,
       request_date, required_on_site_date, priority, subject, status, submitted_at, created_by
     ) VALUES (
       $1, $2, $3, $4, 'TEST', $5, DATE '2026-08-01', DATE '2026-09-15',
       'NORMAL', $4, 'APPROVED', '2026-08-02T00:00:00Z', $5
     )`,
    [mrId, tenant, project, mrNumber, principal],
  );
  await pool.query(
    `INSERT INTO procurement.material_requisition_line (
       mr_line_id, tenant_id, mr_id, line_no, entry_mode, line_type, description,
       requested_quantity, approved_quantity, uom_code, line_state
     ) VALUES ($1, $2, $3, 10, 'FREE_FORM', 'MATERIAL', $4, 10, 10, 'EA', 'APPROVED')`,
    [mrLineId, tenant, mrId, `${mrNumber} material`],
  );
  await pool.query(
    `INSERT INTO procurement.procurement_route_decision (
       route_decision_id, tenant_id, mr_line_id, policy_key, policy_version, route,
       justification, decided_by, is_current
     ) VALUES ($1, $2, $3, 'UAE_CONTRACTOR_STARTER', 1, 'COMPETITIVE_RFQ', 'Competitive return required', $4, true)`,
    [routeDecisionId, tenant, mrLineId, principal],
  );
}

async function seedRfq(input: {
  readonly rfqId: string;
  readonly rfqNumber: string;
  readonly mrLineId: string;
  readonly rfqLineId: string;
  readonly supplierId: string;
  readonly rfqBidderId: string;
}): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.rfq_tender (
       rfq_id, tenant_id, project_id, rfq_number, numbering_scope_key, title, event_type, buyer_id,
       route_policy_key, route_policy_version, response_due_at, response_timezone, currency,
       pricing_basis, evaluation_mode, bid_visibility_policy, status, revision_no, created_by
     ) VALUES (
       $1, $2, $3, $4, 'TEST', $5, 'RFQ', $6,
       'UAE_CONTRACTOR_STARTER', 1, '2026-10-01T12:00:00Z', 'Asia/Dubai', 'AED',
       'UNIT_AND_TOTAL', 'COMBINED', 'BUYER_AFTER_CLOSE', 'DRAFT', 0, $6
     )`,
    [input.rfqId, tenant, project, input.rfqNumber, `${input.rfqNumber} title`, principal],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_line (
       rfq_line_id, tenant_id, rfq_id, line_no, mr_line_id, description, specification,
       quantity, uom_code, required_date, equivalent_rule
     ) VALUES ($1, $2, $3, 10, $4, $5, 'Issued source specification', 10, 'EA', DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL')`,
    [input.rfqLineId, tenant, input.rfqId, input.mrLineId, `${input.rfqNumber} source line`],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_bidder (
       rfq_bidder_id, tenant_id, rfq_id, supplier_id, invitation_state, eligibility_note
     ) VALUES ($1, $2, $3, $4, 'READY', 'Eligible for test issue')`,
    [input.rfqBidderId, tenant, input.rfqId, input.supplierId],
  );
}

async function seedIssue(input: {
  readonly rfqId: string;
  readonly rfqNumber: string;
  readonly rfqLineId: string;
  readonly rfqBidderId: string;
  readonly supplierId: string;
  readonly issueId: string;
  readonly issueLineId: string;
  readonly issueBidderId: string;
  readonly mrLineId: string;
}): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue (
       rfq_issue_id, tenant_id, rfq_id, revision_no, rfq_number, title, event_type, project_id,
       buyer_id, issued_at, response_due_at, response_timezone, currency, pricing_basis,
       evaluation_mode, bid_visibility_policy, route_policy_key, route_policy_version, issued_by
     ) VALUES (
       $1, $2, $3, 0, $4, $5, 'RFQ', $6, $7,
       '2026-08-14T12:00:00Z', '2026-10-01T12:00:00Z', 'Asia/Dubai', 'AED', 'UNIT_AND_TOTAL',
       'COMBINED', 'BUYER_AFTER_CLOSE', 'UAE_CONTRACTOR_STARTER', 1, $7
     )`,
    [input.issueId, tenant, input.rfqId, input.rfqNumber, `${input.rfqNumber} title`, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue_line (
       rfq_issue_line_id, tenant_id, rfq_issue_id, source_rfq_line_id, line_no, mr_line_id,
       description, specification, quantity, uom_code, required_date, equivalent_rule
     ) VALUES (
       $1, $2, $3, $4, 10, $5, $6, 'Issued source specification', 10, 'EA', DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL'
     )`,
    [input.issueLineId, tenant, input.issueId, input.rfqLineId, input.mrLineId, `${input.rfqNumber} source line`],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue_bidder (
       rfq_issue_bidder_id, tenant_id, rfq_issue_id, source_rfq_bidder_id,
       supplier_id, invitation_state, eligibility_note
     ) VALUES ($1, $2, $3, $4, $5, 'INVITED', 'Eligible for test issue')`,
    [input.issueBidderId, tenant, input.issueId, input.rfqBidderId, input.supplierId],
  );
}

async function insertQuote(input: {
  readonly quoteId: string;
  readonly revisionNo: number;
  readonly supersedes: string | null;
  readonly receivedAt?: string;
}): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.supplier_quotation_revision (
       quotation_revision_id, tenant_id, rfq_issue_bidder_id, revision_no, supersedes_revision_id,
       supplier_quotation_reference, quotation_date, received_at, response_channel, capture_mode,
       captured_by_principal_id, currency, validity_until, payment_terms, response_status,
       source_file_name, source_media_type, source_sha256, created_by
     ) VALUES (
       $1, $2, $3, $4, $5, $6, DATE '2026-08-14', $7, 'BUYER_CAPTURE', 'BUYER_ON_BEHALF',
       $8, 'AED', DATE '2026-11-30', '45 days from delivery', 'RECEIVED',
       $9, 'application/pdf', repeat('a', 64), $8
     )`,
    [
      input.quoteId,
      tenant,
      issueBidderOne,
      input.revisionNo,
      input.supersedes,
      `SUP-Q-${input.revisionNo}`,
      input.receivedAt ?? '2026-08-15T08:00:00Z',
      principal,
      `supplier-quote-r${input.revisionNo}.pdf`,
    ],
  );
}

beforeAll(async () => {
  await runMigrations(pool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'v2-session03-supplier-responses-integration',
  });
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');

  await pool.query(`INSERT INTO platform.tenant (tenant_id, display_name) VALUES ($1, 'Session 03 Tenant')`, [tenant]);
  await pool.query(`INSERT INTO platform.legal_entity (legal_entity_id, tenant_id) VALUES ($1, $2)`, [legal, tenant]);
  await pool.query(
    `INSERT INTO platform.contracting_authority_context (authority_context_id, tenant_id, context_kind)
     VALUES ($1, $2, 'SINGLE_LEGAL_ENTITY')`,
    [authority, tenant],
  );
  await pool.query(
    `INSERT INTO platform.principal (principal_id, tenant_id, principal_kind, display_name, lifecycle_state)
     VALUES ($1, $2, 'HUMAN', 'Session 03 Buyer', 'ACTIVE')`,
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
    `INSERT INTO platform.project (project_id, tenant_id, authority_context_id) VALUES ($1, $2, $3)`,
    [project, tenant, authority],
  );
  await seedProjectVersion();
  await activateTenant();

  await pool.query(
    `INSERT INTO procurement.supplier (
       supplier_id, tenant_id, supplier_code, legal_name, supplier_type, supplier_state, country_code, created_by
     ) VALUES
       ($1, $2, 'SUP-001', 'Supplier One LLC', 'MATERIAL_SUPPLIER', 'ACTIVE', 'AE', $3),
       ($4, $2, 'SUP-002', 'Supplier Two LLC', 'MATERIAL_SUPPLIER', 'ACTIVE', 'AE', $3)`,
    [supplierOne, tenant, principal, supplierTwo],
  );

  await seedMr(mrOne, 'MR-S03-1', mrLineOne, routeOne);
  await seedMr(mrTwo, 'MR-S03-2', mrLineTwo, routeTwo);
  await seedRfq({ rfqId: rfqOne, rfqNumber: 'RFQ-S03-1', mrLineId: mrLineOne, rfqLineId: rfqLineOne, supplierId: supplierOne, rfqBidderId: rfqBidderOne });
  await seedRfq({ rfqId: rfqTwo, rfqNumber: 'RFQ-S03-2', mrLineId: mrLineTwo, rfqLineId: rfqLineTwo, supplierId: supplierTwo, rfqBidderId: rfqBidderTwo });
  await seedIssue({ rfqId: rfqOne, rfqNumber: 'RFQ-S03-1', rfqLineId: rfqLineOne, rfqBidderId: rfqBidderOne, supplierId: supplierOne, issueId: issueOne, issueLineId: issueLineOne, issueBidderId: issueBidderOne, mrLineId: mrLineOne });
  await seedIssue({ rfqId: rfqTwo, rfqNumber: 'RFQ-S03-2', rfqLineId: rfqLineTwo, rfqBidderId: rfqBidderTwo, supplierId: supplierTwo, issueId: issueTwo, issueLineId: issueLineTwo, issueBidderId: issueBidderTwo, mrLineId: mrLineTwo });
});

afterAll(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await dropSchema(pool, trackingSchema);
  await pool.end();
});

describe('Architecture V2 Session 03 supplier quotation source truth', () => {
  it('keeps invitation and supplier intent as distinct append-only facts', async () => {
    await pool.query(
      `INSERT INTO procurement.rfq_supplier_intent_event (
         tenant_id, rfq_issue_bidder_id, intent, reason, channel, recorded_by
       ) VALUES
         ($1, $2, 'NO_BID', 'Capacity unavailable', 'PHONE', $3),
         ($1, $2, 'WILL_BID', 'Capacity released', 'BUYER_CAPTURE', $3)`,
      [tenant, issueBidderOne, principal],
    );

    const result = await pool.query<{ readonly invitation_state: string; readonly intents: string[] }>(
      `SELECT ib.invitation_state,
              array_agg(e.intent ORDER BY e.recorded_at, e.intent_event_id)::text[] AS intents
       FROM procurement.rfq_tender_issue_bidder ib
       JOIN procurement.rfq_supplier_intent_event e
         ON e.tenant_id = ib.tenant_id AND e.rfq_issue_bidder_id = ib.rfq_issue_bidder_id
       WHERE ib.tenant_id = $1 AND ib.rfq_issue_bidder_id = $2
       GROUP BY ib.invitation_state`,
      [tenant, issueBidderOne],
    );

    expect(result.rows[0]?.invitation_state).toBe('INVITED');
    expect(result.rows[0]?.intents).toEqual(['NO_BID', 'WILL_BID']);
  });

  it('enforces an exact immutable R0 -> R1 -> R2 revision chain', async () => {
    await expect(insertQuote({ quoteId: quoteR1, revisionNo: 1, supersedes: null })).rejects.toMatchObject({ code: '23514' });

    await insertQuote({ quoteId: quoteR0, revisionNo: 0, supersedes: null });

    await expect(insertQuote({ quoteId: quoteR1, revisionNo: 1, supersedes: null })).rejects.toMatchObject({ code: '23514' });
    await insertQuote({ quoteId: quoteR1, revisionNo: 1, supersedes: quoteR0 });
    await insertQuote({ quoteId: quoteR2, revisionNo: 2, supersedes: quoteR1 });

    const history = await pool.query<{ readonly revision_no: number; readonly supersedes: string | null }>(
      `SELECT revision_no, supersedes_revision_id::text AS supersedes
       FROM procurement.supplier_quotation_revision
       WHERE tenant_id = $1 AND rfq_issue_bidder_id = $2
       ORDER BY revision_no`,
      [tenant, issueBidderOne],
    );

    expect(history.rows).toEqual([
      { revision_no: 0, supersedes: null },
      { revision_no: 1, supersedes: quoteR0 },
      { revision_no: 2, supersedes: quoteR1 },
    ]);
  });

  it('rejects update/delete mutation of issued or supplier-source truth', async () => {
    await insertQuote({ quoteId: quoteR0, revisionNo: 0, supersedes: null });

    await expect(pool.query(
      `UPDATE procurement.supplier_quotation_revision
       SET payment_terms = 'Changed after receipt'
       WHERE tenant_id = $1 AND quotation_revision_id = $2`,
      [tenant, quoteR0],
    )).rejects.toMatchObject({ code: '55000' });

    await expect(pool.query(
      `DELETE FROM procurement.rfq_tender_issue_line
       WHERE tenant_id = $1 AND rfq_issue_line_id = $2`,
      [tenant, issueLineOne],
    )).rejects.toMatchObject({ code: '55000' });
  });

  it('preserves supplier wording and UOM differences without rewriting the issued RFQ basis', async () => {
    await insertQuote({ quoteId: quoteR0, revisionNo: 0, supersedes: null });
    await pool.query(
      `INSERT INTO procurement.supplier_quotation_line (
         tenant_id, quotation_revision_id, rfq_issue_line_id, supplier_line_no,
         supplier_description, quoted_quantity, quoted_uom_code, unit_rate, line_amount,
         brand, line_type, source_reference
       ) VALUES ($1, $2, $3, 'A-01', 'Supplier wording: 2 cartons of ten pieces', 2, 'CTN', 125.5, 251, 'Supplier Brand', 'BASE', 'PDF p.2')`,
      [tenant, quoteR0, issueLineOne],
    );

    const captured = await pool.query<{
      readonly supplier_description: string;
      readonly quoted_quantity: string;
      readonly quoted_uom_code: string;
      readonly issued_quantity: string;
      readonly issued_uom_code: string;
    }>(
      `SELECT ql.supplier_description, ql.quoted_quantity::text, ql.quoted_uom_code,
              il.quantity::text AS issued_quantity, il.uom_code AS issued_uom_code
       FROM procurement.supplier_quotation_line ql
       JOIN procurement.rfq_tender_issue_line il
         ON il.tenant_id = ql.tenant_id AND il.rfq_issue_line_id = ql.rfq_issue_line_id
       WHERE ql.tenant_id = $1 AND ql.quotation_revision_id = $2`,
      [tenant, quoteR0],
    );

    expect(captured.rows[0]).toEqual({
      supplier_description: 'Supplier wording: 2 cartons of ten pieces',
      quoted_quantity: '2.000000',
      quoted_uom_code: 'CTN',
      issued_quantity: '10.000000',
      issued_uom_code: 'EA',
    });
  });

  it('rejects a quotation line mapped to a different issued RFQ basis', async () => {
    await insertQuote({ quoteId: quoteR0, revisionNo: 0, supersedes: null });

    await expect(pool.query(
      `INSERT INTO procurement.supplier_quotation_line (
         tenant_id, quotation_revision_id, rfq_issue_line_id, supplier_description,
         quoted_quantity, quoted_uom_code, line_type
       ) VALUES ($1, $2, $3, 'Cross issue attack', 10, 'EA', 'BASE')`,
      [tenant, quoteR0, issueLineTwo],
    )).rejects.toMatchObject({ code: '23514' });
  });

  it('requires supplier-added lines to be explicit UNMAPPED source truth', async () => {
    await insertQuote({ quoteId: quoteR0, revisionNo: 0, supersedes: null });

    await expect(pool.query(
      `INSERT INTO procurement.supplier_quotation_line (
         tenant_id, quotation_revision_id, supplier_description, line_type
       ) VALUES ($1, $2, 'Supplier added delivery charge', 'BASE')`,
      [tenant, quoteR0],
    )).rejects.toMatchObject({ code: '23514' });

    await pool.query(
      `INSERT INTO procurement.supplier_quotation_line (
         tenant_id, quotation_revision_id, supplier_description, line_amount, line_type, source_reference
       ) VALUES ($1, $2, 'Supplier added delivery charge', 500, 'UNMAPPED', 'PDF p.4')`,
      [tenant, quoteR0],
    );

    const count = await pool.query<{ readonly count: string }>(
      `SELECT count(*)::text AS count
       FROM procurement.supplier_quotation_line
       WHERE tenant_id = $1 AND quotation_revision_id = $2 AND line_type = 'UNMAPPED'`,
      [tenant, quoteR0],
    );
    expect(count.rows[0]?.count).toBe('1');
  });

  it('derives late status from the issued response deadline rather than trusting callers', async () => {
    await insertQuote({ quoteId: quoteR0, revisionNo: 0, supersedes: null, receivedAt: '2026-10-02T08:00:00Z' });

    const result = await pool.query<{ readonly is_late: boolean }>(
      `SELECT is_late
       FROM procurement.supplier_quotation_revision
       WHERE tenant_id = $1 AND quotation_revision_id = $2`,
      [tenant, quoteR0],
    );
    expect(result.rows[0]?.is_late).toBe(true);
  });

  it('serializes competing next-revision inserts on the issued bidder authority', async () => {
    await insertQuote({ quoteId: quoteR0, revisionNo: 0, supersedes: null });

    const quoteR1Competitor = '019e1300-0000-7000-8000-000000000032';
    const attempts = await Promise.allSettled([
      insertQuote({ quoteId: quoteR1, revisionNo: 1, supersedes: quoteR0 }),
      insertQuote({ quoteId: quoteR1Competitor, revisionNo: 1, supersedes: quoteR0 }),
    ]);

    expect(attempts.filter((attempt) => attempt.status === 'fulfilled')).toHaveLength(1);
    expect(attempts.filter((attempt) => attempt.status === 'rejected')).toHaveLength(1);

    const history = await pool.query<{ readonly revision_no: number }>(
      `SELECT revision_no
       FROM procurement.supplier_quotation_revision
       WHERE tenant_id = $1 AND rfq_issue_bidder_id = $2
       ORDER BY revision_no`,
      [tenant, issueBidderOne],
    );
    expect(history.rows.map((row) => row.revision_no)).toEqual([0, 1]);
  });
});
