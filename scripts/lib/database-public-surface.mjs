import { readFile } from 'node:fs/promises';
import path from 'node:path';

import ts from 'typescript';

const APPROVED_EXPORTS = new Map([
  ['AppliedMigration', 'type-reexport'],
  ['CatalogFinding', 'type-reexport'],
  ['CatalogFindingKind', 'type-reexport'],
  ['DatabaseExecutionContext', 'type-reexport'],
  ['DatabaseExecutionTransactionOptions', 'type-reexport'],
  ['DatabaseHealth', 'type-alias'],
  ['DatabaseRuntime', 'interface'],
  ['DatabaseRuntimeOptions', 'type-alias'],
  ['ExecutionIsolation', 'type-reexport'],
  ['MigrationFile', 'type-reexport'],
  ['MigrationResult', 'type-reexport'],
  ['MigrationStatus', 'type-reexport'],
  ['PersistenceAdapterToken', 'type-reexport'],
  ['createDatabaseRuntime', 'function'],
]);

const APPROVED_PERSISTENCE_EXPORTS = new Map([
  ['PersistenceAdapterToken', 'interface'],
  ['SqlBindable', 'type-alias'],
  ['SqlExecutor', 'interface'],
  ['SqlStatement', 'interface'],
  ['definePersistenceAdapter', 'function'],
  ['sql', 'function'],
]);

const FORBIDDEN_TYPE_NAMES = new Set([
  'Client',
  'Kysely',
  'Pool',
  'PoolClient',
  'PrivateTransaction',
  'Transaction',
]);

const FORBIDDEN_DECLARATION_PATHS = [
  /\/node_modules\/(?:@types\/pg|kysely|pg)\//u,
  /\/node_modules\/\.pnpm\/(?:@types\+pg|kysely|pg)@/u,
];

function normalizeFileName(fileName) {
  return fileName.split(path.sep).join('/');
}

function declarationKind(declaration, sourcePath) {
  if (
    ts.isFunctionDeclaration(declaration) &&
    declaration.getSourceFile().fileName === sourcePath
  ) {
    return 'function';
  }
  if (
    ts.isInterfaceDeclaration(declaration) &&
    declaration.getSourceFile().fileName === sourcePath
  ) {
    return 'interface';
  }
  if (
    ts.isTypeAliasDeclaration(declaration) &&
    declaration.getSourceFile().fileName === sourcePath
  ) {
    return 'type-alias';
  }
  if (
    ts.isExportSpecifier(declaration) &&
    (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly)
  ) {
    return 'type-reexport';
  }
  return ts.SyntaxKind[declaration.kind] ?? 'unknown';
}

function declarationIsForbidden(symbol) {
  if (FORBIDDEN_TYPE_NAMES.has(symbol.getName())) return true;
  return (symbol.declarations ?? []).some((declaration) => {
    const fileName = normalizeFileName(declaration.getSourceFile().fileName);
    return FORBIDDEN_DECLARATION_PATHS.some((pattern) => pattern.test(fileName));
  });
}

function symbolIsRepositoryOwned(symbol, repositoryRoot) {
  const normalizedRoot = `${normalizeFileName(path.resolve(repositoryRoot))}/`;
  return (symbol.declarations ?? []).some((declaration) => {
    const fileName = normalizeFileName(path.resolve(declaration.getSourceFile().fileName));
    return fileName.startsWith(normalizedRoot) && !fileName.includes('/node_modules/');
  });
}

