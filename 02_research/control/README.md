# Research Control Registers

These files are the live control plane for Phase 1 research.

## Registers

- `sources.csv` — external/internal source inventory and source-strength grades.
- `../evidence/README.md` — canonical evidence-register index and decision-evidence artifacts.
- `assumptions.csv` — load-bearing hypotheses with falsification tests.
- `open_questions.csv` — unresolved questions and what they block.
- `contradictions.csv` — conflicting evidence or incompatible claims.
- `terminology.csv` — provisional working vocabulary; P1.2 primary evidence owns canonical domain terminology.
- `adr_log.csv` — architecture decisions, alternatives and evidence linkage.
- `requirements.csv` — accepted/proposed deterministic requirements.
- `changes.csv` — controlled changes to frozen artifacts.

## Decision-driven rule

Accepted architecture must never exist only in prose. It must be represented through ADR/REQ traceability.

P1.0 no longer treats the 164 inherited competitor claims as a verification queue. All are controlled and classified by decision leverage. Architecture-impact evidence is verified early; background competitor detail is preserved for P1.3 after P1.2 primary contractor evidence.

Primary chain:

`SOURCE → EVIDENCE → ASSUMPTION / QUESTION / CONTRADICTION → ADR → REQUIREMENT → SPEC → TEST / GOLDEN THREAD`

## Current P1.0 status

- CP-01 A0 — PASS
- CP-02 A1 — PASS
- CP-03 A2+A3 method stress test + hostile critique — PASS / corrections implemented
- CP-04 A2+A4 decision traceability — PASS
- CP-05 final A0–A5 + independent artifact audit — PENDING

Active control spec: `../../04_phases/phase_1/P1.0_research_control/P1_0_CONTROL_SYSTEM_V0_2.md`.
Active audit protocol: `../../04_phases/phase_1/P1.0_research_control/audits/P1_0_AUDIT_PROTOCOL_V1_1.md`.
