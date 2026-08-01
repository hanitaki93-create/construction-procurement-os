# P1.9 — User Experience & Interaction Model — Entry Handoff v0.1

**Date:** 2026-08-01  
**Status:** ENTRY HANDOFF / P1.9 ACTIVE CANDIDATE  
**P1.8:** PASS / CLOSED / FROZEN  
**P1.10+:** LOCKED  
**Product code:** LOCKED / NOT STARTED

---

# 1. Entry condition

P1.9 begins only because:

- P1.1–P1.8 are closed/frozen as applicable;
- P1.8 internal and Claude hostile audits passed;
- G1–G16 passed;
- ADR-0033–ADR-0037 are accepted;
- no upstream ADR reopened;
- P07 remains the sole independent XL gravity well;
- A0–A3 remains clean and usable without connectors, chat or AI;
- product code remains locked.

P1.9 owns ADR-0016 — external-party UX priority.

P1.10 continues to own ADR-0017 — broader AI-readiness/reasoning/autonomy.

---

# 2. Objective

Define the deterministic user-experience and interaction model through which internal users, external suppliers/subcontractors, auditors/reviewers and later chat/AI surfaces can understand evidence, perform bounded operations and complete procurement/commercial work without creating:

- a visual or interaction bypass around domain authority;
- a UI-owned business truth;
- ambiguous draft/proposal/command behavior;
- hidden or accidental approval/award/Commitment action;
- visually laundered partial, stale, restricted, range, indeterminate or restated reporting;
- a mandatory supplier portal/network;
- a chat-only product;
- a generic no-code workflow/form builder;
- a second document/CDE, BPM or collaboration-platform gravity well;
- product code before Phase 1 closure.

P1.9 decides **interaction meaning, task structure, disclosure and channel obligations**, not frontend framework, component library, pixels, branding or implementation technology.

---

# 3. Governing thesis

> **The interface may simplify interaction, but it may never simplify away authority, evidence, uncertainty, population, decision-use or correction meaning.**

A good interaction makes the bounded operation and its consequences clear before action.

A convenient interaction cannot:

- merge proposal with command;
- turn navigation state into business state;
- hide required evidence or authority;
- convert warning/limitation into consent;
- make an unavailable or restricted fact look absent;
- make a subset look like a total;
- make a deterministic range look like a point value;
- use chat/session memory as authority;
- make external participation depend on persistent network membership.

---

# 4. Frozen inheritance

P1.9 may not reinterpret:

## P1.4

- tenant/project/ContractingAuthorityContext;
- internal authorization ≠ external grant;
- source access and disclosure boundaries;
- current security/authority checks for every new action;
- no cross-tenant business leakage or learned influence by default.

## P1.5

- polycentric procurement graph;
- AwardDecision ≠ Commitment;
- workflow outcome ≠ domain/commercial state;
- claim ≠ assessment ≠ certification;
- physical/commercial/accounting/cash actual separation;
- history-preserving correction;
- typed bounded operations and guards.

## P1.6

- exact evidence/version/source/reliance identity;
- source/normalized/assessment/issued artifact distinction;
- issue/send/delivery/read/ack/content/domain effect separation;
- evidence correction cannot silently reverse domain truth;
- retention/redaction/disposition and historical limitation.

## P1.7

- QUERY / PROPOSAL / COMMAND / ASYNC_OPERATION;
- execution authority modes;
- one OperationRegistry/common invocation-result meaning;
- idempotency, recovery and unknown-effect handling;
- provider-neutral/manual fallback;
- external content is untrusted data;
- chat/agents use the same registered operations;
- no raw database/event-store mutation.

## P1.8

- metric/projection/report/snapshot/result identities;
- population, subset, range and value-state meanings;
- time/status/actual-family distinctions;
- quality vector, materiality and decision-use assessments;
- report-use composition;
- issue-time versus subsequent-reliance assessment;
- issued/current/restated distinctions;
- restricted population and safe aggregate disclosure;
- target-scope aggregation/comparability;
- supplier/control/report/chat boundaries.

---

# 5. Load-bearing P1.8 presentation inheritance

P1.9 must make these semantic rules operationally unavoidable:

## 5.1 Subset

`PRESENT_EVALUABLE_SUBSET`:

- cannot use the same unqualified total treatment as `PRESENT`;
- must show or make directly available eligible, evaluated and unevaluated population;
- must identify known gap reasons;
- must state it is not the complete declared-population result;
- cannot support prohibited uses through title, layout, export or call to action.

## 5.2 Range

