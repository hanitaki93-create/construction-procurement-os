# P1.7 — ADR Reconciliation v1.0

**Date:** 2026-08-01  
**Status:** FINAL / ACCEPTED DECISIONS  
**P1.7:** PASS / CLOSED / FROZEN  
**Product code:** LOCKED

---

# 1. Purpose

Reconcile all P1.7 architecture decisions after:

- internal hostile audit FAIL and remediation;
- Claude Round 1 FAIL on BL-P17-05;
- indeterminate-effect remediation;
- post-remediation internal PASS;
- Claude Round 2 PASS with blockers none;
- W-48–W-51 freeze hardening.

---

# 2. ADR-0006 — ACCEPTED

## Title

V1 ERP/accounting integration depth

## Decision

Adopt a tiered V1 integration depth:

### Tier 0 — mandatory native/manual fallback

A0–A3 executes end to end without any named connector.

### Tier 1 — mandatory bounded structured file exchange

Validated import/export with item/run/error manifests and no direct state assignment.

### Tier 2 — mandatory internal integration foundation / optional external activation

Build from inception:

- UI-independent bounded service/domain operation layer;
- OperationRegistry/CapabilityDefinition;
- common invocation and ExecutionAuthorityMode;
- Query/Proposal/Command/Async contracts;
- stable idempotency/result recovery;
- canonical domain event/result/audit identities;
- PublicationIntent for activated outbound paths;
- ConnectorProfile/AuthorityMapping/ExternalObservation/error/reconciliation abstractions;
- migration manifests;
- provider-neutral email port;
- manual/file adapters;
- authorization-filtered capability exposure for later UI/chat/tools.

Public APIs, brokers, named enterprise connectors, chat/agent runtime, broad migration and deep real-time integration remain optional activations.

### Tier 3 — evidence-driven selected connectors

Email is a V1 product capability target. A release plan selects at least one `V1_EMAIL_CORE_CONFORMING` adapter through evidence, without making activation an A0–A3 prerequisite.

### Tier 4 — deep real-time integration later by default

No named ERP/CDE/email/bank connector is required before the first live tender.

## Reason

This preserves a concrete buildable V1 foundation and expansion path without letting enterprise integration dominate the beachhead or create a connector co-master.

## Consequence

Later adapters vary by deployment/customer evidence, but operation, authority, event, retry, evidence and migration meanings remain invariant.

---

# 3. ADR-0029 — ACCEPTED

## Title

Capability-neutral bounded interface substrate

## Decision

Adopt one versioned `OperationRegistry` and common invocation/result semantics for UI, internal services, structured imports, connectors, email, future chat and agents.

Every operation is exactly one:

- QUERY;
- PROPOSAL;
- COMMAND;
- ASYNC_OPERATION.

No generic CRUD/freeform fifth class.

Proposals never become authoritative without a separate bounded command.

Capabilities have governed lifecycle and can be disabled, reduced, replaced or retired without rewriting domain history or breaking the deterministic/manual rail.

Future agents use the same authorization-filtered bounded operations as other initiators and receive no raw database/event-store mutation path.

## Reason

A shared capability-neutral substrate prevents UI, connectors, imports and agents from creating parallel meanings or privileged mutation surfaces while preserving uncertain future AI capability.

## Consequence

P1.9 may design conversational and conventional UX over the same operations. P1.10 may design reasoning/orchestration/evaluation without changing domain-action authority.

---

# 4. ADR-0030 — ACCEPTED

## Title

Domain/integration event and immutable publication-recovery boundary

## Decision

Keep distinct:

- DomainEvent;
- IntegrationEvent;
- TransportEnvelope;
- ExternalObservation.

An inbound callback/webhook is an ExternalObservation, never a DomainEvent.

Every outbound publication freezes an immutable `PublicationIntent` containing source fact/version, mapping version, event/schema version, disclosure/redaction version, full representation-generation basis and exact target or frozen distribution/recipient basis.

Retries use the original PublicationIntent.

A target, audience, subscriber profile, mapping, schema, redaction or representation change creates a new related publication and, when effect-bearing, a new logical operation.

At-least-once, missed, duplicate, reordered and replayed transport is handled through stable identities, family-level ordering/gap behavior, result lookup/resynchronization and history-preserving correction.

Domain commit remains authoritative when publication fails.

## Reason

This prevents transport retries or later deployment changes from changing historical message meaning or creating duplicate domain effects.

## Consequence

Physical outbox, broker, event-store and serializer technology remains open, but must preserve immutable publication meaning and recovery behavior.

