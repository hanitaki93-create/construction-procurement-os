# P1.3 — Design Inheritance Register v0.1

**Status:** PROVISIONAL / FEEDS P1.4

This is the explicit **best-of-each + our touch** register.

A borrowed competitor pattern never outranks P1.2 primary evidence or P1.1 frozen scope.

---

## DI-01 — Requirement intake

### Best observed
- Kojo: field-first material request UX.
- Vista/CMiC: requisition semantics and approval/purchase routing.
- Qotera: messy incomplete request accepted and normalized operationally.

### Our touch

Support both:
- fast material/MR path;
- package/complex-scope path.

Users should not need to understand allocation ontology to ask for material.

### Reject
- package required for every purchase;
- inventory/work-order ERP dependency.

---

## DI-02 — Procurement package / tender setup

### Best observed
- ProcurePro: construction-specific package/tender focus.
- Procore/BuildingConnected: custom bid forms and package-specific response structure.
- CMiC: bid package can group individual buyout items and documentation.

### Our touch

ProcurementPackage remains optional.
TenderEvent/Release is distinct from planning package.
Response/comparison schema is package-specific.

### Reject
- ProcurementPackage as universal structural root.

---

## DI-03 — Supplier participation

### Best observed
- ProcurePro: no-signup/no-fee tender access.
- Procore: email attachment submission updates workflow status.
- Aconex: secure guest tender access.
- Coupa: actionable email concept.

### Our touch

Task-focused secure external access with multiple channels:
- guest link;
- email reply/attachment;
- optional portal;
- buyer-on-behalf capture where governed.

Source/capture provenance always preserved.

### Reject
- persistent supplier portal account as mandatory prerequisite.

---

## DI-04 — Supplier lifecycle / eligibility

### Best observed
- SAP Ariba: request → registration → qualification/preferred; sourcing vs fulfillment relationships.
- BuildingConnected/TradeTapp: qualification/risk context during selection.
- CMiC: prequalification plus historical ratings/performance.

### Our touch

Keep separate:
`Vendor master`
`≠ QualificationRecord`
`≠ EligibilityEvaluation`
`≠ TenderParticipant`
`≠ Invitation`
`≠ Intent`
`≠ Submission`

Qualification is contextual, not one global approved bit.

### Reject
- heavy supplier-lifecycle implementation before first tender where not needed.

---

## DI-05 — Quote / bid capture

### Best observed
- Procore: structured forms plus email submission.
- ProcurePro: consistent price breakdowns.
- BuildingConnected: scope-specific custom bid forms.
- P1.2 Perflex evidence: arbitrary supplier documents, brands, gaps and system-level scope differences.

### Our touch

Preserve immutable supplier source truth and allow:
- structured response;
- PDF;
- Excel;
- email attachment;
- manual/buyer-on-behalf capture.

All normalize into comparison mapping after receipt.

### Reject
- structured response as the only legal bid representation.

---

## DI-06 — Bid comparison / leveling

### Best observed
- Procore: side-by-side leveling, missing/excluded counts, alternates, private lines, notes/history.
- BuildingConnected: side-by-side apples-to-apples comparison with scope-specific forms.
- ProcurePro: Compare & Recommend + AI BidLevel direction.
- CMiC: buyout-item selection and flexible mapping.

### Our touch

Four immutable semantic layers:
1. supplier submission;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

Mapping supports:
- exact;
- partial;
- bundled;
- alternate/substitute;
- supplier-added;
- missing;
- not applicable;
- unresolved clarification.

Comparison layout is configurable by package, but semantics/provenance are fixed.

### Reject
- editing supplier-origin truth as a leveling action;
- raw total-price ranking without coverage disclosure.

---

## DI-07 — Recommendation / approval / award

### Best observed
- ProcurePro: connected Compare & Recommend / approvals.
- Procore: soft award and fast contract conversion.
- Ariba: review-response phase and award scenarios/split award.

### Our touch

Operationally fast, semantically separate:

`ComparisonSnapshot`
`→ AwardRecommendation`
`→ ApprovalCase`
`→ AwardDecision`
`→ commitment preparation`

Split/non-lowest/sole-source outcomes preserve structured justification/evidence.

### Reject
- approval status as committed cost;
- internal evaluated plug becoming supplier contract price.

---

## DI-08 — Commitment formation

### Best observed
- CMiC: PO/subcontract are both commitments with different behavior.
- Procore: selected bid quickly becomes PO/subcontract.
- Vista/CMiC: approved requisition / purchase processing semantics.

### Our touch

`AwardDecision ≠ Effective Commitment`

Fast conversion can prepare the obligation, but effectiveness requires the applicable legal/commercial formation evidence.

ADR-0004 physical model remains open.

### Reject
- one generic commitment type that erases PO/subcontract differences;
- automatic contractual effect merely because award is selected.

