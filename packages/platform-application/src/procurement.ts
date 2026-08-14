import type {
  CreateMaterialRequisitionRequest,
  CreateMaterialRequisitionResponse,
  CreateSupplierRequest,
  CreateSupplierResponse,
  EquivalentRule,
  MaterialRequisitionDetail,
  MaterialRequisitionDetailResponse,
  MaterialRequisitionLine,
  MaterialRequisitionListResponse,
  MaterialRequisitionSummary,
  MrEntryMode,
  MrLineType,
  MrPriority,
  ProcurementReferenceDataResponse,
  SupplierComplianceSummary,
  SupplierContactSummary,
  SupplierListResponse,
  SupplierSummary,
  SupplierType,
} from '@cpos/contracts';
import type { DatabaseRuntime } from '@cpos/database-core';

import {
  procurementPersistence,
  type MrHeaderRow,
  type MrLineRow,
  type ProcurementPersistenceHandle,
  type SupplierComplianceRow,
  type SupplierContactRow,
  type SupplierRow,
} from './persistence/procurement.js';

export interface GovernedProcurementRequestContext {
  readonly authenticationIdentityId: string;
  readonly tenantId: string;
  readonly principalId: string;
  readonly invocationId: string;
  readonly serviceIdentity: string;
}

export interface GovernedProcurementService {
  referenceData(context: GovernedProcurementRequestContext): Promise<ProcurementReferenceDataResponse>;
  listSuppliers(context: GovernedProcurementRequestContext): Promise<SupplierListResponse>;
  createSupplier(
    context: GovernedProcurementRequestContext,
    request: CreateSupplierRequest,
  ): Promise<CreateSupplierResponse>;
  listRequisitions(context: GovernedProcurementRequestContext): Promise<MaterialRequisitionListResponse>;
  readRequisition(
    context: GovernedProcurementRequestContext,
    mrId: string,
  ): Promise<MaterialRequisitionDetailResponse | undefined>;
  createRequisition(
    context: GovernedProcurementRequestContext,
    request: CreateMaterialRequisitionRequest,
  ): Promise<CreateMaterialRequisitionResponse>;
  submitRequisition(
    context: GovernedProcurementRequestContext,
    mrId: string,
  ): Promise<MaterialRequisitionDetailResponse>;
}

const supplierCodePattern = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,39}$/u;
const countryCodePattern = /^[A-Z]{2}$/u;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
const positiveDecimalPattern = /^(?:0*[1-9]\d*)(?:\.\d{1,6})?$|^0*\.\d{0,5}[1-9]\d*$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

const supplierTypes = new Set<SupplierType>([
  'MATERIAL_SUPPLIER',
  'SUBCONTRACTOR',
  'SERVICE_PROVIDER',
  'MANUFACTURER',
  'DISTRIBUTOR',
  'CONSULTANT_OTHER',
]);
const mrPriorities = new Set<MrPriority>(['LOW', 'NORMAL', 'HIGH', 'URGENT']);
const mrEntryModes = new Set<MrEntryMode>(['MASTER_BACKED', 'FREE_FORM']);
const mrLineTypes = new Set<MrLineType>([
  'MATERIAL',
  'SERVICE',
  'SUBCONTRACT_SCOPE',
  'EQUIPMENT',
  'OTHER',
]);
const equivalentRules = new Set<EquivalentRule>([
  'EXACT_ONLY',
  'APPROVED_EQUIVALENT_ALLOWED',
  'ALTERNATE_BY_APPROVAL',
]);

function text(value: string | undefined, max: number): string | null {
  if (value === undefined) return null;
  const normalized = value.trim();
  if (normalized.length === 0) return null;
  if (normalized.length > max) throw new Error(`text exceeds ${max} characters`);
  return normalized;
}

function requiredText(value: string, label: string, max: number): string {
  const normalized = value.trim();
  if (normalized.length < 1 || normalized.length > max) throw new Error(`${label} is invalid`);
  return normalized;
}

function requireUuid(value: string, label: string): string {
  const normalized = value.trim();
  if (!uuidPattern.test(normalized)) throw new Error(`${label} is invalid`);
  return normalized;
}

function requireDate(value: string, label: string): string {
  if (!datePattern.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error(`${label} is invalid`);
  }
  return value;
}

