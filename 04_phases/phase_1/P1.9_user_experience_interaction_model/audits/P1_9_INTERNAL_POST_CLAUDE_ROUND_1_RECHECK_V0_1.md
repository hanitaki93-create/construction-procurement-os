# P1.9 — Internal Post-Claude-Round-1 Hostile Recheck v0.1

**Date:** 2026-08-01  
**Scope:** BL-P19-05, W-62–W-66 and full P1.9 regression  
**Candidate:** `P1_9_INTEGRATED_USER_EXPERIENCE_INTERACTION_CANDIDATE_V0_3.md`  
**Verdict:** PASS / CLAUDE ROUND 2 READY  
**P1.9:** ACTIVE  
**P1.10+:** LOCKED  
**Product code:** LOCKED

---

# 1. Verdict

`PASS — BL-P19-05 and W-62–W-66 are closed; P1.9 is ready for Claude hostile audit Round 2.`

No new semantic blocker was found.

The field/schema remediation closes the only remaining page/form gravity path without preventing ordinary narrative qualifications, attachments, alternates, buyer capture or later AI-assisted normalization.

---

# 2. BL-P19-05 closure

## 2.1 Why the blocker is closed

A load-bearing response/comparison value now requires:

- one exact product-owned `RegisteredSemanticFieldKey`;
- one versioned typed family;
- exact layer, grain, value/unit/currency/time semantics;
- product-defined validation and normalization/comparison eligibility;
- exact schema version and compatibility treatment.

Tenant configuration is selection and bounded constraint over registered meaning. It cannot author meaning, formulas, conditions, joins, executable validation, state, effects or metric populations.

Unregistered/free-text content remains source evidence and may be normalized only by a bounded proposal plus explicit command preserving source lineage and differences.

Internal surfaces inherit the same boundary.

New families require prospective architecture change and hostile review.

Therefore neither frontend implementation nor P1.10 may choose between fixed product semantics and tenant-authored form semantics: the former is controlling.

## 2.2 The worked failure now resolves

Tenant requests:

- free text labelled `Rate (incl. attendance)`;
- decimal labelled `Rate`.

Resolution:

- the free-text field is `FREE_TEXT_EVIDENCE_ONLY` unless it binds a registered load-bearing semantic key;
- the decimal field is load-bearing only if it binds an exact registered role such as `UNIT_RATE_EXCLUDING_TAX` or another supported key;
- a label cannot create or override that role;
- differing registered roles are not directly comparable;
- mapping narrative content into a registered role requires explicit normalization with source lineage;
- a schema change creating or changing the semantic role creates a new version and comparability impact assessment.

No plausible tenant-authored load-bearing meaning remains.

---

# 3. Watch closure

## W-62 — CLOSED

V1 persistent workspace is tenant/buyer-relationship scoped. Reusable technical authentication may exist, but cross-tenant business profile, task history, grants, performance, reputation, benchmark and marketplace/network mode are prohibited.

## W-63 — CLOSED

Submission receipt exposes disposition, population-entry status, outstanding requirements, exact established meaning and explicit non-meaning inline/directly adjacent across all channels.

## W-64 — CLOSED

Confirmation binds exact acting and represented principal. Submission rechecks the same binding and current authority/DOA/access. A different principal invalidates the confirmation.

## W-65 — CLOSED

`AnchorAvailabilityProof` requires a user/channel-retrievable anchor before effect-bearing transmission. Same-round-trip server creation does not qualify.

## W-66 — CLOSED

Every consequential operation binds `ConfirmationInvalidationPolicyVersion`; default is invalidate on any load-bearing change unless a registered policy proves a bounded non-material class. Tenant formulas/conditions are prohibited.

## Accessibility watch — CLOSED AS ARCHITECTURE TARGET

V1 first-party web supported journeys target WCAG 2.2 Level AA. Exact testing/certification tooling remains later physical/NFR work. Equivalent accessible fallback is required where third-party/document/file channels cannot meet the supported journey.

---

# 4. Hostile scenario recheck

The recheck attacked 146 semantic scenarios. Representative results follow.

