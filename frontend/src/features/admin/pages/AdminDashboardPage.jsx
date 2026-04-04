import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAdmin } from '@/features/admin/adminAuthSlice'
import { useAdminLogoutMutation } from '@/features/admin/api/adminAuthApi'
import { baseApi } from '@/app/api/baseApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { LogOutIcon, UsersIcon, ClockIcon, FileTextIcon, BriefcaseIcon, TrendingUpIcon, ActivityIcon, ShieldIcon } from 'lucide-react'

const metrics = [
    { label: 'Total recruiters', value: '120', icon: UsersIcon, trend: '+12 this month' },
    { label: 'Pending approvals', value: '12', icon: ClockIcon, trend: '4 need review' },
    { label: 'Total blogs', value: '35', icon: FileTextIcon, trend: '+3 this week' },
    { label: 'Active jobs', value: '84', icon: BriefcaseIcon, trend: '+8 this week' }
]

const AdminDashboardPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.adminAuth)

    const [adminLogout] = useAdminLogoutMutation()

    const handleLogout = async () => {
        try {
            await adminLogout().unwrap()
        } catch {
            toast.error('Logout failed')
        } finally {
            dispatch(clearAdmin())
            dispatch(baseApi.util.resetApiState())
            navigate('/admin/login', { replace: true })
        }
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto px-4 py-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Admin panel
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">
                            Welcome back{admin?.fullname ? `, ${admin.fullname}` : ''}
                        </h1>
                        <p className="text-xs text-muted-foreground">Here's what's happening on your platform today.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 border border-red-500/20 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-red-500/5 hover:border-red-500/40 transition-colors text-red-500 shrink-0">
                        <LogOutIcon className="w-3.5 h-3.5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* ── Metrics ── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Overview</p>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map(({ label, value, icon: Icon, trend }) => (
                        <div
                            key={label}
                            className="border border-border rounded-2xl bg-background px-5 py-4 space-y-3 hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">{label}</p>
                                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Icon className="w-3.5 h-3.5 text-primary" />
                                </div>
                            </div>
                            <p className="text-3xl font-extrabold text-foreground tracking-tight leading-none">{value}</p>
                            <div className="flex items-center gap-1.5">
                                <TrendingUpIcon className="w-3 h-3 text-green-500" />
                                <p className="text-[11px] text-muted-foreground">{trend}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Activity feed ── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Activity</p>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden divide-y divide-border">
                    {[
                        {
                            icon: UsersIcon,
                            color: 'text-blue-500  bg-blue-500/10  border-blue-500/20',
                            text: 'New recruiter registered',
                            time: '2 min ago'
                        },
                        {
                            icon: BriefcaseIcon,
                            color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
                            text: 'Job posting awaiting approval',
                            time: '14 min ago'
                        },
                        {
                            icon: FileTextIcon,
                            color: 'text-teal-500  bg-teal-500/10  border-teal-500/20',
                            text: 'New blog post published',
                            time: '1 hr ago'
                        },
                        {
                            icon: ShieldIcon,
                            color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
                            text: 'Admin settings updated',
                            time: '3 hr ago'
                        }
                    ].map(({ icon: Icon, color, text, time }, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${color}`}>
                                <Icon className="w-3.5 h-3.5" />
                            </div>
                            <p className="text-sm text-foreground flex-1">{text}</p>
                            <span className="text-[11px] text-muted-foreground shrink-0">{time}</span>
                        </div>
                    ))}

                    {/* Placeholder row */}
                    <div className="flex items-center justify-center gap-2 px-5 py-4">
                        <ActivityIcon className="w-4 h-4 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Connect your activity feed API to show live events</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage
