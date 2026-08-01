# P1.9 — Integrated User Experience & Interaction Candidate v0.1

**Date:** 2026-08-01  
**Status:** INTEGRATED CANDIDATE / INTERNAL HOSTILE AUDIT PENDING  
**P1.9:** ACTIVE  
**P1.10+:** LOCKED  
**Product code:** LOCKED

---

# 1. Governing thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use or correction meaning.**

The interface is a typed projection and operation-request layer. It does not own business truth, approval truth, workflow truth, report truth, supplier identity/network truth or evidence truth.

---

# 2. Interaction grammar

Every affordance is exactly:

- QUERY;
- PROPOSAL;
- COMMAND;
- ASYNC_OPERATION;
- NAVIGATION;
- LOCAL_PRESENTATION.

Navigation, selection, filtering, sorting, drag/drop, auto-save, annotations and chat wording cannot silently become commands.

Every state-changing affordance binds one registered OperationKey, current principal/represented principal, tenant/project/authority context, target/version/member set, authority, evidence, guards, consequence, idempotency and recovery.

---

# 3. Operation sequence and outcome

Consequential interaction preserves:

`intent → context → draft/input → prevalidation → preview → deliberate confirmation → submit → accepted/rejected → effect pending/established/partial/indeterminate/no-effect → recovery/correction`.

`OperationPreview` binds exact target, population, authority, values, evidence, source freshness, consequences, non-effects, external recipients and correction/retry behavior.

`InteractionOutcomeEnvelope` binds invocation/logical-command/async identities, acceptance, operational status, effect stage, per-item results, domain/publication identities and safe next actions.

No single success/failure boolean is sufficient.

---

# 4. Consequential actions

Commands that can award, commit, certify, issue externally, dispose evidence, change authority/access or create bulk effects require operation-specific review/correct/confirm or a governed reversible safeguard.

Confirmation cannot waive authority, evidence, quality or source blockers.

Preview expires on material target, population, authority, evidence, configuration or recipient change.

---

# 5. Work context and navigation

Every view binds tenant, project, ContractingAuthorityContext, principal/represented principal, canonical subject identity/type, version/as-of context and access scope.

Navigation links polycentric requirement, allocation, package, tender, response, normalization, recommendation, approval, AwardDecision, optional Commitment, evidence, control, report and operation identities.

No universal procurement case root exists. Task lists, work queues, cards, saved views and activity feeds are derived projections and cannot own state.

---

# 6. Internal task model

Conventional task surfaces cover:

- requirement/allocation/package readiness;
- tender/RFQ preparation and exact issue preview;
- supplier invitation and response capture;
- source/normalized/evaluation/confirmed comparison layers;
- recommendation proposal;
- approval/DOA;
- AwardDecision and external handoff;
- optional P07 commercial tasks;
- evidence, control, reconciliation, reports and history;
- error/result recovery.

P07 inactive never blocks A0–A3.

---

# 7. Approval and authority

Approval task binds exact proposal/version, evidence, limitations, reviewer authority/DOA/delegation, sequence/quorum and permitted typed outcomes.

Approval outcome is distinct from downstream command and established domain effect.

Typed outcomes include approve, conditional approve, return, information request, reject, decline, abstain, expire, supersede and cancel.

Delegation is intersection. Represented-principal changes invalidate preview/confirmation.

---

# 8. External participation / ADR-0016

Bounded hybrid modes:

- secure task link;
- email/file response;
- buyer-on-behalf capture;
- optional persistent workspace;
- structured file round-trip;
- manual/offline fallback.

`ExternalTaskGrant` binds tenant-private relationship, exact principal/contact/mailbox, task/version, operations, confidentiality, due/expiry, assurance, transfer/team policy, revocation and evidence/communication identities.

Forwarding never silently transfers access. Shared mailbox use carries acting-human/attribution semantics. Buyer-on-behalf preserves external source occurrence and internal capture actor. Revisions never overwrite. Material addenda create new versions and invalidate stale templates/responses according to policy.

No persistent account, supplier network, marketplace or cross-tenant profile is required.

---

# 9. Evidence/document/communication interaction

UI distinguishes source evidence, capture, normalized representation, evaluation adjustment, supplier-confirmed basis, issued artifact, external reference, annotation, correction/retraction and disposition/redaction.

Upload is untrusted capture, not accepted fact or fulfilled prerequisite.

Issued artifact/member set is immutable. Issue, dispatch, provider acceptance, delivery, read, acknowledgment, content response and domain effect remain distinct.

