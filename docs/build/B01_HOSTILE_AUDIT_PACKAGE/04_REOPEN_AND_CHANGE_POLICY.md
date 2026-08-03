# B01 Reopen and Change Policy

**Version:** 1.0  
**Status:** Freeze-candidate governance

## Principle

Freezing B01 preserves the historical baseline that was reviewed. It does not prohibit future evolution and does not require project termination when later evidence demands structural change.

## Change classes

### Class A — Non-functional amendment

Examples:

- documentation corrections;
- comments and diagnostics;
- additional tests that do not change runtime behavior;
- CI observability improvements;
- evidence indexing.

Disposition:

- record the amendment;
- run affected formatting/documentation/tooling gates;
- preserve the original implementation evidence identity unless behavior or acceptance evidence changes.

### Class B — Corrective implementation revision

Examples:

- audit-discovered defect;
- concurrency, browser, packaging or runtime correction;
- security remediation that preserves architecture.

Disposition:

- issue a new B01 revision;
- identify affected requirements and evidence;
- rerun targeted gates plus any dependency gates;
- obtain independent confirmation of the correction;
- update the frozen manifest before acceptance.

### Class C — Architectural amendment

Examples:

- later AI or product requirements cannot fit the established boundary;
- a database, runtime or deployment assumption becomes invalid;
- a new invariant family changes responsibilities across blocks;
- regulation or production evidence requires structural redesign.

Disposition:

- create an Architecture Decision Record;
- document evidence, alternatives, compatibility and migration impact;
- identify all affected blocks and prior assumptions;
- create a new major baseline or architecture amendment;
- rerun full verification and independent audit appropriate to the impact.

## Immediate B01 reopen criteria

B01 must reopen before owner acceptance when the audit finds any of the following:

- missing frozen requirement;
- correctness or concurrency defect;
- security or secret-management defect;
- package or browser boundary violation;
- non-reproducible build;
- unsafe rollback;
- hidden product authority;
- unresolved architecture question;
- unregistered invariant candidate;
- evidence that a claimed test never reached the intended behavior.

## Non-reopen observations

Naming, prose clarity or optional diagnostic improvements may remain minor only when the auditor proves they cannot affect architecture, behavior, security, deterministic builds, evidence integrity or later-block safety.

## Authorization

Only the project owner may accept the audit result, authorize merge to `main`, tag the frozen baseline or unlock B02.
