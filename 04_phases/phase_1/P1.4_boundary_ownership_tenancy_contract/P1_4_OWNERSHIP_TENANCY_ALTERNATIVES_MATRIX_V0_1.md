# P1.4 — Ownership & Tenancy Alternatives Matrix v0.1

**Date:** 2026-07-30  
**Status:** ACTIVE DECISION FRAMING / NOT FROZEN / NO ADR STATUS CHANGE  
**Parent:** `P1_4_WORKPLAN_V0_1.md`  
**Purpose:** compare semantic boundary alternatives before authority freeze or physical schema design.

---

## 1. How to read this matrix

This artifact is an **alternatives matrix**, not the final P1.4 boundary contract.

It exists to expose where apparently convenient modeling choices create:

- cross-tenant leakage;
- duplicate authority;
- supplier-network creep;
- accounting/CDE/BPM gravity;
- historical reinterpretation;
- evidence/offboarding conflicts;
- P07 second-ledger risk;
- A0–A3 activation burden.

No database table, object hierarchy or code structure is selected here.

### Status labels

- **INHERITED DIRECTION** — already bounded strongly by closed/frozen inputs; P1.4 should operationalize, not reopen for breadth.
- **LEADING CANDIDATE** — current best semantic direction, still subject to P1.4 authority inventory and hostile review.
- **OPEN** — material alternatives remain genuinely unresolved.
- **REJECT BOUNDARY** — conflicts with existing frozen/closed constraints unless controlled contradictory evidence reopens them.

### Authority vocabulary

`OWN / MIRROR / REFERENCE / OUT` describes **system authority/custody**, not legal title, IP ownership or contractual property rights.

Authority may be mixed inside one business object at field/fact/event level.

---

# 2. Tenancy and organizational hierarchy alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| T-01 | What is a tenant? | one tenant per human company name | one tenant per legal entity | contractor/customer isolation boundary that may contain multiple legal entities | **LEADING CANDIDATE: C.** Tenant should represent the customer isolation/configuration/security boundary, not automatically equal one legal entity. A/B are too rigid for multi-entity contractors and can force duplicate customer environments. | prove legal-entity/project/accounting authority can remain explicit inside one tenant without leakage or ambiguous ownership |
| T-02 | Can one legal entity belong to multiple tenants? | yes, as normal modeling | only via deliberate migration/controlled special case | never under any circumstance | **LEADING CANDIDATE: B.** Normal dual tenancy would create competing authority/configuration histories. A migration/acquisition scenario may require controlled historical representation, but not simultaneous ordinary ownership. | define effective-dated transfer/migration semantics without rewriting historical transactions |
| T-03 | Company/operating organization vs legal entity | collapse them | distinguish only when accounting demands it | distinguish operating organization/company identity from legal contracting entity where real | **LEADING CANDIDATE: C.** Legal authority, accounting, numbering, tax and project contracting posture can differ from commercial operating identity. | show minimum distinction needed without creating enterprise corporate-master product |
| T-04 | Project legal ownership | project can float across legal entities implicitly | project has one current contracting legal entity with history-preserving controlled change | project may be simultaneously owned by several legal entities without a primary authority | **LEADING CANDIDATE: B.** An explicit current contracting authority is safer; multi-party participation should be modeled as explicit relationship rather than ambiguous co-ownership. | validate JV/branch cases; define historical effect when authority changes |
| T-05 | Branch/business unit posture | each branch/BU is a tenant | each branch/BU is a legal entity | branch/BU is an internal organizational/authority scope unless it is genuinely a separate legal entity | **LEADING CANDIDATE: C.** Avoid tenant and legal-entity inflation. | identify which branch/BU facts can affect DOA, numbering, accounting mapping, access or project assignment |
| T-06 | JV posture | every JV becomes cross-tenant collaboration | every JV becomes a new product tenant | represent the real contracting posture: dedicated legal entity if one exists; otherwise explicit multi-organization relationship bounded to project/commitment context | **OPEN / C LEADS.** No generic JV subsystem should be invented without structural need. | obtain primary/contractual cases if JV behavior becomes required for the V1 beachhead |
| T-07 | Cross-project access inside one tenant | global by default | project-isolated by default with explicit broader internal authority | separate tenant per project | **LEADING CANDIDATE: B.** Tenant isolation is insufficient by itself; internal project scope must remain explicit. C creates adoption/administration burden. | define organization/legal/project scope composition for internal permissions |
| T-08 | Project move between legal entities | mutate current legal entity and forget history | immutable project forever tied to original entity | effective-dated legal-entity relationship with controlled transfer where valid | **LEADING CANDIDATE: C.** Historical approvals/commitments must remain interpretable. | define which transactions remain governed by prior entity after transfer and when new configuration becomes effective |

