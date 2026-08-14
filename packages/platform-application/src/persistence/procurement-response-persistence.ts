import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface ResponseRfqRow {
  readonly rfq_id: string;
  readonly revision_no: number;
  readonly status: 'DRAFT' | 'REVIEW' | 'READY' | 'ISSUED' | 'ADDENDUM' | 'REISSUED' | 'CLOSED' | 'CANCELLED';
  readonly source_line_count: number;
  readonly bidder_count: number;
}

export interface RfqIssueHeaderRow {
  readonly rfq_issue_id: string;
  readonly rfq_id: string;
  readonly revision_no: number;
  readonly rfq_number: string;
  readonly title: string;
  readonly event_type: 'RFQ' | 'TENDER' | 'RFP';
  readonly project_id: string;
  readonly package_id: string | null;
  readonly buyer_id: string;
  readonly issued_at: string;
  readonly response_due_at: string;
  readonly response_timezone: string;
  readonly currency: string;
  readonly pricing_basis: 'UNIT_AND_TOTAL' | 'LUMP_SUM' | 'RATE_SCHEDULE' | 'MIXED';
  readonly payment_term_requirement: string | null;
  readonly validity_days: number | null;
  readonly commercial_instructions: string | null;
  readonly submission_instructions: string | null;
  readonly evaluation_mode: 'COMBINED' | 'TWO_STAGE';
  readonly bid_visibility_policy: 'BUYER_AFTER_CLOSE' | 'BUYER_ON_RECEIPT' | 'SEALED_TWO_STAGE';
  readonly route_policy_key: string;
  readonly route_policy_version: number;
  readonly issued_by: string;
}

export interface RfqIssueLineRow {
  readonly rfq_issue_line_id: string;
  readonly source_rfq_line_id: string;
  readonly line_no: number;
  readonly mr_line_id: string;
  readonly package_scope_id: string | null;
  readonly description: string;
  readonly specification: string | null;
  readonly quantity: string;
  readonly uom_code: string;
  readonly required_date: string | null;
  readonly equivalent_rule: 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';
}

export interface RfqIssueBidderRow {
  readonly rfq_issue_bidder_id: string;
  readonly source_rfq_bidder_id: string;
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly legal_name: string;
  readonly supplier_contact_id: string | null;
  readonly contact_name: string | null;
  readonly contact_email: string | null;
  readonly invitation_state: 'INVITED';
  readonly eligibility_note: string | null;
}

export interface SupplierIntentEventRow {
  readonly intent_event_id: string;
  readonly rfq_issue_bidder_id: string;
  readonly intent: 'WILL_BID' | 'NO_BID';
  readonly reason: string | null;
  readonly channel: 'SECURE_TASK' | 'EMAIL' | 'PHONE' | 'BUYER_CAPTURE' | 'OTHER';
  readonly recorded_by: string;
  readonly recorded_at: string;
}

export interface SupplierResponseRegisterRowDb {
  readonly rfq_id: string;
  readonly rfq_number: string;
  readonly rfq_title: string;
  readonly issue_revision_no: number;
  readonly rfq_issue_id: string;
  readonly response_due_at: string;
  readonly rfq_issue_bidder_id: string;
  readonly source_rfq_bidder_id: string;
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly supplier_legal_name: string;
  readonly contact_name: string | null;
  readonly contact_email: string | null;
  readonly invitation_state: 'INVITED';
  readonly intent: 'WILL_BID' | 'NO_BID' | null;
  readonly intent_reason: string | null;
  readonly intent_channel: 'SECURE_TASK' | 'EMAIL' | 'PHONE' | 'BUYER_CAPTURE' | 'OTHER' | null;
  readonly intent_recorded_at: string | null;
  readonly latest_quotation_revision_id: string | null;
  readonly latest_revision_no: number | null;
  readonly received_at: string | null;
  readonly response_channel: 'SECURE_TASK' | 'FILE_UPLOAD' | 'EMAIL' | 'BUYER_CAPTURE' | 'API' | 'OTHER' | null;
  readonly currency: string | null;
  readonly validity_until: string | null;
  readonly response_status: 'RECEIVED' | 'WITHDRAWN' | 'FINAL' | null;
  readonly is_late: boolean | null;
  readonly line_count: number;
  readonly source_file_name: string | null;
}

