import React, { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { useGetAppliedJobsQuery } from '@/features/job/api/jobApi.js'
import { BriefcaseIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const statusConfig = {
    pending: { class: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    accepted: { class: 'bg-green-500/10 text-green-600 border-green-500/20' },
    rejected: { class: 'bg-red-500/10  text-red-600  border-red-500/20' }
}

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })

const AppliedJobs = () => {
    const [statusFilter, setStatusFilter] = useState('All')
    const [page, setPage] = useState(1)

    const { data, isLoading } = useGetAppliedJobsQuery({ page, limit: 10 })

    const totalPages = data?.pagination?.totalPages || 1

    const filteredJobs = useMemo(() => {
        const applications = data?.applications || []
        if (statusFilter === 'All') return applications
        return applications.filter((job) => job.status === statusFilter)
    }, [data?.applications, statusFilter])

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
                {/* ── Page header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <BriefcaseIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground tracking-tight leading-none">Applied jobs</h1>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {isLoading
                                    ? 'Loading…'
                                    : `${filteredJobs.length} application${filteredJobs.length !== 1 ? 's' : ''}${statusFilter !== 'All' ? ` · ${statusFilter}` : ''}`}
                            </p>
                        </div>
                    </div>

                    {/* Filter */}
                    <Select
                        value={statusFilter}
                        onValueChange={(v) => {
                            setStatusFilter(v)
                            setPage(1)
                        }}>
                        <SelectTrigger className="w-44 h-9 text-xs">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* ── Table card ── */}
                <div className="rounded-2xl border border-border bg-background overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3">
                                        Job title
                                    </TableHead>
                                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3">
                                        Company
                                    </TableHead>
                                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 hidden sm:table-cell">
                                        Type
                                    </TableHead>
                                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3">Status</TableHead>
                                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 hidden md:table-cell">
                                        Applied on
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 8 }).map((_, i) => (
                                        <TableRow
                                            key={i}
                                            className="animate-pulse">
                                            <TableCell>
                                                <div className="h-3.5 bg-muted rounded w-32" />
                                            </TableCell>
                                            <TableCell>
                                                <div className="h-3.5 bg-muted rounded w-24" />
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="h-3.5 bg-muted rounded w-16" />
                                            </TableCell>
                                            <TableCell>
                                                <div className="h-5 bg-muted rounded-full w-16" />
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="h-3.5 bg-muted rounded w-20" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : filteredJobs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <div className="flex flex-col items-center gap-3 py-16 text-center">
                                                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                                                    <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
                                                </div>
                                                <p className="text-sm font-semibold text-foreground">No applications found</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {statusFilter !== 'All'
                                                        ? 'Try a different status filter.'
                                                        : "You haven't applied to any jobs yet."}
                                                </p>
                                                {statusFilter !== 'All' && (
                                                    <button
                                                        onClick={() => setStatusFilter('All')}
                                                        className="text-xs text-primary font-medium hover:underline underline-offset-4">
                                                        Clear filter
                                                    </button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredJobs.map((item) => (
                                        <TableRow
                                            key={item._id}
                                            className="hover:bg-muted/30 transition-colors">
                                            <TableCell className="font-medium text-sm text-foreground py-3.5">{item?.job?.title}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground py-3.5">
                                                {item?.job?.company?.companyname || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground py-3.5 hidden sm:table-cell">
                                                {item?.job?.jobType || 'Full Time'}
                                            </TableCell>
                                            <TableCell className="py-3.5">
                                                <Badge
                                                    className={`text-[11px] font-medium rounded-full px-2.5 py-0.5 border capitalize ${statusConfig[item.status]?.class}`}>
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground py-3.5 hidden md:table-cell">
                                                {formatDate(item?.createdAt)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* ── Pagination ── */}
                    {!isLoading && filteredJobs.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                            <p className="text-xs text-muted-foreground">
                                Page {page} of {totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    disabled={page === 1 || isLoading}
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                                    <ChevronLeftIcon className="w-4 h-4" />
                                </Button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                        .reduce((acc, p, idx, arr) => {
                                            if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…')
                                            acc.push(p)
                                            return acc
                                        }, [])
                                        .map((p, i) =>
                                            p === '…' ? (
                                                <span
                                                    key={`ellipsis-${i}`}
                                                    className="text-xs text-muted-foreground px-1">
                                                    …
                                                </span>
                                            ) : (
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p)}
                                                    className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${
                                                        page === p
                                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                                            : 'text-muted-foreground hover:bg-muted'
                                                    }`}>
                                                    {p}
                                                </button>
                                            )
                                        )}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    disabled={page === totalPages || isLoading}
                                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
                                    <ChevronRightIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AppliedJobs
