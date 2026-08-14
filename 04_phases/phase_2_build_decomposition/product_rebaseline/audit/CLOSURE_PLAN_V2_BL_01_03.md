# Architecture V2 Narrow Closure Plan — V2-BL-01..03

This is a closure cycle, not a redesign cycle.

## Scope

Close exactly:
- BL-01 field-contract completeness for first-spine R01–R08 specs;
- BL-02 concrete document-class numbering policies and concurrency semantics;
- BL-03 manifest completeness + CAP-042 quality binding;
- accepted low-cost amendments: default tenant profile, supplier-intelligence placement, compiler enforcement.

## Non-scope

Do not reopen dimensions the independent audit passed unless a direct contradiction is discovered while authoring the missing contracts.

## Freeze test

Architecture V2 may freeze when:
1. every R01–R08 manifest-owned spec contains an explicit field-contract table or an explicit inherited field-contract reference covering every product field;
2. every closed enum is enumerated;
3. document-class numbering table is complete and concurrency/gap semantics are mechanically checkable;
4. Workbench/Schedule, Analytics, Receipt/GRN/ERP, Framework/Calloff and CAP-042 are registered/bound;
5. default tenant profile exists;
6. supplier intelligence explicitly renders at shortlist + leveling/recommendation;
7. `product:capabilities:check` passes;
8. `product:capabilities:authorize` passes only after owner/domain `MEANING_PASS` is explicitly recorded;
9. no new architectural contradiction appears.

If a contradiction appears, stop freeze and reopen only the affected architecture dimension.