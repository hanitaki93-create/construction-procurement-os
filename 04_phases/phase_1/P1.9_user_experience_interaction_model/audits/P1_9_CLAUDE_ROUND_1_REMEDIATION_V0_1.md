# P1.9 — Claude Round 1 Remediation v0.1

**Date:** 2026-08-01  
**Status:** REMEDIATION CANDIDATE / INTERNAL RECHECK REQUIRED  
**Claude blocker:** BL-P19-05  
**Claude watches:** W-62–W-66  
**P1.9:** ACTIVE  
**P1.10+:** LOCKED  
**Product code:** LOCKED

---

# 1. Purpose

This remediation closes the remaining unbounded form/schema surface in P1.9 and absorbs Claude watches W-62–W-66 without creating a page/form builder, supplier network or accessibility subsystem.

The controlling rule is:

> **A response or comparison field may carry load-bearing meaning only when it binds a product-defined semantic field key from a versioned typed field-family registry. Tenant configuration may select and constrain registered meaning; it may not author new meaning.**

---

# 2. BL-P19-05 — closed typed field-family registry

## 2.1 Registry authority

All internal intake, external response, structured-file, normalization and comparison schemas are composed only from a versioned product-owned registry of typed field families and registered semantic field keys.

Every field binds:

- `RegisteredSemanticFieldKey`;
- `FieldFamilyKey` and version;
- source or normalized layer;
- exact business definition and explicit non-meaning;
- value type, unit/currency/date/time semantics where applicable;
- cardinality and row/member grain;
- allowed source channels;
- product-defined validation family;
- normalization/comparison eligibility;
- evidence/provenance requirements;
- access/sensitivity/disclosure class;
- lifecycle/effective period and successor/supersession relation.

The registry is semantic architecture, not a physical component library or database schema.

## 2.2 Closed field families

The V1 registry may contain only registered members of these top-level families:

1. `IDENTITY_OR_REFERENCE` — product-owned identity/reference keys such as supplier relationship, line, item, scope, brand/model reference or controlled code;
2. `QUANTITY_WITH_UOM` — exact quantity and registered unit/measurement basis;
3. `MONETARY_WITH_CURRENCY` — exact decimal amount with currency and registered monetary role such as unit rate, line total, allowance or discount;
4. `DECIMAL_MEASURE` — non-monetary numeric measure with registered unit/basis;
5. `PERCENTAGE_OR_RATE` — registered percentage/rate meaning, denominator/exposure and bounds;
6. `DATE_OR_DATETIME` — exact date/time role with timezone/calendar semantics where material;
7. `DURATION_OR_LEAD_TIME` — registered duration/lead-time role with unit/calendar/start basis;
8. `ENUMERATED_SELECTION` — product-defined semantic options and unknown/not-applicable treatment;
9. `BOOLEAN_OR_ACKNOWLEDGMENT` — exact proposition/terms/addendum/compliance acknowledgment identity;
10. `STRUCTURED_TEXT_IDENTIFIER` — registered bounded textual role such as model/reference number, with product-defined constraints and no free semantic invention;
11. `FREE_TEXT_EVIDENCE_ONLY` — narrative, exclusions, qualifications or comments retained as source evidence but not a load-bearing normalized value by itself;
12. `ATTACHMENT_EVIDENCE` — exact evidence/document member identity and metadata, not a scalar business value;
13. `REGISTERED_LINE_OR_TABLE_GROUP` — product-defined repeated row structure composed only from registered child fields and canonical member identities.

A family is not sufficient by itself. A load-bearing value also requires an exact registered semantic field key. A tenant cannot label an arbitrary monetary field “Rate” and thereby create the semantic role `UNIT_RATE_EXCLUDING_TAX` or `UNIT_RATE_INCLUDING_ATTENDANCE`.

## 2.3 Tenant configuration boundary

Tenant/event configuration may only:

- select registered semantic fields supported by the activated product capability;
- apply permitted labels/help text/localization without changing canonical meaning;
- order and group fields for the task;
- mark a field required or optional where the registered field policy permits;
- select an allowed subset of product-defined enumeration options;
- choose product-defined applicability/visibility policy members;
- apply tighter bounds from an explicitly permitted bounded constraint set;
- choose supported attachment requirements;
- choose a supported response mode or registered line schema.

