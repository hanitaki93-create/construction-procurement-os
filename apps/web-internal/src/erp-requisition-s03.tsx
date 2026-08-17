import { useMemo, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  CreateMaterialRequisitionRequest,
  CreateMaterialRequisitionResponse,
  MaterialRequisitionDetail,
  MaterialRequisitionDetailResponse,
  MaterialRequisitionListResponse,
  MrEntryMode,
  MrLineType,
  MrPriority,
  ProcurementItemReference,
  ProcurementReferenceDataResponse,
  ProcurementRoute,
  ReviewMaterialRequisitionRequest,
  SetProcurementRouteRequest,
  SupplierListResponse,
  UpdateMaterialRequisitionDraftRequest,
  WorkspaceProject,
} from '@cpos/contracts';

import './erp-requisition-s03.css';

export interface ErpDevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

type EquivalentRule = 'EXACT_ONLY' | 'APPROVED_EQUIVALENT_ALLOWED' | 'ALTERNATE_BY_APPROVAL';
type Requisition = MaterialRequisitionDetail;
type RequisitionLine = Requisition['lines'][number];
type Tab = 'overview' | 'items' | 'approval' | 'sourcing' | 'history';

type DraftLine = {
  readonly key: string;
  entryMode: MrEntryMode;
  itemId: string;
  lineType: MrLineType;
  description: string;
  specification: string;
  quantity: string;
  uomCode: string;
  requiredDate: string;
  proposedSupplierId: string;
  manufacturer: string;
  brand: string;
  model: string;
  equivalentRule: EquivalentRule;
  technicalNotes: string;
  expanded: boolean;
};

type DraftHeader = {
  requiredDate: string;
  priority: MrPriority;
  subject: string;
  team: string;
  remarks: string;
};

type ReviewDraft = { outcome: 'APPROVED' | 'REJECTED'; approvedQuantity: string };

