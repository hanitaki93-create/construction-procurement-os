import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, type FormEvent } from 'react';

import type {
  CreateMaterialRequisitionRequest,
  CreateMaterialRequisitionResponse,
  EquivalentRule,
  MaterialRequisitionDetail,
  MaterialRequisitionDetailResponse,
  MaterialRequisitionListResponse,
  MrLineType,
  MrPriority,
  ProcurementReferenceDataResponse,
  ProcurementRoute,
  ReviewMaterialRequisitionRequest,
  SetProcurementRouteRequest,
  SupplierListResponse,
  WorkspaceProject,
} from '@cpos/contracts';

import './erp-requisition-s02.css';

export interface ErpDevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

interface ErpRequisitionWorkspaceProps {
  readonly session: ErpDevelopmentSession;
  readonly projects: readonly WorkspaceProject[];
  readonly projectScopeId: string | null;
}

type DocumentTab = 'overview' | 'items' | 'approval' | 'sourcing' | 'history';

interface DraftLine {
  readonly id: string;
  readonly lineType: MrLineType;
  readonly description: string;
  readonly specification: string;
  readonly quantity: string;
  readonly uomCode: string;
  readonly requiredDateOverride: string;
  readonly preferredSupplierId: string;
  readonly manufacturer: string;
  readonly brand: string;
  readonly model: string;
  readonly equivalentRule: EquivalentRule;
  readonly technicalNotes: string;
}

interface ReviewDraft {
  readonly outcome: 'APPROVED' | 'REJECTED';
  readonly approvedQuantity: string;
}

const routeCatalog: readonly {
  readonly value: ProcurementRoute;
  readonly label: string;
  readonly shortLabel: string;
  readonly description: string;
  readonly requiresJustification: boolean;
}[] = [
  {
    value: 'COMPETITIVE_RFQ',
    label: 'Competitive RFQ / tender',
    shortLabel: 'Competitive RFQ',
    description: 'Send the approved demand through competitive sourcing, supplier responses and commercial comparison.',
    requiresJustification: false,
  },
  {
    value: 'PACKAGE_SOURCING',
    label: 'Package sourcing',
    shortLabel: 'Package sourcing',
    description: 'Hold the approved line for bundling with other demand into one procurement package before tendering.',
    requiresJustification: false,
  },
  {
    value: 'DIRECT_ORDER',
    label: 'Direct order',
    shortLabel: 'Direct order',
    description: 'Use a policy-permitted direct purchasing route without a competitive RFQ. A documented reason is required.',
    requiresJustification: true,
  },
  {
    value: 'SOLE_SOURCE_EXCEPTION',
    label: 'Sole-source exception',
    shortLabel: 'Sole source',
    description: 'Use one supplier because competition is not reasonably available or an approved exception applies. Reason required.',
    requiresJustification: true,
  },
  {
    value: 'EXTERNAL_ERP_STOCK',
    label: 'Stock / external fulfillment',
    shortLabel: 'Stock / external',
    description: 'Satisfy demand through stock or another governed system instead of a CPOS sourcing event. Reason required.',
    requiresJustification: true,
  },
];

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
      // Preserve the HTTP fallback.
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
  if (['URGENT', 'HIGH', 'UNDER_REVIEW', 'PARTIALLY_APPROVED', 'SUBMITTED'].includes(value)) return 'warn';
  if (['REJECTED', 'CANCELLED', 'EXPIRED'].includes(value)) return 'danger';
  return 'neutral';
}

function StatusTag({ value }: { readonly value: string }) {
  return <span className={`erp-status erp-status--${statusTone(value)}`}>{readable(value)}</span>;
}

function routeLabel(value: ProcurementRoute): string {
  return routeCatalog.find((entry) => entry.value === value)?.shortLabel ?? readable(value);
}

function supplierName(suppliers: SupplierListResponse['suppliers'], supplierId: string | null): string {
  if (!supplierId) return '—';
  const supplier = suppliers.find((entry) => entry.supplierId === supplierId);
  return supplier ? `${supplier.supplierCode} — ${supplier.legalName}` : 'Supplier reference';
}

function dateAfter(days: number): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
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
    <span className={days !== null && days < 0 ? 'mr-s02-date mr-s02-date--late' : days !== null && days <= 7 ? 'mr-s02-date mr-s02-date--soon' : 'mr-s02-date'}>
      <strong>{value}</strong>
      <small>{days === null ? '' : days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'Today' : `${days}d remaining`}</small>
    </span>
  );
}

function newLine(defaultUom = 'EA', defaultDate = ''): DraftLine {
  return {
    id: crypto.randomUUID(),
    lineType: 'MATERIAL',
    description: '',
    specification: '',
    quantity: '1',
    uomCode: defaultUom,
    requiredDateOverride: defaultDate,
    preferredSupplierId: '',
    manufacturer: '',
    brand: '',
    model: '',
    equivalentRule: 'ALTERNATE_BY_APPROVAL',
    technicalNotes: '',
  };
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
  const [requiredOnSiteDate, setRequiredOnSiteDate] = useState(() => dateAfter(14));
  const [priority, setPriority] = useState<MrPriority>('NORMAL');
  const [requesterTeam, setRequesterTeam] = useState('');
  const [remarks, setRemarks] = useState('');
  const [lines, setLines] = useState<readonly DraftLine[]>([
    newLine(references.uoms[0]?.code ?? 'EA', ''),
  ]);
  const [clientError, setClientError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () => {
      const payload: CreateMaterialRequisitionRequest = {
        projectId,
        requiredOnSiteDate,
        priority,
        subject: subject.trim(),
        ...(requesterTeam.trim() ? { requesterTeam: requesterTeam.trim() } : {}),
        ...(remarks.trim() ? { instructions: remarks.trim() } : {}),
        lines: lines.map((line) => ({
          entryMode: 'FREE_FORM',
          lineType: line.lineType,
          description: line.description.trim(),
          requestedQuantity: line.quantity.trim(),
          uomCode: line.uomCode,
          ...(line.specification.trim() ? { specification: line.specification.trim() } : {}),
          ...(line.requiredDateOverride ? { requiredDateOverride: line.requiredDateOverride } : {}),
          ...(line.preferredSupplierId ? { preferredSupplierId: line.preferredSupplierId } : {}),
          ...(line.manufacturer.trim() ? { manufacturer: line.manufacturer.trim() } : {}),
          ...(line.brand.trim() ? { brand: line.brand.trim() } : {}),
          ...(line.model.trim() ? { model: line.model.trim() } : {}),
          ...(line.equivalentRule ? { equivalentRule: line.equivalentRule } : {}),
          ...(line.technicalNotes.trim() ? { technicalNotes: line.technicalNotes.trim() } : {}),
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
    setClientError(null);
    if (!projectId) {
      setClientError('Select a project.');
      return;
    }
    if (!subject.trim()) {
      setClientError('Enter a requisition subject.');
      return;
    }
    if (!requiredOnSiteDate) {
      setClientError('Enter the required supply / on-site date.');
      return;
    }
    const badLine = lines.find((line) => !line.description.trim() || !/^(?:\d+)(?:\.\d+)?$/u.test(line.quantity.trim()) || Number(line.quantity) <= 0);
    if (badLine) {
      setClientError('Every line needs a description and a positive quantity.');
      return;
    }
    create.mutate();
  }

  return (
    <form className="mr-s02-page mr-s02-create mr-s02-screen" onSubmit={submit}>
      <header className="mr-s02-doc-head">
        <div>
          <button className="mr-s02-back" type="button" onClick={onClose}>← Requisition register</button>
          <div className="mr-s02-title-row"><span className="mr-s02-doc-chip">MR</span><h1>New material / purchase requisition</h1><StatusTag value="DRAFT" /></div>
          <p>Internal project demand. Proposed suppliers are non-binding and sourcing is decided only after approval.</p>
        </div>
        <div className="mr-s02-head-actions">
          <button className="erp-button erp-button--ghost" type="button" onClick={onClose}>Cancel</button>
          <button className="erp-button erp-button--primary" type="submit" disabled={create.isPending}>{create.isPending ? 'Creating…' : 'Save draft MR'}</button>
        </div>
      </header>

      {(clientError || create.isError) ? <div className="mr-s02-error" role="alert"><strong>MR could not be saved</strong><span>{clientError ?? create.error?.message}</span></div> : null}

      <section className="mr-s02-card">
        <div className="mr-s02-section-head"><div><strong>Request information</strong><span>Who needs what, where and when</span></div></div>
        <div className="mr-s02-form-grid">
          <label className="mr-s02-field mr-s02-span2"><span>Project *</span><select value={projectId} onChange={(event) => setProjectId(event.target.value)} required>{projects.map((project) => <option key={project.projectId} value={project.projectId}>{project.projectCode} — {project.displayName}</option>)}</select></label>
          <label className="mr-s02-field"><span>Required supply / on-site date *</span><input type="date" value={requiredOnSiteDate} onChange={(event) => setRequiredOnSiteDate(event.target.value)} required /></label>
          <label className="mr-s02-field"><span>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value as MrPriority)}><option value="LOW">Low</option><option value="NORMAL">Normal</option><option value="HIGH">High</option><option value="URGENT">Urgent</option></select></label>
          <label className="mr-s02-field mr-s02-span3"><span>Subject *</span><input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Site timber, tools and fixing materials" required /></label>
          <label className="mr-s02-field"><span>Requesting team / department</span><input value={requesterTeam} onChange={(event) => setRequesterTeam(event.target.value)} placeholder="Site / MEP / Civil / Procurement" /></label>
          <label className="mr-s02-field mr-s02-span4"><span>Remarks / site instructions</span><textarea rows={3} value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Purpose, delivery constraints, drawing references, site contact, urgency reason…" /></label>
        </div>
      </section>

      <section className="mr-s02-card mr-s02-line-editor">
        <div className="mr-s02-section-head">
          <div><strong>Requested items / scope</strong><span>{lines.length} line{lines.length === 1 ? '' : 's'} · up to 250 supported</span></div>
          <button className="erp-button erp-button--small" type="button" onClick={() => setLines((current) => [...current, newLine(references.uoms[0]?.code ?? 'EA', '')])}>+ Add line</button>
        </div>

        {lines.map((line, index) => (
          <article className="mr-s02-edit-line" key={line.id}>
            <div className="mr-s02-edit-line-top">
              <span className="mr-s02-line-index">{String((index + 1) * 10).padStart(2, '0')}</span>
              <label className="mr-s02-field mr-s02-line-description"><span>Description *</span><input value={line.description} onChange={(event) => patchLine(line.id, { description: event.target.value })} placeholder="Requested material / service / subcontract scope" required /></label>
              <label className="mr-s02-field"><span>Type</span><select value={line.lineType} onChange={(event) => patchLine(line.id, { lineType: event.target.value as MrLineType })}><option value="MATERIAL">Material</option><option value="SERVICE">Service</option><option value="SUBCONTRACT_SCOPE">Subcontract scope</option><option value="EQUIPMENT">Equipment</option><option value="OTHER">Other</option></select></label>
              <label className="mr-s02-field mr-s02-qty"><span>Qty *</span><input inputMode="decimal" value={line.quantity} onChange={(event) => patchLine(line.id, { quantity: event.target.value })} required /></label>
              <label className="mr-s02-field mr-s02-uom"><span>UOM *</span><select value={line.uomCode} onChange={(event) => patchLine(line.id, { uomCode: event.target.value })}>{references.uoms.map((uom) => <option key={uom.code} value={uom.code}>{uom.code}</option>)}</select></label>
              <label className="mr-s02-field"><span>Line required date</span><input type="date" value={line.requiredDateOverride} onChange={(event) => patchLine(line.id, { requiredDateOverride: event.target.value })} /></label>
              <button className="mr-s02-remove" type="button" aria-label={`Remove line ${index + 1}`} disabled={lines.length === 1} onClick={() => setLines((current) => current.filter((candidate) => candidate.id !== line.id))}>×</button>
            </div>

            <div className="mr-s02-edit-line-details">
              <label className="mr-s02-field mr-s02-span2"><span>Specification / size / drawing reference</span><input value={line.specification} onChange={(event) => patchLine(line.id, { specification: event.target.value })} placeholder="Grade, dimensions, drawing, performance requirement…" /></label>
              <label className="mr-s02-field mr-s02-span2"><span>Proposed supplier <em>optional, non-binding</em></span><select value={line.preferredSupplierId} onChange={(event) => patchLine(line.id, { preferredSupplierId: event.target.value })}><option value="">No proposed supplier</option>{suppliers.map((supplier) => <option key={supplier.supplierId} value={supplier.supplierId}>{supplier.supplierCode} — {supplier.legalName}</option>)}</select></label>
              <label className="mr-s02-field"><span>Manufacturer</span><input value={line.manufacturer} onChange={(event) => patchLine(line.id, { manufacturer: event.target.value })} /></label>
              <label className="mr-s02-field"><span>Brand</span><input value={line.brand} onChange={(event) => patchLine(line.id, { brand: event.target.value })} /></label>
              <label className="mr-s02-field"><span>Model / supplier item ref</span><input value={line.model} onChange={(event) => patchLine(line.id, { model: event.target.value })} /></label>
              <label className="mr-s02-field"><span>Equivalent rule</span><select value={line.equivalentRule} onChange={(event) => patchLine(line.id, { equivalentRule: event.target.value as EquivalentRule })}><option value="ALTERNATE_BY_APPROVAL">Alternate by approval</option><option value="APPROVED_EQUIVALENT_ALLOWED">Approved equivalent allowed</option><option value="EXACT_ONLY">Exact only</option></select></label>
              <label className="mr-s02-field mr-s02-span4"><span>Line remarks / technical notes</span><input value={line.technicalNotes} onChange={(event) => patchLine(line.id, { technicalNotes: event.target.value })} placeholder="Supplier item code, interface requirement, site note, QA/QC note…" /></label>
            </div>
          </article>
        ))}
      </section>
      {create.isError ? <div className="mr-s02-error" role="alert"><strong>MR could not be saved</strong><span>{create.error.message}</span></div> : null}
      <footer className="mr-s02-create-footer">
        <span>Saving creates a governed DRAFT. Submission and approval happen as separate actions.</span>
        <button className="erp-button erp-button--primary" type="submit" disabled={create.isPending}>{create.isPending ? 'Creating…' : 'Save draft MR'}</button>
      </footer>
    </form>
  );
}

function ApprovalPanel({ session, mr }: { readonly session: ErpDevelopmentSession; readonly mr: MaterialRequisitionDetail }) {
  const client = useQueryClient();
  const reviewable = mr.status === 'SUBMITTED' || mr.status === 'UNDER_REVIEW';
  const initial = useMemo(
    () => Object.fromEntries(mr.lines.map((line) => [line.mrLineId, { outcome: 'APPROVED' as const, approvedQuantity: line.requestedQuantity }])) as Record<string, ReviewDraft>,
    [mr.lines],
  );
  const [decisions, setDecisions] = useState<Record<string, ReviewDraft>>(initial);
  const [comments, setComments] = useState('');

  const review = useMutation({
    mutationFn: () => {
      const payload: ReviewMaterialRequisitionRequest = {
        lineDecisions: mr.lines.map((line) => {
          const decision = decisions[line.mrLineId] ?? { outcome: 'APPROVED' as const, approvedQuantity: line.requestedQuantity };
          return decision.outcome === 'REJECTED'
            ? { mrLineId: line.mrLineId, outcome: 'REJECTED' as const }
            : { mrLineId: line.mrLineId, outcome: 'APPROVED' as const, approvedQuantity: decision.approvedQuantity };
        }),
        ...(comments.trim() ? { comments: comments.trim() } : {}),
      };
      return apiJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/review`, session, { method: 'POST', body: JSON.stringify(payload) });
    },
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }),
        client.invalidateQueries({ queryKey: ['procurement-mrs', session] }),
      ]);
    },
  });

  if (!reviewable) {
    const latest = mr.reviewTrail.at(-1);
    return (
      <div className="mr-s02-stack">
        <section className="mr-s02-card">
          <div className="mr-s02-section-head"><div><strong>Approval decision</strong><span>Closed decision state</span></div><StatusTag value={mr.status} /></div>
          {latest ? <div className="mr-s02-approval-summary"><div><span>Decision</span><strong>{readable(latest.decision)}</strong></div><div><span>Approved / rejected by</span><strong>{latest.reviewerName}</strong></div><div><span>Decision time</span><strong>{new Date(latest.occurredAt).toLocaleString()}</strong></div><div className="mr-s02-span2"><span>Comments</span><strong>{latest.comments ?? 'No comments recorded.'}</strong></div></div> : <div className="mr-s02-empty"><strong>{mr.status === 'DRAFT' ? 'Not submitted for approval yet' : 'No review occurrence is recorded for this seeded document.'}</strong><span>The MR status is shown from the governed record. Approval controls are available only while the document is Submitted / Under Review.</span></div>}
        </section>
        <section className="mr-s02-card">
          <div className="mr-s02-section-head"><div><strong>Line decision result</strong><span>Requested quantity remains separate from approved quantity</span></div></div>
          <div className="mr-s02-table-wrap"><table className="mr-s02-table"><thead><tr><th>Line</th><th>Item / scope</th><th>Requested</th><th>Approved</th><th>Decision state</th></tr></thead><tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td className="mr-s02-mono">{line.lineNo}</td><td className="mr-s02-main-cell"><strong>{line.description}</strong></td><td>{line.requestedQuantity} {line.uomCode}</td><td>{line.approvedQuantity === null ? '—' : `${line.approvedQuantity} ${line.uomCode}`}</td><td><StatusTag value={line.lineState} /></td></tr>)}</tbody></table></div>
        </section>
      </div>
    );
  }

  return (
    <section className="mr-s02-card">
      <div className="mr-s02-section-head"><div><strong>Approve project demand</strong><span>Approval authorizes quantity only. It does not choose the sourcing route or supplier award.</span></div><StatusTag value={mr.status} /></div>
      <div className="mr-s02-table-wrap"><table className="mr-s02-table mr-s02-review-table"><thead><tr><th>Line</th><th>Item / scope</th><th>Requested</th><th>Decision</th><th>Approved quantity</th></tr></thead><tbody>{mr.lines.map((line) => { const draft = decisions[line.mrLineId] ?? initial[line.mrLineId]; if (!draft) return null; return <tr key={line.mrLineId}><td className="mr-s02-mono">{line.lineNo}</td><td className="mr-s02-main-cell"><strong>{line.description}</strong><small>{line.specification ?? 'No additional specification'}</small></td><td>{line.requestedQuantity} {line.uomCode}</td><td><select value={draft.outcome} onChange={(event) => setDecisions((current) => ({ ...current, [line.mrLineId]: { ...draft, outcome: event.target.value as ReviewDraft['outcome'] } }))}><option value="APPROVED">Approve</option><option value="REJECTED">Reject</option></select></td><td><input className="mr-s02-qty-input" inputMode="decimal" disabled={draft.outcome === 'REJECTED'} value={draft.approvedQuantity} onChange={(event) => setDecisions((current) => ({ ...current, [line.mrLineId]: { ...draft, approvedQuantity: event.target.value } }))} /></td></tr>; })}</tbody></table></div>
      <label className="mr-s02-field mr-s02-review-comments"><span>Approval comments / reason</span><textarea rows={3} value={comments} onChange={(event) => setComments(event.target.value)} placeholder="Reason for reduced quantity, rejected item, approval condition or review note…" /></label>
      {review.isError ? <div className="mr-s02-error" role="alert"><strong>Approval could not be recorded</strong><span>{review.error.message}</span></div> : null}
      <div className="mr-s02-actions-right"><button className="erp-button erp-button--primary" type="button" disabled={review.isPending} onClick={() => review.mutate()}>{review.isPending ? 'Recording…' : 'Record approval decision'}</button></div>
    </section>
  );
}

function RouteEditor({ session, mr, line }: { readonly session: ErpDevelopmentSession; readonly mr: MaterialRequisitionDetail; readonly line: MaterialRequisitionDetail['lines'][number] }) {
  const client = useQueryClient();
  const [route, setRoute] = useState<ProcurementRoute>('COMPETITIVE_RFQ');
  const [justification, setJustification] = useState('');
  const routeMeta = routeCatalog.find((entry) => entry.value === route) ?? routeCatalog[0];
  const save = useMutation({
    mutationFn: () => { const payload: SetProcurementRouteRequest = { route, ...(justification.trim() ? { justification: justification.trim() } : {}) }; return apiJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/lines/${line.mrLineId}/route`, session, { method: 'POST', body: JSON.stringify(payload) }); },
    onSuccess: async () => { await Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]); },
  });
  return <div className="mr-s02-route-editor"><select value={route} onChange={(event) => { setRoute(event.target.value as ProcurementRoute); setJustification(''); }}>{routeCatalog.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}</select>{routeMeta?.requiresJustification ? <input value={justification} onChange={(event) => setJustification(event.target.value)} placeholder="Required route justification…" /> : null}<button className="erp-button erp-button--small erp-button--primary" type="button" disabled={save.isPending || Boolean(routeMeta?.requiresJustification && justification.trim().length < 10)} onClick={() => save.mutate()}>{save.isPending ? 'Setting…' : 'Set route'}</button>{save.isError ? <span className="mr-s02-inline-error">{save.error.message}</span> : null}</div>;
}

