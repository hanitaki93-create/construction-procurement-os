# P06 — Recommendation / Approval / Governed Award v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**P1.2 purpose:** define how a preferred bid becomes an approved commercial decision with reproducible authority and evidence before commitment creation.  
**Primary CAL-001 status:** approval before LPO/PO is supported; exact DOA route, recommendation artifact and non-lowest justification mechanics remain UNKNOWN.

## 1. Problem to solve

The system must distinguish:
- working preference during evaluation;
- formal recommendation;
- required approvals/DOA;
- approved award decision;
- provisional/soft award communication;
- final commitment creation/execution.

It must answer:
- which vendor/bid revision/comparison snapshot was approved;
- for what scope/value/allocation;
- who recommended it;
- who had authority to approve it at that time;
- what exceptions/overrides existed;
- why the decision was made;
- whether the decision later became stale, superseded or converted to commitment.

Award cannot be a dropdown that merely changes bidder status to `Awarded` with no decision basis.

## 2. Strong reference patterns

### ProcurePro
`SREF-0031` places standardized recommendation and online approvals after comparison. `SREF-0030` describes recommendation/approval after leveling and negotiation, with commercial, technical, programme and risk commentary. Its product guidance explicitly calls out authority-to-let/authority-to-award style governance.

### Procore
`SREF-0034` supports a soft award without contract creation, proving selection/award status and commitment can be separate. `SREF-0033` then converts either the submitted or leveled bid basis into PO/subcontract and carries winning-bid information into the commitment.

### CMiC
`SREF-0035` supports comparative quote analysis and selected buyout items before downstream purchase/subcontract creation. Broader CMiC approval patterns show amount/context-sensitive approval structures elsewhere in the commercial lifecycle.

## 3. Provisional object boundary

### 3.1 `PreferredBidderSelection`
An internal working preference during evaluation/negotiation.

This is not an award and may change freely with audit.

Candidate fields:
- vendor;
- applicable bid revision;
- comparison snapshot;
- selected line/section allocation;
- current rationale/notes;
- estimator/QS/procurement owner;
- time.

### 3.2 `AwardRecommendation`
Formal proposal submitted for governance.

Candidate minimum content:
- recommendation ID/version;
- package/tender event;
- selected vendor(s);
- exact bid revision/agreed commercial basis;
- frozen ComparisonSnapshot;
- award allocation by line/section/package;
- recommended amount/currency/tax posture;
- budget/estimate/target context and variance;
- technical acceptance/conditions;
- commercial qualifications/deviations;
- programme/delivery assessment;
- compliance/risk status;
- negotiation summary;
- selected/non-selected reasoning as required by policy;
- exception/override requests;
- attachments/evidence;
- recommender + time.

### 3.3 `ApprovalCase`
The governed approval instance created from an AwardRecommendation.

Candidate identity:
- approval-case ID;
- recommendation version;
- authority-policy version/effective date;
- approval basis amount/context;
- required approval nodes/roles;
- actual approvers/delegates;
- sequential/parallel dependencies;
- decisions/comments;
- timestamps;
- escalation/expiry/staleness state.

### 3.4 `AwardDecision`
Immutable result after required governance completes.

Candidate outcomes:
- `APPROVED`;
- `REJECTED`;
- `RETURNED_FOR_REVISION`;
- `CANCELLED`;
- `SUPERSEDED`.

Approved decision references:
- exact recommendation;
- exact bid/agreed basis;
- exact comparison snapshot;
- approved allocations/value;
- approval evidence;
- conditions/exceptions;
- validity/expiry/reconfirmation requirements.

### 3.5 `AwardAllocation`
Maps the approved award to originating package/demand/comparison lines.

Needed for:
- split awards;
- partial awards;
- remainder/re-tender;
- preventing duplicate commitment of same authorized demand basis.

## 4. Critical distinction — recommendation vs approval vs award vs commitment

### Recommendation
“This is what the procurement/commercial team proposes.”

### Approval
“These authorities consent to the proposed decision under current policy.”

### AwardDecision
“This selection is now an approved internal commercial decision.”

### Commitment
“This approved decision has been instantiated as a PO/subcontract/contractual obligation.”

An approved award may appear as pending/intended commercial exposure, but it does **not** silently become authoritative committed cost before the commitment event defined in later process work.

## 5. Authority / DOA posture

