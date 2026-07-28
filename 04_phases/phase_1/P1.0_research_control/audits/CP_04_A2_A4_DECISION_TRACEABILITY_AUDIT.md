# CP-04 — A2 + A4 Decision-Evidence / Traceability Audit

**Date:** 2026-07-28  
**Result:** PASS  
**Protocol:** P1.0 Audit Protocol v1.1  
**Trigger:** decision-leverage classification complete; targeted exact evidence and ADR coverage stable.

## 1. Why this CP-04 is different

The obsolete trigger `~82/164 claims verified` was retired by CHG-0002 after the CP-03 hostile critique.

CP-04 now asks whether competitor evidence is sufficient to constrain named architecture decisions without executing P1.3 early.

## 2. A2 — decision-relevant source verification

### Exact set

All 17 inherited `VERIFY_EXACT` evidence needs were reviewed against current exact sources and represented as scoped atomic evidence `EVD-0180` through `EVD-0196`.

- 17 atomic decision-critical claims: `SUPPORTED`.
- Inherited wording is not automatically promoted. Example: old `EVD-0090` suggested a strict `contract → payment → change` chain; `EVD-0184` records the narrower supported connected-workflow fact instead.
- New high-value mechanism `EVD-0197` was added after CMiC documentation showed approval workflow can gate posting while post authority remains separately permission-controlled.

### Grouped patterns

Grouped verification is now decision-pattern based, documented in `GROUPED_PATTERN_COVERAGE_V1_0.csv`.

P1.0-sufficient patterns:
1. procurement progress → schedule/status;
2. commercial platform ↔ ERP integration seam;
3. immutable document/audit governance;
4. configurable workflow/business-process infrastructure;
5. commitment/construction-financial mechanics;
6. integrated Vista purchasing/accounting.

Supplier-governance lifecycle detail is explicitly `DEFER_P1_3`: no current P1.0 decision requires a pre-primary-evidence feature inventory.

**A2 result: PASS.**

## 3. A4 — decision traceability

`ADR_EVIDENCE_COVERAGE_V1_0.csv` maps every current ADR to evidence coverage and the correct future resolution phase.

Important result: not every ADR is forced to an answer in P1.0.

- `P1_0_SUFFICIENT` means enough evidence exists to prevent an obvious blind spot; the decision still waits for its proper phase.
- `PRIMARY_REQUIRED` means competitor evidence is deliberately insufficient and P1.2 contractor evidence is required.
- `DESIGN_PHASE` means the problem is known but is resolved by P1.4/P1.5/P1.10 architecture work, not by more competitor searching.

Examples sampled:

- `ADR-0003` structural root → `EVD-0190/EVD-0195` show requisition/request-led procurement exists; P1.2 decides real contractor variants.
- `ADR-0004` PO/Subcontract model → `EVD-0191` shows common commitment semantics plus meaningful subtype differences.
- `ADR-0012` external identity → `EVD-0181/EVD-0186` show secure-link and restricted-guest patterns.
- `ADR-0015` posting/finalization → `EVD-0192/EVD-0193` expose financial grain plus explicit posting states.
- `ADR-0018` workflow/financial seam → `EVD-0188/EVD-0194/EVD-0197` show workflow approval and post authority can remain distinct.

`ADR-0007` long-lead object model and `ADR-0010` GCC semantics correctly remain `PRIMARY_REQUIRED` rather than being answered from incumbent software.

## 4. Requirement traceability finding

CP-04 raised `FND-0014` (S2): REQ-0001/0002 were binding in the roadmap but remained `PROPOSED` in the live register and relied on contested inherited hypotheses; REQ-0003 remained `PROPOSED` despite accepted ADR-0002.

Corrective action:
- `EVD-0198` records the non-retrofittability rationale for source/version/location provenance.
- `EVD-0199` records the non-retrofittability rationale for bounded validated business actions.
- `ADR-0024` ACCEPTED those two narrow pre-model substrate constraints without accepting broader AI assumptions.
- `REQ-0001`, `REQ-0002`, and `REQ-0003` are now `ACCEPTED` with accepted ADR traceability.

`FND-0014`: CLOSED.

## 5. Anti-anchoring check

- Current domain terms remain `PROVISIONAL`.
- P1.2 primary evidence owns first canonical domain vocabulary.
- P1.3 maps competitor terminology into that vocabulary.
- No competitor feature or term has become architecture truth merely because it is well documented.

**PASS.**

## 6. Change-control check

- CHG-0002 formally corrected P1.0 control/audit execution without changing the Phase 1 phase order.
- CHG-0003 formally accepts later P1.4/P1.5 gate additions for temporal/configuration/workflow/integration/money/numbering semantics plus Ceiling and Closed Sub-graph tests.
- Roadmap v1.0 remains canonical until v1.1 is issued; no silent drift occurred.

**PASS.**

## 7. CP-04 decision

**PASS.**

P1.0 no longer has a competitor-claim-count workload.

Remaining work before CP-05 is control-system closure and issuance of the accepted roadmap v1.1 change, followed by the independent hostile audit using the actual repository artifacts.

Deep competitor reconstruction remains P1.3 after P1.2 primary contractor evidence.
