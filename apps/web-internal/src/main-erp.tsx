import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { StrictMode, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

import type { PlatformWorkspaceSnapshot } from '@cpos/contracts';
import type { SupportedLocale } from '@cpos/ui-foundation';
import '@cpos/ui-foundation/styles.css';

import { BidComparisonWorkspace } from './comparison.js';
import { ProcurementDecisionWorkspace } from './decision.js';
import { ErpRequisitionWorkspaceS03, type ErpDevelopmentSession } from './erp-requisition-s03.js';
import { ProcurementWorkspace } from './procurement.js';
import { SupplierResponseWorkspace } from './responses.js';
import { SourcingWorkspace } from './sourcing.js';
import './styles.css';
import './erp-shell.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false, staleTime: 15_000 },
    mutations: { retry: false },
  },
});

const storageKey = 'cpos.development-session.v1';
const reviewTenantId = '019f1500-0000-7000-8000-000000000001';
const reviewPrincipalId = '019f1500-0000-7000-8000-000000000002';

type WorkspacePage = 'requisitions' | 'suppliers' | 'packages' | 'rfqs' | 'responses' | 'comparisons' | 'decisions';

function loadStoredSession(): ErpDevelopmentSession | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ErpDevelopmentSession>;
    return typeof parsed.tenantId === 'string' && typeof parsed.principalId === 'string'
      ? { tenantId: parsed.tenantId, principalId: parsed.principalId }
      : null;
  } catch {
    return null;
  }
}

function sessionHeaders(session: ErpDevelopmentSession): HeadersInit {
  return {
    accept: 'application/json',
    'x-cpos-session-mode': 'development',
    'x-cpos-tenant-id': session.tenantId,
    'x-cpos-principal-id': session.principalId,
  };
}

async function fetchJson<T>(url: string, session: ErpDevelopmentSession): Promise<T> {
  const response = await fetch(url, { headers: sessionHeaders(session) });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const payload = (await response.json()) as { readonly message?: string; readonly code?: string };
      message = payload.message ?? payload.code ?? message;
    } catch {
      // Keep HTTP fallback.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

function SessionSetup({ onConnect }: { readonly onConnect: (session: ErpDevelopmentSession) => void }) {
  const [tenantId, setTenantId] = useState('');
  const [principalId, setPrincipalId] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tenantId.trim() || !principalId.trim()) return;
    onConnect({ tenantId: tenantId.trim(), principalId: principalId.trim() });
  }

  return (
    <main className="erp-login-stage">
      <section className="erp-login-card">
        <div className="erp-brand-mark">CP</div>
        <h1>Construction Procurement OS</h1>
        <p>Open the governed procurement workspace. The review profile below uses the seeded Ground Tech Architecture V2 dataset.</p>
        <form className="erp-login-form" onSubmit={submit}>
          <label><span>Tenant ID</span><input value={tenantId} onChange={(event) => setTenantId(event.target.value)} placeholder="Tenant UUID" /></label>
          <label><span>Principal ID</span><input value={principalId} onChange={(event) => setPrincipalId(event.target.value)} placeholder="Principal UUID" /></label>
          <div className="erp-login-actions">
            <button className="erp-button erp-button--ghost" type="button" onClick={() => onConnect({ tenantId: reviewTenantId, principalId: reviewPrincipalId })}>Open V2 review workspace</button>
            <button className="erp-button erp-button--primary" type="submit">Open workspace</button>
          </div>
        </form>
      </section>
    </main>
  );
}

function NavItem({
  page,
  active,
  icon,
  label,
  badge,
  onClick,
}: {
  readonly page: WorkspacePage;
  readonly active: WorkspacePage;
  readonly icon: string;
  readonly label: string;
  readonly badge?: string;
  readonly onClick: (page: WorkspacePage) => void;
}) {
  return (
    <button className={active === page ? 'erp-nav-item erp-nav-item--active' : 'erp-nav-item'} type="button" onClick={() => onClick(page)}>
      <span className="erp-nav-icon">{icon}</span><span>{label}</span><small className="erp-nav-badge">{badge ?? ''}</small>
    </button>
  );
}

function NavSection({ title, children }: { readonly title: string; readonly children: ReactNode }) {
  return <section className="erp-nav-section"><span className="erp-nav-heading">{title}</span>{children}</section>;
}

