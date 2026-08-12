# Construction Procurement OS — Combined B02-C3/C4 + B03 Independent Hostile Audit Packet v0.1

**Date:** 2026-08-12  
**Status:** READY FOR INDEPENDENT HOSTILE AUDIT / NO PASS CLAIM  
**Predecessor audit boundary:** B02-C1/C2 independently closed at `76d5c260cf48c4b3bce842687d3cbe1690b228d8`  
**Current B02 base:** `5e90ce775e15d94178f4ccd1540970e18b54e352`  
**B03 implementation evidence head:** `e7a453cd7702d3816984a4152af298e9036613c8`  
**B03 verified PR merge ref:** `67d97e360c2c8c6e9e8a643915541b8d0aad930e`  
**B03 verification run:** `31583094396` — SUCCESS  
**PR #5:** DRAFT / DO NOT MERGE

---

# 1. Audit mission

Perform an independent hostile review of every load-bearing implementation introduced after the already-closed B02-C1/C2 audit boundary that is required to clear the accelerated B02/B03 gate.

The review scope is exactly:

1. **B02-C3 — Usage / Lifecycle / Offboarding**
2. **B02-C4 — Project context + governed workspace/session/persistence/product surface**
3. **B03 — Async / Event / Publication / Reconciliation kernel**
4. C1/C2 only where C3/C4/B03 materially rely on or can regress those boundaries.

Treat every internal/CI PASS as a claim to attack. Do not rubber-stamp the implementation evidence narrative.

The auditor must return FAIL for any demonstrated load-bearing defect in tenant isolation, authority, entitlement/offboarding, immutable history, exact operation/idempotency identity, external-effect handling, publication isolation, concurrency, worker fencing, migration correctness or database authority.

Do not fail for ordinary styling, unfinished procurement-domain screens, provider choice, later B04–B06 domain attributes, SSV-1 timing already amended by owner governance, or the known later F5 dependency advisory unless one of those items creates a concrete present invariant defect.

---

# 2. Governance and gate state

## 2.1 C1/C2 predecessor

B02-C1/C2 independently closed at:

`76d5c260cf48c4b3bce842687d3cbe1690b228d8`

Accepted predecessor evidence:

`04_phases/phase_2_build_decomposition/evidence/B02_C1_C2_INDEPENDENT_CLOSURE_EVIDENCE_V1_0.md`

The prior hostile audit closed bootstrap-lineage privilege escalation, entitlement collision/coherence, same-transaction guard advancement, database public-surface boundary, product-offering immutability and exact-head evidence blockers.

Do not reopen C1/C2 without a concrete regression caused by later code.

## 2.2 Accelerated sequencing

`CHG-0007_ACCELERATED_B02_B03_IMPLEMENTATION_SEQUENCING_V1_0.md` authorized B02-C4 and provisional B03 implementation before one combined independent audit. It did not weaken semantics or gates.

`CHG-0008_SSV1_OPERATIONAL_MVP_DEFERRAL_V1_0.md` subsequently changed only SSV-1 timing:

`B02 technical green → B03 verification → combined independent audit → owner acceptance → B04/B05/B06 may proceed → operational procurement MVP → three-practitioner SSV-1 → remediation before production/release acceptance.`

SSV-1 remains mandatory and is not waived. Its deferral is not an audit blocker unless the implementation now exposes a genuinely consequential practitioner surface that invalidates the recorded rationale.

## 2.3 Required decision from this audit

The audit may return only one gate disposition:

**PASS candidate wording:**

`PASS — combined post-C1/C2 B02-C3/C4 and B03 hostile audit closed; owner may record B02/B03 successor acceptance under CHG-0008.`

**FAIL wording:**

`FAIL — combined post-C1/C2 audit remains open; B04–B06 stay locked until the blockers below are remediated and independently rechecked.`

Independent PASS does not merge any PR and does not substitute for project-owner acceptance.

---

# 3. Mandatory supporting documents and code surfaces

A reviewer with repository access must inspect the exact files below. A reviewer without repository access must be supplied these files or exact rendered contents; do not audit from this summary alone when source can be supplied.

## Frozen/governance basis

