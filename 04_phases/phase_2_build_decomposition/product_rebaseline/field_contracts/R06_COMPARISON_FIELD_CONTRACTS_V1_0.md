# CPOS Architecture V2 — R06 Comparison / Leveling Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

## A. Comparison Case / Snapshot

Closed enum `comparison_status = {DRAFT, IN_LEVELING, CLARIFICATION, READY_TO_FREEZE, FROZEN, SUPERSEDED, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| comparison_number | Human comparison identity | BusinessNumber | REQUIRED at first frozen snapshot | NumberingPolicy COMPARISON | assigned on first freeze | immutable | class policy | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT + reference |
| rfq_id | Sourcing event being compared | Reference<RFQ> | REQUIRED | RFQ | NONE | immutable | issued/closed sourcing event | SYSTEM_CONTROL | COPY_REFERENCE |
| included_response_revisions | Exact supplier revisions selected | VersionReference<SupplierResponseRevision>[] | REQUIRED | R05 responses | latest valid selectable revisions suggested | editable in DRAFT/IN_LEVELING; freeze locks | one selected revision per supplier unless explicit scenario comparison; late/rejected policy enforced | SYSTEM_CONTROL | COPY_REFERENCE |
| comparison_currency | Currency used for normalized totals | ISO-4217 | REQUIRED | Currency/RFQ policy | RFQ base currency | editable before first normalization; change invalidates normalized layer and requires recompute | active currency | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| conversion_basis_version | Exact FX/UOM/rounding policy basis | VersionReference<ConversionPolicy> | REQUIRED when any normalization converts source values | reference/FX/UOM policy | current effective at comparison basis date | locked on snapshot | deterministic, effective | SYSTEM_CONTROL | COPY_REFERENCE |
| technical_evaluation_version | Exact technical evaluation relied upon | VersionReference<TechnicalEvaluation> | CONDITIONAL when tender uses formal technical evaluation | R04 technical evaluation | current frozen evaluation | freeze locks exact version | same RFQ | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_context_snapshots | Supplier qualification/performance/exposure context | VersionReference<SupplierExposureSnapshot/EligibilityEvaluation>[] | OPTIONAL/CONDITIONAL when available | R02 supplier intelligence | current as-of freeze | locked on snapshot | supplier/event match | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| status | Comparison lifecycle | ClosedEnum | REQUIRED | product lifecycle | DRAFT | transition only | legal transition | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| frozen_by / frozen_at | Snapshot occurrence | Principal + Instant | CONDITIONAL at FROZEN | Identity/SYSTEM | NONE | immutable | authorized buyer | SYSTEM_CONTROL | COPY_SNAPSHOT |
| supersedes_snapshot_id | Prior comparison snapshot | Reference<ComparisonSnapshot> | OPTIONAL | comparison domain | NONE | immutable | same RFQ/context | SYSTEM_CONTROL | COPY_REFERENCE |

## B. Comparison Row

Closed enum `coverage_status = {EXACT, PARTIAL, BUNDLED, ALTERNATE, SUPPLIER_ADDED, MISSING, NOT_APPLICABLE, UNRESOLVED}`.
Closed enum `row_origin = {RFQ_LINE, RFQ_SECTION, SUPPLIER_ADDED, BUYER_EVALUATION_ROW}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| row_key | Stable comparison row identity | UUID/ShortText stable key | REQUIRED | comparison schema | generated from RFQ line/section | immutable once used | unique per comparison | SYSTEM_CONTROL | COPY_REFERENCE |
| row_origin | Why row exists | ClosedEnum | REQUIRED | product enum | RFQ_LINE | immutable after create | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_rfq_ref | Requested line/section | Reference<RFQLine/BidSection> | CONDITIONAL for RFQ-origin rows | RFQ | NONE | immutable | same RFQ | SYSTEM_CONTROL | COPY_REFERENCE |
| display_description | Buyer-readable comparison description | LongText(1000) | REQUIRED | RFQ/source | source description | editable in draft comparison only; snapshot locks | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| target_quantity | Common comparison quantity | Quantity(uom) | OPTIONAL/CONDITIONAL for quantified rows | RFQ/UOM | RFQ qty | editable through leveling if adjustment explicitly recorded | >0; basis/source retained | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| target_uom_id | Common comparison UOM | Reference<UOM> | CONDITIONAL with quantity/rate normalization | UOM registry | RFQ UOM | editable with conversion basis before freeze | same dimension | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| evaluation_notes | Buyer row-level notes | LongText(4000) | OPTIONAL | NONE | blank | editable until freeze | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |

## C. Supplier Source Cell

