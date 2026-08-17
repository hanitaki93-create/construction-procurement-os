import { useMemo, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  CreateMaterialRequisitionRequest,
  CreateMaterialRequisitionResponse,
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

type Requisition = MaterialRequisitionDetailResponse['requisition'];
type RequisitionLine = Requisition['lines'][number];
type DocumentTab = 'overview' | 'items' | 'approval' | 'sourcing' | 'history';
type EquivalentRule = 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';

type DraftLine = {
  id: string;
  lineType: MrLineType;
  description: string;
  specification: string;
  quantity: string;
  uomCode: string;
  requiredDateOverride: string;
  proposedSupplierId: string;
  manufacturer: string;
  brand: string;
  model: string;
  equivalentRule: EquivalentRule;
  technicalNotes: string;
};

type ReviewDraft = { outcome: 'APPROVED' | 'REJECTED'; approvedQuantity: string };

const routes: readonly {
  value: ProcurementRoute;
  label: string;
  description: string;
  justification: boolean;
}[] = [
  { value: 'COMPETITIVE_RFQ', label: 'Competitive RFQ / tender', description: 'Run competition, collect supplier responses and compare commercial offers.', justification: false },
  { value: 'PACKAGE_SOURCING', label: 'Package sourcing', description: 'Bundle this approved demand with related project demand before tendering.', justification: false },
  { value: 'DIRECT_ORDER', label: 'Direct order', description: 'Procure without a competitive RFQ where policy permits. A reason is required.', justification: true },
  { value: 'SOLE_SOURCE_EXCEPTION', label: 'Sole-source exception', description: 'Use one supplier under an approved non-competitive exception. A reason is required.', justification: true },
  { value: 'EXTERNAL_ERP_STOCK', label: 'Stock / external fulfillment', description: 'Satisfy demand from stock or another governed system instead of CPOS sourcing.', justification: true },
];

function headers(session: ErpDevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

async function json<T>(url: string, session: ErpDevelopmentSession, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { ...headers(session), ...(init?.headers ?? {}) } });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string; code?: string };
      message = body.message ?? body.code ?? message;
    } catch {
      // Keep the HTTP fallback.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

function readable(value: string): string {
  return value.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (x) => x.toUpperCase());
}

function Status({ value }: { value: string }) {
  const tone = ['APPROVED', 'FULFILLED', 'ACTIVE'].includes(value)
    ? 'ok'
    : ['SUBMITTED', 'UNDER_REVIEW', 'PARTIALLY_APPROVED', 'HIGH', 'URGENT'].includes(value)
      ? 'warn'
      : ['REJECTED', 'CANCELLED', 'EXPIRED'].includes(value)
        ? 'danger'
        : 'neutral';
  return <span className={`erp-status erp-status--${tone}`}>{readable(value)}</span>;
}

function routeName(route: ProcurementRoute): string {
  return routes.find((item) => item.value === route)?.label ?? readable(route);
}

function supplierName(suppliers: SupplierListResponse['suppliers'], id: string | null): string {
  if (!id) return '—';
  const supplier = suppliers.find((item) => item.supplierId === id);
  return supplier ? `${supplier.supplierCode} — ${supplier.legalName}` : 'Supplier reference';
}

function futureDate(days: number): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function NeedDate({ value }: { value: string }) {
  const wanted = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Number.isNaN(wanted.getTime()) ? null : Math.ceil((wanted.getTime() - today.getTime()) / 86_400_000);
  const cls = days !== null && days < 0 ? 'mr-s02-date mr-s02-date--late' : days !== null && days <= 7 ? 'mr-s02-date mr-s02-date--soon' : 'mr-s02-date';
  return <span className={cls}><strong>{value}</strong><small>{days === null ? '' : days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'Today' : `${days}d remaining`}</small></span>;
}

function blankLine(uom = 'EA'): DraftLine {
  return {
    id: crypto.randomUUID(), lineType: 'MATERIAL', description: '', specification: '', quantity: '1', uomCode: uom,
    requiredDateOverride: '', proposedSupplierId: '', manufacturer: '', brand: '', model: '',
    equivalentRule: 'ALTERNATE_BY_APPROVAL', technicalNotes: '',
  };
}

