import type { BuildMetadata } from '@cpos/contracts';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface RuntimeConfig {
  readonly serviceName: string;
  readonly host: string;
  readonly port: number;
  readonly bodyLimitBytes: number;
  readonly requestTimeoutMs: number;
  readonly trustProxy: boolean;
  readonly logLevel: LogLevel;
  readonly build: BuildMetadata;
}

export class ConfigurationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

const allowedLogLevels = new Set<LogLevel>(['debug', 'info', 'warn', 'error']);
const safeText = /^[A-Za-z0-9._:/-]+$/u;

function boundedText(
  env: NodeJS.ProcessEnv,
  key: string,
  fallback: string,
  maximumLength = 128,
): string {
  const value = env[key]?.trim() || fallback;
  if (value.length > maximumLength || !safeText.test(value)) {
    throw new ConfigurationError(`${key} contains unsupported characters or exceeds its limit`);
  }
  return value;
}

function integer(
  env: NodeJS.ProcessEnv,
  key: string,
  fallback: number,
  minimum: number,
  maximum: number,
): number {
  const raw = env[key];
  if (raw === undefined || raw.trim() === '') return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new ConfigurationError(`${key} must be an integer from ${minimum} to ${maximum}`);
  }
  return value;
}

function boolean(env: NodeJS.ProcessEnv, key: string, fallback: boolean): boolean {
  const raw = env[key]?.trim().toLowerCase();
  if (raw === undefined || raw === '') return fallback;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  throw new ConfigurationError(`${key} must be true or false`);
}

function logLevel(env: NodeJS.ProcessEnv): LogLevel {
  const value = (env.LOG_LEVEL?.trim().toLowerCase() || 'info') as LogLevel;
  if (!allowedLogLevels.has(value)) {
    throw new ConfigurationError('LOG_LEVEL must be debug, info, warn, or error');
  }
  return value;
}

export function loadRuntimeConfig(
  serviceName: string,
  env: NodeJS.ProcessEnv = process.env,
): RuntimeConfig {
  const environment = boundedText(env, 'APP_ENV', 'development', 48);
  return {
    serviceName,
    host: boundedText(env, 'HOST', '127.0.0.1', 255),
    port: integer(env, 'PORT', serviceName === 'api' ? 3001 : 3002, 1, 65_535),
    bodyLimitBytes: integer(env, 'BODY_LIMIT_BYTES', 1_048_576, 1_024, 10_485_760),
    requestTimeoutMs: integer(env, 'REQUEST_TIMEOUT_MS', 15_000, 100, 120_000),
    trustProxy: boolean(env, 'TRUST_PROXY', false),
    logLevel: logLevel(env),
    build: {
      service: serviceName,
      buildId: boundedText(env, 'BUILD_ID', 'development'),
      releaseId: boundedText(env, 'RELEASE_ID', 'unreleased'),
      sourceCommit: boundedText(env, 'SOURCE_COMMIT', 'unknown'),
      runtime: process.version,
      environment,
    },
  };
}
