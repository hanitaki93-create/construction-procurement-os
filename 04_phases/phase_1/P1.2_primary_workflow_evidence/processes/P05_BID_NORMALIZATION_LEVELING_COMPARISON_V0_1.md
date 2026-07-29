# P05 — Bid Normalization / Leveling / Comparison v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**P1.2 purpose:** define how messy supplier-origin bids become a comparable decision view without corrupting original quote truth or hiding evaluator adjustments.  
**Primary CAL-001 status:** technical/commercial comparison and comparison sheets are real operating artifacts; canonical line structure, adjustment history and authoritative truth location remain UNKNOWN.

## 1. Problem to solve

The system must support reality where bidders return:
- different breakdowns;
- lump sums;
- different quantities/UOM;
- missing scope;
- exclusions/qualifications;
- alternates;
- different quote revisions;
- different commercial assumptions;
- attachments/PDFs/Excel rather than perfect forms.

It must still produce a defensible apples-to-apples comparison while preserving exactly what each bidder actually submitted.

## 2. Strong reference patterns

### Procore
`SREF-0029` compares received bids side-by-side at line level and against internal budget/benchmark. Mature Procore behavior distinguishes submitted bids from leveled bids. `SREF-0033` can convert either original or leveled decision basis to commitment, proving those are distinct commercial representations.

### ProcurePro
`SREF-0030` describes tender returns with variants, qualifications and inconsistent formats, followed by levelling, clarification, negotiation and recommendation. `SREF-0031` centers consistent breakdowns, recommendation and tracked approval. `SREF-0032` is especially relevant for future AI: quote extraction is traced back to source PDFs, humans review/adjust, and changes are tracked.

### CMiC
`SREF-0035` supports comparative vendor quote analysis and selection at buyout-item level, with notes and purchasing handoff. `SREF-0025` includes budget/current low bid/target/awarded positions and inclusions/exclusions/alternates in the tender package.

## 3. Provisional object boundary

### 3.1 `BidSubmission`
Supplier-origin immutable evidence from P04.

This is never edited by leveling.

### 3.2 `ComparisonSchema`
The internal comparable structure against which submissions are mapped.

It may originate from:
- tender ResponseStructure;
- BOQ/scope breakdown;
- budget/estimate structure;
- union of bidder scope items;
- evaluator-added lines required to expose gaps.

Candidate line identity:
- immutable comparison-line ID;
- section/category;
- description;
- quantity/UOM where applicable;
- scope/source linkage;
- budget/benchmark linkage where available;
- tax/currency treatment metadata;
- visibility: shared/internal.

### 3.3 `BidLineMapping`
Maps supplier-origin evidence into a comparison line.

Candidate fields:
- bid/revision;
- source quote line/text/table location;
- comparison line;
- extracted supplier description;
- quantity/UOM/rate/amount;
- inclusion/exclusion/qualified/not stated;
- confidence;
- mapping origin: bidder structured / human / AI;
- reviewer/acceptance state.

### 3.4 `EvaluationAdjustment`
An internal adjustment used to make the decision view comparable.

Examples:
- add allowance for excluded scope;
- normalize quantity;
- normalize rate basis;
- remove non-comparable alternate;
- apply accepted commercial discount;
- separate provisional sum;
- normalize tax/shipping/preliminaries basis;
- add internal risk/coverage allowance where company policy allows.

It must record:
- amount/value effect;
- rationale;
- affected line/vendor;
- evidence/reference;
- actor/time;
- whether supplier-confirmed;
- whether adjustment changes only comparison or becomes negotiated bid basis.

### 3.5 `ComparisonSnapshot`
A versioned decision view at a specific evaluation point.

Contains:
- included bid revisions;
- comparison schema version;
- accepted mappings;
- current adjustments;
- unresolved clarifications;
- normalized totals;
- budget/benchmark context;
- evaluator notes;
- coverage/completeness indicators.

Award/recommendation must reference a specific snapshot, not a live mutable comparison.

## 4. Critical distinction — four layers of truth

### Layer 1 — Supplier truth
What the bidder actually submitted.

### Layer 2 — Extracted/normalized representation
How supplier content is mapped into comparable fields/lines.

