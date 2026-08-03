import { readFile } from 'node:fs/promises';
import path from 'node:path';

import ts from 'typescript';

const APPROVED_EXPORTS = new Map([
  ['AppliedMigration', 'type-reexport'],
  ['CatalogFinding', 'type-reexport'],
  ['CatalogFindingKind', 'type-reexport'],
  ['DatabaseHealth', 'type-alias'],
  ['DatabaseRuntime', 'interface'],
  ['DatabaseRuntimeOptions', 'type-alias'],
  ['MigrationFile', 'type-reexport'],
  ['MigrationResult', 'type-reexport'],
  ['MigrationStatus', 'type-reexport'],
  ['createDatabaseRuntime', 'function'],
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

function declarationKind(declaration, publicPath) {
  if (
    ts.isFunctionDeclaration(declaration) &&
    declaration.getSourceFile().fileName === publicPath
  ) {
    return 'function';
  }
  if (
    ts.isInterfaceDeclaration(declaration) &&
    declaration.getSourceFile().fileName === publicPath
  ) {
    return 'interface';
  }
  if (
    ts.isTypeAliasDeclaration(declaration) &&
    declaration.getSourceFile().fileName === publicPath
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

function inspectTypeGraph(checker, rootType, exportName) {
  const errors = [];
  const visited = new Set();

  function visit(type, trail, depth) {
    if (depth > 30 || visited.has(type.id)) return;
    visited.add(type.id);

    for (const symbol of [type.aliasSymbol, type.getSymbol?.()].filter(Boolean)) {
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

function createProgramWithPublicOverride(parsedConfig, publicPath, publicSourceOverride) {
  const host = ts.createCompilerHost(parsedConfig.options, true);
  if (publicSourceOverride === undefined) {
    return ts.createProgram(parsedConfig.fileNames, parsedConfig.options, host);
  }

  const originalReadFile = host.readFile.bind(host);
  const originalGetSourceFile = host.getSourceFile.bind(host);
  host.readFile = (fileName) =>
    path.resolve(fileName) === publicPath ? publicSourceOverride : originalReadFile(fileName);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
    if (path.resolve(fileName) === publicPath) {
      return ts.createSourceFile(
        fileName,
        publicSourceOverride,
        languageVersion,
        true,
        ts.ScriptKind.TS,
      );
    }
    return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
  };

  return ts.createProgram(parsedConfig.fileNames, parsedConfig.options, host);
}

export async function inspectDatabasePublicSurface({ repositoryRoot, publicSourceOverride }) {
  const errors = [];
  const packageJson = JSON.parse(
    await readFile(path.join(repositoryRoot, 'packages/database-core/package.json'), 'utf8'),
  );
  const exportsMap = packageJson.exports ?? {};

  if (Object.keys(exportsMap).join(',') !== '.') {
    errors.push('database-core must expose exactly one public package entry point');
  }
  if (exportsMap['.']?.default !== './dist/public.js') {
    errors.push('database-core default export must resolve to dist/public.js');
  }
  if (exportsMap['.']?.types !== './dist/public.d.ts') {
    errors.push('database-core type export must resolve to dist/public.d.ts');
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
  const program = createProgramWithPublicOverride(parsedConfig, publicPath, publicSourceOverride);
  const sourceFile = program.getSourceFile(publicPath);
  if (sourceFile === undefined) {
    errors.push('database-core public source was not included in the TypeScript program');
    return errors;
  }

  const sourceText = publicSourceOverride ?? sourceFile.getFullText();
  if (/(?:readonly\s+)?query\s*\(/u.test(sourceText)) {
    errors.push('database-core public runtime exposes an unrestricted query method');
  }

  const checker = program.getTypeChecker();
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (moduleSymbol === undefined) {
    errors.push('database-core public source has no module symbol');
    return errors;
  }

  const exportedSymbols = checker.getExportsOfModule(moduleSymbol);
  const actualNames = exportedSymbols.map((symbol) => symbol.getName()).sort();
  const approvedNames = [...APPROVED_EXPORTS.keys()].sort();
  if (actualNames.join('\n') !== approvedNames.join('\n')) {
    errors.push(
      `database-core public exports must equal the approved set; expected [${approvedNames.join(', ')}], received [${actualNames.join(', ')}]`,
    );
  }

  for (const exportedSymbol of exportedSymbols) {
    const exportName = exportedSymbol.getName();
    const expectedKind = APPROVED_EXPORTS.get(exportName);
    if (expectedKind === undefined) continue;

    const exportDeclaration = exportedSymbol.declarations?.[0];
    if (exportDeclaration === undefined) {
      errors.push(`approved export ${exportName} has no declaration`);
      continue;
    }
    const actualKind = declarationKind(exportDeclaration, publicPath);
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
    errors.push(...inspectTypeGraph(checker, targetType, exportName));
  }

  return [...new Set(errors)];
}

export const approvedDatabasePublicExports = Object.freeze([...APPROVED_EXPORTS.keys()].sort());