## 4.1 Field authorship and semantic smuggling

1. Tenant creates arbitrary money field — BLOCKED; registered semantic key required.
2. Tenant labels a field `Rate including attendance` while key means excluding attendance — INVALID conflicting label.
3. Tenant uses generic decimal as unit rate — EVIDENCE/INPUT ONLY unless registered role bound.
4. Tenant changes currency role through label — BLOCKED.
5. Tenant changes quantity UOM without semantic version — BLOCKED.
6. Tenant creates percentage without denominator/basis — BLOCKED.
7. Tenant creates lead-time number without duration/calendar role — BLOCKED.
8. Tenant creates custom enum with load-bearing options — BLOCKED unless product-registered.
9. Tenant creates free-text compliance value — evidence-only.
10. Tenant creates arbitrary boolean called `Compliant` — blocked as load-bearing without exact proposition key.
11. Tenant creates computed total — prohibited source field; product-defined derived normalization only.
12. Tenant authors formula or script — BLOCKED.
13. Tenant authors conditional branching — BLOCKED.
14. Tenant authors cross-field validation expression — BLOCKED.
15. Tenant authors regex to create new semantic type — BLOCKED unless product-defined bounded validator.
16. Tenant creates runtime source lookup/join — BLOCKED.
17. Tenant creates custom status/effect field — BLOCKED.
18. Tenant creates arbitrary repeated row children — BLOCKED; registered group/children required.
19. Tenant creates one-off comparison axis — evidence-only or architecture extension.
20. Tenant copies a spreadsheet column into comparison — evidence-only until registered normalization.

## 4.2 Legitimate flexibility retained

21. Supplier adds narrative qualification — retained as source evidence.
22. Supplier adds alternate brand/model — registered reference where supported or evidence-only pending normalization.
23. Supplier attaches technical datasheet — exact attachment evidence.
24. Supplier states exclusions in free text — evidence-only, visible and attributable.
25. Buyer captures phone/email amount — source occurrence preserved; registered-field transcription proposed/reviewed.
26. Supplier offers alternate unit — source preserved; conversion/mapping only under registered policy.
27. Supplier leaves commentary in Arabic — evidence retained; translation derived and non-authoritative.
28. Tender needs a new genuine commercial field family — prospective architecture change, not runtime tenant design.
29. Optional narrative field becomes required for participation — permitted only if registered field policy allows and schema version changes.
30. Tenant changes field order/help text — presentation revision only if meaning/validity unchanged.

## 4.3 Schema versioning and comparison

31. Requiredness changes after invitations — new schema/event version and prior-response treatment.
32. Enum meaning changes — new semantic version.
33. Label-only typo correction — presentation revision if canonical meaning unchanged.
34. Same semantic key across compatible versions — direct comparison permitted under compatibility policy.
35. Same label but different semantic key — not comparable.
36. Same type but different monetary role — not comparable.
37. Stale spreadsheet parses successfully — blocked as stale version.
38. Old response remains evidence after schema change — preserved; current validity per event policy.
39. Explicit registered mapping between versions — proposal/review and lineage required.
40. Unknown/unregistered column — evidence-only and excluded from normalized total.
41. Response valid at submission level but contains evidence-only narrative — response may enter population; narrative does not become normalized value.
42. Mandatory load-bearing field unresolved — disposition follows acceptance policy; cannot silently enter as complete normalized response.
43. Product adds new semantic key prospectively — versioned activation and hostile review.
44. Registry becomes tenant ontology editor — prohibited.
45. Registry becomes generic form builder — prohibited.

## 4.4 External workspace and identity

46. One technical login used for two buyers — separate tenant-private workspaces and grants.
47. Workspace shows cross-buyer tasks — BLOCKED.
48. Workspace imports supplier profile authority — BLOCKED.
49. Cross-tenant performance/reputation — BLOCKED.
50. Supplier marketplace discovery — OUT for V1.
51. First participation forced into account signup — BLOCKED.
52. Contact transfer leaves old access live — BLOCKED; effective revocation required.
53. Shared mailbox submission — actor-assurance limitation and exact policy.
54. Forwarded link — no grant transfer.
55. Buyer-on-behalf capture impersonates supplier — prohibited; internal capture/source attribution remains explicit.

