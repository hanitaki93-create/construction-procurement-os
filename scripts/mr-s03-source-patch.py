from pathlib import Path


def replace(path: str, old: str, new: str, count: int = 1) -> None:
    p = Path(path)
    text = p.read_text()
    found = text.count(old)
    if found < count:
        raise SystemExit(f"{path}: expected at least {count} copies of marker, found {found}: {old[:120]!r}")
    p.write_text(text.replace(old, new, count))


replace(
    "packages/contracts/src/procurement.ts",
    "export interface ProcurementReferenceDataResponse {\n  readonly uoms: readonly ProcurementUom[];\n}\n",
    "export interface ProcurementItemReference {\n  readonly itemId: string;\n  readonly itemCode: string;\n  readonly itemKind: MrLineType;\n  readonly shortDescription: string;\n  readonly detailedSpecification: string | null;\n  readonly defaultUomCode: string | null;\n  readonly manufacturer: string | null;\n  readonly brand: string | null;\n  readonly model: string | null;\n  readonly equivalentRule: EquivalentRule;\n}\n\nexport interface ProcurementReferenceDataResponse {\n  readonly uoms: readonly ProcurementUom[];\n  readonly items: readonly ProcurementItemReference[];\n}\n",
)
replace(
    "packages/contracts/src/procurement.ts",
    "export interface ProcurementRouteDecisionSummary {",
    "export interface UpdateMaterialRequisitionDraftRequest {\n  readonly requiredOnSiteDate: string;\n  readonly priority: MrPriority;\n  readonly subject: string;\n  readonly requesterTeam?: string;\n  readonly instructions?: string;\n  readonly lines: readonly CreateMaterialRequisitionLineRequest[];\n}\n\nexport interface UpdateMaterialRequisitionDraftResponse {\n  readonly requisition: MaterialRequisitionDetail;\n}\n\nexport interface ProcurementRouteDecisionSummary {",
)
replace(
    "packages/contracts/src/procurement.ts",
    "  readonly itemId: string | null;\n  readonly lineType: MrLineType;",
    "  readonly itemId: string | null;\n  readonly itemCode: string | null;\n  readonly lineType: MrLineType;",
)

replace(
    "packages/platform-application/src/persistence/procurement.ts",
    "export interface SupplierRow {",
    "export interface ItemReferenceRow {\n  readonly item_id: string;\n  readonly item_code: string;\n  readonly item_kind: 'MATERIAL' | 'SERVICE' | 'SUBCONTRACT_SCOPE' | 'EQUIPMENT' | 'OTHER';\n  readonly short_description: string;\n  readonly detailed_specification: string | null;\n  readonly default_uom_code: string | null;\n  readonly manufacturer: string | null;\n  readonly brand: string | null;\n  readonly model: string | null;\n  readonly equivalent_rule: 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';\n}\n\nexport interface SupplierRow {",
)
replace(
    "packages/platform-application/src/persistence/procurement.ts",
    "  readonly item_id: string | null;\n  readonly line_type:",
    "  readonly item_id: string | null;\n  readonly item_code: string | null;\n  readonly line_type:",
)
replace(
    "packages/platform-application/src/persistence/procurement.ts",
    "  uoms(): Promise<readonly UomRow[]>;\n  suppliers(): Promise<readonly SupplierRow[]>;",
    "  uoms(): Promise<readonly UomRow[]>;\n  items(): Promise<readonly ItemReferenceRow[]>;\n  suppliers(): Promise<readonly SupplierRow[]>;",
)
replace(
    "packages/platform-application/src/persistence/procurement.ts",
    "  requisitions(): Promise<readonly MrHeaderRow[]>;",
    "  updateDraftRequisition(input: {\n    readonly mrId: string;\n    readonly requesterTeam: string | null;\n    readonly requiredOnSiteDate: string;\n    readonly priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';\n    readonly subject: string;\n    readonly instructions: string | null;\n  }): Promise<boolean>;\n  deleteDraftRequisitionLines(mrId: string): Promise<boolean>;\n  requisitions(): Promise<readonly MrHeaderRow[]>;",
)
replace(
    "packages/platform-application/src/persistence/procurement.ts",
    "    suppliers: () =>\n      executor.all<SupplierRow>(sql`",
    "    items: () =>\n      executor.all<ItemReferenceRow>(sql`\n        SELECT item_id::text, item_code, item_kind, short_description, detailed_specification,\n               default_uom_code, manufacturer, brand, model, equivalent_rule\n        FROM procurement.item_master\n        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid\n          AND active\n        ORDER BY item_code\n      `),\n    suppliers: () =>\n      executor.all<SupplierRow>(sql`",
)
replace(
    "packages/platform-application/src/persistence/procurement.ts",
    "    requisitionLines: (mrId) =>\n      executor.all<MrLineRow>(sql`\n        SELECT mr_line_id::text, line_no, entry_mode, item_id::text, line_type, description, specification,\n               requested_quantity::text, uom_code, required_date_override::text, manufacturer, brand, model,\n               equivalent_rule, preferred_supplier_id::text, technical_notes, approved_quantity::text, line_state\n        FROM procurement.material_requisition_line\n        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid\n          AND mr_id = ${mrId}\n        ORDER BY line_no, mr_line_id\n      `),\n    submitRequisition: async (mrId) => {",
    "    requisitionLines: (mrId) =>\n      executor.all<MrLineRow>(sql`\n        SELECT line.mr_line_id::text, line.line_no, line.entry_mode, line.item_id::text, item.item_code,\n               line.line_type, line.description, line.specification, line.requested_quantity::text,\n               line.uom_code, line.required_date_override::text, line.manufacturer, line.brand, line.model,\n               line.equivalent_rule, line.preferred_supplier_id::text, line.technical_notes,\n               line.approved_quantity::text, line.line_state\n        FROM procurement.material_requisition_line line\n        LEFT JOIN procurement.item_master item\n          ON item.tenant_id = line.tenant_id AND item.item_id = line.item_id\n        WHERE line.tenant_id = current_setting('cpos.tenant_id')::uuid\n          AND line.mr_id = ${mrId}\n        ORDER BY line.line_no, line.mr_line_id\n      `),\n    updateDraftRequisition: async (input) => {\n      const result = await executor.execute(sql`\n        UPDATE procurement.material_requisition\n        SET requester_team = ${input.requesterTeam},\n            required_on_site_date = ${input.requiredOnSiteDate},\n            priority = ${input.priority},\n            subject = ${input.subject},\n            instructions = ${input.instructions},\n            updated_at = clock_timestamp()\n        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid\n          AND mr_id = ${input.mrId}\n          AND status = 'DRAFT'\n      `);\n      return result.rowCount === 1;\n    },\n    deleteDraftRequisitionLines: async (mrId) => {\n      const guard = await executor.oneOrNone<{ readonly allowed: boolean }>(sql`\n        SELECT true AS allowed\n        FROM procurement.material_requisition\n        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid\n          AND mr_id = ${mrId}\n          AND status = 'DRAFT'\n        FOR UPDATE\n      `);\n      if (guard?.allowed !== true) return false;\n      await executor.execute(sql`\n        DELETE FROM procurement.material_requisition_line\n        WHERE tenant_id = current_setting('cpos.tenant_id')::uuid\n          AND mr_id = ${mrId}\n      `);\n      return true;\n    },\n    submitRequisition: async (mrId) => {",
)

