import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useSelector((state) => state.auth)

    // 1. Not logged in
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    // 2. Role not allowed
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        )
    }

    // 3. Authorized
    return children
}

export default ProtectedRoute