## 4.5 Receipt and response validity

56. Receipt says `submitted successfully` while provisional — disposition and non-meaning inline.
57. Receipt implies compliance — prohibited.
58. Receipt implies award — prohibited.
59. Receipt omits outstanding addendum — invalid disclosure.
60. Email receipt loses disposition — DisclosureParityManifest failure; surface prohibited until fixed.
61. PDF receipt loses schema version — parity failure.
62. Status lookup defaults to latest revision without history — prohibited.
63. Valid submission contains unsupported attachment content — content remains untrusted/evidence; validity/normalization separate.
64. Email arrives unmatched — quarantined.
65. Late submission accepted — exact late limitation.

## 4.6 Confirmation, reauthentication and continuation

66. Different user completes another user’s confirmation — invalid; re-preview required.
67. Same user reauthenticates with restored assurance — allowed only after current checks/no invalidation.
68. Represented principal changes — confirmation invalid.
69. Recipient changes — confirmation invalid by default.
70. Evidence version changes — confirmation invalid by default.
71. Field/schema meaning changes — confirmation invalid.
72. Tenant defines materiality threshold — prohibited.
73. Product-defined bounded non-material display change — may preserve under policy.
74. Anchor created only during effect-bearing call — action blocked.
75. Server reserves and acknowledges anchor first — permitted.
76. Client creates/persists logical command identity — permitted.
77. Channel task embeds retrievable submission identity — permitted.
78. Local anchor lost but server lookup accessible — recovery via independently retrievable reference.
79. No proof of anchor availability — action blocked.
80. Connection dies after effect call — lookup/reconciliation, no blind resend.

## 4.7 Bulk, operation and effect

81. Bulk form submit contains independent suppliers — explicit independent mode.
82. One item indeterminate — no whole-batch resend.
83. Dependent item executes before predecessor — blocked.
84. False provider atomicity — prohibited.
85. Visible-page bulk selection claimed all — frozen member/query snapshot required.
86. Approval card performs AwardDecision directly — prohibited separate command.
87. Upload auto-submits — prohibited.
88. Navigation drag changes domain state — prohibited.
89. Provider accepted shown delivered — prohibited.
90. Accepted request shown effect established — prohibited.

## 4.8 Disclosure/report/history

91. Subset shown as headline total — prohibited surface.
92. Range shown as midpoint — prohibited.
93. Tooltip-only limitation — insufficient.
94. Compact mobile hides blocked-use consequence — prohibited.
95. CSV loses value-state label — parity failure.
96. Chat omits limitation — parity failure.
97. Old issued report opens current value — prohibited.
98. Restated report used without reliance check — blocked.
99. Restricted records appear absent — prohibited.
100. Receipt/disposition hidden in secondary page — invalid when load-bearing.

## 4.9 Accessibility/localization

101. Keyboard cannot submit/review — nonconforming.
102. Screen reader misses error/status — nonconforming.
103. Focus lost after validation — nonconforming.
104. Arabic RTL reverses amount/description association — nonconforming.
105. Mixed Arabic/Latin identifier becomes ambiguous — nonconforming.
106. Date lacks timezone — invalid where material.
107. Decimal/currency locale changes value — prohibited.
108. Translation becomes source evidence — prohibited.
109. Third-party file flow inaccessible with no fallback — blocked.
110. WCAG target silently downgraded by tenant — prohibited.

## 4.10 A0–A3 and scope

111. First tender with manual capture — supported.
112. No connector — supported.
113. No supplier account — supported.
114. No chat/AI — supported.
115. No P07 — supported.
116. New field need forces generic form builder — rejected; controlled extension only.
117. Field registry becomes a standalone ontology product — rejected.
118. Workflow/BPM growth — rejected.
119. CDE growth — rejected.
120. GRC/case growth — rejected.
121. BI/dashboard builder growth — rejected.
122. Supplier network growth — rejected.
123. AI/copilot subsystem growth — rejected.
124. Product code starts in P1.9 — prohibited.

