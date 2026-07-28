# Construction Procurement OS
# P1.0 Audit Protocol v1.1

**Parent:** Phase 1 Roadmap v1.0 — FROZEN  
**Control spec:** `P1_0_CONTROL_SYSTEM_V0_2.md`  
**Supersedes:** `P1_0_AUDIT_PROTOCOL_V1_0.md` for current P1.0 execution  
**Scope:** P1.0 Research Control System only  
**Status:** ACTIVE AUDIT FRAMEWORK

## 1. Principle

The Phase 1 roadmap remains frozen. P1.0 exists to create a trustworthy decision/evidence control system, not to execute P1.3 competitor reconstruction early.

A P1.0 finding reopens the roadmap only if it proves that a subphase is missing, a dependency is impossible, a gate cannot be satisfied as designed, or a load-bearing contradiction changes the execution sequence.

Normal evidence/process corrections do not reopen the roadmap.

## 2. Audit Layers

### A0 — Control-Schema Audit
Verify ID conventions, register schemas, statuses, source grades, confidence, decision leverage, source/evidence distinction, assumption vs question distinction, contradiction handling, ADR lifecycle, requirement traceability, and architecture change control.

**Pass:** no ambiguity about where any future finding or decision belongs.

### A1 — Retro-File Completeness Audit
Verify every inherited v0.1 competitor claim has an Evidence ID; every old cross-market conclusion is evidence-backed or demoted; structural assumptions and known contradictions are registered; no load-bearing statement exists only in prose.

**Pass:** all inherited claims are controlled. A1 does not require factual verification of every competitor claim.

### A2 — Decision-Relevant Source Verification Audit
For evidence selected as decision-relevant, verify exact source, source type, locator, date/access date, actual support, grade, confidence, architectural information content and applicability limits.

Rules:
- `VERIFY_EXACT` claims are individually verified if they remain decision-flipping.
- `VERIFY_GROUPED` evidence is tested as a pattern; completion is not measured by proving every vendor instance.
- `DEFER_P1_3` claims remain preserved and unverified until competitor reconstruction after P1.2.
- `PAIN_SIGNAL` evidence is themed/countable but cannot prove product mechanics or ontology.
- `ADR_INPUT_HYPOTHESIS` records are not source-verified as vendor facts; underlying evidence is used to test the ADR.

**Pass:** every architecture decision that needs competitor evidence can answer what evidence bears on it, what the evidence actually reveals, and what remains unknown. No claim-count completion quota exists.

### A3 — Assumption / Question Hygiene Audit
Verify load-bearing assumptions have falsification tests and blockers; blocking questions have target phases; each structural assumption has a named ADR/decision target; accepted assumptions have evidence/ADR support; deferred assumptions have blast radius.

**Pass:** no hidden unresolved assumption affects P1.1 entry and decision targets are explicit.

### A4 — Decision Traceability Audit
Required chain:

`SOURCE → EVIDENCE → ASSUMPTION / QUESTION / CONTRADICTION → ADR → REQUIREMENT`

Sample:
- all current structural ADR stubs,
- all accepted ADRs,
- all critical proposed requirements,
- all `VERIFY_EXACT` evidence already dispositioned,
- at least one grouped cross-vendor pattern,
- pain signals only to verify they are not being used as mechanics evidence.

**Pass:** every sampled decision can answer what the decision is, alternatives, what evidence could change it, evidence strength/information content, and the correct phase in which it will be resolved.

### A5 — P1.0 Gate Audit
Mandatory checks:
1. Source Register stable and deduplicated.
2. Evidence Register contains all inherited v0.1 claims.
3. Every inherited competitor claim has a decision-leverage disposition; non-load-bearing claims may remain intentionally unverified for P1.3.
4. Old cross-market conclusions no longer exist as ungraded truth.
5. Major architecture assumptions visible.
6. Blocking questions visible.
7. Structural assumptions and newly exposed retro-fit-risk decisions have ADR stubs.
8. Known contradictions visible.
9. Terminology is anti-anchored: incumbent vocabulary cannot become canonical before P1.2 primary evidence.
10. Requirement traceability tested.
11. Architecture change process tested.
12. No critical control-schema instability remains.
13. Independent hostile auditor receives the actual roadmap/control/register/checkpoint artifacts, not narrative-only summaries.
14. Zero open S3/S4 findings.

Final decision remains binary:
- `PASS — unlock P1.1`
- `FAIL — remain in P1.0`

No conditional pass.

## 3. Audit Cadence

- **CP-01:** bootstrap complete → A0 — PASS.
- **CP-02:** inherited v0.1 retro-file complete → A1 — PASS.
- **CP-03:** first 25 exact verifications → A2 + A3 method stress test — PASS; hostile critique then triggered process correction.
- **CP-04:** **retired as a 50% / 82-of-164 claim-count trigger.** Replace with a targeted decision-evidence + A4 checkpoint after decision-leverage reclassification, ADR seeding and targeted A2 work stabilize.
- **CP-05:** P1.0 work complete → full A0–A5 plus independent hostile audit of actual artifacts.

The targeted A2/A4 checkpoint may retain the label `CP-04` for sequence continuity, but its trigger is decision coverage, not claim count.

## 4. Independent Audit Policy

CP-01 through CP-04 may use internal/self audit. CP-05 requires hostile independent review.

The independent auditor receives:
- frozen roadmap and any accepted roadmap-change records,
- active P1.0 control spec and audit protocol,
- source/evidence indexes,
- assumptions/questions/contradictions,
- ADR and requirement registers,
- checkpoint history and findings,
- decision-leverage classification,
- representative exact source locators and verification records.

A narrative summary alone is not an independent audit package.

The auditor is asked to find unsupported accepted claims, hidden assumptions, broken traceability, inconsistent status use, ontology anchoring, missing contradictions, premature decisions, and control work that does not constrain decisions.

## 5. Severity Levels

- **S0 — Cosmetic:** formatting/naming; no architecture consequence.
- **S1 — Control Weakness:** register/process issue; fix before next checkpoint.
- **S2 — Research Integrity Risk:** could contaminate multiple conclusions; stop affected research stream.
- **S3 — Architecture Risk:** could drive wrong Phase 1 decisions; P1.0 cannot pass.
- **S4 — Roadmap-Breaking:** proves frozen roadmap cannot execute; triggers ROADMAP_CHANGE review.

Only S4 automatically reopens the Phase 1 roadmap.

## 6. Audit Finding Lifecycle

`OPEN → ACCEPTED → FIX_IN_PROGRESS → VERIFIED_FIXED → CLOSED`

Alternative endings: `REJECTED / DUPLICATE / DEFERRED`.

Every accepted S2+ finding names affected records, corrective action, owner and verification method.

## 7. Cleanliness Rules

1. No architecture decisions hidden in prose.
2. No source without source type and grade.
3. No load-bearing evidence claim without exact source support or explicit non-external basis.
4. No accepted assumption without falsification history/evidence.
5. No accepted ADR without alternatives.
6. No critical requirement without backward traceability.
7. No competitor feature is promoted to ontology merely because it is well documented.
8. Unknown and deferred are valid values.
9. Conflicting evidence is logged, not averaged away.
10. Atomicity effort is mandatory for load-bearing claims, not for every inherited background sentence.
11. Roadmap change is exceptional and explicit.

## 8. Completion Definition

P1.0 is complete when the research-control system is trustworthy enough that P1.1 can define beachhead/scope without invisible assumptions, incumbent anchoring or a false requirement to finish competitor research first.

The product architecture does not need to be correct yet. The decision system must be capable of discovering what is correct in the proper phase order.
