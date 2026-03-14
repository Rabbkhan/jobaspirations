import { Outlet, Navigate } from 'react-router-dom'
import LoaderScreen from '@/shared/components/LoaderScreen'
import { useAdminMeQuery } from '@/features/admin/api/adminAuthApi.js'

const AdminRoute = () => {
    const { data, isLoading, isError } = useAdminMeQuery()

    // ⏳ Checking authentication
    if (isLoading) {
        return <LoaderScreen />
    }

    // ❌ Not logged in
    if (isError || !data?.safeUser) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        )
    }

    const admin = data.safeUser

    // ❌ Wrong role
    if (admin.role !== 'admin') {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        )
    }

    // ✅ Authorized admin
    return <Outlet />
}

export default AdminRoute
