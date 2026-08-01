# P1.9 — Control Queue, Error, Offline, Accessibility and Localization Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **Attention, error and fallback interactions must help users recover without creating a second workflow/state owner, weakening authority/evidence or excluding users through inaccessible or locale-corrupt presentation.**

---

# 2. Control-observation interaction

A `ControlObservationView` binds:

- observation identity/type/version;
- source predicate and owning domain;
- subject/context;
- observed/as-of time;
- severity/materiality/use policy;
- evidence/quality/limitation;
- current predicate truth state;
- owner/assignee/acknowledgment/escalation;
- permitted operations;
- accepted variance relation;
- resolution condition.

Acknowledgment, assignment, snooze, comment or escalation does not clear the source predicate.

Accepted variance means the owning authority accepts a known unresolved condition under explicit consequence; it does not mean false, resolved, compliant or no-effect.

---

# 3. Queue boundary

Queues may support triage, assignment, grouping, bulk acknowledgment and escalation but cannot become:

- generic case/ticket lifecycle;
- domain workflow truth;
- arbitrary custom status board;
- substitute for source correction;
- universal SLA/GRC system.

Queue status is operational and derived. Resolution must come from source predicate change, bounded owning operation or explicit accepted-variance command.

---

# 4. Error taxonomy

Every failure is typed as one or more:

- `INPUT_ERROR`;
- `AUTHORIZATION_ERROR`;
- `DELEGATION_OR_DOA_ERROR`;
- `EVIDENCE_OR_PREREQUISITE_ERROR`;
- `VERSION_OR_CONCURRENCY_CONFLICT`;
- `STATE_OR_SEQUENCE_CONFLICT`;
- `SOURCE_UNAVAILABLE_OR_STALE`;
- `NETWORK_OR_TRANSPORT_ERROR_PRE_ACCEPTANCE`;
- `DUPLICATE_OR_IDEMPOTENCY_RESULT`;
- `ASYNC_OPERATION_BLOCKED`;
- `PARTIAL_BATCH_RESULT`;
- `EFFECT_INDETERMINATE`;
- `UNSUPPORTED_OR_CAPABILITY_DISABLED`;
- `FILE_OR_IMPORT_ERROR`;
- `SECURITY_OR_UNTRUSTED_CONTENT_ERROR`;
- `LOCALIZATION_OR_FORMAT_ERROR`;
- `UNKNOWN_INTERNAL_ERROR_WITH_SAFE_REFERENCE`.

A generic “Something went wrong, try again” is insufficient where retry can duplicate effect or where corrective action is known.

---

# 5. Error disclosure

Expose safely:

- what operation/input/member failed;
- whether request was accepted;
- whether effect may exist;
- affected versus unaffected items;
- stable error/result/reference identity;
- known correction or next safe step;
- whether re-preview/reconfirmation is required;
- current values/version where disclosure is permitted;
- no restricted data leakage.

Field errors remain associated with exact input and include correction suggestions when known.

---

# 6. Recovery modes

Closed recovery choices:

- correct input and resubmit as same/new draft;
- refresh/re-preview against current version;
- result lookup by stable identity;
- idempotent replay returning original result;
- resume interrupted upload/import/async operation;
- retry before acceptance under same identity where safe;
- reconcile effect-indeterminate operation;
- manual/buyer capture fallback;
- export/import structured fallback;
- block/escalate/support with evidence bundle;
- create explicit correction/replacement command.

The interface cannot offer “Retry” without knowing which recovery mode applies.

---

# 7. Offline/manual/file fallback

Fallback preserves the same semantics:

- exact task/operation/version;
- source principal/channel/time;
- evidence/content identity;
- authority and buyer-capture attribution;
- structured validation/proposal/command stages;
- idempotency/result identity;
- limitations and unsupported fields;
- no direct state/balance/status assignment;
- no hidden formula/macro execution.

Fallback is not a second implementation with weaker truth.

---

# 8. Interrupted uploads and drafts

- non-authoritative drafts may auto-save with clear draft state/version;
- upload chunks/resume use stable upload identity;
- final acceptance occurs only after full integrity and validation;
- abandoned upload/draft does not satisfy prerequisite;
- concurrent editing shows conflict and preserves both versions/proposals;
- offline stale template is rejected or explicitly remapped with differences;
- local browser/session data cannot be authoritative history.

