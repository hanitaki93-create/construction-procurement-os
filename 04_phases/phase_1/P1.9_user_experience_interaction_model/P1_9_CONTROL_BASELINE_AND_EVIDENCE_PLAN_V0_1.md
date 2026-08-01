# P1.9 — UX & Interaction — Control Baseline and Evidence Plan v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE CONTROL BASELINE  
**Parent:** `P1_9_WORKPLAN_V0_1.md`  
**P1.8:** PASS / CLOSED / FROZEN  
**P1.9:** ACTIVE  
**P1.10+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

Establish the evidence and control surface before pages, navigation, forms, confirmations, portals, queues or dashboards are treated as architecture.

This baseline prevents:

- copying competitor screens without authority/evidence meaning;
- treating convenience as proof of safety;
- presuming suppliers will tolerate mandatory account/network onboarding;
- hiding semantic limitations in later visual design;
- inventing a generic form/workflow/page builder;
- allowing frontend technology to decide domain semantics.

---

# 2. Evidence hierarchy

1. frozen P1.4–P1.8 architecture and accepted ADRs;
2. P1.2 contractor/workflow evidence and exact transaction artifacts;
3. supplier-side or buyer-side primary interaction evidence;
4. applicable contractual/legal/accessibility obligations;
5. official product documentation demonstrating current interaction practice;
6. professional practice;
7. internal hypothesis.

Official product practice may supply patterns and hostile scenarios but cannot override frozen boundaries or establish mandatory product scope.

---

# 3. Frozen interaction obligations

The following are not research questions:

- every authoritative action uses a registered bounded operation;
- authority/evidence/guard failure cannot be bypassed through UI;
- proposal is not command;
- command acceptance is not established effect;
- UI grouping is not domain ownership;
- current authority is checked for every action;
- external grant is not internal authority;
- upload is not accepted evidence/source truth;
- report/result limitations are load-bearing;
- no mandatory supplier network;
- conventional A0–A3 path works without chat/AI/connectors;
- cross-tenant business data and influence remain isolated;
- product code remains locked.

---

# 4. Controlled terms

| Term | Controlled meaning |
|---|---|
| Interaction surface | Any conventional, external, mobile, export or conversational place where information or operations are exposed |
| Operation affordance | An authorized opportunity to initiate a specific registered operation; not a generic button |
| Operation preview | Non-authoritative pre-execution representation of exact proposed command context, consequences, evidence and guards |
| Consequence summary | Exact human/machine-visible effects the operation seeks, including what it does not establish |
| Authority disclosure | Principal, represented principal, role/delegation, scope and current eligibility shown for the action |
| Confirmation | Deliberate finalization after review; never a substitute for guards or authority |
| Interaction outcome | Typed accepted/rejected/pending/partial/unknown/effect-established result with recovery identity |
| Work context | Navigation/task context binding tenant, project, authority context and canonical identities; not a business root |
| External task grant | Bounded tenant-private right for an external principal to view/submit/acknowledge exact task/version/scope |
| Buyer-on-behalf capture | Internal capture of externally originated content with explicit external source occurrence and internal actor attribution |
| Load-bearing disclosure | Information required to preserve authority, limitation, history or use meaning at the action/decision surface |
| Compact presentation | Reduced layout that must preserve load-bearing disclosures and cannot upgrade meaning |
| Manual fallback | Governed conventional/file/buyer-capture route preserving the same authority/evidence/identity semantics |

---

# 5. Threat register

## TH-P19-01 — hidden command

A row toggle, drag/drop, navigation, auto-save, keyboard shortcut or chat wording performs a state change without explicit operation meaning.

## TH-P19-02 — confirmation laundering

A generic confirmation modal replaces authority/evidence/consequence disclosure or trains click-through behavior.

## TH-P19-03 — accepted equals completed

The interface says “done” after command acceptance while external/domain effect remains pending, partial or indeterminate.

## TH-P19-04 — stale-view command

The user acts on an obsolete version or changed population without conflict/re-preview.

## TH-P19-05 — task list becomes truth

Manual queue status or card movement is treated as domain status.

## TH-P19-06 — universal case root

A generic “procurement case” screen owns requirement, tender, award, Commitment, evidence and reporting meaning.

## TH-P19-07 — evidence-layer collapse

Supplier source, normalized value, buyer adjustment and issued basis are edited in one indistinguishable grid.

## TH-P19-08 — report limitation laundering

Subset, range, stale, restricted or restated values appear as ordinary headline totals in cards, exports or chat.

