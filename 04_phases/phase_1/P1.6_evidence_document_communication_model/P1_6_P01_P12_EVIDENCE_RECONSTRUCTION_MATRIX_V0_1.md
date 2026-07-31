# P1.6 — P01–P12 Evidence Reconstruction Matrix v0.1

**Date:** 2026-07-31  
**Status:** INTERNAL CANDIDATE COVERAGE / NOT FROZEN  
**Stage:** P1.6  
**Product code:** LOCKED

---

# 1. Purpose

Test whether the P1.6 evidence/document/communication contracts can reconstruct the governing evidence for every major P01–P12 procurement/commercial outcome without inventing document truth or requiring every domain fact to be represented by a separate file.

---

# 2. Reconstruction classes

A governed fact/event may reconstruct through one or more classes:

## `SOURCE_ORIGINATED`

An external/internal source artifact/message supplied material facts.

Required where load-bearing:

`EvidenceVersion + SourcePrincipalRef + SourceLocator + capture/communication provenance`.

## `DOMAIN_NATIVE`

The authoritative fact/event was created by a bounded OS domain command.

Required:

- canonical domain event/record identity;
- bound authority/policy/config/effective context;
- evidence bindings used by the command where any existed;
- calculation/derivation version where material.

A separate PDF is not required merely to prove a domain-native event.

## `PRODUCT_ISSUED`

The OS produced/issued an external artifact.

Required:

- exact PRODUCT_ISSUED EvidenceVersion;
- issue/transmittal identity;
- issuing domain action/principal;
- exact recipient/channel occurrence history as applicable.

## `EXTERNAL_AUTHORITY`

The business authority remains in an external system/person/record.

Required for load-bearing use:

- stable external version anchor OR immutable local capture;
- external authority/source principal;
- observed/fetched/freshness/conflict context where relevant.

## `DERIVED_OBSERVATION`

A human/parser/AI/tool extracted or interpreted source evidence.

Required where load-bearing:

- exact source version/location;
- derivation identity/provenance;
- acceptance/correction/transformation path;
- final domain fact/event binding.

---

# 3. Matrix

