# P1.2 Review B — Commercial Core + Accounting Seam Packet v0.2

**Status:** READY FOR EXTERNAL HOSTILE REVIEW B  
**Prerequisite:** Sourcing Review A PASS  
**Scope:** P07A–P07D + P08  
**Evidence posture:** SECONDARY_REFERENCE / PROVISIONAL / PRIMARY AUDIT LATER  
**Purpose:** hostile structural critique of the single intended XL commercial gravity well and its accounting-coexistence seam.

## 1. Review A prerequisite — now PASS

Sourcing Review A returned:

`PASS — sourcing subgraph coherent; proceed to downstream external Review B`

Closed upstream findings include B1–B6 and BL-01/BL-02.

Binding upstream assumptions for this review:
- supplier economic truth is immutable/versioned;
- internal evaluation basis is distinct from supplier-confirmed contractable basis;
- AwardDecision is internal selection/authorization, not authoritative committed cost;
- one RequirementAllocation lineage owns requirement-scope consumption;
- hard scope/quantity conservation is separate from price/budget governance;
- authorized requirement basis may be owned by DemandLine or PlannedRequirement under the same semantic change-control contract;
- no duplicate active authority over the same exclusive declared scope;
- basis reduction cannot become effective below unresolved existing exposure;
- while a reduction target is unresolved, no new allocation consumption **or commitment binding** may exploit the prior basis where inconsistent with that target;
- value variance does not expand authorized procurement scope.

ADR-0003 remains open physically. ADR-0004 remains open.

## 2. P07A — commitment formation / original effective baseline

### Semantic role

`Commitment` means the contractual/commercial obligation role shared by PO-like and subcontract/service paths.

It does **not** decide whether persistence is:
- separate PurchaseOrder/Subcontract aggregates;
- common supertype;
- composition;
- another model.

### Candidate formation seam

`AwardDecision`
`+ approved contractable_agreed_basis`
`+ backed active RequirementAllocation leaf/leaves`
`+ contract/PO/subcontract formation evidence`
`+ required authority / technical / compliance conditions`
`→ prepared commitment`
`→ policy/evidence-defined effectiveness event`
`→ EFFECTIVE_COMMITMENT_BASELINE`

### Baseline invariants

1. award approval alone does not create authoritative committed cost;
2. baseline references exact supplier-confirmed approved commercial basis;
3. buyer-only evaluation adjustments cannot enter contractual baseline;
4. original effective baseline is immutable historical truth;
5. commitment binds existing RequirementAllocation scope rather than creating a parallel allocation ledger;
6. unresolved sourcing basis reduction may block new commitment binding under Review A CR-01;
7. project/legal entity/counterparty/currency/tax/cost-attribution basis is reproducible;
8. formation preserves actor/time/authority/evidence;
9. stale award/technical/compliance conditions are revalidated at formation;
10. later current position never rewrites original baseline.

Candidate projection:

`Current Approved Commitment = Original Effective Baseline + Effective Approved Changes`

Pending/proposed changes remain separate exposure/forecast.

## 3. P07B — controlled commitment change / variation

Required distinctions:
- potential issue/change;
- proposed/requested change;
- priced/negotiated/under-review state;
- approved change;
- effective contractual change;
- rejected/cancelled change;
- correction/reversal of effective history.

Binding rules:
1. original baseline never changes;
2. effective changes append to history;
3. current approved commitment includes only effective approved changes;
4. pending changes may affect exposure/forecast but not current contractual value;
5. positive, negative, zero-value and time-only changes must be representable;
6. value-only change does not create procurement-scope capacity;
7. added quantity/scope requires effective authorized requirement-basis expansion before added allocation/commitment scope;
8. reduction/change must respect existing allocation/exposure lineage;
9. effective change correction uses void/reversal/counter-event semantics rather than destructive edit;
10. accounting acceptance/posting is distinct unless an external system is explicitly authoritative for the affected fact.

## 4. P07C — goods receipt / GRN / invoice-match seam

Required distinction:

`Delivery ≠ Receipt ≠ Acceptance ≠ Supplier Invoice ≠ Payment`

Candidate flow:

`effective PO-like commitment line`
`→ delivery occurrence`
`→ GoodsReceipt`
`→ inspect / accept / reject / partial accept`
`→ accepted / rejected / returned position`
`→ invoice-match eligibility/interface`
`→ AP/accounting processing`
`→ payment mirror/reference where externally authoritative`

Invariants:
1. partial receipt is first-class;
2. rejection/damage/return preserves history;
3. accepted quantity, not supplier invoice, drives procurement fulfillment;
4. receipt references effective commitment line/version and project/location context;
5. over-receipt cannot silently expand authorized procurement scope;
6. free-form/non-stock items remain receivable;
7. full inventory/warehouse ownership is not required;
8. 2-way/3-way match is policy/interface behavior, not proof procurement owns AP;
9. invoice/payment cannot rewrite receipt history;
10. accounting integration state is separate from receipt state.

