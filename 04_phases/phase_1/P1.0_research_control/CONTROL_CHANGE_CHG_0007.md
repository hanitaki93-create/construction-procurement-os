# CONTROL_CHANGE — CHG-0007

**Date:** 2026-07-28  
**Artifacts:** P1.0 Control System / Audit Protocol / ADR Register  
**From:** Control v0.3 + Audit Protocol v1.2  
**To:** Control v0.4 + Audit Protocol v1.3  
**Status:** ACCEPTED / IMPLEMENTED

## Trigger
CP-05 hostile recheck returned PASS with two control clarifications:
1. accepted ADRs should retain their evidence-basis class;
2. the final verdict must state the boundary between independent design critique and artifact-execution verification when the external auditor lacks repository access.

## Changes
- Add `evidence_basis` to the ADR register. Every future ACCEPTED ADR must state one of `INTERNAL_PRINCIPLE / PRIMARY / COMPETITOR_PATTERN / MIXED / REGULATORY_TECHNICAL` or a controlled successor value.
- Existing accepted ADRs are backfilled.
- CP-05 may combine an independent hostile design verdict with an internal canonical-artifact execution audit when external repository access is unavailable, but the limitation must be recorded explicitly; the project may not claim independent artifact execution inspection.
- Future external sample audits should allow the auditor to choose the EVD/ADR indices where practical rather than relying only on author-selected samples.

## Impact
No roadmap or architecture decision changes. This improves later re-auditability and prevents the independent-audit boundary from being overstated.
