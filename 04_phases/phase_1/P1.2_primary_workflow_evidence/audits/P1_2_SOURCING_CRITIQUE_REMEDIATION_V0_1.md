# P1.2 — Sourcing Hostile Critique Remediation v0.1

**Status:** REMEDIATION APPLIED / RE-REVIEW REQUIRED / P07 BLOCKED  
**Critique basis:** external hostile review of portable P01–P06 packet, verdict `FAIL — remediate blockers before P07`.  
**Scope:** B1–B4, ADR-0003 anchoring correction, and cheap object-count simplifications identified as non-blocking watch items.

## 1. Disposition summary

| Critique item | Disposition | Correction |
|---|---|---|
| B1 agreed commercial basis has no owner | ACCEPT | `BidSubmission` becomes the only supplier-confirmed economic basis source; every economic change requires a new submission revision. Buyer ingestion has explicit capture provenance. |
| B2 evaluated amount vs contractable amount conflated | ACCEPT | Award recommendation/decision carry separate `evaluated_basis` and `contractable_agreed_basis`; P07 may consume only the latter. |
| B3 multiple allocation ledgers | ACCEPT DIAGNOSIS / MODIFY CURE | Replace `DemandAllocation` + `AwardAllocation` authority with one canonical `RequirementAllocation` lineage at demand-line grain. Do not use cumulative stage rows that can triple-count the same quantity. |
| B4 FX/tax not frozen | ACCEPT | Submission carries source currency/tax posture; comparison snapshot freezes every applied FX rate/source/date and tax-normalization basis. |
| ADR-0003 package anchoring | ACCEPT | `ProcurementPackage` is optional. Direct demand→tender and package-led-before-demand paths are explicit. ADR-0003 remains open. |
| P02/P04 object inflation | ACCEPT WITH BOUNDARY | Collapse `BidderCandidate` + `BidderSelection` + invitation lifecycle into a `TenderParticipant` aggregate at tender×vendor grain; preserve selection/invitation/access/intent/submission as separate dated facts/events. |
| `PreferredBidderSelection` | ACCEPT DELETE | Treat as comparison annotation/event, not durable aggregate. |
| `EligibilityEvaluation` | ACCEPT COLLAPSE | Dated evaluation event on `TenderParticipant`; `VendorQualificationRecord` remains reusable vendor-level evidence. |

## 2. B1 — supplier-confirmed economic basis

### Binding rule

A contractable supplier economic basis must always resolve to an immutable `BidSubmission` revision.

`ClarificationThread`, meeting note, chat, or email correspondence may provide evidence **for** a change, but it cannot itself be the authoritative commercial basis consumed by award or commitment.

When negotiation changes price, quantity basis, commercial terms, exclusions, alternates, programme commitments or other material economics:

`existing BidSubmission vN → supplier confirmation evidence → BidSubmission vN+1`

The new revision may be captured directly by the supplier or ingested on behalf of the supplier from received source evidence.

### Provenance refinement

Do not use one ambiguous `origin=BUYER_INGESTED` field because commercial origin and system-entry actor are different dimensions.

Candidate submission provenance:
- `commercial_origin = SUPPLIER`;
- `capture_mode = SUPPLIER_DIRECT | BUYER_ON_BEHALF`;
- `submitted_or_confirmed_by` supplier contact/identity where available;
- `captured_by_actor` when buyer-side ingestion occurs;
- `source_channel`;
- immutable `source_artifact` / message/file evidence;
- receipt timestamp;
- capture timestamp;
- verification/review status where transcription/extraction occurred.

Buyer-side ingestion must never turn an internally invented number into supplier truth. The immutable source artifact remains the evidentiary anchor.

### Consequence

The four commercial layers become:

1. supplier-confirmed `BidSubmission` truth;
2. extracted/normalized representation;
3. internal evaluation adjustment;
4. later supplier-confirmed `BidSubmission` revision representing negotiated/agreed basis.

Layer 4 is therefore owned; it is not a fifth floating record type.

