# P1.5 — Load-Bearing SPINE Lifecycle Matrix v0.1

**Date:** 2026-07-30  
**Status:** COMPLETE CANDIDATE COVERAGE / NOT FROZEN  
**Parent audit blocker:** BL-P15-04  
**Product code:** LOCKED

---

## 1. Purpose

Close the P1.5 lifecycle gate at semantic level for every load-bearing P01–P12 transaction/control family.

Each transition records:

- semantic source state;
- command/action;
- key guards;
- authority/control;
- resulting event/state;
- economic effect;
- reversibility/correction;
- concurrency/idempotency;
- evidence/version binding.

Projection-only and external-interface concepts are explicitly marked rather than given fake aggregate lifecycles.

This is not a UI status list or database state column design.

---

## 2. Common legend

Economic effect:

- `NONE`
- `SCOPE`
- `OBLIGATION`
- `FULFILMENT`
- `CLAIM`
- `ASSESSMENT`
- `CERTIFICATION`
- `RELEASE`
- `RECOVERY`
- `CLASSIFICATION`
- `EXTERNAL_ACCOUNTING`

Correction shorthand:

- `SUPERSEDE` — new version/decision replaces current interpretation without deleting history;
- `REVERSE` — explicit negating/physical reversal where legitimate;
- `FORWARD_ADJUST` — later-period economic correction;
- `RECLASSIFY` — zero-net economic attribution transfer;
- `NO_DIRECT_EDIT` — correction only via governed path.

All state-changing commands inherit current security + bound policy + domain revalidation + idempotency/concurrency rules.

---

# 3. P01 — Requirement source / allocation / package

| Family | From | Command / action | Key guards | Authority | Result | Economic | Reversal / correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Requirement basis | absent/draft | EstablishRequirementBasis | valid project/authority/source | P01 domain authority | basis effective | SCOPE basis | governed revise/cancel if unused | single-effect source identity | source/version/effective context |
| Requirement basis | effective | ReviseRequirementBasis | valid authority; downstream impact assessed | P01 domain authority | new basis version effective | SCOPE +/- | SUPERSEDE; downward reconciliation | expected version | old/new basis + reason |
| Requirement basis | effective | RetireRequirementBasis | no unresolved incompatible downstream use or explicit disposition | P01 authority | retired/no new allocation | SCOPE availability | new basis event if restored | version check | disposition evidence |
| Allocation | absent | CreateAllocationLeaf | valid effective source; capacity available | P01 domain action | allocation leaf active | SCOPE reserved/consumed | release/reconcile | atomic conservation | source basis + partition/qty |
| Allocation | active | SplitAllocation | conservation; child basis exact | P01 domain action | parent inactive; children active | SCOPE redistribution | merge/reconcile history | multi-leaf atomicity | split mapping |
| Allocation | active set | MergeAllocation | compatible source/scope; no conflicting bindings | P01 domain action | merged leaf active | SCOPE redistribution | split/reconcile | multi-leaf atomicity | merge lineage |
| Allocation | active | BindToSourcing/Award/Commitment | valid non-overlap/current scope | owning downstream domain + P01 invariant | binding effective | SCOPE binding | controlled release/rebind | atomic with downstream effect where required | binding source/version |
| Allocation | bound | Release/ReconcileAllocation | valid downstream cancellation/reduction/reversal | P01 domain action | scope released/reassigned | SCOPE | history preserved | atomic conservation | reason/source event |
| Package | absent/draft | CreatePackage | valid project/grouping scope | P01 user/domain | package active | NONE | archive/cancel | stable identity | package basis |
| Package | active | ReviseMembership | no false ownership; allocation lineage preserved | P01 | membership version | NONE | SUPERSEDE | version check | membership history |
| Package | active | Archive/ClosePackage | downstream references remain valid | P01 | inactive/closed grouping | NONE | reopen if policy allows | version check | close reason |

FT-02/06/10 exact allocation mechanics remain falsifiable; lifecycle supports conservation without claiming universal practitioner implementation.

---

