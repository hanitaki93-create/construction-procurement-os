# P1.2 Review B — Commercial Core + Accounting Seam Packet v0.1

**Status:** PREPARED / DO NOT RUN BEFORE SOURCING REVIEW A PASS  
**Scope:** P07A–P07D + P08  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER  
**Reviewer purpose:** hostile structural critique of the single intended XL commercial gravity well and its accounting coexistence seam.

## 1. Review prerequisites

Run this packet only after Review A confirms the final B5/B6 sourcing remediation or after any required sourcing corrections have been propagated here.

Upstream assumptions currently inherited provisionally:
- every award/commitment binds one canonical `RequirementAllocation` lineage;
- hard scope/quantity conservation is separate from value/budget governance;
- `evaluated_basis` is internal decision support;
- `contractable_agreed_basis` resolves to supplier-confirmed immutable `BidSubmission` revision(s);
- award is an approved internal decision, not authoritative committed cost.

No physical PO/Subcontract hierarchy is assumed. ADR-0004 remains open.

## 2. P07A — commitment formation / original effective baseline

### Candidate semantic role

`Commitment` means the contractual/commercial obligation role shared by downstream goods and subcontract/service paths.

It does **not** decide whether final persistence is:
- separate PurchaseOrder / Subcontract aggregates;
- a common supertype;
- composition;
- another model.

### Formation seam

Candidate flow:

`AwardDecision`
`+ approved contractable_agreed_basis`
`+ RequirementAllocation leaf/leaves`
`+ required contract/PO/subcontract evidence`
`+ authority / technical / compliance conditions`
`→ prepared commitment`
`→ executed/issued/accepted/effective condition`
`→ EFFECTIVE_COMMITMENT_BASELINE`

The explicit effectiveness trigger is policy/evidence driven because internal award approval may precede the event that creates authoritative contractual obligation.

### Original baseline invariants

1. award approval alone does not create committed cost;
2. effective baseline references the exact approved supplier-agreed commercial basis;
3. buyer-only evaluation adjustments cannot enter baseline value;
4. effective original baseline is immutable historical truth;
5. commitment binds existing RequirementAllocation scope rather than creating another allocation ledger;
6. project/legal entity/counterparty/currency/tax/cost-attribution basis is reproducible;
7. commitment formation records actor/time/authority/evidence;
8. invalid/stale award conditions must be revalidated at formation;
9. later current commitment never rewrites original baseline.

### Derived current position

`Current Approved Commitment = Original Effective Baseline + Effective Approved Changes`

Pending/proposed changes do not belong in this current approved value.

## 3. P07B — controlled commitment change / variation

### Required distinctions

- potential change / issue;
- proposed/requested change;
- under review / priced / negotiated state;
- approved change;
- effective/posted contractual change;
- rejected/cancelled change;
- correction/reversal of prior effective event.

Final names are provisional; distinctions are mandatory.

### Binding candidate rules

1. original baseline never changes;
2. approved/effective changes append to commercial history;
3. current approved commitment includes only effective approved changes;
4. pending changes may contribute to forecast/exposure but not committed contractual value;
5. positive, negative, zero-value and time-only changes must be representable;
6. value-only change does not create additional requirement scope capacity;
7. added quantity/scope requires prior governed change to the authorized requirement basis / RequirementAllocation lineage;
8. an already effective change is corrected through void/reversal/counter-event lineage rather than destructive edit;
9. approval/effectiveness evidence is historical and effective-dated;
10. external accounting acceptance/posting is a separate event unless that external system is explicitly authoritative for a field/event.

## 4. P07C — goods receipt / GRN / invoice-match seam

### Required distinction

`Delivery ≠ Receipt ≠ Acceptance ≠ Supplier Invoice ≠ Payment`

### Candidate flow

`effective PO-like commitment line`
`→ shipment/delivery occurrence`
`→ GoodsReceipt`
`→ inspect / accept / reject / partial accept`
`→ accepted quantity / returned/rejected position`
`→ invoice-match eligibility/interface`
`→ external/internal AP processing`
`→ payment mirror/reference where appropriate`

