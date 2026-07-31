# P1.5 — Load-Bearing Transaction Register v0.1

**Date:** 2026-07-31  
**Status:** CLOSED CANDIDATE MEMBERSHIP / EXTERNAL RECHECK REQUIRED  
**Purpose:** define the semantic transaction/control-family membership set against which the P1.5 lifecycle-completeness gate is tested.  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

---

# 1. Membership rule

This register contains the P1.5 candidate set of product-owned state-changing transaction/control families that satisfy the frozen P1.4 load-bearing test.

A family is included where its state-changing action can determine or materially affect at least one of:

- governed procurement/commercial outcome;
- authorization/eligibility;
- scope consumption;
- supplier-facing issued/submitted truth;
- award/obligation/change/fulfilment/certification/recovery truth;
- external handoff/reconciliation;
- historically reconstructable commercial/control state.

The register freezes **semantic membership**, not physical aggregates, tables, endpoints or UI screens.

Every registered family must satisfy the nine-field transition contract in `P1_5_CLAUDE_ROUND1_REMEDIATION_V0_1.md` TX03.

---

# 2. Closed candidate membership

| TX ID | Process | Transaction / control family | Why load-bearing | Economic class | Candidate transition coverage |
|---|---|---|---|---|---|
| TX-001 | P01 | RequirementBasis establishment/revision/retirement | defines authorized need/scope source | SCOPE | lifecycle matrix P01 |
| TX-002 | P01 | RequirementAllocation create/split/merge/release/reconcile | consumes/conserves procurement scope | SCOPE | lifecycle matrix P01; FT debt retained |
| TX-003 | P01 | Allocation binding to sourcing/award/Commitment | determines which authorized scope backs downstream action | SCOPE binding | lifecycle matrix P01 |
| TX-004 | P01 | ProcurementPackage create/revise/close | load-bearing only where grouping/version affects governed sourcing scope/context | NONE | lifecycle matrix P01 |
| TX-005 | P02 | TenantSupplierRelationship establish/update/deactivate | determines tenant-private counterparty relationship context | NONE | lifecycle matrix P02 |
| TX-006 | P02 | QualificationEvidence record/refresh/supersede | can determine transaction eligibility | NONE | lifecycle matrix P02 |
| TX-007 | P02 | Eligibility evaluate/reevaluate | permits/restricts supplier use in context | NONE | lifecycle matrix P02 |
| TX-008 | P02/P09 | Bounded eligibility/compliance exception | changes permitted outcome under explicit authority | NONE | lifecycle matrix P02/P09 |
| TX-009 | P03 | TenderEvent open/close/cancel/re-tender | defines governed competitive sourcing lifecycle | NONE | lifecycle matrix P03 |
| TX-010 | P03 | TenderRelease issue | creates exact supplier-facing issued truth | NONE | lifecycle matrix P03 |
| TX-011 | P03 | Addendum/deadline revision | changes supplier-facing governed tender basis/timing | NONE | lifecycle matrix P03 |
| TX-012 | P04 | TenderParticipant invitation/access grant/revoke | determines bounded external capability/participation | NONE | lifecycle matrix P04 |
| TX-013 | P04 | BidIntent/decline/withdraw/non-response facts | determines response/disposition state | NONE | lifecycle matrix P04 |
| TX-014 | P04 | BidSubmission revision | creates immutable supplier commercial source truth | NONE | lifecycle matrix P04 |
| TX-015 | P05 | Bid normalization/mapping version | affects comparison meaning | NONE | lifecycle matrix P05 |
| TX-016 | P05 | EvaluationAdjustment version | affects buyer evaluation outcome | NONE | lifecycle matrix P05 |
| TX-017 | P05 | ComparisonSnapshot freeze/re-evaluate | fixes governed comparison basis incl. FX/tax/version inputs | NONE | lifecycle matrix P05 |
| TX-018 | P06 | AwardRecommendation submit/revise/withdraw | determines proposed buyer decision basis | NONE | lifecycle matrix P06 |
| TX-019 | P06/P09 | ApprovalCase outcome | controls permitted award/other governed actions | NONE | lifecycle matrix P06/P09 |
| TX-020 | P06 | AwardDecision effective/withdraw/supersede | owns buyer selection truth; award != obligation | NONE | lifecycle matrix P06 |
| TX-021 | P06 | External handoff | records governed boundary crossing when A0–A3 stops before P07 | NONE | lifecycle matrix P06 |
| TX-022 | P06/A4 | DirectSourceDecisionBasis + direct-source AwardDecision | governed non-tender selection without fake tender | NONE | completeness hardening DS01–DS04 |
| TX-023 | P07 | CommercialTermsAuthority effective/revise/expire | governs reusable terms/rates/call-off rules | NONE ordinarily | lifecycle matrix P07A |
| TX-024 | P07 | Commitment effectiveness/abandon pre-effectiveness | creates effective supplier obligation baseline | OBLIGATION | lifecycle matrix P07A |
| TX-025 | P07 | Minimum monetary obligation effective/credit/settle/release | owns enforceable non-component floor exposure | OBLIGATION | lifecycle matrix P07A + round-1 remediation EGS |
| TX-026 | P07 | EconomicComponentMapping define/split/merge/reclassify | establishes stable recognition/conservation lineage | CLASSIFICATION / mapping | round-1 remediation EGS02/EGS05 |
| TX-027 | P07 | Commitment change propose/approve/effect/reject/withdraw | changes effective contractual obligation | OBLIGATION +/- | lifecycle matrix P07B |
| TX-028 | P07 | AuthorizedWorkInstruction + provisional valuation authority | creates governed work/scope/provisional valuation authority | SCOPE / provisional | lifecycle matrix P07B |
| TX-029 | P07 | Instruction-to-agreed-change reconciliation | converts/reconciles provisional authority to agreed change without rewrite | OBLIGATION / VALUATION | lifecycle matrix P07B |
| TX-030 | P07 | Delivery evidence + GoodsReceipt/accept/reject/return/reinspect | owns procurement fulfilment/acceptance facts | FULFILMENT | lifecycle matrix P07C |
| TX-031 | P07 | Supplier ProgressClaim submit/revise/withdraw | supplier claimed value truth | CLAIM | lifecycle matrix P07D |
| TX-032 | P07 | ValuationAssessment issue/revise | buyer assessment truth | ASSESSMENT | lifecycle matrix P07D |
| TX-033 | P07 | CertificationDecision effect/correct | creates certified commercial effects | CERTIFICATION | lifecycle matrix P07D + effect algebra |
| TX-034 | P07 | Retention effect/release/correction | owns contractual retention position effects | CERTIFICATION/RELEASE | lifecycle matrix P07D + effect algebra |
| TX-035 | P07 | Advance recognition/recoupment/release/correction | owns contractual advance-outstanding effects; never gross-certified effect | OBLIGATION/RELEASE | lifecycle matrix P07D + remediation EGS07 |
| TX-036 | P07 | Allowance/provisional consumption/release/correction | owns allowance position effects | OBLIGATION/RELEASE | lifecycle matrix P07D |
| TX-037 | P07 | Recovery/contra effect/correction | owns supported commercial recovery position | RECOVERY | lifecycle matrix P07/P11 + CR-02 separation |
| TX-038 | P07 | CommercialEffect correction: reverse-replace/forward-adjust/reclassify | changes current commercial position without history rewrite | typed vector | money/correction kernel + remediation EGS |
| TX-039 | P07 | Final account/commercial closeout/end/release | finalizes/dispositions supported commercial obligations/positions | OBLIGATION/RELEASE | lifecycle matrix P11/P07 |
| TX-040 | P07/P08 | SupplierInvoiceEvidence revision + InvoiceMatch evaluation/exception resolution | controls product match/exception truth without AP ownership | NONE unless separate P07 correction invoked | completeness hardening INV01–INV05 |
| TX-041 | P08 | Accounting/tax handoff/export/reference/posting acknowledgement | records interface boundary and external authority response | EXTERNAL_ACCOUNTING | lifecycle matrix P08 |
| TX-042 | P08 | Integration rejection/reconciliation resolution | determines sync/reconciliation status without mutating commercial truth by convenience | NONE | lifecycle matrix P08 + P1.4 rejection taxonomy |
| TX-043 | P08 | External posted/payment/tax authoritative fact ingest/update | load-bearing when external actual/state governs reporting/control | EXTERNAL MIRROR/REFERENCE | lifecycle matrix P08; authority profile |
| TX-044 | P09 | Approval/control policy outcome | permits domain command but never becomes domain truth | NONE | lifecycle matrix P09 |
| TX-045 | P09 | Delegation/authority-context effective change affecting active cases | affects current authorization and historical interpretation | NONE | authority/lifecycle kernel |
| TX-046 | P09 | Compliance/technical prerequisite override/expiry | can permit/block supported domain action | NONE | lifecycle matrix P09/P12 |
| TX-047 | P10 | ProcurementMilestone plan/forecast/confirm revision | load-bearing planning/expediting fact where used in governed decision | NONE planning | long-lead/status candidate |
| TX-048 | P10 | Actual milestone derivation/authoritative external actual update | determines actual procurement-status projection | NONE / derived or MIRROR | long-lead/status candidate |
| TX-049 | P11 | Security/retention release authorization/status | affects commercial release/control but not banking platform truth | RELEASE / NONE by fact | lifecycle matrix P11 |
| TX-050 | P11 | Warranty/DLP obligation start/expiry/closure | load-bearing closeout obligation tracking | NONE / obligation state | lifecycle matrix P11 |
| TX-051 | P12 | Technical/material approval dependency establish/update/close | can gate procurement transition | NONE | lifecycle matrix P12 |
| TX-052 | P12 | External technical approval result/reference refresh | load-bearing external gate fact where used | MIRROR/REFERENCE | lifecycle matrix P12 |
| TX-053 | Cross-cutting | Authority-profile governed transfer/cutover | changes authoritative source/writer per effective period | NONE | P1.4 authority transfer + P1.5 temporal kernel |
| TX-054 | Cross-cutting | Evidence redaction/tombstone/disposition action | changes retained evidence payload/access while preserving event meaning | NONE | P1.4/P1.5 audit-history contract |
| TX-055 | Cross-cutting | Post-termination export/minimization/disposition action | governs retained-state handling after operational termination | NONE | P1.4 retained-state contract |
| TX-056 | Cross-cutting | Residency migration cutover | changes governed residency context for in-scope data | NONE | P1.4 ADR-0025 semantics |

