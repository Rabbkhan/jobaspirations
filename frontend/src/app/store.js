import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ✅ Feature slices
import authSlice from '@/features/auth/authSlice'
import adminAuthSlice from '@/features/admin/adminAuthSlice'
import jobSlice from '@/features/job/jobSlice'
import companySlice from '@/features/company/companySlice'

// ✅ RTK Query central API
import { baseApi } from '@/app/api/baseApi'

// ✅ Persist configs
const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
    whitelist: ['user', 'isAuthenticated']
}
const adminPersistConfig = {
    key: 'admin',
    version: 1,
    storage,
    whitelist: ['admin']
}

// ✅ Root reducer
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    adminAuth: persistReducer(adminPersistConfig, adminAuthSlice),
    job: jobSlice,
    company: companySlice,
    [baseApi.reducerPath]: baseApi.reducer // <-- RTK Query
})

// ✅ Store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(baseApi.middleware), // <-- add RTK Query middleware
    devTools: process.env.NODE_ENV !== 'production'
})

// ✅ Persistor
export const persistor = persistStore(store)