Tenant configuration may not:

- author a new semantic field key or field family;
- change a registered field’s meaning, grain, unit, currency role, denominator or actual/status family;
- create arbitrary conditional logic, branching, scripts or expressions;
- create computed fields or formulas;
- create arbitrary regex, cross-field validation or executable validation expressions;
- create runtime joins or source lookups;
- use free text as a normalized monetary, quantity, date, rate, compliance or comparison value;
- create custom state transitions, commands, effects or metric population rules;
- make a presentation label override canonical meaning.

Product-defined conditional/applicability and validation rules may be activated only as registered versioned policy members. They are not tenant-authored expressions.

## 2.4 Source evidence and normalization

`FREE_TEXT_EVIDENCE_ONLY`, unregistered columns, arbitrary email text and unsupported file content remain:

- source evidence/capture;
- attributable and versioned;
- visible to authorized review;
- ineligible as a load-bearing normalized/comparison value by themselves.

They may become a registered normalized value only through a bounded normalization proposal and explicit review/accept command that:

- cites exact source evidence/version/location;
- selects one registered semantic field key;
- records transformation, unit/currency/basis and confidence/limitation;
- preserves the source value unchanged;
- exposes differences;
- blocks unsupported or ambiguous mapping.

AI may later propose this mapping under P1.10, but cannot accept it or invent a new semantic field.

## 2.5 Schema/version compatibility

Every event, task, form, structured template, response and comparison binds one exact `ResponseSchemaVersion` composed from registered field keys.

A change to any of the following creates a new semantic schema version and explicit response/comparison impact assessment:

- field semantic key or family/version;
- grain/cardinality;
- unit/currency/monetary role;
- requiredness where participation validity changes;
- enumeration meaning/options;
- applicability/validation policy;
- line/member structure;
- terms/addendum acknowledgment relation;
- normalization/comparison eligibility.

Label, help-text or layout-only changes may remain presentation revisions only when canonical meaning and participation validity are unchanged and the change is recorded.

Responses across schema versions are directly comparable only when registered semantic keys and relevant versions/policies are compatible. Otherwise they remain segmented, require explicit registered mapping, or are blocked from one comparison.

A stale response/template cannot be treated as current merely because it parses successfully.

## 2.6 Internal surfaces inherit the same boundary

Internal forms, buyer-on-behalf capture, imports, correction screens and future chat tools use the same registered field semantics.

No internal “custom field,” spreadsheet column or admin form can become a load-bearing source, normalized value, comparison axis, metric denominator or command input without registered semantic meaning.

## 2.7 Registry extension

A new field family or load-bearing semantic field role requires prospective controlled architecture change with:

- evidence/use case;
- authority and layer classification;
- grain, value and validation semantics;
- normalization/comparison/metric impact;
- access/evidence/migration/correction behavior;
- second-XL review;
- hostile scenarios;
- versioned activation.

Runtime tenant creation is prohibited.

---

# 3. W-62 — persistent workspace scope

For V1:

- persistent external workspace is tenant/buyer-relationship scoped;
- one reusable technical authentication credential may authenticate the person where P1.4 permits, but it enters separately authorized tenant-private workspaces;
- task lists, drafts, history, contacts, grants, documents, messages, supplier relationship data and performance remain isolated per tenant/buyer relationship;
- no cross-tenant supplier business profile, directory, relationship history, activity feed, reputation, benchmark, recommendation or imported grant is permitted;
- no supplier marketplace/network participation mode is permitted in V1;
- first participation cannot require persistent workspace enrollment.

This tightens “not required” to “not permitted as cross-tenant business scope in V1” without contradicting ADR-0012’s optional reusable technical authentication identity.

---

# 4. W-63 — receipt meaning

Every submission receipt displays inline or directly adjacent:

- response/submission identity and revision;
- task/event/schema/member version;
- current submission disposition;
- whether it entered the governed response population;
- any outstanding terms/addendum/identity/field/attachment confirmation;
- what the receipt establishes;
- what it does **not** establish.

A receipt may state “received” or “submitted” only with the exact disposition.

Unless separately true, it must explicitly avoid or negate interpretations of:

- compliant;
- technically accepted;
- commercially accepted;
- complete;
- shortlisted;
- awarded;
- contractable;
- Commitment established.

