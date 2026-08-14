import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export type SourcingDocumentClass = 'PACKAGE' | 'RFQ';

export interface SourcingProjectRow {
  readonly project_id: string;
  readonly project_code: string;
  readonly display_name: string;
}

export interface SourcingCandidateRow {
  readonly mr_id: string;
  readonly mr_number: string;
  readonly mr_line_id: string;
  readonly line_no: number;
  readonly project_id: string;
  readonly project_code: string;
  readonly project_name: string;
  readonly subject: string;
  readonly description: string;
  readonly specification: string | null;
  readonly approved_quantity: string;
  readonly uom_code: string;
  readonly required_date: string;
  readonly equivalent_rule: 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';
  readonly route: 'COMPETITIVE_RFQ' | 'DIRECT_ORDER' | 'PACKAGE_SOURCING' | 'SOLE_SOURCE_EXCEPTION' | 'EXTERNAL_ERP_STOCK';
  readonly route_decision_id: string;
  readonly policy_key: string;
  readonly policy_version: number;
  readonly already_packaged_quantity: string;
}

export interface PackageHeaderRow {
  readonly package_id: string;
  readonly package_number: string;
  readonly project_id: string;
  readonly project_code: string;
  readonly project_name: string;
  readonly title: string;
  readonly trade_category: string | null;
  readonly package_type: 'MATERIAL_PACKAGE' | 'TRADE_PACKAGE' | 'SUBCONTRACT_PACKAGE' | 'SERVICE_PACKAGE' | 'MIXED';
  readonly owner_id: string;
  readonly owner_name: string;
  readonly required_on_site_date: string | null;
  readonly target_award_date: string | null;
  readonly scope_summary: string | null;
  readonly status: 'PLANNED' | 'PREPARING' | 'READY_FOR_SOURCING' | 'SOURCING' | 'AWARD_PENDING' | 'AWARDED' | 'ORDERED' | 'COMPLETE' | 'CANCELLED';
  readonly route_policy_key: string;
  readonly route_policy_version: number;
  readonly source_line_count: number;
}

export interface PackageScopeRow {
  readonly package_scope_id: string;
  readonly mr_id: string;
  readonly mr_number: string;
  readonly mr_line_id: string;
  readonly source_line_no: number;
  readonly description: string;
  readonly specification: string | null;
  readonly allocated_quantity: string;
  readonly uom_code: string;
  readonly required_date: string;
}

export interface RfqHeaderRow {
  readonly rfq_id: string;
  readonly rfq_number: string;
  readonly project_id: string;
  readonly project_code: string;
  readonly project_name: string;
  readonly package_id: string | null;
  readonly package_number: string | null;
  readonly title: string;
  readonly event_type: 'RFQ' | 'TENDER' | 'RFP';
  readonly buyer_id: string;
  readonly buyer_name: string;
  readonly issue_at: string | null;
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
  readonly status: 'DRAFT' | 'REVIEW' | 'READY' | 'ISSUED' | 'ADDENDUM' | 'REISSUED' | 'CLOSED' | 'CANCELLED';
  readonly revision_no: number;
  readonly route_policy_key: string;
  readonly route_policy_version: number;
  readonly source_line_count: number;
  readonly bidder_count: number;
}

export interface RfqLineRow {
  readonly rfq_line_id: string;
  readonly line_no: number;
  readonly mr_line_id: string;
  readonly package_scope_id: string | null;
  readonly mr_number: string;
  readonly source_line_no: number;
  readonly description: string;
  readonly specification: string | null;
  readonly quantity: string;
  readonly uom_code: string;
  readonly required_date: string | null;
  readonly equivalent_rule: 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';
}

export interface RfqBidderRow {
  readonly rfq_bidder_id: string;
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly legal_name: string;
  readonly supplier_contact_id: string | null;
  readonly contact_name: string | null;
  readonly contact_email: string | null;
  readonly invitation_state: 'DRAFT' | 'READY' | 'INVITED' | 'DECLINED' | 'WITHDRAWN' | 'REMOVED';
  readonly eligibility_note: string | null;
}

