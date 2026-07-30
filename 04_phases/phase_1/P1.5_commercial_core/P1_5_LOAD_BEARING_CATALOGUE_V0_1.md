# P1.5 — Provisional Load-Bearing Catalogue v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE CATALOGUE / PROVISIONAL / NOT FROZEN  
**Parent:** `P1_5_WORKPLAN_V0_1.md`  
**Economic frame:** `P1_5_COMMERCIAL_EVENT_BALANCE_FRAME_V0_1.md`  
**Product code:** LOCKED

---

## 1. Purpose

Apply the frozen P1.4 `load-bearing` test to concrete P01–P12 facts/events/configuration before physical entity composition is chosen.

A fact/event/evidence/policy/config value is load-bearing when governed outcome dependence, counterfactual materiality or reconstruction necessity requires its governing authority/version/context.

This catalogue:

- identifies load-bearing semantic identities;
- records authority and economic significance;
- exposes where grain/cardinality remains open;
- prevents schema convenience from deciding truth ownership;
- preserves P1.2 evidence debt;
- drives ADR-0003/0004/0011/0015/0019/0022/0023 work.

It is **not** an entity/table list.

---

## 2. Status vocabulary

- `FROZEN_INHERITED` — meaning/authority frozen upstream.
- `ACCEPTED_P15_CANDIDATE` — coherent P1.5 candidate; hostile audit not complete.
- `PRIMARY_SUPPORTED` — supported by P1.2 primary gate/reconciliation.
- `PROVISIONAL_SUPPORTED` — useful candidate mechanics, not final ontology.
- `FALSIFIABLE_DEBT` — exact mechanic not proven; must remain open.
- `OPEN_ADR` — physical/semantic choice still controlled by an open ADR.
- `INTERFACE_ONLY` — load-bearing dependency exists but authority remains external.

---

## 3. Catalogue columns

For each row:

- **LB ID** — P1.5 catalogue identity;
- **Process** — primary process/domain;
- **Semantic fact/event** — business meaning, not table name;
- **Why load-bearing** — outcome/materiality/reconstruction basis;
- **Authority** — frozen or candidate `OWN/MIRROR/REFERENCE/OUT`;
- **Economic effect** — `NONE`, `SCOPE`, `OBLIGATION`, `VALUATION`, `CERTIFICATION`, `RELEASE`, `RECOVERY`, `EXTERNAL_ACCOUNTING`, etc.;
- **History/config need** — version/effective/provenance/freshness requirement;
- **Status / unresolved grain** — evidence and physical-model posture.

---

# 4. Shared organizational / authority substrate

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-001 | Shared | Tenant boundary | Determines data/security/configuration scope for every governed action | OWN | NONE | Stable tenant identity; residency/config lineage | FROZEN_INHERITED |
| LB-002 | Shared | LegalEntity identity | Determines contracting/accounting/fiscal/legal context where applicable | OWN or deployment-bound master fact under P1.4 profile | NONE | Version/effective relation where facts change | FROZEN_INHERITED meaning; physical master model open |
| LB-003 | Shared | ContractingAuthorityContext | Determines exact contracting authority for project/transaction | OWN | NONE | Exact context/version bound to load-bearing transaction | FROZEN_INHERITED; physical composition open |
| LB-004 | Shared | Project↔ContractingAuthorityContext relation | Changes permitted contracting/legal interpretation | OWN | NONE | Effective-dated; silent historical rebinding forbidden | FROZEN_INHERITED |
| LB-005 | Shared | Project identity / active context | Scopes requirements, sourcing, commitment, controls and reporting | OWN/MIRROR/REFERENCE by deployment profile | NONE | Authority source/version/freshness where external | FROZEN_INHERITED authority; physical master open |
| LB-006 | Shared/P09 | Current internal membership / security capability | Determines whether a new state-changing action may execute | OWN | NONE | Current capability checked live; history preserved separately | FROZEN_INHERITED |
| LB-007 | Shared/P09 | Historical role/delegation/DOA context used by action | Required to explain why action was permitted | OWN | NONE | Bound effective policy/context/version | FROZEN_INHERITED |
| LB-008 | Shared | External grant | Determines bounded supplier/guest capability; cannot satisfy internal auth | OWN | NONE | Tenant/resource/action/expiry/revoke/use history | FROZEN_INHERITED |

---

