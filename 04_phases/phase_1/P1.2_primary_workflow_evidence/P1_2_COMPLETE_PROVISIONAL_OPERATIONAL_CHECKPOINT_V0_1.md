# P1.2 — Complete Provisional Operational Checkpoint v0.1

**Status:** FULL PROVISIONAL OPERATIONAL COVERAGE / INTERNAL CRITIQUE BOUNDARY / NOT FROZEN  
**Coverage:** P01–P12 including P07A–P07D  
**Evidence posture:** SECONDARY_REFERENCE / FALSIFIABLE / PRIMARY AUDIT LATER  
**External review posture:** final sourcing B5/B6 recheck PENDING; later integrated P07/P01–P12 hostile critique also required before freeze.

## 1. Purpose

This checkpoint marks the point where additional process invention should stop unless evidence or critique identifies a genuine missing operating workflow.

The goal is not to claim completeness of every future feature. The goal is to test whether the current process set can represent the end-to-end procurement/commercial operating cycle of the frozen beachhead without:

- hidden spreadsheet truth;
- destructive commercial edits;
- duplicate ledgers;
- mandatory full ERP replacement;
- mandatory full CDE/submittal ownership;
- mandatory warehouse/inventory ownership;
- generalized BPM/workflow-engine gravity;
- false PO/subcontract unification;
- irreversible assumptions that primary evidence can no longer overturn.

## 2. Complete provisional process set

| Process | Concern | Current status |
|---|---|---|
| P01 | Demand / package initiation / cost attribution / requirement allocation | PROVISIONAL COVERED |
| P02 | Vendor qualification / contextual eligibility / bidder selection | PROVISIONAL COVERED |
| P03 | Tender event / immutable release / addenda | PROVISIONAL COVERED |
| P04 | External access / intent / decline / submission / revision | PROVISIONAL COVERED |
| P05 | Bid normalization / leveling / comparison | PROVISIONAL COVERED |
| P06 | Recommendation / DOA / governed award | PROVISIONAL COVERED |
| P07A | Commitment formation / original effective baseline | PROVISIONAL COVERED |
| P07B | Controlled commitment change / variation | PROVISIONAL COVERED |
| P07C | Goods fulfillment / receipt / GRN / invoice-match seam | PROVISIONAL COVERED |
| P07D | Subcontract SOV / claim / valuation / certification / retention / advance | PROVISIONAL COVERED |
| P08 | Commercial position / accounting authority / ERP interface | PROVISIONAL COVERED |
| P09 | Permissions / approvals / compliance / evidence / tasks / deterministic controls | PROVISIONAL COVERED |
| P10 | Long-lead / procurement schedule / expediting projection | PROVISIONAL COVERED |
| P11 | Commercial closeout / retention-security release / warranty / DLP | PROVISIONAL COVERED |
| P12 | External technical / material approval dependency interface | PROVISIONAL COVERED |

No process above is final ontology.

## 3. Integrated operating graph

### Planning / need

`Project + Budget/Cost Structure`

`→ {DemandLine | PLANNED_REQUIREMENT}`

`→ RequirementAllocation`

`→ [optional ProcurementPackage]`

### Market sourcing

`→ contextual vendor eligibility`

`→ TenderEvent`

`→ immutable TenderRelease + Addenda`

`→ TenderParticipant / bounded external access`

`→ supplier intent / decline / non-response`

`→ BidSubmission v1..n`

### Evaluation / governed decision

`→ source-linked normalization`

`→ internal EvaluationAdjustment`

`→ frozen ComparisonSnapshot`

`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`

`→ ApprovalCase / DOA`

`→ AwardDecision`

### Contractual truth

`→ commitment preparation / execution evidence`

`→ EFFECTIVE_COMMITMENT_BASELINE`

`→ controlled effective changes`

`→ Current Approved Commitment = Original + Effective Approved Changes`

### Fulfillment / earned value

Goods:

`→ delivery → GoodsReceipt → accepted/rejected/returned position → invoice-match interface`

Subcontract/service:

`→ ProgressClaim → ValuationAssessment → CertificationDecision → retention/advance/payable components`

### Accounting seam

`→ explicit OWN/MIRROR/REFERENCE authority`

`→ export/import/acceptance/reconciliation`

`→ AP/payment/job-cost mirrors where authoritative externally`

### Closeout

`→ final scope disposition`

`→ final account / retention / security release`

`→ warranty/DLP obligations`

`→ commercial/accounting closure`

## 4. Cross-cutting overlays

### P09 control plane

`permission + authority/approval + compliance/override + current domain invariants → valid domain action`

Workflow outcome never writes commercial truth directly.

### P10 planning/expediting

Required/planned/forecast/confirmed/actual milestone dates overlay P01–P12 and derive actual status from canonical events where possible.