function NewRequisition({
  session, projects, suppliers, refs, onBack, onCreated,
}: {
  session: ErpDevelopmentSession;
  projects: readonly WorkspaceProject[];
  suppliers: SupplierListResponse['suppliers'];
  refs: ProcurementReferenceDataResponse;
  onBack: () => void;
  onCreated: (id: string) => void;
}) {
  const client = useQueryClient();
  const [projectId, setProjectId] = useState(projects[0]?.projectId ?? '');
  const [requiredDate, setRequiredDate] = useState(() => futureDate(14));
  const [priority, setPriority] = useState<MrPriority>('NORMAL');
  const [subject, setSubject] = useState('');
  const [team, setTeam] = useState('');
  const [remarks, setRemarks] = useState('');
  const [lines, setLines] = useState<DraftLine[]>([blankLine(refs.uoms[0]?.code ?? 'EA')]);
  const [validation, setValidation] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () => {
      const body: CreateMaterialRequisitionRequest = {
        projectId, requiredOnSiteDate: requiredDate, priority, subject: subject.trim(),
        ...(team.trim() ? { requesterTeam: team.trim() } : {}),
        ...(remarks.trim() ? { instructions: remarks.trim() } : {}),
        lines: lines.map((line) => ({
          entryMode: 'FREE_FORM', lineType: line.lineType, description: line.description.trim(),
          requestedQuantity: line.quantity.trim(), uomCode: line.uomCode,
          ...(line.specification.trim() ? { specification: line.specification.trim() } : {}),
          ...(line.requiredDateOverride ? { requiredDateOverride: line.requiredDateOverride } : {}),
          ...(line.proposedSupplierId ? { preferredSupplierId: line.proposedSupplierId } : {}),
          ...(line.manufacturer.trim() ? { manufacturer: line.manufacturer.trim() } : {}),
          ...(line.brand.trim() ? { brand: line.brand.trim() } : {}),
          ...(line.model.trim() ? { model: line.model.trim() } : {}),
          equivalentRule: line.equivalentRule,
          ...(line.technicalNotes.trim() ? { technicalNotes: line.technicalNotes.trim() } : {}),
        })),
      };
      return json<CreateMaterialRequisitionResponse>('/procurement/requisitions', session, { method: 'POST', body: JSON.stringify(body) });
    },
    onSuccess: async (result) => {
      await client.invalidateQueries({ queryKey: ['procurement-mrs', session] });
      onCreated(result.requisition.mrId);
    },
  });

  function patch(id: string, change: Partial<Omit<DraftLine, 'id'>>) {
    setLines((current) => current.map((line) => line.id === id ? { ...line, ...change } : line));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidation(null);
    if (!projectId || !requiredDate || !subject.trim()) return setValidation('Project, subject and required supply date are required.');
    if (lines.some((line) => !line.description.trim() || Number(line.quantity) <= 0)) return setValidation('Every line needs a description and positive quantity.');
    create.mutate();
  }

  return <form className="mr-s02-page mr-s02-create mr-s02-screen" onSubmit={submit}>
    <header className="mr-s02-doc-head"><div><button className="mr-s02-back" type="button" onClick={onBack}>← Requisition register</button><div className="mr-s02-title-row"><span className="mr-s02-doc-chip">MR</span><h1>New material / purchase requisition</h1><Status value="DRAFT" /></div><p>Internal project demand. A proposed supplier is informative only and does not constitute sourcing approval or award.</p></div><div className="mr-s02-head-actions"><button className="erp-button erp-button--ghost" type="button" onClick={onBack}>Cancel</button><button className="erp-button erp-button--primary" type="submit" disabled={create.isPending}>{create.isPending ? 'Saving…' : 'Save draft MR'}</button></div></header>
    {(validation || create.isError) ? <div className="mr-s02-error" role="alert"><strong>MR could not be saved</strong><span>{validation ?? create.error?.message}</span></div> : null}
    <section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Request information</strong><span>Who needs what, where and when</span></div></div><div className="mr-s02-form-grid">
      <label className="mr-s02-field mr-s02-span2"><span>Project *</span><select value={projectId} onChange={(e) => setProjectId(e.target.value)}>{projects.map((p) => <option key={p.projectId} value={p.projectId}>{p.projectCode} — {p.displayName}</option>)}</select></label>
      <label className="mr-s02-field"><span>Required supply / on-site date *</span><input type="date" value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} /></label>
      <label className="mr-s02-field"><span>Priority</span><select value={priority} onChange={(e) => setPriority(e.target.value as MrPriority)}><option value="LOW">Low</option><option value="NORMAL">Normal</option><option value="HIGH">High</option><option value="URGENT">Urgent</option></select></label>
      <label className="mr-s02-field mr-s02-span3"><span>Subject *</span><input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Site timber, tools and fixing materials" /></label>
      <label className="mr-s02-field"><span>Requesting team / department</span><input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Site / MEP / Civil / Procurement" /></label>
      <label className="mr-s02-field mr-s02-span4"><span>Remarks / site instructions</span><textarea rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Purpose, site contact, delivery constraint, drawing reference, urgency reason…" /></label>
    </div></section>
    <section className="mr-s02-card mr-s02-line-editor"><div className="mr-s02-section-head"><div><strong>Requested items / scope</strong><span>{lines.length} line{lines.length === 1 ? '' : 's'}</span></div><button className="erp-button erp-button--small" type="button" onClick={() => setLines((x) => [...x, blankLine(refs.uoms[0]?.code ?? 'EA')])}>+ Add line</button></div>
      {lines.map((line, index) => <article className="mr-s02-edit-line" key={line.id}>
        <div className="mr-s02-edit-line-top"><span className="mr-s02-line-index">{String((index + 1) * 10).padStart(2, '0')}</span><label className="mr-s02-field mr-s02-line-description"><span>Description *</span><input value={line.description} onChange={(e) => patch(line.id, { description: e.target.value })} /></label><label className="mr-s02-field"><span>Type</span><select value={line.lineType} onChange={(e) => patch(line.id, { lineType: e.target.value as MrLineType })}><option value="MATERIAL">Material</option><option value="SERVICE">Service</option><option value="SUBCONTRACT_SCOPE">Subcontract scope</option><option value="EQUIPMENT">Equipment</option><option value="OTHER">Other</option></select></label><label className="mr-s02-field"><span>Qty *</span><input inputMode="decimal" value={line.quantity} onChange={(e) => patch(line.id, { quantity: e.target.value })} /></label><label className="mr-s02-field"><span>UOM</span><select value={line.uomCode} onChange={(e) => patch(line.id, { uomCode: e.target.value })}>{refs.uoms.map((u) => <option key={u.code} value={u.code}>{u.code}</option>)}</select></label><label className="mr-s02-field"><span>Line required date</span><input type="date" value={line.requiredDateOverride} onChange={(e) => patch(line.id, { requiredDateOverride: e.target.value })} /></label><button className="mr-s02-remove" type="button" disabled={lines.length === 1} onClick={() => setLines((x) => x.filter((item) => item.id !== line.id))}>×</button></div>
        <div className="mr-s02-edit-line-details"><label className="mr-s02-field mr-s02-span2"><span>Specification / size / drawing reference</span><input value={line.specification} onChange={(e) => patch(line.id, { specification: e.target.value })} /></label><label className="mr-s02-field mr-s02-span2"><span>Proposed supplier <em>optional, non-binding</em></span><select value={line.proposedSupplierId} onChange={(e) => patch(line.id, { proposedSupplierId: e.target.value })}><option value="">No proposed supplier</option>{suppliers.map((s) => <option key={s.supplierId} value={s.supplierId}>{s.supplierCode} — {s.legalName}</option>)}</select></label><label className="mr-s02-field"><span>Manufacturer</span><input value={line.manufacturer} onChange={(e) => patch(line.id, { manufacturer: e.target.value })} /></label><label className="mr-s02-field"><span>Brand</span><input value={line.brand} onChange={(e) => patch(line.id, { brand: e.target.value })} /></label><label className="mr-s02-field"><span>Model / supplier item ref</span><input value={line.model} onChange={(e) => patch(line.id, { model: e.target.value })} /></label><label className="mr-s02-field"><span>Equivalent rule</span><select value={line.equivalentRule} onChange={(e) => patch(line.id, { equivalentRule: e.target.value as EquivalentRule })}><option value="ALTERNATE_BY_APPROVAL">Alternate by approval</option><option value="APPROVED_EQUIVALENT_ALLOWED">Approved equivalent allowed</option><option value="EXACT_ONLY">Exact only</option></select></label><label className="mr-s02-field mr-s02-span4"><span>Line remarks / technical notes</span><input value={line.technicalNotes} onChange={(e) => patch(line.id, { technicalNotes: e.target.value })} /></label></div>
      </article>)}
    </section><footer className="mr-s02-create-footer"><span>Save creates a DRAFT. Submission and approval remain separate governed actions.</span><button className="erp-button erp-button--primary" type="submit" disabled={create.isPending}>{create.isPending ? 'Saving…' : 'Save draft MR'}</button></footer>
  </form>;
}

