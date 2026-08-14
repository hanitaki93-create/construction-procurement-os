# CPOS Governed Numbering Policy v1.1

**Status:** FREEZE-CANDIDATE / STANDARD §C+D AUTHORITY

## Principle

Internal immutable identity is never the displayed business/document number. Numbering is a registered control with explicit class policy, transaction timing and concurrency behavior.

## Policy enums

- `number_mode = {AUTO_INTERNAL, MANUAL_GOVERNED, EXTERNAL_ASSIGNED, DERIVED_PARENT}`
- `gap_policy = {GAP_ALLOWED, CONTINUOUS_REQUIRED}`
- `reset_rule = {NEVER, CALENDAR_YEAR, FISCAL_YEAR, PROJECT_YEAR}`

A class configured `CONTINUOUS_REQUIRED` means the historical number sequence, including cancelled/voided issued records, must remain continuous. Records are never deleted/reused merely to make a sequence appear continuous.

## Default Architecture V2 document-class policy

This table is authoritative for the standard UAE-contractor starter profile. Tenant/jurisdiction configuration may replace a class policy only through a versioned NumberingPolicy change; it may not weaken uniqueness, non-reuse or audit invariants.

| Document class | Uniqueness scope | Default mask | Reset / width | Mode | Gap policy | Assignment timing | Reservation | Cancellation treatment | Revision / reissue | Concurrency mechanism | Legal/audit rationale |
|---|---|---|---|---|---|---|---|---|---|---|---|
| MR | tenant + project + calendar year + class | `MR-{PROJECT}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL | GAP_ALLOWED | on first saved DRAFT | allowed by committed allocation | cancelled MR retains number forever | revision keeps MR number; superseding new MR gets new number | scoped counter row `FOR UPDATE` in assignment transaction | operational traceability; no universal gapless legal claim |
| RFQ | tenant + project + calendar year + class | `RFQ-{PROJECT}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL | GAP_ALLOWED | when RFQ first becomes DRAFT | allowed | cancelled/withdrawn RFQ retains number | normal addendum retains RFQ identity; retender is new RFQ number | scoped counter row `FOR UPDATE` | tender audit identity and supplier correspondence |
| ADDENDUM | parent RFQ + addendum index | `{RFQ_NUMBER}-A{SEQ:2}` | parent-local / 2 | DERIVED_PARENT | GAP_ALLOWED | atomically when addendum becomes ISSUED | no pre-reservation; draft has no addendum index | issued/cancelled addendum index retained; abandoned draft consumes none | correction after issue creates next addendum index | parent RFQ/addendum counter row `FOR UPDATE` in issue transaction | exact supplier-visible issue sequence |
| COMPARISON | tenant + project + calendar year + class | `CMP-{PROJECT}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL | GAP_ALLOWED | when first ComparisonSnapshot is frozen | no need before freeze | cancelled/superseded snapshot retains number | new frozen decision basis gets new comparison number; draft recalculation does not | scoped counter row `FOR UPDATE` | reproducible decision/evidence identity |
| RECOMMENDATION | tenant + project + calendar year + class | `REC-{PROJECT}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL | GAP_ALLOWED | when recommendation is SUBMITTED for approval | no pre-reservation | withdrawn/rejected recommendation retains number | resubmission of same case keeps number with revision; materially new case gets new number | scoped counter row `FOR UPDATE` | approval-case traceability |
| AWARD | tenant + project + calendar year + class | `AWD-{PROJECT}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL | GAP_ALLOWED | atomically when AwardDecision becomes APPROVED/RECORDED | no pre-reservation | cancelled/revoked award retains number/history | changed award uses governed amendment/replacement decision; never silently renumber same decision | scoped counter row `FOR UPDATE` | separates decision identity from commitment identity |
| LPO | tenant + legal entity + calendar year + class | `LPO-{ENTITY}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL by starter; EXTERNAL_ASSIGNED permitted | GAP_ALLOWED | entering READY_TO_ISSUE after required approval | no draft reservation by default | cancelled/voided LPO retains number and status; never reuse | pre-issue draft edits keep number; post-issue change uses amendment/reissue rule, original number remains historical | scoped counter row `FOR UPDATE`; assignment and READY_TO_ISSUE transition same transaction | commercial document uniqueness/non-reuse; no unsupported universal gapless-law assumption |
| PO | tenant + legal entity + calendar year + class | `PO-{ENTITY}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL or EXTERNAL_ASSIGNED per ERP authority | GAP_ALLOWED | READY_TO_ISSUE locally, or when external ERP number is accepted | no unrestricted manual reservation | cancelled/voided PO retains number/external mapping | amendments preserve issued identity unless external authority returns replacement number; mapping history retained | internal scoped counter `FOR UPDATE`; external mode uses unique mapping + idempotent reconciliation | supports ERP coexistence without duplicate identity |
| SUBCONTRACT | tenant + legal entity + calendar year + class | `SC-{ENTITY}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL by starter; EXTERNAL_ASSIGNED permitted | GAP_ALLOWED | entering READY_TO_ISSUE after approval | no draft reservation by default | void/cancel retains number and artifact history | executed amendment/variation does not silently replace original contract number; formal replacement gets new number only when legal/commercial process says so | scoped counter row `FOR UPDATE`; assignment and transition atomic | contract identity and execution evidence must remain stable |
| GRN | tenant + project + calendar year + class | `GRN-{PROJECT}-{YY}-{SEQ:5}` | CALENDAR_YEAR / 5 | AUTO_INTERNAL or EXTERNAL_ASSIGNED | GAP_ALLOWED | when receipt/GRN is POSTED/RECORDED as business evidence | no pre-reservation | reversed/cancelled GRN retains number; correction uses reversal/replacement | corrected GRN uses explicit correction/replacement linkage | scoped counter row `FOR UPDATE` or external unique mapping | receipt evidence must remain reproducible; no stock-ledger implication |

