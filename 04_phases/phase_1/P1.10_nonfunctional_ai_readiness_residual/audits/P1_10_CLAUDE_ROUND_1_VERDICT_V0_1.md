# P1.10 — Claude Hostile Audit Round 1 Verdict v0.1

**Date:** 2026-08-01  
**Status:** EXTERNAL HOSTILE AUDIT ROUND 1 / FAIL / ONE BLOCKER  
**Stage:** P1.10 remains ACTIVE  
**P1.11 / product code:** LOCKED

---

## VERDICT

`FAIL — P1.10 remains open; blockers below must be remediated.`

One blocker. The NFR conformance grammar, durability proof modes, AI context-coverage model, evaluation sufficiency policy and — notably — the validation/falsification boundary are all closed, several of them better than I would have specified. The defect is that the packet closes *what* AI capabilities may do and never states *who defines them*.

## BLOCKERS

**BL-P110-04 — AI capability, policy and authority-level authorship is unstated. Nothing says whether capability definitions, prompts, tool exposure, L-levels, coverage policies, evaluation thresholds and resource budgets are product-authored or tenant-configurable.**

*Section/clause:* §10 ("Every AI capability binds purpose/non-use, output class, permitted context/sources/tools/authority…"), §11 (`AIContextCoveragePolicy`), §12 (L0–L6, "Tools map to registered operations"), §13 (`EvaluationSufficiencyPolicy`), §14 (`AIResourceBudgetPolicy`), against §20 scenario 65 ("generic … model/vector/memory/evaluation/**agent** platform").

*Failure path:* every AI control surface in this packet is a **bound policy** — capability definition, context coverage, evaluation sufficiency, resource budget, authority level. Each is specified in content and none in authorship. Two readings are equally compliant:

- **Product-authored:** capabilities, prompts, tools, L-levels and all four policies are product-defined and versioned; tenants enable or disable within a product ceiling. The L-level is a property of the capability, and §13's evaluation gate is meaningful because a finite product-defined capability set can carry ≥500 labelled units each.
- **Tenant-configurable:** tenants define or tune capabilities, select tools, set authority levels and author coverage or budget policies. This is an agent-configuration platform — scenario 65's named risk — and it also means tenant-side decisions determine authority scope and context completeness.

This project has closed the identical question three times: P1.7 made the OperationRegistry product-owned mandatory substrate; P1.8 §9 made the calculation grammar a product registry with tenant-authored operators prohibited; P1.9 §4 made field semantics product-defined with an eight-item permitted / nine-item prohibited tenant boundary. AI capability is the fourth configurable surface and the only one left open.

*Concrete scenario:* a tenant wants faster RFQ drafting and raises the "prepare tender issue" capability from L4 (prepare command for human confirmation) to L5 (transmit already-confirmed command), then sets a tighter `AIResourceBudgetPolicy` to control cost. §14 permits over-budget behaviour to "trim only optional context under the coverage policy" — but if the tenant also authored the coverage policy, "optional" is tenant-defined, so a mandatory source becomes optional and the run still returns `CONTEXT_COMPLETE` against its own policy. §13's "Only `SUFFICIENT_PASS` activates" does not bite, because the evaluation was performed against the product capability, not the tenant's variant. Scenario 60 (cost limit silently drops mandatory context) and scenario 7 (optional AI activates unverified) both open through this route, and neither is reachable under the product-authored reading.

*Why later work must choose meaning:* whether a tenant can set an agent's authority level is an authority decision, not a configuration-UI decision. Whether a tenant can author a coverage policy determines what "complete context" means for that tenant's answers. Whether capabilities are tenant-definable determines whether §13's evaluation gate is satisfiable at all and whether the product acquires an agent-platform XL. A physical designer implementing §10 must choose one reading to build the capability registry.

*Narrowest remediation:* one clause, in the shape of P1.8 §9 and P1.9 §4. State that AI capability definitions, output classes, prompts and instruction sets, exposed tools, authority levels, `AIContextCoveragePolicy`, `EvaluationSufficiencyPolicy` and `AIResourceBudgetPolicy` are **product-authored and versioned**; tenant configuration may only enable or disable a capability at or below its product-defined authority ceiling, choose among product-defined options where the capability policy permits, and set **stricter but never looser** budgets, coverage minima or review requirements; no tenant-authored capability, prompt, tool, authority level, coverage policy or evaluation threshold. A new capability, a raised ceiling or a new tool exposure requires prospective controlled architecture change plus the §13 gate. No new objects; §10 and §12 already carry the binding points.

