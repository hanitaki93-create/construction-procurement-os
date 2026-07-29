# P01 — Demand / Package Initiation + Cost Attribution v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**P1.2 purpose:** turn the first reference area into concrete mechanics without pretending competitor patterns are contractor truth.  
**Primary CAL-001 status:** partial support for requisition + planning context; budget/cost timing remains UNKNOWN.

## 1. Problem to solve

The system must support both ordinary procurement demand and planned procurement packages without creating two disconnected systems.

It must answer deterministically:
- what is needed;
- who requested/owns it;
- for which project/entity/location;
- when it is needed;
- what source documents/revisions define the need;
- how much of that need has entered sourcing;
- how much has been committed;
- what financial/cost structure it belongs to;
- whether any remaining quantity/value is still open, cancelled or superseded.

It must **not** assume that every procurement starts from an item catalogue, a fully approved budget, or a subcontract package.

## 2. Strong reference patterns

### CMiC
`SREF-0013` shows a formal requisition carrying requester, buyer, required date, inventory/non-stock/free-form item types and line-level distributions. Job-type distributions explicitly carry job, cost code and category. `SREF-0014` separates requisition approval/release from requisition creation.

### Procore
`SREF-0015` / `SREF-0016` show configurable WBS/budget-code attribution across financial line items. Cost code + cost type are core default segments, while project-specific structures can be richer. Budget codes can also be created during later financial transactions, so mature-system evidence does **not** justify forcing a final budget code at the first draft of every demand.

### Oracle Unifier
`SREF-0006` / `SREF-0017` show cost transactions rolling through CBS structures and purchase-order lines requiring cost code attribution. This is strong evidence that commitment-grain cost attribution is load-bearing even where earlier planning/demand is more flexible.

### ProcurePro
`SREF-0018` / `SREF-0019` show a package-led construction procurement loop: estimating handover → schedule → scope → tender → comparison → approval → contract, with package identity carrying through analytics and cross-project visibility.

## 3. Provisional object boundary

### 3.1 `Demand`
A durable statement that procurement is required.

A Demand may represent:
- material request;
- service request;
- subcontract/package requirement;
- ad-hoc purchase;
- emergency request;
- change-driven procurement requirement;
- planned long-lead requirement.

`Demand` is **not** a commitment and does not by itself create actual committed cost.

### 3.2 `DemandLine`
The allocatable grain of the requirement.

Candidate minimum identity:
- immutable demand-line ID;
- project / legal-entity context;
- requester;
- responsible procurement owner when assigned;
- description / item or service reference;
- quantity + UOM where quantitative;
- required-by date or window;
- delivery/work location where relevant;
- source document/version references;
- financial-attribution state;
- approved quantity/value basis where approval is required.

Catalogue reference is optional. Free-form demand remains valid.

### 3.3 `ProcurementPackage`
A sourcing/planning container for a coherent market event or procurement workstream.

A package may be created:
- from one demand;
- from selected lines across multiple demands;
- from an estimating/procurement-plan handover before individual MRs exist;
- for a long-lead package requiring early market action.

A package **does not own or erase the originating demand**. The relationship is through explicit allocation links.

### 3.4 `DemandAllocation`
Links all or part of a DemandLine into:
- a ProcurementPackage;
- direct sourcing;
- later award/commitment lines.

This relationship is necessary to support partial sourcing, split awards and remainder tracking without copying the demand into disconnected records.

## 4. Critical distinction — three financial concepts

Do not collapse these into one `budget check` field.

### A. Cost attribution
Where the future cost belongs:
- project/job;
- cost code/CBS/WBS segment;
- cost type/category;
- optional subjob/work package/custom segments.

### B. Budget context / baseline
What approved or external budget/estimate context exists for the attributed area.

Possible posture:
- platform-owned budget;
- externally mastered budget reference;
- imported snapshot;
- no approved budget yet;
- expressly non-budgeted/exception work.

### C. Budget availability / reservation
Whether a demand, sourcing event, award or commitment consumes/reserves capacity against that budget.

This is a later policy/design decision. Current evidence does **not** justify assuming that draft demand creates an accounting-style encumbrance.

## 5. Candidate lifecycle

### Demand header
`DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED | RETURNED | REJECTED | CANCELLED`

After approval, operational fulfillment is primarily derived from line allocations rather than a manually edited header status.

