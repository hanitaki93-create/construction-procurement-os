import { definePersistenceAdapter, sql } from '@cpos/database-core/persistence';

export interface UomRow {
  readonly uom_code: string;
  readonly display_name: string;
  readonly quantity_kind: 'COUNT' | 'LENGTH' | 'AREA' | 'VOLUME' | 'MASS' | 'TIME' | 'LUMP_SUM';
  readonly decimal_scale: number;
}

export interface ItemReferenceRow {
  readonly item_id: string;
  readonly item_code: string;
  readonly item_kind: 'MATERIAL' | 'SERVICE' | 'SUBCONTRACT_SCOPE' | 'EQUIPMENT' | 'OTHER';
  readonly short_description: string;
  readonly detailed_specification: string | null;
  readonly default_uom_code: string | null;
  readonly manufacturer: string | null;
  readonly brand: string | null;
  readonly model: string | null;
  readonly equivalent_rule: 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';
}

export interface SupplierRow {
  readonly supplier_id: string;
  readonly supplier_code: string;
  readonly legal_name: string;
  readonly trade_name: string | null;
  readonly supplier_type:
    | 'MATERIAL_SUPPLIER'
    | 'SUBCONTRACTOR'
    | 'SERVICE_PROVIDER'
    | 'MANUFACTURER'
    | 'DISTRIBUTOR'
    | 'CONSULTANT_OTHER';
  readonly supplier_state: 'ACTIVE' | 'INACTIVE' | 'ON_HOLD';
  readonly country_code: string;
  readonly emirate_region: string | null;
  readonly business_phone: string | null;
  readonly business_email: string | null;
  readonly trn_vat_number: string | null;
}

export interface SupplierContactRow {
  readonly supplier_contact_id: string;
  readonly supplier_id: string;
  readonly display_name: string;
  readonly job_title: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly preferred_channel: 'EMAIL' | 'PHONE' | 'SECURE_LINK' | 'OTHER';
  readonly is_primary: boolean;
  readonly active_state: 'ACTIVE' | 'INACTIVE';
}

export interface SupplierComplianceRow {
  readonly compliance_document_id: string;
  readonly supplier_id: string;
  readonly document_type:
    | 'TRADE_LICENSE'
    | 'VAT_CERTIFICATE'
    | 'INSURANCE'
    | 'ISO_CERTIFICATE'
    | 'HSE_CERTIFICATE'
    | 'OTHER';
  readonly document_number: string | null;
  readonly expiry_date: string | null;
  readonly verification_status: 'UNVERIFIED' | 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
}

export interface ProjectReferenceRow {
  readonly project_id: string;
  readonly project_code: string;
  readonly display_name: string;
}

export interface MrHeaderRow {
  readonly mr_id: string;
  readonly mr_number: string;
  readonly project_id: string;
  readonly project_code: string;
  readonly project_name: string;
  readonly requester_id: string;
  readonly requester_name: string;
  readonly requester_team: string | null;
  readonly request_date: string;
  readonly required_on_site_date: string;
  readonly priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  readonly delivery_location_id: string | null;
  readonly subject: string;
  readonly instructions: string | null;
  readonly status:
    | 'DRAFT'
    | 'SUBMITTED'
    | 'UNDER_REVIEW'
    | 'APPROVED'
    | 'PARTIALLY_APPROVED'
    | 'REJECTED'
    | 'SOURCING'
    | 'ORDERING'
    | 'PARTIALLY_FULFILLED'
    | 'FULFILLED'
    | 'CLOSED'
    | 'CANCELLED'
    | 'SUPERSEDED';
  readonly submitted_at: string | null;
  readonly line_count: number;
}

export interface MrLineRow {
  readonly mr_line_id: string;
  readonly line_no: number;
  readonly entry_mode: 'MASTER_BACKED' | 'FREE_FORM';
  readonly item_id: string | null;
  readonly item_code: string | null;
  readonly line_type: 'MATERIAL' | 'SERVICE' | 'SUBCONTRACT_SCOPE' | 'EQUIPMENT' | 'OTHER';
  readonly description: string;
  readonly specification: string | null;
  readonly requested_quantity: string;
  readonly uom_code: string;
  readonly required_date_override: string | null;
  readonly manufacturer: string | null;
  readonly brand: string | null;
  readonly model: string | null;
  readonly equivalent_rule:
    | 'EXACT_ONLY'
    | 'APPROVED_EQUIVALENT_ALLOWED'
    | 'ALTERNATE_BY_APPROVAL';
  readonly preferred_supplier_id: string | null;
  readonly technical_notes: string | null;
  readonly approved_quantity: string | null;
  readonly line_state:
    | 'DRAFT'
    | 'SUBMITTED'
    | 'APPROVED'
    | 'PARTIALLY_APPROVED'
    | 'REJECTED'
    | 'SOURCING'
    | 'ORDERING'
    | 'PARTIALLY_FULFILLED'
    | 'FULFILLED'
    | 'CANCELLED';
}

export interface ProcurementPersistenceHandle {
  verifyAuthenticationIdentity(authenticationIdentityId: string): Promise<boolean>;
  canManageSuppliers(): Promise<boolean>;
  canCreateRequisition(): Promise<boolean>;
  uoms(): Promise<readonly UomRow[]>;
  items(): Promise<readonly ItemReferenceRow[]>;
  suppliers(): Promise<readonly SupplierRow[]>;
  supplierContacts(): Promise<readonly SupplierContactRow[]>;
  supplierCompliance(): Promise<readonly SupplierComplianceRow[]>;
  createSupplier(input: {
    readonly supplierCode: string;
    readonly legalName: string;
    readonly tradeName: string | null;
    readonly supplierType: SupplierRow['supplier_type'];
    readonly countryCode: string;
    readonly emirateRegion: string | null;
    readonly businessPhone: string | null;
    readonly businessEmail: string | null;
    readonly trnVatNumber: string | null;
    readonly createdBy: string;
  }): Promise<SupplierRow>;
  createPrimaryContact(input: {
    readonly supplierId: string;
    readonly displayName: string;
    readonly jobTitle: string | null;
    readonly email: string | null;
    readonly phone: string | null;
  }): Promise<SupplierContactRow>;
  project(projectId: string): Promise<ProjectReferenceRow | undefined>;
  ensureMrCounter(scopeKey: string): Promise<void>;
  allocateNextMrNumber(scopeKey: string): Promise<number>;
  createMaterialRequisition(input: {
    readonly projectId: string;
    readonly mrNumber: string;
    readonly scopeKey: string;
    readonly requesterId: string;
    readonly requesterTeam: string | null;
    readonly requestDate: string;
    readonly requiredOnSiteDate: string;
    readonly priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
    readonly deliveryLocationId: string | null;
    readonly subject: string;
    readonly instructions: string | null;
    readonly createdBy: string;
  }): Promise<string>;
  createMaterialRequisitionLine(input: {
    readonly mrId: string;
    readonly lineNo: number;
    readonly entryMode: 'MASTER_BACKED' | 'FREE_FORM';
    readonly itemId: string | null;
    readonly lineType: 'MATERIAL' | 'SERVICE' | 'SUBCONTRACT_SCOPE' | 'EQUIPMENT' | 'OTHER';
    readonly description: string;
    readonly specification: string | null;
    readonly requestedQuantity: string;
    readonly uomCode: string;
    readonly requiredDateOverride: string | null;
    readonly manufacturer: string | null;
    readonly brand: string | null;
    readonly model: string | null;
    readonly equivalentRule:
      | 'EXACT_ONLY'
      | 'APPROVED_EQUIVALENT_ALLOWED'
      | 'ALTERNATE_BY_APPROVAL';
    readonly preferredSupplierId: string | null;
    readonly technicalNotes: string | null;
  }): Promise<string>;
  updateDraftRequisition(input: {
    readonly mrId: string;
    readonly requesterTeam: string | null;
    readonly requiredOnSiteDate: string;
    readonly priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
    readonly subject: string;
    readonly instructions: string | null;
  }): Promise<boolean>;
  deleteDraftRequisitionLines(mrId: string): Promise<boolean>;
  requisitions(): Promise<readonly MrHeaderRow[]>;
  requisition(mrId: string): Promise<MrHeaderRow | undefined>;
  requisitionLines(mrId: string): Promise<readonly MrLineRow[]>;
  submitRequisition(mrId: string): Promise<boolean>;
}

