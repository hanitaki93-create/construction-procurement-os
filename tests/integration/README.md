# B01 Integration Tests

Executable B01 integration suites are colocated with the owning technical packages:

- PostgreSQL, migrations, concurrency, effective-period, exact-type and catalog proof: `packages/database-core/integration/`;
- object-store and scanner proof: `packages/object-store/integration/`;
- OTLP trace and metric smoke: `scripts/smoke-otel.mjs`.

Run the complete environment-backed integration surface after `pnpm infra:up` with:

```bash
pnpm test:integration
```

All fixtures are technical, scoped and business-empty.