# 5. P01 — Demand / planning / package / allocation

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-010 | P01 | DemandLine authorized need basis | Determines legitimate sourcing scope | OWN or deployment-bound source | SCOPE basis | Source/version/effective authority | PRIMARY_SUPPORTED family; ADR-0003 physical root open |
| LB-011 | P01 | PlannedRequirement authorized early-planning basis | Allows sourcing before detailed demand without duplicate future need | OWN or deployment-bound source | SCOPE basis | Must preserve origin type and later reconciliation lineage | PROVISIONAL_SUPPORTED; closed origin family candidate |
| LB-012 | P01 | Budget/CostStructure source fact used for attribution/control | Changes governance, reporting, DOA/variance and later accounting interface | OWN/MIRROR/REFERENCE by deployment | NONE by itself | Exact source/version/effective binding; freshness if external | FROZEN_INHERITED authority; ADR-0011 timing open |
| LB-013 | P01 | Transaction cost-attribution binding | Determines which budget/cost context governed transaction | OWN | NONE by itself | Historical source/context/version binding | FROZEN_INHERITED meaning; ADR-0011 mandatory point open |
| LB-014 | P01 | RequirementAllocation authorization/consumption lineage | Prevents duplicate sourcing/award/commitment of authorized scope | OWN | SCOPE | Split/merge/reconcile/conversion history; idempotency | FALSIFIABLE_DEBT FT-02/06/10; value-ledger use forbidden |
| LB-015 | P01 | Authorized requirement basis increase/decrease | Changes hard scope/capacity available to downstream actions | OWN or governed source authority | SCOPE | Version/effective date/provenance; downward reconciliation | PROVISIONAL_SUPPORTED; exact conservation mechanics open |
| LB-016 | P01 | ProcurementPackage grouping context | Can change tender composition/navigation but not need authority itself | OWN | NONE | Version/scope membership if load-bearing to release | PROVISIONAL_SUPPORTED; optional; ADR-0003 root open |

---

# 6. P02 — Vendor qualification / contextual eligibility

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-020 | P02 | Tenant-private supplier business relationship | Determines selectable external party without cross-tenant leakage | OWN | NONE | Tenant-specific history/provenance | FROZEN_INHERITED |
| LB-021 | P02 | Supplier legal/tax registration used for a transaction | May change legal/tax/country treatment and eligibility | OWN/MIRROR/REFERENCE depending source | NONE | Source/version/effective context | ACCEPTED_P15_CANDIDATE; Ceiling Test requires multi-registration support |
| LB-022 | P02 | Contextual eligibility result | Determines whether supplier may participate/award in project/BU/context | OWN decision fact over governed evidence | NONE | Evaluation time, rules/evidence/context | PROVISIONAL_SUPPORTED; avoid global vendor status |
| LB-023 | P02 | Qualification evidence relied upon | Required to reconstruct eligibility decision | OWN evidence integrity or REFERENCE/MIRROR if external | NONE | Source/version/expiry/freshness | FROZEN_INHERITED evidence boundary |

---

# 7. P03 — Tender / release / addenda

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-030 | P03 | TenderEvent sourcing context | Scopes participants, releases, deadlines and comparison basis | OWN | NONE | Stable identity; versioned governing configuration where material | PROVISIONAL_SUPPORTED |
| LB-031 | P03 | TenderRelease exact issued version | Defines what suppliers were asked to price/accept | OWN transaction evidence | NONE | Immutable issued version, source/provenance/location | FROZEN_INHERITED evidence semantics |
| LB-032 | P03 | Addendum/superseding release | Changes supplier-facing basis and therefore valid bid interpretation | OWN transaction evidence | NONE | Supersession lineage/effective issue time | PRIMARY_SUPPORTED distinction |
| LB-033 | P03 | Tender deadline / response rule where governing | Changes permitted participation/outcome | OWN config/fact | NONE | Bound version/effective time | ACCEPTED_P15_CANDIDATE via load-bearing test |

---