---

# 3. Internal identity, authorization and external-grant alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| I-01 | Human identity across tenants | duplicate unrelated user identity per tenant | one global human/account identity with tenant-scoped memberships/roles | one global identity whose roles automatically carry across tenants | **LEADING CANDIDATE: B.** Identity reuse may reduce friction, but authorization must remain tenant-scoped. C is a direct leakage risk. | prove no role, delegation, project access or historical authority crosses tenants implicitly |
| I-02 | Internal authorization vs external grants | one generalized authorization model | common principal/audit substrate with separate internal command-authorization and external scoped-grant semantics | fully separate identity/security systems with no common provenance substrate | **LEADING CANDIDATE: B.** Reuse identity/audit primitives but keep policy semantics separate. This directly addresses OBL-P14-01. | hostile test that external grant possession can never satisfy P09 permission/DOA/domain command authorization |
| I-03 | Internal role/DOA scope | user-level static role only | tenant role only | effective-dated membership/role/delegation scoped by tenant and, where required, legal entity/project/business context | **LEADING CANDIDATE: C.** Load-bearing approvals require historical contextual authority. | constrain configuration complexity so this does not become generalized IAM/BPM product |
| I-04 | External guest identity | external guest is an internal user with fewer permissions | task/tender-scoped external principal/grant independent of internal user semantics | mandatory persistent supplier portal account | **INHERITED DIRECTION: B.** P1.3 explicitly rejects assuming guest=internal User and rejects mandatory signup. | decide authentication/account persistence mechanics without changing the semantic boundary |
| I-05 | Persistent external account | required for every supplier action | optional convenience identity that can bind later to prior guest actions when provenance supports it | forbidden; every action must be one-time guest | **LEADING CANDIDATE: B.** Supports low-friction first rail and later convenience. | define safe linking/claiming semantics so historical actions are not falsely re-attributed |
| I-06 | External grant scope | tenant-wide supplier access | tenant + project + tender/task/evidence scoped grant with expiry/revocation | cross-tenant supplier-network membership | **INHERITED DIRECTION: B.** Least-privilege task-scoped access is already carried into P1.4. | define minimum scope dimensions and grant history needed for audit |
| I-07 | Buyer-on-behalf capture | rewrite the submission as if supplier directly authenticated it | record internal acting principal, represented external organization/contact/source channel and source evidence separately | prohibit buyer-on-behalf capture | **INHERITED DIRECTION: B.** P1.2/P1.3 require provenance-preserving buyer-on-behalf paths. | define representation semantics without granting the buyer external-party identity |
| I-08 | Revocation effect | revocation deletes supplier submissions/evidence | revocation removes future capability/access while historical actions/evidence remain attributable | revocation leaves access active to historical transaction data forever | **LEADING CANDIDATE: B.** Access state and transaction history must be separable. | align with evidence retention and offboarding contract |

---

