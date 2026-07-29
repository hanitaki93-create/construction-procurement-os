# P02 — Vendor Eligibility / Bidder Selection v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**P1.2 purpose:** define how a known supplier becomes eligible for a specific sourcing event without collapsing discovery, qualification, compliance, risk and invite selection into one vendor status.  
**Primary CAL-001 status:** vendor sourcing/onboarding/evaluation existed; exact bidder-list and eligibility mechanics remain UNKNOWN.

## 1. Problem to solve

The system must answer separately:
- who the supplier/subcontractor is;
- what evidence exists about capability, compliance and performance;
- whether the supplier is eligible for this project/package at this time;
- whether the supplier was actually selected to receive this tender;
- who made that selection and why;
- whether an exception/override was used;
- what later changed without rewriting the historical invitation decision.

The system must not use one global `APPROVED_VENDOR=true` bit as a substitute for these questions.

## 2. Strong reference patterns

### Procore
`SREF-0020` separates a configurable prequalification process from normal directory identity and retains review/status/change-history concepts. `SREF-0024` then treats actual bid invitation as a separate event requiring designated recipients and, where configured, NDA completion.

### Autodesk BuildingConnected / TradeTapp
`SREF-0021` exposes supplier discovery/network data and qualification/risk context alongside bid management. The mature pattern is not merely “qualified/not qualified”: firms can be found, assessed, compared and selectively invited based on trade, location, performance and risk.

### CMiC
`SREF-0022` treats prequalification as evidence-heavy risk governance using financials, insurance, ratings and historical performance. `SREF-0023` then allows bidder filtering using prequalification status, CSI/trade, location, market sector and prior project information before invitation.

## 3. Provisional object boundary

### 3.1 `Vendor`
Durable organization identity used across projects and commercial relationships.

Candidate minimum identity:
- immutable vendor ID;
- legal/business name + aliases/trading name;
- company registration/tax identifiers where available;
- geography/address;
- contacts;
- trade/category capabilities;
- relationship state;
- external/source identities and provenance.

Vendor identity is not the same thing as approval, qualification or project eligibility.

### 3.2 `VendorQualificationRecord`
A dated/effective assessment based on evidence.

Candidate dimensions:
- technical/capability;
- financial;
- insurance/compliance;
- safety/HSE;
- legal/regulatory;
- quality/accreditation;
- performance/history;
- capacity/backlog/exposure;
- geography/mobilization;
- trade/category scope.

It may carry:
- `UNASSESSED`;
- `IN_REVIEW`;
- `QUALIFIED`;
- `QUALIFIED_WITH_CONDITIONS`;
- `NOT_QUALIFIED`;
- `EXPIRED`;
- `SUSPENDED`.

Names remain provisional. Historical assessment evidence and effective dates are load-bearing.

### 3.3 `EligibilityEvaluation`
A package/project/time-specific decision about whether a vendor may participate or proceed.

Eligibility is derived from:
- package/trade fit;
- current qualification/compliance evidence;
- project/entity policy;
- capacity/exposure;
- conflict/restriction/suspension;
- required geography/licenses;
- any explicit override.

Candidate outcomes:
- `ELIGIBLE`;
- `ELIGIBLE_WITH_WARNING`;
- `INELIGIBLE`;
- `REQUIRES_OVERRIDE`;
- `INSUFFICIENT_EVIDENCE`.

The evaluation must retain the inputs/evidence snapshot used at the time.

### 3.4 `BidderCandidate`
A vendor considered for a particular tender/package before invitation.

Candidate metadata:
- source: existing supplier base / suggested / network / manually added / prior bidder list;
- selection rationale;
- relevant trade/package;
- eligibility result;
- prior responsiveness/performance;
- workload/capacity signal;
- recommended by;
- included/excluded decision.

### 3.5 `BidderSelection`
The internal decision to include a vendor in the tender invite set.

This is distinct from:
- qualification;
- eligibility;
- invitation delivery;
- supplier intent;
- supplier submission.

A selected bidder can later fail delivery/access, decline, not respond, or become ineligible.

## 4. Critical distinctions

### A. Discovery
“Do we know this vendor / can we find them?”

### B. Qualification
“What evidence says they are capable and acceptable generally or within a category?”

### C. Eligibility
“May they participate in this package/project now under policy?”

### D. Selection
“Did the procurement team choose to invite them to this tender?”

### E. Invitation
“Was an invitation actually issued to a recipient and made accessible?”

These must never collapse into one state.

## 5. Provisional selection flow

`Vendor discovery / existing vendor base`

`→ retrieve current qualification + compliance + performance + exposure evidence`

`→ evaluate package/project eligibility`

`→ shortlist candidate vendors`

`→ human selection / configured approval where required`

`→ freeze invite-set version`

`→ P03 tender release / P04 external invitation`

## 6. Policy posture — warnings vs blocks

Eligibility checks should support configurable severity:

1. `INFORMATIONAL` — surfaced, no transition effect.
2. `WARNING` — requires user acknowledgement.
3. `HARD_BLOCK` — invitation/award/payment transition prohibited.
4. `OVERRIDABLE_BLOCK` — privileged actor may proceed with recorded reason/evidence.

Examples:
- expired low-risk company profile may be a warning;
- legal suspension may be hard block;
- missing insurance during early tender may be warning but hard block before commitment/start;
- project-specific client nomination may justify an override path.

The architecture should not hardcode the exact business policy globally.

## 7. Load-bearing invariants

