# P1.7 — Claude Round 1 Remediation v0.1

**Date:** 2026-08-01  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Parent verdict:** `audits/P1_7_CLAUDE_ROUND_1_VERDICT_V0_1.md`  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Close:

- BL-P17-05 — missing indeterminate effect stage;
- W-43 — retention/quarantine of uncorrelated inbound observations;
- W-44 — SYSTEM_BOUNDED authority wording;
- W-45 — untrusted-content scope;
- W-46 — PublicationIntent destination binding;
- W-47 — V1 email-adapter conformance floor;
- W-48 — later connector-conformance failure against historical RelianceBindings.

These clauses supersede inconsistent wording in P1.7 candidate v0.1/v0.2 and prior remediation artifacts.

---

# 2. R16 — closed effect-stage taxonomy

Every state-changing or external-effect operation has exactly one current aggregate effect stage from the following closed set:

1. `PRE_ACCEPTANCE`;
2. `ACCEPTED_PRE_EFFECT`;
3. `EFFECT_INDETERMINATE`;
4. `EXTERNAL_EFFECT_EMITTED`;
5. `DOMAIN_EFFECT_ESTABLISHED`;
6. `TERMINAL_NO_EFFECT`;
7. `PARTIAL_EFFECT` with item/effect-level stages.

Operational queue/running/waiting/progress state remains separate and cannot substitute for effect stage.

## R16.1 — PRE_ACCEPTANCE

The invocation has not been accepted as a logical operation and no effect-bearing execution is authorized.

## R16.2 — ACCEPTED_PRE_EFFECT

The logical operation has been accepted, but the system has **positive evidence** that no external or domain effect-bearing boundary has been crossed.

Examples:

- operation is durably queued but no effect-bearing dispatch has begun;
- local validation rejected before external/domain execution;
- transport layer proves the request never left the controlled boundary;
- provider/domain reconciliation positively disproves any effect and the operation remains eligible to proceed.

Absence of confirmation is not positive evidence of no effect.

A timeout after a possible effect-bearing attempt cannot be classified `ACCEPTED_PRE_EFFECT` merely because no success response was received.

## R16.3 — EFFECT_INDETERMINATE

An external or domain effect may exist, but effect existence, absence, scope or correlation is neither positively confirmed nor positively disproved.

Enter this stage when any effect-bearing execution has an unresolved outcome, including as applicable:

- timeout after a call may have crossed the external/domain effect boundary;
- ambiguous provider response;
- connection loss after request transmission may have begun;
- crash after external send/commit attempt but before local result persistence;
- callback/request correlation is missing or conflicting;
- provider acknowledges receipt but its semantics do not prove or disprove the defined external effect;
- missed history/current-only source cannot establish whether the effect occurred;
- a domain command result is not visible and stable LogicalCommandId lookup has not yet confirmed or disproved commit;
- one or more items in a bulk/batch operation have unknown outcomes.

`EFFECT_INDETERMINATE` is not an error-status convenience. It is a load-bearing assertion that effect existence is unresolved and unsafe assumptions are prohibited.

## R16.4 — EXTERNAL_EFFECT_EMITTED

Positive evidence establishes that the operation’s defined external effect or durable external acceptance exists.

The OperationDefinition/ConnectorProfile states what counts as the external effect for that operation.

A socket write, local send attempt or generic HTTP success is insufficient unless connector conformance proves it establishes the defined effect.

External effect existence does not imply product DomainEvent existence.

## R16.5 — DOMAIN_EFFECT_ESTABLISHED

The authoritative owning-domain event/effect exists and is addressable through its stable DomainEventId/logical command result.

External publication or downstream synchronization may still remain pending/failed.

## R16.6 — TERMINAL_NO_EFFECT

The operation is terminal and positive evidence establishes that no external or domain effect occurred.

This is not inferred from timeout, missing callback or stale external query.

## R16.7 — PARTIAL_EFFECT

The operation contains an enumerated mixture of item/effect outcomes.