function SourcingPanel({ session, mr }: { readonly session: ErpDevelopmentSession; readonly mr: MaterialRequisitionDetail }) {
  const eligible = mr.lines.filter((line) => line.approvedQuantity !== null && line.lineState !== 'REJECTED');
  const canRoute = ['APPROVED', 'PARTIALLY_APPROVED'].includes(mr.status);
  return <div className="mr-s02-stack"><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Procurement route catalog</strong><span>These are real routing meanings, not future placeholder windows.</span></div></div><div className="mr-s02-route-catalog">{routeCatalog.map((entry) => <article key={entry.value}><strong>{entry.label}</strong><p>{entry.description}</p>{entry.requiresJustification ? <span>Justification required</span> : <span>Standard governed route</span>}</article>)}</div></section><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Sourcing decision by approved line</strong><span>Approval and sourcing are intentionally separate decisions.</span></div><span className="mr-s02-count">{eligible.length} eligible</span></div>{!canRoute ? <div className="mr-s02-empty"><strong>Sourcing is not open for this MR</strong><span>Approve at least one line first. Rejected or draft demand cannot be routed.</span></div> : null}{canRoute && eligible.length === 0 ? <div className="mr-s02-empty"><strong>No approved lines to source</strong><span>All lines were rejected or have no approved quantity.</span></div> : null}{canRoute && eligible.length > 0 ? <div className="mr-s02-route-lines">{eligible.map((line) => <article className="mr-s02-route-line" key={line.mrLineId}><div className="mr-s02-route-line-id"><span className="mr-s02-mono">{line.lineNo}</span><div><strong>{line.description}</strong><small>{line.approvedQuantity} {line.uomCode} approved</small></div></div>{line.routeDecision ? <div className="mr-s02-route-locked"><div><span>Route</span><strong>{routeLabel(line.routeDecision.route)}</strong></div><div><span>Decided by</span><strong>{line.routeDecision.decidedByName}</strong></div><div><span>Decided at</span><strong>{new Date(line.routeDecision.decidedAt).toLocaleString()}</strong></div>{line.routeDecision.justification ? <p>{line.routeDecision.justification}</p> : null}<small>Locked after routing. A future controlled reopen/change process must be explicit and audited; the approved view does not expose casual route changes.</small></div> : <RouteEditor session={session} mr={mr} line={line} />}</article>)}</div> : null}</section></div>;
}

function PrintSheet({ mr, suppliers }: { readonly mr: MaterialRequisitionDetail; readonly suppliers: SupplierListResponse['suppliers'] }) {
  const latestReview = mr.reviewTrail.at(-1);
  return <section className="mr-s02-print-sheet"><header className="mr-s02-print-head"><div><strong>CONSTRUCTION PROCUREMENT OS</strong><span>Material / Purchase Requisition</span></div><div><span>MR No.</span><strong>{mr.mrNumber}</strong><span>Status: {readable(mr.status)}</span></div></header><table className="mr-s02-print-meta"><tbody><tr><th>Project</th><td>{mr.projectCode} — {mr.projectName}</td><th>Request date</th><td>{mr.requestDate}</td></tr><tr><th>Requested by</th><td>{mr.requesterName}{mr.requesterTeam ? ` · ${mr.requesterTeam}` : ''}</td><th>Required supply date</th><td>{mr.requiredOnSiteDate}</td></tr><tr><th>Subject</th><td colSpan={3}>{mr.subject}</td></tr><tr><th>Remarks</th><td colSpan={3}>{mr.instructions ?? '—'}</td></tr></tbody></table><table className="mr-s02-print-lines"><thead><tr><th>No.</th><th>Description / specification</th><th>Qty</th><th>UOM</th><th>Required date</th><th>Proposed supplier</th><th>Remarks</th></tr></thead><tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td>{line.lineNo}</td><td><strong>{line.description}</strong>{line.specification ? <span>{line.specification}</span> : null}{[line.manufacturer, line.brand, line.model].filter(Boolean).length ? <span>{[line.manufacturer, line.brand, line.model].filter(Boolean).join(' · ')}</span> : null}</td><td>{line.requestedQuantity}</td><td>{line.uomCode}</td><td>{line.requiredDateOverride ?? mr.requiredOnSiteDate}</td><td>{supplierName(suppliers, line.preferredSupplierId)}</td><td>{line.technicalNotes ?? '—'}</td></tr>)}</tbody></table><footer className="mr-s02-print-signatures"><div><span>Requested by</span><strong>{mr.requesterName}</strong><i>Signature / date</i></div><div><span>Site / Department</span><strong>{mr.requesterTeam ?? '—'}</strong><i>Signature / date</i></div><div><span>Approved by</span><strong>{latestReview?.reviewerName ?? '—'}</strong><i>Signature / date</i></div><div><span>Procurement</span><strong>—</strong><i>Received / date</i></div></footer></section>;
}

