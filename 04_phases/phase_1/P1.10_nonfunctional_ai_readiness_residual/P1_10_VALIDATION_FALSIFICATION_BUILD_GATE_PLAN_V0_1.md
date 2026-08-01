# P1.10 — Validation, Falsification & Build-Gate Plan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE VALIDATION CONTRACT  
**Product code:** LOCKED

---

# 1. Governing rule

> **Architecture review proves internal consistency, not contractor usefulness, supplier adoption, implementation feasibility at target cost or market demand. Those claims require external evidence and build/pilot tests.**

P1.10 and P1.11 must never label the architecture “validated product” solely because internal and Claude audits pass.

---

# 2. Evidence-status classes

Every major product hypothesis is one:

- `ARCHITECTURALLY_PROVEN` — closed semantic consistency only;
- `PRIMARY_CORROBORATED`;
- `PRIMARY_CONTRADICTED`;
- `PRIMARY_UNOBSERVED`;
- `NOT_TESTED`;
- `BUILD_FEASIBILITY_PROVEN`;
- `PILOT_BEHAVIOR_PROVEN`;
- `COMMERCIAL_WILLINGNESS_PROVEN`;
- `REVISE_OR_KILL`.

No class implies another automatically.

---

# 3. Unfired evidence debt carried forward

Mandatory debt includes:

- FT-02;
- FT-06;
- FT-09 / CR-02;
- FT-10;
- supplier-side participation friction and terminology;
- secure-link versus email/file/account tolerance;
- buyer-on-behalf frequency and trust;
- response-form field burden and schema fit;
- addendum/revision behavior;
- mobile/Arabic/RTL use;
- receipt interpretation;
- actual first-tender setup burden;
- commercial-core/P07 operating burden;
- integration/manual fallback acceptability;
- report/limitation comprehension;
- AI capability value versus review burden.

The final master specification must map the exact original evidence IDs and questions.

---

# 4. Pre-build contractor validation gate

Before broad Phase 3 implementation, obtain at minimum:

- 5 independent contractor procurement/commercial participants from at least 3 organizations;
- at least 3 UAE private-sector contractors matching/adjacent to the beachhead;
- at least 1 contractor outside the founder’s prior trade/project pattern;
- at least 2 procurement managers/officers;
- at least 1 commercial/QS/contracts participant;
- at least 1 project/site/technical participant involved in approvals/submittals;
- walkthrough of actual artifacts and one recent tender per organization where permitted.

Test:

- terminology and field grammar;
- A0–A3 sequence/variants;
- DOA/approval/award handoff;
- manual/email/file fallbacks;
- reports/limitations;
- onboarding/data setup;
- P07 boundary expectations;
- integration expectations.

Pass is not unanimous preference. It requires no repeated primary contradiction to a SPINE invariant without controlled architecture response.

---

# 5. Supplier validation gate

Before committing to external experience beyond the bounded minimum, obtain:

- 10 supplier/subcontractor participants;
- at least 5 UAE-based or regularly responding to UAE contractors;
- mix of material supplier, specialist subcontractor and SME/less-digital participant;
- at least 3 mobile-first/shared-mailbox users;
- at least 2 Arabic-preferring users where feasible.

Test real/representative tasks:

- invitation trust and authentication friction;
- account refusal/tolerance;
- attachment/file/structured response;
- registered field comprehension;
- revision/addendum flow;
- receipt meaning;
- colleague/shared-mailbox transfer;
- deadline/support fallback;
- mobile and Arabic/RTL.

Kill/revise signals:

- ≥30% cannot complete first task without live buyer assistance for non-domain reasons;
- repeated interpretation of receipt as compliance/award despite required rendering;
- registered field burden forces widespread narrative/email bypass;
- account/link assurance produces material participation drop without compensating safety need;
- mobile/RTL path changes commercial meaning or blocks common use.

---

# 6. Prototype/no-code interaction test

Before production frontend build, test clickable/functional prototypes for:

- requirement/package readiness;
- tender issue;
- external response/revision;
- comparison four-layer model;
- recommendation/approval/AwardDecision;
- subset/range/limitation rendering;
- lost-response continuation and indeterminate effect;
- registered field/schema version change;
- manual/file fallback.

Participants:

- minimum 8 internal contractor users and 8 external supplier users, with role diversity.

Measures:

- task completion;
- critical error;
- authority/effect misunderstanding;
- source-versus-normalized confusion;
- subset/range/reliance misunderstanding;
- time and assistance;
- accessibility/mobile/RTL blockers.

Critical misunderstanding target = 0 in final verification round for award/Commitment, receipt, effect-indeterminate, subset-total and source-normalized distinctions.

---

# 7. Thin-slice build feasibility gate