Each item/effect carries one of the applicable definite or indeterminate stages.

An aggregate `PARTIAL_EFFECT` label cannot hide which items are `EFFECT_INDETERMINATE`.

---

# 3. R17 — indeterminate-stage entry, allowed work and exit

## R17.1 — mandatory entry

Whenever an effect-bearing outcome is unknown and not positively disproved, the operation or affected item enters `EFFECT_INDETERMINATE`.

No implementation may classify the operation as pre-effect solely because:

- no response was received;
- the provider callback is missing;
- local persistence is incomplete;
- a user believes the external action probably failed;
- a retry appears harmless;
- an adapter/profile is being replaced.

## R17.2 — allowed activity while indeterminate

Only non-conflicting recovery/reconciliation activity is allowed, including:

- provider/domain result retrieval by stable correlation identity;
- read-only status/history/delta query;
- capture of callbacks/ExternalObservations/evidence;
- resynchronization;
- evidence review;
- manual reconciliation;
- provider-certified idempotent recovery/status operation that conformance proves cannot create an additional effect;
- quarantine and conflict blocking.

## R17.3 — prohibited activity while indeterminate

Until positive confirmation/disconfirmation:

- no ordinary effect-bearing retry/resend/reissue;
- no `REBIND_TECHNICALLY_COMPATIBLE`;
- no `CANCEL_OR_SUPERSEDE_PRE_EFFECT`;
- no `CONTINUE_BOUND_PROFILE` that can emit or repeat an effect;
- no conflicting new LogicalCommandId targeting the same external/domain effect;
- no assumption that cutover removed the old effect risk;
- no user/agent override that relabels the stage as pre-effect without evidence.

## R17.4 — allowed cutover dispositions

While `EFFECT_INDETERMINATE`, exactly one of these may apply:

- `RECONCILE_EXTERNAL_EFFECT`;
- `MANUAL_RECONCILIATION`;
- `BLOCKED_RECONCILIATION_REQUIRED`.

No other disposition is valid until resolution changes the effect stage.

## R17.5 — exit by positive resolution only

The operation exits `EFFECT_INDETERMINATE` only when bounded retrieval/reconciliation/evidence establishes one of:

- effect positively disproved and operation may continue → `ACCEPTED_PRE_EFFECT`;
- effect positively disproved and operation terminated → `TERMINAL_NO_EFFECT`;
- external effect positively confirmed → `EXTERNAL_EFFECT_EMITTED`;
- product domain event positively confirmed → `DOMAIN_EFFECT_ESTABLISHED`;
- mixed item/effect outcomes identified → `PARTIAL_EFFECT` with exact item stages.

Provider absence from an eventually consistent/current-only query is not positive disconfirmation unless the certified connector semantics prove it is conclusive for that operation and time window.

---

# 4. R18 — cutover-disposition matrix

| Effect stage | Permitted cutover meaning |
|---|---|
| PRE_ACCEPTANCE | reject/terminate before acceptance; new invocation if needed |
| ACCEPTED_PRE_EFFECT | CONTINUE_BOUND_PROFILE, REBIND_TECHNICALLY_COMPATIBLE, CANCEL_OR_SUPERSEDE_PRE_EFFECT, or safe block/reconciliation according to frozen guards |
| EFFECT_INDETERMINATE | RECONCILE_EXTERNAL_EFFECT, MANUAL_RECONCILIATION, or BLOCKED_RECONCILIATION_REQUIRED only |
| EXTERNAL_EFFECT_EMITTED | RECONCILE_EXTERNAL_EFFECT or MANUAL_RECONCILIATION; never pretend pre-effect cancellation prevented the external action |
| DOMAIN_EFFECT_ESTABLISHED | RECOGNIZE_ESTABLISHED_DOMAIN_EFFECT and bounded remaining recovery/publication/reconciliation; domain correction if consequence must change |
| TERMINAL_NO_EFFECT | no further effect-bearing continuation under the same logical operation |
| PARTIAL_EFFECT | disposition is item/effect scoped; any indeterminate item follows EFFECT_INDETERMINATE restrictions |

