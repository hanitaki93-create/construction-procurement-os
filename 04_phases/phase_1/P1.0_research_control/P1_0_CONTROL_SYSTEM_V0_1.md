# P1.0 — Research Control System v0.1

**Parent:** Phase 1 Roadmap v1.0  
**Status:** ACTIVE  
**Purpose:** Ensure every future architecture claim can be traced, challenged, revised and frozen deliberately.

---

## 1. ID Conventions

- Sources: `SRC-0001`
- Evidence claims: `EVD-0001`
- Terms: `TERM-0001`
- Assumptions: `ASM-0001`
- Open questions: `Q-0001`
- Contradictions: `CON-0001`
- Architecture decisions: `ADR-0001`
- Requirements: `REQ-0001`
- Architecture/roadmap changes: `CHG-0001`

IDs are never reused after rejection, deletion or supersession.

---

## 2. Evidence Grades

- **A** — primary official technical evidence: API/help documentation, official product training, contractual/product specification, formal public documentation.
- **B** — official but promotional/summary evidence: product marketing pages, official demos, vendor sales collateral.
- **C** — user/community evidence: reviews, forums, Reddit, YouTube comments, implementation commentary. Useful for pain/friction, weak for proving product mechanics.
- **D** — inference/architectural judgment. Never presented as external fact.
- **P** — primary contractor evidence obtained during P1.2: real artifacts, observed workflow, structured interview/process reconstruction. P evidence is strongest for what contractors actually do, but not automatically universal.
- **N/A** — internal project-control artifact, not evidence of external reality.

Grades describe source type, not truth. Confidence is tracked separately.

## 3. Confidence

- `HIGH` — multiple compatible strong sources or direct primary evidence.
- `MEDIUM` — credible evidence but incomplete, narrow or indirectly observed.
- `LOW` — weak/isolated evidence or substantial unresolved interpretation.
- `UNKNOWN` — not yet researched.

## 4. Status Vocabulary

### Evidence
`PROPOSED / SUPPORTED / CONTESTED / WITHDRAWN / SUPERSEDED`

### Assumption
`OPEN / TESTING / ACCEPTED / REJECTED / SUPERSEDED / DEFERRED`

### Question
`OPEN / BLOCKING / RESOLVED / DEFERRED`

### Contradiction
`OPEN / RESOLVED / ACCEPTED_VARIANT`

### ADR
`PROPOSED / ACCEPTED / REJECTED / SUPERSEDED / DEFERRED`

### Requirement
`PROPOSED / ACCEPTED / REJECTED / DEFERRED / SUPERSEDED`

### Change
`PROPOSED / ACCEPTED / REJECTED / IMPLEMENTED`

## 5. Traceability Chain

`SOURCE → EVIDENCE CLAIM → ASSUMPTION / QUESTION / CONTRADICTION → ADR → REQUIREMENT → SPEC SECTION → TEST / GOLDEN THREAD`

Not every source creates a requirement. Every accepted requirement must trace backward to evidence or an explicit ADR. Every load-bearing ADR must state its evidence and alternatives.

## 6. Freeze Rules

An artifact is `FROZEN` only when:
1. its gate is passed,
2. open blocking questions are zero,
3. contradictions affecting SPINE are resolved,
4. assumptions affecting the artifact are accepted/rejected/deferred explicitly,
5. red-team requirement for that artifact is passed.

A frozen artifact changes only through `CHG-*`.

## 7. P1.0 Work Packages

### P1.0-A — Schemas and registers
**Status:** DONE in the bootstrap package; CP-01 schema audit pending.

### P1.0-B — Retro-file v0.1 architecture assumptions
**Status:** STARTED / MAJOR LOAD-BEARING SET SEEDED.

### P1.0-C — Retro-file v0.1 competitor claims and cross-market conclusions
**Status:** STRUCTURAL RETRO-FILE COMPLETE; VERIFICATION PENDING.

The old §2 competitor statements exist as individual `PROPOSED` evidence records. Old §3 conclusions are `CONTESTED` and demoted to hypotheses. Source-by-source verification is still required.

### P1.0-D — Terminology normalization
**Status:** STARTED.

### P1.0-E — Requirement bootstrap
**Status:** STARTED.

### P1.0-F — P1.0 gate audit
**Status:** PENDING.

## 8. P1.0 Completion Gate

P1.0 completes only when:
- all v0.1 §2 claims are registered,
- all v0.1 §3 conclusions are supported or demoted,
- all current load-bearing assumptions are visible,
- all current blocking questions are visible,
- terminology used by the roadmap is normalized,
- accepted constraints have requirement IDs,
- every register has stable schema and status rules.

Until then P1.1 remains locked.
