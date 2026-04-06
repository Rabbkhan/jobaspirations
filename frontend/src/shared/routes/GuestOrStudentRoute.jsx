// src/shared/routes/GuestOrStudentRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const GuestOrStudentRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth)

    if (user?.role === 'recruiter') {
        return (
            <Navigate
                to="/recruiter"
                replace
            />
        )
    }

    return children
}

export default GuestOrStudentRoute
