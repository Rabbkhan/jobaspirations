import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Briefcase, Building2, ArrowRightIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useGetRecruiterDashboardQuery } from '../api/recruiterApi.js'

const RecruiterDashboard = () => {
    const { data, isLoading, isError, error, refetch } = useGetRecruiterDashboardQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto my-10 px-4 space-y-6 animate-pulse">
                <div className="h-8 w-48 rounded-lg bg-muted border border-border" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-28 rounded-2xl bg-muted border border-border"
                        />
                    ))}
                </div>
                <div className="h-64 rounded-2xl bg-muted border border-border" />
            </div>
        )
    }

    if (isError) {
        toast.error(error?.data?.message || 'Failed to load dashboard')
        return (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-center px-4">
                <span className="text-5xl">📊</span>
                <h2 className="text-xl font-bold text-foreground">Unable to load dashboard</h2>
                <p className="text-sm text-muted-foreground">Something went wrong. Please try again.</p>
                <button
                    onClick={refetch}
                    className="text-sm text-primary underline underline-offset-2">
                    Retry
                </button>
            </div>
        )
    }

    const stats = data?.stats || {}
    const recentApplicants = data?.recentApplicants || []

    const statCards = [
        { label: 'Total Jobs', value: stats.totalJobs ?? 0, icon: Briefcase, link: '/recruiter/jobs' },
        { label: 'Total Applicants', value: stats.totalApplicants ?? 0, icon: Users, link: '/recruiter/applicants' },
        { label: 'Active Companies', value: stats.activeCompanies ?? 0, icon: Building2, link: '/recruiter/companies' }
    ]

    return (
        <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Recruiter dashboard
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">Overview</h1>
                        <p className="text-xs text-muted-foreground">Track your jobs, applicants and companies</p>
                    </div>
                    <Link
                        to="/recruiter/jobs/create"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                        <Briefcase className="w-3.5 h-3.5" />
                        Post a job
                    </Link>
                </div>
            </div>

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Stats</p>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {statCards.map(({ label, value, icon: Icon, link }) => (
                    <Link
                        key={label}
                        to={link}
                        className="group flex items-center gap-4 p-5 border border-border rounded-2xl bg-background hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">{label}</p>
                            <p className="text-2xl font-extrabold text-foreground">{value}</p>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                ))}
            </div>

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Recent applicants</p>
                <div className="flex-1 h-px bg-border" />
                <Link
                    to="/recruiter/applicants"
                    className="text-[10px] font-semibold text-primary tracking-widest uppercase whitespace-nowrap hover:underline">
                    View all
                </Link>
            </div>

            {/* ── Applicants ── */}
            {recentApplicants.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 border border-border rounded-2xl bg-background">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No applicants yet</p>
                    <p className="text-xs text-muted-foreground">Post a job to start receiving applications</p>
                </div>
            ) : (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm">
                    {recentApplicants.map((app, idx) => (
                        <div
                            key={app._id}
                            className={`flex items-center gap-4 px-5 py-4 hover:bg-primary/5 transition-colors ${idx !== recentApplicants.length - 1 ? 'border-b border-border' : ''}`}>
                            {/* Avatar */}
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <span className="text-[11px] font-bold text-primary">{app.applicant?.fullname?.charAt(0)?.toUpperCase() ?? '?'}</span>
                            </div>
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">{app.applicant?.fullname}</p>
                                <p className="text-xs text-muted-foreground truncate">{app.job?.title}</p>
                            </div>
                            {/* Date */}
                            <p className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                                {new Date(app.createdAt).toLocaleDateString('en-IN')}
                            </p>
                            {/* Status badge */}
                            <StatusBadge status={app.status} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const StatusBadge = ({ status }) => {
    const config = {
        pending: { icon: ClockIcon, class: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
        accepted: { icon: CheckCircleIcon, class: 'bg-green-500/10  text-green-600  border-green-500/20' },
        rejected: { icon: XCircleIcon, class: 'bg-red-500/10    text-red-500    border-red-500/20' }
    }
    const { icon: Icon, class: cls } = config[status] || config.pending

    return (
        <div className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${cls} capitalize`}>
            <Icon className="w-3 h-3" />
            {status}
        </div>
    )
}

export default RecruiterDashboard