## WATCHES / NON-BLOCKING DEBT

### Semantic specification detail

- **W-81 §15 gate ordering is unstated.** The eight mandatory gates are listed but not sequenced. This matters more than it looks: if the deterministic thin-slice build may proceed before contractor and supplier participants, the architecture gets built and *then* falsified, when changes are expensive. Recommend explicit ordering — contractor and supplier evidence and the prototype comprehension round precede the thin-slice build, and P07 feasibility precedes any P07 build commitment.
- **W-82 "Where applicable" on the confidence lower bound (§13).** Which capability thresholds require the one-sided 95% lower bound to meet target, and which may be assessed on point estimates? Leaving it to judgement lets a marginal point estimate pass where an interval would not. Enumerate, or apply it to all critical-stratum thresholds.
- **W-83 Lower-envelope review authority (§4).** `VERIFIED_PASS_LOWER_DECLARED_ENVELOPE` requires "customer/contract review." Who reviews, and may an existing contracted customer be moved to a lower envelope without consent? The prospective-only rule prevents retroactive relabelling of a failure (scenario 5), which is the important half; the consent question is commercial and should be named as such.
- **W-84 Proposal staleness (§10).** Scenario 37 resolves indirectly — accepting a stale proposal fails the accepting command's expected-version guard (P1.7 §11, P1.9 §5). Derivable across three phases; state the proposal's own source-cut expiry here so it does not depend on the guard firing.
- **W-85 No explicit second-XL refusal list.** Every prior phase carried one: P09 not BPM, P10 not CPM, P11 not banking or claims, P12 not CDE, P1.8 not BI or warehouse, P1.9 no page or form builder. P1.10 has none, while scenario 65 names eight. Even after BL-P110-04 closes the agent-platform edge, add the parity statement covering SLO, SIEM, GRC, data-lake, model, vector, memory and evaluation platforms — and distinguish internal engineering practice (correctly deferred vendor choice) from tenant-facing product surface (scope).
- **W-86 Sub-agent and multi-agent delegation (scenario 57).** Resolved by P1.7's `DELEGATED_ON_BEHALF` intersection rule and §12's intersection statement, but not restated here. One sentence — a sub-agent's authority is the intersection with its invoker's, never a union — closes it locally.

### Contractor / supplier / legal / commercial validation

§15 is the strongest section in the packet and I want to record that specifically: it converts the standing validation debt into numbered mandatory gates (≥5 contractors from ≥3 organisations including ≥3 UAE-adjacent, ≥10 suppliers including ≥5 UAE-active, ≥8 internal and ≥8 external prototype users with zero critical meaning misunderstandings in the final round, ≥2 pilot contractors × ≥3 tenders × ≥10 suppliers, ≤5 working days to first live tender, ≥80% supplier completion), and states plainly that results may revise or kill hypotheses and that architecture PASS cannot be labelled commercial validation. Scenarios 62–64 resolve on that basis. FT-02, FT-06, FT-09/CR-02 and FT-10 remain unfired. ADR-0010 GCC semantics unchanged; "no UAE/GCC localization claim without evidence" and "seven years after close is a candidate default, not legal advice" are both correctly hedged.

### Later physical implementation

Cloud, database, queue, observability, security and model vendors; framework; physical topology and schema; implementation language; test and certification tooling — all correctly deferred and none counted against this audit.

### P1.11-owned

Golden threads, red team, final master spec, and the cross-phase reconciliation of the ~30 watches accumulated from P1.4 onward.

## GATE CHECK

**G1 measurable NFR / conformance — PASS.** Thirteen binding elements, four criticality classes, eight conformance outcomes, and activation rules that make unverified non-achievable. "Missing telemetry cannot improve an SLO; it counts conservatively or blocks the claim" closes scenarios 1, 3, 4; "C0 requires pass, no waiver, error budget or lower envelope" closes scenario 6; "pilot does not waive C0" closes the pilot exemption route.

