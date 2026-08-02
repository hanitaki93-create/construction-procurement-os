# Construction Procurement OS — P2.1 Invariant Register v0.1

**Date:** 2026-08-02  
**Status:** EXHAUSTIVE FROZEN-CLAUSE COMPILATION CANDIDATE / INTERNAL AUDIT PENDING  
**Register type:** `InvariantRegisterVersion`  
**Source boundary:** Phase 1 frozen master package, P1.4–P1.10 frozen contracts, accepted ADRs, MR-001–MR-092 and incorporated watch closures  
**Code:** LOCKED

---

# 1. Purpose

This register closes BL-P21-07.

It is the mandatory compilation boundary between frozen semantic contracts and physical concurrency/integrity enforcement.

A frozen invariant cannot be protected only if a builder happens to notice it. Every invariant must appear here or be introduced through explicit architecture change control.

---

# 2. Register schema

Every entry binds:

- stable invariant ID and name;
- invariant class;
- frozen source requirement/contract;
- participating authoritative/derived objects;
- owning build block;
- concurrency sensitivity;
- required enforcement class;
- minimum hostile proof.

Invariant classes:

- `STRUCTURAL_BOUNDARY`;
- `AUTHORITY_EXCLUSIVITY`;
- `EFFECTIVE_PERIOD_NON_OVERLAP`;
- `UNIQUENESS`;
- `CONSERVATION`;
- `IMMUTABILITY`;
- `STATE_TRANSITION`;
- `NON_SUBSTITUTION`;
- `VERSION_BINDING`;
- `ISOLATION`;
- `POPULATION_COMPLETENESS`;
- `MONOTONICITY`;
- `ORDERED_GATE`;
- `DURABILITY`;
- `RESOURCE_BOUND`;
- `CALCULATION_EXACTNESS`;
- `NO_OPTIONAL_DEPENDENCY`.

Concurrency enforcement:

- `CC-0` structural/registry/application validation with no concurrent predicate;
- `CC-1` single-row expected version;
- `CC-2` stable guard-row lock and recomputation;
- `CC-3` unique/partial-unique/exclusion/check/foreign-key constraint;
- `CC-4` SERIALIZABLE predicate transaction;
- `CC-5` technical advisory lock;
- compound profiles may use more than one class.

---

# 3. Global concurrency rules

## 3.1 Guard materialization — W-112

A CC-2 guard row must exist before it can be locked.

Permitted creation:

1. eagerly in the same governed command that creates its authoritative parent; or
2. lazily by `INSERT ... ON CONFLICT DO NOTHING` using the exact unique guard identity, followed by `SELECT ... FOR UPDATE` before reading any contributors.

A missing-row `SELECT FOR UPDATE` is never accepted as a lock.

Guard creation is idempotent and cannot establish business truth beyond the existence of the technical guard.

## 3.2 Global lock order — W-113

All guard acquisition uses one global lexicographic tuple:

`(guard_class_rank, tenant_id_bytes, guard_scope_type_rank, canonical_guard_key_bytes)`

- ranks are product-owned and versioned;
- UUIDs use canonical 16-byte ordering;
- text/compound keys use canonical UTF-8 or fixed binary encoding after registered normalization;
- duplicate guards are de-duplicated before acquisition;
- profiles cannot define a local alternative order.

## 3.3 Retry boundary

Serialization/deadlock retry:

- preserves logical command and idempotency identity;
- retries the entire transaction;
- is allowed only before any external effect may exist;
- uses the registered maximum and bounded jitter;
- returns typed exhaustion/conflict;
- never converts a business-invariant failure into retry.

## 3.4 Effective-period non-overlap

`EFFECTIVE_PERIOD_NON_OVERLAP` is a first-class invariant.

Default mechanism:

- CC-3 `EXCLUDE USING gist` over tenant/scope identity and exact effective range, using `btree_gist` where required;
- partial unique constraint for open-ended single-current rows where exact;
- CC-4 only when scope/range membership cannot be represented exactly.

