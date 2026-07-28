# P1.2 — CAL-001 Secondary Reference Gap Matrix v0.1

**Status:** PROVISIONAL / AUDIT LATER  
**Purpose:** Continue learning from CAL-001 gaps using mature construction systems without converting secondary patterns into contractor facts.

| CAL-001 gap | Provisional best-practice expectation | Reference basis | Later audit question |
|---|---|---|---|
| budget/cost-code timing and authority | Commercial commitments should carry explicit cost/CBS attribution; budget may be product-owned or mirrored, but current commercial position must reconcile to an attributable baseline/context. | Unifier cost sheets/base commits; CMiC committed cost/job allocation | At what exact step do real contractors assign cost code/budget, and which system wins if procurement and accounts disagree? |
| exact DOA/approval route | Requisition, PO/subcontract, changes and payment requests may each have distinct approval rules; authority should be amount/context sensitive and historically reproducible. | CMiC approval structures; Procore permission/award prerequisites | Which transitions actually require approval, who approves, and does authority depend on value/project/category/legal entity? |
| bidder selection/invite mechanics | Mature systems maintain bidder invitation/coverage and vendor qualification/risk context; selection should be explicit rather than inferred from received bids. | Procore bidder management; Autodesk BuildingConnected/TradeTapp | How are bidders really selected, approved, invited, substituted, declined and considered non-responsive? |
| bid revision / comparison truth | Original submission and internally leveled/adjusted version should remain distinct; comparison should preserve line-level normalization and adjustments. | Procore bid leveling; Autodesk side-by-side leveling | Does the contractor comparison preserve source revision + adjustments, or does the spreadsheet overwrite/restate bidder truth? |
| award justification | Award should be a governed decision distinct from commitment issuance, capable of explaining non-lowest selection and referencing the bid basis. | Procore award/soft-award/convert-to-commitment pattern | What artifact/state proves who was selected and why before the PO/subcontract exists? |
| PO vs subcontract divergence | PO and subcontract are both commitments but differ in project binding, legal richness, SOV/progress/change/payment semantics. | CMiC PO/module interactions; Procore commitments | Which fields/events are truly common and which must be subtype-specific in observed contractor practice? |
| variation/change lifecycle | Current commitment should equal original commitment plus controlled approved change effects; pending and approved changes should remain distinguishable. | Unifier change commits/SOV; CMiC change orders | How do contractors initiate, price, approve, post and reconcile changes before final commitment value changes? |
| subcontract valuation/certification | Subcontract downstream truth typically uses SOV + progress/payment request + approval/posting, not GRN semantics. | CMiC Request for Payment/Subcontract Management; Unifier Spends/payment application | What is measured, claimed, certified and posted in the contractor's actual workflow, and which date/state affects current commercial position? |
| retention / advance / recoupment | Retention and advance recovery should be explicit commercial positions tied to valuation/payment events; prior/current/released/recovered amounts matter. | CMiC retainage/RFP; CMiC advance/amortization | Are these positions calculated per contract, SOV line or claim; how are overrides/release/recoupment authorized? |
| accounting field authority | Procurement/commercial system should not silently overwrite authoritative accounting data; sync/interface semantics need ownership and reconciliation. | Procore ERP constraints; Unifier/CMiC financial integration | Which system owns budget, invoice, paid status, posting date and corrections in practice? |
| technical/material approvals | External submittal approval can be a prerequisite/gate without requiring procurement OS to become a full submittal system. | Autodesk Build submittal roles/workflows + observed CAL-001 process | Which procurement transitions are actually blocked by technical approval and what minimum external reference/state is needed? |
| procurement schedule/status | Milestone dates may be planned manually, but completion/status should derive from transaction events where possible to avoid a parallel status tracker. | ProcurePro live procurement schedule pattern | Which dates are true planning inputs, which statuses are derived, and where do teams manually override forecasts? |
| compliance gating | Qualification/compliance may gate bidder eligibility, award or payment; override should be explicit and privileged. | Autodesk TradeTapp; CMiC compliance holds | Which compliance conditions are warnings vs hard blocks in real contractor workflows, and who may override them? |

## Current use

These expectations may guide provisional design and future questions immediately.

They are **not** inserted into CAL-001 as observations and they do not change P1.2 gate counts.

Later primary cases should be captured without exposing this matrix to the participant. After raw reconstruction, compare the evidence against it and mark each row:
- `CORROBORATED`;
- `CONTRADICTED`;
- `UNOBSERVED`;
- `NOT_TESTED`.
