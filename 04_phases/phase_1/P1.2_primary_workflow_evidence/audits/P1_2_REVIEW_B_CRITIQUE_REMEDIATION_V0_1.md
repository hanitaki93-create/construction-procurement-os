# P1.2 — Review B Commercial-Core Critique Remediation v0.1

**Status:** BL-03–BL-06 REMEDIATED / REVIEW B NARROW RECHECK REQUIRED / NOT FROZEN  
**Prior external verdict:** `FAIL — remediate blocker(s) before Review C`  
**Scope:** P07A–P07D + P08 only. Review A sourcing PASS remains binding.

## 1. Independent disposition

| Finding | Disposition | Architecture decision |
|---|---|---|
| BL-03 framework/rate agreements + call-offs | ACCEPT | Separate non-consuming commercial terms/rate authority from consuming committed obligation/call-off. |
| BL-04 firm-quantity assumption | ACCEPT DIAGNOSIS / MODIFY TAXONOMY | Add orthogonal **scope/quantity basis** and **valuation basis**. `PROVISIONAL_SUM` is not treated as a quantity-basis type. |
| BL-05 instructed-but-unagreed work | ACCEPT DIAGNOSIS / GENERALIZE CURE | Governed instruction can establish scope authority before final commercial agreement; valuation may proceed under explicit contract rule while final change value remains unresolved. |
| BL-06 P07C/P07D type bifurcation | ACCEPT | Receipt/valuation/milestone/rate-service become composable fulfillment mechanisms at line/scope-plan grain, not mutually exclusive commitment types. |
| W01 over-receipt tolerance | ACCEPT WITH REFINEMENT | Authorized basis version may include a nominal quantity plus an explicit authorized tolerance ceiling. Receipt policy may be narrower but cannot exceed that ceiling. |
| W03 integration rejection taxonomy | ACCEPT | Add disposition taxonomy separate from field authority. |
| W04 correction taxonomy | ACCEPT | Share correction invariants, not one universal correction primitive. |
| ValuationAssessment collapse | DEFER PHYSICAL COLLAPSE | Semantic distinction remains mandatory; P1.5 may collapse to a versioned value object/stage only if independent assessment lifecycle is unnecessary. |

No P1.1 reopening is proposed.

---

## 2. BL-03 — commercial terms authority vs committed obligation

The prior model treated formation mainly as:

`AwardDecision → effective commitment baseline`

This does not cover agreements that establish commercial terms/rates without creating committed quantity/value exposure.

### 2.1 CommercialTermsAuthority

Introduce a provisional semantic role `CommercialTermsAuthority` for an effective agreement that may establish:
- legal counterparties;
- scope/category applicability;
- rates/prices or price formula;
- commercial terms;
- validity period;
- minimum/maximum or capacity conditions where present;
- tax/currency basis;
- call-off/release rules;
- governing document/evidence;
- effective date/version/change history.

Examples may include framework, blanket, annual rate or term agreements.

**Critical invariant:** an effective `CommercialTermsAuthority` does **not by itself consume RequirementAllocation scope and does not by itself create authoritative committed cost** unless its specific terms create a binding minimum obligation.

If an agreement contains a guaranteed minimum/committed volume, that binding minimum is modeled as committed obligation exposure separately from the non-consuming rate/terms authority.

### 2.2 Call-off / release obligation

A call-off/release/order under a terms authority is a fresh committed obligation when its formation condition is met.

Candidate flow:

`CommercialTermsAuthority`
`+ active/backed RequirementAllocation leaf/leaves`
`+ call-off scope/quantity/delivery basis`
`+ applicable approval/authority`
`→ effective committed obligation baseline`

Each call-off:
- references the exact effective terms-authority version/rate basis;
- binds allocation scope only for the call-off obligation;
- has its own formation/effectiveness evidence;
- may later change/fulfill independently;
- must not mutate the framework/rate authority merely to record ordinary call-off execution.

### 2.3 ADR-0004 obligation

ADR-0004 remains open and must later decide how physical PO/Subcontract/Framework/CallOff structures compose.

The architecture now explicitly records **call-off multiplicity and non-consuming rate authority as unresolved physical-model concerns**, rather than resolving them by omission.

---

## 3. BL-04 — separate scope/quantity basis from valuation basis

