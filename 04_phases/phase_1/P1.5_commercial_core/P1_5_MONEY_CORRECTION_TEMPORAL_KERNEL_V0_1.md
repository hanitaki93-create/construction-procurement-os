# P1.5 — Money, Correction & Temporal Kernel v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE INTEGRATED CANDIDATE / NOT FROZEN  
**Parent:** `P1_5_COMMITMENT_ECONOMIC_KERNEL_V0_1.md`  
**Primary ADRs:** ADR-0015, ADR-0019, ADR-0022  
**Dependent/open:** ADR-0010, ADR-0011, ADR-0023  
**Product code:** LOCKED

---

## 1. Purpose

Define one coherent candidate answer for three irreversible commercial-history concerns:

1. how money is represented/calculated/reproduced;
2. how effective commercial history is corrected without invisible rewrite;
3. how business-effective time, record/audit time and governing configuration versions interact.

These are intentionally solved together because:

- a reversal must know whether to reuse original monetary basis or current policy;
- a backdated correction must preserve when it was actually recorded;
- a closed-period adjustment must distinguish economic effective time from accounting acceptance;
- a historical certificate must reproduce the monetary policy that governed it;
- projection evolution must not silently recalculate under current rules.

No database engine or accounting journal implementation is selected.

---

# 2. Candidate monetary primitives

## M01 — no binary floating point for commercial money

Commercial monetary truth is represented semantically using exact decimal arithmetic.

Binary floating point is forbidden for authoritative money calculations.

## M02 — MonetaryAmount

A load-bearing monetary amount always carries:

- decimal amount;
- currency identity;
- monetary-policy context/version where calculation/rounding is material.

A naked numeric value is not sufficient.

## M03 — rates, quantities and percentages are not money

Keep distinct semantic primitives:

- monetary amount;
- unit rate;
- quantity + UOM;
- percentage/ratio;
- FX rate;
- tax rate;
- time/service unit where relevant.

Each has independent precision requirements.

Do not coerce rate/percentage/FX precision to the currency's final display/minor-unit scale before the governed calculation stage.

## M04 — calculation precision versus settlement/display scale

The architecture distinguishes:

- calculation precision used during intermediate exact decimal operations;
- governed rounding points;
- final monetary quantum/scale required for the transaction/currency/accounting interface.

No hidden UI/database rounding becomes commercial truth.

---

# 3. MonetaryCalculationPolicy

Every legally/commercially load-bearing compound calculation binds an explicit **MonetaryCalculationPolicy version**.

This is bounded product configuration/policy, not arbitrary scripting.

Minimum policy semantics:

- applicable context: tenant/legal entity/project/commitment/certificate or bounded rule scope;
- currency role(s);
- currency quantum/scale used for final authoritative amount;
- allowed intermediate calculation precision;
- rounding mode at each named rounding boundary;
- ordered calculation stages;
- FX conversion method/basis where applicable;
- tax-calculation stage/basis hook;
- handling of rounding differences;
- correction/reversal rule;
- effective interval/version/provenance.

P1.5 may support a bounded set of product-defined calculation profiles/policies. It does not create tenant-authored formula language.

---

# 4. Rounding semantics

## M05 — no unspecified rounding

Every load-bearing amount produced by multiplication, percentage, FX conversion, allocation or compound certificate calculation must resolve to a named rounding boundary/policy.

## M06 — round as late as the governing rule permits

Intermediate values remain at policy-defined calculation precision until a named business/legal rounding boundary is reached.

Do not repeatedly round after every arithmetic operation by implementation convenience.

## M07 — rounding mode is versioned policy

The architecture does not assume one globally correct mode for all countries/contracts/accounting systems.

Each calculation policy selects from a bounded supported set of deterministic decimal rounding modes.

The exact V1 default(s) require ADR-0010/current contractual/regulatory evidence where the rule is jurisdiction/domain-specific.

## M08 — rounding difference is explicit when economically material

Where independent component rounding and document-total rounding create a difference that must be preserved/reconciled, represent the difference explicitly as a governed calculation result/adjustment rather than silently altering one component.

