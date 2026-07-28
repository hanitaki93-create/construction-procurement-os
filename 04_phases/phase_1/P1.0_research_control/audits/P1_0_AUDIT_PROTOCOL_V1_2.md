# P1.0 Audit Protocol v1.2

**Status:** ACTIVE
**Supersedes:** v1.1 for current execution
**Inheritance:** v1.1 remains binding except for the changes below.

## CP-05 additional checks

### Source preservation
Fail CP-05 if an ACCEPTED ADR/REQ or frozen architecture conclusion depends on mutable external evidence whose source is not preserved under `02_research/sources/SOURCE_PRESERVATION_POLICY_V1_0.md`.

Background/deferred competitor evidence is not required to be archived merely because it was historically verified; if later promoted to decision-bearing status it must be re-verified and preserved first.

### Decision dependency
`P1_0_SUFFICIENT` is retired.

Audit `ADR_EVIDENCE_COVERAGE_V1_1.csv` and confirm unresolved architecture ADRs are classified `PRIMARY_REQUIRED` or `DESIGN_PHASE` as appropriate. In particular ADR-0003, ADR-0004 and ADR-0005 must remain `PRIMARY_REQUIRED` until primary/operating evidence is obtained.

### Independent inspection
The auditor must inspect `CP_05_INSPECTION_BUNDLE_V1_0.md` at minimum. A narrative summary is not sufficient.

### Anti-anchoring handoff
Confirm the governing roadmap requires P1.2 raw evidence capture before terminology/ontology mapping and explicitly requires capture of observations that fit no known incumbent pattern.

## Gate
Final result remains binary:
- `PASS — unlock P1.1`
- `FAIL — remain in P1.0`