Candidate derived fulfillment states:
- `UNRELEASED`
- `PARTIALLY_RELEASED_TO_SOURCING`
- `FULLY_RELEASED_TO_SOURCING`
- `PARTIALLY_COMMITTED`
- `FULLY_COMMITTED`
- `CLOSED_WITH_REMAINDER_CANCELLED`

These names are provisional; the important design rule is that allocation/commitment events, not a free-text tracker, should determine them.

### Package
Candidate lifecycle:
`DRAFT → READY_FOR_SOURCING → TENDERING → EVALUATION → AWARD_PENDING → AWARDED/PARTIALLY_AWARDED → COMMITMENT_PENDING → COMMITTED/PARTIALLY_COMMITTED → CLOSED | CANCELLED`

Detailed tender/award states belong to later P1.2 process areas. P01 only establishes that package is a durable container distinct from demand and commitment.

## 6. Candidate transition policy

### Draft
May exist with incomplete financial attribution when the organization needs to capture an early requirement.

### Submit / approve for procurement
At minimum require:
- project/entity context;
- meaningful scope/item description;
- requester;
- required date/window where applicable;
- enough cost classification to route/approve under configured policy **or** an explicit unresolved-attribution exception.

### Release to sourcing
Candidate default:
- demand approval complete where approval applies;
- procurement owner assigned;
- source scope/version identifiable;
- financial attribution valid enough to prevent orphan sourcing, unless a privileged early-procurement exception is recorded.

### Award / commitment
Harder guardrail:
A final commitment line should not become effective without either:
1. valid final financial attribution; or
2. an explicit approved non-budgeted/external-attribution exception with reconciliation obligation.

This is stronger than requiring an approved budget at demand creation and is better aligned with observed mature systems.

## 7. Load-bearing invariants

1. **Demand truth is immutable by history.** Later revisions do not erase what was originally requested/approved.
2. **No silent over-allocation.** Allocated/sourced/committed quantity or value cannot exceed the authorized basis unless an explicit overbuy/change action exists.
3. **Package membership is relational.** Moving a line into a package does not destroy its demand identity.
4. **Partial conversion is first-class.** One demand may be split across packages, vendors, commitments or time.
5. **Free-form procurement is legal.** Item-master dependence cannot be mandatory for ordinary contractor procurement.
6. **Cost attribution and budget sufficiency are separate controls.** A valid cost code does not prove budget availability; lack of platform-owned budget does not make cost attribution impossible.
7. **Commitment attribution is mandatory or explicitly excepted.** Commercial cost cannot become authoritative while financially orphaned.
8. **Reclassification is historical.** Changing cost attribution after approval/commitment requires a governed reallocation/correction event; no destructive rewrite of prior truth.
9. **Source revision is preserved.** A demand/package must be traceable to the drawing/spec/scope/estimate revision that caused it where such evidence exists.
10. **Derived statuses beat parallel trackers.** Released/committed/remaining positions should calculate from allocations and downstream events.

## 8. Edge cases the process must survive

### E01 — One MR, many buying routes
Twenty lines arrive on one request. Ten are bought from one supplier, five tendered separately, three fulfilled from stock, two cancelled.

Required behavior: line-level allocation and derived remaining demand; no forced one-MR→one-PO model.

### E02 — One package, many originating requests
Several site/project requests feed one consolidated cable or sanitaryware tender.

Required behavior: package can aggregate demand lines while preserving each source and quantity allocation.

### E03 — Package exists before MR
Estimator/procurement plan identifies façade/HVAC/elevator package months before detailed site requisition.

Required behavior: package-led planning is valid; later demand can reconcile/link rather than duplicate the package.

### E04 — Emergency procurement
Urgent requirement must go to market before normal approval/coding is complete.

Required behavior: privileged exception path with reason, actor, time, expiry/reconciliation obligation; no hidden bypass.

### E05 — No approved budget yet
Procurement begins under estimate/preconstruction allowance or externally maintained budget.

Required behavior: explicit budget-context posture; do not invent a fake zero-budget failure.

### E06 — Non-budgeted legitimate work
A controlled client instruction, contingency, enabling work or exceptional corporate purchase has no normal project budget line.

Required behavior: explicit non-budgeted/exception classification and later reconciliation, not arbitrary cost-code fabrication.

