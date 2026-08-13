export type CapabilityPosture = 'SPINE' | 'THIN' | 'INTERFACE_ONLY' | 'OUT';

export type CapabilitySurfaceExpectation =
  | 'USER_FACING'
  | 'CONTROL_SURFACE'
  | 'BACKEND_SUBSTRATE'
  | 'EXTERNAL_INTERFACE';

export type CapabilityCompilerMode = 'SPEC_COMPLETENESS' | 'BUILD_AUTHORIZATION';

export interface CapabilityRequirement {
  readonly capabilityId: string;
  readonly name: string;
  readonly posture: CapabilityPosture;
  readonly expectedSurface: CapabilitySurfaceExpectation;
}

export type MasterDataDisposition =
  | Readonly<{ kind: 'REFERENCES'; referenceIds: readonly string[] }>
  | Readonly<{ kind: 'NOT_APPLICABLE'; reason: string }>;

export type NumberingDisposition =
  | Readonly<{ kind: 'REQUIRED'; policyId: string }>
  | Readonly<{ kind: 'NOT_APPLICABLE'; reason: string }>;

export type DocumentOutputDisposition =
  | Readonly<{ kind: 'REQUIRED'; outputIds: readonly string[] }>
  | Readonly<{ kind: 'NOT_APPLICABLE'; reason: string }>;

export interface CapabilityJourney {
  readonly predecessorCapabilityIds: readonly string[];
  readonly successorCapabilityIds: readonly string[];
  readonly startsJourney: boolean;
  readonly terminatesJourney: boolean;
}

export type DomainMeaningDecision = 'PENDING' | 'MEANING_PASS' | 'MEANING_FAIL';

export interface CapabilitySpecification {
  readonly capabilityId: string;
  readonly userFacingName: string;
  readonly surface: CapabilitySurfaceExpectation;
  readonly userObjectIds: readonly string[];
  readonly fieldSpecificationIds: readonly string[];
  readonly masterData: MasterDataDisposition;
  readonly numbering: NumberingDisposition;
  readonly lifecycleStates: readonly string[];
  readonly documentOutputs: DocumentOutputDisposition;
  readonly journey: CapabilityJourney;
  readonly backendObjectIds: readonly string[];
  readonly acceptanceScenarioIds: readonly string[];
  readonly domainMeaningDecision: DomainMeaningDecision;
}

export interface CapabilityCompilerInput {
  readonly mode: CapabilityCompilerMode;
  readonly requirements: readonly CapabilityRequirement[];
  readonly specifications: readonly CapabilitySpecification[];
}

export interface CapabilityCompilationIssue {
  readonly code: string;
  readonly path: string;
  readonly message: string;
}

export interface CapabilityCompilationResult {
  readonly ok: boolean;
  readonly issues: readonly CapabilityCompilationIssue[];
  readonly counts: Readonly<{
    requirements: number;
    retainedRequirements: number;
    specifications: number;
    meaningPass: number;
  }>;
}