const routes: readonly { value: ProcurementRoute; label: string; description: string; justification: boolean }[] = [
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

function Status({ value }: { readonly value: string }) {
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
  return routes.find((candidate) => candidate.value === route)?.label ?? readable(route);
}

function supplierName(suppliers: SupplierListResponse['suppliers'], supplierId: string | null): string {
  if (!supplierId) return '—';
  const supplier = suppliers.find((candidate) => candidate.supplierId === supplierId);
  return supplier ? `${supplier.supplierCode} — ${supplier.legalName}` : 'Supplier reference';
}

function futureDate(days: number): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function masterById(refs: ProcurementReferenceDataResponse, itemId: string): ProcurementItemReference | undefined {
  return refs.items.find((item) => item.itemId === itemId);
}

function blankLine(defaultUom = 'EA'): DraftLine {
  return {
    key: crypto.randomUUID(),
    entryMode: 'FREE_FORM',
    itemId: '',
    lineType: 'MATERIAL',
    description: '',
    specification: '',
    quantity: '1',
    uomCode: defaultUom,
    requiredDate: '',
    proposedSupplierId: '',
    manufacturer: '',
    brand: '',
    model: '',
    equivalentRule: 'ALTERNATE_BY_APPROVAL',
    technicalNotes: '',
    expanded: false,
  };
}

function lineFromExisting(line: RequisitionLine): DraftLine {
  return {
    key: line.mrLineId,
    entryMode: line.entryMode,
    itemId: line.itemId ?? '',
    lineType: line.lineType,
    description: line.description,
    specification: line.specification ?? '',
    quantity: line.requestedQuantity,
    uomCode: line.uomCode,
    requiredDate: line.requiredDateOverride ?? '',
    proposedSupplierId: line.preferredSupplierId ?? '',
    manufacturer: line.manufacturer ?? '',
    brand: line.brand ?? '',
    model: line.model ?? '',
    equivalentRule: line.equivalentRule,
    technicalNotes: line.technicalNotes ?? '',
    expanded: false,
  };
}

function requestLine(line: DraftLine): CreateMaterialRequisitionRequest['lines'][number] {
  return {
    entryMode: line.entryMode,
    ...(line.entryMode === 'MASTER_BACKED' && line.itemId ? { itemId: line.itemId } : {}),
    lineType: line.lineType,
    description: line.description.trim(),
    requestedQuantity: line.quantity.trim(),
    uomCode: line.uomCode,
    ...(line.specification.trim() ? { specification: line.specification.trim() } : {}),
    ...(line.requiredDate ? { requiredDateOverride: line.requiredDate } : {}),
    ...(line.manufacturer.trim() ? { manufacturer: line.manufacturer.trim() } : {}),
    ...(line.brand.trim() ? { brand: line.brand.trim() } : {}),
    ...(line.model.trim() ? { model: line.model.trim() } : {}),
    equivalentRule: line.equivalentRule,
    ...(line.proposedSupplierId ? { preferredSupplierId: line.proposedSupplierId } : {}),
    ...(line.technicalNotes.trim() ? { technicalNotes: line.technicalNotes.trim() } : {}),
  };
}

function validate(header: DraftHeader, lines: readonly DraftLine[]): string | null {
  if (!header.subject.trim()) return 'Enter an MR subject.';
  if (!header.requiredDate) return 'Enter the required supply / on-site date.';
  if (lines.length < 1) return 'Add at least one requested item.';
  const bad = lines.find((line) => !line.description.trim() || !line.uomCode || !/^(?:\d+)(?:\.\d+)?$/u.test(line.quantity.trim()) || Number(line.quantity) <= 0);
  if (bad) return 'Every item needs a description, positive quantity and unit.';
  return null;
}

function ItemGrid({
  lines,
  setLines,
  refs,
  suppliers,
}: {
  readonly lines: readonly DraftLine[];
  readonly setLines: (next: DraftLine[] | ((current: DraftLine[]) => DraftLine[])) => void;
  readonly refs: ProcurementReferenceDataResponse;
  readonly suppliers: SupplierListResponse['suppliers'];
}) {
  function patch(key: string, change: Partial<Omit<DraftLine, 'key'>>) {
    setLines((current) => current.map((line) => line.key === key ? { ...line, ...change } : line));
  }

  function chooseItem(line: DraftLine, itemId: string) {
    if (!itemId) {
      patch(line.key, { entryMode: 'FREE_FORM', itemId: '' });
      return;
    }
    const item = masterById(refs, itemId);
    if (!item) return;
    patch(line.key, {
      entryMode: 'MASTER_BACKED',
      itemId,
      lineType: item.itemKind,
      description: item.shortDescription,
      specification: item.detailedSpecification ?? '',
      uomCode: item.defaultUomCode ?? line.uomCode,
      manufacturer: item.manufacturer ?? '',
      brand: item.brand ?? '',
      model: item.model ?? '',
      equivalentRule: item.equivalentRule,
    });
  }

  function duplicate(line: DraftLine) {
    setLines((current) => {
      const index = current.findIndex((candidate) => candidate.key === line.key);
      const copy: DraftLine = { ...line, key: crypto.randomUUID() };
      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
  }

  return <div className="mr-s03-grid-shell">
    <table className="mr-s03-edit-grid">
      <thead><tr><th className="mr-s03-col-serial">#</th><th className="mr-s03-col-ref">Item code / Ref.</th><th>Description</th><th className="mr-s03-col-qty">Qty</th><th className="mr-s03-col-unit">Unit</th><th className="mr-s03-col-date">Required date</th><th className="mr-s03-col-supplier">Proposed supplier</th><th className="mr-s03-col-actions">Actions</th></tr></thead>
      <tbody>{lines.map((line, index) => <FragmentRow key={line.key} line={line} index={index} refs={refs} suppliers={suppliers} chooseItem={chooseItem} patch={patch} duplicate={duplicate} remove={() => setLines((current) => current.filter((candidate) => candidate.key !== line.key))} canRemove={lines.length > 1} />)}</tbody>
    </table>
    <div className="mr-s03-grid-footer"><button className="erp-button erp-button--small" type="button" onClick={() => setLines((current) => [...current, blankLine(refs.uoms.find((uom) => uom.code === 'EA')?.code ?? refs.uoms[0]?.code ?? 'EA')])}>+ Add item</button><span>Use Item code / Ref. for master-backed items; choose Free-form for one-off project demand.</span></div>
  </div>;
}

function FragmentRow({
  line,
  index,
  refs,
  suppliers,
  chooseItem,
  patch,
  duplicate,
  remove,
  canRemove,
}: {
  readonly line: DraftLine;
  readonly index: number;
  readonly refs: ProcurementReferenceDataResponse;
  readonly suppliers: SupplierListResponse['suppliers'];
  readonly chooseItem: (line: DraftLine, itemId: string) => void;
  readonly patch: (key: string, change: Partial<Omit<DraftLine, 'key'>>) => void;
  readonly duplicate: (line: DraftLine) => void;
  readonly remove: () => void;
  readonly canRemove: boolean;
}) {
  return <>
    <tr className="mr-s03-edit-row">
      <td className="mr-s03-serial">{index + 1}</td>
      <td><select aria-label={`Item code row ${index + 1}`} value={line.itemId} onChange={(event) => chooseItem(line, event.target.value)}><option value="">Free-form</option>{refs.items.map((item) => <option key={item.itemId} value={item.itemId}>{item.itemCode}</option>)}</select></td>
      <td><input aria-label={`Description row ${index + 1}`} value={line.description} onChange={(event) => patch(line.key, { description: event.target.value })} placeholder="Requested item / material / scope" /></td>
      <td><input aria-label={`Quantity row ${index + 1}`} inputMode="decimal" value={line.quantity} onChange={(event) => patch(line.key, { quantity: event.target.value })} /></td>
      <td><select aria-label={`Unit row ${index + 1}`} value={line.uomCode} onChange={(event) => patch(line.key, { uomCode: event.target.value })}>{refs.uoms.map((uom) => <option key={uom.code} value={uom.code}>{uom.code}</option>)}</select></td>
      <td><input aria-label={`Required date row ${index + 1}`} type="date" value={line.requiredDate} onChange={(event) => patch(line.key, { requiredDate: event.target.value })} /></td>
      <td><select aria-label={`Proposed supplier row ${index + 1}`} value={line.proposedSupplierId} onChange={(event) => patch(line.key, { proposedSupplierId: event.target.value })}><option value="">—</option>{suppliers.map((supplier) => <option key={supplier.supplierId} value={supplier.supplierId}>{supplier.supplierCode} — {supplier.legalName}</option>)}</select></td>
      <td><div className="mr-s03-row-actions"><button type="button" title="More item details" aria-label={`More details row ${index + 1}`} onClick={() => patch(line.key, { expanded: !line.expanded })}>{line.expanded ? '▴' : '▾'}</button><button type="button" title="Duplicate item" aria-label={`Duplicate row ${index + 1}`} onClick={() => duplicate(line)}>⧉</button><button type="button" title="Delete item" aria-label={`Delete row ${index + 1}`} disabled={!canRemove} onClick={remove}>×</button></div></td>
    </tr>
    {line.expanded ? <tr className="mr-s03-detail-row"><td /><td colSpan={7}><div className="mr-s03-line-details">
      <label className="mr-s03-field mr-s03-detail-span2"><span>Specification / size / drawing reference</span><input value={line.specification} onChange={(event) => patch(line.key, { specification: event.target.value })} /></label>
      <label className="mr-s03-field"><span>Type</span><select value={line.lineType} onChange={(event) => patch(line.key, { lineType: event.target.value as MrLineType })}><option value="MATERIAL">Material</option><option value="SERVICE">Service</option><option value="SUBCONTRACT_SCOPE">Subcontract scope</option><option value="EQUIPMENT">Equipment</option><option value="OTHER">Other</option></select></label>
      <label className="mr-s03-field"><span>Equivalent rule</span><select value={line.equivalentRule} onChange={(event) => patch(line.key, { equivalentRule: event.target.value as EquivalentRule })}><option value="ALTERNATE_BY_APPROVAL">Alternate by approval</option><option value="APPROVED_EQUIVALENT_ALLOWED">Approved equivalent allowed</option><option value="EXACT_ONLY">Exact only</option></select></label>
      <label className="mr-s03-field"><span>Manufacturer</span><input value={line.manufacturer} onChange={(event) => patch(line.key, { manufacturer: event.target.value })} /></label>
      <label className="mr-s03-field"><span>Brand</span><input value={line.brand} onChange={(event) => patch(line.key, { brand: event.target.value })} /></label>
      <label className="mr-s03-field"><span>Model / part reference</span><input value={line.model} onChange={(event) => patch(line.key, { model: event.target.value })} /></label>
      <label className="mr-s03-field mr-s03-detail-span3"><span>Item remarks / technical notes</span><input value={line.technicalNotes} onChange={(event) => patch(line.key, { technicalNotes: event.target.value })} /></label>
    </div></td></tr> : null}
  </>;
}

function HeaderEditor({
  header,
  setHeader,
  projects,
  projectId,
  projectLocked,
}: {
  readonly header: DraftHeader;
  readonly setHeader: (next: DraftHeader | ((current: DraftHeader) => DraftHeader)) => void;
  readonly projects: readonly WorkspaceProject[];
  readonly projectId: string;
  readonly projectLocked: boolean;
}) {
  const project = projects.find((candidate) => candidate.projectId === projectId);
  return <div className="mr-s03-header-grid">
    <label className="mr-s03-field mr-s03-span2"><span>Project</span>{projectLocked ? <div className="mr-s03-readonly-field">{project?.projectCode ?? 'Project'} — {project?.displayName ?? ''}</div> : <div className="mr-s03-readonly-field">Selected above</div>}</label>
    <label className="mr-s03-field"><span>Required supply / on-site *</span><input type="date" value={header.requiredDate} onChange={(event) => setHeader((current) => ({ ...current, requiredDate: event.target.value }))} /></label>
    <label className="mr-s03-field"><span>Priority</span><select value={header.priority} onChange={(event) => setHeader((current) => ({ ...current, priority: event.target.value as MrPriority }))}><option value="LOW">Low</option><option value="NORMAL">Normal</option><option value="HIGH">High</option><option value="URGENT">Urgent</option></select></label>
    <label className="mr-s03-field mr-s03-span3"><span>Subject *</span><input value={header.subject} onChange={(event) => setHeader((current) => ({ ...current, subject: event.target.value }))} placeholder="Site timber, tools and fixing materials" /></label>
    <label className="mr-s03-field"><span>Requesting team / department</span><input value={header.team} onChange={(event) => setHeader((current) => ({ ...current, team: event.target.value }))} placeholder="Site / Civil / MEP / Procurement" /></label>
    <label className="mr-s03-field mr-s03-span4"><span>Remarks / site instructions</span><textarea rows={2} value={header.remarks} onChange={(event) => setHeader((current) => ({ ...current, remarks: event.target.value }))} placeholder="Purpose, site contact, drawing references, delivery constraints, urgency reason…" /></label>
  </div>;
}

function NewRequisition({
  session,
  projects,
  suppliers,
  refs,
  onBack,
  onCreated,
}: {
  readonly session: ErpDevelopmentSession;
  readonly projects: readonly WorkspaceProject[];
  readonly suppliers: SupplierListResponse['suppliers'];
  readonly refs: ProcurementReferenceDataResponse;
  readonly onBack: () => void;
  readonly onCreated: (id: string) => void;
}) {
  const client = useQueryClient();
  const [projectId, setProjectId] = useState(projects[0]?.projectId ?? '');
  const [header, setHeader] = useState<DraftHeader>({ requiredDate: futureDate(14), priority: 'NORMAL', subject: '', team: '', remarks: '' });
  const [lines, setLines] = useState<DraftLine[]>([blankLine(refs.uoms.find((uom) => uom.code === 'EA')?.code ?? refs.uoms[0]?.code ?? 'EA')]);
  const [error, setError] = useState<string | null>(null);
  const create = useMutation({
    mutationFn: () => {
      const body: CreateMaterialRequisitionRequest = {
        projectId,
        requiredOnSiteDate: header.requiredDate,
        priority: header.priority,
        subject: header.subject.trim(),
        ...(header.team.trim() ? { requesterTeam: header.team.trim() } : {}),
        ...(header.remarks.trim() ? { instructions: header.remarks.trim() } : {}),
        lines: lines.map(requestLine),
      };
      return json<CreateMaterialRequisitionResponse>('/procurement/requisitions', session, { method: 'POST', body: JSON.stringify(body) });
    },
    onSuccess: async (result) => {
      await client.invalidateQueries({ queryKey: ['procurement-mrs', session] });
      onCreated(result.requisition.mrId);
    },
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!projectId) return setError('Select a project.');
    const problem = validate(header, lines);
    if (problem) return setError(problem);
    create.mutate();
  }
  return <form className="mr-s03-page mr-s03-screen" onSubmit={submit} data-testid="mr-create-form">
    <header className="mr-s03-doc-head"><div><button className="mr-s03-back" type="button" onClick={onBack}>← Requisition register</button><div className="mr-s03-title-row"><span className="mr-s03-doc-chip">MR</span><h1>New material / purchase requisition</h1><Status value="DRAFT" /></div><p>Capture project demand in the item grid. Item-master references are optional; free-form construction demand remains supported.</p></div><div className="mr-s03-head-actions"><button className="erp-button erp-button--ghost" type="button" onClick={onBack}>Cancel</button><button className="erp-button erp-button--primary" type="submit" disabled={create.isPending}>{create.isPending ? 'Saving…' : 'Save draft MR'}</button></div></header>
    {error || create.isError ? <div className="mr-s03-error" role="alert"><strong>MR could not be saved</strong><span>{error ?? create.error?.message}</span></div> : null}
    <section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Request information</strong><span>Project, need date and site context</span></div></div><div className="mr-s03-new-project"><label className="mr-s03-field"><span>Project *</span><select aria-label="Project" value={projectId} onChange={(event) => setProjectId(event.target.value)}>{projects.map((project) => <option key={project.projectId} value={project.projectId}>{project.projectCode} — {project.displayName}</option>)}</select></label></div><HeaderEditor header={header} setHeader={setHeader} projects={projects} projectId={projectId} projectLocked={false} /></section>
    <section className="mr-s03-card mr-s03-items-card"><div className="mr-s03-section-head"><div><strong>Requested items / scope</strong><span>Enter and modify directly in the grid</span></div><span className="mr-s03-count">{lines.length} item{lines.length === 1 ? '' : 's'}</span></div><ItemGrid lines={lines} setLines={setLines} refs={refs} suppliers={suppliers} /></section>
    <footer className="mr-s03-sticky-actions"><span>Saving creates a governed DRAFT. Approval and sourcing remain separate.</span><button className="erp-button erp-button--primary" type="submit" disabled={create.isPending}>{create.isPending ? 'Saving…' : 'Save draft MR'}</button></footer>
  </form>;
}

function DraftEditor({ session, mr, projects, refs, suppliers }: { readonly session: ErpDevelopmentSession; readonly mr: Requisition; readonly projects: readonly WorkspaceProject[]; readonly refs: ProcurementReferenceDataResponse; readonly suppliers: SupplierListResponse['suppliers'] }) {
  const client = useQueryClient();
  const [header, setHeader] = useState<DraftHeader>({ requiredDate: mr.requiredOnSiteDate, priority: mr.priority, subject: mr.subject, team: mr.requesterTeam ?? '', remarks: mr.instructions ?? '' });
  const [lines, setLines] = useState<DraftLine[]>(() => mr.lines.map(lineFromExisting));
  const [error, setError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'clean' | 'dirty' | 'saved'>('clean');
  const setHeaderDirty = (next: DraftHeader | ((current: DraftHeader) => DraftHeader)) => { setSaveState('dirty'); setHeader(next); };
  const setLinesDirty = (next: DraftLine[] | ((current: DraftLine[]) => DraftLine[])) => { setSaveState('dirty'); setLines(next); };
  const payload = (): UpdateMaterialRequisitionDraftRequest => ({
    requiredOnSiteDate: header.requiredDate,
    priority: header.priority,
    subject: header.subject.trim(),
    ...(header.team.trim() ? { requesterTeam: header.team.trim() } : {}),
    ...(header.remarks.trim() ? { instructions: header.remarks.trim() } : {}),
    lines: lines.map(requestLine),
  });
  const save = useMutation({
    mutationFn: () => json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/draft`, session, { method: 'PUT', body: JSON.stringify(payload()) }),
    onMutate: () => setSaveState('clean'),
    onSuccess: async (result) => {
      client.setQueryData(['procurement-mr', session, mr.mrId], result);
      setSaveState('saved');
      await client.invalidateQueries({ queryKey: ['procurement-mrs', session] });
    },
    onError: () => setSaveState('dirty'),
  });
  const saveAndSubmit = useMutation({
    mutationFn: async () => {
      await json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/draft`, session, { method: 'PUT', body: JSON.stringify(payload()) });
      return json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/submit`, session, { method: 'POST' });
    },
    onSuccess: async () => Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]),
  });
  function guard(action: () => void) {
    setError(null);
    const problem = validate(header, lines);
    if (problem) return setError(problem);
    action();
  }
  return <div className="mr-s03-stack">
    <section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Draft request information</strong><span>Editable until submission</span></div><Status value="DRAFT" /></div><HeaderEditor header={header} setHeader={setHeaderDirty} projects={projects} projectId={mr.projectId} projectLocked /></section>
    <section className="mr-s03-card mr-s03-items-card"><div className="mr-s03-section-head"><div><strong>Requested items / scope</strong><span>Edit directly. # is only the display serial; Item code / Ref. is the master reference.</span></div><button className="erp-button erp-button--small erp-button--ghost" type="button" onClick={() => window.print()}>Print item schedule / PDF</button></div><ItemGrid lines={lines} setLines={setLinesDirty} refs={refs} suppliers={suppliers} /></section>
    {error || save.isError || saveAndSubmit.isError ? <div className="mr-s03-error"><strong>Draft action failed</strong><span>{error ?? save.error?.message ?? saveAndSubmit.error?.message}</span></div> : null}
    <div className="mr-s03-draft-actions"><div><strong>Draft controls</strong><span>Save keeps the MR editable. Save & submit locks demand for approval.</span><span className={`mr-s03-save-state mr-s03-save-state--${saveState}`} data-testid="mr-draft-save-state">{save.isPending ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : saveState === 'dirty' ? 'Unsaved changes' : 'No unsaved changes'}</span></div><button className="erp-button erp-button--ghost" type="button" disabled={save.isPending || saveAndSubmit.isPending} onClick={() => guard(() => save.mutate())}>{save.isPending ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : 'Save changes'}</button><button className="erp-button erp-button--primary" type="button" disabled={save.isPending || saveAndSubmit.isPending} onClick={() => guard(() => saveAndSubmit.mutate())}>{saveAndSubmit.isPending ? 'Submitting…' : 'Save & submit for approval'}</button></div>
  </div>;
}

function ReadOnlyItems({ mr, suppliers }: { readonly mr: Requisition; readonly suppliers: SupplierListResponse['suppliers'] }) {
  return <section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Requested items / scope</strong><span>Submitted demand is read-only in this state.</span></div><button className="erp-button erp-button--small erp-button--ghost" type="button" onClick={() => window.print()}>Print item schedule / PDF</button></div><div className="mr-s03-table-wrap"><table className="mr-s03-table"><thead><tr><th>#</th><th>Item code / Ref.</th><th>Description / specification</th><th>Qty</th><th>Unit</th><th>Required date</th><th>Proposed supplier</th><th>Approved qty</th><th>State</th></tr></thead><tbody>{mr.lines.map((line, index) => <tr key={line.mrLineId}><td className="mr-s03-serial">{index + 1}</td><td>{line.itemCode ?? 'Free-form'}</td><td className="mr-s03-main-cell"><strong>{line.description}</strong><small>{line.specification ?? '—'}</small>{line.technicalNotes ? <small className="mr-s03-note">{line.technicalNotes}</small> : null}</td><td className="mr-s03-number">{line.requestedQuantity}</td><td>{line.uomCode}</td><td>{line.requiredDateOverride ?? mr.requiredOnSiteDate}</td><td>{supplierName(suppliers, line.preferredSupplierId)}</td><td className="mr-s03-number">{line.approvedQuantity ?? '—'}</td><td><Status value={line.lineState} /></td></tr>)}</tbody></table></div></section>;
}

function Approval({ session, mr }: { readonly session: ErpDevelopmentSession; readonly mr: Requisition }) {
  const client = useQueryClient();
  const reviewable = mr.status === 'SUBMITTED' || mr.status === 'UNDER_REVIEW';
  const seed = useMemo(() => Object.fromEntries(mr.lines.map((line) => [line.mrLineId, { outcome: 'APPROVED' as const, approvedQuantity: line.requestedQuantity }])) as Record<string, ReviewDraft>, [mr.lines]);
  const [drafts, setDrafts] = useState(seed);
  const [comments, setComments] = useState('');
  const mutation = useMutation({
    mutationFn: () => {
      const body: ReviewMaterialRequisitionRequest = { lineDecisions: mr.lines.map((line) => { const decision = drafts[line.mrLineId] ?? { outcome: 'APPROVED' as const, approvedQuantity: line.requestedQuantity }; return decision.outcome === 'REJECTED' ? { mrLineId: line.mrLineId, outcome: 'REJECTED' as const } : { mrLineId: line.mrLineId, outcome: 'APPROVED' as const, approvedQuantity: decision.approvedQuantity }; }), ...(comments.trim() ? { comments: comments.trim() } : {}) };
      return json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/review`, session, { method: 'POST', body: JSON.stringify(body) });
    },
    onSuccess: async () => Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]),
  });
  if (!reviewable) {
    const latest = mr.reviewTrail.at(-1);
    return <section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Approval decision</strong><span>Demand decision is closed in the current state</span></div><Status value={mr.status} /></div>{latest ? <div className="mr-s03-approval-summary"><div><span>Decision</span><strong>{readable(latest.decision)}</strong></div><div><span>Approver</span><strong>{latest.reviewerName}</strong></div><div><span>Time</span><strong>{new Date(latest.occurredAt).toLocaleString()}</strong></div><div><span>Comments</span><strong>{latest.comments ?? 'No comment'}</strong></div></div> : <div className="mr-s03-empty"><strong>{mr.status === 'DRAFT' ? 'Submit the draft first' : 'No approval occurrence on this record'}</strong><span>Approval controls appear only while demand is Submitted or Under Review.</span></div>}</section>;
  }
  return <section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Approve project demand</strong><span>Approval authorizes quantities; it does not choose supplier or sourcing route.</span></div><Status value={mr.status} /></div><div className="mr-s03-table-wrap"><table className="mr-s03-table mr-s03-review-table"><thead><tr><th>#</th><th>Item code / Ref.</th><th>Description</th><th>Requested qty</th><th>Unit</th><th>Decision</th><th>Approved qty</th></tr></thead><tbody>{mr.lines.map((line, index) => { const decision = drafts[line.mrLineId] ?? seed[line.mrLineId]; if (!decision) return null; return <tr key={line.mrLineId}><td className="mr-s03-serial">{index + 1}</td><td>{line.itemCode ?? 'Free-form'}</td><td className="mr-s03-main-cell"><strong>{line.description}</strong><small>{line.specification ?? '—'}</small></td><td>{line.requestedQuantity}</td><td>{line.uomCode}</td><td><select value={decision.outcome} onChange={(event) => setDrafts((current) => ({ ...current, [line.mrLineId]: { ...decision, outcome: event.target.value as ReviewDraft['outcome'] } }))}><option value="APPROVED">Approve</option><option value="REJECTED">Reject</option></select></td><td><input disabled={decision.outcome === 'REJECTED'} value={decision.approvedQuantity} onChange={(event) => setDrafts((current) => ({ ...current, [line.mrLineId]: { ...decision, approvedQuantity: event.target.value } }))} /></td></tr>; })}</tbody></table></div><label className="mr-s03-field mr-s03-review-comments"><span>Approval comments / reason</span><textarea rows={3} value={comments} onChange={(event) => setComments(event.target.value)} /></label>{mutation.isError ? <div className="mr-s03-error"><strong>Approval failed</strong><span>{mutation.error.message}</span></div> : null}<div className="mr-s03-actions-right"><button className="erp-button erp-button--primary" type="button" disabled={mutation.isPending} onClick={() => mutation.mutate()}>{mutation.isPending ? 'Recording…' : 'Record approval decision'}</button></div></section>;
}