function RequisitionDocument({ session, mrId, suppliers, onClose }: { readonly session: ErpDevelopmentSession; readonly mrId: string; readonly suppliers: SupplierListResponse['suppliers']; readonly onClose: () => void }) {
  const client = useQueryClient();
  const [tab, setTab] = useState<DocumentTab>('items');
  const query = useQuery({ queryKey: ['procurement-mr', session, mrId], queryFn: () => apiJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}`, session) });
  const submit = useMutation({ mutationFn: () => apiJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}/submit`, session, { method: 'POST' }), onSuccess: async () => { await Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]); setTab('approval'); } });
  if (query.isPending) return <div className="mr-s02-state">Opening requisition…</div>;
  if (query.isError) return <div className="mr-s02-state mr-s02-state--error"><strong>Requisition unavailable</strong><span>{query.error.message}</span><button className="erp-button" type="button" onClick={onClose}>Back</button></div>;
  const mr = query.data.requisition;
  const routedLines = mr.lines.filter((line) => line.routeDecision !== null).length;
  const approvedLines = mr.lines.filter((line) => ['APPROVED', 'PARTIALLY_APPROVED'].includes(line.lineState)).length;
  const rejectedLines = mr.lines.filter((line) => line.lineState === 'REJECTED').length;
  const latestReview = mr.reviewTrail.at(-1);
  return <article className="mr-s02-page mr-s02-document"><div className="mr-s02-screen"><header className="mr-s02-doc-head"><div><button className="mr-s02-back" type="button" onClick={onClose}>← Requisition register</button><div className="mr-s02-title-row"><span className="mr-s02-doc-chip">MR</span><h1>{mr.mrNumber}</h1><StatusTag value={mr.status} /></div><p>{mr.subject}</p></div><div className="mr-s02-head-actions">{mr.status === 'DRAFT' ? <button className="erp-button erp-button--primary" type="button" disabled={submit.isPending} onClick={() => submit.mutate()}>{submit.isPending ? 'Submitting…' : 'Submit for approval'}</button> : null}</div></header>{submit.isError ? <div className="mr-s02-error" role="alert"><strong>Submission failed</strong><span>{submit.error.message}</span></div> : null}<section className="mr-s02-summary-strip"><div><span>Project</span><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></div><div><span>Requester</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? 'No team recorded'}</small></div><div><span>Request date</span><strong>{mr.requestDate}</strong></div><div><span>Required supply / on-site</span><strong>{mr.requiredOnSiteDate}</strong></div><div><span>Priority</span><StatusTag value={mr.priority} /></div><div><span>Items</span><strong>{mr.lineCount}</strong><small>{approvedLines} approved · {rejectedLines} rejected · {routedLines} routed</small></div></section><nav className="mr-s02-tabs" aria-label="Requisition sections">{([['overview', 'Overview'], ['items', `Items (${mr.lineCount})`], ['approval', 'Approval'], ['sourcing', 'Sourcing'], ['history', `History (${mr.reviewTrail.length})`]] as const).map(([value, label]) => <button key={value} className={tab === value ? 'mr-s02-tab mr-s02-tab--active' : 'mr-s02-tab'} type="button" onClick={() => setTab(value)}>{label}</button>)}</nav>{tab === 'overview' ? <div className="mr-s02-stack"><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Request details</strong><span>Original internal demand</span></div></div><div className="mr-s02-detail-grid"><div><span>Subject</span><strong>{mr.subject}</strong></div><div><span>Current state</span><StatusTag value={mr.status} /></div><div><span>Requested by</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? '—'}</small></div><div><span>Required supply / on-site date</span><strong>{mr.requiredOnSiteDate}</strong></div><div className="mr-s02-span2"><span>Remarks / instructions</span><strong>{mr.instructions ?? 'No remarks recorded.'}</strong></div></div></section><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Current control state</strong><span>What has happened to this demand</span></div></div><div className="mr-s02-control-grid"><div><span>Submission</span><strong>{mr.status === 'DRAFT' ? 'Draft — not submitted' : `Submitted${mr.submittedAt ? ` · ${new Date(mr.submittedAt).toLocaleString()}` : ''}`}</strong></div><div><span>Approval</span><strong>{latestReview ? `${readable(latestReview.decision)} by ${latestReview.reviewerName}` : ['SUBMITTED', 'UNDER_REVIEW'].includes(mr.status) ? 'Awaiting approval' : 'No approval occurrence'}</strong></div><div><span>Sourcing route</span><strong>{routedLines} of {approvedLines} approved line{approvedLines === 1 ? '' : 's'} routed</strong></div></div></section></div> : null}{tab === 'items' ? <section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Requested items / scope</strong><span>The core MR schedule. Supplier suggestion is informative only.</span></div><button className="erp-button erp-button--ghost erp-button--small" type="button" onClick={() => window.print()}>Print item schedule / PDF</button></div><div className="mr-s02-table-wrap"><table className="mr-s02-table mr-s02-items-table"><thead><tr><th>Line</th><th>Description / specification</th><th>Requested</th><th>Required date</th><th>Proposed supplier</th><th>Make / model</th><th>Approved</th><th>State</th></tr></thead><tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td className="mr-s02-mono">{line.lineNo}</td><td className="mr-s02-main-cell"><strong>{line.description}</strong><small>{line.specification ?? 'No additional specification'}</small>{line.technicalNotes ? <small className="mr-s02-note">{line.technicalNotes}</small> : null}</td><td><strong>{line.requestedQuantity} {line.uomCode}</strong></td><td>{line.requiredDateOverride ?? mr.requiredOnSiteDate}</td><td>{supplierName(suppliers, line.preferredSupplierId)}</td><td>{[line.manufacturer, line.brand, line.model].filter(Boolean).join(' · ') || '—'}<small>{readable(line.equivalentRule)}</small></td><td>{line.approvedQuantity === null ? '—' : `${line.approvedQuantity} ${line.uomCode}`}</td><td><StatusTag value={line.lineState} /></td></tr>)}</tbody></table></div></section> : null}{tab === 'approval' ? <ApprovalPanel session={session} mr={mr} /> : null}{tab === 'sourcing' ? <SourcingPanel session={session} mr={mr} /> : null}{tab === 'history' ? <div className="mr-s02-stack"><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Approval history</strong><span>Governed decision occurrences</span></div></div>{mr.reviewTrail.length === 0 ? <div className="mr-s02-empty"><strong>No approval history yet</strong><span>A submitted MR will show its recorded decision here.</span></div> : <div className="mr-s02-history">{mr.reviewTrail.map((entry) => <article key={entry.reviewOccurrenceId}><time>{new Date(entry.occurredAt).toLocaleString()}</time><StatusTag value={entry.decision} /><div><strong>{entry.reviewerName}</strong><span>{entry.comments ?? 'No decision comment'}</span></div></article>)}</div>}</section><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Current sourcing decisions</strong><span>Current route state per line; superseded-route history will belong to a future controlled reopen capability.</span></div></div><div className="mr-s02-history">{mr.lines.filter((line) => line.routeDecision).map((line) => <article key={line.mrLineId}><time>{line.routeDecision ? new Date(line.routeDecision.decidedAt).toLocaleString() : ''}</time><span className="mr-s02-route-badge">{line.routeDecision ? routeLabel(line.routeDecision.route) : ''}</span><div><strong>{line.lineNo} · {line.description}</strong><span>{line.routeDecision ? `${line.routeDecision.decidedByName}${line.routeDecision.justification ? ` · ${line.routeDecision.justification}` : ''}` : ''}</span></div></article>)}</div>{mr.lines.every((line) => !line.routeDecision) ? <div className="mr-s02-empty"><strong>No sourcing route recorded</strong><span>Routes are set only after demand approval.</span></div> : null}</section></div> : null}</div><PrintSheet mr={mr} suppliers={suppliers} /></article>;
}

