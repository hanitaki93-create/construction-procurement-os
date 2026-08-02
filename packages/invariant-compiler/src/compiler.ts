import type {
  CompilationIssue,
  CompilationResult,
  CompilerInput,
  CoverageEntry,
  InvariantDefinition,
  ReleaseCompatibilityManifest,
} from './types.js';

function issue(code: string, path: string, message: string): CompilationIssue {
  return { code, path, message };
}

function duplicates(values: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const duplicateValues = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicateValues.add(value);
    seen.add(value);
  }
  return [...duplicateValues].sort();
}

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function validateCoverage(
  input: CompilerInput,
  invariantIds: ReadonlySet<string>,
): readonly CompilationIssue[] {
  const issues: CompilationIssue[] = [];
  const sourceIds = input.frozenSources.map((entry) => entry.sourceId);
  const coverageIds = input.coverage.map((entry) => entry.sourceId);
  const sourceSet = new Set(sourceIds);
  const coverageBySource = new Map(input.coverage.map((entry) => [entry.sourceId, entry]));

  for (const duplicate of duplicates(sourceIds)) {
    issues.push(issue('DUPLICATE_FROZEN_SOURCE', `frozenSources.${duplicate}`, 'source ID is duplicated'));
  }
  for (const duplicate of duplicates(coverageIds)) {
    issues.push(issue('DUPLICATE_COVERAGE_SOURCE', `coverage.${duplicate}`, 'coverage row is duplicated'));
  }

  for (const sourceId of sourceSet) {
    const coverage = coverageBySource.get(sourceId);
    if (!coverage) {
      issues.push(issue('MISSING_SOURCE_COVERAGE', `coverage.${sourceId}`, 'frozen source has no disposition'));
      continue;
    }
    const invariantCount = coverage.invariantIds?.length ?? 0;
    const dispositionCount = coverage.nonStateDisposition === undefined ? 0 : 1;
    if (invariantCount === 0 && dispositionCount === 0) {
      issues.push(issue('EMPTY_SOURCE_COVERAGE', `coverage.${sourceId}`, 'coverage is empty or implied'));
    }
    if (invariantCount > 0 && dispositionCount > 0) {
      issues.push(issue('AMBIGUOUS_SOURCE_COVERAGE', `coverage.${sourceId}`, 'use invariant mapping or non-state disposition, not both'));
    }
    if (!hasText(coverage.owner) || !hasText(coverage.proofGate)) {
      issues.push(issue('INCOMPLETE_SOURCE_DISPOSITION', `coverage.${sourceId}`, 'owner and proof gate are required'));
    }
    for (const invariantId of coverage.invariantIds ?? []) {
      if (!invariantIds.has(invariantId)) {
        issues.push(issue('UNKNOWN_INVARIANT_REFERENCE', `coverage.${sourceId}`, `unknown invariant ${invariantId}`));
      }
    }
  }

  for (const coverage of input.coverage) {
    if (!sourceSet.has(coverage.sourceId)) {
      issues.push(issue('UNKNOWN_FROZEN_SOURCE', `coverage.${coverage.sourceId}`, 'coverage references an unknown source'));
    }
  }

  return issues;
}

function validateInvariant(
  invariant: InvariantDefinition,
  sourceIds: ReadonlySet<string>,
): readonly CompilationIssue[] {
  const issues: CompilationIssue[] = [];
  const path = `invariants.${invariant.id}`;
  if (!/^INV-\d{3}$/u.test(invariant.id)) issues.push(issue('INVALID_INVARIANT_ID', path, 'invariant ID must match INV-000'));
  if (!hasText(invariant.name)) issues.push(issue('MISSING_INVARIANT_NAME', path, 'name is required'));
  if (!/^B\d{2}$/u.test(invariant.ownerBlock)) issues.push(issue('MISSING_INVARIANT_OWNER', path, 'owner block is required'));
  if (invariant.sourceIds.length === 0) issues.push(issue('MISSING_INVARIANT_SOURCE', path, 'at least one frozen source is required'));
  if (invariant.participatingObjectIds.length === 0) issues.push(issue('MISSING_INVARIANT_OBJECT', path, 'at least one participating object is required'));
  if (invariant.hostileTestIds.length === 0) issues.push(issue('MISSING_INVARIANT_TEST', path, 'at least one hostile test is required'));
  for (const sourceId of invariant.sourceIds) {
    if (!sourceIds.has(sourceId)) issues.push(issue('UNKNOWN_INVARIANT_SOURCE', path, `unknown source ${sourceId}`));
  }
  return issues;
}

