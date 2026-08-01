# P1.10 — Control Baseline & Evidence Plan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CONTROL BASELINE  
**P1.10:** ACTIVE / UNLOCKED  
**P1.11 / product code:** LOCKED

---

# 1. Governing rule

> **External standards may inform control coverage and test structure, but they cannot replace product-specific workload, authority, evidence, failure or AI semantics.**

P1.10 converts risks into measurable product contracts. It does not claim certification, legal compliance, production performance or market validation.

---

# 2. Evidence authority

1. frozen P1.1–P1.9 architecture;
2. primary contractor/supplier evidence and transaction artifacts;
3. regulatory/contractual requirements where actually applicable;
4. official standards and public technical guidance;
5. professional practice;
6. internal engineering hypothesis.

Standards are used for control completeness and terminology, not as evidence that the unbuilt product satisfies them.

---

# 3. Official reference families

Targeted evidence may include:

- NIST Cybersecurity Framework 2.0 for Govern/Identify/Protect/Detect/Respond/Recover outcome coverage;
- NIST SP 800-218 SSDF final guidance and final AI community profile for secure development outcomes;
- NIST Privacy Framework/data-processing lifecycle concepts;
- NIST contingency planning guidance for business impact, recovery and test discipline;
- NIST AI RMF 1.0 and NIST AI 600-1 GenAI Profile for governance, measurement and generative-AI risk coverage;
- OWASP Top 10 for LLM Applications 2025 and Agentic Applications guidance for prompt injection, excessive agency, sensitive information and tool misuse;
- OpenTelemetry semantic-convention concepts for consistent operational trace/metric/log naming while preserving business/audit separation;
- W3C WCAG 2.2 AA inherited from P1.9;
- CISA Secure by Design and NIST SSDF practices for secure defaults, vulnerability reduction and supplier/dependency governance.

No framework is adopted wholesale as a product subsystem.

---

# 4. Controlled terminology

- `SLI` — exact measured indicator;
- `SLO` — target over a window;
- `ERROR_BUDGET` — permitted target miss, never permission to violate authority/data-integrity controls;
- `ACKNOWLEDGEMENT_LATENCY` — time to durable acceptance/rejection identity;
- `EFFECT_COMPLETION_LATENCY` — time to established effect or typed terminal/indeterminate stage;
- `RTO` — target time to restore declared service capability;
- `RPO` — maximum acceptable lost data interval for a declared data class;
- `DURABILITY_ACK` — system promise that acknowledged data crossed the declared durable boundary;
- `DEGRADATION_MODE` — explicit reduced-capability behavior;
- `AI_RUN` — one versioned execution over exact input/context;
- `AI_PROPOSAL` — non-authoritative suggested content/mapping/action;
- `ABSTENTION` — explicit unsupported/uncertain result;
- `EVALUATION_SET` — governed examples with purpose, provenance and leakage restrictions;
- `CALIBRATION` — relationship between task-specific score and observed correctness, not generic confidence;
- `AGENT_AUTHORITY_LEVEL` — closed maximum action class, not a personality or prompt setting.

---

# 5. Baseline threats

1. vague nonfunctional promises with no test;
2. average latency hiding tail failure;
3. accepted request shown completed;
4. acknowledged data not durable;
5. backup never restored;
6. unsafe retry during dependency outage;
7. queue/dead-letter work hidden;
8. telemetry leaks tenant/commercial data;
9. logs become business/audit truth;
10. deletion/redaction breaks financial/evidence history;
11. residency bypass through telemetry/model/subprocessor;
12. parser/archive/malware resource exhaustion;
13. silent export truncation;
14. noisy-neighbor and quota denial at tender close;
15. rollout/config/provider change silently changes semantics;
16. AI invents sources, fields, metrics or commands;
17. AI accepts its own proposal;
18. generic confidence suppresses task-specific uncertainty;
19. prompt injection or untrusted tool output causes action;
20. agent gains authority from natural language;
21. cross-tenant retrieval/memory/evaluation contamination;
22. provider retains/trains on tenant data contrary to policy;
23. evaluation leakage/overfit produces false activation;
24. AI/provider outage breaks deterministic work;
25. architecture completion misrepresented as product validation;
26. NFR/security/observability/data/model platform second XL.

---

# 6. Open questions to close in P1.10

- finite V1 reference workload and stress envelope;
- target percentiles/windows/exclusions by operation class;
- availability classes and service-degradation floor;
- acknowledged-durability boundary and RTO/RPO classes;
- restore/DR evidence cadence;
- telemetry access, retention and cardinality constraints;
- vulnerability response targets;
- file/archive/parser limits and supported types;
- quota/rate-limit priority at deadlines;
- deployment/conformance rollback evidence;
- AI run/proposal/output identity;
- closed agent ladder;
- capability-specific evaluation/abstention gates;
- memory/retrieval/provider isolation;
- pilot falsification gates.

---

# 7. Evidence acceptance rules

An external practice becomes binding only when:

- it addresses an identified product risk;
- it is translated into product-specific measurable semantics;
- it preserves frozen upstream architecture;
- it does not assume a technology/vendor;
- its burden fits the V1 profile;
- it has a test/evidence path;
- it does not create a second XL.

A source citation alone does not satisfy an NFR.

---

# 8. NFR evidence schema

Each NFR evidence record must capture:

- NFR key/version;
- risk and affected capability/data class;
- source/standards basis;
- target/threshold/window;
- reference workload;
- measurement/test method;
- evidence artifact;
- owner/review cadence;
- breach/degradation behavior;
- assumption/validation status;
- physical implementation dependencies deferred.

---

# 9. AI evidence schema

Each AI capability record must capture:

- capability and output class;
- intended/non-intended use;
- model/provider independence;
- input/source/authority scope;
- required citations/provenance;
- review/acceptance route;
- task-specific metrics and thresholds;
- abstention/unsupported behavior;
- safety/adversarial tests;
- tenant isolation and provider data-use posture;
- AI-off fallback;
- activation/deactivation/rollback evidence;
- pilot validation status.

---

# 10. Validation debt rule

The architecture may close with explicit market/operational validation debt, but:

- debt must have named owner, test and decision consequence;
- it cannot be relabelled “validated” because internal/Claude review passed;
- unresolved evidence cannot silently widen scope or autonomy;
- failure at pilot/build may narrow or revise capabilities without corrupting deterministic history.

Primary UAE contractor/supplier falsification targets remain mandatory inputs to the final Phase 1 checkpoint and build gates.

---

# 11. Gate into design

This baseline passes because:

- upstream semantics are frozen;
- standards are bounded to evidence, not adopted as platforms;
- threats/open questions are explicit;
- every NFR/AI decision requires measurement and evidence;
- validation debt remains visible;
- product code stays locked.