Approval requirements should be derived from a versioned/effective policy using context such as:
- legal entity/company;
- project;
- award/commitment type;
- monetary threshold;
- budget variance;
- trade/category;
- non-lowest selection;
- compliance override;
- related-party/conflict risk;
- exceptional terms;
- emergency/sole source;
- delegated authority.

Architecture must preserve the **policy snapshot used for the decision**. A future DOA change cannot rewrite whether the 2026 award was authorized.

Exact company-specific rules are configuration, not hardcoded ontology.

## 6. Recommendation lifecycle

`DRAFT`

`→ READY_FOR_REVIEW`

`→ SUBMITTED_FOR_APPROVAL`

`→ {APPROVED | RETURNED | REJECTED | WITHDRAWN}`

If recommendation content materially changes after submission:
- create new version/resubmission;
- preserve prior approval activity;
- re-evaluate required approvals under policy.

## 7. Award validity / staleness

An approval may become stale before commitment if material basis changes, including:
- supplier quote validity expires;
- selected bid revision changes;
- scope/addendum changes;
- award value exceeds approved tolerance;
- legal vendor entity changes;
- compliance becomes disqualifying;
- technical approval condition fails;
- programme/delivery date materially changes.

Candidate responses:
- `RECONFIRM_REQUIRED`;
- recommendation revision + reapproval;
- explicit authorized tolerance policy.

No silent drift from approved decision to different contract basis.

## 8. Award justification posture

Every governed award needs a reproducible decision basis.

At minimum:
- what was selected;
- which evidence/comparison supported it;
- what commercial basis was approved;
- who approved;
- unresolved conditions/exceptions.

Additional narrative/rationale may be mandatory under policy for:
- non-lowest selection;
- sole source;
- fewer-than-required bids;
- compliance override;
- budget overrun;
- major qualifications/deviations;
- split award;
- related-party/conflict situation.

The system should not force artificial prose where the structured basis already explains an ordinary lowest-compliant award, but it must preserve enough evidence to explain the decision later.

## 9. Split / partial award semantics

The award layer must support:
- one vendor for whole package;
- multiple vendors by section/line;
- partial award with remainder open;
- no-award/re-tender;
- alternate selected instead of base;
- package divided into goods PO + subcontract.

AwardAllocation must reconcile to:
- authorized demand/package basis;
- comparison lines;
- selected bid revision;
- later commitment lines.

Double-awarding the same requirement requires an explicit overbuy/change action, not accidental duplicate conversion.

## 10. Soft/provisional award posture

A mature system may need a non-binding/pre-contract selection state for:
- internal planning;
- supplier notification subject to contract;
- long-lead coordination;
- final document preparation.

Candidate state: `PROVISIONAL_AWARD` / `SELECTED_PENDING_COMMITMENT`.

It must clearly disclose:
- non-binding status unless contract law/business policy says otherwise;
- conditions outstanding;
- expiry/revocation;
- who may communicate externally.

Do not conflate system status with legal contract formation.

## 11. Load-bearing invariants

1. **Award decision references a frozen recommendation/comparison basis.**
2. **Approvals are attributable to actual authority under a historical policy version.**
3. **Recommendation changes after approval require governed revision/reconfirmation.**
4. **Award is distinct from commitment.**
5. **Non-lowest/exception decisions cannot hide their basis.**
6. **Approval comments/conditions are preserved.**
7. **Delegation is explicit and effective-dated.**
8. **Split awards use explicit allocations.**
9. **No silent value/scope drift during award→commitment conversion.**
10. **Rejected/returned recommendations remain evidence.**
11. **Expired/stale decisions cannot be treated as current without reconfirmation policy.**
12. **Award allocations cannot exceed authorized basis unless controlled change/overbuy exists.**

## 12. Edge cases the process must survive

### E01 — Lowest bidder not selected
Second-lowest has complete scope/better programme/lower risk.

Required: selected bid + comparison evidence + non-lowest rationale under policy.

### E02 — Sole source / nominated vendor
Only one bidder permitted or available.

Required: explicit sourcing exception/justification; do not fabricate competitive comparison.

### E03 — Three-bid policy not achieved
Only two valid bids returned.

Required: coverage exception/approval rather than fake third quote.

### E04 — Recommendation returned for negotiation
Director requests AED 100k reduction.

Required: returned state; supplier negotiation creates revised/agreed bid evidence; recommendation v2 submitted.

### E05 — Quote expires while approval waits
Required: approval case flagged stale; supplier validity confirmation or revised quote before commitment.

### E06 — Compliance expires after approval
Required: later transition guard re-evaluates compliance; original award evidence remains valid historically but may not be executable.