# 8. P04 — External participation / bid truth

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-040 | P04 | TenderParticipant relation | Determines tender×supplier participation facts and scoped access | OWN | NONE | Invitation/intent/decline/non-response dated facts | PROVISIONAL_SUPPORTED |
| LB-041 | P04 | BidSubmission supplier source revision | Defines supplier commercial offer truth | OWN integrity/custody; supplier is source principal | NONE until later commitment | Immutable revision/source actor/channel/provenance | PRIMARY_SUPPORTED / frozen evidence boundary |
| LB-042 | P04 | Buyer-on-behalf representation fact | Prevents false supplier-authenticated provenance | OWN | NONE | Acting internal principal + represented party + source channel | FROZEN_INHERITED |
| LB-043 | P04 | Supplier confirmation of contractable basis | Determines basis P07 may later consume | OWN transaction evidence sourced to supplier | NONE until commitment | Exact revision/confirmation provenance | PRIMARY_SUPPORTED distinction |

---

# 9. P05 — Normalization / comparison

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-050 | P05 | ComparisonSchema governing comparison grammar | Changes normalization/evaluation outcome | OWN config | NONE | Exact version bound to comparison | PRIMARY_SUPPORTED / P1.4 load-bearing example |
| LB-051 | P05 | BidLineMapping / normalized representation | Determines comparable interpretation of supplier source | OWN buyer representation | NONE | Source bid revision + mapping provenance | PRIMARY_SUPPORTED direction; physical grain later |
| LB-052 | P05 | EvaluationAdjustment | Changes buyer-evaluated basis but not supplier truth | OWN | NONE | Actor/reason/source/version | PRIMARY_SUPPORTED |
| LB-053 | P05 | Evaluation FX basis | Can change ranking/comparison outcome | OWN bound evaluation fact or REFERENCE source context | NONE | Rate/source/fixing date/version | PRIMARY_SUPPORTED; historical freeze required |
| LB-054 | P05 | Evaluation tax/rounding basis | Can change comparison outcome | OWN bound evaluation configuration | NONE | Exact version/basis | PRIMARY_SUPPORTED; final monetary policy ADR-0022 later |
| LB-055 | P05 | ComparisonSnapshot | Freezes the governed buyer evaluation state used for recommendation | OWN | NONE | Immutable/identified derivation basis | PRIMARY_SUPPORTED |

---

# 10. P06 — Recommendation / approval / award

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-060 | P06 | AwardRecommendation evaluated basis | Governs proposed selection rationale | OWN | NONE | Comparison/source/version context | PRIMARY_SUPPORTED |
| LB-061 | P06 | AwardRecommendation contractable agreed basis | Defines proposed supplier-confirmed basis for commitment | OWN record over supplier-confirmed source | NONE | Exact supplier revision/confirmation linkage | PRIMARY_SUPPORTED |
| LB-062 | P06/P09 | ApprovalCase bound policy | Determines required approval route/authority | OWN | NONE | DOA/policy version + live-security distinction | FROZEN_INHERITED via ADR-0020 |
| LB-063 | P06/P09 | Approval outcome | Authorizes/rejects bounded award domain action but is not business truth itself | OWN workflow/control fact | NONE | Actor/authority/policy/evidence | FROZEN_INHERITED via ADR-0018 |
| LB-064 | P06 | AwardDecision | Authoritative buyer selection/approved contractable basis | OWN | NONE by default | Decision basis, authority, evidence, effective time | PRIMARY_SUPPORTED; award ≠ commitment |
| LB-065 | P06 | Award rejection/re-tender decision | Changes sourcing lifecycle/allowed next actions | OWN | NONE | Reason/authority/supersession | ACCEPTED_P15_CANDIDATE |

---

