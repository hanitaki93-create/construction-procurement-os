# P1.9 — Interaction, Operation and Authority Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **Every state-changing interaction is an explicit request to one registered bounded operation. The interface may prepare, preview and explain that operation, but cannot create authority, hide its class or relabel its outcome.**

---

# 2. Interaction classes

Every actionable affordance has exactly one interaction class:

- `QUERY_INTERACTION` — read current/as-of/versioned information;
- `PROPOSAL_INTERACTION` — create/revise non-authoritative draft or proposal;
- `COMMAND_INTERACTION` — request authoritative domain transition;
- `ASYNC_OPERATION_INTERACTION` — initiate/status/recover a bounded asynchronous operation;
- `NAVIGATION_INTERACTION` — change context only;
- `LOCAL_PRESENTATION_INTERACTION` — sort/filter/expand/select for presentation only.

Navigation, selection, drag/drop, sorting, filtering, auto-save, scrolling, row expansion, tab change or local annotation cannot perform COMMAND semantics unless the interaction is explicitly reclassified and presented as a command.

---

# 3. `OperationAffordance`

Every operation affordance binds:

- `CapabilityKey` and version;
- `OperationKey` and class;
- lifecycle/activation state;
- principal and represented principal;
- tenant/project/ContractingAuthorityContext;
- target canonical identity and expected version/state;
- exact scope/batch membership;
- required authority/delegation/DOA;
- required evidence/configuration/prerequisites;
- consequence class and reversibility/correction path;
- idempotency/logical-command identity policy;
- permitted channels;
- current eligibility and reasons when unavailable;
- help/explanation reference;
- audit/provenance basis.

An unavailable operation is not hidden where its absence would mislead the user about process capability. It may be disabled or omitted only under a declared disclosure policy that does not imply the business action is impossible or already satisfied.

---

# 4. Operation interaction sequence

A consequential interaction uses the following semantic stages as applicable:

1. `INTENT_CAPTURED` — target and requested action selected;
2. `CONTEXT_RESOLVED` — tenant/project/authority/target/version resolved;
3. `INPUT_DRAFTED` — user-supplied values/evidence assembled;
4. `PREVALIDATED` — deterministic non-authoritative checks executed;
5. `PREVIEW_READY` — exact operation/consequence/limitations shown;
6. `CONFIRMATION_READY` — deliberate finalization available where required;
7. `SUBMITTED` — invocation accepted for processing, not effect proof;
8. `OPERATION_ACCEPTED` or typed rejection;
9. `EFFECT_PENDING`, `EFFECT_ESTABLISHED`, `PARTIAL_EFFECT`, `EFFECT_INDETERMINATE`, `TERMINAL_NO_EFFECT` or other exact domain/result state;
10. `RECOVERY_OR_CORRECTION_AVAILABLE` where applicable.

Stages cannot be collapsed when doing so would imply stronger authority or effect.

---

# 5. `OperationPreview`

Before a high-consequence command, preview must bind and expose:

- exact operation name/class/version;
- target identity/version and affected member set;
- acting principal and represented principal;
- authority/DOA/delegation basis;
- exact values, currencies, quantities, dates and time basis;
- evidence/version/member set relied upon;
- validations passed, warnings and blockers;
- expected domain effect and explicit non-effects;
- external publication/communication intended where relevant;
- reversibility, correction or no-reversal behavior;
- idempotency/retry behavior;
- known partial/unknown-effect risk;
- source freshness/limitations material to the command;
- expiry/stale-view condition that would invalidate preview.

Preview is a proposal/query result and cannot itself create authority or reserve the future outcome unless the owning domain explicitly supports a bounded reservation operation.

---

# 6. Consequence classes

Every command declares one:

- `LOW_CONSEQUENCE_REVERSIBLE`;
- `MATERIAL_REVERSIBLE_WITH_HISTORY`;
- `MATERIAL_CORRECTABLE_NOT_REVERSIBLE`;
- `IRREVERSIBLE_DOMAIN_EFFECT`;
- `EXTERNAL_EFFECT_BEARING`;
- `BULK_OR_MULTI_PARTY_EFFECT`;
- `EVIDENCE_OR_HISTORY_DISPOSITION`;
- `ACCESS_OR_AUTHORITY_CHANGE`.

The class determines review, confirmation, reauthentication, evidence and recovery obligations. Visual severity alone does not determine consequence.

---

# 7. Confirmation policy

Confirmation is required where the operation can create legal/commercial commitment, award, certification, external issue, evidence disposition, access/authority change, bulk effect or materially difficult correction.

Confirmation must:

- follow review of exact values/member set/consequences;
- be specific to the operation;
- not use a generic “Are you sure?” alone;
- permit correction/cancel before submission;
- distinguish acknowledgement of limitations from acceptance of business consequences;
- not waive blockers, missing authority or evidence;
- expire when target version, population, authority, evidence or material data changes;
- be keyboard and assistive-technology operable;
- not rely on color, position or preselected consent.

Reauthentication may be required by later security design but cannot substitute for consequence review.

---

# 8. Validation and rejection classes

Typed outcomes:

- `INPUT_VALIDATION_FAILED`;
- `AUTHORIZATION_DENIED`;
- `DELEGATION_OR_DOA_INVALID`;
- `PREREQUISITE_OR_EVIDENCE_MISSING`;
- `TARGET_VERSION_CONFLICT`;
- `TARGET_STATE_CONFLICT`;
- `CONFIGURATION_VERSION_CONFLICT`;
- `SOURCE_STALE_OR_UNAVAILABLE`;
- `POPULATION_OR_SCOPE_CHANGED`;
- `DUPLICATE_LOGICAL_COMMAND`;
- `CAPABILITY_DISABLED_OR_RETIRED`;
- `EXTERNAL_GRANT_INVALID`;
- `RATE_OR_CAPACITY_LIMITED`;
- `OPERATION_REJECTED_OTHER_TYPED`.

