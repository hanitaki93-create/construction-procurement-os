Please perform an independent hostile audit of Construction Procurement OS covering the complete load-bearing implementation introduced after the independently closed B02-C1/C2 boundary.

## Mandatory supplied material

Do **not** perform this audit from the prompt alone. Read the attached/supplied file:

`04_phases/phase_2_build_decomposition/audits/B02_C3_C4_B03_INDEPENDENT_HOSTILE_AUDIT_PACKET_V0_1.md`

Then inspect every supporting document/code surface listed in section 3 of that packet. If you do not have repository access, those files must be supplied to you before you issue a verdict. State explicitly if any mandatory source is missing.

Treat all implementation-evidence documents and all CI PASS results as claims to attack, not as proof by themselves.

## Exact audit boundary

Predecessor already independently closed:

`B02-C1/C2 @ 76d5c260cf48c4b3bce842687d3cbe1690b228d8`

Current cycle under audit:

- B02-C3 usage / lifecycle / offboarding;
- B02-C4 project context / governed workspace / session / persistence / entitlement restriction;
- B03 async / event / publication / reconciliation;
- C1/C2 only where later changes concretely touch or regress the closed boundary.

Current implementation evidence:

- B02 base: `5e90ce775e15d94178f4ccd1540970e18b54e352`
- B03 source head: `e7a453cd7702d3816984a4152af298e9036613c8`
- verified PR merge ref: `67d97e360c2c8c6e9e8a643915541b8d0aad930e`
- B03 verification run `31583094396`: SUCCESS
- PostgreSQL integration: 13 files / 74 tests / 74 PASS
- contracts: 41/41 PASS
- API regression: 7/7 PASS
- migrations 000001–000013, pending `[]`, catalog scan `[]`

B03 PR #5 is DRAFT / DO NOT MERGE. B04–B06 are locked pending this audit and subsequent owner acceptance.

SSV-1 is not waived. CHG-0008 owner-authorized its timing deferral to the first genuinely operational procurement MVP; do not treat the absence of three-practitioner SSV-1 at this stage as a blocker unless you demonstrate that CHG-0008 itself creates a present load-bearing correctness defect.

## Required hostile focus

At minimum, attack:

1. FORCE-RLS tenant isolation and all SECURITY DEFINER / role / grant / view / search_path escape paths.
2. AuthenticationIdentity → tenant Principal revalidation and production verified-session fail-closed behavior.
3. OWNER + product-access enforcement for project creation, including cross-tenant/authority injection and restricted lifecycle states.
4. Append-only usage truth, exact usage-definition binding, duplicate correlation and concurrent credit conservation.
5. Any route where offboarding/historical read semantics accidentally become authority.
6. Stable async operation/idempotency identity across crash-before-commit, committed lost response, duplicate and changed-payload conflict.
7. Exactly seven EffectPosition stages and transition legality; queue state must never substitute for effect state.
8. Crash/lease expiry before versus after the possible-effect boundary.
9. Fencing: stale worker cannot heartbeat/complete after a newer claim/fence.
10. INV-052/053: timeout/absence after possible effect cannot prove no effect and cannot re-enter ordinary retry.
11. DomainEvent / IntegrationEvent / PublicationIntent / TransportAttempt / ExternalObservation non-substitution.
12. Immutable PublicationIntent source/mapping/disclosure/target/payload identity across retries.
13. Publication child AsyncOperation isolation: source domain completion must remain independent from outbound transport uncertainty.
14. Tenant quota/fairness under concurrent claimers; no oversubscription race.
15. Reconciliation and accepted-unresolved variance must preserve indeterminate truth rather than invent no-effect.
16. B03 migration re-entrancy repairs: determine whether IF-NOT-EXISTS / guarded constraints / drop-recreate patterns can mask schema drift or weaken migration-history integrity.
17. Full rebuild/replay of 000001–000013 and checksum semantics.
18. Any concrete regression of the previously closed C1/C2 boundaries.
19. Any new load-bearing invariant encountered by implementation but absent from the frozen register.
20. At least five additional hostile scenarios derived from actual source inspection.

Do not fail merely because a different architecture could be chosen. Frozen semantics have authority over provisional code, but provisional code has no authority to reopen frozen architecture absent a genuine invariant defect.

## Required output

Return exactly:

- VERDICT
- EXECUTED HOSTILE SCENARIOS
- BLOCKERS
- WATCHES / NON-BLOCKING DEBT
- B02-C3 CHECK
- B02-C4 CHECK
- B03 CHECK
- TENANT / AUTHORITY / PRIVILEGE CHECK
- CONCURRENCY / IDEMPOTENCY CHECK
- MIGRATION / REBUILD CHECK
- REGRESSION CHECK
- INVARIANT COMPLETENESS CHECK
- SUCCESSOR READINESS

Every blocker must have a stable ID `BL-COMB-XX`, violated invariant/contract, exact source path/object, concrete failure mode, why current proof is insufficient, minimum surgical remediation and exact recheck.

If no blockers exist, write `NONE` under BLOCKERS.

Use this exact PASS verdict only if the combined post-C1/C2 implementation is load-bearing-correct:

`PASS — combined post-C1/C2 B02-C3/C4 and B03 hostile audit closed; owner may record B02/B03 successor acceptance under CHG-0008.`

Otherwise use exactly:

`FAIL — combined post-C1/C2 audit remains open; B04–B06 stay locked until the blockers below are remediated and independently rechecked.`

Do not claim that PASS merges PR #5 or substitutes for project-owner acceptance.