This layer is immutable representation of selected supplier response truth.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| row_key | Comparison row | Reference<ComparisonRow> | REQUIRED | comparison | NONE | immutable | valid row | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_response_revision | Exact supplier source revision | VersionReference<SupplierResponseRevision> | REQUIRED | R05 | NONE | immutable | selected revision | SYSTEM_CONTROL | COPY_REFERENCE |
| source_line_refs | Exact supplier line(s) represented | Reference<SupplierQuotationLine>[] | OPTIONAL/CONDITIONAL | R05 | empty | immutable | same revision | SYSTEM_CONTROL | COPY_REFERENCE |
| coverage_status | Supplier coverage of row | ClosedEnum | REQUIRED | product enum | MISSING if no source mapping | source representation immutable; mapping correction creates new comparison working version | legal enum | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_description | Supplier wording | LongText(2000) | OPTIONAL | source line | copied exact | immutable | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_quantity | Supplier quantity | Quantity(source uom) | OPTIONAL | R05 source | NONE | immutable | exact source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_uom | Supplier UOM/raw text | Reference<UOM> + raw text | OPTIONAL | R05 source | NONE | immutable | exact source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_unit_rate | Supplier unit rate | Money(source currency)/uom | OPTIONAL | R05 source | NONE | immutable | exact decimal/source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_amount | Supplier line/allocated source amount | Money(source currency) | OPTIONAL | R05 source | NONE | immutable | source value; allocation from bundled source must be marked evaluation, not fake source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_brand_model | Supplier proposed product | structured text | OPTIONAL | R05 source | NONE | immutable | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_terms | Lead time/payment/validity/warranty/exclusion source facts | structured snapshot | OPTIONAL | R05 response | NONE | immutable | exact source | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_citations | Exact document locations | Reference<SourceDocumentVersion+location>[] | CONDITIONAL for document-captured facts | provenance | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |

## D. Normalized Representation Cell

