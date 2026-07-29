# P07B — Controlled Commitment Change / Variation v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / SOURCING_CRITIQUE_PENDING / AUDIT LATER  
**Dependency:** P07A commitment formation/original baseline.  
**Purpose:** define how an effective commercial commitment changes without rewriting the original baseline or confusing potential/pending exposure with approved contractual change.

## 1. Problem to solve

After a PO/subcontract/service commitment becomes effective, reality changes:

- scope added or omitted;
- quantity changed;
- rate/value negotiated;
- completion/delivery date changed;
- provisional allowance converted;
- specification/product changed;
- client/consultant instruction causes downstream supplier change;
- supplier claim is accepted/rejected/partially accepted;
- error requires correction;
- previously approved change must be voided/reversed.

The system must distinguish:

`identified change ≠ priced change ≠ submitted change ≠ approved change ≠ effective contractual change ≠ correction/reversal`.

## 2. Mature-system reference patterns

### Oracle Primavera Unifier

`Base Commit` creates the original commitment/SOV basis. `Change Commit` business processes alter the value of the base commit and update the corresponding SOV. Approved change records add to the existing SOV rather than replacing the base commitment.

### CMiC

Subcontracts expose distinct values for `Original`, `Changes To Date`, `Revised`, `Unposted Changes`, and `New Revised`. Subcontract Change Orders amend posted subcontracts and create an audit log of change over time. Posted change orders cannot simply be unposted; correction is handled by voiding/reversal behavior. Potential Change Items can exist before becoming posted subcontract change orders.

### Procore

Commitment Change Orders modify purchase orders/subcontracts after the commitment exists, with one- or two-tier change processes depending configuration. Change Events may precede final commitment change orders, supporting a potential→approved/effective separation.

## 3. Binding commercial projection

After commitment effectiveness:

`Current Approved Commitment Value = Original Effective Baseline + Sum(Effective Approved Commitment Changes)`

Separately:

`Forecast / Adjusted Exposure = Current Approved Commitment Value + qualifying Pending/Potential Change Exposure`

The second is a projection/forecast, not approved committed cost.

The original baseline is never edited to make this equation disappear.

## 4. Candidate semantic records

P07B uses semantic roles, not final persistence decisions.

### `ChangeIssue`

A potential commercial impact has been identified.

Examples:
- site instruction;
- design revision;
- quantity variance;
- supplier request;
- commercial correction;
- scope omission/addition;
- programme impact.

May be internal-only initially.

### `ChangeProposal`

A defined proposed modification to an effective commitment.

Candidate content:
- source issue/instruction;
- affected commitment;
- affected RequirementAllocation / scope partitions;
- affected baseline/change lines;
- scope delta;
- quantity delta;
- rate/value delta;
- date/programme impact;
- tax/currency treatment;
- supporting quotation/evidence;
- supplier confirmation state;
- budget/cost attribution;
- owner/requester;
- status/approval requirement.

### `CommitmentChangeDecision`

Governed outcome over an exact proposal/version.

Candidate outcomes:
- `APPROVED`;
- `REJECTED`;
- `RETURNED`;
- `CANCELLED`;
- `SUPERSEDED`.

### `EffectiveCommitmentChange`

The approved contractual amendment that changes current approved commitment truth.

It may be represented physically by the approved decision itself or a downstream posting/effectiveness event; final object model remains open.

## 5. Potential vs pending vs approved vs effective

These terms must not collapse.

### Potential

Commercial impact is identified but amount/scope may still be uncertain.

### Pending / proposed

A defined change is under quotation/negotiation/approval.

It may affect forecast/exposure but not current approved commitment value.

### Approved

Governance has authorized the change basis.

### Effective / posted

The change has satisfied the contractual/posting condition that makes it part of authoritative approved commitment truth.

Depending on company/accounting ownership, approved and effective may coincide or be separate events. This is an ADR-0005 / P1.5 seam.

## 6. Change basis must be supplier-agreed where economics change

Internal estimate, QS valuation or risk allowance may support negotiation and approval but cannot become supplier contractual economics by itself.

For a supplier price/rate/term change:

`supporting supplier quote / confirmed agreement`

must be preserved as contractable evidence.

The change record may reference:
- new supplier quotation;
- signed change order;
- accepted email/letter under policy;
- negotiated schedule/rates;
- other explicit supplier-confirmed evidence.

Unlike P06 tendering, a formal `BidSubmission` may not be the operational artifact in every post-award change workflow. Therefore P07B does **not** force all changes through tender-style BidSubmission. It requires a supplier-confirmed commercial evidence record with provenance, and later P1.5 decides whether that shares a generic CommercialOffer/Agreement primitive.

This is intentionally not allowed to weaken the P01–P06 rule that the original award contractable basis resolves to `BidSubmission` lineage.

## 7. Scope / RequirementAllocation interaction

Change type determines allocation effect.

### Value-only commercial change

Example: same authorized scope, final negotiated rate increases.

Required:
- no new quantity/scope allocation merely because price changed;
- commercial value governance handles variance.

### Added quantity/scope

Required:
- first change the authorized requirement basis under the B5 rule;
- then create/split additional RequirementAllocation leaf capacity;
- bind the commitment change to the new authorized scope allocation.

### Omission / reduction

Required:
- reduce/close affected unfulfilled scope through governed change;
- preserve original authorization/baseline history;
- do not rewrite prior delivered/certified scope.

### Reallocation between suppliers

Required:
- release/close unconsumed allocation from supplier A under controlled event;
- then bind available scope to supplier B/new commitment/change;
- never double-allocate the same active scope.

## 8. Change line identity

Each change must target stable commercial scope.

Candidate targets:
- existing commitment line/SOV item;
- new commitment line/SOV item;
- existing scope partition;
- new authorized scope partition;
- date/term-only amendment with no price line.

A change may:
- increase existing line;
- decrease existing line;
- add new line;
- transfer/reclassify attribution where allowed;
- change milestone/date/term;
- close/omit remaining scope.

Do not mutate source line history in place.

## 9. Positive, negative and zero-value changes

The model must support:

- positive value change;
- negative/omission change;
- zero-value scope/term/date change;
- mixed positive/negative lines netting to zero;
- time-only change;
- scope clarification with no contract-value impact.

A zero net value does not mean the change is commercially irrelevant.

## 10. Authority / approval

Change approval may depend on:
- absolute change value;
- cumulative approved changes;
- revised commitment value;
- percentage of original value;
- budget variance;
- non-standard terms;
- retrospective instruction;
- related-party/conflict;
- emergency status;
- project/legal entity.

V1 should avoid forcing all dimensions into default setup. Standard core can remain entity + value threshold + delegation, with additive rules as evidence requires.

Approval must reference the exact proposal version and supplier-agreed evidence where relevant.

## 11. Effective dating and current-value truth

Every effective change records:
- decision/effectiveness timestamp;
- actor/authority;
- source proposal/version;
- affected commitment/version;
- affected line/scope;
- value/date/scope delta;
- accounting/posting reference where relevant.

Historical views at date T must derive only changes effective by T.

Future approvals/effective changes cannot rewrite historical current-value reporting.

## 12. Correction, void, reversal

Once an approved/effective commercial change has affected authoritative truth, correction should not normally delete or mutate it.

Candidate correction semantics:

`Effective Change A`

`→ Void/Reversal/Counter-Change B`

with lineage to A.

Rules:
- preserve original change evidence;
- state why correction occurred;
- record authority/time;
- reverse only the intended commercial effect;
- retain downstream linkage to valuations/receipts/payments affected by the original change;
- closed-period accounting consequences belong to P1.5/ADR-0015.

CMiC's posted SCCO void behavior is strong mature-system evidence for this direction.

## 13. Current commercial projections

Candidate projections:

### Original

Original effective commitment amount.

### Approved Changes

Sum of effective approved change amounts.

### Current Approved

Original + approved changes.

### Pending Change Exposure

Defined pending proposals/potential items included under reporting policy.

### Adjusted / Forecast

Current approved + qualifying pending exposure.

### Remaining Commercial Position

