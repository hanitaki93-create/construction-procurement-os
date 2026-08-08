import {
  registerPersistenceAdapter,
  type InternalSqlExecutor,
  type InternalSqlStatement,
} from './internal/persistence-registry.js';

const statementBrand: unique symbol = Symbol('cpos.persistence.sql-statement');
const adapterHandleBrand: unique symbol = Symbol('cpos.persistence.adapter-handle');

export type SqlBindable = null | string | number | bigint | boolean | Date | Uint8Array;

export interface SqlStatement {
  readonly text: string;
  readonly values: readonly SqlBindable[];
  readonly [statementBrand]: true;
}

export interface SqlExecutor {
  all<Row extends Record<string, unknown>>(statement: SqlStatement): Promise<readonly Row[]>;
  oneOrNone<Row extends Record<string, unknown>>(statement: SqlStatement): Promise<Row | undefined>;
  execute(statement: SqlStatement): Promise<Readonly<{ rowCount: number }>>;
}

export interface PersistenceAdapterToken<Handle> {
  readonly moduleKey: string;
  readonly databaseRole: string;
  readonly [adapterHandleBrand]?: (handle: Handle) => Handle;
}

function requireModuleKey(value: string): void {
  if (!/^[a-z][a-z0-9_-]{0,62}$/u.test(value)) {
    throw new Error('persistence moduleKey must be a lowercase bounded identifier');
  }
}

function requireDatabaseRole(value: string): void {
  if (!/^[a-z][a-z0-9_]{0,62}$/u.test(value)) {
    throw new Error('persistence databaseRole must be a lowercase PostgreSQL identifier');
  }
}

export function sql(
  strings: TemplateStringsArray,
  ...values: readonly SqlBindable[]
): SqlStatement {
  let text = strings[0] ?? '';
  for (let index = 0; index < values.length; index += 1) {
    text += `$${index + 1}${strings[index + 1] ?? ''}`;
  }

  return Object.freeze({
    text,
    values: Object.freeze([...values]),
    [statementBrand]: true as const,
  });
}

function wrapExecutor(executor: InternalSqlExecutor): SqlExecutor {
  const asInternalStatement = (statement: SqlStatement): InternalSqlStatement => {
    if (statement[statementBrand] !== true) {
      throw new Error('SQL must be constructed by the database-core sql template tag');
    }
    return { text: statement.text, values: statement.values };
  };

  return Object.freeze({
    all: <Row extends Record<string, unknown>>(statement: SqlStatement) =>
      executor.all<Row>(asInternalStatement(statement)),
    oneOrNone: <Row extends Record<string, unknown>>(statement: SqlStatement) =>
      executor.oneOrNone<Row>(asInternalStatement(statement)),
    execute: (statement: SqlStatement) => executor.execute(asInternalStatement(statement)),
  });
}

export function definePersistenceAdapter<Handle>(options: {
  readonly moduleKey: string;
  readonly databaseRole: string;
  readonly buildHandle: (executor: SqlExecutor) => Handle;
}): PersistenceAdapterToken<Handle> {
  requireModuleKey(options.moduleKey);
  requireDatabaseRole(options.databaseRole);

  const token = Object.freeze({
    moduleKey: options.moduleKey,
    databaseRole: options.databaseRole,
  }) as PersistenceAdapterToken<Handle>;

  registerPersistenceAdapter(token, {
    moduleKey: options.moduleKey,
    databaseRole: options.databaseRole,
    buildHandle: (executor) => options.buildHandle(wrapExecutor(executor)),
  });

  return token;
}
