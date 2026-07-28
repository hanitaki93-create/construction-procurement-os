# P1.1-B — Falsifiable Wedge Hypotheses v0.1

**Status:** PROVISIONAL / NOT FROZEN  
**Leading beachhead:** Candidate A — UAE private-sector mid-market main contractors.

These wedges must create deterministic value without advanced AI. Later AI may compress data-entry/reasoning effort but is not required for viability.

## WEDGE-01 — Procurement Control Loop

**Target buyer/user**  
Procurement Manager / Head of Procurement, with project managers, QS/commercial staff and approvers participating.

**Current-process hypothesis**  
A meaningful share of procurement delay and control failure comes from fragmented MR/package status, RFQs, bidder responses, comparisons, recommendation/approval state and award follow-up across spreadsheets, email/messages and disconnected systems.

**Deterministic capability**  
One controlled flow from procurement plan / MR / package → RFQ → bidder participation → quote/revision capture → comparison → recommendation → approval → award/commitment handoff, with transaction-derived status, evidence and ball-in-court.

**Expected measurable improvement**
- at least 25% reduction in median RFQ-issued → approved-award elapsed time for comparable packages; **or**
- at least 50% reduction in duplicated manual status updates / tracker reconciliation events;
- 100% of active sourcing events expose current owner, next action and evidence trail without searching email threads.

**Kill / revise condition**
- fewer than roughly 20% of observed delays/control failures are caused by information fragmentation, handoff, approval or status uncertainty; or
- representative teams refuse to replace the existing tracker as operating truth even when required information is available; or
- workflow variance prevents a shared deterministic sourcing spine without heavy project-by-project customization.

**Architecture consequence if supported**  
Sourcing lifecycle, approval/authority, evidence, supplier participation and event-derived status are V1 SPINE.

---

## WEDGE-02 — Commercial Commitment Truth

**Target buyer/user**  
Commercial Manager / Procurement Manager / Finance Controller / GM responsible for cost exposure and project commitments.

**Current-process hypothesis**  
Award, PO/subcontract value, approved/pending changes and budget/cost attribution are often reconciled manually because operational procurement truth and accounting/job-cost truth are separated in time and ownership.

**Deterministic capability**  
A canonical commercial commitment layer linking approved award → PO/subcontract → cost attribution → controlled change events → committed/pending commercial balances, with explicit accounting/ERP ownership seam and reconciliation status. V1 does not need to own the GL or payment execution.

**Expected measurable improvement**
- at least 90% of open awarded/committed scope can be reconciled to a named cost attribution and current commercial value without a parallel commitment spreadsheet;
- at least 50% reduction in manual monthly commitment reconciliation effort for the workflows placed inside V1;
- no approved award can silently diverge from the issued commitment without a visible change/reconciliation event.

**Kill / revise condition**
- representative contractors already obtain timely, trusted operational commitment truth from their existing ERP with no material parallel spreadsheet/manual reconciliation; or
- useful adoption requires the product to own AP/GL/payment accounting before commitment control has standalone value; or
- accounting authority differences make a common commercial substrate impossible without replacing the back office.

**Architecture consequence if supported**  
Cost attribution, commitment identity, commercial events, change/reversal semantics and ERP authority/reconciliation seam remain high-ceiling substrate even if downstream accounting stays external.

---

## WEDGE-03 — Low-Friction Supplier Participation + Comparison-Ready Tender Evidence

**Target buyer/user**  
Procurement team internally; vendors/subcontractors externally.

**Current-process hypothesis**  
Tender quality and comparison effort degrade when vendors respond through uncontrolled email attachments/messages, revisions are ambiguous, and portal/account friction reduces participation.

**Deterministic capability**  
Secure invitation/guest participation, controlled bid forms and attachments, clarification/revision history, acknowledgement/deadline state, structured requested pricing breakdowns and a comparison-ready evidence record. Deterministic V1 may still require human normalization of non-structured supplier attachments.

**Expected measurable improvement**
- at least 70% of invited responsive suppliers can participate without maintaining a heavyweight permanent portal account;
- 100% of included bid revisions have explicit version/time/source identity;
- at least 40% reduction in manual effort spent identifying the latest bid, missing commercial fields and revision differences before comparison.

**Kill / revise condition**
- structured/guest tender participation materially reduces supplier response rates or causes users to revert to unmanaged email as the authoritative channel; or
- supplier behavior is so attachment-only that deterministic structured capture adds more friction than value before AI extraction exists; or
- comparison preparation is not a meaningful pain once revision/evidence control is solved.

**Architecture consequence if supported**  
External identity/access, tender evidence/versioning and communication capture are SPINE; broad supplier-portal features remain optional.

---

# Joint wedge test

The three wedges are intentionally connected but independently falsifiable.

A credible V1 should be able to prove value with **WEDGE-01 + enough of WEDGE-02 to preserve commercial truth**. WEDGE-03 strengthens sourcing efficiency but must not force a heavyweight vendor portal.

The beachhead is weakened if all three require enterprise-grade ERP replacement, a full CDE, or broad accounting ownership before measurable value appears.

# P1.2 evidence needed

Primary workflow reconstruction must collect baseline examples for:
- RFQ issue → award elapsed time and delay reasons;
- number of parallel trackers/manual status updates;
- award/commitment/change reconciliation process;
- exact ERP/accounting ownership and lag;
- vendor invitation/response/revision behavior;
- manual comparison preparation effort;
- cases where the hypotheses fail or the observed contractor has no equivalent problem.
