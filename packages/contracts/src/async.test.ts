import { describe, expect, it } from 'vitest';

import {
  effectPositionAllowsOrdinaryRetry,
  effectPositionRequiresReconciliation,
  effectPositions,
  isTerminalHomogeneousEffectPosition,
  workerLanes,
} from './async.js';

describe('B03 async semantic contract', () => {
  it('keeps the frozen seven effect positions closed and ordered', () => {
    expect(effectPositions).toEqual([
      'PRE_ACCEPTANCE',
      'ACCEPTED_PRE_EFFECT',
      'EFFECT_INDETERMINATE',
      'EXTERNAL_EFFECT_EMITTED',
      'DOMAIN_EFFECT_ESTABLISHED',
      'TERMINAL_NO_EFFECT',
      'PARTIAL_EFFECT',
    ]);
  });

  it('separates ordinary retry from indeterminate reconciliation', () => {
    expect(effectPositionAllowsOrdinaryRetry('ACCEPTED_PRE_EFFECT')).toBe(true);
    expect(effectPositionAllowsOrdinaryRetry('EFFECT_INDETERMINATE')).toBe(false);
    expect(effectPositionRequiresReconciliation('EFFECT_INDETERMINATE')).toBe(true);
    expect(effectPositionRequiresReconciliation('ACCEPTED_PRE_EFFECT')).toBe(false);
  });

  it('keeps the worker-lane registry product-owned and excludes the disabled AI lane', () => {
    expect(workerLanes).toEqual([
      'interactive-nearline',
      'routine-domain',
      'evidence',
      'connector-email',
      'reconciliation',
      'report-export',
      'search',
    ]);
    expect(workerLanes).not.toContain('AI' as never);
  });

  it('does not treat external emission or partial effect as homogeneous terminal domain truth', () => {
    expect(isTerminalHomogeneousEffectPosition('DOMAIN_EFFECT_ESTABLISHED')).toBe(true);
    expect(isTerminalHomogeneousEffectPosition('TERMINAL_NO_EFFECT')).toBe(true);
    expect(isTerminalHomogeneousEffectPosition('EXTERNAL_EFFECT_EMITTED')).toBe(false);
    expect(isTerminalHomogeneousEffectPosition('PARTIAL_EFFECT')).toBe(false);
  });
});
