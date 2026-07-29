# P1.2 — P07/P08 Commercial Core Checkpoint v0.3

**Status:** REVIEW B BL-03–BL-08 REMEDIATED / FINAL NARROW RECHECK REQUIRED / NOT FROZEN  
**Supersedes:** `P1_2_P07_P08_COMMERCIAL_CORE_CHECKPOINT_V0_2.md` for current provisional interpretation.  
**Upstream:** Review A sourcing PASS remains binding.

## 1. Current commercial architecture

P07/P08 now separates six orthogonal concerns:

1. **commercial terms authority** — rates/terms/formulas that may govern future obligations;
2. **committed obligation** — effective call-off/PO/subcontract/service obligation;
3. **scope/quantity basis** — firm quantity, remeasurable quantity, or non-quantified scope;
4. **valuation basis** — lump sum, unit-rate remeasurement, provisional sum, daywork, milestone, rate-based service;
5. **fulfillment mechanism** — receipt, progress valuation, milestone certification, service/deliverable evidence, composable by segment;
6. **accounting authority/interface** — explicit OWN/MIRROR/REFERENCE plus reconciliation/error disposition.

These are semantic contracts only. ADR-0004 physical composition remains open.

---

## 2. Terms authority / framework / call-off

### Ordinary non-consuming terms authority

`CommercialTermsAuthority` may define rates, formulas, terms, validity and call-off rules without itself consuming RequirementAllocation scope or creating ordinary committed cost.

### Effective call-off obligation

Each call-off/release/order:
- references exact terms-authority version;
- has its own formation/effectiveness evidence;
- binds backed RequirementAllocation scope;
- creates immutable original obligation baseline;
- changes/fulfills/closes independently.

### Guaranteed minimum — scope-backed

When the minimum is identifiable authorized quantity/scope:
- framework effectiveness reserves capacity on the existing RequirementAllocation lineage;
- call-offs draw down that reservation rather than consume the same scope again;
- reserved-not-called + called/committed remains inside the same hard authorized basis;
- residual reservation at expiry is governed and history-preserving.

### Guaranteed minimum — monetary

When the minimum is a spend/take-or-pay/fee obligation without fixed physical scope:
- preserve explicit commercial exposure;
- do not fabricate physical RequirementAllocation scope;
- qualifying call-off values reduce outstanding minimum exposure according to contract rule;
- residual settlement is commercial/accounting exposure, not procurement fulfillment.

This distinction is provisional and is part of the final Review B recheck.

---

## 3. Scope/quantity conservation

At commitment line/scope-segment grain:

### `FIRM_QUANTITY`
Fixed contractual quantity in governed UOM.

### `REMEASURABLE_QUANTITY`
Estimated quantity may change through measurement without fake variation.

But **no unconserved state exists**:
- if a real authorized quantity/cap exists, conserve against it; otherwise
- `SCOPE_PARTITION_BASIS` is mandatory.

The estimated BOQ quantity is planning/valuation metadata where it is not genuine authorization.

### `NON_QUANTIFIED_SCOPE`
Lump sum/milestone/service/deliverable scope conserved through explicit scope partition/deliverable identity.

Review A hard conservation remains mandatory in every case.

---

## 4. Valuation basis

Valuation basis is independent from scope/quantity basis.

Current candidate mechanisms:
- `FIRM_LUMP_SUM`;
- `UNIT_RATE_REMEASUREMENT`;
- `PROVISIONAL_SUM_ALLOWANCE`;
- `DAYWORK`;
- `MILESTONE`;
- `RATE_BASED_SERVICE`.

No generic contractual-mechanism bypass is permitted without named basis/evidence.

---

## 5. Instructed but unagreed work

`AuthorizedWorkInstruction` is scope/work authority, not final supplier price.

Where a valid governed instruction adds scope and the issuer has the authority to authorize that scope:

> the instruction itself is the effective authorized requirement-basis expansion source event.

No artificial second approval event is required merely to create allocation capacity.

Where work remains inside existing remeasurable/non-quantified authorized scope, no fake basis expansion is created.

