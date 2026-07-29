# P1.2 — Golden-Thread Architecture Tests v0.1

**Status:** ACTIVE PROVISIONAL VALIDATION / NOT FROZEN  
**Purpose:** test whether P01–P12 mechanics can represent real procurement/commercial threads without duplicate truth, hidden bypass, or support-system scope creep.

These are architecture tests, not proof of contractor reality. Primary evidence may change the expected mechanics.

## GT-01 — Ordinary material procurement with partial delivery

### Scenario

A site requests 100 units of material. Procurement tenders three suppliers. One supplier is selected for all 100. PO becomes effective. Supplier delivers 60, then 40. Five units in the first delivery are rejected and later replaced. Two supplier invoices arrive across the deliveries.

### Expected thread

`DemandLine 100`
`→ RequirementAllocation 100`
`→ TenderEvent/Release`
`→ bids/revisions`
`→ comparison`
`→ award 100`
`→ effective PO-like baseline 100`
`→ GoodsReceipt delivery 1 = 60`
`→ accepted 55 + rejected 5`
`→ replacement receipt 5 accepted`
`→ delivery 2 = 40 accepted`
`→ accepted fulfillment = 100`
`→ invoice-match/accounting interface`

### Must hold

- no second allocation ledger at award/PO;
- rejected quantity does not count as fulfilled until accepted/replaced;
- invoice does not create receipt truth;
- original PO baseline remains historically reconstructable;
- accounting/payment state cannot rewrite accepted receipt history.

### Fail if

- invoiced quantity is treated as delivered;
- rejection is destructive edit of receipt;
- 100 demand becomes 200 because award/commitment creates new allocation balance.

### Main seams

S01, S09, S12, S15, S25.

---

## GT-02 — Planned long-lead procurement before detailed MR

### Scenario

Elevator package is identified in procurement plan months before detailed site requisition. Procurement tenders and awards under approved planning basis. Consultant technical approval remains outstanding. Detailed demand arrives later.

### Expected thread

`Project + Budget/Cost Structure + PLANNED_REQUIREMENT`
`→ RequirementAllocation`
`→ ProcurementPackage`
`→ TenderEvent`
`→ comparison/award`
`→ conditional commitment preparation`
`→ technical approval dependency`
`→ effective release/order under policy`
`→ later DemandLine reconciliation to existing allocation lineage`

### Must hold

- early package does not bypass allocation authority;
- later MR cannot duplicate already covered scope;
- technical approval remains distinct from commercial award;
- package is optional planning context, not universal root;
- required/forecast/confirmed/actual dates remain distinct.

### Fail if

- later MR creates another 100% allocation;
- consultant approval changes supplier price truth;
- long-lead support requires full master-schedule or CDE ownership.

### Main seams

S02, S19, S20; ADR-0003/0007.

---

## GT-03 — Split award with supplier revisions

### Scenario

One tender covers supply + installation. Vendor A wins supply, Vendor B wins installation. Both revised offers during negotiation. Internal comparison included risk allowances that suppliers never accepted.

### Expected thread

`one authorized requirement basis`
`→ one tender release`
`→ immutable BidSubmission revisions A/B`
`→ normalized comparison + internal EvaluationAdjustments`
`→ supplier-confirmed final bid revisions`
`→ AwardRecommendation with evaluated_basis + contractable_agreed_basis`
`→ AwardDecision`
`→ RequirementAllocation split leaves A/B`
`→ separate downstream commitment handoffs`

### Must hold

- internal allowances explain decision only;
- contractable values come from supplier-confirmed revisions;
- split leaves conserve authorized scope/quantity;
- later commitments bind leaves rather than recreate allocation.

### Fail if

- leveled allowance becomes vendor contract value;
- same scope is awarded to A and B accidentally;
- split award requires independent parallel package truths.

### Main seams

S05–S09, S25.

---

## GT-04 — Non-lowest award with DOA threshold change

### Scenario

Vendor A is lowest. Vendor B is selected because A excludes critical scope and has programme risk. Recommendation begins at AED 900,000. Negotiation changes B's final supplier-confirmed offer to AED 1,050,000, crossing an approval threshold.

### Expected thread

