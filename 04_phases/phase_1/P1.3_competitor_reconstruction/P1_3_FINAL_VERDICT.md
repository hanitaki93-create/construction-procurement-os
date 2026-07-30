# P1.3 — Final Verdict

**Date:** 2026-07-30  
**Status:** **PASS / CLOSED**

## Verdict

`PASS — P1.3 competitor reconstruction can close; unlock P1.4.`

P1.3 has completed competitor reconstruction, controlled synthesis, internal hostile audits, external hostile review, narrow remediation and final external recheck.

P1.4 — Boundary, Ownership & Tenancy Contract — is now unlocked.

## Closure basis

P1.3 closes because all gate requirements are satisfied:

- final controlled competitor matrix complete with explicit evidence IDs;
- no silent blanks in the controlled matrix;
- Procore and CMiC reconstructed to meaningful state/transition depth;
- SAP Ariba used as third event-lifecycle corroboration;
- competitor terminology mapped back to P01–P12 rather than replacing contractor truth;
- Wave 1 specialist/platform/material comparisons complete;
- Wave 2 enterprise-control comparisons complete;
- adoption/pricing contrast complete;
- complaint/adoption-risk register separated from architecture truth;
- cross-market conclusions re-derived against P1.2 evidence;
- BORROW / ADAPT / REJECT design-inheritance register complete enough to feed P1.4;
- adoption-burden audit PASS;
- inheritance-conflict audit PASS after remediation;
- external hostile recheck PASS.

## Final matrix

Canonical:

- `registers/P1_3_COMPETITOR_MATRIX_FINAL_V0_2.csv`
- `audits/P1_3_FINAL_MATRIX_COMPLETENESS_AUDIT_V0_1.md`

Coverage:

- 14 benchmark/reference products;
- 32 controlled dimensions;
- 448 controlled cells;
- 306 evidenced;
- 124 explicit `UNKNOWN_PUBLIC_EVIDENCE`;
- 18 `N/A_OUTSIDE_PRODUCT_BOUNDARY`;
- 0 silent blanks.

Unknown public evidence is acceptable. Silent inference is not.

## State-machine gate

**PASS.**

- Procore Bidding: package, bidder intent/submission, leveling, soft-award and commitment-conversion behavior reconstructed.
- CMiC: bid-package state classes, bidder participation, buyout mapping, approved requisition → PO and purchase/contract transitions reconstructed.
- SAP Ariba: independent sourcing-event lifecycle corroborates event-state separation.

Canonical:

- `P1_3_STATE_MACHINE_RECONSTRUCTIONS_V0_1.md`

## Final best-of-each inheritance rule

P1.3 does not create a union of competitor feature sets.

Binding rule:

> **Inheritance is semantic reuse, not cumulative feature scope.**

Current synthesis:

> ProcurePro focus + Procore/BuildingConnected bid UX + CMiC/Vista commercial/finalization rigor + Ariba lifecycle discipline + Aconex evidence ownership + Kojo low-friction intake UX — bounded by P1.1 one-XL scope, P1.2 contractor truth and activation discipline.

No incumbent becomes the ontology.

## BL-10 closure — Kojo / first surface

`CLOSED — Kojo inheritance is intake UX only in A0–A3; no second first-release surface.`

Binding interpretation:

- low-friction material/request intake UX is retained;
- simple material requests and complex packages converge on the same sourcing/comparison/award substrate;
- direct-source/direct-purchase remains a valid P1.2 domain route but is deferred from A0–A3;
- direct-source activates later with commercial/commitment execution and remains subject to requirement authority, justification/approval and commitment controls.

Canonical:

- `P1_3_FIRST_RAIL_AND_ACTIVATION_BOUNDARY_V0_1.md`

## BL-11 closure — evidence / external access

`CLOSED — evidence/external access is bounded as an L shared substrate rather than CDE/records-management gravity.`

Classification:

`EVIDENCE / EXTERNAL ACCESS SUBSTRATE = L SHARED SUBSTRATE / NOT XL`

The product owns transaction evidence/provenance, immutable/versioned source records and bounded external-grant history for governed transactions.

It references externally authoritative CDE/ERP/bank/legal/master-correspondence records.

It refuses general document management, transmittal/correspondence, markup/review, CDE replacement, records management, legal hold/eDiscovery, retention/redaction policy engines and mandatory supplier-network behavior.