# 11. P07A — Terms / commitment formation

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-070 | P07A | CommercialTermsAuthority version | Governs later rates/formulas/terms without necessarily creating obligation | OWN when product domain activated | NONE or explicit minimum exposure where contract says so | Version/effective date/provenance | PROVISIONAL_SUPPORTED; ADR-0004 physical form open |
| LB-071 | P07A | Commitment formation/effectiveness event | Creates supplier obligation | OWN | OBLIGATION | ContractingAuthorityContext, counterparty, terms, scope lineage, valuation/currency basis, evidence | ACCEPTED_P15_CANDIDATE semantic family; ADR-0004 composition open |
| LB-072 | P07A | Original commitment baseline | Required to reconstruct original legally/commercially effective obligation | OWN historical truth | OBLIGATION baseline | Immutable formation basis/version/evidence | ACCEPTED_P15_CANDIDATE |
| LB-073 | P07A | Scope/quantity basis | Determines what obligation covers and conservation/measurement semantics | OWN | OBLIGATION/SCOPE context | Version/effective context | PROVISIONAL_SUPPORTED; FT debt and ADR-0004 interaction |
| LB-074 | P07A | Valuation basis | Determines how qualifying scope/performance maps to commercial value | OWN | VALUATION grammar | Exact governing basis/version | PROVISIONAL_SUPPORTED |
| LB-075 | P07A | Commitment currency / monetary terms basis | Determines obligation amount meaning | OWN | OBLIGATION value context | Currency/scale/rate/tax policy as applicable | OPEN_ADR ADR-0022/0010 |
| LB-076 | P07A | Scope-backed framework reservation | Can reserve authorized capacity before call-off | OWN | SCOPE reservation; not duplicate commitment value | Same RequirementAllocation lineage | PROVISIONAL_SUPPORTED; exact mechanic open |
| LB-077 | P07A | Monetary guaranteed minimum/take-or-pay exposure | Creates commercial exposure without fabricated physical scope | OWN | OBLIGATION/exposure | Contract rule/version/effective basis | PROVISIONAL_SUPPORTED; needs structural test |

---

# 12. P07B — Controlled change / instruction

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-080 | P07B | Proposed/pending change | May affect forecast/approval but is not current approved commitment | OWN proposal | NONE authoritative; potential exposure only | Proposal version/source/authority status | ACCEPTED_P15_CANDIDATE distinction |
| LB-081 | P07B | Effective approved commitment change | Changes current contractual obligation | OWN | OBLIGATION +/- | Change basis, approval/domain authority, effective date, evidence | ACCEPTED_P15_CANDIDATE |
| LB-082 | P07B | AuthorizedWorkInstruction | Can authorize work/scope before final price agreement | OWN | SCOPE authority and/or provisional exposure depending contract | Issuer authority, scope basis, valuation authority, effective time | PROVISIONAL_SUPPORTED |
| LB-083 | P07B | Provisional valuation authority | Determines permitted interim valuation before final agreement | OWN | VALUATION authority | Named contractual rule/version | PROVISIONAL_SUPPORTED |
| LB-084 | P07B | Change agreement/reconciliation | Converts/settles provisional/instructed position without rewriting prior events | OWN | OBLIGATION/VALUATION adjustment | Links prior instruction/provisional history | ACCEPTED_P15_CANDIDATE |
| LB-085 | P07B | Attribution/reclassification change | Changes reporting/cost context without pretending underlying obligation never existed | OWN product binding + external interface as configured | normally NONE economic total | Old/new attribution, authority/effective time | OPEN_ADR ADR-0011/0015 |

---

# 13. P07C — Goods fulfilment / receipt seam

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-090 | P07C | Delivery evidence | Proves attempted/actual delivery context but not necessarily acceptance/value | OWN evidence or source evidence | NONE | Source/time/quantity/version | PROVISIONAL_SUPPORTED |
| LB-091 | P07C | GoodsReceipt accepted/rejected/returned fact | Changes fulfilment state and may govern quantity/value eligibility | OWN product commercial/fulfilment fact | FULFILMENT; valuation effect depends contract | Quantity/UOM/economic component/evidence/reversal history | PROVISIONAL_SUPPORTED |
| LB-092 | P07C | Reversible receipt/source reversal | Can legitimately restore source fulfilment/capacity where business event reverses | OWN | FULFILMENT reversal; scope impact where valid | Reversal lineage/authority/evidence | FALSIFIABLE_DEBT intersects CR-02 |
| LB-093 | P07C | Invoice-match exception fact | Governs procurement exception without becoming AP liability | OWN | NONE or exception position | Invoice/source references, match basis | FROZEN_INHERITED accounting boundary |
| LB-094 | P07C/P07D | Economic component identity | Prevents duplicate value across receipt/storage/installation/certification mechanisms | OWN semantic identity | controls VALUATION contribution | Contractual component/basis + prior recognition linkage | OPEN P1.5 question Q2 |

---

