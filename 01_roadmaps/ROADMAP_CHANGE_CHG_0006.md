# ROADMAP_CHANGE — CHG-0006

**Date:** 2026-07-28  
**Artifact:** Phase 1 Roadmap  
**From:** v1.2  
**To:** v1.3  
**Status:** ACCEPTED / IMPLEMENTED

## Trigger
CP-05 hostile recheck returned `PASS — unlock P1.1` with four non-blocking technical amendments.

## Changes
1. P1.2 primary capture becomes **verbatim-by-default**; any capture-time normalization is a logged exception.
2. P1.2 must reconcile incumbent-derived hypotheses against primary evidence and explicitly flag hypotheses with zero primary corroboration rather than silently retaining them.
3. P1.5 audit-store invariant must anticipate controlled redaction/tombstoning so P1.6 elaborates rather than contradicts an absolute append-only rule.
4. Closed-under-extension event semantics must also require explicit/versioned projection changes; adding a new event may intentionally change a derived balance, but the projection change cannot be silent.

## Impact
No phase order, product scope, ambition, Ceiling Test, Closed Sub-graph Gate, or deterministic-core principle is reduced. The changes strengthen primary-research independence, audit/privacy compatibility, and financial projection reproducibility.

## Alternatives considered
- Leave v1.2 unchanged because the items were non-blocking: rejected because each amendment is cheap now and prevents ambiguity later.
- Expand the roadmap into detailed implementation rules now: rejected; detailed design remains in P1.2/P1.5/P1.6.