This is the **closed candidate membership set for P1.5 v0.1**.

---

# 3. Explicit non-members / no fake lifecycle

The following do not become independent state-changing transaction families merely because they exist as values, views or operations:

- current derived commercial balances;
- dashboard/report rows;
- cached projections;
- health/status projections derived from canonical events;
- notification delivery unless acknowledgement itself is a governed fact;
- generic search/indexing;
- connector transport attempts that do not change governed reconciliation state;
- AI/agent reasoning, drafts or proposals before a bounded domain command is accepted;
- external GL/AP/cash/tax journal lifecycles not owned by the OS;
- full CDE/transmittal/review lifecycles outside the bounded procurement dependency/evidence contract;
- WMS/inventory stock movement outside procurement receipt/acceptance truth;
- CPM/master-schedule activities outside procurement milestone overlay.

If later evidence proves one of these contains a load-bearing product state change, it must enter a future register version through controlled change before implementation.

---

# 4. Full transition contract requirement

Every TX member with a product-owned state-changing action must specify:

1. source state/context;
2. bounded command/action;
3. guards/domain invariants;
4. authority/control;
5. resulting event/state;
6. economic effect or explicit `NONE`/scope/external classification;
7. correction/reversal/supersession treatment;
8. concurrency/idempotency;
9. evidence/config/version binding.