function inspectTypeGraph(checker, rootType, exportName, repositoryRoot) {
  const errors = [];
  const visited = new Set();

  function visit(type, trail, depth) {
    if (depth > 30 || visited.has(type.id)) return;
    visited.add(type.id);

    const symbols = [type.aliasSymbol, type.getSymbol?.()].filter(Boolean);
    for (const symbol of symbols) {
      if (declarationIsForbidden(symbol)) {
        errors.push(
          `approved export ${exportName} exposes forbidden type ${symbol.getName()} through ${trail}`,
        );
      }
    }

    if (type.isUnionOrIntersection?.()) {
      for (const member of type.types) visit(member, `${trail} union/intersection`, depth + 1);
    }

    const typeArguments = [...(type.aliasTypeArguments ?? [])];
    if (
      (type.flags & ts.TypeFlags.Object) !== 0 &&
      (type.objectFlags & ts.ObjectFlags.Reference) !== 0
    ) {
      typeArguments.push(...checker.getTypeArguments(type));
    }
    for (const argument of typeArguments) visit(argument, `${trail} type argument`, depth + 1);

    const traversable = symbols.some((symbol) => symbolIsRepositoryOwned(symbol, repositoryRoot));
    if (!traversable) return;

    for (const property of checker.getPropertiesOfType(type)) {
      const declaration = property.valueDeclaration ?? property.declarations?.[0];
      if (declaration === undefined) continue;
      const propertyType = checker.getTypeOfSymbolAtLocation(property, declaration);
      visit(propertyType, `${trail}.${property.getName()}`, depth + 1);
    }

    const signatures = [
      ...checker.getSignaturesOfType(type, ts.SignatureKind.Call),
      ...checker.getSignaturesOfType(type, ts.SignatureKind.Construct),
    ];
    for (const signature of signatures) {
      for (const parameter of signature.getParameters()) {
        const declaration = parameter.valueDeclaration ?? parameter.declarations?.[0];
        if (declaration === undefined) continue;
        visit(
          checker.getTypeOfSymbolAtLocation(parameter, declaration),
          `${trail} parameter ${parameter.getName()}`,
          depth + 1,
        );
      }
      visit(signature.getReturnType(), `${trail} return`, depth + 1);
    }

    for (const indexKind of [ts.IndexKind.String, ts.IndexKind.Number]) {
      const indexType = checker.getIndexTypeOfType(type, indexKind);
      if (indexType !== undefined) visit(indexType, `${trail} index`, depth + 1);
    }

    if (type.getBaseTypes !== undefined) {
      for (const baseType of type.getBaseTypes() ?? []) {
        visit(baseType, `${trail} base`, depth + 1);
      }
    }
  }

  visit(rootType, exportName, 0);
  return [...new Set(errors)];
}

function createProgramWithOverride(parsedConfig, sourcePath, sourceOverride) {
  const host = ts.createCompilerHost(parsedConfig.options, true);
  if (sourceOverride === undefined) {
    return ts.createProgram(parsedConfig.fileNames, parsedConfig.options, host);
  }

  const originalReadFile = host.readFile.bind(host);
  const originalGetSourceFile = host.getSourceFile.bind(host);
  host.readFile = (fileName) =>
    path.resolve(fileName) === sourcePath ? sourceOverride : originalReadFile(fileName);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
    if (path.resolve(fileName) === sourcePath) {
      return ts.createSourceFile(fileName, sourceOverride, languageVersion, true, ts.ScriptKind.TS);
    }
    return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
  };

  return ts.createProgram(parsedConfig.fileNames, parsedConfig.options, host);
}