## Continuous-required policy profile

Architecture V2 deliberately does **not** assert that any LPO/PO/subcontract class is universally gapless in every jurisdiction. If tenant legal/audit policy marks a class `CONTINUOUS_REQUIRED`, all of the following become mandatory:

1. number is assigned only in the same database transaction that commits the protected issue/post transition;
2. no user-visible pre-reservation and no background reservation pool;
3. allocation uses a dedicated `document_number_counter` row keyed by the complete uniqueness scope and locks it `FOR UPDATE` (CC-2 equivalent serialized critical section);
4. counter increment, number assignment, immutable history occurrence and protected domain transition commit or roll back together;
5. rollback consumes no number because the counter update rolls back;
6. a later cancellation/void keeps the numbered historical record; it does not delete/reuse the number;
7. retries use the operation/idempotency key and must return the already-assigned number rather than allocate again;
8. changing a class from GAP_ALLOWED to CONTINUOUS_REQUIRED is prospective under a new policy version and cannot rewrite historical sequences.

## Core invariants

`INV-NUM-01` — No duplicate business number may exist within the policy uniqueness scope.

`INV-NUM-02` — Once a number is committed to a business record, deletion/cancellation/void/rejection never makes it reusable.

`INV-NUM-03` — `MAX(number)+1`, client-side counters and other non-serialized allocation are prohibited.

`INV-NUM-04` — Business identity, revision identity and immutable UUID are separate; a revision cannot silently fabricate a new business identity.

`INV-NUM-05` — Number assignment is idempotent under operation retry.

`INV-NUM-06` — External ERP number is a governed mapping distinct from CPOS internal UUID and optional CPOS tracking number; mapping conflict is a reconciliation error, not an overwrite.

`INV-NUM-07` — `CONTINUOUS_REQUIRED` uses the serialized late-assignment mechanism above and is hostile-tested under rollback, retry and concurrent issue.

`INV-NUM-08` — NumberingPolicyVersion used by an assigned document is retained permanently for audit/reproduction.

## User experience

Users see readable business numbers everywhere. Manual number entry exists only when the class policy is `MANUAL_GOVERNED` or a controlled external mapping is being recorded; it is permissioned, uniqueness-checked and audited. Draft records whose class assigns at issue may show `Draft — number assigned at issue` rather than a fake temporary legal number.

## Acceptance

1. 100 concurrent assignments in one scope produce 100 unique numbers.
2. Retry of the same operation returns the same number.
3. Cancellation never permits reuse.
4. RFQ addenda retain parent RFQ identity and immutable issued sequence.
5. LPO/PO/Subcontract assign exactly at their declared transition and preserve number through acknowledgment/signature/execution.
6. A test class configured CONTINUOUS_REQUIRED proves rollback-safe late assignment with the CC-2 serialized counter mechanism.
7. External ERP-number mode proves conflict/reject/reconcile behavior without changing CPOS UUID identity.
