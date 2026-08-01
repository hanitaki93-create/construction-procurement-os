# P1.9 — External-Party Participation Model v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE / ADR-0016 CANDIDATE  
**Product code:** LOCKED

---

# 1. Decision thesis

> **External participation uses a bounded hybrid: secure task link and email/file participation form the minimum, buyer-on-behalf capture is a governed fallback, and a persistent task workspace/account is optional for recurring or complex work. No supplier network or cross-tenant business profile is required.**

---

# 2. External participation modes

Exactly these semantic modes may be activated:

## `SECURE_TASK_LINK`

Invitation-bound task access, with authentication assurance selected by risk policy such as link possession plus OTP.

## `EMAIL_FILE_RESPONSE`

Response sent through a bound invitation/reply channel and captured as communication/evidence occurrence.

## `BUYER_ON_BEHALF_CAPTURE`

Authorized internal actor captures content received through offline/email/physical/other accepted channel while preserving external source and internal capture attribution.

## `OPTIONAL_PERSISTENT_WORKSPACE`

Reusable external authentication and tenant-scoped task list for recurring/complex participation.

## `STRUCTURED_FILE_ROUND_TRIP`

Version-bound export/template and controlled re-import for large/complex response sets.

## `MANUAL_OFFLINE_FALLBACK`

Explicit unsupported/offline path preserving evidence, timing, attribution and buyer confirmation requirements.

A deployment may support several modes. A0–A3 cannot require persistent account or network membership.

---

# 3. `ExternalTaskGrant`

Every external task access binds:

- tenant-private supplier/subcontractor relationship;
- exact external principal/contact or permitted shared-mailbox identity;
- invited organization/relationship;
- project/tender/task identity and version;
- permitted view/download/submit/revise/acknowledge/message operations;
- confidentiality/bid isolation scope;
- issue/addendum/member versions;
- opening/due/expiry/calendar/timezone;
- authentication assurance requirement;
- device/session/download restrictions where policy requires;
- transfer/delegation policy;
- response-team policy;
- revocation/reissue/contact-change policy;
- evidence/communication occurrence identities;
- no internal authority or cross-tenant access.

External grant is not supplier business authority, internal role, DOA or general project access.

---

# 4. Invitation and task landing

Invitation/task landing exposes:

- buyer organization and legitimate contact;
- project/package/task identity;
- invited supplier relationship/contact;
- due date/timezone and event state;
- confidentiality/NDA/terms prerequisites;
- document/member/addendum version;
- intent-to-participate/decline route;
- supported response modes;
- support/fallback contact;
- security warning against forwarding where transfer prohibited;
- no unrelated tenant/network content.

Opening a link does not establish receipt, acknowledgment, intent or participation unless a separate occurrence/action is captured.

---

# 5. Authentication assurance

Risk policy may select:

- possession link only for low-risk bounded tasks;
- possession link plus OTP;
- authenticated persistent account;
- stronger reauthentication for highly confidential or consequential actions.

Assurance must be proportional and not silently upgraded into mandatory network membership.

Authentication proves technical control of the credential/channel under the selected assurance; it does not prove authority to bind the supplier organization beyond the task grant.

---

# 6. Forwarding and delegation

A forwarded link never silently transfers the grant.

Transfer policy is one:

- `NON_TRANSFERABLE` — new recipient must be reissued a grant;
- `REQUEST_TRANSFER` — current recipient requests buyer-approved recipient change;
- `BOUNDED_RESPONSE_TEAM` — authorized external administrator adds named members under exact task scope;
- `SHARED_MAILBOX_PERMITTED` — relationship permits shared mailbox, but human actor identity/attestation is required for consequential submission where available;
- `BUYER_CAPTURE_FALLBACK` — content can be captured on behalf with attribution.

Unexpected recipient/identity triggers block or recipient-change workflow, not silent acceptance.

---

# 7. Shared mailbox and response team

Where a shared mailbox is permitted:

- grant binds supplier organization/relationship and mailbox;
- individual actor is requested/recorded for submission/acknowledgment;
- inability to prove human identity is a typed attribution limitation;
- the mailbox cannot access other supplier relationships or tenants;
- response-team members see only permitted task content;
- member removal/revocation is effective for future actions;
- prior submissions retain original attribution/assurance state.

A technical account or mailbox does not merge supplier business identities.

---

# 8. Source submission and revisions

Every submission/revision binds:

- `ExternalSubmissionId` and revision number;
- task/tender/bid form version;
- external principal/contact/mailbox and assurance state;
- supplier relationship;
- submission channel;
- source values/attachments/comments/exclusions;
- effective submission time and received/recorded time;
- terms/addendum acknowledgments;
- supersedes/withdraws relation;
- validation/import status;
- receipt/result identity;
- buyer-on-behalf attribution if applicable.

Revision never overwrites prior source submission. Latest accepted response is a projection under event rules, not deletion of history.

---

# 9. Addenda, changes and stale responses

When buyer changes material scope, forms, terms, dates or documents:

- create a new exact event/member version;
- notify permitted recipients;
- state whether prior response remains valid, requires acknowledgment, becomes draft/stale or must be resubmitted;
- invalidate stale structured templates/import files;
- preserve prior submission history;
- require explicit changed-version acknowledgment where policy defines;
- prevent submission against superseded version unless accepted as separately identified late/legacy evidence.

Silent form/content mutation is prohibited.

---

# 10. Email/file response

Email response binds the original invitation/task correlation where available and captures:

- sender/channel assertions;
- message occurrence/headers/source locator;
- received time;
- attachments/content identity;
- relationship/contact mapping;
- authentication/attribution limitations;
- task/version correlation;
- malware/untrusted-content status;
- proposed submission status.

Email arrival may create a captured external source submission only under the accepted inbound mode. It does not normalize values, satisfy mandatory fields, accept terms, establish award or create Commitment.

Ambiguous/unmatched email is quarantined or manually correlated with preserved evidence; no silent merge.

---

# 11. Buyer-on-behalf capture

Buyer-on-behalf interaction must expose and preserve:

- external source occurrence/channel and exact content;
- external supplier/contact asserted;
- internal capturing actor and represented role;
- reason for buyer capture;
- capture time versus source/received time;
- transcription/normalization difference;
- attachments/evidence;
- supplier confirmation status where required;
- attribution/assurance limitation;
- explicit statement that the internal actor is not impersonating the supplier.

Where structured fields are transcribed, the source artifact remains linked and discrepancies are visible.

---

# 12. Structured file round-trip

Export/template binds:

- task/event/bid form and exact version;
- supplier relationship/grant;
- row/item identities;
- required fields/validation schema;
- locale/currency/unit/date/timezone;
- integrity/version marker;
- expiration/supersession rule.

Import is staged:

1. upload/untrusted capture;
2. file identity/version validation;
3. parse proposal;
4. row-level validation and differences;
5. supplier/user review;
6. explicit submit command;
7. receipt and revision identity.

Import cannot silently submit or overwrite source history. Files from superseded versions are blocked or explicitly migrated as proposals with full differences.

---

# 13. Submission confirmation and receipt

Before final submit, external user can review/correct exact values, attachments, exclusions, terms and task version.

Receipt binds:

- submission/revision identity;
- task/version;
- supplier/contact/assurance/channel;
- received/recorded time;
- included attachments/member count;
- validation state;
- acceptance versus later buyer review distinction;
- resubmission/withdrawal rule;
- stable status lookup.

Receipt cannot say “bid accepted,” “compliant,” “awarded” or equivalent unless that separate effect exists.

---

# 14. Decline, no-bid and withdrawal

Distinct:

- intent to participate;
- intent not to participate;
- decline due to terms/confidentiality/capability;
- no response;
- submission withdrawal;
- buyer exclusion/cancellation.

No-response is not decline. Withdrawal preserves prior submission history and follows event rules; it does not erase evidence.

---

# 15. Confidentiality and bid isolation

External user may see only:

- the exact invited buyer/task/project scope;
- documents/member versions permitted;
- their own organization’s source submissions and authorized team activity;
- buyer communications intended for them;
- permitted common clarifications/addenda.

They cannot see:

- competing supplier identities/responses;
- buyer evaluation/normalization/adjustments unless expressly shared;
- other tenants/buyers/relationships;
- internal approval/DOA details beyond necessary task consequence;
- cross-tenant supplier reputation or activity.

Download/export follows disclosure and watermark/status policy where configured.

---

# 16. Accessibility, mobile and language

Minimum obligations:

- core invite/task/response/revision/receipt usable on common mobile viewports;
- keyboard-operable structured path;
- programmatic labels, roles, errors, status and progress;
- no color-only mandatory meaning;
- Arabic/RTL structural support, not text mirroring only;
- mixed Arabic/Latin identifiers and amounts remain interpretable;
- dates/timezones/currencies/units explicit;
- language selection cannot change task/version/values;
- file/manual fallback when structured experience is unsupported.

Exact conformance target and testing depth remain later NFR design but semantic obligations are binding.

---

# 17. Account/workspace policy

Persistent workspace is optional and provides convenience such as:

- recurring task list;
- response drafts/history;
- response team management;
- saved organization/contact information;
- secure messaging;
- status lookup.

It may not:

- become mandatory for first participation;
- expose cross-tenant relationship history;
- import authority/grants from another buyer;
- create a public supplier profile/network by default;
- pool performance/reputation;
- prevent email/file/manual fallback where activated.

---

# 18. Candidate ADR-0016 decision

> **Accept a task-focused bounded hybrid external UX. Minimum participation supports secure invitation-link and/or email/file response with governed buyer-on-behalf fallback. Persistent account/workspace is optional for recurring or complex use. External grants remain tenant-private and task/version scoped; forwarding/delegation, shared mailbox, response-team, revision/addendum, confidentiality, attribution and receipt semantics are explicit. No supplier network, marketplace or cross-tenant business-profile dependency is required by A0–A3.**

Primary supplier-side validation debt remains, but does not justify portal parity or weaker safety.

---

# 19. Hostile scenarios

1. link forwarded to competitor;
2. invited contact leaves company;
3. shared mailbox response with unknown human;
4. supplier requests colleague access;
5. OTP intercepted/expired;
6. email sender spoofed or unmatched;
7. buyer transcribes wrong amount;
8. supplier revision after addendum;
9. stale spreadsheet imported;
10. partial file import appears submitted;
11. receipt implies award;
12. no-response treated as decline;
13. persistent account exposes another buyer;
14. network activity used for score;
15. mobile/RTL form reorders amount/description meaning;
16. attachment malware/untrusted prompt injection;
17. manual fallback loses source time;
18. recipient change silently preserves old access.

---

# 20. Exit test

External UX passes only if a first-time supplier can participate without network membership while exact grant, recipient, version, source, revision, confidentiality, attribution and receipt meaning remain safer than ordinary email.