function validateReleaseManifest(
  manifest: ReleaseCompatibilityManifest,
): readonly CompilationIssue[] {
  const issues: CompilationIssue[] = [];
  const required: ReadonlyArray<readonly [string, string]> = [
    ['manifestVersion', manifest.manifestVersion],
    ['buildId', manifest.buildId],
    ['sourceCommit', manifest.sourceCommit],
    ['apiCompatibility', manifest.apiCompatibility],
    ['browserCompatibility', manifest.browserCompatibility],
    ['migrationHead', manifest.migrationHead],
    ['rollbackDeadline', manifest.rollbackDeadline],
  ];
  for (const [key, value] of required) {
    if (!hasText(value)) issues.push(issue('INCOMPLETE_RELEASE_MANIFEST', `releaseManifest.${key}`, `${key} is required`));
  }
  if (manifest.conformance !== 'PASS') {
    issues.push(issue('RELEASE_MANIFEST_NOT_CONFORMANT', 'releaseManifest.conformance', 'conformance must be PASS for activation'));
  }
  if (!Number.isFinite(Date.parse(manifest.rollbackDeadline))) {
    issues.push(issue('INVALID_ROLLBACK_DEADLINE', 'releaseManifest.rollbackDeadline', 'deadline must be an ISO timestamp'));
  }
  return issues;
}

