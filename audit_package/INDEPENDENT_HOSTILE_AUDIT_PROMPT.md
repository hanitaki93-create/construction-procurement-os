# Independent hostile audit — B04/B05/B06 combined successor wave

You are the independent hostile auditor. Audit the complete source archive in this package as the exact target identified in `AUDIT_TARGET.md`. Do not trust summaries, green CI, prior author claims, or intended behavior where source proves otherwise. Inspect the implementation directly and attempt to falsify its claimed invariants.

## Non-negotiable boundaries

1. B01/B02/B03 semantics are frozen predecessor semantics. They were previously independently hostile-audited PASS and owner-accepted. B04/B05/B06 may depend on them but may not weaken, reinterpret, bypass, or silently fork them.
2. Audit B04, B05 and B06 as one combined successor wave, including cross-block interactions.
3. B07 is out of scope. Do not recommend starting B07 as a remedy.
4. SSV-1 remains deferred, not waived. Do not convert the deferral into implicit acceptance or deletion of the obligation.
5. Missing source required to substantiate a claim means `BLOCKED` / audit not run for that claim, never PASS. This package is intended to be complete-source; identify any material omission if you can prove one.
6. Do not weaken a frozen invariant merely to align tests or current implementation.

## Required source surfaces

Inspect all relevant tracked source, not only changed files. At minimum include migrations 000014–000016 and predecessor migrations/triggers they rely on; contracts and public exports; database-core runtime, hostile tests and shared fixtures; object-store and platform/procurement application layers; API routes, authorization/context adapters, validation/error mapping and tests; internal dashboard and API assumptions; configuration, TypeScript/workspace settings, migration/catalog scripts and focused verification workflow; package manifests/lockfile where toolchain behavior affects correctness.

## Hostile attack areas

Attempt to falsify, at minimum:

- tenant isolation; execution-context confusion; principal/authority scope leakage; cross-tenant identifiers;
- role/authority escalation and frozen predecessor guards;
- version/effective-period overlap, mutable history, snapshot/reference corruption;
- B04 Evidence/Files: upload/finalization lifecycle, object/SHA linkage, acceptance/rejection transitions, immutability, duplicate/idempotent behavior, race/concurrency behavior, communication/evidence provenance;
- B05 Requirements/Allocation: requirement identity/versioning, package relationships, authorized/allocated/available arithmetic, over-allocation/underflow, concurrent allocation, wrong-tenant/package allocation, status/lifecycle bypass;
- B06 Sourcing/RFQ/Grants/Issue: sourcing/RFQ identity, invitation/grant issue, addenda/version semantics, revoke/transfer behavior, stale grants, recipient/authority confusion, issue-state monotonicity, idempotency and concurrent issue/transfer/revoke attempts;
- database constraints/triggers/functions versus application-only assumptions and direct-SQL bypasses;
- transaction boundaries, lost updates, write skew, race windows and retry/idempotency semantics;
- API parsing, exact-optional behavior, validation omissions, authorization-context propagation and response-state mismatch;
- dashboard claims/actions not backed by proven API/database behavior, or materially omitted proven functionality;
- migration ordering/replay/catalog drift and any weakening of B01–B03 semantics.

## Evidence standard

For every blocker or material concern, cite concrete file paths and line ranges/functions. Explain the exploit/failure path, expected invariant, demonstrated violation, and the smallest safe remediation. Distinguish proven blockers from suggestions or unproven concerns.

Review hostile tests critically. A passing test is evidence only if it truly exercises the claimed invariant. Identify vacuous tests, false positives, shared-fixture masking, or tests that merely mirror implementation.

## Verdict contract

End with exactly one overall verdict:

- `PASS` only if B04+B05+B06 are technically and semantically acceptable as a combined successor wave with no unresolved audit blocker;
- `FAIL` if one or more demonstrated blockers exist; or
- `BLOCKED` if independent substantiation cannot be completed because material required evidence/source is unavailable.

A partial pass is not an overall PASS. Do not authorize deployment or B07 in a FAIL/BLOCKED verdict.

Required final sections:
1. Overall verdict
2. Blocking findings (or `None`)
3. Non-blocking observations
4. Frozen-predecessor regression assessment
5. B04 assessment
6. B05 assessment
7. B06 assessment
8. Cross-block/concurrency assessment
9. Dashboard/API consistency assessment
10. Source-completeness assessment
11. SSV-1 statement: `deferred, not waived`
