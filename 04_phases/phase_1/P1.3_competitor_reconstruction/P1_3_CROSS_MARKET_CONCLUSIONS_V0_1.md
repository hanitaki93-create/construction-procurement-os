# P1.3 — Cross-Market Conclusions v0.1

**Status:** PROVISIONAL COMPETITOR CONCLUSIONS / FEEDS P1.4

These conclusions are re-derived from P1.2 contractor evidence plus P1.3 official competitor evidence. They do not overwrite higher-authority primary evidence.

## CM-01 — Construction procurement has multiple legitimate entry shapes

**Conclusion:** CONFIRMED.

Evidence across contractor workflows and competitors supports:
- package/tender sourcing;
- ordinary requisition/material request;
- direct purchase routes;
- quote route vs purchase route;
- framework/call-off behavior.

Therefore:

> ProcurementPackage cannot be the universal root.

This supports P1.1/P1.2 package optionality.

## CM-02 — Structured supplier responses reduce work but cannot be the only quote truth

**Conclusion:** CONFIRMED / ADAPTIVE.

ProcurePro, Procore and BuildingConnected all use structured bid/price-breakdown concepts.

Primary Perflex artifacts show comparison shape varies materially by package and suppliers still omit, bundle, substitute or add scope.

Therefore:
- package-specific response schema is useful;
- PDF/Excel/email/manual quote evidence remains valid;
- normalization/leveling is a distinct buyer process;
- supplier original revision must survive unchanged.

## CM-03 — Comparison should standardize grammar, not presentation

**Conclusion:** CONFIRMED.

Competitor patterns converge on:
- custom bid forms;
- side-by-side leveling;
- inclusions/exclusions;
- alternates;
- private/plug items;
- notes/adjustments;
- scope-specific rows.

Primary contractor artifacts show fixed presentation fails across aluminium, sanitaryware and complex MEP/system scopes.

Canonical direction retained:

> standardize comparison semantics and provenance, not one spreadsheet layout.

## CM-04 — Supplier lifecycle is not one status

**Conclusion:** CONFIRMED.

SAP Ariba, BuildingConnected/TradeTapp, CMiC and contractor evidence separate concepts such as:
- request/onboarding;
- registration;
- qualification;
- preferred/risk state;
- project/category eligibility;
- invitation;
- intent;
- submission;
- sourcing relationship;
- fulfillment relationship.

P02/P04 separation is strengthened.

## CM-05 — Supplier participation must be low-friction

**Conclusion:** CONFIRMED.

Observed patterns include:
- ProcurePro no-signup tender access;
- Procore email bid submission;
- Aconex guest tender users;
- Coupa actionable email / email invitation;
- Qotera's WhatsApp/incomplete-RFQ reality.

Persistent portal identity may be useful, but cannot be the only V1 participation path.

## CM-06 — Sourcing event has its own lifecycle

**Conclusion:** CONFIRMED.

Procore, CMiC and SAP Ariba expose independent sourcing/bid-package/event states distinct from vendor lifecycle and commitment lifecycle.

This strengthens P03/P04/P06 separation.

## CM-07 — Award/selection and contractual commitment are operationally separable

**Conclusion:** CONFIRMED.

Procore explicitly supports soft award without contract creation.
SAP Ariba moves from response review into award selection before fulfillment relationship.
CMiC and contractor evidence distinguish analysis/selection from downstream purchase/subcontract.

P06→P07 seam is strengthened.

## CM-08 — Fast award-to-commitment handoff is desirable, semantic collapse is not

**Conclusion:** CONFIRMED.

Procore and CMiC optimize selection→PO/subcontract conversion.

Our product should match the speed while preserving:
- award basis;
- backed scope;
- formation evidence;
- contractual effectiveness;
- supplier-confirmed commercial truth.

## CM-09 — PO and subcontract share commitment semantics but diverge operationally

**Conclusion:** CONFIRMED AS SEMANTIC DIRECTION / PHYSICAL ADR OPEN.

CMiC explicitly treats both as purchasing commitments with different job/legal behavior.
Procore converts selected bids to either PO or subcontract.

ADR-0004 remains physical-model work for later phase.

## CM-10 — Procurement schedule should derive actual status from procurement activity

**Conclusion:** CONFIRMED.

ProcurePro explicitly updates schedule/milestones from procurement work.

This supports P10's overlay posture:
- actuals from canonical events;
- forecast/required/supplier-confirmed dates versioned;
- no separate manually authoritative progress ledger;
- no CPM engine.

## CM-11 — Receipt is not invoice/payment

**Conclusion:** CONFIRMED.

CMiC, Vista and Kojo expose receipt/delivery evidence independently of downstream invoice/accounting behavior.

P07C/P08 seam strengthened.

## CM-12 — Posting/finalization changes editability

**Conclusion:** CONFIRMED.

Vista and Unifier expose terminal/posted behavior and controlled correction of already-operated transactions.

ADR-0015 correction/finalization is load-bearing and cannot be treated as UI detail.

## CM-13 — Accounting integration is mandatory; accounting ownership is not

**Conclusion:** CONFIRMED.

Competitors split into:
- native ERP ownership: CMiC/Vista;
- connected project/commercial platforms: Procore/Oracle products;
- specialist procurement with integrations: ProcurePro/Kojo.

No single market pattern requires our product to own full GL/AP/cash.

P08 OWN/MIRROR/REFERENCE direction remains coherent.

## CM-14 — Enterprise workflow flexibility is powerful and dangerous

**Conclusion:** CONFIRMED.

Unifier demonstrates the power of arbitrary business-process/workflow/form configuration.

It also confirms why reproducing that capability would create a second XL gravity well.

P09 bounded fixed gate classes remain the preferred V1 direction.

## CM-15 — Evidence/provenance is structural

**Conclusion:** CONFIRMED.

Aconex's audit/data-ownership model, Procore leveling activity history, Unifier workflow history and ERP posting semantics all reinforce deep provenance for load-bearing actions.

ADR-0014 provisional direction strengthened.

## CM-16 — A narrow construction procurement wedge can exist commercially

**Conclusion:** SUPPORTED / NOT PMF PROOF.

ProcurePro demonstrates dedicated construction procurement as a category.
Kojo demonstrates a narrower materials procurement wedge.
JobTread/Buildxact demonstrate willingness among smaller construction businesses to buy construction-specific recurring software.

This supports continued commercial testing but does not establish willingness to pay for our exact product.

## CM-17 — The opportunity is not 'mini enterprise suite'

**Conclusion:** STRATEGIC DIRECTION.

The recurring competitor trade-off is:

- enterprise systems: rich truth + high implementation gravity;
- smaller tools: fast adoption + less commercial depth;
- specialist procurement: focused value + narrower context.

Current differentiation hypothesis:

> enterprise-grade procurement/commercial truth with specialist workflow and small-footprint deployment.

This must be tested commercially, not treated as architecture truth.

## CM-18 — Competitor evidence does not close all P1.2 evidence debt

**Conclusion:** IMPORTANT LIMITATION.

Competitor systems do not prove:
- FT-02 commitment-vs-allocation authority in contractor reality;
- FT-06 remeasurement hard-conservation universality;
- FT-09 rectification capacity treatment;
- FT-10 one active exclusive-scope authority as universal practice.

These remain evidence debt into P1.4/P1.5 and cannot be upgraded from competitor behavior alone.