## TH-P19-09 — restricted means absent

Hidden rows/categories appear to the caller as zero/no records/full completeness.

## TH-P19-10 — external link forwarding

A task link forwarded to another person silently transfers authority or leaks bid contents.

## TH-P19-11 — shared mailbox ambiguity

Responses from a shared mailbox cannot identify the acting human or permitted supplier relationship.

## TH-P19-12 — buyer-on-behalf impersonation

Internal capture appears as supplier-authored structured truth without preserving source occurrence and actor.

## TH-P19-13 — revision overwrite

A supplier revision replaces the prior response or bypasses changed tender/addendum acknowledgment.

## TH-P19-14 — bulk action ambiguity

Mixed eligibility, partial success or unknown effects are hidden behind one “success” message.

## TH-P19-15 — asynchronous silence

Upload, issue, import or external call progress/error is not accessible or recoverable.

## TH-P19-16 — chat-only dependency

Essential search, explanation or action requires AI/chat.

## TH-P19-17 — portal/network gravity

External participation requires persistent account, cross-buyer profile or marketplace membership.

## TH-P19-18 — offline/file shadow truth

Downloaded spreadsheets or emailed files return as authoritative state without bounded import/capture.

## TH-P19-19 — inaccessible consequential action

Keyboard, screen-reader, status, focus, error or confirmation behavior makes important action unsafe.

## TH-P19-20 — localization corruption

RTL, timezone, date, decimal, currency or language presentation changes business meaning.

---

# 6. Open evidence questions

1. What minimum task depth must external suppliers complete directly versus by email/file/buyer capture?
2. When is persistent account beneficial enough to remain optional rather than prohibited?
3. What assurance is needed for secure task links and high-confidentiality tenders?
4. How are forwarded links/shared mailboxes/changed contacts governed?
5. What revision/addendum acknowledgment is required before resubmission?
6. Which high-consequence operations need review, correction or reversibility safeguards?
7. Which status/progress/error updates require immediate accessible announcement?
8. Which mobile/RTL/localization obligations are semantic rather than visual?
9. How must compact cards, exports and chat preserve limitations?
10. What manual/offline fallback preserves identity and evidence without becoming shadow truth?

---

# 7. Targeted evidence plan

Capture official evidence only against the open questions:

- construction bidding platforms: invitation, response, revision, email submission, buyer-on-behalf, bidder access and network assumptions;
- enterprise sourcing: secure link/OTP, optional account, offline import/export, response history, revisions, terms/addenda and messaging;
- accessibility: consequential submission review/correction/reversal, error identification/suggestion, programmatic status/progress messages, keyboard/assistive compatibility;
- internationalization: Arabic/RTL base direction and bidirectional text handling.

Every captured observation records:

- source/provider/date/version;
- exact observed behavior;
- semantic question supported;
- limitation/marketing status;
- candidate rule;
- whether it conflicts with frozen architecture.

---

# 8. Evidence acceptance rules

A load-bearing decision requires:

- frozen semantic consistency;
- decision-use relevance;
- exact source/behavior;
- no inference from visual styling alone;
- no assumption that a vendor’s network, account or data model is necessary;
- explicit primary-evidence debt where supplier-side evidence is insufficient.

Screenshots, promotional claims and popularity are insufficient by themselves.

---

# 9. Primary evidence debt

ADR-0016 remains evidence-limited because current project evidence does not fully establish supplier tolerance for persistent accounts, mobile use, language needs or task depth across the UAE contractor market.

Safe response:

- freeze a low-burden bounded hybrid minimum;
- make persistent accounts optional;
- preserve email/file/buyer-capture fallback;
- create no cross-tenant network dependency;
- carry supplier-side validation debt into later validation, not semantic ambiguity.

---

# 10. Candidate ADRs

- ADR-0016 — bounded hybrid external participation;
- ADR-0038 — operation interaction and typed outcome;
- ADR-0039 — work context and no second root;
- ADR-0040 — load-bearing disclosure and report-history interaction;
- ADR-0041 — safe recovery, accessibility, localization and conventional/chat coexistence.

No status change before external PASS.

---

# 11. Evidence-to-design gate

Metric/page/task design may proceed only where:

- frozen source/authority meaning is known;
- external participation mode has a no-account/no-network fallback;
- consequential action can expose exact consequence and recovery;
- limitation/history semantics can survive all surfaces;
- unresolved evidence debt is declared without weakening safety.
