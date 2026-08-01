# P1.7 — Completeness Hardening v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL HARDENING / RECHECK REQUIRED  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Publication payload generation completeness

Where PublicationIntent binds a deterministic payload-generation basis instead of already-materialized payload ContentIdentity, it must bind all representation-affecting versions/context required for exact semantic reproduction, including as applicable:

- source fact/event/input versions;
- MappingDefinition/version;
- IntegrationEvent semantic/schema version;
- disclosure/redaction profile/version;
- serializer/canonicalization/encoding version;
- template/formatter version;
- locale/timezone/currency/display policy only where they affect payload;
- field ordering/default/enum representation rules where material;
- destination/profile version where payload varies by destination;
- attachment/member EvidenceVersions/content identities;
- generated payload integrity once materialized.

Retry cannot use current renderer/template/defaults silently.

If exact reproduction is not guaranteed from bound basis, materialize/store the exact intended payload/content identity before publication.

---

# 2. Callback after connector/profile cutover

An authentic callback/change observation from an old/retired ConnectorProfile may arrive after cutover.

Rules:

- preserve it under the historical profile/subscription/account/correlation context;
- classify it as ExternalObservation/transport evidence;
- correlate/reconcile to any external action already emitted before cutover;
- it does not reactivate the old profile or authorize a new product/external command;
- new discretionary effect requires current profile/authority/domain action;
- ambiguous callback is quarantined/manual reconciliation;
- duplicate callbacks remain idempotent.

Cutover cannot discard relevant late evidence merely because the old connector is no longer active.

---

# 3. Mixed query use in commands/proposals

`NON_ATOMIC_MIXED_OBSERVATION` is never treated as one coherent simultaneous fact set.

If a command/proposal consumes it:

- OperationDefinition explicitly permits mixed observations;
- every component’s source/authority/as-of/observed/freshness is preserved;
- domain guard determines acceptable skew/freshness/conflict;
- load-bearing decision binds exact component versions/times;
- no derived “snapshot time” is invented;
- where coherent state is required, command blocks until ATOMIC/CONSISTENT/CAUSALLY_BOUND result exists.

Chat summaries label the mixed-time limitation.

---

# 4. External source submission boundary

`EXTERNAL_SOURCE_SUBMISSION` may create a bounded source/submission domain fact such as:

- supplier response submission/revision;
- acknowledgment/decline;
- source evidence/capture occurrence;
- external qualification response;

only through the exact external-grant operation and resource scope.

It cannot directly create internal buyer approval, AwardDecision, Commitment, certification, accounting/payment or other internally governed commercial effect.

External submission event remains distinct from internal acceptance/evaluation/effect.

---

# 5. Named email adapter selection gate

Because email connectivity is a required V1 capability target but provider is not selected in P1.7, the build plan must include a pre-implementation `EmailAdapterSelectionGate` before the adapter work package is issued.

The gate records:

- target customer/deployment mailbox ecosystem;
- required activation mode/capabilities;
- provider API/permission/consent availability;
- message/version/watch/history semantics;
- least-privilege scopes;
- subscription/resync behavior;
- data residency/security constraints;
- implementation burden/licensing;
- manual fallback;
- conformance test plan;
- selected adapter or explicit deferred deployment decision.

This gate selects implementation/provider only; it cannot change frozen email/evidence/authority semantics.

A0–A3 launch may proceed manually if adapter is not yet activated, but the product/release scope remains accountable for the stated email-capability target.

---

# 6. Connector/profile and capability state provenance

Every operation/result/event/observation that depends on a connector/capability binds the exact profile/capability version and effective state relevant to acceptance/execution/observation.

Current registry/profile state cannot rewrite which version handled historical action.

---

# 7. Closure claim

These clauses close precision watches before internal recheck without changing scope or selecting technology.