`PRESENT_DETERMINISTIC_RANGE`:

- cannot be replaced by midpoint, average or single headline;
- must retain lower/upper bound semantics and unbounded ends;
- must show which bound a decision policy consumes and why;
- cannot visually imply certainty not present in the semantic result.

## 5.3 Quality/limitation

Material stale, mixed-time, unavailable, restricted, migration/evidence-limited, reconciliation-open, non-comparable, partial or indeterminate conditions:

- cannot be hidden solely in color, icon, tooltip or secondary navigation where the result supports a decision;
- must be present at the same decision surface with understandable consequence;
- cannot be dismissed as if the source condition resolved;
- must remain machine-readable and exportable.

## 5.4 Restricted data

Restricted drill-through or suppressed detail cannot imply:

- no records exist;
- the value is zero;
- the population is complete for the caller;
- the caller may infer hidden values through subtraction/filtering.

## 5.5 Historical reports

The UI must distinguish:

- issued snapshot;
- current live value;
- recalculated result;
- restated/superseding report;
- issue-time use eligibility;
- current subsequent-reliance eligibility;
- current reconstruction/status-check limitation.

These are correctness requirements, not optional visual refinement.

---

# 6. Primary workstreams

## P1.9a — interaction and operation grammar

Define how QUERY, PROPOSAL, COMMAND and ASYNC_OPERATION are represented and initiated.

Must close:

- read versus draft/proposal versus authoritative action;
- preview and consequence summary;
- required authority/evidence/configuration;
- validation/guard failure;
- idempotent repeat/recovery;
- unknown/indeterminate result;
- cancellation/pause semantics;
- correction/reversal/replacement interactions;
- bulk/batch partial results;
- prohibited hidden action.

## P1.9b — navigation and work-context model

Define task/context navigation without creating a universal case root.

Preserve:

- requirement/allocation/package/tender/award/Commitment/evidence/report identities;
- project/tenant/ContractingAuthorityContext;
- multiple valid entry points;
- activity/history/evidence/context without duplicate truth;
- deep links that preserve authorization and version/as-of context.

## P1.9c — internal user task surfaces

Define task-focused internal interaction for:

- requirements/allocation/package readiness;
- RFQ/tender setup and issue;
- supplier response/revision capture;
- normalization/comparison;
- recommendation/approval;
- AwardDecision and handoff;
- P07 commercial tasks when activated;
- evidence/reconciliation/control observations;
- reporting and historical snapshot use.

## P1.9d — approval, authority and irreversible-action UX

Define:

- authority/DOA/delegation visibility;
- represented principal and on-behalf-of clarity;
- command consequence and evidence basis;
- sequential/parallel approval state;
- return/request-information versus reject/decline;
- expiry/escalation/delegation;
- separation of approval outcome from domain command/effect;
- high-risk confirmation without generic click-through consent;
- command rejection and retry/recovery.

## P1.9e — external-party participation model / ADR-0016

Decide the external UX priority and minimum obligation using evidence.

Candidate interaction modes:

- email/guest task flow;
- secure task link;
- buyer-on-behalf capture;
- optional persistent account;
- task-focused external workspace;
- bounded hybrid.

Must preserve:

- tenant-private supplier relationship;
- optional persistent signup;
- no mandatory supplier network;
- source submission/revision identity;
- attachment/evidence provenance;
- confidentiality and bid isolation;
- addendum/acknowledgment/due-date context;
- accessibility/mobile/low-friction obligations;
- explicit unsupported/offline/manual fallback.

Full supplier portal parity is not presumed.

## P1.9f — evidence/document/communication UX

Define:

- source versus normalized versus evaluation versus issued representation;
- exact version/status/authority/source location;
- upload/capture/import and untrusted-content treatment;
- redaction/disposition/restriction visibility;
- transmittal/member/recipient/channel context;
- send/delivery/read/ack/domain-effect distinctions;
- superseded/corrected/retracted evidence presentation;
- historical RelianceBinding and reconstruction limits.

Do not create a CDE/records-management suite.

## P1.9g — reporting, limitation and historical-reliance UX

Implement the load-bearing inheritance in Section 5.

Define:

- current/as-of/known-at/issued/restated selection;
- value-state presentation grammar;
- actual-family selection/comparison;
- population and denominator disclosure;
- quality vector and decision-use consequence;
- report-use blocked/limited/permitted behavior;
- restatement/status-check and subsequent-reliance interaction;
- safe aggregate/restricted drill-through;
- export/issue semantics.

## P1.9h — control observations and work queues

