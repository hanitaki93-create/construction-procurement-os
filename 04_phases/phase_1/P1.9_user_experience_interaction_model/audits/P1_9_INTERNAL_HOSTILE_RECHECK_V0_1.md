# P1.9 — Internal Hostile Recheck v0.1

**Date:** 2026-08-01  
**Verdict:** `PASS — internal blockers closed; P1.9 is ready for Claude hostile audit.`

---

# 1. Remediation verification

## BL-P19-01 — CLOSED

`InteractionContinuationAnchor` exists before first effect-bearing transmission and provides durable recovery. Connection loss before response can no longer force blind resend or no-action ambiguity.

Tested:

- command reached server, response lost;
- request failed before acceptance;
- browser/tab closed;
- session expired during confirmation;
- support lookup under restricted context;
- changed target after anchor creation.

## BL-P19-02 — CLOSED

`ExternalSubmissionAcceptancePolicy` and closed `ExternalSubmissionDisposition` decide whether captured content is evidence-only, provisional, valid, rejected, withdrawn, superseded, late-limited or quarantined.

Only valid/explicit late-accepted responses enter governed population.

Tested:

- shared mailbox with unknown human;
- email after addendum without acknowledgment;
- buyer-on-behalf transcription;
- spoofed/unmatched sender;
- stale template;
- missing mandatory attachments;
- named-signatory requirement;
- late bid accepted under policy.

## BL-P19-03 — CLOSED

`SurfaceDisclosureProfile` and `DisclosureParityManifest` close placement and parity. Value-state/use/reliance consequences are inline where decision critical. Tooltip/badge/color/drill-only treatment is insufficient. Unsupported surfaces are prohibited.

Tested:

- mobile approval card;
- compact dashboard card;
- CSV/PDF/print;
- chat answer;
- email excerpt;
- subset/range/restricted/stale/indeterminate/restated values;
- disabled call to action.

## BL-P19-04 — CLOSED

`BulkExecutionPolicy` closes atomic, independent-continue, independent-stop and ordered-dependent modes with per-item identities and indeterminate behavior.

Tested:

- ten-recipient issue with one indeterminate;
- shared artifact dependency;
- partially eligible award batch;
- ordered addendum acknowledgments;
- cancel after some items start;
- whole-batch retry attempt;
- changed member set after correction.

---

# 2. Watch verification

- W-62 closed: localized labels bind canonical keys and cannot merge distinct outcomes.
- W-63 closed: grant transfer records old/new contact, revocation and notification without treating delivery/read as authority.
- W-64 closed: supported fallback modes declared per deployment/capability; no universal SLA invented.
- W-65 closed: mobile task-support class declared; fallback required where desktop needed.
- W-66 closed: copy/export policy explicit; no perfect-security claim.
- W-67 closed: reauthentication expiry executes nothing and forces current recheck/re-preview.

---

# 3. Hostile scenario matrix

## Interaction and authority

1. filter change triggers command — blocked;
2. drag/drop used as approval — prohibited;
3. draft auto-save appears authoritative — labelled proposal only;
4. user double-clicks confirm — same logical identity/result;
5. confirmation target changes — expires/re-preview;
6. represented principal changes — expires/re-preview;
7. authority revoked after preview — command denied;
8. hidden selected rows added after preview — frozen member set;
9. warning acknowledgment bypasses blocker — prohibited;
10. generic “Are you sure?” with no consequence — nonconforming.

## Acceptance/effect/recovery

11. server accepts then connection drops before response — continuation lookup;
12. request never accepted — same-anchor safe resume;
13. user lacks visible server InvocationId — anchor remains available;
14. timeout shown failed — prohibited when effect possible;
15. retry changes recipient — new command required, old reconciled;
16. cancel after possible send — future attempts stop only, no no-effect claim;
17. provider accepted shown delivered — prohibited;
18. approval recorded shown award completed — prohibited;
19. partial batch shown green — per-item mixed result;
20. indeterminate item retried via whole batch — prohibited.

## Bulk

21. independent recipients continue after one pre-acceptance failure — policy-defined;
22. independent recipients stop after blocking — policy-defined;
23. ordered dependent item starts too early — blocked;
24. false atomicity across external sends — ATOMIC mode unavailable;
25. shared artifact version changes mid-batch — stop/new batch;
26. selection uses visible page only while label says all — blocked/frozen query snapshot;
27. correction changes member set — new batch identity;
28. cancellation hides completed items — prohibited;
29. per-item unknown averaged away — prohibited;
30. mixed outcome labelled completed — prohibited.

## External grants and submissions

31. link forwarded to competitor — no transfer; block/reissue;
32. contact leaves company — revoke/reissue;
33. shared mailbox response — actor assurance/limitation;
34. colleague needs access — bounded transfer/team grant;
35. email spoof/mismatch — quarantine/evidence-only;
36. buyer transcribes wrong amount — source/transcription difference;
37. buyer capture appears supplier-authored — prohibited;
38. response lacks terms acknowledgment — provisional/evidence-only/rejected by policy;
39. addendum changes after response — exact version treatment;
40. stale spreadsheet imported — block/remap proposal;
41. partial import appears submitted — prohibited;
42. submission receipt says awarded — prohibited;
43. no-response treated decline — prohibited;
44. withdrawn response erased — history retained;
45. optional account exposes other buyer — prohibited;
46. network activity enters supplier score — prohibited;
47. late response included without policy — prohibited;
48. email attachment automatically normalized/accepted — prohibited.

## Evidence/communication