Before full system build, implement a narrow deterministic slice:

`requirement/allocation → tender issue → one secure/email supplier response → normalization/comparison → recommendation/approval → AwardDecision → immutable snapshot/report`

Must prove:

- registered operations and idempotency;
- evidence/version/issued artifact;
- external grant/submission disposition;
- field/schema registry;
- source/normalized/evaluation separation;
- approval versus AwardDecision;
- reporting limitation parity;
- manual/file path;
- measurable NFR instrumentation;
- tenant isolation;
- backup/restore of the slice;
- no AI required.

Pass:

- no architecture invention;
- target pilot workload within P1.10 SLOs;
- acknowledged authoritative data survives restore test;
- no critical authority/data/evidence ambiguity;
- implementation effort remains within revised burden budget.

Failure triggers architecture amendment or scope reduction before broad build.

---

# 8. P07 feasibility gate

Because P07 is the sole XL, do not infer feasibility from A0–A3.

Build/test separately:

- one Commitment type;
- one change chain;
- one progress claim/assessment/certification chain;
- retention/advance/variation effects;
- correction/reverse-and-replace/closed-period case;
- external accounting seam/reconciliation;
- exact monetary calculation policy;
- reports across physical/commercial/accounting/cash actual families.

Require independent QS/commercial/accounting review and no duplicate ledger/effect.

If P07 burden threatens the release, A0–A3 must remain independently releasable under the frozen activation model.

---

# 9. NFR verification gate

Before general availability:

- load tests under `V1_PILOT_PROFILE` and then `V1_STANDARD_VERIFICATION_PROFILE` or a formally lowered release envelope;
- failure/dependency/queue/noisy-neighbor tests;
- backup monthly restore and quarterly end-to-end restore evidence;
- RTO/RPO exercise;
- tenant-isolation/security/adversarial test;
- file/archive/malware/parser limit tests;
- export/import completeness tests;
- accessibility verification against WCAG 2.2 AA target;
- Arabic/RTL/timezone/currency tests;
- incident/status/fallback exercise;
- release/rollback/conformance test.

A target not yet proven is labelled target/unverified, not achieved.

---

# 10. AI activation gate

No AI capability is included merely because models are available.

Activation requires:

- deterministic manual task already works;
- capability-specific evaluation set and thresholds;
- adversarial/prompt-injection/isolation tests;
- shadow and pilot evidence;
- review burden lower than or justified by value;
- AI-off and provider-replacement test;
- privacy/residency/provider contract;
- incident/rollback/kill switch;
- no critical safety violation;
- explicit tenant activation where required.

Kill/revise signals:

- critical protected-action or cross-tenant failure;
- review/correction burden exceeds manual task benefit;
- unsupported claim/source error exceeds threshold;
- model/provider cost or latency destroys use case;
- vendor terms conflict with retention/training/residency;
- performance collapses on unseen contractor/supplier artifacts;
- capability requires redefining deterministic entities/operations.

---

# 11. Pilot gate

A meaningful pilot requires:

- at least 2 contractor organizations;
- at least 3 live or parallel-run tenders per organization;
- at least 10 participating suppliers total;
- one manual/no-connector route;
- one activated communication route if available;
- measured onboarding time, completion, correction, support, cycle time and evidence quality;
- no production commercial commitment established solely from experimental AI.

Pilot success candidate:

- first live tender from clean inputs within ≤5 working days;
- ≥80% invited suppliers complete supported participation without buyer transcription unless their chosen channel is buyer capture;
- no critical authority/evidence/data-loss incident;
- no repeated source-normalized or approval-award confusion;
- measurable reduction in at least one high-cost workflow burden without material new burden elsewhere;
- contractor participants state willingness to continue and at least one credible paid/contractual next step.

These are initial hypotheses, not promised market thresholds; results may revise them.

---

# 12. Commercial validation boundary

Architecture cannot prove:

- willingness to pay;
- sales-cycle length;
- implementation partner availability;
- founder delivery capacity;
- investor demand;
- legal suitability for every GCC contract;
- defensibility against incumbents;
- life-changing monetization.

Those require separate commercial experiments and evidence.

---

# 13. Decision register

Every validation exercise produces:

- hypothesis/test ID;
- participant/sample/context;
- artifact/task;
- raw observations and evidence;
- outcome metric;
- corroborated/contradicted/unobserved classification;
- architecture/scope/build consequence;
- owner/date/next gate;
- no silent rationalization of contradiction.

---

# 14. Final rule

P1.10/P1.11 may conclude:

> **The architecture is internally coherent and implementation-ready subject to listed evidence and build gates.**

They may not conclude:

> **The product is externally validated, wanted, feasible at target economics or commercially proven.**
