# P1.2 — P07/P08 Commercial Core Checkpoint v0.2

**Status:** REVIEW B REMEDIATED / INTERNAL RECHECK REQUIRED / NOT FROZEN  
**Supersedes:** `P1_2_P07_COMMERCIAL_CORE_CHECKPOINT_V0_1.md` for current provisional P07/P08 interpretation.  
**Upstream:** Sourcing Review A PASS remains binding.

## 1. Current commercial architecture in one view

The commercial core now separates five dimensions that the prior model partially conflated:

1. **terms/rate authority** — may govern future obligations without itself creating committed exposure;
2. **committed obligation** — an effective call-off/PO/subcontract/service obligation that binds authorized procurement scope;
3. **scope/quantity basis** — whether quantity is firm, remeasurable, or scope is non-quantified;
4. **valuation basis** — how monetary earned/fulfilled value is determined;
5. **fulfillment mechanism** — how performance/receipt is evidenced, with multiple mechanisms allowed in one commitment.

These are semantic contracts only. ADR-0004 physical entity design remains open.

---

## 2. Terms authority → obligation

Candidate graph:

`CommercialTermsAuthority`
`→ one or more call-off/release/order obligations`

A terms authority may hold:
- rates/formulas;
- terms;
- validity;
- category/scope applicability;
- call-off rules;
- commercial evidence/version.

It consumes no RequirementAllocation and creates no committed-cost exposure **unless its own contract establishes a binding minimum**.

Each effective call-off/obligation:
- references applicable terms-authority version;
- has independent formation evidence;
- binds existing RequirementAllocation leaves;
- creates its own immutable original baseline;
- changes/fulfills/closes independently.

A binding minimum in a framework is represented as obligation exposure, not hidden inside non-consuming rate authority.

---

## 3. Commitment scope/quantity basis

At commitment line/scope-segment grain:

### `FIRM_QUANTITY`
Contractual quantity is fixed in governed UOM.

### `REMEASURABLE_QUANTITY`
Scope/rate basis is contractual; starting quantity is estimated/provisional and may remeasure under contract without a variation merely because actual measurement differs.

Hard procurement authorization must bind to:
- scope partition; and/or
- a genuine governed maximum/cap where one exists.

Estimated BOQ quantity is not automatically a hard allocation ceiling.

### `NON_QUANTIFIED_SCOPE`
Lump-sum/milestone/service scope where scope partition/deliverable identity is the hard dimension.

No fabricated quantities.

---

## 4. Valuation basis

Valuation basis is orthogonal to quantity basis.

Candidate mechanisms:
- `FIRM_LUMP_SUM`;
- `UNIT_RATE_REMEASUREMENT`;
- `PROVISIONAL_SUM_ALLOWANCE`;
- `DAYWORK`;
- `MILESTONE`;
- `RATE_BASED_SERVICE`.

No generic `explicit contractual mechanism` escape is allowed without a named basis and evidence.

### Provisional sum handling

A provisional sum/allowance may be part of the original contractual amount while still not representing earned work.

Preserve separately:
- original allowance amount;
- instructed/authorized draw or replacement scope;
- valuation basis for actual executed work;
- amount consumed/valued against allowance;
- remaining allowance projection;
- approved overrun/change where actual authorized value exceeds applicable allowance/authority.

Allowance value is not procurement-scope capacity and not earned value.

---

## 5. Instructed but commercially unagreed work

`AuthorizedWorkInstruction` is a governed scope/work authority, not final supplier price agreement.

Candidate flow:

`effective commitment`
`→ AuthorizedWorkInstruction`
`→ [effective requirement-basis expansion if scope genuinely expands]`
`→ work proceeds`
`→ measurement/assessment under named contractual valuation basis`
`→ provisional/interim certification where contract permits`
`→ supplier agreement / governed final valuation`
`→ effective commitment change / reconciliation`

Rules:
- no fake supplier-agreed price is created at instruction time;
- scope expansion must have valid authority before new scope consumption;
- no basis expansion is invented when instructed measurement remains inside already-authorized remeasurable scope;
- provisional certification must reference the instruction and explicit valuation authority;
- final agreement reconciles prior provisional valuations non-destructively.

---

## 6. Fulfillment mechanisms

P07C and P07D are mechanisms, not mutually exclusive commitment types.

At line/SOV/milestone/scope-segment grain, allow one or more:
- `GOODS_RECEIPT`;
- `PROGRESS_VALUATION`;
- `MILESTONE_CERTIFICATION`;
- `RATE_BASED_SERVICE`;
- `DELIVERABLE_ACCEPTANCE`.

A mixed commitment can combine them.

### Anti-double-counting

Where one event supports another mechanism, economic value must not be earned twice.

