# P1.7 — Post-Remediation Internal Recheck v0.1

**Date:** 2026-08-01  
**Target:** integrated candidate v0.2 + internal remediation + completeness hardening  
**Verdict:** PASS / EXTERNAL HOSTILE REVIEW READY  
**P1.7:** ACTIVE  
**P1.8+:** LOCKED  
**Product code:** LOCKED

---

# 1. Scope

Recheck:

- BL-P17-01 execution authority;
- BL-P17-02 in-flight cutover;
- BL-P17-03 immutable publication intent;
- BL-P17-04 ADR-0006 V1 implementation floor;
- W-P17-01–06;
- publication generation hardening;
- late callback/mixed query/external submission/email-adapter gate;
- G1–G16 and upstream/one-XL/A0–A3.

---

# 2. BL-P17-01 recheck — execution authority

## Scenario A — agent/service account broader than represented user

Service account can invoke operation platform-wide. User only has Project A authority. Agent requests Project B AwardDecision on behalf of user.

Result:

- DELEGATED_ON_BEHALF requires intersection of technical capability, delegation grant, represented user current Project B authority, context and command guards;
- user lacks Project B authority;
- command rejected;
- service account breadth cannot escalate.

PASS.

## Scenario B — external supplier portal submission

Supplier external grant permits BidSubmission for Tender T.

Result:

- EXTERNAL_SOURCE_SUBMISSION can create exact supplier response source/submission fact under grant;
- cannot approve/award/create Commitment;
- internal evaluation/approval remains separate.

PASS.

## Scenario C — deterministic recovery service

Award DomainEvent committed; result response lost. Recovery service returns/publishes original result.

Result:

- HISTORICAL_IDEMPOTENT_RECOVERY uses established event/bound authority;
- current system recovery permission required;
- no new award/discretion.

PASS.

## Scenario D — scheduled deterministic expiry

System evaluates a frozen expiry rule.

Result:

- SYSTEM_BOUNDED only if OperationDefinition/domain rule permits exact non-discretionary action;
- cannot be reused for arbitrary commercial decision.

PASS.

**BL-P17-01 CLOSED.**

---

# 3. BL-P17-02 recheck — in-flight authority/profile cutover

## Scenario A — queued user command; delegation revoked before execution

Command is ACCEPTED_PRE_EFFECT. Delegation revoked before owning-domain command executes.

Result:

- acceptance binds input/meaning, not future discretionary authority;
- execution-time authority revalidation fails;
- command blocks/rejects with no effect;
- no service-account fallback.

PASS.

## Scenario B — external API request already sent before cutover

Operation stage EXTERNAL_EFFECT_EMITTED. Connector V1 is retired.

Result:

- cannot cancel as though request never happened;
- RECONCILE_EXTERNAL_EFFECT preserves request/evidence, stops unsafe retries, retrieves/correlates result;
- domain correction if needed.

PASS.

## Scenario C — credential-only adapter replacement

Operation accepted under adapter V1. New adapter V2 accesses same account/target, same AuthorityMapping/payload/semantics.

Result:

- REBIND_TECHNICALLY_COMPATIBLE allowed before effect with explicit history;
- same logical operation preserved.

PASS.

## Scenario D — target/account/authority changes

New profile points to different ERP company or changes source authority.

Result:

- not technically compatible;
- old operation cancelled/superseded before effect or reconciled if effect emitted;
- new logical operation required;
- no semantic rebind.

PASS.

## Scenario E — no cutover disposition

Result:

- BLOCKED_RECONCILIATION_REQUIRED default;
- middleware cannot choose continue/latest/new profile.

PASS.

## Scenario F — late callback from retired profile

Authentic provider callback arrives after cutover for external send made before cutover.

Result:

- preserved under historical profile/subscription;
- reconciles emitted action;
- does not reactivate old profile/authorize new command;
- ambiguity quarantined.

PASS.

**BL-P17-02 CLOSED.**

---

# 4. BL-P17-03 recheck — immutable publication intent

## Scenario A — mapping changes before retry

Award source event creates PublicationIntent under Mapping V1/Schema V1/Disclosure V1. Broker fails. V2 is deployed.

Result:

- retry uses V1 bound payload/basis;
- V2 publication requires new related PublicationIntent/IntegrationEvent;
- same ID cannot change meaning.

PASS.

## Scenario B — serializer/template changes

No payload pre-materialized. Renderer/serializer updated before retry.

Result:

- generation basis includes serializer/canonicalization/template/locale/default versions;
- retry reproduces bound intent or exact payload must have been materialized;
- current renderer not used silently.

PASS.

## Scenario C — disclosure policy changes before undelivered retry

Old intent includes field now prohibited for destination.

Result:

- do not mutate/retry old payload blindly;
- explicit block/quarantine/cancel delivery under authority;
- new permitted publication if appropriate;
- historical intent preserved.

PASS.

## Scenario D — multiple destinations

Two consumers require different redaction/profiles.

Result:

- destination-specific PublicationIntents;
- separate delivery histories/payloads;
- source DomainEvent remains one.

PASS.

**BL-P17-03 CLOSED.**

---

# 5. BL-P17-04 recheck — V1 implementation floor

## Scenario A — builder implements UI-only handlers

Result:

- non-compliant: mandatory UI-independent bounded service operation layer, OperationRegistry, stable identities/results and connector/profile abstractions must be implemented.

PASS.

## Scenario B — team deploys public broker/API before first tender

Result:

- not required by mandatory substrate;
- public transport/broker remains optional activation;
- simple internal mechanisms allowed.

PASS.

## Scenario C — no named email provider selected during architecture

Result:

- provider-neutral port/interface mandatory;
- V1 release/build planning must pass EmailAdapterSelectionGate and include at least one deployable conforming adapter for target deployment class;
- A0–A3 manual path remains complete if adapter not activated.

PASS.

## Scenario D — chat/agent delayed

Result:

- internal capability substrate remains usable by UI/services/connectors;
- chat/agent runtime optional/deferred to P1.9/P1.10;
- no retrofit of domain operations required.

PASS.

**BL-P17-04 CLOSED.**

---

# 6. Watch recheck

## W-P17-01 — open transaction migration

No domain-family MigrationAcceptanceProfile.

Result: native M2/M3 import blocked or reference-only/evidence-limited. No generic opening state.

PASS.

## W-P17-02 — multi-resource query consistency

Chat asks “show current tender, bids and ERP status.” Sources are read at different times.

Result:

- query classified NON_ATOMIC_MIXED_OBSERVATION with component times/freshness;
- cannot present one simultaneous snapshot;
- load-bearing command consumes it only if explicitly allowed with skew/freshness guards.

PASS.

## W-P17-03 — capability disabled during async operation

AI extraction capability is security-disabled while jobs run.

Result:

- pending disposition declared; future effect/steps block/cancel/review as profile states;
- completed proposals remain historical;
- deterministic/manual path remains.

PASS.

## W-P17-04 — identity mapping correction

External supplier mapping corrected after observations/imports used it.

Result:

- original/corrected mapping and affected references preserved;
- impact/reconciliation/domain-correction disposition required;
- historical effects not moved silently.

PASS.

## W-P17-05 — connector provider semantics change

Provider changes revision endpoint to current alias.

Result:

- historical-version conformance materially changes;
- affected READ_VERSION/load-bearing capabilities require revalidation/limit/block;
- connector cannot keep old certification.

PASS.

## W-P17-06 — AI automation before P1.10

Result:

- AI/agent state-changing paths remain disabled/experimental/review-required;
- only deterministic bounded system automation may be enabled;
- tool exposure is not autonomy approval.

PASS.

---

# 7. Additional hostile scenarios

## H01 — duplicate UI/agent command

User clicks issue while agent retries same LogicalCommandId.

Result:

- one command/effect/result;
- changed payload/context under same key conflicts;
- similar independent intent not deduped solely by payload.

PASS.

## H02 — webhook gap and current-only provider

Missed CDE callbacks. Provider can return current Rev5 only; historical Rev3 unavailable.

Result:

- RESYNC_REQUIRED/gap recorded;
- cannot fabricate intermediate history/Rev3;
- current-only observation may be reference/current fact;
- historical load-bearing dependency unresolved/quarantined unless local capture exists.

PASS.

## H03 — query partial results in chat

First 100 of 480 supplier records returned.