A batch-level rebind/cancel cannot bypass an indeterminate item.

A semantic, authority, payload or target change always requires a new logical operation after the old outcome is safely resolved/disposed.

---

# 5. R19 — external duplicate-effect scenario

Example:

1. product sends a Commitment-post request to an ERP;
2. the call times out after transmission may have occurred;
3. provider-side post may or may not exist;
4. operation enters `EFFECT_INDETERMINATE`;
5. connector-profile cutover occurs.

Result:

- `REBIND_TECHNICALLY_COMPATIBLE` is prohibited;
- no resend through the new adapter;
- retrieve/reconcile using original ExternalCorrelationId/provider history where possible;
- if effect confirmed, bind `EXTERNAL_EFFECT_EMITTED` and reconcile product/external state;
- if conclusively disproved, return to `ACCEPTED_PRE_EFFECT` or terminate no-effect;
- if unresolved, remain blocked/manual reconciliation;
- external duplicate cannot be justified by local LogicalCommandId reuse alone.

---

# 6. R20 — uncorrelated inbound observations are retained and quarantined

An inbound callback/observation that passes the applicable transport/source-authenticity checks but cannot currently correlate to a known local request/event is never silently discarded.

Preserve as an `ExternalObservation` with as applicable:

- tenant/external account/profile candidate scope;
- provider/source identity;
- exact payload EvidenceVersion/ContentIdentity;
- provider message/event/correlation identifiers;
- source/provider/observed times;
- authenticity/validation evidence;
- reason correlation failed;
- correlation attempts/history;
- retention/security basis;
- quarantine state.

Allowed later outcomes:

- correlate to an existing logical operation/event;
- classify as duplicate/replay;
- classify as unrelated but retained under the applicable basis;
- reject as invalid/spoofed with security evidence;
- dispose only under valid P1.6 retention/disposition rules.

An uncorrelated observation cannot create domain truth or authorize a new action.

---

# 7. R21 — SYSTEM_BOUNDED cannot originate business authority

`SYSTEM_BOUNDED` is limited to explicitly registered deterministic operations under exact policy/resource/context scope.

It cannot originate, satisfy or substitute for principal/domain authority for:

- supplier selection or award;
- approval/DOA outcome;
- AwardDecision;
- Commitment formation/effectiveness;
- commercial change;
- certification;
- payment instruction/approval;
- another decision family that frozen P09/P01–P12 semantics require a principal or separately authorized domain basis to own.

It may execute a mechanical consequence of an already-authorized immutable domain basis where the owning-domain contract explicitly permits it, but the authority remains the prior authorized basis/event—not the technical system principal.

`SYSTEM_BOUNDED` cannot be used merely because an automated rule is deterministic.

---

# 8. R22 — all inbound external content is untrusted data

The untrusted-content boundary applies to every inbound external payload, including:

- supplier documents and emails;
- ExternalObservation payloads and callbacks;
- inbound IntegrationEvent content;
- ERP/CDE/bank/technical-system records;
- imported CSV/spreadsheet/XML/JSON/PDF/text fields;
- portal/API submissions;
- attachment metadata and filenames;
- external error/status text;
- retrieved web/CDE/message content.

Instruction-like text inside external content is data, not control-plane authority.

It cannot:

- choose or redefine an OperationKey;
- alter tenant/principal/context;
- broaden tool/connector permissions;
- change destination or idempotency identity;
- bypass review/approval;
- issue new commands;
- reveal cross-tenant data;
- override system/developer/product policies.

Any suggested action extracted from external content remains a Proposal or explicit user-visible warning until a registered, authorized bounded command is independently invoked.

---

# 9. R23 — PublicationIntent destination is always semantically bound

## R23.1 — target-specific publication

PublicationIntent must bind the exact destination identity/profile/subscription/account/resource scope and its relevant version.

## R23.2 — target-independent broadcast

