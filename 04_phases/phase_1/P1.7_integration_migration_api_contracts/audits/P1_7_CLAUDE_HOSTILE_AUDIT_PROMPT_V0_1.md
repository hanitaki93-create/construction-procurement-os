# P1.7 — Claude Hostile Audit Prompt v0.1

Use with:

`P1_7_CLAUDE_SELF_CONTAINED_HOSTILE_AUDIT_PACKET_V0_1.md`

---

Please perform the independent hostile P1.7 Integration, Migration & API Contracts audit using the attached self-contained packet only.

You do not have repository access, and none is required.

Treat our internal PASS as a claim to attack, not as evidence.

Focus especially on:

1. whether QUERY, PROPOSAL, COMMAND and ASYNC_OPERATION are genuinely closed and cannot be bypassed by generic CRUD, chat or connector actions;
2. whether DIRECT_PRINCIPAL, DELEGATED_ON_BEHALF, SYSTEM_BOUNDED, EXTERNAL_SOURCE_SUBMISSION and HISTORICAL_IDEMPOTENT_RECOVERY fully close service-account/agent/connector authority escalation;
3. whether accepted operations during user-authority, connector-profile or capability cutover have deterministic effect-stage/disposition semantics with no dual writer or unauthorized continuation;
4. whether immutable PublicationIntent prevents retry payload meaning, schema, redaction, serializer or destination behavior from changing after source-event commit;
5. whether timeout, duplicate calls, callback races, missed subscriptions, replay and publication failure can create duplicate effects or false completion;
6. whether ConnectorProfile/AuthorityMapping/conformance preserves OWN/MIRROR/REFERENCE/OUT and exact external version/freshness/evidence semantics;
7. whether provider-neutral email integration preserves exact body/attachment evidence, send/delivery/ack separation, scoped access, resync and manual fallback;
8. whether migration/import can still fabricate history, directly assign open states/balances, collapse different actuals or merge weak identities;
9. whether chat/agents can only query, propose, request bounded commands, track async state, explain or abstain—and whether tool exposure accidentally assumes reliable autonomy;
10. whether ADR-0006 now gives the future builder a concrete V1 implementation floor while keeping public transports, named connectors and agent runtime optional;
11. whether the requirement for one deployable V1 email adapter is compatible with no named provider selection and no A0–A3 connector prerequisite;
12. whether A0–A3 truly runs end to end with no email API, ERP, CDE, supplier account, chat or AI;
13. whether any remediation creates an iPaaS, API platform, event platform, MDM/migration suite, email archive or agent-platform second XL.

Attack the full hostile-scenario list and add your own, particularly:

- represented user lacks authority but service account is broad;
- user delegation revoked after async acceptance but before command effect;
- external effect emitted before profile cutover;
- callback from retired profile;
- publication mapping/disclosure/serializer changes before retry;
- old undelivered payload becomes newly prohibited;
- current-only provider after missed historical notifications;
- mixed-time query used for a load-bearing action;
- open-transaction migration without a family profile;
- capability disabled during in-flight work;
- prompt injection inside supplier evidence;
- public API/chat/broker never activated.

Do not fail P1.7 for REST/RPC/GraphQL, database/event-store/outbox/queue technology, exact payload schemas, API gateway, provider adapter choice, UI, AI model/orchestration or other physical choices intentionally deferred.

Return exactly the VERDICT, BLOCKERS, WATCHES / NON-BLOCKING DEBT, GATE CHECK G1–G16, REGRESSION CHECK, ADR IMPACT and P1.8 READINESS structure required by the packet.

A clean PASS is appropriate only if no later phase still has to decide operation/effect class, execution authority, publication retry meaning, cutover behavior, migration truth or the mandatory V1 readiness substrate.