## 3. B2 — evaluated basis vs contractable basis

`AwardRecommendation` and approved `AwardDecision` must distinguish two separate bases.

### `evaluated_basis`

Internal decision basis derived from the frozen comparison snapshot, potentially including:
- normalized quantities;
- FX/tax normalization;
- missing-scope allowances;
- risk allowances;
- internal benchmark adjustments;
- other buyer-only evaluation effects.

It explains **why the bidder was selected**.

### `contractable_agreed_basis`

Supplier-confirmed commercial basis that may become contractual obligation.

It must reference:
- exact `BidSubmission` revision(s);
- selected scope/line/section allocation;
- source currency/tax posture;
- agreed totals/rates/terms relevant to the award;
- any supplier-confirmed alternate/discount/clarification incorporated into the final offer.

It explains **what the supplier actually agreed to**.

### Approval rule

Approval evidence must show both bases and explicitly identify the `contractable_agreed_basis` being authorized for commitment conversion.

P07 may read **only** the approved `contractable_agreed_basis` when creating a commitment.

Internal `EvaluationAdjustment` values cannot be converted to contractual price merely because the recommendation was approved.

Award→commitment tolerance rules apply only after the approved contractable basis is known; they do not bridge ambiguity between evaluated and supplier-agreed amounts.

## 4. B3 — one allocation authority, not three ledgers

The hostile critique correctly found that `DemandAllocation`, `AwardAllocation`, and a future commitment allocation could become competing writers over the same authorized requirement.

The proposed cure of one table with independent `SOURCING | AWARD | COMMITMENT` rows is not accepted as written because the same 100 units could appear once at each stage and be misinterpreted as 300 units.

### Canonical correction — `RequirementAllocation`

Use one authoritative allocation lineage at `DemandLine` grain.

A `RequirementAllocation` represents an authorized slice of requirement quantity/value as it progresses through procurement.

Candidate identity/invariants:
- immutable allocation ID;
- originating demand line or explicit package-led planning basis;
- authorized quantity/value basis;
- active leaf quantity/value;
- parent allocation ID when created by split;
- sourcing/package/tender references as applicable;
- award-decision/vendor reference when awarded;
- commitment reference later when committed;
- lifecycle/history events;
- closed/cancelled/remainder disposition.

### Split semantics

Example: demand line = 100 units.

One sourcing allocation of 100 may later split into:
- child A = 60 units → vendor A award;
- child B = 40 units → vendor B award.

The parent becomes non-active after the split. Only active leaf allocations count toward the authorized-basis constraint.

### Stage progression

Sourcing, award and commitment are stage transitions/references on the same allocation lineage, not three independently additive balances.

Physical table/event implementation remains a P1.5 decision, but canonical truth is now singular:

`authorized demand basis → RequirementAllocation lineage → award binding → commitment binding`

Rules:
1. sum(active leaf allocation quantity/value) ≤ authorized basis unless controlled overbuy/change;
2. split/merge/close actions are atomic and history-preserving;
3. award and commitment may not create a second independent allocation record representing the same slice;
4. retries/conversion are idempotent;
5. P07 binds commitment to existing allocation leaf/leaves rather than creating another allocation ledger.

`DemandAllocation` and `AwardAllocation` are superseded as separate authoritative concepts by `RequirementAllocation`.

## 5. B4 — FX and tax reproducibility

### `BidSubmission`

Must preserve source commercial posture, including where applicable:
- source currency at header/line grain;
- tax/VAT inclusive/exclusive status;
- stated tax rate/amount where supplied;
- freight/duty/other commercial basis needed to interpret submitted total.

### `ComparisonSnapshot`

A frozen snapshot must include every transformation needed to reproduce rankings later.

For each applied FX conversion:
- source currency;
- target/comparison currency;
- exact rate;
- rate source;
- rate date/time or policy fixing date;
- rounding policy/reference.

For tax normalization:
- target comparison tax basis;
- bidder/source tax posture used;
- applied tax treatment;
- calculation/rounding basis.

