import type { QueryResultRow } from 'pg';

import type { PrivateTransaction } from './transaction.js';

export interface InternalSqlExecutor {
  all<Row>(statement: InternalSqlStatement): Promise<readonly Row[]>;
  oneOrNone<Row>(statement: InternalSqlStatement): Promise<Row | undefined>;
  execute(statement: InternalSqlStatement): Promise<Readonly<{ rowCount: number }>>;
}

export interface InternalSqlStatement {
  readonly text: string;
  readonly values: readonly unknown[];
}

export interface InternalPersistenceAdapterDefinition<Handle> {
  readonly moduleKey: string;
  readonly databaseRole: string;
  readonly buildHandle: (executor: InternalSqlExecutor) => Handle;
}

const definitions = new WeakMap<object, InternalPersistenceAdapterDefinition<unknown>>();

export function registerPersistenceAdapter<Handle>(
  token: object,
  definition: InternalPersistenceAdapterDefinition<Handle>,
): void {
  if (definitions.has(token)) throw new Error('persistence adapter token is already registered');
  definitions.set(token, definition as InternalPersistenceAdapterDefinition<unknown>);
}

export function resolvePersistenceAdapter<Handle>(
  token: object,
): InternalPersistenceAdapterDefinition<Handle> {
  const definition = definitions.get(token);
  if (definition === undefined) throw new Error('unknown persistence adapter token');
  return definition as InternalPersistenceAdapterDefinition<Handle>;
}

const forbiddenSqlTokens = new Set([
  'alter',
  'call',
  'copy',
  'create',
  'discard',
  'do',
  'drop',
  'grant',
  'reset',
  'revoke',
  'security',
  'set',
  'set_config',
]);

const allowedFirstTokens = new Set(['delete', 'insert', 'select', 'update', 'with']);

function sqlTokens(text: string): Readonly<{ tokens: readonly string[]; statementBreaks: number }> {
  const tokens: string[] = [];
  let token = '';
  let statementBreaks = 0;
  let index = 0;
  let state: 'normal' | 'single' | 'double' | 'line-comment' | 'block-comment' | 'dollar' =
    'normal';
  let dollarTag = '';

  const flush = (): void => {
    if (token) tokens.push(token.toLowerCase());
    token = '';
  };

  while (index < text.length) {
    const char = text[index] ?? '';
    const next = text[index + 1] ?? '';

    if (state === 'line-comment') {
      if (char === '\n') state = 'normal';
      index += 1;
      continue;
    }

    if (state === 'block-comment') {
      if (char === '*' && next === '/') {
        state = 'normal';
        index += 2;
      } else {
        index += 1;
      }
      continue;
    }

    if (state === 'single') {
      if (char === "'" && next === "'") {
        index += 2;
        continue;
      }
      if (char === "'") state = 'normal';
      index += 1;
      continue;
    }

    if (state === 'double') {
      if (char === '"' && next === '"') {
        token += '"';
        index += 2;
        continue;
      }
      if (char === '"') {
        flush();
        state = 'normal';
      } else if (/[A-Za-z0-9_$]/u.test(char)) {
        token += char;
      } else {
        flush();
      }
      index += 1;
      continue;
    }

    if (state === 'dollar') {
      if (text.startsWith(dollarTag, index)) {
        state = 'normal';
        index += dollarTag.length;
      } else {
        index += 1;
      }
      continue;
    }

    if (char === '-' && next === '-') {
      flush();
      state = 'line-comment';
      index += 2;
      continue;
    }
    if (char === '/' && next === '*') {
      flush();
      state = 'block-comment';
      index += 2;
      continue;
    }
    if (char === "'") {
      flush();
      state = 'single';
      index += 1;
      continue;
    }
    if (char === '"') {
      flush();
      state = 'double';
      index += 1;
      continue;
    }
    if (char === '$') {
      const rest = text.slice(index);
      const match = rest.match(/^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/u);
      if (match !== null) {
        flush();
        dollarTag = match[0];
        state = 'dollar';
        index += dollarTag.length;
        continue;
      }
    }
    if (char === ';') {
      flush();
      if (text.slice(index + 1).trim()) statementBreaks += 1;
      index += 1;
      continue;
    }
    if (/[A-Za-z_]/u.test(char) || (token && /[0-9$]/u.test(char))) {
      token += char;
    } else {
      flush();
    }
    index += 1;
  }

  flush();
  if (state !== 'normal' && state !== 'line-comment') {
    throw new Error('SQL statement contains an unterminated quoted/comment construct');
  }
  return { tokens, statementBreaks };
}

export function assertPersistenceSqlIsBounded(text: string): void {
  const scanned = sqlTokens(text);
  const first = scanned.tokens[0];
  if (first === undefined || !allowedFirstTokens.has(first)) {
    throw new Error('persistence SQL must begin with SELECT, INSERT, UPDATE, DELETE or WITH');
  }
  if (scanned.statementBreaks > 0) {
    throw new Error('persistence SQL must contain exactly one statement');
  }
  const forbidden = scanned.tokens.find((candidate) => forbiddenSqlTokens.has(candidate));
  if (forbidden !== undefined) {
    throw new Error(`persistence SQL contains forbidden runtime token: ${forbidden}`);
  }
}

export function createTransactionSqlExecutor(transaction: PrivateTransaction): InternalSqlExecutor {
  let active = true;

  const ensureActive = (): void => {
    if (!active) throw new Error('transaction-bound SQL executor is no longer active');
  };

  const executeRows = async <Row>(statement: InternalSqlStatement): Promise<readonly Row[]> => {
    ensureActive();
    assertPersistenceSqlIsBounded(statement.text);
    const result = await transaction.query<QueryResultRow>(statement.text, statement.values);
    return result.rows as readonly Row[];
  };

  const executor: InternalSqlExecutor & { deactivate(): void } = {
    all: executeRows,
    oneOrNone: async <Row>(statement: InternalSqlStatement) => {
      const rows = await executeRows<Row>(statement);
      if (rows.length > 1) throw new Error('expected at most one row');
      return rows[0];
    },
    execute: async (statement) => {
      ensureActive();
      assertPersistenceSqlIsBounded(statement.text);
      const result = await transaction.query(statement.text, statement.values);
      return { rowCount: result.rowCount ?? 0 };
    },
    deactivate: () => {
      active = false;
    },
  };

  return executor;
}

export function deactivateTransactionSqlExecutor(executor: InternalSqlExecutor): void {
  const candidate = executor as InternalSqlExecutor & { deactivate?: () => void };
  candidate.deactivate?.();
}
