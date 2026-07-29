# P1.2 Sourcing Hostile Critique Prompt v0.1

Use this as a **delta review**. Prior P1.0/P1.1 context is unchanged; do not re-review old material unless P01–P06 create a contradiction requiring P1.1 reopening.

---

Hostile-review the new **P1.2 provisional sourcing subgraph P01–P06** and decide whether we may proceed into P07 Commitment/Commercial Core.

Review these repo artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/processes/P01_DEMAND_PACKAGE_COST_ATTRIBUTION_V0_1.md`
- `.../P02_VENDOR_ELIGIBILITY_BIDDER_SELECTION_V0_1.md`
- `.../P03_TENDER_PACKAGE_RELEASE_CONTROL_V0_1.md`
- `.../P04_EXTERNAL_TENDER_PARTICIPATION_V0_1.md`
- `.../P05_BID_NORMALIZATION_LEVELING_COMPARISON_V0_1.md`
- `.../P06_RECOMMENDATION_APPROVAL_GOVERNED_AWARD_V0_1.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_1.md`

Governing frozen reference remains:
- `04_phases/phase_1/P1.1_thesis_beachhead_release_boundary/P1_1_FROZEN_BASELINE_V1_0.md`

These P1.2 mechanics are `SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER`; missing independent contractor evidence is **not** itself a blocker at this checkpoint. We will primary-audit later. Attack whether the architecture is structurally credible and reversible now.

Focus ruthlessly on blocker-level issues:
1. **Fantasy ERP / object inflation:** are too many proposed first-class objects actually unnecessary event/projection/value-object concepts? Identify exact collapses needed without losing audit invariants.
2. **Second XL gravity well:** do P01–P06 secretly require a generalized BPM/workflow engine, full supplier portal, CDE, accounting budget engine, or bespoke per-customer ontology—violating P1.1 burden limits?
3. **Truth ownership:** find duplicated or ambiguous authority among Demand/Package/TenderEvent/Release/BidSubmission/ComparisonSnapshot/AwardDecision.
4. **Version/provenance correctness:** can addenda, bid revisions, leveling, negotiation, recommendation revisions and DOA history remain reproducible without impossible implementation complexity?
5. **Supplier UX:** is bounded secure-link/email-compatible participation realistically usable, or does provenance/security make the flow impractical?
6. **Comparison truth:** does the separation `supplier truth → normalized mapping → internal adjustment → supplier-confirmed negotiated basis` actually prevent fake prices, especially with AI extraction?
7. **Award seam:** can a leveled recommendation be approved without accidentally converting internal allowances into contractual price? Is `award ≠ commitment` coherent?
8. **Split/partial allocation:** can one demand/package split across vendors without double award/over-allocation and without requiring a ledger prematurely?
9. **Eligibility/compliance:** are qualification, contextual eligibility, selection and later re-checks correctly separated or overengineered?
10. **Irreversible omissions:** is anything expensive/impossible to retrofit missing before P07 begins?

Also test the whole thread:
`need → bidder eligibility → released tender → supplier response/revision → leveling → recommendation/DOA → award decision`

Do **not** fail merely because exact status names, UI, customer-specific DOA thresholds, or later primary evidence are unresolved.

Return only:

### BLOCKERS
For each: exact artifact/section, why structural, and minimum correction.

### NON-BLOCKING WATCH ITEMS
Only items worth carrying into P07/P1.5 or primary audit.

### P1.1 REOPEN?
`NO` or exact frozen assumption that must reopen and why.

### VERDICT
Choose exactly one:
- `PASS — sourcing subgraph coherent; proceed to P07`
- `FAIL — remediate blockers before P07`

Be hostile. Prefer deletion/simplification where invariants survive. Do not reward sophistication for its own sake.
