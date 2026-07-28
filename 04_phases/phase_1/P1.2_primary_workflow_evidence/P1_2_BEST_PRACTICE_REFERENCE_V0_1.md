# P1.2 — Best-Practice Reference Baseline v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**Purpose:** Give P1.2 a mature reference workflow while independent contractor evidence is still incomplete.

This is not contractor reality and does not satisfy P1.2 primary-evidence gates.

## Reference systems studied

Current official-source pass includes:
- Procore Bidding / Bid Leveling / Commitments;
- Autodesk BuildingConnected / TradeTapp bid management and qualification;
- Oracle Primavera Unifier cost transactions / cost sheets;
- CMiC Requisition / Purchase Order / Subcontract Management / Request for Payment / Retainage;
- ProcurePro procurement schedules.

## 1. Demand / requisition / package

Mature pattern:
- procurement starts from an identifiable demand object or package;
- requisition approval may gate conversion to PO;
- free-form/non-stock procurement must remain possible;
- package and requisition are not assumed to be the same object.

Provisional architecture lesson:
- preserve typed demand identity but keep MR-led and package-led entry open;
- do not require item catalogue use for all procurement;
- approval state must be distinct from later commitment state.

## 2. Tender package + bid response structure

Mature pattern:
- bid package/event;
- bidder invitation/coverage;
- bid forms or structured response lines where practical;
- supplier proposal/revision identity;
- qualifications/alternates/exclusions;
- side-by-side bid leveling.

Provisional architecture lesson:
- canonical bid-line/comparison input structure remains strong;
- supplier form configurability can be thinner than the internal comparison model;
- attachment/freeform input should normalize into comparable internal lines without losing original evidence.

## 3. Bid leveling is not only totals

Mature pattern:
- compare bidder submissions line-by-line;
- normalize scope gaps and commercial differences;
- preserve adjustments/alternates;
- compare against internal budget/benchmark where available;
- distinguish submitted bid from leveled/adjusted bid.

Provisional architecture lesson:
- original supplier submission and internal leveled view must be separately identifiable;
- every adjustment must be traceable rather than overwriting supplier-origin truth;
- award justification must reference the actual decision basis, not merely the lowest total.

## 4. Award → commitment handoff

Mature pattern:
- award can be a distinct decision/state before contract creation;
- selected bid can convert into either PO or subcontract;
- bid/leveled data is carried into the commitment rather than re-keyed from scratch;
- some systems support soft/preliminary award before binding commitment.

Provisional architecture lesson:
- award and commitment are distinct transitions;
- commitment creation should preserve source award/bid revision identity;
- PO and subcontract share commitment semantics but require subtype-specific downstream behavior.

## 5. Cost code / budget / commitment position

Mature pattern:
- commitments allocate to cost/CBS codes;
- approved base commitments create or populate SOV/cost positions;
- approved changes alter committed cost;
- cost sheets/project cost systems roll transactions into current position.

Provisional architecture lesson:
- cost attribution and current commitment projections are core;
- original commitment, approved changes and current/revised commitment must remain distinguishable;
- derived balance should come from transaction/event history, not mutable summary-only fields.

## 6. Goods branch

Mature pattern:
- approved requisition → PO;
- PO lines may support free-form/non-stock items;
- receipt is recorded against PO lines;
- invoices are matched to PO and receipt, often at line level;
- compliance can place holds before payment.

Provisional architecture lesson:
- goods receipt/GRN is a commercial receipt event separate from inventory stock truth;
- partial/rejected receipt semantics will matter later;
- invoice/payment execution can remain external while receipt-to-commitment references stay deterministic.

## 7. Subcontract branch

Mature pattern:
- subcontract is a richer commitment than ordinary PO;
- project/job-bound contract with SOV;
- unlimited/iterative change orders;
- requests for payment/progress applications reference SOV and progress;
- posted and pending changes/requests affect visible remaining commercial position.

Provisional architecture lesson:
- shared commitment substrate + subtype-specific subcontract valuation semantics remains the strongest current hypothesis;
- SOV/valuation grain is likely load-bearing for subcontract administration;
- pending and posted/approved positions should not collapse into one number.

## 8. Retention / advance / recoupment

Mature pattern:
- retention is represented at contract and/or SOV/payment-request level;
- prior/current retained and released positions are tracked;
- advance/down-payment amortization/recoupment is carried through payment applications;
- release mechanics depend on contract configuration and approval/posting state.

Provisional architecture lesson:
- FIN-12 position substrate remains justified;
- positions should be projections over canonical commercial events;
- configuration/effective binding matters because changing contract setup after posting can be invalid or constrained.

## 9. Compliance as a transition guard

Mature pattern:
- vendor/contract/invoice compliance can gate payment or other actions;
- override may exist but requires privilege;
- qualification/risk is integrated into bidder selection in mature bid-management systems.

Provisional architecture lesson:
- minimum vendor/compliance state as SPINE remains defensible;
- later design should distinguish eligibility, warning, hard block and authorized override rather than one approved/not-approved bit.

## 10. Procurement schedule / long-lead control

Mature pattern:
- milestones and lead times are planned;
- actual procurement actions update schedule/status automatically;
- schedule is an operational projection rather than a second manually maintained source of transaction truth.

Provisional architecture lesson:
- procurement plan/schedule may remain THIN as a surface;
- transaction events should be capable of driving milestone status and risk;
- manual planning dates remain legitimate inputs but completion/status should derive from events where possible.

## 11. Current provisional reference graph

`Demand {requisition | package} → approval/eligibility → tender package → bidder invite → submitted bid/revision → canonical bid lines → leveling/adjustments → award decision + justification → commitment {PO | subcontract} → approved changes → {goods receipt | subcontract valuation} → retention/advance/recoupment positions → current commercial projection → accounting/payment interface`

Cross-cutting:
- authority/DOA;
- compliance/override;
- provenance/version identity;
- event history;
- cost code/CBS attribution;
- concurrency/idempotency;
- external technical/document dependencies.

## 12. What this reference baseline does NOT prove

It does not prove:
- contractors in the target operating environment actually work this way;
- every mature incumbent pattern is desirable;
- portal-heavy supplier UX is appropriate;
- generalized workflow engines are required;
- AP/GL/payment execution should be platform-owned;
- the exact state names or object boundaries are correct;
- P1.1 scope labels are final.

## 13. Later audit requirement

Every major pattern above must eventually receive one of:
- `PRIMARY_CORROBORATED`;
- `PRIMARY_CONTRADICTED`;
- `PRIMARY_UNOBSERVED`;
- `NOT_TESTED`.

The reference model is allowed to guide provisional specification and questioning now, but primary evidence and later red-team audits retain veto power.