export interface SupplierQuotationHeaderRow {
  readonly quotation_revision_id: string;
  readonly rfq_issue_bidder_id: string;
  readonly revision_no: number;
  readonly supersedes_revision_id: string | null;
  readonly supplier_quotation_reference: string | null;
  readonly quotation_date: string | null;
  readonly received_at: string;
  readonly response_channel: 'SECURE_TASK' | 'FILE_UPLOAD' | 'EMAIL' | 'BUYER_CAPTURE' | 'API' | 'OTHER';
  readonly capture_mode: 'SUPPLIER_DIRECT' | 'BUYER_ON_BEHALF' | 'INTEGRATION';
  readonly captured_by_principal_id: string | null;
  readonly currency: string;
  readonly validity_until: string | null;
  readonly lead_time_promise: string | null;
  readonly delivery_promise: string | null;
  readonly payment_terms: string | null;
  readonly warranty_terms: string | null;
  readonly commercial_notes: string | null;
  readonly response_status: 'RECEIVED' | 'WITHDRAWN' | 'FINAL';
  readonly source_file_name: string | null;
  readonly source_media_type: string | null;
  readonly source_sha256: string | null;
  readonly source_channel_reference: string | null;
  readonly is_late: boolean;
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly supplier_legal_name: string;
  readonly contact_name: string | null;
  readonly rfq_issue_id: string;
  readonly rfq_id: string;
  readonly rfq_number: string;
  readonly rfq_title: string;
  readonly issue_revision_no: number;
}

export interface SupplierQuotationLineRow {
  readonly quotation_line_id: string;
  readonly rfq_issue_line_id: string | null;
  readonly rfq_line_no: number | null;
  readonly supplier_line_no: string | null;
  readonly supplier_description: string;
  readonly quoted_quantity: string | null;
  readonly quoted_uom_code: string | null;
  readonly unit_rate: string | null;
  readonly line_amount: string | null;
  readonly tax_amount: string | null;
  readonly brand: string | null;
  readonly manufacturer: string | null;
  readonly model: string | null;
  readonly lead_time_override: string | null;
  readonly inclusion_exclusion_note: string | null;
  readonly deviation_note: string | null;
  readonly line_type: 'BASE' | 'ALTERNATE' | 'SUBSTITUTE' | 'UNMAPPED';
  readonly source_reference: string | null;
}

export interface ProcurementResponsePersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  canManageSourcing(): Promise<boolean>;
  rfqForIssue(rfqId: string): Promise<ResponseRfqRow | undefined>;
  createIssueFromRfq(rfqId: string, issuedAt: string, issuedBy: string): Promise<string>;
  snapshotIssueLines(rfqIssueId: string, rfqId: string): Promise<number>;
  snapshotIssueBidders(rfqIssueId: string, rfqId: string): Promise<number>;
  markRfqIssued(rfqId: string, issuedAt: string): Promise<void>;
  markRfqBiddersInvited(rfqId: string): Promise<void>;
  latestIssueForRfq(rfqId: string): Promise<RfqIssueHeaderRow | undefined>;
  issue(issueId: string): Promise<RfqIssueHeaderRow | undefined>;
  issueLines(issueId: string): Promise<readonly RfqIssueLineRow[]>;
  issueBidders(issueId: string): Promise<readonly RfqIssueBidderRow[]>;
  issueBidderBySource(rfqIssueId: string, sourceRfqBidderId: string): Promise<RfqIssueBidderRow | undefined>;
  recordIntent(input: {
    readonly issueBidderId: string;
    readonly intent: SupplierIntentEventRow['intent'];
    readonly reason: string | null;
    readonly channel: SupplierIntentEventRow['channel'];
    readonly recordedBy: string;
  }): Promise<string>;
  intentEvent(intentEventId: string): Promise<SupplierIntentEventRow | undefined>;
  responseRegister(rfqId?: string): Promise<readonly SupplierResponseRegisterRowDb[]>;
  lockIssueBidder(issueBidderId: string): Promise<RfqIssueBidderRow | undefined>;
  latestIntent(issueBidderId: string): Promise<SupplierIntentEventRow | undefined>;
  latestQuotation(issueBidderId: string): Promise<SupplierQuotationHeaderRow | undefined>;
  createQuotation(input: {
    readonly issueBidderId: string;
    readonly revisionNo: number;
    readonly supersedesRevisionId: string | null;
    readonly supplierQuotationReference: string | null;
    readonly quotationDate: string | null;
    readonly receivedAt: string;
    readonly responseChannel: SupplierQuotationHeaderRow['response_channel'];
    readonly captureMode: SupplierQuotationHeaderRow['capture_mode'];
    readonly capturedByPrincipalId: string | null;
    readonly currency: string;
    readonly validityUntil: string | null;
    readonly leadTimePromise: string | null;
    readonly deliveryPromise: string | null;
    readonly paymentTerms: string | null;
    readonly warrantyTerms: string | null;
    readonly commercialNotes: string | null;
    readonly responseStatus: SupplierQuotationHeaderRow['response_status'];
    readonly sourceFileName: string | null;
    readonly sourceMediaType: string | null;
    readonly sourceSha256: string | null;
    readonly sourceChannelReference: string | null;
    readonly createdBy: string;
  }): Promise<string>;
  createQuotationLine(input: {
    readonly quotationRevisionId: string;
    readonly rfqIssueLineId: string | null;
    readonly supplierLineNo: string | null;
    readonly supplierDescription: string;
    readonly quotedQuantity: string | null;
    readonly quotedUomCode: string | null;
    readonly unitRate: string | null;
    readonly lineAmount: string | null;
    readonly taxAmount: string | null;
    readonly brand: string | null;
    readonly manufacturer: string | null;
    readonly model: string | null;
    readonly leadTimeOverride: string | null;
    readonly inclusionExclusionNote: string | null;
    readonly deviationNote: string | null;
    readonly lineType: SupplierQuotationLineRow['line_type'];
    readonly sourceReference: string | null;
  }): Promise<string>;
  quotation(quotationRevisionId: string): Promise<SupplierQuotationHeaderRow | undefined>;
  quotationLines(quotationRevisionId: string): Promise<readonly SupplierQuotationLineRow[]>;
  quotationHistory(issueBidderId: string): Promise<readonly SupplierQuotationHeaderRow[]>;
}