function requireQuantity(value: string): string {
  const normalized = value.trim();
  if (!positiveDecimalPattern.test(normalized)) {
    throw new Error('requestedQuantity must be a positive exact decimal with at most 6 decimals');
  }
  return normalized;
}

function transactionContext(context: GovernedProcurementRequestContext, operationKey: string) {
  return {
    tenantId: context.tenantId,
    principalId: context.principalId,
    operationKey,
    invocationId: context.invocationId,
    serviceIdentity: context.serviceIdentity,
  };
}

function contact(row: SupplierContactRow | undefined): SupplierContactSummary | null {
  if (row === undefined) return null;
  return {
    supplierContactId: row.supplier_contact_id,
    displayName: row.display_name,
    jobTitle: row.job_title,
    email: row.email,
    phone: row.phone,
    preferredChannel: row.preferred_channel,
    isPrimary: row.is_primary,
    activeState: row.active_state,
  };
}

function compliance(row: SupplierComplianceRow): SupplierComplianceSummary {
  return {
    complianceDocumentId: row.compliance_document_id,
    documentType: row.document_type,
    documentNumber: row.document_number,
    expiryDate: row.expiry_date,
    verificationStatus: row.verification_status,
  };
}

function supplier(
  row: SupplierRow,
  contacts: readonly SupplierContactRow[],
  documents: readonly SupplierComplianceRow[],
): SupplierSummary {
  return {
    supplierId: row.supplier_id,
    supplierCode: row.supplier_code,
    legalName: row.legal_name,
    tradeName: row.trade_name,
    supplierType: row.supplier_type,
    supplierState: row.supplier_state,
    countryCode: row.country_code,
    emirateRegion: row.emirate_region,
    businessPhone: row.business_phone,
    businessEmail: row.business_email,
    trnVatNumber: row.trn_vat_number,
    primaryContact: contact(
      contacts.find((entry) => entry.supplier_id === row.supplier_id && entry.is_primary),
    ),
    compliance: documents.filter((entry) => entry.supplier_id === row.supplier_id).map(compliance),
  };
}

function mrSummary(row: MrHeaderRow): MaterialRequisitionSummary {
  return {
    mrId: row.mr_id,
    mrNumber: row.mr_number,
    projectId: row.project_id,
    projectCode: row.project_code,
    projectName: row.project_name,
    requesterId: row.requester_id,
    requesterName: row.requester_name,
    requestDate: row.request_date,
    requiredOnSiteDate: row.required_on_site_date,
    priority: row.priority,
    subject: row.subject,
    status: row.status,
    submittedAt: row.submitted_at,
    lineCount: row.line_count,
  };
}

function mrLine(row: MrLineRow): MaterialRequisitionLine {
  return {
    mrLineId: row.mr_line_id,
    lineNo: row.line_no,
    entryMode: row.entry_mode,
    itemId: row.item_id,
    lineType: row.line_type,
    description: row.description,
    specification: row.specification,
    requestedQuantity: row.requested_quantity,
    uomCode: row.uom_code,
    requiredDateOverride: row.required_date_override,
    manufacturer: row.manufacturer,
    brand: row.brand,
    model: row.model,
    equivalentRule: row.equivalent_rule,
    preferredSupplierId: row.preferred_supplier_id,
    technicalNotes: row.technical_notes,
    approvedQuantity: row.approved_quantity,
    lineState: row.line_state,
  };
}

async function mrDetail(
  handle: ProcurementPersistenceHandle,
  mrId: string,
): Promise<MaterialRequisitionDetail | undefined> {
  const [header, lines] = await Promise.all([handle.requisition(mrId), handle.requisitionLines(mrId)]);
  if (header === undefined) return undefined;
  return {
    ...mrSummary(header),
    requesterTeam: header.requester_team,
    deliveryLocationId: header.delivery_location_id,
    instructions: header.instructions,
    lines: lines.map(mrLine),
  };
}

