# Construction Procurement OS
# Phase 1 Roadmap v1.3 — FROZEN

**Version:** 1.3  
**Freeze date:** 2026-07-28  
**Status:** FROZEN GOVERNING ROADMAP  
**Supersedes:** Phase 1 Roadmap v1.2  
**Change basis:** `ROADMAP_CHANGE_CHG_0006.md`  
**Sequence:** unchanged

## 1. Inheritance

Roadmap v1.3 inherits every objective, output, gate, dependency and high-ceiling protection from v1.0, v1.1 and v1.2 except where explicitly augmented below.

No product scope or ambition is reduced by this revision.

## 2. P1.2 augmentation — stronger primary-evidence independence

All v1.2 raw-capture anti-anchoring rules remain binding.

### 2.1 Verbatim-by-default capture

Primary contractor terminology, artifact labels, workflow labels and observed statuses are captured **verbatim by default** before normalization.

If capture-time normalization is unavoidable, the researcher must log an explicit exception containing:
- original/raw wording where recoverable;
- normalized wording;
- reason normalization occurred at capture time;
- researcher/date/source context.

`Where practical` cannot be used as an unlogged escape from preserving primary language.

### 2.2 Primary corroboration reconciliation

At the P1.2 gate, every incumbent-derived architecture/workflow hypothesis carried into primary research must be classified as one of:
- `PRIMARY_CORROBORATED`;
- `PRIMARY_CONTRADICTED`;
- `PRIMARY_UNOBSERVED`;
- `NOT_TESTED`.

`PRIMARY_UNOBSERVED` is not automatic rejection, but it may not silently retain the same evidentiary weight it had before P1.2.

The Unmodeled / Unmatched Observation Register remains mandatory and continues to ask what primary evidence revealed that the incumbent-derived hypothesis set did not model.

## 3. P1.5 augmentation — audit-store/redaction compatibility

P1.5 owns the audit/history invariant and must freeze it in a form compatible with the later P1.6/P1.10 redaction, retention and legal-hold model.

The invariant is therefore not simply `append-only, no exceptions`.

P1.5 must define an **append-only commercial/audit history with a controlled redaction/tombstoning mechanism** that can later remove or restrict legitimately redactable content while preserving:
- immutable record/event identity;
- financial meaning and derived-balance integrity;
- referential integrity;
- evidence that a redaction/tombstone action occurred;
- authority and audit trail for that action.

P1.6/P1.10 elaborate the exact privacy/retention/hold rules; they must not require rewriting the P1.5 audit substrate.

## 4. Projection evolution — explicit, versioned, non-silent

The v1.1/v1.2 Closed Sub-graph rule remains: adding future entity/event types must not rewrite historical records or change the meaning of existing event types.

Additionally, projection/derivation evolution must be explicit.

A newly introduced event type may legitimately change a derived balance or report projection for historical timelines. When it does:
- the projection/derivation definition must be versioned or otherwise explicitly identifiable;
- the change must be traceable to an ADR/requirement/spec change;
- existing historical events remain immutable;
- recalculation behavior and effective applicability must be defined;
- a projection must never change silently because a new event type was added.

The requirement is projection reproducibility, not permanent freezing of every formula.

## 5. Unchanged high-ceiling protections

All earlier protections remain binding, including:
- reality before incumbents;
- canonical commercial cost-event substrate;
- provenance and bounded business actions;
- ownership/tenancy/legal-entity/JV semantics;
- workflow/financial-state separation;
- effective dating and in-flight configuration binding;
- field-level integration authority/staleness;
- monetary precision/rounding/calculation order;
- numbering/concurrency/fiscal semantics;
- redaction/retention/legal-hold obligations;
- P1.5 Ceiling Test;
- P1.5 Closed Sub-graph Gate;
- closed-period correction golden thread.

## 6. Phase status

- P1.0 — complete only when CP-05 final verdict is recorded PASS.
- P1.1–P1.11 — follow normal dependencies.
- Product code — NOT STARTED.
- Phase 2/3 — LOCKED.

**Phase 1 Roadmap v1.3 is the governing roadmap.**
