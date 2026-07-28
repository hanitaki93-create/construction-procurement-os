# Construction Procurement OS
# Phase 1 Roadmap v1.2 — FROZEN

**Version:** 1.2
**Freeze date:** 2026-07-28
**Status:** FROZEN GOVERNING ROADMAP
**Supersedes:** Phase 1 Roadmap v1.1
**Sequence:** unchanged

## 1. Inheritance

Roadmap v1.2 inherits every objective, output, gate, dependency and high-ceiling protection from v1.0 and v1.1 except where explicitly augmented below.

No product scope or ambition is reduced by this revision.

## 2. P1.2 augmentation — Primary Workflow Evidence

### Raw-capture anti-anchoring rule

Before any contractor observation is mapped to project terminology, incumbent terminology, entities, states or architecture hypotheses, P1.2 must retain a raw observation layer.

For every interview/workflow/artifact reconstruction:
- participant terminology is recorded verbatim where practical;
- original artifact labels/columns/status names remain preserved;
- normalization/mapping occurs as a separate logged transformation after raw capture;
- mappings to incumbent or project terms must identify the mapped source term rather than overwriting it;
- research prompts may test known hypotheses but may not restrict capture to the pre-existing hypothesis list.

### Required P1.2 output: unmatched observations

P1.2 must maintain an **Unmodeled / Unmatched Observation Register** containing behaviors, objects, workarounds, relationships or language that do not fit the current hypothesis/competitor vocabulary.

Every primary workflow reconstruction must explicitly answer:

> What did we observe that the current incumbent-derived hypothesis set does not model?

### Additional P1.2 gate

PASS only if raw primary evidence can be inspected independently of later terminology/ontology mapping and at least one explicit check for unmatched observations was performed on every reconstructed workflow.

## 3. P1.6 / P1.10 augmentation — Redaction, retention and legal hold

The evidence/audit substrate must reconcile three competing obligations:
- immutable commercial/audit history;
- removal/redaction of personal or non-commercial data when legitimately required;
- legal/dispute hold overriding ordinary retention/deletion schedules.

### P1.6 required semantics

Define:
- immutable record identity separate from redactable field content;
- field/blob tombstoning or equivalent redaction semantics that preserve referential and financial integrity;
- what audit facts remain after personal-data redaction;
- attachment/blob treatment when source records are retained but content must be removed/restricted;
- legal-hold state and authority;
- precedence between hold, retention expiry and deletion/redaction requests;
- evidence that a redaction occurred without retaining prohibited content in ordinary user-visible history.

### P1.10 required controls

Define measurable retention/hold/redaction operational requirements, including authorization, auditability, export behavior, backup/restore treatment and failure handling.

### Gate

P1.6/P1.10 cannot freeze if append-only audit semantics require retaining personal content that the retention/redaction policy says must be removed, or if a legal hold can be bypassed by ordinary lifecycle cleanup.

## 4. Closed-under-extension event schema — already governing

No new roadmap change is required for this critique item.

Roadmap v1.1 Closed Sub-graph Gate already requires that adding future entity/event types is additive and **does not require rewriting historical records or changing the meaning of existing event types**.

This remains binding in v1.2 and must be tested at the P1.5 Closed Sub-graph Gate.

## 5. Unchanged protections

All v1.1 protections remain binding, including:
- workflow/financial-state separation;
- effective dating/historical interpretation;
- in-flight configuration binding;
- field-level integration authority/staleness;
- money representation/rounding/calculation order;
- numbering under concurrency/retry/fiscal rules;
- P1.5 Ceiling Test;
- P1.5 Closed Sub-graph Gate;
- closed-period correction golden thread.

## 6. Phase status

- P1.0 — ACTIVE until CP-05 passes
- P1.1–P1.11 — LOCKED by normal dependencies
- Product code — NOT STARTED
- Phase 2/3 — LOCKED

**Phase 1 Roadmap v1.2 is the governing roadmap.**