function inspectApprovedSource({
  parsedConfig,
  sourcePath,
  sourceOverride,
  approvedExports,
  repositoryRoot,
  surfaceName,
  rejectQueryMethod,
}) {
  const errors = [];
  const program = createProgramWithOverride(parsedConfig, sourcePath, sourceOverride);
  const sourceFile = program.getSourceFile(sourcePath);
  if (sourceFile === undefined) {
    return [`${surfaceName} source was not included in the TypeScript program`];
  }

  const sourceText = sourceOverride ?? sourceFile.getFullText();
  if (rejectQueryMethod && /(?:readonly\s+)?query\s*\(/u.test(sourceText)) {
    errors.push(`${surfaceName} exposes an unrestricted query method`);
  }

  const checker = program.getTypeChecker();
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (moduleSymbol === undefined) return [`${surfaceName} source has no module symbol`];

  const exportedSymbols = checker.getExportsOfModule(moduleSymbol);
  const actualNames = exportedSymbols.map((symbol) => symbol.getName()).sort();
  const approvedNames = [...approvedExports.keys()].sort();
  if (actualNames.join('\n') !== approvedNames.join('\n')) {
    errors.push(
      `${surfaceName} exports must equal the approved set; expected [${approvedNames.join(', ')}], received [${actualNames.join(', ')}]`,
    );
  }

  for (const exportedSymbol of exportedSymbols) {
    const exportName = exportedSymbol.getName();
    const expectedKind = approvedExports.get(exportName);
    if (expectedKind === undefined) continue;

    const exportDeclaration = exportedSymbol.declarations?.[0];
    if (exportDeclaration === undefined) {
      errors.push(`approved export ${exportName} has no declaration`);
      continue;
    }
    const actualKind = declarationKind(exportDeclaration, sourcePath);
    if (actualKind !== expectedKind) {
      errors.push(
        `approved export ${exportName} must remain a ${expectedKind}; received ${actualKind}`,
      );
    }

    const targetSymbol =
      exportedSymbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exportedSymbol)
        : exportedSymbol;
    const targetDeclaration = targetSymbol.valueDeclaration ?? targetSymbol.declarations?.[0];
    if (targetDeclaration === undefined) continue;
    const targetType =
      targetSymbol.flags & ts.SymbolFlags.Type
        ? checker.getDeclaredTypeOfSymbol(targetSymbol)
        : checker.getTypeOfSymbolAtLocation(targetSymbol, targetDeclaration);
    errors.push(...inspectTypeGraph(checker, targetType, exportName, repositoryRoot));
  }

  return errors;
}

export async function inspectDatabasePublicSurface({
  repositoryRoot,
  publicSourceOverride,
  persistenceSourceOverride,
}) {
  const errors = [];
  const packageJson = JSON.parse(
    await readFile(path.join(repositoryRoot, 'packages/database-core/package.json'), 'utf8'),
  );
  const exportsMap = packageJson.exports ?? {};
  const exportKeys = Object.keys(exportsMap).sort();
  if (exportKeys.join(',') !== '.,./persistence') {
    errors.push('database-core must expose exactly root and ./persistence package entry points');
  }
  if (exportsMap['.']?.default !== './dist/public.js') {
    errors.push('database-core root default export must resolve to dist/public.js');
  }
  if (exportsMap['.']?.types !== './dist/public.d.ts') {
    errors.push('database-core root type export must resolve to dist/public.d.ts');
  }
  if (exportsMap['./persistence']?.default !== './dist/persistence.js') {
    errors.push('database-core persistence default export must resolve to dist/persistence.js');
  }
  if (exportsMap['./persistence']?.types !== './dist/persistence.d.ts') {
    errors.push('database-core persistence type export must resolve to dist/persistence.d.ts');
  }

  const configPath = path.join(repositoryRoot, 'packages/database-core/tsconfig.json');
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error !== undefined) {
    errors.push(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
    return errors;
  }
  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath),
  );

  const publicPath = path.resolve(repositoryRoot, 'packages/database-core/src/public.ts');
  errors.push(
    ...inspectApprovedSource({
      parsedConfig,
      sourcePath: publicPath,
      sourceOverride: publicSourceOverride,
      approvedExports: APPROVED_EXPORTS,
      repositoryRoot,
      surfaceName: 'database-core root public surface',
      rejectQueryMethod: true,
    }),
  );

  const persistencePath = path.resolve(repositoryRoot, 'packages/database-core/src/persistence.ts');
  errors.push(
    ...inspectApprovedSource({
      parsedConfig,
      sourcePath: persistencePath,
      sourceOverride: persistenceSourceOverride,
      approvedExports: APPROVED_PERSISTENCE_EXPORTS,
      repositoryRoot,
      surfaceName: 'database-core restricted persistence surface',
      rejectQueryMethod: true,
    }),
  );

  return [...new Set(errors)];
}

export const approvedDatabasePublicExports = Object.freeze([...APPROVED_EXPORTS.keys()].sort());
export const approvedDatabasePersistenceExports = Object.freeze(
  [...APPROVED_PERSISTENCE_EXPORTS.keys()].sort(),
);
