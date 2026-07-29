# P1.2 — Complete Provisional Operational Checkpoint v0.3

**Status:** REVIEW A PASS / REVIEW B PASS / REVIEW C PASS / PRIMARY CHALLENGE ACTIVE / NOT FROZEN  
**Supersedes:** v0.2 for current whole-graph interpretation.

## 1. Architecture critique status

External hostile architecture review is complete:

- Review A — sourcing: PASS;
- Review B — commercial core/accounting seam: PASS;
- Review C — controls/overlays/full graph: PASS.

These passes establish internal structural coherence only.

They do not satisfy P1.2 primary-evidence closure.

## 2. Complete provisional process set

P01–P12 remains the complete-enough operational hypothesis set. No P13 is justified by current evidence/review.

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

## 3. Integrated graph

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

## 4. Core truth distinctions

Binding distinctions include:

- supplier offer ≠ normalized representation ≠ buyer evaluation adjustment;
- evaluated basis ≠ supplier-confirmed contractable basis;
- recommendation ≠ approval ≠ award;
- award ≠ effective commitment;
- CommercialTermsAuthority ≠ scope-consuming obligation;
- requirement/allocation scope authority ≠ value/budget governance;
- scope/quantity basis ≠ valuation basis;
- delivery ≠ receipt ≠ acceptance;
- supplier claim ≠ buyer assessment ≠ certification;
- gross certified earned value ≠ retention ≠ advance recoupment;
- buyer entitlement/recovery ≠ effective contract change ≠ reduction in gross earned value;
- commercial truth ≠ accounting posting/payment truth;
- commercial approval ≠ technical approval;
- operational completion ≠ full commercial/accounting closeout.

## 5. Scope conservation

RequirementAllocation remains the single procurement-scope authority lineage.

Every valid procurement obligation must reconcile to authorized scope through:
- quantitative basis/cap;
- scope partition basis;
- hybrid basis;
- governed basis expansion/reduction/reconciliation.

Remeasurable estimated quantity is not automatically a hard cap; where no genuine cap exists, ScopePartitionBasis is mandatory.

Unresolved downward-basis reconciliation blocks conflicting new allocation consumption and commitment binding.

## 6. Framework/minimum semantics

CommercialTermsAuthority may exist without consuming scope.

Each call-off/release/order creates its own effective obligation and binds backed RequirementAllocation scope.

Scope-backed guaranteed minimum:
- reserves capacity on the same allocation lineage;
- call-offs draw down reservation rather than consume twice.

Monetary minimum:
- remains derived commercial exposure;
- does not fabricate physical scope.

Both minimum types may coexist in one agreement.

## 7. Fulfillment / valuation

Scope/quantity basis and valuation basis remain orthogonal.

Fulfillment mechanisms may compose by scope/economic component:
- goods receipt;
- progress valuation;
- milestone certification;
- rate-based service;
- deliverable acceptance.

Every value-contributing mechanism resolves against common economic component identity.

One economic component cannot be earned twice.

Valid scope-adding AuthorizedWorkInstruction may itself establish basis expansion where contractual/internal authority is sufficient; it does not manufacture final supplier-agreed price.

## 8. Buyer entitlement / recovery

Binding distinction:

`Buyer entitlement/recovery ≠ EffectiveCommitmentChange ≠ reduction of certified gross earned value`

Candidate recovery bases include LD/delay damages, backcharges, defect/rectification recovery, termination/replacement-cost recovery and security calls.

Recovery preserves contractual basis, trigger, quantification, authority, evidence, dispute state and application/settlement.

Cross-commitment recovery preserves both the defaulting commitment and replacement/rectification commitment/cost evidence.

## 9. CR-02 — replacement/rectification procurement allocation

**Required before P07 fulfillment implementation; does not block primary challenge.**

Replacement/rectification procurement cannot bypass RequirementAllocation conservation merely because cost is recoverable from another supplier.

### Reversible source fulfillment

Where original fulfillment can be validly reversed/released, the applicable history-preserving reversal may return source allocation capacity and the replacement commitment consumes that restored capacity.

