import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{mjs,cjs,ts,tsx}'],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      indent: ['warn', 2],
      quotes: ['warn', 'single'],
      'no-trailing-spaces': 'warn',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: [
      '.husky',
      '.next',
      'next-env.d.ts',
      'node_modules',
      'pnpm-lock.yaml',
      'package-lock.json',
      'public',
      'build',
      '/coverage',
      '/tests',
      '.prettierrc',
      'next.config.ts',
      'postcss.config.mjs',
      'tailwind.config.ts',
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]