Define useful work queues without a second workflow/GRC/case platform.

Preserve:

- source predicate and derived observation;
- owner/assignment/acknowledgment/escalation;
- accepted variance versus source resolution;
- aging and due context;
- grouped/bulk treatment;
- links to owning task/operation/evidence;
- no manual actual-state writer.

## P1.9i — error, offline, fallback and accessibility

Define:

- validation versus authorization versus conflict versus stale version versus unknown effect;
- safe retry and result lookup;
- offline/manual/file fallback where activated;
- interrupted upload/submission;
- partial batch and resumability;
- keyboard/screen-reader/contrast/responsive obligations at semantic level;
- localization/RTL/timezone/number/currency considerations without choosing exact visual implementation.

## P1.9j — conventional UI and later chat coexistence

Freeze that:

- conventional task/report/search/navigation surfaces remain complete without chat;
- chat is an optional interaction path over the same OperationRegistry;
- every chat action has an inspectable conventional equivalent where product-supported;
- chat cannot hide operation class, evidence, authority, limitations or results;
- no feature may require AI to complete A0–A3;
- P1.10 may add reasoning/orchestration without changing interaction authority.

---

# 7. Core distinctions

P1.9 must preserve:

- view/query ≠ proposal/draft ≠ command;
- command accepted ≠ effect established;
- approval outcome ≠ domain transition automatically;
- selected row ≠ authorized population;
- navigation grouping ≠ business root;
- UI status ≠ domain status;
- work queue ≠ workflow truth;
- note/annotation ≠ evidence correction;
- upload ≠ accepted source fact;
- source submission ≠ normalized representation ≠ buyer adjustment ≠ contractable basis;
- issue ≠ send ≠ delivery ≠ read ≠ acknowledgment ≠ domain effect;
- warning acknowledgment ≠ risk resolution;
- subset ≠ total;
- range ≠ point;
- restricted ≠ absent;
- stale ≠ current;
- issued ≠ current ≠ restated;
- issue-time eligibility ≠ current reliance;
- chat response ≠ authoritative result;
- interface convenience ≠ authority.

---

# 8. External UX evidence obligation

ADR-0016 cannot be accepted only from internal preference or competitor screenshots.

P1.9 must reconcile available supplier-side/contractor evidence for:

- persistent-account tolerance;
- email/link/mobile usage;
- response revision and attachment burden;
- tender/addendum acknowledgment;
- confidentiality concerns;
- support/fallback expectations;
- accessibility/language considerations;
- task depth actually required externally.

Where primary evidence remains insufficient, freeze a low-burden hybrid minimum with explicit evidence debt rather than building portal parity.

---

# 9. Candidate interaction primitives

Evaluate a bounded shared set such as:

- `WorkContext`;
- `TaskView`;
- `OperationAffordance`;
- `OperationPreview`;
- `AuthorityDisclosure`;
- `EvidenceRequirementView`;
- `ValidationResult`;
- `DecisionConsequenceSummary`;
- `AsyncOperationView`;
- `ResultRecoveryView`;
- `ControlObservationView`;
- `MetricResultView`;
- `ReportSnapshotView`;
- `LimitationDisclosure`;
- `VersionHistoryView`;
- `ExternalTaskGrantView`;
- `SubmissionRevisionView`.

These are semantic candidates, not frontend components.

No arbitrary UI/page/form-builder platform.

---

# 10. A0–A3 interaction floor

The first live tender must be operable conventionally without connectors, supplier account/network, chat or AI.

At minimum:

1. create/capture authorized requirement or package scope;
2. review allocation/package readiness and missing evidence;
3. prepare RFQ/tender with recipients, dates, exact issued members and controls;
4. issue manually or through activated channel;
5. capture supplier response/revision manually, via file or selected inbound path;
6. normalize and compare while preserving source/evaluation layers;
7. prepare recommendation;
8. complete approval/DOA process;
9. establish AwardDecision;
10. perform external handoff;
11. review reports/controls/history and exact as-of/source context;
12. recover from validation, interrupted, duplicate or unknown-result conditions.

No advanced AI is required.

---

# 11. One-XL and scope guard

P1.9 must not become:

- generic page/form builder;
- generic BPM/workflow designer;
- collaboration/chat suite;
- full CDE/document-management UI;
- project-management/CPM platform;
- supplier network/marketplace;
- customer-support/ticketing platform;
- generic GRC/case-management suite;
- BI/dashboard builder;
- AI copilot/agent subsystem;
- design-system product independent of the OS.