# 4. External organization and cross-tenant supplier identity alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| X-01 | External organization persistence | tenant-local supplier organization only | neutral reusable external organization identity plus tenant-private relationship/history | global supplier-network organization with shared qualification/history | **OPEN; B is the leading candidate to test.** A maximizes isolation but duplicates identity; C violates supplier-network boundary. B is viable only if shared data is identity-neutral and operational history remains tenant-private. | define exactly which neutral attributes, if any, may cross tenant boundaries and who can change them |
| X-02 | Supplier qualification reuse | automatically shared across tenants | always tenant-specific even if external identity is reused | shared only through explicit external evidence/reference selected by each tenant | **LEADING CANDIDATE: C/B hybrid.** Tenant decision/eligibility stays tenant-specific; a tenant may reference reusable external evidence without inheriting another tenant's conclusion. | distinguish evidence reuse from evaluation/approval reuse |
| X-03 | Supplier price/bid history reuse | global across customers | tenant-private | supplier-controlled public catalogue/network data automatically available to all | **REJECT A/C as default. LEADING: B.** Cross-tenant commercial history is highly sensitive and not required for first rail. | define no-leak invariant in authority inventory |
| X-04 | External contact reuse | shared contact identity may be linked to several organizations/tenants with private relationships | duplicate contact records per tenant only | one global contact record including all tenant interactions | **OPEN; A leads if privacy/isolation can be preserved.** | define what identity fields are neutral vs tenant-derived; ensure one tenant cannot discover another relationship |
| X-05 | Cross-tenant access grant reuse | one supplier grant usable across customer tenants | every grant is tenant-scoped even if identity is shared | network membership grants baseline access everywhere | **LEADING CANDIDATE: B.** Grant reuse across tenants is incompatible with least privilege. | formal tenant isolation invariant |
| X-06 | External organization deletion/offboarding | delete organization and all transaction evidence | deactivate/revoke tenant relationship; preserve required historical transaction attribution; minimize eligible contact/account data | maintain perpetual active supplier profile | **LEADING CANDIDATE: B.** | align with retention/residency/legal basis |

---

# 5. Evidence ownership, immutable history and external authority alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| E-01 | Transaction evidence custody | reference everything externally | own governed transaction evidence/provenance while referencing externally authoritative systems | own every project document/CDE record | **INHERITED DIRECTION: B.** P1.3 bounded evidence as L shared substrate. A loses audit strength; C creates CDE gravity. | authority inventory must classify evidence by source/domain and external authority |
| E-02 | Supplier quote/revision truth | buyer normalized representation becomes canonical | supplier source submission/revision remains immutable source truth; buyer normalization/adjustment is separate | mutable quote record edited in place | **INHERITED DIRECTION: B.** | preserve source lineage through tenancy/offboarding and buyer-on-behalf capture |
| E-03 | External CDE/ERP/bank/legal evidence | copy and own as primary | reference external authoritative record; mirror only bounded facts when operation requires it | ignore external authority and store free-text note only | **INHERITED DIRECTION: B.** | define source/version/freshness minimum so later audit remains interpretable |
| E-04 | Evidence supersession | edit prior evidence in place | append new version/supersession lineage; preserve prior evidence | delete prior version once new version arrives | **LEADING/INHERITED: B.** | define supersession semantics across supplier, buyer-on-behalf and externally referenced records |
| E-05 | What `OWN` means for external-party evidence | product legally owns supplier content/IP | product is system authority/custodian for captured transaction record and provenance; legal ownership remains contractual/legal matter | supplier remains sole system authority so product stores no immutable copy | **LEADING CANDIDATE: B.** This distinction prevents authority vocabulary from overreaching into legal title. | make wording explicit in final contract and customer terms assumptions |
| E-06 | Audit history of external grants | no durable grant history | bounded immutable/reconstructable grant issuance/revocation/use history tied to governed actions | full enterprise security event/SIEM archive | **LEADING CANDIDATE: B.** C exceeds scope. | define minimum history needed for non-repudiation without security-platform gravity |

---