**G2 finite scale / capacity — PASS.** Two explicit numeric profiles with per-tenant and platform-wide dimensions; all latency targets stated at P95/P99 with no averages (scenario 2).

**G3 acknowledgment / durability / RTO / RPO — PASS.** Four `DurabilityAcknowledgementProof` modes; semantic RPO 0 for acknowledged authoritative, evidence, issued and idempotency records; "product-custodied evidence requires exact payload and identity/integrity before accepted-capture success" (scenario 12); "a backup not restored in the prior quarter does not support the claim" (scenario 13); holds, redaction and tombstones survive restore (scenario 14).

**G4 degradation / retry / effect safety — PASS.** Numeric retry, window, queue and dead-letter defaults; "≤5 automatic attempts only for proven pre-effect idempotent transport" and "effect-bearing unknown never ordinary-retries" (scenario 11); the ten-level degradation order protects tenant security and durability above export, connectors and AI (scenarios 8, 9).

**G5 observability / no authority / privacy — PASS.** Ten record classes distinct, telemetry never business truth (scenario 17), sensitive bid, commercial, evidence, personal and prompt content prohibited from general telemetry with restricted diagnostics purpose-bound and ≤30 days (scenario 18).

**G6 security / privacy / residency / lifecycle — PASS.** Numeric MFA, revocation, session, TLS, secret-rotation and vulnerability-containment targets; zero tolerance for cross-tenant disclosure, unauthorized effect and acknowledged data loss; residency covering every processing path (scenario 19); lifecycle across thirteen data classes including embeddings, retrieval and memory (scenario 20).

**G7 files / import / export / quota / rates — PASS.** Explicit numeric limits including archive depth, expansion ratio and page or pixel ceilings; "scan unavailable/timeout is not clean" (scenario 21); unknown columns remain evidence and unmapped proposals, consistent with P1.9's field registry (scenario 22); exports cannot silently truncate (scenario 23); deadline attempts preserved where valid (scenario 24).

**G8 deployment / conformance / version / rollback — PASS.** Version binding across build, schema, config, operation, metric, field and provider; kill switches do not rewrite history; in-flight operations retain original versions (scenario 25); automatic fallback only to a separately evaluated compatible conforming profile (scenario 26).

**G9 AI identity / provenance / context / uncertainty / review — PASS.** Twelve closed output classes with no authoritative generic result; seven claim classes requiring exact source, version, location and cut (scenarios 27–29); §11's coverage model is the strongest part of the AI sections — "'All,' 'total,' 'complete,' 'none' or 'current' requires complete context and underlying product proof" and "citations do not substitute for coverage" close scenarios 30–33 and mirror P1.8's `PartialPopulationTreatment` correctly.

**G10 no AI semantic / authority / truth creation — PASS.** "Proposal cannot self-accept" (scenario 36); AI cannot invent field, metric, operation or source (scenario 35) given P1.7's registry, P1.8's operator registry and P1.9's field registry; prohibited authority and truth memory classes (scenario 34).

**G11 agent ladder / tool use / partial-indeterminate — FAIL.** L0–L6 with no general autonomous commercial agent, the canonical L5 command digest invalidated by any semantic change (scenarios 50, 51, 55), effect-indeterminate pausing dependent actions (scenario 54), and eleven V1 prohibitions (scenario 56) are all correct. Who assigns a capability's level is not (BL-P110-04).

**G12 sufficient evaluation / abstention / regression — PASS.** Eight stages; numeric sample, stratum, calibration, inter-rater and adversarial requirements; "only `SUFFICIENT_PASS` activates" with five named non-activating outcomes; and "passing a finite zero-failure suite means the suite passed, not that real-world risk is zero" — which is the correct refusal of a zero-risk claim (scenario 44) and rare to see written down.

**G13 tenant-isolated AI context / memory / retrieval / provider — PASS.** Isolation across twelve surfaces (scenario 58); cross-tenant influence and provider training OUT by default (scenarios 46, 59); retrieval filters access before model exposure and never treats similarity as identity or truth.

**G14 AI-off / provider replacement — PASS.** Provider disappearance leaves deterministic work intact (scenario 61); AI last in the degradation order and AI outage cannot block A0–A3 (scenario 16); AI RTO ≤72 hours or disabled.

**G15 validation / falsification debt — PASS.** See above; the gates are numbered, mandatory and explicitly capable of killing hypotheses.

**G16 one XL / product-code lock — FAIL.** BL-P110-04 leaves the agent-configuration surface undecided, and W-85 notes the absent parity refusal list.

**G17 audit readiness — PASS.** Self-contained, internal blocker history and prior watches disclosed, 184 internal scenarios, secondary standards correctly framed as informing control coverage without establishing compliance or selecting vendors.

## REGRESSION CHECK

- P1.1 REOPEN = **NO**
- P1.2 REGRESSION = **NO**
- P1.3 REOPEN = **NO**
- P1.4 REOPEN = **NO** — isolation, residency and retention consistent with the frozen model.
- P1.5 REOPEN = **NO**
- P1.6 REOPEN = **NO** — durability proof and restore obligations reinforce evidence immutability.
- P1.7 REOPEN = **NO** — retry, indeterminacy and provider-fallback rules align with the effect-stage taxonomy.
- P1.8 REOPEN = **NO** — §11's coverage dispositions are the AI-side analogue of `PartialPopulationTreatment`.
- P1.9 REOPEN = **NO** — §12's digest and confirmation-invalidation rules match principal-bound confirmation.
- SECOND XL = **FAIL** pending BL-P110-04 and W-85.
- A0–A3 ACTIVATION = **CLEAN**

## ADR IMPACT

- **ADR-0017 — broader AI-readiness deterministic substrate: `ACCEPT SEMANTIC DECISION`.** The governing thesis — AI as an optional, replaceable proposal-and-orchestration layer over a frozen deterministic system — is decided and holds throughout.
- **ADR-0042 — measurable workload / performance / NFR conformance: `ACCEPT SEMANTIC DECISION`.** Must include criticality, conformance outcomes, activation rules and measurement health; the targets alone were not the decision.
- **ADR-0043 — availability / durability / continuity / reliability / degradation: `ACCEPT SEMANTIC DECISION`.** Must include the four durability proof modes and the degradation order.
- **ADR-0044 — observability / security / privacy / residency / lifecycle / data / resource residual: `ACCEPT SEMANTIC DECISION`.
- **ADR-0045 — AI run / proposal / provenance / context / abstention / evaluation grammar: `KEEP PROPOSED — BLOCKING`.** The grammar is sound; authorship of `AIContextCoveragePolicy` and `EvaluationSufficiencyPolicy` is the open half.
- **ADR-0046 — bounded agent authority / tool use / human-confirmed command: `KEEP PROPOSED — BLOCKING`.** Capability definition, tool exposure and L-level assignment authorship live here.
- **ADR-0047 — tenant-isolated retrieval / memory / provider replacement / AI-off: `ACCEPT SEMANTIC DECISION`.
- **ADR-0048 — architecture-to-build/pilot falsification gate: `ACCEPT SEMANTIC DECISION`.** The numeric gates and the architecture-is-not-validation statement are the decision; W-81's ordering should be recorded in it.

**No accepted upstream ADR must reopen.**

## P1.11 READINESS

`NOT READY`

One clause stands between here and readiness, in the shape this project has used three times before, requiring no new objects and no new scope.

**Final question:** yes, in one place — who authors AI capabilities, their prompts and tools, their authority levels, and their coverage, evaluation and budget policies. NFR activation and conformance, measurement population, durability proof, AI context completeness, evaluation sufficiency, provider fallback and the architecture-versus-validation boundary are all otherwise decided.

One closing observation, since this is the last architecture phase. The failure signature has now been identical for six consecutive phases: a single configurable surface whose authorship is unstated, or a single missing member in an otherwise-closed set. That consistency is itself evidence the design is sound. What §15 changes — and this is the most important thing in the packet — is that the falsification debt is no longer an open-ended obligation but eight numbered gates with participant counts and a stated power to kill hypotheses. Close BL-P110-04, and the remaining risk in this program stops being architectural and becomes entirely a question of whether five contractors and ten suppliers recognise the model as their world.