# P1.3 — Wave 1 Competitor Reconstruction v0.1

**Status:** PROVISIONAL / ACTIVE
**Competitors:** ProcurePro, Procore, Autodesk BuildingConnected, CMiC, Kojo
**Source register:** `registers/P1_3_COMPETITOR_SOURCE_REGISTER_V0_1.csv`

## 1. Executive finding

Wave 1 does **not** reveal one incumbent whose architecture should be copied.

It reveals four strong archetypes:

1. **ProcurePro** — procurement is important enough to be its own construction operating layer.
2. **Procore / BuildingConnected** — bidding is strongest when connected to project/vendor/history data and when suppliers can respond flexibly.
3. **CMiC** — construction financial truth benefits from tight requisition/PO/subcontract/accounting semantics, but a full ERP creates large adoption gravity.
4. **Kojo** — a narrow field/material purchasing wedge can create value before an enterprise construction platform exists.

Current product direction strengthened:

> Build a contractor procurement/commercial operating layer with enterprise-grade truth, but allow narrow deployment and low-friction supplier/field participation.

The product should inherit **control quality**, not enterprise implementation burden.

---

# 2. ProcurePro

## 2.1 Observed product boundary

Public product material presents one connected construction procurement flow around:

`estimating handover / procurement schedule → scope → tenders + price breakdowns → compare + recommend → approvals → contracts/eSignature → vendor data/ratings/lessons`

The procurement schedule is positioned as live operational visibility rather than a separately updated report. Tender price breakdowns aim to standardize supplier pricing before comparison. Compare & Recommend centralizes commercial selection and approval.

## 2.2 Strong patterns

### A. Procurement schedule as projection of work

**BORROW / ADAPT.**

Procurement progress should drive schedule health automatically where canonical events exist.

Our adaptation:
- actual milestone = projection from P01–P12 canonical events;
- forecast/supplier-confirmed dates remain versioned planning facts;
- no CPM/master-schedule expansion.

### B. Supplier price breakdowns

**ADAPT, not literal copy.**

Structured supplier responses can reduce leveling work, especially for repeatable packages.

P1.2 evidence proves one fixed bid form is insufficient. Therefore:
- use package-specific `ComparisonSchema` / response structure;
- encourage structured response where useful;
- preserve PDF/Excel/email/manual messy submissions;
- map them to canonical comparison basis;
- never make supplier portal structure the only legal truth.

### C. Frictionless supplier access

**BORROW strongly.**

ProcurePro explicitly positions vendor access as no-signup/no-fee/no-password friction.

This directly supports P04's external access principle.

### D. Compare + Recommend + approval connection

**BORROW / ADAPT.**

Keep comparison, recommendation and approval connected operationally while preserving semantic separation:

`ComparisonSnapshot ≠ AwardRecommendation ≠ ApprovalCase ≠ AwardDecision ≠ Effective Commitment`

### E. AI bid leveling

**WATCH / future ADAPT.**

BidLevel demonstrates commercial demand for extracting price breakdowns/exclusions from supplier quotes.

Our later AI should propose mappings/normalization with source evidence and confidence; deterministic P05 owns accepted truth.

## 2.3 Reject / watch

- Do not require standardized supplier breakdown to handle every complex scope.
- Do not allow procurement schedule milestones to become separate manual truth.
- Public evidence is insufficient to reconstruct exact internal state machine; keep `UNKNOWN_PUBLIC_EVIDENCE` where needed.

## 2.4 Strategic lesson

ProcurePro is the strongest direct evidence that **construction procurement itself can be a standalone software category**, not merely a module inside accounting ERP.

---

# 3. Procore Bidding / Financials

## 3.1 Observed product boundary

Procore Bidding supports:

`bid package → bid form → bidders/invitations → intent/submission → bid leveling → award → PO/subcontract conversion`

The broader platform connects bidding with vendor/project history, estimating, commitments, documents and financials.

## 3.2 Documented state/transition reconstruction v0.1

