# P1.7 — Internal Hostile Audit Remediation v0.1

**Date:** 2026-08-01  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Parent audit:** `audits/P1_7_INTERNAL_HOSTILE_AUDIT_V0_1.md`  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Close:

- BL-P17-01 — execution authority composition;
- BL-P17-02 — in-flight authority/profile cutover;
- BL-P17-03 — publication mapping/schema/redaction binding;
- BL-P17-04 — ADR-0006 V1 implementation floor;
- W-P17-01–06.

These clauses supersede inconsistent candidate wording.

---

# 2. R01 — closed ExecutionAuthorityMode

Every COMMAND or privileged connector/tool operation binds exactly one `ExecutionAuthorityMode`.

## R01.1 — DIRECT_PRINCIPAL

The authenticated principal is the acting principal.

Effective authority is the principal’s current internal domain/P09 authority for the exact tenant/project/resource/ContractingAuthorityContext and OperationKey.

Technical/API scope can only reduce access; it cannot add domain authority.

## R01.2 — DELEGATED_ON_BEHALF

A service, connector or agent acts on behalf of a represented principal.

Execution is permitted only when all are valid:

1. authenticated/acting technical principal is allowed to invoke the OperationKey;
2. a valid versioned delegation/on-behalf grant permits that acting principal to represent the stated principal for the operation/scope/time;
3. represented principal has current internal domain/P09 authority for the exact action/resource/context;
4. connector/service capability and tenant/resource scopes permit the operation;
5. command guards/preconditions/evidence are satisfied.

Effective permission is the **intersection**, never the union, of these constraints.

The service/agent cannot borrow broad authority from its technical account or impersonate another principal implicitly.

## R01.3 — SYSTEM_BOUNDED

A deterministic product service executes an explicitly registered system operation without pretending to be a user.

Required:

- OperationDefinition explicitly permits SYSTEM_BOUNDED;
- exact system capability/policy/version;
- tenant/resource/context scope;
- no discretionary human/commercial judgment beyond the frozen rule;
- current system/security control;
- complete audit/causal evidence.

Examples may include deterministic publication recovery, expiry evaluation or snapshot-to-domain establishment already authorized by frozen semantics.

SYSTEM_BOUNDED cannot be used for arbitrary award/approval/Commitment choices.

## R01.4 — EXTERNAL_SOURCE_SUBMISSION

An authenticated or buyer-on-behalf external source submits evidence/response through an external grant.

The grant permits only the named source submission/capture action and resource scope.

It does not satisfy internal approval/P09 authority or directly create internal commercial effect.

## R01.5 — HISTORICAL_IDEMPOTENT_RECOVERY

A system process durably records/returns/publishes/recognizes a fact already established under a frozen historical basis.

It may use historical bound authority/config/evidence for the established fact while requiring current system recovery permission.

It cannot add new discretion, change payload/business meaning, create a new effect or bypass an explicit owning-domain correction/withdrawal.

## R01.6 — no implicit mode

If no valid mode is bound, execution is denied.

Connector authentication, API key, agent identity or mailbox consent alone never creates business authority.

---

# 3. R02 — effect-stage model for in-flight operations

Every state-changing/external-effect operation exposes one irreversible-effect stage:

- `PRE_ACCEPTANCE` — request not durably accepted;
- `ACCEPTED_PRE_EFFECT` — accepted/bound, but no external or domain effect emitted;
- `EXTERNAL_EFFECT_EMITTED` — external send/write/action has occurred; local domain result may remain pending;
- `DOMAIN_EFFECT_ESTABLISHED` — owning-domain event/effect exists;
- `TERMINAL_NO_EFFECT` — rejected/cancelled/failed without irreversible effect;
- `PARTIAL_EFFECT` — item-scoped/external/domain effects exist for a subset and are enumerated.

Operational queue/running states remain separate.

---

# 4. R03 — cutover disposition semantics

Before a connector/authority/capability cutover becomes effective, every non-terminal in-flight operation is assigned exactly one disposition.

Default when absent/ambiguous: `BLOCKED_RECONCILIATION_REQUIRED`.

## R03.1 — CONTINUE_BOUND_PROFILE

Valid only when:

- operation was durably accepted under a valid old profile;
- cutover plan explicitly permits continuation;
- remaining steps do not require a new discretionary domain decision;
- current technical access/credential remains valid for any new external call;
- old profile semantics/payload/authority remain valid for the operation;
- continuation cannot create dual writer/effect after cutover.

Current user authority is still required for a later discretionary owning-domain command unless the operation is SYSTEM_BOUNDED or HISTORICAL_IDEMPOTENT_RECOVERY under its frozen contract.

Revoked technical access means no new external call, even if old profile is historically bound.

## R03.2 — REBIND_TECHNICALLY_COMPATIBLE

Allowed only before irreversible effect and only when new profile changes technical adapter/credential/routing while preserving exactly:

- authority mode/source/writer;
- operation semantic version;
- payload/business meaning;
- target/external account/resource;
- evidence/materialization behavior;
- required scope.