# 14. P07D — Claim / valuation / certification

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-100 | P07D | Supplier ProgressClaim / commercial claim revision | Defines supplier-requested commercial amount | OWN integrity/custody; supplier source principal | CLAIM only | Revision/source/evidence | PROVISIONAL_SUPPORTED |
| LB-101 | P07D | Measurement/valuation evidence | Can change assessed/certified amount | OWN or source evidence | NONE alone / valuation input | Measurement basis/version/authority | PROVISIONAL_SUPPORTED; remeasurement debt FT-06 |
| LB-102 | P07D | ValuationAssessment | Buyer authoritative assessment before certification | OWN | ASSESSMENT | Contract/valuation basis, evidence, actor, effective context | PROVISIONAL_SUPPORTED |
| LB-103 | P07D | Certification effectiveness event | Creates product-owned certified commercial truth | OWN | CERTIFICATION | Contractual valuation authority, policy/approval, evidence, currency/tax/rounding basis | ACCEPTED_P15_CANDIDATE; ADR-0015/0022 open |
| LB-104 | P07D | Retention term/basis | Changes certificate component calculations | OWN governing term/config | NONE itself | Version/effective basis | PROVISIONAL_SUPPORTED / ADR-0010 evidence debt |
| LB-105 | P07D | Retention withholding effect | Changes retention position without reducing gross earned-value semantics | OWN derived from certification/event basis | CERTIFICATION component | Certificate/term linkage | ACCEPTED_P15_CANDIDATE |
| LB-106 | P07D | Retention release event | Reduces outstanding retention without rewriting prior withholding | OWN | RELEASE | Release authority/evidence/effective time | ACCEPTED_P15_CANDIDATE |
| LB-107 | P07D | Advance term/commercial basis | Governs advance entitlement/recoupment | OWN term/config; external payment fact may be external | NONE or explicit exposure per contract | Version/effective basis | PROVISIONAL_SUPPORTED |
| LB-108 | P07D | Advance recoupment effect | Reduces outstanding advance position without reducing gross earned value | OWN commercial event/effect | CERTIFICATION/RECOUPMENT | Certificate/term linkage | ACCEPTED_P15_CANDIDATE |
| LB-109 | P07D | Provisional/allowance consumption | Changes remaining allowance exposure | OWN | VALUATION/ALLOWANCE | Basis/component linkage | PROVISIONAL_SUPPORTED |

---

# 15. P08 — Commercial position / accounting interface

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-110 | P08 | Current approved commitment projection | Core commercial control position | DERIVED from OWN events | derived OBLIGATION | Derivation version + event inclusion | FROZEN_INHERITED principle; exact algebra candidate |
| LB-111 | P08 | Certified-to-date projection | Core commercial control position | DERIVED from OWN certification/correction events | derived CERTIFICATION | Derivation/currency/rounding version | ACCEPTED_P15_CANDIDATE |
| LB-112 | P08 | Retention outstanding projection | Governs commercial exposure/release | DERIVED | derived RETENTION | Terms + certification/release/correction history | ACCEPTED_P15_CANDIDATE |
| LB-113 | P08 | Advance outstanding projection | Governs recoupment exposure | DERIVED | derived ADVANCE | Basis + recoupment/release/correction history | ACCEPTED_P15_CANDIDATE |
| LB-114 | P08 | Recovery/contra position | Governs supplier recovery without conflating replacement authorization | OWN events + DERIVED projection | RECOVERY | Authority/basis/evidence/correction lineage | PROVISIONAL_SUPPORTED |
| LB-115 | P08 | External AP posting/liability fact | Can affect reconciliation/accounting read-path but authority external | MIRROR/REFERENCE/OUT | EXTERNAL_ACCOUNTING | Source record/version/freshness/conflict | FROZEN_INHERITED |
| LB-116 | P08 | External payment/cash fact | Distinguishes paid from certified/actual commercial positions | MIRROR/REFERENCE/OUT | EXTERNAL_ACCOUNTING | Source/freshness/conflict | FROZEN_INHERITED |
| LB-117 | P08 | External job-cost/accounting posting fact | Affects accounting reconciliation but not product co-master | MIRROR/REFERENCE/OUT | EXTERNAL_ACCOUNTING | Source/freshness/conflict | FROZEN_INHERITED |
| LB-118 | P08 | Reconciliation difference/disposition | Governs correction path and user action | OWN operational metadata over authorities | NONE unless separate domain action | Classification, source, resolution evidence | FROZEN_INHERITED semantics |
| LB-119 | P08 | Integration rejection category | Prevents sync defect from mutating truth | OWN operational metadata | NONE | DATA_DEFECT / TRANSPORT_OR_MAPPING_DEFECT / TEMPORAL_RESTRICTION / EXTERNAL_AUTHORITY_RETURN | FROZEN_INHERITED |

