# P1.9 — Targeted Official UX Practice Evidence v0.1

**Date:** 2026-08-01  
**Status:** TARGETED SECONDARY EVIDENCE / NON-CONTROLLING  
**Scope:** external sourcing participation, consequential action safety, recovery, accessibility and RTL only

---

# 1. Evidence rule

These sources demonstrate current product or standards practice. They do not define Construction Procurement OS authority, scope or technology. Frozen P1.4–P1.8 semantics outrank all observations.

---

# 2. Procore bidding observations

## Source

- Procore official support — Submit a Bid: `https://support.procore.com/products/online/user-guide/company-level/planroom/tutorials/submit-a-bid`
- Procore official support — email versus sign-in: `https://support.procore.com/faq/can-bidders-submit-their-bid-via-email-or-must-they-sign-in`
- Procore official support — submit on behalf of bidder: `https://support.procore.com/products/online/user-guide/project-level/bidding/tutorials/submit-a-bid-on-behalf-of-a-bidder`

## Observed practice

- invitation email exposes due date, project/package information, documents and intent-to-bid action;
- first-time structured submission may create a password/account;
- bidder can instead reply to invitation email with attachments without logging in;
- email submission updates bid status/activity and preserves attachments for review;
- authorized internal user can capture a bid submitted outside the platform on behalf of the bidder;
- structured path supports line-level bid information, comments, exclusions, attachments, save-for-later and submit.

## Architectural relevance

Supports a bounded hybrid:

- structured task workspace is useful but not mandatory;
- email/file response can be a first-class capture channel;
- buyer-on-behalf is a legitimate fallback if source occurrence and internal actor attribution remain explicit;
- submission status must not imply that attached content has been normalized, validated, awarded or converted into Commitment truth.

## Limitation

Procore’s account/directory/network model is product-specific and does not establish that persistent account or network membership is required for this OS.

---

# 3. Coupa sourcing observations

## Source

- Coupa official supplier documentation — View Sourcing Events: `https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers/coupa-supplier-portal/set-up-the-csp/sourcing/view-sourcing-events`
- Coupa official supplier documentation — Participate in a Sourcing Event: `https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers/coupa-supplier-portal/set-up-the-csp/sourcing/participate-in-a-sourcing-event`
- Coupa official supplier documentation — Sourcing FAQ: `https://compass.coupa.com/en-us/products/product-documentation/supplier-resources/for-suppliers/coupa-supplier-portal/set-up-the-csp/sourcing/sourcing-faq`

## Observed practice

- supplier may access a private event from an invitation link without a portal account, depending on buyer settings;
- one-time-password authentication can protect invitation-link access;
- buyer may alternatively require account login;
- event page exposes start/end, countdown/timeline, terms, attachments, questionnaires, items/lots and message center;
- terms must be accepted before entering a response, and refusal can carry a comment;
- suppliers may save, revise and resubmit while the event permits;
- event activity history and successful submission receipt are visible;
- large/complex responses can use export-to-Excel and import-back workflow;
- revised events require renewed acceptance and a fresh export before offline re-import;
- reminders, messaging and contact paths coexist with the event workspace.

## Architectural relevance

Supports:

- secure task link/OTP as an optional low-friction grant mode;
- persistent account as optional convenience for recurring work;
- explicit terms/addendum version acknowledgment;
- draft/save/revision history and successful-submission receipt;
- offline/file round-trip only through controlled version-bound import;
- messaging as communication evidence, not domain authority;
- event revision invalidates stale offline templates and requires revalidation.

## Limitation

Some cited Coupa pages are marked legacy documentation. They are retained only as demonstrated practice, not current product scope or normative requirement.

---

# 4. SAP Ariba observations

## Source

- SAP Help — Participating in Sourcing Events: `https://help.sap.com/docs/business-network-for-trading-partners/participating-in-sourcing-events/participating-in-sourcing-events`
- SAP Help — supplier registration and invitation documentation under SAP Business Network.

## Observed practice

- suppliers can answer prerequisites, RFIs, RFPs and auctions;
- supplier participation can include buyer communication, import/export, alternative bids, custom offline responses and response teams;
- SAP Business Network commonly uses account/relationship enablement and can invite unregistered suppliers to register;
- quick/standard-account enablement exists to reduce onboarding burden.

