# R00 Architecture V2 Rebaseline Gate v0.2

**Status:** OPEN / PRE-AUDIT

R01-R10 implementation remains locked until Architecture V2 freeze. R00 closes only after independent hostile audit PASS and owner/domain acceptance of the corrected exact candidate.

## Required closure evidence

1. All 84 frozen P1.1 scope areas have explicit V2 disposition.
2. DI-01..DI-18 Phase-1 design inheritance has explicit V2 traceability.
3. Every V2 scope promotion/addition is recorded against frozen Phase-1 history with evidence and burden boundary.
4. Current V2 capability inventory is structurally complete and all R01-R08 capabilities map to a real CapabilitySpecification.
5. Capability checker passes STRUCTURE and deliberately fails AUTHORIZE until `MEANING_PASS` is recorded.
6. Specialist gap evidence has been incorporated into core product objects rather than parked as future ideas.
7. Internal hostile self-review has no unresolved blocker.
8. Independent hostile architecture/product/domain review returns exactly PASS / FAIL / BLOCKED with no unresolved blocker before freeze.
9. Any accepted audit fixes are incorporated and the exact post-fix candidate is rechecked.
10. Owner/domain reviewer records `MEANING_PASS` on the exact candidate.
11. Architecture V2 freeze checkpoint records exact commit SHA/tree, capability inventory version, scope-disposition version, audit verdict and implementation authorization.

## Mandatory product proof scenarios for hostile audit

### A — Material purchase / direct and competitive routes
Raise a 10+ line MR with catalogue and free-form lines, UOM, cost distributions, need-by/location/docs. Approve selected lines. Route one low-value line directly under policy and selected remaining lines into competitive RFQ without re-entry. Receive three heterogeneous quotes, level, approve, split/award where applicable, generate numbered LPO/PO and prove demand conservation.

### B — Complex subcontract package
Import/use estimating handover if available; create package from approved demand; instantiate/tailor a company Scope of Works template; establish budget basis and procurement schedule; competitively tender; receive revisions/exclusions; run technical evaluation where required; level commercially; clarify/renegotiate; recommend non-lowest supplier with supplier-intelligence context; approve; form and execute subcontract.

### C — Technical alternate / CDE seam
Supplier proposes an alternate product. Technical tender evaluation and later consultant/client approval are kept distinct. CPOS references or owns the procurement gate without becoming a full CDE. Conditional award/order cannot misrepresent the alternate as approved before the applicable gate is satisfied.

### D — Supplier lifecycle and risk context
Create/register/qualify supplier with trade/tax/licence/compliance documents and expiry. Show contextual eligibility plus current workload/performance facts at shortlist/leveling/recommendation. Expiry/requalification does not rewrite historical award provenance.

### E — ERP coexistence
CPOS owns sourcing/decision/order execution while an external ERP remains authoritative for selected budget/AP/GL/inventory/payment fields. Handoff, external ID, reject/stale/reconcile behavior are explicit and no duplicate editable ledger is created.

### F — AI-assisted leveling
Upload inconsistent PDF/XLSX quotes. AI proposes values/mappings/deviations with exact source citations/confidence. Human confirms/corrects. Supplier source remains immutable; technical evaluation/approval and award remain human/governed.

### G — Schedule / management layer
Create baseline procurement dates from required-on-site, allow forecast and supplier-confirmed dates to differ, populate actual milestones from transactions, surface late packages/unsigned contracts/policy exceptions, and derive cycle-time/competition/variance analytics with drill-down.

### H — Revision / cancellation / retender
Issue RFQ/addendum and quotation revisions; cancel one award/order path; preserve issued/source history; correctly restore/residualize demand authority where applicable; re-tender without duplicate commitment or erased provenance.

## Automatic fail conditions

R00 fails if:
- any retained Phase-1 SPINE area is silently removed;
- any required product capability is represented only by an internal primitive;
- a business document lacks professional output/version semantics;
- a numbered document lacks numbering/concurrency/cancel-reissue rules;
- direct/sole-source/competitive routing depends on undocumented tribal logic;
- supplier registration/qualification/compliance/eligibility are collapsed into one status;
- tender technical evaluation is conflated with downstream material/submittal approval;
- bid normalization mutates supplier source truth;
- competing awards/orders can over-consume approved demand;
- an issued PDF is represented as an executed contract without execution evidence;
- schedule actuals are manually maintained when canonical events exist;
- savings/variance analytics hide the baseline used;
- AI can silently create commercial/technical/policy truth;
- CPOS requires a bespoke named ERP/CDE connector before first live tender;
- the proposed V2 first spine creates a second independent XL gravity well;
- a builder must invent material fields/workflow semantics during R01-R10 implementation.

## Freeze rule

A green CI run is not architecture acceptance. A self-review PASS_TO_INDEPENDENT_AUDIT is not architecture acceptance. Only the exact post-audit candidate with independent PASS + owner/domain MEANING_PASS may be frozen as Architecture V2.