1. **Vendor identity is durable; eligibility is contextual.** A vendor cannot be globally mutated into “approved forever.”
2. **Qualification history is reproducible.** Later financials/insurance/performance do not rewrite what was known when a tender was issued.
3. **Selection is explicit.** Receiving a quote cannot retroactively imply the vendor was selected/invited unless an authorized late-add action is recorded.
4. **Eligibility evidence is timestamped/effective-dated.** Expiry and later suspension must be distinguishable from historical eligibility.
5. **Overrides are first-class.** Actor, authority, reason, condition, evidence and expiry/review obligation must be retained.
6. **No silent exclusion by algorithm.** AI/rules may recommend/flag; exclusion that affects market access must be explainable and policy-grounded.
7. **Bidder coverage is auditable.** Who was considered, selected, excluded and later added should be reproducible.
8. **Supplier access is not enterprise membership.** Invitation should not require broad persistent tenant access merely to bid.
9. **Contact identity is separate from vendor identity.** Multiple contacts may participate without duplicating the commercial counterparty.
10. **Eligibility can change after invitation.** The system must surface this without deleting the original invitation history.

## 8. Edge cases the process must survive

### E01 — Qualified vendor, deliberately not invited
Vendor is capable but current workload, relationship strategy or insufficient package fit leads team not to invite.

Required: eligible ≠ selected.

### E02 — New vendor not yet qualified
Market discovery finds a potentially strong vendor during tender preparation.

Required: allow candidate creation and parallel qualification; policy decides whether invite can precede completed qualification.

### E03 — Vendor invited under exception
Client-nominated or sole-source vendor lacks one normal prerequisite.

Required: explicit exception/override, not fake qualification.

### E04 — Compliance expires mid-tender
Insurance was valid at invitation and expires before award.

Required: preserve invitation eligibility snapshot; re-evaluate at award/commitment transition.

### E05 — Vendor suspended after submitting
Submission remains evidence; suspension affects progression, not historical bid existence.

### E06 — Multiple legal entities under one brand
Group has separate operating companies/licenses.

Required: selection/invitation must identify the actual commercial/legal counterparty or explicitly unresolved candidate entity.

### E07 — One vendor spans multiple trades
Vendor can bid selected sections/trades but not necessarily whole package.

Required: capability/eligibility can be scoped to package section/category.

### E08 — Supplier recommended by AI/network
Recommendation engine identifies bidder based on location/trade/history.

Required: recommendation has provenance/rationale; human or policy decision remains explicit.

### E09 — Existing relationship but poor performance
Vendor is compliant and technically capable but past performance is weak.

Required: performance can alter risk/selection without falsifying compliance status.

### E10 — Capacity conflict across projects
Vendor has several simultaneous commitments.

Required: exposure/capacity signal is time-sensitive and advisory/hard policy depending configuration.

### E11 — Late bidder addition
After tender issue, team adds another vendor.

Required: new selection event + invitation version/date; tender baseline provided must match current released revision.

### E12 — Vendor removal after invitation
Commercial team decides not to continue with an invited bidder.

Required: revoke/close access if policy allows but preserve invitation and reason; do not delete history.

## 9. Failure patterns to reject

Fail later audit if design requires:
- one global Approved Vendor checkbox;
- deleting expired qualification evidence;
- assuming prequalified means automatically invited;
- assuming invited means eligible forever through award/payment;
- forcing every potential bidder through a heavyweight portal account before invitation;
- letting an AI ranking silently exclude bidders;
- storing compliance only as current booleans with no effective dates;
- treating a contact as the commercial vendor entity;
- losing why a vendor was omitted or added late;
- converting an override into a permanent vendor approval.

## 10. Candidate state relationships

`Vendor`

`→ QualificationRecord[*]`

`→ EligibilityEvaluation {project/package/time}`

`→ BidderCandidate`

`→ BidderSelection {INCLUDED | EXCLUDED | HOLD}`

`→ Invitation` (P04)

Later transitions independently re-check relevant eligibility at:
- award recommendation;
- award approval;
- commitment execution;
- payment where compliance is a financial hold.

## 11. Primary audit tests for later

1. Do contractors maintain approved vendor lists, prequalification records, or mostly buyer knowledge?
2. Is qualification global, trade-specific, project-specific, or mixed?
3. Which evidence is mandatory before invite versus before award versus before payment?
4. Who selects bidders and does that choice require approval?
5. How is bidder coverage target decided?
6. Are excluded bidders/reasons recorded today?
7. How are new vendors added during live tendering?
8. How are expired documents handled mid-tender?
9. Is capacity/backlog actually checked before invite or only informally?
10. Can a nominated/noncompliant vendor participate via exception?
11. How many supplier contacts typically receive an invitation?
12. What source wins when procurement’s vendor status differs from finance/ERP status?

## 12. Current disposition

### Strong enough to carry forward provisionally
- durable Vendor identity separate from qualification;
- dated/effective qualification evidence;
- package-specific EligibilityEvaluation;
- explicit candidate/selection step before invitation;
- configurable warning/block/override policy;
- re-evaluation at later commercial gates;
- no broad portal/account prerequisite for bidder participation.

### Still intentionally unresolved
- exact qualification score model;
- minimum V1 compliance dimensions;
- whether invite selection itself needs approval;
- default bidder-count/coverage policy;
- capacity/exposure calculation depth;
- external registry/KYC integrations;
- legal-entity resolution timing for early market engagement.

## 13. Impact on P1.1

No frozen P1.1 change required yet.

This process strengthens:
- `Vendor + Minimum Compliance State`;
- contextual compliance/eligibility rather than one global status;
- bounded override/audit requirements;
- low-friction external tender participation.

It does not justify expanding vendor management into a generalized CRM or financial-risk platform in V1.

## 14. Next process dependency

P03 should reconstruct **Tender/RFQ Package + Release Control**: the released market event must have a reproducible baseline, structured response basis, dates, commercial instructions and immutable post-release revision/addendum behavior before external participation can be reliable.