### P12 technical approval

Technical/material approval remains distinct from commercial approval and can gate selected downstream transitions without requiring full CDE ownership.

### P08 integration

Every external accounting/master-data dimension declares authority, direction, freshness, conflict and reconciliation semantics.

## 5. Truth model — minimum non-collapsible distinctions

The following distinctions are load-bearing and must survive later object simplification:

1. need/authorized requirement ≠ procurement package;
2. package ≠ tender release;
3. tender release ≠ supplier offer;
4. supplier offer ≠ normalized comparison;
5. normalized comparison ≠ internal evaluation adjustment;
6. evaluated basis ≠ supplier contractable basis;
7. recommendation ≠ approval ≠ award;
8. award ≠ effective contractual commitment;
9. original commitment ≠ current approved commitment;
10. pending change ≠ effective approved change;
11. price/value variance ≠ authorized scope/quantity expansion;
12. delivery ≠ receipt ≠ acceptance;
13. receipt ≠ invoice ≠ payment;
14. supplier claim ≠ buyer assessment ≠ certification;
15. certification ≠ payment;
16. retention ≠ unearned scope;
17. advance ≠ earned value;
18. recoupment ≠ reduction of gross earned value;
19. commercial approval ≠ external technical approval;
20. planned/forecast/confirmed date ≠ actual event date;
21. task completion ≠ domain transition;
22. notification delivery ≠ acknowledgment;
23. commercial approval ≠ accounting acceptance/posting;
24. security expiry ≠ security release;
25. commercial closeout ≠ accounting cash closeout.

## 6. One-XL-gravity-well test

### Intended XL

P07 contractual/commercial core:
- effective baseline;
- changes;
- goods receipt/subcontract valuation;
- retention/advance positions;
- commercial projections;
- correction/reversal.

### Bounded supporting areas

P08 integration must remain authority/reconciliation infrastructure, not accounting ERP.

P09 must remain bounded reusable controls, not programmable BPM.

P10 must remain procurement planning/expediting projection, not project scheduling software.

P11 must remain closeout/security/warranty obligation tracking, not banking/legal-claims platform.

P12 must remain procurement-critical technical-approval interface, not full CDE/submittal management.

**Internal gravity verdict:** one XL gravity well remains credible if these boundaries hold.

## 7. Hostile internal audit

### H1 — Fantasy-ERP risk

**Attack:** the map now touches demand, vendor, tender, contracts, changes, receipts, certification, retention, ERP, schedules, compliance, closeout and technical approvals. This can look like a full ERP.

**Current defense:** scope ownership is intentionally narrow:
- no GL/AP/cash engine assumed;
- no full inventory/store engine assumed;
- no owner-revenue contract system;
- no master schedule replacement;
- no full CDE/submittal product;
- no generalized claims/legal module;
- no broad vendor CRM required.

**Verdict:** WATCH, not blocker, provided later P1.4/P1.5 boundaries stay strict.

### H2 — Object explosion

**Attack:** semantic names could become dozens of aggregates and tables.

**Current defense:** all P1.2 names are candidate semantics. Durable identity is required only where history/version/truth needs it; many eligibility, approval, compliance, task, schedule-health and closeout concepts should collapse to event/value/projection implementations later.

**Verdict:** WATCH. P1.5 must perform aggressive object-collapse audit.

### H3 — Workflow-engine creep

**Attack:** approvals, returns, conditions, delegation, compliance and exceptions appear everywhere.

**Current defense:** P09 permits bounded primitives only; tenant workflow cannot mutate domain state directly. Domain commands revalidate hard invariants.

**Verdict:** currently coherent. ADR-0008 remains open.

### H4 — Second-ledger/accounting creep

**Attack:** commercial event projections may duplicate ERP cost/accounting balances.

**Current defense:** product owns/reconstructs contractual/commercial truth required for procurement control; P08 makes accounting authority field/event explicit and supports MIRROR/REFERENCE. No double-entry/GL/AP journal is presumed.

**Verdict:** coherent but load-bearing. ADR-0005 must be resolved before structural freeze.

### H5 — PO/Subcontract false unification

**Attack:** using semantic `Commitment` could force unlike processes into one aggregate.

**Current defense:** only shared contractual invariants are carried; goods receipt and subcontract certification diverge materially. ADR-0004 remains open and physical hierarchy is not chosen.

**Verdict:** coherent.

### H6 — RequirementAllocation overreach

**Attack:** allocation lineage could become a hidden universal ledger/root.

**Current defense:** it conserves authorized procurement scope only; value/budget governance is separate; origins remain DEMAND_LINE or PLANNED_REQUIREMENT; package optional.

**Verdict:** final external B5/B6 critique still PENDING. No PASS inferred.

### H7 — Technical approval CDE creep

