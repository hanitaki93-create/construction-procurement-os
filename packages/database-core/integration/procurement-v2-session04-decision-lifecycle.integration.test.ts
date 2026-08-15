import path from 'node:path';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { runMigrations } from '../src/internal/migrations.js';
import { createIntegrationPool, dropSchema, uniqueSchema } from './test-support.js';

const pool = createIntegrationPool('cpos-v2-session04-decision-lifecycle');
const trackingSchema = uniqueSchema('v2_session04_decision_lifecycle_tracking');

const tenant = '019e1600-0000-7000-8000-000000000001';
const principal = '019e1600-0000-7000-8000-000000000002';
const legal = '019e1600-0000-7000-8000-000000000003';
const authority = '019e1600-0000-7000-8000-000000000004';
const project = '019e1600-0000-7000-8000-000000000005';
const membership = '019e1600-0000-7000-8000-000000000006';
const ownerRole = '019e1600-0000-7000-8000-000000000007';
const subscription = '019e1600-0000-7000-8000-000000000008';
const supplier = '019e1600-0000-7000-8000-000000000009';
const mr = '019e1600-0000-7000-8000-000000000010';
const mrLine = '019e1600-0000-7000-8000-000000000011';
const route = '019e1600-0000-7000-8000-000000000012';
const rfq = '019e1600-0000-7000-8000-000000000013';
const rfqLine = '019e1600-0000-7000-8000-000000000014';
const rfqBidder = '019e1600-0000-7000-8000-000000000015';
const issue = '019e1600-0000-7000-8000-000000000016';
const issueLine = '019e1600-0000-7000-8000-000000000017';
const issueBidder = '019e1600-0000-7000-8000-000000000018';
const quote = '019e1600-0000-7000-8000-000000000019';
const quoteLine = '019e1600-0000-7000-8000-000000000020';
const comparison = '019e1600-0000-7000-8000-000000000021';
const comparisonBidder = '019e1600-0000-7000-8000-000000000022';
const comparisonRow = '019e1600-0000-7000-8000-000000000023';
const comparisonCell = '019e1600-0000-7000-8000-000000000024';
const confirmedBasis = '019e1600-0000-7000-8000-000000000025';

async function inExecutionContext<Result>(
  callback: (query: (text: string, values?: unknown[]) => Promise<any>) => Promise<Result>,
): Promise<Result> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `SELECT set_config('cpos.tenant_id', $1, true), set_config('cpos.principal_id', $2, true)`,
      [tenant, principal],
    );
    const result = await callback((text, values) => client.query(text, values));
    await client.query('COMMIT');
    return result;
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