function Approval({ session, mr }: { session: ErpDevelopmentSession; mr: Requisition }) {
  const client = useQueryClient();
  const reviewable = mr.status === 'SUBMITTED' || mr.status === 'UNDER_REVIEW';
  const seed = useMemo(() => Object.fromEntries(mr.lines.map((line) => [line.mrLineId, { outcome: 'APPROVED' as const, approvedQuantity: line.requestedQuantity }])) as Record<string, ReviewDraft>, [mr.lines]);
  const [drafts, setDrafts] = useState(seed);
  const [comments, setComments] = useState('');
  const mutation = useMutation({
    mutationFn: () => {
      const body: ReviewMaterialRequisitionRequest = { lineDecisions: mr.lines.map((line) => { const d = drafts[line.mrLineId] ?? { outcome: 'APPROVED' as const, approvedQuantity: line.requestedQuantity }; return d.outcome === 'REJECTED' ? { mrLineId: line.mrLineId, outcome: 'REJECTED' as const } : { mrLineId: line.mrLineId, outcome: 'APPROVED' as const, approvedQuantity: d.approvedQuantity }; }), ...(comments.trim() ? { comments: comments.trim() } : {}) };
      return json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/review`, session, { method: 'POST', body: JSON.stringify(body) });
    },
    onSuccess: async () => Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]),
  });
  if (!reviewable) {
    const latest = mr.reviewTrail.at(-1);
    return <section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Approval decision</strong><span>Demand decision is closed in the current state</span></div><Status value={mr.status} /></div>{latest ? <div className="mr-s02-approval-summary"><div><span>Decision</span><strong>{readable(latest.decision)}</strong></div><div><span>Approver</span><strong>{latest.reviewerName}</strong></div><div><span>Time</span><strong>{new Date(latest.occurredAt).toLocaleString()}</strong></div><div><span>Comments</span><strong>{latest.comments ?? 'No comment'}</strong></div></div> : <div className="mr-s02-empty"><strong>{mr.status === 'DRAFT' ? 'Not submitted yet' : 'No approval occurrence on this seeded record'}</strong><span>Approval controls appear only while the MR is Submitted or Under Review.</span></div>}<div className="mr-s02-table-wrap"><table className="mr-s02-table"><thead><tr><th>Line</th><th>Item</th><th>Requested</th><th>Approved</th><th>State</th></tr></thead><tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td>{line.lineNo}</td><td className="mr-s02-main-cell"><strong>{line.description}</strong></td><td>{line.requestedQuantity} {line.uomCode}</td><td>{line.approvedQuantity ?? '—'} {line.approvedQuantity ? line.uomCode : ''}</td><td><Status value={line.lineState} /></td></tr>)}</tbody></table></div></section>;
  }
  return <section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Approve project demand</strong><span>Approval authorizes demand quantity; it does not choose supplier or sourcing route.</span></div><Status value={mr.status} /></div><div className="mr-s02-table-wrap"><table className="mr-s02-table mr-s02-review-table"><thead><tr><th>Line</th><th>Item / specification</th><th>Requested</th><th>Decision</th><th>Approved qty</th></tr></thead><tbody>{mr.lines.map((line) => { const d = drafts[line.mrLineId] ?? seed[line.mrLineId]; if (!d) return null; return <tr key={line.mrLineId}><td>{line.lineNo}</td><td className="mr-s02-main-cell"><strong>{line.description}</strong><small>{line.specification ?? '—'}</small></td><td>{line.requestedQuantity} {line.uomCode}</td><td><select value={d.outcome} onChange={(e) => setDrafts((x) => ({ ...x, [line.mrLineId]: { ...d, outcome: e.target.value as ReviewDraft['outcome'] } }))}><option value="APPROVED">Approve</option><option value="REJECTED">Reject</option></select></td><td><input disabled={d.outcome === 'REJECTED'} value={d.approvedQuantity} onChange={(e) => setDrafts((x) => ({ ...x, [line.mrLineId]: { ...d, approvedQuantity: e.target.value } }))} /></td></tr>; })}</tbody></table></div><label className="mr-s02-field mr-s02-review-comments"><span>Approval comments / reason</span><textarea rows={3} value={comments} onChange={(e) => setComments(e.target.value)} /></label>{mutation.isError ? <div className="mr-s02-error"><strong>Approval failed</strong><span>{mutation.error.message}</span></div> : null}<div className="mr-s02-actions-right"><button className="erp-button erp-button--primary" type="button" disabled={mutation.isPending} onClick={() => mutation.mutate()}>{mutation.isPending ? 'Recording…' : 'Record approval decision'}</button></div></section>;
}

function RouteChooser({ session, mr, line }: { session: ErpDevelopmentSession; mr: Requisition; line: RequisitionLine }) {
  const client = useQueryClient();
  const [route, setRoute] = useState<ProcurementRoute>('COMPETITIVE_RFQ');
  const [reason, setReason] = useState('');
  const meta = routes.find((item) => item.value === route) ?? routes[0]!;
  const mutation = useMutation({ mutationFn: () => { const body: SetProcurementRouteRequest = { route, ...(reason.trim() ? { justification: reason.trim() } : {}) }; return json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/lines/${line.mrLineId}/route`, session, { method: 'POST', body: JSON.stringify(body) }); }, onSuccess: async () => Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]) });
  return <div className="mr-s02-route-editor"><select value={route} onChange={(e) => { setRoute(e.target.value as ProcurementRoute); setReason(''); }}>{routes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>{meta.justification ? <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Required justification…" /> : <span /> }<button className="erp-button erp-button--primary erp-button--small" type="button" disabled={mutation.isPending || (meta.justification && reason.trim().length < 10)} onClick={() => mutation.mutate()}>Set route</button>{mutation.isError ? <span className="mr-s02-inline-error">{mutation.error.message}</span> : null}</div>;
}

function Sourcing({ session, mr }: { session: ErpDevelopmentSession; mr: Requisition }) {
  const eligible = mr.lines.filter((line) => line.approvedQuantity !== null && line.lineState !== 'REJECTED');
  const open = mr.status === 'APPROVED' || mr.status === 'PARTIALLY_APPROVED';
  return <div className="mr-s02-stack"><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Procurement route meanings</strong><span>All five options are governed route meanings, not placeholder screens.</span></div></div><div className="mr-s02-route-catalog">{routes.map((item) => <article key={item.value}><strong>{item.label}</strong><p>{item.description}</p><span>{item.justification ? 'Justification required' : 'Standard route'}</span></article>)}</div></section><section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Sourcing by approved line</strong><span>Approval and sourcing remain separate decisions.</span></div></div>{!open ? <div className="mr-s02-empty"><strong>Sourcing is not open</strong><span>The MR must have approved demand first.</span></div> : <div className="mr-s02-route-lines">{eligible.map((line) => <article className="mr-s02-route-line" key={line.mrLineId}><div className="mr-s02-route-line-id"><span>{line.lineNo}</span><div><strong>{line.description}</strong><small>{line.approvedQuantity} {line.uomCode} approved</small></div></div>{line.routeDecision ? <div className="mr-s02-route-locked"><div><span>Route</span><strong>{routeName(line.routeDecision.route)}</strong></div><div><span>Decided by</span><strong>{line.routeDecision.decidedByName}</strong></div><div><span>Decided at</span><strong>{new Date(line.routeDecision.decidedAt).toLocaleString()}</strong></div>{line.routeDecision.justification ? <p>{line.routeDecision.justification}</p> : null}<small>Locked. Changing an established route requires a future controlled reopen/revision action; casual replacement is blocked.</small></div> : <RouteChooser session={session} mr={mr} line={line} />}</article>)}</div>}</section></div>;
}

function PrintSheet({ mr, suppliers }: { mr: Requisition; suppliers: SupplierListResponse['suppliers'] }) {
  const reviewer = mr.reviewTrail.at(-1)?.reviewerName ?? '—';
  return <section className="mr-s02-print-sheet"><header className="mr-s02-print-head"><div><strong>CONSTRUCTION PROCUREMENT OS</strong><span>Material / Purchase Requisition</span></div><div><span>MR No.</span><strong>{mr.mrNumber}</strong><span>Status: {readable(mr.status)}</span></div></header><table className="mr-s02-print-meta"><tbody><tr><th>Project</th><td>{mr.projectCode} — {mr.projectName}</td><th>Request date</th><td>{mr.requestDate}</td></tr><tr><th>Requested by</th><td>{mr.requesterName}{mr.requesterTeam ? ` · ${mr.requesterTeam}` : ''}</td><th>Required supply date</th><td>{mr.requiredOnSiteDate}</td></tr><tr><th>Subject</th><td colSpan={3}>{mr.subject}</td></tr><tr><th>Remarks</th><td colSpan={3}>{mr.instructions ?? '—'}</td></tr></tbody></table><table className="mr-s02-print-lines"><thead><tr><th>No.</th><th>Description / specification</th><th>Qty</th><th>UOM</th><th>Required date</th><th>Proposed supplier</th><th>Remarks</th></tr></thead><tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td>{line.lineNo}</td><td><strong>{line.description}</strong>{line.specification ? <span>{line.specification}</span> : null}{[line.manufacturer, line.brand, line.model].filter(Boolean).length ? <span>{[line.manufacturer, line.brand, line.model].filter(Boolean).join(' · ')}</span> : null}</td><td>{line.requestedQuantity}</td><td>{line.uomCode}</td><td>{line.requiredDateOverride ?? mr.requiredOnSiteDate}</td><td>{supplierName(suppliers, line.preferredSupplierId)}</td><td>{line.technicalNotes ?? '—'}</td></tr>)}</tbody></table><footer className="mr-s02-print-signatures"><div><span>Requested by</span><strong>{mr.requesterName}</strong><i>Signature / date</i></div><div><span>Site / Department</span><strong>{mr.requesterTeam ?? '—'}</strong><i>Signature / date</i></div><div><span>Approved by</span><strong>{reviewer}</strong><i>Signature / date</i></div><div><span>Procurement</span><strong>—</strong><i>Received / date</i></div></footer></section>;
}

