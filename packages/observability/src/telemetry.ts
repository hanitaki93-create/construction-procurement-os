import { metrics, SpanStatusCode, trace, type Attributes } from '@opentelemetry/api';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';

const safeInstrumentName = /^[a-z][a-z0-9_.-]{0,62}$/u;
const permittedAttributeKeys = new Set([
  'component',
  'environment',
  'lane',
  'result',
  'state',
]);

export interface TechnicalTelemetry {
  readonly enabled: boolean;
  runSpan<T>(name: string, operation: () => Promise<T>): Promise<T>;
  addCounter(name: string, value?: number, attributes?: Attributes): void;
  shutdown(): Promise<void>;
}

export interface TechnicalTelemetryOptions {
  readonly serviceName: string;
  readonly endpoint?: string;
  readonly environment: string;
  readonly exportIntervalMs?: number;
}

function instrumentName(value: string): string {
  if (!safeInstrumentName.test(value)) {
    throw new Error('telemetry instrument names must be low-cardinality lowercase identifiers');
  }
  return value;
}

function safeAttributes(attributes: Attributes | undefined): Attributes {
  if (!attributes) return {};
  const output: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(attributes)) {
    if (!permittedAttributeKeys.has(key)) {
      throw new Error(`telemetry attribute ${key} is not in the bounded-cardinality allowlist`);
    }
    if (!['string', 'number', 'boolean'].includes(typeof value)) {
      throw new Error(`telemetry attribute ${key} must be scalar`);
    }
    output[key] = value as string | number | boolean;
  }
  return output;
}

function disabledTelemetry(): TechnicalTelemetry {
  return {
    enabled: false,
    async runSpan<T>(_name: string, operation: () => Promise<T>): Promise<T> {
      return await operation();
    },
    addCounter(): void {},
    async shutdown(): Promise<void> {},
  };
}

export async function startTechnicalTelemetry(
  options: TechnicalTelemetryOptions,
): Promise<TechnicalTelemetry> {
  const rawEndpoint = options.endpoint?.trim();
  if (!rawEndpoint) return disabledTelemetry();
  const endpoint = new URL(rawEndpoint);
  if (!['http:', 'https:'].includes(endpoint.protocol)) {
    throw new Error('OTLP endpoint must use HTTP or HTTPS');
  }
  const base = endpoint.toString().replace(/\/$/u, '');
  const exportIntervalMs = options.exportIntervalMs ?? 5_000;
  if (!Number.isSafeInteger(exportIntervalMs) || exportIntervalMs < 1_000 || exportIntervalMs > 60_000) {
    throw new Error('telemetry export interval must be from 1000 to 60000 milliseconds');
  }

  const sdk = new NodeSDK({
    serviceName: options.serviceName,
    autoDetectResources: false,
    traceExporter: new OTLPTraceExporter({ url: `${base}/v1/traces` }),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({ url: `${base}/v1/metrics` }),
      exportIntervalMillis: exportIntervalMs,
      exportTimeoutMillis: Math.min(exportIntervalMs, 10_000),
    }),
    instrumentations: [],
  });
  await Promise.resolve(sdk.start());

  const tracer = trace.getTracer(options.serviceName, '0.0.0-b01');
  const meter = metrics.getMeter(options.serviceName, '0.0.0-b01');
  const counters = new Map<string, ReturnType<typeof meter.createCounter>>();

  return {
    enabled: true,
    async runSpan<T>(name: string, operation: () => Promise<T>): Promise<T> {
      const boundedName = instrumentName(name);
      return await tracer.startActiveSpan(boundedName, async (span) => {
        try {
          const result = await operation();
          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error: unknown) {
          span.setStatus({ code: SpanStatusCode.ERROR });
          if (error instanceof Error) span.recordException(error);
          throw error;
        } finally {
          span.end();
        }
      });
    },
    addCounter(name: string, value = 1, attributes?: Attributes): void {
      const boundedName = instrumentName(name);
      if (!Number.isFinite(value) || value < 0) throw new Error('telemetry counter value is invalid');
      let counter = counters.get(boundedName);
      if (!counter) {
        counter = meter.createCounter(boundedName);
        counters.set(boundedName, counter);
      }
      counter.add(value, safeAttributes(attributes));
    },
    async shutdown(): Promise<void> {
      await sdk.shutdown();
    },
  };
}
