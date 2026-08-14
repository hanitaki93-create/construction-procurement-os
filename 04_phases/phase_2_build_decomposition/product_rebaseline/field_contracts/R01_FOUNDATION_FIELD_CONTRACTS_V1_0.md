# CPOS Architecture V2 — R01 Foundation Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

These tables are build authority for R01 capabilities. `NONE` means no separate master source; it does not mean validation is absent.

## A. Item / Material / Service / Scope Master

Closed enum `item_type = {MATERIAL, SERVICE, SUBCONTRACT_SCOPE, EQUIPMENT, OTHER}`.
Closed enum `substitution_policy = {EXACT_ONLY, APPROVED_EQUIVALENT_ALLOWED, ALTERNATE_BY_APPROVAL}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| item_code | Reusable human item/service/scope code | BusinessNumber/ShortText(40) | REQUIRED for master-backed records | Item numbering policy | generated or imported | immutable after first transaction reference; alias/correction path thereafter | unique per tenant/item namespace; trimmed uppercase comparison key | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| item_type | Procurement nature | ClosedEnum | REQUIRED | product enum | MATERIAL | editable while unused/draft only | one legal enum value | TENANT_INTERNAL | COPY_SNAPSHOT |
| short_description | Search/display description | ShortText(240) | REQUIRED | NONE | NONE | editable while active; changes versioned for future use | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT at transaction creation |
| detailed_specification | Reusable specification text | LongText(12000) | OPTIONAL | NONE | blank | editable; transaction snapshots do not retroactively change | sanitized text | TENANT_INTERNAL | COPY_SNAPSHOT |
| default_uom_id | Default commercial UOM | Reference<UOM> | CONDITIONAL; required for quantified MATERIAL/EQUIPMENT | UOM registry | NONE | editable; future transactions use new default only | active compatible UOM | TENANT_INTERNAL | COPY_SNAPSHOT |
| category_trade_id | Classification | Reference<CategoryTrade> | OPTIONAL | Category/Trade taxonomy | NONE | editable | active taxonomy version | TENANT_INTERNAL | COPY_REFERENCE + snapshot label |
| manufacturer | Manufacturer/brand owner | ShortText(160) | OPTIONAL | NONE | blank | editable | normalized text | TENANT_INTERNAL | COPY_SNAPSHOT |
| brand | Commercial brand | ShortText(160) | OPTIONAL | NONE | blank | editable | normalized text | TENANT_INTERNAL | COPY_SNAPSHOT |
| model | Model/product designation | ShortText(160) | OPTIONAL | NONE | blank | editable | normalized text | TENANT_INTERNAL | COPY_SNAPSHOT |
| manufacturer_part_number | External part number | ShortText(120) | OPTIONAL | NONE | blank | editable | normalized text | TENANT_INTERNAL | COPY_SNAPSHOT |
| substitution_policy | Default equivalent/alternate rule | ClosedEnum | REQUIRED | product enum | ALTERNATE_BY_APPROVAL | editable for future transactions | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| aliases | Search synonyms | string[] each ShortText(120) | OPTIONAL | NONE | empty | editable | deduplicated case-insensitive; max 20 | TENANT_INTERNAL | DO_NOT_COPY |
| specification_attachments | Reusable source/spec files | AttachmentSet | OPTIONAL | File/Attachment capability | empty | editable by versioning | exact versions; authorized access | TENANT_INTERNAL | COPY_REFERENCE to exact versions when selected |
| supplier_cross_refs | Supplier-specific code aliases | list<supplier_id, supplier_item_code> | OPTIONAL | Supplier Master | empty | editable | supplier exists; unique pair | COMMERCIAL_CONFIDENTIAL | DO_NOT_COPY unless selected supplier requires it |
| active_state | Availability for new use | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | product enum | ACTIVE | authorized maintenance action | inactive cannot be newly selected | TENANT_INTERNAL | COPY_SNAPSHOT |

Free-form transaction lines remain legal and do not create a master item automatically.

## B. UOM Registry

Closed enum `uom_dimension = {COUNT, LENGTH, AREA, VOLUME, MASS, LIQUID_VOLUME, TIME, LUMP_SUM, OTHER}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| uom_key | Stable machine/business key | ShortText(20) | REQUIRED | UOM registry | NONE | immutable after use | unique; uppercase ASCII key | TENANT_INTERNAL | COPY_REFERENCE + snapshot symbol |
| symbol | User-facing symbol | ShortText(16) | REQUIRED | NONE | NONE | editable with versioned display history | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| name | User-facing name | ShortText(80) | REQUIRED | NONE | NONE | editable | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| dimension | Conversion family | ClosedEnum | REQUIRED | product enum | OTHER | immutable after use | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| display_precision | Decimal places shown by default | Integer 0..6 | REQUIRED | NONE | 2 | editable for display only | range 0..6 | TENANT_INTERNAL | DO_NOT_COPY |
| quantity_rounding_scale | Deterministic stored/business rounding | Integer 0..9 | REQUIRED | numeric policy | 4 | changes are versioned; no retroactive mutation | range 0..9 | SYSTEM_CONTROL | COPY_SNAPSHOT policy version |
| base_uom_id | Base UOM within dimension | Reference<UOM> | CONDITIONAL for convertible UOM | UOM registry | self for base | immutable once conversion used | same dimension | SYSTEM_CONTROL | COPY_REFERENCE |
| conversion_factor_to_base | Exact multiplicative factor | Decimal(28,12) | CONDITIONAL when base differs | UOM registry | 1 | versioned; no retroactive rewrite | >0; same dimension | SYSTEM_CONTROL | COPY_SNAPSHOT conversion basis |
| active_state | Selectability | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | product enum | ACTIVE | maintenance action | inactive cannot be newly selected | TENANT_INTERNAL | COPY_SNAPSHOT |

