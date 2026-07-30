# P1.3 — Wave 2 Enterprise-Control Reconstruction v0.1

**Status:** PROVISIONAL / CONTINUATION-SAFE
**Competitors:** Oracle Aconex, Primavera Unifier, Textura, Trimble Vista, SAP Ariba, Coupa

## 1. Why Wave 2 exists

Wave 2 studies enterprise systems for **hard control patterns**, not as deployment templates.

The question is:

> Which enterprise semantics are expensive or dangerous to retrofit later, and which enterprise mechanisms should be rejected because they create a second XL product?

---

# 2. Oracle Aconex

## Observed strengths

Official product material emphasizes:
- cross-organization data ownership;
- immutable/unalterable audit trail;
- tender/bid distribution;
- secure guest access;
- view/submission tracking;
- confidential tender communications;
- formal document register;
- supplier-document package tracking;
- contracts/change/cost integration.

## BORROW

### A. Organization-aware evidence ownership

External organizations should not lose source ownership merely because information is visible inside the platform.

This supports P09/P12 evidence boundaries and later tenancy/identity work.

### B. Secure bounded tender participation

Aconex supports Aconex users and guest users for tender participation.

Borrow the principle, but keep V1 participation lighter than a full CDE identity model.

### C. Immutable tender communication/audit

Tender clarifications, addenda, issue/receipt/submission history must be reconstructable.

### D. Supplier-document status/dependency

Useful for P12: procurement may track a bounded external approval/document dependency without owning the full document-management universe.

## REJECT

- Full CDE ownership as prerequisite to procurement.
- Project correspondence/document administration becoming P12 scope.

---

# 3. Primavera Unifier

## Observed strengths

Unifier is a configurable capital/project process platform combining business-process forms/workflows, cost management, documents and fund/project controls.

Official documentation shows:
- BPs create durable records;
- workflows route forms through review/revision/approval;
- actions and steps are recorded;
- terminal approved/rejected states exist;
- cost-type BPs can represent contracts/POs/change orders/invoices/payment applications;
- cost sheets can roll up values from business processes by status.

## BORROW

### A. Historical workflow action/evidence

Every governed action should retain actor, step/action, time and resulting domain effect.

### B. Terminality / history preservation

Finalized/terminal business records should not be casually rewritten.

### C. Cost projections fed by transactions

Cost/reporting views should derive from domain transactions rather than become an independently editable second truth.

## ADAPT

Unifier's BP engine proves that configurable workflows are valuable in enterprise contexts.

Our P09 direction remains intentionally narrower:
- fixed product-level gate classes;
- bounded role/threshold/config values;
- no arbitrary customer-designed domain state machine for V1.

## REJECT

- uDesigner-style general BPM as a V1 prerequisite;
- arbitrary forms/data-element system as our procurement ontology;
- cost sheet as authoritative commercial ledger separate from P07/P08 events.

---

# 4. Oracle Textura

## Observed strengths

Textura specializes in subcontract invoicing/payment/compliance and integrates with accounting systems and Aconex.

Official evidence shows:
- subcontractor claims/approvals;
- compliance controls;
- payment analytics/status;
- ERP/accounting integration;
- approved claims can flow into Aconex's document record.

## BORROW

### A. Payment/claim as a specialized boundary

This supports our P07D/P08 distinction:

`claim ≠ assessment/certification ≠ accounting/payment`

### B. Integrate without duplicating document truth

A payment system can own payment processing while procurement/commercial history retains references and evidence.

## REJECT

- becoming payment rail/banking platform in V1;
- North-American lien-waiver/payment-specific ontology as universal contractor truth.

---

# 5. Trimble Vista

## Observed strengths

Vista is a deep construction ERP.

Current official documentation shows:
- requisitions can route through Quote / Stock / Purchase paths;
- approval can be applied depending on route/situation;
- direct purchase route can bypass quoting when appropriate;
- requisitions can be added to quotes or purchase orders;
- PO receipts have explicit transaction/action semantics;
- posted receipts/POs require controlled change behavior;
- activity such as receipt/invoice/change can lock fields on previously posted POs.

## BORROW

### A. Multiple legitimate procurement routes

Strong corroboration for package optionality and ordinary-material/direct-source paths.

### B. Posting/finalization matters

Once downstream financial/fulfillment activity exists, editing the original commercial record becomes constrained.

This strengthens ADR-0015 and P07/P08 correction semantics.

### C. Receipt as a real transaction

