# P1.9 — Approval, Irreversible Action and Recovery Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **Approval interaction records an authorized review outcome; only a separate owning-domain command may establish the business effect that the approval permits. High-consequence actions require exact consequence review and recoverable typed outcomes.**

---

# 2. Approval interaction objects

## `ApprovalTaskView`

Binds:

- governed subject/version;
- requested decision type;
- exact proposal/recommendation/evidence basis;
- required authority/DOA stage;
- reviewer principal and represented principal;
- sequence/parallel group/quorum where supported;
- due/expiry/escalation;
- permitted outcomes;
- conflicts/limitations;
- downstream command explicitly not yet established.

## `ApprovalOutcome`

Closed outcome classes:

- `APPROVED`;
- `APPROVED_WITH_EXPLICIT_CONDITIONS`;
- `RETURNED_FOR_REVISION`;
- `INFORMATION_REQUESTED`;
- `REJECTED`;
- `DECLINED_NO_AUTHORITY_OR_CONFLICT`;
- `ABSTAINED`;
- `EXPIRED`;
- `SUPERSEDED`;
- `CANCELLED_BY_OWNING_PROCESS`.

Outcome binds exact subject/proposal version and cannot float to a later changed proposal.

---

# 3. Approval is not effect

The interface must separately show:

1. approval requested;
2. approval task eligible;
3. approval outcome recorded;
4. downstream command eligible;
5. downstream command accepted/rejected;
6. domain effect established/pending/partial/indeterminate/no-effect.

“Approved” cannot be displayed as “awarded,” “committed,” “issued,” “certified,” “paid” or equivalent unless the owning domain effect is separately established.

---

# 4. Authority and represented principal

At decision surface show:

- current acting principal;
- represented principal/on-behalf-of mode;
- role/delegation/DOA basis and effective period;
- value/category/project/legal-entity scope;
- remaining/consumed authority where policy defines it;
- conflicts, separation-of-duty constraints and abstention route;
- expiry and changed-authority behavior.

Delegation is an intersection, never union. Switching represented principal invalidates prior preview and confirmation.

---

# 5. Sequential and parallel review

Interaction must expose:

- required stages/groups;
- completed/pending/blocked/expired members;
- whether order is strict or parallel;
- quorum/consensus rule where supported;
- conditional approval meaning;
- whether later proposal change invalidates prior outcomes;
- no implication that visible reviewer list is the full authorized population when restricted.

The UI cannot infer approval from silence or elapsed time unless a frozen policy explicitly creates a typed expiry/escalation outcome; expiry is not approval.

---

# 6. Return, information request and rejection

These remain distinct:

- return requests a revised proposal/version;
- information request pauses or continues according to policy but does not reject;
- rejection records a negative decision on the exact proposal;
- decline/abstain records inability or conflict without judging the proposal.

Free-text comments cannot substitute for the typed outcome.

A revised proposal requires new review scope as defined by governing policy; old approval cannot silently carry forward.

---

# 7. Conditions and overrides

Conditions must be:

- typed and bounded;
- tied to the exact approval outcome and proposal version;
- testable before downstream command where required;
- not arbitrary hidden workflow logic;
- not direct commercial effects;
- visible to later decision makers.

Override requires an explicit supported operation, authority basis, reason/evidence and consequence. A warning acknowledgment is never an override.

---

# 8. High-consequence confirmation

For award, Commitment, certification, external issue, evidence disposition, authority/access changes or other material operations, final review must show:

- exact target/member set;
- proposal/approval versions;
- actor/represented principal;
- commercial/quantity/date consequences;
- actual/status family where relevant;
- evidence and limitations;
- external recipients/publication intent where applicable;
- correction/reversal path;
- whether effect may become indeterminate;
- no misleading default selection.

Confirmation expires on material change.

---

# 9. Result and recovery view

A high-consequence action always resolves to a persistent `ResultRecoveryView` containing:

- stable invocation/logical command/async identities;
- requested operation and exact context;
- acceptance status;
- effect stage;
- domain/external result identities;
- per-item result for bulk;
- last update and evidence;
- safe next actions;
- result lookup;
- correction/reconciliation path;
- prohibition on unsafe resend while indeterminate.

A transient toast is supplementary only.

---

# 10. Unknown and indeterminate effect

When response is lost or effect cannot be confirmed:

- show `EFFECT_INDETERMINATE`, not failed;
- state the possible effect and exact unknown scope;
- preserve target, recipient/provider, last attempt and correlation identities;
- offer only permitted lookup/reconciliation/manual/block actions;
- prohibit ordinary retry, recipient change, rebinding or conflicting replacement;
- distinguish operational cancellation from proof of no effect;
- escalate/age without converting uncertainty into status truth.

---

# 11. Reversal/correction after approval

Later correction must not mutate approval history.

The interface shows:

- original approved proposal/outcome;
- established domain effect if any;
- reason for correction;
- correcting operation/mode;
- whether new approval is required;
- effective/recorded timing;
- related report/issue/restatement impact;
- unresolved external effect where applicable.

---

# 12. Notification and escalation

Notifications are communication occurrences, not task/domain truth.

They bind:

- task/subject/version;
- recipient/channel;
- due/expiry context;
- safe deep link;
- confidentiality;
- issue/send/delivery/read status where known;
- no sensitive content beyond recipient permission.

A delivered/read reminder does not establish approval or acknowledgment of the underlying business matter.

---

# 13. Accessibility safeguards

Consequential interactions require at least one suitable safeguard:

- reversible within governed period;
- checked with correction opportunity;
- reviewed and confirmed before finalization.

Errors identify the affected field/member and known correction. Status/progress/result changes are programmatically exposed. Focus behavior cannot skip blockers, limitations or confirmation content.

---

# 14. Hostile scenarios

1. approver approves old proposal after revision;
2. delegate acts outside value scope;
3. represented principal changes after preview;
4. parallel approvals partially complete;
5. reviewer silence treated as approval;
6. request-information shown as rejection;
7. free-text “approved subject to” creates arbitrary condition;
8. warning acknowledgment bypasses missing evidence;
9. approval toast says award completed;
10. award command accepted but external effect indeterminate;
11. user double-clicks confirm;
12. result page closed before response;
13. retry under different recipient/provider;
14. old approval reused after correction;
15. bulk approval contains ineligible items;
16. screen reader misses success/error/progress status.

---

# 15. Exit test

Approval/irreversible-action UX passes only when authority, exact proposal/version, consequence, confirmation, downstream command, effect stage and recovery remain distinct and inspectable without UI-owned truth.