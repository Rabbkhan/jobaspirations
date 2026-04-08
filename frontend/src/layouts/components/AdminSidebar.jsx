import { NavLink } from 'react-router-dom'
import { LayoutDashboardIcon, UsersIcon, BriefcaseIcon, FileTextIcon, SettingsIcon, FolderIcon, ShieldIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import LogoLight from '@/assets/images/jobaspirations_logo.svg'
import LogoDark from '@/assets/images/logo-dark.svg'

const NAV = [
    {
        group: null,
        items: [
            { to: '/admin/dashboard', icon: LayoutDashboardIcon, label: 'Dashboard' },
            { to: '/admin/recruiters', icon: UsersIcon, label: 'Recruiters' },
            { to: '/admin/jobs', icon: BriefcaseIcon, label: 'Jobs' },
            { to: '/admin/users', icon: UsersIcon, label: 'Users' },
            { to: '/admin/reviews', icon: UsersIcon, label: 'Reviews' }
        ]
    },
    {
        group: 'Blog management',
        items: [
            { to: '/admin/blogs', icon: FileTextIcon, label: 'All blogs' },
            { to: '/admin/blog-categories', icon: FolderIcon, label: 'Categories' }
        ]
    },
    {
        group: 'System',
        items: [{ to: '/admin/settings', icon: SettingsIcon, label: 'Settings' }]
    }
]

const Sidebar = () => {
    const { admin, loading } = useSelector((state) => state.adminAuth)

    return (
        <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col border-r border-border bg-background overflow-y-auto">
            {/* ── Logo ── */}
            <div className="px-5 py-5 border-b border-border">
                <div className="inline-block rounded-xl bg-white/80 dark:bg-white/5 px-3 py-1.5 shadow-[0_2px_16px_rgba(99,102,241,0.15)] dark:shadow-[0_2px_16px_rgba(129,140,248,0.2)]">
                    <img
                        src={LogoLight}
                        alt="JobAspirations"
                        className="w-36 h-auto object-contain dark:hidden"
                    />
                    <img
                        src={LogoDark}
                        alt="JobAspirations"
                        className="w-36 h-auto object-contain hidden dark:block"
                    />
                </div>
            </div>

            {/* ── Admin info ── */}
            <div className="px-4 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <ShieldIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground truncate leading-tight">{loading ? '—' : (admin?.fullname ?? 'Admin')}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Administrator</p>
                    </div>
                </div>
            </div>

            {/* ── Nav ── */}
            <nav className="flex-1 px-3 py-4 space-y-5">
                {NAV.map(({ group, items }) => (
                    <div
                        key={group ?? '__root'}
                        className="space-y-0.5">
                        {/* Section label */}
                        {group && (
                            <div className="flex items-center gap-2 px-2 mb-2">
                                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">{group}</p>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                        )}

                        {items.map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                        isActive
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`
                                }>
                                {({ isActive }) => (
                                    <>
                                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                        {label}
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            {/* ── Footer ── */}
            <div className="px-4 py-3 border-t border-border">
                <p className="text-[10px] text-muted-foreground">© {new Date().getFullYear()} JobAspirations</p>
            </div>
        </aside>
    )
}

export default Sidebar
