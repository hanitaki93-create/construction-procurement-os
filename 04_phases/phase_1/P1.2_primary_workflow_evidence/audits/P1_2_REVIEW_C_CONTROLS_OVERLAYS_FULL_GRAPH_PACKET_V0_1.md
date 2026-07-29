# P1.2 Review C — Controls, Overlays + Full Graph Packet v0.1

**Status:** PREPARED / RUN AFTER REVIEW A AND REVIEW B  
**Scope:** P09–P12 + complete P01–P12 integrated graph/boundaries  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER  
**Reviewer purpose:** hostile critique of whether the supporting control/overlay layers stay bounded and whether the full provisional operating graph has missing or excessive architecture.

## 1. Review prerequisites

Run after:
1. final sourcing Review A passes/remediates B5/B6;
2. Review B commercial core/accounting seam passes/remediates blocker-level issues.

This packet should challenge bounded support layers and the whole graph, not re-litigate every sourcing/commercial detail already cleared unless a new contradiction appears.

## 2. P09 — deterministic control plane

### Purpose

Provide reusable cross-cutting control without creating a user-programmable BPM engine.

### Candidate action rule

`permission`
`+ authority/approval condition`
`+ compliance/prerequisite condition`
`+ current domain invariants`
`→ domain command allowed`
`→ domain command revalidates`
`→ domain event`

Workflow/task completion never writes commercial truth directly.

### Candidate control primitives

- permission/capability check;
- DOA/approval requirement;
- effective policy/config reference;
- delegation/effective dates;
- compliance gate / warning / overridable block / hard block;
- prerequisite/condition reference;
- exception/override with actor/reason/evidence;
- task/notification/escalation as operational support;
- audit/provenance;
- deterministic derived status projection.

### Boundaries

P09 must not become:
- arbitrary user-authored state machine language;
- low-code application platform;
- generalized BPM process designer;
- substitute for domain invariants;
- parallel audit/status ledger.

### Historical reproducibility

For governed decisions/actions preserve enough historical context to reconstruct:
- effective policy version;
- resolved role at the time;
- actual actor/approver;
- role assignment context;
- delegation basis;
- exception/override evidence;
- relevant compliance/prerequisite state.

## 3. P10 — long-lead / procurement schedule / expediting overlay

### Purpose

Give construction procurement teams one operational view from early planning through delivery without replacing the project master schedule.

### Date distinctions

Where applicable preserve:
- required date;
- baseline/planned date;
- forecast date;
- supplier-confirmed date;
- actual event date.

These are not interchangeable.

### Candidate milestones

Depending on package/type:
- procurement need/plan identified;
- scope readiness;
- tender planned/issued;
- bid due/received;
- recommendation/approval target;
- award target/actual;
- commitment target/actual;
- technical/material approval target/actual;
- manufacturing/fabrication forecast;
- shipping/dispatch;
- delivery required/forecast/actual;
- goods acceptance / subcontract mobilization where relevant.

Actual milestones should derive from P01–P12 domain events wherever possible.

### Candidate schedule health

Schedule/expediting status may derive from:
- baseline vs current forecast;
- missing prerequisite;
- overdue action;
- supplier-confirmed slippage;
- tender/approval/technical-gate delay;
- delivery risk.

The schedule projection may be cached but should be rebuildable from planning inputs + canonical events.

### Boundaries

P10 must not become:
- CPM scheduling engine;
- Primavera replacement;
- resource-loaded master schedule;
- full logistics/TMS platform.

Required/master-schedule dates may remain external/reference inputs.

ADR-0007 remains open on whether long-lead identity requires a distinct object or is projection/config over package/commitment/milestone relationships.

## 4. P11 — commercial closeout / retention / security / warranty

### Purpose

Avoid a false `CLOSED` state while commercial/security/warranty obligations remain open.

### Required distinctions

- procurement/scope completion;
- final goods acceptance or final subcontract certification;
- final-account agreement where applicable;
- outstanding variation/dispute/claim context;
- retention held vs released;
- advance fully recouped vs outstanding;
- bond/guarantee/insurance/security expiry vs release/discharge;
- warranty/DLP obligation active vs expired/closed;
- invoice/payment/accounting closeout;
- commercial record archival/closure.

### Candidate closeout behavior

A contract/package may be operationally complete but still commercially open.

Closure should derive from required obligations rather than one manual `CLOSED` checkbox.

Release of retention/security must preserve:
- contractual basis;
- amount/instrument;
- prerequisite conditions;
- approval/authority;
- release/expiry evidence;
- actor/time;
- residual obligations.