---

# 16. P09 — Deterministic control plane

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-120 | P09 | Permission/role/delegation fact used for action | Determines whether command is permitted | OWN | NONE | Bound historical context + live capability | FROZEN_INHERITED |
| LB-121 | P09 | DOA/approval policy version | Changes approval requirements/authority | OWN config | NONE | Explicit version/effective binding | FROZEN_INHERITED via ADR-0020 |
| LB-122 | P09 | Compliance/eligibility gate used by domain action | Can permit/block action | OWN decision fact over evidence/config | NONE | Rule/evidence/version/context | PROVISIONAL_SUPPORTED |
| LB-123 | P09 | Workflow/task outcome | May authorize/request domain command but cannot become domain truth | OWN control fact | NONE | Actor/policy/result/audit | FROZEN_INHERITED via ADR-0018 |
| LB-124 | P09 | Domain command execution result | The bounded transition that actually changes domain truth | OWN | depends target event | Command identity, guard result, authority, idempotency, emitted event | FROZEN_INHERITED principle; physical command model later |
| LB-125 | P09 | Idempotency/concurrency decision | Prevents duplicate economic effect / conflicting transition | OWN operational/domain control | NONE directly | Attempt identity/version/conflict evidence | OPEN_ADR ADR-0023 |

---

# 17. P10 — Long-lead / procurement schedule overlay

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-130 | P10 | Required/planned/forecast/confirmed milestone date used to govern procurement action | Can change escalation/decision but must remain distinct from actual | OWN/MIRROR/REFERENCE depending source | NONE | Type/source/version/effective/freshness | PROVISIONAL_SUPPORTED; ADR-0007/0013 later |
| LB-131 | P10 | Actual procurement milestone derived from domain event | Required for reliable status/expediting history | DERIVED from OWN domain events | NONE | Source event identity/derivation version | PROVISIONAL_SUPPORTED |
| LB-132 | P10 | External master-schedule date | Can govern required-by constraint but authority may remain external | REFERENCE/MIRROR | NONE | External source/version/freshness | INTERFACE_ONLY |

---

# 18. P11 — Closeout / security / warranty / recovery

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-140 | P11 | Final scope disposition / commitment close decision | Determines whether ordinary further commercial actions remain permitted | OWN | possible RELEASE/closure effect | Authority/evidence/effective time | PROVISIONAL_SUPPORTED |
| LB-141 | P11 | Final account agreement/certification basis | Determines final commercial position | OWN when in product commercial domain | CERTIFICATION/OBLIGATION adjustment | Evidence/change/certification lineage | PROVISIONAL_SUPPORTED |
| LB-142 | P11 | Security/bond/guarantee obligation reference | Can gate release/closeout without product becoming banking platform | OWN obligation metadata + REFERENCE external instrument where applicable | NONE/RELEASE trigger | External instrument ID/version/expiry/release evidence | INTERFACE_ONLY bounded semantics |
| LB-143 | P11 | Retention/security release event | Changes outstanding held/release position | OWN commercial event where product domain owns it | RELEASE | Authority/evidence/effective time | ACCEPTED_P15_CANDIDATE |
| LB-144 | P11 | Warranty/DLP obligation/effective period | Can gate closeout/release actions | OWN obligation metadata or REFERENCE contract source | NONE | Start/end/basis/version | PROVISIONAL_SUPPORTED |
| LB-145 | P11 | Recovery linked to defect/default | Changes commercial recovery position but not replacement authority itself | OWN | RECOVERY | Source/default/recovery authority/correction lineage | PROVISIONAL_SUPPORTED; CR-02 separation binding |

---

# 19. P12 — Technical/material approval dependency

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-150 | P12 | Technical/material approval dependency | Can block/permit procurement/commercial transition | OWN dependency relation | NONE | Required approval type/context/version | PROVISIONAL_SUPPORTED |
| LB-151 | P12 | External technical approval decision/reference | Governs gate but authority may remain consultant/CDE | REFERENCE/MIRROR | NONE | External record/version/status/freshness | INTERFACE_ONLY |
| LB-152 | P12 | Product-owned procurement gate result derived from external approval | Determines whether specific domain command may proceed | OWN deterministic dependency fact | NONE | Source approval context + rule/version | PROVISIONAL_SUPPORTED |

