# P1.2 — Sourcing Subgraph Checkpoint v0.1

**Status:** READY FOR HOSTILE CRITIQUE / NOT FROZEN  
**Coverage:** P01–P06  
**Evidence basis:** CAL-001 partial primary calibration + `SECONDARY_REFERENCE` official mature-system learning  
**Purpose:** integrate the first detailed process set before entering P07 Commitment / Change / Valuation commercial-core gravity well.

## 1. Covered process set

| Process | Canonical concern | Artifact |
|---|---|---|
| P01 | Demand / package initiation + cost attribution | `processes/P01_DEMAND_PACKAGE_COST_ATTRIBUTION_V0_1.md` |
| P02 | Vendor qualification / contextual eligibility / bidder selection | `processes/P02_VENDOR_ELIGIBILITY_BIDDER_SELECTION_V0_1.md` |
| P03 | Tender event / immutable release / addenda | `processes/P03_TENDER_PACKAGE_RELEASE_CONTROL_V0_1.md` |
| P04 | External access / intent / decline / non-response / bid revision | `processes/P04_EXTERNAL_TENDER_PARTICIPATION_V0_1.md` |
| P05 | Source-preserving normalization / leveling / comparison snapshot | `processes/P05_BID_NORMALIZATION_LEVELING_COMPARISON_V0_1.md` |
| P06 | Recommendation / DOA approval / governed award | `processes/P06_RECOMMENDATION_APPROVAL_GOVERNED_AWARD_V0_1.md` |

## 2. Integrated provisional lineage

`DemandLine`

`→ DemandAllocation`

`→ ProcurementPackage`

`→ BidderCandidate / EligibilityEvaluation / BidderSelection`

`→ TenderEvent`

`→ TenderRelease vN + Addenda`

`→ TenderInvitation / ExternalAccessGrant`

`→ BidIntent {Will Bid | Decline | Undeclared}`

`→ BidSubmission v1..n`

`→ ComparisonSchema + BidLineMapping + EvaluationAdjustment`

`→ ComparisonSnapshot`

`→ AwardRecommendation vN`

`→ ApprovalCase {effective DOA/policy}`

`→ AwardDecision + AwardAllocation`

`→ P07 Commitment handoff`

## 3. Canonical ownership / anti-duplication rules

### P01 owns demand truth
`Demand` / `DemandLine` owns what was required and authorized.

A `ProcurementPackage` groups/plans sourcing work but does not erase demand identity.

Any package-level labels such as `TENDERING`, `EVALUATION`, `AWARDED` or `COMMITTED` should be treated as **derived projections from linked P03–P07 events**, not manually maintained source-of-truth states.

### P02 owns supplier eligibility context
`Vendor` owns durable counterparty identity.

`VendorQualificationRecord` owns dated evidence/assessment.

`EligibilityEvaluation` owns package/project/time-specific participation suitability.

`BidderSelection` owns the human/policy decision to include/exclude a candidate.

No one of these may stand in for the others.

### P03 owns market release truth
`TenderEvent` owns one solicitation attempt/round.

`TenderRelease` owns exactly what was exposed to market at release time.

`TenderAddendum` owns controlled post-release amendments.

The mutable `ProcurementPackage` is not the supplier-facing evidence record.

### P04 owns supplier-origin response truth
`TenderInvitation` / `ExternalAccessGrant` owns invitation/access.

`BidIntent` owns explicit will-bid/no-bid communication.

Non-response/timeout is derived from absence of response at defined checkpoints; it is not a synonym for decline.

`BidSubmission` owns immutable supplier-origin offer versions.

### P05 owns internal comparable decision representation
`ComparisonSchema` / mappings / adjustments own the internal apples-to-apples view.

They may never overwrite P04 supplier-origin evidence.

A frozen `ComparisonSnapshot` is the exact evaluation basis passed into P06.

### P06 owns governed selection
`AwardRecommendation` owns what is proposed.

`ApprovalCase` owns authority/governance evidence.

`AwardDecision` owns approved selection.

`AwardAllocation` owns how approved scope is distributed across selected vendor(s).