### Layer 3 — Internal evaluation adjustments
What the buyer adds/changes for apples-to-apples evaluation.

### Layer 4 — Negotiated/agreed basis
What the supplier actually confirms after clarification/negotiation and may become award basis.

Never collapse these layers.

An evaluator may add AED 50,000 for missing scope to compare bids. That does **not** mean the vendor offered that scope for AED 50,000.

## 5. Candidate comparison flow

`BidSubmission revisions received`

`→ choose applicable/current revisions`

`→ build/confirm ComparisonSchema`

`→ structured mapping / extraction`

`→ human verification`

`→ identify gaps/exclusions/alternates/outliers`

`→ clarification / negotiation as needed`

`→ record EvaluationAdjustments`

`→ supplier revision where offer changes`

`→ freeze ComparisonSnapshot`

`→ P06 recommendation/award`

## 6. AI-assisted normalization posture

Future AI may:
- parse PDFs/Excel;
- propose line mappings;
- extract quantities/rates/amounts;
- identify inclusions/exclusions;
- detect likely scope gaps;
- suggest comparable breakdowns;
- flag arithmetic/units/outliers;
- summarize commercial qualifications.

But AI output must be a **proposal with provenance**, not silent commercial truth.

Minimum candidate AI evidence:
- source file + page/cell/span;
- extracted raw value/text;
- normalized value;
- confidence;
- model/version/run metadata where practical;
- human accepted/corrected state;
- correction history.

High-confidence auto-accept may be considered later only under bounded policy; every commercial value must remain traceable to source or explicit human adjustment.

## 7. Comparison semantics

### `SUBMITTED_AMOUNT`
Bidder-origin amount.

### `NORMALIZED_AMOUNT`
Same commercial offer represented under standardized quantity/UOM/tax/currency basis, when mathematically valid.

### `EVALUATION_ADJUSTMENT`
Buyer-created comparative change.

### `LEVELED_AMOUNT`
Derived evaluation amount after applicable normalization/adjustments.

### `NEGOTIATED_AMOUNT`
Supplier-confirmed revised offer, represented by a new bid revision or explicit signed/accepted commercial record.

These terms are provisional but the distinctions are mandatory.

## 8. Scope/compliance semantics

Each comparison line/vendor intersection should be capable of representing more than a number:
- `PRICED`;
- `INCLUDED_NO_SEPARATE_PRICE`;
- `EXCLUDED`;
- `NOT_QUOTED`;
- `QUALIFIED`;
- `ALTERNATE`;
- `NOT_APPLICABLE`;
- `CLARIFICATION_REQUIRED`.

Blank and zero cannot be treated as equivalent.

A zero rate may be intentionally included; blank may mean missing/no response.

## 9. Load-bearing invariants

1. **Original submissions remain immutable.**
2. **Every normalized value maps to source evidence or explicit evaluator input.**
3. **Internal adjustments never masquerade as bidder prices.**
4. **Every adjustment has actor/time/reason and effect.**
5. **Bid revision identity is explicit.** Comparison cannot silently mix v1 lines with v2 totals.
6. **Blank, zero, excluded and included-without-price are distinct.**
7. **Alternates remain separate from compliant base unless explicitly selected.**
8. **Comparison snapshot used for award is frozen/versioned.**
9. **Budget/benchmark is context, not a bidder submission.**
10. **AI extraction is provenance-bearing and reviewable.**
11. **Calculation precision/rounding follows controlled money policy.**
12. **Supplier-confirmed negotiation becomes new/agreed commercial evidence, not an internal adjustment only.**

## 10. Edge cases the process must survive

### E01 — Lump sum versus itemized bid
Vendor A submits AED 1.0m lump sum; Vendor B has 80 lines.

Required: allow lump sum mapping/temporary allocation plus explicit comparability uncertainty; do not invent false line precision.

### E02 — Missing scope item
Vendor excludes scaffolding that others include.

Required: mark exclusion + optional internal allowance; source exclusion remains visible.

### E03 — Different quantities
Vendor prices 100 units while tender asks 120.

Required: preserve submitted 100; normalized comparison may use rate × 120 only if mathematically/policy valid, flagged as normalized not offered total.

