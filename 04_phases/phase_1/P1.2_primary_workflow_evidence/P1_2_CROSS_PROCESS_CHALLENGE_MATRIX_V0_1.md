# P1.2 — Cross-Process Challenge Matrix v0.1

**Status:** ACTIVE CONSOLIDATION / PROVISIONAL / NOT FROZEN  
**Coverage:** P01–P12 including P07A–P07D  
**Purpose:** expose interface contradictions, load-bearing dependencies, revision blast radius, primary-audit questions, and future hostile-review ownership before any structural freeze.

## 1. Method

This matrix does **not** invent more process areas.

It attacks the seams between the existing P01–P12 hypothesis set.

Each seam is classified:
- `CLEAR_PROVISIONAL` — internally coherent but still subject to primary evidence;
- `WATCH` — coherent only if a stated boundary survives;
- `PENDING_EXTERNAL` — hostile-review verdict still required;
- `PRIMARY_AUDIT_REQUIRED` — cannot be resolved from secondary reference alone;
- `ADR_REQUIRED` — structural decision intentionally deferred.

Revision risk:
- `R1 LOW` — local semantic/state/object correction;
- `R2 MODERATE` — several process/interface artifacts;
- `R3 HIGH ARCHITECTURAL` — structural/commercial truth primitive with broad ripple.

## 2. Cross-process seam matrix