| Domain | Governed outcome / evidence target | Reconstruction requirement | Communication/issue path | Key anti-collapse rule |
|---|---|---|---|---|
| P01 | RequirementBasis / PlannedRequirement source | DOMAIN_NATIVE plus SOURCE_ORIGINATED/EXTERNAL_AUTHORITY where requirement came from estimate, schedule, client instruction, spreadsheet or external system | capture/import/reference as supported | source document is not RequirementBasis until bounded domain action establishes it |
| P01 | RequirementAllocation create/split/merge/release | DOMAIN_NATIVE; source RequirementBasis version + governing quantity/UOM/partition evidence where externally sourced | none required unless externally communicated | allocation is scope lineage, not a document register or cost ledger |
| P01 | ProcurementPackage scope/grouping | DOMAIN_NATIVE; package membership/version and member allocation refs; supporting scope docs as evidence | optional issued RFQ/tender pack later | package document set does not own requirement truth |
| P02 | Supplier relationship/context | DOMAIN_NATIVE; source/master references and buyer-on-behalf provenance where applicable | invitation/contact communication can be separate evidence | contact/address/account identity ≠ tenant business relationship authority |
| P02 | Qualification evidence | SOURCE_ORIGINATED or EXTERNAL_AUTHORITY exact version/expiry/source; DOMAIN_NATIVE evaluation result | supplier portal/email/manual capture; refresh events | certificate/document existence ≠ eligibility result |
| P02 | Eligibility / bounded exception | DOMAIN_NATIVE result + exact rule/evidence/context versions; exception approval evidence | notification optional | qualification evidence ≠ eligibility decision; message saying eligible ≠ decision |
| P03 | TenderEvent open/close/cancel | DOMAIN_NATIVE event/policy/scope | issue path separate | tender lifecycle ≠ release document lifecycle |
| P03 | TenderRelease | PRODUCT_ISSUED exact EvidenceVersion/pack + generated/source member provenance | Transmittal + CommunicationOccurrences | issued ≠ delivered/received/accepted |
| P03 | Addendum / deadline notice | PRODUCT_ISSUED exact addendum + predecessor release/version + domain basis | Transmittal + occurrences | addendum cannot silently mutate original release |
| P04 | Invite / participant grant | DOMAIN_NATIVE grant + communication evidence as applicable | email/portal/API notification | invite notification ≠ external grant authority; external grant ≠ internal authorization |
| P04 | Bid intent / decline | SOURCE_ORIGINATED message/portal response + DOMAIN_NATIVE participation fact where accepted | inbound portal/email/message capture | message is evidence; bounded action creates participation state |
| P04 | BidSubmission revision | SOURCE_ORIGINATED exact EvidenceVersion + source principal + receipt/capture occurrence + tender basis | portal/email/buyer-on-behalf | later revision never rewrites prior source revision |
| P04 | Withdrawal | SOURCE_ORIGINATED withdrawal communication or authenticated action + DOMAIN_NATIVE withdrawal fact | portal/email/message | withdrawal after reliance does not erase historical bid basis |
| P05 | Normalized mapping | DERIVED_OBSERVATION/source bindings + DOMAIN_NATIVE normalization version | none normally | normalized value ≠ supplier source truth |
| P05 | EvaluationAdjustment | DOMAIN_NATIVE adjustment + reason/evidence binding | none normally | buyer adjustment ≠ supplier-confirmed contractable basis |
| P05 | ComparisonSnapshot | DOMAIN_NATIVE immutable snapshot + exact bid EvidenceVersions/locators + FX/tax/schema/policy versions | report/export optional; issue if shared externally | later bid/source changes do not rewrite frozen snapshot |
| P06 | AwardRecommendation | DOMAIN_NATIVE recommendation + exact comparison/source basis + supporting memo/working evidence if relied on | internal approval path; external issue not required by default | recommendation ≠ approval ≠ AwardDecision |
| P06 | ApprovalCase outcome | DOMAIN_NATIVE approval outcome + actor/policy/version + supporting evidence | notification/communication optional | email “approved” cannot replace ApprovalOutcome without supported domain action |
| P06 | AwardDecision | DOMAIN_NATIVE AwardDecision + exact recommendation/comparison/source/approval basis | award notification PRODUCT_ISSUED where supported | notification ≠ award truth; award ≠ Commitment |
| P06 | External handoff | DOMAIN_NATIVE handoff fact + exact payload/evidence manifest/reference | Transmittal/API/export occurrence | external handoff does not transfer historical OS evidence authority silently |
| A4/P06 | Direct-source selection | SOURCE_ORIGINATED quotation/contractable basis + justification/compliance evidence + DOMAIN_NATIVE approval/AwardDecision | issue/notification as applicable | no fake tender/comparison evidence created |
| P07 | CommercialTermsAuthority | SOURCE_ORIGINATED signed/agreed terms or DOMAIN_NATIVE configured authority with provenance; exact version | issue/signature communication where applicable | reusable terms ≠ Commitment obligation |
| P07 | Commitment formation | DOMAIN_NATIVE effectiveness event + exact award/terms/scope/valuation/evidence/authority basis; PRODUCT_ISSUED commitment artifact where generated | transmittal/signature channel if issued | signed/issued contract artifact alone does not bypass domain effectiveness semantics |
| P07 | Minimum obligation | DOMAIN_NATIVE minimum obligation + exact governing terms clause/source locator | issue/contract evidence as above | minimum value must trace exact terms; no hidden carry-forward evidence semantics |
| P07 | Change proposal/effective change | SOURCE_ORIGINATED proposal/agreement evidence + DOMAIN_NATIVE change event; PRODUCT_ISSUED change artifact where used | message/transmittal/signature as applicable | revised document ≠ effective commercial change until domain action |
| P07 | AuthorizedWorkInstruction | SOURCE_ORIGINATED/client/internal instruction basis or DOMAIN_NATIVE instruction; exact authority/context | PRODUCT_ISSUED instruction where OS issues; external message capture where source external | instruction is work/scope authority, not automatic final price |
| P07 | Provisional valuation basis | SOURCE_ORIGINATED contract clause/rate table + DOMAIN_NATIVE bound ValuationBasis/policy | none necessarily | evidence must link instructed work to governed EconomicComponentKey before value effect |
| P07 | Delivery evidence | SOURCE_ORIGINATED delivery note/logistics evidence | inbound capture | delivery ≠ receipt/acceptance |
| P07 | GoodsReceipt/return/reinspection | DOMAIN_NATIVE receipt event + exact delivery/inspection/technical evidence where relied on | receipt/return document issue optional | signed delivery note ≠ accepted GoodsReceipt automatically |
| P07 | ProgressClaim | SOURCE_ORIGINATED exact claim revision + source location/component mapping | portal/email/manual capture | supplier claim ≠ buyer assessment/certification |
| P07 | ValuationAssessment | DOMAIN_NATIVE assessment + exact claim/measurement/rate/technical evidence bindings | may be internally issued or shared | assessment ≠ certification |
| P07 | CertificationDecision | DOMAIN_NATIVE certificate event/effects + exact assessment/valuation/policy/evidence basis; PRODUCT_ISSUED certificate artifact if issued | Transmittal/communication | issued certificate copy ≠ statutory VAT/AP/payment truth |
| P07 | Retention | DOMAIN_NATIVE effect + exact contractual rule/basis/source locator | certificate artifact may present it | retention document presentation ≠ effect owner |
| P07 | Advance | DOMAIN_NATIVE advance effect + exact contractual/security/payment reference basis | issue/handoff evidence as applicable | bank/payment evidence remains external where configured |
| P07 | Allowance/provisional consumption | DOMAIN_NATIVE effect + explicit underlying valuation basis + source evidence | certificate/change evidence as applicable | allowance capacity alone cannot justify value |
| P07 | Recovery/contra | DOMAIN_NATIVE recovery effect + defect/security/counterclaim evidence | notice/security communication where applicable | security call ≠ cash recovery; recovery effect separate |
| P07 | Correction/reclassification | DOMAIN_NATIVE correction event + predecessor effect/event + correction evidence | corrected reissue if external artifact must change | corrected document cannot replace economic correction event |
| P07 | Final account/closeout | SOURCE_ORIGINATED agreement/statement evidence + DOMAIN_NATIVE closeout/final event; PRODUCT_ISSUED artifact where used | transmittal/signature communication | final statement ≠ cash/accounting close unless external facts say so |
| P08 | SupplierInvoiceEvidence | SOURCE_ORIGINATED invoice/tax invoice/credit note exact revision | inbound email/portal/API/accounting reference | invoice evidence ≠ AP liability/certified value |
| P08 | InvoiceMatchResult | DOMAIN_NATIVE match/exception fact + exact invoice/Commitment/receipt/certification source versions | accounting/supplier exception communication as applicable | match state cannot mutate commercial truth to make invoice pass |
| P08 | External accounting/tax fact | EXTERNAL_AUTHORITY stable version/reference/freshness/conflict | API/file/reference capture | external posted/paid/tax fact ≠ product certified actual |
| P08 | Reconciliation | DOMAIN_NATIVE reconciliation result + exact product/external basis versions | issue/exception communication optional | reconciliation does not become a second ledger |
| P09 | Policy/DOA/config version | DOMAIN_NATIVE configured version with authority/effective history; source policy evidence where imported | none normally | current policy cannot rewrite historical decision basis |
| P09 | Delegation/authority context | DOMAIN_NATIVE effective version + supporting legal/org evidence where material | notification optional | evidence of org role ≠ domain authority until governed binding |
| P09 | Approval/control outcome | DOMAIN_NATIVE event + exact actor/policy/current security/evidence | message/task notification ancillary | task completion/message ≠ business-state transition |
| P10 | Required/planned/forecast/confirmed milestone | DOMAIN_NATIVE planning/observation version + source schedule/supplier confirmation evidence where used | supplier confirmation capture | planned/forecast/confirmed ≠ actual |
| P10 | Actual milestone | DOMAIN_NATIVE derivation from canonical event OR EXTERNAL_AUTHORITY actual with exact reference | capture/reference | no manual second actual tracker |
| P11 | Security reference/expiry/extension | SOURCE_ORIGINATED security instrument/extension evidence or EXTERNAL_AUTHORITY bank/issuer ref + DOMAIN_NATIVE tracked fact | inbound/outbound communication | security instrument evidence ≠ bank cash/accounting truth |
| P11 | Security call/release | DOMAIN_NATIVE SecurityAction + exact notice/instrument/authority evidence; external delivery/cash separately referenced | PRODUCT_ISSUED call/release notice where OS issues | call ≠ release; call ≠ realized recovery cash |
| P11 | Warranty/DLP obligation | SOURCE_ORIGINATED contract/closeout evidence + DOMAIN_NATIVE dates/state | issue/notification as applicable | expiry projection ≠ domain closeout unless guard satisfied |
| P11 | Commercial closeout/release | DOMAIN_NATIVE closeout event + exact final-account/security/warranty evidence basis | transmittal/document issue where applicable | commercial closeout ≠ external cash closeout |
| P12 | Technical/material approval dependency | DOMAIN_NATIVE dependency + EXTERNAL_AUTHORITY/source evidence of submittal/request | transmittal/CDE/email/API reference | technical dependency does not become commercial value writer |
| P12 | External technical approval result | EXTERNAL_AUTHORITY exact version/reference/source principal + DOMAIN_NATIVE dependency update | CDE/email/portal capture | message “approved” is evidence; owning dependency/domain action records result |
| Cross | Authority-profile transfer | DOMAIN_NATIVE cutover + old/new authority evidence/config basis | migration/handoff evidence | evidence movement cannot create dual master |
| Cross | Evidence redaction/disposition | DOMAIN_NATIVE evidence action + RetentionBasisRef/authority + DispositionRecord | external disclosure/export as applicable | payload change/disposal does not reverse domain history |
| Cross | Residency migration | DOMAIN_NATIVE migration cutover + migration evidence/manifest | operational handoff evidence | P1.6 identifies evidence scope; P1.10 owns physical topology |

