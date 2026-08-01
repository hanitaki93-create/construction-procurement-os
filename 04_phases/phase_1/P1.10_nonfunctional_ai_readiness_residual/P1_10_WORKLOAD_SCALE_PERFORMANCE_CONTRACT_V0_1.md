# P1.10 — Workload, Scale & Performance Contract v0.1

**Date:** 2026-08-01  
**Status:** ACTIVE SEMANTIC CANDIDATE  
**Product code:** LOCKED

---

# 1. Governing rule

> **Performance targets apply only under an explicit reference workload and measure durable acceptance separately from eventual effect completion.**

No “fast,” “real-time,” “enterprise scale” or unlimited-volume claim is accepted.

---

# 2. Reference workload profiles

## `V1_PILOT_PROFILE`

Platform envelope:

- 10 active tenants;
- 250 concurrent authenticated sessions platform-wide;
- 25 concurrent sessions in the largest tenant;
- 20 active projects per tenant;
- 100 internal users per tenant;
- 5,000 tenant-private supplier relationships per tenant;
- 250,000 active requirement/tender/response/comparison lines per tenant;
- 1,500,000 historical transaction lines per tenant;
- 2,000,000 retained domain/integration/evidence events per tenant;
- 250 GB retained evidence payload per tenant excluding customer-controlled external references;
- 25 concurrent external task sessions per tenant during tender peaks;
- 50 command acceptances per minute platform-wide sustained;
- 200 interactive reads per minute per largest tenant sustained;
- 25 external submissions per minute platform-wide sustained.

## `V1_STANDARD_VERIFICATION_PROFILE`

Platform envelope:

- 50 active tenants;
- 1,000 concurrent sessions platform-wide;
- 100 concurrent sessions in the largest tenant;
- 50 active projects per tenant;
- 250 internal users per tenant;
- 25,000 supplier relationships per tenant;
- 1,000,000 active lines per tenant;
- 5,000,000 historical lines per tenant;
- 10,000,000 retained events per tenant;
- 1 TB retained evidence payload per tenant;
- 100 concurrent external task sessions per tenant during peaks;
- 250 command acceptances per minute platform-wide sustained;
- 1,000 interactive reads per minute in the largest tenant sustained;
- 100 external submissions per minute platform-wide sustained.

These are verification envelopes, not promised account limits. Production commercial limits must be equal or lower unless new capacity evidence passes.

---

# 3. Burst and stress profile

Capacity tests include:

- 3× sustained interactive-read load for 15 minutes;
- 2× command-acceptance load for 10 minutes;
- 5× external-task landing/submission burst for 5 minutes around deadlines;
- one largest supported structured import plus normal interactive load;
- one largest supported export plus normal interactive load;
- one dependency degradation scenario;
- one noisy-tenant scenario at quota boundary;
- one queue/backlog recovery scenario.

Stress tests continue until controlled saturation and prove:

- no cross-tenant data leak;
- no lost acknowledged command/evidence;
- no duplicate effect through retry;
- no hidden truncation;
- typed rate/backpressure response;
- recovery without architectural repair.

---

# 4. Measurement contract

Every latency SLI defines:

- start/end events;
- durable boundary;
- eligible operation/version;
- success/failure/timeout inclusion;
- percentile distribution;
- rolling window;
- workload profile;
- client/network exclusion rule;
- dependency state;
- evidence source.

Average-only measurement is prohibited.

Percentiles are calculated from all eligible tenant requests; tenant-specific and platform-wide distributions are both retained so high-volume tenants cannot hide smaller-tenant failure.

---

# 5. Interactive targets

Under `V1_STANDARD_VERIFICATION_PROFILE`, healthy dependencies and payloads within declared limits:

## Interactive read/query

- P50 ≤ 500 ms server processing;
- P95 ≤ 1.5 s end-to-end service time;
- P99 ≤ 4 s;
- timeout ≤ 15 s with typed result, never blank failure.

## Proposal preview/prevalidation

