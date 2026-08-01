# P1.11 — Master Requirement Traceability Matrix v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE / SPINE TRACEABILITY CONSOLIDATION

---

# 1. Purpose

This matrix consolidates the load-bearing Phase 1 requirements a fresh builder must preserve. It does not replace detailed phase clauses; it supplies the final trace chain:

`Requirement → evidence/decision basis → controlling frozen contract/ADR → validating golden threads → later build/external gate`

Statuses:

- `FULLY_TRACED`
- `PHYSICAL_PROOF_REQUIRED`
- `EXTERNAL_VALIDATION_REQUIRED`
- `LEGAL_EVIDENCE_REQUIRED`
- `NON_SPINE_DEFERRED`
- `ARCHITECTURE_GAP`

No row is currently classified `ARCHITECTURE_GAP`; this remains subject to hostile audit.

---

# 2. Scope, product boundary and control

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-001 | V1 serves UAE private-sector contractor procurement/commercial buyers under explicit authority/accounting coexistence | P1.1 beachhead + primary evidence | Roadmap/P1.1 frozen boundary | all | EXTERNAL_VALIDATION_REQUIRED |
| MR-002 | A0–A3 must work without P07, named connector, supplier network/account, chat, AI or warehouse | burden budget/adoption thesis | ADR-0006, P1.7/P1.8/P1.9/P1.10 freezes | GT-01/02/04/05/06/17 | FULLY_TRACED |
| MR-003 | P07 is the sole independent XL gravity well | scope control | P1.1/P1.5/P1.11 | GT-07/08/13/14 | FULLY_TRACED |
| MR-004 | No universal ProcurementCase/Package/Demand root | primary workflow contradiction | ADR-0003 | GT-01/02/03/05/06 | FULLY_TRACED |
| MR-005 | Every accepted architecture choice traces to evidence/ADR and every SPINE requirement to spec/test | P1.0 control principle | ADR-0001, P1.11 | all | FULLY_TRACED |
| MR-006 | Product code remains locked until Phase 1 final gate and explicit build authorization | roadmap | Phase state/checkpoints | all | FULLY_TRACED |

---

# 3. Authority, ownership, tenancy and configuration

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-007 | Every load-bearing fact/action has tenant, project, ContractingAuthorityContext and principal | authority/reconstruction | P1.4 freeze, ADR-0019/0020 | all | FULLY_TRACED |
| MR-008 | Internal role/delegation/DOA is distinct from external task grant | confidentiality/authority | ADR-0012, P1.9 | GT-02/04/17 | FULLY_TRACED |
| MR-009 | OWN/MIRROR/REFERENCE/OUT applies at load-bearing fact/event grain with one writer per effective period | no co-master | ADR-0005/0021 | GT-03/06/07/11/12 | FULLY_TRACED |
| MR-010 | Connector, workflow, evidence, report and AI are never business authority | cross-phase safety | ADR-0018/0028/0029/0031/0033/0017 | all | FULLY_TRACED |
| MR-011 | Load-bearing policies/configuration bind exact versions; no silent in-flight rebinding | historical reproducibility | ADR-0020 | GT-04/05/07/10/13/20 | FULLY_TRACED |
| MR-012 | Initial context/configuration establishment is governed, not an untracked bootstrap | hostile watch | P1.5 freeze | GT-01/02/07 | FULLY_TRACED |
| MR-013 | Cross-tenant direct and model-mediated business influence is OUT by default | isolation/privacy | ADR-0026, P1.10 | GT-04/16/20 | FULLY_TRACED |
| MR-014 | Tenant residency is declared and every data/processing path is classified; migration is governed | contractual boundary | ADR-0025, P1.10 | GT-11/19/20 | PHYSICAL_PROOF_REQUIRED |

---

