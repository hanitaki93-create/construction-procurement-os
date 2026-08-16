import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, type FormEvent } from 'react';

import type {
  CreateMaterialRequisitionRequest,
  CreateMaterialRequisitionResponse,
  MaterialRequisitionDetailResponse,
  MaterialRequisitionListResponse,
  MrLineType,
  MrPriority,
  ProcurementReferenceDataResponse,
  SupplierListResponse,
  WorkspaceProject,
} from '@cpos/contracts';

import { MrReviewPanel } from './mr-review-panel.js';

export interface ErpDevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

interface ErpRequisitionWorkspaceProps {
  readonly session: ErpDevelopmentSession;
  readonly projects: readonly WorkspaceProject[];
  readonly projectScopeId: string | null;
}

type DocumentTab = 'general' | 'lines' | 'decision' | 'lifecycle' | 'history';

interface DraftLine {
  readonly id: string;
  readonly lineType: MrLineType;
  readonly description: string;
  readonly specification: string;
  readonly quantity: string;
  readonly uomCode: string;
  readonly preferredSupplierId: string;
}

function apiHeaders(session: ErpDevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

async function apiJson<T>(url: string, session: ErpDevelopmentSession, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { ...apiHeaders(session), ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { readonly message?: string; readonly code?: string };
      message = body.message ?? body.code ?? message;
    } catch {
      // Keep HTTP fallback.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

function readable(value: string): string {
  return value.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function statusTone(value: string): 'ok' | 'warn' | 'danger' | 'neutral' {
  if (['APPROVED', 'FULFILLED', 'VERIFIED', 'ACTIVE'].includes(value)) return 'ok';
  if (['URGENT', 'UNDER_REVIEW', 'PARTIALLY_APPROVED', 'SUBMITTED'].includes(value)) return 'warn';
  if (['REJECTED', 'CANCELLED', 'EXPIRED'].includes(value)) return 'danger';
  return 'neutral';
}

function StatusTag({ value }: { readonly value: string }) {
  return <span className={`erp-status erp-status--${statusTone(value)}`}>{readable(value)}</span>;
}

function newLine(defaultUom = 'EA'): DraftLine {
  return {
    id: crypto.randomUUID(),
    lineType: 'MATERIAL',
    description: '',
    specification: '',
    quantity: '1',
    uomCode: defaultUom,
    preferredSupplierId: '',
  };
}

function daysFromToday(dateText: string): number | null {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((date.getTime() - today.getTime()) / 86_400_000);
}

function NeedDate({ value }: { readonly value: string }) {
  const days = daysFromToday(value);
  return (
    <span className={days !== null && days < 0 ? 'erp-date erp-date--late' : days !== null && days <= 7 ? 'erp-date erp-date--soon' : 'erp-date'}>
      <strong>{value}</strong>
      <small>{days === null ? '' : days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'Today' : `${days}d remaining`}</small>
    </span>
  );
}

function CreateRequisition({
  session,
  projects,
  suppliers,
  references,
  onClose,
  onCreated,
}: {
  readonly session: ErpDevelopmentSession;
  readonly projects: readonly WorkspaceProject[];
  readonly suppliers: SupplierListResponse['suppliers'];
  readonly references: ProcurementReferenceDataResponse;
  readonly onClose: () => void;
  readonly onCreated: (mrId: string) => void;
}) {
  const client = useQueryClient();
  const [projectId, setProjectId] = useState(projects[0]?.projectId ?? '');
  const [subject, setSubject] = useState('');
  const [requiredOnSiteDate, setRequiredOnSiteDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().slice(0, 10);
  });
  const [priority, setPriority] = useState<MrPriority>('NORMAL');
  const [requesterTeam, setRequesterTeam] = useState('');
  const [instructions, setInstructions] = useState('');
  const [lines, setLines] = useState<readonly DraftLine[]>([newLine(references.uoms[0]?.code ?? 'EA')]);

  const create = useMutation({
    mutationFn: () => {
      const payload: CreateMaterialRequisitionRequest = {
        projectId,
        requiredOnSiteDate,
        priority,
        subject,
        ...(requesterTeam.trim() ? { requesterTeam: requesterTeam.trim() } : {}),
        ...(instructions.trim() ? { instructions: instructions.trim() } : {}),
        lines: lines.map((line) => ({
          entryMode: 'FREE_FORM',
          lineType: line.lineType,
          description: line.description,
          requestedQuantity: line.quantity,
          uomCode: line.uomCode,
          ...(line.specification.trim() ? { specification: line.specification.trim() } : {}),
          ...(line.preferredSupplierId ? { preferredSupplierId: line.preferredSupplierId } : {}),
        })),
      };
      return apiJson<CreateMaterialRequisitionResponse>('/procurement/requisitions', session, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    onSuccess: async (result) => {
      await client.invalidateQueries({ queryKey: ['procurement-mrs', session] });
      onCreated(result.requisition.mrId);
    },
  });

  function patchLine(id: string, patch: Partial<Omit<DraftLine, 'id'>>) {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    create.mutate();
  }

  return (
    <form className="erp-document erp-document--new" onSubmit={submit}>
      <header className="erp-document-head">
        <div>
          <button className="erp-link-button" type="button" onClick={onClose}>← Requisition register</button>
          <div className="erp-document-title-row"><span className="erp-doc-type">MR</span><h1>New material / purchase requisition</h1></div>
          <p>Capture project demand once, with line-level specification and required-on-site dates.</p>
        </div>
        <div className="erp-document-actions"><button className="erp-button erp-button--ghost" type="button" onClick={onClose}>Cancel</button><button className="erp-button erp-button--primary" type="submit" disabled={create.isPending || !projectId}>{create.isPending ? 'Creating…' : 'Create requisition'}</button></div>
      </header>

      <section className="erp-form-grid">
        <label className="erp-field erp-field--span2"><span>Project</span><select value={projectId} onChange={(event) => setProjectId(event.target.value)} required>{projects.map((project) => <option key={project.projectId} value={project.projectId}>{project.projectCode} — {project.displayName}</option>)}</select></label>
        <label className="erp-field"><span>Required on site</span><input type="date" value={requiredOnSiteDate} onChange={(event) => setRequiredOnSiteDate(event.target.value)} required /></label>
        <label className="erp-field"><span>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value as MrPriority)}><option value="LOW">Low</option><option value="NORMAL">Normal</option><option value="HIGH">High</option><option value="URGENT">Urgent</option></select></label>
        <label className="erp-field erp-field--span3"><span>Subject</span><input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Chilled water valve package" required /></label>
        <label className="erp-field"><span>Requesting team</span><input value={requesterTeam} onChange={(event) => setRequesterTeam(event.target.value)} placeholder="MEP / Site / QS" /></label>
        <label className="erp-field erp-field--span4"><span>Instructions / purpose</span><textarea rows={2} value={instructions} onChange={(event) => setInstructions(event.target.value)} /></label>
      </section>

      <section className="erp-lines-editor">
        <div className="erp-section-bar"><div><strong>Requested lines</strong><small>{lines.length} line{lines.length === 1 ? '' : 's'}</small></div><button className="erp-button erp-button--small" type="button" onClick={() => setLines((current) => [...current, newLine(references.uoms[0]?.code ?? 'EA')])}>+ Add line</button></div>
        <div className="erp-edit-grid erp-edit-grid--head"><span>Line</span><span>Description / specification</span><span>Type</span><span>Qty</span><span>UOM</span><span>Preferred supplier</span><span /></div>
        {lines.map((line, index) => (
          <div className="erp-edit-grid" key={line.id}>
            <span className="erp-line-no">{String((index + 1) * 10).padStart(2, '0')}</span>
            <div className="erp-line-description"><input value={line.description} onChange={(event) => patchLine(line.id, { description: event.target.value })} placeholder="Material, service or subcontract scope" required /><input value={line.specification} onChange={(event) => patchLine(line.id, { specification: event.target.value })} placeholder="Specification / drawing / model / performance requirement" /></div>
            <select value={line.lineType} onChange={(event) => patchLine(line.id, { lineType: event.target.value as MrLineType })}><option value="MATERIAL">Material</option><option value="SERVICE">Service</option><option value="SUBCONTRACT_SCOPE">Subcontract</option><option value="EQUIPMENT">Equipment</option><option value="OTHER">Other</option></select>
            <input inputMode="decimal" value={line.quantity} onChange={(event) => patchLine(line.id, { quantity: event.target.value })} required />
            <select value={line.uomCode} onChange={(event) => patchLine(line.id, { uomCode: event.target.value })}>{references.uoms.map((uom) => <option key={uom.code} value={uom.code}>{uom.code}</option>)}</select>
            <select value={line.preferredSupplierId} onChange={(event) => patchLine(line.id, { preferredSupplierId: event.target.value })}><option value="">—</option>{suppliers.map((supplier) => <option key={supplier.supplierId} value={supplier.supplierId}>{supplier.supplierCode} — {supplier.legalName}</option>)}</select>
            <button className="erp-icon-button" type="button" aria-label={`Remove line ${index + 1}`} disabled={lines.length === 1} onClick={() => setLines((current) => current.filter((candidate) => candidate.id !== line.id))}>×</button>
          </div>
        ))}
      </section>
      {create.isError ? <div className="erp-inline-error" role="alert">{create.error.message}</div> : null}
    </form>
  );
}

function RequisitionDocument({
  session,
  mrId,
  onClose,
}: {
  readonly session: ErpDevelopmentSession;
  readonly mrId: string;
  readonly onClose: () => void;
}) {
  const client = useQueryClient();
  const [tab, setTab] = useState<DocumentTab>('general');
  const query = useQuery({
    queryKey: ['procurement-mr', session, mrId],
    queryFn: () => apiJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}`, session),
  });
  const submit = useMutation({
    mutationFn: () => apiJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}/submit`, session, { method: 'POST' }),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['procurement-mr', session, mrId] }),
        client.invalidateQueries({ queryKey: ['procurement-mrs', session] }),
      ]);
    },
  });

  if (query.isPending) return <div className="erp-state">Opening requisition…</div>;
  if (query.isError) return <div className="erp-state erp-state--error"><strong>Requisition unavailable</strong><span>{query.error.message}</span><button className="erp-button" type="button" onClick={onClose}>Back</button></div>;

  const mr = query.data.requisition;
  const routedLines = mr.lines.filter((line) => line.routeDecision !== null).length;
  const approvedLines = mr.lines.filter((line) => line.lineState === 'APPROVED').length;
  const rejectedLines = mr.lines.filter((line) => line.lineState === 'REJECTED').length;

  return (
    <article className="erp-document erp-print-document">
      <header className="erp-document-head">
        <div>
          <button className="erp-link-button erp-no-print" type="button" onClick={onClose}>← Requisition register</button>
          <div className="erp-document-title-row"><span className="erp-doc-type">MR</span><h1>{mr.mrNumber}</h1><StatusTag value={mr.status} /></div>
          <p>{mr.subject}</p>
        </div>
        <div className="erp-document-actions erp-no-print">
          <button className="erp-button erp-button--ghost" type="button" onClick={() => window.print()}>Print / PDF</button>
          {mr.status === 'DRAFT' ? <button className="erp-button erp-button--primary" type="button" disabled={submit.isPending} onClick={() => submit.mutate()}>{submit.isPending ? 'Submitting…' : 'Submit for review'}</button> : null}
        </div>
      </header>

      {submit.isError ? <div className="erp-inline-error" role="alert">{submit.error.message}</div> : null}

      <section className="erp-document-summary">
        <div><span>Project</span><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></div>
        <div><span>Requester</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? '—'}</small></div>
        <div><span>Request date</span><strong>{mr.requestDate}</strong></div>
        <div><span>Required on site</span><strong>{mr.requiredOnSiteDate}</strong></div>
        <div><span>Priority</span><StatusTag value={mr.priority} /></div>
        <div><span>Progress</span><strong>{routedLines}/{mr.lineCount} routed</strong><small>{approvedLines} approved · {rejectedLines} rejected</small></div>
      </section>

      <nav className="erp-document-tabs erp-no-print" aria-label="Requisition sections">
        {([
          ['general', 'General'],
          ['lines', `Lines (${mr.lineCount})`],
          ['decision', 'Approval & routing'],
          ['lifecycle', 'Lifecycle'],
          ['history', `History (${mr.reviewTrail.length})`],
        ] as const).map(([value, label]) => <button key={value} className={tab === value ? 'erp-document-tab erp-document-tab--active' : 'erp-document-tab'} type="button" onClick={() => setTab(value)}>{label}</button>)}
      </nav>

      <div className="erp-print-all-tabs">
        <section className={tab === 'general' ? 'erp-tab-panel' : 'erp-tab-panel erp-tab-panel--hidden-screen'}>
          <div className="erp-panel-grid">
            <section className="erp-panel">
              <div className="erp-panel-head"><div><strong>Requisition purpose</strong><small>Original project demand</small></div></div>
              <dl className="erp-detail-list"><div><dt>Subject</dt><dd>{mr.subject}</dd></div><div><dt>Instructions</dt><dd>{mr.instructions ?? 'No additional instructions recorded.'}</dd></div><div><dt>Line count</dt><dd>{mr.lineCount}</dd></div><div><dt>Current status</dt><dd><StatusTag value={mr.status} /></dd></div></dl>
            </section>
            <section className="erp-panel">
              <div className="erp-panel-head"><div><strong>Control status</strong><small>What requires attention</small></div></div>
              <div className="erp-control-list"><div><span>Review</span><strong>{mr.reviewTrail.length > 0 ? `${mr.reviewTrail.length} recorded decision${mr.reviewTrail.length === 1 ? '' : 's'}` : mr.status === 'DRAFT' ? 'Not submitted' : 'Pending decision'}</strong></div><div><span>Routing</span><strong>{routedLines === mr.lineCount ? 'All eligible lines routed' : `${routedLines} of ${mr.lineCount} lines routed`}</strong></div><div><span>Required date</span><strong>{mr.requiredOnSiteDate}</strong></div></div>
            </section>
          </div>
        </section>

        <section className={tab === 'lines' ? 'erp-tab-panel' : 'erp-tab-panel erp-tab-panel--hidden-screen'}>
          <div className="erp-table-shell">
            <table className="erp-table erp-table--lines">
              <thead><tr><th>Line</th><th>Description / specification</th><th>Type</th><th>Requested</th><th>Approved</th><th>Procurement route</th><th>State</th></tr></thead>
              <tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td className="erp-mono">{line.lineNo}</td><td className="erp-main-cell"><strong>{line.description}</strong><small>{line.specification ?? 'No additional specification'}</small></td><td>{readable(line.lineType)}</td><td>{line.requestedQuantity} {line.uomCode}</td><td>{line.approvedQuantity === null ? '—' : `${line.approvedQuantity} ${line.uomCode}`}</td><td>{line.routeDecision ? <><strong>{readable(line.routeDecision.route)}</strong>{line.routeDecision.justification ? <small>{line.routeDecision.justification}</small> : null}</> : <span className="erp-muted">Not routed</span>}</td><td><StatusTag value={line.lineState} /></td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className={tab === 'decision' ? 'erp-tab-panel' : 'erp-tab-panel erp-tab-panel--hidden-screen'}>
          <MrReviewPanel session={session} mr={mr} />
        </section>

        <section className={tab === 'lifecycle' ? 'erp-tab-panel' : 'erp-tab-panel erp-tab-panel--hidden-screen'}>
          <div className="erp-lifecycle">
            <div className="erp-lifecycle-step erp-lifecycle-step--done"><span>1</span><div><strong>Demand captured</strong><small>{mr.mrNumber} · {mr.lineCount} line{mr.lineCount === 1 ? '' : 's'}</small></div></div>
            <div className={mr.status !== 'DRAFT' ? 'erp-lifecycle-step erp-lifecycle-step--done' : 'erp-lifecycle-step'}><span>2</span><div><strong>Submitted for review</strong><small>{mr.status === 'DRAFT' ? 'Awaiting submission' : 'Submission complete'}</small></div></div>
            <div className={['APPROVED', 'PARTIALLY_APPROVED'].includes(mr.status) ? 'erp-lifecycle-step erp-lifecycle-step--done' : 'erp-lifecycle-step'}><span>3</span><div><strong>Demand decision</strong><small>{approvedLines} approved · {rejectedLines} rejected</small></div></div>
            <div className={routedLines > 0 ? 'erp-lifecycle-step erp-lifecycle-step--done' : 'erp-lifecycle-step'}><span>4</span><div><strong>Procurement route</strong><small>{routedLines > 0 ? `${routedLines} line${routedLines === 1 ? '' : 's'} routed` : 'No route recorded yet'}</small></div></div>
            {mr.lines.filter((line) => line.routeDecision).map((line) => <div className="erp-route-card" key={line.mrLineId}><span className="erp-mono">{line.lineNo}</span><div><strong>{line.description}</strong><small>{line.routeDecision ? readable(line.routeDecision.route) : '—'}</small></div><StatusTag value={line.lineState} /></div>)}
          </div>
        </section>

        <section className={tab === 'history' ? 'erp-tab-panel' : 'erp-tab-panel erp-tab-panel--hidden-screen'}>
          {mr.reviewTrail.length === 0 ? <div className="erp-empty-panel"><strong>No review history yet</strong><span>History will populate from governed decisions recorded against this requisition.</span></div> : <div className="erp-history-list">{mr.reviewTrail.map((entry) => <div className="erp-history-row" key={entry.reviewOccurrenceId}><time>{new Date(entry.occurredAt).toLocaleString()}</time><StatusTag value={entry.decision} /><div><strong>{entry.reviewerName}</strong><small>{entry.comments ?? 'No review comment'}</small></div></div>)}</div>}
        </section>
      </div>
    </article>
  );
}

