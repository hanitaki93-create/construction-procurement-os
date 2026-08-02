import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import type { BuildMetadata, ReadinessResponse } from '@cpos/contracts';
import {
  AppShell,
  directionForLocale,
  LocaleToggle,
  StatusPanel,
  type SupportedLocale,
} from '@cpos/ui-foundation';
import '@cpos/ui-foundation/styles.css';

import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30_000,
    },
    mutations: {
      retry: false,
    },
  },
});

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`request failed with status ${response.status}`);
  return (await response.json()) as T;
}

function InternalApp() {
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const readiness = useQuery({
    queryKey: ['technical-readiness'],
    queryFn: () => fetchJson<ReadinessResponse>('/health/ready'),
  });
  const build = useQuery({
    queryKey: ['build-metadata'],
    queryFn: () => fetchJson<BuildMetadata>('/meta/build'),
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = directionForLocale(locale);
  }, [locale]);

  const copy =
    locale === 'ar'
      ? {
          surface: 'مساحة العمل الداخلية',
          nav: 'إجراءات مساحة العمل',
          intro: 'هذه واجهة تقنية فقط. لم تتم إضافة أي إجراءات مشتريات أو صلاحيات عمل بعد.',
          runtime: 'جاهزية النظام',
          build: 'معلومات الإصدار',
          loading: 'جارٍ التحقق من المكونات التقنية.',
          unavailable: 'تعذر الوصول إلى واجهة النظام التقنية.',
          ready: 'الواجهة التقنية جاهزة ولا تحتوي على عمليات أعمال.',
        }
      : {
          surface: 'Internal workspace',
          nav: 'Workspace actions',
          intro: 'This is a technical shell only. No procurement actions or business authority exist yet.',
          runtime: 'Runtime readiness',
          build: 'Build identity',
          loading: 'Checking technical components.',
          unavailable: 'The technical API could not be reached.',
          ready: 'The technical shell is ready and contains no business operations.',
        };

  const readinessState = readiness.isPending ? 'loading' : readiness.isError ? 'error' : 'ok';
  const buildState = build.isPending ? 'loading' : build.isError ? 'error' : 'ok';

  return (
    <AppShell
      productName="Construction Procurement OS"
      surfaceName={copy.surface}
      locale={locale}
      navigationLabel={copy.nav}
      actions={<LocaleToggle locale={locale} onChange={setLocale} />}
    >
      <p className="internal-intro">{copy.intro}</p>
      <div className="cpos-grid">
        <StatusPanel
          title={copy.runtime}
          state={readinessState}
          description={
            readiness.isPending ? copy.loading : readiness.isError ? copy.unavailable : copy.ready
          }
        >
          {readiness.data ? (
            <ul>
              {readiness.data.components.map((component) => (
                <li key={component.name}>
                  <strong>{component.name}</strong>: {component.state}
                </li>
              ))}
            </ul>
          ) : null}
        </StatusPanel>
        <StatusPanel
          title={copy.build}
          state={buildState}
          description={build.isError ? copy.unavailable : copy.loading}
        >
          {build.data ? (
            <dl className="build-list">
              <div>
                <dt>Build</dt>
                <dd className="cpos-code">{build.data.buildId}</dd>
              </div>
              <div>
                <dt>Commit</dt>
                <dd className="cpos-code">{build.data.sourceCommit}</dd>
              </div>
            </dl>
          ) : null}
        </StatusPanel>
      </div>
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