---

# 9. Accessibility semantic floor

Every supported conventional/external interaction must be:

- keyboard operable without pointer-only action;
- exposed with programmatic name, role, state, value and relationships;
- usable with a meaningful focus order and focus return after dialogs/errors;
- not dependent solely on color, shape, hover, drag or spatial position;
- accompanied by text alternatives for material icons/graphics;
- able to announce success, error, waiting and progress status without forced context change;
- able to review/correct/confirm or reverse consequential submissions as policy permits;
- able to identify errors and known corrections;
- resilient to zoom/reflow/responsive presentation without removing load-bearing disclosure;
- free of time-only completion where extension/fallback is reasonably required by task semantics.

Exact physical WCAG conformance testing is later NFR work; these obligations cannot be deferred as optional styling.

---

# 10. Mobile/responsive floor

Mobile/compact interaction must still support the complete minimum external task and essential internal urgent review where declared supported.

It cannot remove:

- operation class/consequence;
- authority/represented principal;
- material values/member set;
- limitation/use block;
- version/addendum;
- submission receipt/recovery;
- accessible error/status.

Complex comparison may require larger viewport for full productivity, but safe read/review/decline/request-help/fallback must remain available where the task is issued to mobile users.

---

# 11. Localization and formatting

All load-bearing values bind semantic value separate from display locale.

Presentation must preserve:

- language and locale;
- calendar/timezone and absolute due time;
- decimal/grouping symbols;
- currency code/symbol and amount direction;
- units and conversion basis;
- date ambiguity avoidance;
- numbering policy and identifier integrity;
- translated label versus canonical controlled term;
- original source language and translation provenance;
- no translated free text treated as original evidence.

Locale change cannot change formula, population, value, version or command input.

---

# 12. Arabic/RTL

Arabic support requires:

- correct base direction for page/section;
- logical rather than hardcoded left/right relationships;
- tables/forms/navigation that remain semantically ordered;
- deliberate handling of mixed Arabic/Latin names, emails, identifiers, currencies and numbers;
- source text direction preserved;
- no visual mirroring that reverses chronological, approval or process meaning;
- bidirectional-safe copy/export;
- screen-reader labels matching reading order.

Exact CSS/framework implementation remains open.

---

# 13. Status/progress messages

Status changes include:

- save/validation result;
- upload/import progress;
- submission acceptance;
- async operation progress;
- batch partial result;
- conflict/stale update;
- external effect/reconciliation change.

They must be programmatically determinable and appropriately prioritized. Do not announce every minor update assertively or create unusable noise.

Progress uses exact stage/count where possible. Unknown duration/denominator is shown as indeterminate, not false percentage.

---

# 14. Support/escalation bundle

When support is needed, user can provide a safe bundle containing:

- stable operation/error/result identities;
- time/context/version;
- non-sensitive diagnostic state;
- affected members/counts;
- evidence/attachment references under access policy;
- actions already attempted;
- no secret/token/full restricted payload by default.

Support cannot manually mutate business truth outside bounded operations.

---

# 15. Candidate ADR-0041 contribution

Supports acceptance of safe recovery/accessibility/localization semantics together with conventional/chat coexistence: typed errors and recovery replace generic retry; fallbacks preserve authority/evidence; consequential interactions are reviewable/correctable and accessible; and locale/RTL presentation cannot alter business meaning.

---

# 16. Hostile scenarios

1. generic retry after timeout duplicates issue;
2. field error lacks correction;
3. partial batch shown failed/success only;
4. queue acknowledgment clears overdue status;
5. accepted variance shown resolved;
6. offline Excel bypasses validation;
7. interrupted upload satisfies evidence prerequisite;
8. mobile view hides approval limitation;
9. drag-only reorder triggers command;
10. screen reader misses async completion;
11. Arabic layout swaps amount/description columns;
12. timezone ambiguity causes late bid;
13. comma/decimal parsing changes price;
14. translation treated as original evidence;
15. support agent edits state directly.

---

# 17. Exit test

Pass only if every error and fallback preserves operation/effect safety, every queue remains derived, and accessibility/localization cannot remove or alter load-bearing meaning.