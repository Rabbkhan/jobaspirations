import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@/assets/styles/index.css'
import { Toaster } from '@/components/ui/sonner'
import { Provider } from 'react-redux'
import { store, persistor } from '@/app/store'
import { PersistGate } from 'redux-persist/integration/react'
import DashboardLoading from './components/common/loading/DashboardLoading'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate
                loading={<DashboardLoading />}
                persistor={persistor}>
                <BrowserRouter>
                    <App />
                    <Toaster />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
