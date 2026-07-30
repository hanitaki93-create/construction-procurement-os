# P1.3 — Competitor Reconstruction Workplan v0.2

**Status:** ACTIVE / CANONICAL P1.3 WORKPLAN
**Phase:** Phase 1 — Deterministic Architecture & Product Specification
**Prerequisite:** P1.2 PASS / CLOSED
**Supersedes:** `P1_3_WORKPLAN_V0_1.md`

## 1. Objective

Reverse-engineer incumbent construction/procurement products against the P1.2 contractor evidence model.

The purpose is **not** to select one product to copy and not to let incumbents redefine the ontology.

P1.3 uses a deliberate inheritance strategy:

> **Take the strongest proven pattern from each competitor, reject its domain baggage and adoption burden, then adapt the retained pattern into the contractor-first P01–P12 model.**

Every meaningful pattern is classified:

- `BORROW` — strong pattern compatible with P1.2 truth;
- `ADAPT` — useful but requires our own semantics/boundary;
- `REJECT` — creates false truth, enterprise gravity, duplicate state, supplier friction or adoption burden;
- `WATCH` — promising but insufficiently evidenced;
- `UNKNOWN` — public evidence cannot determine.

## 2. Benchmark set

### Wave 1 — closest architectural contrasts

1. ProcurePro — specialist end-to-end construction procurement.
2. Procore Bidding / Financials — broad construction platform with bid-to-commitment connection.
3. Autodesk BuildingConnected / TradeTapp — preconstruction network, bid forms, bid leveling and qualification.
4. CMiC — construction ERP / single-database procurement-commercial-accounting integration.
5. Kojo — materials-first field-to-procurement wedge.

### Wave 2 — enterprise controls / project governance

6. Oracle Aconex — tender/document/correspondence/audit boundary.
7. Oracle Primavera Unifier — configurable capital/project business-process model.
8. Oracle Textura — subcontract payment/compliance interface.
9. Trimble Vista — construction ERP procurement/accounting seam.
10. SAP Ariba — mature supplier lifecycle, sourcing and business-network controls.
11. Coupa — sourcing, supplier participation and spend-management patterns.

### Wave 3 — adoption / monetization contrasts

12. JobTread — small/mid contractor simplicity and pricing.
13. Buildxact — small contractor estimating/purchasing/job-management bundle.
14. Selected newer GCC/construction entrants, including Qotera where useful for supplier/RFQ friction.

Wave 3 is not used to import residential-builder ontology. It tests adoption burden, packaging, pricing and low-friction workflows.

## 3. Reconstruction dimensions

Every competitor receives the same controlled dimensions:

1. target user/company profile;
2. product boundary;
3. project/company hierarchy;
4. vendor/supplier model;
5. qualification / eligibility;
6. demand / requisition / package root;
7. sourcing/tender event;
8. bidder participation and external access;
9. quote/bid submission and revision;
10. bid comparison / normalization / leveling;
11. recommendation / approval / award;
12. PO / subcontract / commitment handoff;
13. change / variation;
14. goods receipt / fulfillment;
15. progress valuation / payment workflow;
16. retention / advance / commercial closeout where present;
17. procurement schedule / long lead;
18. technical/document approval boundary;
19. permissions / approvals / audit;
20. status/state-machine semantics;
21. reporting / dashboards;
22. supplier UX;
23. internal user UX;
24. integrations / API;
25. accounting ownership boundary;
26. implementation/setup burden;
27. pricing/packaging evidence;
28. known complaint/adoption risks;
29. AI capabilities separated from deterministic substrate;
30. best pattern to BORROW/ADAPT;
31. pattern to REJECT;
32. impact on P1.2 model / ADRs.

No blank cells. Use `UNKNOWN_PUBLIC_EVIDENCE` when necessary.

## 4. Evidence hierarchy

Prefer:

1. official product documentation/help/training;
2. official product pages and product tours;
3. official customer implementation/case-study evidence;
4. official API documentation;
5. implementation partner documentation;
6. credible user/community feedback for complaints only.

Marketing claims can establish positioning/features but cannot prove detailed state semantics unless corroborated by documentation or training evidence.

## 5. State-machine depth

At least two competitors must be reconstructed to state-machine/transition level.

Initial targets:

- **Procore** — rich public operational documentation for bid package, bidder intent/submission, leveling, award and commitment conversion;
- **CMiC** — public documentation for requisition, bid package, bid analysis/buyout, purchasing, PO/subcontract and posting semantics.

ProcurePro remains the closest strategic benchmark even where exact internal states are not publicly visible.

## 6. Best-of-each design rule

P1.3 is not a feature popularity contest.

A competitor feature is retained only when it improves one or more of:

- contractor truth;
- margin control;
- procurement speed;
- supplier response/friction;
- scope comparability;
- decision provenance;
- adoption speed;
- accounting coexistence;
- API/integration quality;
- future AI leverage without AI owning truth.

The retained pattern must fit the frozen P1.1 boundary and P1.2 evidence before it becomes an architecture input.

## 7. Adoption / monetization lens

For every competitor ask:

- How soon can a contractor obtain value after setup?
- What must be configured before the first tender/RFQ?
- Does supplier participation require an account/portal?
- Does the system require finance/CDE/schedule integration before procurement is useful?
- Can an in-scope UAE private-sector contractor buyer obtain value before enterprise-wide rollout?
- What is the smallest coherent paid wedge?

P1.1 does **not** freeze a revenue band, headcount band, project-count band or willingness-to-pay assumption. P1.3 must not introduce one silently.

Commercial hypothesis under test:

> There may be a viable layer between spreadsheet/email procurement and enterprise construction suites: sophisticated enough for packages, comparisons, approvals and commercial truth, but deployable without enterprise implementation.

This is **not proven** by P1.3. Competitor evidence may strengthen or kill it.

## 8. Gate

P1.3 closes only when:

- controlled competitor matrix is complete with source/evidence IDs;
- no silently blank cells exist;
- at least two competitors are reconstructed to state-machine level;
- terminology is mapped back to P1.2 canonical semantics;
- object/workflow/state/permissions/financial/integration patterns are reconstructed where public evidence permits;
- pricing/implementation/adoption observations are separated from architecture evidence;
- complaint register remains separate from deterministic truth;
- cross-market conclusions are re-derived or withdrawn;
- BORROW / ADAPT / REJECT register is complete enough to feed P1.4.

## 9. Guardrails

- P1.2 contractor evidence outranks incumbent product structure.
- No competitor is treated as the ontology.
- P1.1 remains frozen.
- P1.4 remains locked until this gate passes.
- No code or physical schema freeze in P1.3.
- A competitor pattern that creates a second XL gravity well is presumptively rejected unless primary evidence requires it.