# 6. Immutable evidence versus offboarding, deletion and retention alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| L-01 | Tenant offboarding | hard-delete all tenant data immediately | controlled offboarding: revoke access, export/return where contracted, retain only data with defined basis, preserve required immutable transaction history in locked/non-operational state | retain full live tenant forever | **LEADING CANDIDATE: B.** Directly addresses OBL-P14-02 without destructive history or perpetual storage. | define categories that may be deleted/minimized vs must remain for bounded retention |
| L-02 | User/contact deletion | remove actor identity from historical transactions entirely | remove/minimize mutable account/contact data where permitted while preserving stable historical attribution/provenance needed to explain actions | retain full profile/contact data indefinitely | **LEADING CANDIDATE: B.** | require legal/privacy review before freeze where personal-data treatment depends on law |
| L-03 | Supplier relationship offboarding | erase prior bids/awards/evidence | revoke future access and relationship status; retain governed historical evidence under defined basis | keep supplier active and visible forever | **LEADING CANDIDATE: B.** | define relationship state vs evidence state |
| L-04 | Retention control | no retention model | bounded fixed/product/contractual retention categories with explicit basis and expiry/disposition | tenant-authored arbitrary retention/classification language | **LEADING CANDIDATE: B.** C is the forbidden records-management/policy engine. | determine whether V1 needs limited configurable durations or only contractual system defaults plus explicit overrides |
| L-05 | Expiry/disposition of immutable evidence | destructive auto-delete regardless of open obligation | disposition only when retention basis expires and no active contractual/legal/audit dependency remains; preserve a disposition audit record | never delete anything | **OPEN; B leads.** | current authoritative UAE/GCC legal/contractual evidence required before final rule claims |
| L-06 | Historical proof after eligible personal-data minimization | history becomes anonymous/unexplainable | preserve transaction actor token/role/org/time and necessary non-sensitive provenance while minimizing eligible direct contact/account fields | retain all personal attributes as evidence | **OPEN; B leads.** | privacy/legal verification and hostile audit |

---

# 7. Data residency and regional-boundary alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| R-01 | Residency scope | no explicit residency semantics | tenant-level provisioning/residency region with controlled exceptions for external references and explicit controlled migration | every project/legal entity can freely choose independent storage region | **OPEN; B is leading candidate.** A risks late redesign; C creates operational/configuration burden and cross-region complexity. | obtain current authoritative legal/contractual requirements; test multi-entity contractor needs |
| R-02 | External authoritative systems in other regions | copy all data locally to satisfy product residency | preserve reference/mirror semantics and declare external authority/location/freshness; do not imply product controls external residency | reject any integration outside product region | **LEADING CANDIDATE: B.** | final contract must distinguish product-hosted residency from external-system residency |
| R-03 | Region change | silently move current and historical data | controlled migration with authorization, evidence, effective date and historical configuration provenance | region can never change | **LEADING CANDIDATE: B.** | define which in-flight operations block migration and how external references are handled |
| R-04 | Cross-region tenant analytics/network | centralize all tenant data globally | tenant-private analytics within declared residency boundary; cross-tenant aggregation outside V1 unless explicit lawful/contractual product design exists | network-wide supplier analytics by default | **LEADING CANDIDATE: B.** | one-XL/privacy/adoption hostile check |

No UAE/GCC legal rule is asserted by this matrix. Residency freeze requires current authoritative regulatory/contractual evidence where the decision depends on law.

---

# 8. Sensitivity/access classification alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| C-01 | Store classification metadata? | no classification field at all | store bounded sensitivity/access classification as transaction/evidence metadata | build arbitrary tenant-defined classification taxonomy/rules engine | **INHERITED DIRECTION: B.** P1.3 permits recorded attribute but refuses policy-engine expansion. | define bounded allowed semantics and provenance |
| C-02 | How classification affects access | classification is informational only | fixed deterministic product checks may consume the recorded value together with normal authorization | tenant-authored rule language can rewrite permissions dynamically | **LEADING CANDIDATE: B.** C creates generalized policy/BPM gravity. | prove classification cannot bypass or duplicate internal authorization model |
| C-03 | Retention from classification | classification automatically creates arbitrary retention policies | classification may map only to bounded product/contractually defined handling where explicitly supported | full records-management disposition engine | **OPEN; B leads if needed.** | keep retention basis explicit and separate from generic classification rules |
| C-04 | Classification history | overwrite current label | preserve assignment/change provenance where load-bearing | store every information-governance event across enterprise | **LEADING CANDIDATE: B.** | define when label history materially affects transaction access/audit |

---