# 4. P02 — Supplier relationship / qualification / eligibility

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Supplier relationship | absent | EstablishTenantSupplierRelationship | valid tenant/external org identity | P02 | relationship active | NONE | deactivate, do not erase history | uniqueness in tenant | source/contact provenance |
| Supplier relationship | active | UpdateRelationshipFacts | field authority respected | P02 / external source profile | new relationship version | NONE | SUPERSEDE | version check | field source/version |
| Supplier relationship | active | Deactivate | valid authority; open transaction implications handled | P02 | inactive for ordinary new use | NONE | reactivate via new action | version check | reason/time |
| Qualification evidence | absent/current | Record/RefreshEvidence | valid source/provenance | P02/evidence substrate | evidence current/expired/superseded | NONE | SUPERSEDE | source identity | evidence version/expiry |
| Eligibility | unevaluated | EvaluateEligibility | context + required evidence/rules available | P02 domain decision | eligible/restricted/ineligible/exception state | NONE | reevaluate on context/evidence change | idempotent evaluation basis | rule/evidence/context version |
| Eligibility | prior result | ReevaluateEligibility | material source/rule/context change | P02 | new dated result | NONE | prior result remains historical | basis hash/version | full prior/new basis |
| Eligibility override | blocked | ApproveBoundedException | exception type allowed; authority/evidence | P09/P02 | eligible-by-exception for scoped action | NONE | expire/revoke prospectively | single exception identity | approver/reason/scope |

Eligibility is contextual; no global supplier status truth is inferred across tenants/projects.

---

# 5. P03 — Tender event / release / addenda

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| TenderEvent | draft | OpenTender | valid allocation/scope/context/deadlines | P03 | tender open | NONE | cancel/close; no history deletion | version/idempotency | governing scope/config |
| TenderRelease | prepared | IssueRelease | content complete; authority; tender open | P03 | immutable release vN issued | NONE | superseding addendum/release only | one issue per logical revision | exact issued copy/source |
| Tender | open | IssueAddendum | valid change; participant handling rule | P03 | new addendum/release version | NONE | further addendum | version check | supersession lineage |
| Tender | open | ExtendDeadline | authority; fairness/rule checks | P03 | deadline version changed | NONE | SUPERSEDE | version check | reason/effective notice |
| Tender | open | CloseTender | close condition/time reached | P03 | closed to ordinary responses | NONE | reopen only governed policy | state/version | close time/rule |
| Tender | open/closed | CancelTender | valid authority; downstream awards absent/dispositioned | P03 | cancelled | NONE | new tender, not edit | idempotent cancel | reason/evidence |
| Tender | closed/cancelled | Retender | new sourcing decision/scope basis | P03/P06 | new TenderEvent | NONE | separate lifecycle | new identity | predecessor linkage |

---

# 6. P04 — Participation / bid submission

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Participant | candidate | Invite/GrantAccess | eligibility + tender scope | P03/P04 + external grant | invited/access active | NONE | revoke future access | scoped grant idempotency | invite/grant provenance |
| Participant | invited | RecordIntent | valid participant/source | supplier or buyer-on-behalf | intends/declines | NONE | new dated intent where allowed | one current intent projection | actor/channel |
| Participant | open | SubmitBidRevision | tender open/allowed; source provenance | supplier/external grant or buyer-on-behalf | immutable BidSubmission vN | NONE | new revision only | supplier revision identity | exact source/evidence |
| Participant | prior bid | WithdrawBid | policy/tender allows | supplier/source authority | withdrawal fact | NONE | later submission only if rule allows | version/state | source actor/time |
| Participant | no bid | DeadlinePasses | deadline/tender close | deterministic derivation | non-response projection | NONE | changes if valid late/reopened response | derived | deadline + absence proof |
| External grant | active | Revoke/ExpireGrant | expiry/revocation condition | grant owner | future access removed | NONE | new grant required | grant identity | revoke evidence |

---

# 7. P05 — Normalization / comparison

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Normalization | none/current | MapBidToComparison | source bid revision + schema version | P05 buyer | normalized mapping set | NONE | new mapping version | version/basis check | source+mapping provenance |
| Evaluation adjustment | none/current | Add/ReviseAdjustment | supported adjustment type; reason/evidence | P05 buyer | adjustment version | NONE | SUPERSEDE | version check | actor/reason/source |
| Comparison | working | FreezeSnapshot | required bids/mappings/policy available | P05 | immutable ComparisonSnapshot | NONE | new snapshot for reevaluation | basis identity | schema/FX/tax/source versions |
| Comparison | snapshot current | Reevaluate | material new bid/addendum/policy or approved reason | P05 | new snapshot | NONE | old remains historical | current basis check | predecessor/reason |
| Comparison | current | Close/ArchiveEvaluation | award/rejection outcome or abandonment | P05 | no further ordinary edits | NONE | new evaluation/snapshot if reopened | version | disposition |

---

