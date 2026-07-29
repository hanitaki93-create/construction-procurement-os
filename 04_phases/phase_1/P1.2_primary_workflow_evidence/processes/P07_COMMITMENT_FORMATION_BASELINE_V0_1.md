# P07 — Commitment Formation / Original Commercial Baseline v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / SOURCING_CRITIQUE_PENDING / AUDIT LATER  
**P1.2 purpose:** define how an approved award becomes an enforceable commercial commitment without collapsing internal award, contractual formation, original baseline, later change, goods receipt, subcontract valuation or accounting payment truth.  
**Dependency:** P01–P06 sourcing mechanics are provisionally remediated but final external B5/B6 critique is still pending. Nothing here closes that critique or freezes sourcing-dependent ontology.  
**ADR posture:** ADR-0004 PO/Subcontract type model remains `PROPOSED / PENDING`; ADR-0005 accounting/commercial ownership seam remains open.

## 1. Problem to solve

After award approval, the system must answer separately:

- what supplier/commercial basis was approved;
- what contractual document/commitment was actually created;
- when and by whom it became effective under the organization's policy;
- what exact original scope/value/terms became the baseline;
- what requirement-allocation leaves it consumes;
- what financial/cost attribution applies;
- what later changed without rewriting the original;
- whether downstream fulfillment is goods receipt or subcontract/service valuation;
- what the platform owns versus what an external accounting/ERP system owns.

The design must not equate:

`AwardDecision = Commitment`

or

`current commitment value = editable original amount`.

## 2. Mature-system reference patterns

### Procore

The current Commitments product treats purchase orders and subcontracts as commitment types within one financial-management surface, with separate creation paths but shared contract/change/invoice concepts. It supports commitment change orders, subcontractor invoices, SOV behavior, payments and retainage. This supports a common semantic commitment layer while preserving subtype-specific downstream behavior.

### Oracle Primavera Unifier

A Base Commit represents monies committed to be spent, such as a contract or purchase order. Once the relevant terminal/approved status is reached, it can create the SOV. Change Commit processes alter the base commitment and update the same SOV rather than rewriting the original base record. This strongly supports `original baseline + approved changes` rather than mutable current-value truth.

### CMiC

Purchase orders update committed cost and integrate with requisition, receipt, invoice and 3-way-match behavior. Subcontracts maintain original amount, posted/pending changes, SOV/progress/payment and retainage behavior. Both are commercial commitments, but their fulfillment/payment mechanics diverge materially.

## 3. Provisional semantic boundary — commitment without resolving ADR-0004

P07 uses **`Commitment` as a semantic role**, not yet as a mandated persisted supertype.

ADR-0004 still decides later whether implementation becomes:

- separate PO and Subcontract top-level models;
- one common Commitment aggregate with subtype specialization;
- composition around shared commercial interfaces;
- another evidence-supported structure.

P07 may define invariants common to contractual obligations without deciding the final entity hierarchy.

## 4. Preconditions for commitment formation

A commitment may be prepared only from a valid award basis or an explicitly governed non-tender/direct-source equivalent.

Candidate mandatory inputs before becoming effective:

1. approved `AwardDecision` or authorized direct-source decision;
2. approved `contractable_agreed_basis` traceable to supplier-confirmed `BidSubmission` evidence;
3. selected legal counterparty identity;
4. legal entity/company issuing the commitment;
5. project/context;
6. one or more existing `RequirementAllocation` leaf bindings covering the committed scope;
7. final cost attribution, or explicit governed unresolved/external-attribution exception;
8. currency and tax posture;
9. contractual scope/line/SOV basis adequate for the commitment type;
10. terms, dates and required supporting documents;
11. required commitment-level approval/signature/execution conditions if distinct from award approval.

Award approval alone does not prove legal formation.

## 5. Candidate commitment baseline

The original commitment baseline should preserve, at the applicable grain:

- commitment identity/number;
- source AwardDecision/direct-source authority;
- source `contractable_agreed_basis` bid revision(s);
- legal entity/company;
- supplier/subcontractor legal counterparty;
- project;
- commitment category/type candidate (`GOODS_PO`, `SUBCONTRACT`, `SERVICE_ORDER`, other later-evidenced type);
- original scope description;
- original line/SOV structure;
- original quantity/UOM where applicable;
- original rate/amount;
- currency;
- tax/VAT treatment;
- cost code/CBS/WBS/category attribution;
- delivery/work location;
- start/delivery/completion dates or windows;
- payment terms;
- retention rules where applicable;
- advance/payment security/recoupment terms where applicable;
- bonds/insurance/guarantees where applicable;
- document/version references;
- execution/acceptance/signature evidence;
- effective date/time;
- actor/system that performed conversion.

The exact field set differs by subtype and remains evidence-dependent.

## 6. Critical distinction — draft, issued, effective, closed

Do not use one generic `APPROVED` state to mean everything.

Candidate semantic stages:

### `DRAFT_COMMITMENT`

Document/commercial record is being prepared from the approved award basis.

It is not authoritative committed cost.

### `READY_FOR_EXECUTION`

Required internal preparation is complete and the commitment may be issued/signed/accepted under policy.

### `ISSUED`

The buyer has formally transmitted/issued the document where issue is a meaningful event.

Issue may or may not itself create legal effectiveness depending on commitment type, terms and jurisdiction/business policy.

### `EFFECTIVE`

The contractual obligation is active under the governing formation rule.

This is the candidate event that creates authoritative commercial committed-cost truth in the product's commercial substrate, subject to the still-open accounting ownership seam.

### Later lifecycle labels

Possible projections include:
- `PARTIALLY_FULFILLED`;
- `FULLY_FULFILLED`;
- `SUSPENDED`;
- `TERMINATED`;
- `CLOSED`;
- `CANCELLED_BEFORE_EFFECTIVE`.

Exact lifecycle belongs to P1.5 state-machine design.

## 7. Legal-effect policy

The system must not assume all commitment types become legally effective the same way.

Candidate formation rules may include:

- buyer issue alone;
- supplier acknowledgment/acceptance;
- bilateral signature;
- digital signature completion;
- notice-to-proceed or condition satisfaction;
- ERP posting plus document execution;
- another configured/evidenced rule.

Therefore `effective_at` must derive from an explicit formation event/policy, not from UI status alone.

Primary evidence must later test real UAE contractor practice for PO acceptance, subcontract signature, LOA/LOI/soft-award and work-start scenarios.

## 8. Original baseline is immutable commercial history

Once effective:

`ORIGINAL_COMMITMENT_BASELINE`

must not be destructively edited to represent later commercial change.

Corrections before effectiveness may create draft revisions.

After effectiveness, material scope/value/date/term changes must use controlled change/correction semantics owned by later P07/P08 work.

Candidate current value projection:

`Current Approved Commitment = Original Effective Baseline + Approved Commitment Changes`

not:

`Current Approved Commitment = manually edited original amount`.

Pending/unapproved changes may appear in forecast/exposure projections but do not silently alter approved committed cost.

## 9. RequirementAllocation binding

Commitment formation binds existing active allocation leaf/leaves; it does not create a second allocation ledger.

Rules:

1. commitment references the exact allocation leaves consumed;
2. quantity/scope conservation remains governed by the allocation lineage;
3. award→commitment conversion is idempotent;
4. repeated API/retry actions cannot create duplicate commitments against the same exclusive leaf unless explicit shared/multi-commit scope policy permits it;
5. allocation estimated value is not commitment value authority;
6. commitment amount originates from approved `contractable_agreed_basis`;
7. later commitment change that changes scope must reconcile with the authorized requirement basis under the B5 hard scope/quantity rule.

This section is `SOURCING_CRITIQUE_PENDING` until final B5/B6 re-review clears.

## 10. Budget / value-control seam

A commitment price above estimate/budget is not an allocation correctness failure.

Before effectiveness, the product may require:

- budget variance visibility;
- additional DOA;
- budget exception;
- budget revision/reallocation;
- external ERP validation;
- explicit proceed-with-variance authority.