Valuation before final agreement requires a named effective contractual valuation authority. Final agreement/change reconciles prior provisional certification non-destructively.

---

## 6. Composable fulfillment + common economic base

A commitment may use one or more mechanisms at line/SOV/milestone/scope-segment grain:
- `GOODS_RECEIPT`;
- `PROGRESS_VALUATION`;
- `MILESTONE_CERTIFICATION`;
- `RATE_BASED_SERVICE`;
- `DELIVERABLE_ACCEPTANCE`.

Each value-contributing mechanism resolves against a **common economic base** for the same commercial scope segment/component.

The architecture must identify:
- economic component identity;
- contractual/valuation basis;
- already recognized value;
- whether later mechanism is evidence/transition of same value or separate earnable component.

Stored material cannot be certified once at receipt/storage and again as new material value at installation.

Physical storage/grain remains P1.5; enforceability of one-economic-value-once is mandatory now.

---

## 7. Quantity tolerance

Authorized quantitative basis versions may include:
- nominal quantity;
- governed tolerance rule/type/direction;
- precision;
- rounding-policy reference;
- derived hard authorized ceiling;
- version/effective date/provenance.

Hard relation:

`accepted cumulative <= effective commitment permitted <= authorized requirement ceiling`

Tolerance is pre-authorized scope, not a receipt exception.

A basis reduction creates a new proposed basis/tolerance ceiling. Review A downward-reconciliation and CR-01 apply before it can become effective.

---

## 8. Certification / earned-value authority

Every certified amount must trace to:
- effective contractual value basis; or
- named effective contractual valuation authority for remeasurement, allowance, daywork or instructed scope.

Supplier claim remains distinct from buyer assessment and certification.

Firm-price work remains capped by effective contract value unless governed change occurs.

Remeasured work may vary in measured quantity inside the authorized scope partition/cap without fake VO.

---

## 9. P08 integration / correction

Field/event authority:
- `OWN`;
- `MIRROR`;
- `REFERENCE`.

Rejection/disposition taxonomy:
- `DATA_DEFECT`;
- `TRANSPORT_OR_MAPPING_DEFECT`;
- `TEMPORAL_RESTRICTION`;
- `EXTERNAL_AUTHORITY_RETURN`.

Transport/config defects must not mutate commercial truth merely to make sync pass.

Correction modes share history/authority/idempotency invariants but remain economically distinct:
- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- physical reversal;
- reclassification;
- non-domain integration correction.

---

## 10. Derived positions / second-ledger guard

The following remain derived/event-backed where locally represented:
- current approved commitment;
- retention outstanding;
- advance outstanding/recoupment;
- provisional-sum allowance remaining;
- scope-backed framework reserved-not-called position;
- monetary-minimum outstanding exposure;
- integration state;
- accepted/rejected/returned positions.

No independently edited balance may compete with underlying contractual/commercial/accounting authority.

---

## 11. Review A compatibility

Review A remains intact:
- one RequirementAllocation lineage;
- hard conservation always exists;
- scope-backed minimum reservation/call-off drawdown uses same lineage;
- monetary minimum does not create fake scope;
- instruction expands basis when it actually adds authorized scope;
- tolerance belongs to basis version;
- unresolved reductions block conflicting new consumption/binding.

---

## 12. ADR posture

Still open:
- ADR-0004 PO/Subcontract/Framework/CallOff physical model;
- ADR-0005 commercial/accounting ownership;
- ADR-0011 budget authority;
- ADR-0015 correction model;
- ADR-0018 workflow/financial-state seam;
- ADR-0019/0020 temporal/config binding;
- ADR-0021 integration authority;
- ADR-0022 money/rounding/calculation order;
- ADR-0023 concurrency/idempotency.

P1.1 REOPEN = **NO**.

---

## 13. Gate

Review B remains open only for final narrow recheck of BL-07/BL-08 and the closure obligations above.

Review C remains blocked until:

`PASS — P07/P08 coherent; proceed to Review C`