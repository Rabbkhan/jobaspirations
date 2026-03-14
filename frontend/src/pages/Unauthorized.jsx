import React, { useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { ShieldAlert } from 'lucide-react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Unauthorized = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useSelector((state) => state.auth)

    // 1. If NOT logged in → force login
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        // 2. Recruiter/Admin trying to access student pages (like /profile)
        if (user.role === 'recruiter') {
            navigate('/recruiter', { replace: true })
            return
        }

        // 3. Student unauthorized → go back or home
        if (user.role === 'student') {
            if (location.key !== 'default') {
                navigate(-1) // go back if history exists
            } else {
                navigate('/', { replace: true })
            }
        }
    }, [user, navigate, location])

    // 4. Fallback UI (only flashes briefly if navigation is blocked)
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
            <div className="bg-background border border-border rounded-2xl shadow-lg p-10 max-w-md text-center space-y-6">
                <div className="flex justify-center mb-4">
                    <ShieldAlert className="w-16 h-16 text-destructive" />
                </div>

                <h1 className="text-3xl font-bold">Access Denied</h1>

                <p className="text-muted-foreground text-sm leading-relaxed">You do not have permission to access this page.</p>

                <div className="flex flex-col gap-3 mt-6">
                    <Button
                        className="w-full"
                        onClick={() => navigate(-1)}>
                        Go Back
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate('/')}>
                        Go to Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized
