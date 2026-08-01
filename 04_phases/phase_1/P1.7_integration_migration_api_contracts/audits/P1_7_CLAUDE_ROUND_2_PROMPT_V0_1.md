# P1.7 — Claude Round 2 Hostile Audit Prompt v0.1

Use with:

`P1_7_CLAUDE_ROUND_2_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`

---

Please perform P1.7 hostile audit round 2 using the attached self-contained packet only.

You do not have repository access, and none is required.

Your Round-1 blocker BL-P17-05 and watches W-43 through W-47, together with the later-conformance/historical-RelianceBinding watch, have been remediated.

Treat our remediation and internal PASS as claims to attack, not as evidence.

Focus especially on:

1. whether the seven-stage taxonomy now has a truthful state for every ambiguous timeout, crash, callback/correlation gap, current-only provider and partial-batch case;
2. whether `ACCEPTED_PRE_EFFECT` now requires positive no-effect evidence rather than mere absence of confirmation;
3. whether `EFFECT_INDETERMINATE` is mandatory whenever an external or domain effect may exist but is unconfirmed and undisproved;
4. whether ordinary retry, resend, reissue, technical rebind, pre-effect cancellation and conflicting new commands are genuinely prohibited while indeterminate;
5. whether only reconciliation, manual reconciliation or blocking is allowed during indeterminacy, including connector/profile cutover;
6. whether positive confirmation/disconfirmation criteria are version-bound and strong enough to prevent an eventually consistent “not found” result from being treated as proof of no effect;
7. whether stage history, ownership, aging and allowed/blocked actions prevent indeterminate effects from becoming a mutable status overwrite or silent limbo;
8. whether partial/bulk operations preserve item-level unknown effects and prevent whole-batch replay;
9. whether uncorrelated but authentic inbound observations are retained/quarantined rather than discarded or converted into domain truth;
10. whether `SYSTEM_BOUNDED` is now absolutely unable to originate award, approval, Commitment, change, certification or payment authority while still allowing mechanical consequences of an already-authorized basis;
11. whether every inbound external payload—including ERP callbacks, imported rows and inbound integration events—is untrusted data rather than tool/control instructions;
12. whether PublicationIntent retry is unable to change exact target, account, audience or subscriber set, including dynamic broadcast membership;
13. whether `V1_EMAIL_CORE_CONFORMING` gives the later release team a concrete minimum—outbound send plus selected inbound capture—without naming a provider or burdening A0–A3;
14. whether a later provider/adapter conformance failure correctly creates evidence-deficiency variance without invalidating or rebinding historical RelianceBindings;
15. whether any remediation creates a generic case-management, iPaaS, event-platform, email-archive or agent-platform second XL.

Attack the packet’s hostile scenarios and add your own, especially:

- ERP posting times out and an adapter cutover follows;
- timeout is conclusively before dispatch;
- provider claims idempotency but conformance has not proven it;
- HTTP 202 proves queue receipt but not business posting;
- an internal domain command may have committed before result timeout;
- a partial batch has confirmed, no-effect and unknown items;
- a user cancels an indeterminate operation;
- provider “not found” is eventually consistent;
- a replacement adapter can both query and send;
- callback arrives before local request persistence;
- authentic uncorrelated observation remains unresolved for months;
- deterministic system auto-award;
- prompt injection in ERP webhook, imported CSV and inbound IntegrationEvent;
- retry attempts a different target or a changed subscriber set;
- selected email adapter can send but cannot retrieve selected inbound messages;
- provider historical-version semantics change years later;
- an agent attempts to override the indeterminate block;
- no public API/chat/broker or named connector is ever activated.

Do not fail P1.7 for REST/RPC/GraphQL, database/event-store/outbox/queue technology, exact schemas, gateways, provider selection, UI, search/indexing, AI model/orchestration or product code intentionally deferred.

Return exactly the VERDICT, BLOCKERS, WATCHES / NON-BLOCKING DEBT, GATE CHECK G1–G16, REGRESSION CHECK, ADR IMPACT and P1.8 READINESS structure required by the packet.

A clean PASS is appropriate only if no later phase still has to decide whether an unresolved effect attempt is pre-effect or possibly effected, which recovery/cutover actions are safe, or whether connector/evidence corrections can silently rewrite historical meaning.