function issueHeaderSelect(filter: { readonly issueId?: string; readonly rfqId?: string }) {
  if (filter.issueId !== undefined) {
    return sql`
      SELECT i.rfq_issue_id::text, i.rfq_id::text, i.revision_no, i.rfq_number, i.title, i.event_type,
             i.project_id::text, i.package_id::text, i.buyer_id::text, i.issued_at::text, i.response_due_at::text,
             i.response_timezone, i.currency, i.pricing_basis, i.payment_term_requirement, i.validity_days,
             i.commercial_instructions, i.submission_instructions, i.evaluation_mode, i.bid_visibility_policy,
             i.route_policy_key, i.route_policy_version, i.issued_by::text
      FROM procurement.rfq_tender_issue i
      WHERE i.tenant_id = current_setting('cpos.tenant_id')::uuid AND i.rfq_issue_id = ${filter.issueId}
    `;
  }
  return sql`
    SELECT i.rfq_issue_id::text, i.rfq_id::text, i.revision_no, i.rfq_number, i.title, i.event_type,
           i.project_id::text, i.package_id::text, i.buyer_id::text, i.issued_at::text, i.response_due_at::text,
           i.response_timezone, i.currency, i.pricing_basis, i.payment_term_requirement, i.validity_days,
           i.commercial_instructions, i.submission_instructions, i.evaluation_mode, i.bid_visibility_policy,
           i.route_policy_key, i.route_policy_version, i.issued_by::text
    FROM procurement.rfq_tender_issue i
    WHERE i.tenant_id = current_setting('cpos.tenant_id')::uuid AND i.rfq_id = ${filter.rfqId!}
    ORDER BY i.revision_no DESC
    LIMIT 1
  `;
}

function issueBidderSelect(issueBidderId?: string, issueId?: string, sourceBidderId?: string) {
  if (issueBidderId !== undefined) {
    return sql`
      SELECT ib.rfq_issue_bidder_id::text, ib.source_rfq_bidder_id::text, ib.supplier_id::text,
             s.supplier_code, s.legal_name, ib.supplier_contact_id::text,
             sc.display_name AS contact_name, sc.email AS contact_email, ib.invitation_state, ib.eligibility_note
      FROM procurement.rfq_tender_issue_bidder ib
      JOIN procurement.supplier s ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
      LEFT JOIN procurement.supplier_contact sc ON sc.tenant_id = ib.tenant_id AND sc.supplier_contact_id = ib.supplier_contact_id
      WHERE ib.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND ib.rfq_issue_bidder_id = ${issueBidderId}
    `;
  }
  return sql`
    SELECT ib.rfq_issue_bidder_id::text, ib.source_rfq_bidder_id::text, ib.supplier_id::text,
           s.supplier_code, s.legal_name, ib.supplier_contact_id::text,
           sc.display_name AS contact_name, sc.email AS contact_email, ib.invitation_state, ib.eligibility_note
    FROM procurement.rfq_tender_issue_bidder ib
    JOIN procurement.supplier s ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
    LEFT JOIN procurement.supplier_contact sc ON sc.tenant_id = ib.tenant_id AND sc.supplier_contact_id = ib.supplier_contact_id
    WHERE ib.tenant_id = current_setting('cpos.tenant_id')::uuid
      AND ib.rfq_issue_id = ${issueId!}
      AND ib.source_rfq_bidder_id = ${sourceBidderId!}
  `;
}

