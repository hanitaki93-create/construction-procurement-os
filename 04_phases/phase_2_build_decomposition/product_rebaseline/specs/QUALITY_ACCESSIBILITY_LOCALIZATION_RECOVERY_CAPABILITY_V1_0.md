# CPOS Quality / Accessibility / Localization / Recovery Capability v1.0

**Status:** FREEZE-CANDIDATE / MEANING REVIEW
**Capability:** CAP-042

## User meaning

Every CPOS capability must remain usable as a real first-party web workflow across ordinary desktop/mobile web layouts, keyboard/screen-reader interaction, Arabic/RTL presentation and recoverable error/continuation states. This is product behavior, not optional styling deferred to a final UI block.

## Binding Phase-1 inheritance

Architecture V2 explicitly inherits the frozen P1.9 target:

- supported first-party web task/report/external-participation journeys target **WCAG 2.2 Level AA**;
- load-bearing actions remain operable by keyboard and expose programmatic labels/state/status/error meaning;
- consequential legal/financial/data-changing actions provide review/confirmation/recovery semantics appropriate to the action;
- status/progress/errors are not color-only or visually implicit;
- responsive reflow preserves task meaning and action availability;
- Arabic/RTL is a supported semantic direction, not a CSS afterthought;
- locale/timezone/currency/unit display never changes underlying deterministic truth;
- where a third-party/file/provider surface cannot itself meet the supported journey, CPOS supplies an equivalent accessible first-party fallback where architecturally possible.

Exact conformance-testing technology remains physical/NFR implementation work; the semantic target is binding now.

## Responsive support classes

- **DESKTOP_FULL:** all internal procurement workflows and administration.
- **MOBILE_TASK:** core requester, approval, supplier-response, receipt/status and document-review tasks on responsive web without requiring a native app.
- **MOBILE_COMPLEX_ADAPTIVE:** dense comparison/levelling and large configuration surfaces may use adaptive layouts, horizontal data navigation and focused drill-down rather than pretending a desktop matrix fits unchanged on a phone.
- Native mobile/offline remains outside the V2 first spine unless separately reopened.

## Arabic / RTL

- all product navigation, forms, status labels and generated-document template classes must support RTL-safe component/layout semantics;
- user-entered English/Arabic content may be mixed without corrupting numbers, currency, UOM, email, codes or supplier document references;
- business numbers and machine identifiers retain canonical logical order;
- generated documents declare locale/direction and use an approved template/version rather than ad-hoc mirroring.

## Error and recovery contract

Errors are typed by business effect:

- `VALIDATION_ERROR` — no protected effect occurred; show field/business rule and correction.
- `CONFLICT_STALE` — source/current truth changed; show what changed and require refresh/review.
- `AUTHORITY_DENIED` — user lacks action authority; preserve entered draft where safe.
- `POLICY_BLOCKED` — route/qualification/technical/conservation/approval rule blocks action; identify the governing rule and next valid action.
- `EXTERNAL_EFFECT_PENDING` — send/ERP/eSign outcome is not yet known; never invite blind retry that could duplicate the effect.
- `EXTERNAL_EFFECT_FAILED` — known failure with retry/reconcile options based on idempotency state.
- `PARTIAL_IMPORT` — preview/validation results show accepted/rejected rows before commit where supported.
- `SYSTEM_FAILURE_UNKNOWN_EFFECT` — require reconciliation/status check before retrying any consequential external/domain command.

No generic 'Something went wrong — retry' response is allowed where a legal/commercial/external effect may already have occurred.

## Per-capability implementation obligation

Every R01–R10 build slice owns:
- real responsive UI for its user actions;
- keyboard/focus/label/status semantics;
- RTL-safe layout and localized formatting;
- typed error/recovery mapping for its commands;
- loading/empty/permission/stale/conflict states;
- accessible document preview/download fallback;
- at least one automated accessibility smoke path plus later NFR conformance testing.

There is no later block permitted to retrofit basic usability onto hidden backend objects.

## Acceptance

1. A requester creates/submits an MR using keyboard-only navigation, receives field-level error suggestions, and retains safe draft content after an authority/policy block.
2. An Arabic/RTL user can raise an MR, inspect an RFQ and approve a recommendation without broken number/currency/UOM semantics.
3. A supplier uses the supported responsive tender task without a persistent portal account.
4. A procurement manager can review a dense comparison through an adaptive accessible layout without losing source citation/status meaning.
5. An external send with unknown outcome does not offer an unsafe duplicate-send retry; status/reconciliation is checked first.
6. WCAG 2.2 AA remains the semantic target in every supported first-party journey and cannot be downgraded by tenant configuration.