import js from '@eslint/js';
import eslintNextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';

export default [
    {
        ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']
    },
    js.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs}'],
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/quotes': [
                'error',
                'single',
                {
                    avoidEscape: true
                }
            ],
            '@stylistic/jsx-quotes': ['error', 'prefer-double'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/space-before-function-paren': ['error', 'never'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/comma-spacing': [
                'error',
                {
                    before: false,
                    after: true
                }
            ],
            '@stylistic/key-spacing': [
                'error',
                {
                    beforeColon: false,
                    afterColon: true
                }
            ],
            '@stylistic/max-len': [
                'warn',
                {
                    code: 140,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true
                }
            ],
            '@stylistic/object-curly-newline': [
                'error',
                {
                    multiline: true,
                    consistent: true
                }
            ],
            '@stylistic/jsx-indent': ['error', 4],
            '@stylistic/jsx-indent-props': ['error', 4],
            '@stylistic/jsx-max-props-per-line': [
                'error',
                {
                    maximum: 1,
                    when: 'always'
                }
            ],
            '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
            '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
            '@stylistic/jsx-child-element-spacing': ['error']
        }
    },
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs}'],
        plugins: {
            '@next/next': eslintNextPlugin,
            react: reactPlugin
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'block-scoped-var': 'error',
            'capitalized-comments': 'error',
            'class-methods-use-this': 'warn',
            'complexity': ['warn', 10], // Increased from 5
            'default-case-last': 'error',
            'default-param-last': 'error',
            'dot-notation': 'error',
            'eqeqeq': ['error', 'always'],
            'func-name-matching': ['error', 'always'],
            'func-style': ['warn', 'declaration'],
            'logical-assignment-operators': [
                'error',
                'always',
                {
                    enforceForIfStatements: true
                }
            ],
            'max-depth': ['error', 4],
            'max-params': ['error', 4],
            'new-cap': ['error', { newIsCap: true }],
            'no-alert': 'warn',
            'no-array-constructor': 'error',
            'no-caller': 'error',
            'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
            'no-else-return': 'error',
            'no-empty-function': 'error',
            'no-eval': 'error',
            'no-extend-native': 'error',
            'no-extra-bind': 'error',
            'no-extra-label': 'error',
            'no-implied-eval': 'error',
            'no-lone-blocks': 'error',
            'no-lonely-if': 'error',
            'no-loop-func': 'error',
            // Removed no-magic-numbers - too strict for frontend
            'no-multi-assign': 'error',
            'no-sequences': 'error',
            'no-shadow-restricted-names': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-template': 'error',
            'require-await': 'error',
            'yoda': ['error', 'never', {
                exceptRange: true
            }],
            'no-undef': ['off'],
            'no-async-promise-executor': 'off'
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            '@typescript-eslint': tseslint
        },
        rules: {
            ...tseslint.configs.recommended.rules
        }
    }
];
