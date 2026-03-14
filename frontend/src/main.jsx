import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@/assets/styles/index.css'
import { Toaster } from '@/shared/ui/sonner'
import { Provider } from 'react-redux'
import { store, persistor } from '@/app/store'
import { PersistGate } from 'redux-persist/integration/react'

import * as Sentry from '@sentry/react'

Sentry.init({
    dsn: 'https://3a5591885079891a190368cf452be884@o4510959618949120.ingest.us.sentry.io/4510959622815744',
    // Setting this option to true will send default PII data to Sentry.
    enabled: import.meta.env.VITE_ENV === 'production',
    // For example, automatic IP address collection on events
    sendDefaultPii: true
})

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                    <Toaster />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