Whether such a line/result is externally posted is deployment/accounting-interface policy.

---

# 5. Currency roles

The same commercial chain may use different currencies for different authorities.

Candidate roles:

- `COMMITMENT_CURRENCY` — contractual obligation denomination;
- `COMPONENT_RATE_CURRENCY` — only where contract legitimately permits a component/rate in another currency;
- `BUDGET_CURRENCY` — budget/cost-control basis;
- `REPORTING_CURRENCY` — portfolio/reporting conversion;
- `ACCOUNTING_POSTING_CURRENCY` — externally authoritative posting denomination where relevant.

One value may have authoritative original amount in one currency and reproducible converted representation in another.

Converted values do not replace the original-currency authoritative amount unless the business event itself is denominated/settled under that converted basis.

---

# 6. FX binding

## M09 — purpose-specific FX authority

FX used for one governed purpose is not automatically authoritative for another.

Examples:

- bid-comparison evaluation FX;
- commitment conversion FX;
- certificate/reporting FX;
- accounting-posting FX.

Each load-bearing use binds as applicable:

- rate;
- source;
- fixing date/time;
- rate type/method;
- source record/version;
- policy version.

## M10 — historical FX is not live lookup

A historical governed amount/decision never resolves through today's current FX table.

## M11 — correction FX rule

A correction/reversal must explicitly state whether it:

- reverses/restates the original monetary contribution using original bound FX/policy; or
- creates a new current-period economic adjustment using a current/new governing FX basis.

This depends on correction type; implementation may not choose implicitly.

---

# 7. Tax hook without premature GCC policy claims

ADR-0010 remains evidence-dependent.

P1.5 nevertheless freezes the architecture requirement that every load-bearing tax calculation can bind:

- tax jurisdiction/context where relevant;
- tax code/type;
- tax rate/version;
- taxable base rule;
- calculation stage/order;
- rounding policy;
- exemption/reverse-charge/other supported treatment where evidenced;
- effective date/version/source.

No specific UAE/GCC VAT or retention-tax interaction is asserted by this kernel.

Regional/contract-specific tax semantics must map into a bounded deterministic calculation policy rather than custom arbitrary formula code.

---

# 8. Certificate calculation graph — bounded deterministic stages

P1.5 adopts a **versioned ordered calculation graph** rather than one hard-coded global arithmetic formula or tenant-authored script.

The graph is assembled from bounded product-defined stage types.

Candidate stage families include:

1. component gross valuation;
2. approved/additive/deductive commercial adjustment where contract defines it as gross-value modification;
3. retention withholding/release basis;
4. advance recoupment/release basis;
5. recovery/contra/deduction basis;
6. tax calculation;
7. rounding adjustment where required;
8. net certified/payable commercial result.

The exact order/applicability is bound by MonetaryCalculationPolicy and regional/contract policy.

Hard constraints:

- gross earned/certified value is not silently reduced merely because retention/advance recoupment exists;
- recoupment does not become negative earned work;
- recovery does not erase underlying obligation/history;
- tax basis cannot be inferred from generic implementation order;
- two modules cannot calculate the same certificate under different policy versions.

---

# 9. Calculation reproducibility contract

Every authoritative compound monetary result must be reproducible from:

- authoritative event/input values;
- component identity;
- quantity/UOM/rate inputs where applicable;
- currency role;
- FX basis/version where applicable;
- tax basis/version where applicable;
- MonetaryCalculationPolicy version;
- ordered stage inputs/results;
- rounding decisions;
- correction lineage.

A cached total is not authoritative if the underlying calculation basis cannot be reconstructed.

---

# 10. Candidate ADR-0022 direction

Candidate decision:

> Use exact decimal monetary semantics with explicit currency. Separate calculation precision from final currency quantum. Bind every load-bearing compound calculation to a versioned bounded `MonetaryCalculationPolicy` defining rounding modes/boundaries, ordered stage types, FX/tax hooks and rounding-difference treatment. Preserve original-currency authoritative values and bind purpose-specific FX rather than live lookup. No binary floating point and no hidden implementation rounding.

ADR-0022 remains `PROPOSED` until certificate examples, regional evidence and hostile audit validate the candidate.

---

# 11. Commercial finality model

P1.5 distinguishes **effectiveness**, **ordinary editability**, **period/accounting restriction**, and **historical mutability**.

## C01 — effective event

An effective event contributes to authoritative domain history/projections.

## C02 — finalized/frozen-for-edit event

After effectiveness/finalization, direct mutation of economic meaning is forbidden.

Correction occurs through a governed correction path.

## C03 — closed-period constraint

A period may prevent restatement/backdating according to product policy, contractual rule or externally authoritative accounting state.

Closed period does not make incorrect historical truth editable; it changes the permitted correction method/effective period.

## C04 — external accounting acceptance

ERP/AP posting acceptance/failure is separate from product commercial event effectiveness.

An external period rejection cannot automatically undo a valid product certification.

---

# 12. Correction taxonomy

## C05 — non-economic amendment

Use only where changing metadata/provenance does not change governed economic meaning, authority, calculation basis or historical decision rationale.

Creates amendment audit; original prior value remains reconstructable where load-bearing.

## C06 — reverse-and-replace

Use where a prior economic contribution should be neutralized and corrected contribution substituted while preserving original event identity/history.

Semantic requirements:

- explicit target event/component;
- reversal amount/basis;
- replacement amount/basis;
- authority/reason/evidence;
- governing effective period;
- calculation policy/version;
- idempotency.

## C07 — forward adjustment

Use where prior effective period/event remains historically valid as recorded but current position must be corrected later, especially where restatement is disallowed or inappropriate.

The adjustment is a new economic contribution in its own effective period.

## C08 — physical/source reversal

Use only where the underlying real-world/source fulfilment fact legitimately reverses, such as returned goods or cancelled reversible allocation.

Cannot be used merely to make scope/value available after irreversible certified defective work.

## C09 — reclassification

Use where economic total remains but attribution/classification changes.

Preserve:

- original attribution;
- new attribution;
- effective/change reason;
- authority;
- accounting/reconciliation consequences.

## C10 — integration correction

Repairs transport/mapping/reference/reconciliation only.

No product economic effect unless a separate governed domain correction is explicitly required.

---

# 13. Correction decision contract

Before correcting, classify:

1. Is the authoritative business/economic fact itself wrong?
2. Is only descriptive/provenance metadata wrong?
3. Did the physical/source event reverse?
4. Is the error only accounting/mapping/transport?
5. Is the affected product period open or restricted?
6. Is external accounting period/state authoritative for the relevant accounting fact?
7. Must correction preserve original FX/tax/calculation basis or create a new current-period basis?
8. Does correction change scope authority, obligation, certification, attribution or only presentation?

The correction path is derived from this classification, not chosen manually to obtain a desired balance.

---

# 14. Reversal monetary semantics

## C11 — true reversal of original contribution

When reversing an original economic contribution, the reversal references the original event/component and neutralizes the authoritative original contribution under its original monetary semantics.

Do not recalculate the reversal under current FX/rounding/tax policy merely because time has passed.

## C12 — new-period economic adjustment

A forward adjustment is a new event and uses the policy/basis governing that new adjustment unless the contract/policy explicitly requires reference to original terms.

The relationship to the original error/event remains explicit.

## C13 — partial correction

Correction may target part of an event/component if the economic component/grain permits reconstructable partial effect.

Partial correction cannot create an untraceable orphan balance.

---

# 15. Controlled redaction/tombstone compatibility

Commercial correction and privacy/evidence redaction are separate.

A redaction/disposition action may remove/restrict eligible payload but cannot:

- alter event identity;
- alter monetary effect;
- change derived-balance meaning;
- break correction lineage;
- make authorization history falsely disappear.

If a correction relies on evidence whose payload later becomes legitimately unavailable, the minimum retained provenance/tombstone must still explain the correction lineage to the extent required by its valid basis.

---

# 16. Candidate ADR-0015 direction

Candidate decision:

> Economically effective/finalized commercial history is never corrected through in-place economic mutation. Use a bounded correction taxonomy: non-economic amendment, reverse-and-replace, forward adjustment, physical/source reversal, reclassification, and non-domain integration correction. Closed-period/authority rules determine which correction form/effective period is permitted. True reversal neutralizes the original contribution under its original monetary semantics; forward adjustment is a new current-period effect. All paths preserve event/component identity, authority, evidence, idempotency and derivation reproducibility.

ADR-0015 remains `PROPOSED` until lifecycle/concurrency and closed-period threads are hostile-tested.

---

# 17. Temporal model requirements

P1.4 already froze semantic effective/version binding.

P1.5 now needs an implementable temporal model without mandating universal bitemporal tables.

The kernel distinguishes:

- **recorded/audit time** — when the OS durably recorded the event/version/action;
- **business effective time** — when the business/commercial effect applies;
- **valid interval** — where a master/configuration/rule version is valid over an interval;
- **source observation/fetch time** — for MIRROR/REFERENCE data;
- **external effective/posted time** — where an external authoritative fact has its own business time;
- **period/fiscal assignment** — governed accounting/commercial period context;
- **supersession/correction time** — when newer truth/history was introduced.

These times are not interchangeable.

---

# 18. Event temporal contract

## T01 — immutable recorded time

Every governed event/action has immutable recorded/audit time assigned by the system/audit substrate.

## T02 — explicit business effective time

Economically/state-effective events carry business-effective date/time where business semantics require it.

If effective time equals record time by normal rule, implementation may derive/default it, but the semantic distinction remains available.

## T03 — backdating is a governed action

A user cannot arbitrarily edit `effective_at` on an already effective event.

A backdated event/correction requires:

- domain permission/authority;
- evidence/reason;
- period/cut-off validation;
- configuration/policy resolution for the intended effective time;
- conflict/recalculation analysis;
- audit trail.

## T04 — late recording preserves both truths

If an event is recorded later than its business-effective date, both times remain reconstructable.

Do not falsify recorded time to make history appear contemporaneous.

---

# 19. Configuration/master temporal contract

## T05 — versioned effective records for load-bearing mutable context

Load-bearing context that changes over time uses immutable/versioned representations with explicit effective applicability, for example as applicable:

- DOA policy;
- delegation;
- ContractingAuthorityContext relation;
- valuation/monetary policy;
- cost attribution structure/mapping;
- authority profile;
- tax/FX policy/source basis;
- residency region.

## T06 — no current lookup for historical interpretation

Historical event interpretation uses the bound governing version/context, not today's record.

## T07 — live security remains live

Bound historical policy does not preserve revoked current security capability for a new action.

## T08 — controlled in-flight migration

If an in-flight case legitimately moves to newer configuration:

- old version remains known;
- migration/re-evaluation is explicit;
- new governing version/effective point recorded;
- actions already completed retain prior historical basis;
- resulting changes are not silent.

---

# 20. Hybrid temporal implementation direction

P1.5 does **not** require one universal bitemporal storage pattern.

Leading candidate:

### Transaction/economic events

Append/history-preserving event records with:

- immutable event identity;
- recorded time;
- business effective time/period where material;
- correction/supersession lineage.

### Mutable load-bearing master/configuration

Immutable/versioned records with:

- version identity;
- valid/effective interval or effective-from semantics;
- recorded/audit creation time;
- supersession lineage where corrected.

### External MIRROR/REFERENCE

Preserve as applicable:

- external source ID/version;
- external effective time;
- observed/fetched time;
- freshness/conflict state.

### Reconstructability

The system must support:

1. what business state/effect applied at effective time X;
2. what event/configuration version produced that state;
3. when the system actually recorded/learned the event/version;
4. what later correction/supersession changed current interpretation/projection without rewriting original history.

This provides required temporal semantics without forcing bitemporal tables for every object.

---

# 21. Projection as-of semantics

A load-bearing projection/report must declare what “as of” means.

Potential dimensions:

- business-effective as-of date/time;
- recorded/known-at cut-off where audit reconstruction requires it;
- derivation/projection version;
- policy version effective for each source event;
- external-source freshness cut-off where applicable.

A current projection may include a backdated event recorded today when business policy says it applies historically, but an audit “what did we know then?” view must be able to distinguish that late record.

Exact reporting/query surfaces belong later; the substrate must preserve the distinction now.

---

# 22. Candidate ADR-0019 direction

Candidate decision:

> Use a hybrid temporal model: governed transaction/economic events preserve immutable recorded time plus explicit business-effective time/period where material; mutable load-bearing master/configuration uses immutable versioned effective records; external references preserve source effective/version plus observation/freshness time. Historical interpretation binds governing versions rather than current lookup. Backdating and in-flight migration are bounded actions. The architecture must reconstruct both business-effective history and, where required, what the system knew/recorded at a prior cut-off, without requiring universal bitemporal tables.

ADR-0019 remains `PROPOSED` until concurrency, lifecycle and projection examples validate implementation sufficiency.

---

# 23. Closed-period semantics

A “closed period” is a policy/authority constraint, not a reason to edit history.

Potential sources:

- product commercial period policy;
- externally authoritative accounting close/period state;
- legal/entity fiscal calendar;
- contract-specific finalization rule.

The product must know which authority owns the restriction.

## Product-owned commercial effect

If product owns the commercial event, external accounting close may block posting/restatement but does not erase product truth.

## Correction choice

Depending on policy:

- open/restatable product period → reverse-and-replace or restated effective correction may be allowed;
- restricted/closed period → forward adjustment in allowed period;
- external posting only wrong → integration/accounting correction without product economic mutation.

Exact policy belongs to P1.5 lifecycle/configuration and deployment authority.

---

# 24. Closed-period correction worked example

Original:

- Commitment currency: AED;
- Certificate C1 effective 2026-03-31;
- C1 recorded 2026-03-31;
- bound MonetaryCalculationPolicy MP-3;
- certified contribution = 100,000.00 AED;
- retention etc calculated under MP-3;
- external ERP posts C1 in accounting period March.

Later:

- 2026-05-10 an error is proven: one component should have been 8,000 lower;
- March accounting period is externally closed.

Candidate handling:

1. original C1 is not edited;
2. error classification = product economic DATA_DEFECT, not transport defect;
3. correction command links C1/component/evidence;
4. March closed-period rule rejects invisible/restated ERP posting;
5. product policy chooses forward adjustment effective in May (example only; actual rule configurable/bounded);
6. adjustment = -8,000 under the correction rule that preserves original component amount semantics as required;
7. current certified-to-date becomes 92,000 for affected contributions;
8. audit can show:
   - C1 was 100,000 effective/known in March;
   - correction discovered/recorded May 10;
   - current economic position includes -8,000 later adjustment;
9. ERP reconciliation handles May posting separately;
10. historical March certificate artifact remains interpretable.

No history rewrite or duplicate ledger is required.

---

# 25. Multi-currency correction hostile example

Original commitment in USD; budget/reporting in AED.

Certificate contribution:

- 10,000 USD authoritative contract amount;
- historical reporting conversion uses bound FX basis F1;
- ERP later uses external accounting FX F2.

Error discovered later.

Rules:

- reversing original 2,000 USD overstatement neutralizes 2,000 USD original contract contribution;
- historical original reporting conversion remains reconstructable under F1;
- new reporting/current projections apply correction according to their bound derivation/FX policy;
- ERP correction may use accounting authority/policy F2/F3 separately;
- product does not overwrite original USD amount or pretend accounting FX was contractual FX.

**Ceiling pressure: PASS candidate.**

---

# 26. Attribution/reclassification temporal example

Commitment effective under cost code A.

Later governance decides future costs should map to code B.

Candidate handling:

- original commitment attribution binding A remains historical fact;
- reclassification event/mapping change identifies effective scope/time and authority;
- current/future reporting may use B according to derivation policy;
- external job-cost posting changes only through accounting authority/interface;
- no commitment value is recreated;
- no RequirementAllocation scope is changed merely by reclassification.

