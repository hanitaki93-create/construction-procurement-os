export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogFields = Readonly<Record<string, unknown>>;
export type LogSink = (serializedRecord: string) => void;

export interface TechnicalLogger {
  debug(message: string, fields?: LogFields): void;
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
}

const levelRank: Readonly<Record<LogLevel, number>> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const sensitiveKey =
  /authorization|cookie|credential|password|private.?key|secret|session|token|object.?key/iu;

function sanitize(value: unknown, depth = 0): unknown {
  if (depth > 6) return '[DEPTH_LIMIT]';
  if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
  if (typeof value === 'bigint') return value.toString();
  if (value instanceof Error) return { name: value.name, message: value.message };
  if (Array.isArray(value)) return value.map((entry) => sanitize(entry, depth + 1));
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        sensitiveKey.test(key) ? '[REDACTED]' : sanitize(entry, depth + 1),
      ]),
    );
  }
  return String(value);
}

export function createTechnicalLogger(options: {
  readonly service: string;
  readonly minimumLevel: LogLevel;
  readonly sink?: LogSink;
  readonly now?: () => Date;
}): TechnicalLogger {
  const sink = options.sink ?? ((line) => process.stdout.write(`${line}\n`));
  const now = options.now ?? (() => new Date());

  const emit = (level: LogLevel, message: string, fields: LogFields = {}): void => {
    if (levelRank[level] < levelRank[options.minimumLevel]) return;
    const record = {
      timestamp: now().toISOString(),
      level,
      service: options.service,
      message,
      fields: sanitize(fields),
    };
    sink(JSON.stringify(record));
  };

  return {
    debug: (message, fields) => emit('debug', message, fields),
    info: (message, fields) => emit('info', message, fields),
    warn: (message, fields) => emit('warn', message, fields),
    error: (message, fields) => emit('error', message, fields),
  };
}
