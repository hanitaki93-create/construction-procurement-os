# P1.7 — Indeterminate Effect Hardening v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL HARDENING / RECHECK REQUIRED  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Ensure `EFFECT_INDETERMINATE` cannot become a mutable status field, silent operational limbo or a cutover loophole.

---

# 2. Effect-stage history is immutable in meaning

Effect stage is represented through history-preserving stage-assessment/transition semantics.

Every transition preserves as applicable:

- LogicalCommandId / AsyncOperationId / BatchItemId;
- prior and resulting stage;
- affected external/domain effect family and scope;
- reason/trigger;
- exact evidence/ExternalObservation/result lookup used;
- ConnectorProfile/OperationDefinition/conformance versions;
- correlation identities;
- actor/system and authority mode;
- recorded time and relevant source/observed/effective times;
- cutover/reconciliation disposition;
- unresolved limitations.

The current effect stage is a projection over valid transition history.

A later resolution cannot delete the fact that the operation was previously indeterminate or the evidence basis used to resolve it.

No direct status overwrite is permitted.

---

# 3. Mandatory unresolved-effect exposure

Every current `EFFECT_INDETERMINATE` operation/item must expose at minimum:

- affected operation/item/effect identity;
- tenant/project/context;
- external target/account/profile;
- time uncertainty began;
- last effect-bearing attempt/known boundary;
- why effect is indeterminate;
- known provider/correlation identifiers;
- last reconciliation attempt/result;
- permitted next actions;
- blocked conflicting operations;
- assigned owning operational/domain queue or explicit unassigned-control breach;
- aging/escalation state under a versioned operational policy;
- evidence/observation limitations.

The product cannot represent an indeterminate effect merely as generic “failed”, “pending” or “retrying”.

P1.7 does not create a generic case-management platform; it requires enough visibility for safe reconciliation.

---

# 4. Operational cancellation does not resolve effect uncertainty

A user/system may request operational stop/cancel to prevent additional attempts.

This may change operational state to paused/cancel-requested/cancelled-for-future-attempts.

It does not change `EFFECT_INDETERMINATE` until effect existence is positively confirmed/disproved.

A cancelled operational workflow may therefore retain an unresolved indeterminate effect requiring reconciliation.

---

# 5. Reconciliation through a replacement adapter

After cutover/retirement of the original adapter, `RECONCILE_EXTERNAL_EFFECT` may use a replacement connector/profile only when:

- it addresses the same authoritative external account/target and original correlation scope;
- current technical permission permits read/retrieval/reconciliation;
- the operation is non-effecting or provider-certified idempotent recovery incapable of duplicate effect;
- the original ConnectorProfile/PublicationIntent/operation meaning remains bound;
- the replacement adapter does not reinterpret source identity, effect definition or confirmation/disconfirmation criteria;
- conformance covers the required historical/status retrieval.

This is reconciliation, not `REBIND_TECHNICALLY_COMPATIBLE` execution.

No new effect-bearing call is permitted merely because a new adapter can reach the same provider.

---

# 6. Version-bound confirmation/disconfirmation criteria

Each effect-bearing OperationDefinition + ConnectorProfile version identifies:

- what constitutes effect attempt;
- what constitutes positive external-effect confirmation;
- what constitutes positive no-effect disconfirmation;
- provider consistency/settlement windows where relevant;
- which callbacks/status/history records are terminal versus provisional;
- correlation requirements;
- certified idempotent recovery behavior if any;
- conditions under which absence is conclusive or inconclusive.

A later connector/provider semantic change cannot retroactively alter the criteria used for an existing operation.

If prior criteria are later found defective, record conformance/evidence variance and use reconciliation/domain correction; do not silently rewrite stage history.

---

# 7. Stage is not authority

Effect stage controls which recovery/cutover actions are semantically safe.

It does not itself grant authority.

Every allowed reconciliation/recovery action still requires:

- valid current technical/security capability;
- valid execution-authority mode;
- tenant/project/context scope;
- operation-specific guards;
- evidence/config/version binding;
- no new discretionary business effect.

---

# 8. Bulk and chained operations

For a batch or chained integration flow:

- each effect-bearing item/step has its own stage history;
- aggregate stage is derived;
- unknown downstream/side effects remain explicit;
- safe items may continue only where doing so cannot conflict with an indeterminate item;
- a new step cannot assume an indeterminate predecessor failed;
- reconciliation may resolve items independently while preserving batch causal lineage.

---

# 9. Closure claim

This hardening ensures `EFFECT_INDETERMINATE` is:

- a load-bearing semantic state;
- historically reconstructable;
- visibly owned/aged;
- non-authoritative by itself;
- safe across cutover;
- unable to trigger duplicate external effects through retry/rebind/cancel assumptions.
