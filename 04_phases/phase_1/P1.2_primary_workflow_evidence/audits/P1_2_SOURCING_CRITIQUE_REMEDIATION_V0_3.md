# P1.2 — Sourcing Hostile Critique Remediation v0.3

**Status:** BL-01 / BL-02 REMEDIATED / FINAL NARROW RE-REVIEW REQUIRED / NOT FROZEN  
**Supersedes:** `P1_2_SOURCING_CRITIQUE_REMEDIATION_V0_2.md` for authorized-requirement basis reconciliation, scope uniqueness, active-leaf and UOM semantics.  
**Review context:** B5 CLOSED; B6 OPEN because the v0.2 remediation left downward basis reconciliation and cross-planning-source duplicate scope underspecified.

## 1. Independent disposition

| Review item | Disposition | Correction |
|---|---|---|
| BL-01 downward basis revision below consumed allocation | ACCEPT DIAGNOSIS / MODIFY CURE | A later DemandLine does not automatically rewrite the earlier authorized planning basis. Requirement-basis changes are versioned proposals. A reduction becomes effective only after affected sourcing/award/commitment exposure is released or reduced. Until then the prior basis remains authoritative and the difference is a reconciliation variance. |
| BL-02 duplicate PLANNED_REQUIREMENTs over same physical scope | ACCEPT | `PLANNED_REQUIREMENT` is the canonical planning basis for declared scope; estimate/procurement-plan/long-lead records are evidence sources that attach to it. One exclusive scope coverage may have only one active authorized basis owner at a time unless explicit shared/joint coverage is authorized. |
| B5 value vs scope separation | RETAIN CLOSED | RequirementAllocation continues to conserve scope/quantity only; market price variance remains commercial governance. |
| Active-leaf definition | ACCEPT NON-BLOCKING CONFIRMATION | Define exactly what consumes authorized scope and when scope is released. |
| Controlled UOM basis | ACCEPT NON-BLOCKING CONFIRMATION | Conservation always evaluates in the frozen authoritative basis UOM; cross-UOM conversion requires a governed versioned factor or is prohibited. |
| ADR-0003 recording obligation | ACCEPT | Record two possible authorized-basis owners (`DEMAND_LINE`, `PLANNED_REQUIREMENT`) under the same change-control contract without selecting final physical/root architecture. |

## 2. AuthorizedRequirementBasis — semantic contract, not frozen physical object

Both sourcing origin families expose the same semantic contract:

`AuthorizedRequirementBasis`

with owner type:
- `DEMAND_LINE`; or
- `PLANNED_REQUIREMENT`.

This is a **semantic role/interface** at P1.2, not a decision that one new persisted super-entity must exist.

Each effective basis version preserves:
- owner type + owner identity;
- immutable basis-version ID;
- project/legal entity;
- declared scope coverage identity/set;
- quantity + authoritative UOM where quantitative;
- scope partitions where non-quantitative;
- effective date/time;
- authorizing actor/process/evidence;
- source evidence references;
- superseded/prior basis version;
- reason for change/reconciliation.

Both owner types use identical conservation and change-control rules.

ADR-0003 therefore remains open: this contract does not choose demand-root, package-root, higher-order object, inheritance, composition or navigation structure.

## 3. BL-01 — reconciliation is not retroactive overwrite

### 3.1 Core correction

A later detailed `DemandLine` is evidence to reconcile an early `PLANNED_REQUIREMENT`.

It does **not** automatically replace the currently effective planning basis.

Example:
- long-lead planning basis authorizes 100 units;
- procurement legitimately proceeds against 100;
- later detailed MR says 80.

The 80-unit MR does not retroactively make the earlier 100-unit authorization false or make 20 units instantly unbacked.

Instead create a versioned reconciliation proposal:

`current effective basis vN → proposed basis vN+1`

with one of the outcomes below.

### 3.2 Reconciliation outcomes

#### MATCH / CORROBORATE
Later demand matches the planning basis within controlled semantics.

Action:
- link the DemandLine as corroborating/reconciled evidence;
- no basis quantity/scope change;
- no allocation change.

#### EXPANSION
Later demand requires more authorized scope/quantity.

Action:
- approve an expanded basis version first;
- only after vN+1 becomes effective may new allocation leaves consume the increment.

This retains B5 hard conservation.

#### REDUCTION — UNCONSUMED / RELEASABLE
Later demand proposes a smaller basis and the proposed basis is still sufficient after releasing unbound/releasable scope.

Action sequence:
1. identify allocation leaves affected by the reduction;
2. release, resize or split leaves that have no irreducible downstream exposure;
3. preserve those release/split events;
4. activate the reduced basis version only after active scope consumption fits within it.

