import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { StrictMode, useEffect, useState, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';

import type {
  CreateProjectResponse,
  PlatformWorkspaceSnapshot,
  WorkspaceProject,
} from '@cpos/contracts';
import {
  AppShell,
  directionForLocale,
  LocaleToggle,
  type SupportedLocale,
} from '@cpos/ui-foundation';
import '@cpos/ui-foundation/styles.css';

import { BidComparisonWorkspace } from './comparison.js';
import { ProcurementWorkspace, type ProcurementPage } from './procurement.js';
import { SupplierResponseWorkspace } from './responses.js';
import { SourcingWorkspace, type SourcingPage } from './sourcing.js';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 15_000 },
    mutations: { retry: false },
  },
});

interface DevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

type WorkspacePage = 'overview' | 'projects' | 'responses' | 'comparisons' | ProcurementPage | SourcingPage;
const storageKey = 'cpos.development-session.v1';

function loadStoredSession(): DevelopmentSession | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DevelopmentSession>;
    return typeof parsed.tenantId === 'string' && typeof parsed.principalId === 'string'
      ? { tenantId: parsed.tenantId, principalId: parsed.principalId }
      : null;
  } catch {
    return null;
  }
}

function sessionHeaders(session: DevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

class ApiError extends Error {
  public constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchJson<T>(url: string, session: DevelopmentSession, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { ...sessionHeaders(session), ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { readonly message?: string; readonly code?: string };
      detail = body.message ?? body.code ?? detail;
    } catch {
      // Keep the HTTP fallback.
    }
    throw new ApiError(response.status, detail);
  }
  return (await response.json()) as T;
}

function stateTone(state: string): 'good' | 'warn' | 'muted' {
  if (state === 'ACTIVE') return 'good';
  if (state === 'SUSPENDED' || state === 'EXPIRED' || state === 'ON_HOLD') return 'warn';
  return 'muted';
}

function SessionSetup({
  locale,
  onConnect,
}: {
  readonly locale: SupportedLocale;
  readonly onConnect: (session: DevelopmentSession) => void;
}) {
  const [tenantId, setTenantId] = useState('');
  const [principalId, setPrincipalId] = useState('');
  const copy = locale === 'ar'
    ? {
        eyebrow: 'جلسة التطوير',
        title: 'افتح مساحة عمل CPOS الحقيقية',
        body: 'استخدم معرف المستأجر ومعرف المستخدم من قاعدة البيانات. وظائف المشتريات في هذه النسخة مرتبطة ببيانات حقيقية وليست بيانات عرض وهمية.',
        tenant: 'معرف المستأجر',
        principal: 'معرف المستخدم',
        action: 'فتح مساحة العمل',
      }
    : {
        eyebrow: 'Development session',
        title: 'Open a real CPOS workspace',
        body: 'Use a tenant ID and principal ID from the database. Procurement modules in this build are database-backed—not demo records.',
        tenant: 'Tenant ID',
        principal: 'Principal ID',
        action: 'Open workspace',
      };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tenantId.trim() || !principalId.trim()) return;
    onConnect({ tenantId: tenantId.trim(), principalId: principalId.trim() });
  }

  return (
    <section className="session-stage">
      <div className="session-card">
        <div className="brand-mark" aria-hidden="true">CP</div>
        <p className="product-eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p className="session-copy">{copy.body}</p>
        <form className="session-form" onSubmit={submit}>
          <label><span>{copy.tenant}</span><input value={tenantId} onChange={(e) => setTenantId(e.target.value)} placeholder="019d…" autoComplete="off" spellCheck={false} /></label>
          <label><span>{copy.principal}</span><input value={principalId} onChange={(e) => setPrincipalId(e.target.value)} placeholder="019d…" autoComplete="off" spellCheck={false} /></label>
          <button className="primary-button" type="submit">{copy.action}</button>
        </form>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  selected,
  onSelect,
}: {
  readonly project: WorkspaceProject;
  readonly selected: boolean;
  readonly onSelect: () => void;
}) {
  return (
    <button className={`project-card${selected ? ' project-card--selected' : ''}`} type="button" onClick={onSelect}>
      <span className="project-code">{project.projectCode}</span>
      <strong>{project.displayName}</strong>
      <span className={`status-pill status-pill--${stateTone(project.lifecycleState)}`}>{project.lifecycleState}</span>
    </button>
  );
}

