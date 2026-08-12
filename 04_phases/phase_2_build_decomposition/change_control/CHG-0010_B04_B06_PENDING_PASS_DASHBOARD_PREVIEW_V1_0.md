# CHG-0010 — B04–B06 Pending-Pass Dashboard Preview v1.0

**Date:** 2026-08-12  
**Status:** OWNER-AUTHORIZED PROVISIONAL PREVIEW  
**Semantic change:** NONE.  
**Audit-gate reduction:** NONE.

## Purpose

Permit the exact remediated B04–B06 product functionality from audit target `4f9de1ed60bbd138f1b96a8b7e7e08af403b7c15` to be exposed on the internal alpha dashboard while the independent Opus re-audit is temporarily unavailable for usage reasons.

## Status split

- `OWNER_WORKING_STATUS=PENDING_PASS`
- `INDEPENDENT_AUDIT_GATE=PENDING_REAUDIT`

`PENDING_PASS` is an owner working status only. It is not an independent audit verdict and may not be cited as PASS.

## Allowed before independent PASS

- build/typecheck/test the already-proven B04–B06 dashboard and API;
- wire preview-only routing required to expose `/procurement` through the persistent alpha dashboard;
- deploy a clearly provisional B04–B06 internal preview for owner product review;
- inspect and exercise B04 Evidence/Files, B05 Requirements/Allocation, and B06 Suppliers/RFQ/Grants/Issue surfaces.

## Still prohibited until independent PASS

- merging PR #7 to `main`;
- recording successor acceptance;
- starting B07 or any later successor wave;
- representing the independent audit as PASS;
- waiving SSV-1.

## Audit-target preservation

The independent re-audit package remains frozen on exact target `4f9de1ed60bbd138f1b96a8b7e7e08af403b7c15`, tree `90588f512017d6a5344b1d7a27ce626619fa4cc9`. Preview-only commits live on `preview/b04-b06-dashboard-pending-pass` and do not alter that target.

If the independent re-audit returns FAIL, remediate the demonstrated blocker on the focused product branch, rerun exact-head technical verification, rebuild the complete-source package, and re-audit before successor unlock.

**B07:** LOCKED / NOT STARTED.  
**SSV-1:** DEFERRED, NOT WAIVED.