Natural two-row “close old + insert new” logic without the constraint/serializable profile is prohibited.

---

# 4. Registered invariants

## A. Product boundary, authority, tenancy and configuration

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-001 | Deterministic A0–A3 cannot require P07, named connector, supplier account/network, chat/AI or warehouse | NO_OPTIONAL_DEPENDENCY | MR-002; Phase 1 master §3 | build/runtime dependency graph, capability flags | B01/B15 | NO | CC-0 dependency/boot profile; providers absent test |
| INV-002 | P07 is the sole independent XL | STRUCTURAL_BOUNDARY | MR-003; P1.1/P1.5 | module graph, deployables, schemas | B01/B15/B16 | NO | architecture dependency scan; no second platform |
| INV-003 | No universal ProcurementCase/Package/Demand root owns end-to-end truth | STRUCTURAL_BOUNDARY | MR-004; ADR-0003 | requirements, sourcing, submissions, decisions | B05–B09 | NO | ownership manifest and domain tests |
| INV-004 | Code/optional-block activation follows ordered authorization gates | ORDERED_GATE | MR-006/MR-088 | project state, release authorization, V1/V2/V4/V6 decisions | B01/B15/B16/B18 | YES | CC-1 decision version + activation guard; unauthorized start fails |
| INV-005 | Every load-bearing fact/action binds exact tenant, project, authority context and principal | ISOLATION | MR-007 | all tenant authoritative rows/operations | B02+ | YES | FORCE RLS + `withExecutionContext` + application authorization |
| INV-006 | Internal role/delegation/DOA never substitutes for external task grant | NON_SUBSTITUTION | MR-008 | authority grants, external grants, task sessions | B02/B06/B11 | YES | typed foreign keys/guards; hostile substitution test |
| INV-007 | Exactly one authoritative writer exists per fact/event grain and effective period | AUTHORITY_EXCLUSIVITY | MR-009 | OwnershipAssignment, AuthoritySourceBinding | B02 | YES | CC-3 effective-range exclusion; CC-4 fallback |
| INV-008 | Effective ownership/authority/delegation/DOA periods do not overlap for the same normalized scope | EFFECTIVE_PERIOD_NON_OVERLAP | MR-009/MR-011; P1.4 | ownership, delegation, DOA, authority-context versions | B02 | YES | CC-3 GiST exclusion; concurrent activation test |
| INV-009 | Connector, workflow, evidence, report and AI never become business authority | STRUCTURAL_BOUNDARY | MR-010 | adapters, workflows, evidence, reports, AI proposals | B02/B04/B12/B13/B18 | YES | no source-table grants; registered command only |
| INV-010 | Load-bearing policy/configuration versions never silently rebind in-flight work | VERSION_BINDING | MR-011 | operation/config/policy/schema/metric/provider versions | B02/B14/B18 | YES | immutable version FK; expected version; compatibility disposition |
| INV-011 | Effective configuration/policy versions do not overlap for the same registered scope unless the registry explicitly permits a set | EFFECTIVE_PERIOD_NON_OVERLAP | MR-011 | policy/configuration/operation definitions | B02 | YES | CC-3 exclusion/partial unique; CC-4 fallback |
| INV-012 | Initial tenant/context/configuration establishment occurs only through a governed bootstrap operation | STATE_TRANSITION | MR-012 | tenant bootstrap, initial policy/context | B02 | YES | unique bootstrap identity + operation guard/idempotency |
| INV-013 | Cross-tenant direct/model-mediated business influence is denied by default | ISOLATION | MR-013/MR-086 | all authoritative/derived/cache/search/AI/provider paths | B02/B12/B14/B18 | YES | FORCE RLS, namespace isolation, provider policy tests |
| INV-014 | Every primary/derived/provider path has one declared residency class and governed migration | VERSION_BINDING | MR-014/MR-076 | data-store/path/residency profiles | B14/B18 | YES | profile completeness, release gate, migration manifest |

