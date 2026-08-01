# P1.10 — Measurable NFR Catalogue v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CATALOGUE CANDIDATE  
**Reference:** all P1.10 contracts  
**Product code:** LOCKED

---

# 1. Catalogue rule

Each row is binding only with its referenced contract’s exact population, window, exclusions, workload and degradation semantics. Physical implementation may exceed but not silently reinterpret a target.

---

# 2. Performance and scale

| ID | Capability | Target / test |
|---|---|---|
| NFR-PERF-001 | Reference scale | Pass `V1_PILOT_PROFILE`; GA envelope must be proven at or below `V1_STANDARD_VERIFICATION_PROFILE`. |
| NFR-PERF-002 | Interactive read | P95 ≤1.5 s; P99 ≤4 s. |
| NFR-PERF-003 | Proposal preview | P95 ≤3 s; P99 ≤8 s; slower becomes async. |
| NFR-PERF-004 | Command acceptance | Durable accept/reject P95 ≤1.5 s; P99 ≤4 s; timeout ≤10 s. |
| NFR-PERF-005 | External task landing | P95 ≤3 s; P99 ≤7 s excluding separately measured OTP provider. |
| NFR-PERF-006 | Search | P95 ≤2 s; P99 ≤5 s. |
| NFR-PERF-007 | Search freshness | committed product facts indexed ≤60 s P95, ≤5 min P99. |
| NFR-PERF-008 | Common report | P95 ≤5 s; P99 ≤15 s. |
| NFR-PERF-009 | Report artifact | ≤100 pages/100k rows ≤2 min P95. |
| NFR-PERF-010 | Import preview | ≤10k rows ≤60 s P95; ≤100k rows ≤10 min P95. |
| NFR-PERF-011 | Export | ≤100k rows ≤2 min P95; ≤1m rows ≤15 min P95. |
| NFR-PERF-012 | Async visibility | accepted operation visible ≤2 s P95; heartbeat ≤15 s. |
| NFR-PERF-013 | Async result | result queryable ≤5 s P95 after commit. |
| NFR-PERF-014 | Burst | 3× read/15 min, 2× command/10 min, 5× external/5 min without integrity breach. |
| NFR-PERF-015 | Saturation | typed backpressure, no lost acknowledged data, duplicate effect, hidden truncation or cross-tenant leak. |

---

# 3. Availability, durability and recovery

| ID | Capability/data | Target / test |
|---|---|---|
| NFR-REL-001 | Core deterministic | 99.90% monthly target; pilot minimum 99.50%. |
| NFR-REL-002 | External task/submission | 99.90% monthly plus deadline fallback. |
| NFR-REL-003 | Evidence access/issue | 99.90% monthly. |
| NFR-REL-004 | Reporting/export | 99.50% monthly. |
| NFR-REL-005 | Search | 99.50% monthly plus freshness SLO. |
| NFR-REL-006 | AI optional | 99.00% when active; core unaffected when unavailable. |
| NFR-REL-007 | Acknowledged authoritative RPO | semantic RPO 0; no success before durable boundary. |
| NFR-REL-008 | Operational effect-position RPO | ≤1 minute. |
| NFR-REL-009 | Critical telemetry RPO | ≤15 minutes. |
| NFR-REL-010 | Core RTO | reads/result lookup and command/A0–A3 write ≤4 hours. |
| NFR-REL-011 | Evidence RTO | ≤8 hours. |
| NFR-REL-012 | Reporting RTO | ≤8 hours. |
| NFR-REL-013 | Search RTO | ≤24 hours or explicit degraded path. |
| NFR-REL-014 | AI RTO | ≤72 hours or indefinite disabled state without core impact. |
| NFR-REL-015 | Backup integrity | automated daily evidence. |
| NFR-REL-016 | Restore verification | monthly sampled, quarterly end-to-end, annual disaster exercise. |
| NFR-REL-017 | Retry | effect-bearing unknown ordinary retry = 0; ≤5 attempts for proven safe pre-effect idempotent transport. |
| NFR-REL-018 | Queue warning | interactive age 5 min warn/15 min block; routine 30 min warn/4 h block or deadline sooner. |
| NFR-REL-019 | Idempotency retention | ≥90 days after terminal; unresolved/issued identities follow governing retention. |
| NFR-REL-020 | Incident updates | customer-impacting material incident update at least every 60 min while active. |

---

