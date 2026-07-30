# P1.4 — Load-Bearing Authority Inventory v0.1

**Date:** 2026-07-30  
**Status:** INTERNAL CANDIDATE / P1.4 AUTHORITY RECONSTRUCTION / NOT FROZEN  
**Parent:** `P1_4_WORKPLAN_V0_1.md`  
**Inputs:** P1.1 frozen baseline; P1.2 final evidence/reconciliation and latest sourcing/commercial checkpoints; P1.3 closure, first-rail and evidence/external-access boundaries; current ADR log; P1.4 alternatives matrix.

---

## 1. Purpose and classification rule

This inventory walks P01–P12 plus shared substrates and assigns system authority at the lowest load-bearing semantic grain needed to prevent dual masters.

`OWN / MIRROR / REFERENCE / OUT` means system authority/custody, not legal title or IP ownership.

Where deployments legitimately differ, authority is **profile-bound**: the configuration must select exactly one authoritative source for the fact/event and bind that source/version/effective period. A profiled fact may be `OWN`, `MIRROR` or `REFERENCE` in a deployment, but it may never have two simultaneous authoritative writers.

`DERIVED` below is not a fifth authority class. It means a value is reconstructed from authoritative `OWN`/`MIRROR`/`REFERENCE` inputs and is never independently editable.

No physical database object, aggregate, table or API is selected here.

---

## 2. Shared tenancy, organization, identity and evidence substrate