Rebinding creates explicit profile/cutover history.

If meaning, authority, payload or target changes, do not rebind under the same logical operation; supersede with a new logical operation.

## R03.3 — CANCEL_OR_SUPERSEDE_PRE_EFFECT

Allowed in ACCEPTED_PRE_EFFECT where no external/domain effect exists.

Preserve cancelled operation history and create a new operation if replacement is required.

## R03.4 — RECONCILE_EXTERNAL_EFFECT

Required when external effect was already emitted.

The system cannot pretend cancellation prevented it.

Preserve external action/evidence; stop unsafe retries; retrieve/reconcile result; invoke owning-domain correction/compensation if needed.

## R03.5 — RECOGNIZE_ESTABLISHED_DOMAIN_EFFECT

For DOMAIN_EFFECT_ESTABLISHED, profile/cutover changes do not reverse the event.

Remaining publication/return/reconciliation may use HISTORICAL_IDEMPOTENT_RECOVERY and bound publication intent, subject to current technical access.

## R03.6 — MANUAL_RECONCILIATION

Use where exact external/domain effect or correlation is unknown/ambiguous. Block new conflicting action until resolved or explicitly superseded.

## R03.7 — BLOCKED_RECONCILIATION_REQUIRED

No processing except safe query/inspection/reconciliation. No middleware default may choose another disposition.

---

# 5. R04 — acceptance versus execution authority

## R04.1 — acceptance binds semantics, not future discretionary authority

Durable acceptance freezes operation/input/evidence/config/version/idempotency semantics.

It does not guarantee a later discretionary command may execute if represented-principal/domain authority is revoked before the irreversible command point.

## R04.2 — revalidation points

OperationDefinition states which stages require current revalidation of:

- product domain authority/security;
- external technical permission/scope;
- connector profile/freshness;
- business preconditions.

## R04.3 — already-established facts

No revalidation may deny existence of a domain/external fact already established/emitted. Changes become correction/reconciliation questions.

## R04.4 — queued user command example

User-authorized AwardDecision command accepted into queue, but not yet executed. User delegation revoked before execution.

Unless the owning domain already established the decision or the operation is an explicitly pre-authorized SYSTEM_BOUNDED action, current authority check fails and command becomes blocked/rejected with no effect.

---

# 6. R05 — immutable PublicationIntent

When a source DomainEvent/result requires potential integration publication, create an immutable `PublicationIntent` or equivalent semantic record binding:

- source DomainEvent/fact ID/version;
- exact source→IntegrationEvent MappingDefinition/version;
- IntegrationEvent semantic type/schema version;
- disclosure/redaction profile/version;
- authority/source classification;
- destination/ConnectorProfile/subscription class where material;
- exact payload ContentIdentity OR deterministic payload-generation basis/input versions;
- correlation/causation/publication identity;
- creation/effective applicability;
- retry/replay policy.

## R05.1 — retry

Retry/redelivery uses the exact bound PublicationIntent and same semantic IntegrationEvent/payload meaning.

A later mapping/schema/redaction change cannot affect retry.

## R05.2 — prospective republish

Publishing the same source fact under a newer mapping/profile is a new explicitly related PublicationIntent/IntegrationEvent with reason and predecessor relation.

It is not retry under the old identity.

## R05.3 — disclosure change

If current security/legal policy forbids delivering the historically bound payload to a not-yet-served destination, do not mutate the old payload silently.

Block/quarantine/cancel that delivery under explicit authority, then create a new permitted publication if appropriate, preserving history.

## R05.4 — destination-specific delivery

One source IntegrationEvent may have destination-specific PublicationIntents where payload/disclosure/profile differs. Consumer delivery histories remain separate.

---

# 7. R06 — ADR-0006 V1 implementation floor

## R06.1 — mandatory V1 code/substrate from inception

The future V1 build must implement—not merely document—the following internal substrate:

1. UI-independent bounded domain/service operation layer;
2. versioned OperationRegistry/CapabilityDefinition metadata;
3. common invocation context and ExecutionAuthorityMode;
4. QUERY / PROPOSAL / COMMAND / ASYNC result contracts;
5. stable LogicalCommandId/idempotency/result lookup and recovery;
6. canonical DomainEvent/result/audit identities already required by frozen domains;
7. immutable PublicationIntent capability and pending/recovery state for any activated outbound event/connector path;
8. ConnectorProfile/AuthorityMapping abstraction and typed external observation/error/reconciliation records;
9. import/export/migration run/item manifests;
10. provider-neutral email connector port/interface implementing frozen send/capture/watch semantics;
11. manual/file adapters and A0–A3 no-connector path;
12. authorization-filtered capability exposure sufficient for future UI/chat/tool adapters.

The internal service layer cannot be implemented only as UI-specific handlers that later require domain extraction/rewrite.

## R06.2 — optional V1 activations/adapters

The following may be unactivated or deferred per deployment/release evidence while preserving the mandatory substrate:

- public external API transport/gateway;
- external event broker/webhook publication;
- named ERP/CDE/bank/technical connectors;
- chat/agent runtime;
- broad historical migration;
- deep real-time integration.

## R06.3 — email product-scope decision

Email connectivity is a **required V1 product capability target**, but not an A0–A3 prerequisite.

The V1 release/build plan must include at least one deployable adapter conforming to the provider-neutral Email Connector Contract for the target deployment class, selected through implementation/customer/provider evidence.

The adapter may initially be limited, for example outbound send plus scoped/selected inbound capture, provided its profile/capabilities/limitations are explicit.

The architecture does not select Microsoft Graph, Gmail, SMTP/IMAP or another provider now.

Manual no-connector operation remains mandatory and complete.

## R06.4 — no premature infrastructure

Mandatory substrate does not require deploying public APIs, broker, iPaaS or all connectors before first tender.

Internal implementations may use simple mechanisms if they preserve the semantic contracts and expansion path.

---

# 8. R07 — MigrationAcceptanceProfile

`CURRENT_OPEN_TRANSACTION` or native historical import is prohibited unless the exact owning domain/transaction family has a versioned `MigrationAcceptanceProfile` defining:

- supported source state/history class;
- minimum source identity/time/evidence/authority/config;
- target migration/domain actions;
- effect/conservation/idempotency treatment;
- current-state/in-flight mapping;
- limitations/reference-only fields;
- cutover/dual-writer behavior;
- correction/rollback/forward path;
- validation/quarantine outcomes.

Default when no profile exists:

- BLOCK native import; or
- HISTORICAL_REFERENCE_ONLY/EVIDENCE_ARCHIVE_IMPORT with explicit limitations.

No generic opening state/balance is inferred.

---

# 9. R08 — multi-resource query consistency cut

Every multi-resource/multi-domain query declares one:

- `ATOMIC_DOMAIN_SNAPSHOT` where supported;
- `CONSISTENT_AS_OF_CUT` with shared as-of/effective/recorded basis;
- `CAUSALLY_BOUND_RESULT_SET` produced from a named snapshot/event/projection version;
- `NON_ATOMIC_MIXED_OBSERVATION` with component source/observed/as-of times and explicit limitation.

A chat/report cannot present NON_ATOMIC_MIXED_OBSERVATION as one simultaneous authoritative state.

P1.8 may elaborate projections/query models without changing this boundary.

---

# 10. R09 — capability change during in-flight operation

Every capability version declares pending-operation disposition for disable/deprecate/retire/security stop:

- CONTINUE_BOUND_VERSION;
- CANCEL_PRE_EFFECT;
- WAITING_REVIEW;
- SUPERSEDE_NEW_OPERATION;
- BLOCKED_RECONCILIATION_REQUIRED;
- RECOGNIZE_ALREADY_ESTABLISHED.

Semantics align with R02–R04.

Security/authority stop can block future external/discretionary steps even if normal deprecation would allow continuation.

Historical proposals/results remain reconstructable.

---

# 11. R10 — identity-mapping correction impact

Correcting an accepted external/product identity mapping preserves:

- original mapping/version/effective period;
- corrected mapping;
- source/evidence/reason/authority;
- all IntegrationEvents/ExternalObservations/MigrationItems/commands/domain/evidence bindings that used the original mapping;
- impact classification;
- reconciliation/domain-correction disposition.

Mapping correction does not silently move historical facts/effects to another target.

---

# 12. R11 — connector conformance revalidation

Connector/resource capability conformance expires/requires revalidation upon material change in:

- provider API/event version;
- authentication/scope model;
- account/resource boundary;
- historical version/revision semantics;
- callback/delivery behavior;
- pagination/rate/partial behavior;
- schema/enum meaning;
- source authority/product policy;
- materialization/retention/residency;
- adapter implementation version affecting semantics.

Until revalidated, affected capability may be limited/non-load-bearing/blocked according to risk, while unaffected certified capabilities may remain active.

---

# 13. R12 — bounded automation before P1.10

Before P1.10 acceptance:

- ENABLED_BOUNDED_AUTOMATION may apply only to deterministic system automation explicitly frozen by domain rules;
- AI/model/agent capabilities remain DISABLED, EXPERIMENTAL or ENABLED_REVIEW_REQUIRED for state-changing paths;
- no autonomous AI command elevation occurs merely because P1.7 exposes tools.

P1.10 may later authorize bounded agent automation through controlled evaluation/policy without changing command authority semantics.

---

# 14. Closure claim

- BL-P17-01 → closed by R01/R04.
- BL-P17-02 → closed by R02–R04.
- BL-P17-03 → closed by R05.
- BL-P17-04 → closed by R06.
- W-P17-01 → closed by R07.
- W-P17-02 → closed by R08.
- W-P17-03 → closed by R09.
- W-P17-04 → closed by R10.
- W-P17-05 → closed by R11.
- W-P17-06 → closed by R12.

P1.7 remains ACTIVE pending consolidated candidate/recheck/Claude audit.