### E07 — Cost code changes before commitment
QS/commercial team reclassifies the package after tendering but before PO/subcontract.

Required behavior: preserve prior attribution history; final award/commitment carries approved current attribution.

### E08 — Cost code changes after commitment
Accounting/project controls identify misclassification after PO/subcontract approval.

Required behavior: correction/reallocation event; original commercial transaction remains historically reproducible.

### E09 — Scope revision after partial sourcing
Drawing revision changes quantity after half the demand has already been tendered/committed.

Required behavior: revised authorized demand basis + downstream impact visibility; no overwrite of already-issued procurement evidence.

### E10 — Duplicate demand
Two teams request the same item/package independently.

Required behavior: potential-duplicate detection may assist, but humans must merge/link/cancel explicitly; system must not silently collapse requirements.

### E11 — Multi-project buying
Corporate procurement combines same material across several jobs.

Required behavior: preserve per-project/cost attribution underneath a consolidated sourcing event. Structural support remains subject to root/ownership ADRs.

### E12 — Goods vs subcontract scope
Demand begins similarly but later one path becomes line-item goods/receipt and another becomes subcontract SOV/progress valuation.

Required behavior: common demand/sourcing provenance with downstream subtype divergence.

## 9. Failure patterns to reject

The later design should fail audit if it requires any of the following:
- every request must be created from a global item master;
- every MR maps to exactly one RFQ or PO;
- every tender package must start from an MR;
- budget code, approved budget amount and reservation are represented as the same concept;
- procurement cannot begin until the platform owns the entire project budget;
- users can manually type `Fully Procured` while open demand lines still exist;
- moving a requirement into a package severs its requisition/source lineage;
- cost-code corrections rewrite historical approved commitments;
- emergency flows bypass provenance/authority rather than use explicit exceptions.

## 10. Provisional candidate flow

`Planning / Site Need / Estimate Handover / Change Trigger`

`→ Demand {header + lines}`

`→ classify + source-version capture + preliminary financial attribution`

`→ submit / review / approve or exception`

`→ allocate lines to {ProcurementPackage | direct sourcing | stock/other fulfillment}`

`→ source/tender`

`→ award`

`→ commitment line with final attribution`

`→ derived remaining-demand + committed-position updates`

## 11. Primary audit tests for later

Independent cases must answer without being shown this model:

1. Does procurement actually begin from MR, package plan, estimate handover, schedule, verbal/site instruction, or multiple routes?
2. At what point is job/project mandatory?
3. At what point is cost code/category mandatory?
4. Is there a real budget check, merely a cost code, or both?
5. Does any organization reserve budget before award/PO?
6. Can tendering start before final budget coding or approval?
7. Can one MR split across many suppliers/POs/packages?
8. Can one package aggregate many MRs?
9. How are long-lead packages created before detailed requisitions?
10. What artifact is authoritative for remaining/open demand?
11. What happens when cost coding changes after approval or commitment?
12. How are emergency/non-budgeted requirements controlled?

## 12. Current disposition

### Strong enough to carry forward provisionally
- separate `Demand`, `DemandLine`, `ProcurementPackage`, and allocation relationship;
- free-form/non-stock demand support;
- approval separate from commitment;
- explicit financial attribution at commitment grain;
- separation of cost attribution vs budget context vs reservation;
- partial allocation/conversion and derived remaining-demand state;
- historical correction rather than destructive reclassification.

### Still intentionally unresolved
- exact demand status names;
- whether all approved demand requires final cost code before sourcing;
- whether budget reservation/encumbrance exists in V1;
- package-to-demand cardinality implementation details;
- whether stock/internal fulfillment belongs inside product scope or only as an interface outcome;
- multi-project procurement ownership/root model;
- exact approval policy and exception thresholds.

## 13. Impact on P1.1

No frozen P1.1 change is required yet.

This process **strengthens**:
- `Demand {MR | Package}` as a plural-entry concept;
- budget/cost structure as SPINE context;
- ordinary MR and package coexistence;
- API/event/provenance requirements.

It does **not** justify expanding inventory, accounting/GL ownership, or generalized workflow-engine scope.

## 14. Next process dependency

P02 should reconstruct **vendor eligibility / bidder selection / tender release prerequisites**, because P01 ends at an approved/releasable demand/package and the next architectural risk is whether supplier eligibility/compliance becomes a hard gate, advisory signal, or privileged exception.