### Effective-period scope families controlled by INV-008/INV-011

The non-overlap compiler must enumerate at minimum:

- fact ownership assignment;
- authority context;
- internal role/delegation/DOA;
- tenant residency profile;
- operation definition activation;
- field/schema/constraint profile activation;
- metric/operator/materiality/use policy activation;
- connector authority/cutover profile;
- sourcing response schema activation per event/member scope;
- Commitment basis/profile version where P07 applies;
- AI capability/provider/evaluation profile activation;
- release compatibility phase per environment.

Each family has an exact normalized scope key and overlap policy. “Not applicable” requires an explicit register disposition.

## B. Procurement, sourcing and commercial truth

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-015 | RequirementAllocation owns scope-consumption lineage | STRUCTURAL_BOUNDARY | MR-015 | requirement source, allocation leaves | B05 | YES | one owner/write path; FK lineage |
| INV-016 | Sum of active leaf allocation cannot exceed current authorized quantity | CONSERVATION | MR-015; P1.2 Review A | AuthorizedRequirementBasis, RequirementAllocation | B05 | YES | CC-2 basis guard, recompute under lock, property/race test |
| INV-017 | ProcurementPackage is optional grouping and cannot own/destroy allocation lineage | NON_SUBSTITUTION | MR-015 | package membership, allocations | B05 | YES | allocation survives package removal; no cascade truth loss |
| INV-018 | Supplier source, normalized value, buyer adjustment and supplier-confirmed basis are distinct immutable layers | NON_SUBSTITUTION | MR-016 | response revision, normalization, adjustment, confirmed basis | B07/B08 | YES | separate tables/identities, append-only revisions, no overwrite |
| INV-019 | Recommendation, approval, AwardDecision and Commitment are distinct transitions | NON_SUBSTITUTION | MR-017 | recommendation, approval, award, commitment | B09/B16 | YES | separate operation/state types; transition guards |
| INV-020 | One bounded semantic Commitment core supports permitted profiles only | STRUCTURAL_BOUNDARY | MR-018 | Commitment/profile | B16 | YES | registered profile set; no parallel commitment roots |
| INV-021 | ScopeBasis, ValuationBasis and CapabilityProfile remain orthogonal typed axes | STRUCTURAL_BOUNDARY | MR-019 | commitment basis/profile versions | B16 | YES | independent FKs/registry constraints; incompatible combination guard |
| INV-022 | Every commercial effect binds exactly one permitted subject grain before occurrence | UNIQUENESS | MR-021 | effect, component/obligation subject | B16/B17 | YES | CC-3 subject XOR/check/FK; no orphan effect |
| INV-023 | Every economic value contributes once to its conservation group | CONSERVATION | MR-020/MR-050 | contribution identity, lineage, conservation group | B16/B17/B12 | YES | CC-2 lineage guard + CC-3 unique contribution identity |
| INV-024 | CommercialEffectVector uses only the closed registered effect algebra | STRUCTURAL_BOUNDARY | MR-020 | effect type/vector registry | B16 | YES | registry FK/check; tenant cannot create type |
| INV-025 | Money/rates use exact decimal, explicit currency and versioned calculation/rounding/FX/tax purpose | CALCULATION_EXACTNESS | MR-022 | money values, calculation executions | B01/B08/B12/B16/B17 | YES | numeric strings, decimal executor, policy FK, property tests |
| INV-026 | Claim, assessment, certification, accounting posting and payment never substitute | NON_SUBSTITUTION | MR-023 | claim/certification/external posting/payment facts | B17/B13 | YES | separate types/sources; no transition shortcut |
| INV-027 | Physical, certified/commercial, accounting-posted and paid actual families never substitute | NON_SUBSTITUTION | MR-024 | actual family facts/reports | B12/B17 | YES | family registry and report compatibility guard |
| INV-028 | Correction never mutates original economic occurrence in place | IMMUTABILITY | MR-025 | original occurrence, correction occurrence | B03/B08/B17 | YES | append-only, original hash/version, correction FK |
| INV-029 | Workflow outcome may authorize but never performs direct commercial mutation | STRUCTURAL_BOUNDARY | MR-026 | workflow/control result, operation invocation | B02/B09/B16 | YES | no source-table grant; separate command required |
| INV-030 | Immutable identity is separate from display/legal number | NON_SUBSTITUTION | MR-027 | entity ID, number allocation | B02/B06/B16 | YES | UUID identity + unique scoped number constraint |
| INV-031 | Number allocation is retry/concurrency safe | UNIQUENESS | MR-027 | numbering guard/sequence/allocation | B02 | YES | CC-5 or CC-2 technical guard + unique constraint/idempotency |
| INV-032 | Commitment attribution is explicit final or visible governed suspense; null/hidden attribution prohibited | STATE_TRANSITION | MR-029 | attribution, suspense identity/resolution | B16 | YES | check/FK, resolution transition guard |
| INV-033 | Applied credit equals min(qualifying value, residual before credit) and cannot carry forward | CONSERVATION | P1.5 BL-17; GT-08 | minimum/credit lineage, applications | B16/B17 | YES | CC-2 lineage guard + CC-3 contribution identity |
| INV-034 | Exact active exclusive declared scope cannot overlap | EFFECTIVE_PERIOD_NON_OVERLAP | P1.5 Review A BL-02 | normalized scope activation | B16 or owning module | YES | CC-3 partial unique/GiST exclusion; CC-4 fallback |

