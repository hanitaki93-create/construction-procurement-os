# P1.0 Audit Protocol v1.3

**Status:** ACTIVE  
**Supersedes:** v1.2 for current execution  
**Inheritance:** v1.2 remains binding except for the changes below.

## 1. CP-05 verdict composition when external repo access is unavailable

The preferred CP-05 method remains direct independent artifact inspection.

If the hostile external auditor cannot access the canonical repository, CP-05 may use two explicit components:

1. **Independent hostile control-design verdict** — challenges the control method, decision boundaries and remediation logic using the supplied inspection material.
2. **Canonical artifact-execution audit** — verifies the implemented repository state against the governing control rules, performed separately with direct repository access.

Both must PASS. The final report must state that external independence applies to the design critique, not to repository execution inspection. The project must not claim that the external auditor inspected artifacts it could not access.

## 2. Accepted ADR evidence basis

Audit every `ACCEPTED` ADR for a non-empty `evidence_basis` under Control v0.4.

## 3. Future independent sampling

When an external auditor can inspect artifact contents, allow the auditor to select representative EVD/ADR/REQ indices where practical. Author-selected examples may demonstrate the system but do not substitute for independent sampling when such sampling is possible.

## 4. Final gate

Final result remains binary:
- `PASS — unlock P1.1`
- `FAIL — remain in P1.0`

The final report must record the audit-scope boundary and any non-blocking amendments accepted for later phases.
