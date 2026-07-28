# Evidence Register

Evidence is stored in stable ID ranges rather than one ever-growing CSV.

## Inherited retro-file snapshot

- `retrofile/EVD_0001_0045.csv`
- `retrofile/EVD_0046_0090.csv`
- `retrofile/EVD_0091_0135.csv`
- `retrofile/EVD_0136_0178.csv`
- `retrofile/EVD_0179.csv`

The inherited v0.1 set occupies `EVD-0001` through `EVD-0178`. `EVD-0179` was added during CP-01 to make the first contradiction claim-to-claim traceable.

The inherited rows remain permanent historical records. They are **not** a P1.0 completion queue.

## Decision-driven evidence control

- `DECISION_LEVERAGE_CLASSIFICATION_V1_0.csv` — partitions all 164 inherited competitor claims by architecture decision leverage.
- `DECISION_LEVERAGE_CLASSIFICATION_V1_0.md` — handling rules and decision targets.
- `ADR_EVIDENCE_COVERAGE_V1_0.csv` — current evidence coverage and proper resolution phase for every ADR.
- `GROUPED_PATTERN_COVERAGE_V1_0.csv` — grouped cross-vendor patterns and P1.0/deferred disposition.

## Atomic decision-critical evidence

- `decision_critical/EVD_0180_0188.csv`
- `decision_critical/EVD_0189_0196.csv`
- `decision_critical/EVD_0197_NEW_DECISION_EVIDENCE.csv`
- `decision_critical/EVD_0198_0199_INTERNAL_CONSTRAINTS.csv`

These records are deliberately scoped evidence used by architecture decisions. `EVD-0180` through `EVD-0197` come from exact current product documentation; `EVD-0198/0199` are D-grade internal architecture reasoning supporting the two accepted non-retrofittable substrate constraints.

## Verification batches

- `verification_batches/A2_BATCH_01_PROCORE_EVD_0005_0029.md` — CP-03 method stress test.
- `verification_batches/A2_BATCH_02_DECISION_CRITICAL.md` — targeted architecture-impact verification after CHG-0002.

## Canonical inherited evidence schema

`evidence_id, claim, source_ids, source_locator, claim_type, grade, confidence, status, related_sections, related_req_ids, notes`

Decision-critical child evidence may add companion fields such as parent ID, architectural information content and decision targets. Those fields augment but do not replace source grade/confidence/status.

`source_locator` must identify the exact page/section/timestamp/help-article location once a claim is verified. During retro-file migration, `PENDING_A2_EXACT_LOCATOR` means the inherited parent was not independently verified.

## Status meaning

`PROPOSED` means the specific evidence row is not source-verified. An inherited parent may remain `PROPOSED` even where a newer atomic child provides verified evidence for the architecture question; historical parent wording is never silently rewritten.

`CONTESTED` means the inherited conclusion/claim is disputed or over-broad. Verification may move a claim to `SUPPORTED`, `CONTESTED`, `WITHDRAWN`, or `SUPERSEDED`.

## Rule

Evidence IDs are permanent. New evidence receives a new ID. Architecture decisions use the most precise evidence record available rather than relying on coarse inherited wording.
