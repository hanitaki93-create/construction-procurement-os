# CP-05 Independent Hostile Audit Package

**Date prepared:** 2026-07-28  
**Gate:** P1.0 final A0–A5 audit  
**Status:** READY FOR INDEPENDENT REVIEW  
**Decision allowed:** `PASS — unlock P1.1` or `FAIL — remain in P1.0`

## 1. Auditor rule

Do not audit from a narrative summary.

The auditor must inspect the actual repository artifacts listed below. Earlier critique correctly identified that a narrative-only package creates a closed audit loop.

The independent auditor should treat existing PASS verdicts as claims to verify, not as trusted inputs.

## 2. Governing artifacts — mandatory

1. `PROJECT_STATE.md`
2. `01_roadmaps/PHASE1_ROADMAP_V1_1_FROZEN.md`
3. `01_roadmaps/PHASE1_ROADMAP_V1_0_FROZEN.md` — historical predecessor for change comparison
4. `01_roadmaps/ROADMAP_CHANGE_CHG_0003.md`
5. `04_phases/phase_1/P1.0_research_control/P1_0_CONTROL_SYSTEM_V0_2.md`
6. `04_phases/phase_1/P1.0_research_control/audits/P1_0_AUDIT_PROTOCOL_V1_1.md`
7. `04_phases/phase_1/P1.0_research_control/audits/P1_0_AUDIT_CHECKPOINTS.csv`
8. `04_phases/phase_1/P1.0_research_control/audits/P1_0_AUDIT_FINDINGS_REGISTER.csv`

## 3. Control registers — mandatory

9. `02_research/control/sources.csv`
10. `02_research/control/assumptions.csv`
11. `02_research/control/open_questions.csv`
12. `02_research/control/contradictions.csv`
13. `02_research/control/terminology.csv`
14. `02_research/control/adr_log.csv`
15. `02_research/control/requirements.csv`
16. `02_research/control/changes.csv`

## 4. Evidence control — mandatory

17. `02_research/evidence/DECISION_LEVERAGE_CLASSIFICATION_V1_0.csv`
18. `02_research/evidence/DECISION_LEVERAGE_CLASSIFICATION_V1_0.md`
19. `02_research/evidence/ADR_EVIDENCE_COVERAGE_V1_0.csv`
20. `02_research/evidence/GROUPED_PATTERN_COVERAGE_V1_0.csv`
21. `02_research/evidence/verification_batches/A2_BATCH_01_PROCORE_EVD_0005_0029.md`
22. `02_research/evidence/verification_batches/A2_BATCH_02_DECISION_CRITICAL.md`
23. `02_research/evidence/decision_critical/EVD_0180_0188.csv`
24. `02_research/evidence/decision_critical/EVD_0189_0196.csv`
25. `02_research/evidence/decision_critical/EVD_0197_NEW_DECISION_EVIDENCE.csv`
26. `02_research/evidence/decision_critical/EVD_0198_0199_INTERNAL_CONSTRAINTS.csv`

For historical completeness checks, use `02_research/evidence/retrofile/` and the archived SRC-0001/SRC-0002 manifests under `02_research/sources/internal/`.

## 5. Checkpoint reports — mandatory

27. `04_phases/phase_1/P1.0_research_control/audits/CP_02_A1_RETROFILE_COMPLETENESS_AUDIT.md`
28. `04_phases/phase_1/P1.0_research_control/audits/CP_03_A2_A3_AUDIT.md`
29. `04_phases/phase_1/P1.0_research_control/audits/CP_04_A2_A4_DECISION_TRACEABILITY_AUDIT.md`

## 6. Audit mandate

Hostilely determine whether P1.0 is genuinely complete enough to unlock P1.1.

Do **not** reduce ambition merely because the intended platform is large. Treat scope reduction as justified only by technical incoherence, harmful coupling, inability to decompose, unreliable truth, duplication, wrong abstraction or disproportionate architecture burden.

Audit the **research/control system**, not the final product architecture. P1.1–P1.11 exist to derive the architecture later.

### A0 — Control schema

Check:
- ID uniqueness and permanence;
- status semantics;
- source-strength vs confidence vs architectural-information-content separation;
- evidence/assumption/question/ADR/requirement distinctions;
- change/freeze control;
- whether decision-leverage classification creates loopholes for unsupported architecture claims.

