# P03 — Tender/RFQ Package + Release Control v0.1

**Status:** SECONDARY_REFERENCE / PROVISIONAL / AUDIT LATER  
**P1.2 purpose:** define a reliable market-facing tender event without assuming the planning `ProcurementPackage` itself is the released tender or allowing post-release scope changes to become invisible.  
**Primary CAL-001 status:** RFQ/RFP and supplier quotation flow is supported; package/version/release mechanics remain UNKNOWN.

## 1. Problem to solve

The system must answer deterministically:
- what exact scope/documents/commercial instructions were released;
- which procurement package/demand basis caused the tender;
- what suppliers were intended to receive it;
- what structured price/response breakdown was requested;
- when it opened/closes and what milestones apply;
- whether confidentiality or technical prerequisites apply;
- what changed after release;
- which release/addenda every submitted bid responded against.

The market-facing tender cannot be a mutable folder whose contents silently change while suppliers are pricing.

## 2. Strong reference patterns

### Procore
`SREF-0026` requires a bid package and bid form, with sections/line items used to standardize supplier responses and allow later side-by-side leveling. Plain-text/general items remain possible, avoiding cost-code-only rigidity. `SREF-0024` separates bidder invitation from package/form preparation and can gate access with an NDA.

### CMiC
`SREF-0025` treats a bid package as a distinct market artifact containing scope, dates, bidders, buyout items, inclusions, exclusions, alternates, special pricing, attachments and addenda. `SREF-0028` separately records addenda and communication history.

### ProcurePro
`SREF-0030` describes a standard flow of complete scope/document preparation, issue/track, clarifications/addenda, structured return, leveling, negotiation, recommendation and approval.

## 3. Provisional object boundary

### 3.1 `TenderEvent`
One sourcing attempt/round for a defined market requirement.

A `ProcurementPackage` may have:
- no tender event yet;
- one tender event;
- multiple rounds/re-tenders;
- direct-source event or exception path.

Therefore `ProcurementPackage != TenderEvent`.

Candidate identity:
- immutable tender-event ID;
- originating package/demand allocations;
- project/legal entity;
- procurement owner;
- tender method/type;
- release baseline/version;
- key dates;
- confidentiality/access policy;
- response structure reference;
- commercial instruction reference;
- bidder-selection version;
- current tender round/state.

### 3.2 `TenderRelease`
An immutable market-facing release/version.

Candidate content snapshot:
- scope of works / specification;
- drawings/document register + versions;
- BOQ/price schedule/bid form;
- quantities/UOM where applicable;
- programme/milestones / required dates;
- terms and conditions / payment/commercial instructions;
- submission instructions;
- bid due date/time/timezone;
- RFI/clarification cutoff;
- site visit/pre-bid meeting details;
- bonds/insurance requirements;
- alternates/options;
- required return schedules/declarations;
- confidentiality/NDA requirements.

The release must preserve document identity/version rather than only current file links.

### 3.3 `ResponseStructure`
The requested pricing/technical breakdown used to improve comparability.

May contain:
- sections/trades;
- line items;
- quantity/UOM;
- response type: rate / amount / text / yes-no / attachment / date;
- base bid;
- alternates;
- provisional sums/allowances;
- optional free-form/general items.

It is not assumed every supplier can return perfectly structured data; P05 normalization handles messy returns.

### 3.4 `TenderAddendum`
A controlled post-release amendment/clarification issued to affected bidders.

It must reference:
- prior release;
- changed documents/fields;
- reason/source;
- issue time;
- affected bidder set;
- communication/delivery history;
- whether acknowledgment or revised submission is required.

An addendum extends the released history; it never rewrites the original release.

## 4. Critical distinction — package vs event vs release

### `ProcurementPackage`
Internal planning/sourcing container spanning the lifecycle.

### `TenderEvent`
One market solicitation attempt/round.

### `TenderRelease`
The exact version of the event exposed to suppliers at a point in time.

This separation supports:
- retendering without duplicating the package;
- multiple releases/addenda;
- audit of what each bidder actually saw;
- cancellation/reissue;
- historical price comparisons.

## 5. Candidate lifecycle

### Tender event
`DRAFT → INTERNAL_REVIEW → READY_TO_RELEASE → OPEN → CLOSED_FOR_SUBMISSION → EVALUATION → AWARD/NO_AWARD/RE_TENDER → CLOSED`

Possible terminal/exception states:
- `CANCELLED`;
- `SUPERSEDED`;
- `NO_VALID_BIDS`.

Names remain provisional.

### Tender release
`DRAFT → RELEASED → SUPERSEDED_BY_ADDENDUM/NEW_RELEASE`

Released content is immutable.

## 6. Release prerequisites

Candidate default before first release:
- tender owner and project/entity known;
- originating procurement basis linked;
- minimum scope description present;
- release document/version set identifiable;
- response structure defined enough for intended comparison;
- dates/timezone defined;
- selected bidder set exists;
- access/confidentiality policy resolved;
- required internal approval complete under configured policy;
- unresolved critical technical prerequisites explicitly flagged/excepted.

A privileged early-tender exception may exist for incomplete design, but missing information must be visible and later addenda controlled.

## 7. Tender integrity policy

### After release
The following may not be silently edited in place:
- scope;
- drawings/spec versions;
- response lines;
- terms;
- due date;
- required submission schedules;
- material commercial conditions.

Changes require:
- addendum/new release;
- actor/time/reason;
- affected bidder set;
- delivery communication;
- explicit impact on deadline/re-submission where applicable.

Minor internal metadata that is not supplier-facing may remain editable with audit.

## 8. Bidding visibility policy

