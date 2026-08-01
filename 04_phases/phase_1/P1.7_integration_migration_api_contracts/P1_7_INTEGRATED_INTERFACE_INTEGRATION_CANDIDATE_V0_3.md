# P1.7 — Integrated Interface, Integration & Migration Candidate v0.3

**Date:** 2026-08-01  
**Status:** REMEDIATED INTERNAL FREEZE CANDIDATE / INTERNAL RECHECK REQUIRED  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Precedence

Current P1.7 audit target is:

1. `P1_7_INTEGRATED_INTERFACE_INTEGRATION_CANDIDATE_V0_1.md` for unchanged clauses;
2. `P1_7_INTERNAL_AUDIT_REMEDIATION_V0_1.md` and candidate v0.2 for execution authority, publication intent, cutover, migration/query/capability hardening and V1 floor;
3. `P1_7_CLAUDE_ROUND_1_REMEDIATION_V0_1.md` for indeterminate effect state and W-43–W-48 closure;
4. this v0.3 consolidation where wording is clarified further.

No ADR status changes before Claude PASS and final reconciliation.

---

# 2. Closed operation and authority model remains

Every operation remains exactly one:

- QUERY;
- PROPOSAL;
- COMMAND;
- ASYNC_OPERATION.

No generic CRUD/freeform fifth class.

Every privileged invocation binds exactly one:

- DIRECT_PRINCIPAL;
- DELEGATED_ON_BEHALF;
- SYSTEM_BOUNDED;
- EXTERNAL_SOURCE_SUBMISSION;
- HISTORICAL_IDEMPOTENT_RECOVERY.

Delegated authority remains an intersection, never a union.

No valid mode = deny.

`SYSTEM_BOUNDED` cannot originate or satisfy supplier-selection, approval, AwardDecision, Commitment, change, certification or payment authority. It may perform only registered deterministic operations or mechanical consequences of an already-authorized immutable basis.

---

# 3. Closed effect-stage taxonomy

Every state-changing/external-effect operation has exactly one aggregate stage:

1. PRE_ACCEPTANCE;
2. ACCEPTED_PRE_EFFECT;
3. EFFECT_INDETERMINATE;
4. EXTERNAL_EFFECT_EMITTED;
5. DOMAIN_EFFECT_ESTABLISHED;
6. TERMINAL_NO_EFFECT;
7. PARTIAL_EFFECT with exact item/effect stages.

Operational queued/running/waiting/cancel-requested status is separate.

An operational stop/pause/cancel request may prevent future attempts but does not prove no effect and cannot change `EFFECT_INDETERMINATE` to `TERMINAL_NO_EFFECT`.

---

# 4. ACCEPTED_PRE_EFFECT requires positive no-effect evidence

`ACCEPTED_PRE_EFFECT` means:

- the logical operation is accepted; and
- positive evidence establishes that no external/domain effect-bearing boundary has been crossed.

It cannot be inferred from:

- missing success response;
- missing callback;
- timeout;
- local persistence gap;
- operator belief that the call probably failed;
- connector cutover.

If an effect-bearing call may have crossed the boundary and the outcome is unresolved, stage = `EFFECT_INDETERMINATE`.

---

# 5. EFFECT_INDETERMINATE

This stage means an external or domain effect may exist but is neither positively confirmed nor positively disproved.

Entry includes:

- ambiguous timeout/result;
- crash after possible dispatch/commit before result persistence;
- response/callback correlation loss;
- provider acknowledgment whose semantics do not prove/disprove the defined effect;
- missed history/current-only provider state;
- unresolved domain command result;
- unknown batch items.

While indeterminate, allowed activity is limited to:

- read-only result/history/delta lookup;
- callback/ExternalObservation/evidence capture;
- resynchronization;
- manual reconciliation;
- provider-certified idempotent recovery/status operation proven incapable of a second effect;
- quarantine/blocking.

Prohibited:

- ordinary effect-bearing retry/resend/reissue;
- REBIND_TECHNICALLY_COMPATIBLE;
- CANCEL_OR_SUPERSEDE_PRE_EFFECT;
- effect-bearing CONTINUE_BOUND_PROFILE;
- conflicting new logical operation;
- user/agent relabelling without evidence.

