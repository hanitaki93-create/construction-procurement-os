import path from 'node:path';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-v2-session04-bid-comparison');
const trackingSchema = uniqueSchema('v2_session04_bid_comparison_tracking');

const tenant = '019e1400-0000-7000-8000-000000000001';
const principal = '019e1400-0000-7000-8000-000000000002';
const legal = '019e1400-0000-7000-8000-000000000003';
const authority = '019e1400-0000-7000-8000-000000000004';
const project = '019e1400-0000-7000-8000-000000000005';
const membership = '019e1400-0000-7000-8000-000000000006';
const ownerRole = '019e1400-0000-7000-8000-000000000007';
const subscription = '019e1400-0000-7000-8000-000000000008';
const supplierOne = '019e1400-0000-7000-8000-000000000009';
const supplierTwo = '019e1400-0000-7000-8000-000000000010';
const mrOne = '019e1400-0000-7000-8000-000000000011';
const mrTwo = '019e1400-0000-7000-8000-000000000012';
const mrLineOne = '019e1400-0000-7000-8000-000000000013';
const mrLineTwo = '019e1400-0000-7000-8000-000000000014';
const routeOne = '019e1400-0000-7000-8000-000000000015';
const routeTwo = '019e1400-0000-7000-8000-000000000016';
const rfq = '019e1400-0000-7000-8000-000000000017';
const rfqLineOne = '019e1400-0000-7000-8000-000000000018';
const rfqLineTwo = '019e1400-0000-7000-8000-000000000019';
const rfqBidderOne = '019e1400-0000-7000-8000-000000000020';
const rfqBidderTwo = '019e1400-0000-7000-8000-000000000021';
const issue = '019e1400-0000-7000-8000-000000000022';
const issueLineOne = '019e1400-0000-7000-8000-000000000023';
const issueLineTwo = '019e1400-0000-7000-8000-000000000024';
const issueBidderOne = '019e1400-0000-7000-8000-000000000025';
const issueBidderTwo = '019e1400-0000-7000-8000-000000000026';
const quoteOneR0 = '019e1400-0000-7000-8000-000000000027';
const quoteTwoR0 = '019e1400-0000-7000-8000-000000000028';
const quoteOneR1 = '019e1400-0000-7000-8000-000000000029';
const quoteLineOneA = '019e1400-0000-7000-8000-000000000030';
const quoteLineOneB = '019e1400-0000-7000-8000-000000000031';
const quoteLineTwoA = '019e1400-0000-7000-8000-000000000032';
const quoteLineOneR1A = '019e1400-0000-7000-8000-000000000033';
const comparison = '019e1400-0000-7000-8000-000000000034';
const comparisonBidderOne = '019e1400-0000-7000-8000-000000000035';
const comparisonBidderTwo = '019e1400-0000-7000-8000-000000000036';
const rowOne = '019e1400-0000-7000-8000-000000000037';
const rowTwo = '019e1400-0000-7000-8000-000000000038';
const cellOneOne = '019e1400-0000-7000-8000-000000000039';
const cellOneTwo = '019e1400-0000-7000-8000-000000000040';
const cellTwoOne = '019e1400-0000-7000-8000-000000000041';
const cellTwoTwo = '019e1400-0000-7000-8000-000000000042';
const adjustment = '019e1400-0000-7000-8000-000000000043';

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
       SET guard_version = guard_version + 1 WHERE tenant_id = $1`,
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

async function seedMr(mrId: string, mrNumber: string, lineId: string, routeId: string): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.material_requisition (
       mr_id, tenant_id, project_id, mr_number, numbering_scope_key, requester_id,
       request_date, required_on_site_date, priority, subject, status, submitted_at, created_by
     ) VALUES ($1, $2, $3, $4, 'TEST', $5, DATE '2026-08-01', DATE '2026-09-15',
       'NORMAL', $4, 'APPROVED', '2026-08-02T00:00:00Z', $5)`,
    [mrId, tenant, project, mrNumber, principal],
  );
  await pool.query(
    `INSERT INTO procurement.material_requisition_line (
       mr_line_id, tenant_id, mr_id, line_no, entry_mode, line_type, description,
       requested_quantity, approved_quantity, uom_code, line_state
     ) VALUES ($1, $2, $3, 10, 'FREE_FORM', 'MATERIAL', $4, 10, 10, 'EA', 'APPROVED')`,
    [lineId, tenant, mrId, `${mrNumber} material`],
  );
  await pool.query(
    `INSERT INTO procurement.procurement_route_decision (
       route_decision_id, tenant_id, mr_line_id, policy_key, policy_version, route,
       justification, decided_by, is_current
     ) VALUES ($1, $2, $3, 'UAE_CONTRACTOR_STARTER', 1, 'COMPETITIVE_RFQ', 'Competitive return required', $4, true)`,
    [routeId, tenant, lineId, principal],
  );
}

