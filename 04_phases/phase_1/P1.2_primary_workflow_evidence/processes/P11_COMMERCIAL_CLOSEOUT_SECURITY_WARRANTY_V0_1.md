# P11 — Commercial Closeout / Retention / Security / Warranty v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**Purpose:** define how a goods/subcontract commitment reaches commercial completion and closeout without using one vague `Closed` status, losing outstanding retention/security/warranty obligations, or confusing contractual release with accounting cash payment.

## 1. Problem to solve

A commitment can be physically complete while still commercially open.

Examples:
- all materials delivered but invoice dispute remains;
- subcontract work complete but final variation unresolved;
- final certificate issued but retention still held;
- retention eligible for release but not yet paid;
- advance not fully recouped;
- performance bond still active;
- advance payment guarantee needs release;
- warranty/DLP has started but not expired;
- final documents/O&M/warranties remain outstanding;
- contract terminated with final settlement still unresolved.

The system must explain **why a commitment is still open** and what conditions remain.

## 2. Mature-system reference patterns

### Procore

Retainage/retention can be withheld on progress payment applications and released later, including through a final-payment process after contractual completion milestones. This supports retention release as a separate commercial event rather than treating final progress or physical completion as automatic release/payment.

### CMiC

Subcontract management tracks retainage/release, bonding, insurance and date-sensitive compliance requirements alongside contract/payment history. This supports continued obligation/security tracking after the core commitment exists.

These references do not define our legal closeout rules; primary UAE/GCC evidence remains necessary.

## 3. Closeout is a gate over multiple obligations

Do not model closeout as:

`status = CLOSED`

without explaining prerequisites.

Candidate closeout dimensions:

1. committed scope disposition;
2. fulfillment/certification disposition;
3. change/final-account disposition;
4. retention disposition;
5. advance/recoupment disposition;
6. invoice/payment/reconciliation disposition;
7. security/guarantee disposition;
8. warranty/DLP/defect-liability disposition;
9. required closeout documentation;
10. claims/disputes/exceptions.

A commitment can be closed for procurement activity while one or more post-completion obligations remain tracked.

## 4. Completion milestones

Potential milestones differ by commitment type.

### Goods/material

- final required delivery;
- acceptance/GRN complete;
- replacements/returns resolved;
- final invoice/match resolved;
- warranty documents received;
- payment/reconciliation complete where tracked.

### Subcontract/service

- physical/work completion;
- practical/substantial completion where applicable;
- final measurement;
- final account agreement;
- final certification;
- retention first release;
- DLP/warranty start;
- defects completion;
- final retention release;
- final security release;
- final payment/reconciliation.

Not every project/contract uses each milestone.

## 5. Scope closeout

Before commercial closeout, every authorized RequirementAllocation leaf bound to the commitment should have a disposition:

- fulfilled/accepted;
- certified/earned;
- omitted by approved change;
- transferred/reallocated;
- cancelled/terminated;
- explicitly outstanding.

No allocation may simply disappear because a commitment was marked closed.

This is `SOURCING_CRITIQUE_PENDING` where it depends on current RequirementAllocation semantics.

## 6. Final account

### Candidate final-account concept

The final account is the agreed/approved final contractual commercial position after all effective changes and final valuation adjustments are resolved.

It should reconcile:
- Original Commitment;
- Effective Approved Changes;
- final current approved commitment value;
- cumulative certified/accepted commercial position;
- agreed omissions/settlements;
- retention;
- advance/recoupment;
- remaining disputed/pending items.

Final account approval does not automatically mean cash payment occurred.

Do not edit the original commitment to equal the final account.

## 7. Retention release lifecycle

Retention positions remain event-derived.

Candidate stages:

`WITHHELD`

`→ ELIGIBLE_FOR_PARTIAL_RELEASE`

`→ PARTIAL_RELEASE_AUTHORIZED`

`→ ELIGIBLE_FOR_FINAL_RELEASE`

`→ FINAL_RELEASE_AUTHORIZED`

`→ paid/reconciled externally where accounting owns cash`

Eligibility and authorization are distinct.

Example:
- practical completion makes 50% of retention eligible;
- authorized actor approves release;
- accounting later pays it.

Do not mark retention paid merely because release was approved.

## 8. Security / guarantee semantic role

P11 uses `CommercialSecurity` as a semantic role, not yet a mandated aggregate.

Possible instruments:
- performance bond/guarantee;
- advance payment guarantee;
- retention bond;
- insurance certificate/policy;
- warranty guarantee;
- other contract-required security.