# 4. Procurement and commercial truth

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-015 | RequirementAllocation owns scope-consumption lineage; ProcurementPackage is optional grouping | primary workflows | ADR-0003 | GT-01/02/03 | FULLY_TRACED |
| MR-016 | Supplier source, normalized representation, buyer adjustment and supplier-confirmed basis are separate | bid-leveling evidence | P1.2/P1.5/P1.9 | GT-01/02/04/17/18 | FULLY_TRACED |
| MR-017 | Recommendation/approval/AwardDecision/Commitment are distinct | authority/commercial seam | P1.5 | GT-02/05/06/07 | FULLY_TRACED |
| MR-018 | One semantic Commitment core supports bounded purchase/subcontract/call-off/service profiles | anti-duplication | ADR-0004 | GT-07/08/13/14 | FULLY_TRACED |
| MR-019 | ScopeBasis, ValuationBasis and CapabilityProfile are orthogonal typed axes | valuation evidence | ADR-0004 | GT-03/07/08 | FULLY_TRACED |
| MR-020 | Every commercial change/value uses closed CommercialEffectVector and one economic contribution once | canonical ledger substrate | ADR-0002/0015 | GT-07/08/13/14 | FULLY_TRACED |
| MR-021 | Effects bind COMPONENT or OBLIGATION subject before occurrence | conservation/grain | P1.5 freeze | GT-07/08/14 | FULLY_TRACED |
| MR-022 | Money is exact decimal with versioned calculation, rounding, FX/tax purpose and correction | legal significance | ADR-0022 | GT-03/07/08/13 | PHYSICAL_PROOF_REQUIRED |
| MR-023 | Claim, assessment, certification, accounting posting and payment are separate facts | accounting seam | ADR-0005/P1.5 | GT-07/13 | FULLY_TRACED |
| MR-024 | Physical, commercial/certified, accounting-posted and paid actuals never substitute | reporting/commercial truth | P1.5/P1.8 | GT-03/07/13/16 | FULLY_TRACED |
| MR-025 | Correction is immutable and typed: amendment, reverse/replace, forward adjustment, reversal, reclassification or integration-only | audit/history | ADR-0015 | GT-08/12/13 | FULLY_TRACED |
| MR-026 | Workflow outcome can authorize a domain command but never directly write commercial truth | configurable control safety | ADR-0018 | GT-05/07/09 | FULLY_TRACED |
| MR-027 | Numbering separates immutable identity from display/legal number and is safe under retry/concurrency | operational/legal | ADR-0023 | GT-02/06/07/10 | PHYSICAL_PROOF_REQUIRED |
| MR-028 | Exact GCC rates/defaults/statutory timing/formality are not asserted without evidence | evidence/legal honesty | ADR-0010 proposed | GT-07/08/13/14 | LEGAL_EVIDENCE_REQUIRED |
| MR-029 | Effective Commitment attribution is explicit final or governed visible suspense with resolution gates | cost attribution | ADR-0011 proposed | GT-07/08 | NON_SPINE_DEFERRED |

---

# 5. Evidence, document and communication

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-030 | Every load-bearing value/action traces to exact evidence record/version/source/location | dispute/AI provenance | ADR-0014/0027 | all transaction threads | FULLY_TRACED |
| MR-031 | Hash/content/current URL is not evidence identity, authenticity, authority or truth | hostile audit | ADR-0027 | GT-10/11/17/18/19 | FULLY_TRACED |
| MR-032 | Issued artifact and member set are immutable; change creates new version/supersession | contractual communication | P1.6 | GT-02/04/10/15 | FULLY_TRACED |
| MR-033 | Issue, dispatch, provider acceptance, delivery, read, acknowledgment, response and domain effect are distinct | communication evidence | ADR-0028 | GT-02/04/10/12 | FULLY_TRACED |
| MR-034 | Communication-gated effect is established once by owning-domain command over canonical satisfaction snapshot | evidence/domain separation | ADR-0028 | GT-10 | FULLY_TRACED |
| MR-035 | Later callback/evidence correction never silently reverses/retimes established domain effect | historical truth | P1.6 freeze | GT-10/13 | FULLY_TRACED |
| MR-036 | Retention/redaction/disposition/hold preserves identity, authority, audit and financial meaning | lifecycle/legal | ADR-0014/P1.6/P1.10 | GT-11/19 | PHYSICAL_PROOF_REQUIRED |
| MR-037 | External content is untrusted and cannot instruct product/agent behavior | security | P1.6/P1.7/P1.9/P1.10 | GT-04/17/18/20 | FULLY_TRACED |