The P01–P12 lifecycle matrix plus the completeness hardening and Claude round-1 remediation are the current transition-contract sources.

No member may be declared complete merely because it appears in a golden thread.

---

# 5. Addition/change rule

After this register freezes, a new load-bearing family can be introduced only prospectively through controlled architecture/product change.

Before activation it must:

- be added to a new register version;
- satisfy the full nine-field transition contract;
- declare effect dimension + EffectSubject if economic;
- declare authority class/source;
- declare derivation/projection impact and effective applicability;
- preserve existing event meaning/history;
- pass affected golden-thread, Ceiling and Closed Sub-graph tests;
- preserve P07 as sole independent XL and A0–A3 independence.

The frozen P1.4 load-bearing test controls admission; implementation convenience does not.

---

# 6. Golden-thread relationship

GT1–GT4 remain mandatory end-to-end execution samples.

They validate cross-domain coherence; they do **not** establish membership completeness.

Lifecycle completeness is proven by:

`closed transaction-register membership + full transition contract for every member`.

---

# 7. Current gate result

- Closed candidate transaction set: **YES — TX-001 through TX-056**
- Projection/interface exclusions explicit: **YES**
- Future admission rule explicit: **YES**
- GT1–GT4 reclassified correctly as coverage tests: **YES**
- Second XL introduced: **NO**
- A0–A3 burden changed: **NO**

**BL-16: CLOSED INTERNALLY / CLAUDE RECHECK REQUIRED.**