Evidence correction/retraction does not automatically reverse domain truth. Restricted/disposed content cannot appear absent.

---

# 10. Reporting and limitation interaction

Every load-bearing value carries a `LoadBearingDisclosureBundle` through decision, monitoring, compact, detail, issued, export, historical-reliance and conversational surfaces.

It preserves value state, population, subset/range, time, actual family, currency, quality, use, source cut, restriction, indeterminate treatment, issue/restatement and current reliance.

Subset is labelled evaluated subset, never total. Range keeps both bounds; no midpoint. Missing/unavailable/restricted/blocked are not zero/blank. Material limitations appear at the same decision surface, survive exports and block corresponding actions.

Issued/current/recalculated/restated/withdrawn remain distinct. Old reports require current SubsequentRelianceAssessment for new load-bearing use.

---

# 11. Control queues

Control observations retain source predicate, observed time, quality/materiality, assignment/ack/escalation, accepted variance and resolution condition.

Queue operations cannot clear source state. Accepted variance does not mean resolved/compliant/no-effect. No generic case/GRC platform.

---

# 12. Error, retry and recovery

Errors distinguish input, authorization, evidence, version/state conflict, stale/unavailable source, transport pre-acceptance, duplicate/idempotency, async block, partial batch, effect indeterminate, unsupported capability, file/import, security/untrusted and internal reference.

A generic Retry is prohibited unless a specific safe recovery mode applies.

Persistent ResultRecoveryView preserves operation identities, effect stage, item results and safe next steps. Effect-indeterminate actions allow lookup/reconciliation/manual/block only, not ordinary resend.

Bulk actions freeze exact member set, expected versions, per-item eligibility and per-item result.

---

# 13. Accessibility, mobile and localization

Semantic floor:

- keyboard operation;
- programmatic name/role/state/value/relationship;
- meaningful focus and error association;
- no color/hover/drag/spatial-only meaning;
- accessible success/error/waiting/progress;
- review/correct/confirm or reversal safeguard for consequential actions;
- responsive/zoom/reflow without disclosure loss;
- common mobile external task path;
- explicit timezone/date/currency/unit;
- Arabic/RTL structural direction and mixed-script safety;
- translations remain derived, not source evidence.

Exact frontend/WCAG testing technology is later NFR work.

---

# 14. Conventional UI and chat coexistence

All A0–A3 tasks, search, history, reports and recovery are complete without chat.

Future chat uses the same OperationRegistry, authority, preview, confirmation, outcome and disclosure bundle. Every chat-supported action has a conventional equivalent. Session memory, old reports and inference are not authority. Ambiguous “approve it/send to them/all” requires exact resolution or abstention.

P1.10 owns reasoning/autonomy.

---

# 15. A0–A3 proof

The golden thread proves:

`authorized requirement → allocation/package → tender draft/readiness → exact issue → secure/email/manual supplier participation → immutable response/revision → normalized comparison → recommendation → approval → AwardDecision → manual/activated external handoff`.

It works without named connector, persistent account/network, chat, AI, warehouse or P07.

---

# 16. Candidate ADR posture

- ADR-0016 — candidate ACCEPT bounded hybrid external participation;
- ADR-0038 — candidate ACCEPT operation interaction and typed outcome;
- ADR-0039 — candidate ACCEPT work context/navigation/no second root;
- ADR-0040 — candidate ACCEPT load-bearing disclosure/history/reliance interaction;
- ADR-0041 — candidate ACCEPT safe recovery/accessibility/localization/conventional-chat coexistence.

No status changes before external PASS.

---

# 17. Scope exclusions

P1.9 does not choose:

- frontend framework/component library/design system;
- pixels/branding/theme;
- database/cache/search technology;
- dashboard/BI builder;
- generic page/form/workflow builder;
- collaboration suite;
- supplier marketplace/network;
- CDE/records-management suite;
- CPM/GRC/ticketing platform;
- AI model/orchestration/autonomy;
- product code.

---

# 18. Internal hostile-audit targets

Attack:

1. accepted versus effect-established persistence after navigation/session loss;
2. exact external grant recipient/forwarding/shared mailbox/team semantics;
3. load-bearing disclosure survival in compact/export/chat surfaces;
4. bulk mixed eligibility/partial/indeterminate recovery;
5. stale preview/population/recipient change;
6. evidence upload/capture/normalization collapse;
7. approval outcome laundering;
8. restricted absence/inference;
9. addendum/revision/offline template staleness;
10. accessibility/RTL/timezone/number corruption;
11. conventional no-chat/no-account/no-connector floor;
12. second-XL and upstream regression.