## Architectural relevance

- supports response-team and alternative/offline-response scenarios;
- demonstrates that heavy network/account enablement is possible but creates significant identity, relationship and onboarding semantics;
- reinforces that this OS must keep network membership optional and tenant-private rather than copying SAP’s platform boundary.

---

# 5. Autodesk BuildingConnected observations

## Source

- Autodesk official BuildingConnected product documentation: `https://construction.autodesk.com/products/buildingconnected/`
- Autodesk construction bid-management workflow: `https://construction.autodesk.com/workflows/construction-bid-management/`

## Observed practice

- centralizes bid invites, project/bid tracking, custom bid forms, bid leveling, collaboration and supplier qualification;
- explicitly centers a large construction-professional network and supplier discovery;
- subcontractor bid board consolidates invitations from multiple sources and tracks deadlines/workload.

## Architectural relevance

Useful patterns:

- task/portfolio views for invitations and due dates;
- structured comparison and bid revision;
- team workload visibility.

Boundary lesson:

- network discovery, qualification and cross-market activity are an independent product gravity well;
- Construction Procurement OS must not require network membership or import cross-tenant reputation/learned influence into the beachhead.

---

# 6. W3C accessibility observations

## Sources

- WCAG 2.2: `https://www.w3.org/TR/WCAG22/`
- Understanding 3.3.4 Error Prevention (Legal, Financial, Data): `https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html`
- Understanding 3.3.3 Error Suggestion: `https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion`
- Understanding 4.1.3 Status Messages: `https://www.w3.org/WAI/WCAG22/Understanding/status-messages`

## Observed requirements/practice

- consequential legal/financial/data submissions need at least one of reversibility, input checking with correction opportunity, or review/confirmation before finalization;
- automatically detected errors should provide known correction suggestions where safe;
- success, result, waiting/progress and error status messages must be programmatically determinable for assistive technology;
- UI name, role, state and value must be exposed to assistive technology.

## Architectural relevance

- high-consequence commands require a review/correct/confirm or reversible design appropriate to the operation;
- confirmation is a safety mechanism, not authority;
- asynchronous issue/upload/import/result recovery requires accessible progress and outcome status;
- error class and remediation must be understandable, not color-only;
- custom interaction primitives cannot hide state from assistive technologies.

---

# 7. W3C internationalization observation

## Source

- W3C Internationalization — Structural markup and right-to-left text in HTML: `https://www.w3.org/International/questions/qa-html-dir.en.html`

## Observed practice

- document/base direction must be explicitly established for RTL languages such as Arabic;
- structural direction affects paragraphs, forms and tables;
- mixed-direction content needs deliberate handling rather than visual mirroring only.

## Architectural relevance

- Arabic/RTL is a semantic layout and data-entry obligation;
- table order, form flow, identifiers, amounts, dates and mixed Arabic/Latin supplier content must remain interpretable;
- exact frontend mechanism remains later physical design.

---

# 8. Evidence reconciliation

## Supported conclusions

1. A low-friction bounded hybrid external model is proven feasible.
2. Persistent account is useful but not universally necessary.
3. Secure invitation-link/OTP, email/file submission and buyer-on-behalf are legitimate bounded modes.
4. Structured task workspaces add revision, validation, receipt and history value.
5. Offline spreadsheet/file response requires exact template/event version binding and controlled import.
6. Consequential actions require review/correction/reversal safeguards.
7. Asynchronous and error states require accessible programmatic feedback.
8. Arabic/RTL must be treated as structural interaction meaning.

## Not supported

- mandatory supplier portal parity;
- mandatory marketplace/network membership;
- cross-tenant supplier reputation;
- one vendor’s page/navigation model as product architecture;
- generic workflow/form/page builder;
- AI-dependent interaction.

---

# 9. ADR-0016 evidence posture

Evidence supports candidate acceptance of:

> **A bounded hybrid external-party UX: secure task link or email/file participation as the minimum, buyer-on-behalf capture as governed fallback, optional persistent account/task workspace for recurring or complex participation, and no mandatory supplier network or cross-tenant business-profile dependency.**

Primary UAE supplier-side evidence remains incomplete. The candidate therefore freezes the safe minimum and carries validation debt rather than expanding portal scope.