Claude correctly identified a firm-quantity assumption, but the proposed enum `FIRM / REMEASURABLE / PROVISIONAL_SUM` mixes two dimensions.

P1.2 therefore establishes two orthogonal semantic contracts.

### 3.1 Commitment scope / quantity basis

At commitment-line or governed scope-segment grain, declare one of the candidate basis semantics:

#### `FIRM_QUANTITY`
A fixed contractual quantity in a governed UOM.

- quantity is contractual baseline truth;
- ordinary fulfillment/certification cannot exceed the effective firm quantity except through an authorized contract/scope mechanism;
- Review A scope conservation remains binding.

#### `REMEASURABLE_QUANTITY`
The contract fixes scope + unit/rate method while baseline quantities are estimated/provisional for valuation.

- baseline quantity is explicitly not a final contractual earned-quantity ceiling;
- measured actual quantity may differ without creating a P07B variation merely because measurement differs;
- the governing hard procurement authorization must therefore bind to a scope partition and/or an explicit authorized measurement ceiling where one genuinely exists, not pretend an estimated BOQ quantity is hard authorized demand;
- final value derives from actual governed measurement × applicable rate/formula, subject to any contractual caps/limits.

#### `NON_QUANTIFIED_SCOPE`
Lump-sum, milestone, service or other scope where numeric quantity is not the hard contractual dimension.

- scope partition/deliverable identity is load-bearing;
- no fabricated quantity.

A line may contain multiple commercial components, but one field cannot silently change meaning between firm and estimated quantity.

### 3.2 Valuation basis

Separately declare how value is earned/determined. Candidate mechanisms include:

- `FIRM_LUMP_SUM`
- `UNIT_RATE_REMEASUREMENT`
- `PROVISIONAL_SUM_ALLOWANCE`
- `DAYWORK`
- `MILESTONE`
- `RATE_BASED_SERVICE`
- another later-evidenced governed basis.

`PROVISIONAL_SUM_ALLOWANCE` is an allowance/value mechanism, not a quantity-basis type.

Each mechanism must preserve its own rules/evidence/caps and cannot be a generic `explicit mechanism` escape hatch.

### 3.3 Review A interaction

Review A conserves **authorized procurement scope**, not necessarily estimated contract quantities.

For remeasurable work:
- use scope partition as the hard allocation dimension when estimated quantity is not genuinely an authorization ceiling;
- where a real maximum quantity/cap is authorized, preserve it explicitly;
- actual measured quantity affects valuation under contract rules without automatically manufacturing a requirement change.

This keeps sourcing conservation honest rather than loosening it.

---

## 4. BL-05 — governed instructed work before final commercial agreement

The previous pair of rules could block real work where scope is instructed before final price is agreed.

### 4.1 Instruction authority is distinct from final commercial agreement

Introduce a provisional semantic role `AuthorizedWorkInstruction`.

It records an instruction that, under the governing contract/authority policy, is sufficient to authorize specified work/scope to proceed even though final commercial value may still be unresolved.

Preserve:
- instruction identity/version;
- issuing authority/actor;
- affected commitment/scope;
- exact scope delta or instructed work;
- instruction effective date/time;
- contractual clause/rule/policy basis;
- provisional/estimated value if available, explicitly non-final;
- valuation basis to use pending agreement;
- linked RequirementAllocation/basis effect;
- later supplier quotation/agreement/change lineage.

### 4.2 Scope interaction

If the instruction adds procurement scope beyond the current authorized basis, the instruction may serve as the governed source event for an **effective authorized requirement-basis expansion** before work is consumed, provided the issuing authority is valid for that scope expansion.

If the instructed work is already inside an existing remeasurable/non-quantified authorized scope partition, no fake basis expansion is required merely because measured quantity/value changes.

Thus `instruction = basis expansion` is not universal; it depends on whether scope authority actually expands.

### 4.3 Commercial value remains unresolved

Instruction effectiveness does **not** manufacture supplier-agreed final price.

Until agreement:
- commercial state remains instructed/unagreed;
- provisional exposure may be forecast separately;
- executed work may be measured/assessed/certified only under an explicit contractual valuation basis such as agreed schedule rates, contract rate derivation, daywork, QS/fair valuation rule or another evidenced mechanism;
- the eventual agreed change supersedes/reconciles provisional valuation non-destructively.

The later final supplier-agreed value becomes effective contractual change truth under P07B; earlier instructed-work certification remains historical evidence and is reconciled, not erased.