export function ErpRequisitionWorkspace({ session, projects, projectScopeId }: ErpRequisitionWorkspaceProps) {
  const [selectedMrId, setSelectedMrId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const mrs = useQuery({ queryKey: ['procurement-mrs', session], queryFn: () => apiJson<MaterialRequisitionListResponse>('/procurement/requisitions', session) });
  const suppliers = useQuery({ queryKey: ['procurement-suppliers', session], queryFn: () => apiJson<SupplierListResponse>('/procurement/suppliers', session) });
  const references = useQuery({ queryKey: ['procurement-reference-data', session], queryFn: () => apiJson<ProcurementReferenceDataResponse>('/procurement/reference-data', session) });
  const selectedProjectCode = projectScopeId ? projects.find((project) => project.projectId === projectScopeId)?.projectCode ?? null : null;
  const filtered = useMemo(() => { const term = search.trim().toLowerCase(); return (mrs.data?.requisitions ?? []).filter((mr) => { if (selectedProjectCode && mr.projectCode !== selectedProjectCode) return false; if (status !== 'ALL' && mr.status !== status) return false; if (priority !== 'ALL' && mr.priority !== priority) return false; if (!term) return true; return [mr.mrNumber, mr.subject, mr.projectCode, mr.projectName, mr.requesterName].join(' ').toLowerCase().includes(term); }); }, [mrs.data, priority, search, selectedProjectCode, status]);
  const all = mrs.data?.requisitions ?? [];
  const pending = all.filter((mr) => ['SUBMITTED', 'UNDER_REVIEW'].includes(mr.status)).length;
  const approved = all.filter((mr) => ['APPROVED', 'PARTIALLY_APPROVED'].includes(mr.status)).length;
  const urgent = all.filter((mr) => mr.priority === 'URGENT' || mr.priority === 'HIGH').length;
  if (creating) {
    if (references.isPending) return <div className="mr-s02-page mr-s02-state"><strong>Loading MR master data…</strong><span>Units of measure are required before the line editor can open.</span><button className="erp-button" type="button" onClick={() => setCreating(false)}>Back</button></div>;
    if (references.isError) return <div className="mr-s02-page mr-s02-state mr-s02-state--error"><strong>New MR cannot open because reference data failed to load</strong><span>{references.error.message}</span><div><button className="erp-button" type="button" onClick={() => references.refetch()}>Retry</button><button className="erp-button erp-button--ghost" type="button" onClick={() => setCreating(false)}>Back</button></div></div>;
    if (!references.data) return <div className="mr-s02-page mr-s02-state"><strong>MR master data is not ready</strong><span>Retry the reference-data request before creating a requisition.</span><button className="erp-button" type="button" onClick={() => references.refetch()}>Retry</button></div>;
    return <CreateRequisition session={session} projects={projects} suppliers={suppliers.data?.suppliers ?? []} references={references.data} onClose={() => setCreating(false)} onCreated={(mrId) => { setCreating(false); setSelectedMrId(mrId); }} />;
  }
  if (selectedMrId) return <RequisitionDocument session={session} mrId={selectedMrId} suppliers={suppliers.data?.suppliers ?? []} onClose={() => setSelectedMrId(null)} />;
  return <section className="mr-s02-page mr-s02-register mr-s02-screen"><header className="mr-s02-register-head"><div><span className="mr-s02-breadcrumb">Procurement / Demand</span><div className="mr-s02-title-row"><h1>Material / Purchase Requisitions</h1><span className="mr-s02-count">{all.length} records</span></div><p>Project demand from site or procurement, kept separate from approval, sourcing and downstream commitment.</p></div><button className="erp-button erp-button--primary" type="button" disabled={projects.length === 0} onClick={() => setCreating(true)}>+ New MR</button></header><div className="mr-s02-kpis"><div><span>Total MRs</span><strong>{all.length}</strong></div><div><span>Awaiting approval</span><strong>{pending}</strong></div><div><span>Approved demand</span><strong>{approved}</strong></div><div><span>High / urgent</span><strong>{urgent}</strong></div></div><div className="mr-s02-toolbar"><label className="mr-s02-search"><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="MR number, subject, project, requester…" /></label><label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="ALL">All statuses</option><option value="DRAFT">Draft</option><option value="SUBMITTED">Submitted</option><option value="UNDER_REVIEW">Under review</option><option value="APPROVED">Approved</option><option value="PARTIALLY_APPROVED">Partially approved</option><option value="REJECTED">Rejected</option></select></label><label><span>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)}><option value="ALL">All priorities</option><option value="URGENT">Urgent</option><option value="HIGH">High</option><option value="NORMAL">Normal</option><option value="LOW">Low</option></select></label><button className="erp-button erp-button--ghost erp-button--small" type="button" onClick={() => { setSearch(''); setStatus('ALL'); setPriority('ALL'); }}>Clear</button></div>{references.isError ? <div className="mr-s02-warning"><strong>MR reference data is unavailable.</strong><span>Existing MRs remain readable, but creating a new MR requires UOM master data.</span><button className="erp-button erp-button--small" type="button" onClick={() => references.refetch()}>Retry</button></div> : null}{suppliers.isError ? <div className="mr-s02-warning"><strong>Supplier master is unavailable.</strong><span>MRs remain usable; proposed-supplier names may not resolve until supplier data reloads.</span><button className="erp-button erp-button--small" type="button" onClick={() => suppliers.refetch()}>Retry</button></div> : null}{mrs.isPending ? <div className="mr-s02-state">Loading requisition register…</div> : null}{mrs.isError ? <div className="mr-s02-state mr-s02-state--error"><strong>Requisition register unavailable</strong><span>{mrs.error.message}</span><button className="erp-button" type="button" onClick={() => mrs.refetch()}>Retry</button></div> : null}{mrs.data && filtered.length === 0 ? <div className="mr-s02-empty"><strong>No matching requisitions</strong><span>Change the filters or create a new project demand request.</span></div> : null}{filtered.length > 0 ? <div className="mr-s02-table-wrap mr-s02-register-table"><table className="mr-s02-table"><thead><tr><th>MR</th><th>Subject / demand</th><th>Project</th><th>Requester</th><th>Request date</th><th>Required supply</th><th>Priority</th><th>Items</th><th>Status</th></tr></thead><tbody>{filtered.map((mr) => <tr key={mr.mrId} tabIndex={0} onClick={() => setSelectedMrId(mr.mrId)} onKeyDown={(event) => { if (event.key === 'Enter') setSelectedMrId(mr.mrId); }}><td><strong className="mr-s02-mono mr-s02-doc-link">{mr.mrNumber}</strong></td><td className="mr-s02-main-cell"><strong>{mr.subject}</strong></td><td><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></td><td>{mr.requesterName}</td><td>{mr.requestDate}</td><td><NeedDate value={mr.requiredOnSiteDate} /></td><td><StatusTag value={mr.priority} /></td><td className="mr-s02-number">{mr.lineCount}</td><td><StatusTag value={mr.status} /></td></tr>)}</tbody></table></div> : null}</section>;
}
