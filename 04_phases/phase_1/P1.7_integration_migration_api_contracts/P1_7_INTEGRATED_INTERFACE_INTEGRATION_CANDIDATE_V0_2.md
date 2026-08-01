# P1.7 — Integrated Interface, Integration & Migration Candidate v0.2

**Date:** 2026-08-01  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / INTERNAL RECHECK REQUIRED  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Precedence

Current P1.7 audit target is:

1. `P1_7_INTEGRATED_INTERFACE_INTEGRATION_CANDIDATE_V0_1.md` for unchanged clauses;
2. `P1_7_INTERNAL_AUDIT_REMEDIATION_V0_1.md` for execution authority, cutover, publication intent, V1 implementation floor and watches;
3. underlying P1.7 contracts for supporting detail.

No ADR status changes before external hostile PASS/final reconciliation.

---

# 2. Execution authority

Every command/privileged integration action binds exactly one:

- DIRECT_PRINCIPAL;
- DELEGATED_ON_BEHALF;
- SYSTEM_BOUNDED;
- EXTERNAL_SOURCE_SUBMISSION;
- HISTORICAL_IDEMPOTENT_RECOVERY.

For delegated/on-behalf execution, effective permission is the intersection of:

- technical initiator capability/scope;
- valid delegation/on-behalf grant;
- represented principal current domain/P09 authority;
- exact operation/resource/context;
- domain guards/evidence.

No union/escalation/implicit impersonation.

SYSTEM_BOUNDED is explicitly operation/policy-scoped and non-discretionary.

EXTERNAL_SOURCE_SUBMISSION cannot satisfy internal authority.

HISTORICAL_IDEMPOTENT_RECOVERY applies only to a fact already established under immutable historical basis and cannot add discretion/effect.

No mode = deny.

---

# 3. In-flight effect stages

Every state-changing/external-effect operation identifies:

- PRE_ACCEPTANCE;
- ACCEPTED_PRE_EFFECT;
- EXTERNAL_EFFECT_EMITTED;
- DOMAIN_EFFECT_ESTABLISHED;
- TERMINAL_NO_EFFECT;
- PARTIAL_EFFECT with enumerated item effects.

Queue/running/progress states remain operational and separate.

---

# 4. Cutover dispositions

Before connector/authority/capability cutover, every non-terminal operation receives exactly one explicit disposition.

Default = BLOCKED_RECONCILIATION_REQUIRED.

- CONTINUE_BOUND_PROFILE — accepted old semantics may continue only where explicitly permitted, no new discretion, current technical access exists for new external calls and no dual writer/effect occurs.
- REBIND_TECHNICALLY_COMPATIBLE — before effect only; technical adapter/credential/routing may change but authority, payload, target and semantic meaning remain identical.
- CANCEL_OR_SUPERSEDE_PRE_EFFECT — no effect exists; preserve cancellation/history and use new operation if needed.
- RECONCILE_EXTERNAL_EFFECT — external action already occurred; preserve/retrieve/reconcile, never pretend cancellation prevented it.
- RECOGNIZE_ESTABLISHED_DOMAIN_EFFECT — event already exists; no cutover reversal; use bounded historical recovery for remaining publication/result work.
- MANUAL_RECONCILIATION — exact effect/correlation uncertain; block conflicting action.
- BLOCKED_RECONCILIATION_REQUIRED — safe query/inspection only.

A semantic/authority/payload change creates a new logical operation, not rebind under the old ID.

---

# 5. Acceptance versus irreversible execution

Acceptance freezes operation/input/evidence/config/version/idempotency semantics.

It does not preserve a represented user’s authority for a later discretionary command after revocation.

OperationDefinition declares current revalidation points for:

- product authority/security;
- external technical scope;
- connector profile/freshness;
- business preconditions.

Already-emitted external facts and already-established domain events cannot be denied by later revalidation; they require reconciliation/correction.

---

# 6. PublicationIntent

Every publishable source event/result binds immutable PublicationIntent:

- source fact/event/version;
- exact mapping definition/version;
- IntegrationEvent semantic/schema version;
- disclosure/redaction profile version;
- authority/source classification;
- destination/profile/subscription scope where material;
- deterministic payload ContentIdentity or exact payload-generation basis/input versions;
- correlation/causation/publication identity;
- retry/replay behavior.

Retry uses the original intent.

New mapping/schema/disclosure produces a new related publication, never changes retry meaning.

If new security/legal constraints prohibit undelivered historical payload, block/quarantine/cancel that delivery explicitly and create a permitted new publication if appropriate; do not mutate old intent silently.

---

# 7. V1 implementation floor

Mandatory V1 internal substrate from inception:

1. UI-independent bounded service/domain operation layer;
2. OperationRegistry/CapabilityDefinition metadata;
3. invocation context + ExecutionAuthorityMode;
4. QUERY/PROPOSAL/COMMAND/ASYNC contracts;
5. stable command/idempotency/result lookup/recovery;
6. canonical domain event/result/audit identities;
7. PublicationIntent/pending recovery for activated outbound paths;
8. ConnectorProfile/AuthorityMapping/external observation/error/reconciliation abstractions;
9. import/export/migration run/item manifests;
10. provider-neutral email connector port/interface;
11. manual/file adapters and A0–A3 no-connector path;
12. authorization-filtered capability exposure for later UI/chat/tool adapters.

Optional activation/adapter:

- public external API gateway/transport;
- external broker/webhooks;
- named ERP/CDE/bank/technical connectors;
- chat/agent runtime;
- broad historical migration;
- deep real-time integration.

Email connection is a required V1 product capability target: release/build planning must include at least one deployable conforming adapter for its target deployment class, but no named provider is selected in P1.7 and email is not an A0–A3 prerequisite.

---

# 8. MigrationAcceptanceProfile

No CURRENT_OPEN_TRANSACTION/native history import without a versioned domain-family profile stating source state/history, minimum identity/time/evidence/authority/config, target actions/effects, current-state/cutover mapping, limitations, correction and validation outcomes.

Default when absent:

- block native import; or
- import as reference-only/evidence with explicit limitations.

No generic opening state/balance.

---

# 9. Multi-resource query cut

Every multi-resource/multi-domain query declares:

- ATOMIC_DOMAIN_SNAPSHOT;
- CONSISTENT_AS_OF_CUT;
- CAUSALLY_BOUND_RESULT_SET;
- NON_ATOMIC_MIXED_OBSERVATION with component times/limitations.

Chat/report cannot present non-atomic mixed data as one simultaneous authoritative state.

---

# 10. Capability lifecycle and in-flight work

Each capability version declares pending-operation disposition:

- CONTINUE_BOUND_VERSION;
- CANCEL_PRE_EFFECT;
- WAITING_REVIEW;
- SUPERSEDE_NEW_OPERATION;
- BLOCKED_RECONCILIATION_REQUIRED;
- RECOGNIZE_ALREADY_ESTABLISHED.

Security/authority stop can block future actions even if normal deprecation permits continuation.

Before P1.10, AI/agent state-changing capability remains disabled/experimental/review-required; bounded automation is deterministic only.

---

# 11. Identity mapping corrections

Mapping correction preserves original/corrected mapping, effective periods, evidence/reason/authority, all used observations/events/migration items/commands/domain/evidence references, impact class and reconciliation/domain-correction disposition.

Historical facts/effects are not silently moved to a new target.

---

# 12. Connector conformance renewal

Material provider/API/scope/version/callback/schema/authority/materialization/adapter semantic change triggers revalidation.

Affected capabilities become limited/non-load-bearing/blocked until validated; unaffected certified capabilities may continue.

---

# 13. Existing core preserved

Unchanged v0.1 semantics remain:

- closed QUERY/PROPOSAL/COMMAND/ASYNC operation classes;
- capability add/disable/replace/manual fallback;
- exact invocation/idempotency/bulk/error contracts;
- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- at-least-once/missed/reordered/replay recovery;
- connector fact/action AuthorityMapping and transformation classes;
- P1.6 ReconstructionAnchorTest/materialization;
- provider-neutral scoped email/manual fallback;
- import/export/migration classes/no direct state assignment;
- typed reconciliation/error/degradation;
- chat/agent query/proposal/command/async/abstention boundary;
- structured citations/result truth classes;
- BOQ-to-RFQ proposal chain without autonomy claim;
- ADR-0006 tiered integration depth;
- A0–A3 no-connector proof;
- one-XL guard.

---

# 14. Candidate ADRs

No formal status changes.

Internal candidate classifications subject to recheck/Claude:

- ADR-0006 — ACCEPT tiered V1 integration depth + implementation floor/email target;
- ADR-0029 — ACCEPT capability-neutral bounded interface substrate;
- ADR-0030 — ACCEPT domain/integration event/publication-recovery boundary;
- ADR-0031 — ACCEPT connector authority/conformance/execution-authority model;
- ADR-0032 — ACCEPT migration truth/limitation model.

---

# 15. Gate claim before recheck

- G1 one authority/no co-master — PASS after execution/cutover remediation;
- G2 bounded state changes — PASS;
- G3 Q/P/C/A proposal/effect — PASS;
- G4 event/message separation — PASS;
- G5 crash/retry/publication/callback — PASS after PublicationIntent;
- G6 migration provenance/history — PASS after MigrationAcceptanceProfile;
- G7 P1.6 evidence/version — PASS;
- G8 errors/conflicts/no forced equality — PASS;
- G9 cutover/no dual writers — PASS;
- G10 evolution/disable/replace — PASS;
- G11 email/manual fallback — PASS;
- G12 chat/agent safe readiness — PASS;
- G13 ADR-0006/no named connector prerequisite — PASS;
- G14 A0–A3 no connector — PASS;
- G15 upstream/P07/product-code — PASS;
- G16 dual hostile — internal recheck + Claude pending.

This claim requires independent internal recheck.