| ID | Seam | Binding provisional rule | Failure mode to attack | Current status | Revision risk | Later owner / evidence |
|---|---|---|---|---|---|---|
| S01 | P01 requirement basis → P03 sourcing | Every sourcing path enters one `RequirementAllocation`; package optional; hard scope/quantity conservation separate from value governance | package-led tender with no authorized basis; value treated as hard allocation limit; duplicate scope leaves | PENDING_EXTERNAL | R3 | final B5/B6 Claude recheck; ADR-0003; primary roots |
| S02 | P01/P10 planning → sourcing | `PLANNED_REQUIREMENT` may source early from estimate/procurement-plan/long-lead evidence; later demand reconciles, does not duplicate | early long-lead award becomes orphan commercial truth; later MR double-counts already sourced scope | WATCH | R2/R3 | ADR-0007; primary long-lead cases |
| S03 | P02 eligibility → P03/P04 participation | qualification ≠ contextual eligibility ≠ selection ≠ invitation/access; `TenderParticipant` may group facts without collapsing semantics | global “approved vendor” flag silently authorizes wrong package; participant shell becomes permanent vendor truth | CLEAR_PROVISIONAL | R2 | primary vendor-selection cases; Review C |
| S04 | P03 release → P04 bid | released tender/addenda are immutable/versioned; every bid binds to exact release basis | supplier submits against superseded drawing/terms and comparison treats it current | CLEAR_PROVISIONAL | R2 | primary tender packs/addenda; Review C/golden threads |
| S05 | P04 bid → P05 normalization | immutable supplier-origin `BidSubmission` remains truth; buyer-on-behalf capture preserves source provenance; normalization never edits source | spreadsheet/AI extraction becomes supplier price; emailed quote transcription loses evidentiary standing | CLEAR_PROVISIONAL | R2/R3 | primary bid artifacts; AI later; Review B/C |
| S06 | P05 comparison → P06 recommendation | comparison freezes included bid revisions + mappings + internal adjustments + FX/tax basis | recommendation references live mutable comparison or mixes bid revisions | CLEAR_PROVISIONAL | R2 | original contractor leveling artifact; Review B |
| S07 | P05/P06 evaluated basis → contractable basis | `evaluated_basis` may include buyer adjustments; `contractable_agreed_basis` must resolve to supplier-confirmed BidSubmission revision | internal missing-scope/risk allowance leaks into contractual value | CLEAR_PROVISIONAL | R3 | sourcing critique B1/B2 closed; Review B |
| S08 | P06 award → P07A commitment | award is approved internal selection; authoritative committed cost begins only at explicit effective commitment formation | approval status treated as committed cost; final contract silently differs from approved supplier-agreed basis | WATCH | R3 | ADR-0004/0005/0018; primary PO/subcontract formation; Review B |
| S09 | RequirementAllocation → P06/P07 | award and commitment bind existing allocation leaves; no second award/commitment allocation ledger | split award/conversion creates duplicate scope; retries double-bind | PENDING_EXTERNAL | R3 | final B5/B6 recheck; ADR-0023 concurrency/idempotency; Review B |
| S10 | P07A original baseline → P07B changes | effective original baseline immutable; current approved commitment derives from original + effective approved changes | original contract edited in place; pending change treated as committed value | CLEAR_PROVISIONAL | R3 | ADR-0015 correction/finalization; primary variation practice; Review B |
| S11 | P07B scope change → RequirementAllocation | value-only variation cannot create new scope capacity; added scope requires authorized requirement-basis change first | VO adds quantity/scope commercially without updating requirement authority; allocation invariant bypassed | WATCH | R3 | ADR-0018/0011; primary variation cases; Review B |
| S12 | P07A/B → P07C goods receipt | ordered/effective scope and changes bound before acceptance; receipt/acceptance history separate from invoice/payment | invoice used as proof of delivery; rejected goods counted as fulfilled; receipt against superseded baseline | CLEAR_PROVISIONAL | R2/R3 | primary GRN flow; Review B |
| S13 | P07A/B → P07D subcontract valuation | certification constrained by effective approved commitment/SOV; claims/assessment/certification distinct | subcontractor claim becomes earned value automatically; pending VO certified as approved work without governed basis | WATCH | R3 | primary certification cases; ADR-0015/0018; Review B |
| S14 | P07D retention/advance → payable | retention is withheld payable, advance is funding, recoupment changes payable but not gross earned value | retention treated as unearned work; advance inflates earned value; recoupment rewrites certified gross | CLEAR_PROVISIONAL | R3 | primary commercial terms; Review B |
| S15 | P07C/D → P08 accounting seam | procurement/commercial truth and accounting/AP/payment truth declare OWN/MIRROR/REFERENCE authority at field/event grain | dual truth; `synced=true` masks rejection/staleness; payment status written by wrong system | WATCH / ADR_REQUIRED | R3 | ADR-0005/0021; ERP primary cases; Review B |
| S16 | P08 reconciliation → corrections | export/import/acceptance/reconciliation are explicit events; conflicts never silently overwrite authoritative side | accounting import silently mutates commercial baseline; failed export appears posted | WATCH | R3 | ADR-0015/0021; Review B |
| S17 | P09 approval/control plane → domain state | workflow/approval outcome authorizes a domain command; command revalidates domain invariants before state change | generic workflow engine becomes state-of-truth; approver click bypasses allocation/commercial rules | WATCH | R3 | ADR-0008/0018/0020; Review C |
| S18 | P09 compliance → sourcing/award/payment | compliance can block/override configured transitions but does not rewrite historical valid actions | expired insurance rewrites old award; compliance override disappears from audit; payment hold changes certification truth | CLEAR_PROVISIONAL / WATCH | R2 | primary compliance practice; Review C |
| S19 | P10 schedule → P01–P12 events | planned/forecast/confirmed dates are distinct; actual dates derive from canonical domain events where available | manual schedule becomes parallel truth; forecast date overwrites actual; procurement OS becomes Primavera clone | WATCH | R2 | ADR-0007/0013; Review C |
| S20 | P12 technical approval → award/commitment/delivery | technical/material approval is a versioned external dependency/condition separate from commercial approval | consultant approval silently changes supplier commercial basis; system grows full CDE; wrong revision passes gate | WATCH | R2 | primary submittal practice; Review C |
| S21 | P11 closeout → P07/P08 | final scope, final certification, retention/security/warranty/accounting closure remain distinct states | “closed” hides outstanding retention, bond, warranty, invoice, dispute or reconciliation | WATCH | R2/R3 | primary closeout cases; Review C |
| S22 | correction/reversal across P07/P08 | finalized/effective commercial events are corrected by reversal/counter-event lineage, not destructive rewrite | closed-period or posted error edited in place; downstream projections unreproducible | ADR_REQUIRED | R3 | ADR-0015 + closed-period golden thread; Review B/final integration |
| S23 | money/FX/tax across P05–P08 | source money preserved; transformations carry dated basis/precision/rounding policy; historical decisions reproducible | recomputation changes historical award/current balance due live rate/rounding rule | ADR_REQUIRED | R3 | ADR-0022; Review B |
| S24 | effective dating/config binding | approval policy, role assignment, compliance rule, tax/FX, connector authority and config use historical effective context | later config change retroactively changes old decision validity | ADR_REQUIRED | R3 | ADR-0019/0020; Review B/C |
| S25 | concurrency/idempotency | allocation splits, award conversion, commitment formation, receipts, certifications and integration retries must be idempotent/atomic where needed | duplicate PO/award/receipt/certification from retry or concurrent users | ADR_REQUIRED | R3 | ADR-0023; Review B/final integration |
| S26 | legal entity/tenancy ownership | project, vendor relationship, award/commitment and authority context bind to correct contracting legal entity | valid vendor/project data reused under wrong contracting entity; JV/branch ownership impossible to repair later | ADR_REQUIRED | R3 | P1.4 structural root / ownership controls |
| S27 | provenance depth | source artifact/version/actor/time/reason preserved at irreversible commercial transitions; projections remain rebuildable | later dispute cannot reconstruct what was approved, submitted, released, certified or synchronized | ADR_REQUIRED | R3 | ADR-0014; primary artifacts; Reviews B/C |

