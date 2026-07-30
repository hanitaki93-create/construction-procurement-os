# P1.3 — Hostile Closure Review Packet v0.1

**Status:** READY FOR EXTERNAL REVIEW
**Review scope:** P1.3 Competitor Reconstruction only
**Prior gates:** P1.1 PASS/FROZEN; P1.2 PASS/CLOSED
**P1.4:** LOCKED pending this review

# 1. Objective under review

P1.3 reverse-engineers construction/procurement incumbents against the P1.2 contractor evidence model.

It does **not** select one product to copy and does not permit an incumbent to redefine the ontology.

Inheritance rule:

> take the strongest proven pattern from each competitor, reject its domain baggage and adoption burden, then adapt the retained pattern into the contractor-first P01–P12 model.

Classification:
- BORROW
- ADAPT
- REJECT
- WATCH
- UNKNOWN_PUBLIC_EVIDENCE

# 2. Benchmark population

## Wave 1 — closest contrasts
- ProcurePro
- Procore Bidding / Financials
- Autodesk BuildingConnected / TradeTapp
- CMiC
- Kojo

## Wave 2 — enterprise controls
- Oracle Aconex
- Primavera Unifier
- Oracle Textura
- Trimble Vista
- SAP Ariba
- Coupa

## Wave 3 — adoption / monetization contrasts
- JobTread
- Buildxact
- Qotera UAE as supplier/RFQ-friction reference

# 3. Final matrix gate

Final controlled matrix:
`registers/P1_3_COMPETITOR_MATRIX_FINAL_V0_2.csv`

Dimensions: 32 common reconstruction dimensions.

Population: 14 products/references.

Controlled cells: 448.

- Evidenced (`E`): 306
- Explicit unknown (`U`): 124
- Outside boundary (`N`): 18
- blank/implicit: 0

Each row carries source/risk IDs.

Unknown public evidence is permitted. Silent inference is not.

# 4. State-machine gate

PASS internally.

## Procore
Documented/reconstructed distinctions include:
- package OPEN/CLOSED;
- bidder Undecided / Will Bid / Will Not Bid / Bid Submitted / Awarded;
- email submission updating bid state;
- soft award distinct from contract creation;
- leveling before PO/subcontract conversion.

## CMiC
Documented/reconstructed distinctions include:
- bid package status classes NEW / IN_PROCESS / AWARDED;
- bidder intent separate from prequalification/submission;
- flexible buyout mapping;
- approved requisition before PO generation in documented path;
- purchase action creating contract/subcontract/change pathways.

## SAP Ariba corroboration
Sourcing event lifecycle:
`PREVIEW -> OPEN -> PENDING_SELECTION -> COMPLETED`
with cancellation path.

# 5. Main cross-market conclusions

Current conclusions include:

1. multiple legitimate procurement entry shapes exist; package cannot be universal root;
2. structured supplier responses help but cannot be only quote truth;
3. comparison should standardize grammar/provenance, not one fixed presentation;
4. supplier lifecycle is not one status;
5. supplier participation must be low-friction;
6. sourcing event has independent lifecycle;
7. award/selection and contractual commitment are separable;
8. fast award-to-commitment handoff is desirable without semantic collapse;
9. PO and subcontract share some commitment semantics but physical model remains open;
10. procurement schedule actuals should derive from procurement events;
11. receipt != invoice/payment;
12. posting/finalization changes editability;
13. accounting integration is necessary but full accounting ownership is not;
14. general BPM flexibility is useful but would create a second XL subsystem;
15. evidence/provenance is structural;
16. a narrow construction-procurement software category exists commercially, but this is not PMF proof;
17. target opportunity is not a mini enterprise suite;
18. competitor evidence does not close P1.2 FT-02/06/09/10 debt.

# 6. Best-of-each synthesis

Current thesis:

> ProcurePro focus + Procore/BuildingConnected bid UX + CMiC/Vista commercial/finalization rigor + Ariba lifecycle discipline + Aconex evidence ownership + Kojo low-friction field/material UX — bounded by P1.1 one-XL scope, P1.2 contractor truth and activation discipline.

Examples:

## Requirement intake
Borrow Kojo field simplicity + Vista/CMiC requisition semantics.
Our rule: fast material path + complex package path; user does not need to understand allocation ontology.

## Supplier participation
Borrow ProcurePro no-signup, Procore email submission, Aconex guest access, Coupa actionable-email idea.
Our rule: guest link/email/optional portal/buyer-on-behalf with source provenance.

## Quote comparison
Borrow Procore/BuildingConnected leveling and ProcurePro comparison focus.
Our stronger semantic rule:
1. supplier submission;
2. normalized representation;
3. buyer evaluation adjustment;
4. supplier-confirmed contractable basis.

## Commitment/commercial control
Borrow CMiC/Vista finalization and accounting rigor without owning full GL/AP/inventory.

## Evidence
Borrow Aconex organization-aware evidence and immutable audit without building a full CDE.

## Workflow
Borrow enterprise approval/terminality patterns but reject arbitrary customer BPM/state-machine design.

# 7. Inheritance-conflict audit result

Internal result:

`PASS WITH FORWARD OBLIGATIONS`

Main reconciled tensions:
- package path vs direct-material path;
- low-friction supplier access vs qualification governance;
- structured forms vs arbitrary supplier source documents;
- editable leveling UX vs immutable supplier truth;
- fast award-to-contract UX vs legal formation evidence;
- ERP financial rigor vs accounting coexistence;
- Unifier workflow flexibility vs bounded controls;
- Aconex evidence depth vs CDE creep;
- ProcurePro schedule value vs duplicate status ledger;
- supplier networks vs tenant vendor graph;
- Kojo simplicity vs P07 commercial depth;
- Textura payment specialization vs payment-rail creep;
- incumbent AI assistance vs deterministic truth.