## C. Evidence, documents and communication

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-035 | Every load-bearing value/action binds exact evidence record/version/source/location | VERSION_BINDING | MR-030 | evidence binding/reliance/operation | B04/all domain blocks | YES | immutable FK/version; operation guard |
| INV-036 | Hash/content/URL/object identity never substitutes for EvidenceRecord/EvidenceVersion/authenticity/authority | NON_SUBSTITUTION | MR-031 | evidence metadata/object payload | B04 | YES | typed separation; no object-tag truth path |
| INV-037 | Issued artifact/member set is immutable; changes create new version/supersession | IMMUTABILITY | MR-032 | ArtifactBuildIntent, IssuedArtifactVersion, member manifest | B04/B12 | YES | append-only + unique version/member manifest |
| INV-038 | Issue, dispatch, provider acceptance, delivery, read, acknowledgment, response and domain effect are separate facts | NON_SUBSTITUTION | MR-033 | communication occurrences/effects | B04/B13 | YES | closed occurrence types; no inferred transition |
| INV-039 | First accepted communication satisfaction creates one canonical snapshot per exact rule/subject | UNIQUENESS | MR-034 | CommunicationSatisfactionSnapshot | B04 | YES | CC-3 unique canonical key + immutable rule/member versions |
| INV-040 | Owning-domain effect is established at most once from a valid snapshot | UNIQUENESS | MR-034 | snapshot, domain establishment occurrence | B04/owning domain | YES | CC-3 unique effect establishment + operation guard |
| INV-041 | Later callback/evidence correction cannot silently reverse or retime an established effect | IMMUTABILITY | MR-035 | evidence correction, established effect | B04/owning domain | YES | no update grant; separate correction operation |
| INV-042 | Retention/redaction/disposition/hold cannot erase required identity, authority, audit or financial meaning | IMMUTABILITY | MR-036 | evidence/artifact versions, holds, tombstones | B04/B14 | YES | lifecycle state machine, hold precedence, restore tests |
| INV-043 | External content cannot instruct system/agent behavior | STRUCTURAL_BOUNDARY | MR-037 | files/messages/imports/AI context | B04/B13/B18 | YES | parser/content isolation, no instruction execution |
| INV-044 | Capture/acceptance/issue acknowledgments never imply a later evidence state | STATE_TRANSITION | P1.6; P2 cross-store protocol | UploadSession/EvidenceVersion/IssuedArtifact | B04 | YES | closed state machine + separate commands |
| INV-045 | Accepted evidence/issued artifact references must resolve to exact verified object version/checksum or explicit deficiency | DURABILITY | MR-031/MR-032/MR-073 | DB metadata, object versions, recovery manifest | B04/B14 | YES | cross-store protocol and skewed restore proof |

