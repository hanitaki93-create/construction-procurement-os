import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo, useState, type FormEvent } from 'react';

import type {
  CreateMaterialRequisitionRequest,
  CreateMaterialRequisitionResponse,
  CreateSupplierRequest,
  CreateSupplierResponse,
  MaterialRequisitionDetailResponse,
  MaterialRequisitionListResponse,
  MrLineType,
  MrPriority,
  ProcurementReferenceDataResponse,
  SupplierListResponse,
  SupplierType,
  WorkspaceProject,
} from '@cpos/contracts';
import type { SupportedLocale } from '@cpos/ui-foundation';

import { MrReviewPanel } from './mr-review-panel.js';
import './procurement.css';

interface DevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

export type ProcurementPage = 'suppliers' | 'requisitions';

function sessionHeaders(session: DevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

class ProductApiError extends Error {
  public constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'ProductApiError';
  }
}

async function productJson<T>(url: string, session: DevelopmentSession, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...sessionHeaders(session),
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { readonly code?: string; readonly message?: string };
      detail = body.message ?? body.code ?? detail;
    } catch {
      // Keep HTTP fallback.
    }
    throw new ProductApiError(response.status, detail);
  }
  return (await response.json()) as T;
}

function dateAfter(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readable(value: string): string {
  return value.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function Status({ value }: { readonly value: string }) {
  const good = ['ACTIVE', 'APPROVED', 'FULFILLED', 'VERIFIED'].includes(value);
  const attention = ['URGENT', 'ON_HOLD', 'EXPIRED', 'REJECTED'].includes(value);
  return (
    <span className={`proc-status proc-status--${good ? 'good' : attention ? 'attention' : 'neutral'}`}>
      {readable(value)}
    </span>
  );
}

function EmptyProductState({
  title,
  body,
  action,
  onAction,
}: {
  readonly title: string;
  readonly body: string;
  readonly action: string;
  readonly onAction: () => void;
}) {
  return (
    <div className="proc-empty">
      <div className="proc-empty__mark" aria-hidden="true">+</div>
      <strong>{title}</strong>
      <p>{body}</p>
      <button type="button" className="primary-button primary-button--compact" onClick={onAction}>
        {action}
      </button>
    </div>
  );
}

function SupplierCreateForm({
  session,
  locale,
  onDone,
}: {
  readonly session: DevelopmentSession;
  readonly locale: SupportedLocale;
  readonly onDone: () => void;
}) {
  const client = useQueryClient();
  const [supplierCode, setSupplierCode] = useState('');
  const [legalName, setLegalName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [supplierType, setSupplierType] = useState<SupplierType>('MATERIAL_SUPPLIER');
  const [emirateRegion, setEmirateRegion] = useState('Dubai');
  const [trnVatNumber, setTrnVatNumber] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const create = useMutation({
    mutationFn: () => {
      const request: CreateSupplierRequest = {
        supplierCode,
        legalName,
        supplierType,
        countryCode: 'AE',
        ...(tradeName.trim() ? { tradeName } : {}),
        ...(emirateRegion.trim() ? { emirateRegion } : {}),
        ...(trnVatNumber.trim() ? { trnVatNumber } : {}),
        ...(businessEmail.trim() ? { businessEmail } : {}),
        ...(businessPhone.trim() ? { businessPhone } : {}),
        ...(contactName.trim() && contactEmail.trim()
          ? {
              primaryContact: {
                displayName: contactName,
                email: contactEmail,
              },
            }
          : {}),
      };
      return productJson<CreateSupplierResponse>('/procurement/suppliers', session, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
      });
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['procurement-suppliers', session] });
      onDone();
    },
  });

  const text =
    locale === 'ar'
      ? {
          title: 'إضافة مورد أو مقاول باطن',
          code: 'رمز المورد',
          legal: 'الاسم القانوني',
          trade: 'الاسم التجاري',
          type: 'النوع',
          emirate: 'الإمارة / المنطقة',
          trn: 'الرقم الضريبي TRN',
          email: 'البريد العام',
          phone: 'الهاتف',
          contact: 'جهة الاتصال الرئيسية',
          contactEmail: 'بريد جهة الاتصال',
          cancel: 'إلغاء',
          save: 'حفظ المورد',
        }
      : {
          title: 'Add supplier / subcontractor',
          code: 'Supplier code',
          legal: 'Legal name',
          trade: 'Trading name',
          type: 'Supplier type',
          emirate: 'Emirate / region',
          trn: 'TRN / VAT number',
          email: 'General email',
          phone: 'Business phone',
          contact: 'Primary contact',
          contactEmail: 'Contact email',
          cancel: 'Cancel',
          save: 'Save supplier',
        };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    create.mutate();
  }

  return (
    <form className="proc-form" onSubmit={submit}>
      <div className="proc-form__heading">
        <div>
          <span className="proc-kicker">Supplier master</span>
          <h3>{text.title}</h3>
        </div>
        <button className="secondary-button" type="button" onClick={onDone}>{text.cancel}</button>
      </div>
      <div className="proc-form-grid proc-form-grid--3">
        <label><span>{text.code}</span><input value={supplierCode} onChange={(e) => setSupplierCode(e.target.value)} placeholder="SUP-001" required /></label>
        <label className="proc-span-2"><span>{text.legal}</span><input value={legalName} onChange={(e) => setLegalName(e.target.value)} placeholder="Al Fahad Trading LLC" required /></label>
        <label><span>{text.trade}</span><input value={tradeName} onChange={(e) => setTradeName(e.target.value)} /></label>
        <label><span>{text.type}</span><select value={supplierType} onChange={(e) => setSupplierType(e.target.value as SupplierType)}>
          <option value="MATERIAL_SUPPLIER">Material supplier</option>
          <option value="SUBCONTRACTOR">Subcontractor</option>
          <option value="SERVICE_PROVIDER">Service provider</option>
          <option value="MANUFACTURER">Manufacturer</option>
          <option value="DISTRIBUTOR">Distributor</option>
          <option value="CONSULTANT_OTHER">Consultant / other</option>
        </select></label>
        <label><span>{text.emirate}</span><input value={emirateRegion} onChange={(e) => setEmirateRegion(e.target.value)} /></label>
        <label><span>{text.trn}</span><input value={trnVatNumber} onChange={(e) => setTrnVatNumber(e.target.value)} /></label>
        <label><span>{text.email}</span><input type="email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} /></label>
        <label><span>{text.phone}</span><input value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} /></label>
        <label><span>{text.contact}</span><input value={contactName} onChange={(e) => setContactName(e.target.value)} /></label>
        <label><span>{text.contactEmail}</span><input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} /></label>
      </div>
      {create.isError ? <p className="form-error" role="alert">{create.error.message}</p> : null}
      <div className="proc-form__actions">
        <button className="primary-button" type="submit" disabled={create.isPending}>{create.isPending ? 'Saving…' : text.save}</button>
      </div>
    </form>
  );
}

