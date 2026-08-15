import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface ComparisonHeaderRow {
  readonly comparison_id: string;
  readonly comparison_number: string | null;
  readonly rfq_issue_id: string;
  readonly rfq_number: string;
  readonly rfq_title: string;
  readonly project_id: string;
  readonly title: string;
  readonly base_currency: string;
  readonly state: 'DRAFT' | 'FROZEN';
  readonly version: string;
  readonly created_by: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly frozen_by: string | null;
  readonly frozen_at: string | null;
  readonly snapshot_id: string | null;
}

export interface ComparisonRegisterRowDb {
  readonly comparison_id: string;
  readonly comparison_number: string | null;
  readonly rfq_issue_id: string;
  readonly rfq_number: string;
  readonly rfq_title: string;
  readonly project_id: string;
  readonly title: string;
  readonly base_currency: string;
  readonly state: 'DRAFT' | 'FROZEN';
  readonly bidder_count: number;
  readonly row_count: number;
  readonly explicit_cell_count: number;
  readonly missing_cell_count: number;
  readonly frozen_at: string | null;
  readonly snapshot_id: string | null;
}

export interface ComparisonBidderRowDb {
  readonly comparison_bidder_id: string;
  readonly rfq_issue_bidder_id: string;
  readonly selected_quotation_revision_id: string;
  readonly quotation_revision_no: number;
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly supplier_legal_name: string;
  readonly supplier_quotation_reference: string | null;
  readonly quotation_currency: string;
  readonly validity_until: string | null;
  readonly lead_time_promise: string | null;
  readonly delivery_promise: string | null;
  readonly payment_terms: string | null;
  readonly warranty_terms: string | null;
  readonly response_status: 'RECEIVED' | 'FINAL';
  readonly is_late: boolean;
}

export interface ComparisonRowDb {
  readonly comparison_row_id: string;
  readonly row_no: number;
  readonly row_kind: 'RFQ_LINE' | 'SUPPLIER_ADDED';
  readonly rfq_issue_line_id: string | null;
  readonly description: string;
  readonly target_quantity: string | null;
  readonly target_uom_code: string | null;
}

export interface ComparisonCellRowDb {
  readonly comparison_cell_id: string;
  readonly comparison_row_id: string;
  readonly comparison_bidder_id: string;
  readonly coverage_status: 'EXACT' | 'PARTIAL' | 'BUNDLED' | 'ALTERNATE' | 'SUPPLIER_ADDED' | 'MISSING' | 'NOT_APPLICABLE' | 'UNRESOLVED';
  readonly source_quotation_line_id: string | null;
  readonly supplier_line_no: string | null;
  readonly supplier_description: string | null;
  readonly quoted_quantity: string | null;
  readonly quoted_uom_code: string | null;
  readonly source_unit_rate: string | null;
  readonly source_line_amount: string | null;
  readonly source_tax_amount: string | null;
  readonly brand: string | null;
  readonly manufacturer: string | null;
  readonly model: string | null;
  readonly inclusion_exclusion_note: string | null;
  readonly deviation_note: string | null;
  readonly line_type: 'BASE' | 'ALTERNATE' | 'SUBSTITUTE' | 'UNMAPPED' | null;
  readonly source_reference: string | null;
  readonly normalized_quantity: string | null;
  readonly normalized_uom_code: string | null;
  readonly normalized_unit_rate: string | null;
  readonly normalized_amount: string | null;
  readonly currency_conversion_rate: string | null;
  readonly conversion_rate_date: string | null;
  readonly conversion_rate_source: string | null;
  readonly normalization_basis: string | null;
  readonly normalization_note: string | null;
  readonly adjustment_total: string;
  readonly evaluated_amount: string | null;
}

export interface ComparisonAdjustmentRowDb {
  readonly comparison_adjustment_id: string;
  readonly comparison_cell_id: string;
  readonly adjustment_type: 'ADD_COST' | 'DEDUCT_COST' | 'EXCLUSION' | 'PLUG' | 'COMMERCIAL_NORMALIZATION';
  readonly adjustment_amount: string;
  readonly reason: string;
  readonly recorded_by: string;
  readonly recorded_at: string;
}

