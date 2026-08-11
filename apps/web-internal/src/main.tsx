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

import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 15_000,
    },
    mutations: {
      retry: false,
    },
  },
});

interface DevelopmentSession {
  readonly tenantId: string;
  readonly principalId: string;
}

const storageKey = 'cpos.development-session.v1';

const demoSession: DevelopmentSession = {
  tenantId: '019d1111-1111-7111-8111-111111111111',
  principalId: '019d3333-3333-7333-8333-333333333333',
};

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
  public constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchJson<T>(
  url: string,
  session: DevelopmentSession,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...sessionHeaders(session),
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    let detail = `Request failed with status ${response.status}`;
    try {
      const body = (await response.json()) as { message?: string; code?: string };
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
  if (state === 'SUSPENDED' || state === 'EXPIRED') return 'warn';
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
  const copy =
    locale === 'ar'
      ? {
          eyebrow: 'جلسة تطوير آمنة',
          title: 'افتح مساحة عمل CPOS',
          body: 'أدخل معرف المستأجر ومعرف المستخدم من بيانات B02. هذه بوابة تطوير فقط وليست بديلاً عن مزود تسجيل الدخول النهائي.',
          tenant: 'معرف المستأجر',
          principal: 'معرف المستخدم',
          action: 'فتح مساحة العمل',
          demo: 'فتح مساحة العرض',
          note: 'مساحة العرض معزولة وغير إنتاجية. قاعدة بيانات B02 المحكومة تبقى مستقلة ولا يتم تجاوزها.',
        }
      : {
          eyebrow: 'Safe development session',
          title: 'Open a CPOS workspace',
          body: 'Enter a tenant ID and principal ID from the B02 dataset. This is a development gateway, not a replacement for the final authentication provider.',
          tenant: 'Tenant ID',
          principal: 'Principal ID',
          action: 'Open workspace',
          demo: 'Open demo workspace',
          note: 'The demo workspace is isolated and non-production. The governed B02 database remains separate and is not bypassed.',
        };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tenantId.trim() || !principalId.trim()) return;
    onConnect({ tenantId: tenantId.trim(), principalId: principalId.trim() });
  }

  return (
    <section className="session-stage">
      <div className="session-card">
        <div className="brand-mark" aria-hidden="true">
          CP
        </div>
        <p className="product-eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p className="session-copy">{copy.body}</p>
        <form className="session-form" onSubmit={submit}>
          <label>
            <span>{copy.tenant}</span>
            <input
              value={tenantId}
              onChange={(event) => setTenantId(event.target.value)}
              placeholder="019d…"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label>
            <span>{copy.principal}</span>
            <input
              value={principalId}
              onChange={(event) => setPrincipalId(event.target.value)}
              placeholder="019d…"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <button className="primary-button" type="submit">
            {copy.action}
          </button>
          <button className="secondary-button" type="button" onClick={() => onConnect(demoSession)}>
            {copy.demo}
          </button>
        </form>
        <p className="session-note">{copy.note}</p>
      </div>
    </section>
  );
}

function SubscriptionCard({
  workspace,
  locale,
}: {
  readonly workspace: PlatformWorkspaceSnapshot;
  readonly locale: SupportedLocale;
}) {
  const subscription = workspace.subscription;
  const copy =
    locale === 'ar'
      ? {
          title: 'الحساب والاشتراك',
          noSubscription: 'لا يوجد اشتراك مسجل',
          noSubscriptionBody: 'يمكن إعداد الشركة والمشاريع، لكن أوامر المنتج المدفوعة غير مفعلة.',
          channel: 'القناة التجارية',
          guard: 'نسخة حارس الصلاحيات',
          access: 'وضع الوصول',
        }
      : {
          title: 'Account & subscription',
          noSubscription: 'No subscription recorded',
          noSubscriptionBody:
            'Company and project setup can continue, but entitled product commands are not active.',
          channel: 'Commercial channel',
          guard: 'Entitlement guard',
          access: 'Access mode',
        };

  return (
    <section className="panel subscription-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">SaaS</p>
          <h3>{copy.title}</h3>
        </div>
        <span className={`status-pill status-pill--${stateTone(subscription?.lifecycleState ?? '')}`}>
          {subscription?.lifecycleState ?? copy.noSubscription}
        </span>
      </div>
      {subscription ? (
        <dl className="detail-list">
          <div>
            <dt>{copy.channel}</dt>
            <dd>{subscription.commercialChannel.replaceAll('_', ' ')}</dd>
          </div>
          <div>
            <dt>{copy.access}</dt>
            <dd>{subscription.accessMode.replaceAll('_', ' ')}</dd>
          </div>
          <div>
            <dt>{copy.guard}</dt>
            <dd className="mono">{subscription.entitlementGuardVersion ?? '—'}</dd>
          </div>
        </dl>
      ) : (
        <p className="empty-copy">{copy.noSubscriptionBody}</p>
      )}
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
    <button
      className={`project-card${selected ? ' project-card--selected' : ''}`}
      type="button"
      onClick={onSelect}
    >
      <span className="project-code">{project.projectCode}</span>
      <strong>{project.displayName}</strong>
      <span className={`status-pill status-pill--${stateTone(project.lifecycleState)}`}>
        {project.lifecycleState}
      </span>
    </button>
  );
}