# 4. Security and privacy

| ID | Control | Target / test |
|---|---|---|
| NFR-SEC-001 | MFA | all internal production users by GA; privileged/admin always. |
| NFR-SEC-002 | Revocation | new-action revocation propagation ≤5 min P95. |
| NFR-SEC-003 | Session | internal idle ≤30 min, external ≤60 min; absolute 12 h/24 h; privileged elevation ≤1 h. |
| NFR-SEC-004 | Transport encryption | TLS 1.2 minimum, 1.3 preferred. |
| NFR-SEC-005 | At-rest encryption | all product-hosted tenant/evidence/backups. |
| NFR-SEC-006 | Static privileged secret rotation | ≤90 days and immediate on compromise/change. |
| NFR-SEC-007 | Other static secret rotation | ≤180 days. |
| NFR-SEC-008 | Key rotation | ≤365 days or stricter provider/security policy. |
| NFR-SEC-009 | Known exploited/critical active path | contain ≤24 h; permanent fix target ≤7 days. |
| NFR-SEC-010 | High vulnerability | remediate ≤30 days. |
| NFR-SEC-011 | Medium vulnerability | remediate ≤90 days. |
| NFR-SEC-012 | Critical release gate | zero unmitigated internet-exposed critical/high without formal independent exception. |
| NFR-SEC-013 | Pen/adversarial test | before GA and annually/material authority/tenant/AI change. |
| NFR-SEC-014 | SEV-0/1 response | containment/response start ≤15 min. |
| NFR-SEC-015 | Telemetry sensitive payload | prohibited by default; restricted diagnostics ≤30 days. |
| NFR-SEC-016 | Security/audit telemetry retention | ≥365 days or governing policy. |
| NFR-SEC-017 | General traces/logs | 30/90 day defaults; metrics 24 months. |
| NFR-SEC-018 | Cross-tenant access/disclosure | zero tolerated. |
| NFR-SEC-019 | Unauthorized commercial effect | zero tolerated. |
| NFR-SEC-020 | Acknowledged authoritative data loss | zero tolerated. |

---

# 5. Data lifecycle and portability

| ID | Control | Target / test |
|---|---|---|
| NFR-DATA-001 | Retention policy | versioned per tenant/data category; default business/evidence 7 years after close subject to policy. |
| NFR-DATA-002 | Legal hold | exact scoped hold suspends disposition and is audited. |
| NFR-DATA-003 | Tombstone on restore | expired/redacted/held status reapplied after restore before ordinary access. |
| NFR-DATA-004 | Standard offboarding export acknowledgment | ≤1 business day. |
| NFR-DATA-005 | Standard offboarding package | ≤10 business days after authorization/scope. |
| NFR-DATA-006 | Export integrity | manifest, counts, checksums, source cut and truncation state = 100%. |
| NFR-DATA-007 | Residency path coverage | primary, backup, telemetry, search, AI, memory, evaluation and provider paths classified = 100%. |
| NFR-DATA-008 | Provider training | tenant business data training disabled by V1 default. |

---

# 6. Files, imports, exports and quotas

| ID | Control | Target / test |
|---|---|---|
| NFR-FILE-001 | Normal/large file | 100 MB sync path; 500 MB async maximum default. |
| NFR-FILE-002 | External submission | ≤100 files and ≤2 GB. |
| NFR-FILE-003 | Internal capture | ≤250 files and ≤5 GB. |
| NFR-FILE-004 | Archive | depth ≤2, entries ≤10k, expanded ≤5 GB and ≤20× compressed. |
| NFR-FILE-005 | PDF/image | ≤5,000 pages; ≤100 megapixels. |
| NFR-FILE-006 | Import | ≤100k rows per operation. |
| NFR-FILE-007 | Export | ≤1m rows or 5 GB per artifact; larger segmented/blocked. |
| NFR-FILE-008 | Scan | ≤100 MB completes ≤2 min P95; failure remains quarantined. |
| NFR-FILE-009 | Parser isolation | no macros/scripts/network/trusted execution; resource budget enforced. |
| NFR-FILE-010 | Silent truncation | zero tolerated. |
| NFR-FILE-011 | Unknown columns | evidence/unmapped proposal only; zero silent semantic promotion. |
| NFR-FILE-012 | Deadline attempt | accepted attempt time preserved before heavy processing where valid. |

---

# 7. Deployment and conformance

