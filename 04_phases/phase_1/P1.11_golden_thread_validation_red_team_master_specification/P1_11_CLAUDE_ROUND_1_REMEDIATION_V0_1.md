# P1.11 — Claude Round 1 Remediation v0.1

**Date:** 2026-08-01  
**Status:** REMEDIATION COMPLETE / INTERNAL RECHECK REQUIRED  
**Blocker:** BL-P111-04  
**P1.11 / Phase 1 / Phase 2 / product code:** LOCKED pending external PASS

---

# 1. Blocker accepted

Claude correctly found that the master-specification candidate was intended as a navigation and consolidation contract but its precedence list could be read as making a shorter summary override a more specific frozen phase contract.

That reading is prohibited by this remediation.

The architecture content remains unchanged. The remediation protects which text carries that architecture.

---

# 2. Closed general-versus-specific precedence

The controlling rule is now:

> **The Phase 1 master specification governs only where it states an explicit direct conflict or explicit supersession. Where the master specification is silent, summarizing, less specific or merely navigational, the applicable phase-frozen contract, final checkpoint and incorporated watch closure bind in full. Silence, omission, abbreviation or generalized wording in the master specification never deletes, narrows or weakens a frozen clause.**

A master-spec clause may replace or narrow a frozen contract only through:

1. an explicit `CHG-*` architecture-change record;
2. identification of the exact frozen clauses affected;
3. authority and blast-radius analysis;
4. regression review against accepted ADRs and golden threads;
5. hostile review equivalent to the original freeze gate;
6. explicit supersession wording in the final master specification.

No such change is introduced by P1.11 Round-1 remediation.

When two sources appear inconsistent:

1. explicit later `CHG-*` supersession controls;
2. otherwise the more specific frozen clause controls the summarized/general statement;
3. where two equally specific frozen clauses conflict, implementation is blocked and architecture change control is required;
4. implementation convenience, current software defaults or physical design preference never resolve semantic conflict.

The same rule applies to the compact canonical ADR ledger: its rows summarize accepted decisions; phase reconciliation, frozen contract and immutable audit history supply exact detail unless an explicit later ADR/CHG supersedes them.

---

# 3. Mandatory summary marking

The superseding master-spec candidate marks every summarized architecture section with:

`SUMMARY POINTER — NON-EXHAUSTIVE. The cited frozen contract binds in full. Silence or omitted detail here does not narrow it.`

Every summary pointer contains:

- exact controlling repository path or named canonical artifact family;
- whether the summary is non-exhaustive;
- confirmation that closed taxonomies, registries, guards, prohibitions, failure paths and watch closures remain inherited;
- any branch restated because Claude proved it was easy to miss.

A section without a controlling pointer may not be treated as a complete architecture contract.

---

# 4. Three demonstrated omissions closed locally

## 4.1 GT-10 — retraction between snapshot and establishment

The master specification now states explicitly:

- first accepted satisfaction freezes one canonical `CommunicationSatisfactionSnapshot` under the then-governing admissibility rule;
- the owning-domain establishment operation consumes that frozen snapshot, not a live recomputation over current callbacks;
- a later correction/retraction received after snapshot creation but before establishment is contradictory/corrective evidence and does not automatically invalidate the snapshot;
- the establishment operation still checks current owning-domain lifecycle and authority;
- valid withdrawal/cancellation/supersession before establishment may block establishment through the owning-domain guard;
- any consequence change after establishment requires owning-domain correction.

## 4.2 GT-12 — uncorrelated inbound observation

The master specification now states explicitly:

- authentic or potentially relevant uncorrelated observations remain retained and quarantined under typed admission/authenticity status;
- they cannot establish domain truth;
- they may later be correlated, classified unrelated/invalid/duplicate or disposed only under evidence-retention authority;
- disposal cannot remove an active reconciliation dependency.

## 4.3 GT-20 — stricter budget cannot fit mandatory context

The master specification now states the complete closed outcome set:

- queue;
- use a separately evaluated smaller product profile;
- explicitly narrow the declared task scope;
- return an allowed evaluated subset or deterministic range under the frozen use/disclosure ceiling;
- abstain;
- disable AI and use deterministic/manual fallback.

The budget may not remove mandatory sources, citations, safety, review, confirmation or audit; redefine completeness; or select an unevaluated provider/model.

---

# 5. W-92–W-96 closure

## W-92 — restatement trigger

The architecture does not leave restatement obligation to free judgement.

Every load-bearing metric/report/use binds a versioned `MaterialityAndUsePolicy` defining:

- quantitative and qualitative materiality;
- known, unknown and unbounded impact treatment;
- correction/recalculation/restatement disposition;
- issue and notification obligations where configured;
- current-reliance consequence.

A formal restatement is required when the applicable policy classifies the source correction, semantic change, population change, defect or newly resolved gap as restatement-required. Absence of the policy blocks new load-bearing reliance rather than granting implementation discretion. The exact numeric threshold remains an operating-policy value within this frozen grammar.

## W-93 — named non-SPINE deferral

The single `NON_SPINE_DEFERRED` requirement is:

> **ADR-0011 — detailed suspense/unallocated attribution operating mechanics.**

The frozen architecture already requires explicit visible attribution or governed suspense identity, no null/hidden attribution, and resolution before transitions that require final mapping. Later detailed queue, aging, assignment and resolution mechanics may not weaken those rules.

## W-94 — tenant-authorized source admission

A tenant may add an AI source only by selecting an activated product-registered `AISourceClassVersion` and satisfying its admission/conformance contract.

Labels, URLs, files, examples or connectors cannot create source semantics. Unregistered/nonconforming sources remain excluded, quarantined evidence or manual input outside the capability. Admission never makes a source authoritative.

## W-95 — provider/model profile evaluation

Every selectable provider/model profile carries its own current `EvaluationSufficiencyDisposition`, adversarial validity, privacy/residency/training posture and activation/expiry state.

No profile inherits another profile’s evaluation. Only a current capability-specific `SUFFICIENT_PASS` profile may activate; otherwise the system abstains, disables or uses manual/deterministic fallback.

## W-96 — validation-gate adjudication

V1 and V2 require a recorded `ValidationGateDecision` by a cross-functional panel containing at least:

- product/domain architecture owner;
- independent research/validation owner not responsible for defending the candidate;
- procurement practitioner representative;
- supplier/external participant representative for supplier-facing findings;
- accessibility/UX reviewer where interaction meaning is assessed.

The decision binds raw observations, protocol, sample, coding, conflicts, minority views, criticality definition and pass/fail/repeat/revise/kill disposition.

A critical misunderstanding is one that could cause unauthorized action, wrong commercial meaning, false submission/receipt meaning, hidden limitation, evidence/authority confusion or unsafe recovery. Ambiguity is critical until independently resolved.

---

# 6. No-narrowing conformance obligation

Before P1.11 final checkpoint, a published conformance check must compare the superseding master-spec candidate with:

- P1.1 scope/release freeze and governing roadmap;
- P1.4 boundary/ownership/tenancy freeze;
- P1.5 commercial-core freeze;
- P1.6 evidence/document/communication freeze;
- P1.7 integration/migration/API freeze;
- P1.8 reporting/analytics/control freeze;
- P1.9 UX/interaction freeze;
- P1.10 NFR/AI-readiness freeze;
- canonical ADR log, phase reconciliations and incorporated watches;
- P1.11 traceability, action ownership and golden threads.

The check must report:

- explicit conflicts;
- missing summary pointers;
- narrowed taxonomies or enumerations;
- broadened authority or truth-writing paths;
- weakened guards/prohibitions/recovery;
- omitted failure/partial/unknown states;
- changed validation or activation gates;
- unresolved questions.

Any unresolved item blocks P1.11 closure.

---

# 7. Closure claim

BL-P111-04 is closed in the remediated candidate only if the no-narrowing conformance check and full internal recheck pass.

No business architecture decision, accepted ADR or frozen phase meaning is changed by this remediation.