# 9. Effective-dated configuration and in-flight binding alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| D-01 | Historical authority lookup | always resolve current config | snapshot every configuration value into every transaction | effective-dated/versioned governing configuration with explicit binding at load-bearing decision/event points | **LEADING CANDIDATE: C.** A rewrites history; B over-duplicates and can drift. | define which configurations require binding and which can remain current presentation values |
| D-02 | In-flight approval/DOA change | live policy change silently alters pending case | freeze full tenant configuration at case creation | bind relevant policy/version and define controlled migration/re-evaluation semantics | **LEADING CANDIDATE: C.** | decide when policy changes can affect pending cases and how that is evidenced |
| D-03 | Role/delegation history | only current membership retained | snapshot actor title text only | effective-dated membership/role/delegation context sufficient to reproduce authorization | **LEADING CANDIDATE: C.** | avoid turning into HR master system; store only authorization-relevant context |
| D-04 | Legal entity/project relation change | current relation only | immutable relation forever | effective-dated relation; historical transactions retain governing relation | **LEADING CANDIDATE: C.** | align with T-04/T-08 and accounting/numbering authority |
| D-05 | Integration authority-map change | newest map applies retroactively | copy full map into each record | version/effective-date authority map; sync/reconciliation events retain governing mapping/version | **LEADING CANDIDATE: C.** | define reconciliation after map changes |
| D-06 | Residency/configuration-region change | current region only | immutable tenant region forever | effective-dated controlled migration event plus retained historical region/config provenance | **LEADING CANDIDATE: C.** | align with R-03; legal evidence where required |
| D-07 | Physical temporal model | full bitemporal architecture everywhere | effective dating only | selective valid-time/transaction-time where needed | **OPEN / DEFER PHYSICAL FORM TO P1.5.** P1.4 should freeze semantic historical interpretability, not storage implementation. | identify irreducible facts requiring both effective and recorded time |

---

# 10. `OWN / MIRROR / REFERENCE / OUT` authority-model alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| A-01 | Authority granularity | one label per whole entity | label per module | label at load-bearing object/fact/field/event grain | **LEADING CANDIDATE: C.** ADR-0021 exists because entity-level ownership is insufficient for mixed records. | authority inventory must prove granularity is no finer than necessary but fine enough to prevent dual masters |
| A-02 | Can one fact have two authoritative writers? | yes, last-write-wins | yes, with sync conflict resolution | no; one authoritative writer/source at a time, with governed authority transfer if needed | **LEADING CANDIDATE: C.** | define authority transfer/migration semantics |
| A-03 | Mirror editability | local users may edit mirrored facts and sync later | local edits become change requests/exception workflow against external authority, not direct competing truth | mirrors are always read-only and no correction path exists | **LEADING CANDIDATE: B.** Some operational correction request is needed without dual authority. | distinguish domain correction from integration/mapping correction |
| A-04 | Reference content | store only URL/free-text | store external system/record identity plus load-bearing version/effective/freshness/provenance metadata | copy full external record and call it reference | **LEADING CANDIDATE: B.** | domain-specific minimum reference metadata |
| A-05 | OUT meaning | product has no knowledge at all | outside authority; bounded interface/existence acknowledgement may still be recorded | silently mirror selected facts | **LEADING CANDIDATE: B.** OUT must not prevent explicit seam design. | ensure OUT is not used to hide an unowned load-bearing dependency |
| A-06 | Authority transfer between systems | overwrite current authority flag | effective-dated governed authority transfer with reconciliation/cutover evidence | dual-master period indefinitely | **LEADING CANDIDATE: B.** | migration/cutover hostile test |

---