# 8. P06 — Recommendation / approval / award

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Recommendation | draft | SubmitRecommendation | current snapshot + contractable supplier basis | P06 | recommendation pending approval | NONE | revise/supersede | version check | snapshot/bid refs |
| Recommendation | pending | Revise/Withdraw | policy allows; no effective award conflict | P06 | new version/withdrawn | NONE | SUPERSEDE | version | reason |
| ApprovalCase | created | RecordApprovalOutcome | bound policy/current auth | P09 | approval result | NONE | new outcome only through policy path | parallel approval semantics | policy/actor/time |
| Award | approved-ready | MakeAwardDecisionEffective | valid recommendation + approvals + current basis | P06 domain command | AwardDecision effective | NONE | supersede/withdraw only governed | idempotent + version | full decision basis |
| Award | effective pre-commitment | Withdraw/SupersedeAward | authority; no conflicting commitment or explicit disposition | P06 | award withdrawn/superseded | NONE | new award decision | state/version | reason/impact |
| Award | effective | HandoffExternally | handoff contract/evidence | P06 | external handoff fact | NONE | correction/amend handoff record | idempotent handoff | payload/version boundary |

Award remains non-economic until separate commitment obligation becomes effective.

---

# 9. P07A — Terms authority / commitment formation / minimum obligation

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Terms authority | draft | MakeTermsAuthorityEffective | valid counterparty/terms/evidence/authority | P07 | terms version effective | NONE ordinarily | superseding terms version | idempotent/version | exact terms/evidence |
| Terms authority | effective | ReviseTermsAuthority | contract permits; future/in-flight treatment explicit | P07 | new terms version | NONE ordinarily | SUPERSEDE | version | old/new applicability |
| Terms authority | effective | Expire/TerminateTerms | validity/end condition | P07 | no new ordinary call-offs under version | NONE | new authority required | state | end evidence |
| Minimum obligation | none | MakeMinimumCommitmentEffective | enforceable monetary minimum proven | P07 | linked minimum Commitment effective | OBLIGATION | change/release/settlement | idempotent | terms version/evidence |
| Minimum obligation | effective | CreditQualifyingCallOff | valid call-off + qualification rule | P07 derivation/effect | minimum qualification credit | OBLIGATION floor offset | correction if qualification error | component/value uniqueness | call-off/terms basis |
| Minimum obligation | effective | Settle/ReleaseResidualMinimum | expiry/contract rule/authority | P07 | residual obligation settled/released | RELEASE/OBLIGATION | correction path | idempotent | settlement evidence |
| Commitment | pre-effective | MakeCommitmentEffective | allocation/terms/counterparty/DOA/evidence/money | P07 domain command | Commitment effective + baseline | OBLIGATION | later change/correction/end | idempotent + atomic allocation | formation basis |
| Commitment | pre-effective | AbandonDraft | no effective obligation | P07/user control | draft ended | NONE | new draft/new command | version | reason |

---

# 10. P07B — Change / instruction

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Change | proposed | SubmitChangeForApproval | valid commitment/basis | P07 | change pending | NONE authoritative | revise/withdraw | version | proposal/evidence |
| Change | pending | MakeChangeEffective | approval + scope/value/current version/contract rule | P07 domain command | CommitmentChanged | OBLIGATION +/- | correction/new change | idempotent/version | full change basis |
| Change | pending | Reject/WithdrawChange | authority/party action | P07/control | rejected/withdrawn | NONE | new proposal | state | reason |
| Instruction | proposed | MakeInstructionEffective | issuer authority + scope/contract rule | P07 domain command | instruction effective | SCOPE/provisional authority | supersede/reconcile | idempotent/current version | issuer/evidence |
| Instruction | effective | RecordProvisionalValuationAuthority | named contractual basis | P07 | provisional valuation basis active | NONE itself | supersede | version | rule/version |
| Instruction | effective | ReconcileToAgreedChange | supplier agreement + approvals/current history | P07 | effective change linked to instruction | OBLIGATION/VALUATION | correction later | idempotent | instruction+agreement lineage |

---