Candidate metadata:
- security type;
- commitment/counterparty;
- issuer;
- beneficiary;
- reference number;
- amount/percentage/currency where applicable;
- issue date;
- effective date;
- expiry date;
- automatic-extension/renewal requirement;
- release conditions;
- status;
- source document/evidence;
- amendment/replacement history;
- release/return evidence.

Exact financial/legal modeling remains later evidence-owned.

## 9. Expiry vs release

These are different facts.

### Expired

Instrument's stated expiry date passed.

### Released/returned/discharged

Beneficiary/authorized party formally released or returned the security where required.

An expired instrument may itself be a compliance problem if renewal was required.

A released instrument may occur before original expiry under contract conditions.

Never use expiry date alone as proof of release.

## 10. Security amount changes

Security may need adjustment when:
- contract value changes;
- advance is recouped;
- retention reduces;
- project reaches completion stage;
- bond amount has fixed/capped terms.

Store amendment/replacement evidence rather than overwriting the original security record silently.

The platform may track required vs provided amount as a compliance projection without becoming a banking/guarantee issuance system.

## 11. Advance payment guarantee relationship

Where advance payment is secured:

- advance paid/outstanding comes from P07D/accounting mirror;
- advance guarantee is evidence/security coverage;
- recoupment may reduce required guarantee exposure under contract rule;
- final release requires contractual conditions and authority.

Do not assume `advance outstanding = guarantee amount` universally.

Track the rule/reference and actual instrument separately.

## 12. Warranty / defects-liability terms

Commitment may include:
- warranty duration;
- defects-liability period;
- start trigger;
- end date/condition;
- responsible counterparty;
- required warranty document;
- linked product/equipment/scope;
- extension/restart rule where defect correction affects period.

Candidate status derives from:
- contractual terms;
- actual completion/acceptance milestone;
- approved extensions;
- current date;
- unresolved required closeout actions.

P11 does not require a full maintenance/service-management module.

## 13. Warranty start is event-based

Do not calculate warranty solely from PO date.

Possible contractual triggers:
- delivery acceptance;
- installation completion;
- testing/commissioning;
- practical completion;
- handover;
- certificate date;
- another contract milestone.

The triggering event must be explicit and evidenced.

## 14. Closeout documentation

Candidate required evidence may include:
- final delivery/GRN;
- final certificate;
- final account agreement;
- warranties;
- O&M manuals/data sheets;
- as-built/shop drawing closeout references;
- test/commissioning certificates;
- release/return of bonds/guarantees;
- supplier/subcontractor final statement;
- tax/compliance documents;
- payment/reconciliation confirmation where required.

P11 tracks obligation/evidence references; it does not require owning all CDE/document workflows.

## 15. Closeout obligations

### `CloseoutObligation`

Semantic role for a remaining condition required to close or transition a commitment.

Candidate fields:
- obligation type;
- source contract term/policy;
- responsible actor/party;
- due/trigger date;
- required evidence;
- status;
- blocking severity;
- completion/release evidence;
- override/waiver authority where permitted.

Could later be implemented using P09 Task/Compliance primitives rather than a new aggregate.

Do not pre-decide physical model.

## 16. Closeout status projection

Candidate derived states:
- `ACTIVE`;
- `PHYSICALLY_COMPLETE_COMMERCIAL_OPEN`;
- `FINAL_ACCOUNT_PENDING`;
- `RETENTION/SECURITY_OPEN`;
- `WARRANTY/DLP_OPEN`;
- `FINANCIALLY_RECONCILING`;
- `COMMERCIALLY_CLOSED_POST_OBLIGATIONS_OPEN`;
- `FULLY_CLOSED`;
- `TERMINATED_SETTLEMENT_OPEN`;
- `TERMINATED_CLOSED`.

Names are provisional.

The projection should explain open obligations rather than forcing one linear lifecycle.

## 17. Termination path

Termination is not normal completion.

Candidate sequence:
- termination authority/effective event;
- stop future commitment obligation under contractual rule;
- disposition unperformed RequirementAllocation scope;
- record delivered/earned work to termination date;
- resolve changes/claims/settlement;
- retention/security treatment;
- final invoice/payment/reconciliation;
- warranty obligations for delivered/performed scope where applicable.

Original commitment and prior changes remain historical evidence.

## 18. Claims/disputes at closeout

A commitment may be operationally complete but still have:
- supplier claim;
- disputed variation;
- backcharge/deduction;
- unresolved defect cost;
- final account disagreement.

The system should support an explicit unresolved-commercial-exception reference blocking or qualifying full closeout.

P11 does not require building a full disputes/legal-claims module in V1.