async function insertQuote(input: {
  readonly quoteId: string;
  readonly bidderId: string;
  readonly revisionNo: number;
  readonly supersedes: string | null;
  readonly reference: string;
  readonly currency?: string;
}): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.supplier_quotation_revision (
       quotation_revision_id, tenant_id, rfq_issue_bidder_id, revision_no, supersedes_revision_id,
       supplier_quotation_reference, quotation_date, received_at, response_channel, capture_mode,
       captured_by_principal_id, currency, validity_until, lead_time_promise, payment_terms,
       response_status, source_file_name, source_media_type, source_sha256, created_by
     ) VALUES ($1, $2, $3, $4, $5, $6, DATE '2026-08-14', '2026-08-15T08:00:00Z',
       'BUYER_CAPTURE', 'BUYER_ON_BEHALF', $7, $8, DATE '2026-11-30', '4 weeks',
       '45 days from delivery', 'RECEIVED', $9, 'application/pdf', repeat('a', 64), $7)`,
    [
      input.quoteId,
      tenant,
      input.bidderId,
      input.revisionNo,
      input.supersedes,
      input.reference,
      principal,
      input.currency ?? 'AED',
      `${input.reference}.pdf`,
    ],
  );
}

async function seedComparisonBasis(): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.bid_comparison (
       comparison_id, tenant_id, rfq_issue_id, project_id, title, base_currency, created_by
     ) VALUES ($1, $2, $3, $4, 'Session 04 Bid Comparison', 'AED', $5)`,
    [comparison, tenant, issue, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.bid_comparison_bidder_selection (
       comparison_bidder_id, tenant_id, comparison_id, rfq_issue_bidder_id,
       selected_quotation_revision_id, recorded_by
     ) VALUES
       ($1, $2, $3, $4, $5, $6),
       ($7, $2, $3, $8, $9, $6)`,
    [
      comparisonBidderOne,
      tenant,
      comparison,
      issueBidderOne,
      quoteOneR0,
      principal,
      comparisonBidderTwo,
      issueBidderTwo,
      quoteTwoR0,
    ],
  );
  await pool.query(
    `INSERT INTO procurement.bid_comparison_row (
       comparison_row_id, tenant_id, comparison_id, row_no, row_kind, rfq_issue_line_id,
       description, target_quantity, target_uom_code, recorded_by
     ) VALUES
       ($1, $2, $3, 10, 'RFQ_LINE', $4, 'Issued line one', 10, 'EA', $5),
       ($6, $2, $3, 20, 'RFQ_LINE', $7, 'Issued line two', 10, 'EA', $5)`,
    [rowOne, tenant, comparison, issueLineOne, principal, rowTwo, issueLineTwo],
  );
}

async function seedCompleteCells(): Promise<void> {
  await pool.query(
    `INSERT INTO procurement.bid_comparison_cell (
       comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
       source_quotation_line_id, coverage_status, normalized_quantity, normalized_uom_code,
       normalized_unit_rate, normalized_amount, normalization_basis, recorded_by
     ) VALUES
       ($1, $2, $3, $4, $5, $6, 'EXACT', 10, 'EA', 123.456789, 1234.567890, 'Buyer confirmed source arithmetic', $7),
       ($8, $2, $3, $4, $9, $10, 'EXACT', 10, 'EA', 130.000001, 1300.000010, 'Buyer confirmed source arithmetic', $7),
       ($11, $2, $3, $12, $5, $13, 'EXACT', 10, 'EA', 25.000001, 250.000010, 'Buyer confirmed source arithmetic', $7),
       ($14, $2, $3, $12, $9, NULL, 'MISSING', NULL, NULL, NULL, NULL, NULL, $7)`,
    [
      cellOneOne,
      tenant,
      comparison,
      rowOne,
      comparisonBidderOne,
      quoteLineOneA,
      principal,
      cellOneTwo,
      comparisonBidderTwo,
      quoteLineTwoA,
      cellTwoOne,
      rowTwo,
      quoteLineOneB,
      cellTwoTwo,
    ],
  );
}

async function freezeComparison(): Promise<string> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `SELECT set_config('cpos.tenant_id', $1, true), set_config('cpos.principal_id', $2, true)`,
      [tenant, principal],
    );
    const result = await client.query<{ readonly snapshot_id: string }>(
      `SELECT procurement.freeze_bid_comparison($1)::text AS snapshot_id`,
      [comparison],
    );
    await client.query('COMMIT');
    const snapshotId = result.rows[0]?.snapshot_id;
    if (!snapshotId) throw new Error('comparison snapshot was not returned');
    return snapshotId;
  } catch (error: unknown) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

beforeAll(async () => {
  await runMigrations(pool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'v2-session04-bid-comparison-integration',
  });
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');

  await pool.query(`INSERT INTO platform.tenant (tenant_id, display_name) VALUES ($1, 'Session 04 Tenant')`, [tenant]);
  await pool.query(`INSERT INTO platform.legal_entity (legal_entity_id, tenant_id) VALUES ($1, $2)`, [legal, tenant]);
  await pool.query(
    `INSERT INTO platform.contracting_authority_context (authority_context_id, tenant_id, context_kind)
     VALUES ($1, $2, 'SINGLE_LEGAL_ENTITY')`,
    [authority, tenant],
  );
  await pool.query(
    `INSERT INTO platform.principal (principal_id, tenant_id, principal_kind, display_name, lifecycle_state)
     VALUES ($1, $2, 'HUMAN', 'Session 04 Buyer', 'ACTIVE')`,
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
       ) VALUES ($1, $2, 1, 'S04-001', 'Session 04 Project', 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
      [project, tenant],
    );
    await client.query('COMMIT');
  } catch (error: unknown) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  await activateTenant();

  await pool.query(
    `INSERT INTO procurement.supplier (
       supplier_id, tenant_id, supplier_code, legal_name, supplier_type, supplier_state, country_code, created_by
     ) VALUES
       ($1, $2, 'SUP-401', 'Comparison Supplier One LLC', 'MATERIAL_SUPPLIER', 'ACTIVE', 'AE', $3),
       ($4, $2, 'SUP-402', 'Comparison Supplier Two LLC', 'MATERIAL_SUPPLIER', 'ACTIVE', 'AE', $3)`,
    [supplierOne, tenant, principal, supplierTwo],
  );

  await seedMr(mrOne, 'MR-S04-1', mrLineOne, routeOne);
  await seedMr(mrTwo, 'MR-S04-2', mrLineTwo, routeTwo);

  await pool.query(
    `INSERT INTO procurement.rfq_tender (
       rfq_id, tenant_id, project_id, rfq_number, numbering_scope_key, title, event_type, buyer_id,
       route_policy_key, route_policy_version, response_due_at, response_timezone, currency,
       pricing_basis, evaluation_mode, bid_visibility_policy, status, revision_no, created_by
     ) VALUES ($1, $2, $3, 'RFQ-S04-1', 'TEST', 'Session 04 RFQ', 'RFQ', $4,
       'UAE_CONTRACTOR_STARTER', 1, '2026-10-01T12:00:00Z', 'Asia/Dubai', 'AED',
       'UNIT_AND_TOTAL', 'COMBINED', 'BUYER_AFTER_CLOSE', 'DRAFT', 0, $4)`,
    [rfq, tenant, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_line (
       rfq_line_id, tenant_id, rfq_id, line_no, mr_line_id, description, specification,
       quantity, uom_code, required_date, equivalent_rule
     ) VALUES
       ($1, $2, $3, 10, $4, 'Issued line one', 'Spec one', 10, 'EA', DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL'),
       ($5, $2, $3, 20, $6, 'Issued line two', 'Spec two', 10, 'EA', DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL')`,
    [rfqLineOne, tenant, rfq, mrLineOne, rfqLineTwo, mrLineTwo],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_bidder (
       rfq_bidder_id, tenant_id, rfq_id, supplier_id, invitation_state, eligibility_note
     ) VALUES
       ($1, $2, $3, $4, 'READY', 'Eligible'),
       ($5, $2, $3, $6, 'READY', 'Eligible')`,
    [rfqBidderOne, tenant, rfq, supplierOne, rfqBidderTwo, supplierTwo],
  );

  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue (
       rfq_issue_id, tenant_id, rfq_id, revision_no, rfq_number, title, event_type, project_id,
       buyer_id, issued_at, response_due_at, response_timezone, currency, pricing_basis,
       evaluation_mode, bid_visibility_policy, route_policy_key, route_policy_version, issued_by
     ) VALUES ($1, $2, $3, 0, 'RFQ-S04-1', 'Session 04 RFQ', 'RFQ', $4, $5,
       '2026-08-14T12:00:00Z', '2026-10-01T12:00:00Z', 'Asia/Dubai', 'AED', 'UNIT_AND_TOTAL',
       'COMBINED', 'BUYER_AFTER_CLOSE', 'UAE_CONTRACTOR_STARTER', 1, $5)`,
    [issue, tenant, rfq, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue_line (
       rfq_issue_line_id, tenant_id, rfq_issue_id, source_rfq_line_id, line_no, mr_line_id,
       description, specification, quantity, uom_code, required_date, equivalent_rule
     ) VALUES
       ($1, $2, $3, $4, 10, $5, 'Issued line one', 'Spec one', 10, 'EA', DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL'),
       ($6, $2, $3, $7, 20, $8, 'Issued line two', 'Spec two', 10, 'EA', DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL')`,
    [issueLineOne, tenant, issue, rfqLineOne, mrLineOne, issueLineTwo, rfqLineTwo, mrLineTwo],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue_bidder (
       rfq_issue_bidder_id, tenant_id, rfq_issue_id, source_rfq_bidder_id,
       supplier_id, invitation_state, eligibility_note
     ) VALUES
       ($1, $2, $3, $4, $5, 'INVITED', 'Eligible'),
       ($6, $2, $3, $7, $8, 'INVITED', 'Eligible')`,
    [issueBidderOne, tenant, issue, rfqBidderOne, supplierOne, issueBidderTwo, rfqBidderTwo, supplierTwo],
  );

  await insertQuote({ quoteId: quoteOneR0, bidderId: issueBidderOne, revisionNo: 0, supersedes: null, reference: 'SUP1-R0' });
  await insertQuote({ quoteId: quoteTwoR0, bidderId: issueBidderTwo, revisionNo: 0, supersedes: null, reference: 'SUP2-R0' });

  await pool.query(
    `INSERT INTO procurement.supplier_quotation_line (
       quotation_line_id, tenant_id, quotation_revision_id, rfq_issue_line_id, supplier_line_no,
       supplier_description, quoted_quantity, quoted_uom_code, unit_rate, line_amount,
       tax_amount, brand, line_type, source_reference
     ) VALUES
       ($1, $2, $3, $4, '1', 'Supplier one line one', 10, 'EA', 123.456789, 1234.567890, 0, 'Brand A', 'BASE', 'PDF p.1'),
       ($5, $2, $3, $6, '2', 'Supplier one line two', 10, 'EA', 25.000001, 250.000010, 0, 'Brand B', 'BASE', 'PDF p.2'),
       ($7, $2, $8, $4, '1', 'Supplier two line one', 10, 'EA', 130.000001, 1300.000010, 0, 'Brand C', 'BASE', 'PDF p.1')`,
    [quoteLineOneA, tenant, quoteOneR0, issueLineOne, quoteLineOneB, issueLineTwo, quoteLineTwoA, quoteTwoR0],
  );
});

afterAll(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await dropSchema(pool, trackingSchema);
  await pool.end();
});

describe('Architecture V2 Session 04 bid comparison source/normalized/adjusted/snapshot truth', () => {
  it('rejects a selected quotation revision that belongs to another issued bidder', async () => {
    await pool.query(
      `INSERT INTO procurement.bid_comparison (
         comparison_id, tenant_id, rfq_issue_id, project_id, title, base_currency, created_by
       ) VALUES ($1, $2, $3, $4, 'Comparison', 'AED', $5)`,
      [comparison, tenant, issue, project, principal],
    );

    await expect(pool.query(
      `INSERT INTO procurement.bid_comparison_bidder_selection (
         comparison_bidder_id, tenant_id, comparison_id, rfq_issue_bidder_id,
         selected_quotation_revision_id, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [comparisonBidderOne, tenant, comparison, issueBidderOne, quoteTwoR0, principal],
    )).rejects.toMatchObject({ code: '23514' });
  });

  it('keeps missing scope explicit and rejects fabricated normalized value for MISSING', async () => {
    await seedComparisonBasis();

    await expect(pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         coverage_status, normalized_amount, normalization_basis, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, 'MISSING', 0, 'Fake zero', $6)`,
      [cellTwoTwo, tenant, comparison, rowTwo, comparisonBidderTwo, principal],
    )).rejects.toMatchObject({ code: '23514' });

    await pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         coverage_status, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, 'MISSING', $6)`,
      [cellTwoTwo, tenant, comparison, rowTwo, comparisonBidderTwo, principal],
    );

    const result = await pool.query<{ readonly coverage_status: string; readonly normalized_amount: string | null }>(
      `SELECT coverage_status, normalized_amount::text
       FROM procurement.bid_comparison_cell WHERE tenant_id = $1 AND comparison_cell_id = $2`,
      [tenant, cellTwoTwo],
    );
    expect(result.rows[0]).toEqual({ coverage_status: 'MISSING', normalized_amount: null });
  });

  it('rejects silent quotation-line reuse and allows it only when every repeated use is explicitly BUNDLED', async () => {
    await seedComparisonBasis();
    await pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         source_quotation_line_id, coverage_status, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6, 'EXACT', $7)`,
      [cellOneOne, tenant, comparison, rowOne, comparisonBidderOne, quoteLineOneA, principal],
    );

    await expect(pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         source_quotation_line_id, coverage_status, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6, 'BUNDLED', $7)`,
      [cellTwoOne, tenant, comparison, rowTwo, comparisonBidderOne, quoteLineOneA, principal],
    )).rejects.toMatchObject({ code: '23514' });

    await pool.query(
      `UPDATE procurement.bid_comparison_cell SET coverage_status = 'BUNDLED'
       WHERE tenant_id = $1 AND comparison_cell_id = $2`,
      [tenant, cellOneOne],
    );
    await pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         source_quotation_line_id, coverage_status, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6, 'BUNDLED', $7)`,
      [cellTwoOne, tenant, comparison, rowTwo, comparisonBidderOne, quoteLineOneA, principal],
    );

    const result = await pool.query<{ readonly count: string }>(
      `SELECT count(*)::text AS count FROM procurement.bid_comparison_cell
       WHERE tenant_id = $1 AND comparison_id = $2 AND source_quotation_line_id = $3 AND coverage_status = 'BUNDLED'`,
      [tenant, comparison, quoteLineOneA],
    );
    expect(result.rows[0]?.count).toBe('2');
  });

  it('allows multiple explicit supplier-added rows while keeping issued RFQ rows unique', async () => {
    await seedComparisonBasis();
    await pool.query(
      `INSERT INTO procurement.bid_comparison_row (
         tenant_id, comparison_id, row_no, row_kind, description, recorded_by
       ) VALUES
         ($1, $2, 30, 'SUPPLIER_ADDED', 'Freight', $3),
         ($1, $2, 40, 'SUPPLIER_ADDED', 'Optional spare parts', $3)`,
      [tenant, comparison, principal],
    );

    await expect(pool.query(
      `INSERT INTO procurement.bid_comparison_row (
         tenant_id, comparison_id, row_no, row_kind, rfq_issue_line_id,
         description, target_quantity, target_uom_code, recorded_by
       ) VALUES ($1, $2, 50, 'RFQ_LINE', $3, 'Duplicate requirement', 10, 'EA', $4)`,
      [tenant, comparison, issueLineOne, principal],
    )).rejects.toMatchObject({ code: '23505' });

    const result = await pool.query<{ readonly count: string }>(
      `SELECT count(*)::text AS count FROM procurement.bid_comparison_row
       WHERE tenant_id = $1 AND comparison_id = $2 AND row_kind = 'SUPPLIER_ADDED'`,
      [tenant, comparison],
    );
    expect(result.rows[0]?.count).toBe('2');
  });

  it('round-trips exact decimal normalization and buyer adjustment without touching supplier source truth', async () => {
    await seedComparisonBasis();
    await pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         source_quotation_line_id, coverage_status, normalized_quantity, normalized_uom_code,
         normalized_unit_rate, normalized_amount, normalization_basis, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6, 'EXACT', 10, 'EA', 123.456789, 1234.567890,
         'Buyer confirmed source arithmetic', $7)`,
      [cellOneOne, tenant, comparison, rowOne, comparisonBidderOne, quoteLineOneA, principal],
    );
    await pool.query(
      `INSERT INTO procurement.bid_comparison_adjustment (
         comparison_adjustment_id, tenant_id, comparison_id, comparison_cell_id,
         adjustment_type, adjustment_amount, reason, recorded_by
       ) VALUES ($1, $2, $3, $4, 'ADD_COST', 0.000001, 'Explicit evaluation rounding delta', $5)`,
      [adjustment, tenant, comparison, cellOneOne, principal],
    );

    const result = await pool.query<{
      readonly source_amount: string;
      readonly normalized_amount: string;
      readonly adjustment_amount: string;
    }>(
      `SELECT ql.line_amount::text AS source_amount,
              c.normalized_amount::text AS normalized_amount,
              a.adjustment_amount::text AS adjustment_amount
       FROM procurement.bid_comparison_cell c
       JOIN procurement.supplier_quotation_line ql
         ON ql.tenant_id = c.tenant_id AND ql.quotation_line_id = c.source_quotation_line_id
       JOIN procurement.bid_comparison_adjustment a
         ON a.tenant_id = c.tenant_id AND a.comparison_cell_id = c.comparison_cell_id
       WHERE c.tenant_id = $1 AND c.comparison_cell_id = $2`,
      [tenant, cellOneOne],
    );
    expect(result.rows[0]).toEqual({
      source_amount: '1234.567890',
      normalized_amount: '1234.567890',
      adjustment_amount: '0.000001',
    });

    const source = await pool.query<{ readonly line_amount: string }>(
      `SELECT line_amount::text FROM procurement.supplier_quotation_line
       WHERE tenant_id = $1 AND quotation_line_id = $2`,
      [tenant, quoteLineOneA],
    );
    expect(source.rows[0]?.line_amount).toBe('1234.567890');
  });

  it('refuses to freeze until every row x selected-bidder position has explicit coverage', async () => {
    await seedComparisonBasis();
    await pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         source_quotation_line_id, coverage_status, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6, 'EXACT', $7)`,
      [cellOneOne, tenant, comparison, rowOne, comparisonBidderOne, quoteLineOneA, principal],
    );

    await expect(freezeComparison()).rejects.toMatchObject({ code: '23514' });
  });

  it('freezes an immutable reproducible snapshot and blocks draft mutation afterwards', async () => {
    await seedComparisonBasis();
    await seedCompleteCells();
    await pool.query(
      `INSERT INTO procurement.bid_comparison_adjustment (
         comparison_adjustment_id, tenant_id, comparison_id, comparison_cell_id,
         adjustment_type, adjustment_amount, reason, recorded_by
       ) VALUES ($1, $2, $3, $4, 'ADD_COST', 0.000001, 'Explicit evaluation delta', $5)`,
      [adjustment, tenant, comparison, cellOneOne, principal],
    );

    const snapshotId = await freezeComparison();

    const snapshot = await pool.query<{
      readonly state: string;
      readonly source_amount: string;
      readonly normalized_amount: string;
      readonly adjustment_total: string;
      readonly missing_count: string;
    }>(
      `SELECT c.state,
              max(sc.source_line_amount)::text AS source_amount,
              max(sc.normalized_amount)::text AS normalized_amount,
              max(sc.adjustment_total)::text AS adjustment_total,
              count(*) FILTER (WHERE sc.coverage_status = 'MISSING')::text AS missing_count
       FROM procurement.bid_comparison c
       JOIN procurement.bid_comparison_snapshot s
         ON s.tenant_id = c.tenant_id AND s.comparison_id = c.comparison_id
       JOIN procurement.bid_comparison_snapshot_cell sc
         ON sc.tenant_id = s.tenant_id AND sc.comparison_snapshot_id = s.comparison_snapshot_id
       WHERE c.tenant_id = $1 AND s.comparison_snapshot_id = $2
       GROUP BY c.state`,
      [tenant, snapshotId],
    );
    expect(snapshot.rows[0]).toEqual({
      state: 'FROZEN',
      source_amount: '1300.000010',
      normalized_amount: '1300.000010',
      adjustment_total: '0.000001',
      missing_count: '1',
    });

    await expect(pool.query(
      `UPDATE procurement.bid_comparison_cell SET normalized_amount = 999
       WHERE tenant_id = $1 AND comparison_cell_id = $2`,
      [tenant, cellOneOne],
    )).rejects.toMatchObject({ code: '55000' });

    await expect(pool.query(
      `UPDATE procurement.bid_comparison_snapshot SET title = 'Tampered'
       WHERE tenant_id = $1 AND comparison_snapshot_id = $2`,
      [tenant, snapshotId],
    )).rejects.toMatchObject({ code: '55000' });
  });

  it('does not let a later quotation revision rewrite an already frozen comparison snapshot', async () => {
    await seedComparisonBasis();
    await seedCompleteCells();
    const snapshotId = await freezeComparison();

    await insertQuote({
      quoteId: quoteOneR1,
      bidderId: issueBidderOne,
      revisionNo: 1,
      supersedes: quoteOneR0,
      reference: 'SUP1-R1',
    });
    await pool.query(
      `INSERT INTO procurement.supplier_quotation_line (
         quotation_line_id, tenant_id, quotation_revision_id, rfq_issue_line_id,
         supplier_description, quoted_quantity, quoted_uom_code, unit_rate, line_amount,
         line_type, source_reference
       ) VALUES ($1, $2, $3, $4, 'Later revised price', 10, 'EA', 1, 10, 'BASE', 'R1 p.1')`,
      [quoteLineOneR1A, tenant, quoteOneR1, issueLineOne],
    );

    const result = await pool.query<{
      readonly selected_revision: string;
      readonly source_amount: string;
      readonly latest_quote_amount: string;
    }>(
      `SELECT sb.selected_quotation_revision_id::text AS selected_revision,
              sc.source_line_amount::text AS source_amount,
              latest.line_amount::text AS latest_quote_amount
       FROM procurement.bid_comparison_snapshot_bidder sb
       JOIN procurement.bid_comparison_snapshot_cell sc
         ON sc.tenant_id = sb.tenant_id
        AND sc.comparison_snapshot_id = sb.comparison_snapshot_id
        AND sc.comparison_bidder_id = sb.comparison_bidder_id
       JOIN procurement.supplier_quotation_line latest
         ON latest.tenant_id = sb.tenant_id AND latest.quotation_line_id = $3
       WHERE sb.tenant_id = $1
         AND sb.comparison_snapshot_id = $2
         AND sb.selected_quotation_revision_id = $4
         AND sc.source_quotation_line_id = $5`,
      [tenant, snapshotId, quoteLineOneR1A, quoteOneR0, quoteLineOneA],
    );
    expect(result.rows[0]).toEqual({
      selected_revision: quoteOneR0,
      source_amount: '1234.567890',
      latest_quote_amount: '10.000000',
    });
  });

  it('rejects changing the selected quotation revision while leveled cells still reference the prior revision', async () => {
    await seedComparisonBasis();
    await pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         source_quotation_line_id, coverage_status, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6, 'EXACT', $7)`,
      [cellOneOne, tenant, comparison, rowOne, comparisonBidderOne, quoteLineOneA, principal],
    );
    await insertQuote({
      quoteId: quoteOneR1,
      bidderId: issueBidderOne,
      revisionNo: 1,
      supersedes: quoteOneR0,
      reference: 'SUP1-R1',
    });

    await expect(pool.query(
      `UPDATE procurement.bid_comparison_bidder_selection
       SET selected_quotation_revision_id = $1
       WHERE tenant_id = $2 AND comparison_bidder_id = $3`,
      [quoteOneR1, tenant, comparisonBidderOne],
    )).rejects.toMatchObject({ code: '23514' });
  });

  it('rejects changing base currency after normalized comparison data exists', async () => {
    await seedComparisonBasis();
    await pool.query(
      `INSERT INTO procurement.bid_comparison_cell (
         comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
         source_quotation_line_id, coverage_status, normalized_amount, normalization_basis, recorded_by
       ) VALUES ($1, $2, $3, $4, $5, $6, 'EXACT', 1234.567890, 'Buyer confirmed basis', $7)`,
      [cellOneOne, tenant, comparison, rowOne, comparisonBidderOne, quoteLineOneA, principal],
    );

    await expect(pool.query(
      `UPDATE procurement.bid_comparison SET base_currency = 'USD'
       WHERE tenant_id = $1 AND comparison_id = $2`,
      [tenant, comparison],
    )).rejects.toMatchObject({ code: '23514' });
  });
});
