# CHG-0007 — Accelerated B02/B03 Implementation Sequencing v1.0

**Date:** 2026-08-12  
**Status:** OWNER-AUTHORIZED PROSPECTIVE EXECUTION AMENDMENT  
**Trigger:** explicit owner direction to complete remaining B02-C4 and B03 in one accelerated engineering cycle, then run one independent audit before B04–B06.  
**Semantic change:** NONE.  
**Gate reduction:** NONE.

## 1. Purpose

Permit provisional implementation and deterministic verification of B03 immediately after the remaining B02-C4 technical implementation is green, without representing B02 as formally PASS before its mandatory SSV-1 and independent-review evidence exist.

This amendment changes implementation sequencing only. It does not change ownership, invariants, authority, persistence meaning, SSV requirements, block-completion criteria or successor semantics.

## 2. Preserved controls

The following remain mandatory:

- B02-C1/C2 remain closed at their independently audited checkpoint unless a concrete regression is found;
- B02-C3/C4 technical evidence must be complete;
- B02 SSV-1 still requires at least three non-builder construction practitioners under CHG-SSS-001;
- B02 final BlockCompletionEvidenceManifest may not say PASS until SSV-1 and independent review are recorded;
- B03 code remains provisional until its own technical evidence and the combined post-C1/C2 independent audit are PASS;
- B04, B05 and B06 remain locked until B02 and B03 are formally cleared;
- no procurement-domain semantics may be introduced into B02 or B03.

## 3. Authorized accelerated sequence

`finish B02-C4 technical implementation`
`→ green B02 technical regression`
`→ prepare SSV-1 exercise/evidence shell`
`→ provisionally implement and verify B03`
`→ assemble combined post-C1/C2 audit package`
`→ complete B02 SSV-1 with three non-builder construction practitioners`
`→ independent hostile audit of post-C1/C2 changes`
`→ final B02/B03 completion disposition`
`→ only then unlock B04–B06`

## 4. Audit scope

The combined independent audit must cover all load-bearing implementation introduced after the C1/C2 closure SHA `76d5c260cf48c4b3bce842687d3cbe1690b228d8`, including:

- C3 usage/lifecycle/offboarding;
- C4 project context, governed workspace/session/persistence and entitlement restriction behavior;
- B03 durable async/event/publication/reconciliation kernel;
- regression of C1/C2 only where later code touches or relies upon those boundaries.

Routine presentation styling is reviewed for comprehension through SSV-1 and deterministic product tests rather than reopened as architecture.

## 5. Acceptance

Owner direction on 2026-08-12 expressly requested this sequence and the combined audit before B04/B05/B06. This record makes that acceleration prospective and auditable rather than silently violating the frozen predecessor rule.