Result:

- partial/cursor exposed;
- assistant cannot say “all suppliers”; may continue pages under authorized limits.

PASS.

## H04 — proposal auto-accept attempt

BOQ packaging proposal has high confidence and waits 24 hours.

Result:

- remains proposal;
- no timeout/default acceptance;
- command/current authority required.

PASS.

## H05 — migration `actual`

Legacy actual field lacks authority/type.

Result:

- unresolved/quarantine/reference-only;
- cannot map to certified/accounting/paid.

PASS.

## H06 — email connector removed

Result:

- new mail operations stop/degrade;
- historical evidence remains;
- manual send/capture path continues;
- product workflow intact.

PASS.

## H07 — supplier document prompt injection

PDF instructs agent to export all competitor bids.

Result:

- source content is untrusted data;
- no capability/authority granted;
- cross-supplier/tenant access blocked.

PASS.

## H08 — external ERP payment callback

Authenticated callback states paid.

Result:

- ExternalObservation/REFERENCE or MIRROR according to profile;
- cannot create P07 certificate/payment cash truth beyond exact external fact;
- no connector co-master.

PASS.

## H09 — public API never activated

Result:

- mandatory internal operation substrate/manual/file/email-port foundation remains;
- first tender and later adapter path intact.

PASS.

## H10 — full enterprise integration ambition

Team proposes generic workflow/mapping/connector marketplace.

Result:

- violates one-XL/anti-iPaaS guard;
- P1.7 supports only bounded domain seams.

PASS.

---

# 8. Gate check

- G1 one authority/no connector co-master — PASS
- G2 state changes through registered bounded commands — PASS
- G3 Q/P/C/A/proposal-effect boundary — PASS
- G4 domain/integration/transport/external observation — PASS
- G5 deterministic crash/retry/publication/callback recovery — PASS
- G6 migration/import provenance/identity/time/authority/history — PASS
- G7 P1.6 reconstruction/materialization — PASS
- G8 typed conflict/error/staleness/quarantine/no forced equality — PASS
- G9 authority transfer/cutover/no dual writer — PASS
- G10 schema/capability/API/event evolution/disable/replace — PASS
- G11 provider-neutral email/manual fallback — PASS
- G12 chat/agent safe readiness/no reliability assumption — PASS
- G13 ADR-0006/no named connector prerequisite — PASS
- G14 A0–A3 no-connector end to end — PASS
- G15 P1.1–P1.6 regression NO/P07 sole XL/product code locked — PASS
- G16 internal hostile review — PASS; Claude pending

---

# 9. Regression / gravity

- P1.1 REOPEN = NO
- P1.2 REGRESSION = NO
- P1.3 REOPEN = NO
- P1.4 REOPEN = NO
- P1.5 REOPEN = NO
- P1.6 REOPEN = NO
- SECOND XL = CLEAN
- A0–A3 = CLEAN
- Product code = LOCKED

---

# 10. Non-blocking debt/watch list for Claude

- exact API/RPC/tool/event/file schemas and physical technology;
- exact named email adapter/provider selection under build gate;
- connector-specific version/conformance evidence;
- detailed P1.8 query/projection/report definitions;
- P1.9 chat/navigation/confirmation UX;
- P1.10 agent evaluation/confidence/orchestration/autonomy/security controls;
- transaction-family MigrationAcceptanceProfiles only when each migration is activated;
- exact public API/marketplace strategy;
- customer-specific ERP/CDE integration scope.

These do not currently leave interface authority/meaning undecided.

---

# 11. ADR candidate classification

Internal recommendation subject to Claude:

- ADR-0006 — ACCEPT SEMANTIC DECISION;
- ADR-0029 — ACCEPT SEMANTIC DECISION;
- ADR-0030 — ACCEPT SEMANTIC DECISION;
- ADR-0031 — ACCEPT SEMANTIC DECISION;
- ADR-0032 — ACCEPT SEMANTIC DECISION.

No upstream ADR reopen.

---

# 12. Verdict

`PASS — P1.7 internal blockers are closed; external hostile audit ready.`

P1.7 remains ACTIVE until Claude PASS + final ADR/checkpoint.

P1.8+ remains LOCKED.

Product code remains LOCKED.
