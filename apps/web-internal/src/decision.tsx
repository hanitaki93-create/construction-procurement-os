import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState, type FormEvent } from 'react';

import type {
  ActOnProcurementApprovalRequest,
  AddAwardRecommendationBasisRequest,
  AwardRecommendationDetail,
  AwardRecommendationDetailResponse,
  AwardRecommendationRegisterResponse,
  CreateAwardRecommendationRequest,
  CreateAwardRecommendationResponse,
  DecisionCandidateComparison,
  DecisionCandidatesResponse,
  ProcurementApprovalAction,
  RecordAwardDecisionRequest,
  RecommendationOutcome,
  TechnicalConditionState,
} from '@cpos/contracts/procurement-decision';
import type { UpdateAwardRecommendationDraftRequest } from '@cpos/contracts/procurement-decision-draft';
import type { SupportedLocale } from '@cpos/ui-foundation';

import './decision.css';

interface Session {
  readonly tenantId: string;
  readonly principalId: string;
}

interface DraftFormState {
  readonly outcome: RecommendationOutcome;
  readonly technicalConditionState: TechnicalConditionState;
  readonly rationale: string;
  readonly nonLowestReason: string;
  readonly splitOrSoleSourceReason: string;
  readonly competitionExceptionReason: string;
  readonly budgetBasisRefs: string;
  readonly technicalDependencyRefs: string;
  readonly eligibilityBasisRefs: string;
  readonly supplierIntelligenceBasisRefs: string;
  readonly risksDeviations: string;
}

const outcomes: readonly RecommendationOutcome[] = [
  'SINGLE_SUPPLIER',
  'SPLIT_AWARD',
  'SOLE_SOURCE',
  'NO_AWARD',
  'RETENDER',
];
const technicalStates: readonly TechnicalConditionState[] = [
  'CLEAR',
  'CONDITIONAL',
  'UNRESOLVED_BLOCKING',
  'NOT_APPLICABLE',
];