Depends on downstream goods receipts / valuation / invoices / payments and is owned later.

Projection naming remains provisional; separation is mandatory.

## 14. Edge cases

### E01 — Change instructed before supplier price agreed

Required: potential/pending change may exist; no approved contractual value is invented.

### E02 — Supplier starts changed work before formal approval

Required: retrospective/at-risk state visible; later approval does not falsify when work began.

### E03 — Negative omission after partial progress

Required: omission applies only to remaining/defined scope; certified historical work remains intact.

### E04 — Change adds entirely new scope

Required: authorized requirement basis + allocation capacity created before effective commercial change consumes it.

### E05 — Price increases but scope unchanged

Required: value governance only; do not manufacture extra allocation quantity.

### E06 — Approved change later found erroneous

Required: void/reversal/correction event; no destructive edit.

### E07 — Change crosses DOA threshold

Required: derive approval from revised proposal/current context, not original commitment threshold only.

### E08 — Multiple potential changes roll into one formal CO

Required: preserve many-to-one lineage from issues/proposals to final effective change.

### E09 — One potential issue splits into several commitment changes

Required: one-to-many lineage supported.

### E10 — Zero-value extension of time

Required: governed change despite zero financial delta.

### E11 — Currency of commitment differs from internal reporting currency

Required: change remains in contract currency; reporting conversion uses frozen/effective FX policy without rewriting contractual amount.

### E12 — Supplier change approved internally but not contractually accepted

Required: internal approval alone may remain pending; effectiveness rule decides when it joins current approved commitment.

## 15. Failure patterns to reject

Fail later audit if design:
- edits original commitment amount after effectiveness;
- treats all potential changes as approved commitments;
- cannot report original, approved changes and pending changes separately;
- lets internal estimate become supplier-agreed change price silently;
- uses one `change amount` without line/scope/date/term semantics;
- cannot support negative or zero-value changes;
- increases allocation merely because price rises;
- permits added scope without authorized requirement-basis change;
- deletes posted/effective change to correct it;
- loses which potential issues rolled into final CO;
- cannot reconstruct current approved value as of a historical date;
- lets workflow status directly bypass deterministic commercial-effect guards.

## 16. Primary audit tests later

1. What terminology is used: VO, variation, CO, SCO, PO amendment, PCI, instruction, claim?
2. What happens first: instruction, supplier quote, internal estimate, approval, supplier acceptance, formal amendment?
3. Can changed work start before commercial approval?
4. Who may instruct supplier change?
5. Who values supplier change?
6. What evidence proves supplier acceptance/agreed price?
7. Are potential/pending changes included in project forecast?
8. How are negative changes/omissions handled?
9. Can approved change be edited, or must it be voided/reversed?
10. How are time-only changes handled?
11. Do many site/design issues consolidate into one commercial change order?
12. How does change update budget/committed cost/accounting ERP?
13. Does change require updated SOV/PO lines?
14. How are retrospective/emergency changes governed?
15. What happens when change is rejected after work began?

## 17. Current disposition

### Strong enough to carry forward provisionally
- immutable original baseline;
- potential/pending/approved/effective separation;
- current approved value = original + effective approved changes;
- forecast exposure separate from approved truth;
- supplier economics require supplier-confirmed evidence;
- value-only change does not alter allocation scope;
- added scope requires prior authorized requirement-basis change;
- positive/negative/zero/time-only changes supported;
- posted/effective correction uses reversal/void/counter-change rather than rewrite;
- line/scope lineage and historical effective dating mandatory.

### Still unresolved
- exact generic ChangeIssue/Proposal/Decision physical model;
- whether pre-change events are unified across owner/client/subcontract flows;
- exact supplier-agreement evidence types;
- approved vs effective/posting separation by subtype;
- forecast inclusion policy;
- budget/accounting ownership;
- closed-period correction mechanics;
- legal treatment of retrospective instruction;
- PO amendment vs subcontract change specialization.

## 18. Next dependency

Proceed to P07C goods fulfillment/receipt and P07D subcontract valuation so the current commercial position can be derived from one baseline/change truth without mixing physical receipt, certification, invoice and payment states.