# B01 Implementation Boundaries

**Version:** 1.0  
**Status:** Freeze candidate  
**Block:** Engineering Foundation & Runtime Skeleton

## In scope

- exact monorepo workspace, dependency graph and lockfile;
- technical API, worker, internal-web and external-web shells;
- typed configuration and technical health/build metadata;
- package dependency and public-surface enforcement;
- PostgreSQL migration, exact-type, isolation, concurrency and catalog-security foundations;
- invariant compiler and technical fixture infrastructure;
- versioned object-store, malware-scanner and OTLP contracts;
- local replaceable infrastructure used for contract verification;
- browser, accessibility and RTL foundation tests;
- non-root OCI images, security scans, SBOMs and rollback proof;
- testkit and deterministic verification tooling.

## Explicitly out of scope

B01 must not establish business authority or product behavior, including:

- tenant, company, project or principal domain models;
- authentication, authorization roles or identity lifecycle;
- suppliers, subcontractors, vendors or qualification decisions;
- RFQs, quotations, comparisons or commercial evaluations;
- requisitions, approvals, commitments, purchase orders or contracts;
- goods receipt, invoices, payments, budgets or reporting truth;
- evidence acceptance, quarantine authority or audit truth;
- AI models, agents, recommendations, scoring or decision authority;
- P07 behavior or later-block workflow semantics.

## Audit rule

Technical fixtures may use neutral examples to prove mechanisms. A finding is a scope failure only when the implementation creates reusable product-domain authority, tables, services, routes, workflows or decisions that belong to later blocks.

## Future evolution

A later requirement may extend or revise this foundation. Such a change does not terminate the project. It must be recorded as a versioned correction or an ADR-backed architectural amendment, with affected evidence regenerated and re-audited proportionally.
