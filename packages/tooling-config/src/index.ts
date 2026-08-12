export const workspacePolicy = Object.freeze({
  nodeVersion: '24.18.0',
  packageManager: 'pnpm@10.34.0',
  moduleSystem: 'NodeNext',
  releaseAgeMinutes: 1440,
  strictTypeScript: true,
  exactDependencyVersions: true,
  rawDatabaseClientPublicExportAllowed: false,
  crossPackageRelativeImportsAllowed: false,
  businessModulesAllowedInB01: false,
} as const);

export type WorkspacePolicy = typeof workspacePolicy;
