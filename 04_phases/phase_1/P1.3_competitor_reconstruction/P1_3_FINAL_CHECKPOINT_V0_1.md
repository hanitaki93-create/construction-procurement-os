# P1.3 — Final Checkpoint v0.1

**Date:** 2026-07-30  
**Status:** **CLOSED / HANDOFF READY**

## 1. Phase position

- P1.0 — PASS / CLOSED
- P1.1 — PASS / FROZEN
- P1.2 — PASS / CLOSED
- **P1.3 — PASS / CLOSED**
- **P1.4 — UNLOCKED / NEXT ACTIVE SUBPHASE**
- Product code — NOT STARTED
- Phase 2/3 build — LOCKED

## 2. P1.3 objective completed

Competitor structures were reconstructed against P1.2 contractor truth rather than used as ontology.

Final inheritance strategy:

> Take the strongest proven pattern from each competitor, reject domain baggage and adoption burden, and adapt the retained pattern into the contractor-first P01–P12 model.

## 3. Benchmark coverage

Wave 1:
- ProcurePro
- Procore Bidding / Financials
- Autodesk BuildingConnected / TradeTapp
- CMiC
- Kojo

Wave 2:
- Oracle Aconex
- Primavera Unifier
- Oracle Textura
- Trimble Vista
- SAP Ariba
- Coupa

Wave 3 / adoption-reference:
- JobTread
- Buildxact
- Qotera UAE

## 4. Matrix gate

Canonical:
- `registers/P1_3_COMPETITOR_MATRIX_FINAL_V0_2.csv`
- `audits/P1_3_FINAL_MATRIX_COMPLETENESS_AUDIT_V0_1.md`

Coverage:
- 14 products/references
- 32 dimensions
- 448 controlled cells
- 306 evidenced
- 124 explicit unknowns
- 18 N/A outside boundary
- 0 silent blanks

## 5. State-machine gate

PASS:
- Procore
- CMiC

Third corroboration:
- SAP Ariba

Canonical:
- `P1_3_STATE_MACHINE_RECONSTRUCTIONS_V0_1.md`

## 6. Final design inheritance

Canonical:
- `P1_3_DESIGN_INHERITANCE_REGISTER_V0_1.md`

Binding synthesis:

> ProcurePro focus + Procore/BuildingConnected bid UX + CMiC/Vista commercial/finalization rigor + Ariba lifecycle discipline + Aconex evidence ownership + Kojo low-friction intake UX — bounded by P1.1 one-XL scope, P1.2 contractor truth and activation discipline.

Binding anti-union rule:

> **Inheritance is semantic reuse, not cumulative feature scope.**

## 7. First rail

Canonical:
- `P1_3_FIRST_RAIL_AND_ACTIVATION_BOUNDARY_V0_1.md`

A0–A3 first-value surface:

`requirement / MR / package → RFQ/tender → response capture → normalization/comparison → recommendation/approval → AwardDecision → external handoff`

Kojo contributes intake UX only.

Direct-source/direct-purchase is not part of A0–A3 and remains a later A4 execution route.

## 8. Evidence/access boundary

Canonical:
- `P1_3_EVIDENCE_EXTERNAL_ACCESS_BOUNDARY_V0_1.md`

Classification:

`L SHARED SUBSTRATE / NOT XL`

Own transaction evidence/provenance and bounded external grants.
Reference external authoritative CDE/ERP/bank/legal/master correspondence.
Refuse full CDE, records management, transmittals, markup/review, legal hold, classification-policy engine and mandatory supplier network.

## 9. Commercial posture

`CONTINUE — NOT PMF PROOF`

Closest specialist incumbent:
- ProcurePro

Candidate differentiation remains hypothesis-level:
- GCC/UAE operating fit
- four-layer comparison truth
- arbitrary-source bid comparability
- deeper commercial-truth expansion without full ERP
- small-footprint deployment

Pilot commercial success must be judged on comparison-worthy packages.

A2 must measure time/manual effort against contractor Excel/manual baseline.

## 10. Evidence debt / risks preserved

P1.2 FT debt:
- FT-02
- FT-06
- FT-09 / CR-02
- FT-10

GCC semantics:
- ADR-0010 remains primary/regulatory/contractual evidence debt.

## 11. P1.4 entry obligations

The next subphase must explicitly address:

- entity ownership: OWN / MIRROR / REFERENCE / OUT;
- authoritative system by object/field/event;
- accounting/commercial seam;
- tenant/company/legal-entity/branch/BU/JV hierarchy;
- project ownership and cross-entity behavior;
- internal identity and authorization;
- external supplier/subcontractor identity/access;
- whether P09 internal authorization and external grants share one substrate or remain separate;
- evidence ownership and immutable-history semantics;
- tenant offboarding/deletion versus immutable evidence;
- sensitivity/access classification attribute without introducing a policy-engine gravity well;
- data residency boundary/ADR;
- early integration authority boundaries;
- prevent GL/AP, CDE, network and cross-tenant scope leakage.

## 12. What P1.4 must NOT do

- do not reopen P1.1 or P1.2 without controlled contradictory evidence;
- do not restart competitor research for breadth;
- do not design product code or database schema yet;
- do not let ERP/accounting become authoritative by convenience rather than explicit field/event ownership;
- do not make supplier network/persistent portal mandatory;
- do not turn evidence into a document-management product;
- do not silently close unresolved ADRs;
- do not erase FT-02/06/09/10 evidence debt.

## 13. Formal result

External narrow recheck:

- BLOCKERS — none
- BL-10 — CLOSED
- BL-11 — CLOSED
- SECOND-XL — CLEAN
- ADOPTION BURDEN — CLEAN
- ADR-0012 — correctly provisional
- COMMERCIAL POSTURE — CLEAN
- P1.2 REGRESSION — NO
- P1.4 READINESS — READY

Final verdict:

`PASS — P1.3 competitor reconstruction can close; unlock P1.4.`