The system should support policy options such as:
- `OPEN_INTERNAL_VISIBILITY` — authorized internal users can see bids as submitted;
- `BLIND_UNTIL_DEADLINE` — bid values hidden until due date or controlled reveal;
- `CONTROLLED_REVEAL` — designated authority may reveal with audit.

`SREF-0001` / Procore references show blind bidding as a mature pattern; therefore architecture should not assume immediate internal visibility.

Supplier-to-supplier confidentiality is invariant: one bidder must never see another bidder's pricing/submission through tender access.

## 9. Load-bearing invariants

1. **Released tender content is versioned evidence.** No destructive post-release editing.
2. **Package and tender round are distinct.** Re-tender does not erase the original sourcing attempt.
3. **Every bid links to the release/addenda basis it responded against.**
4. **Bidder set is versioned.** Late additions/removals are visible.
5. **Response structure is durable.** Later normalization can extend/align it but cannot rewrite what the supplier was asked to price.
6. **Deadlines are timezone-specific and historically reproducible.**
7. **Addenda communication is auditable.** Issued is not the same as delivered/acknowledged.
8. **Confidentiality is access-controlled by bidder/company identity.**
9. **Internal approval to release is separate from supplier invitation delivery.**
10. **Cancelled/superseded events remain evidence.**

## 10. Edge cases the process must survive

### E01 — Package retendered after poor coverage
First tender gets one unusable quote.

Required: same ProcurementPackage, new TenderEvent or defined new round; preserve first event/submissions.

### E02 — Drawings change mid-tender
Engineer issues revised drawing.

Required: addendum/versioned release; identify affected scope and notify all active bidders.

### E03 — Due date extended
Commercial team gives bidders more time.

Required: governed tender update with old/new deadline and notification history.

### E04 — One bidder added late
New vendor joins after release.

Required: bidder-selection delta + access to current release/addenda set; no hidden shortcut.

### E05 — One bidder removed/revoked
Vendor conflict/suspension discovered.

Required: preserve prior access/invitation; revoke future access under policy and record reason.

### E06 — Incomplete design / early procurement
Package must go to market before all drawings are final.

Required: explicit design/completeness posture + missing information register + controlled addenda, not fake completeness.

### E07 — Multiple trade sections in one tender
Supplier may price some sections only.

Required: structured sections + per-section eligibility/submission; no forced all-or-nothing tender.

### E08 — Lump-sum tender with no BOQ
Scope is document-driven.

Required: allow simple amount + commercial response fields; structured response is useful but not mandatory at arbitrary detail.

### E09 — Two-stage procurement
Stage 1 captures rates/fees/allowances; Stage 2 finalizes package.

Required: linked tender rounds/stages with preserved stage-specific response basis.

### E10 — Alternate/VE proposal
Bidder submits compliant base plus alternative design/product.

Required: separate base vs alternate response; comparison must not mix them silently.

### E11 — Confidential tender
NDA must be signed before documents become accessible.

Required: invitation may exist before access; access grant is a distinct event.

### E12 — Blind bid
Authorized users must not see values until reveal condition.

Required: access rule at data layer/audit, not UI-only hiding.

## 11. Failure patterns to reject

Fail later audit if design:
- uses ProcurementPackage itself as the only tender record;
- allows released scope/drawings to be replaced silently;
- loses original due dates after extensions;
- cannot tell what release a bid responded to;
- requires every tender to use a fixed global BOQ schema;
- makes free-form/lump-sum procurement impossible;
- exposes one bidder's response to another bidder;
- treats email sent as proof of supplier access/acknowledgement;
- overwrites a failed/re-tendered event;
- hides bid values only in UI while backend permissions still expose them.

## 12. Candidate flow

`Approved/releasable ProcurementPackage`

`→ create TenderEvent`

`→ assemble TenderRelease {scope + docs + response structure + commercial instructions + dates}`

`→ internal release review/approval`

`→ freeze release version`

`→ issue invitations/access`

`→ clarifications/addenda`

`→ close submission`

`→ P05 normalization/leveling`

`→ P06 governed award / re-tender / no-award`

## 13. Primary audit tests for later

1. Does contractor distinguish procurement package from actual RFQ/tender round?
2. What documents comprise a normal tender pack?
3. Which fields are standardized and which remain PDF/email based?
4. Can tenders be issued before full design approval?
5. How are addenda/revised drawings distributed and proven received?
6. How are due-date extensions handled?
7. Are bid values blind before close in any cases?
8. How often are bidders added after issue?
9. Does retender create a new package, revision, or separate event?
10. What happens when supplier claims they priced an old drawing revision?
11. How are alternates/VE proposals captured?
12. What internal approval is required before market release?

## 14. Current disposition

### Strong enough to carry forward provisionally
- separate ProcurementPackage / TenderEvent / TenderRelease;
- immutable released versions;
- addenda as controlled amendments;
- structured response form with free-form escape hatch;
- explicit tender dates/timezone;
- bidder-set versioning;
- optional blind-bid policy;
- access/confidentiality enforced below presentation layer.

### Still unresolved
- exact round vs new-event semantics for re-tender;
- default response schema breadth;
- whether all addenda require bidder acknowledgement;
- release approval thresholds;
- RFI/clarification object depth;
- document-store ownership vs external CDE references;
- default blind/open policy.

## 15. Impact on P1.1

No frozen P1.1 change required.

This strengthens:
- Tender/RFQ as a first-class event;
- evidence/version/provenance requirements;
- canonical response structure;
- bounded supplier access.

It does not require a full document-management/CDE product or generalized workflow engine in V1.

## 16. Next process dependency

P04 should reconstruct **External Tender Participation / Intent / Submission / Revision / Clarification** so the supplier path remains low-friction while still producing deterministic evidence and correctly distinguishing decline from non-response.