replace(
    "packages/platform-application/src/procurement.ts",
    "  SupplierType,\n} from '@cpos/contracts';",
    "  SupplierType,\n  UpdateMaterialRequisitionDraftRequest,\n  UpdateMaterialRequisitionDraftResponse,\n} from '@cpos/contracts';",
)
replace(
    "packages/platform-application/src/procurement.ts",
    "  createRequisition(\n    context: GovernedProcurementRequestContext,\n    request: CreateMaterialRequisitionRequest,\n  ): Promise<CreateMaterialRequisitionResponse>;\n  submitRequisition(",
    "  createRequisition(\n    context: GovernedProcurementRequestContext,\n    request: CreateMaterialRequisitionRequest,\n  ): Promise<CreateMaterialRequisitionResponse>;\n  updateRequisitionDraft(\n    context: GovernedProcurementRequestContext,\n    mrId: string,\n    request: UpdateMaterialRequisitionDraftRequest,\n  ): Promise<UpdateMaterialRequisitionDraftResponse>;\n  submitRequisition(",
)
replace(
    "packages/platform-application/src/procurement.ts",
    "    itemId: row.item_id,\n    lineType: row.line_type,",
    "    itemId: row.item_id,\n    itemCode: row.item_code,\n    lineType: row.line_type,",
)
replace(
    "packages/platform-application/src/procurement.ts",
    "    referenceData: (context) =>\n      verifyAndUse(context, 'procurement.reference-data.read.v1', async (handle) => ({\n        uoms: (await handle.uoms()).map((row) => ({\n          code: row.uom_code,\n          displayName: row.display_name,\n          quantityKind: row.quantity_kind,\n          decimalScale: row.decimal_scale,\n        })),\n      })),",
    "    referenceData: (context) =>\n      verifyAndUse(context, 'procurement.reference-data.read.v1', async (handle) => {\n        const [uoms, items] = await Promise.all([handle.uoms(), handle.items()]);\n        return {\n          uoms: uoms.map((row) => ({ code: row.uom_code, displayName: row.display_name, quantityKind: row.quantity_kind, decimalScale: row.decimal_scale })),\n          items: items.map((row) => ({ itemId: row.item_id, itemCode: row.item_code, itemKind: row.item_kind, shortDescription: row.short_description, detailedSpecification: row.detailed_specification, defaultUomCode: row.default_uom_code, manufacturer: row.manufacturer, brand: row.brand, model: row.model, equivalentRule: row.equivalent_rule })),\n        };\n      }),",
)
replace(
    "packages/platform-application/src/procurement.ts",
    "    submitRequisition: async (context, rawMrId) => {",
    "    updateRequisitionDraft: async (context, rawMrId, request) => {\n      const mrId = requireUuid(rawMrId, 'mrId');\n      await verifyAndUse(context, 'procurement.mr.draft.update.v1', async (handle) => {\n        if (!(await handle.canCreateRequisition())) throw new Error('not authorized to edit Material/Purchase Requisitions');\n        const existing = await handle.requisition(mrId);\n        if (existing === undefined) throw new Error('MR not found');\n        if (existing.status !== 'DRAFT') throw new Error('MR draft update conflict: only DRAFT requisitions can be edited');\n        if (!Array.isArray(request.lines) || request.lines.length < 1 || request.lines.length > 250) throw new Error('MR must contain between 1 and 250 lines');\n        if (!mrPriorities.has(request.priority)) throw new Error('priority is invalid');\n        const availableUoms = new Set((await handle.uoms()).map((entry) => entry.uom_code));\n        const availableItems = new Set((await handle.items()).map((entry) => entry.item_id));\n        const requiredOnSiteDate = requireDate(request.requiredOnSiteDate, 'requiredOnSiteDate');\n        if (requiredOnSiteDate < existing.request_date) throw new Error('requiredOnSiteDate cannot be before requestDate');\n        const normalized = request.lines.map((line) => {\n          if (!mrEntryModes.has(line.entryMode)) throw new Error('line.entryMode is invalid');\n          if (!mrLineTypes.has(line.lineType)) throw new Error('line.lineType is invalid');\n          if (line.equivalentRule !== undefined && !equivalentRules.has(line.equivalentRule)) throw new Error('line.equivalentRule is invalid');\n          const itemId = line.itemId === undefined ? null : requireUuid(line.itemId, 'itemId');\n          if ((line.entryMode === 'MASTER_BACKED') !== (itemId !== null)) throw new Error('MASTER_BACKED lines require itemId; FREE_FORM lines must not carry itemId');\n          if (itemId !== null && !availableItems.has(itemId)) throw new Error('itemId is not active or not visible');\n          const uomCode = requiredText(line.uomCode, 'uomCode', 12).toUpperCase();\n          if (!availableUoms.has(uomCode)) throw new Error(`uomCode ${uomCode} is not active`);\n          return { entryMode: line.entryMode, itemId, lineType: line.lineType, description: requiredText(line.description, 'line.description', 500), specification: text(line.specification, 12_000), requestedQuantity: requireQuantity(line.requestedQuantity), uomCode, requiredDateOverride: line.requiredDateOverride === undefined ? null : requireDate(line.requiredDateOverride, 'requiredDateOverride'), manufacturer: text(line.manufacturer, 160), brand: text(line.brand, 160), model: text(line.model, 160), equivalentRule: line.equivalentRule ?? 'ALTERNATE_BY_APPROVAL', preferredSupplierId: line.preferredSupplierId === undefined ? null : requireUuid(line.preferredSupplierId, 'preferredSupplierId'), technicalNotes: text(line.technicalNotes, 4000) };\n        });\n        if (!(await handle.updateDraftRequisition({ mrId, requesterTeam: text(request.requesterTeam, 120), requiredOnSiteDate, priority: request.priority, subject: requiredText(request.subject, 'subject', 240), instructions: text(request.instructions, 4000) }))) throw new Error('MR draft update conflict: requisition is no longer editable');\n        if (!(await handle.deleteDraftRequisitionLines(mrId))) throw new Error('MR draft update conflict: requisition is no longer editable');\n        let lineNo = 10;\n        for (const line of normalized) { await handle.createMaterialRequisitionLine({ mrId, lineNo, ...line }); lineNo += 10; }\n      });\n      const requisition = await loadDetail(context, mrId);\n      if (requisition === undefined) throw new Error('updated MR could not be reloaded');\n      return { requisition };\n    },\n\n    submitRequisition: async (context, rawMrId) => {",
)

