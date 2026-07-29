# P1.2 — Sourcing Hostile Critique Remediation v0.2

**Status:** B5/B6 REMEDIATED / FINAL NARROW RE-REVIEW REQUIRED / P07 BLOCKED  
**Supersedes:** `P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_1.md` for current provisional allocation semantics.  
**Prior re-review result:** B1, B2 and B4 CLOSED; B3 cure ACCEPTED; ADR-0003/0004 anchoring CLEAN; new blockers B5 and B6 identified.

## 1. Disposition

| Item | Disposition | Correction |
|---|---|---|
| B5 quantity/scope correctness conflated with value/budget control | ACCEPT | `RequirementAllocation` conserves scope/quantity only. Estimated/planning value is non-authoritative metadata. Price-vs-budget is a separate award/commitment control using `contractable_agreed_basis`. |
| B6 package-led route bypasses allocation authority | ACCEPT | Every sourcing route originates a `RequirementAllocation` before tender. Package-led planning uses a closed `PLANNED_REQUIREMENT` origin family anchored to Project + Budget/Cost Structure + preserved source evidence. |
| B3 lineage mechanism | RETAIN | One allocation lineage remains accepted; no return to independent stage balances. |
| P1.1 reopen | NO | Corrections remain beneath the frozen demand→award boundary. |

## 2. B5 — split hard scope conservation from value governance

The previous invariant incorrectly used one `authorized quantity/value basis` and one conservation rule.

That is removed.

### 2.1 Hard allocation authority owns scope, not commercial price

`RequirementAllocation` answers:

> **Which authorized scope slice is this sourcing / award / later commitment binding consuming?**

Its load-bearing conservation dimension is one of:

1. **QUANTITY_BASIS** — measurable quantity + UOM where the requirement is genuinely quantitative; or
2. **SCOPE_PARTITION_BASIS** — explicit non-overlapping scope partition identities where numeric quantity is not the meaningful hard dimension.

A hybrid requirement may contain both, but there must always be an explicit authoritative scope basis against which duplicate allocation can be detected.

### 2.2 Quantity invariant — hard correctness rule

For a `QUANTITY_BASIS` requirement:

`sum(active leaf allocated quantity in the same UOM basis) <= current authorized requirement quantity`

No routine override exists.

If more quantity is legitimately required, the **authorized requirement basis must change first** through a governed demand/scope change. Only then may new allocation leaves consume the increased basis.

An allocation operation cannot itself waive the quantity invariant.

### 2.3 Scope-partition invariant — hard correctness rule

For lump-sum/subcontract/document-driven scope where quantity is absent or not meaningful, the hard allocation dimension is explicit scope partition identity.

Candidate partition identities may reference existing requirement/tender breakdowns such as:
- section;
- BOQ/price-schedule line or group;
- deliverable;
- lot;
- defined work-scope segment.

The invariant is:

> the same currently authorized scope partition cannot be allocated to multiple active award/commitment leaves unless the authorized scope basis explicitly permits shared/joint responsibility.

Default is exclusive consumption.

`scope_partition_id` is a reference to the actual business breakdown used for that requirement. It is **not** a new generalized construction ontology.

### 2.4 Value is not an allocation conservation dimension

`RequirementAllocation` may carry:
- estimated value;
- target value;
- planning allowance;
- expected spend;

only as **non-authoritative planning metadata/context**.

These values do not cap allocation and do not determine whether scope is already consumed.

A market award above estimate is not an allocation error.

### 2.5 Commercial value gate

At award, compare the proposed `contractable_agreed_basis` against the applicable budget/estimate/target context.

That comparison may trigger:
- variance visibility;
- additional DOA approval;
- budget exception;
- budget revision/reallocation;
- later accounting/ERP reconciliation.

But it does **not** alter the hard allocation conservation rule.

P06 may use budget variance as approval context. P07 / ADR-0005 / ADR-0011 later resolve authoritative commercial-budget ownership and commitment posting/interface semantics.

No `controlled overbuy` escape remains inside `RequirementAllocation` itself.

## 3. RequirementAllocation candidate identity — corrected

Candidate fields/invariants:
- immutable allocation ID;
- `origin_basis_type`;
- source-basis identity + version/provenance;
- project + legal entity context;
- cost/budget-structure attribution/context as available;
- allocation basis type: `QUANTITY_BASIS | SCOPE_PARTITION_BASIS | HYBRID`;
- authorized quantity/UOM where applicable;
- authorized scope partition identity/set where applicable;
- parent allocation ID when split;
- active/inactive leaf state;
- package/tender references;
- award/vendor binding;
- later commitment binding;
- estimated/planning value as non-authoritative metadata where useful;
- lifecycle history;
- cancelled/remainder disposition.

## 4. Split examples

### 4.1 Measurable material

Authorized demand: 100 m cable.

Parent allocation 100 m splits to:
- A = 60 m;
- B = 40 m.

