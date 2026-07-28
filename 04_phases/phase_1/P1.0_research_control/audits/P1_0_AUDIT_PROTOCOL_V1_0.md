# Construction Procurement OS
# P1.0 Audit Protocol v1.0

**Parent:** Phase 1 Roadmap v1.0 — FROZEN  
**Scope:** P1.0 Research Control System only  
**Status:** ACTIVE AUDIT FRAMEWORK

## 1. Principle

The Phase 1 roadmap is frozen. P1.0 is audited internally at checkpoints and once at the final gate.

The roadmap is reopened only if a P1.0 finding proves that:
- a subphase is missing,
- a dependency is impossible,
- a gate cannot be satisfied as designed,
- or a load-bearing contradiction changes the execution sequence.

Normal research findings do not reopen the roadmap.

## 2. Audit Layers

### A0 — Control-Schema Audit
Verify ID conventions, register schemas, statuses, evidence grades, confidence rules, source/evidence distinction, assumption vs question distinction, contradiction handling, ADR lifecycle, requirement traceability, and architecture change control.

**Pass:** no ambiguity about where any future finding belongs.

### A1 — Retro-File Completeness Audit
Verify every inherited v0.1 competitor claim has an Evidence ID; every old cross-market conclusion is evidence-backed or demoted; structural assumptions and known contradictions are registered; no load-bearing statement exists only in prose.

**Pass:** all inherited claims are controlled.

### A2 — Source Verification Audit
For each external claim verify exact source, source type, page/video/help article, date/access date, actual support, grade, confidence, and separation of marketing/community evidence from mechanics evidence.

**Pass:** every inherited competitor claim is `SUPPORTED / CONTESTED / WITHDRAWN / SUPERSEDED`. No `PROPOSED` inherited claim remains at the final gate.

### A3 — Assumption / Question Hygiene Audit
Verify load-bearing assumptions have falsification tests and blockers; blocking questions have target phases; accepted assumptions have evidence or ADR support; deferred assumptions have blast radius.

**Pass:** no hidden unresolved assumptions affect P1.1 entry.

### A4 — Traceability Audit
Required chain at P1.0:

`SOURCE → EVIDENCE → ASSUMPTION / QUESTION / CONTRADICTION → ADR → REQUIREMENT`

Sample at least 10 competitor-mechanics claims, 5 user-friction claims, all critical assumptions, all accepted ADRs, and all critical proposed requirements.

**Pass:** every sampled conclusion can answer what the claim is, where it came from, evidence strength, what decision depends on it, and what would change our mind.

### A5 — P1.0 Gate Audit
Mandatory checks:
1. Source Register stable and deduplicated.
2. Evidence Register contains all inherited v0.1 competitor claims.
3. Every inherited claim verified or withdrawn.
4. Old cross-market conclusions no longer exist as ungraded truth.
5. Major architecture assumptions visible.
6. Blocking questions visible.
7. Contradictions visible.
8. Terminology normalized enough for P1.1.
9. ADR process tested with at least one accepted and one rejected/deferred decision.
10. Requirement traceability tested.
11. Architecture change process tested or dry-run.
12. No critical register schema change has been needed for two consecutive verification batches.

Final decision is only:
- `PASS — unlock P1.1`
- `FAIL — remain in P1.0`

No conditional pass.

## 3. Audit Cadence

- **CP-01:** bootstrap complete → run A0.
- **CP-02:** inherited v0.1 retro-file complete → run A1.
- **CP-03:** first 25 external claims verified → run A2 + A3.
- **CP-04:** about 50% source verification complete → run A2 + A4.
- **CP-05:** P1.0 work complete → run full A0–A5 plus independent hostile audit.

## 4. Independent Audit Policy

External-model audit is not required at every checkpoint. Use internal/self audit at CP-01–CP-04 and one hostile independent audit immediately before CP-05 final decision.

The independent auditor receives the P1.0 protocol, all registers, checkpoint history, P1.0 control spec, and frozen Phase 1 roadmap. It is asked to find unsupported accepted claims, hidden assumptions, broken traceability, inconsistent status use, missing contradictions, and premature architecture decisions—not to redesign the product unless a gate-breaking flaw is found.

## 5. Severity Levels

- **S0 — Cosmetic:** formatting/naming; no architecture consequence.
- **S1 — Control Weakness:** register/process issue; fix before next checkpoint.
- **S2 — Research Integrity Risk:** could contaminate multiple conclusions; stop affected research stream.
- **S3 — Architecture Risk:** could drive wrong Phase 1 decisions; P1.0 cannot pass.
- **S4 — Roadmap-Breaking:** proves frozen roadmap cannot execute; triggers ROADMAP_CHANGE review.

Only S4 can automatically reopen the Phase 1 roadmap.

## 6. Audit Finding Lifecycle

`OPEN → ACCEPTED → FIX_IN_PROGRESS → VERIFIED_FIXED → CLOSED`

Alternative endings: `REJECTED / DUPLICATE / DEFERRED`.

Every accepted S2+ finding must name affected records, corrective action, owner, and verification method.

## 7. Cleanliness Rules

1. No architecture decisions hidden in prose.
2. No source without source type and grade.
3. No evidence claim without source IDs.
4. No accepted assumption without falsification history/evidence.
5. No accepted ADR without alternatives.
6. No critical requirement without backward traceability.
7. No “probably”, “likely”, “obvious”, or “industry standard” as justification.
8. Unknown is a valid value.
9. Conflicting evidence is logged, not averaged away.
10. Roadmap change is exceptional and explicit.

## 8. Completion Definition

P1.0 is complete when the research-control system is trustworthy enough that P1.1 can make beachhead/scope decisions without invisible assumptions or untraceable competitor claims. The product architecture does not need to be correct yet; the research process must be correct enough to discover what is correct.
