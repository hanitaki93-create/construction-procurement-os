# P1.10 — Integrated Nonfunctional & AI-Readiness Candidate v0.1

**Date:** 2026-08-01  
**Status:** INTEGRATED CANDIDATE / INTERNAL HOSTILE AUDIT PENDING  
**P1.11 / product code:** LOCKED

---

# 1. Governing thesis

> **Nonfunctional requirements are testable product contracts, and AI is an optional, replaceable proposal-and-orchestration layer over the frozen deterministic system—not a new truth, authority or dependency.**

---

# 2. NFR definition

Every accepted NFR binds stable identity/version, risk/purpose, service/capability/data class, reference workload, exact SLI/formula, threshold/percentile, window, inclusions/exclusions, measurement source, test/evidence, degradation/fallback, review/change lineage and telemetry access/residency.

Unverified targets remain labelled targets, not achieved claims.

---

# 3. Workload and performance

Finite V1 pilot and standard verification profiles bind tenants, sessions, projects, users, supplier relationships, line/event/evidence volumes, command/read/submission rates and concurrency.

Interactive reads target P95 1.5 s/P99 4 s; previews P95 3 s/P99 8 s; durable command acceptance P95 1.5 s/P99 4 s; external task landing P95 3 s; common report P95 5 s; imports/exports/file processing have explicit size/row/time targets.

Acknowledgement is distinct from effect completion. Saturation must produce typed backpressure, not lost acknowledgement, duplicate effect, cross-tenant leak or silent truncation.

---

# 4. Availability, durability and continuity

Core deterministic and external task capabilities target 99.90% monthly; reporting/search 99.50%; optional AI 99.00% when active.

Acknowledged authoritative/evidence/issued/idempotency records have semantic RPO 0: success cannot precede the declared durable boundary. Operational effect-position RPO ≤1 minute. Core RTO ≤4 hours; evidence/reporting ≤8 hours; search ≤24 hours; AI may remain disabled.

Daily backup integrity, monthly sampled restore, quarterly end-to-end restore and annual disaster exercise are mandatory.

Error budget never covers unauthorized access/effect, cross-tenant leak, acknowledged data loss, duplicate commercial effect, hidden uncertainty or fabricated AI source.

---

# 5. Reliability and degradation

Dependency profiles bind timeout, safe retry, max attempts/window, backoff, circuit, queue priority/age, dead-letter/reconciliation, idempotency retention and visibility.

Unknown effect never ordinary-retries. Continuation/idempotency remains ≥90 days after terminal and unresolved/issued identities follow governing retention.

Degradation protects tenant/security, durability/effect safety, evidence/submission attempt, result lookup and core reads before reporting/search/import/export/connectors/AI.

---

# 6. Observability and operational evidence

Domain/integration/external/transport/audit/log/trace/metric/incident/AI records remain distinct.

Metrics/traces/logs use versioned semantic naming and correlation but telemetry never establishes business truth.

Sensitive business/evidence/personal/prompt content is prohibited in general telemetry. Restricted diagnostic capture is purpose/tenant/access bounded and defaults ≤30 days.

Incident severity/response, telemetry retention and customer update targets are measurable.

---

# 7. Security, privacy, residency and lifecycle

Security outcomes are informed by NIST CSF 2.0 and final SSDF guidance without certification claims.

MFA, session/revocation, encryption, secret/key lifecycle, vulnerability-remediation, dependency/release provenance, incident and provider/subprocessor targets are explicit.

Data lifecycle covers primary data, evidence, backups, logs, analytics, search, exports, prompts, outputs, embeddings, retrieval, memory and evaluation. Controlled redaction/tombstoning preserves identity/commercial meaning and reapplies on restore.

Residency explicitly classifies backup/telemetry/search/AI/provider paths. No localization claim without evidence.

---

# 8. Files, imports, exports and quotas

Files use registered classes, size/count/page/pixel/row limits, bounded archive depth/expansion, isolated malware/parser pipeline and explicit untrusted states.

Imports remain proposal/preview/command. Unknown columns are evidence/unmapped proposals. Exports bind exact source cut/count/manifest/checksum/completeness; no silent truncation.

Quota/rate responses state acceptance/effect/continuation/reset/fallback. Per-tenant fairness and deadline attempt preservation are mandatory.

---

# 9. Deployment and conformance

Deployment profiles preserve a mandatory deterministic core and optional email/connectors/P07/AI activations.

Release identity binds code/build provenance, schemas/config/operation/metric/field/provider versions, compatibility, security/dependency evidence, rollout and rollback.

Optional capabilities can be disabled without history rewrite. In-flight operations retain original bindings. Conformance changes future eligibility/confidence, not historical truth.

---

# 10. AI run and proposal grammar

Every capability/run/output binds exact capability, model/provider, prompt/instruction, tools, retrieval, input-context/source-cut, citations, uncertainty, review and evaluation identities.

Closed output classes include extraction, normalization, classification, linkage, draft, summary, anomaly hypothesis, recommendation, cited answer, operation plan, human-confirmed command request and abstention.

AI output is never authoritative. Proposal cannot self-accept. Load-bearing claims are classified and cited to exact source/version/location.

No universal confidence; each capability defines task-specific calibrated measures and explicit abstention.

---

# 11. Agent authority

Closed ladder:

- L0 disabled;
- L1 read/explain;
- L2 draft/propose;
- L3 recommend bounded action;
- L4 prepare exact command for human confirmation;
- L5 transmit exact already-confirmed command;
- L6 deterministic non-generative system automation only.

No general autonomous commercial agent.

Agent authority is the intersection of capability, principal/context authority, operation exposure, data access, guards, confirmation, security/conformance and resource policy.

No raw DB/event-store/file-system writes, arbitrary HTTP/plugins, shell/code execution, dynamic tools or broad CRUD.

Effect-indeterminate pauses dependent actions and permits lookup/explanation/reconciliation recommendation only.

---

# 12. AI evaluation

Evaluation passes deterministic, offline, adversarial, shadow, pilot, monitored activation and periodic regression stages.

Capability-specific metrics and thresholds cover extraction, mapping, classification, cited answers, drafts, recommendations and command preparation. Critical unauthorized action, prompt-injection protected action, cross-tenant leakage, confirmation bypass and indeterminate resend have zero tolerance.

Corrections do not train shared models by default. No provider training on tenant data. Provider/model changes require re-evaluation and provider-neutral fallback.

---

# 13. AI isolation, retrieval and memory

All prompts, retrieval, embeddings/indexes, caches, memory, tool results, outputs, evaluations and provider files are tenant/project/principal/purpose/residency scoped.

Retrieval applies access before model exposure, binds exact source/version/index/freshness and never treats similarity as identity/truth.

Memory classes are turn, session, user preference, task working, tenant knowledge index and evaluation/correction. Authority/truth memory is prohibited.

External/retrieved/tool content remains untrusted. Safety relies on constrained authority, structured validation and confirmation, not perfect injection detection.

---

# 14. Validation boundary

Contractor/supplier/prototype/thin-slice/P07/NFR/AI/pilot gates are explicit with sample and kill/revise criteria.

Architecture can be declared internally coherent and implementation-ready subject to gates. It cannot be declared commercially or externally validated.

---

# 15. Candidate ADRs

- ADR-0017;
- ADR-0042;
- ADR-0043;
- ADR-0044;
- ADR-0045;
- ADR-0046;
- ADR-0047;
- ADR-0048.

All remain proposed.

---

# 16. Gate claim before hostile audit

G1–G16 are candidate PASS; G17 pending internal and Claude hostile audit.

No P1.1–P1.9 reopening is claimed. P07 remains sole XL. A0–A3 remains AI-off. Product code and P1.11 remain locked.
