# P1.9 — Internal Hostile Audit Remediation v0.1

**Date:** 2026-08-01  
**Status:** CONTROLLING REMEDIATION OVER v0.1 CANDIDATE  
**Blocks addressed:** BL-P19-01–BL-P19-04 and W-62–W-67

---

# 1. BL-P19-01 — `InteractionContinuationAnchor`

Before any effect-bearing COMMAND/ASYNC_OPERATION leaves the initiating surface/channel, the interaction must create or reserve an immutable `InteractionContinuationAnchor`.

It binds:

- anchor identity;
- exact OperationKey/version/class;
- LogicalCommandId and client/channel submission identity;
- tenant/project/ContractingAuthorityContext;
- principal/represented principal;
- target/member identities and expected versions;
- preview/confirmation identity and expiry;
- idempotency scope;
- created/recorded time;
- recovery authorization/disclosure policy;
- no secret credential in the visible reference.

Rules:

1. The anchor exists before the first effect-bearing transmission attempt.
2. It is made safely available to the user/channel through a durable conventional route appropriate to the surface: pending-actions list, local secure continuation record synchronized before submit, receipt/reference view, or task-grant status lookup.
3. If transmission is proven not accepted, the same anchor may resume/retry under the same logical identity.
4. If acceptance/effect is possible or unknown, the anchor resolves only to result lookup/reconciliation; it cannot create a new logical command.
5. A changed target/member/recipient/value/version requires a new preview and logical command, related to but not replacing the old anchor.
6. Anchor loss cannot be treated as proof of no effect.
7. Support lookup uses the anchor without exposing restricted context to unauthorized users.

This closes the click-submit/connection-loss-before-response gap.

---

# 2. BL-P19-02 — external submission acceptance

## 2.1 `ExternalSubmissionAcceptancePolicy`

Every external task/event version binds a policy defining:

- eligible response channels;
- required task/event/member version;
- required supplier relationship and contact/organization assurance;
- shared-mailbox/response-team rules;
- named-signatory or organization attestation requirement where applicable;
- terms/NDA/addendum acknowledgments;
- mandatory fields/attachments;
- due/late/withdrawal rules;
- buyer-on-behalf eligibility and required source evidence;
- structured-file version/integrity requirements;
- confirmation/reconfirmation requirement;
- validation versus business-compliance distinction;
- acceptance/disposition authority;
- response-population entry rule.

## 2.2 `ExternalSubmissionDisposition`

Every captured response/revision has exactly one disposition:

- `CAPTURED_EVIDENCE_ONLY` — preserved external content, not a governed tender response;
- `PROVISIONAL_PENDING_CONFIRMATION` — candidate response awaiting specified supplier/buyer confirmation or missing bounded prerequisite;
- `VALID_SOURCE_SUBMISSION` — valid source response under the exact policy/version; may enter the governed response population;
- `REJECTED_INVALID` — captured history retained but invalid under typed reason;
- `WITHDRAWN`;
- `SUPERSEDED_BY_REVISION`;
- `LATE_ACCEPTED_WITH_LIMITATION` where policy explicitly permits;
- `QUARANTINED_UNCORRELATED_OR_UNTRUSTED`.

Only `VALID_SOURCE_SUBMISSION` and explicit `LATE_ACCEPTED_WITH_LIMITATION` under the event policy enter the response population. Provisional/evidence-only content may be reviewed and normalized as proposal/evidence but cannot appear as compliant submitted bid or support award without required transition.

## 2.3 Attribution/assurance

`ExternalActorAssuranceRecord` preserves:

- technical identity/channel assurance;
- asserted human name/role;
- supplier organization/relationship;
- mailbox/team/transfer context;
- named-signatory/attestation evidence;
- limitations;
- buyer-on-behalf actor/source occurrence;
- no claim of organizational authority beyond policy.

Shared mailbox uncertainty is not silently upgraded. Buyer capture cannot choose the disposition without the policy’s bounded acceptance operation.

---

# 3. BL-P19-03 — disclosure placement and parity

## 3.1 `SurfaceDisclosureProfile`

Every surface/use combination binds a versioned profile with placement classes:

- `INLINE_MANDATORY` — visible without interaction beside the value/action;
- `ADJACENT_MANDATORY` — in the same continuously visible decision region;
- `EXPANDABLE_MANDATORY` — may expand, but summary and consequence remain inline;
- `DETAIL_AVAILABLE` — supporting non-material detail;
- `PROHIBITED_ON_SURFACE` — result/action cannot appear because the surface cannot preserve meaning.

## 3.2 Mandatory inline set

For any surface presenting a load-bearing value or decision action, the following are `INLINE_MANDATORY` when applicable:

- value-state label (`PRESENT`, evaluated subset, deterministic range, unavailable/restricted/blocked);
- explicit “not total” or range/non-point meaning;
- prohibited/blocked/limited decision-use consequence;
- current subsequent-reliance block;
- material stale/mixed-time/indeterminate/non-comparable warning when it changes use;
- exact actual/status family where generic label would be ambiguous;
- action target/member-set summary and represented principal for consequential command.

