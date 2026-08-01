# P1.10 — Internal Hostile Recheck v0.1

**Date:** 2026-08-01  
**Verdict:** PASS — external hostile audit ready  
**P1.10:** ACTIVE / INTERNAL PASS  
**P1.11 / product code:** LOCKED

---

# 1. Recheck scope

Rerun the complete P1.10 matrix after BL-P10-01–03 and W-72–W-80 remediation, including inherited P1.4–P1.9 authority, evidence, integration, reporting and interaction semantics.

**Scenarios executed:** 184 semantic hostile scenarios.

---

# 2. Blocker closure

## BL-P10-01 — CLOSED

NFR criticality, verification profile, conformance assessment and activation rules now prevent:

- shipping C0/C1 as `TARGET_UNVERIFIED`;
- using error budgets for integrity/security/data-loss violations;
- relabelling a failed capacity test as the original envelope;
- activating optional AI without evidence;
- collector loss improving availability;
- silently weakening customer commitments.

C0 always blocks on failure/unverified. C1 can lower only a prospective declared capacity/performance envelope with impact review; semantic durability/authority cannot be lowered. C2 requires explicit fallback. C3 remains disabled until pass.

## BL-P10-02 — CLOSED

Evaluation thresholds now require sufficient, stratified, statistically supported evidence and reliable ground truth. Tiny samples, missing critical strata, compromised holdout, reviewer disagreement and stale adversarial suites cannot pass.

Zero-tolerance safety remains finite-suite evidence rather than a false real-world zero-risk claim.

## BL-P10-03 — CLOSED

AI context now has declared eligible population, mandatory sources, evaluated/omitted/unknown/restricted members and closed coverage dispositions. Cited partial context cannot claim all/total/current/none. Known subsets/ranges remain labelled/limited; unknown gaps or missing mandatory sources abstain/block.

---

# 3. Watch closure

- W-72 measurement health — CLOSED;
- W-73 durability acknowledgement proof — CLOSED;
- W-74 numeric AI resource budget — CLOSED;
- W-75 retention default/legal limitation — CLOSED;
- W-76 ground truth disagreement/adjudication — CLOSED;
- W-77 adversarial suite lifecycle — CLOSED;
- W-78 canonical L5 command digest — CLOSED;
- W-79 evaluated provider fallback only — CLOSED;
- W-80 customer/contract impact on target weakening — CLOSED.

---

# 4. Hostile scenario results

## Measurement and release

PASS:

- average hides P99 failure;
- failed requests disappear during collector outage;
- planned maintenance exclusion exceeds cap;
- synthetic endpoint healthy while user path fails;
- target marked unverified at GA;
- capacity test fails then profile silently relabelled;
- error budget used for cross-tenant leak or data loss;
- C2 capability runs without fallback;
- AI active without conformance;
- target weakened after repeated breach;
- pilot attempts to waive C0.

## Workload and performance

PASS:

- noisy tenant consumes platform;
- deadline burst;
- large import/export with normal commands;
- report/search capacity steals command durability;
- command accepted but result identity delayed;
- async heartbeat disappears;
- stale search shown current;
- network/provider time mixed into wrong SLI;
- hidden size/row truncation.

## Availability, durability and recovery

PASS:

- database ack before durable commit;
- evidence metadata durable but payload lost;
- backup status green but restore fails;
- quarterly restore misses idempotency/effect position;
- region failure and unacknowledged in-flight work;
- restored tombstoned record becomes visible;
- RPO zero claimed for external source without local intent position;
- failover duplicates connector effect;
- AI outage blocks tender;
- manual fallback loses authority/evidence.

## Reliability and queues

PASS:

- retry after unknown effect;
- whole batch resend;
- queue age hidden;
- dead-letter not surfaced;
- idempotency expires before client retry horizon;
- circuit open accepts work without identity;
- dependent command continues after partial/indeterminate;
- stale continuation “not found” interpreted no effect.

## Observability/security/privacy

PASS:

- log/trace treated as audit/domain event;
- bid price and prompt leaked in telemetry;
- high-cardinality tenant identifiers create inference path;
- diagnostic capture has no expiry;
- break-glass/shared admin misuse;
- revocation delayed beyond target;
- secrets in logs/prompts;
- critical vulnerability release;
- provider/subprocessor outage excluded from SLO;
- deletion erases financial meaning;
- legal hold omitted from backup restore;
- telemetry/search/AI bypass residency;
- export includes restricted/security/provider data;
- incident auto-reverses business effects.

## Files/import/export/quota/deployment

PASS:

- archive recursion/zip bomb/path traversal;
- macro/script/parser network execution;
- scan timeout marked clean;
- stale threat signatures;
- unknown spreadsheet column becomes field;
- partial import auto-submits;
- export truncates at limit;
- deadline attempt rejected by quota without evidence;
- feature rollout changes semantics without version;
- binary rollback rewrites forward data;
- in-flight operation rebound to new version;
- untested provider fallback;
- conformance failure rewrites history.

