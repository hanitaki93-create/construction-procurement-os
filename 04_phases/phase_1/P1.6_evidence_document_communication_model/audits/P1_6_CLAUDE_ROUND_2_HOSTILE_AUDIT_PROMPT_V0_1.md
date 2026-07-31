# P1.6 — Claude Round 2 Hostile Audit Prompt v0.1

Use with:

`P1_6_CLAUDE_ROUND_2_SELF_CONTAINED_AUDIT_PACKET_V0_1.md`

---

Please perform P1.6 hostile audit round 2 using the attached self-contained packet only.

You do not have repository access and none is required.

Your Round-1 blocker BL-P16-04 and watches W-30 through W-34 have been remediated.

Treat our remediation and internal PASS as claims to attack.

Focus especially on:

1. whether `CommunicationSatisfactionRule` now makes recipient/channel satisfaction unambiguous for every Pattern-B case;
2. whether the three addressee modes and three channel modes leave any hidden fallback or quantifier to implementation;
3. whether `PER_ADDRESSEE_INDEPENDENT` preserves addressee-scoped effect rather than flattening mixed states;
4. whether satisfaction-time and governed-offset rules cover deemed-service timing without inventing a third Pattern-B lifecycle;
5. whether `OBSERVATION_COMPLETES_EFFECT` versus `OBSERVATION_ENABLES_FINAL_ACTION` correctly handles delayed persistence, changed current authority and genuinely new discretionary actions;
6. whether the ReconstructionAnchorTest mandatory core now prevents current-pointer IDs from passing as historical versions;
7. whether load-bearing email/message-body content has an exact bindable EvidenceVersion/SourceLocator path;
8. whether `ExternalEvidenceMaterializationPolicy` is explicit enough without turning P1.6 into a CDE mirror;
9. whether any remediation regresses evidence identity, P1.4/P1.5 authority, A0–A3 minimal activation or P07 sole-XL discipline.

Attack the hostile scenarios in the packet and add your own.

Do not fail P1.6 for SQL/schema/object storage/API/UI/connector protocol/hash algorithm/email/signature/OCR/model/search/index implementation choices intentionally deferred.

Return exactly the VERDICT, BLOCKERS, WATCHES / NON-BLOCKING DEBT, GATE CHECK, REGRESSION CHECK, ADR IMPACT and P1.7 READINESS structure required by the packet.

A clean PASS is appropriate only if no later phase still has to decide addressee/channel quantification, communication-derived effect timing/completion, evidence reconstruction safety or exact bindable message-source semantics.
