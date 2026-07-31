# P1.5 — Claude Hostile Audit Round 1 — Verdict v0.1

**Date:** 2026-07-31  
**Status:** FAIL / THREE NARROW BLOCKERS  
**P1.5:** ACTIVE  
**P1.6+:** LOCKED  
**Product code:** LOCKED

## Verdict

`FAIL — P1.5 remains open; blockers below must be remediated.`

## Blockers accepted for remediation

### BL-14 — certificate tax authority profile is conditional rather than bound

Current candidate admits `CERTIFICATE_TAX_COMPONENT` only where product calculates it but does not bind the deployment authority profile that determines product versus external statutory tax truth.

Required remediation:
- bind all tax facts to P1.4 OWN/MIRROR/REFERENCE/OUT authority at load-bearing fact grain;
- define the default profile;
- distinguish product commercial certificate-tax calculation from statutory tax-point/invoice/liability/posting truth;
- when statutory tax timing diverges, preserve product certified commercial truth and use the external statutory authority for statutory tax facts.

### BL-15 — effect conservation grain has an unstated exception

Current wording says effects occur at Commitment + EconomicComponentKey grain `where applicable`, while minimum obligations have no natural physical/component grain.

Required remediation:
- every monetary P07 effect must resolve to one closed effect-subject class;
- use Commitment + EconomicComponentKey for component-grained effects or Commitment + one named obligation-level identity for legitimate non-component effects;
- define which effect dimensions may use which subject class;
- enforce conservation within and across subject lineages through explicit mapping/reclassification, never by omission.

### BL-16 — lifecycle completeness lacks a closed transaction membership register

The lifecycle matrix contains the right transition fields, but P1.5 has not yet declared a closed set of transaction/control families to which the completeness gate applies.

Required remediation:
- create a named Load-Bearing Transaction Register;
- membership is selected by the frozen P1.4 load-bearing test and then frozen for P1.5 closure;
- every member must have the full transition contract;
- additions are controlled/prospective and cannot silently alter existing event meaning;
- GT1–GT4 are coverage samples, not proof of completeness.

## Watches adopted for hardening

1. Minimum qualification over-credit must have explicit treatment rather than being silently discarded by `max(0, …)`.
2. `ADVANCE_OUTSTANDING_EFFECT` never contributes to `CERTIFIED_GROSS`; recoupment changes advance/net-payable semantics, not gross earned/certified value.
3. Creation of a thin `EconomicComponentKey` mapping/fallback must be a governed P07 action with provenance, not an ad hoc parking place.
4. The supported capability-profile set must be actually closed/versioned; `for example` wording is insufficient for a closed set.

## Regression / readiness result from Claude

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN
- P1.6 READINESS = NOT READY

No ADR status changes are made from this round-1 verdict.
