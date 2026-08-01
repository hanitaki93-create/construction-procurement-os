## VERDICT

`FAIL — P1.9 remains open; blockers below must be remediated.`

One blocker. The continuation anchor, typed outcome envelope, bulk policy set, disclosure placement and parity model, and external submission disposition set are all closed — and §15 in particular discharges the inherited P1.8 obligation better than I specified it. The defect is that the packet's own named second-XL risk includes form gravity, and no clause bounds it.

## BLOCKERS

**BL-P19-05 — Submission/response schema authorship is unbounded. Nothing states who defines fields, from what typed vocabulary, or whether a tenant-authored field may carry load-bearing meaning.**

*Section/clause:* §12 `ExternalSubmissionAcceptancePolicy` ("mandatory fields/attachments"), §13 ("task/**form**/member version"), against §3's boundary thesis and §26 scenario 61 ("page/**form**/BPM/CDE/GRC/BI/supplier-network/AI second XL").

*Failure path:* §12 requires each event/task version to bind mandatory fields and attachments, and §13 versions a "form" — so forms are configurable by someone. The packet never says by whom, from what vocabulary, or with what semantic constraints. Two readings are equally compliant:

- **Fixed product vocabulary:** tenants select from registered typed field families; a submitted value's meaning is product-defined, so P1.2's normalized-representation layer can bind to it deterministically and P1.8's metric population and grain contracts remain computable.
- **Tenant-authored schema:** tenants define arbitrary fields, types, validation and conditional logic. Field meaning becomes tenant-defined, so normalization has nothing deterministic to bind to, comparison schemas become per-tenant semantic artifacts, and the product acquires a versioned form-designer with validation and conditional-logic surfaces — the exact page/form gravity scenario 61 names, and a genuine second XL.

This is the same hole P1.8 closed for calculation (registry of typed operator families, tenant-authored operators prohibited, new families requiring controlled architecture change) and P1.4/P1.7 closed for workflow (bounded built-in gate classes, no customer state machine or expression language). Forms are the one remaining configurable surface with no equivalent closure.

*Concrete scenario:* a tenant creates a package response form with a field labelled "Rate (incl. attendance)" typed as free text, and a second labelled "Rate" typed as decimal. Two suppliers populate different fields. Under P1.2 the source submissions are valid evidence and normalization is a separate layer — but the normalized representation now depends on a tenant-authored field whose semantics no `MetricDefinitionVersion` or `ComparisonSchema` can bind. P1.8's population and grain contracts are computable only over product-defined semantics; here the denominator's meaning is authored per tenant per package. A second supplier submits under a revised form version and the two responses are not comparable at the schema level, which §13's revision rules do not detect because both are validly versioned.

*Why later work must choose meaning:* the field vocabulary determines what a supplier's submitted value *means*, which determines whether it can enter the governed response population (§12), whether normalization is deterministic (P1.2 layer 2), and whether comparison and metrics can bind to it (P1.8). It is not a component-library, renderer or schema-format choice. A frontend team implementing §12 must choose one reading to build the response form at all, and the tenant-authored reading also decides the one-XL question by default.

*Narrowest remediation:* one clause, mirroring P1.8 §9 in shape. State that response and comparison schemas are composed only from a **versioned registry of typed field families** with product-defined semantics (identity, quantity with UOM, monetary with currency, date, enumerated selection, free text as evidence-only, attachment, acknowledgment), that tenant configuration selects, labels, orders, marks required and constrains within those families but cannot author new field semantics, conditional logic, computed fields or validation expressions, and that free-text and unregistered content is `CAPTURED_EVIDENCE_ONLY` and cannot become a load-bearing normalized value without a bounded normalization command. New field families require prospective controlled architecture change. No new objects; §12 and §13 already carry the binding points.

## WATCHES / NON-BLOCKING DEBT

### Semantic specification detail

- **W-62 Persistent workspace scope.** §11 says "no supplier network or cross-tenant profile is **required**" — a prerequisite statement, not a prohibition. The optional persistent workspace mode's scope (per-tenant relationship versus one supplier identity spanning buyer tenants) is therefore not decided here. P1.4's tenant-private relationships and no-cross-tenant-import rules reach it, so scenario 24 resolves — but state "not permitted in V1" rather than "not required," or ADR-0012's open cross-tenant identity question will be answered by product instinct during implementation.
- **W-63 Submission receipt must not imply eligibility.** Scenario 22 resolves indirectly: §12's dispositions separate validity from evaluation, and §14 separates receipt acknowledgment from domain effect. What is not stated is the external-surface obligation — a receipt reading "submitted successfully" is honest and still implies compliance to a supplier. Add receipt content to §15's inline-when-applicable set: disposition, what it does and does not establish, and any outstanding acknowledgment.
- **W-64 Confirmation binding across re-authentication.** §5 expires confirmation on material authority change; §4 and §6 bind current principal to affordance and anchor, so a different principal re-authenticating cannot submit another's confirmation (scenario 53). Derivable, but make the principal binding on confirmation submission explicit rather than inferred from three clauses.
- **W-65 Anchor availability to the user.** §6 requires the anchor before the first effect-bearing transmission and says the user "has a durable conventional recovery route before uncertainty arises." State that the anchor identity is retrievable by the user or channel *prior to* the effect-bearing call — if it is created server-side within the same round trip, a lost response leaves the user with nothing, which is BL-P19-01 recurring in a narrower form.
- **W-66 Materiality basis for confirmation expiry.** "Material target, population, authority, evidence, configuration, value or recipient change" needs a declared basis per operation, or the block-versus-proceed choice becomes an implementation judgement. Same family as P1.8's W-59; both branches are safe, but they produce different behaviour on identical facts.