### Boundaries

P11 must not become:
- banking guarantee issuance platform;
- legal claims suite;
- insurance administration platform;
- general warranty-service CRM.

It tracks procurement/commercial obligation/evidence and gates only.

## 5. P12 — external technical/material approval dependency interface

### Purpose

Represent real consultant/client/engineer/material approval dependencies that affect procurement without building a full submittal/CDE product by default.

### Required distinction

`Commercial approval ≠ Technical/material approval`

A technically rejected item may be commercially cheapest; a commercially approved award may remain conditional on external technical approval.

### Candidate dependency semantics

Preserve where applicable:
- object/scope/requirement affected;
- required external approval type;
- submitted item/document/product revision;
- submission/reference ID;
- external authority/reviewer;
- submitted date;
- current referenced state;
- approved/rejected/approved-with-comments/revise-resubmit evidence;
- approval revision/basis;
- expiry/validity where relevant;
- which downstream transition is gated;
- external system/CDE reference if authoritative elsewhere.

### Gate examples

Technical approval may condition:
- award effectiveness;
- commitment release;
- manufacturing release;
- material order;
- delivery acceptance;
- approved-equal/alternate use.

The exact gate placement is package/customer/project dependent and remains primary-audit territory.

### Boundaries

P12 must not require:
- full drawing/submittal register ownership;
- document markup/review engine;
- transmittal/CDE replacement;
- consultant organization-wide collaboration suite.

The procurement OS may own only the dependency/reference/gate semantics while external CDE remains authoritative.

## 6. Complete provisional P01–P12 operating graph

### Planning / need

`Project + Budget/Cost Structure`
`→ {DemandLine | PLANNED_REQUIREMENT}`
`→ RequirementAllocation`
`→ [optional ProcurementPackage]`

### Market sourcing

`→ vendor qualification/contextual eligibility`
`→ TenderEvent`
`→ immutable TenderRelease + Addenda`
`→ TenderParticipant / bounded external access`
`→ supplier intent / decline / non-response`
`→ BidSubmission v1..n`

### Evaluation / governed award