# 11. P07C — Goods fulfilment

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Delivery | expected | RecordDeliveryEvidence | commitment/component/source | P07/evidence | delivered evidence | NONE | amendment/supersede evidence | source identity | delivery docs |
| Receipt | open | RecordGoodsReceipt | qty/UOM/tolerance/component/technical gate | P07 domain command | accepted/rejected receipt effects | FULFILMENT | return/physical reversal/correction | quantity atomicity/idempotency | receipt evidence |
| Receipt | accepted | RecordReturn | real return + authority | P07 | returned/reversed fulfilment | FULFILMENT reversal | correction if error | cumulative qty guard | return evidence |
| Receipt | rejected | Reinspect/AcceptLater | valid new evidence/state | P07 | new acceptance/rejection event | FULFILMENT | later correction | version | evidence |
| Fulfilment component | open | CloseFulfilmentComponent | commitment/component disposition satisfied | P07 | component fulfilment closed | NONE | reopen only governed | state | disposition |

Receipt does not itself create AP/payment truth.

---

# 12. P07D — Claim / assessment / certification / retention / advance

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Claim | draft | SubmitClaimRevision | valid commitment/period/source | supplier provenance | claim revision effective | CLAIM | new revision/withdraw if permitted | revision identity | source docs |
| Claim | submitted | Withdraw/SupersedeClaim | policy/source action | supplier provenance | withdrawn/new revision | CLAIM projection | SUPERSEDE | state | actor/reason |
| Claim | submitted | ReturnForInformation | control policy | P07/P09 | workflow return | NONE | resubmit/revise | task state | request evidence |
| Assessment | draft | MakeAssessmentEffective | claim/evidence/valuation basis/current commitment | buyer authority | assessment effective | ASSESSMENT | supersede/correct | version | calculation/evidence |
| Assessment | effective | SupersedeAssessment | new evidence/error/approved reason | buyer authority | new assessment | ASSESSMENT | old retained | version | predecessor/reason |
| Certification | draft | SubmitCertificationForApproval | valid assessment/calculation | P07/P09 | approval pending | NONE | recalc/resubmit | version | policy/calculation version |
| Certification | approved-ready | MakeCertificationEffective | DOA/live auth/component caps/money/period/current version | P07 domain command | certification event + effect vectors | CERTIFICATION | correction only | idempotent/atomic component effects | evidence/policy/calculation |
| Certification | effective | CorrectCertification | classified error + period/authority | P07 correction command | reversal/replace/forward adjustment | CERTIFICATION +/- | correction of correction by new history | target effect uniqueness | correction evidence |
| Retention | outstanding | ReleaseRetention | release condition/authority/outstanding amount | P07 | release effect | RELEASE | correction | idempotent | release evidence |
| Advance | active | ApplyRecoupment | terms/certificate basis/cap | P07 certification calculation | negative advance effect | CERTIFICATION component | correction | component cap | terms/calc policy |
| Advance | outstanding | Release/CorrectAdvance | valid terms/authority | P07 | release/correction effect | RELEASE | new correction | idempotent | basis/evidence |
| Allowance | available | ConsumeAllowance | valid instruction/change/component | P07 | allowance consumption | OBLIGATION/VALUATION context | correction/release | cap check | basis linkage |

---

# 13. P08 — Accounting/reconciliation interface

P08 is interface/reconciliation state, not a second commercial lifecycle.

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Export/handoff | ready | SendAccountingPayload | authority map/current source data | P08 | sent/ack pending | NONE product economics | retry same payload identity | idempotent transport | payload/version |
| External posting ref | unknown/pending | RecordExternalAcceptance/Posting | authenticated source/authority | external authority + P08 mirror | accepted/posted mirror | EXTERNAL_ACCOUNTING | source update/correction | external record identity | source/version/freshness |
| External rejection | pending | RecordExternalRejection | source response | external authority + P08 | rejection classified | NONE product economics | resolve/retry/correct source | idempotent response | rejection evidence |
| Reconciliation | unmatched | ClassifyDifference | product/external facts available | P08 | disposition category | NONE | update resolution state | difference identity | source snapshots |
| Reconciliation | classified | ResolveDifference | correction owner/action completed | P08/domain as applicable | resolved/remaining diff | NONE unless separate domain event | new reconciliation if future drift | version | resolution evidence |
| External payment | unknown | RefreshPaymentReference | external authority available | MIRROR/REFERENCE | paid/unpaid/partial external state | EXTERNAL_ACCOUNTING | source update | external record identity | freshness/source |

---