export interface ProcurementSourcingPersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  canManageSourcing(): Promise<boolean>;
  project(projectId: string): Promise<SourcingProjectRow | undefined>;
  sourcingCandidates(): Promise<readonly SourcingCandidateRow[]>;
  sourcingCandidate(mrLineId: string): Promise<SourcingCandidateRow | undefined>;
  ensureCounter(documentClass: SourcingDocumentClass, scopeKey: string): Promise<void>;
  allocateNextNumber(documentClass: SourcingDocumentClass, scopeKey: string): Promise<number>;
  createPackage(input: {
    readonly projectId: string;
    readonly packageNumber: string;
    readonly scopeKey: string;
    readonly title: string;
    readonly tradeCategory: string | null;
    readonly packageType: PackageHeaderRow['package_type'];
    readonly ownerId: string;
    readonly requiredOnSiteDate: string | null;
    readonly targetAwardDate: string | null;
    readonly scopeSummary: string | null;
    readonly policyKey: string;
    readonly policyVersion: number;
    readonly createdBy: string;
  }): Promise<string>;
  createPackageScope(input: {
    readonly packageId: string;
    readonly mrLineId: string;
    readonly allocatedQuantity: string;
    readonly uomCode: string;
  }): Promise<string>;
  packages(): Promise<readonly PackageHeaderRow[]>;
  package(packageId: string): Promise<PackageHeaderRow | undefined>;
  packageScope(packageId: string): Promise<readonly PackageScopeRow[]>;
  packageScopeById(packageScopeId: string): Promise<PackageScopeRow | undefined>;
  createRfq(input: {
    readonly projectId: string;
    readonly rfqNumber: string;
    readonly scopeKey: string;
    readonly title: string;
    readonly eventType: RfqHeaderRow['event_type'];
    readonly buyerId: string;
    readonly packageId: string | null;
    readonly policyKey: string;
    readonly policyVersion: number;
    readonly responseDueAt: string;
    readonly responseTimezone: string;
    readonly currency: string;
    readonly pricingBasis: RfqHeaderRow['pricing_basis'];
    readonly paymentTermRequirement: string | null;
    readonly validityDays: number | null;
    readonly commercialInstructions: string | null;
    readonly submissionInstructions: string | null;
    readonly evaluationMode: RfqHeaderRow['evaluation_mode'];
    readonly bidVisibilityPolicy: RfqHeaderRow['bid_visibility_policy'];
    readonly createdBy: string;
  }): Promise<string>;
  createRfqLine(input: {
    readonly rfqId: string;
    readonly lineNo: number;
    readonly mrLineId: string;
    readonly packageScopeId: string | null;
    readonly description: string;
    readonly specification: string | null;
    readonly quantity: string;
    readonly uomCode: string;
    readonly requiredDate: string | null;
    readonly equivalentRule: RfqLineRow['equivalent_rule'];
  }): Promise<string>;
  createRfqBidder(input: {
    readonly rfqId: string;
    readonly supplierId: string;
  }): Promise<string>;
  rfqs(): Promise<readonly RfqHeaderRow[]>;
  rfq(rfqId: string): Promise<RfqHeaderRow | undefined>;
  rfqLines(rfqId: string): Promise<readonly RfqLineRow[]>;
  rfqBidders(rfqId: string): Promise<readonly RfqBidderRow[]>;
}

const packageHeaderQuery = sql`
  SELECT
    p.package_id::text,
    p.package_number,
    p.project_id::text,
    pv.project_code,
    pv.display_name AS project_name,
    p.title,
    p.trade_category,
    p.package_type,
    p.owner_id::text,
    owner.display_name AS owner_name,
    p.required_on_site_date::text,
    p.target_award_date::text,
    p.scope_summary,
    p.status,
    p.route_policy_key,
    p.route_policy_version,
    count(ps.package_scope_id)::int AS source_line_count
  FROM procurement.procurement_package p
  JOIN platform.project_version pv
    ON pv.tenant_id = p.tenant_id
   AND pv.project_id = p.project_id
   AND pv.effective_period @> statement_timestamp()
  JOIN platform.principal owner
    ON owner.tenant_id = p.tenant_id AND owner.principal_id = p.owner_id
  LEFT JOIN procurement.procurement_package_scope ps
    ON ps.tenant_id = p.tenant_id AND ps.package_id = p.package_id
  WHERE p.tenant_id = current_setting('cpos.tenant_id')::uuid
  GROUP BY p.package_id, pv.project_code, pv.display_name, owner.display_name
`;