Closed enum `normalization_kind = {NONE, UOM_CONVERSION, CURRENCY_CONVERSION, QUANTITY_NORMALIZATION, BUNDLE_MAPPING, TAX_BASIS, PAYMENT_TERM_PRESENTATION, OTHER_GOVERNED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| source_cell_id | Source truth being normalized | Reference<SupplierSourceCell> | REQUIRED | comparison source layer | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
| normalized_quantity | Comparable quantity | Quantity(target uom) | OPTIONAL/CONDITIONAL | row target + UOM policy | source converted | recalculated only through explicit normalization action; snapshot locks | conversion allowed | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| normalized_uom | Comparable UOM | Reference<UOM> | OPTIONAL/CONDITIONAL | UOM registry | row target UOM | same | same dimension | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| normalized_unit_rate | Comparable rate | Money(comparison currency)/target uom | OPTIONAL/CONDITIONAL | source + conversion policy | derived | same | exact decimal; all conversion factors cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| normalized_amount | Comparable amount | Money(comparison currency) | OPTIONAL/CONDITIONAL | source + conversion | derived | same | deterministic calculation | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| normalization_kinds | Transformations applied | set<ClosedEnum> | REQUIRED when normalized differs from source | product enum | {NONE} | derived; immutable snapshot | every change backed by basis | SYSTEM_CONTROL | COPY_SNAPSHOT |
| conversion_basis | Exact UOM/FX/tax/rounding facts | structured VersionReference[] + rates/dates | CONDITIONAL when conversion occurs | UOM/FX/tax policy | NONE | immutable per normalized version | resolvable/effective/exact decimal | SYSTEM_CONTROL | COPY_REFERENCE + snapshot rate |
| normalization_explanation | Human-readable reason | LongText(2000) | CONDITIONAL for nontrivial mapping/bundle/quantity normalization | NONE | generated + buyer editable before freeze | locked at snapshot | nonblank when required | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |

## E. Buyer Evaluation Adjustment

Closed enum `adjustment_type = {SCOPE_EQUALIZATION, COMMERCIAL_NORMALIZATION, QUANTITY_EVALUATION, EXCLUSION_ALLOWANCE, BUNDLE_ALLOCATION, OPTIONAL_ITEM_TREATMENT, INTERNAL_RISK_ALLOWANCE, OTHER_GOVERNED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| normalized_cell_id | Starting comparable representation | Reference<NormalizedCell> | REQUIRED | comparison normalized layer | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
| adjustment_type | Nature of internal evaluation change | ClosedEnum | REQUIRED | product enum | NONE | immutable per adjustment version | legal enum | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| adjustment_amount | Internal +/- evaluation amount | Money(comparison currency) | OPTIONAL/CONDITIONAL when monetary | NONE | NONE | editable before freeze; correction creates new adjustment | exact decimal; zero allowed only with nonmonetary explanation | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| adjusted_amount | Resulting evaluation amount | Money(comparison currency) | CONDITIONAL when monetary | derived | derived | system-calculated | normalized + adjustments | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| reason | Buyer rationale | LongText(3000) | REQUIRED | NONE | NONE | locked on snapshot | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| evidence_refs | Evidence/clarification supporting adjustment | Reference[] | OPTIONAL/CONDITIONAL by adjustment type | provenance/correspondence | empty | locked on snapshot | exact sources | SYSTEM_CONTROL | COPY_REFERENCE |
| adjusted_by / adjusted_at | Buyer action | Principal + Instant | REQUIRED | Identity/SYSTEM | current actor/time | immutable occurrence | authorized buyer | SYSTEM_CONTROL | COPY_SNAPSHOT |

Internal adjustment never becomes supplier price unless subsequently confirmed through R06/R07 supplier-confirmed basis.

## F. Supplier-Confirmed Contractable Basis

Closed enum `confirmation_kind = {QUOTATION_REVISION, CLARIFICATION_CONFIRMATION, NEGOTIATED_BAFO, WRITTEN_CONFIRMATION}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Confirming supplier | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable | matches source response | SYSTEM_CONTROL | COPY_REFERENCE |
| comparison_row_id | Row being confirmed | Reference<ComparisonRow> | REQUIRED | comparison | NONE | immutable | valid row | SYSTEM_CONTROL | COPY_REFERENCE |
| confirmation_kind | How final supplier basis was established | ClosedEnum | REQUIRED | product enum | QUOTATION_REVISION when revision exists | immutable | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_confirmation_refs | Exact quote/correspondence evidence | VersionReference<SupplierResponseRevision/ProcurementCorrespondence>[] | REQUIRED | R05/correspondence | NONE | immutable | same supplier/event | SYSTEM_CONTROL | COPY_REFERENCE |
| confirmed_description | Supplier-confirmed offered scope | LongText(2000) | REQUIRED | confirmation source | source wording | immutable per confirmed basis | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to recommendation/order |
| confirmed_quantity | Contractable quantity | Quantity(uom) | OPTIONAL/CONDITIONAL | confirmation source/UOM | normalized/confirmed | immutable per basis | >0 when present | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| confirmed_uom | Contractable UOM | Reference<UOM> | OPTIONAL/CONDITIONAL | UOM | confirmed | immutable | active/compatible | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| confirmed_unit_rate | Contractable unit rate | Money(currency)/uom | OPTIONAL/CONDITIONAL | confirmation source | NONE | immutable per basis | exact decimal | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| confirmed_amount | Contractable amount | Money(currency) | REQUIRED for awardable priced basis | confirmation source | NONE | immutable per basis | exact decimal; math/basis explicit | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to R07/R08 |
| confirmed_terms | Lead time/payment/validity/warranty/deviations | structured | REQUIRED as applicable | confirmation source | source facts | immutable per basis | exact source refs | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| technical_status_ref | Technical evaluation/dependency state relied upon | VersionReference<TechnicalEvaluation/TechnicalApprovalDependency>[] | OPTIONAL/CONDITIONAL | R04 | current relevant | immutable in snapshot | same offered item/alternate | SYSTEM_CONTROL | COPY_REFERENCE |

## G. AI Extraction / Mapping Proposal

Closed enum `ai_proposal_status = {PROPOSED, PARTIALLY_CONFIRMED, CONFIRMED, REJECTED, SUPERSEDED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| source_document_version | Exact quote/source file | Reference<SourceDocumentVersion> | REQUIRED | provenance | NONE | immutable | supplier response source | SYSTEM_CONTROL | COPY_REFERENCE |
| target_schema_version | Deterministic response/comparison schema | VersionReference<ResponseSchema/ComparisonSchema> | REQUIRED | RFQ/comparison | NONE | immutable | exact event version | SYSTEM_CONTROL | COPY_REFERENCE |
| proposed_field_path | Registered target field/row | semantic field key + row ref | REQUIRED | schema registry | NONE | immutable proposal | registered target | SYSTEM_CONTROL | COPY_REFERENCE |
| proposed_value | Typed extracted/mapped value | target field type | REQUIRED | target schema | NONE | immutable proposal; new proposal for rerun | type-valid | COMMERCIAL_CONFIDENTIAL | not business truth until confirmed |
| source_citation | Exact page/sheet/cell/region | Reference<SourceDocumentVersion+location> | REQUIRED | provenance | NONE | immutable | resolves | SYSTEM_CONTROL | COPY_REFERENCE |
| confidence | Model confidence | Decimal 0..1 | REQUIRED | AI output | NONE | immutable | range | SYSTEM_CONTROL | DO_NOT_COPY as commercial truth |
| ambiguity_flags | Known uncertainty | set<ClosedEnum{OCR_UNCERTAIN, MULTIPLE_MATCHES, UNIT_AMBIGUOUS, CURRENCY_AMBIGUOUS, BUNDLE_AMBIGUOUS, MISSING_CONTEXT, OTHER}> | OPTIONAL | product enum | empty | immutable proposal | legal flags | SYSTEM_CONTROL | COPY_SNAPSHOT for reviewer |
| status | Human-review state | ClosedEnum | REQUIRED | product enum | PROPOSED | transition only | confirmation requires human actor | SYSTEM_CONTROL | COPY_SNAPSHOT |
| confirmed_value_capture_id | Deterministic R05/R06 capture created after human acceptance | Reference<StructuredCapture/NormalizedCell> | CONDITIONAL when CONFIRMED | deterministic domain | NONE | system-linked immutable | exact accepted value | SYSTEM_CONTROL | COPY_REFERENCE |
| reviewed_by / reviewed_at | Human decision | Principal + Instant | CONDITIONAL after review | Identity/SYSTEM | NONE | immutable | authorized reviewer | SYSTEM_CONTROL | COPY_SNAPSHOT |

AI may never write supplier-source truth, technical final status, award or commitment directly.