## 5. P07D — subcontract/service valuation / certification / retention / advance

Required distinction:

`Supplier Claim ≠ Buyer Assessment ≠ Certification ≠ Invoice ≠ Payment`

Candidate flow:

`effective subcontract/service baseline + effective changes + SOV/work breakdown`
`→ ProgressClaim`
`→ ValuationAssessment`
`→ CertificationDecision`
`→ certified gross earned value`
`→ retention / advance recoupment / deductions / payable components`
`→ invoice/AP interface`
`→ payment mirror/reference`

Invariants:
1. supplier claim is not authoritative earned value;
2. buyer assessment may differ and both histories survive;
3. certification is the governed earned-value event;
4. certified gross resolves against the effective contractual/SOV basis or another explicit contractual valuation mechanism;
5. pending/unapproved variation cannot silently become ordinary approved contractual work;
6. previous/current/cumulative certification derives from event history;
7. retention is earned-but-withheld payable, not unearned scope;
8. advance is funding, not earned value;
9. recoupment reduces payable/cash position, not gross earned value;
10. payment/compliance hold does not rewrite certification truth;
11. finalized certification correction uses reversal/counter-certification or another explicit non-destructive corrective event;
12. final certification/closeout cannot erase interim history.

## 6. P08 — commercial position + accounting/ERP authority seam

Goal:

Own enough contractual/commercial truth to answer procurement exposure while **not becoming a second accounting ERP**.

### Authority modes

For each shared master/field/event:
- `OWN` — platform authoritative;
- `MIRROR` — external authority, synchronized local copy allowed;
- `REFERENCE` — externally mastered context/reference only.

Authority is field/event specific.

### Integration lifecycle

`commercial/domain event`
`→ queued/exportable`
`→ exported`
`→ external accepted/posted | rejected`
`→ external identity/status returned`
`→ reconciled | mismatch | stale`

No generic `synced=true` truth.

### Reconciliation evidence

Track as applicable:
- source event/version;
- external system/company/project identity;
- payload/version/idempotency key;
- export attempts;
- external acceptance/posting identity/time;
- rejection/error;
- last refresh;
- authority direction;
- field/event conflict;
- reconciliation disposition;
- correction/re-export lineage.

### Commercial positions

Internally reconstructable positions may include:
- original effective commitment;
- effective approved changes;
- current approved commitment;
- pending change exposure separately;
- accepted goods / remaining goods scope;
- certified subcontract gross;
- retention held/released;
- advance/recoupment position where source authority permits;
- invoice/payment/job-cost only to configured authority depth.

External figures displayed locally must expose authority/freshness.

## 7. Cross-process truth ownership

| Truth | Candidate owner |
|---|---|
| supplier offer / negotiated commercial basis | BidSubmission lineage |
| internal comparison/evaluation | ComparisonSnapshot / EvaluationAdjustment |
| approved supplier-agreed award basis | AwardDecision.contractable_agreed_basis |
| original effective contractual value | P07A effective baseline |
| effective contractual change | P07B change events |
| current approved commitment | derived from baseline + effective changes |
| goods receipt/acceptance | P07C receipt events |
| subcontract certified gross | P07D certification events |
| retention/advance/recoupment | derived from explicit contractual/certification/funding events |
| AP/payment/job-cost posting | P08 authority map — OWN only where explicit, otherwise MIRROR/REFERENCE |

No generic `current_amount` replaces these layers.

## 8. Known internal watches — attack explicitly

The internal golden-thread run produced `FAIL_INTERNAL = 0`, but four commercial-core watches remain.

### W01 — over-receipt / surplus acceptance

Test the relation among:
- authorized requirement quantity;
- effective commitment quantity;
- physically received quantity;
- accepted surplus/tolerance quantity.

Do not weaken hard sourcing allocation conservation merely because real suppliers may over-deliver.

Question: what is the minimum deterministic mechanism for acceptable receipt variance without requiring demand/PO amendment for every trivial physical variance and without letting receipt expand authorized procurement scope?

### W02 — remeasurement / provisional sums / dayworks / instructed-but-unagreed work

Real subcontract valuation may include:
- remeasured quantities;
- provisional sums;
- dayworks;
- instructed work whose final variation value is not yet agreed.

Attack whether P07D's certification ceiling is too rigid or its `explicit contract mechanics` escape is too vague.

The model must support legitimate valuation without turning a generic bypass into fictional contractual scope.