`ComparisonSnapshot`
`→ internal preference annotation`
`→ supplier-confirmed revised BidSubmission`
`→ AwardRecommendation v2`
`→ ApprovalCase recalculated using effective policy`
`→ higher required authority`
`→ approved AwardDecision`

### Must hold

- non-lowest rationale preserved;
- revised commercial basis is supplier-confirmed;
- threshold crossing recalculates required approval;
- historical policy/role/delegation is reproducible;
- approval does not itself create effective commitment.

### Fail if

- old lower-threshold approval is reused;
- current role assignment retroactively changes who was authorized;
- recommendation edit silently changes approved vendor/value.

### Main seams

S07, S08, S17, S24.

---

## GT-05 — Retender after weak coverage

### Scenario

Tender round 1 receives one unusable quote. It is closed with no award. Scope is clarified and round 2 is issued to revised bidder set.

### Expected thread

`RequirementAllocation`
`→ TenderEvent A / Release A`
`→ responses`
`→ NO_AWARD/RETENDER disposition`
`→ TenderEvent B / Release B`
`→ new participants/submissions`
`→ comparison/award`

### Must hold

- failed round remains immutable evidence;
- no duplication of requirement allocation between rounds;
- round 2 scope/release basis explicit;
- bidder history and revisions cannot be mixed across rounds silently.

### Fail if

- retender overwrites round 1;
- both rounds count as active sourced quantity;
- old quote is accidentally used as current contractable basis.

### Main seams

S01, S04–S06, S09.

---

## GT-06 — Subcontract variation + progress certification

### Scenario

Subcontract baseline AED 2,000,000. Approved effective VO +AED 200,000. Another +AED 150,000 VO is pending while subcontractor claims work relating to both changes. 10% retention applies. Advance payment is being recouped.

### Expected thread

`original effective baseline 2,000,000`
`+ effective approved change 200,000`
`→ current approved commitment 2,200,000`
`→ pending change 150,000 shown separately`
`→ supplier ProgressClaim`
`→ ValuationAssessment`
`→ CertificationDecision constrained by contractual/approved basis and explicit permitted mechanics`
`→ certified gross`
`→ retention withheld`
`→ advance recoupment`
`→ payable`

### Must hold

- pending VO does not silently become approved commitment;
- claim does not equal certified earned value;
- retention does not reduce earned gross;
- advance does not create earned value;
- recoupment reduces payable, not gross certification;
- any certification of unapproved change requires an explicit contractual mechanism, not accidental bypass.

### Fail if

- current approved commitment = 2,350,000 before VO approval;
- certification is just invoice amount;
- retention/advance are mixed into earned value.

### Main seams

S10, S11, S13, S14, S23.

---

## GT-07 — Value increase without scope increase

### Scenario

A material supplier's final negotiated price rises because freight cost changes, but required quantity remains exactly 100 units.

### Expected thread

`RequirementAllocation quantity basis = 100 unchanged`
`→ supplier-confirmed revised BidSubmission price`
`→ comparison/recommendation variance`
`→ required budget/DOA governance`
`→ award/commitment value changes`

### Must hold

- allocation quantity remains 100;
- higher value is commercial/budget governance, not allocation overrun;
- no “overbuy” exception is created merely because price exceeds estimate.

### Fail if

- value increase expands scope capacity;
- hard quantity guard uses estimated value as equivalent conservation dimension.

### Main seams

S01, S07, S08; B5.

---

## GT-08 — Scope increase through approved variation

### Scenario

PO originally covers 100 units. Site instruction legitimately requires 20 additional units.

### Expected thread

`authorized requirement basis 100`
`→ governed demand/scope change +20`
`→ current authorized requirement 120`
`→ RequirementAllocation new/expanded active leaf capacity`
`→ supplier change/price confirmation`
`→ approved/effective commitment change`
`→ receipts against total authorized/effective scope`

### Must hold

- commercial VO alone cannot manufacture 20 units of allocation capacity;
- requirement authorization changes before additional scope is consumed;
- original 100-unit baseline remains historical;
- change lineage links requirement and commitment impact.

### Fail if

- PO change directly increases allocation without authorized demand basis;
- original commitment is edited to 120 with no change history.

### Main seams

S09–S12.

---

## GT-09 — ERP export rejected then corrected

### Scenario

A commitment is effective in procurement OS. Export to ERP fails because cost code is invalid. Commercial team corrects authorized cost attribution and re-exports. ERP accepts the second attempt.