# 14. P09 — Approval/control/task lifecycle

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| ApprovalCase | created | StartApproval | valid target/version/policy | P09 | active case/tasks | NONE | cancel/supersede case | one current case per policy target where required | bound policy |
| ApprovalCase | active | Approve/Reject/Return | current membership/delegation/step | authorized actor | outcome recorded | NONE | further policy transition | parallel step rules | actor/time/reason |
| ApprovalCase | active | Reassign/DelegateTask | policy/active delegation | P09 | new ball-in-court | NONE | reassign again | task version | delegation context |
| ApprovalCase | active | Expire/Escalate | deadline/policy | deterministic control | expired/escalated state | NONE | restart/new approval if policy | scheduled idempotency | policy/deadline |
| ApprovalCase | completion condition met | ProduceApprovalOutcome | policy completion rule | P09 | bounded outcome available to command | NONE | invalidated/re-evaluated if target materially changes | one outcome/version | policy+target hash |
| Domain command | approval available | ExecuteDomainCommand | current security + policy outcome + invariants | owning domain | domain event/effect | depends command | domain correction path | idempotency/expected version | full audit |

Task completion alone never creates domain truth.

---

# 15. P10 — Long-lead / expediting projection

P10 mainly uses planning facts/projections, not an independent commercial transaction ledger.

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Milestone plan | absent/current | Establish/ReviseMilestonePlan | valid procurement object/profile | P10/config or external source | planned/required/forecast/confirmed date version | NONE | SUPERSEDE | version | source/type/version |
| Milestone actual | not occurred | DomainEventOccurs | canonical source event | source domain | actual milestone projection | NONE | correction follows source event | derived | source event identity |
| Expediting exception | normal | RaiseException/Escalation | forecast/slippage rule | P10 control | exception/task | NONE | resolve/close | idempotent rule occurrence | rule/source dates |
| Expediting exception | open | ResolveException | source condition/action complete | P10 | closed | NONE | reopen/new exception | state | resolution evidence |

No CPM/master schedule lifecycle is owned.

---

# 16. P11 — Closeout / security / warranty / recovery

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Closeout | open | StartCommercialCloseout | fulfilment/disposition prerequisites | P11/P07 | closeout active | NONE | return to open work where valid | state/version | prerequisite snapshot |
| Final account | draft | MakeFinalAccountEffective | all changes/claims/certifications/recoveries reconciled as policy requires | P07/P11 | final account basis/effect | OBLIGATION/CERTIFICATION as applicable | governed correction | idempotent/current version | evidence/calculation policy |
| Security obligation | active | RecordExpiry/MaturityFact | source evidence | P11 or external reference | matured/expired fact | NONE | source correction | source identity | external instrument ref |
| Security release | eligible | MakeSecurityReleaseEffective | release conditions/authority | P11 | released | RELEASE where commercial position exists | correction | idempotent | release evidence |
| Warranty/DLP | not started | StartWarrantyPeriod | contractual trigger/evidence | P11 | active obligation period | NONE | correction if trigger wrong | trigger identity | basis/version |
| Warranty/DLP | active | RecordDefect/Obligation | valid evidence | P11 | open obligation | NONE/RECOVERY later | supersede/resolve | defect identity | evidence |
| Warranty/DLP | active | Complete/EndPeriod | obligations/disposition satisfied | P11 | ended | NONE | reopen via new governed issue if contract permits | state | completion evidence |
| Recovery | proposed | MakeRecoveryEffective | valid default/defect/basis/authority | P07/P11 | recovery effect | RECOVERY | correction/release | idempotent | recovery evidence |
| Commitment close | closeout-ready | EndCommitment | outstanding obligations dispositioned | P07/P11 | ended with explicit reason | closure/release as defined | post-close correction/release remains reachable | idempotent | close basis |

Security expiry does not automatically equal release.

---

# 17. P12 — Technical/material approval dependency

P12 owns dependency/gate semantics; external CDE/consultant may own approval record.

| Family | From | Command / action | Guards | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Dependency | not required/required | EstablishApprovalDependency | domain/profile says required | P12 | dependency open | NONE | revise/supersede | version | requirement basis |
| External approval | unknown/pending | Refresh/RecordExternalDecision | authoritative source | REFERENCE/MIRROR | approved/rejected/revise state | NONE | source update | external record identity | version/freshness |
| Gate | dependency open | EvaluateProcurementGate | current external decision + rule | P12 deterministic | pass/block/conditional gate result | NONE | reevaluate on source/rule change | basis hash | source/rule version |
| Dependency | satisfied/waived | CloseDependency | valid approval or authorized bounded waiver | P12/P09 | closed/satisfied | NONE | new dependency/reopen if source changes | state | evidence/waiver authority |

Technical approval is distinct from commercial approval.

---

# 18. Cross-cutting correction / termination / redaction lifecycle