const rfqHeaderQuery = sql`
  SELECT
    r.rfq_id::text,
    r.rfq_number,
    r.project_id::text,
    pv.project_code,
    pv.display_name AS project_name,
    r.package_id::text,
    p.package_number,
    r.title,
    r.event_type,
    r.buyer_id::text,
    buyer.display_name AS buyer_name,
    r.issue_at::text,
    r.response_due_at::text,
    r.response_timezone,
    r.currency,
    r.pricing_basis,
    r.payment_term_requirement,
    r.validity_days,
    r.commercial_instructions,
    r.submission_instructions,
    r.evaluation_mode,
    r.bid_visibility_policy,
    r.status,
    r.revision_no,
    r.route_policy_key,
    r.route_policy_version,
    count(DISTINCT rl.rfq_line_id)::int AS source_line_count,
    count(DISTINCT rb.rfq_bidder_id)::int AS bidder_count
  FROM procurement.rfq_tender r
  JOIN platform.project_version pv
    ON pv.tenant_id = r.tenant_id
   AND pv.project_id = r.project_id
   AND pv.effective_period @> statement_timestamp()
  JOIN platform.principal buyer
    ON buyer.tenant_id = r.tenant_id AND buyer.principal_id = r.buyer_id
  LEFT JOIN procurement.procurement_package p
    ON p.tenant_id = r.tenant_id AND p.package_id = r.package_id
  LEFT JOIN procurement.rfq_tender_line rl
    ON rl.tenant_id = r.tenant_id AND rl.rfq_id = r.rfq_id
  LEFT JOIN procurement.rfq_tender_bidder rb
    ON rb.tenant_id = r.tenant_id AND rb.rfq_id = r.rfq_id
  WHERE r.tenant_id = current_setting('cpos.tenant_id')::uuid
  GROUP BY r.rfq_id, pv.project_code, pv.display_name, p.package_number, buyer.display_name
`;