Receipt disclosure participates in `DisclosureParityManifest` across portal, email, PDF, spreadsheet and status lookup.

---

# 5. W-64 — confirmation principal binding

Every confirmation binds:

- exact acting principal;
- exact represented principal;
- authentication/assurance class;
- tenant/project/ContractingAuthorityContext;
- preview and target/member versions;
- confirmation time and expiry;
- `ConfirmationInvalidationPolicyVersion`.

At submission:

- the same acting/represented-principal binding must be current;
- current authority, delegation, DOA and access are rechecked;
- reauthentication by the same principal may continue only when assurance is restored and no invalidating change occurred;
- a different principal, represented principal or materially changed authority invalidates the confirmation and requires a new preview and confirmation;
- confirmation is never transferable through session sharing, forwarding or delegated UI state.

---

# 6. W-65 — anchor availability proof

An effect-bearing transmission is prohibited until `AnchorAvailabilityProof` establishes that the initiating user/channel has a retrievable continuation identity and conventional recovery route.

Permitted proof modes are:

- `CLIENT_GENERATED_AND_DURABLY_PERSISTED` — logical submission identity created and persisted locally/channel-side before transmission;
- `SERVER_RESERVED_AND_ACKNOWLEDGED` — a separate preflight/reservation round trip returned the anchor before the effect-bearing call;
- `CHANNEL_EMBEDDED_AND_RETRIEVABLE` — a stable task/submission identity is embedded in an outbound/import/manual channel record accessible independently of the effect-bearing result.

Creating the anchor only inside the same effect-bearing request without prior retrievability does not satisfy the rule.

The confirmation surface exposes or makes directly retrievable:

- anchor/recovery reference;
- operation/target summary;
- result lookup route;
- support/manual correlation route where applicable.

If availability proof cannot be established, the effect-bearing action is blocked.

---

# 7. W-66 — confirmation invalidation/materiality policy

Every consequential operation version binds one `ConfirmationInvalidationPolicyVersion`.

It declares:

- changes that always invalidate confirmation;
- product-defined bounded changes that may be treated as non-material;
- quantitative thresholds where semantically legitimate;
- qualitative triggers;
- recipient/publication changes;
- authority/delegation/DOA/access changes;
- evidence/freshness/configuration/version changes;
- population/member-set changes;
- time/expiry behavior;
- required disclosure and re-preview action.

Default rule:

> any change to a load-bearing target, member set, principal, represented principal, authority, recipient, value basis, field/schema meaning, evidence version, configuration/policy or effect consequence invalidates the confirmation unless the operation’s registered policy explicitly proves a bounded non-material class.

No tenant-authored materiality formula, script or conditional expression is allowed.

---

# 8. Accessibility target

For V1 first-party web task, report and external-participation surfaces, the architecture target is:

> **WCAG 2.2 Level AA conformance for the supported user journeys, including load-bearing disclosures, consequential actions, authentication, errors, status/progress, responsive reflow and keyboard/screen-reader operation.**

Exact testing tools, certification process and physical implementation remain later NFR/implementation work.

Where a third-party channel, generated document or structured-file workflow cannot provide equivalent access, the product must expose an explicit accessible first-party or assisted/manual fallback without changing authority/evidence meaning.

This target does not create a generic accessibility platform.

---

# 9. Primary validation debt

Primary UAE supplier-side validation remains open.

P1.10 and the final Phase 1 checkpoint must preserve an explicit falsification/build-validation plan covering at minimum:

- secure-link/account tolerance;
- email/file and buyer-on-behalf usage;
- field burden and terminology;
- mobile/Arabic/RTL use;
- revision/addendum behavior;
- receipt interpretation;
- support/fallback expectations.

This evidence debt does not reopen the semantic candidate but must not disappear from build gates.

---

# 10. Closure claim

BL-P19-05 is closed because:

- load-bearing field semantics are product-owned and versioned;
- tenant configuration cannot author semantics, formulas, conditional logic or executable validation;
- source free text remains evidence-only until explicit registered normalization;
- schema changes trigger version/comparability treatment;
- internal and external forms share one bounded semantic registry;
- new families require controlled architecture change;
- no generic form/page builder or second XL is created.

W-62–W-66 are closed as above.

This claim requires full internal hostile recheck before Claude Round 2.