Where a publication is genuinely target-independent, bind the exact deterministic distribution/subscriber-set/profile rule and version that determines eligible recipients.

Actual transport attempts/recipients remain observable under that frozen distribution basis.

## R23.3 — retry/cutover

Retry uses the original destination or frozen distribution rule.

A destination, audience, profile, subscription or routing change that can alter recipient, authority, disclosure or business meaning requires a new PublicationIntent and, where effect-bearing, a new logical operation.

It cannot be treated as `REBIND_TECHNICALLY_COMPATIBLE`.

The phrase “where material” does not permit omission of destination semantics; it only permits either exact target binding or exact target-independent distribution-rule binding.

---

# 10. R24 — V1 email-adapter conformance floor

The provider-neutral email port remains mandatory V1 substrate.

At least one selected deployable V1 adapter for the target deployment class must satisfy `V1_EMAIL_CORE_CONFORMING`.

## R24.1 — required activation support

The minimum conforming adapter supports both:

- `OUTBOUND_SEND_ONLY`;
- `INBOUND_CAPTURE_SELECTED`.

`INBOUND_WATCH_SCOPED` and `BIDIRECTIONAL_SCOPED` are enhanced deployment capabilities, not universal A0–A3 prerequisites.

## R24.2 — required outbound behavior

- scoped tenant/account authorization and revocation;
- send exact frozen PRODUCT_ISSUED/Transmittal body/member versions;
- stable logical send/provider correlation;
- idempotent retry/no artifact regeneration;
- provider acceptance separated from delivery/bounce/ack/domain effect;
- capture available provider delivery/bounce observations;
- degradation and manual-send fallback.

## R24.3 — required selected-inbound behavior

- retrieve/capture a user- or workflow-selected exact provider message;
- preserve exact message body, headers needed for provenance and separate attachment EvidenceVersions;
- preserve provider/source IDs and typed source/received/observed times;
- preserve sender attribution basis without treating From as authority;
- bounded scope/least privilege;
- duplicate/correlation handling;
- error/quarantine/manual-capture fallback;
- no full mailbox archive requirement.

## R24.4 — enhanced watch conformance

An adapter claiming `INBOUND_WATCH_SCOPED` or `BIDIRECTIONAL_SCOPED` must also support:

- bounded watch/subscription scope;
- subscription lifecycle/expiry visibility;
- notification-gap detection;
- provider delta/history/full-resync path or explicit limitation;
- stale/incomplete status rather than “no changes” inference.

The EmailAdapterSelectionGate records which conformance class the target release requires and why.

No named provider is selected in P1.7.

A0–A3 remains complete under `NO_CONNECTOR_MANUAL`.

---

# 11. R25 — later connector-conformance failure does not rewrite history

If a previously certified provider/adapter later changes historical-version, callback, scope, authority or materialization semantics and no longer passes conformance:

1. block/limit future affected load-bearing capabilities until revalidated;
2. record a connector-conformance/evidence-deficiency variance;
3. identify affected ConnectorProfile/AuthorityMapping versions and historical EvidenceVersions/RelianceBindings/publications/migration items where determinable;
4. preserve the original historical RelianceBinding and the exact conformance/version basis relied on at the time;
5. do not silently invalidate, delete, rebind or substitute current external content;
6. expose reconstruction limitations/availability risk;
7. use owning-domain/evidence correction only where a supported consequence change is required.

A later conformance failure changes current confidence/availability and future eligibility. It does not rewrite what evidence/version the historical domain event actually relied on.

---

# 12. Blocker/watch closure claim

- BL-P17-05 → closed by R16–R19.
- W-43 → closed by R20.
- W-44 → closed by R21.
- W-45 → closed by R22.
- W-46 → closed by R23.
- W-47 → closed by R24.
- W-48 → closed by R25.

P1.7 remains ACTIVE pending integrated candidate v0.3, internal hostile recheck and Claude Round 2.

P1.8+ remains LOCKED.

Product code remains LOCKED.
