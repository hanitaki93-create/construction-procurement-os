# P1.9 — Claude Round 2 Watch Closure v0.1

**Date:** 2026-08-01  
**Status:** WATCHES CLOSED / INCLUDED IN P1.9 FREEZE  
**P1.9:** EXTERNAL PASS / FINAL CHECKPOINT PENDING  
**Product code:** LOCKED

---

# 1. Purpose

Close Claude Round-2 watches W-67–W-71 without creating a form/schema engine, weakening the bounded hybrid external experience or reopening P1.1–P1.8.

---

# 2. W-67 — Registered group composition depth

`REGISTERED_LINE_OR_TABLE_GROUP` uses only product-registered composition profiles.

Rules:

- arbitrary recursive group composition is prohibited;
- V1 groups may contain registered scalar/evidence fields and, only where an exact product profile permits, one level of registered row-member composition;
- a group may not contain another freely selectable group;
- nested/repeating structures beyond the registered profile require prospective architecture change, evidence, cardinality/normalization/comparison impact analysis, second-XL review and hostile audit;
- tenant configuration cannot alter composition depth, child cardinality or row identity semantics.

This prevents a generic structure/form designer while allowing product-defined BOQ, price-breakdown, compliance and alternative-line patterns.

---

# 3. W-68 — Enumerated bounded constraint families

Tenant configuration may apply only registered constraints from these families where the semantic field policy permits:

1. `NUMERIC_MINIMUM`;
2. `NUMERIC_MAXIMUM`;
3. `DECIMAL_PRECISION_AND_SCALE`;
4. `TEXT_LENGTH_MINIMUM`;
5. `TEXT_LENGTH_MAXIMUM`;
6. `DATE_OR_DATETIME_EARLIEST`;
7. `DATE_OR_DATETIME_LATEST`;
8. `DURATION_MINIMUM`;
9. `DURATION_MAXIMUM`;
10. `ENUM_ALLOWED_SUBSET`;
11. `ATTACHMENT_MINIMUM_COUNT`;
12. `ATTACHMENT_MAXIMUM_COUNT`;
13. `ATTACHMENT_ALLOWED_REGISTERED_TYPE_SET`;
14. `ROW_MINIMUM_COUNT`;
15. `ROW_MAXIMUM_COUNT`;
16. `REQUIRED_OR_OPTIONAL` where allowed;
17. `REGISTERED_ACKNOWLEDGMENT_REQUIREMENT`;
18. `REGISTERED_APPLICABILITY_POLICY_SELECTION`.

Prohibited:

- arbitrary regex;
- free-form expressions;
- cross-field formulas;
- executable validators;
- runtime joins/lookups;
- tenant-created condition trees;
- semantic reinterpretation through constraint values.

A constraint cannot widen beyond product safety bounds or change field meaning, grain, unit, currency role or comparison eligibility.

---

# 4. W-69 — Compatibility determination authority

Cross-version semantic compatibility is declared only by the product-owned registry through versioned:

- `FieldVersionCompatibilityRelation`;
- `SchemaVersionCompatibilityRelation`;
- successor/supersession mapping;
- permitted deterministic conversion/normalization policy;
- comparison/aggregation eligibility;
- limitation and restatement requirement.

Compatibility dispositions are closed:

- `DIRECTLY_COMPATIBLE`;
- `COMPATIBLE_AFTER_REGISTERED_CONVERSION`;
- `COMPARABLE_WITH_EXPLICIT_LIMITATION`;
- `SEGMENT_ONLY`;
- `MAPPING_PROPOSAL_REQUIRED`;
- `BLOCKED_INCOMPATIBLE`.

Frontend, tenant configuration, report builder, importer, chat or AI cannot decide compatibility ad hoc.

---

# 5. W-70 — Enum subset narrowing

Enum meaning and event-specific allowed subset remain distinct.

- changing enum member meaning, identity or interpretation requires a new semantic field-family/version;
- narrowing or expanding the event-specific allowed subset creates a new `ResponseSchemaVersion` when it affects what may be submitted;
- responses already valid under the prior schema remain historically valid under that version;
- the new event version must declare whether prior responses remain eligible, require acknowledgment, require resubmission, become stale/provisional or are segmented;
- subset change cannot silently invalidate, reinterpret or rewrite a prior response;
- display-only ordering change is a presentation revision only when participation validity and meaning are unchanged.

---

# 6. W-71 — Assurance restoration

After reauthentication, continuation under an existing confirmation is allowed only when:

- the acting principal and represented principal are unchanged;
- assurance is restored to the same or a stronger accepted class;
- current authority, delegation, DOA, access and context remain valid;
- no confirmation-invalidating target, schema, evidence, recipient, value, policy or effect change occurred;
- confirmation has not expired.

A weaker assurance class always invalidates the confirmation for that action and requires the policy-defined stronger authentication plus new confirmation where necessary.

---

# 7. Result

- W-67 CLOSED;
- W-68 CLOSED;
- W-69 CLOSED;
- W-70 CLOSED;
- W-71 CLOSED;
- BL-P19-05 remains CLOSED;
- no upstream phase reopens;
- second XL remains CLEAN;
- A0–A3 remains CLEAN;
- product code remains LOCKED.