Parent becomes inactive/non-counting.

No active leaves may total >100 m unless the underlying authorized demand quantity is first changed.

### 4.2 Lump-sum subcontract

Authorized scope partitions:
- supply;
- installation;
- testing/commissioning.

Possible split:
- vendor A → supply;
- vendor B → installation + testing/commissioning.

A higher/lower awarded monetary value than estimate is handled by commercial approval/budget controls, not by duplicating or relaxing the scope allocation rule.

## 5. B6 — every route enters the allocation authority before tender

The earlier package-led route was internally inconsistent because it could reach tender/award without an allocation leaf.

That route is removed.

### 5.1 Closed origin families

A `RequirementAllocation` may originate only from one of two **closed origin families**:

1. `DEMAND_LINE`
2. `PLANNED_REQUIREMENT`

No third ad-hoc root may be added without explicit architecture/change-control decision.

### 5.2 DEMAND_LINE origin

A normal approved/authorized requisition or demand line.

Candidate routes:

`DemandLine → RequirementAllocation → TenderEvent / direct-source event`

or

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

### 5.3 PLANNED_REQUIREMENT origin

Used when procurement must begin before a detailed MR/requisition exists.

`PLANNED_REQUIREMENT` is **not a new universal upstream graph node**. It is an authorized planning basis anchored to the frozen:

`Project → Budget/Cost Structure`

with preserved source evidence.

For V1, its source evidence type is a closed set:
- `ESTIMATE_LINE`;
- `PROCUREMENT_PLAN_LINE`;
- `LONG_LEAD_PLAN_ITEM`.

Each planned requirement must preserve at minimum:
- project/legal entity;
- cost/budget structure attribution or governed unresolved-attribution exception;
- scope description;
- authoritative quantity and/or scope-partition basis;
- required-by/planning date where applicable;
- source artifact/version;
- authorizing actor/process/evidence;
- later reconciliation obligation where detailed demand is expected.

Route:

`Project + Budget/Cost Structure + {ESTIMATE_LINE | PROCUREMENT_PLAN_LINE | LONG_LEAD_PLAN_ITEM}`

`→ PLANNED_REQUIREMENT basis`

`→ RequirementAllocation`

`→ [optional ProcurementPackage]`

`→ TenderEvent`

The allocation therefore exists before market release and remains available for award/P07 binding.

### 5.4 Later demand reconciliation

When a detailed DemandLine arrives after early package-led sourcing:
- link/reconcile it to the existing planned requirement/allocation lineage;
- do not create a second independent allocation for the already-covered scope;
- differences in scope/quantity require explicit basis reconciliation/change;
- original planning-source evidence remains historical.

## 6. Corrected origin/root neutrality

Valid entry routes are now:

### Demand-led direct
`DemandLine → RequirementAllocation → TenderEvent`

### Demand-led packaged
`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

### Planned/package-led before MR
`Project + Budget/Cost Structure + PLANNED_REQUIREMENT → RequirementAllocation → [ProcurementPackage] → TenderEvent`

`ProcurementPackage` remains optional.

ADR-0003 remains `PROPOSED / PENDING` because this does not decide whether final navigation/entity architecture is demand-rooted, package-rooted, equal-path, or a higher-order abstraction.

ADR-0004 remains untouched.

## 7. Revised binding allocation invariants

1. There is one canonical `RequirementAllocation` lineage for requirement-scope consumption.
2. Every tender/direct-source route must be backed by allocation leaf/leaves before supplier award.
3. Quantity conservation is hard and exact against the current authorized requirement quantity.
4. Non-quantified scope uses explicit scope-partition conservation.
5. Additional quantity/scope requires prior governed change to the authorized requirement basis; allocation itself cannot override conservation.
6. Estimated/target/planning value is non-authoritative allocation metadata.
7. Award price above estimate is a commercial variance/approval event, not an allocation correctness failure.
8. Award and commitment bind to existing allocation leaves; they do not create competing allocation ledgers.
9. Split/merge/reconciliation is atomic, history-preserving and idempotent.
10. Package-led early procurement has an allocation authority before market release.
11. Later demand reconciliation cannot double-create already allocated scope.

## 8. P1.1 consistency

`PLANNED_REQUIREMENT` is a planning basis sourced from Project + Budget/Cost Structure evidence, not a new upstream product domain node.

The V1 allowed source evidence types are explicitly enumerated. Adding another planned-source family requires controlled architecture review.

**P1.1 REOPEN: NO.**

## 9. Re-review gate

B1, B2 and B4 remain closed.

B3 lineage mechanism remains accepted.

The final narrow re-review should test only:
- B5 hard scope/quantity conservation vs commercial value gate separation;
- B6 complete route coverage through RequirementAllocation;
- whether the closed origin-family/source-type model preserves ADR-0003 neutrality and P1.1 boundary.

P07 remains blocked until PASS.