import { describe, expect, it } from 'vitest';

import { compileFoundationManifests } from './compiler.js';
import { createValidCompilerFixture } from './fixtures.js';

describe('foundation manifest compiler', () => {
  it('accepts the complete 92-source and 102-invariant fixture', () => {
    const result = compileFoundationManifests(createValidCompilerFixture());
    expect(result.ok).toBe(true);
    expect(result.counts).toMatchObject({ frozenSources: 92, coverageRows: 92, invariants: 102 });
    expect(result.issues).toEqual([]);
  });

  it('fails when one frozen source row is removed', () => {
    const input = createValidCompilerFixture();
    const result = compileFoundationManifests({ ...input, coverage: input.coverage.filter((row) => row.sourceId !== 'MR-009') });
    expect(result.ok).toBe(false);
    expect(result.issues.some((entry) => entry.code === 'MISSING_SOURCE_COVERAGE')).toBe(true);
  });

  it('fails an invariant without owner, enforcement proof, or hostile test', () => {
    const input = createValidCompilerFixture();
    const invariants = input.invariants.map((entry) =>
      entry.id === 'INV-016' ? { ...entry, ownerBlock: '', hostileTestIds: [] } : entry,
    );
    const result = compileFoundationManifests({ ...input, invariants });
    expect(result.issues.map((entry) => entry.code)).toContain('MISSING_INVARIANT_OWNER');
    expect(result.issues.map((entry) => entry.code)).toContain('MISSING_INVARIANT_TEST');
  });

  it('fails a missing reverse invariant reference', () => {
    const input = createValidCompilerFixture();
    const objects = input.objects.map((entry) =>
      entry.id === 'technical_object_016' ? { ...entry, invariantIds: [] } : entry,
    );
    const result = compileFoundationManifests({ ...input, objects });
    expect(result.issues.some((entry) => entry.code === 'MISSING_OBJECT_REVERSE_REFERENCE')).toBe(true);
  });

  it('fails an effective-dated object without overlap disposition', () => {
    const input = createValidCompilerFixture();
    const objects = input.objects.map((entry) =>
      entry.id === 'technical_object_008'
        ? { ...entry, effectivePeriodDisposition: 'NOT_EFFECTIVE_DATED' as const }
        : entry,
    );
    const result = compileFoundationManifests({ ...input, objects });
    expect(result.issues.some((entry) => entry.code === 'MISSING_EFFECTIVE_PERIOD_DISPOSITION')).toBe(true);
  });

  it('fails unknown references and unreconciled invariant candidates', () => {
    const input = createValidCompilerFixture();
    const objects = input.objects.map((entry, index) =>
      index === 0 ? { ...entry, invariantIds: ['INV-999'] } : entry,
    );
    const result = compileFoundationManifests({
      ...input,
      objects,
      newlyEncounteredInvariantCandidates: ['retention-disposition-race'],
    });
    expect(result.issues.some((entry) => entry.code === 'UNKNOWN_INVARIANT_REFERENCE')).toBe(true);
    expect(result.issues.some((entry) => entry.code === 'UNRECONCILED_INVARIANT_CANDIDATE')).toBe(true);
  });

  it('fails an incomplete release compatibility manifest', () => {
    const input = createValidCompilerFixture();
    const result = compileFoundationManifests({
      ...input,
      releaseManifest: { ...input.releaseManifest, rollbackDeadline: '', conformance: 'PENDING' },
    });
    expect(result.issues.some((entry) => entry.code === 'INCOMPLETE_RELEASE_MANIFEST')).toBe(true);
    expect(result.issues.some((entry) => entry.code === 'RELEASE_MANIFEST_NOT_CONFORMANT')).toBe(true);
  });
});
