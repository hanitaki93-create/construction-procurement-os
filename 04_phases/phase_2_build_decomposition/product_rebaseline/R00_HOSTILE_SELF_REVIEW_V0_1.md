# R00 Architecture V2 Hostile Self-Review v0.1

**Date:** 2026-08-14
**Target:** `CPOS_ARCHITECTURE_V2_AUDIT_CANDIDATE_V0_3.md`
**Verdict:** **PASS_TO_INDEPENDENT_AUDIT / NOT A FREEZE PASS**

## Review question

Could Architecture V2 still reproduce the failure of old Phase 2: technically rigorous primitives but a commercially thin/generic procurement product, or could a builder still be forced to invent material procurement meaning during implementation?

## Evidence reviewed

- P1.1 frozen 84-area scope and amendment;
- P1.1 burden/one-XL constraints;
- P1.3 DI-01..DI-18 competitor inheritance;
- current specialist evidence (ProcurePro/Procore/BuildingConnected and enterprise/source-to-pay references already recorded in R00 evidence artifacts);
- V2 capability specs;
- rejected B04-B06 lessons;
- clean B03 implementation lineage.

## Blockers found during self-review and disposition

### SR-B01 — Specialist scope knowledge absent
**Finding:** Item/service master did not equal a reusable construction Scope of Works Library.
**Fix:** CAP-045 Scope Library + ProjectScopeInstance + lessons; integrated into Package/RFQ/contract basis.
**Status:** RESOLVED FOR AUDIT.

### SR-B02 — Estimating intelligence dropped at project award
**Fix:** CAP-046 Estimating Handover preserving vendors/quotes/allowances/assumptions/risks with immutable source provenance.
**Status:** RESOLVED FOR AUDIT.

### SR-B03 — Supplier master stopped at compliance/history
**Fix:** CAP-047 deterministic performance/workload/exposure intelligence visible in selection/leveling/recommendation.
**Boundary:** no opaque predictive optimization in first spine.
**Status:** RESOLVED FOR AUDIT.

### SR-B04 — Contract formation stopped at issue-ready PDF
**Fix:** CAP-048 ExecutionCase with acknowledgment/signature/eSign/executed-artifact lifecycle while signature trust provider remains external/provider-neutral.
**Status:** RESOLVED FOR AUDIT.

### SR-B05 — Procurement schedule introduced too late
**Fix:** CAP-049 core schedule moved to MR/package planning; R09 only rolls up/analyses existing facts.
**Status:** RESOLVED FOR AUDIT.

### SR-B06 — Clean B03 lineage lost Phase-1 retrofit-impossible document provenance
**Fix:** CAP-050 explicitly rebuilds FileAsset/BusinessAttachment/SourceDocumentVersion/IssuedArtifactVersion; rejected B04 code may only be selectively salvaged later.
**Status:** RESOLVED FOR AUDIT.

### SR-B07 — Supplier registration/qualification remained implicit
**Fix:** CAP-051 separates registration, qualification/requalification/preferred state and contextual eligibility.
**Boundary:** invite-first/minimum eligibility remains possible; no mandatory heavy SRM before first tender.
**Status:** RESOLVED FOR AUDIT.

### SR-B08 — 'Budget variance' had no authoritative object
**Fix:** CAP-052 ProcurementBudgetBasis/version with OWN/MIRROR/REFERENCE and historical decision binding.
**Status:** RESOLVED FOR AUDIT.

### SR-B09 — Phase-1 technical-document dependency seam disappeared
**Fix:** CAP-053 TechnicalApprovalDependency; CDE may remain authoritative; no full submittal/CDE product.
**Status:** RESOLVED FOR AUDIT.

### SR-B10 — Framework/blanket purchasing inheritance disappeared
**Fix:** CAP-054 restores CommercialTermsAuthority vs call-off architecture as post-first-spine retained capability.
**Status:** RESOLVED FOR AUDIT.

### SR-B11 — Commercial correspondence/clarification history disappeared with rejected B04
**Fix:** CAP-055 ProcurementCorrespondence/ClarificationCase integrated with RFQ/comparison/negotiation.
**Status:** RESOLVED FOR AUDIT.

### SR-B12 — Buying-route policy remained tribal/implicit
**Finding:** Specs said 'direct PO where policy allows' but no policy object existed; a builder would have invented value thresholds, minimum competition, sole-source and exception behavior.
**Fix:** CAP-057 typed/versioned ProcurementRoutePolicy + ProcurementRouteDecision integrated into MR/package/RFQ/recommendation.
**Status:** RESOLVED FOR AUDIT.

### SR-B13 — Specialist management analytics under-specified
**Fix:** CAP-058 deterministic cycle-time/competition/variance/savings analytics with named baseline and drill-down.
**Status:** RESOLVED FOR AUDIT.

### SR-B14 — Technical tender evaluation too implicit
**Finding:** Technical deviations/approval were modeled but not formal bid technical evaluation or two-stage commercial opening.
**Fix:** CAP-059 TechnicalEvaluation + bounded combined/two-stage tender modes.
**Status:** RESOLVED FOR AUDIT.