export function ErpRequisitionWorkspace({ session, projects, projectScopeId }: ErpRequisitionWorkspaceProps) {
  const [selectedMrId, setSelectedMrId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');

  const mrs = useQuery({
    queryKey: ['procurement-mrs', session],
    queryFn: () => apiJson<MaterialRequisitionListResponse>('/procurement/requisitions', session),
  });
  const suppliers = useQuery({
    queryKey: ['procurement-suppliers', session],
    queryFn: () => apiJson<SupplierListResponse>('/procurement/suppliers', session),
  });
  const references = useQuery({
    queryKey: ['procurement-reference-data', session],
    queryFn: () => apiJson<ProcurementReferenceDataResponse>('/procurement/reference-data', session),
  });

  const selectedProjectCode = projectScopeId ? projects.find((project) => project.projectId === projectScopeId)?.projectCode ?? null : null;
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (mrs.data?.requisitions ?? []).filter((mr) => {
      if (selectedProjectCode && mr.projectCode !== selectedProjectCode) return false;
      if (status !== 'ALL' && mr.status !== status) return false;
      if (priority !== 'ALL' && mr.priority !== priority) return false;
      if (!term) return true;
      return [mr.mrNumber, mr.subject, mr.projectCode, mr.projectName, mr.requesterName].join(' ').toLowerCase().includes(term);
    });
  }, [mrs.data, priority, search, selectedProjectCode, status]);

  const total = mrs.data?.requisitions.length ?? 0;
  const urgent = (mrs.data?.requisitions ?? []).filter((mr) => mr.priority === 'URGENT').length;
  const pending = (mrs.data?.requisitions ?? []).filter((mr) => ['SUBMITTED', 'UNDER_REVIEW'].includes(mr.status)).length;

  if (creating && references.data) {
    return <CreateRequisition session={session} projects={projects} suppliers={suppliers.data?.suppliers ?? []} references={references.data} onClose={() => setCreating(false)} onCreated={(mrId) => { setCreating(false); setSelectedMrId(mrId); }} />;
  }

  if (selectedMrId) return <RequisitionDocument session={session} mrId={selectedMrId} onClose={() => setSelectedMrId(null)} />;

  return (
    <section className="erp-register">
      <header className="erp-register-head">
        <div><div className="erp-breadcrumb">Procurement / Demand</div><div className="erp-title-row"><h1>Material / Purchase Requisitions</h1><span className="erp-record-count">{total} records</span></div><p>Project demand register. Open a requisition without losing register context, then review lines, decisions, routes and history in one document workspace.</p></div>
        <button className="erp-button erp-button--primary" type="button" disabled={projects.length === 0 || references.isPending} onClick={() => setCreating(true)}>+ New requisition</button>
      </header>

      <div className="erp-register-tabs"><button className="erp-open-tab erp-open-tab--active" type="button">Requisition register</button></div>

      <div className="erp-register-kpis">
        <div><span>Total</span><strong>{total}</strong></div><div><span>Pending review</span><strong>{pending}</strong></div><div><span>Urgent</span><strong>{urgent}</strong></div><div><span>Visible after filters</span><strong>{filtered.length}</strong></div>
      </div>

      <div className="erp-toolbar">
        <label className="erp-search"><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="MR number, subject, project, requester…" /></label>
        <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="ALL">All statuses</option><option value="DRAFT">Draft</option><option value="SUBMITTED">Submitted</option><option value="UNDER_REVIEW">Under review</option><option value="APPROVED">Approved</option><option value="PARTIALLY_APPROVED">Partially approved</option><option value="REJECTED">Rejected</option></select></label>
        <label><span>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)}><option value="ALL">All priorities</option><option value="URGENT">Urgent</option><option value="HIGH">High</option><option value="NORMAL">Normal</option><option value="LOW">Low</option></select></label>
        <button className="erp-button erp-button--ghost erp-button--small" type="button" onClick={() => { setSearch(''); setStatus('ALL'); setPriority('ALL'); }}>Clear filters</button>
      </div>

      {mrs.isPending ? <div className="erp-state">Loading requisition register…</div> : null}
      {mrs.isError ? <div className="erp-state erp-state--error"><strong>Requisition register unavailable</strong><span>{mrs.error.message}</span><button className="erp-button" type="button" onClick={() => mrs.refetch()}>Retry</button></div> : null}
      {mrs.data && filtered.length === 0 ? <div className="erp-empty-panel"><strong>No matching requisitions</strong><span>Change the filters or create a new project demand request.</span></div> : null}
      {filtered.length > 0 ? (
        <div className="erp-table-shell erp-table-shell--register">
          <table className="erp-table erp-table--register">
            <thead><tr><th>MR</th><th>Subject</th><th>Project</th><th>Requester</th><th>Required on site</th><th>Priority</th><th>Lines</th><th>Status</th></tr></thead>
            <tbody>{filtered.map((mr) => <tr key={mr.mrId} tabIndex={0} onClick={() => setSelectedMrId(mr.mrId)} onKeyDown={(event) => { if (event.key === 'Enter') setSelectedMrId(mr.mrId); }}><td><strong className="erp-mono erp-doc-link">{mr.mrNumber}</strong></td><td className="erp-main-cell"><strong>{mr.subject}</strong></td><td><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></td><td>{mr.requesterName}</td><td><NeedDate value={mr.requiredOnSiteDate} /></td><td><StatusTag value={mr.priority} /></td><td className="erp-number-cell">{mr.lineCount}</td><td><StatusTag value={mr.status} /></td></tr>)}</tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
