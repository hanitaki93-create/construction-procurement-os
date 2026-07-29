# P1.2 — P07/P08 Commercial Core Checkpoint v0.4

**Status:** **REVIEW B PASS / PROVISIONAL / PRIMARY AUDIT LATER / NOT FROZEN**  
**Supersedes:** `P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_3.md` for current provisional interpretation.  
**Upstream:** Review A sourcing PASS remains binding.

## 1. Review B result

External hostile review returned:

`PASS — P07/P08 coherent; proceed to Review C`

Closed:
- BL-03 through BL-08;
- W01 through W04;
- second-ledger check CLEAN;
- Review A regression NO;
- P1.1 reopen NO.

## 2. Current commercial-core semantic dimensions

P07/P08 keeps these concerns orthogonal:

1. **commercial terms authority** — rates/terms/formulas governing possible future obligations;
2. **committed obligation** — effective call-off/PO/subcontract/service obligation;
3. **scope/quantity basis** — firm quantity, remeasurable quantity, or non-quantified scope;
4. **valuation basis** — lump sum, unit-rate remeasurement, provisional sum, daywork, milestone, rate-based service;
5. **fulfillment mechanism** — receipt, progress valuation, milestone/service/deliverable evidence, composable by segment;
6. **accounting authority/interface** — OWN/MIRROR/REFERENCE plus explicit reconciliation/error disposition.

These are semantic contracts only. ADR-0004 still owns physical entity composition.

## 3. Terms authority / framework / call-off

`CommercialTermsAuthority` may establish:
- rates/formulas;
- commercial terms;
- validity;
- scope/category applicability;
- call-off/release rules;
- contractual minimums/capacity conditions;
- version/evidence.

Ordinary terms authority does not by itself consume RequirementAllocation scope.

Each effective call-off/release/order:
- references exact terms-authority version;
- has independent formation/effectiveness evidence;
- binds backed RequirementAllocation scope;
- creates an immutable original obligation baseline;
- changes/fulfills/closes independently.

### Scope-backed minimum

When a binding minimum identifies authorized physical/business scope:
- reserve capacity on the existing RequirementAllocation lineage;
- call-offs draw down `reserved-not-called` into `called/committed`;
- call-off does not create second consumption;
- residual reservation at expiry/termination requires governed disposition.

Conservation conceptually remains:

`unreserved + reserved-not-called + called/committed <= effective authorized basis ceiling`

### Monetary minimum

When a binding minimum is spend/take-or-pay/fixed-fee exposure without fixed physical scope:
- preserve contractual/commercial exposure;
- do not invent RequirementAllocation scope;
- qualifying call-off value reduces outstanding monetary exposure per contract rule;
- residual settlement is commercial/accounting exposure, not procurement fulfillment.

### Dual minimum

One agreement may contain **both** scope-backed and monetary minimums.

The same call-off may:
- draw down scope reservation; and
- reduce monetary-minimum exposure.

The two relations are governed separately and are not mutually exclusive.

## 4. Scope / quantity conservation

### `FIRM_QUANTITY`

Fixed contractual quantity in governed UOM.

### `REMEASURABLE_QUANTITY`

Estimated quantity may vary through governed measurement without fake variation.

No unconserved state exists:
- use genuine governed quantity/cap when one exists; otherwise
- mandatory `SCOPE_PARTITION_BASIS` carries hard conservation.

Estimated BOQ quantity is planning/valuation metadata when it is not genuine authorization.

### `NON_QUANTIFIED_SCOPE`

Lump-sum/milestone/service/deliverable scope conserves through explicit scope partition/deliverable identity.

Review A conservation remains binding in all cases.

## 5. Valuation basis

Valuation basis is independent of quantity basis.

Candidate mechanisms:
- `FIRM_LUMP_SUM`;
- `UNIT_RATE_REMEASUREMENT`;
- `PROVISIONAL_SUM_ALLOWANCE`;
- `DAYWORK`;
- `MILESTONE`;
- `RATE_BASED_SERVICE`.

Every certified amount must trace to:
- effective contractual value basis; or
- named effective contractual valuation authority.

No generic bypass.

## 6. Instructed but unagreed work

`AuthorizedWorkInstruction` is work/scope authority, not final supplier price.

Where an effective instruction adds scope and the issuer has authority to authorize that expansion:

> the instruction itself is the effective source event for authorized requirement-basis expansion.

No artificial second approval exists solely to create allocation capacity.

Where work remains inside already-authorized remeasurable/non-quantified scope, no fake basis expansion occurs.

Prior to final agreement:
- price remains provisional/unagreed;
- valuation/certification requires a named contractual valuation authority;
- later supplier-agreed change reconciles prior provisional valuation non-destructively.

Where external contractual effect and internal DOA diverge, preserve real instruction/exposure plus governance exception; do not falsify authority or supplier price.

## 7. Composable fulfillment / common economic base

A commitment may use one or more fulfillment mechanisms at applicable scope grain:
- `GOODS_RECEIPT`;
- `PROGRESS_VALUATION`;
- `MILESTONE_CERTIFICATION`;
- `RATE_BASED_SERVICE`;
- `DELIVERABLE_ACCEPTANCE`.

Every value-contributing mechanism for the same commercial scope resolves against a **common economic base**.

The model must identify at least semantically:
- economic component identity;
- contractual/valuation basis;
- value already recognized;
- whether another mechanism is evidence/transition of the same value or a separately earnable component.

One economic component cannot be earned twice.

P1.5 still decides physical persistence/matching grain.

## 8. Quantity tolerance

Authorized quantitative basis version preserves:
- nominal quantity;
- authoritative UOM;
- tolerance rule/type/direction;
- precision;
- rounding-policy reference;
- derived hard ceiling;
- version/effective date/provenance.

Hard relation:

`accepted cumulative <= effective commitment permitted <= authorized requirement ceiling`

Tolerance is pre-authorized scope.

A proposed basis reduction recalculates/redefines tolerance explicitly and obeys Review A downward-reconciliation + CR-01 before becoming effective.

ADR-0022 retains physical rounding architecture, but deterministic policy is mandatory because the ceiling participates in hard conservation.

## 9. Accounting / integration seam

Authority remains field/event specific:
- `OWN`;
- `MIRROR`;
- `REFERENCE`.

Error/rejection disposition remains orthogonal:
- `DATA_DEFECT`;
- `TRANSPORT_OR_MAPPING_DEFECT`;
- `TEMPORAL_RESTRICTION`;
- `EXTERNAL_AUTHORITY_RETURN`.

Transport/config errors never mutate commercial truth just to make synchronization pass.

Correction shares invariants but not one universal economic primitive. Domain modes may include:
- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical reversal;
- reclassification;
- non-domain integration correction.

## 10. Second-ledger guard

Derived/event-backed positions may include:
- current approved commitment;
- retention outstanding;
- advance outstanding/recoupment;
- allowance remaining;
- scope-backed framework reserved-not-called;
- monetary-minimum outstanding exposure;
- integration status;
- accepted/rejected/returned fulfillment positions.

No independently editable balance may compete with underlying contractual/commercial/accounting authority.

## 11. Review A compatibility

Review A remains intact:
- one RequirementAllocation lineage;
- hard conservation always exists;
- reservation/call-off uses that same lineage;
- monetary minimum creates no fake scope;
- valid scope-adding instruction establishes basis authority before added consumption;
- tolerance belongs to basis version;
- unresolved basis reduction blocks conflicting new allocation consumption and commitment binding.

## 12. Open ADRs

Still open:
- ADR-0004 PO/Subcontract/Framework/CallOff physical model;
- ADR-0005 commercial/accounting ownership;
- ADR-0011 budget authority;
- ADR-0015 posting/finalization/correction model;
- ADR-0018 workflow-financial seam;
- ADR-0019/0020 effective dating/config binding;
- ADR-0021 integration authority/staleness;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 concurrency/idempotency.

**P1.1 REOPEN: NO.**

## 13. Gate

Review B is closed for progression.

Next external gate:

**Review C — P09–P12 + complete P01–P12 graph/burden/completeness.**

P1.2 still cannot formally close until the primary-evidence gate is satisfied.
