# P1.9 — A0–A3 Interaction Golden Thread v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE GOLDEN-THREAD PROOF  
**Scope:** first live tender through AwardDecision and external handoff, no connector/chat/AI/P07 prerequisite

---

# 1. Proof objective

Demonstrate that a conventional user and external supplier can complete A0–A3 while every action preserves authority, evidence, operation, version, result, limitation and recovery meaning.

Assumptions:

- manual/structured-file channels available;
- no named ERP/CDE/email connector required;
- no supplier persistent account/network required;
- no chat/AI required;
- P07 inactive;
- product code not started.

---

# 2. Actors

- `Requestor/Engineer` — provides authorized requirement source;
- `Procurement User` — prepares sourcing;
- `Procurement Approver` — recommendation/award authority under DOA;
- `Supplier Contact` — external task principal;
- `Buyer Capture User` — captures external response where needed;
- `Commercial/Reviewer` — optional evaluation reviewer;
- `System Bounded Automation` — reminders/derived controls only.

Every step uses current tenant/project/ContractingAuthorityContext.

---

# 3. Step A0.1 — requirement capture

1. User opens project WorkContext.
2. Chooses `Create Requirement Proposal`, not generic save-as-truth.
3. Uploads/links source evidence; upload remains untrusted capture.
4. Enters proposed structured lines with source location/uncertainty.
5. Prevalidation identifies missing unit/spec/required date.
6. User corrects or records explicit unknown where permitted.
7. `Establish Requirement` command preview shows exact lines, source versions, actor, scope and consequences.
8. Current authority/version checked.
9. Command result distinguishes accepted from domain effect established.
10. Requirement identity/history created.

Failure paths:

- source upload interrupted → resume/restart; prerequisite not satisfied;
- stale project/context → re-preview;
- missing authority → no hidden bypass;
- duplicate submit → original result returned.

---

# 4. Step A0.2 — allocation/package readiness

1. Requirement view shows remaining scope and optional package grouping.
2. User creates allocation/package proposals.
3. Package is visibly grouping, not ownership root.
4. Readiness view exposes missing evidence, dates, category/route and unresolved scope.
5. Allocation command binds exact requirement quantities and contribution identity.
6. Bulk action freezes exact member set and per-line eligibility.
7. Partial failure displays per-item result; successful lines do not hide blocked lines.

Failure path:

- requirement corrected during preview → version conflict and re-preview, no silent changed population.

---

# 5. Step A1.1 — tender/RFQ preparation

1. User opens sourcing task from allocation/package or tender list.
2. Creates non-authoritative tender draft.
3. Defines bid forms/lines, dates/timezone, terms, confidentiality and required attachments.
4. Adds tenant-private supplier relationships and exact contacts.
5. Recipient view shows missing/invalid contacts and no cross-tenant network dependency.
6. Evidence/member set preview distinguishes draft documents from exact issue set.
7. Readiness checks approvals/prerequisites/recipient isolation.
8. Issue command preview shows recipients, artifact/member versions, due time, channel/fallback and non-effects.
9. User reviews and confirms.
10. Issue command establishes owning-domain issue intent/artifact as defined; communication dispatch remains separate.

Failure paths:

- contact changes after preview → re-preview;
- one recipient blocked → per-recipient plan, no hidden omission;
- manual issue selected → exact export/artifact/recipient record created without pretending delivery.

---

# 6. Step A1.2 — external invitation

1. Supplier receives secure task link or email/file invitation.
2. Landing shows buyer, task, due time, document/addendum version, confidentiality and support.
3. Link opening is not acknowledgment.
4. Supplier records intent to participate, decline or no action.
5. Secure grant permits only exact task/version.
6. Forwarding to another contact does not transfer access; transfer/reissue route is shown.
7. Optional account is offered only as convenience, never prerequisite.

Failure paths:

- OTP expired → obtain new OTP without changing grant;
- recipient left company → revoke/reissue; prior events retained;
- shared mailbox → acting person/attribution limitation captured.

---

# 7. Step A2.1 — supplier response

Structured path:

1. Supplier reviews exact event/member version and terms/addenda.
2. Enters lines/comments/exclusions/attachments; draft save is non-authoritative.
3. Validation identifies missing/format/range issues.
4. Supplier reviews exact response and confirms submission.
5. Receipt shows submission/revision identity, task version, time, attachments and acceptance-for-buyer-review only.

Email/file path:

1. Supplier replies to bound invitation with files/comments.
2. Message/evidence occurrence captured with sender/channel/time and attribution limitations.
3. Response becomes external source submission only under accepted inbound/capture policy.
4. Mandatory structured fields remain missing/unknown until buyer capture/validation.

Buyer-on-behalf path:

1. Authorized user opens `Capture External Submission` proposal.
2. Links exact email/physical/source evidence.
3. Transcribes values with differences/uncertainty visible.
4. Internal actor and external source/contact remain separate.
5. Bounded command establishes captured source submission, not supplier impersonation.

---

# 8. Step A2.2 — addendum and revision

1. Buyer changes material scope/document/form/date.
2. New issue/addendum/member version created.
3. Supplier notified; prior response status explicitly remains valid, requires acknowledgment, becomes stale/draft or requires resubmission according to policy.
4. Old offline template import is blocked.
5. Supplier reviews changes and submits new revision.
6. Original response remains inspectable; revision relation explicit.
7. Latest accepted response is projected under event rules.

Failure path:

- supplier submits against old version by email → captured as late/legacy evidence with limitation, not silently merged.

---

# 9. Step A2.3 — normalization/comparison

1. Buyer opens response list with completeness and access disclosure.
2. For each supplier, source response/revision is immutable.
3. Normalized representation is created as proposal with extraction/transcription provenance.
4. Missing/ambiguous values remain explicit.
5. Buyer evaluation adjustments carry actor/reason/evidence/version.
6. Supplier-confirmed contractable basis remains separate.
7. Comparison shows inclusions/exclusions/alternatives and source/evaluation differences.
8. Restricted competing bids are isolated from suppliers.
9. No AI needed; future AI may propose only.

Failure paths:

- normalization edit attempts source overwrite → prohibited;
- first page incomplete → no “all bids” claim;
- malformed/malicious file → quarantined with evidence preserved.

---

# 10. Step A3.1 — recommendation

1. User selects candidate basis from exact comparison version.
2. Creates recommendation proposal with rationale and limitations.
3. Recommendation view states it is not approval or award.
4. Report/metric values preserve subset/range/quality/time/actual semantics.
5. If source population/decision use is blocked, approval action unavailable with reason.
6. Recommendation revision invalidates bound approval tasks according to policy.

Failure path:

- user exports comparison and edits offline → working copy only; re-entry through proposal/import.

---

# 11. Step A3.2 — approval/DOA

1. Approval task shows exact recommendation/proposal version, values, evidence and limitations.
2. Reviewer sees own/represented principal and DOA scope.
3. Reviewer chooses approve, conditional approve, return, information request, reject, decline or abstain.
4. Outcome is recorded against exact version.
5. Approval does not establish AwardDecision.
6. Changed proposal requires re-review.

Failure paths:

- delegate out of scope → authorization denial;
- old approval deep link → current authorization/version check;
- parallel approvals incomplete → no completed implication.

---

# 12. Step A3.3 — AwardDecision

1. Authorized user initiates `Establish AwardDecision` command.
2. Preview binds supplier, scope, value/basis, recommendation, approvals, evidence, limitations and explicit non-Commitment meaning.
3. Consequential confirmation permits correction before submit.
4. Command acceptance and domain effect shown separately.
5. AwardDecision result links exact event/history.
6. P07 inactive: external handoff follows; no Commitment is fabricated.

Failure paths:

- double submit → idempotent original result;
- changed comparison/approval → version conflict;
- effect response lost → result lookup, not blind retry.

---

# 13. Step A3.4 — external handoff

1. User prepares exact handoff artifact/message/structured file.
2. Preview shows target/recipient/member versions and authority.
3. Publication/dispatch uses manual or activated channel.
4. Issue, provider acceptance, delivery, acknowledgment and external/domain effect remain separate.
5. Timeout after possible send → `EFFECT_INDETERMINATE`; resend blocked pending reconciliation.
6. Manual handoff records exact artifact, recipient, channel and occurrence without claiming delivery.

---

# 14. Reporting/control/history

Throughout the thread:

- task queues derive from source predicates;
- acknowledgment does not resolve them;
- reports preserve declared population and source cut;
- subset/range/restricted/stale states cannot appear as ordinary totals;
- issued snapshots remain distinct from current values;
- old report requires SubsequentRelianceAssessment for new load-bearing use;
- activity history preserves proposal/command/effect/evidence/communication identities.

---

# 15. No-connector/no-account/no-chat proof

The complete thread can run with:

- manually captured requirements/evidence;
- structured local files;
- manually prepared exact issue artifacts;
- email/file or secure task link supplier response;
- buyer-on-behalf capture;
- conventional internal task surfaces;
- manual external handoff;
- no ERP/CDE/email API connector;
- no persistent supplier account;
- no supplier network;
- no chat/AI;
- no P07.

Unsupported external accounting/payment information remains not applicable/unsupported/unavailable, never zero.

---

# 16. Golden-thread verdict

`PASS CANDIDATE — A0–A3 interaction is semantically executable without connector, supplier network, chat, AI or P07. Internal hostile audit must still attack hidden command, grant transfer, limitation parity, batch/unknown-effect recovery and accessibility seams.`