Critical containment rule:

> inheritance is semantic reuse, not cumulative feature scope.

# 8. Adoption-burden audit result

Internal result:

`PASS WITH ACTIVATION BOUNDARY`

Activation levels:

## A0 bootstrap
Company/legal entity/project, users/roles, minimum currency/time/rounding/cost reference.

## A1 first RFQ/tender
Requirement/MR, allocation behind the UX, optional package, vendor/contact minimum, tender/release, evidence, low-friction external access.

## A2 first comparison
Immutable quote/revisions, mapping, package-specific comparison schema, gaps/alternates/bundles, buyer adjustment, frozen snapshot.

## A3 governed award
Recommendation, justification, bounded approval/DOA, AwardDecision, external handoff disposition.

## A4 deferred internal commercial execution
PO/subcontract/framework formation, change, receipt, certification, retention/advance/recovery, P08 reconciliation.

## A5 optional later overlays
Deep supplier lifecycle, live procurement schedule, CDE/ERP integration, portfolio analytics, supplier network, advanced AI.

P1.1 requirement remains:
- first live tender <=5 working days from clean inputs;
- zero bespoke named connector prerequisite.

# 9. One-XL guardrail

Only intended independent XL gravity well:

**P07 commitment/change/valuation/commercial truth.**

Reject if the synthesis also requires:
- full ERP/GL/AP/cash;
- generalized BPM;
- full CDE;
- CPM scheduling;
- payment/banking platform;
- mandatory supplier network;
- inventory/WMS.

# 10. Commercial posture

Current commercial verdict:

`CONTINUE — NOT PMF PROOF`

Evidence supports:
- dedicated construction procurement as a real software category;
- narrower materials procurement as a monetizable wedge;
- construction businesses buying operational software at lower-footprint SaaS price points;
- enterprise implementation gravity as a plausible gap.

Candidate first monetization rail:

`RFQ/tender -> supplier response capture -> normalization/leveling -> recommendation/approval -> award/handoff`

Commercial proof is not a dashboard. It is a contractor voluntarily running a real package, repeating it and accepting paid continuation/pilot.

# 11. P1.2 evidence debt preserved

Still unproven by competitors:
- FT-02 commitment-vs-allocation authority;
- FT-06 remeasurement hard-conservation universality;
- FT-09 rectification capacity treatment / CR-02;
- FT-10 one active exclusive-scope authority as universal practice.

Do not treat competitor behavior as primary proof of these claims.

# 12. Open structural decisions not owned by P1.3

P1.3 must not silently close:
- ADR-0003 physical root;
- ADR-0004 PO/subcontract/framework/call-off physical model;
- ADR-0005 accounting/commercial ownership seam;
- ADR-0007 long-lead physical model;
- ADR-0010 GCC semantics;
- ADR-0011 budget authority/timing;
- ADR-0012 external identity/access;
- ADR-0015 finalization/correction physical model;
- ADR-0018 workflow-financial seam;
- ADR-0020 config binding;
- ADR-0022 money/rounding architecture;
- ADR-0023 numbering/concurrency/fiscal semantics.

# 13. External reviewer output contract

Return only:

## BLOCKERS
For each blocker:
- exact P1.3 claim/pattern;
- why it is structurally invalid or overclaimed;
- minimum correction.

Do not fail P1.3 merely because internal competitor implementation details remain `UNKNOWN_PUBLIC_EVIDENCE` where the matrix records that honestly.

## MATRIX CHECK
Choose one:
- `CLEAN — competitor matrix is complete enough for P1.3`
- `FAIL — exact missing competitor class/dimension/evidence defect`

## STATE-DEPTH CHECK
Choose one:
- `CLEAN — Procore + CMiC satisfy the two-product state-machine gate`
- `FAIL — exact reason reconstructed depth is insufficient`

## BEST-OF-EACH CONFLICT CHECK
Choose one:
- `CLEAN — synthesis is coherent because inherited patterns are bounded by contractor truth and activation scope`
- `FAIL — identify exact incompatible inherited patterns`

Attack specifically whether the product has become a union of all competitors rather than a focused procurement system.

## SECOND-XL CHECK
Choose one:
- `CLEAN — only P07 remains an independent XL gravity well`
- `FAIL — identify hidden second XL subsystem`

## ADOPTION-BURDEN CHECK
Choose one:
- `CLEAN — A0-A3 can provide first sourcing value without A4/A5 implementation`
- `FAIL — exact hidden downstream/setup prerequisite`

## P1.2 REGRESSION?
`NO` or exact primary/frozen invariant contradicted by competitor inheritance.

## ADR ANCHORING CHECK
List any supposedly open ADR that P1.3 has silently decided in practice.

## COMMERCIAL OVERCLAIM CHECK
Choose one:
- `CLEAN — commercial evidence is correctly limited to continuation hypothesis, not PMF proof`
- `FAIL — exact unsupported market/monetization claim`

## MISSING COMPETITOR CLASS?
`NO` or name the exact missing archetype and explain why existing products do not cover the architecture risk.

Do not request more competitors merely for breadth.

## P1.4 READINESS
Choose one:
- `READY — competitor reconstruction is sufficient to feed boundary/ownership/tenancy architecture`
- `NOT READY — exact missing reconstruction required before P1.4`

## P1.1 REOPEN?
`NO` or exact frozen assumption requiring controlled reopening.

## VERDICT
Choose exactly one:

`PASS — P1.3 competitor reconstruction can close; unlock P1.4`

or

`FAIL — remediate blocker(s) before P1.4`

Be hostile to complexity, incumbent imitation and enterprise baggage. Reward fewer primitives, clean truth ownership, explicit unknowns and early deployability.
