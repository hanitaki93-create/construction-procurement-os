# P08 — Commercial Position / Accounting Authority / ERP Interface v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**Dependency:** P07 integrated commercial core.  
**Purpose:** define how procurement/commercial truth coexists with accounting/ERP truth without duplicate authority, silent overwrites, stale data or forced deep integration before the product proves value.  
**ADR posture:** ADR-0005, ADR-0006, ADR-0021 remain OPEN.

## 1. Problem to solve

The system will hold or derive commercial facts such as:

- award basis;
- commitment baseline;
- approved change;
- physical receipt;
- certified progress;
- retention;
- advance/recoupment;
- current commercial exposure.

An accounting/ERP platform may simultaneously own or process:

- vendor master fields;
- project/job/cost-code master;
- posted commitments/encumbrances;
- AP invoices;
- tax accounting;
- payments;
- GL/job-cost actuals.

The architecture must answer, **for every load-bearing field/event**:

1. who is authoritative;
2. what direction data moves;
3. when a value becomes trusted locally;
4. how stale data is surfaced;
5. what happens on conflict/rejection;
6. how the two systems reconcile historically.

`Synced = true` is not an authority model.

## 2. Mature-system reference patterns

### Procore ERP integrations

Current Procore behavior provides several useful mechanics:

- an approved commitment is not necessarily exported automatically;
- standard flows can require explicit accounting acceptance before export;
- direct export can be configured to bypass that review;
- connector prerequisites vary by ERP;
- specific fields may be locked after sync to prevent divergence;
- some connectors support only selected objects/flows rather than universal bidirectional parity.

This is strong evidence for connector capability contracts and explicit export/acceptance state rather than assuming live two-way synchronization.

### CMiC

CMiC's integrated modules show the opposite architecture extreme: purchase orders can directly update project committed cost and later receipt can affect actual cost. This demonstrates that deep integration/ownership is possible, but does not prove our V1 should own the accounting stack.

### Oracle Unifier

Commitment/change/payment transactions roll through project cost structures and SOVs, demonstrating the importance of deterministic commercial-to-cost rollup even where implementation ownership differs.

## 3. Authority must be field/event-level

Entity-level ownership is insufficient.

Example commitment record could contain:

- supplier legal identity — ERP/vendor master authoritative;
- procurement award rationale — product authoritative;
- contract document/effectiveness evidence — product authoritative candidate;
- cost code — ERP master vocabulary, product transaction binding;
- current approved commercial value — product commercial projection;
- accounting posted committed cost — ERP authoritative;
- paid amount — ERP authoritative;
- procurement owner — product authoritative.

Therefore authority belongs to individual fields/events, not merely `Commitment owned by Product` or `Vendor owned by ERP`.

## 4. Candidate authority modes

### `OWN`

This platform is authoritative for the field/event.

Rules:
- local governed actions may mutate/create it;
- external values cannot silently overwrite it;
- outbound integration may publish it.

### `MIRROR`

Another system is authoritative; this platform stores a synchronized copy for workflow/reporting.

Rules:
- display source + freshness;
- local edits prohibited or treated as proposals;
- conflict resolves toward authority source unless explicit correction workflow changes source truth.

### `REFERENCE`

The platform stores only identity/link/status needed to navigate or reconcile external truth.

Useful where full local replication would add implementation burden with little value.

The final matrix may need directional variants, but these three modes express the core semantic distinction.

## 5. Candidate authority contract per field/event

For each load-bearing integration datum define:

- domain field/event;
- authority system;
- authority mode;
- sync direction;
- external system/object/field identity;
- internal semantic identity;
- effective timestamp/source timestamp;
- received/exported timestamp;
- version/hash/revision where available;
- local edit policy;
- conflict rule;
- staleness threshold/behavior;
- required acknowledgement;
- reconciliation rule;
- failure/fallback behavior.

This contract belongs to P1.4/P1.7 implementation detail later; P08 establishes the requirement now.

## 6. Integration identity mapping

Never overwrite internal IDs with ERP IDs or vice versa.

Candidate link record:

### `ExternalRecordLink`

- internal object/event ID;
- external system ID;
- external company/entity/project context;
- external object type;
- external record ID/number;
- relationship status;
- created/linked time;
- last confirmed time;
- disconnected/superseded state;
- connector/config version.

One internal commercial record may need multiple external references over time or across systems, but one authoritative link per configured accounting destination should be clear.

## 7. Export/import is a state machine

Candidate integration transmission states:

`LOCAL_ONLY`

`→ READY_FOR_EXPORT`

`→ QUEUED/SENT`

`→ RECEIVED_BY_CONNECTOR`

`→ {ACCEPTED/POSTED | REJECTED | FAILED}`

`→ later {OUT_OF_SYNC | UNLINKED | SUPERSEDED}` as applicable.

Names remain provisional.

Critical rule:

**Sent does not equal accepted or posted.**