export interface ComparisonConfirmedBasisRowDb {
  readonly confirmed_basis_id: string;
  readonly comparison_row_id: string;
  readonly comparison_bidder_id: string;
  readonly basis_version: number;
  readonly supersedes_confirmed_basis_id: string | null;
  readonly confirmation_kind: 'QUOTATION_REVISION' | 'CLARIFICATION_CONFIRMATION' | 'NEGOTIATED_BAFO' | 'WRITTEN_CONFIRMATION';
  readonly source_quotation_revision_id: string | null;
  readonly source_confirmation_refs: readonly string[];
  readonly confirmed_description: string;
  readonly confirmed_quantity: string | null;
  readonly confirmed_uom_code: string | null;
  readonly confirmed_unit_rate: string | null;
  readonly confirmed_amount: string;
  readonly currency: string;
  readonly confirmed_terms: Readonly<Record<string, string>>;
  readonly technical_status_refs: readonly string[];
  readonly recorded_by: string;
  readonly recorded_at: string;
}

export interface ProcurementComparisonPersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  canManageSourcing(): Promise<boolean>;
  list(): Promise<readonly ComparisonRegisterRowDb[]>;
  header(comparisonId: string): Promise<ComparisonHeaderRow | undefined>;
  bidders(comparisonId: string): Promise<readonly ComparisonBidderRowDb[]>;
  rows(comparisonId: string): Promise<readonly ComparisonRowDb[]>;
  cells(comparisonId: string): Promise<readonly ComparisonCellRowDb[]>;
  adjustments(comparisonId: string): Promise<readonly ComparisonAdjustmentRowDb[]>;
  confirmedBasis(comparisonId: string): Promise<readonly ComparisonConfirmedBasisRowDb[]>;
  createHeader(input: { readonly rfqIssueId: string; readonly title: string; readonly baseCurrency: string; readonly actorId: string }): Promise<string>;
  addBidder(input: { readonly comparisonId: string; readonly rfqIssueBidderId: string; readonly selectedQuotationRevisionId: string; readonly actorId: string }): Promise<string>;
  bootstrapIssueRows(comparisonId: string, actorId: string): Promise<number>;
  addRow(input: { readonly comparisonId: string; readonly rowKind: ComparisonRowDb['row_kind']; readonly rfqIssueLineId: string | null; readonly description: string; readonly targetQuantity: string | null; readonly targetUomCode: string | null; readonly actorId: string }): Promise<string>;
  upsertCell(input: { readonly comparisonId: string; readonly comparisonRowId: string; readonly comparisonBidderId: string; readonly sourceQuotationLineId: string | null; readonly coverageStatus: ComparisonCellRowDb['coverage_status']; readonly normalizedQuantity: string | null; readonly normalizedUomCode: string | null; readonly normalizedUnitRate: string | null; readonly normalizedAmount: string | null; readonly currencyConversionRate: string | null; readonly conversionRateDate: string | null; readonly conversionRateSource: string | null; readonly normalizationBasis: string | null; readonly normalizationNote: string | null; readonly actorId: string }): Promise<string>;
  addAdjustment(input: { readonly comparisonId: string; readonly comparisonCellId: string; readonly adjustmentType: ComparisonAdjustmentRowDb['adjustment_type']; readonly adjustmentAmount: string; readonly reason: string; readonly actorId: string }): Promise<string>;
  confirmBasis(input: { readonly comparisonId: string; readonly comparisonRowId: string; readonly comparisonBidderId: string; readonly confirmationKind: ComparisonConfirmedBasisRowDb['confirmation_kind']; readonly sourceQuotationRevisionId: string | null; readonly sourceConfirmationRefsJson: string; readonly confirmedDescription: string; readonly confirmedQuantity: string | null; readonly confirmedUomCode: string | null; readonly confirmedUnitRate: string | null; readonly confirmedAmount: string; readonly currency: string; readonly confirmedTermsJson: string; readonly technicalStatusRefsJson: string; readonly actorId: string }): Promise<string>;
  freeze(comparisonId: string): Promise<string>;
}