const quotationHeaderColumns = `
  q.quotation_revision_id::text, q.rfq_issue_bidder_id::text, q.revision_no,
  q.supersedes_revision_id::text, q.supplier_quotation_reference, q.quotation_date::text,
  q.received_at::text, q.response_channel, q.capture_mode, q.captured_by_principal_id::text,
  q.currency, q.validity_until::text, q.lead_time_promise, q.delivery_promise, q.payment_terms,
  q.warranty_terms, q.commercial_notes, q.response_status, q.source_file_name, q.source_media_type,
  q.source_sha256, q.source_channel_reference, q.is_late,
  ib.supplier_id::text, s.supplier_code, s.legal_name AS supplier_legal_name,
  sc.display_name AS contact_name, i.rfq_issue_id::text, i.rfq_id::text, i.rfq_number,
  i.title AS rfq_title, i.revision_no AS issue_revision_no
`;

// Keep three explicit SQL statements. The repository SQL tag accepts bindable values only;
// it intentionally does not accept nested SqlStatement fragments.
function quotationByRevisionSelect(quotationRevisionId: string) {
  return sql`
    SELECT q.quotation_revision_id::text, q.rfq_issue_bidder_id::text, q.revision_no,
           q.supersedes_revision_id::text, q.supplier_quotation_reference, q.quotation_date::text,
           q.received_at::text, q.response_channel, q.capture_mode, q.captured_by_principal_id::text,
           q.currency, q.validity_until::text, q.lead_time_promise, q.delivery_promise, q.payment_terms,
           q.warranty_terms, q.commercial_notes, q.response_status, q.source_file_name, q.source_media_type,
           q.source_sha256, q.source_channel_reference, q.is_late,
           ib.supplier_id::text, s.supplier_code, s.legal_name AS supplier_legal_name,
           sc.display_name AS contact_name, i.rfq_issue_id::text, i.rfq_id::text, i.rfq_number,
           i.title AS rfq_title, i.revision_no AS issue_revision_no
    FROM procurement.supplier_quotation_revision q
    JOIN procurement.rfq_tender_issue_bidder ib
      ON ib.tenant_id = q.tenant_id AND ib.rfq_issue_bidder_id = q.rfq_issue_bidder_id
    JOIN procurement.rfq_tender_issue i
      ON i.tenant_id = ib.tenant_id AND i.rfq_issue_id = ib.rfq_issue_id
    JOIN procurement.supplier s
      ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
    LEFT JOIN procurement.supplier_contact sc
      ON sc.tenant_id = ib.tenant_id AND sc.supplier_contact_id = ib.supplier_contact_id
    WHERE q.tenant_id = current_setting('cpos.tenant_id')::uuid
      AND q.quotation_revision_id = ${quotationRevisionId}
  `;
}

function latestQuotationSelect(issueBidderId: string) {
  return sql`
    SELECT q.quotation_revision_id::text, q.rfq_issue_bidder_id::text, q.revision_no,
           q.supersedes_revision_id::text, q.supplier_quotation_reference, q.quotation_date::text,
           q.received_at::text, q.response_channel, q.capture_mode, q.captured_by_principal_id::text,
           q.currency, q.validity_until::text, q.lead_time_promise, q.delivery_promise, q.payment_terms,
           q.warranty_terms, q.commercial_notes, q.response_status, q.source_file_name, q.source_media_type,
           q.source_sha256, q.source_channel_reference, q.is_late,
           ib.supplier_id::text, s.supplier_code, s.legal_name AS supplier_legal_name,
           sc.display_name AS contact_name, i.rfq_issue_id::text, i.rfq_id::text, i.rfq_number,
           i.title AS rfq_title, i.revision_no AS issue_revision_no
    FROM procurement.supplier_quotation_revision q
    JOIN procurement.rfq_tender_issue_bidder ib
      ON ib.tenant_id = q.tenant_id AND ib.rfq_issue_bidder_id = q.rfq_issue_bidder_id
    JOIN procurement.rfq_tender_issue i
      ON i.tenant_id = ib.tenant_id AND i.rfq_issue_id = ib.rfq_issue_id
    JOIN procurement.supplier s
      ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
    LEFT JOIN procurement.supplier_contact sc
      ON sc.tenant_id = ib.tenant_id AND sc.supplier_contact_id = ib.supplier_contact_id
    WHERE q.tenant_id = current_setting('cpos.tenant_id')::uuid
      AND q.rfq_issue_bidder_id = ${issueBidderId}
    ORDER BY q.revision_no DESC
    LIMIT 1
  `;
}