export const procurementPersistence = definePersistenceAdapter<ProcurementPersistenceHandle>({
  moduleKey: 'procurement_v2_session01',
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
    canManageSuppliers: async () => {
      const row = await executor.oneOrNone<{ readonly allowed: boolean }>(sql`
        SELECT (
          platform.current_principal_has_active_tenant_role('OWNER')
          OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
          OR platform.current_principal_has_active_tenant_role('BUYER')
        ) AS allowed
      `);
      return row?.allowed === true;
    },
    canCreateRequisition: async () => {
      const row = await executor.oneOrNone<{ readonly allowed: boolean }>(sql`
        SELECT (
          platform.current_principal_has_active_tenant_role('OWNER')
          OR platform.current_principal_has_active_tenant_role('PROCUREMENT_MANAGER')
          OR platform.current_principal_has_active_tenant_role('BUYER')
          OR platform.current_principal_has_active_tenant_role('REQUESTER')
        ) AS allowed
      `);
      return row?.allowed === true;
    },
    uoms: () =>
      executor.all<UomRow>(sql`
        SELECT uom_code, display_name, quantity_kind, decimal_scale
        FROM procurement.uom_reference
        WHERE active
        ORDER BY uom_code
      `),
    items: () =>
      executor.all<ItemReferenceRow>(sql`
        SELECT item_id::text, item_code, item_kind, short_description, detailed_specification,
               default_uom_code, manufacturer, brand, model, equivalent_rule
        FROM procurement.item_master
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND active
        ORDER BY item_code
      `),
    suppliers: () =>
      executor.all<SupplierRow>(sql`
        SELECT supplier_id::text, supplier_code, legal_name, trade_name, supplier_type, supplier_state,
               country_code, emirate_region, business_phone, business_email, trn_vat_number
        FROM procurement.supplier
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY legal_name, supplier_code
      `),
    supplierContacts: () =>
      executor.all<SupplierContactRow>(sql`
        SELECT supplier_contact_id::text, supplier_id::text, display_name, job_title, email, phone,
               preferred_channel, is_primary, active_state
        FROM procurement.supplier_contact
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY supplier_id, is_primary DESC, display_name
      `),
    supplierCompliance: () =>
      executor.all<SupplierComplianceRow>(sql`
        SELECT compliance_document_id::text, supplier_id::text, document_type, document_number,
               expiry_date::text,
               CASE
                 WHEN expiry_date IS NOT NULL AND expiry_date < current_date AND verification_status <> 'REJECTED'
                   THEN 'EXPIRED'
                 ELSE verification_status
               END AS verification_status
        FROM procurement.supplier_compliance_document
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
        ORDER BY supplier_id, document_type, recorded_at DESC
      `),
    createSupplier: async (input) => {
      const row = await executor.oneOrNone<SupplierRow>(sql`
        INSERT INTO procurement.supplier (
          tenant_id, supplier_code, legal_name, trade_name, supplier_type, country_code,
          emirate_region, business_phone, business_email, trn_vat_number, created_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.supplierCode}, ${input.legalName},
          ${input.tradeName}, ${input.supplierType}, ${input.countryCode}, ${input.emirateRegion},
          ${input.businessPhone}, ${input.businessEmail}, ${input.trnVatNumber}, ${input.createdBy}
        )
        RETURNING supplier_id::text, supplier_code, legal_name, trade_name, supplier_type, supplier_state,
                  country_code, emirate_region, business_phone, business_email, trn_vat_number
      `);
      if (row === undefined) throw new Error('supplier insert returned no row');
      return row;
    },
    createPrimaryContact: async (input) => {
      const row = await executor.oneOrNone<SupplierContactRow>(sql`
        INSERT INTO procurement.supplier_contact (
          tenant_id, supplier_id, display_name, job_title, email, phone, roles, preferred_channel,
          is_primary, active_state
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.supplierId}, ${input.displayName},
          ${input.jobTitle}, ${input.email}, ${input.phone}, ARRAY['PRIMARY','COMMERCIAL']::text[],
          'EMAIL', true, 'ACTIVE'
        )
        RETURNING supplier_contact_id::text, supplier_id::text, display_name, job_title, email, phone,
                  preferred_channel, is_primary, active_state
      `);
      if (row === undefined) throw new Error('supplier contact insert returned no row');
      return row;
    },
    project: (projectId) =>
      executor.oneOrNone<ProjectReferenceRow>(sql`
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
    ensureMrCounter: async (scopeKey) => {
      await executor.execute(sql`
        INSERT INTO procurement.document_number_counter (tenant_id, document_class, scope_key, next_value)
        VALUES (current_setting('cpos.tenant_id')::uuid, 'MR', ${scopeKey}, 1)
        ON CONFLICT (tenant_id, document_class, scope_key) DO NOTHING
      `);
    },
    allocateNextMrNumber: async (scopeKey) => {
      const row = await executor.oneOrNone<{ readonly allocated: string }>(sql`
        WITH locked AS (
          SELECT next_value
          FROM procurement.document_number_counter
          WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
            AND document_class = 'MR'
            AND scope_key = ${scopeKey}
          FOR UPDATE
        ), advanced AS (
          UPDATE procurement.document_number_counter c
          SET next_value = locked.next_value + 1,
              updated_at = clock_timestamp()
          FROM locked
          WHERE c.tenant_id = current_setting('cpos.tenant_id')::uuid
            AND c.document_class = 'MR'
            AND c.scope_key = ${scopeKey}
          RETURNING locked.next_value::text AS allocated
        )
        SELECT allocated FROM advanced
      `);
      if (row === undefined) throw new Error('MR number allocation failed');
      return Number(row.allocated);
    },
    createMaterialRequisition: async (input) => {
      const row = await executor.oneOrNone<{ readonly mr_id: string }>(sql`
        INSERT INTO procurement.material_requisition (
          tenant_id, project_id, mr_number, numbering_scope_key, requester_id, requester_team,
          request_date, required_on_site_date, priority, delivery_location_id, subject, instructions, created_by
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.projectId}, ${input.mrNumber}, ${input.scopeKey},
          ${input.requesterId}, ${input.requesterTeam}, ${input.requestDate}, ${input.requiredOnSiteDate},
          ${input.priority}, ${input.deliveryLocationId}, ${input.subject}, ${input.instructions}, ${input.createdBy}
        )
        RETURNING mr_id::text
      `);
      if (row === undefined) throw new Error('MR insert returned no row');
      return row.mr_id;
    },
    createMaterialRequisitionLine: async (input) => {
      const row = await executor.oneOrNone<{ readonly mr_line_id: string }>(sql`
        INSERT INTO procurement.material_requisition_line (
          tenant_id, mr_id, line_no, entry_mode, item_id, line_type, description, specification,
          requested_quantity, uom_code, required_date_override, manufacturer, brand, model,
          equivalent_rule, preferred_supplier_id, technical_notes
        ) VALUES (
          current_setting('cpos.tenant_id')::uuid, ${input.mrId}, ${input.lineNo}, ${input.entryMode},
          ${input.itemId}, ${input.lineType}, ${input.description}, ${input.specification},
          ${input.requestedQuantity}, ${input.uomCode}, ${input.requiredDateOverride}, ${input.manufacturer},
          ${input.brand}, ${input.model}, ${input.equivalentRule}, ${input.preferredSupplierId}, ${input.technicalNotes}
        )
        RETURNING mr_line_id::text
      `);
      if (row === undefined) throw new Error('MR line insert returned no row');
      return row.mr_line_id;
    },
    requisitions: () =>
      executor.all<MrHeaderRow>(sql`
        SELECT
          mr.mr_id::text,
          mr.mr_number,
          mr.project_id::text,
          pv.project_code,
          pv.display_name AS project_name,
          mr.requester_id::text,
          requester.display_name AS requester_name,
          mr.requester_team,
          mr.request_date::text,
          mr.required_on_site_date::text,
          mr.priority,
          mr.delivery_location_id::text,
          mr.subject,
          mr.instructions,
          mr.status,
          mr.submitted_at::text,
          count(line.mr_line_id)::int AS line_count
        FROM procurement.material_requisition mr
        JOIN platform.project_version pv
          ON pv.tenant_id = mr.tenant_id
         AND pv.project_id = mr.project_id
         AND pv.effective_period @> statement_timestamp()
        JOIN platform.principal requester
          ON requester.tenant_id = mr.tenant_id
         AND requester.principal_id = mr.requester_id
        LEFT JOIN procurement.material_requisition_line line
          ON line.tenant_id = mr.tenant_id
         AND line.mr_id = mr.mr_id
        WHERE mr.tenant_id = current_setting('cpos.tenant_id')::uuid
        GROUP BY mr.mr_id, pv.project_code, pv.display_name, requester.display_name
        ORDER BY mr.recorded_at DESC, mr.mr_number DESC
      `),
    requisition: (mrId) =>
      executor.oneOrNone<MrHeaderRow>(sql`
        SELECT
          mr.mr_id::text,
          mr.mr_number,
          mr.project_id::text,
          pv.project_code,
          pv.display_name AS project_name,
          mr.requester_id::text,
          requester.display_name AS requester_name,
          mr.requester_team,
          mr.request_date::text,
          mr.required_on_site_date::text,
          mr.priority,
          mr.delivery_location_id::text,
          mr.subject,
          mr.instructions,
          mr.status,
          mr.submitted_at::text,
          count(line.mr_line_id)::int AS line_count
        FROM procurement.material_requisition mr
        JOIN platform.project_version pv
          ON pv.tenant_id = mr.tenant_id
         AND pv.project_id = mr.project_id
         AND pv.effective_period @> statement_timestamp()
        JOIN platform.principal requester
          ON requester.tenant_id = mr.tenant_id
         AND requester.principal_id = mr.requester_id
        LEFT JOIN procurement.material_requisition_line line
          ON line.tenant_id = mr.tenant_id
         AND line.mr_id = mr.mr_id
        WHERE mr.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr.mr_id = ${mrId}
        GROUP BY mr.mr_id, pv.project_code, pv.display_name, requester.display_name
      `),
    requisitionLines: (mrId) =>
      executor.all<MrLineRow>(sql`
        SELECT line.mr_line_id::text, line.line_no, line.entry_mode, line.item_id::text, item.item_code,
               line.line_type, line.description, line.specification, line.requested_quantity::text,
               line.uom_code, line.required_date_override::text, line.manufacturer, line.brand, line.model,
               line.equivalent_rule, line.preferred_supplier_id::text, line.technical_notes,
               line.approved_quantity::text, line.line_state
        FROM procurement.material_requisition_line line
        LEFT JOIN procurement.item_master item
          ON item.tenant_id = line.tenant_id AND item.item_id = line.item_id
        WHERE line.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND line.mr_id = ${mrId}
        ORDER BY line.line_no, line.mr_line_id
      `),
    updateDraftRequisition: async (input) => {
      const result = await executor.execute(sql`
        UPDATE procurement.material_requisition
        SET requester_team = ${input.requesterTeam},
            required_on_site_date = ${input.requiredOnSiteDate},
            priority = ${input.priority},
            subject = ${input.subject},
            instructions = ${input.instructions},
            updated_at = clock_timestamp()
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_id = ${input.mrId}
          AND status = 'DRAFT'
      `);
      return result.rowCount === 1;
    },
    deleteDraftRequisitionLines: async (mrId) => {
      const guard = await executor.oneOrNone<{ readonly allowed: boolean }>(sql`
        SELECT true AS allowed
        FROM procurement.material_requisition
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_id = ${mrId}
          AND status = 'DRAFT'
        FOR UPDATE
      `);
      if (guard?.allowed !== true) return false;
      await executor.execute(sql`
        DELETE FROM procurement.material_requisition_line
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_id = ${mrId}
      `);
      return true;
    },
    submitRequisition: async (mrId) => {
      const result = await executor.execute(sql`
        UPDATE procurement.material_requisition mr
        SET status = 'SUBMITTED', submitted_at = statement_timestamp(), updated_at = clock_timestamp()
        WHERE mr.tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr.mr_id = ${mrId}
          AND mr.status = 'DRAFT'
          AND EXISTS (
            SELECT 1
            FROM procurement.material_requisition_line line
            WHERE line.tenant_id = mr.tenant_id AND line.mr_id = mr.mr_id
          )
      `);
      if (result.rowCount !== 1) return false;
      await executor.execute(sql`
        UPDATE procurement.material_requisition_line
        SET line_state = 'SUBMITTED'
        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid
          AND mr_id = ${mrId}
          AND line_state = 'DRAFT'
      `);
      return true;
    },
  }),
});