### 4.4 Certification invariant corrected

Replace the simplistic concept:

`certified gross <= current approved line value unless explicit mechanism`

with:

> certified gross must be supported by either (a) current effective contractual value basis, or (b) an effective governed contractual valuation authority for instructed/remeasurable/allowance/daywork scope.

No certification may rely on a generic bypass with no named contractual basis/evidence.

---

## 5. BL-06 — fulfillment mechanism is composable, not commitment type

P07C goods receipt and P07D progress valuation are no longer interpreted as mutually exclusive commitment paths.

### 5.1 FulfillmentPlan / mechanism semantics

At commitment-line, SOV-line, milestone or governed scope-segment grain, assign one or more fulfillment mechanisms where contractually applicable.

Candidate mechanisms:
- `GOODS_RECEIPT`
- `PROGRESS_VALUATION`
- `MILESTONE_CERTIFICATION`
- `RATE_BASED_SERVICE`
- `DELIVERABLE_ACCEPTANCE`
- later evidence-supported mechanism.

A single commitment may combine mechanisms.

Examples:

**Supply-and-install subcontract**
- supply/material segment → GOODS_RECEIPT and potentially stored-material valuation;
- installation segment → PROGRESS_VALUATION;
- testing/commissioning → MILESTONE_CERTIFICATION or PROGRESS_VALUATION.

**Consultancy**
- milestone/deliverable acceptance/certification;
- no GRN required.

**Material-only PO**
- GOODS_RECEIPT.

Entity typing remains open under ADR-0004.

### 5.2 No double fulfillment

Where mechanisms overlap economically, rules must identify whether one event is evidence for another or a separately earnable component.

Stored materials are the obvious cross-mechanism case:
- receipt may prove physical possession;
- certification may recognize stored-material value;
- later installation must not certify the same value twice.

P1.5 must define cross-mechanism anti-double-counting invariants; P1.2 records the requirement now.

---

## 6. W01 — authorized tolerance without weakening conservation

The current P07C phrase `accepted <= effective ordered quantity unless tolerance/change` is under-specified.

### 6.1 Nominal quantity vs authorized ceiling

A quantitative `AuthorizedRequirementBasis` version may define:
- `nominal_quantity`;
- authoritative UOM;
- optional `authorized_tolerance_rule`;
- derived `authorized_quantity_ceiling` under that rule.

Example:

`nominal 100 units + authorized +2% receipt/procurement tolerance → hard ceiling 102 units`

Conservation applies to the explicit authorized ceiling; tolerance is **pre-authorized scope**, not a receipt-time exception.

### 6.2 Narrower downstream policy allowed

A commitment/receipt policy may allow less tolerance than the requirement basis ceiling, but may not authorize more.

Therefore:

`accepted cumulative quantity <= effective commitment permitted quantity <= authorized requirement ceiling`

unless a new effective governed scope authorization changes the ceiling.

This preserves Review A.

Tolerance consumption must be visible separately from nominal requirement fulfillment so routine tolerance does not silently redefine the requested quantity.

---

## 7. W03 — integration rejection disposition taxonomy

Field authority (`OWN/MIRROR/REFERENCE`) remains necessary but is not a transport/error taxonomy.

Each rejection/conflict should additionally receive a disposition such as:

### `DATA_DEFECT`
The authoritative business datum is invalid/incomplete for the target transaction.

- governed correction may change domain truth only where local authority permits;
- preserve correction lineage.

### `TRANSPORT_OR_MAPPING_DEFECT`
Connector/config/mapping/serialization problem.

- fix mapping/transport;
- retry/re-export the same domain truth;
- **must not mutate commercial truth merely to satisfy integration**.

### `TEMPORAL_RESTRICTION`
Closed period, maintenance window, timing constraint or future-effective condition.

- defer/retry or route governance;
- no automatic domain mutation.

### `EXTERNAL_AUTHORITY_RETURN`
Authoritative external field/event differs from local mirror/reference.

- resolve according to authority contract;
- preserve prior local snapshot and returned source evidence;
- do not use last-write-wins.

Taxonomy is orthogonal to transmission status and authority mode.

---

## 8. W04 — shared correction invariants, domain-specific correction modes

Do not introduce one universal `ReverseEvent` primitive for all domains.

