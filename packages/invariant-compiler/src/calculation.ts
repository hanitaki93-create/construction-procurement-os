import { Decimal } from 'decimal.js';

import type { CalculationPlan } from './types.js';

const roundingModes = {
  HALF_UP: Decimal.ROUND_HALF_UP,
  HALF_EVEN: Decimal.ROUND_HALF_EVEN,
  DOWN: Decimal.ROUND_DOWN,
} as const;

type DeclaredRoundingMode = (typeof roundingModes)[keyof typeof roundingModes];

export function validateCalculationPlan(plan: CalculationPlan): readonly string[] {
  const issues: string[] = [];
  if (!plan.id.trim()) issues.push('plan ID is required');
  if (!Number.isSafeInteger(plan.inputScale) || plan.inputScale < 0 || plan.inputScale > 18) {
    issues.push('inputScale must be an integer from 0 to 18');
  }
  if (!Number.isSafeInteger(plan.outputScale) || plan.outputScale < 0 || plan.outputScale > 18) {
    issues.push('outputScale must be an integer from 0 to 18');
  }
  if (
    !Number.isSafeInteger(plan.overflowDigits) ||
    plan.overflowDigits < 1 ||
    plan.overflowDigits > 38
  ) {
    issues.push('overflowDigits must be an integer from 1 to 38');
  }
  if (plan.operator === 'DIVIDE') {
    if (
      plan.divisionIntermediateScale === undefined ||
      !Number.isSafeInteger(plan.divisionIntermediateScale) ||
      plan.divisionIntermediateScale < plan.outputScale ||
      plan.divisionIntermediateScale > 36
    ) {
      issues.push('divisionIntermediateScale must be declared from outputScale to 36');
    }
  } else if (plan.divisionIntermediateScale !== undefined) {
    issues.push('divisionIntermediateScale is permitted only for DIVIDE');
  }
  return issues;
}

function normalizeDecimal(value: Decimal, scale: number, mode: DeclaredRoundingMode): string {
  return value.toDecimalPlaces(scale, mode).toFixed(scale);
}

export function executeCalculationPlan(plan: CalculationPlan, left: string, right: string): string {
  const issues = validateCalculationPlan(plan);
  if (issues.length > 0) throw new Error(`invalid calculation plan: ${issues.join('; ')}`);

  const leftValue = new Decimal(left);
  const rightValue = new Decimal(right);
  let result: Decimal;

  switch (plan.operator) {
    case 'ADD':
      result = leftValue.plus(rightValue);
      break;
    case 'SUBTRACT':
      result = leftValue.minus(rightValue);
      break;
    case 'MULTIPLY':
      result = leftValue.times(rightValue);
      break;
    case 'DIVIDE': {
      if (rightValue.isZero()) throw new Error('division by zero');
      const intermediateScale = plan.divisionIntermediateScale;
      if (intermediateScale === undefined)
        throw new Error('division intermediate scale is missing');
      result = leftValue
        .dividedBy(rightValue)
        .toDecimalPlaces(intermediateScale, roundingModes[plan.roundingMode]);
      break;
    }
  }

  const normalized = normalizeDecimal(result, plan.outputScale, roundingModes[plan.roundingMode]);
  const digits = normalized.replace(/[-.]/gu, '').replace(/^0+/u, '').length || 1;
  if (digits > plan.overflowDigits)
    throw new Error('calculation result exceeds declared precision');
  return normalized;
}
