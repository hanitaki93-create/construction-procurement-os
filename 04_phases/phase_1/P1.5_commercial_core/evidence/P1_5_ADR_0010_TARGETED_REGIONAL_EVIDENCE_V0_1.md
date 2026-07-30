# P1.5 — ADR-0010 Targeted UAE/GCC Commercial Semantics Evidence v0.1

**Date:** 2026-07-30  
**Status:** TARGETED AUTHORITATIVE EVIDENCE / P1.5 INTERNAL AUDIT INPUT  
**Purpose:** test BL-P15-05 only; not broad competitor/domain research  
**ADR:** ADR-0010 — GCC commercial semantics versus late localization

---

## 1. Question tested

Does current authoritative UAE tax guidance/law and authoritative construction-contract structure reveal a commercial/tax event or authority distinction missing from the P1.5 candidate core, such that regional semantics cannot safely be represented by deterministic policy/profile dimensions over the same core?

This evidence review is intentionally narrow. It does not attempt to encode all UAE law, FIDIC clauses or every contractor/subcontract form.

---

## 2. Sources reviewed

### UAE Federal Tax Authority / Ministry of Finance published VAT law and guidance

1. **Federal Decree-Law No. 8 of 2017 and its amendments** — consolidated version published by the UAE Federal Tax Authority / Ministry of Finance, including Federal Decree-Law No. 18 of 2022 and No. 16 of 2024.
   - URL: https://tax.gov.ae/Datafolder/Files/Legislation/2025/Federal-Decree-Law-No-8-of-2017-and-amendments.pdf
   - Relevant architecture topics: Articles 25–26 date of supply; Articles 61–63 output-tax adjustment; Article 69 currency on tax invoices; Article 70 tax credit notes.

2. **FTA Real Estate Guide VATGRE1**, construction-industry section.
   - URL: https://tax.gov.ae/DownloadOpenTextFile?fileUrl=en%2FVAT_VAT_Guides%2FReal_Estate_Guide%2FReal_Estate_Guide_VATGRE1_EN_19_04_2021_EN.pdf
   - Relevant architecture topics: construction services, stage/advance payments, retention, continuous supplies, certification versus VAT date of supply.

3. **FTA VAT legislation index**, current listing checked 2026-07-30.
   - URL: https://tax.gov.ae/en/legislation/vat.aspx
   - Confirms the current FTA legislation catalogue includes the consolidated VAT Decree-Law and amended Executive Regulation; this review does not assume the original 2017 text is the sole current source.

### FIDIC authoritative contract-publication structure

4. **FIDIC Construction Contract 1st Ed (1999 Red Book)** official publication page.
   - URL: https://fidic.org/books/construction-contract-1st-ed-1999-red-book
   - Relevant architecture topics shown in the official contents: measurement/evaluation; variations/adjustments; provisional sums/daywork; advance payment; interim payment applications/certificates; plant/materials; payment; retention; statement at completion; final payment certificate; currencies of payment.

5. **FIDIC Works of Civil Engineering Construction 4th Ed (1987 Red Book)** official publication page.
   - URL: https://fidic.org/books/works-civil-engineering-construction-4th-ed-1987-red-book
   - Relevant architecture topics shown in the official contents: variations and valuation; daywork; measurement; provisional sums; payments; retention; correction of certificates; final statement/final certificate; defects/remedial work.

6. **FIDIC Construction Contract 2nd Ed (2017 Red Book, reprinted 2022 with amendments)** official publication page.
   - URL: https://fidic.org/node/39524
   - Used only to confirm the continuing authoritative FIDIC construction-contract family and its current 2017/2022 edition lineage; this artifact does not reproduce protected contract text.

---

## 3. Evidence finding A — construction certification is not the universal VAT tax point

The current consolidated UAE VAT law separates date-of-supply rules from commercial certification.

For general supplies, Article 25 includes events such as transfer/acceptance/completion and receipt of payment or tax-invoice issuance. For contracts with periodic payments or consecutive invoices, Article 26 uses the earliest of tax-invoice issuance, payment due as specified on the invoice, receipt of payment, or the one-year limit from provision of the goods/services.

The FTA Real Estate Guide applies this distinction specifically to construction. It explains that construction contracts often contain stage payments, advances and retentions and that certification itself does not necessarily trigger the VAT date of supply; a linked payment obligation/invoice/payment can do so.

### Architecture consequence

P1.5 must not treat:

`Commercial certification = statutory VAT liability/tax point`

as a universal invariant.

Instead retain separate concepts:

- product commercial certification;
- tax treatment/calculation context used for a certificate where the product needs it;
- statutory tax point/date-of-supply fact;
- tax invoice / electronic tax invoice fact;
- payment fact;
- external accounting/tax posting fact.

By default under the frozen accounting seam, statutory tax-invoice/date-of-supply/posting facts may remain external `MIRROR / REFERENCE / OUT` authority even when the product calculates a commercial certificate tax component.

**No new ledger is required.** The existing commercial event + accounting/tax interface boundary is sufficient if this distinction is explicit.

---

## 4. Evidence finding B — advance, stage payment and retention are not one economic axis

FTA construction guidance treats advance payments, stage/completion payments and retention as facts that can affect tax timing under continuous-supply rules.

FIDIC's authoritative published structures separately identify advance payment, interim payment applications/certificates, payment, retention money and final payment/certification concepts.

### Architecture consequence

The P1.5 separation is supported:

- advance basis/outstanding/recoupment;
- gross commercial valuation/certification;
- retention held/released;
- payment/accounting truth;
- tax-point/tax-invoice truth.

They must not collapse into a single `payable`, `actual`, `certified` or `paid` state/value.

No additional core event family is identified beyond the candidate advance, certification, retention/release, external payment/accounting and tax-context seams.

