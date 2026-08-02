import { describe, expect, it } from 'vitest';

import { directionForLocale, localeName } from './index.js';

describe('locale foundations', () => {
  it('maps Arabic to RTL and English to LTR', () => {
    expect(directionForLocale('ar')).toBe('rtl');
    expect(directionForLocale('en')).toBe('ltr');
    expect(localeName('ar')).toBe('العربية');
  });
});