---

# 6. Integration, migration and operations

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-038 | Exactly QUERY, PROPOSAL, COMMAND and ASYNC_OPERATION define operation meaning | single interface substrate | ADR-0029 | all | FULLY_TRACED |
| MR-039 | Proposal never becomes authoritative without a separate valid command | safety | ADR-0029 | GT-01/02/05/07/18/20 | FULLY_TRACED |
| MR-040 | Every state-changing action uses registered operation; no raw DB/event-store mutation | future agent safety | ADR-0024/0029 | all | FULLY_TRACED |
| MR-041 | DomainEvent, IntegrationEvent, TransportEnvelope and ExternalObservation remain distinct | asynchronous truth | ADR-0030 | GT-10/12 | FULLY_TRACED |
| MR-042 | Outbound retry uses immutable PublicationIntent with original source/mapping/disclosure/target basis | replay correctness | ADR-0030 | GT-02/06/10/12 | FULLY_TRACED |
| MR-043 | Effect stages include pre-acceptance, accepted-pre-effect, indeterminate, external emitted, domain established, no-effect and partial | uncertainty | ADR-0031 | GT-06/10/12/19 | FULLY_TRACED |
| MR-044 | Timeout/absence is never proof of no effect; indeterminate blocks ordinary retry/rebind/conflicting continuation | duplicate prevention | ADR-0031 | GT-10/12/19 | FULLY_TRACED |
| MR-045 | Connector authority/conformance/cutover is explicit and connector is never co-master | integration | ADR-0031 | GT-03/06/07/12 | FULLY_TRACED |
| MR-046 | Migration cannot assign fabricated state/balance; it uses class/profile/manifest/target operations or reference limitation | migration truth | ADR-0032 | GT-11 | FULLY_TRACED |
| MR-047 | Manual/file/provider-neutral email paths are mandatory substrate and no named connector is a first-tender prerequisite | adoption | ADR-0006 | GT-01/02/04/06/17/18 | FULLY_TRACED |

---

# 7. Reporting and control

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-048 | Every load-bearing metric is versioned with source/grain/population/contribution/formula/time/quality/use/access | report reproducibility | ADR-0033 | GT-07/13/15/16 | FULLY_TRACED |
| MR-049 | Calculation uses product-registered deterministic operators; no arbitrary tenant SQL/script/formula | anti-platform | P1.8 | GT-15/16 | FULLY_TRACED |
| MR-050 | Correction contribution distinguishes occurrence, economic lineage, conservation and disposition | anti-double-count | ADR-0037 | GT-08/13/16 | FULLY_TRACED |
| MR-051 | Declared eligible population is separate from evaluated/accessible population; zero requires completeness | truthfulness | P1.8 | GT-15/16 | FULLY_TRACED |
| MR-052 | Incomplete population returns block, explicit evaluated subset or deterministic range—never plausible total | hostile audit | P1.8 | GT-16/20 | FULLY_TRACED |
| MR-053 | Effective/recorded/as-of/known-at and actual families are explicit | temporal truth | ADR-0035 | GT-03/07/13/15 | FULLY_TRACED |
| MR-054 | Result quality is a vector and per-use assessment; report composition cannot upgrade use | decision safety | ADR-0036 | GT-15/16 | FULLY_TRACED |
| MR-055 | Issued reports are immutable snapshots; recalculation/restatement/supersession and reconstruction are explicit | history | ADR-0034 | GT-13/15 | FULLY_TRACED |
| MR-056 | New use of old report requires current subsequent-reliance assessment | historical reliance | ADR-0034 | GT-15 | FULLY_TRACED |
| MR-057 | Portfolio aggregation preserves contribution identity, comparability, FX/time/actual/access and anti-inference rules | aggregation | ADR-0037 | GT-16 | FULLY_TRACED |
| MR-058 | Supplier analytics are tenant-private/dimension-specific/non-authoritative; controls/queues do not become domain truth | scope/privacy | P1.8 | GT-09/16 | FULLY_TRACED |