| ID | Concern / fact / event | Process | Scope | Authority classification | Authoritative source/writer | Local representation / correction | History / binding |
|---|---|---|---|---|---|---|---|
| S-01 | Tenant isolation identity | Shared | customer isolation boundary | **OWN** | platform tenant administration through governed action | canonical tenant identity; no cross-tenant mutation | durable; creation/offboarding evidenced |
| S-02 | Tenant residency/provisioning region | Shared | tenant | **OWN** | governed tenant configuration | current region plus migration state; external systems separately declared | effective-dated/version-bound |
| S-03 | Operating company / contractor organization identity | Shared | tenant | **OWN** for platform operating identity; statutory registry facts may be **REFERENCE** | tenant administrator for operating identity; external registry where referenced | corrections preserve prior governed identity where transaction-relevant | effective-dated when load-bearing |
| S-04 | Legal entity platform identity and contracting posture | Shared | tenant + legal entity | **OWN** for platform relationship/posture; statutory identifiers can be **REFERENCE/MIRROR** | governed tenant/legal-entity administration; external authoritative registry/accounting source where configured | no silent replacement of legal context | effective-dated |
| S-05 | Branch / business-unit authority scope | Shared | tenant; optional legal/project scope | **OWN** only when it changes authorization/config/numbering/accounting/project assignment | governed org configuration | not a generic HR tree; correction by new effective assignment | effective-dated where used |
| S-06 | Project identity | Shared/P01 | tenant + project | **OWN** when project originates in product; **MIRROR/REFERENCE** when external project master is configured authoritative | exactly one bound authority profile | local alias/mapping cannot overwrite external master fact | version/effective/freshness when external |
| S-07 | Project ↔ contracting legal-entity relationship | Shared/P01 | tenant + project + legal entity | **OWN** | governed project authority configuration | transfer requires explicit governed change; no implicit float | effective-dated; historical transactions retain governing relation |
| S-08 | Internal authentication/person identity | Shared/P09 | global technical identity with tenant memberships | **OWN** for platform identity/account | identity service through governed account action | tenant authorization never inferred from identity alone | account history; privacy minimization may remove eligible profile data |
| S-09 | Tenant membership | P09 | tenant + person | **OWN** | tenant administration / accepted invitation | membership correction by governed grant/revoke | effective-dated |
| S-10 | Role / permission assignment | P09 | tenant + optional legal/project/BU scope | **OWN** | P09 configuration/admin action | no external grant can satisfy this authority | effective-dated/version-bound |
| S-11 | Delegation / temporary authority | P09 | tenant + authority scope | **OWN** | governed delegation action | cannot exceed delegator/policy constraints | valid-from/to + historical provenance |
| S-12 | DOA / approval-policy version | P09 | tenant + legal/project/commercial scope | **OWN** | governed configuration | in-flight case binds relevant version; change does not rewrite prior approval | effective-dated/version-bound |
| S-13 | External supplier/subcontractor organization relationship | P02/P04 | **tenant-private** external relationship | **OWN** | tenant/vendor administration + transaction evidence | V1 does not require cross-tenant organization master; duplicate across tenants is permitted | durable per tenant; deactivation distinct from history deletion |
| S-14 | External contact relationship | P02/P04 | tenant + external organization | **OWN** | tenant/vendor admin or captured supplier action | contact/account data may be minimized later without falsifying transactions | relationship history; privacy-sensitive fields separable |
| S-15 | Optional persistent external login identity | P04 | technical identity; authorization remains tenant scoped | **OWN** if enabled; not required | platform identity service | may link to prior guest actions only through evidence-backed claim process; no retroactive false attribution | link/claim history immutable where load-bearing |
| S-16 | Cross-tenant supplier network profile/history | Shared | cross-tenant | **OUT** for V1 | none | no qualification, bid, price, evidence or access history is shared by default | A5/later only through controlled scope change |
| S-17 | ExternalAccessGrant | P04 | tenant + project + tender/task/evidence + external principal | **OWN** | governed grant issuance/revocation | capability only; never internal P09/DOA authority | issued/used/revoked/expired history; validity bound |
| S-18 | Buyer-on-behalf representation fact | P04 | tenant transaction + represented external org/contact | **OWN** | acting internal principal through governed capture action | stores actor, represented party, channel and source separately | immutable action provenance |
| S-19 | EvidenceReference identity/provenance | Shared | tenant + domain object/event | **OWN** | domain/evidence service | links captured or external evidence to exact transaction/version | immutable/versioned lineage |
| S-20 | Captured governed transaction attachment/source record | Shared | tenant + transaction | **OWN** custody/record authority | capture action from supplier/internal/external channel | source payload/version immutable; supersede by new evidence, not edit | retention-basis bound; integrity provenance |
| S-21 | External authoritative CDE/ERP/bank/legal/master record | P08/P11/P12 | external system boundary | **REFERENCE** by default; narrow **MIRROR** only when operation requires local fact | external authoritative system | retain external ID, source, relevant version/effective/freshness; corrections at source or mapping layer | reference provenance; no ownership inflation |
| S-22 | Sensitivity/access classification attribute | Shared | tenant transaction/evidence | **OWN** bounded metadata | governed assignment or deterministic product rule | fixed product checks may consume it; no tenant-authored policy language | assignment/change provenance when load-bearing |
| S-23 | Retention basis/category for governed evidence | Shared | tenant + evidence class/record | **OWN** bounded configuration/record | product/contract configuration and explicit lawful override where applicable | not a general records-management language | version/effective date + disposition history |
| S-24 | Evidence disposition event | Shared | tenant + evidence | **OWN** | governed disposition after basis/hold dependency validation | does not rewrite prior business events; leaves disposition audit fact | immutable disposition history |

---

## 3. P01 — demand, planning, cost context and requirement authority

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P01-01 | DemandLine / material request created in product | tenant + project | **OWN** | governed demand action | revisions/history; no direct overwrite of consumed authority | versioned/effective as required |
| P01-02 | Externally authoritative requisition/requirement | tenant + project + external source | **MIRROR** or **REFERENCE** under authority profile | configured ERP/project source | local change becomes request/mapping exception, not competing truth | source/version/freshness bound |
| P01-03 | PlannedRequirement source basis created in product | tenant + project | **OWN** | governed planning action | source type remains bounded; not universal planning product | versioned |
| P01-04 | External estimate/procurement-plan/long-lead source basis | tenant + project + external source | **MIRROR/REFERENCE** under authority profile | configured source | local mapping separate from source truth | source/version/effective/freshness |
| P01-05 | RequirementAllocation scope-consumption lineage | tenant + project | **OWN** candidate semantic authority; exact mechanics remain FT-02/06/10 falsifiable | governed allocation/domain actions | no separate award/commitment allocation balance; no commercial value ledger | history preserving; changes through governed actions |
| P01-06 | Budget/cost-structure fact | tenant + legal entity + project | **OWN/MIRROR/REFERENCE** under explicit deployment authority profile | exactly one configured budget/accounting authority | local mappings and reclassification events do not silently rewrite source | version/effective/freshness |
| P01-07 | Transaction cost attribution binding | tenant + project + legal entity | **OWN** binding fact even where referenced cost code is external | governed domain transition | binds exact cost-context identity/version; later reclassification is separate event | historical binding preserved |
| P01-08 | ProcurementPackage grouping/context | tenant + project | **OWN** when used | governed sourcing action | optional; not universal root | version/history as load-bearing |

