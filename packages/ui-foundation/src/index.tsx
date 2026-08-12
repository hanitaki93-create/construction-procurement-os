import { useId, type ReactNode } from 'react';

export type SupportedLocale = 'en' | 'ar';
export type ReadingDirection = 'ltr' | 'rtl';

export function directionForLocale(locale: SupportedLocale): ReadingDirection {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function localeName(locale: SupportedLocale): string {
  return locale === 'ar' ? 'العربية' : 'English';
}

export interface AppShellProps {
  readonly productName: string;
  readonly surfaceName: string;
  readonly locale: SupportedLocale;
  readonly navigationLabel: string;
  readonly children: ReactNode;
  readonly actions?: ReactNode;
}

export function AppShell({
  productName,
  surfaceName,
  locale,
  navigationLabel,
  children,
  actions,
}: AppShellProps) {
  const direction = directionForLocale(locale);
  return (
    <div className="cpos-shell" dir={direction} lang={locale}>
      <a className="cpos-skip-link" href="#main-content">
        {locale === 'ar' ? 'الانتقال إلى المحتوى' : 'Skip to content'}
      </a>
      <header className="cpos-header">
        <div>
          <p className="cpos-eyebrow">{productName}</p>
          <h1>{surfaceName}</h1>
        </div>
        <div className="cpos-actions" aria-label={navigationLabel}>
          {actions}
        </div>
      </header>
      <main id="main-content" className="cpos-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

export interface LocaleToggleProps {
  readonly locale: SupportedLocale;
  readonly onChange: (locale: SupportedLocale) => void;
}

export function LocaleToggle({ locale, onChange }: LocaleToggleProps) {
  const nextLocale: SupportedLocale = locale === 'en' ? 'ar' : 'en';
  return (
    <button className="cpos-button" type="button" onClick={() => onChange(nextLocale)}>
      {localeName(nextLocale)}
    </button>
  );
}

export interface StatusPanelProps {
  readonly title: string;
  readonly state: 'loading' | 'ok' | 'degraded' | 'error';
  readonly description: string;
  readonly children?: ReactNode;
}

export function StatusPanel({ title, state, description, children }: StatusPanelProps) {
  const headingId = useId();
  const liveMode = state === 'error' ? 'assertive' : 'polite';
  return (
    <section className="cpos-card" aria-labelledby={headingId}>
      <div className="cpos-status-row">
        <h2 id={headingId}>{title}</h2>
        <span className={`cpos-badge cpos-badge--${state}`}>{state}</span>
      </div>
      <p aria-live={liveMode}>{description}</p>
      {children}
    </section>
  );
}