#### REDUCTION — DOWNSTREAM EXPOSURE EXISTS
Later demand proposes a smaller basis below scope already bound to an award and/or effective commitment.

The reduced basis **must not become effective immediately**.

Record a reconciliation/change proposal such as:
- `BASIS_REDUCTION_PENDING_RECONCILIATION`;
- proposed target basis;
- excess scope/quantity to resolve;
- affected allocation leaves;
- downstream award/commitment references;
- required action and authority.

Until downstream exposure is removed or reduced:
- prior basis version remains the effective authorized basis;
- existing leaves remain backed by that effective basis;
- later DemandLine is recorded as contrary/reconciling evidence, not silent authority replacement;
- no new scope may be allocated merely because the old basis remains effective.

Resolution depends on downstream state:

**Tender/sourcing only:** release/resize/rebind allocation leaves; retender may reuse the same remaining leaf.

**Award approved, no effective commitment:** cancel/supersede/revise the award/allocation under governance before the lower basis becomes effective.

**Effective commitment exists:** use an effective contractual reduction/cancellation/negative change/termination mechanism under P07 before the lower requirement basis becomes effective to the extent the committed exposure is actually removed.

If contractual exposure cannot be reduced, the system preserves the mismatch as an approved commercial/scope variance rather than falsifying history.

### 3.3 No routine "unbacked active leaf" state

The model does **not** use an ordinary steady-state where an active committed leaf exceeds its effective authorized basis.

Instead:
- proposed basis reduction remains pending;
- prior basis remains effective;
- downstream exposure is reconciled first;
- only then does the reduced basis become effective.

A diagnostic `EXCESS_TO_RECONCILE` projection may exist, but it is not a second source of truth and does not silently authorize P07 conversion.

### 3.4 P07 binding guard

P07 may bind a new/effective commitment only when:
- the referenced RequirementAllocation leaf is active;
- the leaf is backed by the **current effective AuthorizedRequirementBasis version**;
- the binding does not exceed that effective scope/quantity;
- no unresolved basis-reduction condition makes that proposed commitment inconsistent with the target authorized scope.

An already-effective commitment remains historical/legal truth until a governed downstream action changes it; a later planning/demand revision cannot erase it.

## 4. Active allocation leaf semantics

`active` means the leaf currently consumes/reserves part of the effective authorized requirement scope.

Active consumption is independent of whether the current sourcing attempt succeeds.

### 4.1 Events that do NOT automatically release the leaf

- tender closes with no valid bids;
- tender is cancelled/re-tendered;
- bidder withdraws;
- award is superseded while the requirement remains to be procured;
- supplier changes during re-sourcing.

The same requirement scope still exists unless explicitly released/changed.

### 4.2 Events/actions that can stop counting a leaf

A leaf becomes non-counting only through an explicit history-preserving action such as:
- split into child leaves;
- merge into replacement leaf where allowed;
- release/cancel remaining procurement scope;
- governed authorized-basis reduction after downstream exposure is resolved;
- full fulfilled/closed disposition where no remaining sourcing capacity should exist;
- effective downstream cancellation/reduction that returns scope capacity, when policy says it should return to the requirement.

Award and commitment binding do not create additional consumption; they bind the already-counted leaf.

## 5. Controlled UOM basis

### 5.1 Authoritative UOM

Every `QUANTITY_BASIS` version has one authoritative conservation UOM.

Allocation conservation is evaluated in that UOM, not in whichever supplier UOM is displayed.

### 5.2 Cross-UOM conversion

Cross-UOM input is permitted only when a deterministic governed conversion exists for the requirement.

Preserve:
- source UOM;
- authoritative target UOM;
- exact conversion factor/rational relationship;
- factor source/business definition;
- factor version/effective date;
- precision scale;
- rounding rule;
- actor/config provenance where manually established.

The converted canonical quantity is what consumes the hard basis.

If no deterministic governed conversion exists, allocation across those UOMs is blocked; do not invent an approximate factor merely to pass conservation.

Supplier quotation comparison may normalize presentation separately, but that does not redefine the authoritative requirement quantity.

## 6. BL-02 — scope-level uniqueness across origin evidence

### 6.1 Planning evidence does not automatically create separate requirements

The following are **source evidence types**, not automatically separate authorized requirements:
- `ESTIMATE_LINE`;
- `PROCUREMENT_PLAN_LINE`;
- `LONG_LEAD_PLAN_ITEM`.

Multiple source records may support the same canonical `PLANNED_REQUIREMENT`.

Example:
- estimate line: 100 doors;
- procurement-plan line: doors package;
- long-lead entry: ironmongery/doors procurement milestone.