function WorkspaceShell({
  workspace,
  session,
  locale,
  setLocale,
  onChangeSession,
}: {
  readonly workspace: PlatformWorkspaceSnapshot;
  readonly session: ErpDevelopmentSession;
  readonly locale: SupportedLocale;
  readonly setLocale: (locale: SupportedLocale) => void;
  readonly onChangeSession: () => void;
}) {
  const [page, setPage] = useState<WorkspacePage>('requisitions');
  const [projectScopeId, setProjectScopeId] = useState<string | null>(null);

  const copy = locale === 'ar'
    ? {
        demand: 'الطلب', requisitions: 'طلبات الشراء', supply: 'سلسلة التوريد', suppliers: 'الموردون', sourcing: 'التوريد', packages: 'الحزم', rfqs: 'طلبات الأسعار / المناقصات', responses: 'عروض الموردين', commercial: 'القرار التجاري', comparisons: 'مقارنة العروض', decisions: 'التوصية / الموافقة / الترسية', project: 'نطاق المشروع', allProjects: 'كل المشاريع', change: 'تغيير الجلسة', workspace: 'مساحة المشتريات',
      }
    : {
        demand: 'Demand', requisitions: 'Requisitions', supply: 'Supply chain', suppliers: 'Suppliers & subcontractors', sourcing: 'Sourcing', packages: 'Procurement packages', rfqs: 'RFQs / Tenders', responses: 'Supplier responses', commercial: 'Commercial decision', comparisons: 'Bid comparison / leveling', decisions: 'Recommendation / approval / award', project: 'Project scope', allProjects: 'All projects', change: 'Change session', workspace: 'Procurement workspace',
      };

  const title: Record<WorkspacePage, string> = {
    requisitions: copy.requisitions,
    suppliers: copy.suppliers,
    packages: copy.packages,
    rfqs: copy.rfqs,
    responses: copy.responses,
    comparisons: copy.comparisons,
    decisions: copy.decisions,
  };

  return (
    <div className="erp-app">
      <header className="erp-topbar">
        <div className="erp-brand"><span className="erp-brand-mark">CP</span><div><strong>Construction Procurement OS</strong><small>{copy.workspace}</small></div></div>
        <div className="erp-context-bar">
          <span className="erp-context-label">{copy.project}</span>
          <select className="erp-project-select" value={projectScopeId ?? ''} onChange={(event) => setProjectScopeId(event.target.value || null)}>
            <option value="">{copy.allProjects}</option>
            {workspace.projects.map((project) => <option key={project.projectId} value={project.projectId}>{project.projectCode} — {project.displayName}</option>)}
          </select>
          <span className="erp-build-label">Architecture V2</span>
        </div>
        <div className="erp-top-actions">
          <button className="erp-top-button" type="button" onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}>{locale === 'en' ? 'AR' : 'EN'}</button>
          <div className="erp-user-chip"><span className="erp-user-avatar">{workspace.principal.displayName.slice(0, 1).toUpperCase()}</span><div><strong>{workspace.principal.displayName}</strong><small>{workspace.currentMembership?.roles.join(', ') || 'User'}</small></div></div>
        </div>
      </header>

      <div className="erp-layout">
        <aside className="erp-sidebar">
          <NavSection title={copy.demand}>
            <NavItem page="requisitions" active={page} icon="MR" label={copy.requisitions} onClick={setPage} />
          </NavSection>
          <NavSection title={copy.supply}>
            <NavItem page="suppliers" active={page} icon="SUP" label={copy.suppliers} onClick={setPage} />
          </NavSection>
          <NavSection title={copy.sourcing}>
            <NavItem page="packages" active={page} icon="PKG" label={copy.packages} onClick={setPage} />
            <NavItem page="rfqs" active={page} icon="RFQ" label={copy.rfqs} onClick={setPage} />
            <NavItem page="responses" active={page} icon="QTE" label={copy.responses} onClick={setPage} />
          </NavSection>
          <NavSection title={copy.commercial}>
            <NavItem page="comparisons" active={page} icon="CMP" label={copy.comparisons} onClick={setPage} />
            <NavItem page="decisions" active={page} icon="AWD" label={copy.decisions} onClick={setPage} />
          </NavSection>
          <div className="erp-sidebar-footer"><button type="button" onClick={onChangeSession}>{copy.change}</button></div>
        </aside>

        <main className="erp-workspace">
          <div className="erp-workbar"><div className="erp-workbar-path"><span>Ground Tech</span><span>›</span><strong>{title[page]}</strong></div><div className="erp-workbar-path"><span>{workspace.company?.legalName ?? workspace.tenant.displayName}</span></div></div>
          <div className="erp-workarea">
            {page === 'requisitions' ? <ErpRequisitionWorkspaceS03 session={session} projects={workspace.projects} projectScopeId={projectScopeId} /> : null}
            {page === 'suppliers' ? <ProcurementWorkspace page="suppliers" session={session} locale={locale} projects={workspace.projects} /> : null}
            {page === 'packages' ? <SourcingWorkspace page="packages" session={session} locale={locale} projects={workspace.projects} /> : null}
            {page === 'rfqs' ? <SourcingWorkspace page="rfqs" session={session} locale={locale} projects={workspace.projects} /> : null}
            {page === 'responses' ? <SupplierResponseWorkspace session={session} locale={locale} /> : null}
            {page === 'comparisons' ? <BidComparisonWorkspace session={session} locale={locale} /> : null}
            {page === 'decisions' ? <ProcurementDecisionWorkspace session={session} locale={locale} /> : null}
          </div>
        </main>
      </div>
    </div>
  );
}

function InternalErpApp() {
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const [session, setSession] = useState<ErpDevelopmentSession | null>(() => loadStoredSession());

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    if (session) window.localStorage.setItem(storageKey, JSON.stringify(session));
    else window.localStorage.removeItem(storageKey);
  }, [session]);

  const workspace = useQuery({
    queryKey: ['platform-workspace', session],
    enabled: session !== null,
    queryFn: () => {
      if (!session) throw new Error('Session is required.');
      return fetchJson<PlatformWorkspaceSnapshot>('/platform/workspace', session);
    },
  });

  if (!session) return <SessionSetup onConnect={setSession} />;
  if (workspace.isPending) return <main className="erp-login-stage"><div className="erp-state"><strong>Opening procurement workspace…</strong></div></main>;
  if (workspace.isError) return <main className="erp-login-stage"><section className="erp-login-card"><h1>Workspace unavailable</h1><p>{workspace.error.message}</p><div className="erp-login-actions"><button className="erp-button" type="button" onClick={() => workspace.refetch()}>Retry</button><button className="erp-button erp-button--primary" type="button" onClick={() => setSession(null)}>Change session</button></div></section></main>;

  return <WorkspaceShell workspace={workspace.data} session={session} locale={locale} setLocale={setLocale} onChangeSession={() => setSession(null)} />;
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element is missing.');

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InternalErpApp />
    </QueryClientProvider>
  </StrictMode>,
);