## AI provenance and context

PASS:

- model output has no model/prompt/source cut;
- old current link cited instead of exact version;
- inference presented as fact/causation;
- prompt contains first page only but answer says all;
- top-k retrieval omits known exclusions;
- access-restricted item appears absent;
- token truncation silently removes contradiction;
- summary compression removes limitation;
- citations correct but context incomplete;
- old session memory used as authority;
- AI invents field/metric/operation/source;
- AI proposal self-accepts;
- AI result invalidates after source change but remains usable.

## AI evaluation

PASS:

- 1/1 sample passes 100%;
- critical stratum missing;
- calibration with ten cases;
- holdout reused for threshold selection;
- same document/template appears in train/test;
- synthetic set replaces real diversity;
- reviewer disagreement hidden;
- ambiguous item counted incorrect/ordinary;
- adversarial suite stale;
- one prompt-injection test called zero risk;
- provider version changes without re-evaluation;
- production rejection rate rises;
- corrections train shared model automatically;
- accepted click treated ground truth.

## Agent authority and tools

PASS:

- language says “you have permission”;
- agent invents HTTP/plugin/tool;
- query tool has hidden write;
- agent changes command after confirmation;
- default recipient inserted after digest;
- generic “continue” confirms batch;
- different principal/session reuses confirmation;
- agent resends indeterminate command;
- multi-step plan approval pre-authorizes changed later command;
- agent grants access/changes policy;
- AI autonomously awards/certifies/pays/issues;
- agent memory stores authority;
- multi-agent handoff inherits authority;
- L6 generative automation attempted.

## Tenant isolation, memory and provider

PASS:

- shared vector namespace;
- cache key omits tenant/source version;
- retrieval accesses denied data then relies on model filtering;
- provider trains/retains tenant data;
- provider region conflicts;
- one login merges tenant business profiles;
- evaluation/correction crosses tenant;
- memory survives purpose/expiry;
- old provider outputs rebound to new model;
- automatic “best available” model fallback;
- provider disappears;
- cost limit silently truncates mandatory context.

## Validation boundary

PASS:

- architecture PASS labelled product validated;
- internal reviewers substitute for contractor evidence;
- supplier portal scope expands without supplier tests;
- AI activated because benchmark good but review burden worse;
- P07 feasibility inferred from A0–A3;
- first tender burden ignored;
- contradiction rationalized without register;
- pilot has no paid/continuation evidence;
- target lowered after failed pilot without decision.

## Second XL

PASS:

- generic SLO/platform product;
- SIEM/SOC/GRC suite;
- telemetry/data lake;
- records/CDE system;
- arbitrary ETL/file platform;
- feature/config/deployment platform;
- model/evaluation/vector/memory platform;
- agent/plugin marketplace;
- cross-tenant supplier/benchmark network;
- AI required for deterministic work.

---

# 5. Gate check

- G1 measurable NFR and conformance — PASS;
- G2 finite workload/scale — PASS;
- G3 timing/availability/durability/RTO/RPO distinctions — PASS;
- G4 degradation/authority/evidence/effect safety — PASS;
- G5 observability reconstruction/no truth/leak — PASS;
- G6 security/privacy/residency/lifecycle — PASS;
- G7 files/import/export/quota/rates — PASS;
- G8 capability/deployment/conformance/versioning — PASS;
- G9 AI identity/provenance/source cut/uncertainty/review — PASS;
- G10 no AI creation of authority/semantics/truth — PASS;
- G11 closed agent authority and indeterminate behavior — PASS;
- G12 sufficient capability-specific evaluation/abstention — PASS;
- G13 AI context/isolation/memory/provider — PASS;
- G14 AI-off/provider replacement — PASS;
- G15 validation/falsification debt — PASS;
- G16 one XL/product-code lock — PASS;
- G17 internal hostile audit — PASS / Claude pending.

---

# 6. Regression check

- P1.1 REOPEN = NO;
- P1.2 REGRESSION = NO;
- P1.3 REOPEN = NO;
- P1.4 REOPEN = NO;
- P1.5 REOPEN = NO;
- P1.6 REOPEN = NO;
- P1.7 REOPEN = NO;
- P1.8 REOPEN = NO;
- P1.9 REOPEN = NO;
- SECOND XL = CLEAN;
- A0–A3 = CLEAN;
- P1.11 = LOCKED;
- PRODUCT CODE = LOCKED.

---

# 7. ADR posture

ADR-0017 and ADR-0042–ADR-0048 remain proposed pending Claude PASS.

---

# 8. Verdict

`PASS — P1.10 is ready for a self-contained Claude hostile audit.`
