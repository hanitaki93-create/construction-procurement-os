# CPOS Architecture V2 — R03 Demand / Planning Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

## A. Material / Purchase Requisition Header

Closed enum `mr_priority = {LOW, NORMAL, HIGH, URGENT}`.
Closed enum `mr_status = {DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, PARTIALLY_APPROVED, REJECTED, SOURCING, ORDERING, PARTIALLY_FULFILLED, FULFILLED, CLOSED, CANCELLED, SUPERSEDED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| mr_number | Human requisition number | BusinessNumber | REQUIRED | NumberingPolicy MR | generated on first saved draft | immutable once assigned | class policy | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| requester_id | Person/team requesting purchase | Reference<Principal> | REQUIRED | Identity | current user | editable in DRAFT by authorized preparer | active internal user | TENANT_INTERNAL | COPY_SNAPSHOT |
| requester_team | Requesting department/team | Reference<OrgUnit> / ShortText(120) | OPTIONAL | Org/tenant config | current team | editable through DRAFT | valid if referenced | TENANT_INTERNAL | COPY_SNAPSHOT |
| request_date | Business request date | LocalDate | REQUIRED | NONE | current local project date | editable in DRAFT; locked on SUBMITTED | reasonable configured range | TENANT_INTERNAL | COPY_SNAPSHOT |
| required_on_site_date | Primary need-by date | LocalDate | REQUIRED for procurement demand unless explicit UNKNOWN_DATE exception | Project schedule/context | NONE | editable through UNDER_REVIEW; post-approval change uses controlled revision | >= request_date unless exception reason | TENANT_INTERNAL | COPY_SNAPSHOT to route/package/RFQ/order plan |
| priority | Business urgency | ClosedEnum | REQUIRED | product enum | NORMAL | editable through UNDER_REVIEW; approved change audited | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| delivery_location_id | Intended delivery/site point | Reference<DeliveryLocation> | CONDITIONAL for physical goods/equipment | Delivery Location registry | project default if configured | editable through approval; later change becomes downstream-specific fact | active project-compatible location | TENANT_INTERNAL | COPY_SNAPSHOT |
| subject | Short purpose/title | ShortText(240) | REQUIRED | NONE | first-line/category suggestion | editable through UNDER_REVIEW | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| instructions | Request-level instructions/notes | LongText(4000) | OPTIONAL | NONE | blank | editable through UNDER_REVIEW; approved snapshot retained | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT to downstream only when marked procurement-facing |
| source_import_reference | External/request source | ShortText(200) / VersionReference | OPTIONAL | import/integration | NONE | immutable after create | unique if connector requires | SYSTEM_CONTROL | COPY_REFERENCE |
| approval_case_id | Approval/review case | Reference<ApprovalCase> | CONDITIONAL by policy | approval primitives | NONE | system-linked | approved where route requires | SYSTEM_CONTROL | COPY_REFERENCE |

## B. MR Line

Closed enum `mr_line_type = {MATERIAL, SERVICE, SUBCONTRACT_SCOPE, EQUIPMENT, OTHER}`.
Closed enum `line_entry_mode = {MASTER_BACKED, FREE_FORM}`.
Closed enum `equivalent_rule = {EXACT_ONLY, APPROVED_EQUIVALENT_ALLOWED, ALTERNATE_BY_APPROVAL}`.
Closed enum `mr_line_state = {DRAFT, SUBMITTED, APPROVED, PARTIALLY_APPROVED, REJECTED, SOURCING, ORDERING, PARTIALLY_FULFILLED, FULFILLED, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| line_no | Stable display line sequence | Integer >=1 | REQUIRED | owning MR | next 10-step line no or sequential UI number | editable/reorder in DRAFT; locked at SUBMITTED | unique per MR | TENANT_INTERNAL | COPY_SNAPSHOT |
| entry_mode | Master vs one-off | ClosedEnum | REQUIRED | product enum | MASTER_BACKED when item selected else FREE_FORM | editable in DRAFT only | legal enum; matching item requirement | TENANT_INTERNAL | COPY_SNAPSHOT |
| item_ref_id | Selected reusable item/service/scope | Reference<ItemMaster> | CONDITIONAL when MASTER_BACKED | Item Master | NONE | editable in DRAFT; locked on submit | active item; type compatible | TENANT_INTERNAL | COPY_REFERENCE + snapshot fields |
| line_type | Procurement nature | ClosedEnum | REQUIRED | product/item enum | item type if master-backed | editable in DRAFT only | legal enum; compatible with item | TENANT_INTERNAL | COPY_SNAPSHOT |
| description | Requested item/scope description | ShortText(500) | REQUIRED | item snapshot or free-form | item short description | editable through UNDER_REVIEW; approval freezes approved wording | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| specification | Detailed requirement | LongText(12000) | OPTIONAL/CONDITIONAL by category/policy | item/source docs | item detailed spec | editable through UNDER_REVIEW; approval freezes version | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| requested_quantity | Quantity requested | Quantity(uom) | REQUIRED for quantified lines; may be 1 LS for lump-sum scope | UOM registry | NONE | editable through UNDER_REVIEW; change after approval is amendment/revision | >0 | TENANT_INTERNAL | COPY_SNAPSHOT; conservation authority source |
| uom_id | Commercial UOM | Reference<UOM> | REQUIRED with quantity | UOM registry | item default | editable through UNDER_REVIEW | active, line-compatible | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| required_date_override | Line-specific need-by | LocalDate | OPTIONAL | NONE | header required_on_site_date | editable through approval | valid date | TENANT_INTERNAL | COPY_SNAPSHOT |
| manufacturer | Requested manufacturer | ShortText(160) | OPTIONAL | item master | item snapshot | editable through approval | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| brand | Requested brand | ShortText(160) | OPTIONAL | item master | item snapshot | editable through approval | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| model | Requested model | ShortText(160) | OPTIONAL | item master | item snapshot | editable through approval | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| equivalent_rule | Whether alternates are permitted | ClosedEnum | REQUIRED | item/substitution policy | item policy or ALTERNATE_BY_APPROVAL | editable through approval | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT to RFQ/technical evaluation |
| preferred_supplier_id | Requester-known/preferred supplier | Reference<Supplier> | OPTIONAL | Supplier Master | NONE | editable through approval; does not create eligibility/award | supplier exists | COMMERCIAL_CONFIDENTIAL | DERIVE shortlist suggestion only |
| technical_notes | Internal/request technical note | LongText(4000) | OPTIONAL | NONE | blank | editable through approval | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT when procurement-facing |
| approved_quantity | Quantity approved for procurement | Quantity(uom) | CONDITIONAL on approval outcome | approval action | requested_quantity on full approval | set by approval action; immutable except approval revision | 0..requested_quantity unless formal demand amendment | SYSTEM_CONTROL | authority for conservation/downstream |
| line_state | Current line lifecycle | ClosedEnum | REQUIRED | domain lifecycle | DRAFT | transition only | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT |

`planned_or_sourced_quantity`, `ordered_quantity`, `received_quantity` and `remaining_available_quantity` are derived positions, never manually authoritative fields.

## C. MR Distribution

Closed enum `distribution_basis = {QUANTITY, PERCENTAGE, AMOUNT}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| mr_line_id | Line being attributed | Reference<MRLine> | REQUIRED | MR | NONE | immutable | same MR | SYSTEM_CONTROL | COPY_REFERENCE |
| cost_ref_id | Cost/WBS destination | Reference<CostRef> | REQUIRED | Cost/WBS registry | NONE | editable through approval; later correction via governed redistribution | active/valid project ref | RESTRICTED_FINANCIAL | COPY_REFERENCE + snapshot |
| basis | How split is stated | ClosedEnum | REQUIRED | product enum | QUANTITY | editable through approval | legal enum | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| quantity | Quantity attributed | Quantity(line uom) | CONDITIONAL if QUANTITY | UOM registry | NONE | editable through approval | >=0; sum equals approved/requested basis as appropriate | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| percentage | Percent attributed | Percentage | CONDITIONAL if PERCENTAGE | NONE | NONE | editable through approval | 0..100; total =100 within rounding tolerance | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| amount | Monetary attribution | Money(currency) | CONDITIONAL if AMOUNT and a value basis exists | Budget/currency policy | NONE | editable through approval | >=0; explicit basis/currency | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |

## D. Procurement Package

Closed enum `package_type = {MATERIAL_PACKAGE, SUBCONTRACT_PACKAGE, SERVICE_PACKAGE, EQUIPMENT_PACKAGE, MIXED_GOVERNED}`.
Closed enum `package_status = {PLANNED, PREPARING, READY_FOR_SOURCING, SOURCING, AWARD_PENDING, AWARDED, ORDERED, COMPLETE, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| package_code | Human package number/code | BusinessNumber | REQUIRED | package numbering policy | generated | immutable after assignment | unique in policy scope | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| title | Package title | ShortText(240) | REQUIRED | NONE | trade/category name suggestion | editable until first RFQ issue; later change versioned | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| package_type | Procurement package nature | ClosedEnum | REQUIRED | product enum | SUBCONTRACT_PACKAGE when scope-based | editable in PREPARING only | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| trade_category_id | Primary trade/category | Reference<CategoryTrade> | REQUIRED for trade packages; optional for mixed | taxonomy | NONE | editable until sourcing starts | active | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| buyer_owner_id | Responsible procurement owner | Reference<Principal> | REQUIRED | Identity | creator/current buyer | editable by reassignment with audit | active buyer role | TENANT_INTERNAL | COPY_SNAPSHOT |
| required_on_site_date | Programme need date | LocalDate | REQUIRED for schedule-worthy package | project schedule/context | NONE | editable with schedule history | valid project date | TENANT_INTERNAL | COPY_SNAPSHOT to schedule |
| target_award_date | Planning target | LocalDate | OPTIONAL | schedule | derived suggestion | editable/baseline controlled | <= required date where relevant | TENANT_INTERNAL | COPY_SNAPSHOT |
| budget_basis_id | Cost-plan basis | VersionReference<ProcurementBudgetBasis> | CONDITIONAL when budget context exists | Budget capability | NONE | change before decision allowed; decision snapshots exact basis | project/package compatible | RESTRICTED_FINANCIAL | COPY_REFERENCE |
| route_decision_id | Governed procurement strategy | VersionReference<ProcurementRouteDecision> | REQUIRED before sourcing/direct award | Policy route capability | derived after evaluation | reroute requires explicit new decision | demand/package compatible | SYSTEM_CONTROL | COPY_REFERENCE |
| scope_summary | Human high-level package scope | LongText(6000) | REQUIRED | NONE | NONE | editable until frozen for RFQ; later change through scope/RFQ revision | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| estimating_basis_id | Estimating handover source | VersionReference<EstimatingPackageBasis> | OPTIONAL | Estimating Handover | NONE | immutable once linked; may be superseded by live planning but source retained | same project/trade | SYSTEM_CONTROL | COPY_REFERENCE |
| project_scope_instance_id | Reusable Scope Library project instance | VersionReference<ProjectScopeInstance> | OPTIONAL/CONDITIONAL for scope-led packages | Scope Library | NONE | exact version changes only through scope revision | same package/project | SYSTEM_CONTROL | COPY_REFERENCE |
| status | Package lifecycle | ClosedEnum | REQUIRED | product lifecycle | PLANNED | transition only | legal transition/derived events | TENANT_INTERNAL | COPY_SNAPSHOT |

## E. Package Scope Membership / Demand Partition

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| package_id | Planning group | Reference<ProcurementPackage> | REQUIRED | Package | NONE | immutable per membership version | same project | SYSTEM_CONTROL | COPY_REFERENCE |
| demand_source_ref | Exact approved MR/scope authority | VersionReference<DemandAuthority> | REQUIRED | MR/approved scope | NONE | immutable | approved/authorized source | SYSTEM_CONTROL | COPY_REFERENCE |
| source_line_or_partition | Exact source partition identity | typed reference | REQUIRED | conservation control | NONE | immutable | resolvable, no fabricated authority | SYSTEM_CONTROL | COPY_REFERENCE |
| planned_quantity | Quantity planned in package | Quantity(source uom) | CONDITIONAL for quantified demand | UOM registry | remaining approved amount selected by user | editable while package planning, through governed reallocation | >0; cannot create extra authority | TENANT_INTERNAL | COPY_SNAPSHOT to RFQ selected scope |
| partition_basis | Scope split basis for non-quantity scope | structured bounded partition | OPTIONAL/CONDITIONAL | conservation control | NONE | governed while planning | non-overlap/authority rules | SYSTEM_CONTROL | COPY_REFERENCE |
| membership_state | Planning membership state | ClosedEnum{PLANNED, ACTIVE, REMOVED, REALLOCATED} | REQUIRED | product enum | ACTIVE | transition only | history preserved | SYSTEM_CONTROL | COPY_SNAPSHOT |

Package membership is planning, not commitment consumption.

## F. ScopeTemplate / ScopeTemplateVersion

Closed enum `scope_template_state = {DRAFT, REVIEW, APPROVED, SUPERSEDED, RETIRED}`.
Closed enum `scope_section_type = {WORK_REQUIREMENT, INCLUSION, EXCLUSION_BOUNDARY, INTERFACE, SUBMITTAL, TESTING_COMMISSIONING, QUALITY_HSE, MATERIAL_SPEC, OPTIONAL_PROVISIONAL, RETURNABLE, PRICE_BREAKDOWN, RISK_CHECK, REFERENCE_DOCUMENT}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| template_code | Company scope template code | ShortText(40) | REQUIRED | Scope Library | generated/manual governed | immutable after first approved version | unique | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| title | Template title | ShortText(240) | REQUIRED | NONE | NONE | versioned | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| trade_category_id | Applicable trade/category | Reference<CategoryTrade> | REQUIRED | taxonomy | NONE | versioned | active | TENANT_INTERNAL | COPY_REFERENCE |
| package_type | Applicable package type | package_type | REQUIRED | product enum | SUBCONTRACT_PACKAGE | versioned | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| applicability | Company/jurisdiction applicability | structured refs | REQUIRED | LegalEntity/Region | tenant-wide starter | versioned | valid scopes | TENANT_INTERNAL | COPY_SNAPSHOT |
| steward_id | Owner of standard | Reference<Principal> | REQUIRED | Identity | creator | editable by reassignment | active authorized steward | TENANT_INTERNAL | DO_NOT_COPY |
| version_no | Approved/draft version | Integer >=1 | REQUIRED | Scope Library | generated | immutable per version | monotonic | SYSTEM_CONTROL | COPY_SNAPSHOT |
| sections | Ordered scope content | list<section_type, key, text, refs> | REQUIRED | product section registry | empty draft | editable in DRAFT/REVIEW; locked on APPROVED | stable keys/order; no executable language | TENANT_INTERNAL | COPY_SNAPSHOT into ProjectScopeInstance |
| state | Template lifecycle | ClosedEnum | REQUIRED | product enum | DRAFT | transition only | approval required for APPROVED | TENANT_INTERNAL | COPY_SNAPSHOT |

## G. ProjectScopeInstance

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| package_id | Owning project package | Reference<ProcurementPackage> | REQUIRED | Package | NONE | immutable | same project | SYSTEM_CONTROL | COPY_REFERENCE |
| source_template_version | Exact company template | VersionReference<ScopeTemplateVersion> | REQUIRED | Scope Library | selected current approved | immutable | approved version | SYSTEM_CONTROL | COPY_REFERENCE |
| additions | Project-added keyed clauses/sections | structured list | OPTIONAL | NONE | empty | editable until FROZEN_FOR_TENDER; later via revision/addendum | explicit unique keys/reason | TENANT_INTERNAL | COPY_SNAPSHOT |
| removals | Template section keys intentionally removed | list<section_key, reason> | OPTIONAL | source template | empty | same as additions | key exists; reason required | TENANT_INTERNAL | COPY_SNAPSHOT |
| amendments | Keyed changed text/requirement | structured list | OPTIONAL | source template | empty | same as additions | original key exists; reason | TENANT_INTERNAL | COPY_SNAPSHOT |
| state | Project-scope lifecycle | ClosedEnum{DRAFT, REVIEW, FROZEN_FOR_TENDER, REVISED_BY_ADDENDUM, SUPERSEDED} | REQUIRED | product enum | DRAFT | transition only | freeze requires resolved review | TENANT_INTERNAL | COPY_SNAPSHOT |
| frozen_at / frozen_by | Tender-freeze occurrence | Instant + Principal | CONDITIONAL at frozen+ | SYSTEM/Identity | NONE | immutable | authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |

## H. LessonProposal

Closed enum `lesson_state = {PROPOSED, TRIAGED, ACCEPTED, REJECTED, INCORPORATED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| source_context | Project/tender/change/closeout evidence | Reference[] | REQUIRED | domain/provenance | NONE | immutable | exact source exists | SYSTEM_CONTROL | COPY_REFERENCE |
| proposed_trade_template | Target trade/template | Reference<CategoryTrade/ScopeTemplate> | REQUIRED | Scope Library | NONE | editable until TRIAGED | valid | TENANT_INTERNAL | DO_NOT_COPY |
| lesson_type | Nature of learning | ClosedEnum{SCOPE_GAP, AMBIGUITY, SUCCESSFUL_CLAUSE, COMMERCIAL_RISK, INTERFACE, RETURNABLE, OTHER} | REQUIRED | product enum | SCOPE_GAP | editable until TRIAGED | legal enum | TENANT_INTERNAL | DO_NOT_COPY |
| proposal_text | Suggested change/lesson | LongText(6000) | REQUIRED | NONE | NONE | editable until TRIAGED; accepted decision locks | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT into later template revision only after acceptance |
| state | Review state | ClosedEnum | REQUIRED | product enum | PROPOSED | transition only | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT |
| review_reason | Acceptance/rejection rationale | LongText(3000) | CONDITIONAL on ACCEPTED/REJECTED | NONE | blank | immutable after decision | nonblank on decision | TENANT_INTERNAL | COPY_SNAPSHOT |

## I. EstimatingHandover / EstimatingPackageBasis

Closed enum `handover_status = {DRAFT, IMPORTED, UNDER_REVIEW, ACCEPTED_FOR_PLANNING, PARTIALLY_ACCEPTED, ARCHIVED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| source_estimate_reference | Tender/estimate job reference | ShortText(160) | REQUIRED | source system/pack | NONE | immutable after import | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| source_system_files | Exact source pack | VersionReference<SourceDocumentVersion>[] | REQUIRED | provenance | NONE | immutable source | resolvable | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| handover_owner_id | Person accountable for handover | Reference<Principal> | REQUIRED | Identity | importer | editable by assignment until accepted | active | TENANT_INTERNAL | COPY_SNAPSHOT |
| handover_date | Handover business date | LocalDate | REQUIRED | NONE | import date | editable in draft; locked on acceptance | valid | TENANT_INTERNAL | COPY_SNAPSHOT |
| status | Handover lifecycle | ClosedEnum | REQUIRED | product enum | DRAFT | transition only | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT |
| trade_package_mapping | Trade/category/package mapping | Reference<CategoryTrade/Package> | REQUIRED per package basis | taxonomy/package | NONE | editable during review | compatible project | TENANT_INTERNAL | COPY_REFERENCE |
| estimate_allowance | Pre-award allowance | Money(currency) | REQUIRED when known; otherwise explicit UNKNOWN | source | NONE | immutable source fact after accepted mapping | >=0 | RESTRICTED_FINANCIAL | COPY_SNAPSHOT into proposed budget basis, never silently authoritative |
| quantity_sov_boq_basis | Estimating quantity/SOV/BOQ reference | structured source fact | OPTIONAL | source docs | NONE | immutable source | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| assumed_route | Estimator-assumed buying route | procurement_route | OPTIONAL | source | NONE | immutable historical source | legal enum if mapped | COMMERCIAL_CONFIDENTIAL | DERIVE suggestion only |
| required_on_site_context | Programme assumption | LocalDate/text source fact | OPTIONAL | source/project schedule | NONE | immutable source | source-cited | TENANT_INTERNAL | DERIVE schedule suggestion |
| estimator_notes | Assumptions/notes | LongText(6000) | OPTIONAL | source | blank | immutable source once accepted | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT as planning context |
| risks_opportunities | Structured list | list<type,text,severity,source> | OPTIONAL | source | empty | immutable source; live risk may copy as separate fact | source cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT by explicit acceptance |
| considered_vendors | Supplier refs/names considered | list<Reference<Supplier> or raw source name> | OPTIONAL | Supplier/source | empty | immutable source | preserve raw if unresolved | COMMERCIAL_CONFIDENTIAL | DERIVE shortlist suggestion only |
| tender_stage_quotes | Exact quote refs/value/date | VersionReference<SourceDocumentVersion>[] + structured source facts | OPTIONAL | source/provenance | empty | immutable source | exact source | COMMERCIAL_CONFIDENTIAL | historical benchmark only |
| exclusions_qualifications | Estimating exclusions/qualifications | LongText/structured list | OPTIONAL | source | empty | immutable source | source-cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT as risk context |
| extraction_confidence | AI/import mapping confidence | Decimal 0..1 | CONDITIONAL for AI extraction | AI proposal | NONE | immutable proposal | range 0..1 | SYSTEM_CONTROL | DO_NOT_COPY after human confirmation except provenance |

## J. Procurement Schedule Core

Closed enum `milestone_type = {REQUIRED_ON_SITE, RFQ_ISSUE, TENDER_RETURN, COMPARISON_RECOMMENDATION, APPROVAL, AWARD_ORDER_CONTRACT, PRODUCTION_LEAD_START, DELIVERY_START_ON_SITE}`.
Closed enum `date_kind = {REQUIRED, BASELINE, FORECAST, SUPPLIER_CONFIRMED, ACTUAL}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| schedule_subject_ref | Package or schedule-worthy MR/direct route | Reference<Package/MRRoute> | REQUIRED | owning domain | NONE | immutable | same project | SYSTEM_CONTROL | COPY_REFERENCE |
| milestone_type | Procurement milestone | ClosedEnum | REQUIRED | product enum | NONE | immutable per row | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| required_date | Absolute need constraint | LocalDate | CONDITIONAL for REQUIRED_ON_SITE/need milestone | MR/package/project schedule | NONE | controlled planning revision | valid date | TENANT_INTERNAL | COPY_SNAPSHOT |
| baseline_date | Approved planning commitment | LocalDate | REQUIRED for tracked core milestones after baseline action | schedule planning | suggested date | change only through REBASELINE action with reason | sequence logic warning, not silent auto-correction | TENANT_INTERNAL | COPY_SNAPSHOT |
| forecast_date | Current buyer forecast | LocalDate | OPTIONAL | schedule | baseline_date | editable with audit reason after baseline | valid date | TENANT_INTERNAL | COPY_SNAPSHOT |
| supplier_confirmed_date | Supplier-confirmed date | LocalDate | OPTIONAL | quotation/clarification/order | NONE | updated only from explicit supplier-confirmed source | exact source ref required | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| actual_date | Actual occurrence | LocalDate/Instant-derived date | CONDITIONAL when canonical event occurs | domain event | derived | never manually editable when canonical event exists | one deterministic event mapping/version | SYSTEM_CONTROL | COPY_SNAPSHOT |
| source_reference | Source for confirmed/actual value | VersionReference | CONDITIONAL for SUPPLIER_CONFIRMED/ACTUAL | domain/provenance | NONE | immutable per observation | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
| baseline_change_reason | Why baseline changed | LongText(2000) | CONDITIONAL on rebaseline | NONE | blank | immutable per rebaseline event | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| risk_state | Deterministic schedule risk | ClosedEnum{ON_TRACK, AT_RISK, LATE, UNKNOWN} | REQUIRED for tracked subject | ScheduleRuleVersion | derived | system-calculated | explainable rule/basis | TENANT_INTERNAL | COPY_SNAPSHOT |

## K. Demand / Scope Conservation Authority

Closed enum `authority_unit_mode = {QUANTITY_UOM, SCOPE_PARTITION, MONETARY_LIMIT}`.
Closed enum `consumption_state = {RESERVED_PENDING_EFFECTIVE, EFFECTIVE, RELEASED, REVERSED, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| demand_authority_ref | Exact approved MR/package/amendment authority | VersionReference<DemandAuthority> | REQUIRED | MR/approved demand | NONE | immutable | approved/effective basis | SYSTEM_CONTROL | COPY_REFERENCE |
| unit_mode | How authority is conserved | ClosedEnum | REQUIRED | demand type | QUANTITY_UOM for quantified MR | immutable | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| authorized_quantity | Approved quantitative ceiling | Quantity(uom) | CONDITIONAL for QUANTITY_UOM | MR approval | NONE | immutable per authority version | >=0 | SYSTEM_CONTROL | COPY_SNAPSHOT |
| authorized_partition | Authorized non-quantified scope partition | structured immutable partition | CONDITIONAL for SCOPE_PARTITION | package/scope approval | NONE | immutable per authority version | deterministic non-duplication key | SYSTEM_CONTROL | COPY_REFERENCE |
| authorized_value_limit | Monetary ceiling when policy explicitly uses one | Money | OPTIONAL/CONDITIONAL | budget/amendment | NONE | immutable per authority version | >=0; explicit currency | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| commitment_ref | Award/order/calloff consuming authority | Reference<CommitmentBasis> | REQUIRED for consumption record | R07/R08/R12 | NONE | immutable | valid downstream object | SYSTEM_CONTROL | COPY_REFERENCE |
| consumed_quantity | Quantity consumed | Quantity(uom) | CONDITIONAL | UOM/conversion policy | NONE | set at effective commitment transition; correction by release/reversal event | >0; cumulative effective <= authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |
| consumed_partition | Scope partition consumed | structured partition | CONDITIONAL | authority | NONE | same | subset/non-overlap rules | SYSTEM_CONTROL | COPY_REFERENCE |
| consumption_state | Current consumption effect | ClosedEnum | REQUIRED | domain lifecycle | EFFECTIVE at protected commitment transition | transition only | legal transition | SYSTEM_CONTROL | COPY_SNAPSHOT |
| operation_id | Idempotent protected write identity | UUID / operation key | REQUIRED | B02 operation substrate | generated | immutable | unique/idempotent | SYSTEM_CONTROL | DO_NOT_COPY |

### Concurrency rule

The protected award/order/call-off transition must lock or otherwise serialize the demand-authority guard row/partition before validating remaining authority and writing consumption. At minimum the V2 implementation profile is CC-2 guard-row `FOR UPDATE`; a stricter serializable mechanism is allowed if hostile testing proves equivalent. Competing transactions cannot both consume the same residual authority.
