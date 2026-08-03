# B01 Hostile Audit Package

**Version:** 1.0  
**Status:** Ready for first independent audit  
**Repository:** `hanitaki93-create/construction-procurement-os`  
**Branch:** `build/b01-engineering-foundation`  
**Draft PR:** #1  
**Implementation target:** `1344a64454154bc624197b2a885bad9f8da9dafc`

## Auditor objective

Determine whether B01 conforms to the frozen B01 build requirements and architecture without relying on builder confidence, prior summaries or previous PASS labels.

## Required access

Preferred: read access to the complete private repository and PR #1, with the implementation target pinned to the exact commit above.

Fallback: an unmodified full-repository archive created from the exact implementation target. Do not audit a cherry-picked file set.

## Required package files

1. `01_UPLOAD_CHECKLIST.md`
2. `02_HOSTILE_AUDIT_PROMPT.md`
3. `03_AUDIT_RESPONSE_TEMPLATE.md`
4. `04_REOPEN_AND_CHANGE_POLICY.md`
5. `../B01_FREEZE_PACKAGE/`
6. `../B01_COMPLETION_EVIDENCE_V1_0_CANDIDATE.md`
7. `../B01_VERSION_MANIFEST.md`
8. `../B01_F5_VERIFICATION.md`
9. the complete repository at the implementation target.

## Decision boundary

The independent auditor does not merge the PR or unlock B02. The auditor returns a structured verdict. The project owner separately evaluates the verdict and records acceptance or remediation.