function Document({ session, mrId, suppliers, onBack }: { session: ErpDevelopmentSession; mrId: string; suppliers: SupplierListResponse['suppliers']; onBack: () => void }) {
  const client = useQueryClient();
  const [tab, setTab] = useState<DocumentTab>('items');
  const query = useQuery({ queryKey: ['procurement-mr', session, mrId], queryFn: () => json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}`, session) });
  const submit = useMutation({ mutationFn: () => json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}/submit`, session, { method: 'POST' }), onSuccess: async () => { await Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]); setTab('approval'); } });
  if (query.isPending) return <div className="mr-s02-state">Opening requisition…</div>;
  if (query.isError) return <div className="mr-s02-state mr-s02-state--error"><strong>Requisition unavailable</strong><span>{query.error.message}</span><button className="erp-button" type="button" onClick={onBack}>Back</button></div>;
  const mr = query.data.requisition;
  const approved = mr.lines.filter((line) => ['APPROVED', 'PARTIALLY_APPROVED'].includes(line.lineState)).length;
  const routed = mr.lines.filter((line) => line.routeDecision !== null).length;
  return <article className="mr-s02-page mr-s02-document"><div className="mr-s02-screen"><header className="mr-s02-doc-head"><div><button className="mr-s02-back" type="button" onClick={onBack}>← Requisition register</button><div className="mr-s02-title-row"><span className="mr-s02-doc-chip">MR</span><h1>{mr.mrNumber}</h1><Status value={mr.status} /></div><p>{mr.subject}</p></div>{mr.status === 'DRAFT' ? <button className="erp-button erp-button--primary" type="button" disabled={submit.isPending} onClick={() => submit.mutate()}>{submit.isPending ? 'Submitting…' : 'Submit for approval'}</button> : null}</header><section className="mr-s02-summary-strip"><div><span>Project</span><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></div><div><span>Requester</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? '—'}</small></div><div><span>Request date</span><strong>{mr.requestDate}</strong></div><div><span>Required supply</span><strong>{mr.requiredOnSiteDate}</strong></div><div><span>Priority</span><Status value={mr.priority} /></div><div><span>Progress</span><strong>{mr.lineCount} items</strong><small>{approved} approved · {routed} routed</small></div></section><nav className="mr-s02-tabs">{([['overview','Overview'],['items',`Items (${mr.lineCount})`],['approval','Approval'],['sourcing','Sourcing'],['history',`History (${mr.reviewTrail.length})`]] as const).map(([key,label]) => <button key={key} className={tab === key ? 'mr-s02-tab mr-s02-tab--active' : 'mr-s02-tab'} type="button" onClick={() => setTab(key)}>{label}</button>)}</nav>
    {tab === 'overview' ? <section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Request details</strong><span>Original internal demand</span></div></div><div className="mr-s02-detail-grid"><div><span>Subject</span><strong>{mr.subject}</strong></div><div><span>Status</span><Status value={mr.status} /></div><div><span>Requested by</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? '—'}</small></div><div><span>Required supply / on-site</span><strong>{mr.requiredOnSiteDate}</strong></div><div className="mr-s02-span2"><span>Remarks / instructions</span><strong>{mr.instructions ?? 'No remarks recorded.'}</strong></div></div></section> : null}
    {tab === 'items' ? <section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Requested items / scope</strong><span>The MR item schedule. Proposed supplier is non-binding.</span></div><button className="erp-button erp-button--small erp-button--ghost" type="button" onClick={() => window.print()}>Print item schedule / PDF</button></div><div className="mr-s02-table-wrap"><table className="mr-s02-table mr-s02-items-table"><thead><tr><th>Line</th><th>Description / specification</th><th>Requested</th><th>Required date</th><th>Proposed supplier</th><th>Make / model</th><th>Approved</th><th>State</th></tr></thead><tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td>{line.lineNo}</td><td className="mr-s02-main-cell"><strong>{line.description}</strong><small>{line.specification ?? '—'}</small>{line.technicalNotes ? <small className="mr-s02-note">{line.technicalNotes}</small> : null}</td><td><strong>{line.requestedQuantity} {line.uomCode}</strong></td><td>{line.requiredDateOverride ?? mr.requiredOnSiteDate}</td><td>{supplierName(suppliers, line.preferredSupplierId)}</td><td>{[line.manufacturer, line.brand, line.model].filter(Boolean).join(' · ') || '—'}<small>{readable(line.equivalentRule)}</small></td><td>{line.approvedQuantity === null ? '—' : `${line.approvedQuantity} ${line.uomCode}`}</td><td><Status value={line.lineState} /></td></tr>)}</tbody></table></div></section> : null}
    {tab === 'approval' ? <Approval session={session} mr={mr} /> : null}
    {tab === 'sourcing' ? <Sourcing session={session} mr={mr} /> : null}
    {tab === 'history' ? <section className="mr-s02-card"><div className="mr-s02-section-head"><div><strong>Decision history</strong><span>Recorded approval and current sourcing decisions</span></div></div>{mr.reviewTrail.length === 0 && routed === 0 ? <div className="mr-s02-empty"><strong>No decision history yet</strong><span>This submitted/draft demand has not yet completed a decision.</span></div> : <div className="mr-s02-history">{mr.reviewTrail.map((entry) => <article key={entry.reviewOccurrenceId}><time>{new Date(entry.occurredAt).toLocaleString()}</time><Status value={entry.decision} /><div><strong>{entry.reviewerName}</strong><span>{entry.comments ?? 'No comment'}</span></div></article>)}{mr.lines.filter((line) => line.routeDecision).map((line) => <article key={`route-${line.mrLineId}`}><time>{line.routeDecision ? new Date(line.routeDecision.decidedAt).toLocaleString() : ''}</time><span className="mr-s02-route-badge">{line.routeDecision ? routeName(line.routeDecision.route) : ''}</span><div><strong>{line.lineNo} · {line.description}</strong><span>{line.routeDecision?.decidedByName}</span></div></article>)}</div>}</section> : null}</div><PrintSheet mr={mr} suppliers={suppliers} /></article>;
}