**Attack:** versioned submittals/review/comments could pull full document-management surface into V1.

**Current defense:** P12 owns procurement gate/reference semantics only and supports external CDE authority.

**Verdict:** coherent if interface remains narrow.

### H8 — Long-lead schedule creep

**Attack:** backward planning, forecast and milestone profiles could become Primavera replacement.

**Current defense:** required/master-schedule dates may be external; actual procurement milestones derive from P01–P12; only procurement/expediting view is owned.

**Verdict:** coherent.

### H9 — Closeout/security legal creep

**Attack:** bonds, guarantees, warranty, termination and claims could expand into legal administration.

**Current defense:** P11 tracks obligation/evidence/release status only; full banking/legal claims management remains outside.

**Verdict:** coherent.

### H10 — Primary-evidence anchoring

**Attack:** P01–P12 is now detailed enough to bias later contractor interviews into confirming our ontology.

**Binding defense:** independent primary cases must be captured verbatim before mapping. Interviews/artifacts cannot be shown this object vocabulary first. Unmatched observations and contradictions must be logged even when they damage the model.

**Verdict:** highest research-process risk; preserve blind primary capture rule.

### H11 — First-live-tender implementation burden

**Attack:** full P01–P12 implementation before real use would violate the ≤5-day onboarding/live-tender intent.

**Current defense:** Phase 1 architecture ceiling is broader than first exposed product surface. Build decomposition later must identify the minimum coherent sourcing slice and interface contracts without implementing every downstream feature before first live tender.

**Verdict:** no requirement to expose all P01–P12 at first pilot. Must remain explicit in Phase 2.

### H12 — Commercial falsifiability / anti-ETH risk

**Attack:** architecture progress can become self-justifying while market evidence stays weak.

**Current defense:** technical checkpoint is not business validation. Future build/pilot investment must be gated by independent contractor pain, incumbent gap, implementation burden, willingness to pay and repeated usage.

**Verdict:** business proof remains separate and mandatory later; architecture completion cannot be treated as product-market evidence.

## 8. Remaining genuine unknowns

The current workflow map does not need more speculative processes before these are attacked:

### Primary-reality unknowns
- independent contractor starting roots and terminology;
- actual DOA patterns;
- supplier friction;
- real bid-leveling artifact structure;
- PO/subcontract formation practice;
- GRN ownership;
- progress claim/certification terminology and authority;
- retention/advance rules;
- long-lead logs;
- technical/material approval practices;
- closeout/security/warranty practice;
- ERP/accounting ownership.

### Structural ADR unknowns
- ADR-0003 root;
- ADR-0004 PO/Subcontract physical model;
- ADR-0005 accounting/commercial authority seam;
- ADR-0007 long-lead object model;
- ADR-0008 workflow generality;
- ADR-0010 GCC semantics;
- ADR-0011 budget authority/timing;
- ADR-0012 external identity;
- ADR-0014 provenance depth;
- ADR-0015 correction/finalization;
- ADR-0018 workflow-financial seam;
- ADR-0019/0020 temporal/config binding;
- ADR-0021 integration authority/staleness;
- ADR-0022 money/rounding;
- ADR-0023 numbering/concurrency.

## 9. Stop rule for process invention

After P12, **do not create new core transactional processes merely because another feature can be imagined**.

A new process area requires at least one of:
1. primary evidence shows a missing operating workflow;
2. competitor reconstruction shows a load-bearing mechanism absent from the map;
3. golden-thread/hostile critique proves current processes cannot represent a required case;
4. legal/regulatory evidence requires a separate deterministic lifecycle.

Otherwise capture it as:
- later feature;
- interface;
- projection;
- policy/configuration;
- analytics/AI layer;
- OUT/THIN area per frozen scope.

## 10. Internal checkpoint verdict

**P01–P12 provide complete-enough provisional operational coverage for P1.2 secondary-reference modeling.**

Meaning:
- no additional core workflow process is currently justified;
- operational model is coherent enough to move from process discovery into consolidation/audit/evidence challenge;
- this is not P1.2 PASS;
- this is not ontology freeze;
- this is not business validation;
- sourcing external final recheck remains pending;
- full P1.2 primary evidence gate remains unmet.

## 11. Next execution sequence

1. Freeze **process invention only** at P01–P12 as the current provisional hypothesis set; do not freeze their ontology.
2. Maintain the pending Claude sourcing recheck for B5/B6.
3. Prepare a future integrated hostile-review packet for P07/P01–P12 when reviewer usage returns, but run sourcing recheck first.
4. Shift current P1.2 effort toward contradiction/unmatched/primary-audit preparation and consolidation rather than adding features.
5. Formal P1.2 closure remains impossible until primary workflow/artifact gates are met.

No P1.1 reopening is proposed.