# 11. Accounting and integration authority alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| F-01 | Overall accounting posture | product owns GL/AP/cash | external accounting system owns all financial/commercial facts | split authority: product owns required procurement/commercial truth; external accounting owns accounting facts; selected facts are mirrored/referenced with reconciliation | **LEADING CANDIDATE: C.** A violates one-XL boundary; B cannot support P07 commercial truth. | field/event authority inventory across commitment, certification, invoice, retention, payment, job cost and posting status |
| F-02 | Commitment authority | ERP PO/contract record always canonical | product P07 effective commitment/change truth canonical where P07 activated; ERP accounting/posting representation is mirror/reference according to deployment | dual editable commitment in both | **LEADING CANDIDATE: B for activated P07, subject to final P1.4/P1.5 seam.** | ensure A0–A3 does not require P07 or ERP |
| F-03 | Invoice authority | product full AP invoice lifecycle | ERP/accounting invoice truth is external; product owns only procurement evidence/match/exception facts needed for its domain | both systems edit payable invoice | **LEADING CANDIDATE: B.** | primary deployment cases; distinguish invoice evidence from AP posting/payment |
| F-04 | Payment authority | product payment ledger | external accounting/bank authority; product references/mirrors status only where useful | product and ERP both maintain editable payment status | **LEADING CANDIDATE: B.** | define freshness and reconciliation semantics |
| F-05 | Retention/advance/commercial position | all positions owned only in ERP | P07 derives contractual/commercial positions from governed commercial events; accounting representations may mirror/reference | independently edited product balance alongside ERP | **LEADING CANDIDATE: B.** | no-second-ledger audit; exact accounting ownership remains field/event specific |
| F-06 | Connector authority | connector/middleware is master because it transformed data | source domain remains authority; connector records transport/mapping/reconciliation state only | whichever system last synchronized wins | **LEADING CANDIDATE: B.** | integration contract must separate transport status from business truth |
| F-07 | Sync rejection | mutate commercial truth until ERP accepts | classify rejection: data defect, mapping/transport defect, temporal restriction, external-authority return; correct at authoritative source or mapping layer | ignore failure and keep stale silent copy | **INHERITED/LEADING: B.** | authority-specific correction ownership |
| F-08 | Stale mirror behavior | no freshness metadata | freshness/source/version/conflict state explicit where mirror/reference affects decisions | block all product use whenever external system is not real-time | **LEADING CANDIDATE: B.** | define which actions require fresh data vs can proceed with warning/block rules |
| F-09 | Named integration prerequisite for A0–A3 | required | optional; CSV/manual/reference setup can coexist with later connector | product builds one universal ERP first | **INHERITED DIRECTION: B.** Frozen target requires zero bespoke named connectors before first live tender. | first-rail burden audit |

---

# 12. Budget, cost structure and project/accounting-master alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| B-01 | Budget/cost structure system authority | always product-owned | always ERP-owned | deployment-specific OWN/MIRROR/REFERENCE by fact, with project/legal-entity binding and historical version/freshness | **OPEN; C leads.** P1.2 supports coexistence but exact deployment remains unresolved. | authority inventory plus primary contractor deployment cases |
| B-02 | Budget required before first sourcing | yes, always | no financial attribution ever required | sourcing can start from allowed requirement/planning basis; mandatory attribution timing is governed before the relevant commercial transition | **OPEN.** ADR-0011 remains proposed; P1.4 should constrain authority not silently close timing mechanics. | preserve A0–A3 usability and later P07/accounting coherence |
| B-03 | Cost-code change | current code silently reclassifies history | historical transaction keeps bound cost context; later governed reclassification is separate | immutable cost structure forever | **LEADING CANDIDATE: B.** | coordinate ADR-0011/0019 and integration authority |

---

# 13. Technical/CDE and evidence-reference authority alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| P-01 | Technical/material approval record | product owns full submittal workflow/CDE | product owns procurement-critical dependency/gate fact and references authoritative CDE/review evidence where external | product ignores technical dependency | **INHERITED DIRECTION: B.** | authority inventory for approval status, evidence/version and gating transition |
| P-02 | Drawing/specification source | product becomes master document store | external CDE/document system REFERENCE; product may own tender-release copy/version actually sent to supplier | always live-link to latest external drawing with no release snapshot | **LEADING CANDIDATE: B.** | prevent later external document change from rewriting historical tender basis |
| P-03 | Correspondence | full correspondence platform | bounded capture/reference where correspondence becomes governed transaction evidence | none | **LEADING CANDIDATE: B.** | define when an email/letter becomes transaction evidence vs ordinary correspondence OUT |

---

# 14. P07 boundary and second-ledger alternatives