## D. Operations, asynchronous effects, connectors and migration

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-046 | Operation meaning belongs to exactly QUERY, PROPOSAL, COMMAND or ASYNC_OPERATION | STRUCTURAL_BOUNDARY | MR-038 | operation registry | B02 | YES | closed enum/registry; no fifth state-changing path |
| INV-047 | Proposal never becomes authoritative without a separate valid command | NON_SUBSTITUTION | MR-039 | proposal, command, result | B02/B08/B18 | YES | separate identities/tables; activation guard |
| INV-048 | Every state-changing action uses one registered operation; raw DB/event mutation is prohibited | STRUCTURAL_BOUNDARY | MR-040 | routes, workers, modules, DB grants | B02+ | YES | dispatcher/write manifest/grant/architecture tests |
| INV-049 | DomainEvent, IntegrationEvent, TransportEnvelope and ExternalObservation remain distinct | NON_SUBSTITUTION | MR-041 | event/envelope/observation records | B03/B13 | YES | separate schemas/types and authority rules |
| INV-050 | PublicationIntent is immutable and retry retains original source/mapping/disclosure/target basis | IMMUTABILITY | MR-042 | PublicationIntent/TransportAttempt | B03/B13 | YES | append-only intent; attempts reference exact version |
| INV-051 | Effect position uses exactly the seven frozen stages | STATE_TRANSITION | MR-043 | EffectPosition | B03 | YES | closed state machine and transition matrix |
| INV-052 | Timeout/absence never proves no effect after an effect-bearing attempt | NON_SUBSTITUTION | MR-044 | job attempt, transport attempt, effect position | B03/B13 | YES | attempt-ready ordering; no ordinary retry from indeterminate |
| INV-053 | Worker lease loss after possible send cannot re-enter ordinary retry | STATE_TRANSITION | MR-044 | job lease, TransportAttempt, EffectPosition | B03 | YES | fencing token + indeterminate transition |
| INV-054 | Connector is never co-master and conformance changes future eligibility only | STRUCTURAL_BOUNDARY | MR-045 | connector profile, observation, domain facts | B13 | YES | no source write grant; explicit owning command |
| INV-055 | Migration cannot fabricate state, balance, provenance or history | STRUCTURAL_BOUNDARY | MR-046 | migration manifest/items/target operations | B13 | YES | import classes, acceptance profile, reference limitation |
| INV-056 | Manual/file/provider-neutral path remains complete and enabled | NO_OPTIONAL_DEPENDENCY | MR-047 | A0–A3 surfaces/adapters | B06–B15 | NO | providers disabled golden-thread test |