---

# 8. Interaction and external participation

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-059 | Every affordance is QUERY/PROPOSAL/COMMAND/ASYNC/NAVIGATION/LOCAL_PRESENTATION and hidden commands are prohibited | UX authority | ADR-0038 | all user threads | FULLY_TRACED |
| MR-060 | Consequential action uses exact preview, same-principal confirmation, current authority/evidence and typed result | error/authority | ADR-0038 | GT-02/05/06/07/10/12/19/20 | FULLY_TRACED |
| MR-061 | Retrievable continuation anchor exists before effect-bearing transmission | lost-result safety | ADR-0038 | GT-02/04/06/10/12/19 | PHYSICAL_PROOF_REQUIRED |
| MR-062 | Bulk execution uses one of four closed modes with item identities/dependencies/unknown effects | batch safety | ADR-0038 | GT-02/04/18 | FULLY_TRACED |
| MR-063 | Navigation/tasks/queues are derived and not a universal root or truth writer | anti-BPM/case | ADR-0039 | all | FULLY_TRACED |
| MR-064 | External participation uses bounded hybrid secure link/email/file/buyer capture/optional tenant workspace; no supplier network | supplier friction/privacy | ADR-0016 | GT-02/04/17 | EXTERNAL_VALIDATION_REQUIRED |
| MR-065 | Every external response has exact grant/assurance/schema/disposition; only valid/allowed late responses enter population | response truth | ADR-0016 | GT-04/17/18 | FULLY_TRACED |
| MR-066 | Load-bearing fields use product-owned typed registry; tenant labels/config cannot create semantics | anti-form-builder | ADR-0016 | GT-04/17/18 | FULLY_TRACED |
| MR-067 | Source-to-normalized promotion is a cited proposal and explicit acceptance command | deterministic meaning | ADR-0016/P1.9 | GT-01/02/17/18/20 | FULLY_TRACED |
| MR-068 | Subset/range/stale/restricted/restated/use limitations are inline/adjacent and preserved across export/chat | visual correctness | ADR-0040 | GT-15/16/20 | PHYSICAL_PROOF_REQUIRED |
| MR-069 | WCAG 2.2 AA, keyboard/status/error/review/reflow/mobile and Arabic/RTL semantics are V1 targets | accessibility | ADR-0041 | GT-04/17/18 | PHYSICAL_PROOF_REQUIRED |
| MR-070 | Every chat/AI-supported action has a complete conventional equivalent | no-AI dependency | ADR-0041 | all | FULLY_TRACED |

---

# 9. NFR, deployment and lifecycle

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-071 | Every NFR has exact identity/workload/SLI/population/window/threshold/criticality/evidence/conformance | measurable operation | ADR-0042 | GT-19/20 | PHYSICAL_PROOF_REQUIRED |
| MR-072 | Pilot and standard workload envelopes and percentile targets are explicit | capacity planning | ADR-0042 | GT-19 | PHYSICAL_PROOF_REQUIRED |
| MR-073 | Acknowledged authoritative/evidence/issued/idempotency records have semantic RPO 0 and durability proof | integrity | ADR-0043 | GT-10/12/19 | PHYSICAL_PROOF_REQUIRED |
| MR-074 | RTO/RPO, restore tests, retry/dead-letter and degradation preserve tenant/effect/evidence meaning | continuity | ADR-0043 | GT-12/19 | PHYSICAL_PROOF_REQUIRED |
| MR-075 | Telemetry is not audit/domain truth and sensitive business/prompt content is minimized | observability/privacy | ADR-0044 | GT-19/20 | PHYSICAL_PROOF_REQUIRED |
| MR-076 | Security/privacy/residency/lifecycle includes backups/search/prompts/outputs/embeddings/memory/evaluation/providers | lifecycle | ADR-0044 | GT-11/19/20 | PHYSICAL_PROOF_REQUIRED |
| MR-077 | Files/import/export/archive/parser/scan/quota limits are finite and cannot silently truncate/create semantics | resource safety | ADR-0044 | GT-18/19 | PHYSICAL_PROOF_REQUIRED |
| MR-078 | Release/rollback/in-flight/provider fallback preserve exact versions and require conformance | deployment | ADR-0044 | GT-12/19/20 | PHYSICAL_PROOF_REQUIRED |