function SupplierWorkspace({ session, locale }: { readonly session: DevelopmentSession; readonly locale: SupportedLocale }) {
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');
  const query = useQuery({
    queryKey: ['procurement-suppliers', session],
    queryFn: () => productJson<SupplierListResponse>('/procurement/suppliers', session),
  });

  const suppliers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return query.data?.suppliers ?? [];
    return (query.data?.suppliers ?? []).filter((supplier) =>
      [supplier.supplierCode, supplier.legalName, supplier.tradeName ?? '', supplier.supplierType]
        .join(' ')
        .toLowerCase()
        .includes(term),
    );
  }, [query.data, search]);

  if (creating) return <SupplierCreateForm session={session} locale={locale} onDone={() => setCreating(false)} />;

  return (
    <div className="proc-page">
      <div className="proc-page__header">
        <div>
          <span className="proc-kicker">Supply chain</span>
          <h2>{locale === 'ar' ? 'الموردون ومقاولو الباطن' : 'Suppliers & subcontractors'}</h2>
          <p>{locale === 'ar' ? 'ملف مورد عملي للاستخدام في الاختيار والمناقصة والقرار.' : 'A working supplier master for shortlisting, tendering and commercial decisions.'}</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setCreating(true)}>+ {locale === 'ar' ? 'مورد جديد' : 'New supplier'}</button>
      </div>

      <div className="proc-toolbar">
        <label className="proc-search"><span className="sr-only">Search suppliers</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={locale === 'ar' ? 'بحث بالاسم أو الرمز أو النوع…' : 'Search name, code or type…'} /></label>
        <span className="proc-count">{suppliers.length} {locale === 'ar' ? 'مورد' : suppliers.length === 1 ? 'supplier' : 'suppliers'}</span>
      </div>

      {query.isPending ? <div className="proc-loading">Loading supplier master…</div> : null}
      {query.isError ? <div className="proc-error"><strong>Supplier register unavailable</strong><span>{query.error.message}</span><button className="secondary-button" type="button" onClick={() => query.refetch()}>Retry</button></div> : null}
      {query.data && suppliers.length === 0 ? (
        <EmptyProductState title="No suppliers yet" body="Create the first supplier record with commercial identity and a primary contact." action="Add supplier" onAction={() => setCreating(true)} />
      ) : null}
      {suppliers.length > 0 ? (
        <div className="proc-table-wrap">
          <table className="proc-table">
            <thead><tr><th>Code</th><th>Supplier</th><th>Type</th><th>Primary contact</th><th>Compliance</th><th>Status</th></tr></thead>
            <tbody>
              {suppliers.map((supplier) => {
                const expired = supplier.compliance.filter((document) => document.verificationStatus === 'EXPIRED').length;
                return (
                  <tr key={supplier.supplierId}>
                    <td><strong className="proc-number">{supplier.supplierCode}</strong></td>
                    <td><strong>{supplier.legalName}</strong><small>{supplier.tradeName ?? [supplier.emirateRegion, supplier.countryCode].filter(Boolean).join(', ')}</small></td>
                    <td>{readable(supplier.supplierType)}</td>
                    <td>{supplier.primaryContact ? <><strong>{supplier.primaryContact.displayName}</strong><small>{supplier.primaryContact.email ?? supplier.primaryContact.phone ?? '—'}</small></> : <span className="proc-muted">Not recorded</span>}</td>
                    <td>{supplier.compliance.length === 0 ? <span className="proc-muted">Not reviewed</span> : expired > 0 ? <span className="proc-alert">{expired} expired</span> : <span>{supplier.compliance.length} documents</span>}</td>
                    <td><Status value={supplier.supplierState} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

interface DraftMrLine {
  readonly id: string;
  readonly lineType: MrLineType;
  readonly description: string;
  readonly specification: string;
  readonly requestedQuantity: string;
  readonly uomCode: string;
  readonly preferredSupplierId: string;
}

function newLine(defaultUom = 'EA'): DraftMrLine {
  return {
    id: crypto.randomUUID(),
    lineType: 'MATERIAL',
    description: '',
    specification: '',
    requestedQuantity: '1',
    uomCode: defaultUom,
    preferredSupplierId: '',
  };
}

function MaterialRequisitionCreateForm({
  session,
  locale,
  projects,
  suppliers,
  uoms,
  onDone,
}: {
  readonly session: DevelopmentSession;
  readonly locale: SupportedLocale;
  readonly projects: readonly WorkspaceProject[];
  readonly suppliers: SupplierListResponse['suppliers'];
  readonly uoms: ProcurementReferenceDataResponse['uoms'];
  readonly onDone: (createdId?: string) => void;
}) {
  const client = useQueryClient();
  const [projectId, setProjectId] = useState(projects[0]?.projectId ?? '');
  const [subject, setSubject] = useState('');
  const [requiredOnSiteDate, setRequiredOnSiteDate] = useState(dateAfter(14));
  const [priority, setPriority] = useState<MrPriority>('NORMAL');
  const [requesterTeam, setRequesterTeam] = useState('');
  const [instructions, setInstructions] = useState('');
  const [lines, setLines] = useState<readonly DraftMrLine[]>([newLine(uoms[0]?.code ?? 'EA')]);

  const create = useMutation({
    mutationFn: () => {
      const request: CreateMaterialRequisitionRequest = {
        projectId,
        requiredOnSiteDate,
        priority,
        subject,
        ...(requesterTeam.trim() ? { requesterTeam } : {}),
        ...(instructions.trim() ? { instructions } : {}),
        lines: lines.map((line) => ({
          entryMode: 'FREE_FORM',
          lineType: line.lineType,
          description: line.description,
          requestedQuantity: line.requestedQuantity,
          uomCode: line.uomCode,
          ...(line.specification.trim() ? { specification: line.specification } : {}),
          ...(line.preferredSupplierId ? { preferredSupplierId: line.preferredSupplierId } : {}),
        })),
      };
      return productJson<CreateMaterialRequisitionResponse>('/procurement/requisitions', session, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
      });
    },
    onSuccess: async (result) => {
      await client.invalidateQueries({ queryKey: ['procurement-mrs', session] });
      onDone(result.requisition.mrId);
    },
  });

  function updateLine(id: string, patch: Partial<Omit<DraftMrLine, 'id'>>) {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    create.mutate();
  }

  return (
    <form className="proc-form proc-form--wide" onSubmit={submit}>
      <div className="proc-form__heading">
        <div><span className="proc-kicker">Material / Purchase Requisition</span><h3>{locale === 'ar' ? 'طلب شراء جديد' : 'New requisition'}</h3><p>Capture what the project actually needs. Catalogue use is optional; free-form construction demand is first-class.</p></div>
        <button className="secondary-button" type="button" onClick={() => onDone()}>Cancel</button>
      </div>
      <div className="proc-form-grid proc-form-grid--4">
        <label className="proc-span-2"><span>Project</span><select value={projectId} onChange={(e) => setProjectId(e.target.value)} required>{projects.map((project) => <option key={project.projectId} value={project.projectId}>{project.projectCode} — {project.displayName}</option>)}</select></label>
        <label><span>Required on site</span><input type="date" value={requiredOnSiteDate} onChange={(e) => setRequiredOnSiteDate(e.target.value)} required /></label>
        <label><span>Priority</span><select value={priority} onChange={(e) => setPriority(e.target.value as MrPriority)}><option>NORMAL</option><option>HIGH</option><option>URGENT</option><option>LOW</option></select></label>
        <label className="proc-span-3"><span>Subject</span><input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Aluminium profiles for first-floor glazing" required /></label>
        <label><span>Requesting team</span><input value={requesterTeam} onChange={(e) => setRequesterTeam(e.target.value)} placeholder="Site / MEP / Procurement" /></label>
        <label className="proc-span-4"><span>Instructions / purpose</span><textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={2} /></label>
      </div>

      <div className="proc-lines-heading"><div><strong>Requested lines</strong><span>{lines.length} line{lines.length === 1 ? '' : 's'}</span></div><button className="secondary-button secondary-button--compact" type="button" onClick={() => setLines((current) => [...current, newLine(uoms[0]?.code ?? 'EA')])}>+ Add line</button></div>
      <div className="proc-lines">
        {lines.map((line, index) => (
          <div className="proc-line" key={line.id}>
            <div className="proc-line__number">{String((index + 1) * 10).padStart(2, '0')}</div>
            <label className="proc-line__description"><span>Description</span><input value={line.description} onChange={(e) => updateLine(line.id, { description: e.target.value })} placeholder="Requested material / service / scope" required /></label>
            <label><span>Type</span><select value={line.lineType} onChange={(e) => updateLine(line.id, { lineType: e.target.value as MrLineType })}><option value="MATERIAL">Material</option><option value="SERVICE">Service</option><option value="SUBCONTRACT_SCOPE">Subcontract scope</option><option value="EQUIPMENT">Equipment</option><option value="OTHER">Other</option></select></label>
            <label><span>Qty</span><input inputMode="decimal" value={line.requestedQuantity} onChange={(e) => updateLine(line.id, { requestedQuantity: e.target.value })} required /></label>
            <label><span>UOM</span><select value={line.uomCode} onChange={(e) => updateLine(line.id, { uomCode: e.target.value })}>{uoms.map((uom) => <option key={uom.code} value={uom.code}>{uom.code} — {uom.displayName}</option>)}</select></label>
            <label className="proc-line__spec"><span>Specification / requirement</span><input value={line.specification} onChange={(e) => updateLine(line.id, { specification: e.target.value })} placeholder="Grade, model, drawing reference, performance requirement…" /></label>
            <label><span>Preferred supplier (optional)</span><select value={line.preferredSupplierId} onChange={(e) => updateLine(line.id, { preferredSupplierId: e.target.value })}><option value="">None</option>{suppliers.map((supplier) => <option key={supplier.supplierId} value={supplier.supplierId}>{supplier.supplierCode} — {supplier.legalName}</option>)}</select></label>
            <button className="proc-line__remove" type="button" aria-label={`Remove line ${index + 1}`} disabled={lines.length === 1} onClick={() => setLines((current) => current.filter((candidate) => candidate.id !== line.id))}>×</button>
          </div>
        ))}
      </div>
      {create.isError ? <p className="form-error" role="alert">{create.error.message}</p> : null}
      <div className="proc-form__actions"><span className="proc-hint">MR number is assigned automatically when this draft is saved.</span><button className="primary-button" type="submit" disabled={create.isPending || projects.length === 0}>{create.isPending ? 'Creating…' : 'Create requisition'}</button></div>
    </form>
  );
}

function MaterialRequisitionDetail({
  session,
  mrId,
  onClose,
}: {
  readonly session: DevelopmentSession;
  readonly mrId: string;
  readonly onClose: () => void;
}) {
  const client = useQueryClient();
  const detail = useQuery({
    queryKey: ['procurement-mr', session, mrId],
    queryFn: () => productJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}`, session),
  });
  const submit = useMutation({
    mutationFn: () => productJson<MaterialRequisitionDetailResponse>(`/procurement/requisitions/${mrId}/submit`, session, { method: 'POST' }),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['procurement-mr', session, mrId] }),
        client.invalidateQueries({ queryKey: ['procurement-mrs', session] }),
      ]);
    },
  });

  if (detail.isPending) return <div className="proc-loading">Opening requisition…</div>;
  if (detail.isError) return <div className="proc-error"><strong>Requisition unavailable</strong><span>{detail.error.message}</span><button className="secondary-button" type="button" onClick={onClose}>Back</button></div>;
  const mr = detail.data.requisition;

  return (
    <div className="proc-detail">
      <div className="proc-detail__header">
        <div><button className="proc-back" type="button" onClick={onClose}>← Requisitions</button><span className="proc-kicker">Material / Purchase Requisition</span><h2>{mr.mrNumber}</h2><p>{mr.subject}</p></div>
        <div className="proc-detail__actions"><Status value={mr.status} />{mr.status === 'DRAFT' ? <button className="primary-button" type="button" disabled={submit.isPending} onClick={() => submit.mutate()}>{submit.isPending ? 'Submitting…' : 'Submit for review'}</button> : null}</div>
      </div>
      {submit.isError ? <p className="form-error" role="alert">{submit.error.message}</p> : null}
      <div className="proc-detail-grid">
        <div><span>Project</span><strong>{mr.projectCode} — {mr.projectName}</strong></div>
        <div><span>Requester</span><strong>{mr.requesterName}</strong><small>{mr.requesterTeam ?? '—'}</small></div>
        <div><span>Request date</span><strong>{mr.requestDate}</strong></div>
        <div><span>Required on site</span><strong>{mr.requiredOnSiteDate}</strong></div>
        <div><span>Priority</span><strong>{readable(mr.priority)}</strong></div>
        <div><span>Lines</span><strong>{mr.lineCount}</strong></div>
      </div>
      {mr.instructions ? <div className="proc-note"><span>Instructions</span><p>{mr.instructions}</p></div> : null}
      <div className="proc-table-wrap">
        <table className="proc-table proc-table--lines"><thead><tr><th>Line</th><th>Description / specification</th><th>Type</th><th>Quantity</th><th>State</th></tr></thead><tbody>{mr.lines.map((line) => <tr key={line.mrLineId}><td className="proc-number">{line.lineNo}</td><td><strong>{line.description}</strong><small>{line.specification ?? 'No additional specification'}</small></td><td>{readable(line.lineType)}</td><td><strong>{line.requestedQuantity} {line.uomCode}</strong></td><td><Status value={line.lineState} /></td></tr>)}</tbody></table>
      </div>
      <MrReviewPanel session={session} mr={mr} />
    </div>
  );
}

function MaterialRequisitionWorkspace({
  session,
  locale,
  projects,
}: {
  readonly session: DevelopmentSession;
  readonly locale: SupportedLocale;
  readonly projects: readonly WorkspaceProject[];
}) {
  const [creating, setCreating] = useState(false);
  const [selectedMrId, setSelectedMrId] = useState<string | null>(null);
  const mrs = useQuery({ queryKey: ['procurement-mrs', session], queryFn: () => productJson<MaterialRequisitionListResponse>('/procurement/requisitions', session) });
  const suppliers = useQuery({ queryKey: ['procurement-suppliers', session], queryFn: () => productJson<SupplierListResponse>('/procurement/suppliers', session) });
  const references = useQuery({ queryKey: ['procurement-reference-data', session], queryFn: () => productJson<ProcurementReferenceDataResponse>('/procurement/reference-data', session) });

  if (selectedMrId) return <MaterialRequisitionDetail session={session} mrId={selectedMrId} onClose={() => setSelectedMrId(null)} />;
  if (creating && references.data) return <MaterialRequisitionCreateForm session={session} locale={locale} projects={projects} suppliers={suppliers.data?.suppliers ?? []} uoms={references.data.uoms} onDone={(createdId) => { setCreating(false); if (createdId) setSelectedMrId(createdId); }} />;

  const requisitions = mrs.data?.requisitions ?? [];
  return (
    <div className="proc-page">
      <div className="proc-page__header"><div><span className="proc-kicker">Demand</span><h2>{locale === 'ar' ? 'طلبات الشراء' : 'Material / Purchase Requisitions'}</h2><p>{locale === 'ar' ? 'طلب المشروع كما هو، قبل تحويله إلى مناقصة أو أمر شراء.' : 'Project demand as requested—before it becomes sourcing, an RFQ or an order.'}</p></div><button className="primary-button" type="button" onClick={() => setCreating(true)} disabled={projects.length === 0 || references.isPending}>+ {locale === 'ar' ? 'طلب جديد' : 'New requisition'}</button></div>
      {projects.length === 0 ? <div className="proc-warning">Create a project before raising procurement demand.</div> : null}
      {mrs.isPending ? <div className="proc-loading">Loading requisitions…</div> : null}
      {mrs.isError ? <div className="proc-error"><strong>Requisition register unavailable</strong><span>{mrs.error.message}</span><button className="secondary-button" type="button" onClick={() => mrs.refetch()}>Retry</button></div> : null}
      {mrs.data && requisitions.length === 0 ? <EmptyProductState title="No requisitions yet" body="Raise the first material, service, equipment or subcontract-scope request from a project." action="Create requisition" onAction={() => setCreating(true)} /> : null}
      {requisitions.length > 0 ? <div className="proc-table-wrap"><table className="proc-table"><thead><tr><th>MR</th><th>Subject</th><th>Project</th><th>Required on site</th><th>Priority</th><th>Lines</th><th>Status</th></tr></thead><tbody>{requisitions.map((mr) => <tr key={mr.mrId} className="proc-table__clickable" onClick={() => setSelectedMrId(mr.mrId)}><td><strong className="proc-number">{mr.mrNumber}</strong></td><td><strong>{mr.subject}</strong><small>Requested by {mr.requesterName}</small></td><td>{mr.projectCode}<small>{mr.projectName}</small></td><td>{mr.requiredOnSiteDate}</td><td><Status value={mr.priority} /></td><td>{mr.lineCount}</td><td><Status value={mr.status} /></td></tr>)}</tbody></table></div> : null}
    </div>
  );
}

export function ProcurementWorkspace({
  page,
  session,
  locale,
  projects,
}: {
  readonly page: ProcurementPage;
  readonly session: DevelopmentSession;
  readonly locale: SupportedLocale;
  readonly projects: readonly WorkspaceProject[];
}) {
  return page === 'suppliers' ? (
    <SupplierWorkspace session={session} locale={locale} />
  ) : (
    <MaterialRequisitionWorkspace session={session} locale={locale} projects={projects} />
  );
}