function headers(session: Session): HeadersInit {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

async function json<T>(url: string, session: Session, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { ...headers(session), ...(init?.headers ?? {}) } });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { readonly code?: string; readonly message?: string };
      message = body.message ?? body.code ?? message;
    } catch {
      // Keep HTTP fallback.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

function lines(value: string): readonly string[] {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

function joinLines(values: readonly string[]): string {
  return values.join('\n');
}

function money(value: string | null, currency: string | null): string {
  if (value === null) return '—';
  return `${currency ?? ''} ${value}`.trim();
}

function label(value: string): string {
  return value.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}

function tone(status: string): 'good' | 'warn' | 'muted' {
  if (['APPROVED', 'CONDITIONALLY_APPROVED', 'EFFECTIVE_FOR_HANDOFF'].includes(status)) return 'good';
  if (['REJECTED', 'RETURNED', 'RETURNED_FOR_REVISION', 'UNRESOLVED_BLOCKING'].includes(status)) return 'warn';
  return 'muted';
}

function draftFromRecommendation(recommendation: AwardRecommendationDetail): DraftFormState {
  return {
    outcome: recommendation.outcome,
    technicalConditionState: recommendation.technicalConditionState,
    rationale: recommendation.rationale,
    nonLowestReason: recommendation.nonLowestReason ?? '',
    splitOrSoleSourceReason: recommendation.splitOrSoleSourceReason ?? '',
    competitionExceptionReason: recommendation.competitionExceptionReason ?? '',
    budgetBasisRefs: joinLines(recommendation.budgetBasisRefs),
    technicalDependencyRefs: joinLines(recommendation.technicalDependencyRefs),
    eligibilityBasisRefs: joinLines(recommendation.eligibilityBasisRefs),
    supplierIntelligenceBasisRefs: joinLines(recommendation.supplierIntelligenceBasisRefs),
    risksDeviations: joinLines(recommendation.risksDeviations),
  };
}

function requestFromDraft(draft: DraftFormState): UpdateAwardRecommendationDraftRequest {
  return {
    outcome: draft.outcome,
    technicalConditionState: draft.technicalConditionState,
    rationale: draft.rationale,
    ...(draft.nonLowestReason.trim() ? { nonLowestReason: draft.nonLowestReason.trim() } : {}),
    ...(draft.splitOrSoleSourceReason.trim() ? { splitOrSoleSourceReason: draft.splitOrSoleSourceReason.trim() } : {}),
    ...(draft.competitionExceptionReason.trim() ? { competitionExceptionReason: draft.competitionExceptionReason.trim() } : {}),
    budgetBasisRefs: lines(draft.budgetBasisRefs),
    technicalDependencyRefs: lines(draft.technicalDependencyRefs),
    eligibilityBasisRefs: lines(draft.eligibilityBasisRefs),
    supplierIntelligenceBasisRefs: lines(draft.supplierIntelligenceBasisRefs),
    risksDeviations: lines(draft.risksDeviations),
  };
}

function CreateRecommendation({
  session,
  candidates,
  revisionOf,
  onCreated,
  onCancel,
}: {
  readonly session: Session;
  readonly candidates: readonly DecisionCandidateComparison[];
  readonly revisionOf?: AwardRecommendationDetail;
  readonly onCreated: (recommendationId: string) => void;
  readonly onCancel: () => void;
}) {
  const client = useQueryClient();
  const initialSnapshot = revisionOf?.comparisonSnapshotId ?? candidates[0]?.comparisonSnapshotId ?? '';
  const [comparisonSnapshotId, setComparisonSnapshotId] = useState(initialSnapshot);
  const [outcome, setOutcome] = useState<RecommendationOutcome>(revisionOf?.outcome ?? 'SINGLE_SUPPLIER');
  const [technicalConditionState, setTechnicalConditionState] = useState<TechnicalConditionState>(revisionOf?.technicalConditionState ?? 'CLEAR');
  const [rationale, setRationale] = useState(revisionOf?.rationale ?? 'Recommended award based on the frozen commercial comparison and confirmed supplier basis.');
  const [nonLowestReason, setNonLowestReason] = useState(revisionOf?.nonLowestReason ?? '');
  const [splitOrSoleSourceReason, setSplitOrSoleSourceReason] = useState(revisionOf?.splitOrSoleSourceReason ?? '');
  const [competitionExceptionReason, setCompetitionExceptionReason] = useState(revisionOf?.competitionExceptionReason ?? '');

  const create = useMutation({
    mutationFn: () => {
      const request: CreateAwardRecommendationRequest = {
        comparisonSnapshotId,
        outcome,
        technicalConditionState,
        rationale,
        ...(nonLowestReason.trim() ? { nonLowestReason: nonLowestReason.trim() } : {}),
        ...(splitOrSoleSourceReason.trim() ? { splitOrSoleSourceReason: splitOrSoleSourceReason.trim() } : {}),
        ...(competitionExceptionReason.trim() ? { competitionExceptionReason: competitionExceptionReason.trim() } : {}),
        ...(revisionOf ? {
          budgetBasisRefs: revisionOf.budgetBasisRefs,
          technicalDependencyRefs: revisionOf.technicalDependencyRefs,
          eligibilityBasisRefs: revisionOf.eligibilityBasisRefs,
          supplierIntelligenceBasisRefs: revisionOf.supplierIntelligenceBasisRefs,
          risksDeviations: revisionOf.risksDeviations,
          supersedesRecommendationId: revisionOf.recommendationId,
        } : {}),
      };
      return json<CreateAwardRecommendationResponse>('/procurement/recommendations', session, {
        method: 'POST',
        body: JSON.stringify(request),
      });
    },
    onSuccess: async (data) => {
      await client.invalidateQueries({ queryKey: ['decision-register', session] });
      onCreated(data.recommendation.recommendationId);
    },
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    create.mutate();
  }

  return (
    <form className="decision-create panel" onSubmit={submit}>
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">{revisionOf ? 'Governed revision' : 'Commercial recommendation'}</p>
          <h3>{revisionOf ? `Revise ${revisionOf.recommendationNumber ?? 'returned recommendation'}` : 'Create award recommendation'}</h3>
          <p>{revisionOf ? 'Creates a new DRAFT that explicitly supersedes the returned decision version.' : 'Start from an immutable frozen comparison. Supplier-confirmed commercial basis remains the source of truth.'}</p>
        </div>
      </div>
      <div className="decision-form-grid">
        <label><span>Frozen comparison</span><select value={comparisonSnapshotId} disabled={Boolean(revisionOf)} onChange={(event) => setComparisonSnapshotId(event.target.value)} required><option value="">Select comparison</option>{candidates.map((candidate) => <option key={candidate.comparisonSnapshotId} value={candidate.comparisonSnapshotId}>{candidate.comparisonNumber} · {candidate.projectCode} · {candidate.rfqNumber}</option>)}</select></label>
        <label><span>Outcome</span><select value={outcome} onChange={(event) => setOutcome(event.target.value as RecommendationOutcome)}>{outcomes.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></label>
        <label><span>Technical state</span><select value={technicalConditionState} onChange={(event) => setTechnicalConditionState(event.target.value as TechnicalConditionState)}>{technicalStates.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></label>
      </div>
      <label className="decision-field"><span>Recommendation rationale</span><textarea rows={4} value={rationale} onChange={(event) => setRationale(event.target.value)} required /></label>
      <div className="decision-form-grid decision-form-grid--three">
        <label><span>Non-lowest reason</span><textarea rows={3} value={nonLowestReason} onChange={(event) => setNonLowestReason(event.target.value)} placeholder="Required when recommending other than the lowest valid basis" /></label>
        <label><span>Split / sole-source reason</span><textarea rows={3} value={splitOrSoleSourceReason} onChange={(event) => setSplitOrSoleSourceReason(event.target.value)} /></label>
        <label><span>Competition exception</span><textarea rows={3} value={competitionExceptionReason} onChange={(event) => setCompetitionExceptionReason(event.target.value)} placeholder="Required when the governed competition target is not met" /></label>
      </div>
      {create.isError ? <p className="form-error">{create.error.message}</p> : null}
      <div className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancel</button><button className="primary-button" type="submit" disabled={create.isPending || !comparisonSnapshotId}>{create.isPending ? 'Creating…' : revisionOf ? 'Create revised draft' : 'Create recommendation'}</button></div>
    </form>
  );
}

function DraftEditor({ session, recommendation }: { readonly session: Session; readonly recommendation: AwardRecommendationDetail }) {
  const client = useQueryClient();
  const [draft, setDraft] = useState<DraftFormState>(() => draftFromRecommendation(recommendation));

  useEffect(() => setDraft(draftFromRecommendation(recommendation)), [recommendation]);

  const save = useMutation({
    mutationFn: () => json<AwardRecommendationDetailResponse>(`/procurement/recommendations/${recommendation.recommendationId}/draft`, session, {
      method: 'PUT',
      body: JSON.stringify(requestFromDraft(draft)),
    }),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['decision-detail', session, recommendation.recommendationId] }),
        client.invalidateQueries({ queryKey: ['decision-register', session] }),
      ]);
    },
  });

  function set<Key extends keyof DraftFormState>(key: Key, value: DraftFormState[Key]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="decision-section">
      <div className="decision-section-heading"><div><span>01</span><div><strong>Recommendation narrative</strong><small>Editable only while this version is DRAFT.</small></div></div><button className="secondary-button" type="button" onClick={() => save.mutate()} disabled={save.isPending}>{save.isPending ? 'Saving…' : 'Save draft'}</button></div>
      <div className="decision-form-grid">
        <label><span>Outcome</span><select value={draft.outcome} onChange={(event) => set('outcome', event.target.value as RecommendationOutcome)}>{outcomes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Technical state</span><select value={draft.technicalConditionState} onChange={(event) => set('technicalConditionState', event.target.value as TechnicalConditionState)}>{technicalStates.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label className="decision-field"><span>Rationale</span><textarea rows={4} value={draft.rationale} onChange={(event) => set('rationale', event.target.value)} /></label>
      <div className="decision-form-grid decision-form-grid--three">
        <label><span>Non-lowest reason</span><textarea rows={3} value={draft.nonLowestReason} onChange={(event) => set('nonLowestReason', event.target.value)} /></label>
        <label><span>Split / sole-source reason</span><textarea rows={3} value={draft.splitOrSoleSourceReason} onChange={(event) => set('splitOrSoleSourceReason', event.target.value)} /></label>
        <label><span>Competition exception</span><textarea rows={3} value={draft.competitionExceptionReason} onChange={(event) => set('competitionExceptionReason', event.target.value)} /></label>
      </div>
      <details className="decision-evidence-editor">
        <summary>Evidence, dependency and risk references</summary>
        <div className="decision-form-grid decision-form-grid--two">
          <label><span>Budget basis refs · one per line</span><textarea rows={3} value={draft.budgetBasisRefs} onChange={(event) => set('budgetBasisRefs', event.target.value)} /></label>
          <label><span>Technical dependency refs</span><textarea rows={3} value={draft.technicalDependencyRefs} onChange={(event) => set('technicalDependencyRefs', event.target.value)} /></label>
          <label><span>Eligibility basis refs</span><textarea rows={3} value={draft.eligibilityBasisRefs} onChange={(event) => set('eligibilityBasisRefs', event.target.value)} /></label>
          <label><span>Supplier intelligence refs</span><textarea rows={3} value={draft.supplierIntelligenceBasisRefs} onChange={(event) => set('supplierIntelligenceBasisRefs', event.target.value)} /></label>
          <label><span>Risks / deviations</span><textarea rows={3} value={draft.risksDeviations} onChange={(event) => set('risksDeviations', event.target.value)} /></label>
        </div>
      </details>
      {save.isError ? <p className="form-error">{save.error.message}</p> : null}
    </section>
  );
}

function BasisEditor({
  session,
  recommendation,
  candidate,
}: {
  readonly session: Session;
  readonly recommendation: AwardRecommendationDetail;
  readonly candidate: DecisionCandidateComparison | undefined;
}) {
  const client = useQueryClient();
  const [scopePartitionNote, setScopePartitionNote] = useState('');
  const selectedIds = new Set(recommendation.selections.map((item) => item.snapshotConfirmedBasisId));
  const selectedRows = new Set(recommendation.selections.map((item) => item.comparisonRowId));
  const available = (candidate?.bases ?? []).filter((item) => !selectedIds.has(item.snapshotConfirmedBasisId) && !selectedRows.has(item.comparisonRowId));

  async function refresh() {
    await Promise.all([
      client.invalidateQueries({ queryKey: ['decision-detail', session, recommendation.recommendationId] }),
      client.invalidateQueries({ queryKey: ['decision-register', session] }),
    ]);
  }

  const add = useMutation({
    mutationFn: (snapshotConfirmedBasisId: string) => {
      const request: AddAwardRecommendationBasisRequest = {
        snapshotConfirmedBasisId,
        ...(scopePartitionNote.trim() ? { scopePartitionNote: scopePartitionNote.trim() } : {}),
      };
      return json<AwardRecommendationDetailResponse>(`/procurement/recommendations/${recommendation.recommendationId}/bases`, session, { method: 'POST', body: JSON.stringify(request) });
    },
    onSuccess: refresh,
  });

  const remove = useMutation({
    mutationFn: (selectionId: string) => json<AwardRecommendationDetailResponse>(`/procurement/recommendations/${recommendation.recommendationId}/bases/${selectionId}`, session, { method: 'DELETE' }),
    onSuccess: refresh,
  });

  return (
    <section className="decision-section">
      <div className="decision-section-heading"><div><span>02</span><div><strong>Supplier-confirmed award basis</strong><small>Selections are pinned to the frozen comparison snapshot—not buyer-adjusted estimates.</small></div></div><span className="decision-count">{recommendation.selections.length} selected</span></div>
      {recommendation.selections.length === 0 ? <p className="decision-empty">No award basis selected yet.</p> : <div className="decision-basis-list">{recommendation.selections.map((selection) => <article key={selection.recommendationSelectionId}><div><strong>{selection.supplierCode} · {selection.supplierLegalName}</strong><small>{money(selection.confirmedAmount, selection.currency)}{selection.scopePartitionNote ? ` · ${selection.scopePartitionNote}` : ''}</small></div>{recommendation.status === 'DRAFT' ? <button type="button" className="text-button text-button--danger" onClick={() => remove.mutate(selection.recommendationSelectionId)} disabled={remove.isPending}>Remove</button> : null}</article>)}</div>}
      {recommendation.status === 'DRAFT' ? <>
        <label className="decision-field"><span>Optional split / scope note for next selection</span><input value={scopePartitionNote} onChange={(event) => setScopePartitionNote(event.target.value)} placeholder="Example: Ground floor scope" /></label>
        <div className="decision-candidate-bases">
          {available.length === 0 ? <p className="decision-empty">No additional unallocated confirmed row basis is available.</p> : available.map((basis) => <button type="button" key={basis.snapshotConfirmedBasisId} onClick={() => add.mutate(basis.snapshotConfirmedBasisId)} disabled={add.isPending}><span><strong>Row {basis.rowNo} · {basis.requirementDescription}</strong><small>{basis.supplierCode} · {basis.supplierLegalName} · {label(basis.confirmationKind)}</small></span><b>{money(basis.confirmedAmount, basis.currency)}</b></button>)}
        </div>
      </> : null}
      {add.isError ? <p className="form-error">{add.error.message}</p> : null}
      {remove.isError ? <p className="form-error">{remove.error.message}</p> : null}
    </section>
  );
}

function ApprovalPanel({ session, recommendation }: { readonly session: Session; readonly recommendation: AwardRecommendationDetail }) {
  const client = useQueryClient();
  const approval = recommendation.approvalCase;
  const [action, setAction] = useState<ProcurementApprovalAction>('APPROVE');
  const [conditions, setConditions] = useState('');
  const [comments, setComments] = useState('');

  const act = useMutation({
    mutationFn: () => {
      if (!approval) throw new Error('No approval case is available');
      const request: ActOnProcurementApprovalRequest = {
        action,
        ...(conditions.trim() ? { conditions: conditions.trim() } : {}),
        ...(comments.trim() ? { comments: comments.trim() } : {}),
      };
      return json(`/procurement/approvals/${approval.approvalCaseId}/actions`, session, { method: 'POST', body: JSON.stringify(request) });
    },
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['decision-detail', session, recommendation.recommendationId] }),
        client.invalidateQueries({ queryKey: ['decision-register', session] }),
      ]);
    },
  });

  if (!approval) return null;
  return (
    <section className="decision-section">
      <div className="decision-section-heading"><div><span>03</span><div><strong>DOA approval</strong><small>{approval.policyKey} · v{approval.policyVersion} · required role {approval.requiredRoleKey}</small></div></div><span className={`status-pill status-pill--${tone(approval.status)}`}>{approval.status}</span></div>
      <div className="decision-facts"><div><span>Monetary basis</span><strong>{money(approval.monetaryBasis, approval.monetaryCurrency)}</strong></div><div><span>Required evidence</span><strong>{approval.requiredEvidence.length}</strong></div><div><span>Actions recorded</span><strong>{approval.actions.length}</strong></div></div>
      {approval.actions.length > 0 ? <div className="decision-timeline">{approval.actions.map((item) => <div key={item.approvalActionOccurrenceId}><span>{item.sequence}</span><div><strong>{label(item.action)}</strong><small>{item.actionByDisplayName} · {new Date(item.actionAt).toLocaleString()}</small>{item.comments ? <p>{item.comments}</p> : null}{item.conditions ? <p><b>Conditions:</b> {item.conditions}</p> : null}</div></div>)}</div> : null}
      {approval.status === 'PENDING' ? <div className="decision-action-box">
        <div className="decision-form-grid">
          <label><span>Decision</span><select value={action} onChange={(event) => setAction(event.target.value as ProcurementApprovalAction)}><option value="APPROVE">Approve</option><option value="APPROVE_WITH_CONDITIONS">Approve with conditions</option><option value="RETURN_FOR_REVISION">Return for revision</option><option value="REJECT">Reject</option></select></label>
          <label><span>Conditions</span><textarea rows={3} value={conditions} onChange={(event) => setConditions(event.target.value)} disabled={action !== 'APPROVE_WITH_CONDITIONS'} placeholder="Required for conditional approval" /></label>
          <label><span>Comments</span><textarea rows={3} value={comments} onChange={(event) => setComments(event.target.value)} /></label>
        </div>
        {act.isError ? <p className="form-error">{act.error.message}</p> : null}
        <div className="form-actions"><button className="primary-button" type="button" onClick={() => act.mutate()} disabled={act.isPending}>{act.isPending ? 'Recording…' : 'Record approval action'}</button></div>
      </div> : null}
    </section>
  );
}

