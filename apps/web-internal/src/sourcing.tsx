import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo, useState, type FormEvent } from 'react';

import type {
  CreateProcurementPackageRequest,
  CreateProcurementPackageResponse,
  CreateRfqDraftRequest,
  CreateRfqDraftResponse,
  ProcurementPackageDetailResponse,
  ProcurementPackageListResponse,
  ProcurementPackageType,
  RfqDetailResponse,
  RfqEventType,
  RfqListResponse,
  RfqPricingBasis,
  SourcingCandidateLine,
  SourcingCandidatesResponse,
  SupplierListResponse,
  WorkspaceProject,
} from '@cpos/contracts';
import type { SupportedLocale } from '@cpos/ui-foundation';

import './procurement.css';
import './sourcing.css';

interface DevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

export type SourcingPage = 'packages' | 'rfqs';

type SourceMode = 'PACKAGE' | 'DIRECT';

function sessionHeaders(session: DevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

class SourcingApiError extends Error {
  public constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'SourcingApiError';
  }
}

async function sourcingJson<T>(url: string, session: DevelopmentSession, init?: RequestInit): Promise<T> {
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
    throw new SourcingApiError(response.status, detail);
  }
  return (await response.json()) as T;
}

function readable(value: string): string {
  return value.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function Status({ value }: { readonly value: string }) {
  const good = ['ACTIVE', 'APPROVED', 'AWARDED', 'ORDERED', 'COMPLETE', 'ISSUED', 'READY_FOR_SOURCING'].includes(value);
  const attention = ['CANCELLED', 'CLOSED', 'DECLINED', 'WITHDRAWN'].includes(value);
  return <span className={`proc-status proc-status--${good ? 'good' : attention ? 'attention' : 'neutral'}`}>{readable(value)}</span>;
}

function dateAfter(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateTimeAfter(hours: number): string {
  const date = new Date(Date.now() + hours * 60 * 60 * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

function decimalUnits(value: string, scale: number): bigint {
  const [whole = '0', fraction = ''] = value.split('.');
  const factor = 10n ** BigInt(scale);
  return BigInt(whole || '0') * factor + BigInt(fraction.padEnd(scale, '0') || '0');
}

function decimalSubtract(left: string, right: string): string {
  const leftFraction = left.split('.')[1]?.length ?? 0;
  const rightFraction = right.split('.')[1]?.length ?? 0;
  const scale = Math.max(leftFraction, rightFraction);
  const factor = 10n ** BigInt(scale);
  const difference = decimalUnits(left, scale) - decimalUnits(right, scale);
  if (difference <= 0n) return '0';
  if (scale === 0) return difference.toString();
  const whole = difference / factor;
  const fraction = (difference % factor).toString().padStart(scale, '0').replace(/0+$/u, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}

function isPositiveDecimal(value: string): boolean {
  return /^(?:0*[1-9]\d*)(?:\.\d{1,6})?$|^0*\.\d{0,5}[1-9]\d*$/u.test(value.trim());
}

function EmptyState({ title, body, action, onAction }: { readonly title: string; readonly body: string; readonly action: string; readonly onAction: () => void }) {
  return (
    <div className="proc-empty">
      <div className="proc-empty__mark" aria-hidden="true">+</div>
      <strong>{title}</strong>
      <p>{body}</p>
      <button className="primary-button primary-button--compact" type="button" onClick={onAction}>{action}</button>
    </div>
  );
}

function PackageCreateForm({
  session,
  projects,
  candidates,
  onDone,
}: {
  readonly session: DevelopmentSession;
  readonly projects: readonly WorkspaceProject[];
  readonly candidates: readonly SourcingCandidateLine[];
  readonly onDone: (packageId?: string) => void;
}) {
  const client = useQueryClient();
  const eligible = useMemo(() => candidates.filter((candidate) => candidate.route === 'PACKAGE_SOURCING' && decimalSubtract(candidate.approvedQuantity, candidate.alreadyPackagedQuantity) !== '0'), [candidates]);
  const initialProjectId = projects.find((project) => eligible.some((candidate) => candidate.projectId === project.projectId))?.projectId ?? projects[0]?.projectId ?? '';
  const [projectId, setProjectId] = useState(initialProjectId);
  const [title, setTitle] = useState('');
  const [packageType, setPackageType] = useState<ProcurementPackageType>('MATERIAL_PACKAGE');
  const [tradeCategory, setTradeCategory] = useState('');
  const [requiredOnSiteDate, setRequiredOnSiteDate] = useState(dateAfter(21));
  const [targetAwardDate, setTargetAwardDate] = useState(dateAfter(7));
  const [scopeSummary, setScopeSummary] = useState('');
  const [selection, setSelection] = useState<Record<string, string>>({});

  const projectCandidates = eligible.filter((candidate) => candidate.projectId === projectId);
  const selectedEntries = Object.entries(selection).filter(([, quantity]) => isPositiveDecimal(quantity));

  const create = useMutation({
    mutationFn: () => {
      const request: CreateProcurementPackageRequest = {
        projectId,
        title,
        packageType,
        sourceLines: selectedEntries.map(([mrLineId, allocatedQuantity]) => ({ mrLineId, allocatedQuantity })),
        ...(tradeCategory.trim() ? { tradeCategory } : {}),
        ...(requiredOnSiteDate ? { requiredOnSiteDate } : {}),
        ...(targetAwardDate ? { targetAwardDate } : {}),
        ...(scopeSummary.trim() ? { scopeSummary } : {}),
      };
      return sourcingJson<CreateProcurementPackageResponse>('/procurement/packages', session, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
      });
    },
    onSuccess: async (result) => {
      await Promise.all([
        client.invalidateQueries({ queryKey: ['sourcing-packages', session] }),
        client.invalidateQueries({ queryKey: ['sourcing-candidates', session] }),
      ]);
      onDone(result.package.packageId);
    },
  });

  function toggle(candidate: SourcingCandidateLine, checked: boolean) {
    setSelection((current) => {
      const next = { ...current };
      if (!checked) delete next[candidate.mrLineId];
      else next[candidate.mrLineId] = decimalSubtract(candidate.approvedQuantity, candidate.alreadyPackagedQuantity);
      return next;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    create.mutate();
  }

  return (
    <form className="proc-form proc-form--wide" onSubmit={submit}>
      <div className="proc-form__heading">
        <div><span className="proc-kicker">Procurement package</span><h3>Build a sourcing package</h3><p>Group governed MR lines into a recognizable construction procurement package without re-keying demand.</p></div>
        <button className="secondary-button" type="button" onClick={() => onDone()}>Cancel</button>
      </div>

      <div className="proc-form-grid proc-form-grid--4">
        <label className="proc-span-2"><span>Project</span><select value={projectId} onChange={(event) => { setProjectId(event.target.value); setSelection({}); }} required>{projects.map((project) => <option key={project.projectId} value={project.projectId}>{project.projectCode} — {project.displayName}</option>)}</select></label>
        <label><span>Package type</span><select value={packageType} onChange={(event) => setPackageType(event.target.value as ProcurementPackageType)}><option value="MATERIAL_PACKAGE">Material package</option><option value="TRADE_PACKAGE">Trade package</option><option value="SUBCONTRACT_PACKAGE">Subcontract package</option><option value="SERVICE_PACKAGE">Service package</option><option value="MIXED">Mixed</option></select></label>
        <label><span>Trade / category</span><input value={tradeCategory} onChange={(event) => setTradeCategory(event.target.value)} placeholder="Aluminium & glazing" /></label>
        <label className="proc-span-2"><span>Package title</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="First-floor aluminium and glazing package" required /></label>
        <label><span>Target award</span><input type="date" value={targetAwardDate} onChange={(event) => setTargetAwardDate(event.target.value)} /></label>
        <label><span>Required on site</span><input type="date" value={requiredOnSiteDate} onChange={(event) => setRequiredOnSiteDate(event.target.value)} /></label>
        <label className="proc-span-4"><span>Scope summary</span><textarea value={scopeSummary} onChange={(event) => setScopeSummary(event.target.value)} rows={3} placeholder="Package intent, scope boundary, drawings/spec references and procurement notes." /></label>
      </div>

      <div className="src-section-heading"><div><strong>Approved MR source lines</strong><span>Select the governed demand that belongs in this package.</span></div><span className="proc-count">{selectedEntries.length} selected</span></div>
      {projectCandidates.length === 0 ? <div className="proc-warning">No approved MR lines for this project are currently routed to package sourcing.</div> : (
        <div className="src-source-list">
          {projectCandidates.map((candidate) => {
            const remaining = decimalSubtract(candidate.approvedQuantity, candidate.alreadyPackagedQuantity);
            const selected = candidate.mrLineId in selection;
            return (
              <div className={`src-source-row${selected ? ' src-source-row--selected' : ''}`} key={candidate.mrLineId}>
                <label className="src-source-check"><input type="checkbox" checked={selected} onChange={(event) => toggle(candidate, event.target.checked)} /><span><strong>{candidate.mrNumber} / {candidate.lineNo}</strong><small>{candidate.subject}</small></span></label>
                <div className="src-source-description"><strong>{candidate.description}</strong><small>{candidate.specification ?? 'No additional specification'}</small></div>
                <div className="src-source-authority"><span>Available authority</span><strong>{remaining} {candidate.uomCode}</strong><small>Approved {candidate.approvedQuantity}; packaged {candidate.alreadyPackagedQuantity}</small></div>
                <label className="src-quantity"><span>Allocate</span><input inputMode="decimal" disabled={!selected} value={selection[candidate.mrLineId] ?? ''} onChange={(event) => setSelection((current) => ({ ...current, [candidate.mrLineId]: event.target.value }))} /></label>
              </div>
            );
          })}
        </div>
      )}
      {create.isError ? <p className="form-error" role="alert">{create.error.message}</p> : null}
      <div className="proc-form__actions"><span className="proc-hint">Package number and source lineage are assigned atomically by the governed backend.</span><button className="primary-button" type="submit" disabled={create.isPending || !projectId || !title.trim() || selectedEntries.length === 0}>{create.isPending ? 'Creating…' : 'Create package'}</button></div>
    </form>
  );
}

function PackageDetail({ session, packageId, onClose }: { readonly session: DevelopmentSession; readonly packageId: string; readonly onClose: () => void }) {
  const detail = useQuery({ queryKey: ['sourcing-package', session, packageId], queryFn: () => sourcingJson<ProcurementPackageDetailResponse>(`/procurement/packages/${packageId}`, session) });
  if (detail.isPending) return <div className="proc-loading">Opening package…</div>;
  if (detail.isError) return <div className="proc-error"><strong>Package unavailable</strong><span>{detail.error.message}</span><button className="secondary-button" type="button" onClick={onClose}>Back</button></div>;
  const value = detail.data.package;
  return (
    <div className="proc-detail">
      <div className="proc-detail__header"><div><button className="proc-back" type="button" onClick={onClose}>← Packages</button><span className="proc-kicker">Procurement package</span><h2>{value.packageNumber}</h2><p>{value.title}</p></div><Status value={value.status} /></div>
      <div className="proc-detail-grid"><div><span>Project</span><strong>{value.projectCode} — {value.projectName}</strong></div><div><span>Type</span><strong>{readable(value.packageType)}</strong></div><div><span>Trade / category</span><strong>{value.tradeCategory ?? '—'}</strong></div><div><span>Owner</span><strong>{value.ownerName}</strong></div><div><span>Target award</span><strong>{value.targetAwardDate ?? '—'}</strong></div><div><span>Required on site</span><strong>{value.requiredOnSiteDate ?? '—'}</strong></div></div>
      {value.scopeSummary ? <div className="proc-note"><span>Scope summary</span><p>{value.scopeSummary}</p></div> : null}
      <div className="proc-table-wrap"><table className="proc-table proc-table--lines"><thead><tr><th>Source</th><th>Description / specification</th><th>Quantity</th><th>Required date</th></tr></thead><tbody>{value.scope.map((line) => <tr key={line.packageScopeId}><td><strong className="proc-number">{line.mrNumber}</strong><small>MR line {line.sourceLineNo}</small></td><td><strong>{line.description}</strong><small>{line.specification ?? 'No additional specification'}</small></td><td><strong>{line.allocatedQuantity} {line.uomCode}</strong></td><td>{line.requiredDate}</td></tr>)}</tbody></table></div>
      <div className="src-lineage-note"><strong>Governed source</strong><span>{value.routePolicyKey} · policy v{value.routePolicyVersion} · {value.sourceLineCount} source line{value.sourceLineCount === 1 ? '' : 's'}</span></div>
    </div>
  );
}

function PackageWorkspace({ session, locale, projects }: { readonly session: DevelopmentSession; readonly locale: SupportedLocale; readonly projects: readonly WorkspaceProject[] }) {
  const [creating, setCreating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const packages = useQuery({ queryKey: ['sourcing-packages', session], queryFn: () => sourcingJson<ProcurementPackageListResponse>('/procurement/packages', session) });
  const candidates = useQuery({ queryKey: ['sourcing-candidates', session], queryFn: () => sourcingJson<SourcingCandidatesResponse>('/procurement/sourcing/candidates', session) });

  if (selectedId) return <PackageDetail session={session} packageId={selectedId} onClose={() => setSelectedId(null)} />;
  if (creating && candidates.data) return <PackageCreateForm session={session} projects={projects} candidates={candidates.data.candidates} onDone={(packageId) => { setCreating(false); if (packageId) setSelectedId(packageId); }} />;

  const rows = packages.data?.packages ?? [];
  return (
    <div className="proc-page">
      <div className="proc-page__header"><div><span className="proc-kicker">Sourcing plan</span><h2>{locale === 'ar' ? 'حزم المشتريات' : 'Procurement Packages'}</h2><p>{locale === 'ar' ? 'اجمع طلبات المشروع المعتمدة في حزم شراء قابلة للمناقصة والتتبع.' : 'Turn approved project demand into traceable material, trade, service or subcontract sourcing packages.'}</p></div><button className="primary-button" type="button" disabled={projects.length === 0 || candidates.isPending} onClick={() => setCreating(true)}>+ {locale === 'ar' ? 'حزمة جديدة' : 'New package'}</button></div>
      {packages.isPending ? <div className="proc-loading">Loading procurement packages…</div> : null}
      {packages.isError ? <div className="proc-error"><strong>Package register unavailable</strong><span>{packages.error.message}</span><button className="secondary-button" type="button" onClick={() => packages.refetch()}>Retry</button></div> : null}
      {rows.length === 0 && packages.data ? <EmptyState title="No procurement packages yet" body="Create a package from approved MR lines routed to package sourcing." action="Create package" onAction={() => setCreating(true)} /> : null}
      {rows.length > 0 ? <div className="proc-table-wrap"><table className="proc-table"><thead><tr><th>Package</th><th>Title</th><th>Project</th><th>Trade / type</th><th>Target award</th><th>On site</th><th>Lines</th><th>Status</th></tr></thead><tbody>{rows.map((value) => <tr className="proc-table__clickable" key={value.packageId} onClick={() => setSelectedId(value.packageId)}><td><strong className="proc-number">{value.packageNumber}</strong></td><td><strong>{value.title}</strong><small>Owner {value.ownerName}</small></td><td>{value.projectCode}<small>{value.projectName}</small></td><td>{value.tradeCategory ?? readable(value.packageType)}<small>{value.tradeCategory ? readable(value.packageType) : ''}</small></td><td>{value.targetAwardDate ?? '—'}</td><td>{value.requiredOnSiteDate ?? '—'}</td><td>{value.sourceLineCount}</td><td><Status value={value.status} /></td></tr>)}</tbody></table></div> : null}
    </div>
  );
}

function RfqCreateForm({
  session,
  projects,
  packages,
  candidates,
  suppliers,
  onDone,
}: {
  readonly session: DevelopmentSession;
  readonly projects: readonly WorkspaceProject[];
  readonly packages: ProcurementPackageListResponse['packages'];
  readonly candidates: readonly SourcingCandidateLine[];
  readonly suppliers: SupplierListResponse['suppliers'];
  readonly onDone: (rfqId?: string) => void;
}) {
  const client = useQueryClient();
  const [sourceMode, setSourceMode] = useState<SourceMode>(packages.length > 0 ? 'PACKAGE' : 'DIRECT');
  const [packageId, setPackageId] = useState(packages[0]?.packageId ?? '');
  const [projectId, setProjectId] = useState(projects[0]?.projectId ?? '');
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<RfqEventType>('RFQ');
  const [responseDueAt, setResponseDueAt] = useState(dateTimeAfter(72));
  const [currency, setCurrency] = useState('AED');
  const [pricingBasis, setPricingBasis] = useState<RfqPricingBasis>('UNIT_AND_TOTAL');
  const [paymentTermRequirement, setPaymentTermRequirement] = useState('');
  const [validityDays, setValidityDays] = useState('30');
  const [commercialInstructions, setCommercialInstructions] = useState('');
  const [submissionInstructions, setSubmissionInstructions] = useState('');
  const [evaluationMode, setEvaluationMode] = useState<'COMBINED' | 'TWO_STAGE'>('COMBINED');
  const [bidVisibilityPolicy, setBidVisibilityPolicy] = useState<'BUYER_AFTER_CLOSE' | 'BUYER_ON_RECEIPT' | 'SEALED_TWO_STAGE'>('BUYER_AFTER_CLOSE');
  const [directQuantities, setDirectQuantities] = useState<Record<string, string>>({});
  const [bidderIds, setBidderIds] = useState<ReadonlySet<string>>(new Set());

  const packageDetail = useQuery({
    queryKey: ['sourcing-package', session, packageId],
    enabled: sourceMode === 'PACKAGE' && Boolean(packageId),
    queryFn: () => sourcingJson<ProcurementPackageDetailResponse>(`/procurement/packages/${packageId}`, session),
  });

  const directCandidates = candidates.filter((candidate) => candidate.route === 'COMPETITIVE_RFQ' && candidate.projectId === projectId);
  const directSelection = Object.entries(directQuantities).filter(([, quantity]) => isPositiveDecimal(quantity));
  const packageScope = packageDetail.data?.package.scope ?? [];
  const activeSuppliers = suppliers.filter((supplier) => supplier.supplierState === 'ACTIVE');
  const sourceCount = sourceMode === 'PACKAGE' ? packageScope.length : directSelection.length;

  const create = useMutation({
    mutationFn: () => {
      const selectedPackage = packageDetail.data?.package;
      const requestProjectId = sourceMode === 'PACKAGE' ? selectedPackage?.projectId ?? '' : projectId;
      const sourceLines = sourceMode === 'PACKAGE'
        ? packageScope.map((line) => ({ mrLineId: line.mrLineId, packageScopeId: line.packageScopeId, quantity: line.allocatedQuantity }))
        : directSelection.map(([mrLineId, quantity]) => ({ mrLineId, quantity }));
      const request: CreateRfqDraftRequest = {
        projectId: requestProjectId,
        title,
        eventType,
        responseDueAt: new Date(responseDueAt).toISOString(),
        responseTimezone: 'Asia/Dubai',
        currency: currency.trim().toUpperCase(),
        pricingBasis,
        evaluationMode,
        bidVisibilityPolicy,
        sourceLines,
        bidderSupplierIds: [...bidderIds],
        ...(sourceMode === 'PACKAGE' && selectedPackage ? { packageId: selectedPackage.packageId } : {}),
        ...(paymentTermRequirement.trim() ? { paymentTermRequirement } : {}),
        ...(validityDays.trim() ? { validityDays: Number.parseInt(validityDays, 10) } : {}),
        ...(commercialInstructions.trim() ? { commercialInstructions } : {}),
        ...(submissionInstructions.trim() ? { submissionInstructions } : {}),
      };
      return sourcingJson<CreateRfqDraftResponse>('/procurement/rfqs', session, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
      });
    },
    onSuccess: async (result) => {
      await client.invalidateQueries({ queryKey: ['sourcing-rfqs', session] });
      onDone(result.rfq.rfqId);
    },
  });

  function toggleDirect(candidate: SourcingCandidateLine, checked: boolean) {
    setDirectQuantities((current) => {
      const next = { ...current };
      if (!checked) delete next[candidate.mrLineId];
      else next[candidate.mrLineId] = candidate.approvedQuantity;
      return next;
    });
  }

  function toggleBidder(supplierId: string, checked: boolean) {
    setBidderIds((current) => {
      const next = new Set(current);
      if (checked) next.add(supplierId);
      else next.delete(supplierId);
      return next;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    create.mutate();
  }

  return (
    <form className="proc-form proc-form--wide" onSubmit={submit}>
      <div className="proc-form__heading"><div><span className="proc-kicker">RFQ / Tender</span><h3>Create sourcing event</h3><p>Form an RFQ, tender or RFP from governed demand, select bidders and capture the commercial return basis.</p></div><button className="secondary-button" type="button" onClick={() => onDone()}>Cancel</button></div>

      <div className="src-mode-switch" role="group" aria-label="RFQ source mode"><button className={sourceMode === 'PACKAGE' ? 'src-mode-switch__active' : ''} type="button" disabled={packages.length === 0} onClick={() => { setSourceMode('PACKAGE'); setDirectQuantities({}); }}>From package</button><button className={sourceMode === 'DIRECT' ? 'src-mode-switch__active' : ''} type="button" onClick={() => setSourceMode('DIRECT')}>Direct from approved MR</button></div>

      <div className="proc-form-grid proc-form-grid--4">
        {sourceMode === 'PACKAGE' ? <label className="proc-span-2"><span>Procurement package</span><select value={packageId} onChange={(event) => setPackageId(event.target.value)} required>{packages.map((value) => <option key={value.packageId} value={value.packageId}>{value.packageNumber} — {value.title}</option>)}</select></label> : <label className="proc-span-2"><span>Project</span><select value={projectId} onChange={(event) => { setProjectId(event.target.value); setDirectQuantities({}); }} required>{projects.map((project) => <option key={project.projectId} value={project.projectId}>{project.projectCode} — {project.displayName}</option>)}</select></label>}
        <label><span>Event type</span><select value={eventType} onChange={(event) => setEventType(event.target.value as RfqEventType)}><option value="RFQ">RFQ</option><option value="TENDER">Tender</option><option value="RFP">RFP</option></select></label>
        <label><span>Currency</span><input value={currency} maxLength={3} onChange={(event) => setCurrency(event.target.value.toUpperCase())} /></label>
        <label className="proc-span-2"><span>Title</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Aluminium and glazing RFQ" required /></label>
        <label><span>Response due</span><input type="datetime-local" value={responseDueAt} onChange={(event) => setResponseDueAt(event.target.value)} required /></label>
        <label><span>Pricing basis</span><select value={pricingBasis} onChange={(event) => setPricingBasis(event.target.value as RfqPricingBasis)}><option value="UNIT_AND_TOTAL">Unit & total</option><option value="LUMP_SUM">Lump sum</option><option value="RATE_SCHEDULE">Rate schedule</option><option value="MIXED">Mixed</option></select></label>
        <label className="proc-span-2"><span>Payment-term requirement</span><input value={paymentTermRequirement} onChange={(event) => setPaymentTermRequirement(event.target.value)} placeholder="45 days from delivery / invoice" /></label>
        <label><span>Validity days</span><input inputMode="numeric" value={validityDays} onChange={(event) => setValidityDays(event.target.value)} /></label>
        <label><span>Evaluation</span><select value={evaluationMode} onChange={(event) => setEvaluationMode(event.target.value as 'COMBINED' | 'TWO_STAGE')}><option value="COMBINED">Combined</option><option value="TWO_STAGE">Two stage</option></select></label>
        <label className="proc-span-2"><span>Bid visibility</span><select value={bidVisibilityPolicy} onChange={(event) => setBidVisibilityPolicy(event.target.value as 'BUYER_AFTER_CLOSE' | 'BUYER_ON_RECEIPT' | 'SEALED_TWO_STAGE')}><option value="BUYER_AFTER_CLOSE">Buyer after close</option><option value="BUYER_ON_RECEIPT">Buyer on receipt</option><option value="SEALED_TWO_STAGE">Sealed two stage</option></select></label>
        <label className="proc-span-2"><span>Commercial instructions</span><textarea rows={3} value={commercialInstructions} onChange={(event) => setCommercialInstructions(event.target.value)} /></label>
        <label className="proc-span-2"><span>Submission instructions</span><textarea rows={3} value={submissionInstructions} onChange={(event) => setSubmissionInstructions(event.target.value)} /></label>
      </div>

      <div className="src-section-heading"><div><strong>Source scope</strong><span>{sourceMode === 'PACKAGE' ? 'Package scope is carried forward without re-keying.' : 'Select approved MR lines routed directly to competitive RFQ.'}</span></div><span className="proc-count">{sourceCount} line{sourceCount === 1 ? '' : 's'}</span></div>
      {sourceMode === 'PACKAGE' ? (
        packageDetail.isPending ? <div className="proc-loading">Loading package scope…</div> : packageDetail.isError ? <div className="proc-error"><strong>Package scope unavailable</strong><span>{packageDetail.error.message}</span></div> : packageScope.length === 0 ? <div className="proc-warning">The selected package has no source scope.</div> : <div className="src-source-list">{packageScope.map((line) => <div className="src-source-row src-source-row--selected" key={line.packageScopeId}><div><strong>{line.mrNumber} / {line.sourceLineNo}</strong><small>Package source</small></div><div className="src-source-description"><strong>{line.description}</strong><small>{line.specification ?? 'No additional specification'}</small></div><div className="src-source-authority"><span>RFQ quantity</span><strong>{line.allocatedQuantity} {line.uomCode}</strong><small>Required {line.requiredDate}</small></div></div>)}</div>
      ) : directCandidates.length === 0 ? <div className="proc-warning">No approved MR lines for this project are routed directly to competitive RFQ.</div> : (
        <div className="src-source-list">{directCandidates.map((candidate) => { const selected = candidate.mrLineId in directQuantities; return <div className={`src-source-row${selected ? ' src-source-row--selected' : ''}`} key={candidate.mrLineId}><label className="src-source-check"><input type="checkbox" checked={selected} onChange={(event) => toggleDirect(candidate, event.target.checked)} /><span><strong>{candidate.mrNumber} / {candidate.lineNo}</strong><small>{candidate.subject}</small></span></label><div className="src-source-description"><strong>{candidate.description}</strong><small>{candidate.specification ?? 'No additional specification'}</small></div><div className="src-source-authority"><span>Approved authority</span><strong>{candidate.approvedQuantity} {candidate.uomCode}</strong><small>Required {candidate.requiredDate}</small></div><label className="src-quantity"><span>RFQ qty</span><input inputMode="decimal" disabled={!selected} value={directQuantities[candidate.mrLineId] ?? ''} onChange={(event) => setDirectQuantities((current) => ({ ...current, [candidate.mrLineId]: event.target.value }))} /></label></div>; })}</div>
      )}

      <div className="src-section-heading"><div><strong>Selected bidders</strong><span>Use active supplier/subcontractor records from the governed supplier master.</span></div><span className="proc-count">{bidderIds.size} selected</span></div>
      {activeSuppliers.length === 0 ? <div className="proc-warning">No active suppliers are available. Create or activate supplier records before forming an RFQ.</div> : <div className="src-bidder-grid">{activeSuppliers.map((supplier) => <label className={`src-bidder-card${bidderIds.has(supplier.supplierId) ? ' src-bidder-card--selected' : ''}`} key={supplier.supplierId}><input type="checkbox" checked={bidderIds.has(supplier.supplierId)} onChange={(event) => toggleBidder(supplier.supplierId, event.target.checked)} /><span><strong>{supplier.supplierCode} — {supplier.legalName}</strong><small>{readable(supplier.supplierType)}{supplier.primaryContact ? ` · ${supplier.primaryContact.displayName}` : ''}</small></span></label>)}</div>}

      {create.isError ? <p className="form-error" role="alert">{create.error.message}</p> : null}
      <div className="proc-form__actions"><span className="proc-hint">The event is created as a governed draft; issue/revision publication remains a later sourcing action.</span><button className="primary-button" type="submit" disabled={create.isPending || !title.trim() || !responseDueAt || sourceCount === 0 || bidderIds.size === 0}>{create.isPending ? 'Creating…' : `Create ${eventType} draft`}</button></div>
    </form>
  );
}

function RfqDetail({ session, rfqId, onClose }: { readonly session: DevelopmentSession; readonly rfqId: string; readonly onClose: () => void }) {
  const detail = useQuery({ queryKey: ['sourcing-rfq', session, rfqId], queryFn: () => sourcingJson<RfqDetailResponse>(`/procurement/rfqs/${rfqId}`, session) });
  if (detail.isPending) return <div className="proc-loading">Opening RFQ…</div>;
  if (detail.isError) return <div className="proc-error"><strong>RFQ unavailable</strong><span>{detail.error.message}</span><button className="secondary-button" type="button" onClick={onClose}>Back</button></div>;
  const value = detail.data.rfq;
  return (
    <div className="proc-detail">
      <div className="proc-detail__header"><div><button className="proc-back" type="button" onClick={onClose}>← RFQs / Tenders</button><span className="proc-kicker">{value.eventType}</span><h2>{value.rfqNumber}</h2><p>{value.title}</p></div><Status value={value.status} /></div>
      <div className="proc-detail-grid"><div><span>Project</span><strong>{value.projectCode} — {value.projectName}</strong></div><div><span>Package</span><strong>{value.packageNumber ?? 'Direct MR sourcing'}</strong></div><div><span>Buyer</span><strong>{value.buyerName}</strong></div><div><span>Response due</span><strong>{new Date(value.responseDueAt).toLocaleString()}</strong><small>{value.responseTimezone}</small></div><div><span>Currency / pricing</span><strong>{value.currency} · {readable(value.pricingBasis)}</strong></div><div><span>Revision</span><strong>R{value.revisionNo}</strong></div></div>
      <div className="src-detail-columns"><section><div className="src-section-heading"><div><strong>Pricing lines</strong><span>{value.sourceLineCount} governed source line{value.sourceLineCount === 1 ? '' : 's'}</span></div></div><div className="proc-table-wrap"><table className="proc-table proc-table--lines"><thead><tr><th>Line</th><th>Source</th><th>Description / specification</th><th>Quantity</th><th>Required</th></tr></thead><tbody>{value.lines.map((line) => <tr key={line.rfqLineId}><td className="proc-number">{line.lineNo}</td><td><strong>{line.mrNumber}</strong><small>MR line {line.sourceLineNo}</small></td><td><strong>{line.description}</strong><small>{line.specification ?? 'No additional specification'}</small></td><td><strong>{line.quantity} {line.uomCode}</strong></td><td>{line.requiredDate ?? '—'}</td></tr>)}</tbody></table></div></section><section><div className="src-section-heading"><div><strong>Bidders</strong><span>{value.bidderCount} selected supplier{value.bidderCount === 1 ? '' : 's'}</span></div></div><div className="src-bidder-register">{value.bidders.map((bidder) => <div key={bidder.rfqBidderId}><div><strong>{bidder.supplierCode} — {bidder.legalName}</strong><small>{bidder.contactName ?? 'No primary tender contact'}{bidder.contactEmail ? ` · ${bidder.contactEmail}` : ''}</small></div><Status value={bidder.invitationState} /></div>)}</div></section></div>
      {value.paymentTermRequirement || value.commercialInstructions || value.submissionInstructions ? <div className="src-instruction-grid">{value.paymentTermRequirement ? <div><span>Payment terms required</span><p>{value.paymentTermRequirement}</p></div> : null}{value.commercialInstructions ? <div><span>Commercial instructions</span><p>{value.commercialInstructions}</p></div> : null}{value.submissionInstructions ? <div><span>Submission instructions</span><p>{value.submissionInstructions}</p></div> : null}</div> : null}
      <div className="src-lineage-note"><strong>Governed sourcing basis</strong><span>{value.routePolicyKey} · policy v{value.routePolicyVersion} · {readable(value.evaluationMode)} · {readable(value.bidVisibilityPolicy)}</span></div>
    </div>
  );
}

function RfqWorkspace({ session, locale, projects }: { readonly session: DevelopmentSession; readonly locale: SupportedLocale; readonly projects: readonly WorkspaceProject[] }) {
  const [creating, setCreating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const rfqs = useQuery({ queryKey: ['sourcing-rfqs', session], queryFn: () => sourcingJson<RfqListResponse>('/procurement/rfqs', session) });
  const packages = useQuery({ queryKey: ['sourcing-packages', session], queryFn: () => sourcingJson<ProcurementPackageListResponse>('/procurement/packages', session) });
  const candidates = useQuery({ queryKey: ['sourcing-candidates', session], queryFn: () => sourcingJson<SourcingCandidatesResponse>('/procurement/sourcing/candidates', session) });
  const suppliers = useQuery({ queryKey: ['procurement-suppliers', session], queryFn: () => sourcingJson<SupplierListResponse>('/procurement/suppliers', session) });

  if (selectedId) return <RfqDetail session={session} rfqId={selectedId} onClose={() => setSelectedId(null)} />;
  if (creating && packages.data && candidates.data && suppliers.data) return <RfqCreateForm session={session} projects={projects} packages={packages.data.packages} candidates={candidates.data.candidates} suppliers={suppliers.data.suppliers} onDone={(rfqId) => { setCreating(false); if (rfqId) setSelectedId(rfqId); }} />;

  const rows = rfqs.data?.rfqs ?? [];
  const dependenciesPending = packages.isPending || candidates.isPending || suppliers.isPending;
  return (
    <div className="proc-page">
      <div className="proc-page__header"><div><span className="proc-kicker">Competitive sourcing</span><h2>{locale === 'ar' ? 'طلبات الأسعار والمناقصات' : 'RFQs / Tenders'}</h2><p>{locale === 'ar' ? 'أنشئ حدث شراء من طلب معتمد أو حزمة مشتريات، وحدد الموردين وشروط الرد.' : 'Create competitive sourcing events from approved MR demand or procurement packages, with bidder and commercial-return controls.'}</p></div><button className="primary-button" type="button" disabled={projects.length === 0 || dependenciesPending} onClick={() => setCreating(true)}>+ {locale === 'ar' ? 'طلب أسعار جديد' : 'New RFQ / Tender'}</button></div>
      {rfqs.isPending ? <div className="proc-loading">Loading RFQs and tenders…</div> : null}
      {rfqs.isError ? <div className="proc-error"><strong>RFQ register unavailable</strong><span>{rfqs.error.message}</span><button className="secondary-button" type="button" onClick={() => rfqs.refetch()}>Retry</button></div> : null}
      {rows.length === 0 && rfqs.data ? <EmptyState title="No RFQs or tenders yet" body="Form the first competitive sourcing event from approved MR demand or a procurement package." action="Create RFQ / Tender" onAction={() => setCreating(true)} /> : null}
      {rows.length > 0 ? <div className="proc-table-wrap"><table className="proc-table"><thead><tr><th>Event</th><th>Title</th><th>Project / package</th><th>Response due</th><th>Commercial basis</th><th>Lines</th><th>Bidders</th><th>Status</th></tr></thead><tbody>{rows.map((value) => <tr className="proc-table__clickable" key={value.rfqId} onClick={() => setSelectedId(value.rfqId)}><td><strong className="proc-number">{value.rfqNumber}</strong><small>{value.eventType} · R{value.revisionNo}</small></td><td><strong>{value.title}</strong><small>Buyer {value.buyerName}</small></td><td>{value.projectCode}<small>{value.packageNumber ?? 'Direct MR sourcing'}</small></td><td>{new Date(value.responseDueAt).toLocaleString()}<small>{value.responseTimezone}</small></td><td>{value.currency}<small>{readable(value.pricingBasis)}</small></td><td>{value.sourceLineCount}</td><td>{value.bidderCount}</td><td><Status value={value.status} /></td></tr>)}</tbody></table></div> : null}
    </div>
  );
}

export function SourcingWorkspace({
  page,
  session,
  locale,
  projects,
}: {
  readonly page: SourcingPage;
  readonly session: DevelopmentSession;
  readonly locale: SupportedLocale;
  readonly projects: readonly WorkspaceProject[];
}) {
  return page === 'packages'
    ? <PackageWorkspace session={session} locale={locale} projects={projects} />
    : <RfqWorkspace session={session} locale={locale} projects={projects} />;
}