---

# 10. AI readiness and agent authority

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-079 | Every runtime AI capability/prompt/tool/authority/context/evaluation/resource policy is product-authored/versioned | anti-agent-builder | ADR-0045/0046 | GT-20 | FULLY_TRACED |
| MR-080 | Tenant AI configuration can only narrow and must pass monotonicity on every relevant change | authority/safety | ADR-0046 | GT-20 | PHYSICAL_PROOF_REQUIRED |
| MR-081 | AI run/proposal/output binds exact provider/model/prompt/tool/source-cut/citation/context/review lineage | provenance | ADR-0045 | GT-20 | FULLY_TRACED |
| MR-082 | AI context has declared/evaluated/unknown/access population; citations do not substitute for completeness | truthfulness | ADR-0045 | GT-16/20 | FULLY_TRACED |
| MR-083 | Evaluation is statistically sufficient, stratified, independently reviewed and adversarially current; only SUFFICIENT_PASS activates | capability safety | ADR-0045 | GT-20 | PHYSICAL_PROOF_REQUIRED |
| MR-084 | L0–L6 has no generative L6; L5 transmits exact same-principal confirmed digest only | authority | ADR-0046 | GT-20 | FULLY_TRACED |
| MR-085 | Sub-agent authority is intersection-only and effect-indeterminate pauses continuation | agent safety | ADR-0046 | GT-12/20 | FULLY_TRACED |
| MR-086 | Retrieval/embedding/cache/memory/evaluation/provider are tenant-scoped; provider training/cross-tenant influence OUT | privacy | ADR-0047 | GT-20 | PHYSICAL_PROOF_REQUIRED |
| MR-087 | AI-off/provider-loss path leaves deterministic A0–A3 complete | replaceability | ADR-0017/0047 | GT-01/02/06/20 | FULLY_TRACED |

---

# 11. Validation and closure

| ID | Requirement | Basis | Controlling decision | Golden threads | Status |
|---|---|---|---|---|---|
| MR-088 | Architecture closure, primary evidence, comprehension, build, P07 feasibility, NFR, AI, pilot and commercial decisions are ordered/separate | falsification | ADR-0048 | all | EXTERNAL_VALIDATION_REQUIRED |
| MR-089 | V1 contractor/supplier evidence uses named samples and independent ValidationGateDecision | standing evidence debt | ADR-0048 | all | EXTERNAL_VALIDATION_REQUIRED |
| MR-090 | V2 prototype uses ≥8 internal/≥8 external and zero critical meaning misunderstandings in final round | UX falsification | ADR-0048 | GT-01/02/04/16/17 | EXTERNAL_VALIDATION_REQUIRED |
| MR-091 | Deterministic thin slice and independent no-invention tests must find zero architecture invention | roadmap final gate | P1.11 | all | PHYSICAL_PROOF_REQUIRED |
| MR-092 | Architecture PASS is never represented as product/market/commercial validation | honesty | ADR-0048 | all | FULLY_TRACED |

---

# 12. Matrix result

Totals:

- `FULLY_TRACED`: 66
- `PHYSICAL_PROOF_REQUIRED`: 17
- `EXTERNAL_VALIDATION_REQUIRED`: 6
- `LEGAL_EVIDENCE_REQUIRED`: 1
- `NON_SPINE_DEFERRED`: 1
- `ARCHITECTURE_GAP`: 0

The physical/external/legal/deferred rows have exact owners and gates and do not require later semantic invention.

Final Phase 1 closure still requires:

- artifact completeness audit;
- canonical ADR/state synchronization;
- master specification;
- independent no-invention audit;
- Claude final hostile PASS.