import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/shared/ui/table'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'
import { Badge } from '@/shared/ui/badge'
import { useGetRecruiterJobApplicantsQuery, useUpdateRecruiterApplicationStatusMutation } from '../api/recruiterApi.js'
import { ArrowLeftIcon, UsersIcon, FileTextIcon, AlertCircleIcon } from 'lucide-react'

const statusConfig = {
    pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    accepted: 'bg-green-500/10 text-green-600 border-green-500/20',
    rejected: 'bg-red-500/10  text-red-600  border-red-500/20'
}

const JobApplicants = () => {
    const { jobId } = useParams()

    const { data, isLoading, isError } = useGetRecruiterJobApplicantsQuery(jobId)
    const [updateStatus, { isLoading: isUpdating, error: updateError }] = useUpdateRecruiterApplicationStatusMutation()

    const applicants = data?.applicants || []
    const jobTitle = data?.jobTitle || 'Job'

    return (
        <div className="max-w-6xl mx-auto my-10 px-4 space-y-8">
            {/* ── Header card ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Applicants
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">{isLoading ? 'Loading…' : jobTitle}</h1>
                        <p className="text-xs text-muted-foreground">
                            {isLoading ? '—' : `${applicants.length} applicant${applicants.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                    <Link
                        to="/recruiter/jobs"
                        className="inline-flex items-center gap-2 border border-border text-xs font-semibold px-4 py-2 rounded-xl hover:bg-muted transition-colors text-foreground shrink-0">
                        <ArrowLeftIcon className="w-3.5 h-3.5" />
                        Back
                    </Link>
                </div>
            </div>

            {/* ── Error toast row ── */}
            {updateError && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 text-xs font-medium">
                    <AlertCircleIcon className="w-4 h-4 shrink-0" />
                    Failed to update application status. Please try again.
                </div>
            )}

            {/* ── Table section ── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Applications</p>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm">
                    {/* Loading skeletons */}
                    {isLoading ? (
                        <div className="divide-y divide-border">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 px-5 py-4 animate-pulse">
                                    <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
                                    <div className="flex-1 space-y-1.5">
                                        <div className="h-3 bg-muted rounded w-32" />
                                        <div className="h-2.5 bg-muted rounded w-44" />
                                    </div>
                                    <div className="h-3 bg-muted rounded w-20 hidden sm:block" />
                                    <div className="h-5 bg-muted rounded-full w-16" />
                                    <div className="h-8 bg-muted rounded-xl w-28" />
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center gap-3 py-20 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                                <AlertCircleIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-semibold text-foreground">Failed to load applicants</p>
                            <p className="text-xs text-muted-foreground">Check your connection and try again.</p>
                        </div>
                    ) : applicants.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-20 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                                <UsersIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-semibold text-foreground">No applicants yet</p>
                            <p className="text-xs text-muted-foreground">Applications will appear here once candidates apply.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                                        {['Applicant', 'Phone', 'Skills', 'Resume', 'Status'].map((h) => (
                                            <TableHead
                                                key={h}
                                                className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest py-3">
                                                {h}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {applicants.map((app) => (
                                        <TableRow
                                            key={app._id}
                                            className="hover:bg-muted/30 transition-colors">
                                            {/* Applicant name + email */}
                                            <TableCell className="py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-[11px] font-bold text-primary">
                                                        {app.applicant?.fullname?.charAt(0)?.toUpperCase() ?? '?'}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-foreground leading-tight truncate">
                                                            {app.applicant?.fullname}
                                                        </p>
                                                        <p className="text-[11px] text-muted-foreground truncate">{app.applicant?.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Phone */}
                                            <TableCell className="text-sm text-muted-foreground py-3.5 whitespace-nowrap">
                                                {app.applicant?.phoneNumber || '—'}
                                            </TableCell>

                                            {/* Skills */}
                                            <TableCell className="py-3.5 max-w-[180px]">
                                                {app.applicant?.profile?.skills?.length ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {app.applicant.profile.skills.slice(0, 3).map((s) => (
                                                            <Badge
                                                                key={s}
                                                                className="bg-primary/10 text-primary border-0 text-[10px] font-medium rounded-full px-2 py-0.5">
                                                                {s}
                                                            </Badge>
                                                        ))}
                                                        {app.applicant.profile.skills.length > 3 && (
                                                            <Badge className="bg-muted text-muted-foreground border-0 text-[10px] rounded-full px-2 py-0.5">
                                                                +{app.applicant.profile.skills.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">—</span>
                                                )}
                                            </TableCell>

                                            {/* Resume */}
                                            <TableCell className="py-3.5">
                                                {app.applicant?.profile?.resume ? (
                                                    <a
                                                        href={app.applicant.profile.resume}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary hover:underline underline-offset-4 transition-colors">
                                                        <FileTextIcon className="w-3.5 h-3.5" />
                                                        View
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">—</span>
                                                )}
                                            </TableCell>

                                            {/* Status select */}
                                            {/* Status select */}
                                            <TableCell className="py-3.5">
                                                <Select
                                                    value={app.status}
                                                    onValueChange={(value) => updateStatus({ applicationId: app._id, status: value, jobId })}
                                                    disabled={isUpdating}>
                                                    <SelectTrigger
                                                        className={`h-7 w-32 text-[11px] font-medium rounded-full border px-2.5 capitalize ${statusConfig[app.status]}`}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="accepted">Accepted</SelectItem>
                                                        <SelectItem value="rejected">Rejected</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobApplicants
