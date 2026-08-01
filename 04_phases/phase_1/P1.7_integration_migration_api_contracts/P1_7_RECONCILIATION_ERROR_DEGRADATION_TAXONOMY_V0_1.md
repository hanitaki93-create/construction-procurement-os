# P1.7 — Reconciliation, Error & Degradation Taxonomy v0.1

**Date:** 2026-08-01  
**Status:** INTERNAL CANDIDATE / NOT FROZEN  
**Stage:** P1.7  
**Product code:** LOCKED

---

# 1. Purpose

Define closed semantic classes for integration/import/migration/API/connector failures and mismatches so systems cannot hide errors under generic “sync failed” or resolve them by overwriting authoritative truth.

---

# 2. Error layers

Every issue identifies one primary layer.

## L1 — TRANSPORT

Network, timeout, DNS/TLS, provider availability, delivery or connectivity failure.

## L2 — AUTHENTICATION

Token, credential, signature, subscription validation or technical identity failure.

## L3 — AUTHORIZATION_SCOPE

Technical permission/scope/tenant/resource grant is absent or revoked.

## L4 — CONTRACT_SCHEMA

Payload/event/API/file schema/version/encoding incompatibility.

## L5 — IDENTITY_REFERENCE

External/product identity mapping, referential or duplicate ambiguity.

## L6 — EVIDENCE_PROVENANCE

Exact source/version/locator/integrity/reconstruction-anchor requirement failure.

## L7 — FRESHNESS_AVAILABILITY

External fact stale, source unavailable, history gap, subscription removed or resync incomplete.

## L8 — AUTHORITY_CONFLICT

Two sources/writers claim authority, cutover ambiguous or mapping violates OWN/MIRROR/REFERENCE/OUT.

## L9 — BUSINESS_PRECONDITION

Owning-domain state/version/guard/effective-time condition fails.

## L10 — BUSINESS_RULE

Request is well-formed/authorized but prohibited by frozen domain semantics.

## L11 — CONCURRENCY_IDEMPOTENCY

Version conflict, duplicate logical command, changed payload under same key or race.

## L12 — TRANSFORMATION_MAPPING

Deterministic mapping missing/invalid or uncertain proposal requires review.

## L13 — PARTIAL_BATCH

Some dependent/items succeed/fail/cancel/quarantine.

## L14 — RETENTION_RESIDENCY_SECURITY

Data cannot be processed/retained/exported due to governing retention/residency/sensitivity/security basis.

## L15 — UNKNOWN_UNCLASSIFIABLE

Cannot safely classify. Must quarantine; never nearest-match application.

No generic SUCCESS_WITH_WARNING can conceal a failed load-bearing invariant.

---

# 3. IssueRecord

Every load-bearing issue preserves:

- stable IssueId;
- primary layer + specific code/version;
- severity/impact;
- tenant/project/context;
- operation/command/event/connector/import/migration identity;
- source/target/resource/item;
- exact payload/evidence/version refs;
- detected time;
- source/effective/observed times where relevant;
- authority/freshness state;
- retryability;
- business/domain effect impact;
- affected pending/completed items;
- current issue lifecycle state;
- allowed remediation operations;
- resolution/disposition history;
- user-safe explanation key and restricted technical detail.

Error message text is not the classification.

---

# 4. Issue lifecycle

Closed states:

- `DETECTED`;
- `RETRY_PENDING`;
- `WAITING_REAUTHORIZATION`;
- `WAITING_EXTERNAL_RECOVERY`;
- `WAITING_RECONCILIATION`;
- `WAITING_USER_INPUT`;
- `WAITING_DOMAIN_ACTION`;
- `QUARANTINED`;
- `RESOLVED_RETRIED`;
- `RESOLVED_MAPPED`;
- `RESOLVED_DOMAIN_CORRECTION`;
- `RESOLVED_REFERENCE_LIMITATION`;
- `RESOLVED_EXCLUDED`;
- `SUPERSEDED`;
- `TERMINAL_UNRESOLVED`.

Resolution state does not rewrite the original failure.

---

# 5. Retryability

Exactly one:

- `AUTOMATIC_RETRY_SAME_IDENTITY`;
- `MANUAL_RETRY_SAME_IDENTITY`;
- `RETRY_AFTER_REAUTH`;
- `RETRY_AFTER_RESYNC`;
- `RETRY_AFTER_MAPPING`;
- `RETRY_AFTER_DOMAIN_CHANGE`;
- `NO_RETRY_NEW_INPUT_REQUIRED`;
- `NO_RETRY_TERMINAL`;
- `QUARANTINE_UNKNOWN`.

Automatic retry is prohibited for business-rule/authority/evidence ambiguity unless the required external condition is mechanically detectable and the logical identity remains unchanged.

---

# 6. Reconciliation classes

## R1 — EQUALITY_CONFIRMED

Compared facts represent same semantic fact/value/version under same authority/effective context.

## R2 — EXPECTED_DIVERGENCE

Facts intentionally differ because they have different authority/meaning, e.g. certified value versus accounting-posted value.

## R3 — TIMING_LAG

Same intended fact but one side has not observed/posted/processed it yet under acceptable window.

## R4 — STALE_SOURCE

One side’s observation is outside acceptable freshness or sync gap exists.

## R5 — VALUE_CONFLICT

Same semantic fact/authority scope claims incompatible values.

## R6 — AUTHORITY_CONFLICT

Sources disagree about who owns/writes the fact or dual writers exist.

