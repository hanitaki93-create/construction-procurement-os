# P1.0 — Research Control System v0.2

**Parent:** Phase 1 Roadmap v1.0  
**Status:** ACTIVE  
**Supersedes:** `P1_0_CONTROL_SYSTEM_V0_1.md` for current P1.0 execution  
**Trigger:** CP-03 hostile critique / decision-leverage correction  
**Purpose:** Ensure every future architecture claim can be traced, challenged, revised and frozen deliberately without turning P1.0 into premature competitor reconstruction.

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

## 2. Evidence Grades — Source Strength

- **A** — primary official technical evidence: API/help documentation, official product training, contractual/product specification, formal public documentation.
- **B** — official but promotional/summary evidence: product marketing pages, official demos, vendor sales collateral.
- **C** — user/community evidence: reviews, forums, Reddit, YouTube comments, implementation commentary. Useful for pain/friction; weak for proving product mechanics.
- **D** — inference/architectural judgment. Never presented as external fact.
- **P** — primary contractor evidence obtained during P1.2: real artifacts, observed workflow, structured interview/process reconstruction. Strong for what an observed contractor actually does, not automatically universal.
- **N/A** — internal project-control artifact, not evidence of external reality.

Grades describe source strength/type, not truth and not architectural usefulness. Confidence is tracked separately.

## 3. Architectural Information Content

Source strength and architectural information content are separate dimensions.

At verification/decision use, evidence is characterized as one of:

- `OBJECT_MODEL_REVEALING` — exposes entities, fields, enums, cardinality, payload/schema or data relationships.
- `MECHANISM_REVEALING` — exposes states, transitions, guards, permissions, workflow/configuration behavior or integration direction.
- `EXISTENCE_REVEALING` — establishes that a capability exists but does not expose enough mechanics to constrain architecture.
- `PAIN_SIGNAL` — records friction, complaints, implementation burden or user sentiment; cannot define ontology by itself.
- `INFERENCE` — architecture/strategy interpretation built from underlying evidence; never treated as a vendor product fact.
- `UNKNOWN` — not yet classified or deferred until later reconstruction.

A Grade A source can still be architecturally low-value if it only proves existence. A lower-authority source can expose useful pain but cannot prove mechanics.

## 4. Decision Leverage

P1.0 evidence effort is proportional to decision leverage, not inherited text volume.

For every inherited competitor claim ask:

> Which architecture decision can this evidence change, and would flipping its truth value plausibly change the decision?

Canonical dispositions are maintained in:

`02_research/evidence/DECISION_LEVERAGE_CLASSIFICATION_V1_0.csv`

Dispositions:

- `VERIFIED_DECISION_RELEVANT` — already verified and potentially load-bearing.
- `VERIFIED_BACKGROUND` — already verified but no further P1.0 effort.
- `VERIFY_EXACT` — individually verify because truth can change a named decision.
- `VERIFY_GROUPED` — verify as a cross-vendor decision pattern; do not make each vendor instance a completion target.
- `ADR_INPUT_HYPOTHESIS` — inherited inference/architecture lesson; resolve through ADR using underlying evidence.
- `PAIN_SIGNAL` — theme/count as friction evidence; never use alone as ontology/mechanics evidence.
- `DEFER_P1_3` — preserve untouched for competitor reconstruction after primary contractor evidence.

`DEFER_P1_3` is not rejection and not loss of information. It is sequencing control.

## 5. Confidence

- `HIGH` — multiple compatible strong sources or direct primary evidence.
- `MEDIUM` — credible evidence but incomplete, narrow or indirectly observed.
- `LOW` — weak/isolated evidence or substantial unresolved interpretation.
- `UNKNOWN` — not yet researched.

## 6. Status Vocabulary

### Source verification
`PENDING_REVIEW / AVAILABLE / VERIFIED / UNAVAILABLE / SUPERSEDED`

- `AVAILABLE` means the source is accessible/retained but has not necessarily been externally re-verified.
- `VERIFIED` means the exact source/version/location has been reviewed under the P1.0 evidence protocol.

### Evidence
`PROPOSED / SUPPORTED / CONTESTED / WITHDRAWN / SUPERSEDED`

Applicability conditions such as SKU, region, release or required configuration belong in the locator/notes or a future applicability field; they do not require a weaker epistemic status.

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

## 7. Evidence Record Schema

Canonical evidence fields remain:

`evidence_id, claim, source_ids, source_locator, claim_type, grade, confidence, status, related_sections, related_req_ids, notes`

Decision leverage and architectural information content are companion classification metadata; they do not replace source grading.

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

- Atomicity is mandatory when a claim becomes `VERIFY_EXACT`, directly supports an ADR/Requirement, or otherwise becomes load-bearing.
- Background/deferred inherited rows do **not** need to be atomized merely to increase register purity.
- A load-bearing composite row may be marked `SUPPORTED` only when every material component is supported at the stated scope.
- If only part is supported, the inherited parent remains `CONTESTED` and verified/unsupported components are recorded in notes.
- If one component becomes load-bearing, create an atomic child `EVD-*` and trace the ADR/Requirement to that child.
- Qualitative adjectives such as `strong`, `best`, `broad`, or `source of truth` must be operationally defined or treated as inference/user sentiment.