### W03 — ERP rejection / correction direction

When external ERP rejects or disagrees with exported commercial data, distinguish:
- local commercial truth correction;
- externally mastered field returned as authority;
- connector/mapping/config error that should not mutate the commercial transaction;
- closed/external-period restriction.

Attack whether OWN/MIRROR/REFERENCE is sufficient or needs a stronger field/event-authority contract.

### W04 — correction event taxonomy

Test whether one generic reversal primitive can safely cover:
- commitment change correction;
- receipt correction;
- certification correction;
- accounting export/reconciliation correction;
- cost-attribution reclassification.

Prefer shared correction invariants, but do not erase domain-specific economic meaning.

## 9. Critical seams to attack

A. **Award → effective commitment** — can effectiveness be deterministic without pretending to decide jurisdiction-specific contract law?

B. **PO/Subcontract commonality** — do shared invariants help without forcing one unnatural aggregate?

C. **RequirementAllocation boundary** — has P07 turned scope conservation into budget/receipt/earned-value/accounting ledger?

D. **Change basis** — do value-only, scope-changing, negative and time-only changes remain coherent?

E. **Certification ceiling** — can legitimate non-fixed-price mechanisms be certified without making pending commercial exposure equal approved contract value?

F. **Retention/advance/payable** — any double counting across earned, withheld, funded, payable and paid positions?

G. **Accounting coexistence** — is internal commercial truth coherent while accounting posting remains external, or is P08 a duplicate ledger?

H. **Correction/finalization** — can corrections and closed periods be represented without destructive history or generalized event-sourcing fantasy?

I. **Money / tax / FX / rounding** — can award→baseline→change→certification→accounting be reproduced at each historical decision point?

J. **Effective dating / concurrency / idempotency** — can retries/policy changes/concurrent actions avoid duplicate commitments, changes, receipts, certifications and exports?

K. **Review A CR-01 interaction** — does pending authorized-basis reduction correctly prevent new inconsistent allocation/commitment while allowing governed contractual reduction of existing exposure?

## 10. Burden guardrail

P07 is allowed to be the **single XL gravity well**.

FAIL if P07/P08 additionally require an independent XL:
- double-entry GL;
- full AP/cash ledger;
- full inventory/warehouse ERP;
- owner revenue/change suite;
- generalized legal/claims platform;
- bespoke deep accounting connector before first live tender.

Bounded commercial events, projections, field authority and reconciliation are allowed only to protect procurement/commercial truth.

## 11. ADRs intentionally unresolved

- ADR-0004 PO/Subcontract physical model;
- ADR-0005 commercial/accounting ownership seam;
- ADR-0011 budget authority/timing;
- ADR-0014 provenance depth;
- ADR-0015 posting/finalization/reversal/correction;
- ADR-0018 workflow-financial seam;
- ADR-0019 effective dating;
- ADR-0020 in-flight config binding;
- ADR-0021 field/event integration authority/staleness;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 numbering/concurrency/fiscal semantics.

Identify any ADR silently decided in practice.

## 12. Primary evidence remains mandatory later

Blind contractor evidence must test:
- what actually forms PO/subcontract obligation;
- original/current contract truth;
- variations/change;
- goods receipt/GRN authority;
- subcontract measurement/assessment/certification;
- retention/advance/recoupment;
- invoice/payment/accounting ownership;
- correction of already approved/posted errors.

Secondary reference cannot close this gate.

## 13. Reviewer output contract

Return only:

### BLOCKERS
For each:
- exact concept/seam;
- why structural;
- minimum correction.

### KNOWN WATCH VERDICTS
Return W01, W02, W03, W04 each as:
- `CLOSED / NON-BLOCKING`
- `BLOCKER — exact defect`
- `PRIMARY-EVIDENCE WATCH — structurally safe but field validation required`

### OBJECT COLLAPSES
Candidate concepts that should collapse to events/value objects/projections where truth invariants survive.

### SECOND-LEDGER CHECK
Choose one:
- `CLEAN — bounded commercial truth + accounting coexistence remains coherent`
- `FAIL — exact duplicate-ledger mechanism`

### PO/SUBCONTRACT CHECK
Choose one:
- `CLEAN — common semantic layer does not prematurely close ADR-0004`
- `FAIL — exact false-unification mechanism`

### REVIEW A REGRESSION?
`NO`, or exact sourcing invariant contradicted by P07/P08.

### P1.1 REOPEN?
`NO`, or exact frozen assumption requiring reopening.

### VERDICT
Choose exactly one:
- `PASS — P07/P08 coherent; proceed to Review C`
- `FAIL — remediate blocker(s) before Review C`

Be hostile. Prefer deletion/simplification wherever contractual, commercial and audit invariants survive.