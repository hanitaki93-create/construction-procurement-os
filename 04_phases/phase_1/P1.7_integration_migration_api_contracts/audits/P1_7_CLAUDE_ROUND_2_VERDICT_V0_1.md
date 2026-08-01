# P1.7 — Claude Round 2 Verdict v0.1

**Date:** 2026-08-01  
**Stage:** P1.7 — Integration, Migration & API Contracts  
**Verdict:** PASS / BLOCKERS NONE  
**P1.7:** READY FOR FINAL CHECKPOINT  
**P1.8+:** LOCKED UNTIL FINAL CHECKPOINT  
**Product code:** LOCKED

---

# 1. Verdict

`PASS — P1.7 Integration, Migration & API Contracts can close; proceed to final ADR reconciliation/checkpoint and unlock P1.8.`

Claude confirmed that BL-P17-05 is closed and that the remediation is stronger than the requested minimum.

---

# 2. Blockers

**None.**

## BL-P17-05 — CLOSED

Accepted closure basis:

1. `ACCEPTED_PRE_EFFECT` now requires positive evidence that no effect-bearing boundary was crossed.
2. `TERMINAL_NO_EFFECT` is never inferred from timeout, missing callback or absence.
3. `EFFECT_INDETERMINATE` has mandatory entry conditions for ambiguous external/domain effects.
4. User/agent relabelling without evidence is prohibited.
5. Stage transitions are immutable history and current stage is projection.
6. Operational cancel/pause cannot resolve effect uncertainty.
7. Only reconciliation/manual/block dispositions are allowed while indeterminate.
8. Partial/bulk work preserves item-level indeterminate state.

Claude attacked timeout, current-only provider, adapter replacement, non-proven provider idempotency, callback-before-persistence, partial batches and agent retry paths and found no compliant bypass.

---

# 3. Watches / non-blocking hardening

## W-48 — terminal disposition for permanently unresolvable indeterminacy

A permanently unresolvable external position must be closable through an explicit owning-domain/integration variance disposition without asserting that no effect occurred.

The historical effect stage remains indeterminate/unresolved; the operational reconciliation item may close with a bounded `UNRESOLVED_EXTERNAL_POSITION_ACCEPTED`-style disposition, explicit owner/authority/reason/evidence limitation and prohibition on unsafe replay.

No evidence is fabricated and no product/domain truth is rewritten.

## W-49 — uncorrelated observation retention/disposition

Authentic or potentially relevant uncorrelated observations remain quarantined under an explicit P1.4/P1.6 retention/security basis.

They may later be correlated, classified unrelated/invalid/duplicate or disposed/minimized only through bounded evidence-retention authority. Disposal cannot silently delete a still-active reconciliation dependency.

## W-50 — authenticity/validation class for quarantined observations

Quarantined observations preserve a typed admission/validation class, including at least:

- AUTHENTICATED_OR_PROVIDER_VALIDATED;
- SOURCE_ASSERTED_NOT_AUTHENTICATED;
- TECHNICALLY_UNVERIFIED;
- MALFORMED_OR_SECURITY_SUSPECT.

These may share a quarantine surface but never the same trust meaning or permitted follow-up actions.

## W-51 — PARTIAL_EFFECT aggregate projection

`PARTIAL_EFFECT` remains the aggregate projection while item/effect outcomes are mixed.

When all items become terminal/resolved and none remains indeterminate, the aggregate projects the exact union of final item outcomes. It never collapses mixed confirmed/no-effect outcomes into one false homogeneous stage.

---

# 4. Gate result

- G1 authority / no co-master — PASS
- G2 bounded commands / execution authority — PASS
- G3 Q/P/C/A and proposal-to-effect — PASS
- G4 event/message class separation — PASS
- G5 async/idempotency/publication/callback recovery — PASS
- G6 migration truth/provenance/history — PASS
- G7 P1.6 evidence/exact-version compliance — PASS
- G8 error/conflict/staleness/quarantine — PASS
- G9 cutover/in-flight/no dual writer — PASS
- G10 capability evolution/disable/replace — PASS
- G11 provider-neutral email/manual fallback — PASS
- G12 chat/agent readiness without capability assumptions — PASS
- G13 ADR-0006/V1 floor/no named connector prerequisite — PASS
- G14 A0–A3 without connectors — PASS
- G15 upstream/P07/product-code lock — PASS
- G16 audit readiness — PASS

---

# 5. Regression / gravity

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN

---

# 6. ADR impact

Claude accepted the semantic decisions for:

- ADR-0006 — V1 integration depth;
- ADR-0029 — capability-neutral bounded interface substrate;
- ADR-0030 — domain/integration event and publication-recovery boundary;
- ADR-0031 — connector/execution authority and conformance;
- ADR-0032 — migration truth and limitation.

ADR-0030 acceptance must include the frozen target/distribution/recipient basis for retry.

ADR-0031 acceptance must include:

- seven-stage effect taxonomy;
- positive-evidence burden for `ACCEPTED_PRE_EFFECT` and `TERMINAL_NO_EFFECT`;
- `EFFECT_INDETERMINATE` restrictions;
- stage-to-disposition matrix.

Later-owned remain:

- ADR-0016 → P1.9;
- ADR-0017 → P1.10.

No accepted upstream ADR reopens.

---

# 7. Readiness

`READY AFTER P1.7 FINAL CHECKPOINT`

P1.7 can close after:

1. watches W-48–W-51 are included as freeze-quality clauses;
2. ADR reconciliation is written;
3. frozen P1.7 contract/final verdict/checkpoint are recorded;
4. canonical project state is updated;
5. P1.8 entry handoff is created.