### SR-B15 — Strong B05 conservation idea at risk of being lost with rejected implementation
**Fix:** CAP-060 Demand/Scope Conservation explicitly distinguishes tendering from commitment consumption and requires concurrency protection against over-commitment while keeping user UX MR/Package-based.
**Status:** RESOLVED FOR AUDIT.

## Full Phase-1 orphan check

`PHASE1_84_AREA_TO_V2_DISPOSITION_V0_1.csv` gives every frozen P1.1 area an explicit V2 disposition. `PHASE1_DESIGN_INHERITANCE_TO_V2_TRACEABILITY_V0_1.csv` maps DI-01..DI-18. No Phase-1 SPINE row is intentionally deleted.

Deep commercial SPINE rows (canonical commercial events, changes, valuation, retention/advance/recoupment) are preserved architecturally but sequenced after the first procurement spine. This is a material audit question rather than a silent demotion.

## Scope-reopen check

`PHASE1_SCOPE_REOPEN_DECISIONS_V2_V0_1.md` records V2 promotions/additions rather than rewriting P1.1 history. The most burden-sensitive promotions are bounded AI extraction, supplier exposure intelligence, Scope Library, Estimating Handover and contract execution state.

Self-review assessment: none obviously creates a second independent XL gravity well **if the written boundaries are enforced**. Independent audit must challenge this assumption.

## Conventional procurement floor check

The first R01-R10 product now explicitly covers:
- company/project/roles/DOA;
- supplier master + contacts + compliance + qualification;
- item/free-form scope + UOM + cost/WBS + currencies/tax/payment terms;
- governed business numbering;
- professional document templates;
- MR/PR + lines/distributions/approvals;
- procurement route/competition policy;
- package/scope library/estimating handover/planning;
- RFQ/Tender + structured bid forms + supplier invitation;
- secure response/no-bid + revisions;
- correspondence/clarifications/addenda;
- technical evaluation + technical approval dependencies;
- commercial leveling/normalization;
- recommendation/DOA/award;
- PO/LPO/Subcontract formation;
- acknowledgment/eSign/executed artifact;
- workbench/registers/schedule/analytics;
- commercial receipt/GRN + ERP seam.

Self-review found no remaining obvious 'can it print a PO?' class omission in that path.

## Competitive specialist bar check

Architecture V2 now contains explicit patterns corresponding to the specialist differentiators we intended to inherit: fast MR/material route, optional package route, Scope Library, estimating handover, supplier intelligence, low-friction bidder access, structured bid breakdown, technical evaluation, side-by-side leveling, source-cited AI extraction, recommendation/approval, procurement schedule, contract execution and analytics.

This establishes product architecture only. It does **not** prove the eventual UX or implementation will be better than ProcurePro/Procore/BuildingConnected; the external audit and later pilot must challenge that claim.

## Direct-build readiness check

For R01-R08 first-spine capabilities, a named CapabilitySpecification exists and the structural checker is intended to fail if one is missing. Specs now define user object/fields/lifecycle/journey/output/acceptance at a level intended to prevent a coding agent from replacing them with generic CRUD semantics.

Remaining `meaning_status` is deliberately `PENDING`; this self-review does not manufacture domain acceptance.

## Questions the independent auditor MUST attack

1. Does deferring Phase-1 deep commercial SPINE semantics until R12+ create an unacceptable semantic hole in the V2 freeze or merely an implementation sequence?
2. Do any new first-spine capabilities create a second independent XL gravity well or violate the <=5-working-day first-live-tender constraint?
3. Is ProcurementRoutePolicy too general (workflow-engine risk) or still too weak to prevent policy invention?
4. Is Supplier Registration/Qualification too heavy for the intended fast first tender?
5. Is TechnicalEvaluation/two-stage tendering correctly bounded rather than a generic evaluation engine?
6. Is Demand/Scope Conservation correct for competitive tendering, split award, direct PO and re-tender without over-reservation?
7. Are file/provenance/issued-artifact semantics sufficient to replace the rejected B04 product wave cleanly?
8. Are budget and CDE authority seams precise enough for Oracle/SAP/Aconex coexistence?
9. Are LPO/PO/Subcontract formation and execution sufficiently concrete for a real contractor?
10. Can a builder implement R01-R10 directly from V2 specs without inventing material fields/workflow meaning?
11. Is any ordinary procurement capability still absent despite the 60-capability inventory?
12. Would a contractor already using Oracle/SAP plausibly gain a distinct construction-procurement system-of-action advantage from this architecture?

## Self-review verdict

**PASS_TO_INDEPENDENT_AUDIT.**

This means only:
- no known internal blocker remains unrecorded;
- all blockers found in this pass have an explicit architecture/spec disposition;
- the candidate is coherent enough to be attacked externally in one run.

It does **not** mean Architecture V2 is frozen, domain-approved, commercially validated or build-authorized.