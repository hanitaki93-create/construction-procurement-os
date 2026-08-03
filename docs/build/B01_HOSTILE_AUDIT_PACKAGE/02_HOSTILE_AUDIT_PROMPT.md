# B01 Independent Hostile Conformance Audit Prompt

Audit repository `hanitaki93-create/construction-procurement-os`, PR #1, branch `build/b01-engineering-foundation`, against exact implementation commit:

`1344a64454154bc624197b2a885bad9f8da9dafc`

Treat B01 as incorrect until the implementation and reproducible evidence prove otherwise. Prior PASS labels, builder summaries, completion documents and CI conclusions are claims to test, not authority.

## Audit objective

Return one structured verdict on whether B01 is a safe, reproducible and scope-correct engineering foundation that satisfies its frozen requirements without silently implementing later product behavior.

Inspect the complete repository, including source, tests, migrations, scripts, manifests, lockfile, Dockerfiles, Compose files, workflows and build documents. Do not limit review to changed files or documentation.

## Mandatory audit method

1. Confirm the exact commit and completeness of access.
2. Reconstruct the intended B01 requirements from the committed frozen prompt, architecture/build documents and package boundaries.
3. Trace each major claim to implementation and executable evidence.
4. Attempt to falsify the implementation through hostile reasoning and, where possible, clean execution.
5. Distinguish actual defects from explicitly deferred later-block functionality.
6. Record concrete file paths, symbols, commands and evidence for every blocking or minor finding.
7. Use `03_AUDIT_RESPONSE_TEMPLATE.md` for the final response.

## Mandatory audit areas

### 1. Requirement completeness

Attempt to prove that a frozen B01 clause, acceptance gate, required workspace, command, fixture, document or verification lane is missing, weakened, replaced by prose or only partially implemented.

### 2. Architecture and boundaries

Attempt to prove:

- hidden coupling between apps or packages;
- forbidden cross-package source imports;
- public exposure of raw database or infrastructure handles;
- internal/external browser-shell leakage;
- test-only utilities entering product dependency graphs;
- documentation that contradicts executable boundaries;
- an unregistered technical invariant or architecture question.

### 3. Database and exactness

Attempt to prove:

- migration checksum or concurrency failure;
- transaction or connection leakage;
- unsafe isolation fallback;
- write skew, deadlock or lock-order defects;
- effective-period overlap under protected paths;
- missing guard materialization;
- unsafe `int8`, decimal or SQL-scale handling;
- fixture schemas contaminating product migration inventory;
- catalog-security or context-mutation gaps.

### 4. Runtime and configuration

Attempt to prove:

- invalid configuration is accepted;
- liveness/readiness contracts are inconsistent;
- worker lifecycle or named-lane behavior is unsafe;
- process smoke differs from container runtime;
- build metadata or OpenAPI contracts drift;
- hidden runtime dependencies exist.

### 5. Browser separation and accessibility

Attempt to prove:

- internal routes/components can enter the external shell;
- development-only behavior masks production defects;
- Chromium success hides Firefox/WebKit/mobile failure;
- RTL or accessibility checks are superficial or bypassed;
- the build-before-E2E lifecycle still permits stale or missing workspace artifacts.

### 6. Object, scanner and telemetry contracts

Attempt to prove:

- object version IDs or exact-byte retrieval are not guaranteed;
- scanner clean, infected, unavailable, timeout and oversize outcomes collapse into unsafe equivalence;
- telemetry leaks secrets, sensitive or uncontrolled high-cardinality data;
- observability is incorrectly treated as audit truth;
- local substrates create accidental production-provider commitments.

### 7. OCI and supply chain

Attempt to prove:

- any runtime image runs as root;
- package managers or unnecessary build tooling remain in runtime images;
- labels, release identity or health contracts drift;
- lockfile or peer controls are bypassed;
- secret scanning can miss committed material or expose it in logs;
- dependency audit thresholds are weakened;
- SBOM count or image identity is inconsistent;
- fixed high/critical vulnerabilities remain;
- workflow failures can be swallowed.

### 8. Reproducibility and rollback

Attempt to prove:

- a clean checkout cannot install and verify with exact versions;
- generated or local state is required;
- workflows rely on unpinned mutable behavior;
- repository rollback does not restore the base tree;
- infrastructure teardown can damage unrelated resources;
- destructive operations lack explicit scope or confirmation.

### 9. Scope isolation

Search repository-wide for product authority that B01 must not establish, including tenant, identity, supplier, RFQ, quotation, comparison, approval, commitment, purchase order, contract, receipt, invoice, payment, budget, reporting truth, evidence acceptance, P07 or AI decision behavior.

Neutral technical fixtures or documentation references are not automatically defects. Report FAIL when B01 creates executable product tables, routes, services, workflows, decisions or authority belonging to later blocks.

### 10. CI false confidence

Do not accept green checks at face value. Determine whether tests reach the intended code, whether negative controls genuinely fail for the intended reason, whether matrices cover distinct environments, and whether artifacts/logs preserve enough evidence to diagnose failure.

## Verdict rules

Return exactly one overall verdict:

- `PASS`: no unresolved blocker, architecture question or invariant candidate; no correction required before owner acceptance.
- `MINOR PASS`: only non-architectural, non-security, non-correctness observations that may be corrected without reopening implementation evidence. List every item explicitly.
- `FAIL`: at least one missing requirement, correctness defect, security flaw, boundary violation, reproducibility failure, rollback defect, hidden product authority, unresolved architecture question or invariant candidate.

Do not use “pass with notes” or an ambiguous verdict outside these three values.

For every FAIL finding provide:

- severity and category;
- violated frozen requirement or boundary;
- exact file paths and symbols;
- reproducible command, scenario or proof;
- why existing tests failed to detect it;
- minimum safe remediation;
- whether remediation requires full or targeted re-verification.

For every MINOR finding explain why it cannot affect architecture, correctness, security, deterministic builds, runtime behavior, evidence integrity or later-block safety.

## Final constraint

Do not merge, modify the repository, approve B02 or infer project-owner acceptance. Return only the completed audit response using the supplied template.
