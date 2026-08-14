# CPOS Architecture V2 — R04 Sourcing Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

## A. RFQ / Tender Header

Closed enum `rfq_event_type = {RFQ_MATERIAL, RFQ_SERVICE, TENDER_SUBCONTRACT, TENDER_EQUIPMENT, OTHER_GOVERNED}`.
Closed enum `evaluation_mode = {COMBINED, SEPARATE_VISIBLE, TWO_STAGE_RESTRICTED_COMMERCIAL}`.
Closed enum `bid_visibility_policy = {BUYER_VISIBLE_ON_RECEIPT, SEALED_UNTIL_DUE, TECHNICAL_FIRST_COMMERCIAL_RESTRICTED}`.
Closed enum `rfq_status = {DRAFT, REVIEW, READY, ISSUED, ADDENDUM, REISSUED, CLOSED, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| rfq_number | Human enquiry/tender number | BusinessNumber | REQUIRED | NumberingPolicy RFQ | generated on DRAFT create | immutable | class policy | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| title | Tender/enquiry subject | ShortText(240) | REQUIRED | package/MR context | package/MR title suggestion | editable until issue; later addendum/new event semantics | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| event_type | RFQ/tender type | ClosedEnum | REQUIRED | product enum | inferred from source route/package | editable in DRAFT only | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| buyer_owner_id | Responsible buyer | Reference<Principal> | REQUIRED | Identity | creator/current buyer | reassignment audited before close | authorized buyer | TENANT_INTERNAL | COPY_SNAPSHOT |
| route_decision_id | Exact policy route basis | VersionReference<ProcurementRouteDecision> | REQUIRED | Policy route | NONE | immutable after issue; reroute creates new event/basis | route allows RFQ/tender | SYSTEM_CONTROL | COPY_REFERENCE |
| source_demand_refs | Approved MR/package partitions tendered | VersionReference<DemandAuthority>[] | REQUIRED | MR/Package/Conservation | NONE | editable in DRAFT under conservation; immutable issue snapshot | authorized; no fabricated scope | SYSTEM_CONTROL | COPY_REFERENCE |
| project_scope_version | Exact frozen project scope | VersionReference<ProjectScopeInstance> | OPTIONAL/CONDITIONAL for package tenders | Scope Library | NONE | selected in DRAFT; issue binds exact version | FROZEN_FOR_TENDER or issue-valid version | SYSTEM_CONTROL | COPY_REFERENCE |
| planned_issue_date | Schedule target | LocalDate | OPTIONAL | Procurement Schedule | schedule baseline | editable through planning/rebaseline | valid | TENANT_INTERNAL | COPY_SNAPSHOT |
| response_due_at | Supplier submission deadline | Instant + display timezone | REQUIRED before issue | NONE | tenant default duration suggestion | editable until issue; later due-date change requires addendum/reissue | > issue time; timezone explicit | TENANT_INTERNAL | COPY_SNAPSHOT |
| issue_at | Actual issue occurrence | Instant | CONDITIONAL at ISSUED+ | SYSTEM | issue event | immutable | canonical issue event | SYSTEM_CONTROL | COPY_SNAPSHOT |
| commercial_instructions | Buyer commercial instructions | LongText(8000) | OPTIONAL | standard term blocks | starter wording | editable until issue; later addendum | sanitized; no executable content | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| submission_instructions | How supplier must respond | LongText(6000) | REQUIRED | product/task policy | starter secure-link/manual-email wording | editable until issue; later addendum | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| required_delivery_date | Requested delivery/start date | LocalDate | OPTIONAL/CONDITIONAL | MR/package schedule | source need date | editable until issue; addendum thereafter | valid | TENANT_INTERNAL | COPY_SNAPSHOT |
| currency_policy | Allowed/required quotation currency | structured {base_currency, allowed_currencies, conversion_date_rule} | REQUIRED | Currency policy | project/legal-entity currency, allow same only in starter | editable until issue | active currencies; conversion rule explicit if multi | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| payment_term_requirement | Required/requested term | Reference<PaymentTerm> / bounded text | OPTIONAL | Payment Terms | tenant RFQ default | editable until issue | active term | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| minimum_validity_days | Minimum quote validity | Integer 0..3650 | OPTIONAL | tenant tender defaults | 30 | editable until issue | >=0 | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| tax_delivery_requirement | Tax/Incoterm/delivery basis | structured bounded refs/text | OPTIONAL | Tax/Delivery term registry | tenant/project defaults | editable until issue | registered terms where configured | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| access_profile | Supplier access/confidentiality policy | Reference<AccessProfile> | REQUIRED | external participation policy | standard invitee-only | editable until issue | no weaker than document sensitivity policy | SYSTEM_CONTROL | COPY_SNAPSHOT |
| evaluation_mode | Technical/commercial evaluation mode | ClosedEnum | REQUIRED | Tender policy | COMBINED | editable until issue; cannot silently loosen after responses | legal enum; compatible visibility policy | SYSTEM_CONTROL | COPY_SNAPSHOT |
| bid_visibility_policy | When authorized users may view commercial bid | ClosedEnum | REQUIRED | Tender policy | BUYER_VISIBLE_ON_RECEIPT | editable until issue only | compatible with evaluation mode | SYSTEM_CONTROL | COPY_SNAPSHOT |
| status | Event lifecycle | ClosedEnum | REQUIRED | domain lifecycle | DRAFT | transition only | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT |

## B. RFQ Line / Bid Form

Closed enum `pricing_field = {UNIT_RATE, LINE_TOTAL, LUMP_SUM, PERCENTAGE, ALTERNATE_RATE, OPTIONAL_PRICE, DAYWORK_RATE, OTHER_GOVERNED}`.
Closed enum `technical_response_type = {ACKNOWLEDGMENT, TEXT, YES_NO, DOCUMENT, BRAND_MODEL, COMPLIANCE_STATUS, DATE, NUMBER, OTHER_GOVERNED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| rfq_line_no | Stable tender line number | Integer >=1 | REQUIRED | RFQ | source order | editable/reorder in DRAFT; immutable issue snapshot | unique per RFQ version | TENANT_INTERNAL | COPY_SNAPSHOT |
| source_demand_ref | Approved demand/package partition source | VersionReference<DemandAuthority> | REQUIRED for sourced scope; supplier-request-only informational lines may be explicit exception | MR/Package | NONE | immutable once issue snapshot created | authorized source | SYSTEM_CONTROL | COPY_REFERENCE |
| item_scope_ref | Optional reusable item/scope | Reference<Item/ProjectScopeSection> | OPTIONAL | master/scope library | source | locked at issue | active/valid version | TENANT_INTERNAL | COPY_REFERENCE |
| description | Supplier-facing requested description | ShortText(800) | REQUIRED | MR/package snapshot | source wording | editable until issue; addendum thereafter | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| specification | Detailed supplier-facing specification | LongText(16000) | OPTIONAL/CONDITIONAL | MR/scope/docs | source | editable until issue | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| quantity | Requested quantity | Quantity(uom) | REQUIRED for quantified lines | UOM | approved demand quantity selected | editable within authority before issue | >0; <= selected authority where applicable | TENANT_INTERNAL | COPY_SNAPSHOT |
| uom_id | Requested UOM | Reference<UOM> | REQUIRED with quantity | UOM registry | source | editable before issue | active/compatible | TENANT_INTERNAL | COPY_SNAPSHOT |
| equivalent_rule | Alternate/equivalent rule | ClosedEnum{EXACT_ONLY, APPROVED_EQUIVALENT_ALLOWED, ALTERNATE_BY_APPROVAL} | REQUIRED | MR/item | source | editable before issue | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| requested_brand_model | Exact/requested manufacturer/brand/model | structured text | OPTIONAL | MR/item | source | editable before issue | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| required_date | Line-specific need date | LocalDate | OPTIONAL | schedule/MR | source/header | editable before issue | valid | TENANT_INTERNAL | COPY_SNAPSHOT |
| pricing_fields | Fields supplier must price | set<pricing_field> | REQUIRED | BidFormSection | {UNIT_RATE, LINE_TOTAL} for quantified material; {LUMP_SUM} for LS scope | editable until issue | product-approved set; at least one commercial price basis if priced line | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| technical_returnables | Required supplier response fields/docs | list<technical_response_type + requirement> | OPTIONAL | Technical Evaluation/RFQ template | category/template defaults | editable until issue | product-approved response types | TENANT_INTERNAL | COPY_SNAPSHOT |
| line_attachments | Exact drawings/specifications for line | AttachmentSet | OPTIONAL | provenance | source refs | editable until issue; addendum after | exact versions | TENANT_INTERNAL | COPY_REFERENCE |

## C. Bidder / Invitation Membership

Closed enum `invitation_state = {PLANNED, READY, ISSUED, DELIVERED, DELIVERY_FAILED, ACKNOWLEDGED, DECLINED_NO_BID, RESPONDED, WITHDRAWN, REVOKED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| rfq_id | Tender event | Reference<RFQ> | REQUIRED | RFQ | NONE | immutable | same tenant/project | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_id | Invited counterparty | Reference<Supplier> | REQUIRED | Supplier Master | NONE | editable membership before issue; after issue removal is governed revoke/withdraw | unique supplier per event unless explicit multiple-contact model | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| contact_id | Recipient contact | Reference<SupplierContact> | REQUIRED for external issue unless manual exception | Supplier contacts | primary commercial contact | editable before issue; post-issue change uses transfer/reissue communication | active contact | PERSONAL_CONTACT | COPY_SNAPSHOT |
| eligibility_evaluation_id | Context eligibility result | VersionReference<EligibilityEvaluation> | REQUIRED when policy evaluates eligibility | Supplier lifecycle | current evaluation | re-evaluate before issue/award; issued snapshot retained | event/trade compatible | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_intelligence_snapshot | Performance/exposure shown at selection | VersionReference<SupplierExposureSnapshot> | OPTIONAL/CONDITIONAL when data available | Supplier Intelligence | current | immutable selection snapshot; latest may also display separately | same supplier/as-of clear | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| estimating_participation_ref | Pre-award supplier quote/context | Reference<EstimatingVendorParticipation> | OPTIONAL | Estimating Handover | NONE | immutable | same supplier/project | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| state | Invitation lifecycle | ClosedEnum | REQUIRED | product lifecycle | PLANNED | transition only | legal transition | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| issued_artifact_id | Exact RFQ version sent | Reference<IssuedArtifactVersion> | CONDITIONAL on ISSUED+ | provenance | NONE | immutable per issue occurrence | correct RFQ version | SYSTEM_CONTROL | COPY_REFERENCE |
| issued_at | Invitation issue occurrence | Instant | CONDITIONAL on issued | SYSTEM | issue time | immutable | trusted | SYSTEM_CONTROL | COPY_SNAPSHOT |
| delivery_state | Provider/task delivery result | ClosedEnum{PENDING, DELIVERED, FAILED, UNKNOWN} | CONDITIONAL when electronic send used | effects/reconciliation | PENDING | system transitions | provider occurrence | SYSTEM_CONTROL | COPY_SNAPSHOT |

Competition-policy counts are derived from current membership/response states under the exact ProcurementRouteDecision and do not become editable counters.

## D. RFQ Addendum

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| addendum_number | Parent-derived supplier-visible number | BusinessNumber | REQUIRED on issue | NumberingPolicy ADDENDUM | assigned at issue | immutable | parent sequence policy | TENANT_INTERNAL | COPY_SNAPSHOT |
| parent_rfq_id | RFQ being amended | Reference<RFQ> | REQUIRED | RFQ | NONE | immutable | issued RFQ | SYSTEM_CONTROL | COPY_REFERENCE |
| reason | Why addendum is issued | LongText(3000) | REQUIRED | NONE | NONE | editable until issue | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| changed_scope_fields | Structured explicit changes | typed change set | REQUIRED | RFQ/source scope | NONE | editable until issue; immutable after | cannot silently mutate parent issue; source/version links | SYSTEM_CONTROL | COPY_SNAPSHOT |
| replacement_attachments | Exact added/revised/removed attachment operations | structured attachment diff | OPTIONAL | provenance | empty | editable until issue | exact version membership | SYSTEM_CONTROL | COPY_REFERENCE |
| revised_due_at | New response deadline | Instant | OPTIONAL | NONE | parent due | editable until issue | > addendum issue time | TENANT_INTERNAL | COPY_SNAPSHOT |
| acknowledgment_required | Whether supplier must acknowledge | Boolean | REQUIRED | event policy | true for material addenda | editable until issue | policy-consistent | SYSTEM_CONTROL | COPY_SNAPSHOT |
| issued_artifact_id | Exact issued addendum | Reference<IssuedArtifactVersion> | CONDITIONAL on issue | provenance | NONE | immutable | exact content | SYSTEM_CONTROL | COPY_REFERENCE |

## E. Technical Bid Evaluation Scheme / Criterion

Closed enum `technical_criterion_type = {SCOPE_COMPLIANCE, SPECIFICATION, BRAND_MODEL, METHOD_STATEMENT, PROGRAMME, RESOURCES, CERTIFICATION_EXPERIENCE, SUBMITTAL_DOCUMENT, ALTERNATE_VE, OTHER_GOVERNED}`.
Closed enum `technical_result = {COMPLIANT, PARTIALLY_COMPLIANT, DEVIATION, CLARIFICATION_REQUIRED, NON_COMPLIANT, NOT_APPLICABLE}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| evaluation_scheme_version | Exact technical evaluation structure | VersionReference<TechnicalEvaluationScheme> | CONDITIONAL when formal evaluation enabled | product/tenant scheme | tender template | immutable after RFQ issue | approved/effective scheme | SYSTEM_CONTROL | COPY_REFERENCE |
| criterion_key | Stable criterion identifier | ShortText(80) | REQUIRED | scheme | NONE | immutable after issue | unique within scheme | SYSTEM_CONTROL | COPY_SNAPSHOT |
| criterion_type | Evaluation category | ClosedEnum | REQUIRED | product enum | SCOPE_COMPLIANCE | immutable after issue | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| criterion_text | Supplier/evaluator requirement | LongText(4000) | REQUIRED | RFQ/scope | NONE | locked at issue; addendum to change | nonblank | TENANT_INTERNAL | COPY_SNAPSHOT |
| mandatory | Whether non-compliance can gate qualification | Boolean | REQUIRED | scheme/policy | true only where explicitly set | locked at issue | no implied gate if false | SYSTEM_CONTROL | COPY_SNAPSHOT |
| scoring_scheme | Optional score/range/weight | VersionReference<ScoringScheme> | OPTIONAL | governed scoring registry | NONE | locked at issue | no arbitrary formulas; deterministic bounded scheme | SYSTEM_CONTROL | COPY_REFERENCE |

## F. TechnicalEvaluation / EvaluationEntry

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| rfq_supplier_ref | Exact bidder/event | Reference<Invitation/SupplierResponse> | REQUIRED | RFQ/response | NONE | immutable | valid response context | SYSTEM_CONTROL | COPY_REFERENCE |
| scheme_version_id | Exact technical scheme | VersionReference<TechnicalEvaluationScheme> | REQUIRED | RFQ | event scheme | immutable | matches issued tender | SYSTEM_CONTROL | COPY_REFERENCE |
| criterion_key | Criterion evaluated | ShortText(80) | REQUIRED | scheme | NONE | immutable | exists in scheme | SYSTEM_CONTROL | COPY_REFERENCE |
| source_response_refs | Supplier evidence relied upon | VersionReference<SourceDocumentVersion/StructuredResponse>[] | REQUIRED when evaluating supplied evidence | supplier response | NONE | immutable per evaluation version | exact source | SYSTEM_CONTROL | COPY_REFERENCE |
| evaluator_ids | Responsible evaluator(s) | Reference<Principal>[] | REQUIRED | Identity/technical roles | assigned evaluators | locked in frozen snapshot; reassignment before freeze audited | authorized | TENANT_INTERNAL | COPY_SNAPSHOT |
| result | Technical evaluation result | ClosedEnum | REQUIRED before technical stage closure | product enum | CLARIFICATION_REQUIRED if unresolved; otherwise evaluator sets | editable before frozen evaluation; correction/new version after | legal enum; mandatory criterion rules | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to comparison/recommendation |
| comments_conditions | Evaluator explanation/condition | LongText(4000) | CONDITIONAL for PARTIAL/DEVIATION/CLARIFICATION/NON_COMPLIANT | NONE | blank | locked with evaluation snapshot | nonblank when conditional state | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| score | Optional governed score | Decimal | CONDITIONAL when scheme defines scoring | ScoringSchemeVersion | NONE | locked with snapshot | within scheme/rule | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| clarification_case_id | Required clarification | Reference<ClarificationCase> | CONDITIONAL for CLARIFICATION_REQUIRED or linked resolution | Correspondence | NONE | system-linked | same bidder/criterion | SYSTEM_CONTROL | COPY_REFERENCE |
| approval_dependency_ids | Later external technical approvals still required | Reference<TechnicalApprovalDependency>[] | OPTIONAL | technical dependency | empty | link may evolve; decision snapshot binds exact list/status | same item/alternate | SYSTEM_CONTROL | COPY_REFERENCE |
| evaluation_version | Frozen evaluation identity | Integer/version | REQUIRED on freeze | evaluation domain | generated | immutable | monotonic | SYSTEM_CONTROL | COPY_SNAPSHOT |
| frozen_by / frozen_at | Evaluation freeze occurrence | Principal + Instant | CONDITIONAL on frozen | Identity/SYSTEM | NONE | immutable | authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |

## G. Commercial Opening Event for Two-Stage Tender

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| rfq_id | Two-stage tender | Reference<RFQ> | REQUIRED | RFQ | NONE | immutable | evaluation_mode two-stage | SYSTEM_CONTROL | COPY_REFERENCE |
| eligible_supplier_refs | Bidders permitted for commercial consideration | Reference<Invitation>[] | REQUIRED | TechnicalEvaluation | derived | immutable occurrence | must satisfy configured technical gate or explicit approved exception | SYSTEM_CONTROL | COPY_REFERENCE |
| gate_basis | Technical snapshot/policy relied upon | VersionReference<TechnicalEvaluation/Policy> | REQUIRED | technical evaluation | NONE | immutable | exact frozen basis | SYSTEM_CONTROL | COPY_REFERENCE |
| opened_by | Authorized actor | Reference<Principal> | REQUIRED | Identity/DOA | current actor | immutable | opening authority | SYSTEM_CONTROL | COPY_SNAPSHOT |
| opened_at | Commercial opening occurrence | Instant | REQUIRED | SYSTEM | current time | immutable | trusted | SYSTEM_CONTROL | COPY_SNAPSHOT |
| exception_approval_id | Override if opening includes otherwise ineligible bidder | Reference<ApprovalCase> | CONDITIONAL | Approval | NONE | immutable | approved | SYSTEM_CONTROL | COPY_REFERENCE |

Restricted commercial values remain inaccessible to unauthorized evaluators before this occurrence; the raw submission is preserved even for technically unsuccessful bidders.

## H. TechnicalApprovalDependency

Closed enum `technical_dependency_type = {MATERIAL_SUBMITTAL, SAMPLE, MOCK_UP, SHOP_DRAWING, TECHNICAL_DATA, ALTERNATE_APPROVAL, CONSULTANT_CLIENT_APPROVAL, OTHER_GOVERNED}`.
Closed enum `technical_dependency_status = {NOT_REQUIRED, REQUIRED_NOT_SUBMITTED, SUBMITTED, UNDER_REVIEW, APPROVED, APPROVED_WITH_COMMENTS, REJECTED, REVISION_REQUIRED, SUPERSEDED}`.
Closed enum `authority_mode = {OWN_THIN, MIRROR, REFERENCE}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| context_refs | Package/RFQ/quote/award/order context | Reference[] | REQUIRED | owning domains | NONE | immutable per dependency | consistent project/item/supplier | SYSTEM_CONTROL | COPY_REFERENCE |
| dependency_type | Approval dependency nature | ClosedEnum | REQUIRED | product enum | TECHNICAL_DATA when configured by RFQ | editable only before submission/reference created | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| item_scope_vendor_ref | Thing/vendor/alternate requiring approval | structured refs | REQUIRED | item/scope/supplier/response | NONE | immutable after submission | resolvable | TENANT_INTERNAL | COPY_REFERENCE |
| authority_mode | Who owns workflow truth | ClosedEnum | REQUIRED | integration/CDE config | REFERENCE when external CDE configured; OWN_THIN otherwise | immutable per dependency version | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| external_workflow_ref | Aconex/Procore/CDE reference | ShortText(240)/URI-safe opaque ID | CONDITIONAL for MIRROR/REFERENCE | external CDE | NONE | reconciliation updates mapping only through controlled action | connector/reference format | SYSTEM_CONTROL | COPY_REFERENCE |
| current_revision_ref | Technical document/revision relied upon | VersionReference<SourceDocumentVersion/external doc> | CONDITIONAL after submission | provenance/CDE | NONE | advances by explicit new review revision | exact version | SYSTEM_CONTROL | COPY_REFERENCE |
| status | Normalized procurement gate state | ClosedEnum | REQUIRED | product enum | REQUIRED_NOT_SUBMITTED unless NOT_REQUIRED | OWN_THIN via transitions; MIRROR/REFERENCE via reconciliation/authorized manual reference | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT at decision/order |
| reviewer_authority | Reviewer/consultant/client context | ShortText/Reference<Principal/ExternalParty> | OPTIONAL/CONDITIONAL for OWN_THIN | identity/CDE | NONE | per review occurrence | valid authority when approval recorded | TENANT_INTERNAL | COPY_SNAPSHOT |
| conditions_comments | Approval conditions/comments | LongText(4000) | CONDITIONAL for APPROVED_WITH_COMMENTS/REJECTED/REVISION_REQUIRED | source/CDE | blank | immutable per status occurrence | nonblank in conditional states | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| required_before_action | Procurement gate | ClosedEnum{RECOMMENDATION, AWARD, ORDER_ISSUE, EXECUTION, DELIVERY, NONE} | REQUIRED | product/policy | ORDER_ISSUE for alternate approval unless policy states otherwise | change only by governed policy/exception | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| evidence_refs | Exact source files/status evidence | VersionReference[] | CONDITIONAL for approval/rejection states | provenance/CDE | empty | immutable per occurrence | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |

## I. ProcurementCorrespondence

Closed enum `correspondence_type = {INVITATION, REMINDER, BIDDER_QUESTION, CLARIFICATION_REQUEST, CLARIFICATION_RESPONSE, ADDENDUM_NOTICE, NEGOTIATION_CONFIRMATION, AWARD_NOTICE, ORDER_CONTRACT_COMMUNICATION, OTHER_PROCUREMENT}`.
Closed enum `channel = {SECURE_TASK, EMAIL, MANUAL_RECORDED, API_PROVIDER}`.
Closed enum `delivery_status = {NOT_APPLICABLE, PENDING, DELIVERED, FAILED, ACKNOWLEDGED, UNKNOWN}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| business_context_refs | RFQ/quote/comparison/award/order/etc. | Reference[] | REQUIRED | owning domains | current context | immutable after send/record | at least one context | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_party_ref | Supplier/external party | Reference<Supplier/Contact> | CONDITIONAL for supplier communication | Supplier Master | context supplier | immutable after occurrence | compatible context | PERSONAL_CONTACT | COPY_SNAPSHOT |
| correspondence_type | Procurement communication meaning | ClosedEnum | REQUIRED | product enum | OTHER_PROCUREMENT | immutable after occurrence | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| sender | Sender identity/address | Principal/Party snapshot | REQUIRED | Identity/external source | current actor/source | immutable occurrence | known source | PERSONAL_CONTACT | COPY_SNAPSHOT |
| recipients | Recipient identities/addresses | list<PartySnapshot> | REQUIRED for outbound/inbound target | Supplier/Identity | selected context | immutable occurrence | at least one where required | PERSONAL_CONTACT | COPY_SNAPSHOT |
| channel | Capture/send channel | ClosedEnum | REQUIRED | product enum | SECURE_TASK where supported | immutable occurrence | legal enum | SYSTEM_CONTROL | COPY_SNAPSHOT |
| subject | Message subject | ShortText(300) | OPTIONAL/CONDITIONAL for email-like channel | NONE | context-derived | editable before send; immutable after occurrence | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| body_or_external_ref | Preserved body or exact external message reference | LongText(12000) / Reference | REQUIRED | source/provider | NONE | immutable after occurrence | sanitized or resolvable ref | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT/REFERENCE |
| sent_received_at | Communication occurrence | Instant | REQUIRED | SYSTEM/provider | current/provider time | immutable | trusted/provider source | SYSTEM_CONTROL | COPY_SNAPSHOT |
| attachments | Exact files | AttachmentSet | OPTIONAL | provenance | empty | locked after occurrence | exact versions | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| thread_parent_id | Reply/thread relationship | Reference<ProcurementCorrespondence> | OPTIONAL | communication domain | NONE | immutable | same context where required | SYSTEM_CONTROL | COPY_REFERENCE |
| provider_message_ref | External provider identity | ShortText(240) | OPTIONAL | provider | NONE | system reconciled | unique per provider where promised | SYSTEM_CONTROL | COPY_REFERENCE |
| delivery_status | Send/delivery outcome | ClosedEnum | REQUIRED for outbound; NOT_APPLICABLE manual | effects/reconciliation | PENDING | system transitions | provider occurrence rules | SYSTEM_CONTROL | COPY_SNAPSHOT |
| confidentiality | Visibility classification | ClosedEnum{EVENT_TEAM, PROCUREMENT_TEAM, APPROVERS, LEGAL_ENTITY_RESTRICTED} | REQUIRED | access policy | EVENT_TEAM | editable before send; later controlled | actor access | SYSTEM_CONTROL | COPY_SNAPSHOT |

## J. ClarificationCase

Closed enum `clarification_state = {OPEN, AWAITING_SUPPLIER, RESPONSE_RECEIVED, RESOLVED_NO_BASIS_CHANGE, RESOLVED_BASIS_CONFIRMED, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| context_item_refs | RFQ/quote/comparison line(s) affected | Reference[] | REQUIRED | sourcing/submission/comparison | NONE | immutable after issue; add related refs through governed update | same tender/supplier where supplier-specific | SYSTEM_CONTROL | COPY_REFERENCE |
| question | Structured clarification request | LongText(5000) | REQUIRED | NONE | NONE | editable until issued; immutable afterward | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| supplier_party | Supplier/party expected to respond | Reference<Supplier/Contact> | CONDITIONAL for bidder clarification | Supplier | context supplier | locked after issue | compatible event | PERSONAL_CONTACT | COPY_SNAPSHOT |
| issue_at | Clarification issue time | Instant | REQUIRED once sent | correspondence event | current send time | immutable | trusted | SYSTEM_CONTROL | COPY_SNAPSHOT |
| due_at | Expected response time | Instant | OPTIONAL | NONE | event default | editable only before issue or explicit extension occurrence | > issue_at | TENANT_INTERNAL | COPY_SNAPSHOT |
| response_refs | Exact correspondence/quote revision responses | Reference<ProcurementCorrespondence/QuotationRevision>[] | OPTIONAL until response | correspondence/submission | empty | append only; history preserved | same supplier/context | SYSTEM_CONTROL | COPY_REFERENCE |
| affected_commercial_scope | Structured statement of affected price/scope/term fields | structured refs | REQUIRED when clarification can change basis | comparison schema | NONE | locked when resolved | explicit fields/lines | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| changes_contractable_basis | Whether supplier confirmation changes decision basis | Boolean | REQUIRED on resolution | domain decision | false | set on resolve | if true must reference supplier-confirmed source | SYSTEM_CONTROL | COPY_SNAPSHOT |
| state | Clarification lifecycle | ClosedEnum | REQUIRED | product enum | OPEN | transition only | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT |
| resolution_evidence | Exact source confirming resolution | Reference[] | CONDITIONAL on resolved | provenance/correspondence | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
