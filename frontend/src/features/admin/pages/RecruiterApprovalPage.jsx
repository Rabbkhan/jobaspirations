import { useState } from 'react'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'
import {
    useApproveRecruiterMutation,
    useGetRecruiterApplicationsQuery,
    useRejectRecruiterMutation
} from '@/features/recruiter/api/recruiterAapplicationsApi.js'
import { UsersIcon, CheckIcon, XIcon, Loader2Icon, MailIcon, AlertCircleIcon, ShieldCheckIcon } from 'lucide-react'

const statusConfig = {
    approved: 'bg-green-500/10 text-green-600 border-green-500/20',
    pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    rejected: 'bg-red-500/10  text-red-600  border-red-500/20'
}

const RecruiterApprovalPage = () => {
    const [approvingId, setApprovingId] = useState(null)
    const [rejectingId, setRejectingId] = useState(null)

    const { data, isLoading, isError } = useGetRecruiterApplicationsQuery()
    const [approveRecruiter] = useApproveRecruiterMutation()
    const [rejectRecruiter] = useRejectRecruiterMutation()

    const recruiters = data?.applications || []

    const handleApprove = async (id) => {
        try {
            setApprovingId(id)
            await approveRecruiter(id).unwrap()
            toast.success('Recruiter approved successfully')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to approve recruiter')
        } finally {
            setApprovingId(null)
        }
    }

    const handleReject = async (id) => {
        try {
            setRejectingId(id)
            await rejectRecruiter({ id }).unwrap()
            toast.success('Recruiter rejected')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to reject recruiter')
        } finally {
            setRejectingId(null)
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto px-4 py-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Admin
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">Recruiter approvals</h1>
                        <p className="text-xs text-muted-foreground">
                            {isLoading ? '—' : `${recruiters.length} application${recruiters.length !== 1 ? 's' : ''} pending review`}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <UsersIcon className="w-4 h-4 text-primary" />
                    </div>
                </div>
            </div>

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Applications</p>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── States ── */}
            {isLoading ? (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 px-5 py-4 animate-pulse">
                            <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-3 bg-muted rounded w-36" />
                                <div className="h-2.5 bg-muted rounded w-48" />
                            </div>
                            <div className="h-5 bg-muted rounded-full w-16" />
                            <div className="h-7 bg-muted rounded-xl w-24" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center gap-3 py-16 border border-border rounded-2xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                        <AlertCircleIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Failed to load applications</p>
                    <p className="text-xs text-muted-foreground">Check your connection and try again.</p>
                </div>
            ) : recruiters.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 border border-dashed border-border rounded-2xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                        <ShieldCheckIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">All caught up</p>
                    <p className="text-xs text-muted-foreground">No recruiter applications pending review.</p>
                </div>
            ) : (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                    {recruiters.map((r) => (
                        <div
                            key={r._id}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors flex-wrap sm:flex-nowrap group">
                            {/* Avatar initial */}
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
                                {r.userId?.fullname?.charAt(0)?.toUpperCase() ?? '?'}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground leading-tight truncate">{r.userId?.fullname}</p>
                                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                                    <MailIcon className="w-3 h-3" />
                                    {r.userId?.email}
                                </span>
                            </div>

                            {/* Status badge */}
                            <Badge
                                className={`text-[10px] font-medium rounded-full px-2.5 py-0.5 border capitalize shrink-0 ${statusConfig[r.status] ?? statusConfig.pending}`}>
                                {r.status ?? 'pending'}
                            </Badge>

                            {/* Actions */}
                            {r.status !== 'approved' && r.status !== 'rejected' && (
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => handleApprove(r._id)}
                                        disabled={approvingId === r._id || rejectingId === r._id}
                                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-green-500/20 text-xs font-semibold text-green-600 hover:bg-green-500/5 transition-colors disabled:opacity-50">
                                        {approvingId === r._id ? (
                                            <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <CheckIcon className="w-3.5 h-3.5" />
                                        )}
                                        {approvingId === r._id ? 'Approving…' : 'Approve'}
                                    </button>

                                    <button
                                        onClick={() => handleReject(r._id)}
                                        disabled={rejectingId === r._id || approvingId === r._id}
                                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-red-500/20 text-xs font-semibold text-red-500 hover:bg-red-500/5 transition-colors disabled:opacity-50">
                                        {rejectingId === r._id ? (
                                            <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <XIcon className="w-3.5 h-3.5" />
                                        )}
                                        {rejectingId === r._id ? 'Rejecting…' : 'Reject'}
                                    </button>
                                </div>
                            )}

                            {/* Settled state label */}
                            {(r.status === 'approved' || r.status === 'rejected') && (
                                <span className="text-[11px] text-muted-foreground shrink-0 italic">No actions available</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecruiterApprovalPage
