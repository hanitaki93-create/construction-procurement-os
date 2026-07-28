# P1.2 — Primary Workflow Evidence — Workplan v0.1

**Status:** ACTIVE  
**Opened:** 2026-07-28  
**Dependency:** P1.1 final PASS / frozen baseline v1.0

## Objective

Reconstruct how contractors actually procure and commercially administer work before deep competitor reconstruction is allowed to shape the domain.

P1.2 exists to attack the frozen P1.1 structural hypotheses with real workflows, roles, artifacts, variants and contradictions.

## Governing rules

1. **Reality before incumbents.** P1.3 competitor reconstruction remains locked until the P1.2 gate passes.
2. **Verbatim by default.** Preserve participant terminology, artifact labels, status names and raw observations before normalization.
3. **Mapping is a later transformation.** Project/incumbent terminology cannot overwrite the primary language.
4. **No closed questionnaire.** Existing wedges/ADRs guide questions but cannot bound what is captured.
5. **Unmodelled observations are first-class.** Every reconstruction asks what exists that the frozen hypothesis set does not represent.
6. **Contradictions remain contradictions.** Do not average incompatible workflows into a fake universal process.
7. **Commercial claims remain out of scope.** P1.2 may observe adoption/pain/workarounds but does not prove pricing, TAM or willingness-to-pay.

## P1.2-A — Sampling frame

Target **3–5 independent contractor workflow reconstructions**.

Required variation:
- at least one UAE workflow;
- at least one workflow outside the founder's own prior project/trade pattern;
- main-contractor and specialist-contractor posture where evidence is obtainable;
- varying approval/DOA depth;
- varying accounting/ERP posture;
- material-heavy and subcontract-heavy procurement cases;
- project-concurrency range recorded as observation, never as architecture assumption.

Sampling is for structural variation, not market-segment validation.

## P1.2-B — Raw workflow capture

For each contractor/case reconstruct the path from **estimate/budget handover through closeout** where evidence permits.

At each step capture:
- verbatim step/status name;
- actor/role;
- input artifact/data;
- action/decision;
- output artifact/data;
- authority/approval point;
- system/tool/channel used;
- source of truth as understood by participants;
- duplicate trackers or manual reconciliation;
- exception/workaround;
- next-state trigger;
- evidence/provenance available;
- uncertainty/contradiction.

Capture-time normalization is allowed only through a logged exception containing original wording, normalized wording, reason, researcher/date/source context.

## P1.2-C — Artifact evidence

Seek real examples where obtainable, including:
- procurement tracker;
- procurement plan / long-lead tracker;
- MR/requisition or package request;
- RFQ/tender pack;
- supplier quotation and revisions;
- bid comparison/levelling;
- DOA/approval matrix;
- recommendation or award-justification artifact;
- PO/subcontract;
- variation/change record;
- delivery/GRN evidence;
- progress/payment application or certificate;
- retention/advance/recoupment evidence;
- closeout/final-account artifact.

At least one real bid-leveling artifact must be decomposed to line/adjustment/revision level before the P1.2 gate.

## P1.2-D — Required registers

Maintain:
1. **Workflow Reconstruction Register** — one row per reconstructed workflow/case.
2. **Role / Artifact Map** — every observed step linked to actor and artifact.
3. **Variant Register** — legitimate process variants, not errors.
4. **Workaround Register** — spreadsheets, email, messaging, duplicate entry, manual reconciliation and informal controls.
5. **Unmodelled / Unmatched Observation Register** — observations that the frozen P1.1 graph/ADR set does not model.
6. **Contradiction Register** — incompatible evidence preserved until resolved or accepted as variant.
7. **Primary Corroboration Register** — each incumbent-derived hypothesis classified at gate as `PRIMARY_CORROBORATED / PRIMARY_CONTRADICTED / PRIMARY_UNOBSERVED / NOT_TESTED`.

## P1.2-E — Frozen P1.1 hypotheses to attack

### WEDGE-01
Test whether real cases can fit one procurement-control graph without unique authoritative transaction state living in a separate ledger/tracker.

Particular checks:
- MR-led vs package-led entry;
- budget/cost context timing;
- canonical bid-line/comparison feasibility;
- governed award and justification;
- hidden/manual authoritative states;
- project-specific ontology invention.

### WEDGE-02
Test where commitment/current-commercial truth actually lives.

Particular checks:
- award → commitment handoff;
- approved/pending changes;
- valuation/progress events;
- retention held/released;
- advance outstanding/recoupment;
- accounting/ERP ownership and lag;
- duplicate commitment/cost trackers.

### WEDGE-03
Test supplier participation behavior.

Particular checks:
- invite/access method;
- acknowledgement;
- respond vs decline/no-bid;
- non-response/timeout behavior — observation only, state-machine decision later in P1.5;
- attachment vs structured response;
- revisions/clarifications;
- account/portal friction;
- confidentiality expectations.

## P1.2-F — P1.1 contradiction test

For every reconstructed workflow answer explicitly:

> What did we observe that the current P1.1/incumbent-derived hypothesis set does not model?

Any primary observation that challenges a frozen P1.1 boundary is logged first; the frozen baseline is not silently edited.

Possible disposition after evidence review:
- P1.1 remains valid;
- scope row requires controlled promotion/demotion;
- wedge requires revision;
- open ADR receives new evidence;
- new ADR/assumption/question is required.

## P1.2-G — Gate

P1.2 passes only when:
- 3–5 independent workflows are reconstructed;
- at least 3 independent contractor workflows exist;
- at least 1 is within UAE;
- at least 1 is outside the founder's prior trade/project pattern;
- at least 1 real bid-leveling artifact is decomposed;
- every workflow step has named role + artifact or explicit `NONE/UNOBSERVED`;
- contradictions and variants are explicit;
- supplier-side friction evidence exists;
- unmatched observations are recorded for every workflow;
- incumbent-derived hypotheses receive primary-corroboration statuses;
- P1.1 wedges are explicitly supported, contradicted or left unresolved by primary evidence.

Only after this gate may P1.3 deep competitor reconstruction open.

## First execution task

Build the raw-capture schemas/registers and the first **Workflow Reconstruction Packet** before collecting or normalizing any new primary case.

The packet must be usable on the founder's known workflow as a calibration case, but that case cannot by itself satisfy the independent-workflow gate.
