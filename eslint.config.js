// ESLint flat config (ESLint 9 + typescript-eslint). Not executed in the
// authoring environment (packages unavailable there); runs in CI.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'dist-esbuild', '.test-artifacts', 'handoff', 'public', 'node_modules', 'types-local'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        crypto: 'readonly',
        indexedDB: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        DOMException: 'readonly',
        BroadcastChannel: 'readonly',
        TextEncoder: 'readonly',
        structuredClone: 'readonly',
        setTimeout: 'readonly',
        getComputedStyle: 'readonly',
        fetch: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
);