## R7 — IDENTITY_CONFLICT

Facts cannot be safely matched or one ID maps to multiple targets.

## R8 — VERSION_CONFLICT

Different source/revision/config/schema versions with unresolved applicability.

## R9 — MISSING_PRODUCT_FACT

External fact exists but corresponding product fact is absent; may be expected, pending or erroneous.

## R10 — MISSING_EXTERNAL_FACT

Product fact exists but expected external fact is absent.

## R11 — EVIDENCE_DEFICIENCY

Value/status exists but exact source/version/locator/provenance is insufficient.

## R12 — CORRECTION_NOT_PROPAGATED

Source correction exists but consumer/mirror/reference projection has not processed it.

## R13 — DUPLICATE_OR_REPLAY

Repeated fact/event/callback likely same logical source.

## R14 — UNCLASSIFIED_QUARANTINE

No safe semantic classification.

Reconciliation does not require equality when semantics intentionally differ.

---

# 7. Resolution operations

Allowed resolution types are explicit:

- retry transport/retrieve;
- reauthorize/reconnect;
- resync/reconcile source history;
- accept exact verified identity mapping;
- reject/separate mistaken mapping;
- create proposal mapping for review;
- correct integration representation;
- invoke owning-domain correction/action;
- retain expected divergence;
- import/reference with declared limitation;
- exclude with manifest/impact;
- supersede connector/profile/mapping;
- quarantine/terminal unresolved.

Prohibited “resolution”:

- overwrite product truth to equal external value;
- edit source evidence/history;
- silently choose latest/current;
- collapse distinct actuals;
- drop failed rows;
- mark success without required evidence;
- change authority because connector has write access.

---

# 8. Degradation levels

A connector/capability/operation may be:

## D0 — HEALTHY

All activated capabilities meet expected source/permission/freshness/recovery conditions.

## D1 — LIMITED_NON_LOAD_BEARING

Optional/search/convenience function impaired; load-bearing operations unaffected.

## D2 — DEGRADED_WITH_FALLBACK

Some activated capability unavailable/stale; manual/file/alternate bounded fallback exists.

## D3 — BLOCKED_LOAD_BEARING

A required authority/evidence/freshness/permission dependency is unavailable; affected commands blocked.

## D4 — RESYNC_OR_RECONCILIATION_REQUIRED

Continuity/history completeness uncertain; affected facts/events cannot be assumed current/complete.

## D5 — SECURITY_OR_AUTHORITY_STOP

Credential/scope/tenant/authority conflict requires immediate stop of affected operations.

## D6 — RETIRED/DISCONNECTED

No new operations; historical evidence/state retained under policy.

Degradation is scoped by capability/fact/resource, not necessarily the whole connector.

---

# 9. User/chat visibility

Queries/chat/status views must distinguish:

- domain business state;
- operation state;
- connector health;
- external fact freshness;
- reconciliation issue;
- evidence limitation;
- pending user/domain action.

Examples:

- “AwardDecision completed; ERP handoff pending.”
- “Email issued; delivery not confirmed.”
- “Payment status unavailable because ERP connector requires reauthorization.”
- “Quote mapping proposed; supplier identity unresolved.”

Do not display one green/red “sync” status as substitute for these meanings.

---

# 10. Error safety and information disclosure

Errors returned to external users/agents reveal only authorized context.

A rejected cross-tenant reference should not confirm another tenant/resource exists.

Technical logs may include restricted identifiers under access/retention controls.

Chat explanations cannot expose hidden evidence/error payloads beyond principal authority.

---

# 11. Metrics/monitoring boundary

P1.7 permits operational measures such as:

- pending/failed/retry/quarantine counts;
- age of unresolved items;
- last successful sync/checkpoint;
- publication backlog;
- reauthorization expiry;
- partial batch totals;
- mismatch classes.

P1.7 does not design P1.8 reporting/analytics dashboards or an observability platform.

Operational monitoring cannot become business status authority.

---

# 12. A0–A3 minimal profile

Minimal deployment can surface issues through bounded in-product/manual queues without enterprise monitoring.

Connector errors cannot prevent product-owned sourcing steps unless the specific external dependency is genuinely required.

No named connector means no connector-health prerequisite.

---

# 13. One-XL guard

This is not:

- generic ITSM platform;
- enterprise observability product;
- data quality/MDM suite;
- reconciliation accounting engine;
- workflow/escalation platform.

It defines product-specific typed integration states only.

**P07 sole XL: preserved.**

---

# 14. Hostile tests

1. Certified = 100, ERP posted = 95 — EXPECTED_DIVERGENCE or timing/value conflict according to facts, not forced equality? REQUIRED.
2. Token expired — AUTHENTICATION/WAITING_REAUTH, not business rejection? REQUIRED.
3. Same external ID maps to two suppliers — IDENTITY_CONFLICT/quarantine? REQUIRED.
4. Unknown webhook type — quarantine, no nearest event? REQUIRED.
5. Batch silently drops 20 rows — prohibited? REQUIRED.
6. External source stale — command requiring freshness blocks; unrelated product operation may continue? REQUIRED.
7. Agent asks why command failed — authorized structured explanation, no hidden data leakage? REQUIRED.
8. Connector write access but authority conflict — security/authority stop, no write? REQUIRED.
9. Migration lacks source revision — evidence deficiency/reference limitation, no fabricated history? REQUIRED.
10. “Sync successful” but domain command rejected — separate states visible? REQUIRED.

This artifact remains subject to integrated P1.7 hostile audit.
