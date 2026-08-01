# P1.9 — Integrated User Experience & Interaction Candidate v0.2

**Date:** 2026-08-01  
**Status:** REMEDIATED CONTROLLING CANDIDATE / INTERNAL RECHECK PENDING  
**Supersedes:** v0.1 where conflicting  
**Product code:** LOCKED

---

# 1. Governing thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use or correction meaning.**

No UI, queue, portal, document view, dashboard, export or chat surface is a business-truth writer.

---

# 2. Closed interaction grammar

Every affordance is exactly QUERY, PROPOSAL, COMMAND, ASYNC_OPERATION, NAVIGATION or LOCAL_PRESENTATION.

Every command/async affordance binds OperationKey/version, principal/represented principal, tenant/project/ContractingAuthorityContext, exact target/member versions, authority, evidence, guards, consequence, idempotency and recovery.

Navigation, filter, selection, drag/drop, annotation, auto-save and chat wording cannot perform hidden command semantics.

---

# 3. Continuation before transmission

Every effect-bearing submit reserves an immutable `InteractionContinuationAnchor` before the first transmission attempt. It binds the exact logical command, context, target/member set, preview/confirmation, idempotency and recovery authorization.

The user/channel has a durable conventional recovery route before uncertainty can arise.

- proven pre-acceptance failure → resume/retry under same anchor;
- possible acceptance/effect → lookup/reconciliation only;
- changed command context → new preview/logical identity;
- missing anchor is never proof of no effect.

---

# 4. Preview, confirmation and outcome

OperationPreview exposes exact target/population, actor/represented principal, authority/DOA, values/dates/currency, evidence, source freshness, limitations, consequences/non-effects, recipients/publication, reversibility/correction and partial/unknown-effect risk.

High-consequence confirmation is operation-specific, reviewable/correctable, expires on material change and cannot waive blockers.

InteractionOutcomeEnvelope preserves invocation/logical/async identities, acceptance, operational state, effect stage, per-item result, authoritative/publication identities and safe next action.

Accepted is never displayed as effect established.

---

# 5. Bulk execution

Every bulk operation uses exactly one `BulkExecutionPolicy`:

- ATOMIC_DOMAIN_SET;
- INDEPENDENT_ITEMS_CONTINUE;
- INDEPENDENT_ITEMS_STOP_ON_BLOCKING;
- ORDERED_DEPENDENT.

Policy freezes batch/member set, per-item logical/publication identities, dependency graph, preflight, stop/continue, indeterminate behavior, cancellation, correction/compensation limits, confirmation and item-level recovery.

Unknown effect is reconciled per item; no whole-batch resend. Mixed results remain partial/typed mixed outcome.

---

# 6. Work context/navigation

Every view binds tenant, project, ContractingAuthorityContext, principal/represented principal, canonical subject/version/as-of and access scope.

Polycentric links connect requirement, allocation, optional package, tender, response, normalization, recommendation, approval, AwardDecision, optional Commitment, evidence, control, report and operation result.

Tasks/queues/history/saved views are derived and cannot create universal case roots or manual business status.

---

# 7. Approval/irreversible actions

Approval binds exact proposal/version, evidence/limitations, reviewer authority/DOA/delegation, sequence/quorum and typed outcome.

Approval outcome remains distinct from downstream command and established effect. Revised proposal invalidates/re-evaluates prior approval under policy.

ResultRecoveryView and InteractionContinuationAnchor persist high-consequence result lookup through navigation/session loss.

---

# 8. External participation and response validity

Minimum modes remain secure task link and/or email/file response, with governed buyer-on-behalf fallback; optional persistent workspace and structured file round-trip are supported where activated. No supplier network/account prerequisite.

ExternalTaskGrant binds tenant-private relationship, exact contact/mailbox/team, task/version, permitted operations, confidentiality, assurance, transfer, due/expiry, revocation and occurrences.

Forwarding never transfers authority. Shared-mailbox limitations remain visible.

Every event version binds `ExternalSubmissionAcceptancePolicy` covering channel, relationship/contact/organization assurance, terms/addenda, mandatory content, due/late rules, buyer capture and confirmation.

Every response has one disposition:

- CAPTURED_EVIDENCE_ONLY;
- PROVISIONAL_PENDING_CONFIRMATION;
- VALID_SOURCE_SUBMISSION;
- REJECTED_INVALID;
- WITHDRAWN;
- SUPERSEDED_BY_REVISION;
- LATE_ACCEPTED_WITH_LIMITATION;
- QUARANTINED_UNCORRELATED_OR_UNTRUSTED.

Only valid/explicit late-accepted responses enter the governed response population.