---

# 20. Shared evidence / history / correction substrate

| LB ID | Process | Semantic fact/event | Why load-bearing | Authority | Economic effect | History/config need | Status / unresolved grain |
|---|---|---|---|---|---|---|---|
| LB-160 | Shared | EvidenceReference/source identity/version/location for governed outcome | Needed for reconstruction/provenance | OWN integrity/provenance; payload authority may differ | NONE | Source/version/location/hash where applicable | FROZEN_INHERITED via ADR-0014/0024 |
| LB-161 | Shared | Supersession/correction lineage | Prevents destructive history rewrite | OWN | depends target event | Prior/new identity, reason, authority, effective semantics | FROZEN_INHERITED meaning; ADR-0015 physical model open |
| LB-162 | Shared | Redaction/disposition tombstone action | Preserves audit without pretending payload/event never existed | OWN | NONE | Action authority/time/basis/minimum provenance | FROZEN_INHERITED semantic obligation |
| LB-163 | Shared | Derivation/projection version | Needed when formulas/event inclusion evolve | OWN config/spec identity | NONE | Version/effective applicability/change basis | FROZEN roadmap obligation |
| LB-164 | Shared | Authority-profile version/cutover | Prevents dual-master/current-config reinterpretation | OWN | NONE | Old/new authority, effective point, reconciliation | FROZEN_INHERITED |
| LB-165 | Shared | External freshness/conflict state used in decision | Can permit/block/warn action on external truth | OWN operational metadata over external source | NONE | Last-authoritative update/observed time/conflict | FROZEN_INHERITED via ADR-0021 |

---

# 21. Candidate derived-position catalogue

These positions are load-bearing **projections**, not independent authoritative writers.

| Position | Primary authoritative inputs | Independent editing? | Current status |
|---|---|---|---|
| Authorized requirement remaining | requirement-basis + allocation lineage events | NO | FALSIFIABLE exact mechanics |
| Current approved commitment | original effective commitment + effective approved changes/reductions/corrections | NO | ACCEPTED_P15_CANDIDATE |
| Pending/proposed change exposure | pending proposal/instruction facts typed by authority state | NO as approved commitment | ACCEPTED_P15_CANDIDATE |
| Scope-backed reserved-not-called | basis reservation + call-off consumption/release | NO | PROVISIONAL_SUPPORTED |
| Monetary minimum outstanding exposure | effective minimum basis + qualifying consumption/settlement | NO | PROVISIONAL_SUPPORTED |
| Received/accepted quantity | fulfilment facts/reversals | NO | PROVISIONAL_SUPPORTED |
| Claimed-to-date | supplier claim revisions/effective claim facts | NO | PROVISIONAL_SUPPORTED |
| Assessed-to-date | buyer assessment events/corrections | NO | PROVISIONAL_SUPPORTED |
| Certified-to-date | certification events/reversals/corrections | NO | ACCEPTED_P15_CANDIDATE |
| Retention outstanding | retention terms + certification withholding + release/corrections | NO | ACCEPTED_P15_CANDIDATE |
| Advance outstanding | advance basis + recoupment/release/corrections | NO | ACCEPTED_P15_CANDIDATE |
| Provisional allowance remaining | allowance basis + qualifying effective consumption/release | NO | PROVISIONAL_SUPPORTED |
| Recovery outstanding | approved recovery events + recovery/release/corrections | NO | PROVISIONAL_SUPPORTED |
| External posted/paid status | external accounting authority + local mirror/reference state | NO locally where external authority | FROZEN_INHERITED |
| Reconciliation difference | product commercial truth compared with external authoritative accounting fact | NO as business truth | FROZEN_INHERITED operational projection |

---

# 22. Load-bearing negative list

The following are **not automatically load-bearing** merely because they exist:

- UI display preferences;
- cached totals that can be reproduced exactly;
- search indexes;
- generic notes not used by a governed decision;
- notification delivery state unless acknowledgment itself governs a transition;
- operational telemetry not used to permit/derive a business outcome;
- AI reasoning text/memory not admitted as governed evidence/input;
- duplicated convenience status fields derivable from canonical events;
- external source payload copies where only the authoritative reference/version is required and retention basis does not justify local copy.

If any such value later governs an outcome, it becomes subject to the frozen load-bearing test prospectively or through controlled migration/re-evaluation.