The following may be `ADJACENT_MANDATORY`/`EXPANDABLE_MANDATORY` with inline summary:

- eligible/evaluated/unevaluated counts and gap reasons;
- full quality vector;
- source cut/freshness;
- definition/version/evidence lineage;
- restatement differences.

Tooltips, color, badge-only, hover, secondary page or optional drill cannot satisfy inline/adjacent requirements.

## 3.3 Parity

A `DisclosureParityManifest` accompanies governed export/copy/chat representation and proves:

- every inline mandatory semantic is present in human-readable form;
- machine-readable value state/use/identity metadata is retained;
- no label/title upgrades subset/range/restricted/blocked meaning;
- truncation is explicit;
- unsupported surface is prohibited rather than degraded.

An approve/award/issue call to action cannot coexist with a result whose profile requires inline blocked/prohibited use.

---

# 4. BL-P19-04 — `BulkExecutionPolicy`

Every bulk operation binds exactly one mode:

## `ATOMIC_DOMAIN_SET`

The owning domain accepts/rejects the complete set atomically. External side effects cannot be claimed atomic unless the external operation truly provides that invariant; otherwise this mode is unavailable.

## `INDEPENDENT_ITEMS_CONTINUE`

Each item has its own LogicalCommandId/result/publication identity. Failure/indeterminacy of one does not stop others where no dependency or fairness policy requires it.

## `INDEPENDENT_ITEMS_STOP_ON_BLOCKING`

Items are independent, but a declared blocker/indeterminate condition stops future unstarted items. Completed/attempted items retain individual outcomes.

## `ORDERED_DEPENDENT`

A versioned dependency graph/sequence determines eligibility. Downstream items do not start until prerequisite item stage is positively satisfied.

Policy binds:

- frozen batch/member set and query snapshot;
- per-item operation/logical command/publication identities;
- dependency graph/order;
- shared artifact/recipient/context dependencies;
- preflight eligibility;
- stop/continue condition;
- effect-indeterminate behavior;
- partial-effect aggregate meaning;
- cancellation scope;
- compensation/correction availability and non-atomic limitations;
- confirmation summary by consequence and mode;
- result/recovery view by item;
- new-batch rule after correction/member change.

Unknown effect is never retried by resending the entire batch. Only safe item-level lookup/reconciliation applies. Aggregate “completed” requires every item’s terminal permitted state; mixed results remain `PARTIAL_EFFECT`/typed mixed outcome.

---

# 5. W-62 — localization of controlled terms

Every localized operation/outcome/value-state label binds a canonical semantic key. Distinct keys may not translate to one indistinguishable label without an additional disambiguating qualifier. Canonical identity remains available in audit/help/export. Translation changes display only.

---

# 6. W-63 — contact/grant transfer notifications

Grant transfer/reissue records:

- old/new contact and assurance;
- requester/approver;
- effective time;
- old grant revocation;
- notifications attempted and occurrences;
- acknowledgment where required;
- no assumption that delivery/read creates transfer authority.

Old contact cannot act after effective revocation; historical submissions retain attribution.

---

# 7. W-64 — fallback availability

Each deployment/capability declares supported external/manual/offline modes and support route. Unsupported mode is explicit before issue. No universal SLA is asserted. A task cannot be issued through a channel without a defined failure/fallback/recovery path appropriate to its decision criticality.

---

# 8. W-65 — mobile support declaration

Every task/surface declares:

- `FULL_MOBILE_TASK`;
- `SAFE_MOBILE_REVIEW_AND_ACTION`;
- `MOBILE_READ_DECLINE_HELP_ONLY`;
- `DESKTOP_REQUIRED_WITH_EXPLICIT_FALLBACK`.

Issuing a task to a mobile-likely external recipient requires at least safe view, due/version/limitation understanding, decline/help and fallback. Mobile cannot silently remove load-bearing disclosure.

---

# 9. W-66 — clipboard/copy control

Sensitive surfaces bind copy/export policy:

- unrestricted permitted;
- masked/structured copy;
- copy with confidentiality/identity metadata;
- prohibited;
- audited occurrence where policy requires.

Copy prevention is not perfect security and cannot be promised. Restricted values must not be exposed merely to enable copy controls.

---

# 10. W-67 — reauthentication expiry

If reauthentication/session expires during preview/confirmation:

- no command is submitted;
- non-authoritative draft and preview anchor are preserved under access policy;
- after reauthentication, current authority/target/version/evidence are rechecked;
- changed material context requires new preview/confirmation;
- secrets/tokens are not embedded in draft/recovery references;
- failure does not lose uploaded evidence already safely captured.

---

# 11. Remediation result

- BL-P19-01 CLOSED by pre-transmission continuation anchor.
- BL-P19-02 CLOSED by policy and closed submission disposition.
- BL-P19-03 CLOSED by surface placement and parity manifests.
- BL-P19-04 CLOSED by closed bulk execution modes.
- W-62–W-67 closed as bounded semantic obligations.

The integrated v0.2 candidate and full hostile recheck must incorporate these rules before Claude packaging.