| Family | From | Command | Guard | Authority | Result | Economic | Correction | Concurrency | Evidence/version |
|---|---|---|---|---|---|---|---|---|---|
| Economic event | effective | ReverseAndReplace | classified error + permitted period | owning domain | negating + replacement effect vectors | depends dimension | further correction via new history | target effect uniqueness | correction basis |
| Economic event | effective | ForwardAdjust | classified error + current allowed period | owning domain | delta effect | depends dimension | further adjustment | idempotent | target/event linkage |
| Attribution | effective | Reclassify | valid target mapping/authority | owning domain | from→to zero-net classification | CLASSIFICATION | later reclassify | explicit effect slice | old/new mapping |
| Record/evidence | retained | Redact/DisposePayload | valid retention/privacy authority | evidence substrate | tombstone/restricted payload | NONE | further lawful action | idempotent action | authority/basis |
| Tenant/context | active | GovernedMigration/AuthorityTransfer | new authority/config valid; cutover plan | owning authority | new effective version/cutover | NONE directly | new transfer/correction | one cutover version | old/new/reconciliation |

---

# 19. Projection/interface concepts with no fake lifecycle

The following do not receive independent mutable business lifecycles:

- current approved commitment;
- certified-to-date;
- retention outstanding;
- advance outstanding;
- allowance remaining;
- recovery outstanding;
- non-response;
- actual procurement milestone;
- reconciliation balance/difference projections;
- stale/fresh state derived from external timestamps;
- current eligibility projection over dated decisions/evidence where configured.

Their lifecycle is the lifecycle of source events/configuration plus derivation version.

---

# 20. Lifecycle completeness check against non-collapsible distinctions

Preserved explicitly:

1. need ≠ package;
2. package ≠ tender release;
3. release ≠ offer;
4. offer ≠ normalization;
5. normalization ≠ evaluation adjustment;
6. evaluated basis ≠ contractable supplier basis;
7. recommendation ≠ approval ≠ award;
8. award ≠ commitment;
9. original commitment ≠ current position;
10. pending change ≠ effective change;
11. value variance ≠ scope expansion;
12. delivery ≠ receipt ≠ acceptance;
13. receipt ≠ invoice ≠ payment;
14. claim ≠ assessment ≠ certification;
15. certification ≠ payment;
16. retention ≠ unearned scope;
17. advance ≠ earned value;
18. recoupment ≠ gross earned-value reduction;
19. commercial approval ≠ technical approval;
20. planned/forecast/confirmed date ≠ actual event;
21. task completion ≠ domain transition;
22. notification delivery ≠ acknowledgment;
23. commercial approval ≠ accounting posting;
24. security expiry ≠ security release;
25. commercial closeout ≠ accounting cash closeout.

**PASS.**

---

# 21. Complete transition-field gate

Every transition family above specifies:

- source state/context;
- action/command;
- guard family;
- authority/control;
- resulting state/event;
- economic effect or `NONE`;
- correction/reversal route;
- concurrency/idempotency expectation;
- evidence/version binding.

Exact per-transition policy parameters may be elaborated later without inventing new semantic transitions.

**BL-P15-04 result: CLOSED candidate.**

---

# 22. Golden-thread recheck

GT-1 standard subcontract: all lifecycle families present — **PASS**.  
GT-2 long-lead goods: all lifecycle families present — **PASS**.  
GT-3 claim/certification/correction: all lifecycle families present — **PASS**.  
GT-4 instructed variation: all lifecycle families present — **PASS**.

No additional process area required.

---

# 23. Ceiling / Closed Sub-graph recheck

- context-specific policy/state differences fit same transition grammar;
- projections do not create hidden lifecycle dependencies;
- A0–A3 reaches AwardDecision/handoff without P07;
- goods and subcontract slices can omit each other's workbenches while sharing deterministic substrate;
- future capability/event types remain additive through explicit architecture/version change.

**Ceiling: CLEAN candidate.**  
**Closed Sub-graph: CLEAN candidate.**

---

# 24. Current state

Internal blockers closed by current P1.5 work:

- BL-P15-01 — closed candidate;
- BL-P15-02 — closed candidate;
- BL-P15-03 — closed candidate;
- BL-P15-04 — **closed candidate by this matrix**.

Remaining internal blocker:

- **BL-P15-05 — targeted authoritative ADR-0010 regional-semantics evidence.**

Do not run final internal recheck until BL-P15-05 is resolved or explicitly demonstrated non-blocking with authoritative evidence.