### Expected thread

`effective commercial commitment`
`→ export attempt 1`
`→ ERP rejected {reason}`
`→ reconciliation/open exception`
`→ governed cost-attribution correction/reclassification`
`→ export attempt 2 with lineage/idempotency`
`→ ERP accepted/posted external ID`
`→ reconciled`

### Must hold

- ERP rejection does not erase effective commercial commitment;
- failed attempt remains evidence;
- authoritative cost-attribution correction follows historical rule;
- one `synced=true` flag is insufficient;
- retry cannot create duplicate ERP commitment.

### Fail if

- export failure makes commercial commitment disappear;
- re-export creates duplicate posting;
- local record silently copies ERP value over commercial basis.

### Main seams

S15, S16, S22, S25.

---

## GT-10 — Closed-period commercial correction

### Scenario

A certified subcontract amount from a prior closed accounting period is later found overstated. Historical certificate was validly approved at the time and cannot simply be deleted.

### Expected thread

`historical CertificationDecision`
`→ discovered error`
`→ correction authorization`
`→ reversal/counter-certification or defined corrective event`
`→ current commercial projection corrected`
`→ accounting correction/interface follows external-period rules`
`→ original historical event preserved`

### Must hold

- historical certificate remains reproducible;
- current commercial position corrects without destructive rewrite;
- accounting period constraints remain external-authority aware;
- provenance links original error, correction and external reconciliation.

### Fail if

- prior certificate amount is edited in place;
- accounting close forces commercial history to become false;
- correction creates duplicate earned value.

### Main seams

S22–S25; ADR-0015.

---

## GT-11 — Technical approval changes after commercial award

### Scenario

Commercial award selects Product X subject to consultant approval. Consultant rejects X and later approves Product Y. Supplier confirms Y with a different price.

### Expected thread

`AwardDecision conditional on technical approval`
`→ technical submission X rejected`
`→ award/commitment formation guard remains unsatisfied or stale under policy`
`→ supplier offers Product Y as new BidSubmission revision / agreed basis`
`→ technical approval Y`
`→ recommendation/award reconfirmation or reapproval if material`
`→ commitment uses approved Y commercial basis`

### Must hold

- technical rejection does not edit original bid silently;
- new product/price is supplier-confirmed commercial evidence;
- approval revision identity is explicit;
- material basis change cannot pass under old approval invisibly.

### Fail if

- consultant decision directly rewrites supplier price;
- original X award becomes Y commitment with no reconfirmation lineage.

### Main seams

S07, S08, S20, S24.

---

## GT-12 — Completion with retention, bond and warranty still open

### Scenario

Subcontract physical works complete. Final certificate issued. Retention remains partly held; performance security not yet released; warranty/DLP remains active; one invoice is unpaid.

### Expected thread

`physical/scope completion`
`→ final certification`
`→ retention position open`
`→ security release prerequisite open`
`→ warranty/DLP active`
`→ accounting/payment open`

Current state may show operational completion while commercial/accounting/obligation closure remains incomplete.

### Must hold

- no single `CLOSED` flag hides outstanding obligations;
- security expiry is distinct from release/discharge;
- warranty completion does not imply payment completion;
- closeout derives from required obligation set.

### Fail if

- final certificate closes everything;
- unpaid invoice or unreleased security becomes invisible after project close.

### Main seams

S21, S15.

---

## 13. Test execution posture

For each future architecture version:
1. walk each golden thread through proposed entities/events/states;
2. identify authoritative fact at each step;
3. prove history can be reconstructed;
4. prove no balance/value is double-counted;
5. prove an external system can remain authoritative where intended;
6. prove retries/concurrency cannot duplicate irreversible actions;
7. record any step requiring a new core process rather than an interface/projection.

A thread failure triggers contradiction/ADR review before adding architecture.

## 14. External critique use

Future Claude reviews should not critique these stories for realism alone; they should attempt to break the current mechanics with them.

After Review A/B/C, use this artifact for the final compact integration critique.

## 15. Primary evidence use

When a real contractor case resembles one of these threads, compare **only after raw capture**.

Classify:
- model survives;
- representable variant;
- model contradiction;
- missing lifecycle;
- insufficient evidence.

Do not force the contractor case into the golden thread vocabulary.