---

## 4. P02 — vendor qualification and contextual eligibility

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P02-01 | Tenant vendor relationship status | tenant + external organization | **OWN** | tenant vendor governance | active/suspended/deactivated distinct from historical participation | effective-dated |
| P02-02 | VendorQualificationRecord / tenant evaluation | tenant + external organization | **OWN** | tenant qualification action | another tenant's conclusion never inherited | dated/versioned |
| P02-03 | External license/certificate/registration evidence | tenant relationship + external source | **REFERENCE** or captured evidence **OWN** as source record | issuing authority/supplier source | product may validate presence/expiry but does not become issuer | source/version/expiry provenance |
| P02-04 | Tender-context eligibility decision | tenant + project + tender + supplier | **OWN** | governed eligibility action/rule | source evidence linked; later change does not rewrite historical selection | effective policy/evidence binding |

---

## 5. P03 — tender event, release and addenda

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P03-01 | TenderEvent identity/lifecycle | tenant + project | **OWN** | sourcing domain | state changes through bounded commands | event history |
| P03-02 | Supplier-facing TenderRelease version | tenant + project + tender | **OWN** | governed release action | exact issued payload/version preserved | immutable version lineage |
| P03-03 | Addendum / revised supplier-facing release | tenant + tender | **OWN** | governed addendum action | new version/supersession; never mutate prior issued basis | immutable lineage |
| P03-04 | Drawing/spec master used as source | external CDE/document source where applicable | **REFERENCE** | external authority | tender release owns the exact supplier-facing copy/version actually issued; master remains external | source ID/version/freshness + release snapshot provenance |

---

## 6. P04 — external participation, intent and bid submission

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P04-01 | TenderParticipant relationship | tenant + tender + supplier | **OWN** | sourcing domain | participant facts distinct from supplier master | dated facts |
| P04-02 | Invite/access issuance | tenant + tender + external principal | **OWN** | governed external-access action | access does not create internal permission | grant version/expiry/revocation history |
| P04-03 | Supplier intent / decline / no-bid response | tenant + tender + supplier | **OWN** transaction record; external actor is source principal | supplier action or provenance-preserving buyer-on-behalf capture | correction via new action/supersession, not false actor rewrite | immutable action provenance |
| P04-04 | BidSubmission / quote revision source truth | tenant + tender + supplier | **OWN** transaction evidence/custody | supplier-confirmed source or buyer-on-behalf capture with represented-party provenance | every material economic change is a new revision | immutable revisions |
| P04-05 | Non-response/timeout status | tenant + tender + supplier | **DERIVED from OWN deadline + response events** | sourcing state derivation | no manual competing truth | reproducible from governing version/time |

---

## 7. P05 — normalization, mapping and comparison

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P05-01 | ComparisonSchema / buyer comparison basis | tenant + project/package/tender | **OWN** | buyer sourcing/evaluation governance | package-specific; does not mutate supplier source truth | versioned |
| P05-02 | Normalized bid representation | tenant + tender + bid revision | **OWN** buyer interpretation | normalization action | source-linked; correction creates revised mapping/normalization history | provenance/version |
| P05-03 | BidLineMapping / coverage mapping | tenant + tender | **OWN** | buyer evaluation action | supports many-to-many/bundle/missing/etc.; source untouched | history preserved |
| P05-04 | EvaluationAdjustment | tenant + comparison | **OWN** | authorized buyer evaluator | distinct from supplier price/terms | actor/reason/evidence provenance |
| P05-05 | External technical approval/deviation source | tenant + project + external CDE/consultant | **REFERENCE/MIRROR** where externally authoritative | external technical authority | product owns only buyer comparison use/gate fact | source/version/freshness |
| P05-06 | ComparisonSnapshot | tenant + tender | **OWN** | governed freeze action | freezes evaluated view incl. bound FX/tax/config references; no live-table reinterpretation | immutable snapshot/version |

---

