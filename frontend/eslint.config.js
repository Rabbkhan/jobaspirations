import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react' // ADD THIS

export default defineConfig([
    globalIgnores(['dist', 'node_modules', 'build', 'coverage']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [js.configs.recommended, reactHooks.configs.flat.recommended, eslintConfigPrettier, reactRefresh.configs.vite],
        languageOptions: {
            ecmaVersion: 2020,
            // globals: globals.browser,
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module'
            }
        },
        plugins: {
            react: reactPlugin // ADD THIS
        },

        rules: {
            'react/jsx-uses-vars': 'error',

            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            'no-console': 'error'
        }
    }
])