---

## DI-09 — Framework / blanket purchasing

### Best observed
- CMiC blanket PO/release behavior.
- enterprise sourcing frameworks generally separate terms and transactions.

### Our touch

CommercialTermsAuthority separate from scope-consuming call-off obligation.
Scope-backed minimum reservation and monetary minimum exposure remain distinct.

### Reject
- treating rate agreement itself as physical scope consumption when no minimum obligation exists.

---

## DI-10 — Fulfillment / receipt

### Best observed
- Kojo: field delivery visibility, damaged/missing/return proof.
- Vista/CMiC: explicit PO receipt transactions and invoice matching.

### Our touch

`delivery ≠ receipt ≠ acceptance ≠ return ≠ invoice ≠ payment`

Evidence-rich partial receipt with history-preserving correction.

### Reject
- invoice as proof of receipt;
- full warehouse/WMS ownership.

---

## DI-11 — Subcontract valuation / payment

### Best observed
- Textura: specialized subcontract payment/compliance workflow.
- Unifier: cost BP/SOV/payment-application semantics.
- construction ERP suites: retention and posting controls.

### Our touch

`claim ≠ buyer assessment ≠ certification ≠ AP/invoice ≠ payment`

Gross earned value remains distinct from retention, advance recoupment and buyer recovery.

Accounting/payment authority configurable through P08.

### Reject
- full payment rail/banking/lien platform as universal scope.

---

## DI-12 — Changes / correction

### Best observed
- Vista: downstream receipt/invoice/change activity restricts editing; posted transactions require controlled re-entry/change.
- Unifier: terminal records and workflow history.

### Our touch

Append/correct through domain-specific semantics:
- reverse and replace;
- forward adjust;
- physical reversal;
- reclassify;
- non-domain integration correction.

### Reject
- destructive edit of already-operated commercial truth.

---

## DI-13 — Procurement schedule / long lead

### Best observed
- ProcurePro: live procurement schedule that updates from work completed.

### Our touch

Actual milestones derive from domain events.
Required/baseline/forecast/supplier-confirmed dates are distinct.
Simple local deterministic forecast is allowed.

### Reject
- manual status spreadsheet inside the product;
- recursive CPM/master-schedule engine.

---

## DI-14 — Technical/document approval

### Best observed
- Aconex: formal document register, review, supplier-document packages and audit.

### Our touch

Own only procurement dependency/gate semantics and source references.
Allow Aconex/CDE to remain authoritative where present.

### Reject
- full drawing/submittal/CDE product.

---

## DI-15 — Workflow / approvals

### Best observed
- Unifier: explicit routed workflow actions, revisions, approvals, terminal states and history.
- CMiC/Vista: amount/group/location approval controls.

### Our touch

Fixed product-level gate classes + bounded effective-dated configuration.
Domain command revalidates truth at transition time.

### Reject
- arbitrary customer BPM/state-machine designer in V1.

---

## DI-16 — Accounting / integration

### Best observed
- CMiC/Vista: native accounting depth and posting semantics.
- Textura/Aconex: specialized systems exchanging authoritative records.
- Procore/Kojo: integrated operational front ends.

### Our touch

Field/event authority:
- `OWN`
- `MIRROR`
- `REFERENCE`

with explicit send/accept/reject/stale/reconcile lifecycle.

### Reject
- duplicate editable ledger;
- full GL/AP/cash ownership.

---

## DI-17 — Evidence / audit

### Best observed
- Aconex: cross-party data ownership and immutable audit.
- Unifier: action-by-action workflow record.
- Procore: leveling activity history.
- ERP systems: posted transaction history.

### Our touch

Deep provenance on load-bearing commercial actions, including source document/version/location where applicable.

### Reject
- audit log as generic timestamp list detached from business meaning.

---

## DI-18 — User experience / adoption

### Best observed
- Kojo: field-first, mobile, shopping-like request experience.
- JobTread/Buildxact: transparent simple packaging/setup.
- ProcurePro: focused construction-procurement workflow.

### Our touch

Enterprise-grade substrate can exist underneath a narrow role-focused UX.
First value must not require whole-company implementation.

### Reject
- making every user learn the complete ontology;
- implementation project before first tender.

---

# Final P1.3 inheritance thesis

The intended product is **not**:
- mini-Procore;
- mini-CMiC;
- ProcurePro clone;
- construction Coupa;
- Kojo plus subcontracts.

The current synthesis is:

> **ProcurePro's focus + Procore/BuildingConnected's bid UX + CMiC/Vista's commercial rigor + Ariba's lifecycle discipline + Aconex's evidence model + Kojo's low-friction field/material experience — bounded by our P1.1 one-XL rule and P1.2 contractor truth.**

That synthesis is an architecture input, not a promise that all borrowed capabilities ship in V1.