function NewProjectForm({
  session,
  onDone,
  locale,
}: {
  readonly session: DevelopmentSession;
  readonly onDone: () => void;
  readonly locale: SupportedLocale;
}) {
  const client = useQueryClient();
  const [projectCode, setProjectCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const createProject = useMutation({
    mutationFn: () =>
      fetchJson<CreateProjectResponse>('/platform/projects', session, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ projectCode, displayName }),
      }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['platform-workspace', session] });
      onDone();
    },
  });

  const copy =
    locale === 'ar'
      ? {
          title: 'إنشاء مشروع',
          code: 'رمز المشروع',
          name: 'اسم المشروع',
          cancel: 'إلغاء',
          create: 'إنشاء المشروع',
        }
      : {
          title: 'Create project',
          code: 'Project code',
          name: 'Project name',
          cancel: 'Cancel',
          create: 'Create project',
        };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createProject.mutate();
  }

  return (
    <form className="new-project-form" onSubmit={submit}>
      <h4>{copy.title}</h4>
      <div className="form-grid">
        <label>
          <span>{copy.code}</span>
          <input
            value={projectCode}
            onChange={(event) => setProjectCode(event.target.value)}
            placeholder="JP-047"
            required
          />
        </label>
        <label>
          <span>{copy.name}</span>
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Jumeirah Park Villa 47"
            required
          />
        </label>
      </div>
      {createProject.isError ? (
        <p className="form-error" role="alert">
          {createProject.error.message}
        </p>
      ) : null}
      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onDone}>
          {copy.cancel}
        </button>
        <button className="primary-button" type="submit" disabled={createProject.isPending}>
          {copy.create}
        </button>
      </div>
    </form>
  );
}