A later live FX/tax configuration change must never change a historical comparison result.

## 6. ADR-0003 — preserve multiple structural roots

`ProcurementPackage` is explicitly optional.

Candidate sourcing entry patterns are:

### A. Demand-led direct sourcing

`DemandLine → RequirementAllocation → TenderEvent / direct-source event`

### B. Demand-led packaged sourcing

`DemandLine → RequirementAllocation → ProcurementPackage → TenderEvent`

### C. Package-led planning before detailed demand

`Estimate / Procurement Plan / Long-lead Trigger → ProcurementPackage → TenderEvent`

Later demand/requisition may reconcile to the existing package through `RequirementAllocation` lineage rather than duplicating truth.

Therefore no universal package root is chosen. ADR-0003 remains `PROPOSED / PENDING` until primary evidence and later P1.5 resolution.

## 7. Object simplification before P07

### 7.1 `TenderParticipant`

Collapse the candidate/selection/invitation shell to one aggregate at `(TenderEvent × Vendor)` grain.

It may carry or reference dated facts/events for:
- considered/candidate;
- eligibility evaluation;
- selected/excluded/hold decision;
- invitation issuance/delivery;
- current recipient contacts;
- access grants;
- intent;
- submission presence;
- withdrawal/no-response projection.

This does **not** collapse the business facts. Qualification, eligibility, selection, invitation, access, intent and submission remain semantically distinct and separately auditable.

`VendorQualificationRecord` stays reusable at vendor/category/effective-date grain.

`EligibilityEvaluation` becomes a dated event/value on `TenderParticipant`, not an independent aggregate by default.

`ExternalAccessGrant` remains a separate security capability because authorization expiry/revocation is security-sensitive and may outlive any one UI status.

### 7.2 remove `PreferredBidderSelection`

Working preference is a comparison annotation/event with actor/time/rationale. It is not a durable business aggregate.

Formal governance starts at `AwardRecommendation`.

## 8. DOA reproducibility + V1 guardrail

Historical approval reproducibility requires three dimensions:
1. authority-policy version/effective date;
2. delegation/effective dates;
3. actual role assignment at the time.

`ApprovalCase` must therefore preserve resolved approver identity, role, role-assignment basis/effective context and delegation evidence used for that instance.

To protect the ≤5-working-day first-live-tender guardrail, standard V1 approval derivation should require only a small default core such as:
- legal entity/company context;
- monetary threshold;
- delegation.

Additional dimensions such as project, category, budget variance, non-lowest, compliance override, exceptional terms or conflicts remain additive policy capabilities rather than mandatory setup for every standard deployment.

## 9. Bid confidentiality opening moment

Blind-bid policy must define a deterministic reveal condition.

Candidate modes:
- `OPEN_INTERNAL_VISIBILITY` — visible to authorized users upon receipt;
- `BLIND_UNTIL_CLOSE` — reveal when the tender closes for submission;
- `CONTROLLED_REVEAL` — designated authority performs an auditable reveal after minimum condition is met.

Historical snapshot must preserve reveal mode, reveal condition, actual reveal time and actor when controlled.

## 10. Existing ADR target for external identity

`ADR-0012 — External vendor identity and access model` remains open and owns the tenant-scoped vs cross-tenant external identity decision.

This remediation does not resolve it.

## 11. P1.1 impact

**P1.1 REOPEN: NO.**

All corrections remain inside the frozen sourcing→award boundary and reduce ambiguity/burden rather than expand scope.

## 12. Re-review gate

P07 remains blocked.

The next hostile re-review should test only whether these corrections close:
- B1 supplier commercial-basis ownership/provenance;
- B2 evaluated vs contractable award basis;
- B3 allocation single-authority invariant;
- B4 FX/tax reproducibility;
- ADR-0003 root neutrality;
- object-count simplifications for P02/P04/P06.

Do not reopen unrelated P01–P06 issues unless a correction creates a new blocker.