These records do not each receive independent allocation authority merely because they come from different artifacts.

### 6.2 Scope coverage identity

Every active AuthorizedRequirementBasis must declare the physical/business scope it covers using the project breakdown available for that requirement.

Candidate coverage dimensions may include, as applicable:
- project/legal entity;
- location/zone/building/phase;
- BOQ/WBS/cost-code or estimate-line identity;
- trade/package scope;
- material/item family plus required location/use;
- section/lot/deliverable;
- quantitative interval/quantity basis;
- explicit requirement-scope partition identifiers.

This is a **declared procurement scope identity**, not a global generalized construction ontology.

### 6.3 Uniqueness invariant

For scope marked exclusive:

> the same declared authorized scope coverage cannot be owned by two active independent AuthorizedRequirementBasis lineages at the same time.

Before creating a new `PLANNED_REQUIREMENT` or activating a new DemandLine basis for overlapping scope, the system must reconcile against existing active bases for that project/scope.

Allowed resolutions:
- `ATTACH_AS_EVIDENCE` — source record supports existing basis;
- `SPLIT_SCOPE` — explicitly partition one broader basis into non-overlapping child/coverage segments;
- `SUPERSEDE` — governed replacement of prior basis version/owner;
- `RECONCILE_TO_EXISTING` — later DemandLine linked to planned basis;
- `SHARED/JOINED_RESPONSIBILITY` — allowed only when the authorized scope definition explicitly permits shared/joint coverage and double procurement is not implied.

A second independent allocation lineage over overlapping exclusive scope is not allowed by default.

### 6.4 Free-form / uncertain overlap

Some real procurement starts from free-form scope with no reliable natural key.

Do not pretend exact duplicate detection is possible automatically.

Before allocation authority becomes active, the user must confirm/assign the declared scope coverage identity and resolve detected/potential overlap with existing active bases.

AI/search may suggest likely duplicate/overlap candidates, but it cannot silently create or merge authoritative scope.

## 7. Revised hard invariants

1. Exactly one effective AuthorizedRequirementBasis owner exists for an exclusive declared scope coverage at a time, unless explicit shared/joint coverage is authorized.
2. Basis owner type is `DEMAND_LINE` or `PLANNED_REQUIREMENT`; both obey identical version/change-control rules.
3. RequirementAllocation consumes only the current effective basis, never a proposed future basis.
4. Quantity conservation is hard in the frozen authoritative UOM basis.
5. Scope-partition conservation is hard for non-quantitative requirements.
6. A basis expansion must become effective before added scope can be allocated.
7. A basis reduction cannot become effective below active/downstream exposure; affected exposure must be released/reduced/reconciled first.
8. A later DemandLine does not retroactively falsify an earlier authorized planning basis.
9. Planning evidence records do not independently create allocation authority; multiple evidence sources may support one canonical PlannedRequirement.
10. Tender failure/re-tender does not release requirement allocation automatically.
11. Award/commitment bind existing leaves and do not add another allocation balance.
12. P07 may create/bind new commitment only against active leaves backed by the current effective basis.
13. Estimated/target/planning monetary values remain non-authoritative allocation metadata; price variance stays commercial governance.
14. All split/release/reconcile/basis-version operations are atomic, history-preserving and idempotent.

## 8. ADR and forward-dependency recording

### ADR-0003
Record explicitly:
- authorized requirement basis has two possible owner types depending on origin family;
- both expose the same scope/quantity/version/change-control contract;
- `ProcurementPackage` remains optional;
- final physical hierarchy/root remains undecided.

No ADR-0003 closure is implied.

### ADR-0005 / ADR-0011
P06 may use estimate/budget figures as approval context only.

The figure used by P06 must carry:
- source/authority identity;
- snapshot/effective time;
- freshness where mirrored;
- variance basis.

P07/ADR-0005/ADR-0011 may later establish different authoritative accounting/budget ownership. That future decision cannot rewrite historical P06 approval evidence; reconciliation must preserve what figure approvers actually saw.

## 9. P1.1 impact

**P1.1 REOPEN: NO.**

The correction does not add a new business lifecycle. It strengthens the demand/planning→allocation seam beneath the frozen graph and prevents duplicate scope truth.

## 10. Re-review scope

The next external review should test only:
- BL-01 basis reduction/reconciliation behavior;
- BL-02 scope-level uniqueness / multiple planning-source evidence;
- active-leaf release semantics;
- controlled UOM confirmation;
- ADR-0003 recording consistency;
- any defect directly introduced by this v0.3 correction.

B1–B5, ADR-0004 and P1.1 are not reopened unless this remediation directly contradicts them.