### Bid package

Documented package status values include:
- `OPEN`
- `CLOSED`

Operational transition reconstructed from official help:

`CREATE PACKAGE`
`→ OPEN`
`→ configure bid form / bidders`
`→ invitations issued`
`→ bidder intent / submission facts accumulate`
`→ bids received`
`→ leveling/evaluation`
`→ award / soft-award where used`
`→ convert selected bid to PO/Subcontract`
`→ CLOSED`

Important: some intermediate labels above are **operational stages, not claimed Procore persisted status codes**.

### Bidder participation

Official screens distinguish:
- invitation not sent / n.a.;
- intent to bid;
- submission status;
- submitted bid amount;
- email submission can automatically mark bidder status `Submitted`.

This supports P04's separation of access/intent/submission facts.

## 3.3 Strong patterns

### A. Custom bid forms with typed response fields

**BORROW / ADAPT.**

Official bid forms support:
- amount;
- unit/quantity;
- include/exclude;
- alternates;
- lump-sum behavior.

This matches our conclusion to standardize comparison grammar, not one form.

### B. Bid leveling

**BORROW mechanics, strengthen truth separation.**

Procore exposes:
- missing/excluded item counts;
- side-by-side bids;
- private leveling items;
- edits/notes/color;
- activity/change history;
- lowest-to-highest sorting.

Our adaptation must preserve four layers:
1. immutable supplier submission;
2. normalized representation;
3. internal evaluation adjustment;
4. supplier-confirmed contractable basis.

A leveled edit must never mutate supplier-origin truth.

### C. Email bid submission

**BORROW strongly.**

Bidders can respond through invitation email attachments and Procore records submission status/activity.

This supports low-friction P04 ingestion rather than portal-only behavior.

### D. Direct award-to-commitment UX

**ADAPT.**

Fast conversion is good UX, but the architectural seam stays:

`AwardDecision ≠ EffectiveCommitmentBaseline`

Conversion may prepare a commitment but cannot erase formation/effectiveness/approval controls.

### E. Project/vendor history in bid evaluation

**BORROW later.**

Historical vendor performance and project history belong beside the current bid as decision context, not inside supplier price truth.

## 3.4 Reject / watch

### Enterprise gravity

Procore pricing is annual/product/turnover-volume based and includes implementation services. The platform spans many construction workflows.

**REJECT as mandatory adoption model.**

Our first paid sourcing surface must not require full project/financial implementation.

### Potential leveling-truth ambiguity

Public leveling allows administrators to edit bid values in the leveling view with history.

Our design must make the semantic difference between supplier value and buyer adjustment more explicit than a generic editable leveled cell.

---

# 4. Autodesk BuildingConnected / TradeTapp

## 4.1 Observed product boundary

BuildingConnected emphasizes:

`builder network → vendor discovery/qualification → bid package/custom bid form → invitations → centralized communication → bid leveling → selection`

TradeTapp adds subcontractor risk/qualification.

## 4.2 Strong patterns

### A. Network-assisted bidder discovery

**WATCH / later ADAPT.**

A large network can improve coverage and data quality, but building a supplier marketplace/network is not required for V1.

Our V1 should start with tenant-owned vendor data plus low-friction external participation.

### B. Scope-specific custom bid forms

**BORROW.**

Supports the P1.2 primary artifact conclusion that comparison shapes differ by package.

### C. Bid leveling + risk in same decision surface

**BORROW / ADAPT.**

Commercial comparison should expose relevant qualification/performance context without blending those facts into quoted price.

### D. Ryan Companies case — anti-standardization lesson

Official customer evidence describes different locations using different bid forms, detail levels and presentation formats, with large Excel workbooks causing duplicate entry and collaboration problems.

This mirrors Perflex primary evidence.

Our answer is not one universal spreadsheet. It is:
- shared comparison grammar;
- package-specific schema;
- stable provenance;
- flexible views.

## 4.3 Reject / watch