### Contractor / supplier / legal evidence

The packet's own admission is correct and worth preserving: primary UAE supplier-side evidence remains incomplete, and §22 draws the right conclusion from it — a bounded hybrid minimum plus validation debt rather than portal parity. FT-02, FT-06, FT-09/CR-02 and FT-10 unchanged. ADR-0010 GCC semantics unchanged. Accessibility: the semantic floor in §19 is well chosen and technology-neutral, but the *conformance level* is nowhere stated; in several markets this is a procurement prerequisite rather than a quality goal, so the target level is a commitment to make deliberately even though the test technology is correctly deferred.

### Later physical implementation

Frontend framework, component library, database, cache, search, exact schemas, renderer, pixels and branding, WCAG test technology, AI model and orchestration — all correctly deferred and none counted against this audit.

### P1.10-owned

Chat reasoning, orchestration, memory, confidence, evaluation and autonomy. §20's conventional-equivalence requirement and the same-registry rule are the right inherited constraints to hand forward.

## GATE CHECK

**G1 operation / authority / evidence / consequence / result — PASS.** Six closed interaction classes with nine bindings on every state-changing affordance; navigation, selection, filter, sort, drag, annotation, auto-save, import and chat wording explicitly cannot execute a command.

**G2 query / proposal / command / acceptance / effect — PASS.** §7's prohibition on a single success/failure boolean and required distinctions close provider/approval/effect ambiguity.

**G3 navigation / tasks / queues, no second root — PASS.** Polycentric linking, derived tasks and queues that cannot change domain state without a separate command, no universal procurement case root.

**G4 approval / DOA / delegation — PASS.** Typed outcomes; approval distinct from downstream command and established effect; revised proposal does not inherit approval silently.

**G5 evidence layers — PASS.** Ten distinct layers; upload is not accepted fact or satisfied prerequisite; filename/hash/current URL is not business identity or authority.

**G6 communication occurrence / effect — PASS.** Communication sequence consistent with P1.6; external content untrusted.

**G7 limitation placement / parity — PASS.** Placement profiles including `PROHIBITED_ON_SURFACE`, inline requirements and `DisclosureParityManifest` discharge P1.8 presentation obligations.

**G8 report history / current reliance — PASS.** Issued, current, recalculated, restated and withdrawn distinct; subsequent reliance required for new load-bearing use.

**G9 external low-friction / no network — PASS.** Six modes with secure link and email/file as minimum, no account prerequisite, supplier network not adopted.

**G10 grant / actor / submission validity — PASS on disposition, conditional on BL-P19-05 for field semantics.** Closed dispositions and actor assurance are strong; field vocabulary remains open.

**G11 control queues, no GRC truth — PASS.** Acknowledgment, assignment and snooze do not clear source predicate; accepted variance does not mean resolved/compliant/no-effect.

**G12 continuation / bulk / error / unknown recovery — PASS.** Pre-transmission anchor, four bulk modes, typed errors and safe recovery routes close lost-response and mixed-batch paths.

**G13 accessibility / mobile / localization / RTL — PASS as a semantic floor.** Binding requirements, mobile task classes and canonical localized labels are adequate; conformance level remains a watch.

**G14 conventional A0–A3 without connector / account / chat / AI / P07 — PASS.** Fifteen-step thread complete with chat disabled.

**G15 regression / one XL / product-code lock — FAIL.** BL-P19-05. Every other second-XL vector is explicitly bounded; form gravity alone is not.

**G16 internal audit / readiness — PASS.** Self-contained, internal blocker history disclosed, evidence limitations honest.

## REGRESSION CHECK

- P1.1 REOPEN = **NO**
- P1.2 REGRESSION = **NO**, conditional only on closing BL-P19-05
- P1.3 REOPEN = **NO**
- P1.4 REOPEN = **NO**
- P1.5 REOPEN = **NO**
- P1.6 REOPEN = **NO**
- P1.7 REOPEN = **NO**
- P1.8 REOPEN = **NO**
- SECOND XL = **FAIL** pending BL-P19-05
- A0–A3 ACTIVATION = **CLEAN**

## ADR IMPACT

- **ADR-0016 — bounded hybrid external-party UX: `KEEP PROPOSED — BLOCKING`.** The six modes, grant model, disposition set and assurance record are ready; response-schema vocabulary is missing and belongs here. W-62 also lands in this ADR.
- **ADR-0038 — operation interaction, continuation, bulk and typed outcome: `ACCEPT SEMANTIC DECISION`.**
- **ADR-0039 — work context/navigation/no second root: `ACCEPT SEMANTIC DECISION`.**
- **ADR-0040 — load-bearing disclosure/history/reliance interaction: `ACCEPT SEMANTIC DECISION`.**
- **ADR-0041 — safe recovery/accessibility/localization/conventional-chat coexistence: `ACCEPT SEMANTIC DECISION`.**

**ADR-0017 remains P1.10-owned. No accepted upstream ADR must reopen.**

## P1.10 READINESS

`NOT READY`

One clause stands between here and readiness — a typed field-family registry bounding schema authorship — requiring no new objects and no new scope.

**Final question:** yes, in one place — what vocabulary a submission or comparison schema may be composed from, and whether tenant-authored fields can carry load-bearing meaning. Operation authority, pre-result continuation and recovery, submission disposition and attribution, bulk effect semantics, limitation placement and parity, historical reliance, and conventional-channel completeness are all otherwise decided.

One note to carry forward: primary UAE supplier-side evidence remains incomplete, and that gate has now been open since P1.2. Every phase since has been internally consistent and none has been externally tested. P1.10 closing would leave the architecture complete and the falsification targets unfired — which is the one risk in this program that more review cannot reduce.