# P1.8 — Partial-Population Post-Remediation Hardening v0.1

**Date:** 2026-08-01  
**Status:** CONTROLLING HARDENING / INTERNAL RECHECK INPUT  
**P1.8:** ACTIVE  
**P1.9+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Close residual readings around unknown population extent, evaluated-subset use and restricted-population computation before the full internal recheck.

This hardening controls over conflicting earlier wording.

---

# 2. Known-population requirement for evaluated-subset results

`REPORT_EVALUABLE_SUBSET_WITH_EXPLICIT_SCOPE_DISCLOSURE` is permitted only when:

- the complete declared eligible population is known under the exact PopulationDefinitionVersion;
- every eligible member is classified as evaluated or unevaluated;
- every known unevaluated member has a typed reason;
- no unknown population gap exists;
- overlap/deduplication is resolved;
- the evaluated subtotal is reproducible.

Therefore:

- `POPULATION_PARTIAL_UNKNOWN` cannot return `PRESENT_EVALUABLE_SUBSET`;
- unknown population extent requires `BLOCK_ON_INCOMPLETE_POPULATION` or `REPORT_DETERMINISTIC_RANGE` only where valid authoritative bounds exist;
- the product cannot display a point subtotal while leaving open that undiscovered eligible members may exist.

---

# 3. Strict decision-use ceiling

`PRESENT_EVALUABLE_SUBSET` is prohibited for:

- `COMMERCIAL_DECISION_SUPPORT`;
- `GOVERNED_APPROVAL_SUPPORT`;
- `EXTERNAL_ISSUED_REPORT`;
- `AUDIT_RECONSTRUCTION`.

This prohibition applies even where the report title or footnote openly states that the result is partial.

A subset result may be communicated externally only as a clearly informational or operational artifact whose declared use remains below the prohibited classes; external communication does not upgrade the use class.

No report composition, approval workflow, recipient or document title can override the metric-use disposition.

---

# 4. Restricted-population computation

A full eligible-population aggregate containing restricted members may be returned only when all are true:

- the executing service is authorized to evaluate the restricted source facts;
- the MetricDefinitionVersion permits aggregate computation;
- an active AggregateDisclosurePolicy permits the requested audience/use;
- inference/differencing controls pass;
- the result preserves restricted-detail/drill-through limitations;
- the eligible population is complete and the result is not based on omission.

Otherwise the result uses subset, range, restricted or blocked semantics according to the controlling contract.

The requesting principal's inability to see rows never alters the eligible population or denominator.

---

# 5. Range discipline

`PRESENT_DETERMINISTIC_RANGE` requires:

- both bounds to be valid for the declared decision use; or
- an explicitly supported one-sided bound type whose use policy consumes that one-sided bound.

An open/unbounded endpoint is never rendered as a finite estimate.

No midpoint, expected value or imputed point value is produced unless separately defined as a scenario/forecast metric with its own provenance and non-authoritative meaning.

---

# 6. Aggregate quality and use

The aggregate ResultQualityVector is recomputed from target-scope population and contribution facts. It is not inherited from child result labels.

The target-scope DecisionUseAssessment consumes:

- target eligible/evaluated population;
- PartialPopulationTreatment/value state;
- all composed quality dimensions;
- comparability;
- disclosure safety;
- declared decision use.

A child result being permitted for management review does not make the target aggregate permitted for management review automatically.

---

# 7. Recheck claim

Subject to full hostile recheck:

- no unknown population can produce an evaluated-subset point value;
- no subset value can support commercial decision, approval, external-issued-report or audit-reconstruction use;
- no restricted row is silently dropped;
- no range becomes an estimated point by presentation convention.