All corrections share:
- target identity/version;
- reason/evidence;
- actor/authority;
- effective date;
- non-destructive history;
- idempotency;
- linkage to replacement/adjustment where applicable.

Candidate correction modes:

### `AMEND_NON_ECONOMIC_RECORD`
Clerical metadata correction that does not alter economic/scope truth. Prior value remains auditable.

### `REVERSE_AND_REPLACE`
Effective commercial event is neutralized/replaced through explicit economic counter-event lineage where contract/accounting semantics require it.

### `FORWARD_ADJUST`
Prior finalized period/certificate remains intact; later event carries adjustment.

### `PHYSICAL_REVERSAL`
Receipt/acceptance reversal tied to return/physical disposition where needed.

### `RECLASSIFY`
Attribution changes while economic quantity/value identity is preserved, subject to authority/period controls.

### `NON_DOMAIN_INTEGRATION_CORRECTION`
Mapping/transport/link correction that must not mutate domain truth.

P1.5 may refine names and domain mappings, but the semantics cannot collapse into one generic reversal action.

---

## 9. Object-collapse disposition

### ValuationAssessment

**Do not force physical collapse in P1.2.**

The semantic distinction among supplier claim, buyer assessment and certification remains mandatory. Whether assessment becomes:
- a separate durable record;
- a versioned child/value object;
- a workflow stage inside certification;

must follow evidence about independent QS review/revision lifecycle.

### Prepared commitment

Treat as state/stage of the eventual commitment record unless later evidence requires independent identity.

### Accepted/rejected/returned position

Projection over receipt/physical-disposition events.

### Retention held/released / advance outstanding

Derived projections over contractual terms + certification/funding/release/recoupment events. No independent editable balance.

### Integration lifecycle stages

Event log + projection, not one durable entity per stage.

---

## 10. Second-ledger guard retained

Review B's second-ledger check is accepted as CLEAN provisionally.

Binding conditions:
- retention/advance/recoupment are projections, not independently edited balances;
- AP/payment/job-cost remains governed by explicit field/event authority;
- product commercial truth does not become GL/AP/cash ledger;
- externally authoritative balances remain MIRROR/REFERENCE with freshness/reconciliation.

---

## 11. New/updated commercial-core invariants

1. Terms/rate authority may exist without committed scope/cost exposure.
2. Each effective call-off/obligation consumes allocation independently and references the applicable terms-authority version.
3. Commitment scope/quantity basis and valuation basis are orthogonal.
4. Estimated remeasurable quantity is not automatically hard authorized procurement quantity.
5. Provisional sum is an allowance/valuation mechanism, not a quantity basis.
6. Governed instruction may authorize work before final commercial value agreement.
7. Scope-expanding instruction must establish valid scope authority before new scope is consumed.
8. Instructed/unagreed work may be certified only under a named governed contractual valuation basis.
9. Final agreed change reconciles provisional/instructed valuation non-destructively.
10. Fulfillment mechanisms are composable per line/scope segment; they do not type the entire commitment.
11. Cross-mechanism fulfillment/valuation cannot double-count the same economic work/material value.
12. Authorized tolerance is part of the effective requirement authorization ceiling, not a receipt-time override.
13. Receipt policy cannot exceed upstream authorized tolerance ceiling.
14. Integration error disposition is separate from field authority and transmission status.
15. Corrections share invariants but use domain-appropriate economic semantics.
16. No independent editable retention/advance/current-balance ledger is introduced.

---

## 12. ADR posture

### ADR-0004 — remains OPEN
Must later decide physical composition among PO, subcontract, framework/rate agreement, call-off/release, service and mixed fulfillment structures.

### ADR-0005 / ADR-0011 — remain OPEN
Budget/accounting authority remains unresolved; current design only preserves contractual/commercial truth and explicit interfaces.

### ADR-0015 — remains OPEN
This remediation defines required correction semantics but does not mandate one persistence primitive.

### ADR-0018 / 0019 / 0020 / 0022 / 0023 — remain OPEN
Instruction effectivity, valuation effective dating, configuration binding, money/rounding and concurrency remain later structural decisions.

**P1.1 REOPEN: NO.**

---

## 13. Re-review gate

Review only BL-03–BL-06, W01–W04, object-collapse disposition, second-ledger/ADR-0004 regression and direct defects created by this remediation.

No Review C progression until external narrow recheck returns PASS.