Example stored material:
- GoodsReceipt proves physical receipt/storage;
- certification may recognize stored-material value;
- later installation certification must transfer/reclassify/complete the same economic component, not certify that material value again.

Exact cross-mechanism matching belongs to P1.5, but one-economic-value-once is binding now.

---

## 7. Quantity tolerance

For quantitative authorized requirement basis:

- `nominal_quantity`;
- optional governed tolerance rule;
- derived `authorized_quantity_ceiling`.

Hard allocation conservation uses the ceiling.

Downstream commitment/receipt tolerance may be narrower but may never exceed upstream authorization.

`accepted cumulative <= commitment permitted <= authorized requirement ceiling`

Tolerance consumed above nominal remains separately visible.

A tolerance is pre-authorized scope, not a receipt-time override.

---

## 8. Certification truth

Replace the old universal ceiling:

`cumulative certified gross <= current approved line value`

with the more precise rule:

> Every certified amount must trace to an effective contractual value basis or to a named effective contractual valuation authority for remeasured, allowance, daywork or instructed scope.

For firm-price work, current effective approved contract value remains the hard value ceiling.

For remeasurement:
- quantity may resolve by governed measurement;
- applicable rate/formula is fixed/effective under contract;
- contractual caps/limits remain enforceable where present.

For instructed-unagreed work:
- scope/instruction authority is effective;
- price remains provisional/unagreed;
- certification follows named valuation rule;
- later final agreement reconciles previous provisional certification.

Supplier claim remains distinct from buyer assessment and certification.

---

## 9. Commercial position projections

Canonical internally reconstructable layers may include:
- terms/rate authority status;
- original effective obligation baseline;
- effective approved changes;
- current approved commitment;
- instructed/unagreed exposure separately;
- pending change exposure;
- accepted goods;
- certified gross under each valuation basis;
- retention/advance/recoupment projections;
- allowance consumed/remaining;
- externally authoritative AP/payment/job-cost mirrors.

No independently edited current balance is allowed.

---

## 10. Integration disposition

`OWN/MIRROR/REFERENCE` controls authority.

Transmission/error handling additionally classifies:
- `DATA_DEFECT`;
- `TRANSPORT_OR_MAPPING_DEFECT`;
- `TEMPORAL_RESTRICTION`;
- `EXTERNAL_AUTHORITY_RETURN`.

Transport/mapping failure must not mutate commercial truth.

External-authority return resolves under the field/event authority contract rather than last-write-wins.

---

## 11. Correction semantics

Shared correction invariants:
- target/version;
- reason/evidence;
- authority;
- effective date;
- history preservation;
- idempotency;
- replacement/adjustment linkage.

Domain modes may include:
- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical reversal;
- reclassification;
- non-domain integration correction.

No universal economic reversal primitive is assumed.

---

## 12. Object posture

### Keep semantic distinction, physical form open
- supplier claim;
- buyer assessment;
- certification;
- terms authority;
- committed obligation;
- work instruction;
- valuation basis;
- fulfillment mechanism.

### Default to state/value/projection unless evidence requires independent aggregate
- prepared commitment;
- accepted/rejected/returned current position;
- retention outstanding;
- advance outstanding;
- allowance remaining;
- integration stage/status.

`ValuationAssessment` remains semantically distinct but its persistence can collapse later if no independent review/version lifecycle is needed.

---

## 13. Review A compatibility

Review A remains intact:
- RequirementAllocation conserves procurement scope only;
- remeasurable estimated quantity is not mislabeled as hard authorization;
- scope-expanding instruction establishes authorized basis before added scope consumption;
- tolerance ceiling is upstream authorization, not downstream override;
- call-offs consume scope; non-consuming terms authority does not;
- no new allocation consumption/commitment may conflict with unresolved reduction target.

No sourcing regression is intentionally introduced.

---

## 14. ADR posture

- ADR-0004 OPEN — physical composition of PO/Subcontract/Framework/CallOff/service/mixed fulfillment;
- ADR-0005 OPEN — commercial/accounting ownership;
- ADR-0011 OPEN — budget authority;
- ADR-0015 OPEN — correction physical model;
- ADR-0018 OPEN — workflow/financial-state seam;
- ADR-0019/0020 OPEN — effective dating/config binding;
- ADR-0021 OPEN — integration authority/staleness;
- ADR-0022 OPEN — money/rounding/calculation order;
- ADR-0023 OPEN — concurrency/idempotency/numbering.

**P1.1 REOPEN: NO.**

---

## 15. Gate

P07/P08 remain provisional until a narrow Review B recheck confirms BL-03–BL-06 and W01–W04 are structurally closed.

Review C remains blocked until that PASS.
