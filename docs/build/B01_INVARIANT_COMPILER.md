# B01 Invariant and Compatibility Compiler Foundation

B01 implements machine-readable schemas and validators only. It does not activate product invariants or create business operations; B02 owns activation.

## Inputs

The compiler accepts:

- frozen source manifest and clause coverage;
- `InvariantRegisterVersion`;
- `PhysicalWriteOwnershipManifest`;
- operation references;
- `ConcurrencyProfileVersion`;
- effective-dated object inventory;
- schema catalog;
- `ReleaseCompatibilityManifestVersion`;
- block completion evidence.

## Mandatory failures

The compiler rejects:

- fewer or more than the expected 92 frozen source rows;
- a frozen row with no invariant or explicit non-state disposition;
- fewer or more than the expected 102 registered invariant families;
- invariant without owner, enforcement or hostile test;
- concurrency-sensitive invariant without an exact profile;
- effective-dated object without overlap disposition;
- mutable object without exactly one owner;
- object or operation missing a reverse invariant reference;
- unknown invariant reference;
- incomplete or incompatible release manifest;
- unresolved newly discovered invariant candidate.

## Concurrency fixtures

Real PostgreSQL 18.4 tests prove:

- unprotected READ COMMITTED aggregate write skew;
- CC-2 guard-row protection after real guard materialization;
- CC-4 SERIALIZABLE conflict and bounded retry identity;
- one global guard acquisition order and reversed-order deadlock negative control;
- effective-period overlap under unprotected READ COMMITTED;
- exact GiST exclusion protection;
- SERIALIZABLE fallback for a predicate not represented by an exact constraint.

All fixture relations live in temporary `testkit_*` schemas and never enter product migration inventory.

## Exact calculation boundary

- PostgreSQL `numeric` remains a decimal string.
- PostgreSQL `int8` remains an integer string or checked bigint internally.
- JavaScript `number` is prohibited for those boundaries.
- Calculation plans declare operator, input/output scales, division intermediate scale, rounding mode/point and overflow digits.
- The TypeScript reference executor uses an isolated high-precision Decimal context and rounds only at declared plan points.

## Completion rule

Every later block must supply the exact register/coverage versions, changed object and operation mappings, concurrency/effective-period evidence and unresolved-invariant count. A missing or newly discovered invariant blocks PASS until reconciled.
