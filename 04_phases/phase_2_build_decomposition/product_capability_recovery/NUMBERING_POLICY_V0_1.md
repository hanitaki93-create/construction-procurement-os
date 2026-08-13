# CPOS Document Numbering Policy v0.1

**Date:** 2026-08-13
**Status:** DRAFT / REGISTERED-CONTROL CANDIDATE

Business numbers are separate from immutable UUID identity.

Initial numbered classes: MR/PR, RFQ/Tender, Addendum, Comparison, Recommendation, Award reference, LPO/PO/Subcontract, and later Receipt/GRN.

Each class must declare:
- uniqueness scope;
- mask and sequence reset rule;
- automatic/manual policy;
- gap policy;
- assignment timing;
- cancellation treatment;
- revision/reissue behavior;
- legal/commercial significance.

Implementation rules:
- never allocate by `max(number)+1`;
- use an explicit concurrency profile;
- never reuse an issued or cancelled number;
- preserve business-document identity across revisions unless a capability spec requires a new number;
- treat gap policy as document-class policy, not a universal assumption.

Example product-owned masks may include `MR-{PROJECT}-{YY}-{SEQ}`, `RFQ-{PROJECT}-{YY}-{SEQ}`, and `LPO-{COMPANY}-{YY}-{SEQ}`.

The exact mask grammar and no-gap mechanics require hostile concurrency review before implementation.