export function ErpRequisitionWorkspace({ session, projects, projectScopeId }: { session: ErpDevelopmentSession; projects: readonly WorkspaceProject[]; projectScopeId: string | null }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const mrs = useQuery({ queryKey: ['procurement-mrs', session], queryFn: () => json<MaterialRequisitionListResponse>('/procurement/requisitions', session) });
  const suppliers = useQuery({ queryKey: ['procurement-suppliers', session], queryFn: () => json<SupplierListResponse>('/procurement/suppliers', session) });
  const refs = useQuery({ queryKey: ['procurement-reference-data', session], queryFn: () => json<ProcurementReferenceDataResponse>('/procurement/reference-data', session) });
  const scopedProject = projectScopeId ? projects.find((p) => p.projectId === projectScopeId)?.projectCode : undefined;
  const rows = useMemo(() => (mrs.data?.requisitions ?? []).filter((mr) => { const q = search.trim().toLowerCase(); return (!scopedProject || mr.projectCode === scopedProject) && (status === 'ALL' || mr.status === status) && (priority === 'ALL' || mr.priority === priority) && (!q || [mr.mrNumber,mr.subject,mr.projectCode,mr.projectName,mr.requesterName].join(' ').toLowerCase().includes(q)); }), [mrs.data, priority, scopedProject, search, status]);
  const all = mrs.data?.requisitions ?? [];

  if (creating) {
    if (refs.isPending) return <div className="mr-s02-page mr-s02-state"><strong>Loading MR master data…</strong><span>Units of measure are required before the line editor opens.</span><button className="erp-button" type="button" onClick={() => setCreating(false)}>Back</button></div>;
    if (refs.isError) return <div className="mr-s02-page mr-s02-state mr-s02-state--error"><strong>New MR cannot open</strong><span>{refs.error.message}</span><div><button className="erp-button" type="button" onClick={() => refs.refetch()}>Retry</button><button className="erp-button erp-button--ghost" type="button" onClick={() => setCreating(false)}>Back</button></div></div>;
    const referenceData = refs.data;
    if (!referenceData) return <div className="mr-s02-page mr-s02-state"><strong>MR master data is not ready</strong><button className="erp-button" type="button" onClick={() => setCreating(false)}>Back</button></div>;
    return <NewRequisition session={session} projects={projects} suppliers={suppliers.data?.suppliers ?? []} refs={referenceData} onBack={() => setCreating(false)} onCreated={(id) => { setCreating(false); setSelected(id); }} />;
  }
  if (selected) return <Document session={session} mrId={selected} suppliers={suppliers.data?.suppliers ?? []} onBack={() => setSelected(null)} />;

  const pending = all.filter((mr) => mr.status === 'SUBMITTED' || mr.status === 'UNDER_REVIEW').length;
  const approved = all.filter((mr) => mr.status === 'APPROVED' || mr.status === 'PARTIALLY_APPROVED').length;
  const urgent = all.filter((mr) => mr.priority === 'HIGH' || mr.priority === 'URGENT').length;
  return <section className="mr-s02-page mr-s02-register mr-s02-screen"><header className="mr-s02-register-head"><div><span className="mr-s02-breadcrumb">Procurement / Demand</span><div className="mr-s02-title-row"><h1>Material / Purchase Requisitions</h1><span className="mr-s02-count">{all.length} records</span></div><p>Project demand from site or procurement, kept separate from approval, sourcing and downstream commitment.</p></div><button className="erp-button erp-button--primary" type="button" disabled={projects.length === 0} onClick={() => setCreating(true)}>+ New MR</button></header><div className="mr-s02-kpis"><div><span>Total MRs</span><strong>{all.length}</strong></div><div><span>Awaiting approval</span><strong>{pending}</strong></div><div><span>Approved demand</span><strong>{approved}</strong></div><div><span>High / urgent</span><strong>{urgent}</strong></div></div><div className="mr-s02-toolbar"><label className="mr-s02-search"><span>Search</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="MR number, subject, project, requester…" /></label><label><span>Status</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option value="ALL">All statuses</option><option value="DRAFT">Draft</option><option value="SUBMITTED">Submitted</option><option value="UNDER_REVIEW">Under review</option><option value="APPROVED">Approved</option><option value="PARTIALLY_APPROVED">Partially approved</option><option value="REJECTED">Rejected</option></select></label><label><span>Priority</span><select value={priority} onChange={(e) => setPriority(e.target.value)}><option value="ALL">All priorities</option><option value="URGENT">Urgent</option><option value="HIGH">High</option><option value="NORMAL">Normal</option><option value="LOW">Low</option></select></label><button className="erp-button erp-button--small erp-button--ghost" type="button" onClick={() => { setSearch(''); setStatus('ALL'); setPriority('ALL'); }}>Clear</button></div>{mrs.isPending ? <div className="mr-s02-state">Loading requisitions…</div> : null}{mrs.isError ? <div className="mr-s02-state mr-s02-state--error"><strong>Register unavailable</strong><span>{mrs.error.message}</span><button className="erp-button" type="button" onClick={() => mrs.refetch()}>Retry</button></div> : null}{rows.length > 0 ? <div className="mr-s02-table-wrap mr-s02-register-table"><table className="mr-s02-table"><thead><tr><th>MR</th><th>Subject / demand</th><th>Project</th><th>Requester</th><th>Request date</th><th>Required supply</th><th>Priority</th><th>Items</th><th>Status</th></tr></thead><tbody>{rows.map((mr) => <tr key={mr.mrId} tabIndex={0} onClick={() => setSelected(mr.mrId)} onKeyDown={(e) => { if (e.key === 'Enter') setSelected(mr.mrId); }}><td><strong className="mr-s02-mono mr-s02-doc-link">{mr.mrNumber}</strong></td><td className="mr-s02-main-cell"><strong>{mr.subject}</strong></td><td><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></td><td>{mr.requesterName}</td><td>{mr.requestDate}</td><td><NeedDate value={mr.requiredOnSiteDate} /></td><td><Status value={mr.priority} /></td><td>{mr.lineCount}</td><td><Status value={mr.status} /></td></tr>)}</tbody></table></div> : mrs.data ? <div className="mr-s02-empty"><strong>No matching requisitions</strong><span>Change the filters or create a new MR.</span></div> : null}</section>;
}