---

# 4. Mandatory reconstruction chain for disputed commercial value

For a disputed load-bearing value, reconstruction must be able to produce, as applicable:

1. authoritative domain fact/event/effect identity;
2. governing Commitment/EconomicComponentKey/ObligationEffectKey where relevant;
3. governing ValuationBasis/MonetaryCalculationPolicy/FX/tax/authority/config versions;
4. exact EvidenceVersion(s) used;
5. exact SourceLocator(s) for relied-on source values/terms;
6. SourcePrincipalRef and capture/communication provenance;
7. DerivedObservation/normalization/assessment lineage where applicable;
8. approval/domain action that accepted/consumed the evidence;
9. issue/transmittal history of resulting external artifact where applicable;
10. later correction/supersession/redaction/disposition events affecting reconstruction.

No single source document is required when the authoritative result is DOMAIN_NATIVE and its inputs are already evidenced/bound. The requirement is a complete provenance chain, not PDF duplication.

---

# 5. Externally communicated commercial actions — capture proof

The following families require a defined external issue/capture path whenever the product/process actually communicates them externally:

- TenderRelease/addendum;
- supplier invitation/access communication where evidentiary;
- supplier response/clarification/confirmation;
- AwardDecision notification;
- external handoff;
- Commitment/terms/change/instruction artifact where issued/captured;
- delivery/receipt/return communication where used;
- claim/assessment/certification exchange;
- invoice/match exception exchange;
- security call/release;
- final account/closeout communication;
- technical approval/dependency exchange.

The path may be portal, email, API/system, external CDE reference, messaging channel or bounded manual/offline capture according to supported deployment.

A particular channel is not mandatory architecture.

---

# 6. A0–A3 proof

A0–A3 can satisfy reconstruction with a minimal subset:

- EvidenceRecord/EvidenceVersion;
- source principal + capture occurrence;
- exact TenderRelease/Addendum issued version;
- supplier response revisions;
- SourceLocator/EvidenceBinding for compared values;
- ComparisonSnapshot/Recommendation/Approval/Award domain provenance;
- outbound Award/handoff evidence where used.

No CDE connector, mailbox migration, AI extraction or supplier network is required.

**A0–A3: PASS candidate.**

---

# 7. One-XL proof

The matrix never makes evidence/document/message state authoritative for P07 value or domain lifecycle.

Evidence proves/records source and communication history; domain actions remain authority.

**SECOND XL: CLEAN candidate.**

---

# 8. Coverage conclusion

All P01–P12 load-bearing families can be reconstructed using the candidate P1.6 primitives without requiring a new domain process or full CDE/email/records subsystem.

This is a candidate coverage conclusion and remains subject to internal hostile audit.