### Candidate invariants

1. partial receipt is first-class;
2. rejected/damaged/returned quantity preserves history;
3. accepted quantity, not invoice receipt, drives procurement fulfillment;
4. receipt references effective commitment line/version and location/project context;
5. over-receipt requires explicit policy/exception; it cannot silently inflate procurement scope;
6. free-form/non-stock items remain receivable;
7. inventory valuation/warehouse-bin ownership is not required for V1 procurement truth;
8. 2-way/3-way matching is policy/interface behavior, not proof that procurement must own AP;
9. invoice/payment cannot rewrite receipt history;
10. accounting sync state is separate from receipt state.

## 5. P07D — subcontract/service valuation, certification, retention, advance

### Required distinction

`Supplier Claim ≠ Buyer Assessment ≠ Certification ≠ Invoice ≠ Payment`

### Candidate flow

`effective subcontract/service baseline + effective changes + SOV/work breakdown`
`→ ProgressClaim`
`→ ValuationAssessment`
`→ CertificationDecision`
`→ certified gross earned value`
`→ retention / advance recoupment / deductions / payable components`
`→ invoice/AP interface`
`→ payment mirror/reference`

### Candidate valuation invariants

1. supplier claim is not authoritative earned value;
2. buyer assessment may differ from supplier claim and history remains;
3. certification is the governed earned-value event;
4. certified gross is constrained by effective approved scope/SOV/commitment basis unless explicit contract mechanics permit otherwise;
5. pending/unapproved VO cannot silently become certified approved work;
6. prior/current/cumulative certified values derive from event history;
7. retention is earned-but-withheld payable position, not unearned scope;
8. advance is funding, not earned progress;
9. advance recoupment reduces payable/cash position, not gross earned value;
10. payment/compliance hold does not rewrite certification truth;
11. correction of finalized certification uses reversal/counter-certification semantics;
12. final certification/closeout must not erase interim history.

## 6. P08 — commercial position + accounting/ERP authority seam

### Goal

The procurement OS must own enough contractual/commercial truth to answer current procurement exposure without pretending to be the full accounting system.

### Candidate authority modes

For each externally shared master/field/event, declare one of:
- `OWN` — this platform is authoritative;
- `MIRROR` — authoritative externally, local synchronized copy allowed;
- `REFERENCE` — externally mastered; local reference/context only.

Authority is field/event specific, not one flag for an entire integration.

### Candidate integration lifecycle

`commercial/domain event`
`→ queued/exportable`
`→ exported`
`→ external accepted/posted | rejected`
`→ external identifiers/status returned`
`→ reconciled / mismatch / stale`

Do not use one generic `synced=true` state.

### Candidate reconciliation semantics

Track where applicable:
- internal source event/version;
- external system/connector/company/project identity;
- payload/version/idempotency key;
- export attempt/time;
- external acceptance/posting identity/time;
- external rejection/error;
- last successful refresh;
- authority direction;
- field/event conflict;
- reconciliation disposition;
- correction/re-export lineage.

### Commercial position candidates

Internally reconstructable positions may include:
- original effective commitment;
- effective approved changes;
- current approved commitment;
- pending change exposure separately;
- accepted goods / remaining goods scope;
- subcontract certified gross;
- retention held/released;
- advance paid/recouped position where available;
- invoice/payment/job-cost information only to the authority depth configured.

The model must expose freshness/authority when external accounting information is shown.

## 7. Cross-process truth ownership

| Truth | Candidate owner |
|---|---|
| supplier commercial offer | BidSubmission lineage |
| internal comparison/evaluated amount | ComparisonSnapshot / EvaluationAdjustment |
| approved supplier-agreed award basis | AwardDecision contractable_agreed_basis |
| original effective contractual value | P07A effective baseline |
| effective contractual changes | P07B change events |
| current approved commitment | derived projection from P07A + effective P07B |
| goods receipt/acceptance | P07C receipt events |
| subcontract earned/certified gross | P07D certification events |
| retention/advance/recoupment positions | P07D derived from contractual/certification/funding events |
| invoice/AP/payment posting | P08 authority map: internal only where explicitly OWN, otherwise MIRROR/REFERENCE |