P06 does **not** own authoritative committed cost. P07 begins that seam.

## 4. Cross-process invariants

1. **Immutable lineage:** every downstream decision can trace back to demand + market release + supplier bid revision.
2. **No destructive revision:** demand, tender releases, bids, comparison snapshots and award decisions are versioned/superseded rather than overwritten.
3. **No hidden allocation inflation:** sourced/awarded/committed allocation cannot exceed authorized demand basis absent explicit change/overbuy action.
4. **Vendor status is contextual:** qualification, eligibility, selection, invitation and submission are separate facts.
5. **Released tender evidence is frozen:** supplier-facing change requires addendum/new release.
6. **Decline ≠ non-response:** timeout is later derived state-machine logic.
7. **Supplier truth ≠ leveled truth:** normalization and internal adjustments remain source-linked internal representations.
8. **Negotiation that changes supplier economics must become supplier-confirmed/agreed evidence.**
9. **Award basis is frozen:** approved decision references exact bid/comparison/recommendation/policy versions.
10. **Award ≠ commitment:** approved selection may affect forecast/pending exposure but not authoritative committed cost until P07 event.
11. **DOA is effective-dated:** historical decisions remain reproducible after policy changes.
12. **Compliance re-evaluates at commercial gates:** later expiry/suspension does not rewrite earlier historical eligibility.
13. **External participation is bounded:** supplier access need not become broad tenant/project membership.
14. **AI is assistive/provenance-bearing:** extraction/recommendation may propose but cannot silently create commercial truth.
15. **Confidentiality is enforced below UI:** bidder submissions remain isolated and blind-bid policy is auditable.

## 5. Key derived projections

The system may present convenient current states, but these should derive from canonical events wherever possible.

Examples:
- demand fulfillment: allocated / tendered / awarded / committed / remaining;
- package status: preparing / tendering / evaluating / award pending / committed;
- bidder status: invited / accessed / will bid / declined / submitted / no response;
- tender coverage: selected / invited / responding / submitted counts;
- current comparison: latest included bid revisions + accepted normalization;
- award pending: approved decision not yet converted to commitment.

The projection may be cached, but cache is rebuildable from canonical evidence/events.

## 6. Edge-thread walkthroughs

### GT-S01 — Ordinary material request
`Demand lines → direct/package sourcing → selected vendors → tender release → bids → leveling → award → later PO`

Must support partial demand, different suppliers and remaining quantity.

### GT-S02 — Planned subcontract package
`Estimate/procurement schedule → package before MR → bidder eligibility → tender → revisions → comparison → recommendation → DOA → later subcontract`

Must preserve link back to later/related demand and budget/cost attribution.

### GT-S03 — Retender
`TenderEvent A → no valid/insufficient outcome → TenderEvent B`

Package remains same planning context; Event A evidence is retained.

### GT-S04 — Addendum after submission
`Release v1 → Bid v1 → Addendum → bidder notified → Bid v2/confirmation`

System must not silently treat v1 as compliant with later scope.

### GT-S05 — Non-lowest award
`Bid A lowest but scope/risk weak → internal leveling → bidder B selected → recommendation rationale → DOA approval`

Supplier prices remain intact; internal allowance/risk logic remains distinguishable.

### GT-S06 — Split award
`One package → comparison lines → AwardAllocation A + B → remainder/open basis`

No duplicate commitment conversion of same demand/comparison allocation.

### GT-S07 — Supplier compliance expires mid-cycle
`eligible/invited → bid submitted → compliance expires → recommendation/award re-check`

Original bid/invitation remains historical evidence; later gate can block/override progression.

### GT-S08 — Email quote / no portal behavior
`secure invitation → supplier emails PDF → authorized on-behalf ingestion → immutable source → normalization`

Low-friction reality remains supported without destroying provenance.

### GT-S09 — Quote expires after approval
`AwardDecision approved → quote validity expires before P07 commitment`

Decision becomes stale/reconfirmation required; no silent contract on expired basis.

## 7. Internal self-audit findings before hostile critique

### Finding A — P01 package lifecycle wording can look duplicative
P01 lists package labels such as tendering/evaluation/awarded.

