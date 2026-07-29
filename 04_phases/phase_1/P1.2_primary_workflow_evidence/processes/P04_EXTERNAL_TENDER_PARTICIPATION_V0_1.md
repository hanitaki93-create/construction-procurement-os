# P04 — External Tender Participation / Intent / Submission / Revision v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**P1.2 purpose:** define the supplier-facing tender path so low friction does not destroy identity, access control, submission provenance or response-state truth.  
**Primary CAL-001 status:** supplier quotations/revisions clearly exist; intent, decline, non-response, portal/access and revision-control mechanics remain UNKNOWN.

## 1. Problem to solve

For each invited vendor, the system must distinguish:
- invitation created;
- invitation sent;
- access granted/opened;
- bidder intent/acknowledgement;
- explicit decline/no-bid;
- no response;
- submission received;
- submission revision/supersession;
- clarification exchanged;
- addendum delivered/acknowledged;
- withdrawal;
- late/exception submission.

These are different facts. The system must not infer one from another.

## 2. Strong reference patterns

### Procore
`SREF-0027` supports direct intent states (`Will Bid`, `Will Not Bid`) and both portal and email-based submission patterns. `SREF-0024` separates recipient assignment, invitation delivery and NDA-gated access. This supports low-friction participation without granting broad project permissions.

### CMiC
`SREF-0023` preserves invitation broadcasts, accept/decline response history and bidder response logs. Bid intent may change until the bid date. `SREF-0028` keeps addendum communications/history distinct from the base tender.

### ProcurePro
`SREF-0030` describes live engagement tracking, structured returns, questions/addenda and guided bidder participation. Its current public product material also emphasizes secure-link supplier access without forcing sign-up as the default interaction pattern.

## 3. Provisional object boundary

### 3.1 `TenderInvitation`
One vendor's invitation to a TenderEvent/section.

Candidate identity:
- invitation ID;
- tender event/release;
- vendor/legal-counterparty candidate;
- selected sections/trades;
- recipient contact(s);
- issue time;
- delivery channel;
- access policy;
- expiry/due date;
- invitation status;
- resend/reissue history.

### 3.2 `ExternalAccessGrant`
A bounded authorization allowing specified people to perform tender tasks.

Candidate scope:
- view current tender release and permitted addenda;
- download permitted documents;
- state intent;
- submit questions;
- submit/revise/withdraw bid subject to policy;
- view own submissions/history.

It does **not** imply broad tenant/project membership.

### 3.3 `BidIntent`
Supplier-stated intent separate from actual submission.

Candidate states:
- `UNDECLARED`;
- `WILL_BID`;
- `DECLINED_NO_BID`.

Reason may be optional/configurable:
- workload/capacity;
- scope mismatch;
- geography;
- timing;
- commercial terms;
- insufficient information;
- other.

Intent may change before cutoff under policy; history remains.

### 3.4 `BidSubmission`
Immutable supplier-origin submission version.

Candidate content:
- submission ID/version;
- vendor + submitting contact;
- tender release/addendum basis;
- structured response values;
- attachments/original quote files;
- qualifications/exclusions;
- alternates;
- validity period;
- programme/delivery dates;
- commercial terms/deviations;
- source channel;
- submission time;
- late/exception flags;
- signature/declaration where required.

### 3.5 `ClarificationThread`
A question/answer/negotiation evidence object linked to tender/bid/line/scope.

Clarifications do not rewrite supplier-origin submission values. If they materially change the offer, a new BidSubmission revision or explicit accepted adjustment is required.

## 4. Critical state distinction — decline vs non-response

`DECLINED_NO_BID` means the supplier explicitly communicated no intent to bid.

`NO_RESPONSE` means no qualifying response was recorded by a defined checkpoint/deadline.

These are not equivalent.

Non-response should normally be **derived**, not manually set:
- invitation delivered/access available;
- no explicit intent/submission;
- configured deadline/checkpoint passed.

Possible derived states:
- `INVITED_UNOPENED`;
- `ACCESSED_NO_INTENT`;
- `WILL_BID_PENDING_SUBMISSION`;
- `DECLINED_NO_BID`;
- `SUBMITTED`;
- `NO_RESPONSE_AT_DEADLINE`.

Final naming belongs to P1.5 state-machine design.

## 5. Low-friction access posture

Default architectural posture:
- secure task link/token or lightweight authenticated access;
- supplier identity bound to vendor/contact/invitation;
- no paid licence requirement;
- no broad project navigation;
- no requirement to create a rich persistent profile before bidding unless risk policy requires it;
- mobile/browser-capable basic interaction;
- large-document delivery may use linked CDE/storage rather than email attachment size dependence.

Account creation may exist as an optimization for frequent suppliers, not as the only viable route.

## 6. Candidate participation flow

`Invitation selected`

`→ issue/send`

`→ delivery/access available`

`→ supplier {WILL_BID | DECLINE | no immediate response}`

`→ view release/addenda / ask clarification`

`→ prepare response`

`→ submit BidSubmission v1`

`→ {clarification | negotiation | supplier revision | addendum-driven revision}`

`→ BidSubmission v2...n`

`→ submission close / withdrawal / no-response derivation`

`→ P05 normalization/leveling`

## 7. Revision and supersession policy

Every submitted revision remains immutable.

A later version may:
- supersede prior supplier commercial offer;
- respond to addendum;
- incorporate negotiation;
- correct bidder error;
- replace attachment set.

The system must retain:
- revision sequence;
- who submitted;
- reason/context;
- old/new values/documents;
- tender/addendum basis;
- whether revision was requested/accepted after deadline.

The current bid view may point to latest applicable revision but cannot delete earlier versions.

## 8. Deadline and late-bid policy