## 8. P06 — recommendation, approval and award

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P06-01 | AwardRecommendation | tenant + project + tender | **OWN** | authorized recommender | evaluated basis and supplier-confirmed contractable basis both preserved | version/evidence history |
| P06-02 | ApprovalCase / approval outcome | tenant + legal/project authority scope | **OWN** | P09-governed approval action | workflow outcome authorizes domain transition; never itself edits commercial truth | binds DOA/role/delegation version |
| P06-03 | AwardDecision | tenant + project + tender | **OWN** | governed award command after valid approval | award ≠ commitment | immutable decision/correction via governed supersession |
| P06-04 | External award/handoff acknowledgment | tenant + counterparty/external system | **OWN** receipt/dispatch evidence or **REFERENCE** to authoritative downstream record | product dispatch/counterparty/external source | handoff state not P07 commitment truth | provenance/freshness |

---

## 9. P07 — commitment/change/fulfillment/valuation commercial truth

P07 remains the only independent XL gravity well. These rows define authority boundaries only; physical PO/Subcontract/Framework/CallOff composition remains P1.5/ADR-0004.

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P07-01 | CommercialTermsAuthority when activated | tenant + legal entity + project + supplier | **OWN** | governed commercial action | external signed terms evidence linked; no duplicate rate ledger elsewhere | version/effective date |
| P07-02 | Effective commitment original baseline | tenant + legal entity + project + supplier | **OWN** | governed P07 formation/effectiveness action | ERP PO/contract representation may mirror/reference; cannot be co-master | immutable baseline |
| P07-03 | Effective approved commitment change | same | **OWN** | governed P07 change action | correction/reversal through domain event, not mutable overwrite | append/history preserving |
| P07-04 | Current approved commitment position | same | **DERIVED from OWN baseline + effective changes** | P07 projection | never independently editable | reproducible |
| P07-05 | AuthorizedWorkInstruction / scope authority | tenant + legal/project/commitment scope | **OWN** when issued in governed P07 authority; external instruction may be **REFERENCE/MIRROR** if external issuer is authority | configured contractual authority | price agreement remains distinct | effective evidence/version |
| P07-06 | GoodsReceipt / acceptance event where P07 goods fulfillment is active | tenant + project + commitment | **OWN** procurement/commercial receipt fact; inventory stock ledger remains **OUT** | governed receiving/acceptance action | external warehouse record may be referenced/mirrored; no WMS ownership | reversal/return history |
| P07-07 | Inventory on-hand/location/valuation | warehouse/accounting domain | **OUT** | external WMS/ERP if present | bounded reference only when needed | external |
| P07-08 | Supplier ProgressClaim source submission | tenant + commitment | **OWN** captured transaction evidence | supplier source / buyer-on-behalf with provenance | claim ≠ assessment/certification | immutable revisions |
| P07-09 | Buyer ValuationAssessment | tenant + commitment | **OWN** | authorized QS/commercial action | distinct from claim and certification | version/history |
| P07-10 | CertificationDecision / certified commercial value | tenant + commitment | **OWN** when P07 certification is activated | authorized certification action | accounting posting remains separate external fact where applicable | append/correction semantics later ADR-0015 |
| P07-11 | Retention/advance/recoupment contractual position | tenant + commitment | **DERIVED from OWN commercial events/terms** | P07 projection | no independently edited balance; ERP accounting representation may mirror/reference | reproducible |
| P07-12 | Recovery/backcharge entitlement event | tenant + commitment/recovery context | **OWN** commercial event | governed commercial authority | recovery accounting collection/posting may be external | history/evidence bound |
| P07-13 | Replacement/rectification capacity authority | tenant + project + requirement/commitment | **OWN only through valid governed authority event; exact restoration mechanics remain FT-09/CR-02** | domain authority | no silent capacity restoration from irreversible fulfillment | explicit reversal/release/additional authority evidence |

---

## 10. P08 — accounting authority, ERP coexistence and reconciliation

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P08-01 | Integration authority map / field-event ownership profile | tenant + legal entity + integration context | **OWN** | governed configuration | selects one authority per fact/event; connector is never master | version/effective-dated |
| P08-02 | External AP invoice/posting truth | legal entity + external accounting system | **REFERENCE/MIRROR** | ERP/accounting | product may own procurement invoice evidence/match exception, not payable ledger | source/version/freshness |
| P08-03 | Payment/cash settlement truth | external accounting/bank | **REFERENCE/MIRROR** where needed | ERP/bank | no product payment ledger | freshness/source/conflict |
| P08-04 | Job-cost/GL posting fact | external accounting | **REFERENCE/MIRROR** where needed | ERP/accounting | product commercial position remains distinct | source/version/freshness |
| P08-05 | Export/import/sync attempt status | integration context | **OWN** operational metadata | integration service | transport state cannot become business state | immutable/retry/idempotency history |
| P08-06 | Reconciliation result/disposition | tenant + legal entity + source/target | **OWN** reconciliation fact | reconciliation process | classifies data defect, mapping/transport defect, temporal restriction, external-authority return | evidence/history |
| P08-07 | External master-data fact used by domain decision | configured scope | **MIRROR/REFERENCE** | bound external authority | action may require freshness threshold; local corrections target source/mapping, not mirror | source/version/freshness bound |
| P08-08 | GL/AP/cash journals and accounting close | external accounting | **OUT** | accounting system | product may reference status, never implement ledger | external |

---

## 11. P09 — bounded deterministic control plane

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P09-01 | Permission evaluation inputs | tenant + contextual scope | **OWN** | P09 membership/role/config | external grants excluded from internal permission satisfaction | effective-dated |
| P09-02 | Approval policy/DOA evaluation | tenant + legal/project/commercial scope | **OWN** | P09 config + bound historical role/delegation | approval outcome is evidence/input, not commercial state | version-bound |
| P09-03 | Workflow/task operational state | tenant + task/context | **OWN** | bounded workflow/task service | cannot directly write P07/P01–P06 truth | event history |
| P09-04 | Domain transition truth | relevant domain | **OUT from workflow authority**; authority remains domain `OWN` row | domain service only | workflow invokes bounded command; domain revalidates invariants | domain history |
| P09-05 | Compliance/override decision | tenant + domain context | **OWN** bounded control fact | authorized control action | linked evidence may be external reference | actor/reason/effective-policy provenance |

---

## 12. P10 — procurement planning, long-lead and expediting overlay

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P10-01 | Procurement-required/planned milestone | tenant + project + procurement object | **OWN** when product planning is authoritative; **MIRROR/REFERENCE** when master schedule is authority | bound authority profile | no CPM/master schedule ownership | version/effective/freshness |
| P10-02 | Supplier-confirmed forecast date | tenant + supplier + procurement context | **OWN** captured transaction fact | supplier action/buyer capture with provenance | separate from actual | dated revisions |
| P10-03 | Actual procurement milestone date/status | tenant + procurement context | **DERIVED from authoritative domain events** where possible | P01–P12 event source | no duplicate manual actual tracker | reproducible from event history |
| P10-04 | CPM/master project schedule logic | external scheduling system | **OUT** | scheduling authority | bounded date/reference integration only | external |

---

## 13. P11 — commercial closeout, security, warranty and recovery linkage

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P11-01 | Commercial closeout decision/status | tenant + commitment | **OWN** | governed P11/P07 action | accounting cash closeout remains distinct | history/evidence |
| P11-02 | Retention/security release authorization | tenant + commitment | **OWN** commercial decision | authorized commercial action | actual bank/ERP release may be external | effective evidence |
| P11-03 | Bank guarantee/security instrument master record | external bank/legal source | **REFERENCE** | bank/legal authority | product may track obligation/expiry/release dependency only | source/version/expiry |
| P11-04 | Warranty/DLP obligation tracking | tenant + project + supplier/commitment | **OWN** bounded obligation tracking | commercial closeout action | technical/legal master evidence referenced | version/effective dates |
| P11-05 | Legal claim/litigation case management | external legal domain | **OUT** | legal system/counsel | bounded recovery/evidence reference only | external |

---

## 14. P12 — external technical/material approval dependency interface

