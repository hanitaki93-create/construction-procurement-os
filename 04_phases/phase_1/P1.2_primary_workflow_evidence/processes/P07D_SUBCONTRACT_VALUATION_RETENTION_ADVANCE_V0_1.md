# P07D — Subcontract SOV / Progress Valuation / Certification / Retention / Advance / Recoupment v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / SOURCING_CRITIQUE_PENDING / AUDIT LATER  
**Dependency:** P07A commitment baseline + P07B controlled change.  
**Purpose:** define the subcontract/service commercial-progress seam so supplier claim, measured/approved progress, certification, retention, advance recovery, invoice and payment remain separate facts while deriving one coherent current commercial position.

## 1. Problem to solve

Subcontract commitments are not fulfilled like material POs.

The system must distinguish:

- original/revised SOV or commercial scope;
- actual work/progress performed;
- amount the subcontractor claims;
- amount the contractor/QS certifies;
- prior certified value;
- current certified value;
- retention withheld;
- retention released;
- advance paid;
- advance recouped/amortized;
- other contractual deductions/adjustments;
- supplier invoice/voucher;
- accounting payment/cash status.

The design must not treat:

`subcontractor invoice = earned value`

or

`payment = certification`.

## 2. Mature-system reference patterns

### CMiC

Current Request for Payment workflows operate against a subcontract Schedule of Values and track percent complete, completed/current amount, previously certified positions, retainage, retainage release, advance payment remaining and amortization. CMiC explicitly treats advance/down payment as funding that does not itself establish project earned value, then recovers it through later payment requests. It also tracks original amount, posted changes, current contract amount and remaining-to-pay positions.

### Procore

Commitment/subcontract invoicing operates against SOV lines and separately tracks work retainage and retainage release. Retainage is withheld from earned/progress values and may be released later rather than being treated as unearned contract scope.

### Oracle Primavera Unifier

Base Commit + approved Change Commit records form the SOV basis; Payment Application records operate against that evolving SOV. This supports a consistent contract baseline/change truth feeding separate progress-payment events.

## 3. Commercial layers

P07D requires at least six semantic layers.

### Layer 1 — Effective commitment/SOV truth

`Original baseline + Effective approved changes`

Defines current approved contractual scope/value available to be earned/certified.

### Layer 2 — Supplier claim/request

What the subcontractor requests for the period/to-date.

### Layer 3 — Buyer measurement/review

QS/commercial/project review of quantity/progress/compliance and any proposed reductions/adjustments.

### Layer 4 — Certification/approved earned value

The authorized commercial amount recognized as earned/certified under the contract.

### Layer 5 — Withholding/recoupment/payable calculation

Retention, advance recovery and other contractual adjustments transform certified gross value into a payable position.

### Layer 6 — Invoice/payment/accounting

Supplier invoice/voucher, AP posting and cash payment are downstream financial events whose ownership may remain external.

Never collapse these layers.

## 4. Schedule of Values / valuation basis

Subcontract/service commitments may need a stable `SOV` or equivalent commercial breakdown.

Candidate sources:
- final negotiated subcontract SOV;
- tender/award breakdown;
- contract BOQ;
- milestone schedule;
- unit-rate activity lines;
- lump-sum work packages;
- approved change-added lines.

Each valuation line should preserve:
- stable line ID;
- commitment/change source;
- description;
- scope partition;
- quantity/UOM or lump-sum basis;
- rate/value;
- cost attribution;
- tax treatment where relevant;
- retention/advance policy references where line-specific;
- current approved line value derived from baseline + effective changes.

Do not fabricate quantity for legitimate lump-sum scope.

## 5. Candidate progress-claim record

### `ProgressClaim`

Supplier-origin request for payment/progress recognition for a period or cut-off.

Candidate header:
- commitment;
- supplier/legal entity;
- claim number/vendor invoice reference where applicable;
- claim period/cut-off date;
- submission date;
- source channel;
- attachments/evidence;
- supplier contact/submitter;
- currency/tax posture.

Candidate line values:
- prior claimed/certified context;
- current claimed quantity or percentage;
- current claimed amount;
- claimed completed-to-date amount;
- stored material claim if allowed;
- claim notes/evidence.

Supplier claim truth remains immutable by revision/history. Buyer review does not overwrite what was claimed.

## 6. Candidate valuation / certification record

### `ValuationAssessment`

Buyer/QS/commercial measurement and review against an exact claim/version and current effective commitment basis.

May include:
- measured quantity/progress;
- approved unit/rate basis;
- accepted stored materials;
- disallowed/unsubstantiated amount;
- defect/quality/compliance hold context;
- notes/evidence;
- recommended gross certified amount.

### `CertificationDecision`

Governed approval that creates authoritative certified earned-value truth.

Candidate content:
- exact claim/version;
- exact effective SOV/commitment basis;
- assessment/reviewer;
- prior certified position;
- current-period gross certification;
- cumulative certified-to-date;
- retention withheld/released;
- advance recoupment;
- other contractual deductions/adjustments;
- resulting payable basis;
- approver/authority/time;
- conditions/holds;
- correction/reversal lineage where applicable.