Exact point at which cost attribution becomes mandatory remains ADR-0011.

---

# 27. Golden-thread checks

## GT-1 subcontract

Baseline/change/certificate history binds monetary/temporal policies; later correction preserves original certificate.

**PASS candidate.**

## GT-2 long-lead goods

PO in foreign currency can preserve contract amount/FX purpose while payment/job-cost remain external; goods return can be physical reversal where valid.

**PASS candidate.**

## GT-3 progress certification

Ordered calculation graph supports gross valuation, retention/advance/recovery/tax stages without conflating authority; exact regional order remains evidence/policy work.

**PASS structurally / ADR-0010 policy examples still required.**

## GT-4 instructed variation

Backdated instruction/provisional valuation can preserve effective date and later recorded/agreed change time without rewriting history.

**PASS candidate.**

---

# 28. Ceiling Test checks

### Multi-entity/JV

Monetary/period policies can bind by ContractingAuthorityContext/legal entity without ontology fork.

### Cross-country vendor

Tax/FX policy binds exact registration/context; no global supplier commercial truth.

### Multi-currency

Purpose-specific currency/FX roles are explicit.

### Authority change in flight

Historical policy version + live security + recorded/effective times coexist.

### Different fiscal semantics

Period/calendar constraints are policy/context, not separate ledger ontology.

### Contextual vendor status

Unaffected.

**Ceiling result: CLEAN at kernel level.**

---

# 29. Closed Sub-graph checks

A0–A3 does not require monetary event kernel beyond historical comparison FX/tax policy already in sourcing.

P07 goods/subcontract slices can bind MonetaryCalculationPolicy without implementing every regional calculation profile.

External accounting can remain interface-only.

Future calculation stages/profiles can be additive if existing event meaning/policy version remains preserved.

**Closed Sub-graph result: CLEAN candidate.**

---

# 30. One-XL check

- MonetaryCalculationPolicy is bounded deterministic configuration, not accounting engine.
- temporal history is substrate, not records-management product.
- correction grammar belongs P07 commercial truth, not second ledger.
- external accounting periods/postings remain external authority where configured.

**SECOND XL: CLEAN.**

---

# 31. Candidate decisions surviving this kernel

## ADR-0022

Exact decimal money + explicit currency + versioned bounded calculation policy + explicit rounding boundaries/order + purpose-specific FX.

**Candidate survives.**

## ADR-0015

History-preserving correction taxonomy with no in-place economic mutation; true reversal uses original semantics; forward adjustment creates new-period effect.

**Candidate survives.**

## ADR-0019

Hybrid event effective/recorded time + versioned effective config/master + external observed/source time; no universal bitemporal mandate.

**Candidate survives.**

No ADR status changes yet.

---

# 32. Remaining blockers/dependencies

## B-MCT-01 — ADR-0010 regional/GCC commercial policy examples

Need authoritative evidence before freezing specific tax/retention/security/certification policy defaults.

Architecture can freeze bounded policy slots without inventing regional rules.

## B-MCT-02 — ADR-0011 cost attribution hard transition

Still open.

## B-MCT-03 — ADR-0023 concurrency/numbering

Need command single-effect and numbering semantics aligned to recorded/effective time.

## B-MCT-04 — lifecycle finalization states

Need P1.5c exact generic-versus-kind-specific lifecycle contract to ensure finality/correction commands are reachable cleanly.

## B-MCT-05 — calculation profile set

Need later concrete examples to prove bounded profiles cover intended V1 without arbitrary scripting.

---

# 33. Immediate next artifact

Create:

`P1_5_AUTHORITY_LIFECYCLE_CONCURRENCY_KERNEL_V0_1.md`

It should reconcile:

- commitment/change/receipt/certification/closeout state transitions;
- workflow outcome → domain command;
- DOA/delegation/live security;
- idempotency/version conflicts;
- numbering allocation;
- cancellation/supersession/finality;
- ball-in-court/task semantics;
- ADR-0008/0009/0023;
- the temporal/correction decisions above.