| ID | Concern / fact / event | Scope | Authority classification | Authoritative source/writer | Correction / representation | History / binding |
|---|---|---|---|---|---|---|
| P12-01 | Procurement dependency/gate relationship to technical approval | tenant + project + procurement object | **OWN** | procurement domain | defines that a named approval is required; does not perform design review | versioned relation |
| P12-02 | Technical/material approval result when consultant/CDE is authority | project + external authority | **REFERENCE/MIRROR** | consultant/CDE/technical authority | product may consume bound status/version/freshness for a deterministic gate | source/version/freshness |
| P12-03 | Supplier-facing technical release copy included in tender | tenant + tender | **OWN** transaction evidence | P03 release action | master source remains external reference | immutable release version |
| P12-04 | Full submittal review/comments/markup/transmittal lifecycle | CDE/design-management domain | **OUT** | external CDE | no CDE replacement | external |

---

## 15. Cross-cutting authority invariants exposed by the inventory

1. Every `OWN` business mutation must occur through a bounded validated domain/service action and preserve required provenance.
2. One load-bearing fact/event has one authoritative writer/source at a time. Authority transfer is governed and effective-dated; indefinite dual-master state is forbidden.
3. `MIRROR` is never an independently editable competing truth. Local correction becomes a request, domain correction at the actual authority, or mapping/transport correction.
4. `REFERENCE` must identify source system/record and preserve enough version/effective/freshness context for the domain decision that consumed it.
5. `OUT` may still have a bounded boundary acknowledgment; it cannot hide an unowned dependency required to explain product truth.
6. Historical tenant/legal-entity/project/authorization/configuration context must remain interpretable using the state/version that governed the event.
7. Internal authorization is tenant/context scoped. External grants cannot satisfy P09 permission, delegation, DOA, compliance or domain-command authorization.
8. External supplier organization and contact business relationships are tenant-private in V1. A cross-tenant supplier network/profile is OUT.
9. Product custody of a supplier submission/evidence record does not assert legal ownership of supplier IP/content.
10. Supplier source submission, buyer normalization, buyer adjustment and supplier-confirmed contractable basis remain distinct.
11. Evidence offboarding/deletion acts on access/account/contact/eligible retained data separately from immutable transaction history; neither destructive-history deletion nor perpetual-retention-by-default is valid.
12. Classification is bounded metadata; it is not an arbitrary tenant-authored policy/retention language.
13. P07 commercial truth is not duplicated in RequirementAllocation, workflow state, evidence metadata, integration status or accounting mirrors.
14. Accounting facts such as GL/AP/payment/job-cost posting remain externally authoritative where the deployment uses an external accounting platform; P08 owns authority mapping and reconciliation, not accounting journals.
15. A0–A3 can terminate at AwardDecision/external handoff without P07 execution, named ERP/CDE integration, persistent supplier portal/network or advanced AI.
16. P07 remains the only independent XL gravity well.

---

## 16. Residual items routed without authority ambiguity

The following remain physically or evidentially open but do not leave the P1.4 authority source ambiguous:

- ADR-0003 structural root: P1.4 defines authority of requirement/package/tender facts but does not choose final physical root.
- ADR-0004 PO/Subcontract/Framework/CallOff type composition: P07 authority is product-owned when activated; physical type hierarchy remains P1.5.
- FT-02/06/10 RequirementAllocation exact mechanics: scope-consumption authority remains a product-domain concern, while exact persistence/conservation mechanics remain falsifiable.
- FT-09/CR-02 rectification capacity restoration: only governed reversible release/reversal/additional authority may affect capacity; exact state mechanics remain pre-implementation work.
- ADR-0011 timing of mandatory financial attribution: source/authority/binding are explicit, exact mandatory transition remains later decision.
- ADR-0015 physical correction/posting model: correction ownership is explicit, exact event structure remains P1.5.
- ADR-0019/0020 physical temporal storage: semantic effective/version binding is required; bitemporal/storage implementation remains later.
- ADR-0022/0023 money/numbering physical rules: authority context is legal-entity/config bound; exact algorithms remain later.

---

## 17. Inventory gate result

**INTERNAL RESULT: AUTHORITY COVERAGE COMPLETE ENOUGH TO DRAFT THE CENTRAL P1.4 CONTRACTS.**

No P01–P12 process or shared load-bearing substrate identified by the closed P1.1–P1.3 inputs remains without an authority source/boundary treatment.

This is not P1.4 PASS. The inventory must still be tested by the hierarchy, identity/grant, evidence/residency, temporal/configuration and accounting/integration contracts, then hostile internal/external audit.

**P1.5 and product code remain LOCKED.**