replace(
    "apps/api/src/app.ts",
    "  type SetProcurementRouteRequest,\n} from '@cpos/contracts';",
    "  type SetProcurementRouteRequest,\n  type UpdateMaterialRequisitionDraftRequest,\n} from '@cpos/contracts';",
)
replace(
    "apps/api/src/app.ts",
    "  app.get('/procurement/requisitions/:mrId', async (request, reply) => {",
    "  app.put('/procurement/requisitions/:mrId/draft', async (request, reply) => {\n    if (!procurementService) return reply.status(503).send({ code: 'PROCUREMENT_RUNTIME_UNAVAILABLE' });\n    const context = await resolvedContext(request, config.build.environment, authenticationSessionResolver);\n    if (!context) return reply.status(401).send({ code: 'SESSION_REQUIRED', message: sessionRequiredMessage(config.build.environment) });\n    const mrId = (request.params as { readonly mrId?: unknown }).mrId;\n    const raw = request.body;\n    if (typeof mrId !== 'string' || !isObject(raw) || typeof raw['requiredOnSiteDate'] !== 'string' || typeof raw['priority'] !== 'string' || typeof raw['subject'] !== 'string' || !Array.isArray(raw['lines'])) return reply.status(400).send({ code: 'INVALID_MR_DRAFT_REQUEST' });\n    try { return await procurementService.updateRequisitionDraft(context, mrId, raw as unknown as UpdateMaterialRequisitionDraftRequest); }\n    catch (error: unknown) { const status = productErrorStatus(error); if (status === 500) throw error; return reply.status(status).send({ code: 'MR_DRAFT_UPDATE_REJECTED', requestId: request.id }); }\n  });\n\n  app.get('/procurement/requisitions/:mrId', async (request, reply) => {",
)

replace(
    "apps/web-internal/src/procurement.tsx",
    "import { MrReviewPanel } from './mr-review-panel.js';\nimport './procurement.css';",
    "import { MrReviewPanel } from './mr-review-panel.js';\nimport { ErpRequisitionWorkspaceS03 } from './erp-requisition-s03.js';\nimport './procurement.css';",
)
replace(
    "apps/web-internal/src/procurement.tsx",
    "    <MaterialRequisitionWorkspace session={session} locale={locale} projects={projects} />",
    "    <ErpRequisitionWorkspaceS03 session={session} projects={projects} />",
)
replace(
    "apps/web-internal/src/erp-requisition-s03.tsx",
    "<DraftEditor key={`${mr.mrId}:${mr.updatedAt ?? mr.mrNumber}`} session={session}",
    "<DraftEditor key={mr.mrId} session={session}",
)