---

# 5. ADR-0031 — ACCEPTED

## Title

Connector/execution authority, effect uncertainty and conformance

## Decision

Every privileged invocation binds exactly one ExecutionAuthorityMode:

- DIRECT_PRINCIPAL;
- DELEGATED_ON_BEHALF;
- SYSTEM_BOUNDED;
- EXTERNAL_SOURCE_SUBMISSION;
- HISTORICAL_IDEMPOTENT_RECOVERY.

Delegated authority is the intersection of technical capability, valid delegation, represented principal current authority, exact operation/resource/context and domain guards. No union, escalation or implicit impersonation.

Connector authority is defined at load-bearing fact/action grain through ConnectorProfile and AuthorityMapping under OWN/MIRROR/REFERENCE/OUT. A connector is never a business co-master.

Adopt the closed seven-stage effect taxonomy:

1. PRE_ACCEPTANCE;
2. ACCEPTED_PRE_EFFECT;
3. EFFECT_INDETERMINATE;
4. EXTERNAL_EFFECT_EMITTED;
5. DOMAIN_EFFECT_ESTABLISHED;
6. TERMINAL_NO_EFFECT;
7. PARTIAL_EFFECT with exact item/effect stages.

`ACCEPTED_PRE_EFFECT` and `TERMINAL_NO_EFFECT` require positive no-effect evidence.

Timeout, missing response, ambiguous callback, crash window, current-only provider state or unresolved correlation enters `EFFECT_INDETERMINATE` when an effect may exist.

While indeterminate, ordinary retry/resend/reissue, technical rebind, pre-effect cancellation, effect-bearing continuation and conflicting replacement commands are prohibited.

Only reconciliation/manual/block dispositions are allowed until positive resolution.

A permanently unresolvable position may close operationally only through an explicit accepted unresolved-external-position variance; it never becomes no-effect without proof.

Connector conformance covers authority, versions, callbacks, evidence/materialization, freshness and degradation. Later conformance failure changes future eligibility/current confidence and creates variance; it never silently invalidates or rebinds historical evidence/domain meaning.

## Reason

Clean success/failure semantics are insufficient for real external systems. This model prevents authority escalation, duplicate external effects and unsafe cutover/retry under uncertainty.

## Consequence

Every effect-bearing adapter and operation must declare effect criteria, reconciliation capability, stage transitions, cutover dispositions and conformance behavior. Operational visibility for indeterminate work is mandatory but must not grow into a generic case-management/iPaaS platform.

---

# 6. ADR-0032 — ACCEPTED

## Title

Migration truth, provenance and limitation

## Decision

Adopt explicit migration/import classes and immutable run/item manifests.

No direct status, balance or current-state assignment.

Native open-transaction/full-history migration requires a versioned per-domain `MigrationAcceptanceProfile` defining supported source history/state, minimum identity/time/evidence/authority/config, target actions/effects, cutover behavior, validation, limitations and correction path.

Without such a profile, block native migration or import only as reference/evidence-limited history.

No generic opening balance/state.

Do not fabricate missing provenance, merge identities through weak similarity, collapse supplier source/normalized values, collapse physical/certified/accounting-posted/paid actuals, or import mutable current links as exact historical evidence.

Post-live correction uses history-preserving domain/evidence correction rather than deletion.

## Reason

Migration is a major path for invented certainty, duplicate commercial effects and authority collapse. Explicit limitation is safer than fabricated native history.

## Consequence

Migration coverage may expand by domain through evidence-backed profiles without changing canonical semantics.

---

# 7. Later-owned decisions

Remain open:

- ADR-0016 — external-party UX priority → P1.9;
- ADR-0017 — broader AI-readiness deterministic substrate → P1.10.

No accepted P1.4, P1.5 or P1.6 ADR reopens.

---

# 8. Evidence-debt posture

Still open/non-blocking as previously classified:

- FT-02;
- FT-06;
- FT-09 / CR-02;
- FT-10;
- ADR-0010 exact GCC statutory/legal/rate defaults;
- ADR-0011 detailed attribution/suspense mechanics.

P1.7 does not claim these are resolved.

---

# 9. Final reconciliation result

- ADR-0006 — ACCEPTED
- ADR-0029 — ACCEPTED
- ADR-0030 — ACCEPTED
- ADR-0031 — ACCEPTED
- ADR-0032 — ACCEPTED
- ADR-0016 — remains PROPOSED / P1.9-owned
- ADR-0017 — remains PROPOSED / P1.10-owned

`P1.7 ADR reconciliation is complete.`
