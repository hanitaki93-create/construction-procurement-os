# P1.2 — Complete Provisional Operational Checkpoint v0.2

**Status:** REVIEW A PASS / REVIEW B PASS / REVIEW C REMEDIATED-PENDING-RECHECK / NOT FROZEN  
**Supersedes:** v0.1 for current provisional whole-graph interpretation.

## 1. Complete provisional process set

P01–P12 remains the complete-enough operational hypothesis set. No P13 is justified.

- P01 demand/planning/package/cost attribution/RequirementAllocation
- P02 vendor qualification/contextual eligibility/participant selection
- P03 tender event/release/addenda
- P04 external participation/intent/decline/bid revisions
- P05 normalization/leveling/comparison
- P06 recommendation/DOA/award
- P07 contractual/commercial truth including formation/change/instruction/fulfillment/certification/recovery
- P08 accounting/ERP authority/reconciliation
- P09 bounded deterministic control plane
- P10 procurement schedule/expediting overlay
- P11 closeout/security/warranty/recovery linkage
- P12 external technical/material approval dependency

## 2. Current integrated graph

`Project + Budget/Cost Structure`
`→ {DemandLine | PlannedRequirement}`
`→ AuthorizedRequirementBasis`
`→ RequirementAllocation`
`→ [optional ProcurementPackage]`
`→ vendor eligibility / TenderEvent / immutable release`
`→ TenderParticipant`
`→ BidSubmission revisions`
`→ normalization + internal evaluation`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation + ApprovalCase`
`→ AwardDecision`
`→ {direct obligation | CommercialTermsAuthority → call-off}`
`→ effective obligation baseline`
`→ controlled changes / AuthorizedWorkInstruction where applicable`
`→ composable fulfillment + valuation`
`→ BuyerEntitlement/Recovery where applicable`
`→ accounting authority/reconciliation`
`→ closeout/security/warranty`

Overlays:
- P09 command authority/compliance/evidence;
- P10 planning/forecast/expediting;
- P12 technical approval dependency.

## 3. Buyer recovery

Binding distinction:

`Buyer entitlement/recovery ≠ EffectiveCommitmentChange ≠ reduction of certified gross earned value`

Candidate recovery bases:
- LD/delay damages;
- backcharge/contra-charge;
- defect/rectification recovery;
- termination/replacement-cost recovery;
- bond/security/guarantee call proceeds;
- other evidenced contractual buyer recovery.

Recovery preserves basis, trigger, quantification, authority, evidence, dispute state and application/settlement.

A recovery may reference a different commitment where replacement/rectification cost is incurred elsewhere.

Recovery applied to payable does not rewrite gross earned value or original/current supplier-agreed contract price.

## 4. Core commercial positions

Authoritative/derived layers remain distinct:
- supplier-confirmed commercial basis;
- evaluated basis;
- effective original obligation;
- effective approved supplier-side changes;
- instructed/unagreed exposure;
- accepted goods;
- certified gross earned value;
- retention;
- advance/recoupment;
- buyer entitlement/recovery;
- payable basis;
- external AP/payment/job-cost authority where configured.

No editable generic current balance may compete with the event/evidence truth.

## 5. Framework / remeasurement / fulfillment carry-forward

- CommercialTermsAuthority may exist without scope consumption.
- Scope-backed minimum reserves existing allocation capacity; call-off draws reservation down.
- Monetary minimum does not fabricate physical scope.
- Both minimum types may coexist.
- Remeasurable scope always has hard conservation through real quantity/cap or ScopePartitionBasis.
- Quantity/scope basis and valuation basis are orthogonal.
- Valid scope-adding instruction may itself establish basis expansion if issuer authority is sufficient.
- Fulfillment mechanisms are composable.
- Every value-contributing mechanism resolves against common economic component identity; one economic value cannot be earned twice.

## 6. P09 boundary

P09 uses fixed semantic gate classes. Configuration may change thresholds/roles/evidence and permitted override behavior only within the semantics of a named gate class.

A customer may not:
- turn a hard domain invariant into an overridable policy;
- author arbitrary state machines/expression-driven financial semantics;
- make task completion create domain truth.

Tasks/notifications/escalations are outside the truth graph.

Compliance evaluation defaults to immutable evaluation events/evidence + derived current state.

## 7. P10 boundary

Separate:
- versioned planning/forecast/supplier-confirmed dates;
- actual milestone projections over canonical events.

No recursive CPM/critical-path/resource/network propagation.

Simple local deterministic forecast derivation is allowed only with visible source/formula/version and without creating a dependency-scheduling engine.

## 8. P11 boundary

P11 may track closeout obligations and buyer-recovery evidence but does not become legal claims management.

Claims/disputes remain reference/blocking context except for bounded contractual entitlement/recovery facts already quantified/governed.

Security:
`validity/expiry/release ≠ call/recovery`

## 9. First-live-tender compatibility

A narrow pilot may stop at AwardDecision.

P07–P12 implementation is not prerequisite.

Where downstream fulfillment remains external, expose governed disposition/handoff so allocation does not remain falsely active forever and no internal commitment is fabricated.

Simple pilot defaults may include:
- zero quantity tolerance;
- system-default deterministic rounding;
- simple governed cost-attribution/reference exception where allowed.

## 10. Object posture

Default collapses:
- compliance status = derived from evaluation events;
- bidder selection progression = TenderParticipant state/events;
- reconciliation exception = projection over integration events, with optional operational case outside truth graph;
- actual schedule milestone = projection over canonical events;
- framework reservation = allocation state/projection.

Durable identities remain provisionally justified for:
- technical approval dependency;
- closeout obligation/evidence;
- AuthorizedWorkInstruction;
- buyer entitlement/recovery where independent history/quantification/dispute/application exists.

## 11. Provisional ADR directions

The following are no longer honestly 'directionless open' ADRs. They remain primary-falsifiable and implementation-form-open:

- ADR-0003: requirement-authority semantic contract is load-bearing; physical root/hierarchy still open.
- ADR-0008: V1 bounded built-in controls, not arbitrary BPM; exact extension/config grammar open.
- ADR-0013: status/balance truth derives from canonical events; materialization strategy open.
- ADR-0014: deep provenance for load-bearing events required; exact storage/redaction/hash depth open.
- ADR-0019: effective dating/version binding required; temporal architecture open.
- ADR-0021: OWN/MIRROR/REFERENCE authority model set provisionally; deployment matrix/staleness open.

ADR-0022 remains open with mandatory deterministic policy use where rounding affects hard invariants.

## 12. Falsification targets

Primary audit must explicitly attempt to break:
1. universal pre-sourcing requirement authority;
2. allocation-before-commitment;
3. award distinct from commitment;
4. supplier claim / buyer assessment / certification separation;
5. composable fulfillment;
6. remeasurement under scope/cap conservation;
7. buyer recovery separate from contract change/gross earned value;
8. deterministic commercial truth coexisting with external accounting authority.

Primary capture remains blind/verbatim first; falsification mapping occurs after capture.

## 13. Gravity/burden

P07 remains the intended single XL gravity well.

P08/P09/P10/P11/P12 remain bounded by explicit anti-creep rules.

Review C's second-XL result before BL-09 remediation was CLEAN; remediation adds no independent subsystem.

## 14. Gate

Review A: PASS.  
Review B: PASS.  
Review C: FAIL → BL-09 remediated; narrow recheck required.

P1.2 cannot formally close until Review C passes and primary-evidence requirements are satisfied.