### E04 — `0` versus blank
Vendor enters 0 for delivery because included; another leaves field blank.

Required: distinct semantics.

### E05 — Discount applies to total only
Vendor gives 5% overall discount after line prices.

Required: store discount at correct commercial level; do not distribute to lines destructively unless derived allocation is clearly marked.

### E06 — Alternate product
Vendor offers specified product plus cheaper alternate.

Required: base and alternate decision branches remain distinct.

### E07 — Revised quote changes only three lines
Required: new bid revision with lineage; comparison may show delta and latest applicable values without erasing v1.

### E08 — Internal risk allowance
Buyer adds AED 100k because bidder qualification is weak.

Required: clearly internal evaluation adjustment/risk context; never present as vendor price.

### E09 — Quote arithmetic error
Line totals do not equal supplier grand total.

Required: retain submitted arithmetic; flag discrepancy; seek clarification rather than silently “correct” supplier truth.

### E10 — VAT/tax basis differs
One bid includes VAT, another excludes it.

Required: normalize comparison tax basis while retaining original tax presentation.

### E11 — Multi-currency bid
Required: preserve source currency; comparison conversion requires dated FX source/policy and never rewrites original amount.

### E12 — AI extracts wrong line
Required: human correction history; source remains visible; confidence/error is measurable for later RTK-style AI validation.

### E13 — Supplier confirms exclusion is actually included
Required: capture clarification; if economically/materially relevant, supplier revision/agreed-basis evidence supersedes the ambiguity.

### E14 — Split award by line/section
Different vendors best for different parts.

Required: comparison supports line/section selection while downstream award allocation prevents double-commitment of same demand basis.

## 11. Failure patterns to reject

Fail later audit if design:
- overwrites PDFs/quote values with normalized amounts;
- has one total per bidder with no scope-completeness semantics;
- interprets blank as zero;
- cannot tell which quote revision was compared;
- allows evaluator adjustments with no reason/history;
- presents AI extraction as authoritative with no source trace;
- mixes alternates into base total silently;
- cannot freeze the comparison basis used for approval;
- treats budget as another bidder;
- forces all quotes into fake line precision when source is truly lump sum;
- loses supplier-confirmed negotiated revision lineage.

## 12. Primary audit tests for later

1. What does a real contractor comparison spreadsheet contain beyond price?
2. Is comparison built from tender BOQ, vendor quote lines, scope checklist or a hybrid?
3. How are missing items/exclusions quantified?
4. Are internal allowances visible separately?
5. How are revised quotes tracked today?
6. Does a negotiation create a new written quote or only email/meeting notes?
7. How are lump sums compared against itemized bids?
8. How are zero/blank/included items represented?
9. Are technical compliance and commercial comparison one sheet or separate processes?
10. How is budget/estimate used in comparison?
11. Who may edit the comparison?
12. What exact comparison version is attached to the award recommendation?

## 13. Current disposition

### Strong enough to carry forward provisionally
- immutable BidSubmission + revision lineage;
- separate ComparisonSchema;
- source-linked BidLineMapping;
- explicit EvaluationAdjustment;
- frozen ComparisonSnapshot;
- supplier truth / normalized view / internal adjustment / negotiated basis separation;
- AI as source-traced proposal + human-review pattern;
- line/section support for split award.

### Still unresolved
- exact canonical comparison line model;
- default normalization rules for quantity/currency/tax;
- technical-vs-commercial evaluation separation;
- confidence thresholds for AI extraction;
- private/internal line visibility model;
- risk-adjusted scoring versus narrative decision support;
- whether comparison snapshots are explicit objects or event-derived projections.

## 14. Impact on P1.1

No frozen P1.1 change required.

This materially strengthens:
- PRC-15 canonical bid-line/comparison input structure;
- governed award justification based on evidence;
- irreversible provenance/bounded AI action constraints;
- the closed procurement graph's ability to avoid a spreadsheet holding unique truth.

The crucial P1.2 audit remains whether real contractor comparison artifacts can be represented without forcing project-specific ontology invention.

## 15. Next process dependency

P06 should reconstruct **Recommendation / Approval / Governed Award** so the final vendor decision references a frozen comparison basis, authority/DOA, exceptions and explicit justification before any commitment is created.