## 3. Internal contradiction findings

### C01 — Value is deliberately represented in several contexts but must have one meaning per context

Values appear as:
- estimate/target/planning value;
- supplier submitted value;
- normalized comparison value;
- internal evaluation adjustment;
- supplier-agreed contractable value;
- original effective commitment;
- effective approved changes;
- certified earned value;
- retention/advance/payable components;
- accounting/AP/payment mirrors.

This is **not** inherently duplicate ledger truth because the values mean different things.

Future structural design must fail if a single field such as `amount` or `current_total` is allowed to stand for multiple layers without type/provenance.

**Status:** WATCH / R3.

### C02 — `RequirementAllocation` can become too universal

It is currently useful because it conserves procurement scope from source basis through award/commitment.

It must **not** become:
- budget ledger;
- earned-value ledger;
- inventory quantity ledger;
- invoice allocation ledger;
- accounting distribution ledger.

Downstream processes may reference the allocation lineage but own their own domain facts.

**Status:** PENDING_EXTERNAL for B5/B6 + structural WATCH.

### C03 — Common Commitment semantics may be valid while common persistence is not

P07 uses semantic `Commitment` for shared invariants:
- approved supplier-agreed basis;
- effective baseline;
- changes;
- authority/provenance;
- commercial position.

But goods and subcontract/service diverge sharply at fulfillment/valuation.

Therefore P07 behavior does not resolve ADR-0004 physical model.

**Status:** ADR_REQUIRED / R3.

### C04 — Commercial truth can coexist with external accounting only if current-state projections expose authority and freshness

A user may see:
- current approved commitment from procurement commercial events;
- invoiced/paid/job-cost values mastered externally;
- pending export/rejection/reconciliation.

A dashboard that blends these without authority/freshness labels can be factually wrong while each subsystem is internally correct.

**Status:** WATCH / R3.

### C05 — Technical/compliance/approval gates must not become generic state mutation hooks

P09 and P12 add many conditions around transitions.

The valid pattern remains:

`condition/approval satisfied → domain command allowed → domain invariants revalidated → domain event`

not:

`workflow condition satisfied → arbitrary status/value written`.

**Status:** WATCH / R3.

## 4. Primary-audit mapping

The later independent workflow/artifact work should attack these seams rather than ask participants to validate our terminology.

High-value blind questions/artifacts:

1. Show how a requirement starts and how its remaining/unprocured scope is known.
2. Show a real tender pack + addendum + revised supplier quote chain.
3. Show an original bid-leveling/comparison artifact and the exact version sent for approval.
4. Show how a non-lowest/split/sole-source award is authorized.
5. Show what event/document actually makes a PO or subcontract commercially binding internally.
6. Show a real variation/change from instruction through approved contract value.
7. Show partial goods delivery, rejection/return, GRN, invoice and payment relationship.
8. Show subcontract claim, internal valuation/certification, retention, advance recovery and payment.
9. Show what procurement/commercial staff believe ERP owns versus what their spreadsheets own.
10. Show a long-lead item before detailed MR and how it avoids later duplicate procurement.
11. Show consultant/material approval timing relative to tender, award, order, fabrication and delivery.
12. Show final account/retention/bond/warranty closeout and what “closed” actually means operationally.
13. Show a real correction of an already approved/posted commercial error.

## 5. Batched hostile-review mapping

### Claude Review A — sourcing final delta

Primary seams:
- S01;
- S09;
- B5/B6 only.

### Claude Review B — commercial truth + accounting

Primary seams:
- S07–S16;
- S22–S25;
- C01–C04.

### Claude Review C — controls + bounded overlays + complete graph

Primary seams:
- S03–S05;
- S17–S21;
- S24–S27;
- C05;
- one-XL gravity/boundary audit.

### Final golden-thread review

Attack cross-batch interactions only after A/B/C remediation.

## 6. Current internal verdict

No contradiction discovered here justifies inventing a new P13 process.

The current highest-risk areas are structural seams already known and intentionally deferred:
- allocation authority;
- PO/Subcontract model;
- commercial/accounting ownership;
- correction/finalization;
- money/effective dating/concurrency/provenance.

Therefore the correct next P1.2 work is:
1. keep sourcing final recheck pending;
2. prepare compact Review B/C packets;
3. deepen blind primary-audit prompts/artifact decomposition rules;
4. avoid ontology freeze until high-risk seams are cleared.
