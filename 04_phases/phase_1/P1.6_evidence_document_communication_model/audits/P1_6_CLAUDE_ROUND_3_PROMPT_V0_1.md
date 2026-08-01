# P1.6 — Claude Round 3 Hostile Audit Prompt v0.1

Use with:

`P1_6_CLAUDE_ROUND_3_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`

---

Please perform P1.6 hostile audit round 3 using the attached self-contained packet only.

You do not have repository access, and none is required.

Your Round-2 blocker BL-P16-05 and watches W-35 through W-38 plus the business-calendar watch have been remediated.

Treat our remediation and internal PASS as claims to attack, not as evidence.

Focus especially on:

1. whether `OBSERVATION_COMPLETES_EFFECT` now establishes one immutable owning-domain event rather than leaving effectiveness as a projection over current evidence;
2. whether a provider callback retraction, correction, fraud finding or late observation can still silently reverse or retime an established effect;
3. whether the immutable `CommunicationSatisfactionSnapshot` genuinely closes the crash window between first satisfaction and delayed domain persistence;
4. whether “accepted under the frozen rule’s then-governing admissibility criteria” avoids both premature snapshots and future-dependent validity;
5. whether correction after a defective communication basis is correctly domain-owned and history-preserving;
6. whether an issued `CommunicationSatisfactionRule` can still be changed in place through any wording loophole;
7. whether unreachable recipients can cause an implementation-defined timeout, auto-lapse or hidden third pattern;
8. whether terminal qualifying observations and explicit prerequisite observations preserve the rule that no communication fact implies another;
9. whether `PER_ADDRESSEE_INDEPENDENT` preserves addressee-scoped completion/final actions without global flattening;
10. whether offset calendars/timezones are truly version-bound and cannot change pending or historical effect time;
11. whether any remediation lets P1.6 become the business-effect writer, introduces a second XL gravity well, burdens A0–A3, or reopens P1.4/P1.5.

Attack the hostile scenarios in the packet and add your own, especially:

- retraction before and after async domain persistence;
- late evidence suggesting an earlier time;
- provider status mutation;
- rule-version error;
- offset-based effect where the underlying observation is retracted before the effective time;
- explicit domain withdrawal before offset completion.

Do not fail for SQL/schema, transaction/outbox/event-store technology, object storage, APIs, UI, connector/provider implementation, hash algorithms, OCR/model/search/indexing or product code intentionally deferred.

Return exactly the VERDICT, BLOCKERS, WATCHES / NON-BLOCKING DEBT, GATE CHECK G1–G15, REGRESSION CHECK, ADR IMPACT and P1.7 READINESS structure required by the packet.

A clean PASS is appropriate only if no later phase still has to decide whether an established effect can be recomputed from evidence or how correction/retraction/late evidence interacts with immutable domain truth.