- Do not make participation dependent on a construction network identity.
- Do not build network/qualification economics before core procurement pull exists.

---

# 5. CMiC

## 5.1 Observed product boundary

CMiC is a construction ERP/single-database model linking prequalification, bid management, buyout, subcontracts, purchase orders, job cost and accounting.

This is valuable primarily as a **truth and financial-boundary benchmark**, not as our adoption model.

## 5.2 Documented state/transition reconstruction v0.1

### Bid package state classes

Official CMiC documentation defines system classes:
- `NEW`
- `IN_PROCESS`
- `AWARDED`

Deployments may create status codes mapped to these classes.

### Bidder participation

Bid package bidder behavior includes:
- bidder added;
- invitation;
- intent `bid / not bid` can change before due date;
- vendor submission updates analysis;
- prequalification and approval states visible;
- desired buyout items selected by vendor;
- `PURCHASE` transitions selected buyout into base contract/change/addition to existing unposted contract/change.

### Requisition → PO

Official module interaction:

`REQUISITION`
`→ APPROVED REQUISITION`
`→ generate PURCHASE ORDER`
`→ PO follows PO approval/processing rules`

This strongly distinguishes approved demand from purchasing commitment.

## 5.3 Strong patterns

### A. Flexible buyout mapping

**BORROW conceptually.**

CMiC buyout supports:
- one-to-one project item;
- one buyout item linked to multiple project bid items;
- manual buyout item with no source project item.

This is strong competitor corroboration for flexible many-to-many comparison/allocation semantics.

### B. PO vs subcontract distinction

**BORROW semantics, do not prematurely close ADR-0004 physical model.**

CMiC explicitly treats both as commitments but notes materially different job/legal behavior.

### C. Purchase directly from bid analysis

**BORROW UX / retain our guards.**

Selection can flow directly into contract/change creation, but our formation and scope-conservation guards remain.

### D. Integrated receipt / invoice match / accounting

**BORROW truth concepts, reject ERP ownership.**

CMiC demonstrates why posting, receipts, invoices, compliance and job cost must have clear semantics.

Our P08 remains a bounded authority/integration seam rather than a full GL/AP/inventory ERP.

### E. Blanket PO / release

**BORROW as corroboration.**

CMiC supports blanket POs with release procedure, strengthening Review B's framework/call-off direction.

## 5.4 Challenge to carry forward

CMiC permits project bid items to be purchased multiple times and records whether they have been purchased.

This does **not** by itself falsify FT-10 / exclusive-scope conservation, because an item can represent repeatable or non-exclusive scope. But it is a useful challenge:

> P1.4/P1.5 must not mistake an ERP item identifier for an exclusive physical-scope identity.

---

# 6. Kojo

## 6.1 Observed product boundary

Kojo is materials/field-spend focused:

`field material request → sourcing/RFQ → compare sources → PO → delivery/receipt/returns → invoice reconciliation/accounting integration`

It also reaches warehouse/prefab/inventory, tools and broader spend.

## 6.2 Strong patterns

### A. Field-first requisition UX

**BORROW strongly for material path.**

Field users should be able to submit a clean enough requirement from mobile without understanding procurement ontology.

### B. Material request → RFQ / PO

**BORROW as narrow fast path.**

Not every procurement event needs a heavyweight package/tender.

This aligns with P1.1 package optionality and P01 material-demand path.

### C. Sourcing grid

**BORROW / ADAPT.**

Kojo compares current/historical pricing across suppliers, warehouse and buyouts.

Our V1 may initially compare suppliers only; inventory/warehouse remains interface/out unless evidence changes boundary.

### D. Delivery proof / damaged / missing / return

**BORROW.**

This supports P07C partial receipt and evidence-rich fulfillment.

### E. Accounting integration

**BORROW boundary principle.**

Purchasing should reduce duplicate entry into accounting without requiring us to own the whole accounting stack.

## 6.3 Reject / watch