Cross-dimension conversion is prohibited. `LUMP_SUM` has no conversion to quantified physical dimensions.

## C. Category / Trade Taxonomy

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| category_code | Stable category/trade code | ShortText(40) | REQUIRED | taxonomy | NONE | immutable after use | unique per taxonomy version | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| display_name | User-facing trade/category | ShortText(160) | REQUIRED | NONE | NONE | editable by new taxonomy version where meaning changes | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| parent_id | Parent classification | Reference<CategoryTrade> | OPTIONAL | taxonomy | NONE | editable if no cycle; versioned | same taxonomy; acyclic | SYSTEM_CONTROL | COPY_REFERENCE |
| taxonomy_version | Version of classification set | Integer/string version | REQUIRED | taxonomy | generated | immutable | monotonic/version-unique | SYSTEM_CONTROL | COPY_SNAPSHOT |
| active_state | Current selectability | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | product enum | ACTIVE | maintenance action | active parent rules | TENANT_INTERNAL | COPY_SNAPSHOT |

## D. Cost / WBS Reference

Closed enum `authority_mode = {OWN, MIRROR, REFERENCE}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| cost_ref_code | Cost/WBS code used by users | ShortText(80) | REQUIRED | project cost structure | NONE | immutable within an imported/versioned basis | unique in authority/source scope | RESTRICTED_FINANCIAL | COPY_SNAPSHOT + reference |
| display_name | Cost/WBS description | ShortText(240) | REQUIRED | source/owned structure | NONE | follows version/source rules | nonblank | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| project_id | Owning project | Reference<Project> | REQUIRED | Project | current project | immutable | project compatible | RESTRICTED_FINANCIAL | COPY_REFERENCE |
| parent_cost_ref_id | Hierarchy parent | Reference<CostRef> | OPTIONAL | cost structure | NONE | follows source/version | acyclic | RESTRICTED_FINANCIAL | COPY_REFERENCE |
| authority_mode | Which system owns the record | ClosedEnum | REQUIRED | integration configuration | REFERENCE | change requires controlled remap/version | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| external_reference | ERP/cost-system identity | ShortText(160) | CONDITIONAL for MIRROR/REFERENCE | external system | NONE | follows reconciliation | unique within source connector | SYSTEM_CONTROL | COPY_REFERENCE |
| effective_from | Basis start | LocalDate | OPTIONAL | source/version | NONE | immutable in a version | <= effective_to | SYSTEM_CONTROL | COPY_SNAPSHOT |
| effective_to | Basis end | LocalDate | OPTIONAL | source/version | NONE | controlled close | >= effective_from | SYSTEM_CONTROL | COPY_SNAPSHOT |
| active_state | Can receive new distributions | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | product/source | ACTIVE | follows authority mode | inactive blocked for new distribution | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |

## E. Other governed reference records

### PaymentTerm

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| payment_term_code | Reusable code | ShortText(40) | REQUIRED | Payment Terms registry | NONE | immutable after use | unique | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| description | Human term description | ShortText(240) | REQUIRED | NONE | NONE | editable for future use; issued transactions retain snapshot | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| due_basis | Calculation basis | ClosedEnum{FROM_INVOICE, FROM_DELIVERY, FROM_GRN, FROM_CERTIFICATION, FROM_ISSUE, OTHER} | REQUIRED | product enum | FROM_INVOICE | editable by new version after use | legal enum | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| days | Number of days | Integer 0..3650 | CONDITIONAL unless OTHER | NONE | 30 | editable by version | range | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| free_text_clause | Additional bounded wording | LongText(2000) | OPTIONAL | approved terms | blank | versioned | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| active_state | Selectability | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | product enum | ACTIVE | maintenance | no new selection when inactive | TENANT_INTERNAL | COPY_SNAPSHOT |

### DeliveryLocation

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| location_code | Project/company location code | ShortText(40) | REQUIRED | Location registry | NONE | immutable after use | unique in project/company scope | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| display_name | Site/store/drop-point name | ShortText(160) | REQUIRED | NONE | NONE | editable for future use | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| address | Delivery address | structured address + LongText(500) | OPTIONAL | NONE | project address where configured | editable for future records | country/required components as configured | TENANT_INTERNAL | COPY_SNAPSHOT |
| contact_name | Delivery contact | ShortText(160) | OPTIONAL | Project/User/Contact | blank | editable | sanitized | PERSONAL_CONTACT | COPY_SNAPSHOT |
| contact_phone | Delivery contact phone | ShortText(40) | OPTIONAL | NONE | blank | editable | phone-format tolerant validation | PERSONAL_CONTACT | COPY_SNAPSHOT |
| active_state | Selectability | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | product enum | ACTIVE | maintenance | no new selection when inactive | TENANT_INTERNAL | COPY_SNAPSHOT |

Tax, currency, locale, compliance-document-type and standard-commercial-term blocks follow the same registry pattern: immutable key/version, explicit active state, effective dates where time-sensitive, exact rate/rounding semantics for tax/currency, and transaction snapshots on issue/approval.

## F. FileAsset

Closed enum `verification_state = {UPLOADED, SCANNING, VERIFIED, QUARANTINED, REJECTED}`.
Closed enum `source_channel = {USER_UPLOAD, SUPPLIER_LINK, EMAIL, API, IMPORT, SYSTEM_RENDER}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| file_name | Original/display filename | ShortText(255) | REQUIRED | NONE | upload name | immutable for content identity; display alias may live on attachment | safe filename; no path traversal | TENANT_INTERNAL | COPY_SNAPSHOT |
| media_type | MIME/media type | ShortText(120) | REQUIRED | detected/upload metadata | detected | immutable after verification | allow-list/inspection policy | SYSTEM_CONTROL | COPY_SNAPSHOT |
| byte_size | Content size | Int64 >=0 | REQUIRED | SYSTEM | calculated | immutable | max-upload policy | SYSTEM_CONTROL | COPY_SNAPSHOT |
| content_hash | Cryptographic content digest | SHA-256 | REQUIRED before verified use | SYSTEM | calculated | immutable | digest matches stored bytes | SYSTEM_CONTROL | COPY_SNAPSHOT |
| storage_locator | Provider-neutral object-store locator | opaque string | REQUIRED | Storage adapter | generated | system-managed | never exposed as business identity | SYSTEM_CONTROL | DO_NOT_COPY |
| verification_state | Scan/verification status | ClosedEnum | REQUIRED | verification service | UPLOADED | system transitions only | verified/quarantine rules | SYSTEM_CONTROL | COPY_SNAPSHOT when referenced |
| uploader_source | Actor/external source | Reference<Principal/Supplier> or text source | REQUIRED | identity/channel | current source | immutable | actor/source valid | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_channel | How content entered CPOS | ClosedEnum | REQUIRED | product enum | USER_UPLOAD | immutable | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |

