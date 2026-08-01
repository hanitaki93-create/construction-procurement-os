# P1.10 — Integrated Nonfunctional & AI-Readiness Candidate v0.2

**Date:** 2026-08-01  
**Status:** REMEDIATED CONTROLLING CANDIDATE / INTERNAL RECHECK PENDING  
**Supersedes:** v0.1 where conflicting  
**P1.11 / product code:** LOCKED

---

# 1. Thesis

> **Nonfunctional requirements are testable product contracts, and AI is an optional, replaceable proposal-and-orchestration layer over the frozen deterministic system—not a new truth, authority or dependency.**

---

# 2. Measurable NFR and activation grammar

Every NFR binds identity/version, purpose/risk, criticality, service/capability/data class, workload profile, exact SLI/formula, threshold/distribution, window/population/exclusions, measurement health, evidence/test, degradation, review and customer/contract mapping.

Criticality:

- C0 integrity/security/authority/durability;
- C1 core service/customer commitment;
- C2 supporting/degradable capability;
- C3 optional capability.

Conformance outcomes:

- TARGET_UNVERIFIED;
- VERIFIED_PASS;
- VERIFIED_PASS_LOWER_DECLARED_ENVELOPE;
- VERIFIED_LIMITED_WITH_EXPLICIT_FALLBACK;
- VERIFIED_FAIL_BLOCKED;
- ACTIVE_BREACH_REMEDIATION;
- NOT_APPLICABLE;
- RETIRED.

C0 always requires pass. C1 requires pass for the declared envelope; lower capacity is prospective, versioned and disclosed. C2 may operate only under an explicit safe fallback. C3 remains disabled until pass. Pilot does not waive C0.

Measurement health is complete, partial known, partial unknown or unavailable. Missing telemetry never improves an SLO.

---

# 3. Workload/performance

Finite pilot/standard profiles and stress/burst/noisy-neighbor cases are frozen. Tail-percentile targets apply to interactive read, proposal, durable command acceptance, external tasks, search, reports, imports, exports, file processing and async progress.

Acknowledgement, effect completion and result availability remain distinct. Saturation produces typed backpressure and capability degradation, never lost acknowledged data, duplicate effects, hidden truncation or cross-tenant leakage.

---

# 4. Availability/durability/recovery

Core/external task target 99.90% monthly; evidence 99.90%; reports/search 99.50%; optional AI 99.00% when active.

Acknowledged authoritative/evidence/issued/idempotency records have semantic RPO 0 and require `DurabilityAcknowledgementProof`:

- transactional durable commit;
- durable object plus metadata commit;
- replicated append/journal commit;
- external authoritative acknowledgement plus local immutable intent/effect position under P1.7.

For product-custodied evidence, payload and identity/integrity both cross the durable boundary.

Core RTO ≤4 h; evidence/reporting ≤8 h; search ≤24 h; AI may remain disabled. Backup integrity daily, sampled restore monthly, end-to-end quarterly, disaster exercise annually.

---

# 5. Reliability/degradation

Retry/queue/circuit/dead-letter/reconciliation/idempotency/continuation policies are explicit. Unknown external effect never ordinary-retries. Idempotency/continuation persists ≥90 days terminal and longer for unresolved/issued effects.

Degradation protects tenant/security, durability/effect safety, evidence/submission attempts, result lookup and deterministic work before optional reporting/search/import/export/connectors/AI.

---

# 6. Observability/security/privacy/lifecycle

Domain/integration/external/transport/audit/log/trace/metric/incident/AI records remain distinct. Telemetry is versioned, correlated, privacy-minimized and never business truth. Measurement coverage/collector loss is visible.

Security baseline includes MFA/session/revocation, encryption, secrets/keys, release/dependency provenance, vulnerability remediation, testing, incident and provider/subprocessor review. C0 violations have zero error budget.

Data lifecycle includes backups, logs, search, prompts, outputs, embeddings, retrieval, memory and evaluation. Retention is tenant/category versioned; seven years is a default candidate, not legal advice. Holds/redaction/tombstones survive restore. Residency classifies every processing path.

---

# 7. Files/import/export/quota/deployment

Registered file classes, exact limits, archive depth/expansion, isolated scan/parser pipeline and untrusted states are frozen. Imports remain proposal/preview/command. Exports carry exact cut/count/manifest/checksum/completeness; no silent truncation.