49. upload satisfies evidence prerequisite before acceptance — prohibited;
50. normalized grid edits source — prohibited;
51. annotation “approved” creates approval — prohibited;
52. same hash merges business evidence — prohibited;
53. current URL replaces historical source — prohibited;
54. issued file overwritten — new version/issue;
55. provider acceptance shown receipt/ack — prohibited;
56. evidence retraction reverses domain state — prohibited;
57. disposed evidence looks absent — limitation/tombstone;
58. malicious attachment instructs agent — untrusted data;
59. edited export re-enters as truth — bounded import/proposal;
60. restricted search snippet leaks content — prohibited.

## Reporting/disclosure

61. subset shown as total on card — inline not-total requirement;
62. range shown midpoint — prohibited;
63. stale source with “updated now” — render/result/source times separate;
64. generic Actual — prohibited where ambiguous;
65. restricted project omitted from total — block/safe aggregate/subset/range;
66. tooltip-only limitation — nonconforming;
67. compact mobile hides use block — prohibited surface/profile;
68. CSV loses semantics — parity manifest fails;
69. issued link opens current data — prohibited;
70. restatement hidden — nonconforming;
71. old report used for new award — current reliance required;
72. filter silently changes denominator — prohibited;
73. first page claimed all — completeness exposed;
74. safe aggregate enables differencing — disclosure policy blocks;
75. chat omits subset state — parity fails;
76. acknowledgment clears limitation — prohibited.

## Queues/errors/fallback

77. task card moved to done changes domain — prohibited;
78. observation acknowledgment clears predicate — prohibited;
79. accepted variance shown compliant — prohibited;
80. generic retry after timeout — prohibited;
81. field error no correction suggestion — nonconforming where known;
82. offline file bypasses validation — prohibited;
83. interrupted upload satisfies prerequisite — prohibited;
84. support user edits truth directly — prohibited;
85. unsupported fallback hidden until deadline — deployment declaration required;
86. reauth expires and command executes — prohibited.

## Accessibility/localization

87. pointer-only drag action — nonconforming;
88. screen reader misses async status — nonconforming;
89. focus skips material limitation — nonconforming;
90. color-only approval state — nonconforming;
91. Arabic layout reverses amount/description meaning — nonconforming;
92. timezone ambiguity causes due error — exact timezone required;
93. comma/decimal parsing changes price — semantic value/locale separation;
94. translation treated as source evidence — prohibited;
95. mobile screen removes consequence — prohibited/task support declaration;
96. distinct outcomes translated identically — canonical-key disambiguation required.

## Chat coexistence

97. “approve it” ambiguous — resolve or abstain;
98. “send to them” wrong recipient risk — exact preview;
99. old session report used current — prohibited;
100. hidden agent-only write — prohibited;
101. chat unavailable — conventional route complete;
102. prompt injection in evidence — ignored as instruction;
103. cross-tenant supplier recommendation — prohibited;
104. chat yes after preview expiry — new confirmation;
105. vague all creates bulk population — freeze/preview;
106. AI confidence overrides use block — prohibited.

## Activation/scope

107. no connector — manual/file path works;
108. no persistent supplier account — secure/email/buyer capture works;
109. no chat/AI — conventional thread works;
110. no P07 — AwardDecision/handoff works;
111. generic page/form builder requested — out;
112. supplier marketplace requested — out;
113. collaboration/CDE/GRC/BPM gravity — out;
114. frontend implementation requested inside P1.9 — locked.

---

# 4. Gate check

- G1 operation mapping/authority/evidence/consequence/result — PASS.
- G2 query/proposal/command/acceptance/effect distinction — PASS.
- G3 navigation/tasks/queues no second root — PASS.
- G4 approval/DOA/delegation/irreversible action — PASS.
- G5 evidence/normalized/evaluation/issued layers — PASS.
- G6 issue/send/delivery/read/ack/effect — PASS.
- G7 limitation/disclosure parity/no laundering — PASS.
- G8 issued/current/restated/reliance — PASS.
- G9 external low-friction/no network — PASS.
- G10 grant/recipient/forwarding/response validity — PASS.
- G11 control queues no workflow/GRC truth — PASS.
- G12 error/continuation/bulk/unknown-effect recovery — PASS.
- G13 accessibility/mobile/localization/RTL — PASS semantic floor.
- G14 conventional A0–A3 no connector/chat/AI/account/P07 — PASS.
- G15 upstream regression/one-XL/product-code lock — PASS.
- G16 internal hostile PASS / Claude packet may be built — PASS.

---

# 5. Regression and scope

- P1.1 REOPEN = NO.
- P1.2 REGRESSION = NO.
- P1.3 REOPEN = NO.
- P1.4 REOPEN = NO.
- P1.5 REOPEN = NO.
- P1.6 REOPEN = NO.
- P1.7 REOPEN = NO.
- P1.8 REOPEN = NO.
- SECOND XL = CLEAN.
- A0–A3 ACTIVATION = CLEAN.
- PRODUCT CODE = LOCKED.
- P1.10 = LOCKED.

---

# 6. Candidate ADR posture

Internal recommendation:

- ADR-0016 — ACCEPT semantic decision;
- ADR-0038 — ACCEPT semantic decision;
- ADR-0039 — ACCEPT semantic decision;
- ADR-0040 — ACCEPT semantic decision;
- ADR-0041 — ACCEPT semantic decision.

No status changes until Claude PASS and final reconciliation.

---

# 7. External audit readiness

`PASS — build self-contained Claude packet. P1.9 remains ACTIVE; do not close or unlock P1.10 before external PASS and final checkpoint.`