function RouteChooser({ session, mr, line }: { readonly session: ErpDevelopmentSession; readonly mr: Requisition; readonly line: RequisitionLine }) {
  const client = useQueryClient();
  const [route, setRoute] = useState<ProcurementRoute>('COMPETITIVE_RFQ');
  const [reason, setReason] = useState('');
  const meta = routes.find((candidate) => candidate.value === route) ?? routes[0]!;
  const mutation = useMutation({ mutationFn: () => { const body: SetProcurementRouteRequest = { route, ...(reason.trim() ? { justification: reason.trim() } : {}) }; return json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mr.mrId}/lines/${line.mrLineId}/route`, session, { method: 'POST', body: JSON.stringify(body) }); }, onSuccess: async () => Promise.all([client.invalidateQueries({ queryKey: ['procurement-mr', session, mr.mrId] }), client.invalidateQueries({ queryKey: ['procurement-mrs', session] })]) });
  if (line.routeDecision) return <div className="mr-s03-route-locked"><span>Route locked</span><strong>{routeName(line.routeDecision.route)}</strong><small>{line.routeDecision.justification ?? `Recorded by ${line.routeDecision.decidedByName}`}</small></div>;
  return <div className="mr-s03-route-editor"><select value={route} onChange={(event) => { setRoute(event.target.value as ProcurementRoute); setReason(''); }}>{routes.map((candidate) => <option key={candidate.value} value={candidate.value}>{candidate.label}</option>)}</select>{meta.justification ? <input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Required justification…" /> : <span className="mr-s03-route-help">{meta.description}</span>}<button className="erp-button erp-button--primary erp-button--small" type="button" disabled={mutation.isPending || (meta.justification && reason.trim().length < 10)} onClick={() => mutation.mutate()}>Set route</button>{mutation.isError ? <span className="mr-s03-inline-error">{mutation.error.message}</span> : null}</div>;
}

function Sourcing({ session, mr }: { readonly session: ErpDevelopmentSession; readonly mr: Requisition }) {
  const eligible = mr.lines.filter((line) => line.approvedQuantity !== null && line.lineState !== 'REJECTED');
  const open = mr.status === 'APPROVED' || mr.status === 'PARTIALLY_APPROVED';
  return <div className="mr-s03-stack"><section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Sourcing route</strong><span>How approved demand will be procured. Existing decisions are read-only.</span></div></div>{!open ? <div className="mr-s03-empty"><strong>Sourcing is not open</strong><span>The MR must contain approved demand first.</span></div> : <div className="mr-s03-route-lines">{eligible.map((line, index) => <article className="mr-s03-route-line" key={line.mrLineId}><div className="mr-s03-route-line-id"><span>{index + 1}</span><div><strong>{line.itemCode ?? 'Free-form'} · {line.description}</strong><small>{line.approvedQuantity} {line.uomCode} approved</small></div></div><RouteChooser session={session} mr={mr} line={line} /></article>)}</div>}</section><section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>What each route means</strong><span>These are governed outcomes, not decorative future menu entries.</span></div></div><div className="mr-s03-route-catalog">{routes.map((candidate) => <article key={candidate.value}><strong>{candidate.label}</strong><p>{candidate.description}</p><span>{candidate.justification ? 'Reason required' : 'Standard route'}</span></article>)}</div></section></div>;
}

function PrintSheet({ mr, suppliers }: { readonly mr: Requisition; readonly suppliers: SupplierListResponse['suppliers'] }) {
  return <section className="mr-s03-print"><header><div><strong>Construction Procurement OS</strong><span>Material / Purchase Requisition</span></div><div><strong>{mr.mrNumber}</strong><span>{mr.status}</span></div></header><div className="mr-s03-print-meta"><div><span>Project</span><strong>{mr.projectCode} — {mr.projectName}</strong></div><div><span>Requester</span><strong>{mr.requesterName}</strong></div><div><span>Required supply</span><strong>{mr.requiredOnSiteDate}</strong></div><div><span>Subject</span><strong>{mr.subject}</strong></div></div><table><thead><tr><th>#</th><th>Item code / Ref.</th><th>Description / specification</th><th>Qty</th><th>Unit</th><th>Required date</th><th>Proposed supplier</th></tr></thead><tbody>{mr.lines.map((line, index) => <tr key={line.mrLineId}><td>{index + 1}</td><td>{line.itemCode ?? 'Free-form'}</td><td><strong>{line.description}</strong>{line.specification ? <small>{line.specification}</small> : null}</td><td>{line.requestedQuantity}</td><td>{line.uomCode}</td><td>{line.requiredDateOverride ?? mr.requiredOnSiteDate}</td><td>{supplierName(suppliers, line.preferredSupplierId)}</td></tr>)}</tbody></table>{mr.instructions ? <div className="mr-s03-print-notes"><span>Remarks</span><p>{mr.instructions}</p></div> : null}<footer><div>Requested by / signature</div><div>Reviewed / approved by</div><div>Date</div></footer></section>;
}

function Document({ session, mrId, projects, refs, suppliers, onBack }: { readonly session: ErpDevelopmentSession; readonly mrId: string; readonly projects: readonly WorkspaceProject[]; readonly refs: ProcurementReferenceDataResponse; readonly suppliers: SupplierListResponse['suppliers']; readonly onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('items');
  const query = useQuery({ queryKey: ['procurement-mr', session, mrId], queryFn: () => json<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}`, session) });
  if (query.isPending) return <div className="mr-s03-state">Opening requisition…</div>;
  if (query.isError) return <div className="mr-s03-state mr-s03-state--error"><strong>Requisition unavailable</strong><span>{query.error.message}</span><button className="erp-button" type="button" onClick={onBack}>Back</button></div>;
  const mr = query.data.requisition;
  const approved = mr.lines.filter((line) => ['APPROVED', 'PARTIALLY_APPROVED'].includes(line.lineState)).length;
  const routed = mr.lines.filter((line) => line.routeDecision !== null).length;
  return <article className="mr-s03-page mr-s03-document"><div className="mr-s03-screen"><header className="mr-s03-doc-head"><div><button className="mr-s03-back" type="button" onClick={onBack}>← Requisition register</button><div className="mr-s03-title-row"><span className="mr-s03-doc-chip">MR</span><h1>{mr.mrNumber}</h1><Status value={mr.status} /></div><p>{mr.subject}</p></div></header><section className="mr-s03-summary-strip"><div><span>Project</span><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></div><div><span>Requester</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? '—'}</small></div><div><span>Request date</span><strong>{mr.requestDate}</strong></div><div><span>Required supply</span><strong>{mr.requiredOnSiteDate}</strong></div><div><span>Priority</span><Status value={mr.priority} /></div><div><span>Progress</span><strong>{mr.lineCount} items</strong><small>{approved} approved · {routed} routed</small></div></section><nav className="mr-s03-tabs">{([['overview','Overview'],['items',`Items (${mr.lineCount})`],['approval','Approval'],['sourcing','Sourcing'],['history',`History (${mr.reviewTrail.length})`]] as const).map(([key,label]) => <button key={key} className={tab === key ? 'mr-s03-tab mr-s03-tab--active' : 'mr-s03-tab'} type="button" onClick={() => setTab(key)}>{label}</button>)}</nav>
    {tab === 'overview' ? <section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Request details</strong><span>Original project demand and current document state</span></div></div><div className="mr-s03-detail-grid"><div><span>Subject</span><strong>{mr.subject}</strong></div><div><span>Status</span><Status value={mr.status} /></div><div><span>Requested by</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? '—'}</small></div><div><span>Required supply / on-site</span><strong>{mr.requiredOnSiteDate}</strong></div><div className="mr-s03-span2"><span>Remarks / instructions</span><strong>{mr.instructions ?? 'No remarks recorded.'}</strong></div></div></section> : null}
    {tab === 'items' ? mr.status === 'DRAFT' ? <DraftEditor key={mr.mrId} session={session} mr={mr} projects={projects} refs={refs} suppliers={suppliers} /> : <ReadOnlyItems mr={mr} suppliers={suppliers} /> : null}
    {tab === 'approval' ? <Approval session={session} mr={mr} /> : null}
    {tab === 'sourcing' ? <Sourcing session={session} mr={mr} /> : null}
    {tab === 'history' ? <section className="mr-s03-card"><div className="mr-s03-section-head"><div><strong>Decision history</strong><span>Approval occurrences and sourcing decisions</span></div></div>{mr.reviewTrail.length === 0 && routed === 0 ? <div className="mr-s03-empty"><strong>No decision history yet</strong><span>Draft/item edits remain part of the working document until submission.</span></div> : <div className="mr-s03-history">{mr.reviewTrail.map((entry) => <article key={entry.reviewOccurrenceId}><time>{new Date(entry.occurredAt).toLocaleString()}</time><Status value={entry.decision} /><div><strong>{entry.reviewerName}</strong><span>{entry.comments ?? 'No comment'}</span></div></article>)}{mr.lines.filter((line) => line.routeDecision).map((line, index) => <article key={`route-${line.mrLineId}`}><time>{line.routeDecision ? new Date(line.routeDecision.decidedAt).toLocaleString() : ''}</time><span className="mr-s03-route-badge">{line.routeDecision ? routeName(line.routeDecision.route) : ''}</span><div><strong>#{index + 1} · {line.description}</strong><span>{line.routeDecision?.decidedByName}</span></div></article>)}</div>}</section> : null}</div><PrintSheet mr={mr} suppliers={suppliers} /></article>;
}

export function ErpRequisitionWorkspaceS03({ session, projects, projectScopeId = null }: { readonly session: ErpDevelopmentSession; readonly projects: readonly WorkspaceProject[]; readonly projectScopeId?: string | null }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const mrs = useQuery({ queryKey: ['procurement-mrs', session], queryFn: () => json<MaterialRequisitionListResponse>('/procurement/requisitions', session) });
  const suppliers = useQuery({ queryKey: ['procurement-suppliers', session], queryFn: () => json<SupplierListResponse>('/procurement/suppliers', session) });
  const refs = useQuery({ queryKey: ['procurement-reference-data', session], queryFn: () => json<ProcurementReferenceDataResponse>('/procurement/reference-data', session) });
  const scopedProject = projectScopeId ? projects.find((project) => project.projectId === projectScopeId)?.projectCode : undefined;
  const rows = useMemo(() => (mrs.data?.requisitions ?? []).filter((mr) => { const query = search.trim().toLowerCase(); return (!scopedProject || mr.projectCode === scopedProject) && (status === 'ALL' || mr.status === status) && (priority === 'ALL' || mr.priority === priority) && (!query || [mr.mrNumber,mr.subject,mr.projectCode,mr.projectName,mr.requesterName].join(' ').toLowerCase().includes(query)); }), [mrs.data, priority, scopedProject, search, status]);
  const all = mrs.data?.requisitions ?? [];
  if (refs.isError) return <div className="mr-s03-state mr-s03-state--error"><strong>MR reference data unavailable</strong><span>{refs.error.message}</span><button className="erp-button" type="button" onClick={() => refs.refetch()}>Retry</button></div>;
  if (refs.isPending || !refs.data) return <div className="mr-s03-state"><strong>Loading MR workspace…</strong><span>Units and item references are loading.</span></div>;
  if (creating) return <NewRequisition session={session} projects={projects} suppliers={suppliers.data?.suppliers ?? []} refs={refs.data} onBack={() => setCreating(false)} onCreated={(id) => { setCreating(false); setSelected(id); }} />;
  if (selected) return <Document session={session} mrId={selected} projects={projects} suppliers={suppliers.data?.suppliers ?? []} refs={refs.data} onBack={() => setSelected(null)} />;
  const pending = all.filter((mr) => mr.status === 'SUBMITTED' || mr.status === 'UNDER_REVIEW').length;
  const approved = all.filter((mr) => mr.status === 'APPROVED' || mr.status === 'PARTIALLY_APPROVED').length;
  const urgent = all.filter((mr) => mr.priority === 'HIGH' || mr.priority === 'URGENT').length;
  return <section className="mr-s03-page mr-s03-screen"><header className="mr-s03-register-head"><div><span className="mr-s03-breadcrumb">Procurement / Demand</span><div className="mr-s03-title-row"><h1>Material / Purchase Requisitions</h1><span className="mr-s03-count">{all.length} records</span></div><p>Construction demand captured as an editable working item grid, then governed through approval and sourcing.</p></div><button className="erp-button erp-button--primary" data-testid="new-mr" type="button" disabled={projects.length === 0} onClick={() => setCreating(true)}>+ New MR</button></header><div className="mr-s03-kpis"><div><span>Total MRs</span><strong>{all.length}</strong></div><div><span>Awaiting approval</span><strong>{pending}</strong></div><div><span>Approved demand</span><strong>{approved}</strong></div><div><span>High / urgent</span><strong>{urgent}</strong></div></div><div className="mr-s03-toolbar"><label className="mr-s03-search"><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="MR number, subject, project, requester…" /></label><label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="ALL">All statuses</option><option value="DRAFT">Draft</option><option value="SUBMITTED">Submitted</option><option value="UNDER_REVIEW">Under review</option><option value="APPROVED">Approved</option><option value="PARTIALLY_APPROVED">Partially approved</option><option value="REJECTED">Rejected</option></select></label><label><span>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)}><option value="ALL">All priorities</option><option value="URGENT">Urgent</option><option value="HIGH">High</option><option value="NORMAL">Normal</option><option value="LOW">Low</option></select></label><button className="erp-button erp-button--small erp-button--ghost" type="button" onClick={() => { setSearch(''); setStatus('ALL'); setPriority('ALL'); }}>Clear</button></div>{mrs.isPending ? <div className="mr-s03-state">Loading requisitions…</div> : null}{mrs.isError ? <div className="mr-s03-state mr-s03-state--error"><strong>Register unavailable</strong><span>{mrs.error.message}</span><button className="erp-button" type="button" onClick={() => mrs.refetch()}>Retry</button></div> : null}{rows.length > 0 ? <div className="mr-s03-table-wrap mr-s03-register-table"><table className="mr-s03-table"><thead><tr><th>MR</th><th>Subject / demand</th><th>Project</th><th>Requester</th><th>Request date</th><th>Required supply</th><th>Priority</th><th>Items</th><th>Status</th></tr></thead><tbody>{rows.map((mr) => <tr key={mr.mrId} tabIndex={0} onClick={() => setSelected(mr.mrId)} onKeyDown={(event) => { if (event.key === 'Enter') setSelected(mr.mrId); }}><td><strong className="mr-s03-mono mr-s03-doc-link">{mr.mrNumber}</strong></td><td className="mr-s03-main-cell"><strong>{mr.subject}</strong></td><td><strong>{mr.projectCode}</strong><small>{mr.projectName}</small></td><td>{mr.requesterName}</td><td>{mr.requestDate}</td><td>{mr.requiredOnSiteDate}</td><td><Status value={mr.priority} /></td><td className="mr-s03-number">{mr.lineCount}</td><td><Status value={mr.status} /></td></tr>)}</tbody></table></div> : mrs.data ? <div className="mr-s03-empty"><strong>No matching requisitions</strong><span>Change the filters or create a new MR.</span></div> : null}</section>;
}