- P50 ≤ 800 ms;
- P95 ≤ 3 s;
- P99 ≤ 8 s;
- operations exceeding 8 s become async with continuation/progress identity.

## Command acceptance/rejection

Measured to durable acceptance/rejection identity, not effect completion:

- P50 ≤ 500 ms;
- P95 ≤ 1.5 s;
- P99 ≤ 4 s;
- acceptance timeout ≤ 10 s;
- unknown acceptance routes to result lookup, never blind resend.

## External task landing

- P95 usable task context ≤ 3 s;
- P99 ≤ 7 s;
- authentication/OTP provider time reported separately;
- degraded mode exposes manual/support path without weakening grant semantics.

## Search

- P95 query response ≤ 2 s;
- P99 ≤ 5 s;
- newly committed product-owned facts searchable within 60 s P95 and 5 min P99;
- search remains derived and discloses indexing lag.

---

# 6. Report/export/import targets

## Registered common report

- P95 ≤ 5 s;
- P99 ≤ 15 s;
- larger/complex runs become async and expose source cut/progress.

## Immutable report snapshot issue

- accepted/build identity ≤ 2 s P95;
- artifact generation for ≤100 pages or ≤100,000 rows ≤ 2 min P95;
- larger supported artifacts complete ≤15 min P95 or return typed limit/fallback.

## Structured import

- preview for ≤10,000 rows ≤ 60 s P95;
- preview for ≤100,000 rows ≤10 min P95;
- row-level results and resumable identity mandatory;
- import never silently submits.

## Export

- ≤100,000 rows ≤2 min P95;
- ≤1,000,000 rows ≤15 min P95;
- larger requests require segmented export or typed unsupported/limit result;
- every export has exact row/member count, source cut, checksum/integrity and truncation state.

---

# 7. File-processing targets

For supported files within policy:

- upload acknowledgement after durable capture ≤5 s P95 excluding client transfer time;
- malware/untrusted-content status starts within 10 s P95;
- scan/validation for files ≤100 MB completes ≤2 min P95;
- files >100 MB may process async but expose progress/continuation;
- timeout/scan failure never becomes clean/accepted evidence.

---

# 8. Async progress targets

- operation identity available before transmission where P1.9 requires;
- accepted async operation appears in status lookup ≤2 s P95;
- progress/heartbeat updates at least every 15 s while active unless the operation exposes an explicit waiting/dependency state;
- absence of heartbeat for 60 s marks status stale/unknown and triggers lookup/reconciliation, not automatic duplicate execution;
- completed result becomes queryable ≤5 s P95 after effect/result commit.

---

# 9. Concurrency and consistency

- stale expected version returns typed conflict ≤2 s P95;
- no last-write-wins for load-bearing facts;
- concurrent commands preserve atomic domain invariants;
- duplicate logical command returns original/current result without duplicate effect;
- consistent query cuts follow P1.7/P1.8 and may trade latency only through explicit requested consistency class.

---

# 10. Saturation and graceful behavior

At capacity boundary:

- reads may degrade to cached/versioned/explicitly stale views only where permitted;
- search and non-critical projections may pause before command/evidence durability;
- AI disables before deterministic operations;
- exports/imports may queue with age/position visibility;
- command acceptance uses fair per-tenant backpressure and never accepts work it cannot durably identify;
- external submissions near deadline receive preserved attempt/receipt time and a policy-governed late/continuation path;
- no request disappears silently.

---

# 11. Performance breach

Breach response is versioned by NFR key:

- warn at 50% error-budget consumption;
- require investigation at 75%;
- freeze risky rollout/capacity expansion at 100%;
- repeated two-window breach requires remediation plan or lower declared capacity/feature scope;
- performance pressure cannot waive authority, evidence, disclosure or data-integrity controls.

---

# 12. Change rule

Increasing workload envelope or tightening targets requires capacity evidence. Lowering targets requires explicit customer/contract impact review and versioned change. A physical implementation cannot silently redefine measurement start/end, exclusions or eligible population.