function AwardPanel({ session, recommendation }: { readonly session: Session; readonly recommendation: AwardRecommendationDetail }) {
  const client = useQueryClient();
  const award = recommendation.awardDecision;
  const [justification, setJustification] = useState('Award decision recorded against approved recommendation and frozen supplier-confirmed basis.');
  const [evidence, setEvidence] = useState<Record<string, string>>({});

  async function refresh() {
    await Promise.all([
      client.invalidateQueries({ queryKey: ['decision-detail', session, recommendation.recommendationId] }),
      client.invalidateQueries({ queryKey: ['decision-register', session] }),
    ]);
  }

  const record = useMutation({
    mutationFn: () => {
      const request: RecordAwardDecisionRequest = justification.trim() ? { decisionJustification: justification.trim() } : {};
      return json(`/procurement/recommendations/${recommendation.recommendationId}/award`, session, { method: 'POST', body: JSON.stringify(request) });
    },
    onSuccess: refresh,
  });

  const satisfy = useMutation({
    mutationFn: (conditionId: string) => {
      if (!award) throw new Error('No award decision is available');
      return json(`/procurement/recommendations/${recommendation.recommendationId}/award/${award.awardDecisionId}/conditions/${conditionId}/satisfy`, session, {
        method: 'POST',
        body: JSON.stringify({ evidenceRefs: lines(evidence[conditionId] ?? '') }),
      });
    },
    onSuccess: refresh,
  });

  const handoff = useMutation({
    mutationFn: () => {
      if (!award) throw new Error('No award decision is available');
      return json(`/procurement/recommendations/${recommendation.recommendationId}/award/${award.awardDecisionId}/effective-for-handoff`, session, { method: 'POST', body: '{}' });
    },
    onSuccess: refresh,
  });

  return (
    <section className="decision-section">
      <div className="decision-section-heading"><div><span>04</span><div><strong>Award decision</strong><small>Award is a governed pre-commitment handoff. It does not create the LPO / PO / subcontract.</small></div></div>{award ? <span className={`status-pill status-pill--${tone(award.status)}`}>{award.status}</span> : null}</div>
      {!award && recommendation.status === 'APPROVED' ? <div className="decision-action-box"><label className="decision-field"><span>Decision justification</span><textarea rows={3} value={justification} onChange={(event) => setJustification(event.target.value)} /></label>{record.isError ? <p className="form-error">{record.error.message}</p> : null}<div className="form-actions"><button className="primary-button" type="button" onClick={() => record.mutate()} disabled={record.isPending}>{record.isPending ? 'Recording…' : 'Record award decision'}</button></div></div> : null}
      {award ? <>
        <div className="decision-award-banner"><div><span>Award number</span><strong>{award.awardNumber}</strong></div><div><span>Type</span><strong>{label(award.awardType)}</strong></div><div><span>Decision by</span><strong>{award.decisionByDisplayName}</strong></div></div>
        {award.conditions.length > 0 ? <div className="decision-conditions">{award.conditions.map((condition) => <article key={condition.awardConditionId}><div><span>{String(condition.conditionNo).padStart(2, '0')}</span><div><strong>{condition.conditionText}</strong><small>{condition.satisfied ? `Satisfied by ${condition.satisfiedByDisplayName ?? '—'}` : 'Open condition'}</small></div></div>{condition.satisfied ? <span className="status-pill status-pill--good">SATISFIED</span> : <div className="decision-condition-action"><textarea rows={2} value={evidence[condition.awardConditionId] ?? ''} onChange={(event) => setEvidence((current) => ({ ...current, [condition.awardConditionId]: event.target.value }))} placeholder="Evidence refs · one per line" /><button className="secondary-button" type="button" onClick={() => satisfy.mutate(condition.awardConditionId)} disabled={satisfy.isPending || lines(evidence[condition.awardConditionId] ?? '').length === 0}>Satisfy</button></div>}</article>)}</div> : null}
        {award.status === 'RECORDED' ? <div className="decision-handoff"><div><strong>Pre-LPO gate</strong><span>{award.conditions.every((condition) => condition.satisfied) ? 'All award conditions are satisfied. Make this decision effective for downstream commitment formation.' : 'Resolve all award conditions before handoff.'}</span></div><button className="primary-button" type="button" onClick={() => handoff.mutate()} disabled={handoff.isPending || !award.conditions.every((condition) => condition.satisfied)}>{handoff.isPending ? 'Updating…' : 'Make effective for handoff'}</button></div> : null}
        {award.status === 'EFFECTIVE_FOR_HANDOFF' ? <div className="decision-ready"><strong>Ready for LPO / PO / subcontract formation</strong><span>The governed decision basis is complete. Commitment formation remains the next workflow and is intentionally separate.</span></div> : null}
        {satisfy.isError ? <p className="form-error">{satisfy.error.message}</p> : null}
        {handoff.isError ? <p className="form-error">{handoff.error.message}</p> : null}
      </> : recommendation.status !== 'APPROVED' ? <p className="decision-empty">Award recording becomes available after approval.</p> : null}
    </section>
  );
}