## E. Reporting, analytics and controls

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-057 | Every load-bearing metric binds exact definition/source/grain/population/contribution/formula/time/quality/use/access versions | VERSION_BINDING | MR-048 | MetricDefinition/Execution | B12 | YES | immutable version FKs and source-cut identity |
| INV-058 | Calculation uses only product-registered deterministic operators/plans | STRUCTURAL_BOUNDARY | MR-049 | operator registry, calculation execution | B12 | YES | registry activation; SQL/reference equivalence |
| INV-059 | Correction contribution distinguishes occurrence, economic lineage, conservation group and disposition | NON_SUBSTITUTION | MR-050 | contribution records | B12/B17 | YES | separate identities + INV-023 guard/constraint |
| INV-060 | Declared eligible, evaluated, accessible/restricted and disclosable populations remain distinct | NON_SUBSTITUTION | MR-051 | population assessment | B12 | YES | typed population sets, immutable execution members |
| INV-061 | Zero/total/complete claims require proven complete population | POPULATION_COMPLETENESS | MR-051 | metric/report execution | B12 | YES | completeness proof guard; no unknown-as-zero |
| INV-062 | Incomplete population result is exactly block, explicit evaluated subset or deterministic range | STATE_TRANSITION | MR-052 | execution/use disposition | B12 | YES | closed enum/validation; no partial point total |
| INV-063 | Effective/recorded/as-of/known-at and actual families remain explicit and compatible | NON_SUBSTITUTION | MR-053 | metric/report time basis | B12 | YES | compatibility matrix and version binding |
| INV-064 | Quality/use cannot be upgraded by report title, composition or aggregation | MONOTONICITY | MR-054 | quality vector, use assessment, report members | B12 | YES | aggregate use is intersection/most restrictive |
| INV-065 | Issued report snapshot is immutable; recalculation/restatement/supersession are new records | IMMUTABILITY | MR-055 | ReportSnapshot/Restatement | B12 | YES | append-only version and supersession FK |
| INV-066 | New reliance on an old report requires current SubsequentRelianceAssessment | STATE_TRANSITION | MR-056 | issued report, reliance assessment | B12 | YES | command guard/current policy binding |
| INV-067 | Portfolio aggregation preserves contribution identity and blocks incompatible currency/time/actual/access | CONSERVATION | MR-057 | aggregate execution/members/contributions | B12 | YES | CC-2/CC-3 contribution identity + compatibility guards |
| INV-068 | Tenant-private supplier analytics/control queues never become authoritative supplier/domain truth | STRUCTURAL_BOUNDARY | MR-058 | analytics, controls, queues | B12 | YES | derived-only grants/events; no domain command path |
| INV-069 | Every report/metric uses an exact reconstructable source cut | VERSION_BINDING | P1.8; W-105 | execution input set/watermark | B12 | YES | one of three closed source-cut mechanisms |

## F. Interaction and external participation

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-070 | Every affordance is one of six frozen interaction classes; hidden commands prohibited | STRUCTURAL_BOUNDARY | MR-059 | UI actions/routes | B10/B11 | YES | interaction manifest/Playwright/route-operation mapping |
| INV-071 | Consequential action binds exact target/member/version, authority, evidence, preview and same-principal confirmation | VERSION_BINDING | MR-060 | preview, confirmation, command | B02/B10/B11 | YES | immutable digest, expected versions, invalidation rules |
| INV-072 | Continuation anchor exists and is retrievable before effect-bearing transmission | STATE_TRANSITION | MR-061 | continuation anchor, command | B02/B10/B11 | YES | pre-transmission persistence + lookup-only recovery |
| INV-073 | Bulk execution uses exactly one of four modes with item identities/dependencies/unknown effects | STRUCTURAL_BOUNDARY | MR-062 | bulk operation/items | B02/B10/B11 | YES | closed mode enum and item result identities |
| INV-074 | Navigation/tasks/queues are derived and cannot own/write business truth | STRUCTURAL_BOUNDARY | MR-063 | task/queue/navigation projections | B10/B12 | YES | read-only source grants; registered operations only |
| INV-075 | External participation never requires a supplier network/account | NO_OPTIONAL_DEPENDENCY | MR-064 | grants, secure tasks, email/file/buyer capture | B06/B07/B11 | NO | first-participation no-account test |
| INV-076 | External response binds exact grant, actor assurance, event/member/schema and disposition | VERSION_BINDING | MR-065 | ExternalTaskGrant, response revision | B06/B07/B11 | YES | immutable FKs, acceptance policy guard |
| INV-077 | Only valid or explicitly allowed-late response enters governed response population | STATE_TRANSITION | MR-065 | response disposition/population | B07/B12 | YES | closed disposition and population filter |
| INV-078 | Tenant labels/configuration cannot create field semantics, formula, state or effect | STRUCTURAL_BOUNDARY | MR-066 | field/schema registry, tenant config | B06/B08 | YES | product-owned registry and monotonic config |
| INV-079 | Source-to-normalized promotion is a cited proposal plus explicit acceptance command | NON_SUBSTITUTION | MR-067 | source value, normalization proposal/result | B08 | YES | separate identities and command transition |
| INV-080 | Limitation meaning survives internal/external UI, export, print and future chat | MONOTONICITY | MR-068 | result limitations/render/export | B10/B11/B12 | YES | parity contracts and hostile render tests |
| INV-081 | Every AI/chat-supported action has a conventional equivalent | NO_OPTIONAL_DEPENDENCY | MR-070 | surfaces/capabilities | B10/B11/B18 | NO | AI package absent test |

