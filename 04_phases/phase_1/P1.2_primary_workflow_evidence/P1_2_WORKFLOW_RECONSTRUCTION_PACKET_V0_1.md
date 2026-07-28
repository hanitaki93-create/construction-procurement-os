# P1.2 — Workflow Reconstruction Packet v0.1

**Purpose:** Capture one contractor procurement/commercial workflow as primary evidence before normalization.

**Rule:** Record raw language first. Do not translate participant terms into project/incumbent ontology inside the raw fields.

---

## A. Case identity

- `case_id`:
- contractor / organization label:
- geography:
- contracting posture:
- project type / trade profile:
- material-heavy / subcontract-heavy / mixed:
- observed project concurrency:
- accounting / ERP posture:
- source type: interview / artifact / direct experience / observation / mixed
- date captured:
- researcher:
- independence note:

## B. Raw participant vocabulary

Record verbatim names before mapping.

| Raw term/status/artifact label | Participant definition/use | Source/location | Normalized later? |
|---|---|---|---|
|  |  |  |  |

Any unavoidable capture-time normalization requires an exception entry.

## C. Workflow steps — raw reconstruction

One row per observed step/state transition.

| Step ID | Verbatim step/status | Actor/role | Input artifact/data | Action/decision | Output artifact/data | Approval/authority | Tool/channel | Participant-stated source of truth | Trigger to next step | Evidence/source | Workaround/exception | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |  |  |  |  |

Do not create a missing artifact or role to make the workflow neat. Use `NONE`, `UNKNOWN`, or `UNOBSERVED` explicitly.

## D. Commercial-truth checkpoints

Capture where each position is actually known, changed and reconciled.

| Truth/position | Where participant says truth lives | Other copies/trackers | Update trigger | Lag/reconciliation | Evidence |
|---|---|---|---|---|---|
| budget / cost baseline |  |  |  |  |  |
| procurement demand status |  |  |  |  |  |
| tender / bidder status |  |  |  |  |  |
| latest bid revision |  |  |  |  |  |
| award decision |  |  |  |  |  |
| issued commitment |  |  |  |  |  |
| pending / approved change |  |  |  |  |  |
| valuation / incurred position |  |  |  |  |  |
| retention held / released |  |  |  |  |  |
| advance outstanding |  |  |  |  |  |
| advance recoupment |  |  |  |  |  |
| invoice / payable |  |  |  |  |  |
| paid position |  |  |  |  |  |

## E. Supplier-side path

For at least one tender case capture:

- invitation/access mechanism:
- acknowledgement behavior:
- response mechanism:
- decline/no-bid behavior:
- non-response/timeout behavior:
- persistent account required?:
- quotation format:
- attachment vs structured data:
- revision method:
- clarification method:
- confidentiality/access boundary:
- friction/workaround:

## F. Bid comparison decomposition

Where a real comparison exists:

- source quote revisions used:
- canonical/comparable line basis used by humans:
- quantity/unit normalization:
- exclusions/qualifications:
- commercial adjustments:
- technical acceptance input:
- negotiation/revised offer treatment:
- selected bidder:
- award justification:
- approval evidence:
- non-lowest award rationale where applicable:

Preserve the original comparison artifact separately from any later normalized reconstruction.

## G. Variant / workaround / contradiction capture

### Variants
Legitimate alternate path(s):

### Workarounds
Spreadsheets, messaging, duplicate entry, manual reconciliation, personal memory or informal approval used because formal process/tool does not carry the needed state:

### Contradictions
Statements/artifacts that cannot both be true without an explicit variant/explanation:

## H. Unmodelled / unmatched observations

Mandatory question:

> What did we observe that the current P1.1/incumbent-derived hypothesis set does not model?

Record each unmatched object, relationship, state, actor, artifact, exception or truth source separately.

## I. P1.1 wedge attack

### WEDGE-01 — Closed Procurement Control Graph
- evidence supporting:
- evidence contradicting:
- unique authoritative state outside graph?:
- project-specific ontology invention required?:
- current disposition: SUPPORT / CONTRADICT / UNRESOLVED

### WEDGE-02 — Commercial Commitment Truth
- evidence supporting:
- evidence contradicting:
- accounting/operational truth split:
- retention/advance/recoupment semantics:
- current disposition: SUPPORT / CONTRADICT / UNRESOLVED

### WEDGE-03 — Task-Focused External Tender Participation
- evidence supporting:
- evidence contradicting:
- portal/account dependency:
- decline/no-bid/non-response semantics:
- current disposition: SUPPORT / CONTRADICT / UNRESOLVED

## J. Later normalization mapping

Complete only after raw capture is stable.

| Raw primary term/object | Proposed project term/object | Mapping confidence | Lossy? | Evidence/notes |
|---|---|---|---|---|
|  |  |  |  |  |

## K. Capture-time normalization exceptions

| Exception ID | Raw wording | Normalized wording | Why normalization occurred during capture | Researcher/date/source context |
|---|---|---|---|---|
|  |  |  |  |  |

## L. Case completion check

A case is not complete until:
- raw vocabulary is preserved;
- every reconstructed step has role + artifact or explicit NONE/UNKNOWN/UNOBSERVED;
- truth-source checkpoints are attempted;
- variants/workarounds/contradictions are separated;
- unmatched observation question is answered;
- all three frozen P1.1 wedges receive a case-level disposition;
- raw evidence remains distinguishable from later normalization.