| ID | Control | Target / test |
|---|---|---|
| NFR-DEP-001 | Release identity | build/source/schema/config/capability/dependency evidence = 100% releases. |
| NFR-DEP-002 | Compatibility | every load-bearing version change classified/migrated/blocked. |
| NFR-DEP-003 | Rollback/kill switch | optional connector/AI/search/report/import disable without core data rewrite. |
| NFR-DEP-004 | In-flight binding | original version/capability preserved = 100%. |
| NFR-DEP-005 | Provider conformance | current state/test evidence required before activation. |
| NFR-DEP-006 | High-risk rollout | limited pilot and rollback evidence required. |
| NFR-DEP-007 | Dependency inventory | produced for every release. |

---

# 8. AI capability and safety

| ID | Capability/control | Target / test |
|---|---|---|
| NFR-AI-001 | AI-off floor | 100% A0–A3 conventional/manual completion without AI. |
| NFR-AI-002 | Run provenance | model/provider/prompt/tool/retrieval/input/source-cut identity = 100%. |
| NFR-AI-003 | Critical extraction precision | ≥99.0%. |
| NFR-AI-004 | Critical extraction recall | ≥95.0%. |
| NFR-AI-005 | Citation-location correctness | ≥99.5%. |
| NFR-AI-006 | Mapping top-1 precision | ≥97.0% for review-ready suggestions. |
| NFR-AI-007 | False identity merge | zero in critical release set. |
| NFR-AI-008 | Critical classification | precision ≥99%, recall ≥97% where activated. |
| NFR-AI-009 | Cited factual claims | ≥99% supported; entailment/source-version ≥98%. |
| NFR-AI-010 | Unsupported load-bearing claims | zero in critical set; ≤0.5% pilot sample overall. |
| NFR-AI-011 | Correct abstention | ≥95% for inaccessible/unknown/ambiguous evaluation cases. |
| NFR-AI-012 | Command preparation exact match | 100% operation/target/member/value/recipient. |
| NFR-AI-013 | Unauthorized/unexposed operation | zero. |
| NFR-AI-014 | Confirmation bypass | zero. |
| NFR-AI-015 | Prompt-injection protected-action success | zero. |
| NFR-AI-016 | Indeterminate resend/replacement | zero. |
| NFR-AI-017 | Cross-tenant AI leakage/influence | zero. |
| NFR-AI-018 | Calibration | expected calibration error ≤0.05 where statistically meaningful. |
| NFR-AI-019 | Critical safety incident | immediate suspend. |
| NFR-AI-020 | Primary metric regression | ≥20% relative sufficient-sample degradation triggers review/degrade. |
| NFR-AI-021 | Human rejection/correction | >30% over ≥100 outputs triggers capability review. |
| NFR-AI-022 | Model/provider change | full evaluation plus shadow/pilot for material change. |
| NFR-AI-023 | Provider training | prohibited by default. |
| NFR-AI-024 | Provider cache/retention | disabled or shortest contractually supported compatible period. |
| NFR-AI-025 | Generic autonomy | no generative L6 or autonomous commercial agent in V1. |

---

# 9. Validation gates

| ID | Gate | Target / test |
|---|---|---|
| NFR-VAL-001 | Contractor validation | ≥5 participants, ≥3 organizations, ≥3 UAE beachhead/adjacent. |
| NFR-VAL-002 | Supplier validation | ≥10 participants, ≥5 UAE-active, role/digital/language diversity. |
| NFR-VAL-003 | Prototype | ≥8 internal + ≥8 external users; zero critical meaning misunderstandings in final round. |
| NFR-VAL-004 | Thin slice | full A0–A3 slice, restore/load/isolation, zero architecture invention. |
| NFR-VAL-005 | Pilot | ≥2 contractors, ≥3 tenders each, ≥10 suppliers total. |
| NFR-VAL-006 | First live tender | target ≤5 working days from clean inputs. |
| NFR-VAL-007 | Supplier completion hypothesis | ≥80% without buyer transcription except chosen buyer-capture channel. |
| NFR-VAL-008 | Market claim | architecture PASS cannot be labelled commercial validation. |

---

# 10. Catalogue conformance

No target may be marked achieved until the named test/evidence exists. Unproven targets remain `TARGET_UNVERIFIED`. A release may lower its declared capacity envelope through explicit versioned scope, but may not claim the higher catalogue envelope.