---

# 9. Revisions/addenda/offline files

Source revisions never overwrite. Material buyer change creates a new event/member version and explicit prior-response treatment. Stale templates/imports are blocked or remapped only as proposals with differences. Structured import remains upload → identity/version check → parse proposal → row validation → review → submit command → receipt.

---

# 10. Evidence/communication

Source, capture, normalized, evaluation, supplier-confirmed, issued, external reference, annotation, correction/retraction and disposition/redaction layers remain distinct.

Upload is untrusted capture. Issued artifact/member set is immutable. Issue, dispatch, provider acceptance, delivery, read, acknowledgment, content response and domain effect remain distinct. Restricted/disposed evidence cannot appear absent.

---

# 11. Load-bearing disclosure

Every load-bearing result carries `LoadBearingDisclosureBundle` and a `SurfaceDisclosureProfile`.

Placement classes:

- INLINE_MANDATORY;
- ADJACENT_MANDATORY;
- EXPANDABLE_MANDATORY with inline consequence;
- DETAIL_AVAILABLE;
- PROHIBITED_ON_SURFACE.

Inline where applicable:

- value-state label;
- “not total”/range meaning;
- prohibited/blocked/limited use consequence;
- current reliance block;
- material stale/mixed-time/indeterminate/non-comparable consequence;
- exact actual/status family where ambiguous;
- target/member summary and represented principal for consequential actions.

Tooltip, badge-only, color, hover or secondary page cannot satisfy inline/adjacent disclosure.

`DisclosureParityManifest` proves governed export/copy/chat retains all mandatory human and machine semantics. A surface unable to preserve them is prohibited.

---

# 12. Historical report/reliance

Current, as-of, issued, recalculated, restated, superseded and withdrawn remain distinct.

Historical load-bearing reuse requires SubsequentRelianceAssessment. Calls to approve/award/issue bind exact result/snapshot/version and are unavailable when result/report/reliance use is blocked.

---

# 13. Queues/errors/recovery

Control observations preserve source predicate; acknowledgment/assignment/snooze do not resolve it. Accepted variance does not mean resolved/compliant/no-effect.

Errors are typed. Retry is offered only under a known safe recovery mode. Effect-indeterminate actions permit lookup/reconciliation/manual/block only.

Offline/manual/file fallback preserves task/version, source/channel/time, evidence, attribution, validation/proposal/command, idempotency and limitation.

---

# 14. Accessibility/mobile/localization

Keyboard, programmatic role/state/value, focus/error association, non-color-only meaning, accessible status/progress, consequential review/correction, responsive disclosure and mobile fallback are binding.

Task surfaces declare FULL_MOBILE_TASK, SAFE_MOBILE_REVIEW_AND_ACTION, MOBILE_READ_DECLINE_HELP_ONLY or DESKTOP_REQUIRED_WITH_EXPLICIT_FALLBACK.

Locale never changes semantic value. Arabic/RTL uses structural direction, logical relationships, mixed-script safety and bidirectional-safe export. Localized labels bind canonical semantic keys and cannot collapse distinct outcomes.

---

# 15. Contact transfer/copy/security

Grant transfer/reissue records old/new contacts, approval, effective revocation and notification occurrences; delivery/read is not transfer authority.

Sensitive surfaces declare copy/export policy. Copy prevention is not promised as perfect security. Untrusted external content never supplies commands or agent instructions.

---

# 16. Conventional UI/chat coexistence

All A0–A3 tasks/reports/recovery remain complete without chat. Every chat-supported action has conventional equivalent and uses the same OperationRegistry, preview, confirmation, continuation anchor, outcome and disclosure parity.

Session memory, old reports and inference are not authority. Ambiguous references require exact resolution or abstention. P1.10 owns reasoning/autonomy.

---

# 17. A0–A3 activation

Complete conventional flow works without named connector, persistent supplier account/network, chat, AI, warehouse or P07. Manual/file paths preserve the same identity/evidence/operation semantics.

---

# 18. Candidate ADRs

- ADR-0016 — bounded hybrid external participation;
- ADR-0038 — operation interaction, continuation, bulk and typed outcome;
- ADR-0039 — work context/navigation/no second root;
- ADR-0040 — load-bearing disclosure/history/reliance parity;
- ADR-0041 — typed recovery/accessibility/localization/conventional-chat coexistence.

All remain proposed pending Claude PASS.

---

# 19. Scope guard

No frontend framework, page/form builder, BPM, CDE, collaboration suite, supplier marketplace/network, GRC/case system, BI builder, AI subsystem or product code is selected or authorized.

P07 remains sole XL.