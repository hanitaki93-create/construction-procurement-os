Please perform Phase 2 hostile audit Round 2 using the attached self-contained packet and evidence bundle only.

You do not have repository access, and none is required.

Round 1 found one blocker: BL-P21-06, missing concurrency control for cross-row conservation invariants. It also raised W-100–W-111. Treat every remediation and internal PASS as a claim to attack.

Required independent executions:

1. Allocation write skew: run the same-capacity/different-child-row scenario under unprotected READ COMMITTED, CC-2 guard-row lock and CC-4 SERIALIZABLE. Verify the negative control fails and protected modes preserve the invariant.
2. One-economic-value-once race: two different rows reference one contribution identity. Attack guard locking, unique constraint and typed conflict.
3. Minimum/residual drawdown race: verify qualifying amount, prior applications and residual are recomputed under one lineage lock and cannot over-apply.
4. Exclusive active scope: attack partial-unique/exclusion and serializable fallback; application pre-check alone must be insufficient.
5. Multiple guard rows: attack lock ordering, deadlock handling, attempt limits and logical-command identity.
6. Serialization/deadlock retry: prove retry is permitted only before external effect and cannot multiply idempotency/outbox/publication identity.
7. Context mutation: attempt SECURITY DEFINER, set_config, SET ROLE, trigger/view/function and dynamic-SQL context alteration after initial verification.
8. Projection isolation: attempt cross-tenant access through search, report, export staging and control queue tables. Query filtering alone must not pass.
9. Numeric exactness: attempt node-postgres numeric parser override, beyond-safe values and hidden database rounding.
10. Calculation execution: attempt an unregistered SQL calculation or registered SQL executor that diverges from the TypeScript exact-decimal reference.
11. Report source cut: attempt wall-clock/latest-index execution and an unreconstructable watermark.
12. Schema ordering: attempt RFQ issue before sourcing response schema/field keys/attachments/acceptance policy are activated. Verify B06 has no dependency on future B08 semantics.
13. NFR/security deferral: attempt to PASS an early block while postponing its local security/NFR evidence to B14.
14. Reviewer independence: attempt builder self-certification.
15. B01-P01 v0.2 simulation: inspect isolation helper, write-skew fixtures, raw-pool prohibition, numeric tests, catalog scan, manifests, scope and rollback.
16. Regress PX-02–PX-06 from Round 1: RLS/worker, evidence cross-store, external-effect lease, release skew and ordinary A0–A3 optionality.
17. Inspect PA-G1–PA-G15, the 18-block graph and all MR-001–MR-092 ownership/proof dispositions.
18. Add your own hostile scenarios, especially an invariant that appears self-enforcing but spans rows.

Do not fail for exact production cloud vendor, managed container service, OIDC provider, S3 provider, visual design or later domain-table attributes when the physical protocol and owning block are exact.

Return exactly:

- VERDICT
- CONCURRENCY EXECUTIONS
- PHYSICAL REGRESSION EXECUTIONS
- BLOCKERS
- WATCHES / NON-BLOCKING DEBT
- PA-G1–PA-G15 CHECK
- DECOMPOSITION / TRACEABILITY CHECK
- B01-P01 V0.2 CHECK
- REGRESSION CHECK
- FREEZE READINESS
- FIRST BUILD PROMPT READINESS

Use exactly this PASS verdict only if no later implementation must choose a load-bearing physical protocol:

`PASS — P2.1 physical architecture and P2.2 build decomposition can freeze; B01-P01 v0.2 is ready for execution after explicit implementation authorization and the recorded V1/V2 sequencing decision.`

Otherwise:

`FAIL — Phase 2 architecture/decomposition remains open; blockers below must be remediated before freeze or build-prompt release.`

On PASS:

`READY TO FREEZE P2.1/P2.2 AFTER FINAL CHECKPOINT.`

`B01-P01 V0.2 READY BUT EXECUTION LOCKED UNTIL EXPLICIT AUTHORIZATION AND V1/V2 SEQUENCING DECISION.`

A clean PASS requires a NO answer to:

Does any later implementation still need to choose a load-bearing concurrency, isolation, cross-store, effect-recovery, tenancy, calculation, reporting-cut, compatibility, block-order or B01-completion protocol?