function Dashboard({
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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    workspace.projects[0]?.projectId ?? null,
  );
  const [creatingProject, setCreatingProject] = useState(false);

  const copy =
    locale === 'ar'
      ? {
          overview: 'نظرة عامة',
          projects: 'المشاريع',
          suppliers: 'الموردون',
          procurement: 'المشتريات',
          approvals: 'الموافقات',
          reports: 'التقارير',
          settings: 'الإعدادات',
          workspace: 'مساحة العمل',
          welcome: 'مساء الخير',
          subtitle: 'مركز التحكم في المشتريات والحوكمة للمقاول.',
          projectsTitle: 'المشاريع',
          projectsBody: 'سياقات المشاريع المصرح بها لهذا المستأجر.',
          addProject: 'مشروع جديد',
          noProjects: 'لا توجد مشاريع بعد. أنشئ أول سياق مشروع للبدء.',
          members: 'أعضاء الشركة',
          memberBody: 'العضويات والأدوار الفعالة كما تراها طبقة RLS الحالية.',
          company: 'الشركة',
          principal: 'المستخدم الحالي',
          change: 'تغيير الجلسة',
          guarded: 'محكوم',
          restrictedTitle: 'الوصول التجاري مقيد',
          restrictedBody:
            'تبقى القراءة والتصدير متاحة حيث تسمح السياسة، لكن أوامر المنتج المميزة ليست نشطة.',
          comingSoon: 'قادم في موجة نطاق المشتريات التالية',
        }
      : {
          overview: 'Overview',
          projects: 'Projects',
          suppliers: 'Suppliers',
          procurement: 'Procurement',
          approvals: 'Approvals',
          reports: 'Reports',
          settings: 'Settings',
          workspace: 'Workspace',
          welcome: 'Good evening',
          subtitle: 'Your contractor procurement and governance control centre.',
          projectsTitle: 'Projects',
          projectsBody: 'Governed project contexts visible to this tenant.',
          addProject: 'New project',
          noProjects: 'No projects yet. Create the first project context to get started.',
          members: 'Company members',
          memberBody: 'Effective memberships and roles as resolved by the current workspace context.',
          company: 'Company',
          principal: 'Current principal',
          change: 'Change session',
          guarded: 'Governed',
          restrictedTitle: 'Commercial access is restricted',
          restrictedBody:
            'Read/export remains available where policy permits, but entitled product commands are not active.',
          comingSoon: 'Coming in the next procurement-domain wave',
        };

  const navigation = [
    [copy.overview, '01'],
    [copy.projects, String(workspace.projects.length).padStart(2, '0')],
    [copy.suppliers, '—'],
    [copy.procurement, '—'],
    [copy.approvals, '—'],
    [copy.reports, '—'],
  ] as const;

  const subscriptionRestricted =
    workspace.subscription !== null && workspace.subscription.accessMode !== 'FULL';

  return (
    <div className="dashboard-layout">
      <aside className="side-rail" aria-label={copy.workspace}>
        <div className="side-brand">
          <div className="brand-mark brand-mark--small" aria-hidden="true">
            CP
          </div>
          <div>
            <strong>CPOS</strong>
            <span>Construction OS</span>
          </div>
        </div>

        <nav className="side-nav">
          {navigation.map(([label, count], index) => (
            <button
              className={`nav-item${index === 0 ? ' nav-item--active' : ''}`}
              type="button"
              key={label}
              disabled={index > 1}
            >
              <span>{label}</span>
              <small>{count}</small>
            </button>
          ))}
        </nav>

        <div className="side-footer">
          <button className="nav-item" type="button" disabled>
            <span>{copy.settings}</span>
            <small>—</small>
          </button>
          <button className="session-chip" type="button" onClick={onChangeSession}>
            <span className="avatar">{workspace.principal.displayName.slice(0, 1).toUpperCase()}</span>
            <span>
              <strong>{workspace.principal.displayName}</strong>
              <small>{copy.change}</small>
            </span>
          </button>
        </div>
      </aside>

      <section className="dashboard-content">
        <div className="workspace-hero">
          <div>
            <p className="product-eyebrow">{copy.workspace}</p>
            <h2>
              {copy.welcome}, {workspace.principal.displayName.split(' ')[0]}
            </h2>
            <p>{copy.subtitle}</p>
          </div>
          <div className="hero-company">
            <span>{copy.company}</span>
            <strong>{workspace.company?.legalName ?? workspace.tenant.displayName}</strong>
            <small className="mono">{workspace.tenant.tenantId.slice(0, 13)}…</small>
          </div>
        </div>

        {subscriptionRestricted ? (
          <div className="restriction-banner" role="status">
            <div>
              <strong>{copy.restrictedTitle}</strong>
              <span>{copy.restrictedBody}</span>
            </div>
            <span className="status-pill status-pill--warn">
              {workspace.subscription?.lifecycleState}
            </span>
          </div>
        ) : null}

        <div className="metric-grid">
          <article className="metric-card">
            <span>{copy.projects}</span>
            <strong>{workspace.projects.length}</strong>
            <small>{copy.guarded}</small>
          </article>
          <article className="metric-card">
            <span>{copy.members}</span>
            <strong>{workspace.memberships.length}</strong>
            <small>{workspace.currentMembership?.roles.join(', ') || '—'}</small>
          </article>
          <article className="metric-card">
            <span>{copy.principal}</span>
            <strong>{workspace.currentMembership?.membershipState ?? '—'}</strong>
            <small>{workspace.principal.lifecycleState}</small>
          </article>
          <article className="metric-card">
            <span>Product access</span>
            <strong>{workspace.subscription?.lifecycleState ?? 'SETUP'}</strong>
            <small>
              {workspace.subscription?.accessMode.replaceAll('_', ' ') ?? 'NO SUBSCRIPTION'}
            </small>
          </article>
        </div>

        <div className="content-grid">
          <section className="panel projects-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">Context</p>
                <h3>{copy.projectsTitle}</h3>
                <p>{copy.projectsBody}</p>
              </div>
              <button
                className="primary-button primary-button--compact"
                type="button"
                disabled={!workspace.capabilities.canCreateProject}
                onClick={() => setCreatingProject(true)}
              >
                + {copy.addProject}
              </button>
            </div>

            {creatingProject ? (
              <NewProjectForm
                session={session}
                locale={locale}
                onDone={() => setCreatingProject(false)}
              />
            ) : null}

            <div className="project-list">
              {workspace.projects.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">P</span>
                  <p>{copy.noProjects}</p>
                </div>
              ) : (
                workspace.projects.map((project) => (
                  <ProjectCard
                    key={project.projectId}
                    project={project}
                    selected={project.projectId === selectedProjectId}
                    onSelect={() => setSelectedProjectId(project.projectId)}
                  />
                ))
              )}
            </div>
          </section>

          <SubscriptionCard workspace={workspace} locale={locale} />
        </div>

        <section className="panel members-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Authority</p>
              <h3>{copy.members}</h3>
              <p>{copy.memberBody}</p>
            </div>
            <span className="quiet-badge">
              {workspace.capabilities.canManageMemberships ? 'OWNER VIEW' : 'READ VIEW'}
            </span>
          </div>
          <div className="member-table" role="table" aria-label={copy.members}>
            {workspace.memberships.map((member) => (
              <div className="member-row" role="row" key={member.membershipId}>
                <div className="member-person" role="cell">
                  <span className="avatar">{member.displayName.slice(0, 1).toUpperCase()}</span>
                  <span>
                    <strong>{member.displayName}</strong>
                    <small className="mono">{member.principalId.slice(0, 13)}…</small>
                  </span>
                </div>
                <span role="cell">{member.membershipState}</span>
                <span role="cell">{member.roles.join(', ') || '—'}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="domain-preview">
          <span>{copy.comingSoon}</span>
          <strong>RFQ · Supplier Response · Comparison · Approval · Award</strong>
        </div>
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

  const surfaceName = locale === 'ar' ? 'نظام المشتريات والحوكمة' : 'Procurement & governance';

  return (
    <AppShell
      productName="Construction Procurement OS"
      surfaceName={surfaceName}
      locale={locale}
      navigationLabel={locale === 'ar' ? 'إجراءات مساحة العمل' : 'Workspace actions'}
      actions={<LocaleToggle locale={locale} onChange={setLocale} />}
    >
      {!session ? <SessionSetup locale={locale} onConnect={setSession} /> : null}

      {session && workspace.isPending ? (
        <div className="loading-stage">
          <div className="loading-orbit" aria-hidden="true" />
          <strong>{locale === 'ar' ? 'جارٍ فتح مساحة العمل…' : 'Opening governed workspace…'}</strong>
        </div>
      ) : null}

      {session && workspace.isError ? (
        <section className="error-stage">
          <p className="product-eyebrow">Connection</p>
          <h2>{locale === 'ar' ? 'تعذر فتح مساحة العمل' : 'Workspace could not be opened'}</h2>
          <p>{workspace.error.message}</p>
          <div className="form-actions">
            <button className="secondary-button" type="button" onClick={() => workspace.refetch()}>
              {locale === 'ar' ? 'إعادة المحاولة' : 'Retry'}
            </button>
            <button className="primary-button" type="button" onClick={() => setSession(null)}>
              {locale === 'ar' ? 'تغيير الجلسة' : 'Change session'}
            </button>
          </div>
        </section>
      ) : null}

      {session && workspace.data ? (
        <Dashboard
          workspace={workspace.data}
          session={session}
          locale={locale}
          onChangeSession={() => setSession(null)}
        />
      ) : null}
    </AppShell>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('root element is missing');

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InternalApp />
    </QueryClientProvider>
  </StrictMode>,
);