Commercial workflow should not mark accounting state successful before authoritative acknowledgement.

## 8. Accounting acceptance is distinct from commercial approval

Commercial approval asks:

> Is this sourcing/commitment/change/valuation commercially authorized?

Accounting acceptance asks:

> Can this record be posted/accepted by the accounting system under financial master data and accounting controls?

The same actor/workflow may combine them in a small company, but semantics remain separate.

An accounting rejection due to invalid cost code/vendor mapping does not invalidate the historical commercial award; it creates reconciliation/blocking work before accounting posting.

## 9. Connector capability contract

Every connector must declare supported operations explicitly.

Candidate capability dimensions:

- vendor import;
- project/job import;
- cost-code/CBS import;
- commitment export/import;
- change-order export/import;
- goods receipt export/import;
- certified invoice/payment-application export;
- AP invoice import/export;
- payment import;
- job-cost actual import;
- budget import;
- tax-code synchronization;
- deletion/unlink semantics;
- real-time vs scheduled sync.

Unsupported operation must be `UNSUPPORTED`, not silently skipped.

This prevents one generic integration abstraction from claiming capabilities the connector cannot provide.

## 10. Staleness and freshness

Mirrored data requires freshness metadata.

Candidate read model shows:
- authoritative source;
- source effective/updated timestamp where available;
- last successful sync;
- expected sync cadence;
- current age;
- `FRESH | AGING | STALE | UNKNOWN` projection;
- last failure/error where relevant.

Critical decisions may block or warn when required external truth is stale.

Example:
- paid amount synced yesterday may be acceptable for dashboard;
- vendor legal suspension/payment hold may require fresher validation before payment action.

Policy varies by field/event.

## 11. Conflict semantics

Conflicts must be classified, not resolved by last-write-wins.

Examples:

### Authority violation

External system sends change to product-owned contract scope.

Required: reject/quarantine or create explicit proposed correction; never silent overwrite.

### Master-data update

ERP changes vendor legal name/cost-code label.

Required: mirror under source authority while preserving historical transaction snapshots/IDs.

### Mapping conflict

Product cost code no longer maps to valid ERP code.

Required: integration exception; commercial transaction remains but posting may block.

### Commercial/accounting amount mismatch

Product current approved commitment = AED X; ERP posted commitment = AED Y.

Required: reconciliation exception, source-by-source component comparison and governed correction.

## 12. Reconciliation is first-class

### `ReconciliationException`

Candidate fields:
- domain record/event;
- external system/link;
- mismatch category;
- expected value/state;
- observed external value/state;
- amount/dimension delta;
- source snapshots;
- detected time;
- severity;
- assigned owner;
- resolution status;
- correction/retry references;
- final reason.

Candidate mismatch categories:
- missing external record;
- duplicate external record;
- vendor mismatch;
- project/cost-code mismatch;
- amount mismatch;
- tax mismatch;
- state/status mismatch;
- missing change;
- stale mirror;
- failed export;
- rejected posting;
- broken/unlinked mapping.

## 13. Current commercial position — source-aware projection

The platform needs one understandable commercial view even when some dimensions come from ERP.

Candidate position per commitment/package/project may show:

### Product contractual/commercial layers
- Original Commitment
- Effective Approved Changes
- Current Approved Commitment
- Pending Change Exposure
- Accepted Goods / Certified Gross Progress
- Retention Position
- Advance / Recoupment Position

### Accounting layers where authoritative data is available
- AP Invoiced/Posted
- Paid
- Accounting committed-cost balance
- Job-cost actuals

Every externally sourced measure carries authority/freshness metadata.

The UI may present one commercial position, but architecture must never blur provenance.

## 14. No independent balance editing

Balances such as:
- Current Approved Commitment;
- Certified To Date;
- Retention Outstanding;
- Advance Outstanding;
- Paid;
- Remaining Exposure;

must derive from authoritative events/mirrors.

No user-maintained `current contract balance` field may compete with baseline/change/certification/payment truth.

Manual correction must create a correction/reconciliation event or modify the authoritative source through governed workflow.

## 15. Historical authority

Integration configuration and ownership can change over time.

Example:
- 2026 Q1: product owns commitment, exports to ERP;
- 2027: ERP becomes commitment master after migration.

Historical records must remain interpretable under the authority rules in force when events occurred.

Candidate requirement:
- authority-policy/config version bound/effective-dated;
- source system recorded per event/mirror;
- migration/cutover event marks authority transfer;
- old external IDs retained as historical references.

ADR-0019/0020 own deeper temporal/config-binding semantics.

## 16. Sync locking

When an external system is authoritative for a synced field, local editing may be locked.

When product is authoritative but external posting has occurred, editing may still be prohibited because historical commercial truth has finalized.

These are different reasons and should be explainable:
- `LOCKED_BY_DOMAIN_FINALIZATION`;
- `LOCKED_BY_EXTERNAL_AUTHORITY`;
- `LOCKED_PENDING_SYNC`;
- `LOCKED_BY_PERIOD/ACCOUNTING_CONTROL`.

