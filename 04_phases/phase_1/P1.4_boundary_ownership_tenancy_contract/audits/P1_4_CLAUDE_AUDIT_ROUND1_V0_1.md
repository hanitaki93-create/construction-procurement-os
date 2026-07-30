# P1.4 — Claude External Hostile Audit — Round 1 v0.1

**Date:** 2026-07-30  
**Auditor:** Claude  
**Status:** EXTERNAL FAIL / REMEDIATION REQUIRED  
**P1.4:** ACTIVE  
**P1.5+:** LOCKED

---

## 1. Verdict

`FAIL — P1.4 remains open; blockers below must be remediated.`

Claude found two narrow boundary blockers inside P1.4 scope.

---

## 2. BL-12 — cross-tenant derived, aggregate and model-mediated use undefined

Affected clauses: B04, B06 and future advanced-AI/portfolio-analytics direction.

Finding:
- direct tenant disclosure/inference and cross-tenant supplier sharing were bounded;
- derived, aggregate, statistical and model-mediated use of tenant business data was not explicitly bounded;
- this creates a silent implementation choice for shared learning, price benchmarking, supplier scoring, embeddings/retrieval and similar AI/analytics behavior.

Representative scenarios:
- Tenant A's normalization corrections train/adapt a model that improves Tenant B outputs without directly showing A's records;
- cross-tenant commercial price benchmarking;
- supplier reliability score derived across tenants.

Blocker rationale:
- either violates B04 inference/isolation intent or forces later reinterpretation of the tenancy contract;
- training-data provenance/de-identification/learning boundaries are substrate decisions and should not be chosen accidentally in P1.5/AI implementation.

Required narrow remediation:
- explicitly choose whether cross-tenant aggregate/derived/statistical/model-mediated business-data use is prohibited by default, opt-in governed, or limited to non-business operational telemetry.

---

## 3. BL-13 — `load-bearing` lacked a selection test

Affected areas: authority vocabulary, B10–B13, B16, B23, B34 and ADR-0024 relation.

Finding:
- `load-bearing` decides which facts receive authority assignment, version binding, freshness treatment and immutable/provenance handling;
- no semantic criterion said when a fact/config/policy qualifies;
- under-inclusive interpretation can lose historical decision basis;
- over-inclusive interpretation can snapshot/bind everything and create unnecessary complexity.

Representative scenario:
- evaluation FX basis is treated as non-load-bearing, so a later award dispute cannot reconstruct the comparison basis despite B22 historical-interpretability intent.

Blocker rationale:
- selecting which facts carry authority/provenance/version binding is a truth-ownership scope decision, not merely physical implementation.

Required narrow remediation:
- define a semantic load-bearing test based on dependency of governed decision/authorization/valuation/comparison/contractual position and historical reconstructability.

---

## 4. Non-blocking watches raised

### W-08 — evidence disposition tombstone
Make explicit what minimum EvidenceReference/provenance/disposition fact survives payload disposal while the related historical event remains retained.

### W-09 — post-termination disposition authority
Define who can authorize retained-state disposition after tenant operational termination where a retention basis survives.

### W-10 — cross-tenant/JV visibility
Make explicit that ContractingAuthorityContext does not automatically grant JV/partner access to procurement evidence.

### W-11 — tenant export/portability
Scope a bounded export/return seam before contracting; do not turn it into CDE/records-management scope.

### W-12 — ADR-0010 GCC semantics
Unchanged evidence debt.

### W-13 — residency category list
The semantic rule is acceptable; later product/NFR work must define which concrete data categories are included in the residency commitment.

---

## 5. Gate result from Claude

- G1 Tenant isolation — FAIL due BL-12.
- G2 Legal/project/ContractingAuthorityContext — PASS.
- G3 Authority coverage — FAIL due BL-13.
- G4 Internal authorization vs external grants — PASS.
- G5 Evidence/offboarding/deletion/retention/residency — PASS with watches.
- G6 Classification boundary — PASS.
- G7 Effective/config binding — PASS conditional on BL-13.
- G8 Accounting/integration authority — PASS.
- G9 One-XL/adoption burden — PASS.

Regression result:
- P1.1 REOPEN = NO.
- P1.2 REGRESSION = NO.
- P1.3 REOPEN = NO.
- SECOND XL = CLEAN.
- A0–A3 ACTIVATION = CLEAN.

---

## 6. ADR impact suggested by Claude if P1.4 passes

Semantic decisions considered supportable after final remediation/review:
- ADR-0012 external vendor identity/access;
- ADR-0014 document provenance ownership/depth;
- ADR-0021 field-level integration authority/staleness;
- ADR-0020 configuration binding in flight, contingent on BL-13 closure;
- ADR-0005 accounting/commercial ownership seam;
- ADR-0018 workflow-to-financial-state seam.

Claude recommended a standalone residency ADR because B20/B21 establish customer-contractual architecture semantics distinct from physical DR topology.

Claude advised leaving ADR-0003/0004/0006/0008/0009/0010/0011/0015/0019/0022/0023 open.

---

## 7. P1.5 readiness from Claude

`NOT READY.`

Only BL-12 and BL-13 blocked readiness. Claude considered all other remaining items physical-implementation deferrals rather than unresolved truth-ownership boundaries.

---

## 8. Remediation link

Round-one findings are addressed by `P1_4_EXTERNAL_AUDIT_REMEDIATION_V0_1.md`.

No ADR status or project phase status is changed by this audit record.