Email is a capture channel. Automatic email-to-structured-bid parsing is not an A0–A3 architectural prerequisite.

Canonical:

- `P1_3_EVIDENCE_EXTERNAL_ACCESS_BOUNDARY_V0_1.md`

## Activation boundary carried forward

- **A0** — bootstrap
- **A1** — first sourcing event
- **A2** — comparison
- **A3** — governed award/handoff
- **A4** — later commercial/commitment execution, including controlled direct-source route
- **A5** — optional enterprise/portfolio overlays

A0–A3 must remain independently usable without direct-source execution, P07 execution, CDE/ERP implementation or advanced AI.

P1.1 constraints remain binding:

- standard setup to first live tender ≤5 working days from clean inputs;
- bespoke named connectors before first live tender = 0.

## Commercial posture

`CONTINUE — NOT PMF PROOF`

Closest known specialist incumbent on the same sourcing rail: **ProcurePro**.

Candidate first monetization rail:

`requirement → RFQ/tender → response capture → normalization/leveling → recommendation/approval → AwardDecision → external handoff`

Candidate differentiation remains hypothesis-level:

- GCC/UAE contractor operating fit;
- four-layer comparison truth;
- arbitrary-source bid comparability;
- commercial-truth expansion path without full ERP;
- small-footprint deployment.

No claim of product superiority or PMF is made.

A2 economics must be benchmarked against contractor Excel/manual comparison. Architecture PASS does not imply commercial PASS if normalization remains slower or more labor-intensive than the incumbent workflow.

Early pilots should use **comparison-worthy packages**, not total procurement volume, because repeat/direct material orders are deliberately outside A0–A3.

## One-XL guardrail

P07 remains the intended single independent XL gravity well.

The following remain rejected as independent V1 gravity wells:

- full accounting ERP/GL/AP/cash;
- generalized BPM/low-code;
- CPM/master scheduling;
- legal-claims/banking/insurance platform;
- full CDE/submittal platform;
- inventory/WMS;
- mandatory supplier network;
- evidence/records-management platform.

## ADR posture carried forward

`PROVISIONAL_DIRECTION_SET / PRIMARY_FALSIFIABLE / IMPLEMENTATION_FORM_OPEN`

Applies to:

- ADR-0003 requirement-authority/structural-root direction;
- ADR-0008 bounded built-in workflow controls;
- ADR-0013 event-derived status;
- ADR-0014 deep provenance for load-bearing events;
- ADR-0019 effective dating/version binding;
- ADR-0021 OWN/MIRROR/REFERENCE authority model;
- ADR-0012 external identity/access direction.

ADR-0012 direction now includes low-friction task-scoped external participation, no mandatory persistent signup, guest/email/buyer-on-behalf paths with provenance, and least-privilege scoped access.

Still open under ADR-0012:

- persistent supplier identity/account;
- cross-tenant identity/network;
- authentication mechanism;
- organization hierarchy/persistence.

Further strengthened, not closed:

- ADR-0007 procurement actuals derive from domain events;
- ADR-0005 accounting integration/authority is required but ownership split remains open;
- ADR-0015 finalization/posting affects editability;
- ADR-0018 workflow governs commands but is not financial truth.

ADR-0010 GCC semantics remains explicit primary/regulatory/contractual evidence debt.

## P1.2 debt preserved

Competitor evidence does not resolve:

- FT-02 commitment-vs-allocation authority;
- FT-06 remeasurement hard-conservation universality;
- FT-09 rectification capacity treatment / CR-02;
- FT-10 one active exclusive-scope authority as universal practice.

These remain evidence debt and may reopen later implementation assumptions through controlled change.

## Non-blocking P1.4 entry obligations

P1.4 must explicitly resolve or bound:

1. whether internal P09 authorization and external evidence/access grants share one authorization substrate or remain deliberately separate;
2. immutable evidence versus tenant offboarding/deletion/data-residency obligations;
3. transaction-level sensitivity/access classification as a stored attribute rather than expansion into a configurable classification-policy engine.

These do not keep P1.3 open.

## Freeze effect

P1.3 conclusions are now closed inputs to P1.4.

Later evidence may challenge them through controlled change, but P1.4 must not restart competitor reconstruction merely to seek breadth.

**P1.3 PASS / CLOSED. P1.4 UNLOCKED.**