Receipt/posted receipt/change/delete semantics must preserve history and cannot be inferred from invoice alone.

## ADAPT

Route flexibility belongs in domain commands/policies, not a generic routing engine.

## REJECT

- inventory/stock/work-order ownership as mandatory procurement scope;
- ERP batch/posting UI patterns as our user experience;
- full GL/job-cost/accounting ownership.

---

# 6. SAP Ariba

## Observed strengths

Ariba provides mature supplier lifecycle and sourcing controls.

Official documentation distinguishes:
- supplier request;
- supplier registration;
- qualification/preferred status;
- sourcing relationship;
- fulfillment/trading relationship;
- sourcing event lifecycle;
- supplier intent/decline/response;
- review responses / pending selection;
- award scenarios and split awards.

## Documented event state sequence

Classic sourcing event statuses include:

`PREVIEW → OPEN → PENDING_SELECTION → COMPLETED`

with `CANCELLED` as an abort path after publishing.

Guided sourcing similarly moves into review-response/pending-selection after bidding closes.

## BORROW

### A. Qualification ≠ sourcing participation ≠ fulfillment relationship

This strongly corroborates P02/P04/P07 separation.

### B. Duplicate supplier prevention / lifecycle governance

Supplier master quality and lifecycle transitions need explicit control.

### C. Award scenarios / split award

Useful corroboration for P06 scenario analysis and split award before commitment.

### D. Explicit sourcing event states

A sourcing event has its own lifecycle separate from supplier lifecycle and later trading/fulfillment.

## ADAPT

Ariba's mature supplier-management depth should inform architecture seams, but V1 should implement only P1.1-classified supplier controls.

## REJECT

- heavy persistent supplier-network relationship as prerequisite for every tender;
- global enterprise-category/procurement-suite configuration burden.

---

# 7. Coupa

## Observed strengths

Official supplier documentation shows:
- sourcing events/RFx participation;
- supplier portal;
- email-based Supplier Actionable Notifications for purchase-order actions;
- supplier transaction management including POs, invoices and ASNs depending on customer configuration;
- event evaluation states.

## BORROW

### A. Actionable email

Strong pattern for external participation:

> let external parties complete bounded actions from the channel they already use.

Our V1 should consider secure task links/email actions before requiring portal adoption.

### B. Buyer-configurable event forms

Useful for package-specific sourcing schema where bounded by our comparison grammar.

### C. Sourcing vs transaction lifecycle

Supplier sourcing participation and later fulfillment transactions should remain separable.

## REJECT

- full spend-management/P2P platform as product boundary;
- supplier portal complexity as default participation model;
- configuration depth that prevents fast first-live-tender deployment.

---

# 8. Wave 2 design inheritance

## BORROW strongly

1. Aconex — immutable cross-party evidence and tender communication audit.
2. Aconex — guest/bounded external tender access.
3. Unifier — terminality + durable workflow action history.
4. Unifier — reporting/cost projections fed from domain transactions.
5. Textura — specialized payment/compliance system can coexist through references/integration.
6. Vista — multiple procurement routes and controlled posted-record correction.
7. Vista — explicit receipt transactions.
8. Ariba — supplier request/registration/qualification/sourcing/fulfillment are distinct relationships.
9. Ariba — explicit event lifecycle + split award scenarios.
10. Coupa — actionable email as low-friction external workflow.

## ADAPT

- enterprise workflow engines → bounded domain operations + fixed control classes;
- supplier networks → contextual vendor state + task-focused access;
- cost sheets → derived commercial/reporting projections;
- ERP posting → explicit external authority/reconciliation state;
- supplier portals → optional channel, not default dependency.

## REJECT

- full CDE;
- full BPM designer;
- full accounting/payment platform;
- inventory/WMS ownership;
- global enterprise supplier-network implementation;
- mandatory portal behavior.

---

# 9. Commercial lesson from Wave 2

Enterprise products validate the seriousness of the domain, but they also expose the opportunity/risk boundary.

The valuable controls are:
- evidence;
- approval;
- state/terminality;
- sourcing/fulfillment separation;
- receipt/posting/correction;
- accounting authority;
- supplier lifecycle.

The expensive baggage is:
- generalized workflow design;
- enterprise data model administration;
- deep CDE;
- full accounting;
- network onboarding;
- long implementation.

Our competitive thesis becomes sharper:

> **enterprise-grade commercial semantics, specialist-procurement workflow, small-footprint deployment.**

P1.3 must still prove this is a coherent combination rather than an attractive slogan.
