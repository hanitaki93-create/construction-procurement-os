# ROADMAP_CHANGE — CHG-0003

**Date:** 2026-07-28  
**Status:** ACCEPTED — implementation pending issuance of Phase 1 Roadmap v1.1  
**Current canonical roadmap:** Phase 1 Roadmap v1.0  
**Target:** Phase 1 Roadmap v1.1

## 1. Proposed change

Do **not** change the P1.0–P1.11 sequence and do **not** reduce product ambition.

Augment later gates so the roadmap explicitly proves both architectural ceiling and decomposability, and add irreversible technical semantics surfaced by the CP-03 hostile critique.

### P1.4 additions

Boundary/ownership work must define:
- authority at entity **and field/domain** granularity where integrations split ownership;
- sync direction/conflict rule for mixed-authority records;
- staleness/read-path semantics for externally authoritative data used in approvals/decisions.

Primary decision target: `ADR-0021`.

### P1.5 additions

Explicit decisions/outputs must cover:
- workflow-to-financial-state seam — `ADR-0018`;
- effective dating / temporal interpretation for authority, delegation, FX, cost structures and org/legal-entity structure — `ADR-0019`;
- configuration version binding for in-flight instances — `ADR-0020`;
- canonical money representation, currency scale, rounding and calculation order — `ADR-0022`;
- numbering scope/allocation semantics under concurrency, retry, rollback, legal entity and fiscal period — `ADR-0023`.

### P1.5 Ceiling Test

Before P1.5 freezes, the model must execute structural stress cases without adding a second architecture path. At minimum:

1. multi-legal-entity/JV procurement;
2. vendor relationships across multiple countries/tax registrations;
3. foreign-currency commitment against a different budget currency;
4. authority/configuration change while transactions are in flight;
5. different fiscal/calendar rules across legal entities;
6. vendor status varying by business unit/project relationship.

**Pass:** these cases fit through the same entity/event/authority abstractions without fundamental rewrite or single-country shortcuts.

### P1.5 Closed Sub-graph Gate

A candidate V1 slice must be a closed executable sub-graph of the architecture.

For every entity/action in the slice:
- its lifecycle must terminate without requiring an unbuilt product area;
- every required dependency must either exist in the slice or have a deliberately specified interface/stub contract;
- adding future entity/event types must not require rewriting historical transactions or derivation logic for already-supported types.

**Pass:** a focused V1 can be built without implementing the entire platform first while preserving the full architectural ceiling.

### P1.11

No new golden thread is required for the critique's closed-period correction case because Roadmap v1.0 already mandates:

`correction of a certified financial error from a closed period`.

P1.11 must retain it.

## 2. Trigger/evidence

- CP-03 hostile technical critique identified missing temporal/configuration semantics, workflow-financial seam, field-level integration authority, money/rounding and numbering/concurrency decisions.
- The critique also identified that the roadmap states a high architectural ceiling and later Phase 2 decomposition but lacks explicit gates proving those two properties.
- Current v1.0 already contains many underlying concerns (financial periods, reversal, FX, numbering, concurrency, legal entities/JVs), so the change is precision/gating rather than scope expansion.

## 3. Affected subphases

- P1.4 — ownership/integration authority precision.
- P1.5 — commercial-core semantics and two new gate tests.
- P1.11 — retain existing closed-period correction golden thread and use it against the refined P1.5 model.

No changes to P1.0–P1.3 ordering or dependencies.

## 4. Downstream impact

Positive:
- makes multi-country/high-ceiling ambition testable;
- detects hidden single-entity/single-currency/single-version assumptions before construction;
- makes Phase 2 decomposition a validation of an already-decomposable architecture rather than the first time coupling is discovered;
- protects deterministic truth substrate even if AI later replaces much of the human workbench.

Cost:
- additional ADR/spec work in P1.4/P1.5;
- additional P1.5 paper stress testing.

No product code or migration exists yet, so implementation migration cost is zero.

## 5. Alternatives considered

1. **Reject critique additions:** rejected; leaves retro-fit-risk semantics implicit.
2. **Move all issues to P1.10 NFR:** rejected; temporal authority, rounding and configuration binding are state/financial semantics, not NFRs.
3. **Wait for Phase 2 to test decomposability:** rejected; decomposability is an architecture property and discovering failure in Phase 2 is too late.
4. **Reduce the product scope instead:** rejected; the identified problems are structural and are not caused merely by product ambition.

## 6. Decision

**ACCEPTED.**

Roadmap v1.1 must incorporate these additions before any affected P1.4/P1.5 gate is executed. Until v1.1 is issued, v1.0 remains canonical and this change record prevents silent drift.