Allowed cutover dispositions only:

- RECONCILE_EXTERNAL_EFFECT;
- MANUAL_RECONCILIATION;
- BLOCKED_RECONCILIATION_REQUIRED.

Exit requires positive confirmation/disconfirmation and transitions to the appropriate definite or partial stage.

---

# 6. External-effect and domain-effect confirmation

`EXTERNAL_EFFECT_EMITTED` requires positive evidence of the operation-defined external effect or durable external acceptance.

The ConnectorProfile/OperationDefinition states what proves that effect.

A socket write, local send attempt or generic HTTP success is insufficient unless conformance proves it establishes the defined external effect.

`DOMAIN_EFFECT_ESTABLISHED` requires the authoritative owning-domain event/result to exist under stable identity.

Neither external effect nor domain effect is inferred from transport success alone.

---

# 7. Partial/bulk operations

`PARTIAL_EFFECT` enumerates every item/effect outcome.

Each item is definite or indeterminate.

Any indeterminate item follows all `EFFECT_INDETERMINATE` restrictions.

A batch-level cancel/rebind/retry cannot bypass unknown item outcomes.

Safe completed/unaffected items remain preserved; no whole-batch replay creates duplicates.

---

# 8. Cutover matrix

- PRE_ACCEPTANCE → reject/terminate before acceptance.
- ACCEPTED_PRE_EFFECT → explicitly permitted continue/rebind/cancel/safe block under current guards.
- EFFECT_INDETERMINATE → reconcile/manual/block only.
- EXTERNAL_EFFECT_EMITTED → reconcile external effect/manual; never pretend pre-effect cancellation.
- DOMAIN_EFFECT_ESTABLISHED → recognize established effect and complete bounded historical recovery/publication/reconciliation.
- TERMINAL_NO_EFFECT → no further effect-bearing continuation under same logical operation.
- PARTIAL_EFFECT → item-scoped dispositions; unknown items remain blocked.

No disposition defaults to pre-effect.

A semantic, authority, payload or target change requires a new logical operation only after the old outcome is safely resolved/disposed.

---

# 9. Uncorrelated inbound observations

An inbound observation that passes applicable source/transport authenticity checks but lacks current correlation is retained and quarantined, not discarded.

Preserve exact payload/evidence, provider/source/correlation IDs, typed times, validation basis, candidate tenant/account/profile scope, failed correlation reason/history and retention/security basis.

It may later be correlated, classified duplicate/unrelated/invalid, or disposed under P1.6 rules.

It cannot create domain truth or authorize action while uncorrelated.

---

# 10. Untrusted external data boundary

Every inbound external payload is untrusted data:

- documents/emails;
- ExternalObservations/callbacks;
- inbound IntegrationEvents;
- ERP/CDE/bank/technical records;
- CSV/spreadsheet/XML/JSON/PDF/text imports;
- API/portal submissions;
- filenames/metadata/status/error text.

Instruction-like content cannot alter operation selection, tenant/principal/context, permissions, destination, idempotency, review/approval, tool use or cross-tenant access.

Extracted suggested action remains a Proposal/warning until an independently authorized bounded command occurs.

---

# 11. PublicationIntent destination and audience

Every PublicationIntent binds either:

## Target-specific

- exact destination/account/resource/profile/subscription identity and relevant version; or

## Target-independent distribution

- exact distribution/topic/subscriber-selection profile version; and
- the recipient/subscription snapshot or deterministic historical as-of cut used for this publication where recipient identity/disclosure is material.

New subscribers do not join an old retry implicitly. They receive a separate replay/new publication under explicit semantics.

Retry preserves the original destination or frozen distribution/recipient basis.

Any destination/audience/profile/routing change affecting authority, disclosure or meaning creates a new PublicationIntent and, where effect-bearing, a new logical operation.

It is never REBIND_TECHNICALLY_COMPATIBLE merely because payload bytes are unchanged.

---

