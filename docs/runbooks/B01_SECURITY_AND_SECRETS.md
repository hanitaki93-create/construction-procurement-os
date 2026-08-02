# B01 Security and Secret Handling

## Secret rules

- Never commit credentials, private keys, tokens, browser state, `.env` files or production connection strings.
- `.env.example` contains local placeholders only.
- Runtime configuration accepts an OTLP URL without embedded credentials.
- Structured logs recursively redact sensitive keys such as token, password, secret, credential, session, cookie and object key.
- Telemetry attributes use a closed low-cardinality allowlist and cannot carry business IDs or content.

Run:

```bash
pnpm security:secrets
pnpm security:dependencies
```

The secret gate uses pinned Gitleaks with the default rules plus a narrow allowlist for documented local placeholders. The dependency gate audits the exact committed pnpm graph and fails at high severity.

## Database roles and objects

B01 runtime database access is private to `@cpos/database-core`. Public packages cannot obtain a raw pool, client, Kysely root or unrestricted query method.

Real catalog tests reject unmanifested:

- `SECURITY DEFINER` functions;
- `set_config` or role/context mutation;
- prohibited `BYPASSRLS` roles;
- runtime-created database objects.

B02 will establish tenant RLS and execution context; B01 does not pretend those product controls already exist.

## Containers

All four runtime images:

- use exact Node `24.18.0-bookworm-slim`;
- run as UID/GID `10001`;
- contain no source tests, `.env` or development dependency graph;
- carry build, release and source labels;
- expose only technical health behavior.

Run:

```bash
pnpm containers:build
pnpm containers:smoke
pnpm security:containers
pnpm sbom
```

Container scanning fails on fixed high or critical vulnerabilities. CycloneDX SBOMs are generated for source and all four images.

## Incident boundary

Technical logs and telemetry help diagnose runtime health. They never establish a business action, audit event, evidence state, supplier response or security fact. Later authoritative security/audit records require their own governed persistence and operations.