This preserves CP-02 historical mapping without allowing atomicity work to become a self-expanding P1.0 workload.

## 8. Terminology Anti-Anchoring Rule

P1.0 terminology is a **working control vocabulary**, not a canonical ontology.

- Current terms remain `PROVISIONAL` unless they are purely internal control concepts.
- Competitor/incumbent terms are stored as attributed synonyms or pattern labels, not promoted to canonical domain language merely because they are well documented.
- P1.2 primary contractor evidence supplies the first canonical domain vocabulary.
- P1.3 maps competitor terms into the primary-derived vocabulary.
- A primary workflow must never be forced into an incumbent term solely because the incumbent term entered the register first.

## 9. Requirement Scope Vocabulary

Product-area scope and requirement scope are different concepts.

P1.1 product areas use:
`SPINE / THIN / INTERFACE-ONLY / OUT`.

A requirement record uses one of:
- `CROSS_CUTTING_CONSTRAINT`
- `PRODUCT_AREA_SPINE`
- `PRODUCT_AREA_THIN`
- `INTERFACE_CONTRACT`
- `DEFERRED`

The requirement register must not invent hybrid terms such as `SPINE_CONSTRAINT`.

## 10. Traceability Chain

`SOURCE → EVIDENCE CLAIM → ASSUMPTION / QUESTION / CONTRADICTION → ADR → REQUIREMENT → SPEC SECTION → TEST / GOLDEN THREAD`

Rules:
- Not every source creates evidence; not every evidence claim creates a requirement.
- Architecture research begins from decisions/questions, not from completion of a competitor-claim corpus.
- Assumptions may retain `source_ids` as convenience, but architecture reasoning uses claim-level evidence.
- Contradictions are evidence-claim to evidence-claim, not source to source.
- Every accepted requirement traces backward to evidence and/or an explicit ADR.
- Every load-bearing ADR states alternatives, required evidence and what would change the decision.

## 11. Freeze Rules

An artifact is `FROZEN` only when:
1. its gate is passed,
2. open blocking questions are zero,
3. contradictions affecting SPINE are resolved,
4. assumptions affecting the artifact are accepted/rejected/deferred explicitly,
5. the required red-team gate is passed.

A frozen artifact changes only through `CHG-*`.

## 12. P1.0 Work Packages

### P1.0-A — Schemas and registers
**Status:** CP-01 A0 PASS. Control schemas active; CP-03 critique corrections incorporated in v0.2.

### P1.0-B — Retro-file architecture assumptions/questions
**Status:** CP-02 A1 PASS. Current load-bearing assumptions/questions are controlled. ADR stubs now exist for the 15 inherited assumptions and newly exposed cross-cutting technical decisions.

### P1.0-C — Inherited competitor evidence control
**Status:** CP-02 A1 PASS FOR COMPLETENESS; CP-03 METHOD STRESS TEST PASS; DECISION-DRIVEN RECLASSIFICATION COMPLETE.

The 164 inherited §2 competitor statements remain historically controlled as `EVD-0005–0168`, but they are no longer a 164-item P1.0 verification queue.

Deep competitor reconstruction belongs to P1.3 after P1.2.

### P1.0-D — Terminology normalization
**Status:** ANTI-ANCHORING MODE.

Only enough terminology is normalized to operate the control system. Domain canonicalization waits for P1.2 primary evidence.

### P1.0-E — Decision/ADR bootstrap
**Status:** SEEDED.

`ADR-0003` through `ADR-0017` cover the 15 structural assumptions. `ADR-0018` through `ADR-0023` capture missing workflow/temporal/integration/money/numbering decisions surfaced by hostile critique.

### P1.0-F — P1.0 final gate audit
**Status:** PENDING CP-05 after targeted evidence/traceability correction.

## 13. Checkpoint Status

- CP-01 / A0: **PASS**
- CP-02 / A1: **PASS**
- CP-03 / A2+A3 method stress test: **PASS**
- CP-03 hostile critique: **ACCEPTED WITH CORRECTIONS**
- Old CP-04 `~82/164` trigger: **RETIRED**
- Targeted A2/A4 decision-evidence audit: **NEXT**
- CP-05 final P1.0 gate + hostile independent artifact audit: **PENDING**

## 14. P1.0 Completion Gate

P1.0 completes only when:

- all inherited v0.1 competitor claims/conclusions remain controlled or explicitly demoted;
- every current load-bearing assumption/question is visible;
- every current structural assumption has a named ADR/decision target;
- no architecture decision depends on an unclassified inherited claim;
- decision-critical competitor evidence is verified enough to prevent obvious blind spots, or explicitly deferred where primary evidence must come first;
- non-load-bearing competitor detail is preserved for P1.3 rather than processed early;
- terminology cannot silently canonicalize incumbent ontology before P1.2;
- accepted constraints have requirement IDs;
- every register has stable schema/status rules;
- external hostile audit receives actual repository artifacts rather than narrative-only summaries;
- all mandatory P1.0 audit gates pass.

Until then P1.1 remains locked.