## G. BusinessAttachment / SourceDocumentVersion / IssuedArtifactVersion

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| business_object_ref | Object the file belongs to | typed Reference<BusinessObject> | REQUIRED | owning domain | NONE | immutable per binding; replace by new binding/version | object exists and actor can access | inherits object | COPY_REFERENCE |
| file_asset_id | Exact content | Reference<FileAsset> | REQUIRED | FileAsset | NONE | immutable | VERIFIED unless policy allows pending draft only | inherits file/object | COPY_REFERENCE |
| document_type | Purpose/type | governed Reference<DocumentType> | REQUIRED | document-type registry | GENERAL_ATTACHMENT | editable in draft attachment metadata | active type | TENANT_INTERNAL | COPY_SNAPSHOT |
| display_title | User-facing title | ShortText(240) | OPTIONAL | NONE | file name | editable until bound into immutable issue/source version | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| source_revision | Supplier/external revision identifier | ShortText(80) | OPTIONAL | source document | blank | immutable for SourceDocumentVersion | normalized but preserve original | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_reference | External document/quotation/license reference | ShortText(160) | OPTIONAL | source | blank | immutable per source version | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_location | Page/sheet/cell/region locator for citations | structured locator | OPTIONAL | SourceDocumentVersion | blank | immutable with citation | must resolve within file when technically available | SYSTEM_CONTROL | COPY_REFERENCE |
| issued_document_class | Issued business class | ClosedEnum{MR, SOW, RFQ, ADDENDUM, COMPARISON, RECOMMENDATION, LPO, PO, SUBCONTRACT, GRN, OTHER_CONTROLLED} | REQUIRED for issued artifact | product registry | NONE | immutable | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| issued_business_number | Exact displayed number | BusinessNumber | REQUIRED for numbered issued artifacts | NumberingPolicy | NONE | immutable | matches source object/policy | SYSTEM_CONTROL | COPY_SNAPSHOT |
| issued_revision | Issued revision/version | Integer >=0 / ShortText(20) | REQUIRED | issuing domain | 0 | immutable | monotonic per business document | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_object_versions | Exact transaction versions rendered | VersionReference[] | REQUIRED for issued artifact | owning domains | NONE | immutable | all resolve and authorized | SYSTEM_CONTROL | COPY_REFERENCE |
| template_version_id | Exact template used | VersionReference<TemplateVersion> | REQUIRED for rendered artifact | Template registry | NONE | immutable | active/approved at issue | SYSTEM_CONTROL | COPY_REFERENCE |
| annexure_membership | Ordered exact attachment versions | Reference<BusinessAttachment/SourceDocumentVersion>[] | OPTIONAL | file/provenance | empty | immutable | every member accessible | inherits artifact | COPY_REFERENCE |
| render_input_hash | Digest of canonical render inputs | SHA-256 | REQUIRED | rendering service | generated | immutable | reproduces artifact | SYSTEM_CONTROL | COPY_SNAPSHOT |
| artifact_content_hash | Digest of final issued bytes | SHA-256 | REQUIRED | rendering/storage | generated | immutable | matches stored bytes | SYSTEM_CONTROL | COPY_SNAPSHOT |
| issued_by | Issuer | Reference<Principal> | REQUIRED | Identity | current issuer | immutable | issue authority | SYSTEM_CONTROL | COPY_SNAPSHOT |
| issued_at | Issue occurrence | Instant | REQUIRED | SYSTEM | issue time | immutable | trusted time | SYSTEM_CONTROL | COPY_SNAPSHOT |
| supersedes_artifact_id | Prior issued artifact | Reference<IssuedArtifactVersion> | OPTIONAL | provenance | NONE | immutable | same business identity or explicit reissue relation | SYSTEM_CONTROL | COPY_REFERENCE |