- `04_phases/phase_2_build_decomposition/P2_1_INVARIANT_REGISTER_V0_1.md`
- `04_phases/phase_2_build_decomposition/P2_2_SSS_BUILD_PROGRAM_OVERLAY_V1_0_FROZEN.md`
- `04_phases/phase_2_build_decomposition/P2_2_BLOCK_COMPLETION_EVIDENCE_MANIFEST_TEMPLATE_V0_3.md`
- `04_phases/phase_2_build_decomposition/change_control/CHG-0007_ACCELERATED_B02_B03_IMPLEMENTATION_SEQUENCING_V1_0.md`
- `04_phases/phase_2_build_decomposition/change_control/CHG-0008_SSV1_OPERATIONAL_MVP_DEFERRAL_V1_0.md`

## Prior and current evidence

- `04_phases/phase_2_build_decomposition/evidence/B02_C1_C2_INDEPENDENT_CLOSURE_EVIDENCE_V1_0.md`
- `04_phases/phase_2_build_decomposition/evidence/B02_C3_USAGE_LIFECYCLE_OFFBOARDING_EVIDENCE_V0_1.md`
- `04_phases/phase_2_build_decomposition/evidence/B02_C4_GOVERNED_PRODUCT_SURFACE_EVIDENCE_V1_0.md`
- `04_phases/phase_2_build_decomposition/evidence/B03_ASYNC_PUBLICATION_RECONCILIATION_EVIDENCE_V0_1.md`

## Database implementation

- `migrations/sql/000006_b02_c3_usage_offboarding.sql`
- `migrations/sql/000007_b02_c3_usage_credit_trigger_privilege.sql`
- `migrations/sql/000008_b02_c4_project_context.sql`
- `migrations/sql/000009_b02_c4_project_version_trigger_privilege.sql`
- `migrations/sql/000010_b02_c4_workspace_access_contract.sql`
- `migrations/sql/000011_b03_async_publication_reconciliation.sql`
- `migrations/sql/000012_b03_async_kernel_hardening.sql`
- `migrations/sql/000013_b03_publication_effect_isolation.sql`

## Hostile tests

- `packages/database-core/integration/platform-c3-usage-offboarding.integration.test.ts`
- `packages/database-core/integration/platform-c4-project-context.integration.test.ts`
- `packages/database-core/integration/platform-b03-async-kernel.integration.test.ts`
- `packages/database-core/integration/platform-c1-c2-audit-remediation.integration.test.ts`
- `packages/database-core/integration/concurrency.integration.test.ts`
- `packages/database-core/integration/execution-context.integration.test.ts`
- `packages/database-core/integration/migrations.integration.test.ts`
- `packages/database-core/integration/catalog-scan.integration.test.ts`

## Application/session/contracts

- `packages/contracts/src/usage.ts`
- `packages/contracts/src/usage.test.ts`
- `packages/contracts/src/async.ts`
- `packages/contracts/src/async.test.ts`
- `packages/platform-application/src/persistence/`
- `apps/api/src/app.ts`
- `apps/api/src/session-resolver.ts`
- `apps/api/src/session-resolver.test.ts`
- `apps/api/src/main.ts`
- `apps/web-internal/src/main.tsx`

## Architecture and exact verification

- `scripts/check-boundaries.mjs`
- `scripts/check-database-public-surface.mjs`
- `.github/workflows/b03-provisional-verification.yml`
- B03 Actions run `31583094396`, job `94070587038`

---

# 4. Frozen invariant pressure relevant to this cycle

The audit is not limited to these rows, but they are the most direct frozen invariants for the changed implementation.

## Global/platform invariants

- `INV-005`: every load-bearing fact/action binds exact tenant, project, authority context and principal.
- `INV-007`: exactly one authoritative writer exists per fact/event grain/effective period.
- `INV-009`: connector/workflow/evidence/report/AI never becomes business authority.
- `INV-010`: load-bearing policy/configuration versions never silently rebind in-flight work.
- `INV-013`: cross-tenant direct/model-mediated business influence denied by default.
- `INV-028`: correction never mutates original economic occurrence in place.
- `INV-046`: operation meaning remains QUERY/PROPOSAL/COMMAND/ASYNC_OPERATION only.
- `INV-048`: every state-changing action uses one registered operation; raw mutation prohibited.