- Warehouse/inventory/prefab/tools are valuable but form a second product gravity well.
- Keep them outside first architecture unless P1.1 controlled change occurs.

## 6.4 Strategic lesson

Kojo is strong evidence that a construction software company can monetize a **narrow procurement/materials wedge** rather than selling only a full enterprise suite.

---

# 7. Wave 1 design inheritance

## BORROW strongly

1. ProcurePro — live procurement schedule derived from procurement progress.
2. ProcurePro — low-friction supplier tender access.
3. ProcurePro — connected compare → recommend → approve UX.
4. Procore — package-specific typed bid forms.
5. Procore — missing/excluded/alternate-aware leveling.
6. Procore — email-based bid submission capture.
7. BuildingConnected — scope-specific forms + collaborative leveling + qualification context.
8. CMiC — requisition/PO/subcontract/accounting semantic rigor.
9. CMiC — flexible buyout mapping.
10. Kojo — field-first material requisition + fast RFQ/PO route.
11. Kojo — delivery evidence and field/procurement connection.

## ADAPT with our touch

1. Structured bid forms → optional package-specific response schema, never the only legal quote path.
2. Bid leveling → immutable supplier truth + normalized layer + buyer adjustments + contractable supplier basis.
3. Click-to-contract → fast handoff while preserving AwardDecision vs effective commitment.
4. Procurement schedule → event-derived actuals + bounded forecast, no CPM engine.
5. Vendor qualification → contextual eligibility, not one global Approved flag.
6. ERP integration → field/event authority and reconciliation, not duplicate GL/AP truth.
7. Supplier network → tenant vendor graph first; wider network only if commercial pull justifies it.

## REJECT

1. Portal/account requirement as default supplier participation.
2. One universal comparison sheet/bid breakdown.
3. Editing supplier-origin price as if buyer leveling were supplier truth.
4. Full ERP/accounting/inventory ownership before procurement product-market pull.
5. Full construction network marketplace as prerequisite.
6. Customer-programmable BPM or schedule-network engine in V1.

---

# 8. Commercial / monetization interpretation

Wave 1 does not prove our product will monetize, but it weakens the thesis that this domain is software-worthy only for giant enterprises.

Evidence pattern:

- ProcurePro has built a dedicated procurement category and publicly reports contractor adoption/expansion.
- Kojo sells a narrower materials procurement platform rather than a full construction ERP.
- JobTread and Buildxact show small/mid contractors pay recurring software subscriptions for construction-specific operational workflows.
- Procore/CMiC demonstrate the value ceiling of deep integration, but also reveal the implementation gravity our wedge should avoid.

Current commercialization hypothesis:

> The viable rail is likely **not** 'mini-Procore'. It is a procurement/commercial control layer for contractors who have outgrown Excel/email/WhatsApp but do not want enterprise-suite implementation before receiving value.

The first monetizable proof should remain narrow:

`RFQ/tender → quote ingestion → scope/coverage normalization → comparison → recommendation/approval → controlled award/handoff`

Success would be measured by:
- time saved to produce a defensible comparison;
- reduced missed scope/exclusion risk;
- faster approval/award cycle;
- better supplier response/traceability;
- willingness to reuse/pay after a real package.

Dashboards alone are not the monetization proof. A dashboard becomes valuable only after the workflow beneath it is trusted.

---

# 9. Wave 1 open questions

1. Exact ProcurePro durable objects/state transitions remain insufficiently public.
2. Procore leveling adjustment provenance needs deeper inspection for original-vs-adjusted truth behavior.
3. BuildingConnected qualification/network identity boundaries need API/documentation reconstruction.
4. CMiC multiple-purchase semantics must be mapped carefully against exclusive vs repeatable scope.
5. Kojo's accounting/invoice authority boundary needs deeper reconstruction.
6. Pricing/implementation evidence for specialist procurement platforms remains incomplete.

Wave 2 should now focus on Oracle/Trimble/SAP/Coupa to stress audit, document ownership, payment, supplier lifecycle, effective dating and integration authority.