---

## 5. Evidence finding C — measurement, variation, provisional sums and daywork are distinct valuation mechanisms

FIDIC's official publication contents distinguish measurement/evaluation, variation procedures, provisional sums and daywork rather than treating every difference between baseline and final value as one generic variation.

### Architecture consequence

The P1.5 bounded capability/profile direction is supported:

- progress/lump-sum valuation;
- remeasurement;
- milestone/service mechanisms;
- provisional/allowance mechanisms;
- instructed/effective change;
- valuation basis.

The exact contract terms remain contract/deployment inputs. The architecture must not infer that quantity variation always means commitment change or that every provisional allowance behaves as fixed-price committed scope.

No GCC-only object model is required by this evidence.

---

## 6. Evidence finding D — tax adjustments require explicit adjustment history

The current consolidated VAT law requires output-tax adjustment after the date of supply in cases including cancellation, changed tax treatment, altered consideration, return of goods/services with consideration returned, or tax/treatment applied in error.

For increases, the law provides for a new tax invoice for the additional tax. For reductions, it requires a tax credit note, subject to the stated conditions/timing. Current law also contains electronic-credit-note requirements for persons subject to the Electronic Invoicing System.

### Architecture consequence

This strongly supports the P1.5 correction model:

- original commercial/tax evidence remains identifiable;
- correction is linked to the original basis;
- reduction/increase can create later adjustment documentation/effects;
- external tax/accounting correction is not an in-place rewrite of product commercial history;
- the tax adjustment can be a distinct external-authority/reference fact even where it was caused by a product commercial correction.

The candidate `CommercialEffectVector` remains product-commercial algebra, not VAT journal accounting.

No additional P07 correction ontology is required.

---

## 7. Evidence finding E — tax currency/FX has a purpose-specific authority

Article 69 of the current consolidated VAT law requires foreign-currency tax invoices to state amounts converted into UAE Dirham using the Central Bank-approved exchange rate at the date of supply.

### Architecture consequence

This falsifies any design that uses one universal project/commitment FX rate for every purpose.

The P1.5 candidate already distinguishes purpose-specific FX:

- comparison/evaluation FX;
- contractual/commitment FX;
- reporting/budget conversion;
- statutory tax-invoice conversion;
- external accounting conversion.

`TaxInvoiceFxBasis` or equivalent load-bearing tax-context fact must be independently bindable from commercial comparison/certificate/reporting FX where those purposes differ.

No new currency ledger is required.

---

## 8. Evidence finding F — certificate correction and final account remain distinct contract concepts

FIDIC's published contract structures distinguish interim certification/payment, retention, statement at completion/final statement/final payment certificate and, in the 1987 Red Book structure, correction of certificates.

### Architecture consequence

P1.5 must keep:

- interim certification;
- correction of prior commercial effects;
- retention/release;
- final-account/final-certificate/closeout effects;

as separable semantic transitions rather than one `certificate status` lifecycle.

The current lifecycle matrix and correction/effect-vector candidate already provide these distinctions.

No additional core commercial event family was revealed by this review.

---

## 9. Falsification result

### Question

Did targeted UAE/FIDIC authoritative evidence reveal a new load-bearing commercial truth owner/event family that the integrated candidate cannot represent without structural redesign?

### Result

**NO.**

The evidence instead reinforces the candidate's existing non-collapsible distinctions:

- certification ≠ statutory VAT date of supply;
- certification ≠ payment/accounting posting;
- advance ≠ earned/certified value;
- retention ≠ unearned scope;
- measurement/evaluation ≠ variation;
- provisional sum/daywork are explicit valuation mechanisms;
- correction/credit-note adjustment ≠ in-place rewrite;
- tax FX authority ≠ comparison/contract/reporting FX authority;
- interim certification ≠ final account/final certification.

### Required candidate hardening

Add an explicit regional/tax authority rule:

> A product-calculated certificate tax component is a commercial calculation fact, not automatically the statutory tax liability/date-of-supply/tax-invoice truth. Statutory tax-point, tax-invoice/e-invoice, tax-credit-note and tax-posting facts have an explicit authority profile and normally remain external accounting/tax `MIRROR / REFERENCE / OUT` concerns unless a deployment deliberately assigns a supported product authority for a specific fact.

This fits the frozen P1.4 authority model and does not create a second ledger.

---

## 10. ADR-0010 candidate resolution direction

Based on the targeted evidence, the architecture can support UAE/GCC semantics as **first-class deterministic regional/contract policy profiles over the same commercial core**, rather than either:

- late presentation-only localization; or
- a separate GCC commercial ontology/ledger.

The common core must expose versioned policy/authority hooks for matters such as:

- valuation mechanism;
- tax/date-of-supply context;
- certificate calculation treatment;
- retention/advance rules;
- payment/security/release dependencies;
- FX purpose;
- correction/adjustment;
- final-account/closeout semantics.

Specific statutory rates, legal requirements, contract forms and defaults remain evidence-driven configuration/legal/product decisions and are not frozen as universal GCC practice.

**BL-P15-05: CLOSED CANDIDATE — targeted authoritative evidence found no missing core event/authority family, subject to internal recheck and external hostile review.**

---

## 11. Evidence limitations

- FIDIC is authoritative for its own contract forms, not proof that all UAE private contractor/subcontract practice follows FIDIC.
- VAT law/guidance proves tax distinctions, not contractor procurement workflow prevalence.
- This review does not resolve all UAE/GCC legal obligations, security law, retention enforceability, labor law, payment legislation or jurisdiction-specific contract interpretation.
- Those matters must not be inferred from this architecture evidence artifact.

The only P1.5 question answered here is structural sufficiency of the commercial-core semantic slots.
