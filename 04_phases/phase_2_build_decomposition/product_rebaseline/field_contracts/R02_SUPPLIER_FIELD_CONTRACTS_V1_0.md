# CPOS Architecture V2 — R02 Supplier Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

## A. Supplier / Subcontractor Master

Closed enum `supplier_type = {MATERIAL_SUPPLIER, SUBCONTRACTOR, SERVICE_PROVIDER, MANUFACTURER, DISTRIBUTOR, CONSULTANT_OTHER}`.
Closed enum `supplier_state = {ACTIVE, INACTIVE, ON_HOLD}`.
Closed enum `contact_role = {PRIMARY, COMMERCIAL, TECHNICAL, ACCOUNTS, MANAGEMENT, SITE, OTHER}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_code | Durable human vendor code | BusinessNumber/ShortText(40) | REQUIRED | Supplier numbering policy | generated/imported | immutable after first transaction reference | unique per tenant | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| legal_name | Registered legal name | ShortText(240) | REQUIRED | supplier evidence | NONE | controlled edit; change after use creates audited identity-history entry | nonblank; duplicate detection normalized | TENANT_INTERNAL | COPY_SNAPSHOT at issue/award/order |
| trade_name | Trading/DBA name | ShortText(240) | OPTIONAL | supplier evidence | blank | controlled edit | normalized text | TENANT_INTERNAL | COPY_SNAPSHOT |
| supplier_type | Primary counterparty type | ClosedEnum | REQUIRED | product enum | MATERIAL_SUPPLIER | editable before first award/order; later change is audited | legal enum | TENANT_INTERNAL | COPY_SNAPSHOT |
| supplier_state | Master availability | ClosedEnum | REQUIRED | product enum | ACTIVE | authorized status action | ON_HOLD/INACTIVE blocks new use per policy, not history | TENANT_INTERNAL | COPY_SNAPSHOT |
| country_code | Registered country | ISO-3166-1 alpha-2 | REQUIRED | Country registry | AE in UAE starter only when user confirms | editable by controlled identity update | valid country | TENANT_INTERNAL | COPY_SNAPSHOT |
| emirate_region | Emirate/region/jurisdiction | ShortText(120)/governed region ref | CONDITIONAL by country | Region registry | NONE | controlled edit | country-compatible | TENANT_INTERNAL | COPY_SNAPSHOT |
| registered_address | Legal/registered address | structured address | REQUIRED when available for legal supplier record; may be UPDATE_REQUIRED during onboarding | NONE | NONE | controlled edit | country/address policy | TENANT_INTERNAL | COPY_SNAPSHOT at order/contract issue |
| operating_addresses | Other branch/office addresses | list<structured address> | OPTIONAL | NONE | empty | editable | valid country/address | TENANT_INTERNAL | COPY_SNAPSHOT only when selected |
| business_phone | Main phone | ShortText(40) | OPTIONAL | NONE | blank | editable | tolerant phone validation | PERSONAL_CONTACT | COPY_SNAPSHOT only to supplier document/header when configured |
| business_email | General commercial email | Email | OPTIONAL | NONE | blank | editable | normalized email | PERSONAL_CONTACT | COPY_SNAPSHOT when selected as recipient |
| website | Supplier website | URL | OPTIONAL | NONE | blank | editable | http/https URL | TENANT_INTERNAL | DO_NOT_COPY |
| trn_vat_number | Tax/VAT identifier | ShortText(80) | CONDITIONAL by jurisdiction/tax status | compliance evidence | NONE | controlled edit; history retained | jurisdiction-specific format where configured; otherwise nonblank normalized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to order/tax documents where required |
| default_currency | Preferred commercial currency | ISO-4217 | OPTIONAL | Currency registry | AED starter for UAE suppliers only when configured | editable | active currency | COMMERCIAL_CONFIDENTIAL | DERIVE suggestion; transaction confirms |
| default_payment_term_id | Preferred/default supplier term | Reference<PaymentTerm> | OPTIONAL | Payment Terms | NONE | editable | active term | COMMERCIAL_CONFIDENTIAL | DERIVE suggestion; RFQ/order confirms |
| internal_tags | Controlled internal classifications | Reference<Tag>[] | OPTIONAL | bounded tag registry | empty | editable | authorized tags only | TENANT_INTERNAL | DO_NOT_COPY to supplier-facing documents |

Bank/payment credentials are OUT of this field contract until an explicit secured capability authorizes them.

## B. Supplier Contact

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Owning supplier | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable | active/known supplier | SYSTEM_CONTROL | COPY_REFERENCE |
| display_name | Contact name | ShortText(160) | REQUIRED | NONE | NONE | editable | nonblank | PERSONAL_CONTACT | COPY_SNAPSHOT when selected for communication |
| job_title | Supplier-side title | ShortText(120) | OPTIONAL | NONE | blank | editable | sanitized | PERSONAL_CONTACT | COPY_SNAPSHOT when selected |
| roles | Contact purpose(s) | set<contact_role> | REQUIRED | product enum | {PRIMARY} for first contact | editable | at least one role | PERSONAL_CONTACT | COPY_SNAPSHOT |
| email | Contact email | Email | CONDITIONAL; required for email/secure-link invitation | NONE | NONE | editable; historical messages retain snapshot | normalized valid email | PERSONAL_CONTACT | COPY_SNAPSHOT recipient identity |
| phone | Contact phone | ShortText(40) | OPTIONAL | NONE | blank | editable | tolerant validation | PERSONAL_CONTACT | COPY_SNAPSHOT when used |
| preferred_channel | Preferred communication | ClosedEnum{EMAIL, PHONE, SECURE_LINK, OTHER} | REQUIRED | product enum | EMAIL | editable | channel prerequisites satisfied | PERSONAL_CONTACT | COPY_SNAPSHOT |
| is_primary | Primary supplier contact flag | Boolean | REQUIRED | NONE | false | editable | at most one default primary per configured context where rule applies | PERSONAL_CONTACT | DO_NOT_COPY |
| active_state | May be selected for new contact | ClosedEnum{ACTIVE, INACTIVE} | REQUIRED | product enum | ACTIVE | editable | inactive cannot be newly invited | PERSONAL_CONTACT | COPY_SNAPSHOT at invitation |

## C. Compliance Document

Closed enum `verification_status = {UNVERIFIED, PENDING_REVIEW, VERIFIED, REJECTED, EXPIRED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Supplier whose compliance is evidenced | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable | supplier exists | SYSTEM_CONTROL | COPY_REFERENCE |
| document_type_id | Licence/VAT/insurance/certification/etc. | Reference<ComplianceDocumentType> | REQUIRED | compliance type registry | NONE | immutable per version | active type | TENANT_INTERNAL | COPY_SNAPSHOT |
| document_number | External certificate/licence number | ShortText(120) | CONDITIONAL by document type | source evidence | NONE | immutable per source version; correction creates new version | normalized text | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT where needed |
| issuer | Issuing authority/insurer/certifier | ShortText(200) | OPTIONAL/CONDITIONAL by type | source evidence | NONE | immutable per version | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| issue_date | Source issue date | LocalDate | OPTIONAL/CONDITIONAL by type | source evidence | NONE | immutable per version | <= expiry_date if both | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| expiry_date | Source expiry date | LocalDate | CONDITIONAL for expiring types | source evidence | NONE | immutable per version | >= issue_date | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| source_document_id | Exact evidence file/version | VersionReference<SourceDocumentVersion> | REQUIRED when documentary evidence is expected | provenance | NONE | immutable | verified/accessible source | SYSTEM_CONTROL | COPY_REFERENCE |
| verification_status | Review result | ClosedEnum | REQUIRED | product enum | UNVERIFIED | only reviewer/domain transitions | EXPIRED may derive from date; VERIFIED requires reviewer/evidence | SYSTEM_CONTROL | COPY_SNAPSHOT at eligibility/award |
| verified_by / verified_at | Verification occurrence | Principal + Instant | CONDITIONAL when VERIFIED/REJECTED | Identity/SYSTEM | NONE | immutable per verification event | reviewer authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |

## D. RegistrationCase

Closed enum `registration_state = {NOT_REGISTERED, REGISTRATION_REQUESTED, IN_PROGRESS, SUBMITTED, APPROVED, REJECTED, UPDATE_REQUIRED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Supplier being registered | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable | supplier exists | SYSTEM_CONTROL | COPY_REFERENCE |
| registration_scheme_version | Product/tenant registration questionnaire version | VersionReference<RegistrationScheme> | REQUIRED | registration scheme registry | current effective | immutable after request issued | effective for context | SYSTEM_CONTROL | COPY_REFERENCE |
| requested_contact_id | Supplier contact receiving task | Reference<SupplierContact> | OPTIONAL/CONDITIONAL for external task | Supplier contacts | primary contact | editable before issue; later change uses resend/new access grant | active contact | PERSONAL_CONTACT | COPY_SNAPSHOT |
| state | Registration lifecycle | ClosedEnum | REQUIRED | product enum | NOT_REGISTERED | via transition actions only | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT |
| submitted_at | Supplier/internal submission time | Instant | CONDITIONAL at SUBMITTED+ | SYSTEM | NONE | immutable | trusted event | SYSTEM_CONTROL | COPY_SNAPSHOT |
| review_result | Approval/rejection result | ClosedEnum{APPROVED, REJECTED, UPDATE_REQUIRED} | CONDITIONAL on review | product enum | NONE | immutable per review occurrence | reason required for reject/update | TENANT_INTERNAL | COPY_SNAPSHOT |
| reviewer_id | Registration reviewer | Reference<Principal> | CONDITIONAL on review | Identity | current reviewer | immutable per action | reviewer authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |
| review_notes | Review reason/conditions | LongText(4000) | CONDITIONAL on reject/update; optional on approve | NONE | blank | editable until action finalized | sanitized | TENANT_INTERNAL | COPY_SNAPSHOT |
| submitted_evidence | Registration answers/documents | structured answers + AttachmentSet | CONDITIONAL by scheme | scheme + provenance | empty | supplier/internal edit until SUBMITTED; later amendment/update cycle | scheme validation | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE to qualification/eligibility as evidence |

## E. QualificationRecord

Closed enum `qualification_status = {NOT_STARTED, IN_PROGRESS, SUBMITTED, UNDER_REVIEW, QUALIFIED, CONDITIONALLY_QUALIFIED, NOT_QUALIFIED, EXPIRED, REQUALIFICATION_DUE, SUSPENDED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Evaluated supplier | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable | supplier exists | SYSTEM_CONTROL | COPY_REFERENCE |
| scheme_version_id | Qualification criteria/questionnaire | VersionReference<QualificationScheme> | REQUIRED | Qualification registry | current effective | immutable after start | effective scheme | SYSTEM_CONTROL | COPY_REFERENCE |
| trade_category_id | Qualified trade/commodity | Reference<CategoryTrade> | REQUIRED | taxonomy | NONE | immutable after submission; new qualification for changed scope | active trade | TENANT_INTERNAL | COPY_SNAPSHOT + reference |
| region_jurisdiction | Geographic scope | Reference<Region>/ShortText | REQUIRED | region registry | UAE starter where applicable | immutable after submission | valid scope | TENANT_INTERNAL | COPY_SNAPSHOT |
| project_scope | Optional project-specific qualification | Reference<Project> | OPTIONAL | Project | NONE | immutable after submission | tenant/project compatible | TENANT_INTERNAL | COPY_REFERENCE |
| evidence_set | Exact questionnaire answers/docs | VersionReference<Registration/QualificationEvidence> | REQUIRED before QUALIFIED | provenance/scheme | NONE | immutable once reviewed; new revision for requalification | completeness rules | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| status | Qualification state | ClosedEnum | REQUIRED | product enum | NOT_STARTED | transition actions only | legal transition | TENANT_INTERNAL | COPY_SNAPSHOT at invitation/award |
| effective_from | Qualification validity start | LocalDate | CONDITIONAL for qualified outcomes | NONE | approval date | immutable per record | <= expiry | SYSTEM_CONTROL | COPY_SNAPSHOT |
| expiry_date | Validity end | LocalDate | CONDITIONAL by scheme; REQUIRED when scheme is time-bounded | scheme | scheme duration | immutable per record | >= effective_from | SYSTEM_CONTROL | COPY_SNAPSHOT |
| conditions_limits | Conditions/limits of qualification | LongText(4000) | CONDITIONAL for CONDITIONALLY_QUALIFIED; optional otherwise | NONE | blank | immutable after approval; amendment/requalification path | nonblank when conditional | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| reviewer_approver | Review/approval actors | Reference<Principal>[] | REQUIRED on outcome | Identity/DOA | NONE | immutable per action | authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |
| suspension_reason | Reason for suspension/not-qualified | LongText(2000) | CONDITIONAL | NONE | blank | immutable per status event | required when suspended/not-qualified | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |

## F. EligibilityEvaluation

Closed enum `eligibility_result = {ELIGIBLE, ELIGIBLE_WITH_CONDITIONS, INELIGIBLE, OVERRIDDEN}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Supplier being tested | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable | supplier exists | SYSTEM_CONTROL | COPY_REFERENCE |
| context_ref | Tender/award/project/trade context | typed Reference | REQUIRED | owning domain | NONE | immutable | valid context | SYSTEM_CONTROL | COPY_REFERENCE |
| rule_policy_version | Eligibility policy applied | VersionReference<EligibilityPolicy> | REQUIRED | policy registry | current effective | immutable | applicable version | SYSTEM_CONTROL | COPY_REFERENCE |
| registration_basis | Registration state/version relied upon | VersionReference<RegistrationCase> | OPTIONAL/CONDITIONAL | registration | current applicable | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
| qualification_basis | Qualification record relied upon | VersionReference<QualificationRecord> | OPTIONAL/CONDITIONAL | qualification | current applicable | immutable | trade/context compatible | SYSTEM_CONTROL | COPY_REFERENCE |
| compliance_basis | Compliance docs/states relied upon | VersionReference<ComplianceDocument>[] | OPTIONAL/CONDITIONAL | compliance | current applicable | immutable | exact versions | SYSTEM_CONTROL | COPY_REFERENCE |
| result | Eligibility result | ClosedEnum | REQUIRED | product enum | derived | immutable per evaluation | deterministic from policy unless override | TENANT_INTERNAL | COPY_SNAPSHOT |
| failed_conditions | Explainable failed checks | structured list | OPTIONAL | policy evaluation | empty | immutable | each points to rule/fact | TENANT_INTERNAL | COPY_SNAPSHOT |
| override_reason | Authorized exception reason | LongText(3000) | CONDITIONAL for OVERRIDDEN | NONE | blank | immutable after approval | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| override_approval_id | Authority for override | Reference<ApprovalCase> | CONDITIONAL for OVERRIDDEN | approval domain | NONE | immutable | approved | SYSTEM_CONTROL | COPY_REFERENCE |
| evaluated_at | Evaluation occurrence | Instant | REQUIRED | SYSTEM | current time | immutable | trusted | SYSTEM_CONTROL | COPY_SNAPSHOT |

## G. PerformanceRating

Closed enum `rating_dimension = {QUALITY, COMMERCIAL_RESPONSIVENESS, PROGRAMME_DELIVERY, DOCUMENTATION, HSE, COOPERATION, OVERALL, OTHER_GOVERNED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Rated supplier | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable | supplier exists | SYSTEM_CONTROL | COPY_REFERENCE |
| project_id | Context project | Reference<Project> | REQUIRED | Project | current project | immutable | compatible supplier history | TENANT_INTERNAL | COPY_REFERENCE |
| dimension | Rating dimension | ClosedEnum | REQUIRED | rating scheme | OVERALL | immutable after submit | legal dimension | TENANT_INTERNAL | COPY_SNAPSHOT |
| score | Governed score | Decimal according to scheme | REQUIRED | RatingSchemeVersion | NONE | editable until SUBMITTED; correction creates new rating/version | within scheme range | COMMERCIAL_CONFIDENTIAL | DERIVE aggregates; do not copy as current truth |
| scale_version | Exact rating scheme | VersionReference<RatingScheme> | REQUIRED | rating registry | current | immutable | effective | SYSTEM_CONTROL | COPY_REFERENCE |
| period_event_ref | Period/order/receipt/event rated | typed Reference | OPTIONAL | domain events | NONE | immutable | resolvable | SYSTEM_CONTROL | COPY_REFERENCE |
| comments | Reviewer explanation | LongText(4000) | OPTIONAL; may be required by extreme-score policy | NONE | blank | locked after submit | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT into decision context only by reference |
| evidence | Supporting files/events | AttachmentSet/Reference[] | OPTIONAL | provenance | empty | locked after submit except governed supplement | authorized | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| reviewer_id / rated_at | Rating occurrence | Principal + Instant | REQUIRED | Identity/SYSTEM | current actor/time | immutable | reviewer authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |

## H. SupplierExposureSnapshot

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| supplier_id | Supplier summarized | Reference<Supplier> | REQUIRED | Supplier Master | NONE | immutable snapshot | supplier exists | SYSTEM_CONTROL | COPY_REFERENCE |
| as_of | Snapshot time | Instant | REQUIRED | SYSTEM | current time | immutable | trusted | SYSTEM_CONTROL | COPY_SNAPSHOT |
| active_project_count | Current projects with active commitments/awards | Integer >=0 | REQUIRED | deterministic query | derived | immutable snapshot | explainable source set | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT into comparison/recommendation context |
| active_commitment_value | Current committed value by currency/base conversion | structured Money set | REQUIRED when data available | commitments + FX policy | derived | immutable snapshot | exact source/conversion basis | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT with basis |
| open_tender_count | Current tender workload | Integer >=0 | REQUIRED | sourcing events | derived | immutable | exact source set | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| overlapping_delivery_windows | Relevant overlap facts | structured date-window list/count | OPTIONAL | schedule/commitments | derived | immutable | explainable rule version | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| performance_summary | Governed rating aggregates | structured values + scheme/version | OPTIONAL | PerformanceRating | derived | immutable snapshot | scheme/version cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| compliance_qualification_summary | Current contextual status | structured references | REQUIRED when shown in decision context | Eligibility/Qualification/Compliance | derived | immutable snapshot | exact source refs | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE + snapshot state |
| risk_indicator | Transparent rule-based indicator | ClosedEnum{NONE, LOW, MEDIUM, HIGH, UNKNOWN} | OPTIONAL | ExposureRuleVersion | UNKNOWN | immutable snapshot | contributing facts/rule must be visible | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT; never eligibility by itself |

## Mandatory UI placement

Supplier performance/exposure context is **not confined to the supplier profile**. The same deterministic current snapshot must render in:
1. supplier shortlist/search result or bidder-selection side panel;
2. RFQ bidder-selection review;
3. comparison/leveling supplier header/side panel;
4. recommendation/approval supplier decision summary;
5. supplier portfolio/profile view.

At shortlist, leveling and recommendation, the user must be able to drill from an indicator to the underlying active projects/commitments/ratings/compliance facts without navigating away from the decision context.