function NewProjectForm({
  session,
  onDone,
}: {
  readonly session: DevelopmentSession;
  readonly onDone: () => void;
}) {
  const client = useQueryClient();
  const [projectCode, setProjectCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const createProject = useMutation({
    mutationFn: () => fetchJson<CreateProjectResponse>('/platform/projects', session, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ projectCode, displayName }),
    }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['platform-workspace', session] });
      onDone();
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createProject.mutate();
  }

  return (
    <form className="new-project-form" onSubmit={submit}>
      <h4>Create project</h4>
      <div className="form-grid">
        <label><span>Project code</span><input value={projectCode} onChange={(e) => setProjectCode(e.target.value)} placeholder="UAQ-0066" required /></label>
        <label><span>Project name</span><input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="UAQ Villa — Plot 0066" required /></label>
      </div>
      {createProject.isError ? <p className="form-error" role="alert">{createProject.error.message}</p> : null}
      <div className="form-actions"><button className="secondary-button" type="button" onClick={onDone}>Cancel</button><button className="primary-button" type="submit" disabled={createProject.isPending}>Create project</button></div>
    </form>
  );
}

function ProjectsPage({
  workspace,
  session,
  selectedProjectId,
  setSelectedProjectId,
}: {
  readonly workspace: PlatformWorkspaceSnapshot;
  readonly session: DevelopmentSession;
  readonly selectedProjectId: string | null;
  readonly setSelectedProjectId: (projectId: string) => void;
}) {
  const [creating, setCreating] = useState(false);
  return (
    <section className="panel projects-panel">
      <div className="panel-heading">
        <div><p className="panel-kicker">Project context</p><h3>Projects</h3><p>Active project contexts used by procurement demand, packages and commercial documents.</p></div>
        <button className="primary-button primary-button--compact" type="button" disabled={!workspace.capabilities.canCreateProject} onClick={() => setCreating(true)}>+ New project</button>
      </div>
      {creating ? <NewProjectForm session={session} onDone={() => setCreating(false)} /> : null}
      <div className="project-list">
        {workspace.projects.length === 0 ? <div className="empty-state"><span className="empty-icon">P</span><p>No projects yet. Create the first project before raising procurement demand.</p></div> : workspace.projects.map((project) => <ProjectCard key={project.projectId} project={project} selected={project.projectId === selectedProjectId} onSelect={() => setSelectedProjectId(project.projectId)} />)}
      </div>
    </section>
  );
}

function Overview({ workspace }: { readonly workspace: PlatformWorkspaceSnapshot }) {
  const subscriptionRestricted = workspace.subscription !== null && workspace.subscription.accessMode !== 'FULL';
  return (
    <>
      {subscriptionRestricted ? <div className="restriction-banner" role="status"><div><strong>Commercial access is restricted</strong><span>Read/export remains available where policy permits, but entitled write commands are not active.</span></div><span className="status-pill status-pill--warn">{workspace.subscription?.lifecycleState}</span></div> : null}
      <div className="metric-grid">
        <article className="metric-card"><span>Projects</span><strong>{workspace.projects.length}</strong><small>Governed project contexts</small></article>
        <article className="metric-card"><span>Company members</span><strong>{workspace.memberships.length}</strong><small>{workspace.currentMembership?.roles.join(', ') || 'No active role'}</small></article>
        <article className="metric-card"><span>Workspace access</span><strong>{workspace.subscription?.lifecycleState ?? 'SETUP'}</strong><small>{workspace.subscription?.accessMode.replaceAll('_', ' ') ?? 'NO SUBSCRIPTION'}</small></article>
        <article className="metric-card"><span>Product mode</span><strong>V2 LIVE</strong><small>Supplier → MR → Package → RFQ → Quote → Leveling</small></article>
      </div>
      <div className="content-grid">
        <section className="panel">
          <div className="panel-heading"><div><p className="panel-kicker">What works now</p><h3>Procurement workspace</h3><p>The current vertical build uses real tenant/project data and governed database writes.</p></div></div>
          <div className="overview-capabilities">
            <div><strong>Supplier master</strong><span>Legal identity, supplier type, primary contact and compliance foundation.</span></div>
            <div><strong>Material / Purchase Requisition</strong><span>Numbered project demand with free-form construction lines, approvals and sourcing-route authority.</span></div>
            <div><strong>Packages & RFQs / Tenders</strong><span>Governed source-line packaging, bidder selection, commercial return basis and live sourcing registers.</span></div>
            <div><strong>Supplier responses</strong><span>Immutable RFQ issue basis, intent/no-bid, buyer capture and append-only quotation revisions.</span></div>
            <div><strong>Bid comparison / leveling</strong><span>Side-by-side source truth, explicit gaps, buyer normalization, adjustments and an immutable frozen comparison basis.</span></div>
          </div>
        </section>
        <section className="panel subscription-panel">
          <div className="panel-heading"><div><p className="panel-kicker">Company</p><h3>{workspace.company?.legalName ?? workspace.tenant.displayName}</h3></div><span className={`status-pill status-pill--${stateTone(workspace.tenant.lifecycleState)}`}>{workspace.tenant.lifecycleState}</span></div>
          <dl className="detail-list"><div><dt>Current user</dt><dd>{workspace.principal.displayName}</dd></div><div><dt>Roles</dt><dd>{workspace.currentMembership?.roles.join(', ') || '—'}</dd></div><div><dt>Tenant</dt><dd className="mono">{workspace.tenant.tenantId}</dd></div></dl>
        </section>
      </div>
    </>
  );
}

