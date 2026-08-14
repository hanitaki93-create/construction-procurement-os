# CPOS Default Tenant Profile — UAE Contractor v1.0

**Status:** FREEZE-CANDIDATE PRODUCT DEFAULT / OVERRIDABLE CONFIGURATION

Purpose: meet the Phase-1 ≤5-working-day first-live-tender architecture constraint by shipping safe usable defaults instead of requiring a customer to design procurement semantics before first use. These are defaults, not universal legal rules.

## 1. Locale / currency

- locale: `en-AE`;
- timezone: tenant chooses on onboarding; UAE starter suggests `Asia/Dubai`;
- primary currency: `AED`;
- additional currency registry includes `USD`, `EUR`, `GBP`, `SAR` disabled/available for activation as needed;
- Arabic/RTL support enabled as a product capability, not a separate tenant purchase/config project.

## 2. Starter UOM set

Active on day one:

`EA, PCS, SET, LS, M, M2, M3, KG, TON, LTR, DAY, MONTH`

Definitions/conversions follow the R01 UOM field contract. `LS` is LUMP_SUM and does not convert to physical dimensions. Tenant may add governed UOMs without changing transaction/source history.

## 3. Document numbering defaults

Use `NUMBERING_POLICY_V1_1` class defaults:

- `MR-{PROJECT}-{YY}-{SEQ:5}`
- `RFQ-{PROJECT}-{YY}-{SEQ:5}`
- addendum `{RFQ_NUMBER}-A{SEQ:2}`
- `CMP-{PROJECT}-{YY}-{SEQ:5}`
- `REC-{PROJECT}-{YY}-{SEQ:5}`
- `AWD-{PROJECT}-{YY}-{SEQ:5}`
- `LPO-{ENTITY}-{YY}-{SEQ:5}`
- `PO-{ENTITY}-{YY}-{SEQ:5}`
- `SC-{ENTITY}-{YY}-{SEQ:5}`
- `GRN-{PROJECT}-{YY}-{SEQ:5}`

Default gap policy is `GAP_ALLOWED` with uniqueness/non-reuse/cancelled-number retention. A tenant/jurisdiction may activate `CONTINUOUS_REQUIRED` prospectively using the stronger late-assignment CC-2 policy; setup never invents the mechanism.

## 4. Starter document templates

Product ships an approved baseline template version for:

- MR/PR;
- Scope of Works annexure;
- RFQ/Tender;
- RFQ Addendum;
- Comparison summary/workbook export;
- Recommendation/approval brief;
- LPO;
- Purchase Order;
- Subcontract basic award/particulars + annexure index;
- GRN where enabled.

Onboarding only requires legal-entity/company identity, logo where desired, address/contact block, authorized signature roles, and optional approved standard terms. The customer does not build a report template or expression language.

## 5. Starter procurement-route profile

To avoid inventing customer authority/threshold law, the starter does **not** hard-code a universal direct-buy monetary threshold.

Day-one behavior:

- `COMPETITIVE_RFQ` is available for all approved demand;
- starter competitive target is 3 invited suppliers and 3 comparable responses where practical;
- fewer comparable responses may proceed only through an explicit policy exception/approval rather than silently being treated as compliant;
- `DIRECT_ORDER` and `SOLE_SOURCE` are available through an exception/justification + approval path until the tenant configures its own value/category rules;
- framework/call-off remains unavailable until an applicable governed agreement exists;
- tenant can configure bounded value bands, category rules and approval gates without code.

This provides a usable first tender immediately while preventing arbitrary low-value policy assumptions from being presented as law.

## 6. Starter payment/delivery references

- payment-term registry seeds `30 DAYS FROM INVOICE`, `45 DAYS FROM INVOICE`, `60 DAYS FROM INVOICE`, `ADVANCE + BALANCE — PROJECT SPECIFIC`, and `OTHER GOVERNED` templates;
- no payment term is forced globally; RFQ/order captures the actual confirmed basis;
- project delivery location defaults to the project/site address after onboarding; additional drop points can be created by authorized users.

## 7. Starter supplier/compliance types

Seed document types:

- Trade / Commercial Licence;
- VAT / TRN Certificate;
- Insurance Certificate;
- ISO / Quality Certification;
- HSE / Safety Certification;
- Prequalification / Registration Evidence;
- Other Governed Compliance Document.

Specific required-document matrices remain tenant/trade/project policy, not a universal product assumption.

## 8. First-live-tender minimum onboarding

A clean tenant can reach first live RFQ once it has:

1. legal entity/company identity;
2. one project with code/name and delivery location;
3. required internal users/roles/approval authority sufficient for the intended route;
4. suppliers/contacts entered or imported;
5. an approved MR/package scope;
6. optional logo/terms customization if desired.

Item catalogue, Scope Library, estimating handover, ERP connector, CDE connector, deep qualification scheme, native eSign and AI are **not prerequisites** for first live tender.

## 9. Override rule

All starter defaults are versioned configuration. Overrides are prospective; they never rewrite numbers, UOM/conversions, terms, templates, route decisions or documents already used by historical transactions.