## G. NFR, durability, security and release

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-082 | Every NFR claim binds exact workload/SLI/population/window/threshold/criticality/evidence/conformance | VERSION_BINDING | MR-071/MR-072 | NFR definitions/executions | B14 | YES | registry completeness and measurement-health proof |
| INV-083 | Acknowledged authoritative/evidence/issued/idempotency records have semantic RPO 0 | DURABILITY | MR-073 | DB commits/object references/idempotency | B02–B04/B14 | YES | crash/failover/restore tests |
| INV-084 | Restore/retry/dead-letter/degradation preserves tenant/effect/evidence meaning | DURABILITY | MR-074 | recovery manifests, jobs, effect positions | B03/B04/B14 | YES | full restore and golden-thread replay |
| INV-085 | Telemetry never substitutes for audit/domain truth and excludes prohibited sensitive content | NON_SUBSTITUTION | MR-075 | traces/logs/metrics/audit | B01/B14 | YES | separate stores, redaction/cardinality tests |
| INV-086 | Security/privacy/residency/lifecycle applies to every primary and derived copy | ISOLATION | MR-076 | DB/object/search/cache/log/AI/provider copies | B14/B18 | YES | copy inventory/profile completeness and deletion/hold tests |
| INV-087 | File/import/export/parser/scan/quota limits are finite and cannot silently truncate or create semantics | RESOURCE_BOUND | MR-077 | file/import/export executions | B04/B13/B14 | YES | explicit limit disposition; hostile archive/timeout tests |
| INV-088 | Release/rollback/in-flight fallback preserves exact versions and declared compatibility | VERSION_BINDING | MR-078 | ReleaseCompatibilityManifestVersion, jobs/tasks/sessions | B14 | YES | admission gate, expand/contract, old reader tests |

## H. AI readiness and authority

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-089 | Every AI capability/prompt/tool/authority/context/evaluation/resource policy is product-authored/versioned | STRUCTURAL_BOUNDARY | MR-079 | AI registries/profiles | B18 | YES | product-only write path/version FKs |
| INV-090 | Tenant AI configuration is monotone narrowing only | MONOTONICITY | MR-080 | tenant capability configuration | B18 | YES | ConfigurationMonotonicityCheck under expected version/serializable if multi-row |
| INV-091 | AI run/proposal/output binds exact provider/model/prompt/tool/source-cut/citation/context/review lineage | VERSION_BINDING | MR-081 | AI run/proposal/output | B18 | YES | immutable provenance/member bindings |
| INV-092 | AI completeness language requires proven complete context/population | POPULATION_COMPLETENESS | MR-082 | AI context/run/output | B18 | YES | same population grammar as B12 |
| INV-093 | Only current capability-specific SUFFICIENT_PASS provider/model profile activates | ORDERED_GATE | MR-083 | provider/model/evaluation profile | B18 | YES | effective-range non-overlap + activation guard |
| INV-094 | Agent authority remains within L0–L6; generative L6 prohibited; L5 exact confirmed digest only | AUTHORITY_EXCLUSIVITY | MR-084 | capability/agent run/command | B18 | YES | closed level registry and command digest equality |
| INV-095 | Sub-agent authority is intersection-only and effect-indeterminate pauses continuation | MONOTONICITY | MR-085 | parent/sub-agent authority, effect position | B18 | YES | intersection computation and state guard |
| INV-096 | Retrieval/cache/memory/evaluation/provider paths are tenant-scoped and provider training/cross-tenant influence prohibited | ISOLATION | MR-086 | AI data paths | B18/B14 | YES | namespace/RLS/provider contract tests |
| INV-097 | AI/provider removal leaves deterministic A0–A3 complete | NO_OPTIONAL_DEPENDENCY | MR-087 | deterministic build/runtime | B15/B18 | NO | AI package/provider disabled golden-thread suite |

