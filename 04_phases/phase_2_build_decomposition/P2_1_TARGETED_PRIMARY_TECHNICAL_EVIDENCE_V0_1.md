# P2.1 — Targeted Primary Technical Evidence v0.1

**Date:** 2026-08-02  
**Status:** PRIMARY OFFICIAL TECHNICAL EVIDENCE / PHYSICAL DECISION SUPPORT  
**Purpose:** support P2.1 physical choices without turning external technologies into product semantics.

---

## 1. Evidence rule

Only official project documentation and release material is used here. These sources support feasibility and current-version choices; they do not establish that an implementation automatically satisfies the frozen Phase 1 contracts.

---

## 2. Runtime and web stack

### Node.js

Official release status on 2026-08-02:

- Node.js 24 (`Krypton`) is LTS;
- Node.js 26 is Current;
- the Node project recommends production applications use Active or Maintenance LTS releases.

Decision implication:

- baseline runtime: **Node.js 24 LTS**, exact patch pinned in the repository/runtime manifest;
- do not use Node.js 26 Current for the first production baseline.

Official source:

- https://nodejs.org/en/about/previous-releases

### Fastify

Official current documentation identifies Fastify 5.10.x as the latest v5 line and documents schema validation/serialization, request lifecycle, hooks, request IDs and plugin encapsulation.

Decision implication:

- use **Fastify 5.x** as the thin HTTP/runtime shell;
- keep domain operations outside route handlers;
- use runtime JSON-schema validation and explicit request IDs.

Official sources:

- https://fastify.dev/docs/latest/
- https://fastify.dev/docs/latest/Reference/
- https://fastify.dev/docs/latest/Reference/Principles/

### React and Vite

Official React versions list React 19.2.x as the current 19.2 line. Official Vite releases identify Vite 8.1 as supported/current and recommend pinning/upgrading deliberately.

Decision implication:

- separate browser applications use **React 19.2.x + Vite 8.1.x**;
- no React Server Components or framework server actions are required;
- all state-changing behavior remains explicit API operation execution.

Official sources:

- https://react.dev/versions
- https://vite.dev/releases
- https://vite.dev/blog/announcing-vite8

### TanStack Query and Playwright

Official TanStack Query documentation defines server-state fetching/caching/mutation behavior and warns that default cache/refetch behavior must be understood and configured. Official Playwright documentation provides isolated cross-browser end-to-end testing across Chromium, Firefox and WebKit.

Decision implication:

- TanStack Query may cache queries but may not autonomously replay consequential mutations;
- Playwright is the browser-level acceptance tool for continuation, disclosure, accessibility and RTL/mobile paths.

Official sources:

- https://tanstack.com/query/latest/docs/react/overview
- https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
- https://playwright.dev/docs/intro
- https://playwright.dev/docs/best-practices

---

## 3. PostgreSQL feasibility

### Current supported release

Official PostgreSQL documentation identifies PostgreSQL 18.4 as current and supported.

Decision implication:

- baseline database: **PostgreSQL 18.x**, exact patch pinned in environment manifests.

Official source:

- https://www.postgresql.org/docs/current/index.htm

### Exact numeric

PostgreSQL documents `numeric`/`decimal` as exact selectable-precision types and recommends them for monetary values where exactness is required.

Decision implication:

- no floating-point type or JavaScript `number` for money, rates or commercial contribution values;
- use explicit precision/scale and application decimal/string serialization.

Official source:

- https://www.postgresql.org/docs/18/datatype-numeric.html

### UUIDv7

PostgreSQL 18 provides native UUIDv7 generation and native UUID storage.

Decision implication:

- UUIDv7 is the default physical identifier for newly generated internal records where ordering locality is useful;
- identifier ordering never creates business chronology or authority.

Official sources:

- https://www.postgresql.org/docs/current/functions-uuid.html
- https://www.postgresql.org/docs/18/datatype-uuid.html

### Row-level security

PostgreSQL row-security policies can apply command-specific qualifying and `WITH CHECK` expressions. Roles may be configured to bypass RLS, which means runtime-role design is material.

Decision implication:

- all tenant-owned tables use RLS plus application authorization;
- runtime roles are not table owners, superusers or `BYPASSRLS` roles;
- tenant/principal/context settings are transaction-local and fail closed;
- migration/maintenance roles remain separate and audited.

Official sources:

- https://www.postgresql.org/docs/18/ddl-rowsecurity.html
- https://www.postgresql.org/docs/18/catalog-pg-policy.html
- https://www.postgresql.org/docs/18/sql-createrole.html

### Queue claiming

PostgreSQL documents `FOR UPDATE ... SKIP LOCKED`, which is suitable for multiple consumers claiming queue rows when a deliberately inconsistent queue view is acceptable.

Decision implication:

- PostgreSQL may provide the initial durable worker/outbox queue substrate;
- `SKIP LOCKED` is limited to queue claiming, not authoritative business reads;
- leases, attempt identities, fairness, tenant quotas and reconciliation remain application contracts.

Official source:

- https://www.postgresql.org/docs/18/sql-select.html

### Search

PostgreSQL provides full-text search and supplied trigram similarity support.

Decision implication:

- begin with PostgreSQL-derived search documents, `tsvector` and trigram matching;
- do not introduce OpenSearch/Elasticsearch until measured limits justify a separately reconciled projection;
- Arabic search quality remains a build/prototype validation item and is not inferred from general full-text support.

Official sources:

- https://www.postgresql.org/docs/18/textsearch.html
- https://www.postgresql.org/docs/current/contrib.html

---

## 4. Observability

OpenTelemetry officially separates traces, metrics and logs and describes itself as vendor-neutral instrumentation/export infrastructure. Its metric documentation warns that high-cardinality attributes can create unbounded memory cost.

Decision implication:

- use OpenTelemetry/OTLP as the instrumentation seam;
- keep audit/domain events outside telemetry;
- never use tenant IDs, user IDs, evidence text, bid values, prompts or raw object keys as uncontrolled metric dimensions;
- measurement health is itself observable.

Official sources:

- https://opentelemetry.io/docs/
- https://opentelemetry.io/docs/concepts/signals/
- https://opentelemetry.io/docs/concepts/signals/metrics/

---

## 5. Evidence conclusion

The official evidence supports the feasibility of:

- a Node 24 LTS TypeScript system;
- Fastify API/worker runtime;
- React/Vite browser applications;
- PostgreSQL 18 as transactional, RLS, exact-money, initial queue and initial search substrate;
- vendor-neutral OpenTelemetry instrumentation;
- Playwright cross-browser interaction testing.

It does not prove:

- tenant isolation under the chosen implementation;
- semantic RPO 0;
- cross-store evidence durability;
- queue fairness or effect safety;
- Arabic search/RTL usability;
- accessibility conformance;
- the frozen NFR envelope.

Those remain explicit physical proof gates.