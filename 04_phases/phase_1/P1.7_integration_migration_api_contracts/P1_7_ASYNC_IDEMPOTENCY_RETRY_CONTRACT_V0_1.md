# P1.7 — Async, Idempotency, Retry & Recovery Contract v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Freeze recovery meaning for timeouts, duplicate calls, asynchronous jobs, publication failures, callback races, connector retries and partial work without choosing queue/outbox/transaction technology.

---

# 2. Core principles

1. transport success/failure is not business success/failure;
2. timeout means outcome unknown until resolved, not safe to repeat as new intent;
3. stable logical identity survives retries/channels/process restarts;
4. exactly-once business effect is enforced at the domain boundary, not assumed from transport;
5. partial work is explicit;
6. recovery never rewrites authoritative truth merely to make integration state consistent;
7. operational progress/attempt history remains separate from domain effect.

---

# 3. Identity hierarchy

P1.7 distinguishes:

- `InvocationId` — one received attempt/request;
- `LogicalCommandId` — one intended bounded business command across retries;
- `AsyncOperationId` — one long-running operation/container;
- `DomainEventId` — one authoritative result event;
- `IntegrationEventId` — one published semantic representation;
- `TransportAttemptId` — one delivery/API/callback attempt;
- `ExternalCorrelationId` — provider/source identifier;
- `BatchId` + `BatchItemId` — bulk container/item identities;
- `MigrationRunId` + item mapping identity;
- `CommunicationSatisfactionSnapshotId` where P1.6 applies.

These identities cannot be collapsed into one generic request ID.

---

# 4. Idempotency scope

Every idempotent operation defines:

- key scope: tenant + operation + resource/business context;
- payload semantic fingerprint/version;
- principal/represented-principal relevance;
- validity/replay horizon;
- completed/pending/failed result reuse behavior;
- changed-payload conflict behavior;
- concurrent-attempt arbitration;
- child item identity for bulk operations.

A globally reused client string is not sufficient without scope.

---

# 5. Request timeout

If a client times out after sending a command:

- client outcome is `UNKNOWN_PENDING_RESOLUTION`;
- retry must use the same LogicalCommandId/idempotency key;
- server returns existing pending/completed/rejected result where available;
- client may query operation/result by stable ID;
- a new key means new intent and may be rejected if domain detects conflict, but cannot be assumed equivalent.

UI/chat must not tell the user “failed” merely because the response was lost.

---

# 6. Concurrent duplicate commands

When concurrent attempts share the same logical command identity:

- at most one owns execution/establishment;
- others observe pending or receive the same terminal result;
- payload/context mismatch returns `IDEMPOTENCY_CONFLICT`;
- no duplicate numbering/effects/artifacts are allocated;
- attempt history remains observable.

Physical locking/unique constraints are later implementation.

---

# 7. Retry classification

Every error/result declares one:

- `SAFE_RETRY_SAME_IDENTITY`;
- `RETRY_AFTER_REAUTHORIZATION`;
- `RETRY_AFTER_DEPENDENCY_RECOVERY`;
- `RETRY_AFTER_RECONCILIATION`;
- `NO_RETRY_REQUIRES_INPUT_CHANGE`;
- `NO_RETRY_TERMINAL`;
- `UNKNOWN_QUARANTINE`.

Generic retry-all behavior is prohibited.

Backoff/rate algorithm is physical implementation, but cannot create new logical intent.

---

# 8. Domain commit / response loss

Scenario: domain commit succeeds, process crashes before returning result.

Required semantics:

- DomainEvent/result remains authoritative;
- retry/query by LogicalCommandId resolves same event/result;
- no duplicate domain transition;
- response attempt history shows original uncertainty/recovery.

---

# 9. Domain commit / publication failure

Scenario: DomainEvent commits; IntegrationEvent publication fails.

Required semantics:

- DomainEvent remains authoritative;
- stable publish intent stays pending/failed-retryable;
- publication retries same semantic event identity;
- no second domain command/event;
- consumer-specific failure does not change source event;
- terminal publication failure becomes visible operational debt/quarantine and can use bounded manual export/recovery.

---

# 10. External request / callback races

## R01 — callback before request persistence

Preserve callback as pending/orphan ExternalObservation keyed by provider/source correlation.

Later reconcile to the local operation if exact correlation/provenance proves relationship.

Do not create local business completion from weak similarity.

## R02 — callback after local timeout

Callback may help resolve external transport/operation state but remains observation. Owning domain effect follows its registered operation/P1.6 rule.

## R03 — duplicate callbacks

Deduplicate/reconcile using provider event/message/subscription/resource/version IDs plus tenant/context and payload integrity. Multiple callbacks may remain separate TransportAttempts around one ExternalObservation.

## R04 — callback correction

Later provider correction preserves original/corrective observations and follows P1.6 established-once/domain-correction boundary.

---

# 11. Async operation recovery

An AsyncOperation stores enough durable semantic state to resume/reconcile without reinterpreting input:

- exact operation definition/version;
- input payload/version;
- tenant/principal/context;
- source/evidence/config versions;
- item plan/checkpoint;
- completed item results/effects;
- pending/external waits;
- retry/error history;
- cancellation/supersession status;
- final manifest.

Restart uses original bound semantics, not current defaults/config unless the operation contract explicitly requires a governed rebasing step.

---

# 12. Partial operations

For non-atomic bulk/async operations:

- each item has stable identity and result;
- completed items are not silently rerun;
- failed items may retry with same item identity;
- added/changed rows become a new batch/version, not mutation of completed manifest;
- aggregate status derives from item states;
- partial completion cannot be presented as full success.

For atomic operations, no item effect remains if the owning-domain atomic transaction fails; external side effects already emitted require explicit compensation/reconciliation, not denial.

---

# 13. Cancellation and supersession

Cancellation requests are bounded and state-aware.

- before execution: operation may cancel with no result;
- during non-effectful work: stop remaining work where supported;
- after proposals/results: retain produced history and mark operation cancelled/partial;
- after domain effects: cancellation cannot undo effects; owning-domain correction required;
- awaiting external callback: cancellation may stop waiting/local follow-up but cannot erase external action already sent;
- a superseding operation references predecessor and preserves both histories.

---

# 14. Configuration/version drift

A retried or resumed operation uses versions bound at original acceptance for:

- operation semantics;
- policy/authority basis where historically frozen;
- source/evidence/proposal versions;
- calculations/calendar/time rules;
- connector profile where needed to interpret prior request.

Current security/authorization remains applicable to new discretionary actions, while idempotent recognition/persistence of already-established facts follows frozen P1.4–P1.6 rules.

If continuation genuinely requires current config/authority, the contract declares a revalidation boundary and outcome.

---

# 15. Connector subscription gaps

When a webhook/watch subscription expires, is removed or reports missed notifications:

- connector state becomes DEGRADED or RESYNC_REQUIRED;
- record gap start/end/history token/checkpoint;
- use provider-supported delta/history/full reconciliation;
- create exact ExternalObservations for recovered facts where version/provenance permits;
- do not infer chronological completeness from callback stream alone;
- no domain effect is reversed merely because notifications were missed;
- unresolved historical-version gaps remain explicit/quarantined.

---

# 16. Poison/quarantine

Repeated or unclassifiable failures enter quarantine with:

- exact payload/version/source;
- attempts/errors;
- tenant/context;
- suspected target/mapping;
- authority/evidence state;
- safe remediation actions;
- no automatic nearest-match application;
- retention/access classification.

Quarantine is not success, rejection or deletion.

---

# 17. Status truth

Operational states and business states remain separate.

Examples:

- API `202 Accepted` ≠ command completed;
- event PUBLISHED ≠ consumer applied;
- connector DELIVERED ≠ recipient acknowledged;
- migration RUNNING ≠ records authoritative;
- async COMPLETED may produce a proposal, not a domain effect;
- callback received ≠ external fact validated.

Every status UI/chat response identifies the layer.

---

# 18. A0–A3 fallback

If queues/connectors/external APIs are unavailable, minimal deployment may use:

- synchronous internal commands;
- bounded manual capture;
- resumable structured file operations;
- visible pending/manual retry states;
- direct product evidence/issued artifacts.

No enterprise event infrastructure is mandatory for first tender.

---

# 19. One-XL guard

This is not a generic job scheduler, workflow/orchestration engine or integration monitoring product.

It defines recovery semantics only for product operations/integrations.

**P07 sole XL: preserved.**

---

# 20. Hostile tests

1. Server commits award then HTTP response lost — retry returns same award? REQUIRED.
2. Publish retry after broker outage — no duplicate award/event meaning? REQUIRED.
3. Two agents issue same command ID concurrently — one effect? REQUIRED.
4. Same key with different quote revision — conflict? REQUIRED.
5. Provider callback precedes request record — quarantined/pending exact correlation? REQUIRED.
6. Subscription misses 6 hours — explicit gap/resync, no assumption of completeness? REQUIRED.
7. Batch 70/100 complete then crash — restart processes remaining only? REQUIRED.
8. Cancel after 20 domain effects — effects remain; correction required? REQUIRED.
9. Current config changed during retry — original bound semantics preserved unless declared revalidation? REQUIRED.
10. Chat sees `ACCEPTED` — cannot tell user completed? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