But final ownership of budget availability, encumbrance, accounting posting and ERP authority remains open under ADR-0005 / ADR-0011 / later P1.4–P1.5 work.

P07 must preserve enough context to reconcile whichever system later owns those fields/events.

## 11. Common commercial invariants across PO and Subcontract candidates

Without resolving implementation hierarchy, both goods PO and subcontract paths appear to require:

1. durable legal counterparty identity;
2. issuing legal entity/project context;
3. original commercial baseline;
4. line/scope attribution;
5. currency/tax basis;
6. cost attribution;
7. authority/execution evidence;
8. effective date;
9. immutable original baseline;
10. controlled approved changes;
11. current approved value derived from baseline + approved changes;
12. fulfillment/valuation linkage;
13. retention/advance/recoupment terms where applicable;
14. provenance/audit history;
15. accounting/reconciliation interface.

These shared invariants do not prove one common database aggregate.

## 12. Downstream subtype divergence

### Goods / material PO path

Mature-system evidence strongly suggests emphasis on:

- ordered quantity/rate/amount;
- expected delivery;
- partial delivery;
- receipt/rejection/claim;
- line-level receipt allocation;
- invoice matching;
- 2-way/3-way match policy;
- blanket/release PO variants;
- inventory interface where in scope.

CMiC explicitly supports PO receipt and line-level PO→receipt→invoice matching.

### Subcontract path

Mature-system evidence strongly suggests emphasis on:

- SOV/work-item structure;
- unit or lump-sum line values;
- progress/payment applications;
- current/prior completion;
- retention withheld/released;
- approved/pending changes;
- remaining-to-pay/current contract value;
- advance/recoupment where contractually used;
- pay-when-paid or other payment conditions where applicable.

CMiC and Oracle both preserve base commitment + changes + SOV/payment progression; Procore supports commitment SOV, subcontractor invoicing and retainage.

Therefore P07 should share the formation/baseline semantics while allowing downstream fulfillment engines to diverge.

## 13. Commitment line / SOV identity

The baseline requires stable line identity because later events must target specific commercial scope without rewriting old documents.

Candidate sources:

- selected tender/comparison line;
- supplier bid line;
- negotiated final price schedule;
- buyer-created PO item line;
- subcontract SOV item;
- lump-sum scope partition.

Each effective line should retain source lineage to the approved contractable basis and cost attribution.

Do not force false line precision where the contract is legitimately lump sum.

## 14. Current-value projections

Candidate derived views may include:

- original commitment value;
- approved change value;
- pending change exposure;
- current approved commitment value;
- received/value-delivered position for goods;
- certified/progress value for subcontract/service;
- invoiced position;
- retention withheld/released;
- advance paid/recouped;
- paid position if owned or mirrored;
- remaining exposure/balance.

These are projections over authoritative events/terms. Which are product-owned versus mirrored remains open.

## 15. Edge cases the process must survive

### E01 — Award approved but contract never issued

Required: award remains approved selection; no effective commitment cost event exists.

### E02 — PO issued but supplier rejects terms

Required: preserve issue evidence; do not mark effective under acceptance-required policy.

### E03 — Subcontract requires both signatures

Required: bilateral execution condition; draft/issued does not equal effective.

### E04 — Supplier starts work before formal subcontract signature

Required: represent unauthorized/exceptional early-start exposure explicitly; do not backdate signature/effectiveness silently. Primary evidence/legal policy later determines treatment.

### E05 — Award total AED 1,000,000, contract final agreed amount AED 995,000 before execution

Required: contractable basis must be updated through supplier-confirmed revision and award tolerance/reconfirmation policy before effectiveness; do not edit approved evidence silently.

### E06 — PO line is partially committed across two suppliers

Required: separate allocation leaves + separate commitments; no double consumption.

### E07 — Lump-sum subcontract

Required: stable scope/SOV/partition identity without fabricated quantities.

### E08 — Contract effective, then scope increases