const headerSql = (comparisonId: string) => sql`
  SELECT c.comparison_id::text, c.comparison_number, c.rfq_issue_id::text, i.rfq_number, i.title AS rfq_title,
         c.project_id::text, c.title, c.base_currency, c.state, c.version::text,
         c.created_by::text, c.created_at::text, c.updated_at::text,
         c.frozen_by::text, c.frozen_at::text, s.comparison_snapshot_id::text AS snapshot_id
  FROM procurement.bid_comparison c
  JOIN procurement.rfq_tender_issue i
    ON i.tenant_id = c.tenant_id AND i.rfq_issue_id = c.rfq_issue_id
  LEFT JOIN procurement.bid_comparison_snapshot s
    ON s.tenant_id = c.tenant_id AND s.comparison_id = c.comparison_id
  WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
    AND c.comparison_id = ${comparisonId}
`;

export const procurementComparisonPersistence = definePersistenceAdapter<ProcurementComparisonPersistenceHandle>({
  moduleKey: 'procurement_v2_session04_bid_comparison',
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

    list: () => executor.all<ComparisonRegisterRowDb>(sql`
      SELECT c.comparison_id::text, c.comparison_number, c.rfq_issue_id::text, i.rfq_number, i.title AS rfq_title,
             c.project_id::text, c.title, c.base_currency, c.state,
             (SELECT count(*)::int FROM procurement.bid_comparison_bidder_selection b
               WHERE b.tenant_id = c.tenant_id AND b.comparison_id = c.comparison_id) AS bidder_count,
             (SELECT count(*)::int FROM procurement.bid_comparison_row r
               WHERE r.tenant_id = c.tenant_id AND r.comparison_id = c.comparison_id) AS row_count,
             (SELECT count(*)::int FROM procurement.bid_comparison_cell x
               WHERE x.tenant_id = c.tenant_id AND x.comparison_id = c.comparison_id) AS explicit_cell_count,
             (SELECT count(*)::int FROM procurement.bid_comparison_cell x
               WHERE x.tenant_id = c.tenant_id AND x.comparison_id = c.comparison_id AND x.coverage_status = 'MISSING') AS missing_cell_count,
             c.frozen_at::text, s.comparison_snapshot_id::text AS snapshot_id
      FROM procurement.bid_comparison c
      JOIN procurement.rfq_tender_issue i
        ON i.tenant_id = c.tenant_id AND i.rfq_issue_id = c.rfq_issue_id
      LEFT JOIN procurement.bid_comparison_snapshot s
        ON s.tenant_id = c.tenant_id AND s.comparison_id = c.comparison_id
      WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
      ORDER BY c.created_at DESC, c.comparison_id DESC
    `),

    header: (comparisonId) => executor.oneOrNone<ComparisonHeaderRow>(headerSql(comparisonId)),

    bidders: (comparisonId) => executor.all<ComparisonBidderRowDb>(sql`
      SELECT b.comparison_bidder_id::text, b.rfq_issue_bidder_id::text,
             b.selected_quotation_revision_id::text, q.revision_no AS quotation_revision_no,
             ib.supplier_id::text, s.supplier_code, s.legal_name AS supplier_legal_name,
             q.supplier_quotation_reference, q.currency AS quotation_currency, q.validity_until::text,
             q.lead_time_promise, q.delivery_promise, q.payment_terms, q.warranty_terms,
             q.response_status, q.is_late
      FROM procurement.bid_comparison_bidder_selection b
      JOIN procurement.supplier_quotation_revision q
        ON q.tenant_id = b.tenant_id AND q.quotation_revision_id = b.selected_quotation_revision_id
      JOIN procurement.rfq_tender_issue_bidder ib
        ON ib.tenant_id = b.tenant_id AND ib.rfq_issue_bidder_id = b.rfq_issue_bidder_id
      JOIN procurement.supplier s
        ON s.tenant_id = ib.tenant_id AND s.supplier_id = ib.supplier_id
      WHERE b.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND b.comparison_id = ${comparisonId}
      ORDER BY s.supplier_code
    `),

    rows: (comparisonId) => executor.all<ComparisonRowDb>(sql`
      SELECT comparison_row_id::text, row_no, row_kind, rfq_issue_line_id::text,
             description, target_quantity::text, target_uom_code
      FROM procurement.bid_comparison_row
      WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        AND comparison_id = ${comparisonId}
      ORDER BY row_no, comparison_row_id
    `),

    cells: (comparisonId) => executor.all<ComparisonCellRowDb>(sql`
      SELECT c.comparison_cell_id::text, c.comparison_row_id::text, c.comparison_bidder_id::text,
             c.coverage_status, c.source_quotation_line_id::text, ql.supplier_line_no,
             ql.supplier_description, ql.quoted_quantity::text, ql.quoted_uom_code,
             ql.unit_rate::text AS source_unit_rate, ql.line_amount::text AS source_line_amount,
             ql.tax_amount::text AS source_tax_amount, ql.brand, ql.manufacturer, ql.model,
             ql.inclusion_exclusion_note, ql.deviation_note, ql.line_type, ql.source_reference,
             c.normalized_quantity::text, c.normalized_uom_code, c.normalized_unit_rate::text,
             c.normalized_amount::text, c.currency_conversion_rate::text,
             c.conversion_rate_date::text, c.conversion_rate_source,
             c.normalization_basis, c.normalization_note,
             coalesce(a.adjustment_total, 0::numeric)::text AS adjustment_total,
             CASE WHEN c.normalized_amount IS NULL THEN NULL
                  ELSE (c.normalized_amount + coalesce(a.adjustment_total, 0::numeric))::text END AS evaluated_amount
      FROM procurement.bid_comparison_cell c
      LEFT JOIN procurement.supplier_quotation_line ql
        ON ql.tenant_id = c.tenant_id AND ql.quotation_line_id = c.source_quotation_line_id
      LEFT JOIN LATERAL (
        SELECT sum(x.adjustment_amount) AS adjustment_total
        FROM procurement.bid_comparison_adjustment x
        WHERE x.tenant_id = c.tenant_id AND x.comparison_cell_id = c.comparison_cell_id
      ) a ON true
      WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
        AND c.comparison_id = ${comparisonId}
      ORDER BY c.comparison_row_id, c.comparison_bidder_id
    `),

    adjustments: (comparisonId) => executor.all<ComparisonAdjustmentRowDb>(sql`
      SELECT comparison_adjustment_id::text, comparison_cell_id::text, adjustment_type,
             adjustment_amount::text, reason, recorded_by::text, recorded_at::text
      FROM procurement.bid_comparison_adjustment
      WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        AND comparison_id = ${comparisonId}
      ORDER BY recorded_at, comparison_adjustment_id
    `),

    confirmedBasis: (comparisonId) => executor.all<ComparisonConfirmedBasisRowDb>(sql`
      SELECT DISTINCT ON (comparison_row_id, comparison_bidder_id)
             confirmed_basis_id::text, comparison_row_id::text, comparison_bidder_id::text,
             basis_version, supersedes_confirmed_basis_id::text, confirmation_kind,
             source_quotation_revision_id::text, source_confirmation_refs,
             confirmed_description, confirmed_quantity::text, confirmed_uom_code,
             confirmed_unit_rate::text, confirmed_amount::text, currency,
             confirmed_terms, technical_status_refs, recorded_by::text, recorded_at::text
      FROM procurement.bid_comparison_confirmed_basis
      WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        AND comparison_id = ${comparisonId}
      ORDER BY comparison_row_id, comparison_bidder_id, basis_version DESC
    `),

    createHeader: async (input) => {
      const row = await executor.oneOrNone<{ readonly comparison_id: string }>(sql`
        INSERT INTO procurement.bid_comparison (
          tenant_id, rfq_issue_id, project_id, title, base_currency, created_by
        )
        SELECT i.tenant_id, i.rfq_issue_id, i.project_id, ${input.title}, ${input.baseCurrency}, ${input.actorId}
        FROM procurement.rfq_tender_issue i
        WHERE i.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND i.rfq_issue_id = ${input.rfqIssueId}
        RETURNING comparison_id::text
      `);
      if (row === undefined) throw new Error('RFQ issue does not exist or comparison could not be created');
      return row.comparison_id;
    },

    addBidder: async (input) => {
      const row = await executor.oneOrNone<{ readonly comparison_bidder_id: string }>(sql`
        INSERT INTO procurement.bid_comparison_bidder_selection (
          tenant_id, comparison_id, rfq_issue_bidder_id, selected_quotation_revision_id, recorded_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.comparisonId}, ${input.rfqIssueBidderId},
          ${input.selectedQuotationRevisionId}, ${input.actorId}
        )
        RETURNING comparison_bidder_id::text
      `);
      if (row === undefined) throw new Error('comparison bidder could not be created');
      return row.comparison_bidder_id;
    },

    bootstrapIssueRows: async (comparisonId, actorId) => {
      const rows = await executor.all<{ readonly comparison_row_id: string }>(sql`
        INSERT INTO procurement.bid_comparison_row (
          tenant_id, comparison_id, row_no, row_kind, rfq_issue_line_id,
          description, target_quantity, target_uom_code, recorded_by
        )
        SELECT c.tenant_id, c.comparison_id, il.line_no, 'RFQ_LINE', il.rfq_issue_line_id,
               il.description, il.quantity, il.uom_code, ${actorId}
        FROM procurement.bid_comparison c
        JOIN procurement.rfq_tender_issue_line il
          ON il.tenant_id = c.tenant_id AND il.rfq_issue_id = c.rfq_issue_id
        WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND c.comparison_id = ${comparisonId}
        ORDER BY il.line_no
        RETURNING comparison_row_id::text
      `);
      return rows.length;
    },

    addRow: async (input) => {
      const row = await executor.oneOrNone<{ readonly comparison_row_id: string }>(sql`
        INSERT INTO procurement.bid_comparison_row (
          tenant_id, comparison_id, row_no, row_kind, rfq_issue_line_id,
          description, target_quantity, target_uom_code, recorded_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.comparisonId},
          (SELECT coalesce(max(row_no), 0) + 1 FROM procurement.bid_comparison_row
            WHERE tenant_id = current_setting('cpos.tenant_id')::uuid AND comparison_id = ${input.comparisonId}),
          ${input.rowKind}, ${input.rfqIssueLineId}, ${input.description}, ${input.targetQuantity},
          ${input.targetUomCode}, ${input.actorId}
        )
        RETURNING comparison_row_id::text
      `);
      if (row === undefined) throw new Error('comparison row could not be created');
      return row.comparison_row_id;
    },

    upsertCell: async (input) => {
      const row = await executor.oneOrNone<{ readonly comparison_cell_id: string }>(sql`
        INSERT INTO procurement.bid_comparison_cell (
          tenant_id, comparison_id, comparison_row_id, comparison_bidder_id, source_quotation_line_id,
          coverage_status, normalized_quantity, normalized_uom_code, normalized_unit_rate,
          normalized_amount, currency_conversion_rate, conversion_rate_date, conversion_rate_source,
          normalization_basis, normalization_note, recorded_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.comparisonId}, ${input.comparisonRowId},
          ${input.comparisonBidderId}, ${input.sourceQuotationLineId}, ${input.coverageStatus},
          ${input.normalizedQuantity}, ${input.normalizedUomCode}, ${input.normalizedUnitRate},
          ${input.normalizedAmount}, ${input.currencyConversionRate}, ${input.conversionRateDate},
          ${input.conversionRateSource}, ${input.normalizationBasis}, ${input.normalizationNote}, ${input.actorId}
        )
        ON CONFLICT (tenant_id, comparison_id, comparison_row_id, comparison_bidder_id)
        DO UPDATE SET source_quotation_line_id = EXCLUDED.source_quotation_line_id,
                      coverage_status = EXCLUDED.coverage_status,
                      normalized_quantity = EXCLUDED.normalized_quantity,
                      normalized_uom_code = EXCLUDED.normalized_uom_code,
                      normalized_unit_rate = EXCLUDED.normalized_unit_rate,
                      normalized_amount = EXCLUDED.normalized_amount,
                      currency_conversion_rate = EXCLUDED.currency_conversion_rate,
                      conversion_rate_date = EXCLUDED.conversion_rate_date,
                      conversion_rate_source = EXCLUDED.conversion_rate_source,
                      normalization_basis = EXCLUDED.normalization_basis,
                      normalization_note = EXCLUDED.normalization_note,
                      recorded_by = EXCLUDED.recorded_by
        RETURNING comparison_cell_id::text
      `);
      if (row === undefined) throw new Error('comparison cell could not be recorded');
      return row.comparison_cell_id;
    },

    addAdjustment: async (input) => {
      const row = await executor.oneOrNone<{ readonly comparison_adjustment_id: string }>(sql`
        INSERT INTO procurement.bid_comparison_adjustment (
          tenant_id, comparison_id, comparison_cell_id, adjustment_type,
          adjustment_amount, reason, recorded_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.comparisonId}, ${input.comparisonCellId},
          ${input.adjustmentType}, ${input.adjustmentAmount}, ${input.reason}, ${input.actorId}
        )
        RETURNING comparison_adjustment_id::text
      `);
      if (row === undefined) throw new Error('comparison adjustment could not be recorded');
      return row.comparison_adjustment_id;
    },

    confirmBasis: async (input) => {
      const row = await executor.oneOrNone<{ readonly confirmed_basis_id: string }>(sql`
        WITH previous AS (
          SELECT confirmed_basis_id, basis_version
          FROM procurement.bid_comparison_confirmed_basis
          WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
            AND comparison_id = ${input.comparisonId}
            AND comparison_row_id = ${input.comparisonRowId}
            AND comparison_bidder_id = ${input.comparisonBidderId}
          ORDER BY basis_version DESC
          LIMIT 1
          FOR UPDATE
        )
        INSERT INTO procurement.bid_comparison_confirmed_basis (
          tenant_id, comparison_id, comparison_row_id, comparison_bidder_id,
          basis_version, supersedes_confirmed_basis_id, confirmation_kind,
          source_quotation_revision_id, source_confirmation_refs, confirmed_description,
          confirmed_quantity, confirmed_uom_code, confirmed_unit_rate, confirmed_amount,
          currency, confirmed_terms, technical_status_refs, recorded_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.comparisonId}, ${input.comparisonRowId},
          ${input.comparisonBidderId}, coalesce((SELECT basis_version + 1 FROM previous), 1),
          (SELECT confirmed_basis_id FROM previous), ${input.confirmationKind},
          ${input.sourceQuotationRevisionId}, ${input.sourceConfirmationRefsJson}::jsonb,
          ${input.confirmedDescription}, ${input.confirmedQuantity}, ${input.confirmedUomCode},
          ${input.confirmedUnitRate}, ${input.confirmedAmount}, ${input.currency},
          ${input.confirmedTermsJson}::jsonb, ${input.technicalStatusRefsJson}::jsonb, ${input.actorId}
        )
        RETURNING confirmed_basis_id::text
      `);
      if (row === undefined) throw new Error('supplier-confirmed comparison basis could not be recorded');
      return row.confirmed_basis_id;
    },

    freeze: async (comparisonId) => {
      const row = await executor.oneOrNone<{ readonly comparison_snapshot_id: string }>(sql`
        SELECT procurement.freeze_bid_comparison(${comparisonId})::text AS comparison_snapshot_id
      `);
      if (row === undefined) throw new Error('comparison could not be frozen');
      return row.comparison_snapshot_id;
    },
  }),
});