### A1 — inherited completeness

Independently sample/verify that:
- inherited competitor claims are controlled;
- old conclusions are hypotheses rather than accepted truth;
- load-bearing inherited assumptions/questions/contradictions are visible;
- historical content cannot silently become current architecture truth.

### A2 — decision-relevant evidence

Challenge:
- whether the targeted 17 exact evidence needs were genuinely decision-leveraged;
- whether the atomic child EVDs actually support their wording;
- whether source grade and architectural information content are appropriate;
- whether grouped-pattern `P1_0_SUFFICIENT` calls are justified;
- whether anything deferred to P1.3 actually must be known before P1.1.

Do not require all 164 claims to be source-verified merely because they exist.

### A3 — assumptions/questions

Check:
- every load-bearing assumption has falsification logic and a decision target;
- every blocking question has a correct resolution phase;
- no proposed ADR is being treated as accepted architecture;
- no competitor evidence prematurely resolves an area explicitly marked `PRIMARY_REQUIRED` or `DESIGN_PHASE`.

### A4 — traceability

Sample actual chains:

`SOURCE → EVD → ASM/Q/CON → ADR → REQ`

At minimum inspect:
- ADR-0003 structural root;
- ADR-0004 PO/Subcontract model;
- ADR-0005 accounting/commercial seam;
- ADR-0012 external identity;
- ADR-0015 posting/reversal;
- ADR-0018 workflow/financial seam;
- ADR-0024 irreversible substrate constraints;
- REQ-0001/0002/0003.

Look for circular justification where a roadmap statement is used as evidence for itself.

### A5 — final P1.0 gate

Determine whether:
- P1.0 now has a natural termination condition;
- competitor reconstruction is genuinely deferred to P1.3;
- terminology is protected from incumbent anchoring until P1.2;
- roadmap v1.1 cleanly incorporates accepted changes without silently altering sequence or scope;
- no open S3/S4 control finding remains;
- P1.1 can make beachhead/scope decisions without invisible assumptions or mandatory unanswered competitor research.

## 7. Specific hostile questions

1. Has the project merely replaced `164 claims` with `23 ADRs` as a new bureaucracy, or do the ADRs correspond to real decisions at correct future phases?
2. Is `P1_0_SUFFICIENT` being misused to imply a future architecture conclusion, or only to mean enough early evidence to avoid blind spots?
3. Are `PRIMARY_REQUIRED` and `DESIGN_PHASE` honest stop conditions, or excuses to leave critical P1.1 inputs unresolved?
4. Does Roadmap v1.1's Ceiling Test genuinely protect multi-country/high-ceiling ambition?
5. Does the Closed Sub-graph Gate genuinely protect focused buildability without shrinking the architecture?
6. Are the two accepted pre-model requirements genuinely non-retrofittable and low-cost, or did AI enthusiasm leak into deterministic architecture?
7. Is there any hidden decision currently living only in prose, notes, roadmap wording or terminology?
8. Did CHG-0002 correct the roadmap execution drift, or merely rename competitor research as decision evidence?

## 8. Severity

Use project severity definitions:

- S0 — cosmetic
- S1 — control weakness
- S2 — research integrity risk
- S3 — architecture/control risk that blocks P1.0 PASS
- S4 — roadmap-breaking flaw

Only call something S4 if the frozen v1.1 phase sequence/gates cannot execute coherently; do not use S4 for a fixable register/process defect.

## 9. Required output

### OVERALL P1.0 VERDICT
Exactly one:
- `PASS — unlock P1.1`
- `FAIL — remain in P1.0`

### FINDINGS
For each finding:
- ID proposed by auditor
- severity
- exact artifact/row/section
- failure mechanism
- required correction
- whether correction changes roadmap or only P1.0 controls

### CLAIMS CHECKED
List representative evidence/ADR/requirement chains actually inspected.

### ROADMAP v1.1 JUDGMENT
State whether the phase sequence and new Ceiling / Closed Sub-graph gates are coherent.

### FALSE-POSITIVE CHECK
List at least two things that looked suspicious but were acceptable after artifact inspection. This is required to show the audit is discriminating rather than mechanically adversarial.

Do not redesign P1.1+ content unless a genuine P1.0 gate failure requires it.
