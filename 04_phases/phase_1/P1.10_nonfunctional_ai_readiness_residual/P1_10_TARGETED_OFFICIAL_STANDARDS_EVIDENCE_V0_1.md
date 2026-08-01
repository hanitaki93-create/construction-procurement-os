# P1.10 — Targeted Official Standards Evidence v0.1

**Date:** 2026-08-01  
**Status:** SECONDARY OFFICIAL EVIDENCE / NON-GOVERNING  
**Purpose:** inform control coverage and measurable contract design

---

# 1. Method

Only official standards/project sources were used. Findings support control shape but do not establish compliance, certification, production performance or legal applicability.

---

# 2. NIST Cybersecurity Framework 2.0

Current official CSF 2.0 organizes cybersecurity outcomes around:

- Govern;
- Identify;
- Protect;
- Detect;
- Respond;
- Recover.

P1.10 implication:

- security cannot be reduced to authentication/encryption;
- governance, supplier risk, detection, incident response and recovery need measurable evidence;
- the framework remains an outcome map, not a product security subsystem;
- exact controls and implementation technology remain later physical work.

---

# 3. NIST Secure Software Development Framework

NIST SP 800-218 v1.1 is the current final general SSDF. NIST has also finalized SP 800-218A for generative-AI and dual-use foundation-model development; a broader v1.2 revision was still draft as of the evidence review.

P1.10 implication:

- use final v1.1 and final AI profile as the binding reference basis;
- treat draft v1.2 as watch evidence only;
- require secure-development outcomes covering preparation, protection, production and vulnerability response;
- require dependency/build provenance and vulnerability-remediation evidence during physical design/build;
- do not claim a particular SDLC/toolchain.

---

# 4. NIST AI RMF and GenAI Profile

NIST AI RMF 1.0 and NIST AI 600-1 organize AI risk management around governance, mapping, measurement and management, with GenAI-specific risks and actions.

P1.10 implication:

- every AI capability needs purpose, affected parties/context, measurement and management;
- model/output risk is capability-specific;
- governance and evaluation must continue through activation, monitoring, incident and retirement;
- AI uncertainty cannot be represented by one generic confidence score;
- provenance, human review, incident response and provider/dependency risk are first-class.

The NIST references do not require AI activation and do not authorize AI authority.

---

# 5. OWASP LLM and agentic risks

OWASP’s 2025 LLM guidance identifies prompt injection and excessive agency among major risks. Later agentic guidance expands tool misuse, data leakage and autonomous-action concerns.

P1.10 implication:

- all external evidence, email, attachments, retrieved content and tool outputs remain untrusted data;
- models cannot distinguish trusted instructions merely from natural language presentation;
- least privilege, minimal tool exposure, exact operation schemas and human approval are mandatory for consequential actions;
- an agent cannot gain authority through a prompt or decide its own action scope;
- prompt-injection tests and protected-action zero-tolerance tests are activation gates;
- excessive-agency prevention reinforces the closed agent ladder and AI-off design.

---

# 6. OpenTelemetry semantic conventions

OpenTelemetry defines semantic conventions across traces, metrics, logs, events and resources.

P1.10 implication:

- operational telemetry should use stable versioned naming and correlation;
- traces, metrics and logs remain distinct instruments;
- adopting naming conventions does not make telemetry an audit ledger or domain event store;
- high-cardinality tenant/business values require strict exclusion/redaction/tokenization policy;
- physical telemetry technology remains open.

---

# 7. Contingency and recovery guidance

NIST contingency-planning guidance emphasizes business-impact analysis, recovery requirements, alternate/manual methods and periodic testing.

P1.10 implication:

- backup existence is insufficient without restore verification;
- RTO/RPO must be data/service-class specific;
- manual/file fallback is a legitimate continuity control when it preserves frozen semantics;
- recovery exercises need evidence and corrective actions;
- architecture must distinguish durable acknowledged writes from unacknowledged/in-flight work.

---

# 8. Privacy and data lifecycle

NIST privacy terminology treats data processing as the complete lifecycle including collection, retention, logging, generation, transformation, use, disclosure, sharing, transmission and disposal.

P1.10 implication:

- telemetry, AI prompts, retrieval indexes, embeddings, memory, evaluation sets and provider calls are data-processing paths;
- deletion, retention, redaction, legal hold, export and residency must cover those derived paths;
- operational/AI copies cannot become hidden exceptions to P1.4/P1.6 boundaries;
- exact jurisdiction-specific policy remains evidence/legal work.

---

# 9. W3C WCAG 2.2

P1.9 already freezes WCAG 2.2 Level AA as the supported first-party web target.

P1.10 implication:

- performance/degradation/fallback cannot remove required accessible status, error, progress, review or disclosure;
- generated artifacts and third-party channels need equivalent accessible fallback where they cannot preserve the supported journey;
- exact certification/test tooling remains physical work.

---

# 10. Secure-by-design and software-supply-chain practice

CISA Secure by Design and NIST SSDF reinforce secure defaults, reduced customer security burden, vulnerability elimination/response and supplier/dependency governance.

P1.10 implication:

- high-risk security controls should be product defaults rather than optional expert configuration;
- privileged access and dangerous capability activation require stronger assurance;
- vulnerability disclosure, severity-based remediation and emergency disable/rollback need measurable targets;
- dependency inventory and release provenance are build gates, not a new procurement domain.

---

# 11. Architecture conclusion

Official evidence supports:

- outcome-based measurable controls;
- tested recovery, not backup claims;
- stable telemetry semantics with authority separation;
- AI governance/evaluation through lifecycle;
- prompt-injection and excessive-agency defenses;
- tenant/provider/data-lifecycle coverage;
- secure defaults and vulnerability-response evidence.

It does not support:

- choosing a cloud/model/observability/security vendor;
- adding a generic GRC, SIEM, model platform or agent framework;
- allowing AI authority;
- claiming certification or compliance before implementation/evidence;
- treating architecture review as contractor validation.
