# PROJECT STATE

**Updated:** 2026-07-29  
**Canonical status file:** this document

## Position

- Project: **Construction Procurement OS**
- Phase: **Phase 1 — Deterministic Architecture & Product Specification**
- Active subphase: **P1.2 — Primary Workflow Evidence + Secondary Best-Practice Calibration**
- P1.0: **CP-05 PASS / CLOSED**
- P1.1: **PASS / FROZEN**
- Governing roadmap: **Phase 1 Roadmap v1.3 — FROZEN**
- P1.2 provisional operational model: **P01–P12 COMPLETE-ENOUGH / NOT FROZEN**
- Sourcing P01–P06 external status: **REVIEW A PASS**
- P07/P08: **PROVISIONAL / REVIEW B v0.2 READY FOR EXTERNAL HOSTILE REVIEW**
- P09–P12 + full graph: **PROVISIONAL / REVIEW C PREPARED**
- Process invention: **PAUSED — no new core process without evidence/critique proving a gap**
- P1.2 formal close: **LOCKED pending primary-evidence gate + Review B/C remediation/pass**
- P1.3 formal competitor reconstruction: **LOCKED pending P1.2 gate**
- Product code: NOT STARTED
- Phase 2 build decomposition: LOCKED
- Phase 3 deterministic construction: LOCKED

## Operating rule

P1.2 mechanics remain `SECONDARY_REFERENCE / PROVISIONAL / REVERSIBLE` until primary evidence and later structural decisions.

Authority order:
1. PRIMARY_CONTRACTOR_EVIDENCE
2. PRIMARY_TRANSACTION_ARTIFACT
3. REGULATORY / CONTRACTUAL REQUIREMENT
4. SECONDARY_REFERENCE — OFFICIAL PRODUCT / TRAINING
5. SECONDARY_REFERENCE — PROFESSIONAL PRACTICE
6. INTERNAL_REASONING / HYPOTHESIS

Higher authority may overturn lower.

Independent primary cases must be captured verbatim before mapping to the candidate model.

## Review A — sourcing external PASS

Final external verdict:

`PASS — sourcing subgraph coherent; proceed to downstream external Review B`

Canonical artifacts:
- `04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_SOURCING_REVIEW_A_FINAL_VERDICT.md`
- `04_phases/phase_1/P1.2_primary_workflow_evidence/P1_2_SOURCING_SUBGRAPH_CHECKPOINT_V0_5.md`

Closed through Review A:
- B1 supplier economic-basis ownership/provenance;
- B2 evaluated vs contractable basis;
- B3 competing allocation writers;
- B4 FX/tax reproducibility;
- B5 scope conservation vs value governance;
- B6 all sourcing routes enter allocation authority;
- BL-01 downward basis reconciliation;
- BL-02 scope-level uniqueness;
- ADR-0003/0004 anchoring concern.

P1.1 reopen remains **NO**.

### CR-01 — binding correction

While a basis-reduction proposal is unresolved:

> no new allocation consumption **or commitment binding** may use the prior effective basis where the action conflicts with the unresolved reduction target.

The prior basis remains effective to back existing historical exposure until reconciliation/downstream reduction is complete.

### Scope uniqueness limitation

For deterministic scope identities, uniqueness may be system-enforced.

For free-form/semantic scope, uniqueness is partly process-enforced:
- surface overlap candidates;
- require controlled human reconcile/split/identity decision before second authority activates;
- AI may suggest but may not silently merge/split/create authority.

### Shared/joint responsibility

This is a governed exception, not a bypass. It must preserve scope, affected basis owners, reason, authority, evidence, effective time and review/expiry conditions where applicable.

### Authorized requirement basis

Semantic owner type is:
1. `DEMAND_LINE`; or
2. `PLANNED_REQUIREMENT`.

Both obey the same version/change/conservation contract.

Planning evidence types such as `ESTIMATE_LINE`, `PROCUREMENT_PLAN_LINE`, and `LONG_LEAD_PLAN_ITEM` do not independently create authority.

ADR-0003 later decides whether DemandLine/PlannedRequirement remain separate physical types or collapse behind the common semantic contract.

### RequirementAllocation

Owns requirement-scope consumption only.

Basis modes:
- `QUANTITY_BASIS`;
- `SCOPE_PARTITION_BASIS`;
- `HYBRID`.

Hard quantity conservation occurs in one authoritative basis UOM. Cross-UOM consumption requires governed deterministic conversion with exact factor, version, precision, rounding and provenance.

Value/estimate variance is commercial governance, not allocation conservation.

Tender failure/re-tender does not automatically release scope. Award/commitment bind existing leaves rather than create another allocation balance.

### Later demand reconciliation

Later demand evidence does not retroactively falsify earlier valid planning authorization.

- match → corroborate;
- expansion → new higher basis effective before added consumption;
- reduction with releasable scope → release/resize first, then lower basis effective;
- reduction below award/commitment exposure → pending reconciliation until governed downstream reduction/cancellation/change resolves the excess.

If contractual exposure cannot be reduced, preserve the real mismatch/variance.

## Current sourcing lineage