## I. Validation, evidence and honesty gates

| ID | Invariant | Class | Frozen source | Participating objects | Owner | Concurrency | Enforcement / proof |
|---|---|---|---|---|---|---|---|
| INV-098 | Architecture, primary evidence, comprehension, build, P07, NFR, AI, pilot and commercial decisions remain ordered/separate | ORDERED_GATE | MR-088 | validation decisions/project state | B15 | YES | prerequisite graph and versioned decisions |
| INV-099 | V1 contractor/supplier evidence cannot be marked passed without required sample and independent decision | ORDERED_GATE | MR-089 | ValidationGateDecision/evidence set | B15 | YES | sample/member constraints and reviewer identity |
| INV-100 | V2 prototype cannot pass without required participants and zero unresolved critical misunderstanding | ORDERED_GATE | MR-090 | prototype observations/decision | B15 | YES | participant/criticality constraints and independent decision |
| INV-101 | Deterministic thin slice cannot pass with unresolved architecture invention | ORDERED_GATE | MR-091 | block manifests/golden-thread audit | B15 | YES | zero-unresolved-question gate |
| INV-102 | Architecture/build evidence cannot be represented as product/market/commercial validation | NON_SUBSTITUTION | MR-092 | status/reports/release decisions | B15 | YES | separate decision types and wording/status controls |

---

# 5. Bidirectional completeness enforcement

## 5.1 Frozen-source → register

`P2_1_FROZEN_CLAUSE_INVARIANT_COVERAGE_MATRIX_V0_1.md` maps every MR-001–MR-092 and each incorporated Phase 2 hostile-watch invariant to:

- one or more `INV-*` entries; or
- an explicit `HYPOTHESIS_ONLY`, `EVIDENCE_GATE`, `LEGAL_PARAMETER`, `ACCESSIBILITY_TARGET` or `NON_STATE_REQUIREMENT` disposition with owning block/test.

CI/freeze fails when any source row has no disposition.

## 5.2 Register → implementation

Every invariant entry must map to:

- owning block;
- participating object families;
- exact concurrency/integrity profile or explicit non-concurrent enforcement;
- minimum hostile test;
- block completion evidence.

CI/operation activation fails when an invariant has no implementation mapping.

## 5.3 Mutable object/operation → register

Every mutable object and state-changing operation in `PhysicalWriteOwnershipManifest` and `OperationRegistry` lists all participating invariant IDs.

The compiler fails when:

- an object/operation references an unknown invariant;
- a frozen invariant lists an object/operation that omits the reverse reference;
- a concurrency-sensitive invariant lacks a `ConcurrencyProfileVersion`;
- an effective-dated object lacks explicit overlap disposition;
- a conservation/uniqueness/exclusivity invariant lacks exact mechanism and hostile test.

## 5.4 Incremental completeness assertion

Every `BlockCompletionEvidenceManifest` must state:

> `No frozen or newly encountered load-bearing invariant is implemented without an InvariantRegisterVersion entry. Newly discovered invariant candidates are listed below and block PASS until reconciled.`

A builder cannot classify a new invariant as a mere code detail.

---

# 6. Register result

- registered invariant families: **102**;
- frozen MR rows with coverage dispositions: **92/92** through the companion matrix;
- effective-dated object families with explicit overlap rule: mandatory compiler inventory;
- concurrency-sensitive invariants without a mechanism: **0 claimed**;
- mutable-object reverse mappings without compiler obligation: **0 permitted**;
- architecture gaps introduced: **0 claimed**, subject to internal and independent hostile audit.