function Workspace({
  workspace,
  session,
  locale,
  onChangeSession,
}: {
  readonly workspace: PlatformWorkspaceSnapshot;
  readonly session: DevelopmentSession;
  readonly locale: SupportedLocale;
  readonly onChangeSession: () => void;
}) {
  const [page, setPage] = useState<WorkspacePage>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(workspace.projects[0]?.projectId ?? null);

  const labels = locale === 'ar'
    ? { overview: 'نظرة عامة', projects: 'المشاريع', suppliers: 'الموردون', requisitions: 'طلبات الشراء', packages: 'حزم المشتريات', rfqs: 'طلبات الأسعار / المناقصات', responses: 'ردود الموردين / العروض', comparisons: 'مقارنة العروض', approvals: 'الموافقات', reports: 'التقارير', change: 'تغيير الجلسة' }
    : { overview: 'Overview', projects: 'Projects', suppliers: 'Suppliers', requisitions: 'Requisitions', packages: 'Packages', rfqs: 'RFQs / Tenders', responses: 'Supplier Responses / Quotes', comparisons: 'Bid Comparison / Leveling', approvals: 'Approvals', reports: 'Reports', change: 'Change session' };

  const navigation: readonly { readonly page?: WorkspacePage; readonly label: string; readonly badge: string; readonly disabled?: boolean }[] = [
    { page: 'overview', label: labels.overview, badge: 'HOME' },
    { page: 'projects', label: labels.projects, badge: String(workspace.projects.length).padStart(2, '0') },
    { page: 'suppliers', label: labels.suppliers, badge: 'LIVE' },
    { page: 'requisitions', label: labels.requisitions, badge: 'LIVE' },
    { page: 'packages', label: labels.packages, badge: 'LIVE' },
    { page: 'rfqs', label: labels.rfqs, badge: 'LIVE' },
    { page: 'responses', label: labels.responses, badge: 'LIVE' },
    { page: 'comparisons', label: labels.comparisons, badge: 'LIVE' },
    { label: labels.approvals, badge: 'NEXT', disabled: true },
    { label: labels.reports, badge: 'NEXT', disabled: true },
  ];

  const pageTitle = page === 'suppliers'
    ? labels.suppliers
    : page === 'requisitions'
      ? labels.requisitions
      : page === 'packages'
        ? labels.packages
        : page === 'rfqs'
          ? labels.rfqs
          : page === 'responses'
            ? labels.responses
            : page === 'comparisons'
              ? labels.comparisons
              : page === 'projects'
                ? labels.projects
                : 'Workspace';

  return (
    <div className="dashboard-layout">
      <aside className="side-rail" aria-label="Workspace navigation">
        <div className="side-brand"><div className="brand-mark brand-mark--small" aria-hidden="true">CP</div><div><strong>CPOS</strong><span>Construction Procurement</span></div></div>
        <nav className="side-nav">
          {navigation.map((item) => <button className={`nav-item${item.page === page ? ' nav-item--active' : ''}`} type="button" key={item.label} disabled={item.disabled} onClick={() => item.page && setPage(item.page)}><span>{item.label}</span><small>{item.badge}</small></button>)}
        </nav>
        <div className="side-footer"><button className="session-chip" type="button" onClick={onChangeSession}><span className="avatar">{workspace.principal.displayName.slice(0, 1).toUpperCase()}</span><span><strong>{workspace.principal.displayName}</strong><small>{labels.change}</small></span></button></div>
      </aside>

      <section className="dashboard-content">
        <div className="workspace-hero">
          <div><p className="product-eyebrow">{pageTitle}</p><h2>{page === 'overview' ? `Good evening, ${workspace.principal.displayName.split(' ')[0]}` : pageTitle}</h2><p>{page === 'overview' ? 'Construction procurement work, supplier context and project demand in one governed workspace.' : 'Architecture V2 live implementation — real product records, not demo cards.'}</p></div>
          <div className="hero-company"><span>Company</span><strong>{workspace.company?.legalName ?? workspace.tenant.displayName}</strong><small>{workspace.projects.find((project) => project.projectId === selectedProjectId)?.projectCode ?? 'No project selected'}</small></div>
        </div>

        {page === 'overview' ? <Overview workspace={workspace} /> : null}
        {page === 'projects' ? <ProjectsPage workspace={workspace} session={session} selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} /> : null}
        {page === 'suppliers' || page === 'requisitions' ? <ProcurementWorkspace page={page} session={session} locale={locale} projects={workspace.projects} /> : null}
        {page === 'packages' || page === 'rfqs' ? <SourcingWorkspace page={page} session={session} locale={locale} projects={workspace.projects} /> : null}
        {page === 'responses' ? <SupplierResponseWorkspace session={session} locale={locale} /> : null}
        {page === 'comparisons' ? <BidComparisonWorkspace session={session} locale={locale} /> : null}
      </section>
    </div>
  );
}

