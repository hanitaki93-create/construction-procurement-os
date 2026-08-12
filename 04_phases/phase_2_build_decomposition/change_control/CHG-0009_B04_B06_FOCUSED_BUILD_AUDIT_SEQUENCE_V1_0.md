# CHG-0009 — Focused B04–B06 Build and Audit Sequence v1.0

**Date:** 2026-08-12  
**Status:** OWNER-AUTHORIZED PROSPECTIVE EXECUTION AMENDMENT  
**Trigger:** explicit owner authorization to complete B04, B05 and B06 in one focused engineering session, then independently audit the complete wave before successor unlock and expose the passed surfaces on the internal dashboard for initial product review.  
**Semantic change:** NONE.  
**Gate reduction:** NONE.

## 1. Purpose

Permit continuous provisional implementation of B04 → B05 → B06 without forcing an external review interruption between each block, while preserving each block's semantic ownership, migration boundary, hostile proof and evidence record.

This changes audit cadence only. It does not allow B05 to redefine B04 evidence semantics or B06 to redefine B05 requirement/allocation truth.

## 2. Authorized sequence

`B01/B02/B03 canonical predecessor PASS + owner acceptance`
`→ implement/verify B04 Evidence/Files/Issued Artifacts/Communication + UI`
`→ implement/verify B05 Requirements/Allocation + UI on the proven B04 substrate`
`→ implement/verify B06 Sourcing/RFQ/Response Schema/Grants/Issue + UI on the proven B04/B05 substrate`
`→ exact-head full regression and hostile verification`
`→ one complete-source independent hostile audit covering B04+B05+B06 and predecessor regression where touched`
`→ if audit PASS, owner successor acceptance may be recorded`
`→ deploy/refresh the internal dashboard with the audited B04–B06 surfaces for initial general product review`
`→ only then may B07 successor implementation be treated as unlocked.`

## 3. Mandatory block boundaries

B04 remains owner of evidence/file/artifact/communication truth and its cross-store protocol.

B05 remains owner of authorized requirement source, RequirementAllocation lineage/conservation and optional ProcurementPackage grouping.

B06 remains owner of pre-response sourcing/RFQ event/schema/member/grant/issue truth.

Each block must have:

- distinct migration/object ownership;
- reverse invariant mapping;
- hostile tests for its own load-bearing invariants;
- exact technical evidence within the combined wave;
- explicit predecessor assumptions.

A failure in any one block fails the combined wave. Green B06 tests cannot mask a B04/B05 defect.

## 4. Human validation timing

SSV-1 remains deferred, not waived, under CHG-0008 to the first genuinely operational procurement MVP/user-validation stage.

B04–B06 must nevertheless ship conventional human-facing surfaces now because the frozen self-service overlay assigns first domain UI to the owning blocks. These surfaces are treated as product-alpha surfaces until the future SSV-1 cohort is executed.

The project owner will perform an initial general product check after the combined B04–B06 audit passes and the dashboard is refreshed. Owner alpha testing does not replace the later independent practitioner cohort.

## 5. Preserved gates

This amendment does not weaken:

- tenant/FORCE-RLS isolation;
- authority/role/external-grant boundaries;
- evidence identity/version/checksum semantics;
- issued-artifact immutability;
- requirement-allocation conservation;
- product-owned response-field/schema semantics;
- exact issue-time event/member/schema/grant basis;
- no-account/manual/file path requirements;
- async/effect/idempotency predecessor semantics;
- migration checksum/rebuild integrity;
- later SSV, release, P07 or AI gates.

**Current disposition:** `B04–B06 focused provisional implementation authorized; B07 remains locked pending combined independent hostile audit PASS and owner acceptance.`