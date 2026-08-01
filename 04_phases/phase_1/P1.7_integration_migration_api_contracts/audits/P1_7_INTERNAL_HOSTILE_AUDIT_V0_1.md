# P1.7 — Internal Hostile Audit v0.1

**Date:** 2026-08-01  
**Target:** `P1_7_INTEGRATED_INTERFACE_INTEGRATION_CANDIDATE_V0_1.md`  
**Verdict:** FAIL / NARROW SEMANTIC REMEDIATION REQUIRED  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Audit posture

Assume future builders, connector teams and agent developers choose the easiest implementation-compatible reading.

Fail where they would still have to decide authority, historical meaning, retry/cutover behavior or mandatory V1 substrate.

Do not fail for REST/RPC/event-bus/outbox/database/provider implementation choices.

---

# 2. Blockers

## BL-P17-01 — represented-principal / service / connector authorization composition is not closed

### Failure

The candidate distinguishes authenticated, acting, represented and initiator principals but does not define how their authorities combine.

A later implementation could authorize using:

- the broad service account only;
- the represented user only;
- the union of both;
- connector technical scopes as business authority;
- an arbitrary agent “on behalf of” assertion.

### Scenario

An email connector application has tenant-wide Mail.Read/Send and a product service account capable of `IssueTenderRelease`.

A user with access to Project A asks chat to issue a Project B tender. The agent sends a represented-user field for that user but the backend authorizes using the service account’s broad capability.

The command succeeds despite the represented user lacking Project B/P09 authority.

### Why blocking

P1.4 internal authority ≠ external/technical grant is frozen, but P1.7 has not frozen the execution-authority composition for service/agent/connector calls.

P1.10 or implementation would have to choose the security model.

### Narrow remediation

Define closed `ExecutionAuthorityMode` semantics, for example:

- DIRECT_PRINCIPAL;
- DELEGATED_ON_BEHALF;
- SYSTEM_BOUNDED;
- EXTERNAL_SOURCE_SUBMISSION;
- HISTORICAL_IDEMPOTENT_RECOVERY.

For delegated action, effective permission is the intersection of:

1. technical initiator capability/scope;
2. valid delegation/on-behalf grant;
3. represented principal’s current domain authority;
4. operation/resource/context constraints.

No union/escalation/implicit impersonation.

System-bounded actions must be explicitly operation-scoped and cannot borrow a user identity.

---

## BL-P17-02 — in-flight authority/profile cutover dispositions are named but not defined

### Failure

Candidate §19 lists:

- CONTINUE_OLD_PROFILE;
- REBIND_NEW_PROFILE;
- CANCEL/SUPERSEDE;
- MANUAL_RECONCILIATION;
- BLOCKED.

But it does not define when each is valid, what happens to already-sent external actions, or whether current authority/security is rechecked before an irreversible step.

### Scenario

An ERP export async operation is accepted under ConnectorProfile V1 at 10:00. At 10:05, authority cuts over to V2 and V1 is revoked. At 10:06 the worker sends the old payload externally.

A builder may claim `CONTINUE_OLD_PROFILE`; another may rebind to V2; another may cancel. All comply with the current wording.

A more dangerous scenario: a user-authorized award issue is queued, then the user’s delegation is revoked before the command executes.

### Why blocking

This decides who had authority at the irreversible action/effective point and whether dual/unauthorized writes occur.

It cannot be left to middleware.

### Narrow remediation

Freeze:

- acceptance-time bound semantics versus execution-time current authorization;
- separate `PRE_EXTERNAL_EFFECT`, `EXTERNAL_EFFECT_ALREADY_EMITTED`, `PRE_DOMAIN_EFFECT`, `DOMAIN_EFFECT_ESTABLISHED` states;
- exact meaning/guards for every cutover disposition;
- default DENY/BLOCK when no explicit disposition exists;
- historical idempotent recognition exception only for already-established facts;
- no rebind that changes payload/authority meaning under same logical operation ID.

---

## BL-P17-03 — IntegrationEvent publication retry does not immutably bind mapping/schema/redaction version

### Failure

The candidate defines versioned mapping and stable publication identity, but it does not state that the publication intent freezes the exact source→IntegrationEvent mapping/schema/redaction version.

### Scenario

AwardDecision commits under IntegrationMapping V1. Broker is down.

Before retry, mapping changes to V2, which renames fields, removes a recipient-sensitive field and changes an enum interpretation.

The retry publishes using V2 under the same IntegrationEvent/publication identity.

Consumers can no longer reconstruct what payload was intended when the source event committed, and privacy/semantic meaning may differ.

### Why blocking

Historical publication meaning and idempotent retry are undecided.

P1.7 must decide whether retry is same event or prospective republish/transformation.

### Narrow remediation

At source-event publication-intent creation, bind:

- exact mapping definition/version;
- integration-event semantic/schema version;
- redaction/disclosure profile version;
- destination/profile scope where material;
- deterministic payload or payload-generation basis/content identity.

Retry uses the bound intent.

Publishing under a newer mapping is a new explicitly related IntegrationEvent/republication, never a retry under the old identity.

---