Whether assessment and certification are separate objects or workflow stages remains open; the truth distinction is mandatory.

## 7. Claim vs certification

Example:

Subcontractor claims AED 200,000 this period.

QS accepts only AED 170,000 gross earned value.

System must preserve:
- claimed = AED 200,000;
- certified gross = AED 170,000;
- difference = AED 30,000 with reason/evidence.

Never overwrite the claim to AED 170,000 and lose the dispute/audit trail.

## 8. Cumulative valuation invariant

For each SOV/commitment scope line:

`cumulative certified gross <= current effective approved line value`

unless the contract explicitly supports provisional/estimated mechanisms whose later reconciliation is modeled.

Over-certification beyond the current effective commitment cannot be silently permitted by workflow.

Additional certified scope/value requires approved commitment change or explicit governed contractual mechanism.

This is commercial value conservation against the effective contract, separate from the B5 procurement allocation scope invariant.

## 9. Previous, current and cumulative positions

Every certification must be reproducible from prior events.

Candidate line/header projections:
- original contract value;
- approved changes;
- current approved contract value;
- previously certified gross;
- current certified gross;
- certified gross to date;
- remaining uncertified contract value;
- prior retention;
- current retention;
- retention released;
- total retention outstanding;
- original advance;
- prior recoupment;
- current recoupment;
- advance outstanding;
- current net payable basis.

Current values derive from immutable certification/change/payment events rather than manually rewritten totals.

## 10. Retention

Retention is a contractual withheld position, not unearned scope.

Candidate rules/terms:
- percentage or amount;
- work retention;
- stored-material retention where applicable;
- contract-level or SOV-line-level application;
- cap/limit;
- reduction/sliding-scale rule;
- release trigger/milestone;
- partial release;
- final release.

Certification should derive:

`gross earned/certified`

then separately:

`retention withheld / released`

so certified earned value remains distinct from current payable cash amount.

Retention release is its own governed event/claim/certification basis; it does not rewrite historical retained amounts.

## 11. Advance payment

Advance payment/deposit must not be treated as earned progress merely because cash was paid.

Candidate advance position:
- authorized advance amount;
- payment/security prerequisites;
- advance paid amount;
- advance outstanding;
- recoupment rule;
- cumulative recouped;
- remaining advance.

Strong mature-system pattern:

`Advance paid != Earned value`

and later:

`Advance outstanding = Advance paid - cumulative effective recoupment`

CMiC explicitly models advance/down payment separately and amortizes/recoveries against later progress payment requests.

## 12. Recoupment / amortization

Recoupment reduces payable amount under contract rules without reducing the gross value of work earned/certified.

Conceptual separation:

`Gross certified work`

`− contractual retention withheld`

`− advance recoupment`

`± approved other payable adjustments`

`= payable basis before tax/accounting-specific treatment`

The exact calculation order, tax basis and rounding policy belong to ADR-0022 / P1.5 and must be versioned/effective.

Do not hardcode the displayed equation as universal accounting law; preserve each component explicitly so policy determines the final payable calculation.

## 13. Stored materials

Where contract permits payment for stored materials:
- stored materials are distinct from installed/completed work;
- evidence may include delivery/storage/ownership/insurance documentation;
- retention rule may differ from completed work;
- later incorporation into works must not double-certify the same value.

Procore explicitly distinguishes completed-work and stored-material retainage capabilities in commitment invoicing.

Exact stored-material depth remains evidence-dependent.

## 14. Certification vs supplier invoice

A contractor may operate:
- supplier invoice first, then review/certification;
- progress claim/payment application first, invoice generated after certification;
- self-billing/certificate-driven process;
- ERP invoice after product certification.

Therefore invoice identity must not be the universal valuation root.

Certification can reference invoice/claim documents without requiring accounting ownership.

## 15. Certification vs payment

Certified payable does not prove cash payment.

Payment may be:
- product-owned later;
- ERP/accounting-owned;
- mirrored/imported;
- held by compliance/pay-when-paid/other condition;
- partially paid;
- reversed.

P07D stops at a **certified/payable commercial position + accounting/payment interface**.

ADR-0005 / P1.4–P1.5 decide authoritative payment ownership.

## 16. Compliance / payment holds

Compliance may block payment while leaving earned/certified value unchanged.

Examples:
- expired insurance;
- missing warranty/bond;
- missing tax/compliance document;
- lien waiver where applicable;
- pay-when-paid condition;
- unresolved contractual document.

Model as hold/release conditions on payable/payment progression, not by falsifying certified progress.

CMiC explicitly supports compliance-based payment holds and pay-when-paid behavior.

## 17. Change interaction

Only the current effective commitment/SOV, including approved effective changes, is available for normal certification.

Pending change may:
- be excluded entirely;
- appear as at-risk/unapproved work;
- be tracked in forecast;
- later become certifiable once effective.

Do not certify pending change as approved contract value unless an explicit contractual provisional mechanism exists.

