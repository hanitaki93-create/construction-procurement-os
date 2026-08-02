export type IsolationLevel = 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';

export type InvariantClass =
  | 'STRUCTURAL_BOUNDARY'
  | 'AUTHORITY_EXCLUSIVITY'
  | 'EFFECTIVE_PERIOD_NON_OVERLAP'
  | 'UNIQUENESS'
  | 'CONSERVATION'
  | 'IMMUTABILITY'
  | 'STATE_TRANSITION'
  | 'NON_SUBSTITUTION'
  | 'VERSION_BINDING'
  | 'ISOLATION'
  | 'POPULATION_COMPLETENESS'
  | 'MONOTONICITY'
  | 'ORDERED_GATE'
  | 'DURABILITY'
  | 'RESOURCE_BOUND'
  | 'CALCULATION_EXACTNESS'
  | 'NO_OPTIONAL_DEPENDENCY';

export type EnforcementKind =
  | 'STRUCTURAL_VALIDATION'
  | 'EXPECTED_VERSION'
  | 'GUARD_ROW_LOCK'
  | 'UNIQUE_OR_EXCLUSION_CONSTRAINT'
  | 'SERIALIZABLE_PREDICATE'
  | 'ADVISORY_TECHNICAL';

export interface FrozenSourceEntry {
  readonly sourceId: string;
  readonly sourceArtifact: string;
}

export type NonStateDisposition =
  | 'HYPOTHESIS_ONLY'
  | 'LEGAL_PARAMETER'
  | 'ACCESSIBILITY_TARGET'
  | 'CONTROL_REQUIREMENT'
  | 'NON_STATE_REQUIREMENT';

export interface CoverageEntry {
  readonly sourceId: string;
  readonly invariantIds?: readonly string[];
  readonly nonStateDisposition?: NonStateDisposition;
  readonly owner: string;
  readonly proofGate: string;
}

export interface InvariantDefinition {
  readonly id: string;
  readonly name: string;
  readonly invariantClass: InvariantClass;
  readonly sourceIds: readonly string[];
  readonly participatingObjectIds: readonly string[];
  readonly ownerBlock: string;
  readonly concurrencySensitive: boolean;
  readonly enforcementKind: EnforcementKind;
  readonly hostileTestIds: readonly string[];
}

export interface ConcurrencyProfile {
  readonly id: string;
  readonly isolation: IsolationLevel;
  readonly invariantIds: readonly string[];
  readonly mechanism: EnforcementKind;
  readonly guardIdentity?: string;
  readonly guardMaterialization?: 'EAGER_WITH_PARENT' | 'INSERT_ON_CONFLICT_THEN_LOCK';
  readonly globalLockOrder: boolean;
  readonly constraintNames: readonly string[];
  readonly retryMaximum: number;
  readonly hostileTestIds: readonly string[];
}

export type EffectivePeriodDisposition =
  | 'NOT_EFFECTIVE_DATED'
  | 'OVERLAP_PROHIBITED_CC3'
  | 'OVERLAP_PROHIBITED_CC4'
  | 'OVERLAP_PERMITTED_EXPLICIT';

export interface OwnedObjectDefinition {
  readonly id: string;
  readonly mutable: boolean;
  readonly derived: boolean;
  readonly ownerModule: string;
  readonly invariantIds: readonly string[];
  readonly effectiveDated: boolean;
  readonly effectivePeriodDisposition: EffectivePeriodDisposition;
  readonly concurrencyProfileIds: readonly string[];
}

export interface OperationDefinition {
  readonly id: string;
  readonly stateChanging: boolean;
  readonly invariantIds: readonly string[];
  readonly concurrencyProfileId?: string;
}

export interface ReleaseCompatibilityManifest {
  readonly manifestVersion: string;
  readonly buildId: string;
  readonly sourceCommit: string;
  readonly imageDigests: readonly string[];
  readonly apiCompatibility: string;
  readonly browserCompatibility: string;
  readonly migrationHead: string;
  readonly migrationPhase: 'EXPAND' | 'MIGRATE' | 'VERIFY' | 'CONTRACT' | 'NONE';
  readonly supportedPayloadReaders: readonly string[];
  readonly rollbackDeadline: string;
  readonly conformance: 'PASS' | 'FAIL' | 'PENDING';
}

export interface CompilerInput {
  readonly frozenSources: readonly FrozenSourceEntry[];
  readonly coverage: readonly CoverageEntry[];
  readonly invariants: readonly InvariantDefinition[];
  readonly concurrencyProfiles: readonly ConcurrencyProfile[];
  readonly objects: readonly OwnedObjectDefinition[];
  readonly operations: readonly OperationDefinition[];
  readonly releaseManifest: ReleaseCompatibilityManifest;
  readonly newlyEncounteredInvariantCandidates: readonly string[];
}

export interface CompilationIssue {
  readonly code: string;
  readonly path: string;
  readonly message: string;
}

export interface CompilationResult {
  readonly ok: boolean;
  readonly issues: readonly CompilationIssue[];
  readonly counts: Readonly<{
    frozenSources: number;
    coverageRows: number;
    invariants: number;
    objects: number;
    operations: number;
  }>;
}

export interface CalculationPlan {
  readonly id: string;
  readonly operator: 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE';
  readonly inputScale: number;
  readonly outputScale: number;
  readonly divisionIntermediateScale?: number;
  readonly roundingMode: 'HALF_UP' | 'HALF_EVEN' | 'DOWN';
  readonly overflowDigits: number;
}