Quotas/rates bind numeric policies, acceptance/effect/continuation and fair/deadline behavior. AI is disabled before deterministic capacity.

Release identity, compatibility, migration, rollout, rollback, kill switch and conformance profile are explicit. Automatic provider/model fallback requires a separately evaluated compatible conforming profile; otherwise abstain/disable/manual.

---

# 8. AI identity/proposal/output

Every capability/run/output binds exact capability, model/provider, prompts/instructions, tools, retrieval, input/source cut, citations, scores/uncertainty, review and evaluation identities.

Output classes are closed. AI cannot create authoritative facts, semantic fields, metrics, operations, policies or authority. Proposal cannot self-accept. Claims are classified/cited. No generic confidence.

---

# 9. AI context coverage

Every capability/use binds `AIContextCoveragePolicy` defining eligible context population, mandatory sources, scope/time/cut, access treatment, retrieval/pagination/truncation, minimum coverage and allowed subset/range/segmentation/use.

Every run has `AIContextCoverageAssessment`:

- CONTEXT_COMPLETE;
- CONTEXT_EVALUATED_SUBSET_KNOWN;
- CONTEXT_DETERMINISTIC_RANGE;
- CONTEXT_SEGMENTED;
- CONTEXT_ACCESS_RESTRICTED;
- CONTEXT_UNKNOWN_GAP;
- CONTEXT_BLOCKED.

“All/total/complete/none/current” requires complete underlying product population/time/access proof. Citations do not substitute for completeness. Unknown gaps or missing mandatory source abstain/block load-bearing use. Known subsets and ranges follow P1.8/P1.9 disclosure/use ceilings.

---

# 10. Agent authority

Closed L0–L6 ladder remains. Generative AI cannot independently qualify for L6. Agent action is the exact intersection of capability, principal/context authority, operation exposure, access, guards, confirmation, conformance and resources.

L5 transmits only a canonical serialized command/digest already confirmed by the same principals under valid continuation. Any semantic default/change invalidates confirmation.

No raw DB/CRUD/shell/arbitrary HTTP/plugins. Effect-indeterminate pauses dependent actions and permits lookup/explanation/reconciliation recommendation only.

---

# 11. Evaluation sufficiency

Every capability metric binds `EvaluationSufficiencyPolicy` with sample/strata/diversity/confidence/reviewer/holdout/adversarial/expiry rules.

Default beyond-shadow minimum:

- ≥500 independent labelled units overall;
- ≥100 per critical stratum;
- ≥200 reviewed pilot outputs and ≥50 per critical stratum;
- one-sided 95% confidence lower bound meets quality threshold where applicable;
- calibration ≥500 cases and ≥50 positive/negative;
- all mandatory safety scenarios plus ≥200 adversarial variants with zero failures;
- critical ground truth double reviewed, ≥95% agreement and appropriate agreement measure ≥0.80, adjudicated.

Only `SUFFICIENT_PASS` activates. Insufficient sample/strata, unreliable truth, compromised holdout or expired adversarial coverage remains disabled/shadow or narrows scope explicitly.

Adversarial suite refreshes quarterly and within 10 business days of material incident/new attack class.

---

# 12. AI resource/isolation/memory/provider

Every capability has numeric `AIResourceBudgetPolicy` for files/bytes/tokens/items/retrieval/output/time/concurrency/cost/cache/storage and explicit over-budget behavior under context-coverage rules.

Prompts/retrieval/embeddings/cache/memory/tool results/outputs/evaluations/provider files remain tenant/project/principal/purpose/residency scoped. Cross-tenant business influence and provider training are OUT by default.

Memory classes remain turn/session/preference/task/tenant index/evaluation; authority/truth memory prohibited. Provider/model change requires full evaluation and material shadow/pilot. AI-off/manual path remains complete.

---

# 13. Validation/falsification

Contractor, supplier, prototype, thin-slice, P07, NFR, AI and pilot gates retain explicit samples and kill/revise criteria. Architecture PASS cannot be labelled external/commercial validation.

---

# 14. Candidate ADRs

- ADR-0017;
- ADR-0042–ADR-0048.

All remain proposed pending dual PASS.

---

# 15. Gate claim

G1–G16 candidate PASS. G17 pending full internal recheck and Claude.

No P1.1–P1.9 reopening, second XL or AI dependency is introduced. P1.11 and product code remain locked.