If certification occurred before formal change approval under exceptional real-world practice, preserve it as explicit exception/reconciliation debt rather than silently backdating the change.

## 18. Correction / reversal

Once certification has affected authoritative commercial truth, correction should use reversal/counter-certification/revised certificate semantics rather than destructive edit.

Required:
- original certificate remains visible;
- reason/authority/time;
- affected lines/components;
- retention/advance implications recalculated;
- accounting interface reconciliation;
- closed-period treatment later under ADR-0015.

## 19. Edge cases

### E01 — Supplier claims more than completed work

Required: claim remains intact; certified amount lower with reason.

### E02 — Supplier claims against pending variation

Required: separate at-risk/pending change portion; do not silently include in approved contract certification.

### E03 — Retention changes from 10% to 5% after milestone

Required: effective rule/milestone + release/changed withholding policy; prior retention history preserved.

### E04 — Advance paid before work starts

Required: advance position increases; earned value remains zero.

### E05 — AED 100,000 gross work, AED 10,000 retention, AED 20,000 advance recoupment

Required: preserve all three components separately; gross certified remains AED 100,000 even though payable basis is lower.

### E06 — Supplier invoices after certification

Required: certification stands independently; later invoice matches/references certified payable basis.

### E07 — Supplier invoice arrives before valuation

Required: invoice is pending evidence/accounting document; earned/certified value remains unresolved.

### E08 — Partial retention release

Required: release event reduces retention outstanding without increasing gross earned scope.

### E09 — Negative change after prior certification

Required: cannot erase previously earned work; omission/change applies remaining/current basis and may require correction if prior certificate truly erroneous.

### E10 — Over-certification discovered later

Required: reversal/correction lineage; no edit of old certificate.

### E11 — Subcontractor legal entity changes mid-contract

Required: no silent transfer of claim/certification history; governed assignment/novation/counterparty change needed.

### E12 — Payment held for expired compliance

Required: certified/payable position remains; payment hold state separate.

### E13 — Stored material later installed

Required: transfer/completion logic prevents double earned-value recognition.

### E14 — Multiple claims in same period

Required: sequence/cumulative basis prevents duplicate certification; exact period policy configurable.

## 20. Failure patterns to reject

Fail later audit if design:
- overwrites supplier claim with certified amount;
- treats invoice as certification;
- treats cash payment as earned value;
- cannot reproduce previous/current/cumulative certified positions;
- treats retention as reduction of contract scope;
- treats advance payment as earned progress;
- reduces gross certified value when recouping advance;
- certifies beyond effective commitment/SOV silently;
- loses pending-change separation;
- edits old certificate after posting/effectiveness;
- cannot separate payment hold from certification truth;
- hardcodes one universal retention/recoupment calculation order before contract/accounting evidence;
- creates a second commercial ledger separate from baseline/change/certification events.

## 21. Primary audit tests later

1. What is the actual artifact: progress claim, RFP, IPC, subcontractor invoice, valuation, certificate?
2. Does subcontractor submit quantity, percent, amount or all three?
3. Who measures/reviews and who certifies?
4. Is certification separate from invoice approval?
5. How are previous/current/cumulative values recorded?
6. How are variations under negotiation treated in monthly claims?
7. Where is retention rule stored and how is release triggered?
8. Is retention line-level or contract-level?
9. How are advance payments authorized and secured?
10. How is advance recoupment calculated?
11. Are stored materials paid, and under what evidence?
12. What compliance blocks certification vs invoice vs payment?
13. Who owns paid status/accounting posting?
14. How are erroneous prior certificates corrected?
15. Are multiple claims/certificates allowed in one period?
16. How do subcontract SOV lines map to project cost codes?

## 22. Current disposition

### Strong enough to carry forward provisionally
- SOV/effective contract basis distinct from claims;
- claim, assessment, certification, payable calculation, invoice and payment separate;
- supplier claim immutable by history;
- certification owns authoritative earned-value decision;
- certified gross constrained by effective approved contract/SOV;
- previous/current/cumulative positions derived;
- retention is withheld payable, not unearned scope;
- advance is funding, not earned value;
- recoupment reduces payable basis, not gross earned value;
- payment/compliance holds separate from certification;
- corrections use reversal/counter-event lineage.

### Still unresolved
- exact Claim/Assessment/Certification aggregate structure;
- who owns certification in beachhead organization;
- retention calculation/order/caps/sliding rules;
- advance guarantee/security semantics;
- recoupment formula/tax order;
- stored-material depth;
- invoice-generation/self-billing variants;
- payment ownership/pay-when-paid V1 scope;
- certification correction in closed periods;
- exact GCC/UAE contractual terminology and statutory constraints.

## 23. Next step

Integrate P07A–P07D into one provisional commercial-core checkpoint:

`award → effective commitment → controlled changes → {goods receipt | subcontract certification} → current commercial position → accounting interface`

Then run an internal contradiction/burden audit before the next external hostile critique cycle. The earlier sourcing final critique remains pending separately.