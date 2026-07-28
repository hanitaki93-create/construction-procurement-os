# Phase 1 — Deterministic Architecture & Product Specification

Canonical roadmap: `../../01_roadmaps/PHASE1_ROADMAP_V1_0_FROZEN.md`

## Subphase execution rule
A subphase receives an execution directory when it becomes ACTIVE.

Each active subphase should contain:
- `README.md` — objective, dependencies, required outputs, gate
- `STATUS.md` — live state and next action
- `checkpoints/`
- `audits/`
- `outputs/`
- `frozen/`

Do not pre-create hundreds of empty subphase folders. The roadmap is the index; active directories are the execution history.

## Current
`P1.0_research_control/` is active. All later subphases are locked until their dependency gates pass.