P07 remains the sole independent XL gravity well.

---

# 12. Required outputs

P1.9 should produce at least:

1. `P1_9_WORKPLAN_V0_1.md`;
2. control baseline and UX evidence plan;
3. interaction/operation grammar contract;
4. navigation/work-context model;
5. internal task-surface contract;
6. approval/authority/irreversible-action UX contract;
7. external-party participation model and ADR-0016 candidate;
8. evidence/document/communication UX contract;
9. reporting/limitation/historical-reliance UX contract;
10. control-observation/work-queue contract;
11. error/recovery/offline/accessibility/localization contract;
12. conventional UI/chat coexistence contract;
13. A0–A3 interaction golden thread;
14. integrated candidate;
15. internal hostile audit/remediation/recheck;
16. self-contained Claude audit packet;
17. final ADR/checkpoint only after dual PASS.

---

# 13. P1.9 closure gates

P1.9 may close only if:

G1 — every state-changing interaction maps to one registered bounded operation with explicit authority, evidence, guards, consequence and result.

G2 — proposal/draft/preview/command/effect remain distinguishable and no hidden action exists.

G3 — navigation/work queues/history cannot become a second business-state owner or universal case root.

G4 — approval/DOA/delegation/on-behalf-of and irreversible actions are clear without letting UI approval write domain truth directly.

G5 — source/normalized/evaluation/issued evidence layers and communication-effect distinctions remain visible and correct.

G6 — subset/range/partial/stale/restricted/mixed-time/evidence/migration/reconciliation/indeterminate limitations cannot be visually laundered.

G7 — issued/current/restated and issue-time/current-reliance distinctions are operationally usable.

G8 — restricted/suppressed data cannot be inferred absent and safe aggregate/drill-through rules hold.

G9 — external-party UX is low-friction, tenant-private, evidence-backed, optional-account and does not create a mandatory supplier network.

G10 — control observations/work queues do not become workflow/domain truth or a generic case/GRC platform.

G11 — error, retry, conflict, stale version, partial batch and unknown-effect recovery are safe and understandable.

G12 — accessibility, responsive/mobile, localization/RTL/timezone/number/currency obligations are specified at semantic level.

G13 — conventional A0–A3 UI is complete without chat, connectors or AI; later chat uses the same operations and exposes the same limitations.

G14 — no second XL; P07 remains sole XL.

G15 — P1.1–P1.8 regression = NO and product code remains locked.

G16 — internal hostile PASS + Claude hostile PASS before closure.

---

# 14. Required hostile scenarios

At minimum test:

1. a draft recommendation button silently awards;
2. approval checkbox directly creates Commitment;
3. delegated user appears as principal with no on-behalf-of disclosure;
4. stale version is edited after another approval/change;
5. double click/retry creates duplicate issue/award;
6. timeout leaves effect unknown but UI shows failed/retry;
7. partial batch is shown wholly successful;
8. work queue status is manually changed and treated as domain actual;
9. user navigates from package to allocation and double-counts scope;
10. source supplier submission is overwritten by normalized value;
11. buyer adjustment appears supplier-confirmed;
12. corrected evidence automatically reverses established business effect;
13. sent email appears delivered/acknowledged/effective;
14. subset value rendered as headline total;
15. deterministic range rendered as midpoint;
16. stale/restricted/indeterminate limitation hidden in tooltip;
17. restricted rows omitted and UI says no records;
18. issued report link opens current values;
19. restated report cannot be distinguished from original;
20. old report reused for current approval without reliance reassessment;
21. supplier must create a global account to submit one bid;
22. reusable authentication leaks another tenant relationship/history;
23. external link exposes another supplier's bid/addendum;
24. supplier submits revision but original disappears;
25. buyer-on-behalf capture loses source attribution;
26. guest link remains active after revocation/expiry;
27. large file/upload interruption loses submission state;
28. user acknowledges overdue observation and source condition disappears;
29. accepted variance visually appears resolved/no-effect;
30. UI requires chat to complete A0–A3;
31. chat hides command/evidence/authority behind natural language;
32. chat says all from partial;
33. offline/manual fallback is impossible without connector;
34. RTL/currency/date presentation changes semantic value;
35. green/red color is the only limitation signal;
36. team attempts generic page/form/BPM/CDE/supplier-network/BI/GRC/copilot scope.

---

# 15. First controlled action

Create:

`P1_9_WORKPLAN_V0_1.md`

before selecting frontend technology, component library, visual design system or AI interaction runtime.

P1.10+ remains locked.

Product code remains locked.
