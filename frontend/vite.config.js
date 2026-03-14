/// <reference types="vitest" />
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
    const isProd = mode === 'production'
    if (mode === 'production' && !process.env.SENTRY_TOKEN) {
        throw new Error('Missing SENTRY_TOKEN for production build')
    }
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    return {
        plugins: [
            react(),
            tailwindcss(),
            isProd &&
                sentryVitePlugin({
                    org: 'jobaspirations',
                    project: 'javascript-react',
                    telemetry: false,
                    authToken: process.env.SENTRY_TOKEN,
                    sourcemaps: {
                        filesToDeleteAfterUpload: 'dist/assets/**/*.map'
                    }
                })
        ],

        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: 'src/setupTests.js',
            include: ['src/**/*.{test,spec}.{js,jsx}'],
            coverage: {
                reporter: ['json', 'html'],
                include: ['src/**/*.js', 'src/**/*.jsx'],
                exclude: ['coverage', 'dist', 'build', 'src/setupTests.js', 'src/**/*.{test,spec}.{js,jsx}'],
                thresholds: {
                    statements: 30,
                    branches: 30,
                    functions: 30,
                    lines: 30
                }
            }
        },

        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@shared': path.resolve(__dirname, './src/shared'),
                '@features': path.resolve(__dirname, './src/features'),
                '@app': path.resolve(__dirname, './src/app')
            }
        },

        build: {
            minify: true,
            sourcemap: isProd,
            rollupOptions: {
                external: [/.*\.(test|spec)\.(js|jsx)$/]
            }
        },

        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    secure: false
                }
            }
        }
    }
})
