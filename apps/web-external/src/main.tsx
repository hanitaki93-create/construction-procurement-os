import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import type { ReadinessResponse } from '@cpos/contracts';
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

async function fetchReadiness(): Promise<ReadinessResponse> {
  const response = await fetch('/health/ready', { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`request failed with status ${response.status}`);
  return (await response.json()) as ReadinessResponse;
}

function ExternalApp() {
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const readiness = useQuery({
    queryKey: ['external-technical-readiness'],
    queryFn: fetchReadiness,
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = directionForLocale(locale);
  }, [locale]);

  const copy =
    locale === 'ar'
      ? {
          surface: 'مهمة خارجية آمنة',
          nav: 'إجراءات المهمة',
          title: 'لم يتم تحميل أي مهمة',
          description:
            'هذه واجهة تقنية مستقلة فقط. لا يوجد حساب مورد أو ملف شركة أو بيانات مشروع في هذا الإصدار.',
          health: 'اتصال الخدمة',
          ready: 'الخدمة التقنية متاحة.',
          unavailable: 'الخدمة التقنية غير متاحة حالياً.',
          loading: 'جارٍ التحقق من الخدمة.',
        }
      : {
          surface: 'Secure external task',
          nav: 'Task actions',
          title: 'No task has been loaded',
          description:
            'This is an independent technical shell only. No supplier account, company profile, or project data exists in this build.',
          health: 'Service connection',
          ready: 'The technical service is available.',
          unavailable: 'The technical service is currently unavailable.',
          loading: 'Checking the technical service.',
        };

  const state = readiness.isPending ? 'loading' : readiness.isError ? 'error' : 'ok';

  return (
    <AppShell
      productName="Construction Procurement OS"
      surfaceName={copy.surface}
      locale={locale}
      navigationLabel={copy.nav}
      actions={<LocaleToggle locale={locale} onChange={setLocale} />}
    >
      <section className="external-introduction" aria-labelledby="external-placeholder-heading">
        <h2 id="external-placeholder-heading">{copy.title}</h2>
        <p>{copy.description}</p>
      </section>
      <StatusPanel
        title={copy.health}
        state={state}
        description={
          readiness.isPending ? copy.loading : readiness.isError ? copy.unavailable : copy.ready
        }
      />
    </AppShell>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('root element is missing');

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ExternalApp />
    </QueryClientProvider>
  </StrictMode>,
);