Required: controlled change path; original baseline remains unchanged.

### E09 — Contract cancelled before effectiveness

Required: preserve draft/issue history; no committed-cost event if formation never occurred.

### E10 — Effective PO later terminated with undelivered balance

Required: termination/close event governs remaining obligation; do not erase original commitment or prior receipts.

### E11 — Supplier legal entity differs from bid entity

Required: no silent counterparty substitution; explicit reconfirmation/governance before effectiveness.

### E12 — Accounting system creates its own PO number after product commitment

Required: preserve product identity + external accounting identity + authority mapping; do not overwrite one with the other.

## 16. Failure patterns to reject

Fail later audit if design:

- creates authoritative commitment merely because award is approved;
- treats draft PO/subcontract as committed cost;
- edits original effective value to represent change;
- uses internal `evaluated_basis` instead of supplier-confirmed `contractable_agreed_basis` for contract creation;
- creates new allocation balances at commitment;
- requires one identical fulfillment model for material PO and subcontract;
- forces all commitments into item-master/quantity precision;
- cannot prove formation/signature/acceptance evidence;
- cannot distinguish pending from approved change;
- makes accounting system-of-record ownership implicit;
- cannot preserve both internal and external commitment identities;
- loses original baseline after termination/close.

## 17. Primary audit tests for later

1. At what exact point do contractors consider a PO legally/economically committed: approval, issue, supplier acknowledgment, delivery, ERP posting, or another event?
2. At what exact point does a subcontract become binding in practice?
3. Are LOA/LOI/soft-award/work-start instructions common, and how are they controlled?
4. Does final PO/subcontract value ever differ from approved award, and how is reconfirmation handled?
5. Who creates final PO/subcontract and who signs/approves it?
6. What original fields are allowed to change after issue/effectiveness today?
7. Are changes represented as formal VO/CO/SCO/PO amendments or edited into the base document?
8. How do goods PO lines map to GRN/receipt/invoice?
9. How do subcontract lines/SOV map to progress claim/certification?
10. Where are retention, advance and recoupment rules stored and calculated?
11. Which system owns PO/subcontract number, committed value, invoice/payment and paid status?
12. What happens when supplier legal entity or bank/payment terms change after award?
13. How are cancelled/terminated commitments reflected in current commercial position?
14. Do contractors permit commitments without final cost-code attribution?
15. What happens when final award exceeds estimate/budget?

## 18. Current disposition

### Strong enough to carry forward provisionally

- award and commitment remain separate;
- commitment uses approved supplier-confirmed contractable basis;
- legal/economic effectiveness is an explicit event/policy, not a generic status;
- original effective baseline is immutable;
- approved current value derives from original baseline + approved changes;
- existing `RequirementAllocation` leaves bind through commitment rather than creating another allocation ledger;
- goods PO and subcontract share commitment invariants but downstream fulfillment diverges;
- stable line/SOV identity is required;
- accounting ownership remains explicit and unresolved.

### Still intentionally unresolved

- ADR-0004 final PO/Subcontract implementation structure;
- exact legal formation defaults by commitment type/jurisdiction;
- whether product or ERP owns final numbering;
- accounting posting/encumbrance ownership;
- detailed commitment state names;
- exact document/signature subsystem ownership;
- change-event object model;
- goods receipt state machine;
- subcontract valuation/certification state machine;
- retention/advance/recoupment calculation rules;
- termination/cancellation financial semantics.

## 19. Next P07 decomposition

Before the next hostile critique, continue into:

1. **P07B — Controlled Commitment Change / Variation**: original baseline vs pending/approved change, negative change, scope/value/date change, approval/reversal/cancellation.
2. **P07C — Goods Fulfillment / Receipt / GRN / Invoice-Match seam**.
3. **P07D — Subcontract SOV / Progress Valuation / Certification / Retention / Advance / Recoupment seam**.
4. integrate current commercial-position projections and accounting ownership questions without prematurely closing ADR-0005.

The final external sourcing recheck remains pending separately and can still overturn sourcing-dependent P07 assumptions.