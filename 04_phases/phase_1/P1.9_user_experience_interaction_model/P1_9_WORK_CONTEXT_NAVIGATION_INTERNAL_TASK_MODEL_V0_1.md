# P1.9 — Work Context, Navigation and Internal Task Model v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **Navigation connects canonical identities and bounded tasks; it never creates a universal procurement case, duplicate status or second truth owner.**

---

# 2. `WorkContext`

Every task/report/history view resolves:

- tenant;
- legal entity/contracting organization where material;
- project;
- ContractingAuthorityContext;
- principal/represented principal;
- canonical subject identity and subject type;
- current/as-of/version context;
- operation/capability scope;
- access/disclosure scope;
- source cut where reporting;
- return/deep-link context.

Changing context is navigation only. It cannot silently transfer draft, selection, authority, recipient list, command population or evidence binding to a different project/tenant/context.

---

# 3. Polycentric navigation

Valid entry points include:

- requirement/allocation;
- optional package;
- tender/RFQ and bid form;
- supplier response/revision;
- normalization/comparison;
- recommendation/approval;
- AwardDecision;
- external handoff;
- Commitment/component/obligation when P07 active;
- evidence/transmittal/communication occurrence;
- control observation;
- metric/report/snapshot;
- async operation/result/reconciliation.

No single page/object owns end-to-end truth. Cross-links are projections over canonical identities.

---

# 4. Navigation relation types

Every link declares one relation:

- `OWNS` only where frozen domain ownership permits;
- `ALLOCATES_TO`;
- `GROUPED_IN`;
- `SOURCED_BY`;
- `RESPONSE_TO`;
- `NORMALIZES`;
- `EVALUATES`;
- `RECOMMENDS`;
- `DECIDED_BY`;
- `HANDOFF_TO`;
- `COMMITS_AS`;
- `SUPPORTED_BY_EVIDENCE`;
- `COMMUNICATED_BY`;
- `OBSERVED_BY_CONTROL`;
- `PROJECTED_IN_REPORT`;
- `CORRECTS_OR_SUPERSEDES`;
- `RESULT_OF_OPERATION`.

Visual containment does not imply ownership.

---

# 5. Task semantics

A `TaskView` is a projection of work requiring attention. It binds:

- task key/type/version;
- owning domain/operation;
- subject/context;
- why attention is required;
- source predicate/prerequisite;
- permitted actions;
- assignee/owner where configured;
- due/aging/calendar basis;
- authority/evidence requirements;
- status derived from source and operation state;
- current limitation/access state;
- completion criterion;
- history.

Moving, assigning, acknowledging, snoozing or grouping a task cannot change the owning domain state unless a separate bounded command is executed.

---

# 6. Work queues

Queues may group by:

- my eligible actions;
- pending review/approval;
- supplier responses requiring capture/normalization;
- missing prerequisites/evidence;
- due/overdue procurement milestones;
- command conflicts/rejections;
- async/unknown-effect reconciliation;
- report/restatement/reliance attention;
- control observations;
- external invitations/submissions.

Queues expose:

- exact source predicate;
- eligible population and filters;
- as-of time;
- why item appears;
- authority and operation availability;
- count completeness/limitation;
- no implication that absence means no underlying work if access/population is restricted.

---

# 7. Internal A0–A3 task surfaces

## Requirement/allocation/package readiness

Must expose:

- authorized requirement source;
- allocation status and remaining scope;
- optional package grouping;
- evidence/prerequisite gaps;
- no package-as-universal-root implication;
- create/revise proposal versus authoritative allocation command.

## Tender/RFQ preparation

Must expose:

- sourcing route and scope basis;
- exact recipient relationships/contacts;
- issue set/member versions;
- dates/timezone/calendar;
- confidentiality/terms/addenda;
- readiness blockers;
- preview before issue command.

## Supplier response capture

Must expose:

- external source occurrence/channel/principal;
- response/revision identity;
- attachments and source values;
- buyer-on-behalf actor where used;
- validation/import status;
- no normalization overwrite.

## Normalization/comparison

Must preserve four layers:

1. source submission/revision;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

Edits in one layer cannot silently mutate another. Every adjustment has attribution, reason, version and evidence relation.

## Recommendation/approval

Must expose:

- exact candidate basis/version;
- comparison limitations/exclusions;
- recommendation as proposal;
- approval task/outcome;
- DOA/delegation;
- no award/Commitment effect from UI approval alone.

## AwardDecision/handoff

Must expose:

- exact awarded supplier/scope/value/basis;
- approvals and evidence;
- command consequence;
- distinction from Commitment;
- external handoff status/effect uncertainty;
- correction path.

---

# 8. Optional P07 task surfaces

When P07 is inactive, P07 tasks are absent or not applicable without blocking A0–A3.

When active, task surfaces preserve:

- Commitment/component/obligation identities;
- ScopeBasis/ValuationBasis/CapabilityProfile;
- CommercialEffectVector and actual-family distinctions;
- claim/assessment/certification/posting/payment separation;
- correction rather than edit;
- no generic cost ledger/GL UI.

---

# 9. History and activity

History is assembled from authoritative events, operation outcomes, evidence/communication occurrences, configuration/authority versions and report issues.

Required distinctions:

- event/effect time versus recorded time;
- actor versus represented principal;
- proposal versus command versus effect;
- source evidence versus derived note;
- issue/send/delivery/ack;
- correction/supersession;
- operational status versus effect stage.

A friendly activity sentence cannot replace inspectable typed history.

---

# 10. Search and deep links

Search results/deep links bind:

- canonical identity/type;
- tenant/project/context;
- access decision at open time;
- exact version/as-of/snapshot where historical;
- safe snippet that does not leak restricted data;
- destination relationship.

Deep links do not preserve stale authority. A user opening a prior command link must pass current authorization and any subsequent-reliance checks.

---

# 11. Saved views and personalization

Saved filters, columns, ordering and compact layouts are presentation preferences only.

They cannot:

- redefine population/denominator;
- change operation eligibility;
- suppress load-bearing limitations;
- persist unauthorized data;
- create workflow state;
- alter source/time/actual-family defaults without explicit semantic selection.

---

# 12. Cross-context safety

Before changing tenant/project/authority context, the interface must resolve:

- unsaved non-authoritative drafts;
- selected bulk members;
- pending previews/confirmations;
- upload/import operations;
- represented-principal mode;
- sensitive copied/exportable data.

No command may execute after context change using the old hidden context.

---

# 13. Activation tests

1. every view resolves WorkContext;
2. no universal case root exists;
3. visual grouping does not imply ownership;
4. tasks derive from source predicates;
5. queue acknowledgment does not resolve source state;
6. A0–A3 surfaces preserve canonical layers;
7. history preserves operation/effect/evidence distinctions;
8. deep links reauthorize and preserve version context;
9. saved views cannot change semantics;
10. cross-context commands/selections cannot leak;
11. P07 inactive does not block A0–A3;
12. product code remains locked.

---

# 14. Candidate ADR-0039

> Adopt a polycentric WorkContext and task-navigation model: every view binds tenant/project/authority and canonical subject/version context; navigation, queues, saved views and activity projections never own business state; and requirement, package, tender, response, award, Commitment, evidence, control and report identities remain linked without a universal procurement case root.

No ADR status change yet.