beforeAll(async () => {
  await runMigrations(pool, {
    directory: path.resolve('../../migrations/sql'),
    schema: trackingSchema,
    buildId: 'v2-session04-decision-lifecycle-integration',
  });
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');

  await pool.query(
    `INSERT INTO platform.tenant (tenant_id, display_name)
     VALUES ($1, 'Session 04 Decision Lifecycle Tenant')`,
    [tenant],
  );
  await pool.query(
    `INSERT INTO platform.legal_entity (legal_entity_id, tenant_id) VALUES ($1, $2)`,
    [legal, tenant],
  );
  await pool.query(
    `INSERT INTO platform.contracting_authority_context (authority_context_id, tenant_id, context_kind)
     VALUES ($1, $2, 'SINGLE_LEGAL_ENTITY')`,
    [authority, tenant],
  );
  await pool.query(
    `INSERT INTO platform.principal (principal_id, tenant_id, principal_kind, display_name, lifecycle_state)
     VALUES ($1, $2, 'HUMAN', 'Session 04 Decision Owner', 'ACTIVE')`,
    [principal, tenant],
  );
  await pool.query(
    `INSERT INTO platform.tenant_membership (membership_id, tenant_id, principal_id)
     VALUES ($1, $2, $3)`,
    [membership, tenant, principal],
  );
  await pool.query(
    `INSERT INTO platform.tenant_membership_version (
       membership_id, tenant_id, version, membership_state, effective_period
     ) VALUES ($1, $2, 1, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [membership, tenant],
  );
  await pool.query(
    `INSERT INTO platform.role_assignment (role_assignment_id, tenant_id, membership_id, role_key)
     VALUES ($1, $2, $3, 'OWNER')`,
    [ownerRole, tenant, membership],
  );
  await pool.query(
    `INSERT INTO platform.role_assignment_version (
       role_assignment_id, tenant_id, version, assignment_state, effective_period
     ) VALUES ($1, $2, 1, 'ACTIVE', tstzrange('2026-01-01', NULL, '[)'))`,
    [ownerRole, tenant],
  );
  await pool.query(
    `INSERT INTO platform.project (project_id, tenant_id, authority_context_id)
     VALUES ($1, $2, $3)`,
    [project, tenant, authority],
  );
  await inExecutionContext(async (query) => {
    await query(
      `INSERT INTO platform.project_version (
         project_id, tenant_id, version, project_code, display_name, lifecycle_state, effective_period
       ) VALUES ($1, $2, 1, 'S04-R07', 'Session 04 Decision Lifecycle Project', 'ACTIVE',
         tstzrange('2026-01-01', NULL, '[)'))`,
      [project, tenant],
    );
  });
  await activateTenant();

  await pool.query(
    `INSERT INTO procurement.supplier (
       supplier_id, tenant_id, supplier_code, legal_name, supplier_type, supplier_state,
       country_code, created_by
     ) VALUES ($1, $2, 'SUP-R07', 'Decision Lifecycle Supplier LLC', 'MATERIAL_SUPPLIER',
       'ACTIVE', 'AE', $3)`,
    [supplier, tenant, principal],
  );
  await pool.query(
    `INSERT INTO procurement.material_requisition (
       mr_id, tenant_id, project_id, mr_number, numbering_scope_key, requester_id,
       request_date, required_on_site_date, priority, subject, status, submitted_at, created_by
     ) VALUES ($1, $2, $3, 'MR-R07-1', 'TEST', $4, DATE '2026-08-01', DATE '2026-09-15',
       'NORMAL', 'Decision lifecycle MR', 'APPROVED', '2026-08-02T00:00:00Z', $4)`,
    [mr, tenant, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.material_requisition_line (
       mr_line_id, tenant_id, mr_id, line_no, entry_mode, line_type, description,
       requested_quantity, approved_quantity, uom_code, line_state
     ) VALUES ($1, $2, $3, 10, 'FREE_FORM', 'MATERIAL', 'Decision lifecycle material',
       10, 10, 'EA', 'APPROVED')`,
    [mrLine, tenant, mr],
  );
  await pool.query(
    `INSERT INTO procurement.procurement_route_decision (
       route_decision_id, tenant_id, mr_line_id, policy_key, policy_version, route,
       justification, decided_by, is_current
     ) VALUES ($1, $2, $3, 'UAE_CONTRACTOR_STARTER', 1, 'COMPETITIVE_RFQ',
       'Competitive return required', $4, true)`,
    [route, tenant, mrLine, principal],
  );

  await pool.query(
    `INSERT INTO procurement.rfq_tender (
       rfq_id, tenant_id, project_id, rfq_number, numbering_scope_key, title, event_type,
       buyer_id, route_policy_key, route_policy_version, response_due_at, response_timezone,
       currency, pricing_basis, evaluation_mode, bid_visibility_policy, status, revision_no, created_by
     ) VALUES ($1, $2, $3, 'RFQ-R07-1', 'TEST', 'Decision Lifecycle RFQ', 'RFQ', $4,
       'UAE_CONTRACTOR_STARTER', 1, '2026-10-01T12:00:00Z', 'Asia/Dubai', 'AED',
       'UNIT_AND_TOTAL', 'COMBINED', 'BUYER_AFTER_CLOSE', 'DRAFT', 0, $4)`,
    [rfq, tenant, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_line (
       rfq_line_id, tenant_id, rfq_id, line_no, mr_line_id, description, specification,
       quantity, uom_code, required_date, equivalent_rule
     ) VALUES ($1, $2, $3, 10, $4, 'Issued decision lifecycle line', 'Spec', 10, 'EA',
       DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL')`,
    [rfqLine, tenant, rfq, mrLine],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_bidder (
       rfq_bidder_id, tenant_id, rfq_id, supplier_id, invitation_state, eligibility_note
     ) VALUES ($1, $2, $3, $4, 'READY', 'Eligible')`,
    [rfqBidder, tenant, rfq, supplier],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue (
       rfq_issue_id, tenant_id, rfq_id, revision_no, rfq_number, title, event_type, project_id,
       buyer_id, issued_at, response_due_at, response_timezone, currency, pricing_basis,
       evaluation_mode, bid_visibility_policy, route_policy_key, route_policy_version, issued_by
     ) VALUES ($1, $2, $3, 0, 'RFQ-R07-1', 'Decision Lifecycle RFQ', 'RFQ', $4, $5,
       '2026-08-14T12:00:00Z', '2026-10-01T12:00:00Z', 'Asia/Dubai', 'AED', 'UNIT_AND_TOTAL',
       'COMBINED', 'BUYER_AFTER_CLOSE', 'UAE_CONTRACTOR_STARTER', 1, $5)`,
    [issue, tenant, rfq, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue_line (
       rfq_issue_line_id, tenant_id, rfq_issue_id, source_rfq_line_id, line_no, mr_line_id,
       description, specification, quantity, uom_code, required_date, equivalent_rule
     ) VALUES ($1, $2, $3, $4, 10, $5, 'Issued decision lifecycle line', 'Spec', 10, 'EA',
       DATE '2026-09-15', 'ALTERNATE_BY_APPROVAL')`,
    [issueLine, tenant, issue, rfqLine, mrLine],
  );
  await pool.query(
    `INSERT INTO procurement.rfq_tender_issue_bidder (
       rfq_issue_bidder_id, tenant_id, rfq_issue_id, source_rfq_bidder_id, supplier_id,
       invitation_state, eligibility_note
     ) VALUES ($1, $2, $3, $4, $5, 'INVITED', 'Eligible')`,
    [issueBidder, tenant, issue, rfqBidder, supplier],
  );
  await pool.query(
    `INSERT INTO procurement.supplier_quotation_revision (
       quotation_revision_id, tenant_id, rfq_issue_bidder_id, revision_no,
       supplier_quotation_reference, quotation_date, received_at, response_channel, capture_mode,
       captured_by_principal_id, currency, validity_until, payment_terms, response_status,
       source_file_name, source_media_type, source_sha256, created_by
     ) VALUES ($1, $2, $3, 0, 'SUP-R07-Q0', DATE '2026-08-14', '2026-08-15T08:00:00Z',
       'BUYER_CAPTURE', 'BUYER_ON_BEHALF', $4, 'AED', DATE '2026-11-30', '45 days',
       'RECEIVED', 'supplier-r07.pdf', 'application/pdf', repeat('d', 64), $4)`,
    [quote, tenant, issueBidder, principal],
  );
  await pool.query(
    `INSERT INTO procurement.supplier_quotation_line (
       quotation_line_id, tenant_id, quotation_revision_id, rfq_issue_line_id, supplier_line_no,
       supplier_description, quoted_quantity, quoted_uom_code, unit_rate, line_amount,
       line_type, source_reference
     ) VALUES ($1, $2, $3, $4, '1', 'Supplier confirmed lifecycle material', 10, 'EA',
       125, 1250, 'BASE', 'PDF p.1')`,
    [quoteLine, tenant, quote, issueLine],
  );

  await pool.query(
    `INSERT INTO procurement.bid_comparison (
       comparison_id, tenant_id, rfq_issue_id, project_id, title, base_currency, created_by
     ) VALUES ($1, $2, $3, $4, 'Decision Lifecycle Comparison', 'AED', $5)`,
    [comparison, tenant, issue, project, principal],
  );
  await pool.query(
    `INSERT INTO procurement.bid_comparison_bidder_selection (
       comparison_bidder_id, tenant_id, comparison_id, rfq_issue_bidder_id,
       selected_quotation_revision_id, recorded_by
     ) VALUES ($1, $2, $3, $4, $5, $6)`,
    [comparisonBidder, tenant, comparison, issueBidder, quote, principal],
  );
  await pool.query(
    `INSERT INTO procurement.bid_comparison_row (
       comparison_row_id, tenant_id, comparison_id, row_no, row_kind, rfq_issue_line_id,
       description, target_quantity, target_uom_code, recorded_by
     ) VALUES ($1, $2, $3, 10, 'RFQ_LINE', $4, 'Issued decision lifecycle line', 10, 'EA', $5)`,
    [comparisonRow, tenant, comparison, issueLine, principal],
  );
  await pool.query(
    `INSERT INTO procurement.bid_comparison_cell (
       comparison_cell_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
       source_quotation_line_id, coverage_status, normalized_quantity, normalized_uom_code,
       normalized_unit_rate, normalized_amount, normalization_basis, recorded_by
     ) VALUES ($1, $2, $3, $4, $5, $6, 'EXACT', 10, 'EA', 125, 1250,
       'Source arithmetic only', $7)`,
    [comparisonCell, tenant, comparison, comparisonRow, comparisonBidder, quoteLine, principal],
  );
});

afterAll(async () => {
  await pool.query('TRUNCATE TABLE platform.bootstrap_intent, platform.tenant CASCADE');
  await dropSchema(pool, trackingSchema);
  await pool.end();
});

describe('Architecture V2 Session 04 Recommendation → Approval → Award lifecycle', () => {
  it('pins confirmed basis, freezes submission, records conditional approval, satisfies the award condition, and reaches handoff', async () => {
    const authorityIds = await inExecutionContext(async (query) => {
      await query(
        `INSERT INTO procurement.bid_comparison_confirmed_basis (
           confirmed_basis_id, tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
           basis_version, confirmation_kind, source_quotation_revision_id, source_confirmation_refs,
           confirmed_description, confirmed_quantity, confirmed_uom_code, confirmed_unit_rate,
           confirmed_amount, currency, confirmed_terms, recorded_by
         ) VALUES ($1, $2, $3, $4, $5, 1, 'QUOTATION_REVISION', $6, '["PDF p.1"]'::jsonb,
           'Supplier confirmed lifecycle material', 10, 'EA', 125, 1250, 'AED',
           '{"payment":"45 days"}'::jsonb, $7)`,
        [confirmedBasis, tenant, comparison, comparisonRow, comparisonBidder, quote, principal],
      );

      const frozen = await query(
        `SELECT procurement.freeze_bid_comparison($1)::text AS snapshot_id`,
        [comparison],
      );
      const snapshotId = frozen.rows[0]?.snapshot_id as string;
      const snapshotBasis = await query(
        `SELECT snapshot_confirmed_basis_id::text
         FROM procurement.bid_comparison_snapshot_confirmed_basis
         WHERE tenant_id = $1 AND comparison_snapshot_id = $2 AND confirmed_basis_id = $3`,
        [tenant, snapshotId, confirmedBasis],
      );
      const snapshotConfirmedBasisId = snapshotBasis.rows[0]?.snapshot_confirmed_basis_id as string;

      const created = await query(
        `SELECT procurement.create_award_recommendation(
           $1::uuid,
           'SINGLE_SUPPLIER',
           'CONDITIONAL',
           'Recommend the exact supplier-confirmed frozen basis subject to approval condition.',
           NULL,
           NULL,
           'Only one comparable response was available; exception is explicitly recorded for approval.',
           '["BUDGET-R07"]'::jsonb,
           '["TECH-R07"]'::jsonb,
           '["ELIGIBILITY-R07"]'::jsonb,
           '["SUPPLIER-INTEL-R07"]'::jsonb,
           '["Conditional commercial close-out"]'::jsonb,
           NULL
         )::text AS recommendation_id`,
        [snapshotId],
      );
      const recommendationId = created.rows[0]?.recommendation_id as string;

      await query(
        `SELECT procurement.add_award_recommendation_basis($1::uuid, $2::uuid, NULL)`,
        [recommendationId, snapshotConfirmedBasisId],
      );
      const submitted = await query(
        `SELECT procurement.submit_award_recommendation($1::uuid)::text AS approval_case_id`,
        [recommendationId],
      );

      return {
        recommendationId,
        approvalCaseId: submitted.rows[0]?.approval_case_id as string,
      };
    });

    await expect(inExecutionContext(async (query) => {
      await query(
        `SELECT procurement.update_award_recommendation_draft(
           $1::uuid,
           'SINGLE_SUPPLIER',
           'CLEAR',
           'Attempted rewrite after submission',
           NULL,
           NULL,
           'Exception',
           '[]'::jsonb,
           '[]'::jsonb,
           '[]'::jsonb,
           '[]'::jsonb,
           '[]'::jsonb
         )`,
        [authorityIds.recommendationId],
      );
    })).rejects.toMatchObject({ code: '55000' });

    const awardIds = await inExecutionContext(async (query) => {
      const approval = await query(
        `SELECT procurement.act_on_procurement_approval(
           $1::uuid,
           'APPROVE_WITH_CONDITIONS',
           'Obtain final written delivery-program confirmation before commitment formation.',
           'Conditional approval for the exact frozen commercial basis.'
         ) AS approval_status`,
        [authorityIds.approvalCaseId],
      );
      expect(approval.rows[0]?.approval_status).toBe('CONDITIONALLY_APPROVED');

      const recorded = await query(
        `SELECT procurement.record_award_decision(
           $1::uuid,
           'Record the approved conditional award without creating any LPO, PO or subcontract.'
         )::text AS award_decision_id`,
        [authorityIds.recommendationId],
      );
      const awardDecisionId = recorded.rows[0]?.award_decision_id as string;
      const condition = await query(
        `SELECT award_condition_id::text
         FROM procurement.award_decision_condition
         WHERE tenant_id = $1 AND award_decision_id = $2`,
        [tenant, awardDecisionId],
      );
      return {
        awardDecisionId,
        awardConditionId: condition.rows[0]?.award_condition_id as string,
      };
    });

    await inExecutionContext(async (query) => {
      await query(
        `SELECT procurement.satisfy_award_condition(
           $1::uuid,
           $2::uuid,
           '["WRITTEN-CONFIRMATION-R07"]'::jsonb
         )`,
        [awardIds.awardDecisionId, awardIds.awardConditionId],
      );
      await query(
        `SELECT procurement.make_award_effective_for_handoff($1::uuid)`,
        [awardIds.awardDecisionId],
      );
    });

    const result = await pool.query<{
      readonly recommendation_status: string;
      readonly approval_status: string;
      readonly award_status: string;
      readonly award_type: string;
      readonly recommended_value: string;
      readonly currency: string;
      readonly selection_count: string;
      readonly condition_count: string;
      readonly satisfied_count: string;
      readonly supplier_basis_count: string;
    }>(
      `SELECT
         r.status AS recommendation_status,
         ac.status AS approval_status,
         ad.status AS award_status,
         ad.award_type,
         r.recommended_value::text,
         r.currency,
         (SELECT count(*)::text
          FROM procurement.award_recommendation_selection s
          WHERE s.tenant_id = r.tenant_id AND s.recommendation_id = r.recommendation_id) AS selection_count,
         (SELECT count(*)::text
          FROM procurement.award_decision_condition c
          WHERE c.tenant_id = ad.tenant_id AND c.award_decision_id = ad.award_decision_id) AS condition_count,
         (SELECT count(*)::text
          FROM procurement.award_condition_satisfaction_occurrence so
          JOIN procurement.award_decision_condition c
            ON c.tenant_id = so.tenant_id AND c.award_condition_id = so.award_condition_id
          WHERE c.tenant_id = ad.tenant_id AND c.award_decision_id = ad.award_decision_id) AS satisfied_count,
         (SELECT count(*)::text
          FROM procurement.award_decision_supplier_basis sb
          WHERE sb.tenant_id = ad.tenant_id AND sb.award_decision_id = ad.award_decision_id) AS supplier_basis_count
       FROM procurement.award_recommendation r
       JOIN platform.approval_case ac
         ON ac.tenant_id = r.tenant_id AND ac.approval_case_id = r.approval_case_id
       JOIN procurement.award_decision ad
         ON ad.tenant_id = r.tenant_id AND ad.recommendation_id = r.recommendation_id
       WHERE r.tenant_id = $1 AND r.recommendation_id = $2`,
      [tenant, authorityIds.recommendationId],
    );

    expect(result.rows[0]).toEqual({
      recommendation_status: 'APPROVED',
      approval_status: 'CONDITIONALLY_APPROVED',
      award_status: 'EFFECTIVE_FOR_HANDOFF',
      award_type: 'CONDITIONAL',
      recommended_value: '1250.000000',
      currency: 'AED',
      selection_count: '1',
      condition_count: '1',
      satisfied_count: '1',
      supplier_basis_count: '1',
    });
  });
});