function quotationHistorySelect(issueBidderId: string) {
  return sql`
    SELECT q.quotation_revision_id::text, q.rfq_issue_bidder_id::text, q.revision_no,
           q.supersedes_revision_id::text, q.supplier_quotation_reference, q.quotation_date::text,
           q.received_at::text, q.response_channel, q.capture_mode, q.captured_by_principal_id::text,
           q.currency, q.validity_until::text, q.lead_time_promise, q.delivery_promise, q.payment_terms,
           q.warranty_terms, q.commercial_notes, q.response_status, q.source_file_name, q.source_media_type,
           q.source_sha256, q.source_channel_reference, q.is_late,
           ib.supplier_id::text, s.supplier_code, s.legal_name AS supplier_legal_name,
           sc.display_name AS contact_name, i.rfq_issue_id::text, i.rfq_id::text, i.rfq_number,
           i.title AS rfq_title, i.revision_no AS issue_revision_no
    FROM procurement.supplier_quotation_revision q
    JOIN procurement.rfq_tender_issue_bidder ib
      ON ib.tenant_id = q.tenant_id AND ib.rfq_issue_bidder_id = q.rfq_issue_bidder_id
    JOIN procurement.rfq_tender_issue i
      ON i.tenant_id = ib.tenant_id AND i.rfq_issue_id = ib.rfq_issue_id
    JOIN procurement.supplier s
      ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
    LEFT JOIN procurement.supplier_contact sc
      ON sc.tenant_id = ib.tenant_id AND sc.supplier_contact_id = ib.supplier_contact_id
    WHERE q.tenant_id = current_setting('cpos.tenant_id')::uuid
      AND q.rfq_issue_bidder_id = ${issueBidderId}
    ORDER BY q.revision_no ASC
  `;
}

// Compile-time guard: if the selected quotation shape changes, keeping it declared here makes
// the duplicated explicit branches easy to compare in review without runtime SQL composition.
void quotationHeaderColumns;

