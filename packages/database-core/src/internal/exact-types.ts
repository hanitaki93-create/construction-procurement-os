import { types as pgTypes } from 'pg';

export const postgresTypeOids = Object.freeze({
  int8: 20,
  numeric: 1700,
} as const);

const identity = (value: string): string => value;
let installed = false;

export function installExactPostgresTypeParsers(): void {
  if (installed) return;
  pgTypes.setTypeParser(postgresTypeOids.int8, identity);
  pgTypes.setTypeParser(postgresTypeOids.numeric, identity);
  installed = true;
}

export function inspectExactPostgresTypeParsers(): Readonly<{
  int8PreservesString: boolean;
  numericPreservesString: boolean;
}> {
  const int8Sample = '9007199254740993123456789';
  const numericSample = '9007199254740993.123456789012345678';
  return {
    int8PreservesString: pgTypes.getTypeParser(postgresTypeOids.int8)(int8Sample) === int8Sample,
    numericPreservesString:
      pgTypes.getTypeParser(postgresTypeOids.numeric)(numericSample) === numericSample,
  };
}

export function assertExactPostgresTypeParsers(): void {
  installExactPostgresTypeParsers();
  const inventory = inspectExactPostgresTypeParsers();
  if (!inventory.int8PreservesString || !inventory.numericPreservesString) {
    throw new Error('PostgreSQL int8/numeric parser contract is lossy');
  }
}