No one generic `current_amount` may substitute for these layers.

## 8. Critical structural seams to attack

### A. Award → effective commitment

Can the architecture unambiguously identify the event/evidence that makes commercial obligation authoritative without creating legal/jurisdiction fantasy?

### B. Common commitment semantics vs PO/Subcontract divergence

Do shared invariants remain useful without forcing one physical aggregate that makes receipt and certification unnaturally similar?

### C. RequirementAllocation boundary

Does allocation remain scope-conservation infrastructure only, or has P07 accidentally turned it into budget, earned-value, receipt or accounting ledger?

### D. Change basis

Can value-only, scope-changing, time-only and negative variations coexist without rewriting baseline or bypassing authorized requirement changes?

### E. Certification ceiling

How should certified work interact with approved changes, provisional sums/allowances, remeasurement and disputed/pending variations without either blocking real construction practice or certifying fictional contractual scope?

### F. Retention / advance

Are the distinctions strong enough to avoid double-counting earned value, payable and cash?

### G. Accounting coexistence

Can commercial truth stay internally deterministic while AP/payment/job-cost remain externally authoritative, or are we building a second ledger by another name?

### H. Correction / finalization

Can void/reversal/counter-event semantics handle posted/effective errors and closed periods without impossible complexity?

### I. Money / tax / FX / rounding

Are monetary transformations reproducible through award → commitment → change → certification → accounting interface?

### J. Effective dating / concurrency / idempotency

Can policy/config changes and retries/concurrent actions avoid duplicate commitment/change/receipt/certification/export events?

## 9. Burden guardrail

P07 is allowed to be the **single XL gravity well**.

FAIL the model if P07/P08 additionally require any independent XL system such as:
- full double-entry GL;
- full AP/cash ledger;
- full inventory/warehouse system;
- owner revenue-contract/change suite;
- generalized claims/legal platform;
- bespoke accounting connector for every first deployment.

Integration primitives, event authority, reconciliation and commercial projections are allowed only as bounded support for the procurement/commercial core.

## 10. ADRs intentionally unresolved

- ADR-0004 PO/Subcontract physical model;
- ADR-0005 commercial/accounting ownership seam;
- ADR-0011 budget authority/timing;
- ADR-0014 provenance depth;
- ADR-0015 posting/finalization/reversal/correction;
- ADR-0018 workflow-financial seam;
- ADR-0019 effective dating;
- ADR-0020 in-flight config binding;
- ADR-0021 field-level integration authority/staleness;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 numbering/concurrency/fiscal semantics.

Reviewer must identify if this packet has silently decided any of these in practice.

## 11. Primary evidence still required later

Blind contractor evidence must test:
- what actually creates PO/subcontract commercial commitment;
- original vs revised contract truth;
- variation workflow;
- goods receipt/GRN authority;
- claim/valuation/certification practice;
- retention/advance/recoupment;
- invoice/payment/accounting authority;
- correction of already approved/posted commercial errors.

Secondary references cannot close those evidence requirements.

## 12. Reviewer output contract

Return only:

### BLOCKERS
For each:
- exact concept/seam;
- why structural;
- minimum correction.

### OBJECT COLLAPSES
Candidate concepts that should be events/value objects/projections rather than durable aggregates, provided invariants survive.

### SECOND-LEDGER CHECK
Choose one:
- `CLEAN — bounded commercial truth + accounting coexistence remains coherent`
- `FAIL — exact duplicate-ledger mechanism`

### PO/SUBCONTRACT CHECK
Choose one:
- `CLEAN — common semantic layer does not prematurely close ADR-0004`
- `FAIL — exact false-unification mechanism`

### P1.1 REOPEN?
`NO` or exact frozen assumption requiring reopening.

### VERDICT
Choose exactly one:
- `PASS — P07/P08 coherent; carry forward to structural architecture`
- `FAIL — remediate blocker(s) before structural architecture`

Be hostile. Prefer deletion/simplification where the commercial/audit invariants survive.
