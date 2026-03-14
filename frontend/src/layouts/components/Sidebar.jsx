import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Building2, Briefcase, LayoutDashboard, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { logout as logoutAction } from '@/features/auth/authSlice'

import { logout } from '@/features/auth/authSlice'
import { toast } from 'sonner'

const Sidebar = () => {
    const { pathname } = useLocation()
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            await logout().unwrap()
            dispatch(logoutAction())
            navigate('/login')
            toast.success('Logged out successfully')
        } catch {
            toast.error('Logout failed')
        }
    }
    const linkClass = (path) =>
        `flex items-center gap-3 p-3 rounded-lg text-sm transition 
     ${pathname === path ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`

    return (
        <aside className="w-64 h-screen border-r bg-card flex flex-col p-4">
            {/* Header */}
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-accent">
                <Avatar>
                    <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullName}
                    />
                    <AvatarFallback>{user?.fullName?.[0] || 'A'}</AvatarFallback>
                </Avatar>

                <div>
                    <p className="font-medium">{user?.fullname}</p>
                    {/* <p className="text-xs text-muted-foreground">Admin</p> */}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                <Link
                    to="/recruiter"
                    className={linkClass('/recruiter')}>
                    <LayoutDashboard size={18} /> Dashboard
                </Link>

                <Link
                    to="/recruiter/companies"
                    className={linkClass('/recruiter/companies')}>
                    <Building2 size={18} /> Companies
                </Link>

                <Link
                    to="/recruiter/jobs"
                    className={linkClass('/recruiter/jobs')}>
                    <Briefcase size={18} /> Jobs
                </Link>
            </nav>

            {/* Logout Button */}
            <div className="mt-auto pt-4">
                <Button
                    variant="destructive"
                    className="w-full flex  cursor-pointer items-center gap-2"
                    onClick={logoutHandler}>
                    <LogOut size={18} />
                    Logout
                </Button>
            </div>
        </aside>
    )
}

export default Sidebar