function RecommendationDetail({
  session,
  recommendation,
  candidate,
  onRevise,
}: {
  readonly session: Session;
  readonly recommendation: AwardRecommendationDetail;
  readonly candidate: DecisionCandidateComparison | undefined;
  readonly onRevise: () => void;
}) {
  const client = useQueryClient();
  const submit = useMutation({
    mutationFn: () => json(`/procurement/recommendations/${recommendation.recommendationId}/submit`, session, { method: 'POST', body: '{}' }),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['decision-detail', session, recommendation.recommendationId] }),
        client.invalidateQueries({ queryKey: ['decision-register', session] }),
      ]);
    },
  });

  return (
    <article className="decision-detail panel">
      <header className="decision-detail-header">
        <div><p className="panel-kicker">{recommendation.projectCode} · {recommendation.rfqNumber} · {recommendation.comparisonNumber}</p><h3>{recommendation.recommendationNumber ?? 'Draft recommendation'}</h3><p>{recommendation.rationale}</p></div>
        <div className="decision-header-status"><span className={`status-pill status-pill--${tone(recommendation.status)}`}>{recommendation.status}</span><strong>{money(recommendation.recommendedValue, recommendation.currency)}</strong><small>{recommendation.selections.length} confirmed basis selection{recommendation.selections.length === 1 ? '' : 's'}</small></div>
      </header>
      <div className="decision-gate-strip">
        <div><span>Competition</span><strong>{recommendation.competitionComparableResponses ?? '—'} / {recommendation.competitionRequirement}</strong><small>comparable / target</small></div>
        <div><span>Outcome</span><strong>{label(recommendation.outcome)}</strong><small>{label(recommendation.technicalConditionState)}</small></div>
        <div><span>Approval</span><strong>{recommendation.approvalCase?.status ?? 'NOT SUBMITTED'}</strong><small>{recommendation.approvalCase?.requiredRoleKey ?? '—'}</small></div>
        <div><span>Award</span><strong>{recommendation.awardDecision?.status ?? 'NOT RECORDED'}</strong><small>{recommendation.awardDecision?.awardNumber ?? '—'}</small></div>
      </div>
      {recommendation.status === 'DRAFT' ? <DraftEditor session={session} recommendation={recommendation} /> : null}
      <BasisEditor session={session} recommendation={recommendation} candidate={candidate} />
      {recommendation.status === 'DRAFT' ? <section className="decision-submit"><div><strong>Submit for governed approval</strong><span>Submission numbers and freezes this recommendation version. Later revision is by superseding version, not rewriting evidence.</span></div><button className="primary-button" type="button" onClick={() => submit.mutate()} disabled={submit.isPending || recommendation.selections.length === 0}>{submit.isPending ? 'Submitting…' : 'Submit recommendation'}</button>{submit.isError ? <p className="form-error">{submit.error.message}</p> : null}</section> : null}
      <ApprovalPanel session={session} recommendation={recommendation} />
      {recommendation.status === 'RETURNED_FOR_REVISION' ? <section className="decision-revision-callout"><div><strong>Returned for revision</strong><span>This submitted version remains immutable. Start a superseding DRAFT to address the approval comments.</span></div><button className="primary-button" type="button" onClick={onRevise}>Create revised draft</button></section> : null}
      <AwardPanel session={session} recommendation={recommendation} />
    </article>
  );
}