Tender configuration should support:
- hard cutoff;
- soft cutoff with late flag;
- controlled extension;
- privileged late acceptance;
- blind bid reveal condition.

Late acceptance requires:
- actor;
- reason;
- authority where policy requires;
- exact receipt time;
- effect on fairness/audit.

The system should never silently backdate a submission.

## 9. Addenda and acknowledgment

When addendum issued:
- all affected active invitations are identified;
- delivery is recorded;
- access uses current tender revision;
- policy may require acknowledgment;
- material price/scope impact may require new submission revision.

No bidder should unknowingly submit against a superseded package without the system surfacing the mismatch.

## 10. Clarification policy

Clarifications may be:
- bidder-private commercial clarification;
- general tender clarification whose answer must be broadcast to all bidders;
- technical/RFI question;
- negotiation with selected/preferred bidder.

The system must distinguish private vs broadcast scope.

A clarification response that changes the tender itself becomes/adds to an Addendum, not an invisible one-to-one answer that creates unequal scope unknowingly.

## 11. Load-bearing invariants

1. **Invitation, access, intent and submission are separate facts.**
2. **Explicit decline is not non-response.**
3. **Submission versions are immutable.**
4. **Every submission records supplier, contact, time, channel and tender-release basis.**
5. **Supplier-origin truth is never overwritten by internal comparison edits.**
6. **No bidder can see another bidder's protected submission.**
7. **Access is bounded to the invited task/scope.**
8. **Late/exception submissions are visible and governed.**
9. **Addendum exposure is traceable per bidder.**
10. **Clarifications cannot silently change tender scope or bid values.**
11. **Withdrawal preserves prior evidence.**
12. **External contact changes do not duplicate the vendor/commercial party.**

## 12. Edge cases the process must survive

### E01 — Supplier says Will Bid then never submits
Required: intent remains historical; derived final state `NO_SUBMISSION`/timeout, not decline.

### E02 — Supplier declines then changes mind
Required: intent revision history + policy-controlled return to active bidding before deadline.

### E03 — Supplier emails PDF instead of using form
Required: authorized internal receipt/on-behalf ingestion linked to invitation, original email/file evidence and source channel; normalize later.

### E04 — Supplier sends revised quote after negotiation
Required: BidSubmission v2; v1 preserved.

### E05 — Supplier submits before addendum, then addendum issued
Required: mark submission as based on older release and require/recommend confirmation/revision under policy.

### E06 — Bid arrives one minute late
Required: exact late timestamp + configured handling; no manual timestamp editing.

### E07 — Wrong employee receives invite
Required: recipient reassignment/resend without changing selected vendor; history retained.

### E08 — Supplier shares secure link internally
Required: access policy should bind actions to authenticated/verified participant or controlled invitation identity; avoid anonymous uncontrolled edit authority.

### E09 — Bidder withdraws quote
Required: withdrawal event; prior bid preserved but excluded from active award basis unless explicitly reinstated/revised.

### E10 — One company submits two alternatives
Required: one base/compliant bid plus explicit alternates, or separate structured options; do not treat them as unrelated vendors.

### E11 — Clarification answer affects every bidder
Required: promote to broadcast clarification/addendum; preserve common issue time.

### E12 — Supplier company changes legal entity before award
Required: submission party remains historical; later counterparty substitution requires explicit governance and possibly new/reconfirmed bid.

## 13. Failure patterns to reject

Fail later audit if design:
- treats no response as decline;
- records only the latest quote file;
- lets internal staff edit supplier submission amounts in place;
- requires full enterprise/project accounts for all bidders;
- cannot accept controlled off-platform/email returns;
- cannot prove which addendum a bidder saw;
- lets late bids appear on time;
- uses shared public links that expose tender data without identity/access boundaries;
- allows private clarification to silently change common tender scope;
- deletes withdrawn/declined history;
- confuses supplier contact with vendor entity.

## 14. Primary audit tests for later

1. How do suppliers actually receive tenders: email attachments, links, portals, shared drives?
2. Do contractors track intent to bid separately from quote receipt?
3. How often do suppliers explicitly decline versus simply disappear?
4. Are follow-ups/chases recorded anywhere?
5. How are emailed bids treated as official submissions?
6. How many revisions are typical and how are they identified?
7. Are late bids accepted and by whom?
8. What happens after addenda or revised drawings?
9. Do bidders acknowledge addenda?
10. How are commercial clarifications distinguished from scope changes?
11. What supplier portal/account friction exists today?
12. What evidence would resolve a dispute over which quote revision was final?

## 15. Current disposition

### Strong enough to carry forward provisionally
- invitation/access/intent/submission separation;
- explicit decline distinct from derived non-response;
- immutable bid revisions;
- low-friction bounded external access;
- controlled email/off-platform ingestion;
- late/withdrawal/addendum handling with provenance;
- private vs broadcast clarification distinction.

### Still unresolved
- exact timeout/non-response timing semantics;
- whether intent is mandatory;
- default access/authentication method;
- addendum acknowledgment rules;
- supplier digital signature/declaration need;
- line-level clarification granularity;
- exact behavior for post-close negotiation/revisions.

## 16. Impact on P1.1

No frozen P1.1 change required.

This strongly supports WEDGE-03: task-focused external tender participation can be modeled without a broad supplier portal while preserving deterministic evidence.

It also confirms the P1.1 forward note: non-response/timeout must be a distinct later state-machine concept, not conflated with decline/no-bid.

## 17. Next process dependency

P05 should reconstruct **Bid Normalization / Leveling / Comparison**. Supplier-origin submissions must remain immutable while internal teams build a canonical apples-to-apples decision view with traceable adjustments, clarifications and AI assistance.