export function compileFoundationManifests(input: CompilerInput): CompilationResult {
  const issues: CompilationIssue[] = [];
  const invariantIds = new Set(input.invariants.map((entry) => entry.id));
  const sourceIds = new Set(input.frozenSources.map((entry) => entry.sourceId));
  const profileById = new Map(input.concurrencyProfiles.map((entry) => [entry.id, entry]));
  const objectById = new Map(input.objects.map((entry) => [entry.id, entry]));

  for (const duplicate of duplicates(input.invariants.map((entry) => entry.id))) {
    issues.push(issue('DUPLICATE_INVARIANT', `invariants.${duplicate}`, 'invariant ID is duplicated'));
  }
  for (const duplicate of duplicates(input.objects.map((entry) => entry.id))) {
    issues.push(issue('DUPLICATE_OBJECT', `objects.${duplicate}`, 'object ID is duplicated'));
  }
  for (const duplicate of duplicates(input.operations.map((entry) => entry.id))) {
    issues.push(issue('DUPLICATE_OPERATION', `operations.${duplicate}`, 'operation ID is duplicated'));
  }
  for (const duplicate of duplicates(input.concurrencyProfiles.map((entry) => entry.id))) {
    issues.push(issue('DUPLICATE_CONCURRENCY_PROFILE', `concurrencyProfiles.${duplicate}`, 'profile ID is duplicated'));
  }

  issues.push(...validateCoverage(input, invariantIds));
  for (const invariant of input.invariants) issues.push(...validateInvariant(invariant, sourceIds));

  for (const invariant of input.invariants) {
    const path = `invariants.${invariant.id}`;
    for (const objectId of invariant.participatingObjectIds) {
      const object = objectById.get(objectId);
      if (!object) {
        issues.push(issue('UNKNOWN_PARTICIPATING_OBJECT', path, `unknown object ${objectId}`));
      } else if (!object.invariantIds.includes(invariant.id)) {
        issues.push(issue('MISSING_OBJECT_REVERSE_REFERENCE', `objects.${objectId}`, `missing ${invariant.id}`));
      }
    }
    if (invariant.concurrencySensitive) {
      const profiles = input.concurrencyProfiles.filter((profile) => profile.invariantIds.includes(invariant.id));
      if (profiles.length === 0) issues.push(issue('MISSING_CONCURRENCY_PROFILE', path, 'concurrency-sensitive invariant has no profile'));
    }
  }

  for (const object of input.objects) {
    const path = `objects.${object.id}`;
    if (object.mutable && !hasText(object.ownerModule)) {
      issues.push(issue('MISSING_OBJECT_OWNER', path, 'mutable object needs exactly one owner'));
    }
    if (object.effectiveDated && object.effectivePeriodDisposition === 'NOT_EFFECTIVE_DATED') {
      issues.push(issue('MISSING_EFFECTIVE_PERIOD_DISPOSITION', path, 'effective-dated object requires explicit overlap disposition'));
    }
    if (!object.effectiveDated && object.effectivePeriodDisposition !== 'NOT_EFFECTIVE_DATED') {
      issues.push(issue('INVALID_EFFECTIVE_PERIOD_DISPOSITION', path, 'non-effective object cannot declare overlap behavior'));
    }
    for (const invariantId of object.invariantIds) {
      if (!invariantIds.has(invariantId)) issues.push(issue('UNKNOWN_INVARIANT_REFERENCE', path, `unknown invariant ${invariantId}`));
    }
    for (const profileId of object.concurrencyProfileIds) {
      if (!profileById.has(profileId)) issues.push(issue('UNKNOWN_CONCURRENCY_PROFILE', path, `unknown profile ${profileId}`));
    }
  }

  for (const operation of input.operations) {
    const path = `operations.${operation.id}`;
    for (const invariantId of operation.invariantIds) {
      if (!invariantIds.has(invariantId)) issues.push(issue('UNKNOWN_INVARIANT_REFERENCE', path, `unknown invariant ${invariantId}`));
    }
    if (operation.stateChanging && operation.concurrencyProfileId === undefined) {
      issues.push(issue('MISSING_OPERATION_CONCURRENCY_PROFILE', path, 'state-changing operation needs a concurrency profile'));
    }
    if (operation.concurrencyProfileId !== undefined) {
      const profile = profileById.get(operation.concurrencyProfileId);
      if (!profile) issues.push(issue('UNKNOWN_CONCURRENCY_PROFILE', path, `unknown profile ${operation.concurrencyProfileId}`));
      else {
        for (const invariantId of operation.invariantIds) {
          if (!profile.invariantIds.includes(invariantId)) {
            issues.push(issue('PROFILE_INVARIANT_MISMATCH', path, `${operation.concurrencyProfileId} omits ${invariantId}`));
          }
        }
      }
    }
  }

  for (const profile of input.concurrencyProfiles) {
    const path = `concurrencyProfiles.${profile.id}`;
    if (profile.retryMaximum < 0 || profile.retryMaximum > 3) {
      issues.push(issue('INVALID_RETRY_MAXIMUM', path, 'retry maximum must be from 0 to 3'));
    }
    if (profile.mechanism === 'GUARD_ROW_LOCK' && (profile.guardIdentity === undefined || profile.guardMaterialization === undefined)) {
      issues.push(issue('INCOMPLETE_GUARD_PROFILE', path, 'guard identity and materialization are required'));
    }
    if (profile.hostileTestIds.length === 0) issues.push(issue('MISSING_PROFILE_TEST', path, 'profile needs a hostile test'));
    for (const invariantId of profile.invariantIds) {
      if (!invariantIds.has(invariantId)) issues.push(issue('UNKNOWN_INVARIANT_REFERENCE', path, `unknown invariant ${invariantId}`));
    }
  }

  if (input.newlyEncounteredInvariantCandidates.length > 0) {
    issues.push(issue('UNRECONCILED_INVARIANT_CANDIDATE', 'newlyEncounteredInvariantCandidates', input.newlyEncounteredInvariantCandidates.join(', ')));
  }

  issues.push(...validateReleaseManifest(input.releaseManifest));

  return {
    ok: issues.length === 0,
    issues,
    counts: {
      frozenSources: input.frozenSources.length,
      coverageRows: input.coverage.length,
      invariants: input.invariants.length,
      objects: input.objects.length,
      operations: input.operations.length,
    },
  };
}

export function cloneCoverage(rows: readonly CoverageEntry[]): CoverageEntry[] {
  return rows.map((entry) => {
    if (entry.invariantIds !== undefined) {
      return {
        sourceId: entry.sourceId,
        invariantIds: [...entry.invariantIds],
        owner: entry.owner,
        proofGate: entry.proofGate,
      };
    }
    if (entry.nonStateDisposition !== undefined) {
      return {
        sourceId: entry.sourceId,
        nonStateDisposition: entry.nonStateDisposition,
        owner: entry.owner,
        proofGate: entry.proofGate,
      };
    }
    return {
      sourceId: entry.sourceId,
      owner: entry.owner,
      proofGate: entry.proofGate,
    };
  });
}