`→ source-linked normalization`
`→ internal EvaluationAdjustment`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`
`→ ApprovalCase / DOA`
`→ AwardDecision`

### Contractual/commercial truth

`→ commitment preparation/effectiveness`
`→ original effective baseline`
`→ controlled effective changes`
`→ current approved commitment projection`

### Fulfillment / certification

Goods:
`→ delivery → receipt → accept/reject/return → invoice-match seam`

Subcontract/service:
`→ claim → assessment → certification → retention/advance/payable components`

### Accounting coexistence

`→ OWN/MIRROR/REFERENCE authority`
`→ export/import/accept/reject/reconcile`
`→ AP/payment/job-cost mirror/reference where external`

### Closeout

`→ final scope/certification`
`→ final account / retention / security release`
`→ warranty/DLP obligations`
`→ commercial/accounting closure`

### Cross-cutting overlays

P09 control plane governs allowed commands but does not own commercial truth.

P10 scheduling/expediting derives actual status from canonical events.

P12 technical approval is an external prerequisite/interface, not commercial approval.

## 7. Minimum non-collapsible distinctions across full graph

Reviewer should assume these distinctions are intentional unless simplification preserves their meaning:

1. requirement ≠ package;
2. package ≠ tender release;
3. tender release ≠ supplier submission;
4. supplier submission ≠ normalization;
5. normalization ≠ internal evaluation adjustment;
6. evaluated basis ≠ supplier-agreed contractable basis;
7. recommendation ≠ approval ≠ award;
8. award ≠ effective commitment;
9. original commitment ≠ current approved commitment;
10. pending change ≠ effective approved change;
11. scope/quantity authorization ≠ value/budget variance;
12. delivery ≠ receipt ≠ acceptance;
13. receipt ≠ invoice ≠ payment;
14. supplier claim ≠ assessment ≠ certification;
15. certification ≠ payment;
16. retention ≠ unearned scope;
17. advance ≠ earned value;
18. commercial approval ≠ technical approval;
19. planned/forecast/confirmed date ≠ actual event date;
20. workflow/task completion ≠ domain transition;
21. accounting acceptance/posting ≠ commercial approval;
22. security expiry ≠ release;
23. operational completion ≠ full commercial/accounting closure.

## 8. Whole-graph burden test

Only one independent XL gravity well is intended: P07 contractual/commercial truth.

FAIL if the graph requires another independent XL system in any of these areas:
- P09 generalized BPM;
- P10 master project scheduling;
- P11 banking/legal/warranty administration;
- P12 full CDE/submittal management;
- P08 full accounting ERP;
- supplier portal/identity platform beyond bounded participation;
- inventory/warehouse ERP.

## 9. First-live-tender adoption test

Phase 1 architecture ceiling is broader than first exposed product surface.

The complete graph must **not** imply all P01–P12 modules are configured before first live tender.

Reviewer should attack whether a minimum coherent initial surface can exist around:

`requirement/package → bidders → tender release → bid ingestion → comparison → recommendation/approval → award`

with stable interface contracts to later commitment/accounting/technical/schedule areas.

If the architecture only works when every downstream area is implemented/configured, the design violates the first-live-tender guardrail.

## 10. Process-completeness attack

Do not add a process merely because a feature can be imagined.

Identify a missing core process only where the graph cannot represent a required construction procurement/commercial reality.

Candidate things that should generally remain interfaces/projections rather than new core processes unless evidence proves otherwise:
- document management;
- project master scheduling;
- inventory/warehouse;
- AP/GL/cash;
- legal claims;
- banking guarantee administration;
- general supplier CRM;
- owner revenue contracts;
- analytics/reporting;
- AI assistance.

## 11. Object-inflation attack

P01–P12 names are semantic hypotheses, not final tables/services.

Reviewer should propose aggressive collapses where durable identity is unnecessary.

Preserve durable identity only where required by:
- immutable/versioned evidence;
- legal/commercial history;
- independent lifecycle;
- external reference/integration identity;
- concurrency/idempotency;
- audit/provenance.

## 12. Research anchoring attack

The current model is detailed enough to bias later interviews.

Binding rule:
- independent primary capture remains verbatim and blind to this vocabulary;
- observations map to model only after capture;
- unmatched observations/contradictions are first-class;
- model loses when higher-authority evidence contradicts it.

Reviewer should fail any part of this packet that makes later evidence unable to overturn the provisional design in practice.

## 13. Structural ADRs still open

This packet must not silently close:
- ADR-0003 structural root;
- ADR-0004 PO/Subcontract physical model;
- ADR-0005 accounting/commercial ownership;
- ADR-0007 long-lead tracking model;
- ADR-0008 workflow generality;
- ADR-0010 GCC semantics/localization;
- ADR-0011 budget timing/authority;
- ADR-0012 external identity/access;
- ADR-0013 event-derived status;
- ADR-0014 provenance depth;
- ADR-0015 posting/finalization/reversal;
- ADR-0018 workflow-financial seam;
- ADR-0019 effective dating;
- ADR-0020 config binding;
- ADR-0021 integration authority/staleness;
- ADR-0022 money/rounding;
- ADR-0023 numbering/concurrency/fiscal semantics.

## 14. Primary evidence still required

Full P1.2 closure still requires independent contractor workflows and artifacts.

High-value blind evidence includes:
- real starting roots/MRs/procurement schedules;
- tender/addendum/submission chains;
- original bid-leveling/comparison artifact;
- award/DOA practice;
- PO/subcontract formation;
- GRN/receipt authority;
- progress claim/certification;
- retention/advance;
- ERP ownership;
- long-lead tracking;
- technical/material approvals;
- closeout/security/warranty;
- corrections of approved/posted mistakes.

## 15. Reviewer output contract

Return only:

### BLOCKERS
For each:
- exact area/seam;
- why structural;
- minimum correction.

### DELETE / COLLAPSE
Anything that should be removed, merged or demoted to event/value/projection while preserving invariants.

### SECOND-XL CHECK
Choose one:
- `CLEAN — only P07 is an XL gravity well`
- `FAIL — identify the second XL subsystem`

### MISSING-CORE-PROCESS CHECK
Choose one:
- `NONE — current P01–P12 coverage is complete enough`
- `MISSING — exact workflow absent and why it cannot be an interface/projection`

### FIRST-LIVE-TENDER CHECK
Choose one:
- `CLEAN — architecture can expose a coherent narrow sourcing surface first`
- `FAIL — exact downstream dependency that makes narrow launch impossible`

### ADR ANCHORING CHECK
Identify any open ADR this model has already decided in practice.

### P1.1 REOPEN?
`NO` or exact frozen assumption requiring reopening.

### VERDICT
Choose exactly one:
- `PASS — P09–P12/full graph coherent; proceed to primary challenge + later structural architecture`
- `FAIL — remediate blocker(s) before structural architecture`

Be hostile. Reward fewer primitives, clean truth ownership, realistic adoption and reversibility—not feature breadth.