### Irreversible source fulfillment

Where original fulfillment/earned value remains valid historical truth, capacity does not silently return.

Replacement/rectification procurement requires governed basis expansion or another explicit authorized capacity mechanism before additional scope is committed.

Buyer recovery against the original supplier remains separate from replacement procurement authorization/cost.

## 10. Accounting/second-ledger boundary

P07 remains the single intended XL commercial gravity well.

Current contractual/commercial positions remain event/evidence-backed projections rather than editable competing balances.

P08 uses field/event authority:
- OWN;
- MIRROR;
- REFERENCE.

AP/payment/job-cost may remain externally authoritative.

No full GL/AP/cash ledger is required.

## 11. Bounded overlays

### P09

Fixed product-level semantic gate catalogue.

Deployment configuration may vary thresholds/roles/evidence and override behavior only where the built-in gate class permits it.

Hard domain/legal invariants cannot be made overridable.

Tasks/notifications/escalations are outside the truth graph; domain invariants cannot depend on task state.

### P10

Versioned required/baseline/forecast/supplier-confirmed dates are planning facts.

Actual milestones derive from canonical events.

Bounded local deterministic forecast derivation is permitted with visible source/formula/version.

CPM, float, recursive dependency-network propagation and resource-loaded scheduling are outside P10.

### P11

Tracks bounded commercial closeout/security/warranty/recovery facts and gates.

Claims/dispute substance, litigation/adjudication case management and legal strategy remain external/reference.

### P12

Tracks technical/material approval dependency/reference/gate semantics only.

No full CDE/submittal platform is required.

## 12. Object posture

Default collapses:
- compliance status = derived from immutable evaluation events/evidence;
- bidder selection progression = TenderParticipant facts/state;
- reconciliation exception = projection over integration events, optional operational case outside financial truth;
- actual schedule milestone = canonical-event projection;
- framework reservation = RequirementAllocation state/projection.

Durable identity remains provisionally justified where independent history/external identity/cross-process targeting exists, including technical approval dependency, closeout obligation/evidence, AuthorizedWorkInstruction and BuyerEntitlement/Recovery.

## 13. Provisional ADR directions

Status:

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

Applies to:
- ADR-0003 requirement authority/structural root direction;
- ADR-0008 bounded V1 workflow/control generality;
- ADR-0013 event-derived status;
- ADR-0014 deep provenance for load-bearing events;
- ADR-0019 effective dating/version binding;
- ADR-0021 OWN/MIRROR/REFERENCE integration authority model.

ADR-0022 remains open, with deterministic policy required whenever rounding affects hard invariants.

## 14. Primary falsification gate

Canonical falsification register:

`audits/P1_2_PRIMARY_FALSIFICATION_TARGETS_V0_1.md`

Ten predeclared claims must be challenged after blind/verbatim primary capture, including:
- requirement authority;
- allocation-before-commitment;
- award/commitment distinction;
- claim/assessment/certification distinction;
- fulfillment composability;
- remeasurement conservation;
- buyer recovery separation;
- accounting coexistence;
- rectification procurement reconciliation;
- exclusive-scope uniqueness.

Primary contradictions outrank Review A/B/C PASS.

## 15. First-live-tender boundary

A narrow sourcing pilot may terminate at AwardDecision without P07–P12 implementation.

Where downstream fulfillment remains external, expose a governed external-handoff/release disposition so allocation does not remain falsely active and no internal commitment is fabricated.

Simple deterministic defaults may minimize setup burden without weakening conservation.

## 16. Current gate

Architecture critique: **COMPLETE / A+B+C PASS**.

P1.2: **OPEN — PRIMARY CHALLENGE / CLOSURE ACTIVE**.

P1.2 closure still requires:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 case outside founder prior pattern;
- at least 1 original contractor bid-leveling/comparison artifact decomposed;
- supplier-side friction evidence;
- variants/workarounds/contradictions/unmatched observations;
- primary corroboration/contradiction status against the falsification register.

P1.3 remains locked until P1.2 formally closes.