## H. ProcurementBudgetBasis

Closed enum `budget_authority_mode = {OWN, MIRROR, REFERENCE}`.
Closed enum `reconciliation_state = {NOT_REQUIRED, PENDING, MATCHED, STALE, REJECTED, ERROR}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| budget_basis_number | Human reference/version number | BusinessNumber/ShortText(80) | REQUIRED | budget source/policy | generated/imported | immutable per basis version | unique in project/source scope | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| authority_mode | Ownership of budget truth | ClosedEnum | REQUIRED | integration config | REFERENCE | immutable per basis version | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_system | Origin | ShortText(120) | CONDITIONAL for MIRROR/REFERENCE | integration/source | NONE | immutable per version | known connector/file/manual source | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_reference | External file/record identity | ShortText(200) | CONDITIONAL for MIRROR/REFERENCE | source | NONE | immutable per version | nonblank when required | SYSTEM_CONTROL | COPY_REFERENCE |
| cost_wbs_ref_id | Cost attribution basis | Reference<CostRef> | REQUIRED unless package-level aggregate explicitly allowed | Cost/WBS registry | NONE | immutable once a decision binds this basis | active/valid at effective date | RESTRICTED_FINANCIAL | COPY_REFERENCE + snapshot label |
| package_trade_ref | Optional package/trade mapping | Reference<ProcurementPackage/CategoryTrade> | OPTIONAL | package/taxonomy | NONE | immutable per version after use | compatible project | RESTRICTED_FINANCIAL | COPY_REFERENCE |
| budget_amount | Approved/reference allowance | Money(currency) | REQUIRED | source/owned budget | NONE | immutable per version after use | >=0 | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| currency | Budget currency | ISO-4217 | REQUIRED | Currency registry | project/legal-entity currency | immutable per version | active currency | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| quantity_basis | Optional quantity | Quantity(uom) | OPTIONAL | UOM registry | NONE | immutable per version | >=0 | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| rate_basis | Optional unit rate | Money(currency)/quantity | OPTIONAL | derived/source | NONE | immutable per version | quantity/UOM compatible | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| basis_classification | Budget meaning | ClosedEnum{ESTIMATE_ALLOWANCE, CONTROL_BUDGET, REVISED_BUDGET, CONTINGENCY, PROVISIONAL_SUM, OTHER} | REQUIRED | product enum | CONTROL_BUDGET | immutable per version | legal enum | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| version_label | Human/version label | ShortText(40) | REQUIRED | source/version | generated | immutable | unique within budget basis identity | SYSTEM_CONTROL | COPY_SNAPSHOT |
| effective_date | When basis applies | LocalDate | REQUIRED | source/version | import/create date | immutable | valid date | SYSTEM_CONTROL | COPY_SNAPSHOT |
| reconciliation_state | External sync state | ClosedEnum | REQUIRED | integration | NOT_REQUIRED for OWN | system transitions | authority-mode compatible | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_provenance | Exact source doc/record | VersionReference<SourceDocumentVersion/external record> | CONDITIONAL for sourced data | provenance | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |

## I. ProcurementRoutePolicyVersion

Closed enum `procurement_route = {COMPETITIVE_RFQ, DIRECT_ORDER, SOLE_SOURCE, FRAMEWORK_CALLOFF, EXTERNAL_ERP_STOCK, NO_PURCHASE_RETURN}`.
Closed enum `exception_class = {NONE, EMERGENCY, TECHNICAL_PROPRIETARY, CLIENT_NOMINATED, CONTINUITY_STANDARDIZATION, LOW_VALUE, OTHER_GOVERNED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| policy_code | Policy identity | ShortText(40) | REQUIRED | Policy registry | `PROCUREMENT_ROUTE_DEFAULT` starter | immutable after effective use | unique/versioned | SYSTEM_CONTROL | COPY_REFERENCE |
| version | Policy version | Integer/string version | REQUIRED | Policy registry | generated | immutable | monotonic | SYSTEM_CONTROL | COPY_SNAPSHOT |
| legal_entity_scope | Where policy applies | Reference<LegalEntity>[] / ALL | REQUIRED | Legal Entity | ALL tenant entities in starter profile | immutable per version | all in tenant | SYSTEM_CONTROL | COPY_SNAPSHOT |
| category_trade_scope | Optional classification filter | Reference<CategoryTrade>[] | OPTIONAL | taxonomy | empty=all | immutable per version | active refs | SYSTEM_CONTROL | COPY_SNAPSHOT |
| procurement_type_scope | Applicable item/scope types | set<item_type> | REQUIRED | product enum | all | immutable per version | legal enum values | SYSTEM_CONTROL | COPY_SNAPSHOT |
| min_value | Lower inclusive estimated value | Money(base currency) | OPTIONAL | Currency policy | NONE | immutable per version | >=0 | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| max_value | Upper exclusive estimated value | Money(base currency) | OPTIONAL | Currency policy | NONE | immutable per version | >min_value | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| allowed_routes | Permitted route set | set<procurement_route> | REQUIRED | product enum | {COMPETITIVE_RFQ}; starter also permits DIRECT_ORDER only via exception | immutable per version | nonempty | SYSTEM_CONTROL | COPY_SNAPSHOT |
| minimum_invited_suppliers | Competitive invitation floor | Integer 1..99 | CONDITIONAL for COMPETITIVE_RFQ | tenant policy | 3 starter | immutable per version | >=1 | TENANT_INTERNAL | COPY_SNAPSHOT |
| minimum_comparable_responses | Desired decision evidence floor | Integer 1..99 | CONDITIONAL for COMPETITIVE_RFQ | tenant policy | 3 starter; fewer allowed only through exception/approval | immutable per version | <= invited target where finite | TENANT_INTERNAL | COPY_SNAPSHOT |
| required_justification | Whether explicit reason is required | Boolean | REQUIRED | policy | true for noncompetitive/exception | immutable per version | coherent with route | SYSTEM_CONTROL | COPY_SNAPSHOT |
| required_gate_class | DOA/approval gate | Reference<ApprovalGateClass> | CONDITIONAL | shared approval primitives | standard procurement approval | immutable per version | gate exists/effective | SYSTEM_CONTROL | COPY_REFERENCE |
| exception_classes | Allowed override reasons | set<exception_class> | OPTIONAL | product enum | governed starter set | immutable per version | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| effective_from / effective_to | Policy period | LocalDate pair | REQUIRED/OPTIONAL | policy | activation date/open-ended | controlled version activation | no overlap at same precedence scope unless deterministic precedence | SYSTEM_CONTROL | COPY_SNAPSHOT |

### ProcurementRouteDecision

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| demand_basis | MR/package/scope being routed | VersionReference<Demand> | REQUIRED | MR/Package | NONE | immutable | approved/authorized basis | SYSTEM_CONTROL | COPY_REFERENCE |
| estimated_value_basis | Value used to evaluate policy | Money + VersionReference<Budget/Estimate> | REQUIRED when value-based rule applies | ProcurementBudgetBasis/estimate | NONE | immutable per decision | exact source/version | RESTRICTED_FINANCIAL | COPY_SNAPSHOT + reference |
| policy_version_id | Exact rule applied | VersionReference<ProcurementRoutePolicyVersion> | REQUIRED | Policy registry | current effective | immutable | effective for context/time | SYSTEM_CONTROL | COPY_REFERENCE |
| eligible_routes | Routes policy evaluation permits | set<procurement_route> | REQUIRED | derived | DERIVE | immutable evaluation result | deterministic from policy/context | SYSTEM_CONTROL | COPY_SNAPSHOT |
| chosen_route | Buyer-selected governed route | procurement_route | REQUIRED before sourcing/order transition | eligible_routes | competitive RFQ if no selection | editable until downstream route created; change thereafter requires reroute/cancel path | must be eligible or approved exception | TENANT_INTERNAL | COPY_SNAPSHOT |
| exception_class | Override reason class | exception_class | CONDITIONAL if chosen route not normally permitted/competition shortfall | policy | NONE | editable until approval | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| exception_reason | Human justification | LongText(4000) | CONDITIONAL with exception | NONE | blank | editable until approval | nonblank/min 10 chars when required | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| approval_case_id | Exception/route approval | Reference<ApprovalCase> | CONDITIONAL by policy | approval domain | NONE | system-linked | approved before protected transition | SYSTEM_CONTROL | COPY_REFERENCE |
| decided_by / decided_at | Decision occurrence | Principal + Instant | REQUIRED on finalize | Identity/SYSTEM | current actor/time | immutable | actor authority | SYSTEM_CONTROL | COPY_SNAPSHOT |

## J. Product-owned TemplateClass / TemplateVersion

Closed enum `template_class = {MR, SOW, RFQ, RFQ_ADDENDUM, COMPARISON, RECOMMENDATION, LPO, PO, SUBCONTRACT, GRN}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| template_class | Business document type | ClosedEnum | REQUIRED | product registry | NONE | immutable | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| template_version | Product/tenant template version | Integer/string version | REQUIRED | Template registry | starter active version | immutable once issued artifact uses it | unique per class/config scope | SYSTEM_CONTROL | COPY_REFERENCE |
| locale | Render locale/language | BCP-47 locale | REQUIRED | Locale registry | `en-AE` starter | immutable per template version | supported locale | TENANT_INTERNAL | COPY_SNAPSHOT |
| company_identity_block | Legal entity/logo/address presentation config | structured bounded config | REQUIRED | Legal Entity + tenant profile | tenant/legal-entity defaults | editable by new template/config version | no executable expressions | TENANT_INTERNAL | COPY_SNAPSHOT |
| standard_term_blocks | Approved reusable clauses | VersionReference<CommercialTermBlock>[] | OPTIONAL | terms registry | class starter set | editable by new version | active/approved terms only | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| signature_roles | Required display/signature blocks | list<RoleKey> | OPTIONAL | role/signatory policy | class default | editable by version | bounded known roles | TENANT_INTERNAL | COPY_SNAPSHOT |
| optional_sections | Bounded product-defined section toggles | set<SectionKey> | OPTIONAL | template product registry | class defaults | editable by version | only registered sections | SYSTEM_CONTROL | COPY_SNAPSHOT |
| layout_profile | Product-owned layout key | Reference<LayoutProfile> | REQUIRED | product template library | default class profile | immutable per version | registered profile | SYSTEM_CONTROL | COPY_REFERENCE |
| active_state | May be selected for new renders | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | template registry | ACTIVE | authorized activation | at least one active version per required class | SYSTEM_CONTROL | COPY_SNAPSHOT |

Tenant configuration cannot add formulas, arbitrary queries, code, or unrestricted conditional expressions.