| ID | Decision | Alternative A | Alternative B | Alternative C | Current evaluation | P1.4 proof/gate needed |
|---|---|---|---|---|---|---|
| G-01 | RequirementAllocation stores commercial balance | yes | owns procurement-scope consumption only; commercial value/budget truth remains separate | no allocation authority at all | **INHERITED DIRECTION: B, but exact mechanics remain falsifiable under FT-02/06/10.** | ensure authority inventory never makes allocation a universal ledger/root |
| G-02 | Workflow approval state stores commercial truth | approval task completion directly writes financial/commercial state | approval outcome authorizes a bounded domain command that revalidates invariants; domain event owns resulting truth | no workflow/approval representation | **LEADING/INHERITED: B.** | internal/external auth hostile test |
| G-03 | Integration state stores business balance | sync status becomes authoritative commercial position | integration state is operational metadata only; underlying domain/accounting authority remains separate | no integration state | **LEADING CANDIDATE: B.** | no-second-ledger audit |
| G-04 | Evidence metadata stores business state | document/evidence labels become commitment/payment state | evidence links support domain events; domain events/authoritative external facts own business state | no evidence linkage | **LEADING CANDIDATE: B.** | audit against CDE/records-management gravity |
| G-05 | P07 relationship to first rail | P07 required before first tender/award | A0–A3 can terminate at AwardDecision/external handoff; P07 activates later | remove P07 from architecture entirely | **INHERITED DIRECTION: B.** | activation burden gate |

---

# 15. Consolidated leading semantic direction — not yet frozen

The alternatives above currently converge on the following **candidate boundary shape** for testing, not final architecture:

1. **Tenant = customer isolation/configuration/security boundary**, capable of containing multiple legal entities where real.
2. **Legal entity and project authority remain explicit**, with effective-dated history where relationships can validly change.
3. **Branch/BU is not automatically a tenant or legal entity**; it is an organizational/authority scope unless reality requires stronger status.
4. **Internal human identity may be reusable, but tenant membership/role/delegation is tenant-scoped and historically interpretable.**
5. **Internal command authorization and external grants share only bounded principal/audit primitives; their authorization semantics remain separate.**
6. **External grants never authorize internal domain commands or satisfy DOA.**
7. **Persistent supplier identity is optional**, not required for first participation.
8. **Cross-tenant supplier operational data remains private.** A neutral reusable external organization/contact identity may be tested only if it cannot reveal tenant relationships or inherit qualification, bids, evidence or grants.
9. **Product owns governed transaction evidence/provenance; external CDE/ERP/bank/legal/master records remain references or narrow mirrors where externally authoritative.**
10. **Immutable transaction history is separated from mutable account/contact/access data**, enabling offboarding/minimization without rewriting commercial history.
11. **Retention must have an explicit basis; perpetual retention and indiscriminate destructive deletion are both rejected directions.**
12. **Residency should be an explicit tenant-level boundary with controlled migration/external-reference semantics**, subject to current authoritative legal/contractual evidence before freeze.
13. **Sensitivity/access classification remains bounded recorded metadata**, not a tenant-programmable information-governance engine.
14. **Effective-dated/version-bound configuration is the leading semantic model** for load-bearing authority, while physical bitemporal/storage choices remain later work.
15. **`OWN / MIRROR / REFERENCE / OUT` applies at load-bearing fact/field/event grain**, with one authoritative writer/source at a time.
16. **Accounting coexistence uses split authority**: procurement/commercial truth owned where the product must govern it; accounting posting/AP/payment/job-cost facts owned externally where applicable; no duplicate editable ledger.
17. **Connectors are transport/reconciliation mechanisms, never business authority by themselves.**
18. **P07 remains the sole independent XL gravity well.** P08/P09/evidence/tenancy/integration must remain bounded supporting substrates.
19. **A0–A3 remain usable without P07, ERP/CDE connector, mandatory supplier network or advanced AI.**

Every item above remains subject to the load-bearing authority inventory, evidence check, internal hostile audit and external hostile review before P1.4 PASS.

---

# 16. Immediate next artifact

Next, create the load-bearing authority inventory across P01–P12 and shared substrates.

The inventory should test this matrix against actual semantic objects/facts/events before any alternative is promoted into the central `OWN / MIRROR / REFERENCE / OUT` contract.

**Do not begin P1.5, database design or product code.**