Exact labels remain provisional.

## 17. Offline/manual interface remains valid in V1

The architecture must support:
- CSV/export/import;
- standardized accounting handoff report;
- external-ID/manual link capture;
- reconciliation upload;
- API connector later.

A live deep ERP connector is **not** required for the first live tender unless evidence later proves it unavoidable.

The same authority contract should govern manual and automated integration; manual transfer is not permission to lose provenance.

## 18. Edge cases

### E01 — Commitment commercially effective but ERP export rejected

Required: commercial truth remains; accounting-posting status = rejected; exception assigned/resolved.

### E02 — ERP vendor exists under different ID/name

Required: explicit identity link/mapping; no duplicate supplier created solely to satisfy export.

### E03 — Cost code changes in ERP after commitment

Required: master mirror updates for current use; historical commitment attribution remains reproducible under prior code identity/effective mapping.

### E04 — ERP unavailable for one day

Required: product can continue allowed commercial workflow under policy; export remains queued/pending; no fake accounting acknowledgement.

### E05 — Commitment exported twice after retry

Required: idempotency/external-key strategy prevents duplicate accounting commitment.

### E06 — ERP amount differs because approved change never exported

Required: reconciliation identifies missing change rather than manually adjusting current product value.

### E07 — Payment imported late

Required: paid position marked stale/last synced; certification/commitment truth remains unaffected.

### E08 — Product record deleted after ERP posting request

Required: destructive delete prohibited or governed unlink/void process; external link/history retained.

### E09 — Connector does not support CCO export

Required: capability = unsupported; use documented manual interface/reconciliation rather than pretending synced.

### E10 — Two ERPs during migration

Required: explicit authority cutover/effective dates; no uncontrolled dual masters.

### E11 — External system overwrites tax field with accounting-calculated value

Required: authority matrix decides whether product mirrors accounting value or retains contract-tax semantics separately; no last-write-wins.

### E12 — Manual CSV export and later API integration

Required: same semantic event IDs/external links avoid duplicate posting when transport changes.

## 19. Failure patterns to reject

Fail later audit if design:
- uses entity-level `system_of_record` only;
- assumes every connector supports the same operations;
- marks sent as posted/accepted;
- allows last-write-wins across product and ERP;
- hides stale mirrored data;
- overwrites internal IDs with external numbers;
- lets reconciliation live only in spreadsheets;
- requires live deep ERP integration before first product value can be proven;
- duplicates commercial balances in both systems with no authority rule;
- lets users manually repair derived balances rather than source events;
- cannot survive connector outage/retry/idempotency;
- cannot explain historical authority after migration/cutover.

## 20. Primary audit tests later

1. Which accounting/ERP systems do target contractors actually use?
2. Where is vendor master authoritative?
3. Where are project/cost codes created?
4. Where is PO/subcontract number generated?
5. Does procurement system or ERP own approved commitment value?
6. When does accounting see/accept a commitment/change?
7. Are GRNs created in ERP, stores system, or procurement/site?
8. Where are subcontract certificates/invoices posted?
9. Who owns payment status?
10. What data is manually re-entered between procurement and accounts?
11. What reconciliation spreadsheets/reports exist today?
12. How frequently do job costs/payment statuses sync?
13. What happens when ERP rejects procurement data?
14. Which fields become locked after posting/export?
15. Is deep integration required at go-live or can structured handoff work initially?

## 21. Current disposition

### Strong enough to carry forward provisionally
- field/event authority required rather than entity-only ownership;
- `OWN / MIRROR / REFERENCE` authority posture;
- internal/external identities preserved separately;
- export/import is explicit governed state machine;
- commercial approval separate from accounting acceptance;
- connector capabilities explicit;
- freshness/staleness visible;
- last-write-wins rejected;
- reconciliation exception first-class;
- current commercial position source-aware and derived;
- manual/CSV interface allowed under same authority semantics;
- deep named connector not required by architecture.

### Still unresolved
- actual beachhead ERP/accounting stack;
- final authority matrix by field/event;
- commitment/receipt/certification ownership split;
- connector depth required for V1;
- sync cadence/staleness thresholds;
- tax and accounting-posting ownership;
- deletion/unlink policies by connector;
- migration/cutover model;
- whether any ERP must be natively supported at first release.

## 22. Impact on ADRs

This process provides candidate mechanics but does not close:
- ADR-0005 Accounting/commercial ownership seam;
- ADR-0006 V1 ERP/accounting integration depth;
- ADR-0021 field-level integration authority/staleness.

Primary customer software-stack evidence + P1.4 boundary design remain required.

## 23. Next step

Continue P1.2 cross-cutting operational mechanics: effective authority/approval primitives, compliance/document evidence, event-derived task/status/notifications and exception handling, then integrate the complete workflow reconstruction before the later critique/primary-audit cycles.