export const procurementSourcingPersistence = definePersistenceAdapter<ProcurementSourcingPersistenceHandle>({
  moduleKey: 'procurement_v2_session02_sourcing',
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
    project: (projectId) =>
      executor.oneOrNone<SourcingProjectRow>(sql`
        SELECT p.project_id::text, pv.project_code, pv.display_name
        FROM platform.project p
        JOIN platform.project_version pv
          ON pv.tenant_id = p.tenant_id
         AND pv.project_id = p.project_id
         AND pv.effective_period @> statement_timestamp()
        WHERE p.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND p.project_id = ${projectId}
          AND pv.lifecycle_state = 'ACTIVE'
      `),
    sourcingCandidates: () =>
      executor.all<SourcingCandidateRow>(sql`
        SELECT
          mr.mr_id::text,
          mr.mr_number,
          l.mr_line_id::text,
          l.line_no,
          mr.project_id::text,
          pv.project_code,
          pv.display_name AS project_name,
          mr.subject,
          l.description,
          l.specification,
          coalesce(l.approved_quantity, l.requested_quantity)::text AS approved_quantity,
          l.uom_code,
          coalesce(l.required_date_override, mr.required_on_site_date)::text AS required_date,
          l.equivalent_rule,
          rd.route,
          rd.route_decision_id::text,
          rd.policy_key,
          rd.policy_version,
          coalesce((
            SELECT sum(ps.allocated_quantity)
            FROM procurement.procurement_package_scope ps
            WHERE ps.tenant_id = l.tenant_id AND ps.mr_line_id = l.mr_line_id
          ), 0)::text AS already_packaged_quantity
        FROM procurement.material_requisition_line l
        JOIN procurement.material_requisition mr
          ON mr.tenant_id = l.tenant_id AND mr.mr_id = l.mr_id
        JOIN platform.project_version pv
          ON pv.tenant_id = mr.tenant_id
         AND pv.project_id = mr.project_id
         AND pv.effective_period @> statement_timestamp()
        JOIN procurement.procurement_route_decision rd
          ON rd.tenant_id = l.tenant_id
         AND rd.mr_line_id = l.mr_line_id
         AND rd.is_current
        WHERE l.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND l.line_state IN ('APPROVED','PARTIALLY_APPROVED','SOURCING')
          AND rd.route IN ('COMPETITIVE_RFQ','PACKAGE_SOURCING')
        ORDER BY pv.project_code, mr.mr_number, l.line_no
      `),
    sourcingCandidate: (mrLineId) =>
      executor.oneOrNone<SourcingCandidateRow>(sql`
        SELECT
          mr.mr_id::text,
          mr.mr_number,
          l.mr_line_id::text,
          l.line_no,
          mr.project_id::text,
          pv.project_code,
          pv.display_name AS project_name,
          mr.subject,
          l.description,
          l.specification,
          coalesce(l.approved_quantity, l.requested_quantity)::text AS approved_quantity,
          l.uom_code,
          coalesce(l.required_date_override, mr.required_on_site_date)::text AS required_date,
          l.equivalent_rule,
          rd.route,
          rd.route_decision_id::text,
          rd.policy_key,
          rd.policy_version,
          coalesce((
            SELECT sum(ps.allocated_quantity)
            FROM procurement.procurement_package_scope ps
            WHERE ps.tenant_id = l.tenant_id AND ps.mr_line_id = l.mr_line_id
          ), 0)::text AS already_packaged_quantity
        FROM procurement.material_requisition_line l
        JOIN procurement.material_requisition mr
          ON mr.tenant_id = l.tenant_id AND mr.mr_id = l.mr_id
        JOIN platform.project_version pv
          ON pv.tenant_id = mr.tenant_id
         AND pv.project_id = mr.project_id
         AND pv.effective_period @> statement_timestamp()
        JOIN procurement.procurement_route_decision rd
          ON rd.tenant_id = l.tenant_id
         AND rd.mr_line_id = l.mr_line_id
         AND rd.is_current
        WHERE l.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND l.mr_line_id = ${mrLineId}
          AND l.line_state IN ('APPROVED','PARTIALLY_APPROVED','SOURCING')
          AND rd.route IN ('COMPETITIVE_RFQ','PACKAGE_SOURCING')
      `),
    ensureCounter: async (documentClass, scopeKey) => {
      await executor.execute(sql`
        INSERT INTO procurement.document_number_counter (tenant_id, document_class, scope_key, next_value)
        VALUES (current_setting('cpos.tenant_id')::uuid, ${documentClass}, ${scopeKey}, 1)
        ON CONFLICT (tenant_id, document_class, scope_key) DO NOTHING
      `);
    },
    allocateNextNumber: async (documentClass, scopeKey) => {
      const row = await executor.oneOrNone<{ readonly allocated: string }>(sql`
        WITH locked AS (
          SELECT next_value
          FROM procurement.document_number_counter
          WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
            AND document_class = ${documentClass}
            AND scope_key = ${scopeKey}
          FOR UPDATE
        ), advanced AS (
          UPDATE procurement.document_number_counter c
          SET next_value = locked.next_value + 1,
              updated_at = clock_timestamp()
          FROM locked
          WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
            AND c.document_class = ${documentClass}
            AND c.scope_key = ${scopeKey}
          RETURNING locked.next_value::text AS allocated
        )
        SELECT allocated FROM advanced
      `);
      if (row === undefined) throw new Error(`${documentClass} number allocation failed`);
      return Number(row.allocated);
    },
    createPackage: async (input) => {
      const row = await executor.oneOrNone<{ readonly package_id: string }>(sql`
        INSERT INTO procurement.procurement_package (
          tenant_id, project_id, package_number, numbering_scope_key, title, trade_category,
          package_type, owner_id, required_on_site_date, target_award_date, route_policy_key,
          route_policy_version, scope_summary, status, created_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.projectId}, ${input.packageNumber}, ${input.scopeKey},
          ${input.title}, ${input.tradeCategory}, ${input.packageType}, ${input.ownerId},
          ${input.requiredOnSiteDate}, ${input.targetAwardDate}, ${input.policyKey}, ${input.policyVersion},
          ${input.scopeSummary}, 'READY_FOR_SOURCING', ${input.createdBy}
        )
        RETURNING package_id::text
      `);
      if (row === undefined) throw new Error('Package insert returned no row');
      return row.package_id;
    },
    createPackageScope: async (input) => {
      const row = await executor.oneOrNone<{ readonly package_scope_id: string }>(sql`
        INSERT INTO procurement.procurement_package_scope (
          tenant_id, package_id, mr_line_id, allocated_quantity, source_uom_code
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.packageId}, ${input.mrLineId},
          ${input.allocatedQuantity}, ${input.uomCode}
        )
        RETURNING package_scope_id::text
      `);
      if (row === undefined) throw new Error('Package scope insert returned no row');
      return row.package_scope_id;
    },
    packages: () => executor.all<PackageHeaderRow>(sql`${packageHeaderQuery} ORDER BY p.recorded_at DESC`),
    package: (packageId) => executor.oneOrNone<PackageHeaderRow>(sql`${packageHeaderQuery} AND p.package_id = ${packageId}`),
    packageScope: (packageId) =>
      executor.all<PackageScopeRow>(sql`
        SELECT
          ps.package_scope_id::text,
          mr.mr_id::text,
          mr.mr_number,
          l.mr_line_id::text,
          l.line_no AS source_line_no,
          l.description,
          l.specification,
          ps.allocated_quantity::text,
          ps.source_uom_code AS uom_code,
          coalesce(l.required_date_override, mr.required_on_site_date)::text AS required_date
        FROM procurement.procurement_package_scope ps
        JOIN procurement.material_requisition_line l
          ON l.tenant_id = ps.tenant_id AND l.mr_line_id = ps.mr_line_id
        JOIN procurement.material_requisition mr
          ON mr.tenant_id = l.tenant_id AND mr.mr_id = l.mr_id
        WHERE ps.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND ps.package_id = ${packageId}
        ORDER BY mr.mr_number, l.line_no
      `),
    packageScopeById: (packageScopeId) =>
      executor.oneOrNone<PackageScopeRow>(sql`
        SELECT
          ps.package_scope_id::text,
          mr.mr_id::text,
          mr.mr_number,
          l.mr_line_id::text,
          l.line_no AS source_line_no,
          l.description,
          l.specification,
          ps.allocated_quantity::text,
          ps.source_uom_code AS uom_code,
          coalesce(l.required_date_override, mr.required_on_site_date)::text AS required_date
        FROM procurement.procurement_package_scope ps
        JOIN procurement.material_requisition_line l
          ON l.tenant_id = ps.tenant_id AND l.mr_line_id = ps.mr_line_id
        JOIN procurement.material_requisition mr
          ON mr.tenant_id = l.tenant_id AND mr.mr_id = l.mr_id
        WHERE ps.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND ps.package_scope_id = ${packageScopeId}
      `),
    createRfq: async (input) => {
      const row = await executor.oneOrNone<{ readonly rfq_id: string }>(sql`
        INSERT INTO procurement.rfq_tender (
          tenant_id, project_id, rfq_number, numbering_scope_key, title, event_type, buyer_id,
          package_id, route_policy_key, route_policy_version, response_due_at, response_timezone,
          currency, pricing_basis, payment_term_requirement, validity_days, commercial_instructions,
          submission_instructions, evaluation_mode, bid_visibility_policy, status, created_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.projectId}, ${input.rfqNumber}, ${input.scopeKey},
          ${input.title}, ${input.eventType}, ${input.buyerId}, ${input.packageId}, ${input.policyKey},
          ${input.policyVersion}, ${input.responseDueAt}::timestamptz, ${input.responseTimezone},
          ${input.currency}, ${input.pricingBasis}, ${input.paymentTermRequirement}, ${input.validityDays},
          ${input.commercialInstructions}, ${input.submissionInstructions}, ${input.evaluationMode},
          ${input.bidVisibilityPolicy}, 'DRAFT', ${input.createdBy}
        )
        RETURNING rfq_id::text
      `);
      if (row === undefined) throw new Error('RFQ insert returned no row');
      return row.rfq_id;
    },
    createRfqLine: async (input) => {
      const row = await executor.oneOrNone<{ readonly rfq_line_id: string }>(sql`
        INSERT INTO procurement.rfq_tender_line (
          tenant_id, rfq_id, line_no, mr_line_id, package_scope_id, description, specification,
          quantity, uom_code, required_date, equivalent_rule
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.rfqId}, ${input.lineNo}, ${input.mrLineId},
          ${input.packageScopeId}, ${input.description}, ${input.specification}, ${input.quantity},
          ${input.uomCode}, ${input.requiredDate}, ${input.equivalentRule}
        )
        RETURNING rfq_line_id::text
      `);
      if (row === undefined) throw new Error('RFQ line insert returned no row');
      return row.rfq_line_id;
    },
    createRfqBidder: async (input) => {
      const row = await executor.oneOrNone<{ readonly rfq_bidder_id: string }>(sql`
        INSERT INTO procurement.rfq_tender_bidder (
          tenant_id, rfq_id, supplier_id, supplier_contact_id, invitation_state
        )
        SELECT
          current_setting('cpos.tenant_id')::uuid,
          ${input.rfqId},
          s.supplier_id,
          contact.supplier_contact_id,
          'READY'
        FROM procurement.supplier s
        LEFT JOIN LATERAL (
          SELECT sc.supplier_contact_id
          FROM procurement.supplier_contact sc
          WHERE sc.tenant_id = s.tenant_id
            AND sc.supplier_id = s.supplier_id
            AND sc.active_state = 'ACTIVE'
          ORDER BY sc.is_primary DESC, sc.recorded_at
          LIMIT 1
        ) contact ON true
        WHERE s.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND s.supplier_id = ${input.supplierId}
          AND s.supplier_state = 'ACTIVE'
        RETURNING rfq_bidder_id::text
      `);
      if (row === undefined) throw new Error('selected supplier is not active or not visible');
      return row.rfq_bidder_id;
    },
    rfqs: () => executor.all<RfqHeaderRow>(sql`${rfqHeaderQuery} ORDER BY r.recorded_at DESC`),
    rfq: (rfqId) => executor.oneOrNone<RfqHeaderRow>(sql`${rfqHeaderQuery} AND r.rfq_id = ${rfqId}`),
    rfqLines: (rfqId) =>
      executor.all<RfqLineRow>(sql`
        SELECT
          rl.rfq_line_id::text,
          rl.line_no,
          rl.mr_line_id::text,
          rl.package_scope_id::text,
          mr.mr_number,
          source.line_no AS source_line_no,
          rl.description,
          rl.specification,
          rl.quantity::text,
          rl.uom_code,
          rl.required_date::text,
          rl.equivalent_rule
        FROM procurement.rfq_tender_line rl
        JOIN procurement.material_requisition_line source
          ON source.tenant_id = rl.tenant_id AND source.mr_line_id = rl.mr_line_id
        JOIN procurement.material_requisition mr
          ON mr.tenant_id = source.tenant_id AND mr.mr_id = source.mr_id
        WHERE rl.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND rl.rfq_id = ${rfqId}
        ORDER BY rl.line_no
      `),
    rfqBidders: (rfqId) =>
      executor.all<RfqBidderRow>(sql`
        SELECT
          rb.rfq_bidder_id::text,
          s.supplier_id::text,
          s.supplier_code,
          s.legal_name,
          rb.supplier_contact_id::text,
          sc.display_name AS contact_name,
          sc.email AS contact_email,
          rb.invitation_state,
          rb.eligibility_note
        FROM procurement.rfq_tender_bidder rb
        JOIN procurement.supplier s
          ON s.tenant_id = rb.tenant_id AND s.supplier_id = rb.supplier_id
        LEFT JOIN procurement.supplier_contact sc
          ON sc.tenant_id = rb.tenant_id AND sc.supplier_contact_id = rb.supplier_contact_id
        WHERE rb.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND rb.rfq_id = ${rfqId}
        ORDER BY s.legal_name
      `),
  }),
});
