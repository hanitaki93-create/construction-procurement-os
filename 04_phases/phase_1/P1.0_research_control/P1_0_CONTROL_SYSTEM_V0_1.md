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

IDs are never reused after rejection, deletion, supersession, or migration.

---

## 2. Evidence Grades

- **A** — primary official technical evidence: API/help documentation, official product training, contractual/product specification, formal public documentation.
- **B** — official but promotional/summary evidence: product marketing pages, official demos, vendor sales collateral.
- **C** — user/community evidence: reviews, forums, Reddit, YouTube comments, implementation commentary. Useful for pain/friction; weak for proving product mechanics.
- **D** — inference/architectural judgment. Never presented as external fact.
- **P** — primary contractor evidence obtained during P1.2: real artifacts, observed workflow, structured interview/process reconstruction. Strong for what an observed contractor actually does, not automatically universal.
- **N/A** — internal project-control artifact, not evidence of external reality.

Grades describe source type, not truth. Confidence is tracked separately.

## 3. Confidence

- `HIGH` — multiple compatible strong sources or direct primary evidence.
- `MEDIUM` — credible evidence but incomplete, narrow or indirectly observed.
- `LOW` — weak/isolated evidence or substantial unresolved interpretation.
- `UNKNOWN` — not yet researched.

## 4. Status Vocabulary

### Source verification
`PENDING_REVIEW / AVAILABLE / VERIFIED / UNAVAILABLE / SUPERSEDED`

- `AVAILABLE` means the source is accessible/retained but has not necessarily been externally re-verified.
- `VERIFIED` means the exact source/version/location has been reviewed under the P1.0 evidence protocol.

### Evidence
`PROPOSED / SUPPORTED / CONTESTED / WITHDRAWN / SUPERSEDED`

### Assumption
`OPEN / TESTING / ACCEPTED / REJECTED / SUPERSEDED / DEFERRED`

### Question
`OPEN / BLOCKING / RESOLVED / DEFERRED`

### Contradiction
`OPEN / RESOLVED / ACCEPTED_VARIANT`

### Terminology
`PROVISIONAL / CANONICAL / DEPRECATED / SUPERSEDED`

### ADR
`PROPOSED / ACCEPTED / REJECTED / SUPERSEDED / DEFERRED`

### Requirement
`PROPOSED / ACCEPTED / REJECTED / DEFERRED / SUPERSEDED`

### Change
`PROPOSED / ACCEPTED / REJECTED / IMPLEMENTED`

## 5. Evidence Record Schema

Canonical fields:

`evidence_id, claim, source_ids, source_locator, claim_type, grade, confidence, status, related_sections, related_req_ids, notes`

`source_locator` must become an exact page/section/timestamp/help-article locator before an external claim is marked `SUPPORTED`. `PENDING_A2_EXACT_LOCATOR` is valid only while the claim remains unverified.

Controlled claim types currently include:
- `INTERNAL_ARCHITECTURE_FACT`
- `PRODUCT_MECHANICS_CLAIM`
- `PRODUCT_CAPABILITY_CLAIM`
- `USER_OR_MARKET_PAIN_CLAIM`
- `ARCHITECTURAL_INFERENCE`
- `INHERITED_CONCLUSION_HYPOTHESIS`

### Composite inherited evidence rule

The v0.1 retro-file preserves inherited statements even when an inherited row bundles several independently testable assertions.

- A composite inherited row may be marked `SUPPORTED` only when every material component is supported at the stated scope.
- If only part of the row is supported, the inherited parent remains `CONTESTED` and the verified/unsupported components are described explicitly in `notes`.
- A composite or qualitative inherited parent claim may not directly support an ADR or Requirement unless all material components are independently verified.
- If one component becomes load-bearing for an architecture decision, create a new atomic child `EVD-*` claim and trace the ADR/Requirement to that child claim rather than to the composite parent.
- Qualitative adjectives such as `strong`, `best`, `broad`, or `source of truth` must be either operationally defined or treated as inference/user sentiment rather than product mechanics.

This preserves the 1:1 CP-02 historical mapping without allowing coarse inherited wording to contaminate later architecture decisions.

## 6. Requirement Scope Vocabulary

Product-area scope and requirement scope are different concepts.

P1.1 product areas use the frozen roadmap vocabulary:
`SPINE / THIN / INTERFACE-ONLY / OUT`.

A requirement record uses one of:
- `CROSS_CUTTING_CONSTRAINT` — applies across multiple product areas.
- `PRODUCT_AREA_SPINE` — requirement owned by a SPINE product area.
- `PRODUCT_AREA_THIN` — requirement owned by a THIN product area.
- `INTERFACE_CONTRACT` — requirement defines an integration/system boundary.
- `DEFERRED` — retained requirement intentionally outside current release scope.

The requirement register must not invent hybrid terms such as `SPINE_CONSTRAINT`.

## 7. Traceability Chain

`SOURCE → EVIDENCE CLAIM → ASSUMPTION / QUESTION / CONTRADICTION → ADR → REQUIREMENT → SPEC SECTION → TEST / GOLDEN THREAD`

Rules:
- Not every source creates evidence; not every evidence claim creates a requirement.
- Assumptions may retain `source_ids` as convenience, but architecture reasoning must use `evidence_ids` as its claim-level basis.
- Contradictions are evidence-claim to evidence-claim, not source to source.
- Every accepted requirement must trace backward to evidence and/or an explicit ADR.
- Every load-bearing ADR must state evidence and alternatives.

## 8. Freeze Rules

An artifact is `FROZEN` only when:
1. its gate is passed,
2. open blocking questions are zero,
3. contradictions affecting SPINE are resolved,
4. assumptions affecting the artifact are accepted/rejected/deferred explicitly,
5. the required red-team gate is passed.

A frozen artifact changes only through `CHG-*`.

## 9. P1.0 Work Packages

### P1.0-A — Schemas and registers
**Status:** CP-01 A0 PASS. Control schemas are active; FND-0001 through FND-0006 closed.

### P1.0-B — Retro-file v0.1 architecture assumptions/questions
**Status:** CP-02 A1 PASS. Load-bearing inherited assumptions, known contradiction and explicit inherited research questions are controlled; FND-0008 closed.

### P1.0-C — Retro-file v0.1 competitor claims and cross-market conclusions
**Status:** CP-02 A1 PASS FOR COMPLETENESS; A2 SOURCE VERIFICATION ACTIVE.

The 164 §2 competitor statements are controlled as EVD-0005–0168. The 10 old §3 conclusions are controlled/demoted as EVD-0169–0178. Their factual truth is not implied by completeness: external records remain `PROPOSED` until exact-source verification.

### P1.0-D — Terminology normalization
**Status:** STARTED; expands during A2 verification.

### P1.0-E — Requirement bootstrap
**Status:** STARTED.

### P1.0-F — P1.0 final gate audit
**Status:** PENDING CP-05.

## 10. Checkpoint Status

- CP-01 / A0: **PASS**
- CP-02 / A1: **PASS**
- A2 exact source verification: **ACTIVE; first 25 external claims completed**
- CP-03 / A2+A3: **AUDIT ACTIVE**

## 11. P1.0 Completion Gate

P1.0 completes only when:
- all v0.1 §2 claims are registered,
- all v0.1 §3 conclusions are supported or demoted,
- all current load-bearing assumptions are visible,
- all current blocking questions are visible,
- terminology used by the roadmap is normalized,
- accepted constraints have requirement IDs,
- every register has stable schema and status rules,
- all mandatory P1.0 audit gates pass.

Until then P1.1 remains locked.
