const config = {
    '*.{js,ts,tsx,jsx}': ['npm run lint:eslint', 'npm run format:check'],
    '*.{json,html,md,yml,yaml}': ['npm run format:check']
}

export default config