export function ProcurementDecisionWorkspace({ session, locale }: { readonly session: Session; readonly locale: SupportedLocale }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [revisionOf, setRevisionOf] = useState<AwardRecommendationDetail | undefined>();

  const candidates = useQuery({
    queryKey: ['decision-candidates', session],
    queryFn: () => json<DecisionCandidatesResponse>('/procurement/decision-candidates', session),
  });
  const register = useQuery({
    queryKey: ['decision-register', session],
    queryFn: () => json<AwardRecommendationRegisterResponse>('/procurement/recommendations', session),
  });
  const detail = useQuery({
    queryKey: ['decision-detail', session, selectedId],
    enabled: selectedId !== null,
    queryFn: () => json<AwardRecommendationDetailResponse>(`/procurement/recommendations/${selectedId}`, session),
  });

  useEffect(() => {
    if (selectedId === null && register.data?.recommendations[0]) setSelectedId(register.data.recommendations[0].recommendationId);
  }, [register.data, selectedId]);

  const candidate = useMemo(() => {
    const recommendation = detail.data?.recommendation;
    if (!recommendation) return undefined;
    return candidates.data?.comparisons.find((item) => item.comparisonSnapshotId === recommendation.comparisonSnapshotId);
  }, [candidates.data, detail.data]);

  const copy = locale === 'ar'
    ? { kicker: 'قرار الشراء', title: 'التوصية · الموافقة · قرار الترسية', body: 'حوّل مقارنة العروض المجمدة إلى توصية قابلة للتدقيق، موافقة صلاحيات، ثم قرار ترسية جاهز للتسليم قبل أمر الشراء.', create: 'توصية جديدة' }
    : { kicker: 'Procurement decision', title: 'Recommendation · Approval · Award', body: 'Turn the frozen bid comparison into an auditable recommendation, DOA approval and award decision before any LPO / PO commitment is formed.', create: '+ New recommendation' };

  function created(id: string) {
    setCreating(false);
    setRevisionOf(undefined);
    setSelectedId(id);
  }

  if (candidates.isPending || register.isPending) return <section className="panel"><p>Loading governed decision workspace…</p></section>;
  if (candidates.isError || register.isError) return <section className="panel"><p className="form-error">{candidates.error?.message ?? register.error?.message}</p></section>;

  return (
    <div className="decision-workspace">
      <section className="decision-workspace-heading">
        <div><p className="panel-kicker">{copy.kicker}</p><h3>{copy.title}</h3><p>{copy.body}</p></div>
        <button className="primary-button" type="button" onClick={() => { setRevisionOf(undefined); setCreating(true); }} disabled={(candidates.data?.comparisons.length ?? 0) === 0}>{copy.create}</button>
      </section>
      {creating ? <CreateRecommendation session={session} candidates={candidates.data?.comparisons ?? []} {...(revisionOf ? { revisionOf } : {})} onCreated={created} onCancel={() => { setCreating(false); setRevisionOf(undefined); }} /> : null}
      <div className="decision-layout">
        <aside className="decision-register panel">
          <div className="decision-register-heading"><strong>Decision register</strong><span>{register.data?.recommendations.length ?? 0}</span></div>
          {(register.data?.recommendations.length ?? 0) === 0 ? <p className="decision-empty">No recommendation versions yet. Freeze a comparison with supplier-confirmed basis first.</p> : register.data?.recommendations.map((row) => <button type="button" key={row.recommendationId} className={row.recommendationId === selectedId ? 'decision-register-item decision-register-item--active' : 'decision-register-item'} onClick={() => setSelectedId(row.recommendationId)}><div><strong>{row.recommendationNumber ?? 'DRAFT'}</strong><span className={`status-pill status-pill--${tone(row.status)}`}>{row.status}</span></div><p>{row.projectCode} · {row.rfqNumber}</p><small>{row.comparisonNumber} · {label(row.outcome)}</small><div className="decision-register-meta"><span>{money(row.recommendedValue, row.currency)}</span><span>{row.approvalStatus ?? 'No approval'}</span><span>{row.awardStatus ?? 'No award'}</span></div></button>)}
        </aside>
        <main className="decision-main">
          {selectedId === null ? <section className="panel decision-empty-stage"><strong>Select or create a recommendation</strong><span>The decision workspace starts from a frozen comparison snapshot.</span></section> : detail.isPending ? <section className="panel"><p>Opening recommendation…</p></section> : detail.isError ? <section className="panel"><p className="form-error">{detail.error.message}</p></section> : detail.data ? <RecommendationDetail session={session} recommendation={detail.data.recommendation} candidate={candidate} onRevise={() => { setRevisionOf(detail.data?.recommendation); setCreating(true); }} /> : null}
        </main>
      </div>
    </div>
  );
}