function InternalApp() {
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const [session, setSession] = useState<DevelopmentSession | null>(() => loadStoredSession());

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = directionForLocale(locale);
  }, [locale]);

  useEffect(() => {
    if (session) window.localStorage.setItem(storageKey, JSON.stringify(session));
    else window.localStorage.removeItem(storageKey);
  }, [session]);

  const workspace = useQuery({
    queryKey: ['platform-workspace', session],
    enabled: session !== null,
    queryFn: () => {
      if (!session) throw new Error('session is required');
      return fetchJson<PlatformWorkspaceSnapshot>('/platform/workspace', session);
    },
  });

  return (
    <AppShell productName="Construction Procurement OS" surfaceName={locale === 'ar' ? 'مساحة المشتريات' : 'Procurement workspace'} locale={locale} navigationLabel={locale === 'ar' ? 'إجراءات مساحة العمل' : 'Workspace actions'} actions={<LocaleToggle locale={locale} onChange={setLocale} />}>
      {!session ? <SessionSetup locale={locale} onConnect={setSession} /> : null}
      {session && workspace.isPending ? <div className="loading-stage"><div className="loading-orbit" aria-hidden="true" /><strong>{locale === 'ar' ? 'جارٍ فتح مساحة العمل…' : 'Opening governed workspace…'}</strong></div> : null}
      {session && workspace.isError ? <section className="error-stage"><p className="product-eyebrow">Connection</p><h2>Workspace could not be opened</h2><p>{workspace.error.message}</p><div className="form-actions"><button className="secondary-button" type="button" onClick={() => workspace.refetch()}>Retry</button><button className="primary-button" type="button" onClick={() => setSession(null)}>Change session</button></div></section> : null}
      {session && workspace.data ? <Workspace workspace={workspace.data} session={session} locale={locale} onChangeSession={() => setSession(null)} /> : null}
    </AppShell>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('root element is missing');

createRoot(rootElement).render(<StrictMode><QueryClientProvider client={queryClient}><InternalApp /></QueryClientProvider></StrictMode>);
