# P1.10 — ADR Reconciliation v1.0

**Date:** 2026-08-01  
**Status:** FINAL / DUAL HOSTILE PASS

---

## 1. Decision basis

P1.10 closed after:

- internal hostile Round 1 FAIL on BL-P10-01/02/03;
- remediation and full internal recheck PASS;
- Claude Round 1 FAIL on BL-P110-04 only;
- product-owned AI capability/policy/authority remediation;
- internal post-Claude recheck PASS across 236 hostile scenarios;
- Claude Round 2 PASS with G1–G17 PASS and no upstream reopening;
- W-87–W-91 closure.

The controlling semantic contract is:

`P1_10_FROZEN_NONFUNCTIONAL_AI_READINESS_RESIDUAL_V1_0.md`

---

## 2. Accepted decisions

### ADR-0017 — AI-readiness deterministic substrate

**Status:** ACCEPTED

AI is optional and replaceable. It operates as a proposal, explanation, recommendation and bounded orchestration layer over deterministic truth, registered operations, evidence, report semantics and principal-bound confirmation. AI-off/manual A0–A3 remains complete.

### ADR-0042 — measurable workload, performance and NFR conformance

**Status:** ACCEPTED

Every NFR binds a workload, exact SLI/formula/population/window/threshold, criticality, measurement health, test evidence and closed conformance disposition. Unverified or failed targets cannot quietly activate. Lower declared envelopes are prospective and cannot weaken C0 semantics or existing customer commitments without an applicable commercial/legal mechanism.

### ADR-0043 — availability, durability, continuity, reliability and degradation

**Status:** ACCEPTED

Adopt capability-specific availability/RTO/RPO, semantic RPO 0 for acknowledged authoritative/evidence/issued/idempotency records, four durability-proof modes, tested restore cadence, typed retry/effect uncertainty and a deterministic degradation priority that protects tenant boundaries, durability and A0–A3 before optional features.

### ADR-0044 — observability, security, privacy, residency, lifecycle and resource residual

**Status:** ACCEPTED

Telemetry remains separate from business/audit truth. Security/privacy/residency/lifecycle cover all primary and derived copies including backups, search, prompts, outputs, embeddings, memory, evaluation and providers. Files, parsers, imports, exports, quotas and deployment have finite policies without becoming generic SIEM/GRC/data-platform scope.

### ADR-0045 — product-owned AI run, proposal, provenance, context, abstention and evaluation grammar

**Status:** ACCEPTED

Every AI capability/run/output is registry-bound and fully versioned. Context completeness uses a declared/evaluated/unknown population contract. Citations do not substitute for coverage. Proposal freshness is explicit. Evaluation requires sufficient, stratified, independently reviewed and adversarially current evidence; point estimates alone cannot activate load-bearing capabilities.

### ADR-0046 — product-owned bounded agent authority and human-confirmed command

**Status:** ACCEPTED

Adopt L0–L6 with no generative L6/general autonomous commercial agent. Capability/tool/authority ceilings are product-authored. Tenant configuration is monotone toward less authority/more review. L5 may transmit only the exact principal-confirmed command digest. Sub-agent authority is intersection-only and effect uncertainty pauses continuation.

### ADR-0047 — tenant-isolated retrieval, memory, provider replacement and AI-off

**Status:** ACCEPTED

Prompts, retrieval, embeddings, caches, memory, tool results, outputs, evaluation and provider files are tenant/project/principal/purpose/residency scoped. Cross-tenant business influence and provider training are OUT by default. Every selectable provider profile has independent current evaluation. Provider loss leaves deterministic work intact.

### ADR-0048 — ordered architecture-to-evidence/build/pilot/commercial falsification gate

**Status:** ACCEPTED

Architecture closure precedes primary evidence/prototype testing, which precede non-throwaway thin-slice build. P07 feasibility precedes P07 build commitment. NFR and AI gates precede activation. Pilot and commercial evidence remain separate. Architecture PASS is never product/market validation.

---

## 3. Upstream impact

- P1.1–P1.9 reopening: NO.
- ADR-0010 and ADR-0011 remain proposed/non-blocking evidence/refinement debt.
- No accepted upstream ADR is superseded.
- P07 remains sole XL.
- Product code remains locked pending P1.11 final validation.

## 4. P1.11 inheritance

P1.11 must treat all accepted P1.10 decisions as immutable semantic inputs and test them through golden threads, artifact completeness, watch reconciliation and independent no-invention review. P1.11 may identify contradictions, but may reopen a frozen phase only through controlled architecture change with explicit blast radius.