`{DemandLine | PlannedRequirement}`
`→ RequirementAllocation`
`→ [optional ProcurementPackage]`
`→ TenderEvent`
`→ immutable TenderRelease/Addenda`
`→ TenderParticipant / bounded access`
`→ BidSubmission v1..n`
`→ source-linked normalization/internal evaluation`
`→ frozen ComparisonSnapshot`
`→ AwardRecommendation {evaluated_basis + contractable_agreed_basis}`
`→ ApprovalCase/DOA`
`→ AwardDecision`
`→ same RequirementAllocation lineage`
`→ P07`

Binding distinctions:
- supplier truth ≠ normalized view ≠ internal evaluation;
- evaluated basis ≠ contractable supplier-agreed basis;
- historical FX/tax comparison inputs frozen;
- award ≠ commitment.

## Complete provisional process set

- **P01** Demand / planning / package / cost attribution / RequirementAllocation
- **P02** Vendor qualification / contextual eligibility / bidder selection
- **P03** Tender event / immutable release / addenda
- **P04** External participation / intent / decline / submission / revision
- **P05** Bid normalization / leveling / comparison
- **P06** Recommendation / DOA / governed award
- **P07A** Commitment formation / original effective baseline
- **P07B** Controlled commitment change / variation
- **P07C** Goods receipt / GRN / invoice-match seam
- **P07D** Subcontract valuation / certification / retention / advance
- **P08** Commercial position / accounting authority / ERP interface
- **P09** Cross-cutting deterministic control plane
- **P10** Long-lead / procurement schedule / expediting
- **P11** Commercial closeout / security / warranty
- **P12** External technical/material approval dependency interface

No new core process may be added merely because another feature is imaginable.

## Review B — current active external gate

Canonical packet:

`04_phases/phase_1/P1.2_primary_workflow_evidence/audits/P1_2_REVIEW_B_COMMERCIAL_CORE_PACKET_V0_2.md`

Scope:
- P07A commitment formation/original baseline;
- P07B changes;
- P07C goods receipt;
- P07D subcontract certification/retention/advance;
- P08 accounting/ERP authority and reconciliation.

Review B explicitly attacks four internal watches:
- W01 over-receipt / surplus acceptance;
- W02 remeasurement / provisional sums / dayworks / instructed-but-unagreed work;
- W03 ERP rejection/correction authority direction;
- W04 generic vs domain-specific corrective event taxonomy.

Review B also attacks:
- duplicate-ledger risk;
- PO/subcontract false unification;
- RequirementAllocation overreach;
- original/pending/effective value semantics;
- earned vs payable vs paid positions;
- money/FX/tax/rounding reproducibility;
- correction/finalization/closed-period semantics;
- effective dating/concurrency/idempotency;
- Review A CR-01 regression.

Review B must PASS/remediate before Review C becomes the next external gate.

## Review C — prepared, not active yet

Prepared packet covers:
- P09 deterministic controls;
- P10 long-lead/schedule overlay;
- P11 closeout/security/warranty;
- P12 technical approval interface;
- complete P01–P12 burden/completeness.

Primary attacks:
- BPM/workflow-engine creep;
- Primavera/scheduling creep;
- CDE/submittal creep;
- legal/banking creep;
- object inflation;
- missing construction workflow;
- first-live-tender burden;
- retrofit-impossible omissions.

## Internal golden-thread status

Current internal execution has:
- `FAIL_INTERNAL = 0`;
- seven `PASS_WITH_WATCH` threads;
- remaining threads `PASS_PROVISIONAL`.

This is internal architecture consistency only, not primary validation or external PASS.

After Review B/C remediation, rerun golden threads.

## One-XL gravity guardrail

P07 remains the intended single XL commercial gravity well.

Reject expansion that makes:
- P08 full accounting ERP;
- P09 programmable BPM;
- P10 master scheduling platform;
- P11 banking/legal claims platform;
- P12 full CDE/submittal platform;
- P07C inventory/warehouse ERP.

## ADRs intentionally still open

- ADR-0003 Procurement structural root
- ADR-0004 PO/Subcontract physical model
- ADR-0005 Accounting/commercial ownership seam
- ADR-0007 Long-lead tracking object model
- ADR-0008 Workflow generality
- ADR-0010 GCC semantics/localization
- ADR-0011 Budget/cost attribution timing/ownership
- ADR-0012 External vendor identity/access
- ADR-0013 Event-derived status
- ADR-0014 Evidence/provenance depth
- ADR-0015 Posting/finalization/reversal/correction
- ADR-0018 Workflow→financial-state seam
- ADR-0019 Effective dating
- ADR-0020 In-flight configuration binding
- ADR-0021 Field/event integration authority/staleness
- ADR-0022 Money/rounding/calculation order
- ADR-0023 Numbering/concurrency/fiscal semantics

## P1.2 final closure requirements remain unmet

Before formal P1.2 close:
- 3–5 workflow reconstructions;
- at least 3 independent contractor workflows;
- at least 1 UAE independent case;
- at least 1 outside founder prior pattern;
- at least 1 original contractor bid-leveling artifact decomposed;
- supplier-side friction evidence;
- contradiction/variant/unmatched reconciliation;
- primary corroboration status;
- Review B/C blockers resolved.

Architecture progress is not commercial validation.

## Next action

Run external **Review B v0.2** now.

Do not reopen Review A unless Review B identifies a direct sourcing contradiction.