### E07 — Split award
Vendor A gets supply, Vendor B installation.

Required: allocations reconcile to lines/scope; separate later commitment handoffs.

### E08 — Approved amount differs from final contract by small rounding/tax detail
Required: controlled tolerance rules; material difference triggers reapproval.

### E09 — Approver on leave
Delegated authority acts.

Required: valid delegation/effective dates and preserved identity; no shared credentials.

### E10 — Approval threshold crossed by negotiation change
Recommendation originally AED 900k; final becomes AED 1.05m crossing DOA threshold.

Required: recalculate required approvals, not reuse lower threshold approval.

### E11 — Technical approval is conditional
Commercial award approved subject to consultant material approval.

Required: explicit award condition and commitment/release guard.

### E12 — Award cancelled before PO/subcontract
Required: cancellation/supersession event; no destructive deletion; package can re-evaluate/re-tender.

### E13 — Preferred bidder changes during approval
Required: recommendation revision/new approval path; approvers never unknowingly approve a different vendor.

### E14 — Award approved from leveled view
Internal adjustments define decision basis.

Required: AwardDecision references leveled snapshot while preserving distinction from supplier's original bid; commitment must use actual agreed commercial basis, not unsupported internal allowances.

## 13. Failure patterns to reject

Fail later audit if design:
- treats “Awarded” bidder status as sufficient governance;
- cannot prove which comparison/revision approvers saw;
- stores only current approver roles with no historical policy version;
- allows material recommendation edits after approval without reapproval;
- auto-creates commitment before required approvals;
- converts internal evaluation allowance into vendor contract price without supplier agreement;
- forces competitive-bid justification where sole source is legitimate instead of modeling exception;
- loses returned/rejected recommendation history;
- cannot split award without duplicating package truth;
- treats approval as committed cost itself;
- has no stale/expiry handling before contract conversion.

## 14. Candidate flow

`P05 ComparisonSnapshot`

`→ PreferredBidderSelection`

`→ negotiate / obtain supplier revision as required`

`→ AwardRecommendation vN`

`→ derive ApprovalCase from effective DOA/policy`

`→ approvals / return / reject / delegate`

`→ AwardDecision`

`→ {provisional award communication | direct commitment preparation}`

`→ P07 Commitment creation/execution`

`→ derived package/demand award position`

## 15. Primary audit tests for later

1. What artifact is called recommendation/authority to award/ATL/etc.?
2. Who prepares it and from what comparison?
3. What mandatory evidence is attached?
4. How does DOA vary with amount/project/company/category?
5. Are non-lowest selections explicitly justified?
6. What happens when only one/two bids exist?
7. Can approvers return for negotiation and how is resubmission handled?
8. Does quote expiry invalidate approval?
9. How are delegated approvers managed?
10. Is award distinct from PO/subcontract issuance in practice?
11. How often are split awards used?
12. What prevents final PO/subcontract from differing from the approved recommendation?

## 16. Current disposition

### Strong enough to carry forward provisionally
- PreferredBidderSelection separate from formal recommendation;
- versioned AwardRecommendation;
- ApprovalCase bound to effective DOA/policy;
- immutable AwardDecision;
- AwardAllocation for split/partial awards;
- award distinct from commitment;
- stale/reconfirmation guard;
- structured justification + exception mechanics;
- exact comparison/bid basis preservation.

### Still unresolved
- exact DOA rule language/config model;
- approval-node representation/generalization depth;
- default recommendation required fields;
- legal meaning/UX of soft award;
- tolerance thresholds for award→commitment drift;
- whether technical acceptance is approval node, prerequisite, or referenced external state;
- exact budget overrun escalation policy.

## 17. Impact on P1.1

No frozen P1.1 change required.

This strongly supports PRC-14 governed award and its required immutable justification/provenance. It also reinforces the workflow/financial seam: approval governs authority, but the later commercial event/commitment substrate owns authoritative committed-cost truth.

## 18. Critique boundary

P01–P06 now form a coherent provisional sourcing subgraph:

`Demand/Package + Cost Attribution`
`→ Vendor Eligibility / Bidder Selection`
`→ Tender Event / Released Version`
`→ Invitation / Intent / Bid Revision`
`→ Normalization / Leveling / Comparison Snapshot`
`→ Recommendation / DOA Approval / Award Decision`

This is the right boundary for the next hostile critique **before** defining P07 Commitment and the heavier change/valuation/commercial-truth gravity well.
