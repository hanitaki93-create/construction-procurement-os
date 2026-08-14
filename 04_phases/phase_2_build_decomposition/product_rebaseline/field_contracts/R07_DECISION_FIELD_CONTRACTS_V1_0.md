# CPOS Architecture V2 — R07 Recommendation / Approval / Award Field Contracts v1.0

**Status:** FREEZE-CANDIDATE / STANDARD §C AUTHORITY
**Inherits:** `FIELD_CONTRACT_COMMON_V1_0.md`

## A. Award Recommendation

Closed enum `recommendation_status = {DRAFT, READY_FOR_APPROVAL, SUBMITTED, RETURNED_FOR_REVISION, APPROVED, REJECTED, WITHDRAWN, SUPERSEDED}`.
Closed enum `recommendation_outcome = {SINGLE_SUPPLIER, SPLIT_AWARD, SOLE_SOURCE, NO_AWARD, RETENDER}`.
Closed enum `technical_condition_state = {CLEAR, CONDITIONAL, UNRESOLVED_BLOCKING, NOT_APPLICABLE}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| recommendation_number | Human recommendation identity | BusinessNumber | REQUIRED on SUBMITTED | NumberingPolicy RECOMMENDATION | assigned at submit | immutable once assigned | class policy | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT + reference |
| rfq_id | Source sourcing event | Reference<RFQ> | REQUIRED | RFQ | NONE | immutable | same project/legal entity | SYSTEM_CONTROL | COPY_REFERENCE |
| comparison_snapshot_id | Frozen comparison basis | Reference<ComparisonSnapshot> | REQUIRED for competitively evaluated sourcing unless explicit sole-source path has governed equivalent evidence basis | R06 | latest frozen suggestion | immutable after submission; revision points to new snapshot if needed | snapshot frozen and valid | SYSTEM_CONTROL | COPY_REFERENCE |
| route_decision_id | Procurement policy/competition basis | VersionReference<ProcurementRouteDecision> | REQUIRED | Policy route | event route decision | immutable | effective/exact source | SYSTEM_CONTROL | COPY_REFERENCE |
| technical_evaluation_id | Frozen technical tender evaluation | VersionReference<TechnicalEvaluation> | CONDITIONAL when tender uses formal technical evaluation | R04 | current frozen | immutable | same RFQ | SYSTEM_CONTROL | COPY_REFERENCE |
| outcome | Recommended buying outcome | ClosedEnum | REQUIRED | product enum | SINGLE_SUPPLIER | editable in DRAFT; locked on submit | legal enum; split requires allocations | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| recommended_suppliers | Supplier(s) proposed | Reference<Supplier>[] | CONDITIONAL unless NO_AWARD/RETENDER | Supplier Master | NONE | editable in DRAFT; locked on submit | each eligible or approved exception; appears in comparison/source basis | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| selected_confirmed_basis | Exact supplier-confirmed commercial basis per supplier/row/package | VersionReference<SupplierConfirmedBasis>[] | CONDITIONAL for award recommendation | R06 | selected rows | editable in DRAFT; locked on submit | complete for recommended scope/value | SYSTEM_CONTROL | COPY_REFERENCE |
| recommended_scope_partitions | Demand/scope partitions proposed for each supplier | structured Reference<DemandAuthority> allocations | CONDITIONAL for award recommendation | conservation control | derived from selected comparison | editable in DRAFT; locked on submit | no proposed overlap; within authority | SYSTEM_CONTROL | COPY_REFERENCE |
| recommended_value | Total recommended value | Money(currency) or per-supplier Money set | CONDITIONAL for award recommendation | confirmed basis | derived | system-derived; buyer changes source basis, not manual total | exact sum/rounding | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to approval/award |
| currency | Recommendation currency | ISO-4217 | REQUIRED with value | Currency policy | comparison currency or contractable source currency per defined basis | locked on submit | active; conversions cited | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| budget_basis_id | Exact budget/cost-plan basis relied upon | VersionReference<ProcurementBudgetBasis> | CONDITIONAL when budget context exists/required | R01 budget | current selected | locked on submit | same project/package | RESTRICTED_FINANCIAL | COPY_REFERENCE |
| budget_variance | Recommended value vs exact budget basis | Money + Percentage optional | CONDITIONAL when budget basis exists | derived | derived | system-calculated | baseline/version/currency explicit | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| estimating_reference | Historical estimating allowance/context | Reference<EstimatingPackageBasis> | OPTIONAL | Estimating handover | package source | locked on submit | clearly labeled non-authoritative if not budget | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| technical_condition_state | Decision readiness of technical matters | ClosedEnum | REQUIRED | TechnicalEvaluation/ApprovalDependency | derived | revalidated at submit/approve | BLOCKING prevents unconditional award unless approved exception | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| technical_dependency_refs | External/later technical approvals/conditions | VersionReference<TechnicalApprovalDependency>[] | OPTIONAL/CONDITIONAL | R04 | current relevant | locked on submit; approval action revalidates current state | same offered scope | SYSTEM_CONTROL | COPY_REFERENCE |
| eligibility_basis | Registration/qualification/compliance facts relied upon | VersionReference<EligibilityEvaluation>[] | REQUIRED per recommended supplier when policy evaluates eligibility | R02 | current | locked on submit; approval revalidates current | event/context compatible | SYSTEM_CONTROL | COPY_REFERENCE |
| supplier_intelligence_basis | Performance/exposure facts considered | VersionReference<SupplierExposureSnapshot>[] | OPTIONAL/CONDITIONAL when available | R02 | current | locked on submit | same suppliers; as-of visible | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE |
| competition_result | Competitive evidence result | structured {invited, valid_responses, comparable_responses, requirement, exception} | REQUIRED | RFQ/route policy | derived | locked on submit | exact counts/rules | SYSTEM_CONTROL | COPY_SNAPSHOT |
| route_exception_approval | Under-competition/direct/sole-source exception | Reference<ApprovalCase/RouteException> | CONDITIONAL | route policy | NONE | linked before final approval | required policy evidence | SYSTEM_CONTROL | COPY_REFERENCE |
| rationale | Technical/commercial decision rationale | LongText(8000) | REQUIRED | NONE | NONE | editable in DRAFT/RETURNED; locked on submit version | nonblank; decision-specific | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT into recommendation document/award justification |
| non_lowest_reason | Why selected offer is not lowest comparable price | LongText(4000) | CONDITIONAL when non-lowest | NONE | NONE | editable until submit | nonblank when condition true | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| split_or_sole_source_reason | Structured justification | LongText(4000) | CONDITIONAL for SPLIT_AWARD/SOLE_SOURCE | NONE | NONE | editable until submit | nonblank | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| risks_deviations | Explicit unresolved/accepted risks/deviations | structured list<type,severity,text,source_ref> | OPTIONAL/CONDITIONAL | comparison/technical/correspondence | derived suggested | editable until submit; locked version | each traceable to source where factual | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| preparer_id / prepared_at | Recommendation authoring occurrence | Principal + Instant | REQUIRED at submit | Identity/SYSTEM | current actor/time | immutable per submitted version | authorized buyer | SYSTEM_CONTROL | COPY_SNAPSHOT |
| status | Recommendation lifecycle | ClosedEnum | REQUIRED | product lifecycle | DRAFT | transition only | legal transition | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |

## B. Procurement Approval Case

Closed enum `approval_case_status = {DRAFT, PENDING, APPROVED, CONDITIONALLY_APPROVED, REJECTED, RETURNED, CANCELLED, SUPERSEDED}`.
Closed enum `approval_action = {APPROVE, APPROVE_WITH_CONDITIONS, REJECT, RETURN_FOR_REVISION}`.

The shared B02 approval/routing primitives remain authoritative for actors, effective policies and immutable action history. These product fields bind procurement meaning onto that substrate.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| subject_ref | Recommendation/route exception/order formation requiring approval | typed Reference | REQUIRED | owning domain | NONE | immutable | supported approval subject | SYSTEM_CONTROL | COPY_REFERENCE |
| approval_policy_version | Exact DOA/routing policy | VersionReference<ApprovalPolicy> | REQUIRED | B02 approval/config | current effective | immutable once case starts | applicable to subject/legal entity/value | SYSTEM_CONTROL | COPY_REFERENCE |
| monetary_basis | Amount/currency used for DOA | Money | CONDITIONAL when approval threshold is monetary | subject/budget | derived | immutable per case version | exact, no hidden converted threshold | RESTRICTED_FINANCIAL | COPY_SNAPSHOT |
| scope_basis | Scope/category/project factors used by policy | structured refs | OPTIONAL/CONDITIONAL | subject/policy | derived | immutable | exact subject facts | SYSTEM_CONTROL | COPY_REFERENCE |
| required_approvers | Effective approver slots/roles | structured actor/role set | REQUIRED | approval policy | derived | system updates only via authorized delegation/policy semantics | complete routing | SYSTEM_CONTROL | COPY_SNAPSHOT |
| ball_in_court | Current required action owner(s) | derived actor/role set | REQUIRED while PENDING | approval engine | derived | system-managed | lifecycle-consistent | TENANT_INTERNAL | DO_NOT_COPY |
| required_evidence | Evidence/justification checklist | structured keys/refs | REQUIRED where policy defines | policy/subject | derived | locked per case version | all mandatory evidence before approval | SYSTEM_CONTROL | COPY_REFERENCE |
| current_gate_facts | Revalidated route/budget/qualification/technical facts | structured version references | REQUIRED on approve action | subject domains | derived at transition | occurrence snapshot immutable | must satisfy current policy/conditions | SYSTEM_CONTROL | COPY_REFERENCE |
| action | Approver decision | ClosedEnum | CONDITIONAL per action event | product enum | NONE | immutable occurrence | actor authorized; transition valid | SYSTEM_CONTROL | COPY_SNAPSHOT |
| conditions | Conditions attached to approval | LongText(4000) + structured gate refs | CONDITIONAL for APPROVE_WITH_CONDITIONS | NONE/domain gates | NONE | immutable occurrence | nonblank; measurable/revalidatable where blocking | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to AwardDecision/order gates |
| comments | Approver rationale/comments | LongText(4000) | OPTIONAL; may be policy-required on reject/return | NONE | blank | immutable occurrence | sanitized | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| delegated_authority_ref | Delegation relied upon | VersionReference<Delegation> | CONDITIONAL when acting by delegation | B02 authority | NONE | immutable | effective at action time | SYSTEM_CONTROL | COPY_REFERENCE |
| action_by / action_at | Immutable approval occurrence | Principal + Instant | REQUIRED per action | Identity/SYSTEM | current actor/time | immutable | trusted/authorized | SYSTEM_CONTROL | COPY_SNAPSHOT |
| status | Aggregate case status | ClosedEnum | REQUIRED | approval engine | DRAFT | transition/system derived | legal state | TENANT_INTERNAL | COPY_SNAPSHOT |

## C. AwardDecision

Closed enum `award_type = {FULL, SPLIT, CONDITIONAL, NO_AWARD}`.
Closed enum `award_status = {DRAFT, RECORDED, EFFECTIVE_FOR_HANDOFF, REVOKED, SUPERSEDED, CANCELLED}`.

| Field / label | Meaning | Type | Requirement | Master / reference source | Default | Lifecycle editability | Validation | Security | Downstream-copy behavior |
|---|---|---|---|---|---|---|---|---|---|
| award_number | Human award decision number | BusinessNumber | REQUIRED on RECORDED | NumberingPolicy AWARD | assigned at record/approval transition | immutable | class policy | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT + reference |
| recommendation_id | Approved recommendation/decision proposal | VersionReference<Recommendation> | REQUIRED except explicit governed direct no-recommendation path if architecture later permits | R07 | approved recommendation | immutable | APPROVED/CONDITIONALLY_APPROVED as allowed | SYSTEM_CONTROL | COPY_REFERENCE |
| approval_case_id | Governing approval | Reference<ApprovalCase> | REQUIRED where policy requires approval | approval | recommendation approval | immutable | approved/current conditions satisfied or carried | SYSTEM_CONTROL | COPY_REFERENCE |
| award_type | Award outcome | ClosedEnum | REQUIRED | product enum | FULL | immutable after recorded; replacement decision for change | legal enum | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| supplier_awards | Supplier(s) selected | structured {supplier_id, confirmed_basis_refs, scope_partitions, value,currency}[] | CONDITIONAL unless NO_AWARD | R06/R07 | recommendation basis | immutable after recorded; correction/replacement decision | exact approved suppliers/basis; no overlap beyond conservation authority | COMMERCIAL_CONFIDENTIAL | COPY_REFERENCE + snapshot to R08 |
| comparison_snapshot_id | Exact frozen commercial evaluation | Reference<ComparisonSnapshot> | CONDITIONAL for evaluated award | R06 | recommendation snapshot | immutable | frozen | SYSTEM_CONTROL | COPY_REFERENCE |
| route_policy_basis | Exact ProcurementRouteDecision/policy | VersionReference | REQUIRED | R01 route policy | recommendation basis | immutable | valid | SYSTEM_CONTROL | COPY_REFERENCE |
| budget_basis | Exact budget used | VersionReference<ProcurementBudgetBasis> | OPTIONAL/CONDITIONAL | R01 | recommendation basis | immutable | valid | RESTRICTED_FINANCIAL | COPY_REFERENCE |
| technical_basis | Technical evaluation/dependency state relied upon | VersionReference[] | OPTIONAL/CONDITIONAL | R04 | recommendation basis | immutable | exact snapshots | SYSTEM_CONTROL | COPY_REFERENCE |
| eligibility_basis | Supplier eligibility/qualification/compliance relied upon | VersionReference<EligibilityEvaluation>[] | CONDITIONAL | R02 | recommendation basis | immutable | supplier/context match | SYSTEM_CONTROL | COPY_REFERENCE |
| award_conditions | Conditions carried into formation/effectiveness | structured list | OPTIONAL/CONDITIONAL for CONDITIONAL | approval/recommendation | approved conditions | immutable | each condition has responsible gate/evidence | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT to R08 gating |
| decision_justification | Immutable award rationale incl. exception/override | LongText(8000) | REQUIRED | recommendation/approval | recommendation rationale | immutable | nonblank; divergence reason if differs from recommendation | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |
| decision_by / decision_at | Award occurrence | Principal + Instant | REQUIRED | Identity/SYSTEM | authorized actor/time | immutable | award authority | SYSTEM_CONTROL | COPY_SNAPSHOT |
| status | Award lifecycle/handoff state | ClosedEnum | REQUIRED | product lifecycle | DRAFT | transition only | RECORDED does not equal commitment | COMMERCIAL_CONFIDENTIAL | COPY_SNAPSHOT |

## Revalidation rule

Immediately before final approval and again before AwardDecision becomes `RECORDED` or `EFFECTIVE_FOR_HANDOFF`, CPOS revalidates current authority and blocking facts required by policy: approval authority/delegation, route/competition requirements, material qualification/compliance expiry, technical blocking conditions and any declared budget freshness rule. A changed fact cannot be hidden by an older recommendation snapshot; the decision records both historical recommendation basis and current transition-time validation facts.