export const procurementResponsePersistence = definePersistenceAdapter<ProcurementResponsePersistenceHandle>({
  moduleKey: 'procurement_v2_session03_supplier_responses',
  databaseRole: 'cpos_platform_runtime',
  executionScope: 'TENANT',
  buildHandle: (executor) => ({
    verifyAuthenticationIdentity: async (authenticationIdentityId) => {
      const row = await executor.oneOrNone<{ readonly binding_id: string }>(sql`
        SELECT binding_id::text
        FROM platform.principal_authentication_identity
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND principal_id = current_setting('cpos.principal_id')::uuid
          AND authentication_identity_id = ${authenticationIdentityId}
          AND effective_period @> statement_timestamp()
        LIMIT 1
      `);
      return row !== undefined;
    },

    canManageSourcing: async () => {
      const row = await executor.oneOrNone<{ readonly allowed: boolean }>(sql`
        SELECT (
          platform.current_principal_has_active_tenant_role('OWNER')
          OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
          OR platform.current_principal_has_active_tenant_role('BUYER')
        ) AS allowed
      `);
      return row?.allowed === true;
    },

    rfqForIssue: (rfqId) => executor.oneOrNone<ResponseRfqRow>(sql`
      SELECT r.rfq_id::text, r.revision_no, r.status,
             (
               SELECT count(*)::int
               FROM procurement.rfq_tender_line l
               WHERE l.tenant_id = r.tenant_id AND l.rfq_id = r.rfq_id
             ) AS source_line_count,
             (
               SELECT count(*)::int
               FROM procurement.rfq_tender_bidder b
               WHERE b.tenant_id = r.tenant_id AND b.rfq_id = r.rfq_id
                 AND b.invitation_state IN ('DRAFT','READY')
             ) AS bidder_count
      FROM procurement.rfq_tender r
      WHERE r.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND r.rfq_id = ${rfqId}
      FOR UPDATE
    `),

    createIssueFromRfq: async (rfqId, issuedAt, issuedBy) => {
      const row = await executor.oneOrNone<{ readonly rfq_issue_id: string }>(sql`
        INSERT INTO procurement.rfq_tender_issue (
          tenant_id, rfq_id, revision_no, rfq_number, title, event_type, project_id, package_id, buyer_id,
          issued_at, response_due_at, response_timezone, currency, pricing_basis, payment_term_requirement,
          validity_days, commercial_instructions, submission_instructions, evaluation_mode, bid_visibility_policy,
          route_policy_key, route_policy_version, issued_by
        )
        SELECT r.tenant_id, r.rfq_id, r.revision_no, r.rfq_number, r.title, r.event_type, r.project_id, r.package_id, r.buyer_id,
               ${issuedAt}::timestamptz, r.response_due_at, r.response_timezone, r.currency, r.pricing_basis,
               r.payment_term_requirement, r.validity_days, r.commercial_instructions, r.submission_instructions,
               r.evaluation_mode, r.bid_visibility_policy, r.route_policy_key, r.route_policy_version, ${issuedBy}
        FROM procurement.rfq_tender r
        WHERE r.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND r.rfq_id = ${rfqId}
        RETURNING rfq_issue_id::text
      `);
      if (row === undefined) throw new Error('RFQ issue snapshot could not be created');
      return row.rfq_issue_id;
    },

    snapshotIssueLines: async (rfqIssueId, rfqId) => {
      const rows = await executor.all<{ readonly rfq_issue_line_id: string }>(sql`
        INSERT INTO procurement.rfq_tender_issue_line (
          tenant_id, rfq_issue_id, source_rfq_line_id, line_no, mr_line_id, package_scope_id,
          description, specification, quantity, uom_code, required_date, equivalent_rule
        )
        SELECT l.tenant_id, ${rfqIssueId}, l.rfq_line_id, l.line_no, l.mr_line_id, l.package_scope_id,
               l.description, l.specification, l.quantity, l.uom_code, l.required_date, l.equivalent_rule
        FROM procurement.rfq_tender_line l
        WHERE l.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND l.rfq_id = ${rfqId}
        ORDER BY l.line_no
        RETURNING rfq_issue_line_id::text
      `);
      return rows.length;
    },

    snapshotIssueBidders: async (rfqIssueId, rfqId) => {
      const rows = await executor.all<{ readonly rfq_issue_bidder_id: string }>(sql`
        INSERT INTO procurement.rfq_tender_issue_bidder (
          tenant_id, rfq_issue_id, source_rfq_bidder_id, supplier_id, supplier_contact_id,
          invitation_state, eligibility_note
        )
        SELECT b.tenant_id, ${rfqIssueId}, b.rfq_bidder_id, b.supplier_id, b.supplier_contact_id,
               'INVITED', b.eligibility_note
        FROM procurement.rfq_tender_bidder b
        WHERE b.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND b.rfq_id = ${rfqId}
          AND b.invitation_state IN ('DRAFT','READY')
        ORDER BY b.recorded_at
        RETURNING rfq_issue_bidder_id::text
      `);
      return rows.length;
    },

    markRfqIssued: async (rfqId, issuedAt) => {
      await executor.execute(sql`
        UPDATE procurement.rfq_tender
        SET status = 'ISSUED', issue_at = ${issuedAt}::timestamptz, updated_at = clock_timestamp()
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND rfq_id = ${rfqId}
      `);
    },

    markRfqBiddersInvited: async (rfqId) => {
      await executor.execute(sql`
        UPDATE procurement.rfq_tender_bidder
        SET invitation_state = 'INVITED'
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND rfq_id = ${rfqId}
          AND invitation_state IN ('DRAFT','READY')
      `);
    },

    latestIssueForRfq: (rfqId) => executor.oneOrNone<RfqIssueHeaderRow>(issueHeaderSelect({ rfqId })),
    issue: (issueId) => executor.oneOrNone<RfqIssueHeaderRow>(issueHeaderSelect({ issueId })),

    issueLines: (issueId) => executor.all<RfqIssueLineRow>(sql`
      SELECT l.rfq_issue_line_id::text, l.source_rfq_line_id::text, l.line_no, l.mr_line_id::text,
             l.package_scope_id::text, l.description, l.specification, l.quantity::text, l.uom_code,
             l.required_date::text, l.equivalent_rule
      FROM procurement.rfq_tender_issue_line l
      WHERE l.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND l.rfq_issue_id = ${issueId}
      ORDER BY l.line_no
    `),

    issueBidders: (issueId) => executor.all<RfqIssueBidderRow>(sql`
      SELECT ib.rfq_issue_bidder_id::text, ib.source_rfq_bidder_id::text, ib.supplier_id::text,
             s.supplier_code, s.legal_name, ib.supplier_contact_id::text,
             sc.display_name AS contact_name, sc.email AS contact_email,
             ib.invitation_state, ib.eligibility_note
      FROM procurement.rfq_tender_issue_bidder ib
      JOIN procurement.supplier s
        ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
      LEFT JOIN procurement.supplier_contact sc
        ON sc.tenant_id = ib.tenant_id AND sc.supplier_contact_id = ib.supplier_contact_id
      WHERE ib.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND ib.rfq_issue_id = ${issueId}
      ORDER BY s.supplier_code
    `),

    issueBidderBySource: (issueId, sourceBidderId) =>
      executor.oneOrNone<RfqIssueBidderRow>(issueBidderSelect(undefined, issueId, sourceBidderId)),

    recordIntent: async (input) => {
      const row = await executor.oneOrNone<{ readonly intent_event_id: string }>(sql`
        INSERT INTO procurement.rfq_supplier_intent_event (
          tenant_id, rfq_issue_bidder_id, intent, reason, channel, recorded_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.issueBidderId}, ${input.intent},
          ${input.reason}, ${input.channel}, ${input.recordedBy}
        )
        RETURNING intent_event_id::text
      `);
      if (row === undefined) throw new Error('supplier intent event could not be recorded');
      return row.intent_event_id;
    },

    intentEvent: (intentEventId) => executor.oneOrNone<SupplierIntentEventRow>(sql`
      SELECT intent_event_id::text, rfq_issue_bidder_id::text, intent, reason, channel,
             recorded_by::text, recorded_at::text
      FROM procurement.rfq_supplier_intent_event
      WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        AND intent_event_id = ${intentEventId}
    `),

    responseRegister: (rfqId) => executor.all<SupplierResponseRegisterRowDb>(sql`
      SELECT i.rfq_id::text, i.rfq_number, i.title AS rfq_title, i.revision_no AS issue_revision_no,
             i.rfq_issue_id::text, i.response_due_at::text, ib.rfq_issue_bidder_id::text,
             ib.source_rfq_bidder_id::text, ib.supplier_id::text, s.supplier_code,
             s.legal_name AS supplier_legal_name, sc.display_name AS contact_name, sc.email AS contact_email,
             ib.invitation_state,
             intent.intent, intent.reason AS intent_reason, intent.channel AS intent_channel,
             intent.recorded_at::text AS intent_recorded_at,
             q.quotation_revision_id::text AS latest_quotation_revision_id, q.revision_no AS latest_revision_no,
             q.received_at::text, q.response_channel, q.currency, q.validity_until::text, q.response_status,
             q.is_late, coalesce(lines.line_count, 0)::int AS line_count, q.source_file_name
      FROM procurement.rfq_tender_issue_bidder ib
      JOIN procurement.rfq_tender_issue i
        ON i.tenant_id = ib.tenant_id AND i.rfq_issue_id = ib.rfq_issue_id
      JOIN procurement.supplier s
        ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
      LEFT JOIN procurement.supplier_contact sc
        ON sc.tenant_id = ib.tenant_id AND sc.supplier_contact_id = ib.supplier_contact_id
      LEFT JOIN LATERAL (
        SELECT e.intent, e.reason, e.channel, e.recorded_at
        FROM procurement.rfq_supplier_intent_event e
        WHERE e.tenant_id = ib.tenant_id
          AND e.rfq_issue_bidder_id = ib.rfq_issue_bidder_id
        ORDER BY e.recorded_at DESC, e.intent_event_id DESC
        LIMIT 1
      ) intent ON true
      LEFT JOIN LATERAL (
        SELECT qr.*
        FROM procurement.supplier_quotation_revision qr
        WHERE qr.tenant_id = ib.tenant_id
          AND qr.rfq_issue_bidder_id = ib.rfq_issue_bidder_id
        ORDER BY qr.revision_no DESC
        LIMIT 1
      ) q ON true
      LEFT JOIN LATERAL (
        SELECT count(*)::int AS line_count
        FROM procurement.supplier_quotation_line ql
        WHERE q.quotation_revision_id IS NOT NULL
          AND ql.tenant_id = q.tenant_id
          AND ql.quotation_revision_id = q.quotation_revision_id
      ) lines ON true
      WHERE ib.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND (${rfqId ?? null}::uuid IS NULL OR i.rfq_id = ${rfqId ?? null})
      ORDER BY i.issued_at DESC, i.rfq_number, s.supplier_code
    `),

    lockIssueBidder: async (issueBidderId) => {
      await executor.oneOrNone<{ readonly rfq_issue_bidder_id: string }>(sql`
        SELECT rfq_issue_bidder_id::text
        FROM procurement.rfq_tender_issue_bidder
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND rfq_issue_bidder_id = ${issueBidderId}
        FOR UPDATE
      `);
      return executor.oneOrNone<RfqIssueBidderRow>(issueBidderSelect(issueBidderId));
    },

    latestIntent: (issueBidderId) => executor.oneOrNone<SupplierIntentEventRow>(sql`
      SELECT intent_event_id::text, rfq_issue_bidder_id::text, intent, reason, channel,
             recorded_by::text, recorded_at::text
      FROM procurement.rfq_supplier_intent_event
      WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        AND rfq_issue_bidder_id = ${issueBidderId}
      ORDER BY recorded_at DESC, intent_event_id DESC
      LIMIT 1
    `),

    latestQuotation: (issueBidderId) =>
      executor.oneOrNone<SupplierQuotationHeaderRow>(latestQuotationSelect(issueBidderId)),

    createQuotation: async (input) => {
      const row = await executor.oneOrNone<{ readonly quotation_revision_id: string }>(sql`
        INSERT INTO procurement.supplier_quotation_revision (
          tenant_id, rfq_issue_bidder_id, revision_no, supersedes_revision_id,
          supplier_quotation_reference, quotation_date, received_at, response_channel, capture_mode,
          captured_by_principal_id, currency, validity_until, lead_time_promise, delivery_promise,
          payment_terms, warranty_terms, commercial_notes, response_status, source_file_name,
          source_media_type, source_sha256, source_channel_reference, created_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.issueBidderId}, ${input.revisionNo},
          ${input.supersedesRevisionId}, ${input.supplierQuotationReference}, ${input.quotationDate},
          ${input.receivedAt}::timestamptz, ${input.responseChannel}, ${input.captureMode},
          ${input.capturedByPrincipalId}, ${input.currency}, ${input.validityUntil}, ${input.leadTimePromise},
          ${input.deliveryPromise}, ${input.paymentTerms}, ${input.warrantyTerms}, ${input.commercialNotes},
          ${input.responseStatus}, ${input.sourceFileName}, ${input.sourceMediaType}, ${input.sourceSha256},
          ${input.sourceChannelReference}, ${input.createdBy}
        )
        RETURNING quotation_revision_id::text
      `);
      if (row === undefined) throw new Error('supplier quotation revision could not be created');
      return row.quotation_revision_id;
    },

    createQuotationLine: async (input) => {
      const row = await executor.oneOrNone<{ readonly quotation_line_id: string }>(sql`
        INSERT INTO procurement.supplier_quotation_line (
          tenant_id, quotation_revision_id, rfq_issue_line_id, supplier_line_no, supplier_description,
          quoted_quantity, quoted_uom_code, unit_rate, line_amount, tax_amount, brand, manufacturer, model,
          lead_time_override, inclusion_exclusion_note, deviation_note, line_type, source_reference
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.quotationRevisionId}, ${input.rfqIssueLineId},
          ${input.supplierLineNo}, ${input.supplierDescription}, ${input.quotedQuantity}, ${input.quotedUomCode},
          ${input.unitRate}, ${input.lineAmount}, ${input.taxAmount}, ${input.brand}, ${input.manufacturer},
          ${input.model}, ${input.leadTimeOverride}, ${input.inclusionExclusionNote}, ${input.deviationNote},
          ${input.lineType}, ${input.sourceReference}
        )
        RETURNING quotation_line_id::text
      `);
      if (row === undefined) throw new Error('supplier quotation line could not be created');
      return row.quotation_line_id;
    },

    quotation: (quotationRevisionId) =>
      executor.oneOrNone<SupplierQuotationHeaderRow>(quotationByRevisionSelect(quotationRevisionId)),

    quotationLines: (quotationRevisionId) => executor.all<SupplierQuotationLineRow>(sql`
      SELECT ql.quotation_line_id::text, ql.rfq_issue_line_id::text, il.line_no AS rfq_line_no,
             ql.supplier_line_no, ql.supplier_description, ql.quoted_quantity::text, ql.quoted_uom_code,
             ql.unit_rate::text, ql.line_amount::text, ql.tax_amount::text, ql.brand, ql.manufacturer,
             ql.model, ql.lead_time_override, ql.inclusion_exclusion_note, ql.deviation_note,
             ql.line_type, ql.source_reference
      FROM procurement.supplier_quotation_line ql
      LEFT JOIN procurement.rfq_tender_issue_line il
        ON il.tenant_id = ql.tenant_id AND il.rfq_issue_line_id = ql.rfq_issue_line_id
      WHERE ql.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND ql.quotation_revision_id = ${quotationRevisionId}
      ORDER BY coalesce(il.line_no, 2147483647), ql.recorded_at, ql.quotation_line_id
    `),

    quotationHistory: (issueBidderId) =>
      executor.all<SupplierQuotationHeaderRow>(quotationHistorySelect(issueBidderId)),
  }),
});
