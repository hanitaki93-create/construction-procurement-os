import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const ignoredPaths = [
  '**/dist/**',
  '**/coverage/**',
  '**/node_modules/**',
  '**/playwright-report/**',
  '**/test-results/**',
  '**/.vite/**',
  '**/.turbo/**',
  '**/*.generated.*',
];

export default tseslint.config(
  { ignores: ignoredPaths },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: globals.nodeBuiltin,
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-implicit-coercion': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='Math'][callee.property.name='random']",
          message: 'Math.random() is not permitted for identifiers, tokens, or authority-bearing values.',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['apps/web-*/**/*.{ts,tsx}', 'packages/ui-foundation/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2024 },
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
);