## B03 direct invariants

- `INV-049`: DomainEvent, IntegrationEvent, TransportEnvelope and ExternalObservation remain distinct.
- `INV-050`: PublicationIntent is immutable; retry retains original source/mapping/disclosure/target basis.
- `INV-051`: EffectPosition uses exactly seven frozen stages.
- `INV-052`: timeout/absence never proves no effect after an effect-bearing attempt.
- `INV-053`: lease loss after possible send cannot re-enter ordinary retry.

The reviewer should identify any newly encountered load-bearing invariant candidate not registered above or elsewhere in the frozen register. A real new invariant candidate is a blocker until reconciled; absence of such a candidate must not be assumed merely because CI is green.

---

# 5. B02-C3 implementation under attack

## 5.1 Intended semantics

B02-C3 introduces append-only `platform.metered_usage_occurrence` rather than a mutable balance.

Material properties claimed by the implementation evidence:

- exact tenant/subscription/usage-measure binding;
- exact usage-definition-version binding at occurrence time;
- `CONSUME` and `CREDIT` are explicit occurrences;
- a credit references an original consumption and carries provenance;
- original consumption cannot be rewritten;
- concurrent credits serialize against original occurrence and total credits cannot exceed consumption;
- duplicate correlation cannot double-consume;
- FORCE RLS blocks cross-tenant read/write;
- non-ACTIVE commercial lifecycle blocks new entitled commands but does not erase historical read/export truth;
- the read/export floor is not itself business/security authorization.

## 5.2 Required hostile executions

Attack at minimum:

1. duplicate correlation under concurrency;
2. two concurrent credits whose individual values are valid but combined value exceeds original consumption;
3. credit against another tenant/subscription/measure;
4. credit without correction provenance/evidence;
5. usage occurrence outside definition effective interval;
6. rewrite/delete of original usage;
7. direct runtime mutation attempting to bypass same-tenant checks;
8. lifecycle transition to SUSPENDED/CANCELLED/EXPIRED followed by new entitled command;
9. historical authorized read after restriction;
10. any route whereby historical read/export semantics accidentally grants project/tenant/business authorization;
11. semantic rebind to a later usage definition or offering version;
12. any mutable derived balance becoming a second authority.

A concurrency check that only passes sequentially is insufficient.

---

# 6. B02-C4 implementation under attack

## 6.1 Intended semantics

B02-C4 claims a governed production-oriented application path while preserving PostgreSQL authority:

- immutable Project identity plus append-only ProjectVersion descriptive state;
- Project binds tenant + ContractingAuthorityContext;
- active OWNER required at DB boundary for project creation;
- active product access required at same boundary;
- suspension/offboarding blocks new project creation while reads of existing project truth remain available subject to authorization;
- API cannot bypass the restricted platform application persistence seam;
- AuthenticationIdentity → tenant Principal is revalidated inside governed DB execution context;
- provider-neutral verified session seam;
- production fails closed if no verified resolver exists;
- development identity headers are non-production only and cannot override production verification;
- workspace read model is tenant scoped and exposes only derived capability presentation.

## 6.2 Required hostile executions

Attack at minimum:

1. non-OWNER project creation;
2. inactive/superseded OWNER assignment;
3. valid OWNER but INACTIVE/SUSPENDED/CANCELLED/EXPIRED subscription;
4. cross-tenant project ID/authority-context injection;
5. authority-context foreign key from wrong tenant;
6. project/project-version update/delete;
7. spoofed development headers in production;
8. missing verified production session resolver;
9. verified identity rebound to another tenant/principal between web request and DB transaction;
10. direct API import/raw pool path bypassing restricted persistence;
11. security-definer function/view/RLS ownership path that bypasses FORCE RLS;
12. workspace capability display mistaken for authorization authority;
13. offboarded tenant historical read leaking another tenant;
14. product-shell/demo runtime accidentally enabled as governed production persistence.

Presentation quality is not this audit's architecture gate except where UI behavior misrepresents authority or enables a forbidden operation.

---

# 7. B03 implementation under attack

## 7.1 EffectPosition and queue separation

Exact frozen EffectPosition values are:

- `PRE_ACCEPTANCE`
- `ACCEPTED_PRE_EFFECT`
- `EFFECT_INDETERMINATE`
- `EXTERNAL_EFFECT_EMITTED`
- `DOMAIN_EFFECT_ESTABLISHED`
- `TERMINAL_NO_EFFECT`
- `PARTIAL_EFFECT`

Operational job status is separate and cannot substitute for effect position.

Ordinary retry is allowed only when durable evidence remains `ACCEPTED_PRE_EFFECT`.

## 7.2 Event/publication separation

The implementation uses separate objects for:

- accepted `AsyncOperation`;
- `DomainEvent`;
- immutable `PublicationIntent`;
- `IntegrationEvent` materialization;
- `TransportAttempt`;
- `ExternalObservation`;
- reconciliation obligations/occurrences.

A source domain effect and an outbound publication are intentionally separate effect identities. `000013` gives a PublicationIntent its own child async operation. This prevents a source operation already at `DOMAIN_EFFECT_ESTABLISHED` from being used to infer that an email/provider side effect is complete.

## 7.3 Required hostile executions

Attack at minimum:

1. crash before async acceptance commit;
2. accepted commit + lost HTTP/worker result + duplicate retry;
3. same logical/idempotency identity with changed payload/context/version;
4. concurrent duplicate acceptance;
5. worker lease expiry before effect boundary;
6. worker lease expiry after possible effect boundary but before provider result;
7. stale worker heartbeat/completion after a newer fencing token exists;
8. direct transition from indeterminate to no-effect without positive evidence;
9. attempt to requeue ordinary retry from indeterminate;
10. illegal transition rewind or terminal-stage transition;
11. two concurrent claims oversubscribing tenant lane quota;
12. starvation/fairness defect caused by claim ordering;
13. PublicationIntent retry with altered mapping/disclosure/target/payload identity;
14. IntegrationEvent materialization with changed semantic version/content identity;
15. TransportAttempt bound to wrong publication or wrong active job attempt;
16. ExternalObservation treated as domain/business truth without owning command;
17. source DomainEvent completion incorrectly changing publication child effect state;
18. publication child indeterminate state incorrectly changing already-established source domain effect;
19. accepted unresolved variance relabelled as `TERMINAL_NO_EFFECT`;
20. worker role acquiring generic table mutation authority through SECURITY DEFINER/search_path/view/grant mistakes;
21. tenant-facing B03 reader leaking cross-tenant state;
22. migration replay/rebuild masking changed checksums, stale objects or missing constraints.

Add at least five additional scenarios based on actual source inspection.

---

# 8. Migration/replay repair that must be audited, not trusted

During the B03 provisional CI loop, migrations `000011`–`000013` were made re-entrant because separate integration suites use separate migration tracking schemas against one physical test database. Earlier non-reentrant B03 DDL collided with already-created global `ops` objects.

The repair used guarded object creation and drop/recreate where appropriate. The claim to attack is:

> Re-entrancy makes replay safe without allowing schema drift to be silently accepted and without weakening B03 semantic constraints.

Audit specifically:

- whether `CREATE TABLE IF NOT EXISTS` can hide an incompatible pre-existing object in a scenario the migration runner should reject;
- whether guarded named constraints actually verify semantic equivalence or only presence;
- whether trigger/policy drop-recreate is safe under the expected migration transaction boundary;
- whether changed function signatures are removed safely;
- whether checksum tracking still prevents alteration of already-applied committed migrations in a real environment;
- whether these provisional migration edits are acceptable before B03 merge/freeze;
- whether clean rebuild and replay evidence genuinely exercises all `000001`–`000013` objects.

A real migration-history integrity defect is a blocker even if current integration tests pass.

---

# 9. Exact deterministic evidence available to attack

## B02-C3 evidence

Run `31522800965` — SUCCESS:

- Node 24.18.0 / pnpm 10.34.0 / PostgreSQL 18.4
- architecture boundary PASS
- DB public surface PASS
- **60/60** integration tests
- migrations `000001–000007`
- `pending: []`
- catalog scan `[]`

## B02-C4 evidence

Run `31567643770` — SUCCESS:

- architecture boundary PASS
- DB public surface PASS
- platform application/contracts/API/UI/web build/typecheck PASS
- API **7/7** tests
- PostgreSQL integration **65/65** tests
- migrations `000001–000010`
- `pending: []`
- catalog scan `[]`
- governed product shell evidence green

## B03 final implementation evidence

Run `31583094396` — SUCCESS, runner `eth-sim-cpos-ci-01`:

- exact frozen dependency install
- `ARCHITECTURE_BOUNDARY_CHECK_PASS`
- `DATABASE_PUBLIC_SURFACE_CHECK_PASS`
- contracts: **41/41** tests
- B02 API regression: **7/7** tests
- PostgreSQL integration: **13 files / 74 tests / 74 PASS**
- B03 hostile test: **9/9 PASS**
- migrations `000001–000013`
- `pending: []`
- DB catalog scan `[]`

B03 migration checksums in the successful run:

- 000011 `c6b40a58a9339dbd479d72f5f9acb6297cc62169c24682eda804a334d8ba0a39`
- 000012 `3e94ac1a44f5f70e2b59a692ff5f3790e5205b230e76edb92194608840ed65fe`
- 000013 `a3f6ee7c6569fe51268e038c8842219e68eeeac136d675526036954d665ab5c5`

Expected hostile errors appear in PostgreSQL logs because negative tests deliberately exercise forbidden operations. The audit must distinguish expected rejection from unhandled failure rather than treating absence of server errors as a success criterion.

---

# 10. Known non-blocking / deferred items

These are not reasons to pass, but should not be promoted into blockers without demonstrating present invariant impact:

- SSV-1 is owner-authorized deferred under CHG-0008 and remains mandatory at operational MVP.
- The current demo shell is not production persistence and is explicitly isolated from governed production mode.
- Provider-specific email/billing connectors belong later unless their semantics are needed to prove B03 boundaries now.
- The known `nanoid <3.3.17` advisory is a later F5/release blocker unless the auditor demonstrates present runtime exposure that changes the classification.
- B04 evidence/files, B05 requirements/allocation and B06 sourcing/RFQ are intentionally not implemented yet.
- P07 and AI remain gated and cannot be required for deterministic A0–A3.

---

# 11. Required auditor output

Return exactly these sections:

## VERDICT
Use one of the exact gate wordings from section 2.3.

## EXECUTED HOSTILE SCENARIOS
For each material scenario: invariant attacked, source path/function/table, execution/reasoning, result and evidence.

## BLOCKERS
Each blocker must include:

- stable blocker ID `BL-COMB-XX`;
- violated frozen invariant/contract;
- exact source object/path;
- concrete failure mode;
- why current tests do not close it;
- minimum surgical remediation;
- exact recheck required.

If none: `NONE`.

## WATCHES / NON-BLOCKING DEBT
Separate correctness debt from performance/operability/product debt.

## B02-C3 CHECK
Explicit PASS/FAIL and why.

## B02-C4 CHECK
Explicit PASS/FAIL and why.

## B03 CHECK
Explicit PASS/FAIL for INV-049–053 and supporting boundaries.

## TENANT / AUTHORITY / PRIVILEGE CHECK
Cover RLS, SECURITY DEFINER, roles/grants, session binding and cross-tenant paths.

## CONCURRENCY / IDEMPOTENCY CHECK
Cover usage credit conservation, async duplicate handling, quota claims, fencing and serialization behavior.

## MIGRATION / REBUILD CHECK
Explicitly address B03 re-entrancy repair and whether it masks drift.

## REGRESSION CHECK
State whether later code concretely regresses C1/C2.

## INVARIANT COMPLETENESS CHECK
List any newly discovered invariant candidates. `0 unresolved` is required for PASS.

## SUCCESSOR READINESS
State whether B04–B06 may be owner-unlocked under CHG-0008. Do not claim merge authorization.

---

# 12. Audit standard

PASS requires more than green CI. It requires the independent reviewer to find no concrete load-bearing defect after attacking the actual implementation, concurrency paths, privileges and migration semantics.

Do not propose broad rewrites where a surgical repair is sufficient. Do not reopen frozen architecture merely because another design could also work.

Equally, do not preserve provisional code merely because it exists: if it violates frozen semantics, the code must change.

**Audit law:** accelerate coding, not truth.