---

# 23. Cross-track contradiction register generated by catalogue

## C-01 — structural root still open

P01 sourcing paths prove package is optional and allocation precedes award, but they do not yet decide the physical procurement structural root.

**Owner:** ADR-0003 / next structural alternatives artifact.

## C-02 — commitment composition still open

Shared semantic commitment invariants exist, but goods PO, subcontract valuation, framework terms and call-off behaviour diverge materially.

**Owner:** ADR-0004.

## C-03 — economic component identity unresolved

One-economic-value-once requires a cross-mechanism identity/grain that is not yet physically/semantically frozen.

**Owner:** P1.5a/b joint design.

## C-04 — allocation exact mechanics unproven

Hard scope authority is required, but FT-02/06/10 prevent overclaiming exact universal conservation mechanics.

**Owner:** evidence debt + P1.5 structural capability design.

## C-05 — cost attribution mandatory point unresolved

Binding is load-bearing, but the hard transition requiring final attribution remains open.

**Owner:** ADR-0011.

## C-06 — certification finalization/correction unresolved

Certification authority is distinct and load-bearing, but physical finalization/reversal/closed-period semantics remain open.

**Owner:** ADR-0015.

## C-07 — temporal physical model unresolved

Semantic version/effective binding is frozen; storage/resolution model remains open.

**Owner:** ADR-0019.

## C-08 — money/rounding/tax unresolved

Legally significant derivations cannot freeze until monetary representation, calculation order and GCC semantic evidence are reconciled.

**Owner:** ADR-0022 + ADR-0010.

## C-09 — numbering/idempotency/concurrency unresolved

Load-bearing commands require single-effect semantics; display numbering must not undermine retry/concurrency correctness.

**Owner:** ADR-0023.

## C-10 — workflow/config breadth unresolved

Control facts are bounded by accepted ADR-0018/0020, but how configurable/general the control engine becomes remains open.

**Owner:** ADR-0008/0009.

---

# 24. One-XL audit

Current catalogue does **not** require a second independent XL.

- RequirementAllocation owns scope consumption, not value.
- P09 owns authorization/control facts, not commercial state.
- P08 owns reconciliation metadata, not accounting ledger.
- P10 owns procurement planning/expediting facts, not CPM.
- P11 owns bounded closeout obligations/releases, not banking/legal claims.
- P12 owns dependency/gate semantics, not CDE.
- evidence/audit owns provenance/history semantics, not business balances.
- AI/agent context owns no independent business truth.

**P07 remains the only independent XL candidate.**

---

# 25. A0–A3 closed-slice check

The catalogue preserves an executable sourcing/award slice using:

- LB-010/011 requirement source;
- LB-014 allocation authority;
- LB-016 optional package;
- LB-020–023 contextual supplier relation/eligibility;
- LB-030–033 tender/release;
- LB-040–043 participation/bid truth;
- LB-050–055 comparison;
- LB-060–065 recommendation/approval/award;
- shared identity/evidence/control facts.

No P07 commitment event, accounting connector, supplier network, advanced AI, CPM, WMS or CDE is required to reach AwardDecision + external handoff.

**A0–A3 ACTIVATION: CLEAN at catalogue v0.1.**

---

# 26. Current catalogue verdict

`PASS FOR NEXT P1.5 WORKING STEP — NOT A FREEZE.`

The catalogue is sufficiently explicit to begin structural alternatives and ADR-0003/0004 testing without letting schema convenience choose ownership.

It also exposes the first P1.5 joint design hotspot:

> **structural root + commitment composition + economic component identity**

must be resolved together against sourcing, P07, money, lifecycle, authority, Ceiling Test and Closed Sub-graph constraints.

---

# 27. Immediate next artifact

Create:

`P1_5_STRUCTURAL_ROOT_COMMITMENT_ALTERNATIVES_V0_1.md`

It must attack ADR-0003 and ADR-0004 jointly and test at least:

- package-rooted model;
- requisition/demand-rooted model;
- higher-order sourcing/commitment abstraction;
- common Commitment supertype versus composition/shared interfaces;
- PO / subcontract / framework / call-off distinctions;
- A0–A3 independence;
- RequirementAllocation one-lineage rule;
- economic component identity;
- Ceiling Test scenarios;
- Closed Sub-graph executability;
- object-collapse pressure;
- one-XL guard.