Each outcome exposes:

- what failed;
- whether any effect may have occurred;
- corrective action permitted;
- whether re-preview/reconfirmation is required;
- stable result/recovery identity;
- no blame language or silent field loss.

Authorization failures do not reveal restricted facts beyond safe disclosure.

---

# 9. `InteractionOutcomeEnvelope`

Every invocation returns or resolves to an envelope binding:

- `InvocationId`;
- `LogicalCommandId` where applicable;
- `AsyncOperationId` where applicable;
- operation/version/class;
- principal/represented principal/context;
- target/member identities;
- acceptance status;
- operational status;
- effect stage and per-item stages;
- authoritative result/domain event identities where established;
- publication/external correlation identities where relevant;
- accepted/rejected/failed/partial/unknown explanation;
- safe next actions;
- retry policy;
- result lookup/recovery reference;
- source cut/version/evidence lineage;
- recorded time.

The UI cannot replace this with a single success/failure boolean.

---

# 10. Accepted versus effect established

Required language distinction:

- “Request accepted” means the system accepted the command for processing;
- “Domain effect established” means the owning domain transition is confirmed;
- “External submission accepted” means only the operation-defined external acceptance criterion, not delivery/ack/domain consequence unless separately proven;
- “Pending” must name what is pending;
- “Unknown/indeterminate” must state that retry may be unsafe;
- “Partial” must expose per-item/member result.

A toast, banner, email or chat response cannot say “completed,” “issued,” “awarded,” “committed,” “delivered,” “acknowledged” or equivalent unless the corresponding authoritative effect is established.

---

# 11. Stale preview and optimistic concurrency

A preview binds target, population, evidence, authority and configuration versions.

Before execution, the command must reject or re-preview when a material bound version changed.

The interface must not silently:

- apply the command to a new row population;
- refresh values after confirmation and continue;
- exclude newly ineligible members;
- use current authority/configuration to reinterpret the old preview;
- convert a failed command into a new command with changed identity.

---

# 12. Idempotency, duplicate and retry

- repeated submit with same logical identity returns/reconstructs the original result;
- changed material command context requires a new logical identity and preview;
- UI double-click/network retry cannot create duplicate effect;
- duplicate detection cannot suppress a genuinely new correction/revision;
- timeout or lost response is not failure/no-effect proof;
- ordinary retry is prohibited while effect is indeterminate unless provider/domain recovery is certified incapable of second effect.

The interface must offer result lookup before resend.

---

# 13. Async operation interaction

An async view exposes:

- operation identity;
- initiated by/on behalf of;
- start and last progress time;
- exact progress basis where known;
- queued/running/waiting/reconciling/blocked/partial/completed/indeterminate status;
- item counts by stage;
- source/member set/version;
- safe cancel/pause semantics;
- whether cancellation prevents future work only or proves no effect;
- errors and recovery;
- accessible status updates;
- final result link.

Progress percentage is prohibited unless denominator and stage meaning are valid.

---

# 14. Bulk actions

Every bulk operation requires a `BulkActionPlan` with:

- frozen selected member identities and expected versions;
- per-item eligibility and blockers;
- grouping/ordering/dependency rules;
- all-or-nothing versus independent-item semantics;
- confirmation summary by consequence class;
- logical command and item identities;
- partial and indeterminate effect behavior;
- recovery/retry rule per item;
- final per-item result.

“Select all” binds the exact eligible population or query snapshot, not an unstable visible page.

One green bulk success cannot hide failed, skipped, blocked, partial or indeterminate items.

---

# 15. Correction and reversal interaction

Correction UI must name the owning correction mode, such as:

- non-economic amendment;
- reverse-and-replace;
- forward adjustment;
- source/physical reversal;
- reclassification;
- integration-only correction;
- evidence correction/retraction;
- report restatement.

It must show:

- original identity/version/effect;
- proposed correcting relation;
- effective and recorded timing;
- preserved history;
- downstream/report/publication impact;
- what is not automatically reversed.

Generic “edit” is prohibited for immutable/effect-bearing history.

---

# 16. Hidden action prohibitions

No state-changing operation may be triggered solely by:

- opening/closing a page;
- changing a filter/sort/tab;
- drag/drop without explicit command preview;
- leaving a field/page;
- auto-save of an authoritative state;
- clicking a metric/report value;
- acknowledging a warning;
- chat suggestion acceptance with no operation review;
- keyboard shortcut with no consequence disclosure;
- importing a file without staged validation/proposal/command;
- viewing/downloading evidence.

Draft auto-save is permitted only as non-authoritative proposal state with clear status.

---

# 17. Activation tests

The contract passes only if:

1. every action has one class and OperationKey;
2. navigation/local presentation cannot mutate truth;
3. preview binds material context/version;
4. confirmation is operation-specific;
5. authority/evidence/guards cannot be waived;
6. accepted versus effect established is visible;
7. outcome envelope supports partial/unknown;
8. stale preview rejects/re-previews;
9. retry/result lookup is safe;
10. async progress is honest and accessible;
11. bulk member set and per-item results are exact;
12. immutable history uses correction modes, not edit;
13. no hidden commands exist;
14. conventional equivalent exists without chat;
15. product code remains locked.

---

# 18. Candidate ADR-0038

> Adopt explicit operation interaction and typed outcome semantics: every state-changing affordance maps to one registered bounded operation; preview binds exact target, authority, evidence, guards and consequences; confirmation cannot waive guards; acceptance is distinct from effect establishment; and retry, bulk, async, correction, partial and indeterminate outcomes preserve stable identities and safe recovery.

No ADR status change yet.