## 19. Accounting/payment seam

Commercial closeout and accounting closeout may differ.

Example:
- final account certified;
- retention release authorized;
- all commercial obligations satisfied;
- ERP final payment still pending.

Candidate projections should distinguish:
- commercial closeout readiness;
- accounting/payment reconciliation status;
- full closure.

P08 authority/freshness rules apply.

## 20. Vendor performance handoff

At closeout, the system may derive/reference performance evidence such as:
- tender responsiveness;
- delivery timeliness;
- quality/rejection events;
- change behavior;
- claim accuracy;
- compliance history;
- closeout responsiveness.

This can feed later vendor performance/intelligence without requiring P11 to own a scoring model now.

## 21. Edge cases

### E01 — Work complete, retention outstanding

Required: physically/commercially near-complete but not fully closed; retention obligation remains visible.

### E02 — Retention release approved but unpaid

Required: release authorization separate from accounting paid status.

### E03 — Bond expires before required completion

Required: compliance exception/renewal requirement; not treated as successful release.

### E04 — Bond formally returned before nominal expiry

Required: release event/evidence closes obligation.

### E05 — Advance fully recouped but guarantee still held

Required: advance position and security release remain separate facts.

### E06 — Final account agreed while disputed claim remains outside it

Required: explicit settlement scope/claim disposition; no hidden dispute disappearance.

### E07 — Warranty starts at commissioning six months after delivery

Required: trigger actual commissioning event, not delivery/PO date.

### E08 — Defect corrected and warranty extended

Required: governed warranty-term extension event; original term remains history.

### E09 — Termination after 60% progress

Required: earned/certified history retained; unperformed scope disposition; termination settlement path.

### E10 — Final delivery accepted but supplier invoice missing

Required: goods fulfillment complete while financial reconciliation open.

### E11 — Warranty document missing but physical work complete

Required: closeout obligation blocks/qualifies final closure under policy.

### E12 — External ERP says paid but sync is stale

Required: closeout view exposes source/freshness; do not assert final financial closure from stale mirror.

## 22. Failure patterns to reject

Fail later audit if design:
- marks commitment fully closed solely because work/delivery finished;
- marks retention paid when only release was authorized;
- treats security expiry as release;
- overwrites security record after amendment/replacement;
- starts warranty from a hardcoded commitment date;
- requires full CDE ownership to track closeout evidence;
- erases allocation scope at closure;
- treats termination as ordinary completion;
- hides unresolved commercial claims to achieve `Closed` status;
- conflates commercial and accounting closeout;
- loses warranty/security obligations after PO/subcontract is operationally closed.

## 23. Primary audit tests later

1. What exact conditions are required before PO/subcontract is considered closed?
2. How is final account agreed/certified?
3. When is first/final retention released?
4. Who authorizes retention release?
5. How are performance bonds/advance guarantees/retention bonds tracked?
6. What triggers guarantee reduction/release?
7. Are expiry and return/release tracked separately?
8. How are warranties/DLP start/end dates determined?
9. What closeout documents are mandatory?
10. How are outstanding claims/variations treated at closeout?
11. What happens on termination?
12. Does accounting payment need to complete before procurement/commercial closeout?
13. How are vendor performance lessons captured?
14. Which closeout obligations are currently tracked in Excel/email/manual folders?

## 24. Current disposition

### Strong enough to carry forward provisionally
- closeout as multi-obligation gate rather than one status;
- scope/allocation disposition required;
- final account separate from original commitment;
- retention eligibility/authorization/payment separated;
- security expiry distinct from release;
- security amendments preserve history;
- warranty/DLP trigger event explicit;
- closeout evidence references without full CDE ownership;
- commercial vs accounting closeout separated;
- termination path distinct from normal completion;
- vendor performance can consume derived closeout evidence later.

### Still unresolved
- exact final-account object/process;
- GCC/UAE legal/security terminology and requirements;
- default retention release triggers;
- guarantee/bond instrument model depth;
- warranty/defect claims scope;
- closeout obligation implementation via Task/Compliance vs separate record;
- accounting closeout ownership;
- termination settlement mechanics;
- vendor performance scoring model.

## 25. Impact on frozen boundary

No P1.1 reopening proposed.

P11 closes an operational gap already implied by frozen retention/bond-release and commercial-completion golden threads; it does not add a new generalized legal/claims/security platform.

## 26. Next step

Build the integrated P01–P11 provisional workflow map, classify unresolved gaps/ADRs and run the next internal hostile/burden checkpoint before continuing to later Phase 1 structural design.