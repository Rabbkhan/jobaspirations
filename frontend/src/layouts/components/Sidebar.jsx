import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Building2, Briefcase, LayoutDashboard, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutAction } from '@/features/auth/authSlice'
import { useLogoutMutation } from '@/features/auth/api/authApi'
import { toast } from 'sonner'
// import Logo from '@/assets/images/logo.png'
import Logo from '@/assets/images/jobaspirations_logo.svg'

const navLinks = [
    { to: '/recruiter', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/recruiter/companies', icon: Building2, label: 'Companies' },
    { to: '/recruiter/jobs', icon: Briefcase, label: 'Jobs' }
]

const Sidebar = () => {
    const { pathname } = useLocation()
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

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

    return (
        <aside className="w-64 h-screen border-r border-border bg-background flex flex-col shrink-0">
            {/* ── Logo ── */}
            <div className="px-5 py-5 border-b border-border">
                <Link to="/">
                    <div className="inline-block rounded-xl bg-blue-600 dark:bg-slate-500 px-3 py-1.5 shadow-[0_2px_16px_rgba(99,102,241,0.15)] dark:shadow-[0_2px_16px_rgba(129,140,248,0.2)]">
                        <img
                            src={Logo}
                            alt="JobAspirations"
                            className="w-36 h-auto object-contain"
                        />
                    </div>
                </Link>
            </div>
            {/* ── User card ── */}
            <div className="px-4 py-4 border-b border-border">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
                        {user?.profile?.profilePhoto ? (
                            <img
                                src={user.profile.profilePhoto}
                                alt={user.fullname}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xs font-bold text-primary">{user?.fullname?.charAt(0)?.toUpperCase() ?? 'R'}</span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{user?.fullname}</p>
                        <span className="text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                            Recruiter
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Nav ── */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase px-3 pb-2">Navigate</p>
                {navLinks.map(({ to, icon: Icon, label }) => {
                    const active = pathname === to
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                                ${
                                    active
                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                        : 'text-foreground hover:bg-muted border border-transparent'
                                }`}>
                            <Icon className="w-4 h-4 shrink-0" />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* ── Logout ── */}
            <div className="px-4 py-4 border-t border-border">
                <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/5 border border-transparent hover:border-red-500/20 transition-colors cursor-pointer">
                    <LogOut className="w-4 h-4 shrink-0" />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
