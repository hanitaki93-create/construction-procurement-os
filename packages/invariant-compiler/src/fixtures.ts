import type {
  CompilerInput,
  ConcurrencyProfile,
  CoverageEntry,
  FrozenSourceEntry,
  InvariantDefinition,
  OwnedObjectDefinition,
  OperationDefinition,
} from './types.js';

const padded = (prefix: string, value: number): string =>
  `${prefix}-${String(value).padStart(3, '0')}`;

export const frozenSourceFixture: readonly FrozenSourceEntry[] = Array.from(
  { length: 92 },
  (_, index) => ({
    sourceId: padded('MR', index + 1),
    sourceArtifact: 'PHASE1_MASTER_V1_0_FROZEN',
  }),
);

const nonStateRows = new Map<string, CoverageEntry['nonStateDisposition']>([
  ['MR-001', 'HYPOTHESIS_ONLY'],
  ['MR-005', 'CONTROL_REQUIREMENT'],
  ['MR-028', 'LEGAL_PARAMETER'],
  ['MR-069', 'ACCESSIBILITY_TARGET'],
]);

export const invariantFixture: readonly InvariantDefinition[] = Array.from(
  { length: 102 },
  (_, index) => {
    const sequence = index + 1;
    const id = padded('INV', sequence);
    const sourceId = padded('MR', Math.min(sequence, 92));
    const objectId = `technical_object_${String(sequence).padStart(3, '0')}`;
    const concurrencySensitive = [8, 16, 23, 33, 34, 42, 51, 77].includes(sequence);
    return {
      id,
      name: `Foundation invariant fixture ${sequence}`,
      invariantClass:
        sequence === 8
          ? 'EFFECTIVE_PERIOD_NON_OVERLAP'
          : concurrencySensitive
            ? 'CONSERVATION'
            : 'STRUCTURAL_BOUNDARY',
      sourceIds: [sourceId],
      participatingObjectIds: [objectId],
      ownerBlock: 'B01',
      concurrencySensitive,
      enforcementKind: concurrencySensitive ? 'GUARD_ROW_LOCK' : 'STRUCTURAL_VALIDATION',
      hostileTestIds: [`HT-${String(sequence).padStart(3, '0')}`],
    };
  },
);

export const coverageFixture: readonly CoverageEntry[] = frozenSourceFixture.map(
  (source, index) => {
    const disposition = nonStateRows.get(source.sourceId);
    return {
      sourceId: source.sourceId,
      ...(disposition === undefined
        ? { invariantIds: [padded('INV', Math.min(index + 1, 102))] }
        : { nonStateDisposition: disposition }),
      owner: disposition === 'HYPOTHESIS_ONLY' ? 'B15' : 'B01',
      proofGate: disposition === 'HYPOTHESIS_ONLY' ? 'V1_VALIDATION' : 'B01_MANIFEST_COMPILER_TEST',
    };
  },
);

export const concurrencyProfileFixture: readonly ConcurrencyProfile[] = invariantFixture
  .filter((invariant) => invariant.concurrencySensitive)
  .map((invariant, index) => ({
    id: `CP-${String(index + 1).padStart(3, '0')}`,
    isolation: invariant.id === 'INV-008' ? 'SERIALIZABLE' : 'READ COMMITTED',
    invariantIds: [invariant.id],
    mechanism: invariant.id === 'INV-008' ? 'SERIALIZABLE_PREDICATE' : 'GUARD_ROW_LOCK',
    ...(invariant.id === 'INV-008'
      ? {}
      : {
          guardIdentity: `guard:${invariant.id}`,
          guardMaterialization: 'INSERT_ON_CONFLICT_THEN_LOCK' as const,
        }),
    globalLockOrder: true,
    constraintNames: invariant.id === 'INV-008' ? ['test_effective_non_overlap'] : [],
    retryMaximum: invariant.id === 'INV-008' ? 3 : 0,
    hostileTestIds: [`CP-HT-${invariant.id}`],
  }));

const profileByInvariant = new Map(
  concurrencyProfileFixture.flatMap((profile) =>
    profile.invariantIds.map((id) => [id, profile.id] as const),
  ),
);

export const objectFixture: readonly OwnedObjectDefinition[] = invariantFixture.map(
  (invariant) => ({
    id: invariant.participatingObjectIds[0] ?? 'missing-object',
    mutable: true,
    derived: false,
    ownerModule: 'foundation-fixture',
    invariantIds: [invariant.id],
    effectiveDated: invariant.id === 'INV-008',
    effectivePeriodDisposition:
      invariant.id === 'INV-008' ? 'OVERLAP_PROHIBITED_CC4' : 'NOT_EFFECTIVE_DATED',
    concurrencyProfileIds:
      profileByInvariant.get(invariant.id) === undefined
        ? []
        : [profileByInvariant.get(invariant.id) as string],
  }),
);

export const operationFixture: readonly OperationDefinition[] = concurrencyProfileFixture.map(
  (profile, index) => ({
    id: `technical.fixture.operation.${String(index + 1).padStart(3, '0')}`,
    stateChanging: true,
    invariantIds: profile.invariantIds,
    concurrencyProfileId: profile.id,
  }),
);

export function createValidCompilerFixture(): CompilerInput {
  return {
    frozenSources: frozenSourceFixture.map((entry) => ({ ...entry })),
    coverage: coverageFixture.map((entry) => ({
      ...entry,
      invariantIds: entry.invariantIds === undefined ? undefined : [...entry.invariantIds],
    })),
    invariants: invariantFixture.map((entry) => ({
      ...entry,
      sourceIds: [...entry.sourceIds],
      participatingObjectIds: [...entry.participatingObjectIds],
      hostileTestIds: [...entry.hostileTestIds],
    })),
    concurrencyProfiles: concurrencyProfileFixture.map((entry) => ({
      ...entry,
      invariantIds: [...entry.invariantIds],
      constraintNames: [...entry.constraintNames],
      hostileTestIds: [...entry.hostileTestIds],
    })),
    objects: objectFixture.map((entry) => ({
      ...entry,
      invariantIds: [...entry.invariantIds],
      concurrencyProfileIds: [...entry.concurrencyProfileIds],
    })),
    operations: operationFixture.map((entry) => ({
      ...entry,
      invariantIds: [...entry.invariantIds],
    })),
    releaseManifest: {
      manifestVersion: 'B01-TECHNICAL-1',
      buildId: 'fixture-build',
      sourceCommit: 'fixture-commit',
      imageDigests: [],
      apiCompatibility: 'B01-TECHNICAL-1',
      browserCompatibility: 'B01-TECHNICAL-1',
      migrationHead: '000001',
      migrationPhase: 'NONE',
      supportedPayloadReaders: [],
      rollbackDeadline: '2026-08-03T00:00:00.000Z',
      conformance: 'PASS',
    },
    newlyEncounteredInvariantCandidates: [],
  };
}