## BL-P17-04 — ADR-0006 Tier-2 “mandatory foundation / optional activation” leaves the V1 implementation floor ambiguous

### Failure

The candidate says Tier 2 generic API/event/email/connector contracts are mandatory architecture/build-spec foundation and optional activation.

It does not tell a future builder which substrate must actually exist in V1 code versus which can remain specification-only.

### Scenario

Builder A implements only UI handlers and files, saying external API/event/email activation is optional.

Builder B implements a reusable internal command/query registry, idempotency store, operation-result API, publication intents and connector adapters.

Both claim compliance, but Builder A may require a major retrofit for chat/agents/email later.

Alternatively, a team implements a public API gateway and broker before first tender because “Tier 2 is mandatory.”

### Why blocking

ADR-0006 exists specifically to decide V1 integration depth and burden.

“Ready” must have a concrete minimum substrate without forcing every external adapter.

### Narrow remediation

Freeze V1 implementation/spec floor:

Mandatory core substrate from inception:

- bounded service/domain operation layer independent of UI;
- OperationRegistry/capability metadata;
- stable command/idempotency/result identities;
- explicit query/proposal/command/async contracts;
- domain/integration publication-intent semantics and recoverable pending state for activated publications;
- connector/profile abstraction and evidence/error contracts;
- provider-neutral email connector interface seam;
- manual/file adapters.

Optional activation/implementation:

- public external API transport;
- external broker/webhooks;
- named email/ERP/CDE adapters;
- chat/agent runtime.

Clarify whether at least one deployable named email adapter is mandatory V1 product scope or evidence-driven optional deployment. The user requirement is email-connect readiness, but no named provider prerequisite.

---

# 3. Watches / hardening

## W-P17-01 — open-transaction migration requires per-family acceptance profiles

`CURRENT_OPEN_TRANSACTION` exists but no generic state assignment is permitted.

Require a versioned `MigrationAcceptanceProfile` per domain/transaction family before use, stating required history/evidence/current state mapping, allowed target action, limitations and cutover. Default = BLOCK or REFERENCE_ONLY.

## W-P17-02 — multi-resource query consistency cut

A query across suppliers, bids, awards and external facts can be individually authoritative but mutually inconsistent if read at different instants.

Require each multi-resource query to state snapshot/cut consistency or explicitly `NON_ATOMIC_MIXED_OBSERVATION` with component times.

P1.8 can elaborate query/report models.

## W-P17-03 — capability disablement during in-flight async operation

Capability lifecycle says pending operations receive explicit disposition, but common closed dispositions are absent.

Bind continue-under-version/cancel-before-effect/manual-review/block/replacement rules, aligned with BL-P17-02.

## W-P17-04 — identity mapping correction impact

When an accepted external identity mapping is later corrected, preserve affected domain/event/evidence references and require impact/reconciliation; do not only correct the mapping row.

## W-P17-05 — connector conformance revalidation triggers

Require revalidation after material provider API/version/scope/version-semantics change, not only time expiry.

## W-P17-06 — automated command activation before P1.10

Clarify that `ENABLED_BOUNDED_AUTOMATION` may cover deterministic system automation; AI/agent autonomous elevation remains prohibited until P1.10 controlled evaluation/authorization.

---

# 4. Gate check

- G1 authority profile/no co-master — FAIL due BL-P17-01/02
- G2 bounded commands — FAIL narrowly due execution-authority composition
- G3 Q/P/C/A proposal/effect — PASS
- G4 domain/integration/transport/observation — PASS subject BL-P17-03
- G5 crash/retry/publication/callback — FAIL due BL-P17-03 and cutover gap
- G6 migration provenance/history — PASS with W-P17-01
- G7 P1.6 reconstruction/materialization — PASS
- G8 typed errors/no forced equality — PASS
- G9 cutover/in-flight/no dual writer — FAIL due BL-P17-02
- G10 evolution/replace/disable — PASS with W-P17-03
- G11 email provider-neutral/manual fallback — PASS
- G12 chat/agent readiness/no reliability assumption — PASS subject BL-P17-01
- G13 ADR-0006/no named connector prerequisite — FAIL due BL-P17-04
- G14 A0–A3 no connector — PASS
- G15 upstream/P07/product-code — PASS subject remediation
- G16 dual hostile PASS — NOT YET

---

# 5. Regression / gravity

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO if BL-P17-01/02 are closed
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 = CLEAN
- Product code = LOCKED

---

# 6. ADR posture

No status changes.

- ADR-0006 remains PROPOSED/BLOCKING until BL-P17-04 closes.
- ADR-0029 capability-neutral substrate remains candidate.
- ADR-0030 domain/integration event boundary remains candidate but BL-P17-03 must close.
- ADR-0031 connector authority model remains candidate; BL-P17-01/02 must close.
- ADR-0032 migration model remains candidate with W-P17-01 hardening.

No accepted upstream ADR reopens.

---

# 7. Verdict

`FAIL — P1.7 is structurally strong but not external-audit ready until BL-P17-01 through BL-P17-04 are closed.`

All blockers are semantic closure issues. None requires selecting technology, named connector or product code.