## 4.11 Regression and subtle cases

125. Registered source field treated as authoritative normalized value automatically — prohibited; layer binding controls.
126. Evidence-only text omitted from buyer review — invalid if applicable/required by task.
127. Attachment existence treated as technical compliance — prohibited.
128. Canonical field key changes historical response meaning — prohibited; versions preserved.
129. Current label lookup rewrites historical label/meaning — prohibited.
130. Duplicate semantic key appears twice in a row — cardinality/identity policy blocks or identifies distinct role.
131. Product-defined enum subset removes supplier’s prior selected option — new version/prior-response treatment.
132. Optional field missing causes hidden weight renormalization — not applicable unless a registered composite policy explicitly defines; no ad hoc calculation.
133. Free text mapped by AI without review — prohibited.
134. Buyer confirms AI mapping under bounded command — permitted with source/difference/limitation.
135. Email parser invents currency — prohibited.
136. Spreadsheet locale converts decimal silently — validation/difference required.
137. Buyer label conflicts only in Arabic translation — invalid; canonical key remains controlling.
138. Cross-tenant technical identity leaks saved organization values — blocked.
139. Receipt is accessible but task form is not — journey fails WCAG target.
140. Mobile task classified desktop-required without fallback — invalid.
141. Material evidence freshness changes after confirmation — confirmation invalid.
142. Publication recipient list changes after confirmation — invalid.
143. Schema field becomes deprecated during open event — event-bound version remains; future action per lifecycle/migration policy.
144. New field family introduced retrospectively to old responses — no silent reinterpretation; explicit mapping/restatement only.
145. Normalized comparison ignores evidence-only supplier exclusion — prohibited disclosure/evaluation omission.
146. Architecture closes without primary supplier validation plan — final build gate must retain falsification debt.

---

# 5. Gate recheck

- G1 operation/authority/evidence/consequence/result — PASS
- G2 query/proposal/command/acceptance/effect — PASS
- G3 navigation/tasks/queues no second root — PASS
- G4 approval/DOA/delegation — PASS
- G5 field/schema authorship and comparison determinism — PASS
- G6 evidence and communication layers — PASS
- G7 limitation placement/parity/receipt meaning — PASS
- G8 report history/current reliance — PASS
- G9 external low-friction/no network/cross-tenant workspace — PASS
- G10 grant/actor/submission validity — PASS
- G11 control queues no GRC truth — PASS
- G12 continuation/bulk/error/unknown recovery — PASS
- G13 accessibility/mobile/localization/RTL — PASS as semantic target
- G14 conventional A0–A3 no connector/account/chat/AI/P07 — PASS
- G15 regression/one XL/product-code lock — PASS
- G16 internal audit/readiness — PASS

---

# 6. Regression check

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO — registered source/normalized/comparison semantics strengthen the four-layer grammar
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO — reusable technical identity remains compatible with tenant-private business workspaces
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- P1.7 REOPEN = NO
- P1.8 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 ACTIVATION = CLEAN
- PRODUCT CODE = LOCKED
- P1.10 = LOCKED

---

# 7. ADR impact claim

Pending Claude Round 2:

- ADR-0016 — candidate ACCEPT with bounded hybrid, typed field/schema registry and V1 tenant-private workspace boundary;
- ADR-0038 — candidate ACCEPT;
- ADR-0039 — candidate ACCEPT;
- ADR-0040 — candidate ACCEPT with receipt/disclosure parity;
- ADR-0041 — candidate ACCEPT with principal-bound confirmation, anchor availability and WCAG 2.2 AA target.

ADR-0017 remains P1.10-owned.

---

# 8. Final internal conclusion

No load-bearing P1.9 meaning remains for frontend implementation or P1.10 to choose regarding:

- operation authority;
- continuation/recovery;
- bulk effects;
- field/schema authorship;
- external submission validity;
- persistent workspace tenancy;
- receipt meaning;
- confirmation invalidation;
- disclosure placement/parity;
- historical reliance;
- conventional-channel completeness.

P1.9 remains active pending independent Claude Round 2.