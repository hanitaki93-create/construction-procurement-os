import { describe, expect, it } from 'vitest';

import { executeCalculationPlan, validateCalculationPlan } from './calculation.js';
import type { CalculationPlan } from './types.js';

const divisionPlan: CalculationPlan = {
  id: 'technical-division-fixture-v1',
  operator: 'DIVIDE',
  inputScale: 18,
  outputScale: 12,
  divisionIntermediateScale: 24,
  roundingMode: 'HALF_EVEN',
  overflowDigits: 38,
};

describe('exact calculation plan', () => {
  it('rejects division without an intermediate scale', () => {
    const { divisionIntermediateScale: _omitted, ...withoutIntermediateScale } = divisionPlan;
    const issues = validateCalculationPlan(withoutIntermediateScale);
    expect(issues).toContain(
      'divisionIntermediateScale must be declared from outputScale to 36',
    );
  });

  it('preserves exact decimal arithmetic beyond IEEE-754 precision', () => {
    const plan: CalculationPlan = {
      id: divisionPlan.id,
      operator: 'ADD',
      inputScale: divisionPlan.inputScale,
      outputScale: divisionPlan.outputScale,
      roundingMode: divisionPlan.roundingMode,
      overflowDigits: divisionPlan.overflowDigits,
    };
    expect(
      executeCalculationPlan(plan, '9007199254740993.123456789012', '0.000000000001'),
    ).toBe('9007199254740993.123456789013');
  });

  it('uses declared division scale and rounding point', () => {
    expect(executeCalculationPlan(divisionPlan, '1', '3')).toBe('0.333333333333');
  });
});