# 12. Provider-neutral email conformance floor

Mandatory V1 email substrate remains provider-neutral.

At least one selected target-release adapter must be `V1_EMAIL_CORE_CONFORMING` and support:

- OUTBOUND_SEND_ONLY;
- INBOUND_CAPTURE_SELECTED.

Core conformance includes:

- scoped authorization/revocation;
- exact frozen issued artifact send;
- stable logical/provider correlation;
- idempotent retry/no regeneration;
- acceptance/send/delivery/bounce/ack/effect separation;
- exact selected inbound body/header provenance and separate attachments;
- sender attribution basis;
- duplicates/errors/quarantine;
- degradation/manual fallback;
- no full-mailbox archive.

An adapter claiming INBOUND_WATCH_SCOPED/BIDIRECTIONAL_SCOPED also requires bounded subscription lifecycle, gap detection, resync path and explicit incomplete/stale state.

No named provider is selected in P1.7.

A0–A3 remains complete with NO_CONNECTOR_MANUAL.

---

# 13. Later connector-conformance failure

A later provider/adapter conformance failure:

- blocks/limits future affected capabilities;
- creates conformance/evidence-deficiency variance;
- identifies affected profile versions and historical bindings where determinable;
- preserves original EvidenceVersion/RelianceBinding/conformance basis;
- never silently invalidates, rebinds or substitutes current content;
- exposes reconstruction limitations;
- routes any consequence change through owning-domain/evidence correction.

Historical meaning remains; current confidence/availability/future eligibility may change.

---

# 14. Existing core preserved

Unchanged candidate semantics remain:

- OperationRegistry and common invocation context;
- closed Q/P/C/A result semantics;
- proposal never becomes truth without command;
- exact query consistency/as-of/multi-resource cuts;
- stable identities/idempotency/result lookup;
- DomainEvent ≠ IntegrationEvent ≠ TransportEnvelope ≠ ExternalObservation;
- immutable PublicationIntent mapping/schema/disclosure/serialization basis;
- at-least-once/missed/reordered/replay recovery;
- ConnectorProfile/AuthorityMapping/transformations/no co-master;
- P1.6 ReconstructionAnchorTest/materialization;
- connector lifecycle/degradation/manual fallback;
- migration classes/manifests/MigrationAcceptanceProfile/no direct state assignment;
- typed error/reconciliation/quarantine;
- chat/agent query/proposal/command/async/explain/abstain boundary;
- BOQ-to-RFQ proposal chain without autonomy claim;
- ADR-0006 tiered V1 floor;
- A0–A3 no-connector proof;
- P07 sole XL / no iPaaS-agent-platform gravity.

---

# 15. Candidate ADR posture

No formal status changes.

Internal candidate classification, subject to recheck/Claude:

- ADR-0006 — ACCEPT;
- ADR-0029 — ACCEPT;
- ADR-0030 — ACCEPT;
- ADR-0031 — ACCEPT after indeterminate-stage remediation;
- ADR-0032 — ACCEPT.

ADR-0016 remains P1.9-owned.

ADR-0017 remains P1.10-owned.

---

# 16. Gate claim before internal recheck

- G1 authority/no co-master — PASS
- G2 bounded commands/execution authority — PASS
- G3 Q/P/C/A/proposal-effect — PASS
- G4 event/message separation — PASS
- G5 async/idempotency/publication/callback recovery — PASS
- G6 migration truth/provenance/history — PASS
- G7 P1.6 evidence/version compliance — PASS
- G8 error/conflict/staleness/quarantine — PASS
- G9 cutover/in-flight/no dual writer — PASS after EFFECT_INDETERMINATE
- G10 evolution/disable/replace — PASS
- G11 email/provider-neutral/manual fallback — PASS
- G12 chat/agent readiness/no capability assumption — PASS
- G13 ADR-0006/V1 floor/no named connector prerequisite — PASS
- G14 A0–A3 no connector — PASS
- G15 upstream/P07/product-code lock — PASS
- G16 internal recheck + Claude Round 2 pending

This claim requires independent internal hostile recheck.