export function createGovernedProcurementService(
  database: DatabaseRuntime,
  now: () => Date = () => new Date(),
): GovernedProcurementService {
  async function verifyAndUse<Result>(
    context: GovernedProcurementRequestContext,
    operationKey: string,
    callback: (handle: ProcurementPersistenceHandle) => Promise<Result>,
  ): Promise<Result> {
    return database.withExecutionContext(
      transactionContext(context, operationKey),
      { isolation: 'READ COMMITTED', logicalIdentity: context.invocationId },
      procurementPersistence,
      async (handle) => {
        if (!(await handle.verifyAuthenticationIdentity(context.authenticationIdentityId))) {
          throw new Error('verified authentication identity is not bound to this tenant principal');
        }
        return callback(handle);
      },
    );
  }

  return Object.freeze({
    referenceData: (context) =>
      verifyAndUse(context, 'procurement.reference-data.read.v1', async (handle) => ({
        uoms: (await handle.uoms()).map((row) => ({
          code: row.uom_code,
          displayName: row.display_name,
          quantityKind: row.quantity_kind,
          decimalScale: row.decimal_scale,
        })),
      })),

    listSuppliers: (context) =>
      verifyAndUse(context, 'procurement.suppliers.list.v1', async (handle) => {
        const [rows, contacts, documents] = await Promise.all([
          handle.suppliers(),
          handle.supplierContacts(),
          handle.supplierCompliance(),
        ]);
        return { suppliers: rows.map((row) => supplier(row, contacts, documents)) };
      }),

    createSupplier: (context, request) =>
      verifyAndUse(context, 'procurement.supplier.create.v1', async (handle) => {
        if (!(await handle.canManageSuppliers())) {
          throw new Error('not authorized to manage suppliers');
        }
        if (!supplierTypes.has(request.supplierType)) throw new Error('supplierType is invalid');
        const supplierCode = request.supplierCode.trim().toUpperCase();
        if (!supplierCodePattern.test(supplierCode)) throw new Error('supplierCode is invalid');
        const legalName = requiredText(request.legalName, 'legalName', 240);
        const countryCode = (request.countryCode ?? 'AE').trim().toUpperCase();
        if (!countryCodePattern.test(countryCode)) throw new Error('countryCode is invalid');
        const businessEmail = text(request.businessEmail, 320);
        if (businessEmail !== null && !emailPattern.test(businessEmail)) {
          throw new Error('businessEmail is invalid');
        }
        const created = await handle.createSupplier({
          supplierCode,
          legalName,
          tradeName: text(request.tradeName, 240),
          supplierType: request.supplierType,
          countryCode,
          emirateRegion: text(request.emirateRegion, 120),
          businessPhone: text(request.businessPhone, 40),
          businessEmail,
          trnVatNumber: text(request.trnVatNumber, 80),
          createdBy: context.principalId,
        });

        let primaryContact: SupplierContactRow | undefined;
        if (request.primaryContact !== undefined) {
          const contactEmail = text(request.primaryContact.email, 320);
          if (contactEmail === null || !emailPattern.test(contactEmail)) {
            throw new Error('primaryContact.email is required and must be valid in Session 01');
          }
          primaryContact = await handle.createPrimaryContact({
            supplierId: created.supplier_id,
            displayName: requiredText(
              request.primaryContact.displayName,
              'primaryContact.displayName',
              160,
            ),
            jobTitle: text(request.primaryContact.jobTitle, 120),
            email: contactEmail,
            phone: text(request.primaryContact.phone, 40),
          });
        }

        return {
          supplier: supplier(created, primaryContact === undefined ? [] : [primaryContact], []),
        };
      }),

    listRequisitions: (context) =>
      verifyAndUse(context, 'procurement.mr.list.v1', async (handle) => ({
        requisitions: (await handle.requisitions()).map(mrSummary),
      })),

    readRequisition: (context, rawMrId) => {
      const mrId = requireUuid(rawMrId, 'mrId');
      return verifyAndUse(context, 'procurement.mr.read.v1', async (handle) => {
        const requisition = await mrDetail(handle, mrId);
        return requisition === undefined ? undefined : { requisition };
      });
    },

    createRequisition: (context, request) =>
      verifyAndUse(context, 'procurement.mr.create.v1', async (handle) => {
        if (!(await handle.canCreateRequisition())) {
          throw new Error('not authorized to create Material/Purchase Requisitions');
        }
        const projectId = requireUuid(request.projectId, 'projectId');
        const project = await handle.project(projectId);
        if (project === undefined) {
          throw new Error('project is not active or not visible in this tenant');
        }
        if (!Array.isArray(request.lines) || request.lines.length < 1 || request.lines.length > 250) {
          throw new Error('MR must contain between 1 and 250 lines');
        }
        if (request.priority !== undefined && !mrPriorities.has(request.priority)) {
          throw new Error('priority is invalid');
        }

        const availableUoms = new Set((await handle.uoms()).map((entry) => entry.uom_code));
        const requestDate = now().toISOString().slice(0, 10);
        const requiredOnSiteDate = requireDate(request.requiredOnSiteDate, 'requiredOnSiteDate');
        if (requiredOnSiteDate < requestDate) {
          throw new Error('requiredOnSiteDate cannot be before requestDate');
        }
        const year = requestDate.slice(0, 4);
        const yy = year.slice(2);
        const scopeKey = `PROJECT:${projectId}:YEAR:${year}`;
        await handle.ensureMrCounter(scopeKey);
        const sequence = await handle.allocateNextMrNumber(scopeKey);
        const mrNumber = `MR-${project.project_code}-${yy}-${String(sequence).padStart(5, '0')}`;

        const mrId = await handle.createMaterialRequisition({
          projectId,
          mrNumber,
          scopeKey,
          requesterId: context.principalId,
          requesterTeam: text(request.requesterTeam, 120),
          requestDate,
          requiredOnSiteDate,
          priority: request.priority ?? 'NORMAL',
          deliveryLocationId:
            request.deliveryLocationId === undefined
              ? null
              : requireUuid(request.deliveryLocationId, 'deliveryLocationId'),
          subject: requiredText(request.subject, 'subject', 240),
          instructions: text(request.instructions, 4000),
          createdBy: context.principalId,
        });

        let lineNo = 10;
        for (const line of request.lines) {
          if (!mrEntryModes.has(line.entryMode)) throw new Error('line.entryMode is invalid');
          if (!mrLineTypes.has(line.lineType)) throw new Error('line.lineType is invalid');
          if (line.equivalentRule !== undefined && !equivalentRules.has(line.equivalentRule)) {
            throw new Error('line.equivalentRule is invalid');
          }
          const entryMode = line.entryMode;
          const itemId = line.itemId === undefined ? null : requireUuid(line.itemId, 'itemId');
          if ((entryMode === 'MASTER_BACKED') !== (itemId !== null)) {
            throw new Error('MASTER_BACKED lines require itemId; FREE_FORM lines must not carry itemId');
          }
          const uomCode = requiredText(line.uomCode, 'uomCode', 12).toUpperCase();
          if (!availableUoms.has(uomCode)) throw new Error(`uomCode ${uomCode} is not active`);
          const requiredDateOverride =
            line.requiredDateOverride === undefined
              ? null
              : requireDate(line.requiredDateOverride, 'requiredDateOverride');
          await handle.createMaterialRequisitionLine({
            mrId,
            lineNo,
            entryMode,
            itemId,
            lineType: line.lineType,
            description: requiredText(line.description, 'line.description', 500),
            specification: text(line.specification, 12_000),
            requestedQuantity: requireQuantity(line.requestedQuantity),
            uomCode,
            requiredDateOverride,
            manufacturer: text(line.manufacturer, 160),
            brand: text(line.brand, 160),
            model: text(line.model, 160),
            equivalentRule: line.equivalentRule ?? 'ALTERNATE_BY_APPROVAL',
            preferredSupplierId:
              line.preferredSupplierId === undefined
                ? null
                : requireUuid(line.preferredSupplierId, 'preferredSupplierId'),
            technicalNotes: text(line.technicalNotes, 4000),
          });
          lineNo += 10;
        }

        const requisition = await mrDetail(handle, mrId);
        if (requisition === undefined) throw new Error('created MR could not be reloaded');
        return { requisition };
      }),

    submitRequisition: (context, rawMrId) => {
      const mrId = requireUuid(rawMrId, 'mrId');
      return verifyAndUse(context, 'procurement.mr.submit.v1', async (handle) => {
        if (!(await handle.canCreateRequisition())) {
          throw new Error('not authorized to submit Material/Purchase Requisitions');
        }
        if (!(await handle.submitRequisition(mrId))) {
          throw new Error('MR submit conflict: only a populated DRAFT can be submitted');
        }
        const requisition = await mrDetail(handle, mrId);
        if (requisition === undefined) throw new Error('submitted MR could not be reloaded');
        return { requisition };
      });
    },
  });
}
