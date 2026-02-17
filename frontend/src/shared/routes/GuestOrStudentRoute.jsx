import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const GuestOrStudentRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth)

    // If logged in AND recruiter/admin → block
    if (user && user.role !== 'student') {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        )
    }

    // Guest OR student → allowed
    return children
}

export default GuestOrStudentRoute
