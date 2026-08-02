# B01 Observability Runbook

## Purpose

B01 observability reports technical lifecycle and readiness only. It does not replace audit, security or domain records.

## Structured logs

API and worker emit JSON records with:

- timestamp;
- severity;
- service;
- bounded event name;
- recursively sanitized technical fields.

Sensitive-looking keys are redacted. Evidence bytes, supplier content, credentials, query tokens, personal data and business values are prohibited.

## OpenTelemetry

Set a credential-free endpoint when export is required:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 pnpm start:api
```

Without an endpoint, telemetry is an explicit no-op and application behavior remains available.

The telemetry wrapper supports:

- named technical spans;
- monotonic counters;
- a closed low-cardinality attribute allowlist;
- bounded export interval;
- graceful shutdown.

Run a real local export proof:

```bash
pnpm infra:up
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318 pnpm telemetry:smoke
pnpm infra:down
```

The F4 CI gate verifies that the Collector receives both trace and metric payloads under the technical service identity.

## Failure interpretation

- Collector absent: export unavailable; do not fabricate success.
- Application health must not depend on an optional telemetry provider.
- Logs do not establish audit/business truth.
- High-cardinality record, tenant, project, supplier or evidence IDs are rejected as metric attributes.