**Resolution at checkpoint:** these are explicitly treated as derived package projections. P03/P04/P05/P06 own canonical downstream state/evidence.

No immediate P01 rewrite is required before critique, but later consolidation should make this explicit in the process artifact itself.

### Finding B — object count is high
The detailed model introduces many names: QualificationRecord, EligibilityEvaluation, BidderCandidate, BidderSelection, TenderEvent, TenderRelease, Invitation, AccessGrant, BidSubmission, ComparisonSnapshot, AwardRecommendation, ApprovalCase, AwardDecision, etc.

**Risk:** architecture could become semantically correct but implementation-heavy/fantasy-ERP.

**Critique question:** which must be durable first-class objects versus event records/projections/value objects while retaining invariants?

### Finding C — generalized workflow-engine gravity
P02–P06 repeatedly need approvals, returns, exceptions, effective policies, delegation and transitions.

**Risk:** accidentally creating a second XL generalized workflow engine before the commercial core.

**Current posture:** define reusable approval/state primitives, not a user-programmable BPM engine. Hostile critique should test whether this is actually feasible.

### Finding D — negotiated basis seam needs attack
P05 distinguishes internal leveling from supplier-confirmed economics; P06 can approve a leveled basis.

**Risk:** commitment may accidentally inherit internal allowances that supplier never accepted.

**Required P07 seam:** commitment lines must originate from actual agreed commercial basis; internal evaluation-only adjustments cannot become contractual values without explicit supplier/agreement evidence.

### Finding E — award legal semantics
A `PROVISIONAL_AWARD`/soft-award state is operationally useful but can be legally dangerous if UI/workflow implies binding acceptance.

**Current posture:** separate internal selection, approval and external communication; legal effect remains jurisdiction/configuration-dependent.

### Finding F — offline/email ingestion identity
Supporting emailed PDFs is essential for low friction.

**Risk:** internal user could misattribute or alter received evidence.

**Required:** original message/file/time/source provenance + on-behalf ingestion actor + immutable source attachment.

### Finding G — split award allocation complexity
P01 partial allocations + P05 line comparison + P06 AwardAllocation provide structural support.

**Risk:** concurrency/double-award bug at conversion.

**Required later:** atomic allocation/commitment guards and idempotent conversion.

## 8. Burden / gravity check

The sourcing subgraph should **not** become a second independent XL gravity well.

Expected burden posture:
- P01 demand/package: M/L;
- P02 eligibility/selection: M;
- P03 tender release/versioning: M;
- P04 external participation: M/L due security/access;
- P05 comparison/normalization: L, with AI optional/future;
- P06 recommendation/approval: M/L;
- shared approval/provenance/state primitives: platform infrastructure, bounded rather than generalized BPM.

Hostile critique must reject the design if these processes secretly require:
- bespoke workflows per customer;
- full supplier portal identity platform;
- full CDE/document management;
- full accounting budget engine;
- user-programmable BPM/workflow engine;
- project-specific data ontology;
- major named integrations before first live tender.

This preserves the P1.1 burden constraints and one-XL-gravity-well rule.

## 9. What is ready for critique

Attack whether P01–P06 can coherently support:

`need → market → bid → decision`

without:
- parallel spreadsheet truth;
- destructive updates;
- impossible supplier UX;
- fake workflow universality;
- uncontrolled object/state explosion;
- premature generalized platform machinery.

## 10. What critique should NOT require yet

Do not fail this checkpoint merely because:
- independent P1.2 contractor cases are not yet acquired;
- P07 commitment/change/valuation is not yet specified;
- exact status labels are provisional;
- exact DOA thresholds are customer configuration;
- exact UI/screens are not designed;
- future AI automation depth is undecided.

Those are later/evidence-owned issues unless P01–P06 have already created an irreversible contradiction.

## 11. Checkpoint verdict

**INTERNAL SELF-AUDIT: READY FOR HOSTILE CRITIQUE.**

No P1.1 frozen change is proposed yet.

The next action should be a hostile architecture critique of P01–P06. Do not start P07 until blocker-level sourcing contradictions are either cleared or explicitly accepted for later ownership.
